"use client";
import { createTheme } from "@mui/material";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const theme = createTheme({
  palette: {
    primary: {
      main: "#B6821C",
      contrastText: "#000000",
    },
    action: {
      disabled: "#000000",
    },
    background: {
      paper: "#ffffff",
    },
    error: {
      main: "#D32F2F",
    },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
  },
});
