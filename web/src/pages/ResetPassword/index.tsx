import React, { FormEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { toast } from 'react-toastify';

import HappyHero from '../../components/HappyHero';
import Input from '../../components/Input';
import Button from '../../components/Button';

import api from '../../services/api';

import { Container, FormContainer, GoBack } from './styles';

const ResetPassword: React.FC = () => {
  const { goBack } = useHistory();
  
  const [id, setId] = useState(0);
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');

  useEffect(() => {
    const { search } = window.location;

    const params = new URLSearchParams(search);

    const id = Number(params.get('id'));
    const token = params.get('token');

    if (id) {
      setId(id);
    } else {
      toast.error('ID não informado!');
    }

    if (token)  {
      setToken(token);
    } else {
      toast.error('Token não informado!');
    }
  }, []);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    api
      .put('/reset-password', { id, token, password })
      .then(response => {
        setId(0);
        setToken('');
        setPassword('');
        setConfirmPassword('');

        if (response.status === 200) {
          toast.success('Senha alterada!');
        }
      })
      .catch(error => {
        console.error(error);

        if (error.response) {
          if (error.response.data.message === 'User not found') {
            toast.error('Usuário não encontrado!');
            return;
          }

          if (error.response.data.message === 'Token is expired') {
            toast.error('Token expirado!');
            return;
          }

          if (error.response.data.message === 'Token is invalid') {
            toast.error('Token inválido!');
            return;
          }

          toast.error(error.response.data.message);
        }
      })
    ;
  }

  return (
    <Container>
      <HappyHero />

      <FormContainer>
        <GoBack type="button" onClick={goBack}>
          <FiArrowLeft />
        </GoBack>

        <form onSubmit={handleSubmit}>
          <h1>Redefinição de senha</h1>
          <p>Escolha uma nova senha para você acessar o dashboard do Happy</p>

          <Input 
            name="password" 
            label="Nova senha" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            type="password"
            required
          />

          <Input 
            name="confirm_password" 
            label="Repetir senha" 
            value={confirm_password} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            type="password"
            required
          />

          <Button 
            type="submit" 
            disabled={
              !(id && token && password && confirm_password) 
                          ||
              !(password === confirm_password)}
          >
            Redefinir
          </Button>
        </form>
      </FormContainer>
    </Container>
  );
};

export default ResetPassword;
