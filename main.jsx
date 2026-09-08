import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import App from "./App";
import "./styles.css";

const theme = {
  colors: {
    primary: "#2563eb",
    dark: "#0f172a",
    muted: "#64748b",
    light: "#f8fafc",
    white: "#ffffff"
  }
};

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);