import { exec } from "child_process";
import { randomUUID } from "crypto";
import fs from "fs";
import { NextResponse } from "next/server";

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
    const formData = await req.formData();
    const file1 = formData.get("file1");
    const file2 = formData.get("file2");
    const format = formData.get("format") || "mp4"; // default mp4
    const resolution = formData.get("resolution") || "1280x720"; // force common res

    if (!file1 || !file2 || typeof file1 === "string" || typeof file2 === "string") {
      return NextResponse.json({ error: "Two video files are required" }, { status: 400 });
    }

    // Save files
    const saveFile = async (file) => {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const path = `/tmp/${randomUUID()}-${file.name}`;
      fs.writeFileSync(path, buffer);
      return path;
    };

    const input1 = await saveFile(file1);
    const input2 = await saveFile(file2);

    // Normalize both videos to same codec, resolution, fps, audio sample rate
    const norm1 = `/tmp/${randomUUID()}-norm1.mp4`;
    const norm2 = `/tmp/${randomUUID()}-norm2.mp4`;

    await runCommand(
      `ffmpeg -i "${input1}" -vf scale=${resolution} -r 30 -c:v libx264 -c:a aac -ar 48000 -ac 2 -preset fast -y "${norm1}"`
    );
    await runCommand(
      `ffmpeg -i "${input2}" -vf scale=${resolution} -r 30 -c:v libx264 -c:a aac -ar 48000 -ac 2 -preset fast -y "${norm2}"`
    );

    // Create concat list
    const concatList = `/tmp/${randomUUID()}-list.txt`;
    fs.writeFileSync(concatList, `file '${norm1}'\nfile '${norm2}'\n`);

    // Output path
    const outputPath = `/tmp/${randomUUID()}-merged.${format}`;

    // Concatenate
    await runCommand(`ffmpeg -f concat -safe 0 -i "${concatList}" -c copy "${outputPath}"`);

    // Read final merged file
    const merged = fs.readFileSync(outputPath);

    return new NextResponse(merged, {
      status: 200,
      headers: {
        "Content-Type": `video/${format}`,
        "Content-Disposition": `attachment; filename="merged.${format}"`,
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
