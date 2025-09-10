import { TGridColComponent } from "@/app/_components/grids/type";
import { Grid } from "@mui/material";

export default function GridCol({
  size = { xs: 12 },
  children,
  ...rest
}: TGridColComponent) {
  return (
    <Grid size={size} {...rest}>
      {children}
    </Grid>
  );
}
