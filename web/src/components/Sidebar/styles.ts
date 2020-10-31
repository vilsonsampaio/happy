import styled, { css } from 'styled-components';

export const Container = styled.aside`
  ${({ theme }) => css`
    position: fixed;
    top: 0;
    left: 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    max-width: 9.6rem;
    height: 100%;

    padding: 3.2rem 2.4rem;

    background: ${theme.colors.primaryGradient};

    border-right: solid 0.1rem ${theme.colors.backgroundLineInWhite};

    > svg {
      width: 4.8rem;
      height: auto;
    }

    > footer {
      button {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 4.8rem;
        height: 4.8rem;

        background: ${theme.colors.primaryDark};

        border: none;
        border-radius: ${theme.radius.medium};

        cursor: pointer;

        transition: ease-in-out 0.3s;

        svg {
          width: 2.4rem;
          height: auto;

          color: ${theme.colors.textInButton};
        }

        :hover {
          background: ${theme.colors.primarySaturated};
        }
      }
    }
  `}
`;
