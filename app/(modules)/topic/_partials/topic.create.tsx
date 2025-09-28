"use client";

import { Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function TopicCreate() {
  const [topic, setTopic] = useState("");

  return (
    <Stack>
      <Typography fontSize={132} sx={{whiteSpace: "pre-line"}}>{topic}</Typography>
      <TextField
        multiline
        rows={5}
        label="Topic"
        size="small"
        type="text"
        value={topic}
        onChange={({ target }) => setTopic(target.value)}
      />
    </Stack>
  );
}
