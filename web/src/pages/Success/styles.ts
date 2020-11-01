import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100vw;
    height: 100vh;

    background: ${theme.colors.success};

    @media (max-width: 768px) {
      ${Wrapper} {
        > svg {
          display: none;
        }
      }
    }
  `}
`;

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;

    > svg {
      margin-left: 10rem;

      width: 35rem;
      height: auto;
    }
  `}
`;

export const Content = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;

    max-width: 40rem;

    text-align: center;

    h1 {
      font-weight: 800;
      font-size: 8rem;
      line-height: 1;
    }

    p {
      margin: 3.2rem 0 6rem;

      font-size: 2.4rem;
      line-height: 3.4rem;
    }
  `}
`;

export const BackToMap = styled(Link)`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    
    width: fit-content;
    height: 6.4rem;

    padding: 0 4rem;

    background: ${theme.colors.successButton};
    color: ${theme.colors.textInButton};

    font-weight: 800;
    font-size: 1.8rem;
    line-height: 2.5rem;

    border-radius: ${theme.radius.default};

    text-decoration: none;

    transition: ease-in-out 0.3s;

    &:hover {
      background: ${theme.colors.successButtonHover};
    }
  `}
`;