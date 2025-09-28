"use client";

import { GridCol, GridRow } from "@/app/_components/grids";
import { Box, Button, FormControl, MenuItem, Select, Stack, TextField } from "@mui/material";
import { FormEvent, useState } from "react";

const versions = [
  { label: "English Standard Version (ESV)", value: "ESV" },
  { label: "New International Version (NIV)", value: "NIV" },
  { label: "King James Version (KJV)", value: "KJV" },
  { label: "New King James Version (NKJV)", value: "NKJV" },
  { label: "New Living Translation (NLT)", value: "NLT" },
  { label: "Tree of Life Version (TLV)", value: "TLV" },
  { label: "The Message (MSG)", value: "MSG" },
  { label: "Modern English Version (MEV)", value: "MEV" },
  { label: "Legacy Standard Bible (LSB)", value: "LSB" },
  { label: "Lexham English Bible (LEB)", value: "LEB" },
  { label: "Living Bible (TLB)", value: "TLB" },
  { label: "Names of God Bible (NOG)", value: "NOG" },
  { label: "New American Bible Revised Edition (NABRE)", value: "NABRE" },
  { label: "New American Standard Bible (NASB)", value: "NASB" },
  { label: "New American Standard Bible 1995 (NASB1995)", value: "NASB1995" },
  { label: "New English Translation (NET)", value: "NET" },
  { label: "New International Reader's Version (NIRV)", value: "NIRV" },
  { label: "New Life Version (NLV)", value: "NLV" },
  { label: "Revised Geneva Translation (RGT)", value: "RGT" },
  { label: "Young's Literal Translation (YLT)", value: "YLT" },
  { label: "Ang Biblia, 1978 (ABTAG1978)", value: "ABTAG1978" },
  { label: "Ang Biblia, 2001 (ABTAG2001)", value: "ABTAG2001" },
  { label: "Ang Salita ng Dios, Tagalog Contemporary Bible (ASND) ", value: "ASND" },
  { label: "Ang Salita ng Diyos (SND)", value: "SND" },
  { label: "Magandang Balita Biblia (MBBTAG)", value: "MBBTAG" },
];

export default function BibleSearch() {
  const [verses, setVerses] = useState("");
  const [version, setVersion] = useState("MBBTAG");
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
    <GridRow>
      <GridCol>
        <Box component={"form"} onSubmit={handleFindVerses}>
          <Stack direction={"row"} spacing={1} width={880}>
            <FormControl fullWidth size="small">
              <Select name="version" value={version} onChange={({ target }) => setVersion(target.value)}>
                {versions.map((v) => (
                  <MenuItem key={v.value} value={v.value}>
                    {v.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              size="small"
              type="search"
              name="verses"
              value={verses}
              onChange={({ target }) => setVerses(target.value)}
            />
            <Button variant="contained" type="submit">
              Find
            </Button>
          </Stack>
        </Box>
      </GridCol>
      <GridCol>
        <Box className="iframe-holder">
          <Box component={"iframe"} src={url || undefined} title="Bible Gateway" loading="lazy" className="iframe" />
        </Box>
      </GridCol>
    </GridRow>
  );
}
