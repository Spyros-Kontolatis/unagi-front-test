import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    text: {
      primary: '#000000',
      secondary: '#ad8533',
    },
    primary: {
      main: '#07bb9c',
      dark: '#069f85',
    },
    success: {
      main: '#73c322',
      light: '#0f5132',
    },
    error: {
      main: '#d4111b',
      light: '#842029',
    },
    warning: {
      main: '#fdaa1c',
      light: '#664d03',
    },
    info: {
      main: '#cff4fc',
      light: '#055160',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1600,
    },
  },
});

export default theme;
