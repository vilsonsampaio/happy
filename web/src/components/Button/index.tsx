import React from 'react';

import { ButtonProps } from './Button.d';

import { Container } from './styles';

const Button: React.FC<ButtonProps> = ({ children, type = 'button', ...rest }) => {
  return (
    <Container type={type} {...rest}>
      {children}
    </Container>
  );
};

export default Button;
