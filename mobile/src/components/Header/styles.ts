import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  ${({ theme }) => css`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    padding: 44px 24px 24px;

    background-color: ${theme.colors.shapesSecondary};

    border-bottom-width: 1px;
    border-color: ${theme.colors.backgroundLineInWhite};
  `}
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.textComplementary};

    font-family: ${theme.fonts.regular};
    font-size: 16px;
  `}
`;
