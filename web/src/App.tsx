import React from 'react';
import { ThemeProvider } from 'styled-components';

import theme from './styles/themes/light';
import GlobalStyle from './styles/global';

import Routes from './routes';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      <Routes />
    </ThemeProvider>
  );
}

export default App;
