import React from 'react';

import { TextareaProps } from './Textarea';

import { Container } from './styles';

const Textarea: React.FC<TextareaProps> = ({
  name,
  label,
  instruction,
  ...rest
}) => {
  return (
    <Container>
      <label htmlFor={name}>
        {label} <span>{instruction}</span>
      </label>

      <textarea name={name} id={name} {...rest}/>
    </Container>
  );
};

export default Textarea;
