import { createGlobalStyle, css } from 'styled-components';

// Importando estilo do leaflet
import 'leaflet/dist/leaflet.css';

export default createGlobalStyle`
  ${({ theme }) => css`
    :root {
      font-size: 62.5%;
    }

    * {
      margin: 0;
      padding: 0;

      box-sizing: border-box;
    }

    body {
      background: ${theme.colors.backgroundDefault};
      color: ${theme.colors.textDefault};
    }

    body,
    input,
    button,
    textarea {
      font: 600 1.8rem 'Nunito', sans-serif;
    }

    .container {
      width: 90vw;
    }

    @media (max-width: 768px) {
      :root {
        font-size: 55%;
      }
    }
  `}
`;
