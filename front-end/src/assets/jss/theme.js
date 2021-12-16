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
  },
});

export default theme;
