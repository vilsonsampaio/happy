import styled, { css } from 'styled-components';

export const Container = styled.header`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;

    padding: 4rem 0;

    z-index: 10;
  `}
`;

export const Title = styled.h6`
  ${({ theme }) => css`
    color: ${theme.colors.textComplementary};

    font: 600 1.8rem 'Nunito';
    line-height: 2.8rem;
  `}
`;
