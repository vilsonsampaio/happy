import React from 'react';

import { InputProps } from '../../@types/Input';

import {
  Container,
  LabelContainer,
  Label,
  Comment,
  InputComponent,
} from './styles';

const Input: React.FC<InputProps> = ({
  hideInput = false,
  label,
  comment,
  style,
  children,
  ...rest
}) => {
  return (
    <Container style={style}>
      <LabelContainer>
        <Label>{label}</Label>
        {comment && typeof comment === 'string' ? (
          <Comment>{comment}</Comment>
        ) : (
          comment
        )}
      </LabelContainer>
      {!hideInput && <InputComponent {...rest} />}
      {children}
    </Container>
  );
};

export default Input;
