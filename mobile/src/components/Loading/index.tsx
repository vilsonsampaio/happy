import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';

import { LoadingProps } from '../../@types/Loading';

import { Container } from './styles';

const Loading: React.FC<LoadingProps> = ({ color, children }) => {
  const theme = useTheme();

  return (
    <Container>
      <ActivityIndicator size="large" color={color || theme.colors.primary} />
      {children}
    </Container>
  );
};

export default Loading;
