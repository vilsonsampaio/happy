import { ThemeTypes } from '../styles/themes/light';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeTypes {}
}