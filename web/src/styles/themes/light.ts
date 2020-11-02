export default {
  title: 'light',

  colors: {
    primary: '#15C3D6',

    primaryLight: '#12D4E0',
    primaryLighter: '#96FEFF',
    primarySaturated: '#17D6EB',
    primaryLow: '#D1EDF2',

    primaryDark: '#12AFCB',

    primaryGradient: 'linear-gradient(329.54deg, #15B6D6 0%, #15D6D6 100%)',
    primaryGradientLow: 'linear-gradient(149.97deg, #E6F7FB 8.13%, #FFFFFF 92.67%)',

    secondary: '#FFD666',
    secondaryDark: '#8D734B',
    
    backgroundDefault: '#EBF2F5',
    backgroundLineInWhite: '#D3E2E5',
    backgroundButton: '#37C77F',
    backgroundButtonHover: '#3EE08F',

    textDefault: '#FFFFFF',
    textTitle: '#4D6F80',
    textTitleSecondary: '#0089A5',
    textBase: '#5C8599', 
    textInPrimary: '#FFFFFF',
    textInButton: '#FFFFFF',
    textComplementary: '#8FA7B2',

    shapesPrimary: '#FFFFFF',
    shapesSecondary: '#F7F9FC',
    shapesThirdary: '#E6F7FB',
    shapesComplementary: '#B3DAE2',
    shapesOpacity: 'rgba(255, 255, 255, 0.8)',

    inputs: '#F5F8FA',

    shadowPrimaryOpacity: 'rgba(23, 142, 166, 0.16)',

    success: '#37C77F',
    successLight: '#A1E9C5',
    successLighter: '#EDFFF6',
    successButton: '#31B272',
    successButtonHover: '#3BD689',
    successGradient: 'linear-gradient(154.16deg, #EDFFF6 7.85%, #FFFFFF 91.03%)',

    error: '#FF669D',
    errorLight: '#FFBCD4',
    errorLighter: '#FFE4EE',
    errorButton: '#D6487B',
    errorButtonHover: '#D6487Bbb',
    errorGradient: 'linear-gradient(154.16deg, #FCF0F4 7.85%, #FFFFFF 91.03%)',
  },

  radius: {
    default: '2rem',
    tiny: '0.8rem',
    small: '1.2rem',
    medium: '1.6rem',
    large: '3rem',
  }
} as const;