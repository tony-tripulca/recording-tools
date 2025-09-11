"use client";

import { IDefinition } from "@/app/(modules)/dictionary/type";
import { GridCol, GridRow } from "@/app/_components/grids";
import { Box, Button, Container, List, ListItem, Stack, TextField, Typography } from "@mui/material";
import React, { FormEvent, useCallback, useState } from "react";

export default function DictionarySearch() {
  const [term, setTerm] = useState("");
  const [definitions, setDefinitions] = useState<IDefinition[]>([]);

  const handleSearchDefinition = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      if (!term) return alert("Invalid word");

      try {
        const response = await fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + encodeURIComponent(term));

        if (!response.ok) {
          throw new Error("Word not found or API error");
        }

        const data: IDefinition[] = await response.json();
        setDefinitions(data);
        return data;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        alert("Error fetching definition");
        return null;
      }
    },
    [term]
  );

  return (
    <Container maxWidth={false} sx={{ py: 2 }}>
      <GridRow>
        <GridCol sx={{ display: "flex", justifyContent: "center" }}>
          <Box component={"form"} onSubmit={handleSearchDefinition}>
            <Stack direction={"row"} spacing={1} width={512}>
              <TextField
                fullWidth
                size="small"
                type="search"
                value={term}
                onChange={({ target }) => setTerm(target.value)}
              />
              <Button variant="contained" type="submit">
                Define
              </Button>
            </Stack>
          </Box>
        </GridCol>
        <GridCol>
          <List sx={{ overflow: "auto", height: 640 }}>
            {definitions?.map((definition, i) => (
              <ListItem key={i}>
                <GridRow>
                  <GridCol>
                    <Typography pr={4} fontSize={64} lineHeight={1}>
                      {definition?.word}
                    </Typography>
                    <Stack direction={"row"} spacing={2} alignItems={"center"}>
                      {definition?.phonetics?.map((phonetic, i) => (
                        <React.Fragment key={i}>
                          <Typography>{phonetic?.text}</Typography>
                        </React.Fragment>
                      ))}
                    </Stack>
                  </GridCol>
                  <GridCol>
                    <List>
                      {definition?.meanings?.map((meaning, i) => (
                        <ListItem key={i}>
                          <Stack>
                            <Typography>{meaning.partOfSpeech}</Typography>
                            {meaning?.definitions?.map((def, i) => (
                              <React.Fragment key={i}>
                                <Typography fontSize={44}>
                                  {i + 1}. {def?.definition}
                                </Typography>
                                <Typography fontStyle={"italic"}>{def?.example}</Typography>
                              </React.Fragment>
                            ))}
                          </Stack>
                        </ListItem>
                      ))}
                    </List>
                  </GridCol>
                </GridRow>
              </ListItem>
            ))}
          </List>
        </GridCol>
      </GridRow>
    </Container>
  );
}
