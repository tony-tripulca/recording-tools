"use client";

import { Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function QuestionCreate() {
  const [question, setQuestion] = useState("");

  return (
    <Stack>
      <Typography fontSize={64} sx={{whiteSpace: "pre-line"}}>{question}</Typography>
      <TextField
        multiline
        rows={5}
        label="Question"
        size="small"
        type="text"
        value={question}
        onChange={({ target }) => setQuestion(target.value)}
      />
    </Stack>
  );
}
