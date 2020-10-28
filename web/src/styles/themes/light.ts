export default {
  title: 'light',

  colors: {
    primary: '#15C3D6',
    primaryLight: '#12D4E0',
    primaryLighter: '#96FEFF',
    primarySaturated: '#17D6EB',
    primaryLow: '#D1EDF2',
    primaryGradient: 'linear-gradient(329.54deg, #15B6D6 0%, #15D6D6 100%)',
    
    secondary: '#FFD666',
    secondaryDark: '#8D734B',
    
    backgroundDefault: '#EBF2F5',

    textDefault: '#FFFFFF',
    textTitle: '#0089A5',
    textInPrimary: '#FFFFFF',
    textInButton: '#FFFFFF',

    shapesOpacity: 'rgba(255, 255, 255, 0.8)',

    shadowPrimaryOpacity: 'rgba(23, 142, 166, 0.16)',

    success: '#37C77F',
    successLighter: '#EDFFF6',

    error: '#FF669D',
    errorLighter: '#FFE4EE',
  },

  radius: {
    default: '2rem',
    small: '1.2rem',
    large: '3rem',
  }
} as const;