import { TGridRowComponent } from "@/app/_components/grids/type";
import { Grid } from "@mui/material";

export default function GridRow({
  spacing = 2,
  children,
  ...rest
}: TGridRowComponent) {
  return (
    <Grid container spacing={spacing} {...rest}>
      {children}
    </Grid>
  );
}
