import { TSectionMainComponent } from "@/app/_components/sections/type";
import { Box } from "@mui/material";

export default function SectionMain({ children, module, ...rest }: TSectionMainComponent) {
  return (
    <Box component={"section"} id={`section-main-${module}`} {...rest}>
      {children}
    </Box>
  );
}
