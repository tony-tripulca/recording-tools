"use client";

import { createTheme } from "@mui/material";

const CustomTheme = createTheme({
  components: { MuiButton: { styleOverrides: { root: { textTransform: "capitalize", borderRadius: 12 } } } },
});

export { CustomTheme };
