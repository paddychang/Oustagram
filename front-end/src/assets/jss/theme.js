import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fff",
      dark: "#f9f9f9",
    },
    secondary: {
      light: "#7b7b7b7",
      main: "#1d1d1d",
      dark: "#000",
    },
    info: {
      main: "#0f7ff4",
    },
    error: {
      main: "#ff3d00",
    },
  },
  typography: {
    fontFamily: "'Roboto Condensed', sans-serif",
    fontSize: 14,
    h1: {
      fontSize: 24,
      fontWeight: 600,
    },
    h2: {
      fontWeight: 300,
      fontSize: 28,
    },
    h3: {
      fontWeight: 400,
      fontSize: 16,
    },
    h4: {
      fontSize: 14,
      fontWeight: 600,
      color: "#0f7ff4",
    },
    h5: {
      fontSize: 12,
    },
  },
});

export default theme;
