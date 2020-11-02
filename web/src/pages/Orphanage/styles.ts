import styled, { css } from 'styled-components';

interface ImageButtonProps {
  isActive: boolean;
}

interface OpenOnWeekendsCardProps {
  isOpen: boolean;
}

export const Container = styled.div`
  ${({ theme }) => css`
    display: flex;

    max-width: 100vw;
    min-height: 100vh;

    @media (max-width: 900px) {
      ${Main} {
        margin-left: 0;
        margin-top: 9.6rem;
      }

      ${OrphanageDetailContent} {
        padding: 3.2rem 4rem 4rem;

        h1 {
          font-size: 4.5rem;
        }
      }
    }

    @media (max-width: 500px) {
      ${Cards} {
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

export const OrphanageDetail = styled.div`
  ${({ theme }) => css`
    width: 100%;
    max-width: 70rem;

    background: ${theme.colors.shapesPrimary};

    border: solid 0.1rem ${theme.colors.backgroundLineInWhite};
    border-radius: ${theme.radius.default};

    overflow: hidden;

    > img {
      width: 100%;
      height: 36.6rem;

      object-fit: cover;
    }
  `}
`;

export const OrphanageDetailContent = styled.div`
  ${({ theme }) => css`
    padding: 6.4rem 8rem 8rem;

    color: ${theme.colors.textBase};

    h1 {
      margin-bottom: 3.2rem;

      color: ${theme.colors.textTitle};

      font-weight: 700;
      font-size: 5.4rem;
      line-height: 1;
    }

    p {
      margin-top: 2.4rem;

      line-height: 2.8rem;
    }

    hr {
      width: 100%;
      height: 0.1rem;

      margin: 6.4rem 0;

      background: ${theme.colors.backgroundLineInWhite};

      border: none;
    }

    h2 {
      color: ${theme.colors.textTitle};

      font-weight: 700;
      font-size: 3.6rem;
      line-height: 4.6rem;
    }
  `}
`;

export const Images = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.6rem;

    margin: 6.4rem 0;

    overflow-x: hidden;
  `}
`;

export const ImageButton = styled.button<ImageButtonProps>`
  ${({ theme, isActive }) => css`
    width: 12.25rem;
    height: 12.25rem;

    margin-right: 1.6rem;

    border: none;
    border-radius: ${theme.radius.default};

    overflow: hidden;

    opacity: ${isActive ? 1 : 0.8};

    cursor: pointer;

    img {
      width: 100%;
      height: 12.25rem;

      object-fit: cover;
    }

    &:hover {
      opacity: 1;
    }
  `}
`;

export const MapContainer = styled.div`
  ${({ theme }) => css`
    width: 100%;

    margin-top: 1.4rem;

    background: ${theme.colors.shapesThirdary};

    border: solid 0.1rem ${theme.colors.shapesComplementary};
    border-radius: ${theme.radius.default};

    .leaflet-container {
      width: 100%;
      height: 22rem;

      border-radius: ${theme.radius.default};
    }

    footer {
      width: 100%;

      padding: 1.8rem 0;

      text-align: center;

      a {
        color: ${theme.colors.textTitleSecondary};

        font-weight: 700;
        line-height: 2.5rem;

        text-decoration: none;
      }
    }
  `}
`;

export const Cards = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;

    margin-top: 2.4rem;
  `}
`;

export const HourCard = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;

    padding: 3.2rem 2.4rem;

    background: ${theme.colors.primaryGradientLow};

    line-height: 2.8rem;

    border: solid 0.1rem ${theme.colors.shapesComplementary};
    border-radius: ${theme.radius.default};

    > svg {
      width: 3.2rem;
      height: auto;

      margin-bottom: 1.6rem;

      color: ${theme.colors.primary};
    }
  `}
`;

export const OpenOnWeekendsCard = styled.div<OpenOnWeekendsCardProps>`
  ${({ theme, isOpen }) => css`
    display: flex;
    flex-direction: column;

    padding: 3.2rem 2.4rem;

    background: ${isOpen
      ? theme.colors.successGradient
      : theme.colors.errorGradient};
    color: ${isOpen ? theme.colors.success : theme.colors.error};

    line-height: 2.8rem;

    border: solid 0.1rem
      ${isOpen ? theme.colors.successLight : theme.colors.errorLight};
    border-radius: ${theme.radius.default};

    > svg {
      width: 3.2rem;
      height: auto;

      margin-bottom: 1.6rem;

      color: ${isOpen ? theme.colors.success : theme.colors.error};
    }
  `}
`;

export const WhatsAppButton = styled.a`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 6.4rem;

    margin-top: 6.4rem;

    background: ${theme.colors.backgroundButton};
    color: ${theme.colors.textInButton};

    font-weight: 800;
    line-height: 2.6rem;

    border-radius: ${theme.radius.default};

    text-decoration: none;

    cursor: pointer;

    transition: ease-in-out 0.3s;

    > svg {
      width: 2rem;
      height: auto;

      margin-right: 1.6rem;
    }

    &:hover {
      background: ${theme.colors.backgroundButtonHover};
    }
  `}
`;
