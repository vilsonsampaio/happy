import styled, { css } from 'styled-components';

interface ContainerProps {
  type: string;
}

export const Container = styled.div<ContainerProps>`
  ${({ theme, type }) => css`
    position: relative;

    display: flex;
    flex-direction: column;

    width: 100%;

    label {
      margin-bottom: 0.8rem;

      color: ${theme.colors.textComplementary};

      font-size: 1.6rem;
    }

    input {
      padding: 1.8rem 2.6rem;

      background: ${theme.colors.inputs};
      color: ${theme.colors.textBase};

      line-height: 2.8rem;

      border: solid 0.1rem ${theme.colors.backgroundLineInWhite};
      border-radius: ${theme.radius.default};

      outline: none;

      transition: ease 0.2s;

      :focus {
        border-color: ${theme.colors.successLight};
      }

      display: ${type === 'file' ? 'none' : 'inline'};
    }
  `}
`;

export const VisibilityButton = styled.button`
  ${({ theme }) => css`
    position: absolute;
    bottom: 50%;
    right: 2rem;

    transform: translateY(calc(1.5rem + 50%));

    display: flex;
    align-items: center;
    justify-content: center;
    
    background: none;
    border: none;

    outline: none;

    cursor: pointer;

    > svg {
      width: 2rem;
      height: auto;

      color: ${theme.colors.textComplementary};

      transition: ease-in-out 0.2s;

      :hover {
        color: ${theme.colors.primary};
      }
    }
  `}
`;
