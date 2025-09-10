import { CustomTheme } from "@/app/theme";
import { IProviderComponent } from "@/app/type";
import { ThemeProvider } from "@mui/material";

export default function Provider({ children }: IProviderComponent) {
  return <ThemeProvider theme={CustomTheme}>{children}</ThemeProvider>;
}
