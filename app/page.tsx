import { Box, Typography } from "@mui/material";

export default function RootPage() {
  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{ height: "100%" }}>
      <Typography fontSize={44}>Recording Tools</Typography>
    </Box>
  );
}
