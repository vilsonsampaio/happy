import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;

    width: 100%;

    label {
      display: flex;
      align-items: baseline;
      justify-content: space-between;

      margin-bottom: 0.8rem;

      color: ${theme.colors.textComplementary};

      font-size: 1.6rem;

      span {
        font-weight: 400;
        font-size: 1.4rem;
        line-height: 2rem;
      }
    }

    textarea {
      min-height: 12rem;
      max-height: 24rem;

      padding: 1.8rem 2.6rem;

      background: ${theme.colors.inputs};
      color: ${theme.colors.textBase};

      line-height: 2.8rem;

      border: solid 0.1rem ${theme.colors.backgroundLineInWhite};
      border-radius: ${theme.radius.default};

      outline: none;

      transition: ease 0.2s;

      resize: vertical;

      :focus {
        border-color: ${theme.colors.successLight};
      }
    }
  `}
`;
