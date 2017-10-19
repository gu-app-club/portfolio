import { ThemeProvider } from "styled-components";

const base = {
  colors: {
    // Main colors
    primary: "#3498db",
    success: "#2ecc71",
    danger: "#e74c3c",

    // Background
    background: "#F3F3F3",
    secondaryBackground: "white",

    // Lines and borders
    border: "#E5E5E5",

    // Text
    lightText: "#777777",
    text: "#282828"
  },

  font: "Helvetica",

  spacing: {
    padding: "1em"
  }
};

// A helper for wrapping something in the default theme.
// Replaces a regular ThemeProvider from styled-components
// https://www.styled-components.com/docs/advanced#theming
const Themed = ({ children }) => {
  return <ThemeProvider theme={base}>{children}</ThemeProvider>;
};

export default Themed;
