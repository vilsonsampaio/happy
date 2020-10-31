import React from 'react';
import { InputProps } from './Input.d';

import { Container } from './styles';

const Input: React.FC<InputProps> = ({ name, label, type = 'text', children, ...rest }) => {
  return (
    <Container type={type}>
      <label htmlFor={name}>{label}</label>

      {children}

      <input id={name} name={name} type={type} {...rest} />
    </Container>
  );
};

export default Input;
