import styled, { css } from 'styled-components';

interface InputProps {
  type: string;
}

export const Container = styled.div<InputProps>`
  ${({ theme, type }) => css`
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
