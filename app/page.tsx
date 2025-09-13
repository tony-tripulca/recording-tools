import { GridCol, GridRow } from "@/app/_components/grids";
import { NavSide } from "@/app/_components/navs";
import { Box, Container, Typography } from "@mui/material";

export default function RootPage() {
  return (
    <GridRow>
      <GridCol size={{ xs: 12, xl: 8 }}>
        <Container maxWidth={false}>
          <Box sx={{ ".MuiTypography-root span": { fontSize: 44, fontWeight: "bold" } }}>
            <Typography fontSize={32}>
              Therefore, I urge you, brothers and sisters, in view of God&apos;s mercy, to offer your bodies as a living
              sacrifice, holy and <span>pleasing</span> to God—this is your true and proper worship.{" "}
              <span>Do not conform</span> to the pattern of this world, but be <span>transformed</span> by the renewing
              of your mind. Then you will be able to test and approve what God&apos;s will is—his good, pleasing and
              perfect will.
            </Typography>
          </Box>
        </Container>
      </GridCol>
      <GridCol size={{ xs: 12, xl: 4 }}>
        <NavSide />
      </GridCol>
    </GridRow>
  );
}
