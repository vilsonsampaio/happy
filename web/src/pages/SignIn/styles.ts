import styled, { css, keyframes } from 'styled-components';

import { Container as Input } from '../../components/Input/styles';
import { Container as HappyHero } from '../../components/HappyHero/styles';

import checkedIcon from '../../assets/images/checked.svg';

export const Container = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 60% 1fr;

    min-width: 100vw;
    min-height: 100vh;

    background: ${theme.colors.primaryGradient};

    overflow: hidden;

    @media (max-width: 900px) {
      ${FormContainer} {
        padding: 0 4rem;
      } 
    }
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;

      ${HappyHero} {
        display: none;
      }
    }
  `}
`;

export const FormContainer = styled.div`
  ${({ theme }) => css`
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 100%;

    padding: 0 6rem;

    background: ${theme.colors.shapesPrimary};

    border-left: solid 0.1rem ${theme.colors.backgroundLineInWhite};

    animation: ${FormAnimation} 0.8s ease;

    > form {
      width: 100%;

      max-width: 40rem;

      > h1 {
        margin-bottom: 4rem;

        color: ${theme.colors.textTitleSecondary};

        font-weight: 700;
        font-size: 3.2rem;
        line-height: 3.4rem;
      }

      ${Input} + ${Input} {
        margin-top: 1.6rem;
      }
    }
  `}
`;

export const GoBack = styled.button`
  ${({ theme }) => css`
    position: absolute;
    top: 3rem;
    right: 3rem;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 4.8rem;
    height: 4.8rem;

    background: ${theme.colors.backgroundDefault};

    border: none;
    border-radius: ${theme.radius.default};

    transition: ease-in-out 0.3s;

    cursor: pointer;

    > svg {
      width: 2.4rem;
      height: auto;

      color: ${theme.colors.primary};
    }

    &:hover {
      background: ${theme.colors.backgroundLineInWhite};
    }
  `}
`;

export const RememberMeContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;

    width: 100%;

    margin: 2.4rem 0 4rem;

    > label {
      display: flex;
      align-items: center;

      color: ${theme.colors.textComplementary};

      font-size: 1.6rem;

      input[type='checkbox'] {
        /* Reset default input styles */
        -moz-appearance: none;
        -webkit-appearance: none;
        appearance: none;

        width: 2.4rem;
        height: 2.4rem;

        margin-right: 1rem;

        background: ${theme.colors.inputs};

        border: solid 0.1rem ${theme.colors.backgroundLineInWhite};
        border-radius: ${theme.radius.tiny};

        outline: none;

        :checked {
          background: url(${checkedIcon}) no-repeat center center ${theme.colors.success};

          border: solid 0.2rem ${theme.colors.success};
        }
      }
    }

    > a {
      margin-left: auto;

      color: ${theme.colors.textComplementary};

      font-size: 1.6rem;

      text-decoration: none;

      :hover {
        text-decoration: underline;
      }
    }
  `}
`;

const FormAnimation = keyframes`
  from { transform: translateX(500px); }
  to { transform: translateX(0); }
`;