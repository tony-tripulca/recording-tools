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
    const file = formData.get("file");
    const multiplier = formData.get("multiplier") || "2.0"; // default 2x

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Save file to /tmp
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const inputPath = `/tmp/${randomUUID()}-${file.name}`;
    fs.writeFileSync(inputPath, buffer);

    // Output path (same extension)
    const ext = file.name.split(".").pop();
    const base = file.name.replace(/\.[^/.]+$/, "");
    const outputPath = `/tmp/${randomUUID()}-${base}-boosted.${ext}`;

    // Run ffmpeg to boost audio volume
    const cmd = `ffmpeg -i "${inputPath}" -filter:a "volume=${multiplier}" -c:v copy "${outputPath}" -y`;
    await runCommand(cmd);

    // Read the boosted file
    const boostedFile = fs.readFileSync(outputPath);

    // Clean up
    fs.unlinkSync(inputPath);
    fs.unlinkSync(outputPath);

    // Return boosted file
    return new NextResponse(boostedFile, {
      status: 200,
      headers: {
        "Content-Type": "video/mp4", // adjust if you want dynamic type
        "Content-Disposition": `attachment; filename="${base}-boosted.${ext}"`,
      },
    });
  } catch (err) {
    console.error("Boost error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
