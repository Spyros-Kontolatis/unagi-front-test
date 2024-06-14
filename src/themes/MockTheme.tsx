import React, { ReactNode } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import customTheme from './customTheme';

function MockTheme({ children }: { children: ReactNode }) {
  const theme = createTheme(customTheme);
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default MockTheme;
