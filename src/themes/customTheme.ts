import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    text: {
      primary: '#000000',
      secondary: '#d4af37',
    },
    primary: {
      main: '#07bb9c',
      dark: '#069f85',
    },
    success: {
      main: '#d1e7dd',
      light: '#0f5132',
    },
    error: {
      main: '#f8d7da',
      light: '#842029',
    },
    warning: {
      main: '#fff3cd',
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
