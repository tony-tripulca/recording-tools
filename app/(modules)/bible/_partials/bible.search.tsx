"use client";

import { GridCol, GridRow } from "@/app/_components/grids";
import { Box, Button, Container, FormControl, MenuItem, Select, Stack, TextField } from "@mui/material";
import { FormEvent, useState } from "react";

const versions = [
  { label: "English Standard Version (ESV)", value: "ESV" },
  { label: "New International Version (NIV)", value: "NIV" },
  { label: "King James Version (KJV)", value: "KJV" },
  { label: "New King James Version (NKJV)", value: "NKJV" },
  { label: "New Living Translation (NLT)", value: "NLT" },
  { label: "New Revised Standard Version Updated Edition (NRSVUE)", value: "NRSVUE" },
  { label: "Revised Standard Version (RSV)", value: "RSV" },
  { label: "Revised Standard Version Catholic Edition (RSVCE)", value: "RSVCE" },
  { label: "Tree of Life Version (TLV)", value: "TLV" },
  { label: "The Message (MSG)", value: "MSG" },
  { label: "Modern English Version (MEV)", value: "MEV" },
  { label: "Legacy Standard Bible (LSB)", value: "LSB" },
  { label: "Lexham English Bible (LEB)", value: "LEB" },
  { label: "Living Bible (TLB)", value: "TLB" },
  { label: "Mounce Reverse Interlinear New Testament (MOUNCE)", value: "MOUNCE" },
  { label: "Names of God Bible (NOG)", value: "NOG" },
  { label: "New American Bible Revised Edition (NABRE)", value: "NABRE" },
  { label: "New American Standard Bible (NASB)", value: "NASB" },
  { label: "New American Standard Bible 1995 (NASB1995)", value: "NASB1995" },
  { label: "New Catholic Bible (NCB)", value: "NCB" },
  { label: "New Century Version (NCV)", value: "NCV" },
  { label: "New English Translation (NET)", value: "NET" },
  { label: "New International Reader's Version (NIRV)", value: "NIRV" },
  { label: "New International Version - UK (NIVUK)", value: "NIVUK" },
  { label: "New Life Version (NLV)", value: "NLV" },
  { label: "New Matthew Bible (NMB)", value: "NMB" },
  { label: "New Revised Standard Version Anglicised (NRSVA)", value: "NRSVA" },
  { label: "New Revised Standard Version Anglicised Catholic Edition (NRSVACE)", value: "NRSVACE" },
  { label: "Orthodox Jewish Bible (OJB)", value: "OJB" },
  { label: "Revised Geneva Translation (RGT)", value: "RGT" },
  { label: "The Voice (VOICE)", value: "VOICE" },
  { label: "World English Bible (WEB)", value: "WEB" },
  { label: "Worldwide English (New Testament) (WE)", value: "WE" },
  { label: "Wycliffe Bible (WYC)", value: "WYC" },
  { label: "Young's Literal Translation (YLT)", value: "YLT" },
];

export default function BibleSearch() {
  const [verses, setVerses] = useState("");
  const [version, setVersion] = useState("");
  const [url, setUrl] = useState("");

  const handleFindVerses = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const verses = formData.get("verses"); // string | File | null
    const version = formData.get("version"); // string | File | null

    if (!verses || !version) return; // handle nulls
    if (typeof verses !== "string" || typeof version !== "string") return; // ensure strings

    setUrl(
      `https://www.biblegateway.com/passage/?search=${encodeURIComponent(verses)}&version=${version}&interface=print`
    );
  };

  return (
    <Container maxWidth={false} sx={{ py: 2 }}>
      <GridRow>
        <GridCol sx={{ display: "flex", justifyContent: "center" }}>
          <Box component={"form"} onSubmit={handleFindVerses}>
            <Stack direction={"row"} spacing={1} width={680}>
              <TextField
                fullWidth
                size="small"
                type="search"
                name="verses"
                value={verses}
                onChange={({ target }) => setVerses(target.value)}
              />
              <FormControl fullWidth size="small">
                <Select name="version" value={version} onChange={({ target }) => setVersion(target.value)}>
                  {versions.map((v) => (
                    <MenuItem key={v.value} value={v.value}>
                      {v.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button variant="contained" type="submit">
                Find
              </Button>
            </Stack>
          </Box>
        </GridCol>
        <GridCol>
          <Box className="iframe-holder">
            <Box component={"iframe"} src={url} title="Bible Gateway" loading="lazy" className="iframe" />
          </Box>
        </GridCol>
      </GridRow>
    </Container>
  );
}
