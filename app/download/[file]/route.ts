import { readFile } from "node:fs/promises";
import path from "node:path";

const files = {
  almahy: "Almahy_Company_Profile_V03.1.pdf",
  althakeel: "Al_Thakeel_Company_Profile_3.1.pdf",
} as const;

type FileId = keyof typeof files;

function isFileId(value: string): value is FileId {
  return Object.prototype.hasOwnProperty.call(files, value);
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ file: string }> },
) {
  const { file } = await context.params;

  if (!isFileId(file)) {
    return new Response("Not found", { status: 404 });
  }

  const filename = files[file];
  const buffer = await readFile(
    path.join(process.cwd(), "public", "images", "media", filename),
  );

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Content-Length": String(buffer.byteLength),
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
