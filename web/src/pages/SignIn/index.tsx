import React, { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import HappyHero from '../../components/HappyHero';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, FormContainer, GoBack, RememberMeContainer } from './styles';

const SignIn: React.FC = () => {
  const { goBack } = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember_me, setRememberMe] = useState(true);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
  }

  return (
    <Container>
      <HappyHero />

      <FormContainer>
        <GoBack type="button" onClick={goBack}>
          <FiArrowLeft />
        </GoBack>

        <form onSubmit={handleSubmit}>
          <h1>Fazer login</h1>

          <Input 
            name="email" 
            label="E-mail" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            type="email"
            required
          />
          <Input 
            name="password" 
            label="Senha" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />

          <RememberMeContainer>
            <label htmlFor="remember_me">
              <input 
                type="checkbox" 
                id="remember_me" 
                checked={remember_me}
                onChange={(e) => setRememberMe(e.target.checked)} 
              />
              Lembrar-me
            </label>

            <Link to="/forgot-password">Esqueci minha senha</Link>
          </RememberMeContainer>

          <Button type="submit" disabled={!(email && password)}>Entrar</Button>
        </form>
      </FormContainer>
    </Container>
  );
};

export default SignIn;
