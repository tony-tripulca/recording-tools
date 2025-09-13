"use client";

import { IFileInfo } from "@/app/(modules)/ffmpeg/type";
import { GridCol, GridRow } from "@/app/_components/grids";
import { Button, Container, Input, Stack, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";

export default function FfmpegConvert() {
  const [file, setFile] = useState<File | null | undefined>(null);
  const [file_info, setFileInfo] = useState<IFileInfo | null>(null);
  const [format, setFormat] = useState("");

  const handleFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (!file) {
      alert("No file selected");
      return;
    }

    setFile(file);

    // Build formData
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Call your /api/file-info route
      const res = await fetch("/api/ffmpeg/info", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const info = await res.json();
      setFileInfo(info);
    } catch (err) {
      console.error("Error fetching file info:", err);
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("No file(s)");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("format", format);

    const res = await fetch("/api/ffmpeg/convert", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      // Download file automatically
      const a = document.createElement("a");
      a.href = url;
      a.download = `converted.${format}`; // match your format
      a.click();
    }
  };

  const formats = [
    { label: "MP3", value: "mp3" },
    { label: "MP4", value: "mp4" },
    { label: "MKV", value: "mkv" },
  ];

  return (
    <Container maxWidth={false}>
      <GridRow>
        <GridCol>
          <Button component="label" role={undefined} variant="contained" tabIndex={-1}>
            Select file
            <Input type="file" onChange={handleFile} className="input-upload" />
          </Button>
        </GridCol>
        <GridCol>
          <Stack spacing={1}>
            <Typography variant="subtitle1" fontWeight="bold">
              {file?.name}
            </Typography>

            {file_info && (
              <>
                <Typography variant="body2">Format: {file_info.format}</Typography>
                <Typography variant="body2">Duration: {file_info.duration}s</Typography>
                <Typography variant="body2">Size: {(file_info.size / 1024 / 1024).toFixed(2)} MB</Typography>

                {file_info.video && (
                  <Stack spacing={0.5} pl={2}>
                    <Typography variant="subtitle2">🎥 Video</Typography>
                    <Typography variant="body2">
                      Codec: {file_info.video.codec} ({file_info.video.codec_params})
                    </Typography>
                    <Typography variant="body2">Resolution: {file_info.video.resolution}</Typography>
                    <Typography variant="body2">Framerate: {file_info.video.framerate} fps</Typography>
                  </Stack>
                )}

                {file_info.audio && (
                  <Stack spacing={0.5} pl={2}>
                    <Typography variant="subtitle2">🎵 Audio</Typography>
                    <Typography variant="body2">
                      Codec: {file_info.audio.codec} ({file_info.audio.codec_params})
                    </Typography>
                    <Typography variant="body2">Sample rate: {file_info.audio.sample_rate} Hz</Typography>
                    <Typography variant="body2">Channels: {file_info.audio.channels}</Typography>
                  </Stack>
                )}
              </>
            )}
          </Stack>
        </GridCol>

        <GridCol>
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
          <Stack direction={"row"} spacing={1}>
            <Button variant="contained" onClick={handleUpload}>
              Convert & Download
            </Button>
          </Stack>
        </GridCol>
      </GridRow>
    </Container>
  );
}
