import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

// Modificando a estilização padrão do Leaflet
const MapContainer = css`
  ${({ theme }) => css`
    .map-container {
      width: 100%;
      height: 100%;

      z-index: 5;

      .map-popup {
        .leaflet-popup-content-wrapper {
          background: ${theme.colors.shapesOpacity};

          border-radius: ${theme.radius.default};

          box-shadow: none;

          .leaflet-popup-content {
            display: flex;
            justify-content: space-between;
            align-items: center;

            margin: 0.8rem 1.2rem;

            color: ${theme.colors.textTitle};

            font: 700 2rem 'Nunito';
            line-height: 1;
          }
        }

        .leaflet-popup-tip-container {
          display: none;
        }
      }
    }
  `}
`;

export const Container = styled.div`
  position: relative;

  display: flex;

  width: 100vw;
  height: 100vh;

  ${MapContainer};
`;

export const Sidebar = styled.aside`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    width: 40rem;

    padding: 4rem 8rem;

    background: ${theme.colors.primaryGradient};

    > header {
      > svg {
        width: 6.4rem;
        height: auto;
      }

      > h2 {
        margin-top: 6rem;

        font-weight: 800;
        font-size: 4rem;
        line-height: 4.2rem;
      }

      > p {
        margin-top: 2.4rem;

        line-height: 2.8rem;
      }
    }

    > footer {
      display: flex;
      flex-direction: column;

      line-height: 2.8rem;

      strong {
        font-weight: 800;
      }
    }

    @media (max-width: 768px) {
      & {
        display: none;
      }
    }
  `}
`;

export const GoToOrphanageDetail = styled(Link)`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 4rem;
    height: 4rem;

    background: ${theme.colors.primary};

    border-radius: ${theme.radius.small};

    box-shadow: 1.7rem 2.7rem 4.1rem ${theme.colors.shadowPrimaryOpacity};

    > svg {
      width: 2rem;
      height: auto;

      color: ${theme.colors.textInPrimary};
    }
  `}
`;

export const CreateOrphanage = styled(Link)`
  ${({ theme }) => css`
    position: absolute;
    bottom: 4rem;
    right: 4rem;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 6.4rem;
    height: 6.4rem;

    background: ${theme.colors.primary};
    color: ${theme.colors.textInButton};

    border-radius: ${theme.radius.default};

    transition: ease-in-out 0.3s;

    z-index: 10;

    > svg {
      width: 3rem;
      height: auto;
    }

    &:hover {
      background: ${theme.colors.primarySaturated};
    }
  `}
`;

export const Responsive = css`
  @media (max-width: 768px) {
    ${Sidebar} {
      background: red;
    }
  }
`;
