import React from 'react';
import { View } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { Container, Title } from './styles';

interface HeaderProps {
  title: string;
  showCancel?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, showCancel = true }) => {
  const navigation = useNavigation();
  const theme = useTheme();
  
  function handleGoBackToAppHomepage() {
    navigation.navigate('OrphanagesMap');
  }

  return (
    <Container>
      <BorderlessButton onPress={navigation.goBack}>
        <Feather name="arrow-left" size={24} color={theme.colors.primary} />
      </BorderlessButton>

      <Title>{title}</Title>

      { showCancel 
        ? (
          <BorderlessButton onPress={handleGoBackToAppHomepage}>
            <Feather name="x" size={24} color={theme.colors.error} />
          </BorderlessButton>
        )
        : (
          <View />
        )
      }
    </Container>
  );
}

export default Header;