const theme = {
  title: 'light',

  colors: {
    primary: '#15C3D6',
    primaryLow: '#D1EDF2',
    primaryLight: '#B3DAE2',
    primaryLighter: '#E6F7FB',
    primaryDark: '#2AB5D1',

    secondary: '#FFD666',
    
    success: '#39CC83',
    successLow: '#EDFFF6',
    successLight: '#A1E9C5',
    successButton: '#3CDC8C',

    error: '#FF669D',
    errorLow: '#FFE4EE',
    errorLight: '#FFBCD4',
    errorLighter: '#FCF0F4',

    textBase: '#5C8599',
    textTitlePrimary: '#0089A5',
    textTitleSecondary: '#4D6F80',
    textSecondary: '#8D734B',
    textInButton: '#FFFFFF',
    textComplementary: '#8FA7B2',
    textSuccess: '#37C77F',

    shapesPrimary: '#FFFFFF',
    shapesSecondary: '#F7F9FC',
  
    backgroundDefault: '#EBF2F5',
    backgroundLineInWhite: '#D3E2E5',
  },

  fonts: {
    regular: 'Nunito_600SemiBold',
    medium: 'Nunito_700Bold',
    bold: 'Nunito_800ExtraBold',
  },
} as const;

export type ThemeTypes = typeof theme;

export default theme;