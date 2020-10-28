import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import landingIllustration from '../../assets/images/landing.svg';

export const Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100vw;
    height: 100vh;

    background: ${theme.colors.primaryGradient};

    ${Responsive};
  `}
`;

export const Wrapper = styled.div`
  ${({ theme }) => css`
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;

    width: 100%;
    height: 100%;

    max-width: 110rem;

    padding: 4rem 0;

    background: url(${landingIllustration}) no-repeat 90% center;
    background-size: 45%;
  `}
`;

export const LogoWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;

    > div {
      display: flex;
      flex-direction: column;

      margin-left: 6.4rem;

      font-size: 2rem;
      line-height: 3rem;

      text-align: left;
    }
  `}
`;

export const Main = styled.main`
  ${({ theme }) => css`
    max-width: 35rem;

    > h1 {
      font-weight: 900;
      font-size: 7.6rem;
      line-height: 7rem;
    }

    > p {
      margin-top: 4rem;

      font-size: 2.4rem;
      line-height: 3.4rem;
    }
  `}
`;

export const SignIn = styled(Link)`
  ${({ theme }) => css`
    position: absolute;
    top: 4rem;
    right: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    height: 5.6rem;

    padding: 0 4rem;

    background: ${theme.colors.primaryLight};
    color: ${theme.colors.textInButton};

    font-weight: 800;
    font-size: 2rem;
    line-height: 3rem;

    border-radius: ${theme.radius.large};

    text-decoration: none;

    transition: ease-in-out 0.3s;

    &:hover {
      background: ${theme.colors.primaryLighter};
      color: ${theme.colors.primary};
    }
  `}
`;

export const EnterApp = styled(Link)`
  ${({ theme }) => css`
    position: absolute;
    bottom: 4rem;
    right: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 8rem;
    height: 8rem;

    background: ${theme.colors.secondary};
    color: ${theme.colors.secondaryDark};

    border-radius: ${theme.radius.large};

    transition: ease-in-out 0.3s;

    > svg {
      width: auto;
      height: 3rem;
    }

    &:hover {
      background: ${theme.colors.primaryLighter};
      color: ${theme.colors.primary};
    }
  `}
`;

export const Responsive = css`
  @media (max-width: 768px) {
    ${Wrapper} {
      justify-content: space-between;

      background: none;
    }

    ${LogoWrapper} {
      width: 100%;

      justify-content: space-between;

      > svg {
        max-width: 20rem;
        height: auto;
      }

      > div {
        margin-left: auto;

        text-align: right;
      }
    }

    ${SignIn} {
      position: relative;

      margin-bottom: 4rem;
    }

    ${Main} {
      max-width: 90%;

      text-align: center;

      h1 {
        font-size: 6rem;
        line-height: 1;
      }

      p {
        margin-top: 3rem;
      }
    }
  }
`;
