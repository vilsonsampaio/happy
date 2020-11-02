import styled, { css } from 'styled-components';

import { Container as Button } from '../../components/Button/styles';
import { Container as Input } from '../../components/Input/styles';
import { Container as Textarea } from '../../components/Textarea/styles';

interface SelectButtonProps {
  isOpen: boolean;
}

interface PendingProps {
  isPending: boolean;
}

export const Container = styled.div<PendingProps>`
  ${({ theme, isPending }) => css`
    display: flex;

    max-width: 100vw;
    min-height: 100vh;

    ${Form} {
      padding: ${isPending ? '6.4rem 0 0' : '6.4rem 8rem 8rem'};
    }

    ${Fieldset} {
      padding: ${isPending ? '0 8rem' : ''};
    }

    @media (max-width: 900px) {
      ${Main} {
        margin-left: 0;
        margin-top: 9.6rem;
      }

      ${Form} {
        padding: ${isPending ? '6rem 0 0' : '6rem 4rem'};
      }

      ${Fieldset} {
        padding: ${isPending ? '0 4rem' : '0'};
      }

      ${PendingButtonContainer} {
        padding: 4rem;
      }
    }

    @media (max-width: 500px) {
      ${ImagesContainer} {
        grid-template-columns: repeat(3, 1fr);
      }

      ${SelectButton} {
        font-size: 1.6rem;
      }

      ${PendingButtonContainer} {
        grid-template-columns: 1fr;
      }
    }
  `}
`;

export const Main = styled.main`
  ${({ theme }) => css`
    flex: 1;

    display: flex;
    flex-direction: column;
    align-items: center;

    margin-left: 9.6rem;

    padding-bottom: 8rem;
  `}
`;

export const Form = styled.form`
  ${({ theme }) => css`
    width: 100%;
    max-width: 70rem;

    background: ${theme.colors.shapesPrimary};

    border: solid 0.1rem ${theme.colors.backgroundLineInWhite};
    border-radius: ${theme.radius.default};

    overflow: hidden;
  `}
`;

export const Fieldset = styled.fieldset`
  ${({ theme }) => css`
    color: ${theme.colors.textBase};

    border: none;

    legend {
      width: 100%;

      margin-bottom: 4rem;
      padding-bottom: 2.4rem;

      font-weight: 700;
      font-size: 3.2rem;
      line-height: 3.4rem;

      border-bottom: solid 0.1rem ${theme.colors.backgroundLineInWhite};
    }

    & + & {
      margin-top: 8rem;
    }

    &:nth-child(1) {
      ${Textarea} {
        margin: 2.4rem 0;
      }

      ${Input}[type="file"] {
        margin-top: 2.4rem;
      }
    }

    &:nth-child(2) {
      ${Input} {
        margin: 2.4rem 0;
      }
    }
  `}
`;

export const MapContainer = styled.div`
  ${({ theme }) => css`
    width: 100%;

    background: ${theme.colors.shapesThirdary};

    margin-bottom: 4rem;

    border: solid 0.1rem ${theme.colors.shapesComplementary};
    border-radius: ${theme.radius.default};

    overflow: hidden;

    .leaflet-container {
      width: 100%;
      height: 24rem;
    }

    footer {
      width: 100%;

      padding: 1.2rem 0;

      text-align: center;

      color: ${theme.colors.textTitleSecondary};

      font-weight: 700;
      font-size: 1.4rem;
      line-height: 2.5rem;
    }
  `}
`;

export const ImagesContainer = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1.6rem;

    > div {
      position: relative;

      width: 100%;
      height: 9.6rem;

      border-radius: ${theme.radius.default};

      overflow: hidden;

      img {
        width: 100%;
        height: 9.6rem;

        object-fit: cover;
      }

      button {
        position: absolute;
        top: 0;
        right: 0;

        display: flex;
        align-items: center;
        justify-content: center;

        width: 4rem;
        height: 4rem;

        background: ${theme.colors.shapesPrimary};

        border: solid 0.1rem ${theme.colors.backgroundLineInWhite};
        border-top-right-radius: ${theme.radius.default};
        border-bottom-left-radius: ${theme.radius.default};

        outline: none;

        cursor: pointer;

        z-index: 10;

        svg {
          width: 2.4rem;
          height: auto;

          color: ${theme.colors.error};
        }
      }
    }

    > label {
      display: flex;
      align-items: center;
      justify-content: center;

      width: 100%;
      height: 9.6rem;

      background: ${theme.colors.inputs};

      border: dashed 0.1rem ${theme.colors.primary};
      border-radius: ${theme.radius.default};

      cursor: pointer;

      svg {
        width: 2.4rem;
        height: auto;

        color: ${theme.colors.primaryDark};
      }
    }
  `}
`;

export const SelectButtonContainer = styled.div`
  ${({ theme }) => css`
    margin-bottom: 6.4rem;

    label {
      color: ${theme.colors.textComplementary};

      font-size: 1.6rem;
    }

    > div {
      display: grid;
      grid-template-columns: 1fr 1fr;

      width: 100%;
      height: 6.4rem;

      margin-top: 0.8rem;

      background: ${theme.colors.inputs};

      border-radius: ${theme.radius.default};

      overflow: hidden;
    }
  `}
`;

export const SelectButton = styled.button<SelectButtonProps>`
  ${({ theme, isOpen }) => css`
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 1.9rem;

    cursor: pointer;

    outline: none;

    &:nth-child(1) {
      background: ${isOpen ? theme.colors.successLighter : 'none'};
      color: ${isOpen ? theme.colors.success : theme.colors.textBase};

      border: ${isOpen
        ? `solid 0.1rem ${theme.colors.successLight}`
        : `solid 0.1rem ${theme.colors.backgroundLineInWhite}`};

      border-right: ${isOpen
        ? `solid 0.1rem ${theme.colors.successLight}`
        : 'none'};

      border-top-left-radius: ${theme.radius.default};
      border-bottom-left-radius: ${theme.radius.default};
    }

    &:nth-child(2) {
      background: ${!isOpen ? theme.colors.successLighter : 'none'};
      color: ${!isOpen ? theme.colors.success : theme.colors.textBase};

      border: ${!isOpen
        ? `solid 0.1rem ${theme.colors.successLight}`
        : `solid 0.1rem ${theme.colors.backgroundLineInWhite}`};

      border-left: ${!isOpen
        ? `solid 0.1rem ${theme.colors.successLight}`
        : 'none'};

      border-top-right-radius: ${theme.radius.default};
      border-bottom-right-radius: ${theme.radius.default};
    }
  `}
`;

export const PendingButtonContainer = styled.footer`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;

    padding: 4.8rem 8rem;

    background: ${theme.colors.inputs};

    border-top: solid 0.1rem ${theme.colors.backgroundLineInWhite};
  `}
`;

export const PendingButton = styled(Button)`
  ${({ theme }) => css`
    &:nth-child(1) {
      background: ${theme.colors.error};

      :hover {
        background: ${theme.colors.error}dd;
      }
    }

    > svg {
      margin-right: 1rem;

      width: 2.4rem;
      height: auto;

      color: ${theme.colors.textInButton};
    }
  `}
`;
