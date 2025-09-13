import { exec } from "child_process";
import { randomUUID } from "crypto";
import fs from "fs";
import { NextResponse } from "next/server";

// Helper: run shell command
function runCommand(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) return reject(error);
      resolve(stdout || stderr);
    });
  });
}

export async function POST(req) {
  try {
    // Parse multipart form-data
    const formData = await req.formData();
    const file = formData.get("file"); // uploaded file

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Save file to /tmp
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const inputPath = `/tmp/${randomUUID()}-${file.name}`;
    fs.writeFileSync(inputPath, buffer);

    // Run ffprobe to get JSON metadata
    const cmd = `ffprobe -v quiet -print_format json -show_format -show_streams "${inputPath}"`;
    const output = await runCommand(cmd);
    const metadata = JSON.parse(output);

    // Clean up file
    fs.unlinkSync(inputPath);

    // Extract useful info
    const videoStream = metadata.streams.find((s) => s.codec_type === "video");
    const audioStream = metadata.streams.find((s) => s.codec_type === "audio");

    const info = {
      format: metadata.format.format_long_name,
      duration: metadata.format.duration,
      size: metadata.format.size,
      video: videoStream
        ? {
            codec: videoStream.codec_name,
            codec_params: videoStream.codec_long_name,
            width: videoStream.width,
            height: videoStream.height,
            resolution: `${videoStream.width}x${videoStream.height}`,
            framerate: videoStream.r_frame_rate
              ? eval(videoStream.r_frame_rate) // convert "30/1" -> 30
              : null,
          }
        : null,
      audio: audioStream
        ? {
            codec: audioStream.codec_name,
            codec_params: audioStream.codec_long_name,
            sample_rate: audioStream.sample_rate,
            channels: audioStream.channels,
          }
        : null,
    };

    return NextResponse.json(info);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
