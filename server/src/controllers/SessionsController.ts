import 'dotenv/config';

import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

import nodemailer from '../modules/mail';

import User from '../models/User';

import userView from '../views/users_view';

export default {
  async signIn(request: Request, response: Response) {
    const { email, password, remember_me } = request.body;
   
    const data = { email, password, remember_me };

    const schema = Yup.object().shape({
      email: Yup.string().required('E-mail é obrigatório'),
      password: Yup.string().required('Senha é obrigatório'),
      remember_me: Yup.boolean().required('Lembrar-me é obrigatório'),
    });

    await schema.validate(data, { 
      abortEarly: false, 
    });

    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ email });

    if (!user) {
      return response.status(401).json({ message: 'User not found' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return response.status(401).json({ message: 'Password does not match' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'default',
      {
        expiresIn: remember_me ? '7d' : '1h'
      }
    );
    
    return response.json(userView.render(user, token));
  },

  async signUp(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const password_hash = await bcrypt.hash(password, 10);

    const data = { name, email, password: password_hash };
    
    const schema = Yup.object().shape({
      name: Yup.string().required('Nome é obrigatório'),
      email: Yup.string().required('E-mail é obrigatório'),
      password: Yup.string().required('Senha é obrigatório'),
    });
    
    await schema.validate(data, { 
      abortEarly: false, 
    });
    
    const usersRepository = getRepository(User);
    
    const emailIsAlreadyRegistered = await usersRepository.count({ email }) !== 0;

    if (emailIsAlreadyRegistered) {
      return response.status(400).json({ message: 'Email is already registered' });
    }

    const user = usersRepository.create(data);

    await usersRepository.save(user);

    return response.status(201);
  },

  async forgotPassword(request: Request, response: Response) {
    const { email } = request.body;

    const schema = Yup.object().shape({
      email: Yup.string().required('E-mail é obrigatório'),
    });
    
    await schema.validate({ email }, { 
      abortEarly: false, 
    });

    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ email });

    if (!user) {
      return response.status(401).json({ message: 'User not found' });
    }

    const token = crypto.randomBytes(20).toString('hex');

    const tokenExpires = new Date();
    tokenExpires.setHours(tokenExpires.getHours() + 1);

    await usersRepository.update({ email }, {
      password_reset_token: token,
      password_reset_expires: tokenExpires,
    });

    nodemailer.sendMail(
      {
        to: email,
        from: 'nao-responda@happy.com',
        subject: 'Recupere seu acesso - Happy',
        html: `<p>Você esqueceu sua senha? Não tem problema, <a href='${process.env.NODEMAILER_FRONTEND_URL}?token=${token}&id=${user.id}'>clique aqui</a> para recuperar ou cole esse endereço em seu navegador <strong>${process.env.NODEMAILER_FRONTEND_URL}?token=${token}&id=${user.id}</strong></p>`,
      },
      (error) => {
        if (error) {
          return response.status(400).json({ error: 'Cannot send forgot password email' });
        }

        return response.status(200).send();
      } 
    );

    return response.status(200).send();
  },
}