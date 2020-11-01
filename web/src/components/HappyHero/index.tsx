import React from 'react';
import { HappyVertical } from '../../assets/images';

import { Container } from './styles';

const HappyHero: React.FC = () => {
  return (
    <Container>
      <HappyVertical />

      <span>
        <strong>Rio do Sul</strong>
        Santa Catarina
      </span>
    </Container>
  );
};

export default HappyHero;
