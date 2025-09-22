"use client";

import { GridCol, GridRow } from "@/app/_components/grids";
import { Box, Container, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function QuestionCreate() {
  const [question, setQuestion] = useState("");

  return (
    <Container maxWidth={false} sx={{ py: 2 }}>
      <GridRow>
        <GridCol sx={{ display: "flex", justifyContent: "center" }}>
          <Stack direction={"row"} spacing={1} width={512}>
            <TextField
              fullWidth
              label="Question"
              size="small"
              type="text"
              value={question}
              onChange={({ target }) => setQuestion(target.value)}
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
            <Typography fontSize={64} textAlign={"center"}>
              {question}
            </Typography>
          </Box>
        </GridCol>
      </GridRow>
    </Container>
  );
}
