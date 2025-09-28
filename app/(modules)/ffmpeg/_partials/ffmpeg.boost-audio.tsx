"use client";

import { IFileInfo } from "@/app/(modules)/ffmpeg/type";
import { GridCol, GridRow } from "@/app/_components/grids";
import { Button, Input, Slider, Stack, Typography } from "@mui/material";
import moment from "moment";
import { ChangeEvent, useState } from "react";

export default function FfmpegBoostAudio() {
  const [file, setFile] = useState<File | null | undefined>(null);
  const [file_info, setFileInfo] = useState<IFileInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [multiplier, setMultiplier] = useState(1);

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

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("multiplier", multiplier.toString());

    const res = await fetch("/api/ffmpeg/boost-audio", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const date = moment();
      const extension = file.name.includes(".") ? file.name.slice(file.name.lastIndexOf(".") + 1) : "";
      const filename = `${date.format("YYYYMMDDTHHmmss")}-boosted-${multiplier}x.${extension}`;

      // Download file automatically
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    }

    setLoading(false);
  };

  const volumes = [
    { label: "1x", value: 1 },
    { label: "2x", value: 2 },
    { label: "3x", value: 3 },
    { label: "4x", value: 4 },
    { label: "5x", value: 5 },
    { label: "6x", value: 6 },
    { label: "7x", value: 7 },
    { label: "8x", value: 8 },
    { label: "9x", value: 9 },
    { label: "10x", value: 10 },
  ];

  return (
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
        <Typography variant="caption">Volume</Typography>
        <Slider
          value={multiplier}
          onChange={(_, value) => {
            // value can be number or number[]
            if (typeof value === "number") {
              setMultiplier(value);
            }
          }}
          valueLabelDisplay="auto"
          shiftStep={30}
          step={1}
          marks={volumes}
          min={1}
          max={10}
        />
      </GridCol>
      <GridCol>
        <Button variant="contained" onClick={handleUpload} loading={loading}>
          Boost & Download
        </Button>
      </GridCol>
    </GridRow>
  );
}
