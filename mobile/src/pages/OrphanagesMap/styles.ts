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

export const CalloutContainer = styled.View`
  ${({ theme }) => css`
    justify-content: center;

    width: 160px;
    height: 46px;

    padding: 0px 16px;

    background-color: ${theme.colors.shapesPrimary}cc;
    border-radius: 16px;
  `}
`;

export const CalloutText = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.textTitlePrimary};

    font-family: ${theme.fonts.medium};
    font-size: 14px;
  `}
`;

export const Footer = styled.View`
  ${({ theme }) => css`
    position: absolute;
    left: 24px;
    right: 24px;
    bottom: 34px;

    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    height: 56px;

    padding-left: 24px;

    background-color: ${theme.colors.shapesPrimary};

    border-radius: 20px;
  `}
`;

export const FooterText = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.textComplementary};
    font-family: ${theme.fonts.medium};
  `}
`;

export const CreateOrphanageButton = styled(RectButton)`
  ${({ theme }) => css`
    justify-content: center;
    align-items: center;

    width: 56px;
    height: 56px;

    background-color: ${theme.colors.primary};

    border-radius: 20px;

    elevation: 3;
  `}
`;