import styled, { css } from 'styled-components/native';
import { Image, TouchableOpacity } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.ScrollView`
  ${({ theme }) => css`
    flex: 1;
  `}
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.textBase};

    font-size: 24px;
    font-family: ${theme.fonts.medium};
  `}
`;

export const Separator = styled.View`
  ${({ theme }) => css`
    width: 100%;
    height: 1px;

    margin: 24px 0px 32px;

    background-color: ${theme.colors.backgroundLineInWhite};
  `}
`;

export const UploadedImagesContainer = styled.View`
  ${({ theme }) => css`
    flex-direction: row;
  `}
`;

export const UploadedImage = styled(Image)`
  ${({ theme }) => css`
    width: 64px;
    height: 64px;

    margin-right: 8px;
    margin-bottom: 32px;

    border-radius: 20px;
  `}
`;

export const ImagesInput = styled(TouchableOpacity)`
  ${({ theme }) => css`
    justify-content: center;
    align-items: center;

    height: 56px;

    margin-bottom: 64px;

    background-color: ${theme.colors.shapesPrimary}80;

    border-radius: 20px;
    border-style: dashed;
    border-width: 1.4px;
    border-color: ${theme.colors.primary}80;
  `}
`;

export const SwitchContainer = styled.View`
  ${({ theme }) => css`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    margin-top: 16px;
  `}
`;

export const NextButton = styled(RectButton)`
  ${({ theme }) => css`
    justify-content: center;
    align-items: center;

    height: 56px;

    margin-top: 38px;

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
