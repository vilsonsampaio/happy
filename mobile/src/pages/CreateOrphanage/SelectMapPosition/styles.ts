import styled, { css } from 'styled-components/native';
import { Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  ${({ theme }) => css`
    flex: 1;
  `}
`;

export const Map = styled(MapView)`
  ${({ theme }) => css`
    width: ${Dimensions.get('window').width}px;
    height: ${Dimensions.get('window').height}px;
  `}
`;

export const NextButton = styled(RectButton)`
  ${({ theme }) => css`
    position: absolute;
    left: 24px;
    right: 24px;
    bottom: 40px;

    justify-content: center;
    align-items: center;

    height: 56px;

    background-color: ${theme.colors.primary};

    border-radius: 20px;
  `}
`;

export const NextButtonText = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.textInButton};

    font-family: ${theme.fonts.bold};
    font-size: 16px;
  `}
`;
