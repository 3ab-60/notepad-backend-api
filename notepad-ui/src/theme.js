import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",           // Smooth modern font
  },
  palette: {
    primary: { main: "#3A5BFF" },                // Button color
    secondary: { main: "#6B8CFF" },
    background: { default: "#F4F7FE"},          // Page background
  },
  shape: { borderRadius: 12 },                   // Rounded corners globally
});

export default theme;
