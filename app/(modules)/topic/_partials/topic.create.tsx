"use client";

import { GridCol, GridRow } from "@/app/_components/grids";
import { Box, Container, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function TopicCreate() {
  const [topic, setTopic] = useState("");

  return (
    <Container maxWidth={false} sx={{ py: 2 }}>
      <GridRow>
        <GridCol sx={{ display: "flex", justifyContent: "center" }}>
          <Stack direction={"row"} spacing={1} width={512}>
            <TextField
              fullWidth
              size="small"
              type="text"
              value={topic}
              onChange={({ target }) => setTopic(target.value)}
            />
          </Stack>
        </GridCol>
        <GridCol>
          <Box
            sx={{
              height: "calc(100vh - 100px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography fontSize={128}>{topic}</Typography>
          </Box>
        </GridCol>
      </GridRow>
    </Container>
  );
}
