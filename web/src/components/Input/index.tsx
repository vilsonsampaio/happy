import React, { useState } from 'react';
import { FiEye , FiEyeOff } from 'react-icons/fi';
import { useTheme } from 'styled-components';

import { InputProps } from './Input.d';

import { Container, VisibilityButton } from './styles';

const Input: React.FC<InputProps> = ({ name, label, type = 'text', children, ...rest }) => {
  const [visibility, setVisibility] = useState(false);
  
  const { colors } = useTheme();
  
  return (
    <Container type={type}>
      <label htmlFor={name}>{label}</label>

      {children}

      <input 
        id={name} 
        name={name} 
        type={
          type === 'password' 
          ? visibility ? 'text' : 'password'
          : type
        } 
        {...rest} 
      />

      { type === 'password' 
       ? (
         <VisibilityButton type="button" onClick={() => setVisibility(!visibility)}>
           { visibility ? <FiEyeOff color={colors.primary} /> : <FiEye /> }
         </VisibilityButton>
       )
       : ''
      }
    </Container>
  );
};

export default Input;
