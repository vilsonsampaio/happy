import styled, { css } from 'styled-components/native';
import { TextInputProps } from 'react-native';

export const Container = styled.View`
  ${({ theme }) => css`
    width: 100%;
  `}
`;

export const LabelContainer = styled.View`
  ${({ theme }) => css`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 8px;
  `}
`;

export const Label = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.textComplementary};

    font-family: ${theme.fonts.regular};
    font-size: 15px;
  `}
`;

export const Comment = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.textComplementary};

    font-family: ${theme.fonts.regular};
    font-size: 11px;
  `}
`;

export const InputComponent = styled.TextInput<TextInputProps>`
  ${({ theme, multiline }) => css`
    height: ${multiline ? 110 : 56}px;

    padding: 18px 24px;

    background-color: ${theme.colors.shapesPrimary};

    border-radius: 20px;
    border-width: 1.4px;
    border-color: ${theme.colors.backgroundLineInWhite};

    text-align-vertical: top;
  `}
`;
