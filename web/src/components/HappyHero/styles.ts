import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;

    > svg {
      width: 20rem;
      height: auto;
    }

    > span {
      margin-top: 8rem;

      font-size: 2.4rem;
      line-height: 3.4rem;

      text-align: center;

      strong {
        display: block;

        font-weight: 800;
      }
    }
  `}
`;
