import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: { main: '#0f172a' }, // Koyu Lacivert
    secondary: { main: '#800000' }, // Bakanlık Bordosu
    background: { default: '#f8fafc' }
  },
  shape: { borderRadius: 16 },
  typography: {
    fontFamily: "'Inter', sans-serif",
  }
});