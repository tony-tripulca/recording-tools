import { exec } from "child_process";
import { randomUUID } from "crypto";
import fs from "fs";
import { NextResponse } from "next/server";

// Helper to run shell command (ffmpeg)
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
    // Parse multipart form-data (file + format)
    const formData = await req.formData();
    const file = formData.get("file"); // uploaded file
    const format = formData.get("format"); // target format (mp3/mp4/mkv)

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Save uploaded file to /tmp
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const inputPath = `/tmp/${randomUUID()}-${file.name}`;
    fs.writeFileSync(inputPath, buffer);

    // Generate output path
    const base = inputPath.replace(/\.[^/.]+$/, "");
    const outputPath = `${base}.${format}`;

    // Run ffmpeg (basic conversion)
    const cmd = `ffmpeg -i "${inputPath}" "${outputPath}"`;
    await runCommand(cmd);

    // Read converted file back
    const converted = fs.readFileSync(outputPath);

    // Return file as response
    return new NextResponse(converted, {
      status: 200,
      headers: {
        "Content-Type": `video/${format}`, // or audio/mp3 if mp3
        "Content-Disposition": `attachment; filename="converted.${format}"`,
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
