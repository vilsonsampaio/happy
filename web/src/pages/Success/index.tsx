import React from 'react';

import { SuccessIllustration } from '../../assets/images';

import { Container, Wrapper, Content, BackToMap } from './styles';

const Success: React.FC = () => {
  return (
    <Container>
      <Wrapper className="container">
        <Content>
          <h1>Ebaaa!</h1>
          <p>
            O cadastro deu certo e foi enviado ao administrador para ser
            aprovado. Agora é só esperar :)
          </p>

          <BackToMap to="/app">Voltar para o mapa</BackToMap>
        </Content>

        <SuccessIllustration />
      </Wrapper>
    </Container>
  );
};

export default Success;
