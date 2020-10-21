import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';
import bcrypt from 'bcryptjs';

import User from '../models/User';

export default {
  async create(request: Request, response: Response) {
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
  }
}