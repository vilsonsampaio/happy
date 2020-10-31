import React from 'react';
import { FiArrowRight } from 'react-icons/fi';

import { Happy } from '../../assets/images';

import { Container, Wrapper, LogoWrapper, Main, SignIn, EnterApp } from './styles';

const Landing: React.FC = () => {
  return (
    <Container>
      <Wrapper className="container">
        <LogoWrapper>
          <Happy />

          <div>
            <strong>Camaçari</strong>
            <span>Bahia</span>
          </div>
        </LogoWrapper>

        <Main>
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças.</p>
        </Main>

        <SignIn to="/sign-in">
          Acesso restrito
        </SignIn>

        <EnterApp to="/app">
          <FiArrowRight />
        </EnterApp>
      </Wrapper>
    </Container>
  );
}

export default Landing;
