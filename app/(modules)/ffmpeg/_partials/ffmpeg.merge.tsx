"use client";

import { GridCol, GridRow } from "@/app/_components/grids";
import { Button, Container, Input, Stack, Typography } from "@mui/material";
import moment from "moment";
import { ChangeEvent, useState } from "react";

export default function FfmpegMerge() {
  const [files, setFiles] = useState<File[]>([]);
  const [format, setFormat] = useState("");
  const [resolution, setResolution] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFiles = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.currentTarget.files || []);

    const sortedFiles = selectedFiles.sort((a, b) => a.name.localeCompare(b.name));

    if (!selectedFiles.length) {
      alert("No files selected");
      return;
    }

    // Validate all are videos
    const allVideos = selectedFiles.every((f) => f.type.startsWith("video/"));
    if (!allVideos) {
      alert("Please select only video files");
      return;
    }

    setFiles(sortedFiles);
  };

  const handleUpload = async () => {
    if (files.length < 2) {
      return alert("Select at least 2 videos to merge");
    }

    setLoading(true);

    const formData = new FormData();
    files.forEach((file, idx) => {
      formData.append(`file${idx + 1}`, file);
    });
    formData.append("format", format); // or let user choose
    formData.append("resolution", resolution); // optional

    try {
      const res = await fetch("/api/ffmpeg/merge", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const date = moment();
      const filename = `${date.format("YYYYMMDDTHHmmss")}-merged.${format}`;

      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error merging files:", err);
    }

    setLoading(false);
  };

  const formats = [
    { label: "MP4", value: "mp4" },
    { label: "MKV", value: "mkv" },
  ];

  const resolutions = [
    { label: "1280x720", value: "1280x720" },
    { label: "1920x1080", value: "1920x1080" },
  ];

  return (
    <Container maxWidth={false}>
      <GridRow>
        <GridCol>
          <Button component="label" role={undefined} variant="contained" tabIndex={-1}>
            Select files
            <Input type="file" onChange={handleFiles} className="input-upload" inputProps={{ multiple: true }} />
          </Button>
        </GridCol>
        <GridCol>
          <Stack spacing={1}>
            {files?.map((f, i) => (
              <Typography key={i} variant="subtitle1" fontWeight="bold">
                {f?.name}
              </Typography>
            ))}
          </Stack>
        </GridCol>
        <GridCol>
          <Typography variant="caption">Format</Typography>
          <Stack direction={"row"} spacing={1}>
            {formats.map((item, i) => (
              <Button
                variant={format === item.value ? "contained" : "outlined"}
                key={i}
                onClick={() => setFormat(item.value)}
              >
                {item.label}
              </Button>
            ))}
          </Stack>
        </GridCol>
        <GridCol>
          <Typography variant="caption">Resolution</Typography>
          <Stack direction={"row"} spacing={1}>
            {resolutions.map((item, i) => (
              <Button
                variant={resolution === item.value ? "contained" : "outlined"}
                key={i}
                onClick={() => setResolution(item.value)}
              >
                {item.label}
              </Button>
            ))}
          </Stack>
        </GridCol>
        <GridCol>
          <Stack direction={"row"} spacing={1}>
            <Button variant="contained" onClick={handleUpload} loading={loading}>
              Merge & Download
            </Button>
          </Stack>
        </GridCol>
      </GridRow>
    </Container>
  );
}
