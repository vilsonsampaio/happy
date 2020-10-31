import styled, { css } from 'styled-components';

import { ButtonProps } from './Button.d';

export const Container = styled.button<ButtonProps>`
  ${({ theme, disabled, loading }) => css`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 6.4rem;

    background: ${theme.colors.backgroundButton};
    color: ${theme.colors.textInButton};

    font-weight: 800;
    font-size: 1.8rem;
    line-height: 2.6rem;

    border: none;
    border-radius: ${theme.radius.default};

    opacity: ${disabled ? '0.5' : '1'};

    transition: ease-in-out 0.3s;

    cursor: ${loading ? 'wait' : disabled ? 'initial' : 'pointer'};

    &:hover {
      background: ${disabled ? '' : theme.colors.backgroundButtonHover};
    }
  `}
`;
