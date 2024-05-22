import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ed6c02',
      light: '#ff9800',
      dark: '#e65100',
      contrastText: '#fff',
    },
    warning: {
      main: '#ed6c02',
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#fff',
    },
    background: { default: '#1c1e21' },
    text: { primary: '#fff', secondary: '#000000' },
  },
  components: {
    MuiInputLabel: { styleOverrides: { root: { color: '#42a5f5' } } },
    MuiTextField: {
      styleOverrides: {
        root: { background: '#002137', border: '1px dotted #42a5f5' },
      },
    },
    MuiInputAdornment: { styleOverrides: { root: { color: '#42a5f5' } } },
  },
});

export default theme;
