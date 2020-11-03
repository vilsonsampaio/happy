import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { toast } from 'react-toastify';

import HappyHero from '../../components/HappyHero';
import Input from '../../components/Input';
import Button from '../../components/Button';

import api from '../../services/api';

import { Container, FormContainer, GoBack } from './styles';

const ForgotPassword: React.FC = () => {
  const { goBack } = useHistory();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit(event: FormEvent) {
    setLoading(true);

    event.preventDefault();

    api
      .post('/forgot-password', { email })
      .then(response => {
        setEmail('');

        if (response.status === 200) {
          toast.success('E-mail enviado!');
        }
      })
      .catch(error => {
        console.error(error);

        if (error.response) {
          if (error.response.data.message === 'User not found') {
            toast.error('E-mail não encontrado!');
          } else {
            console.error(error.response.data.message);
          }
        }
      })
    ;

    setLoading(false);
  }

  return (
    <Container>
      <HappyHero />

      <FormContainer>
        <GoBack type="button" onClick={goBack}>
          <FiArrowLeft />
        </GoBack>

        <form onSubmit={handleSubmit}>
          <h1>Esqueci a senha</h1>
          <p>Sua redefinição de senha será enviada para o e-mail cadastrado.</p>

          <Input 
            name="email" 
            label="E-mail" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            type="email"
            required
          />

          <Button 
            type="submit" 
            disabled={!email || loading}
          >
            { loading ? 'Enviando...' : 'Enviar e-mail' }
          </Button>
        </form>
      </FormContainer>
    </Container>
  );
};

export default ForgotPassword;
