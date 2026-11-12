import { readFile } from "node:fs/promises";
import path from "node:path";

const files = {
  almahy: { folder: "images/media", filename: "Almahy_Company_Profile_V03.1.pdf" },
  althakeel: { folder: "images/media", filename: "Al_Thakeel_Company_Profile_3.1.pdf" },
  "contact-almahy": { folder: "", filename: "Almathy.vcf" },
  "contact-amin-kamel": { folder: "contacts", filename: "Amin-Kamel.vcf" },
  "contact-dalia-khaled": { folder: "contacts", filename: "Dalia-Khaled.vcf" },
  "contact-maged-nafea": { folder: "contacts", filename: "Maged-Nafea.vcf" },
  "contact-camile-cunanan": { folder: "contacts", filename: "Camile-Cunanan.vcf" },
  "contact-ahmed-osama": { folder: "contacts", filename: "Ahmed-Osama.vcf" },
  "contact-nassef": { folder: "contacts", filename: "Nassef.vcf" },
  "contact-mariem-badawy": { folder: "contacts", filename: "Mariem-Badawy.vcf" },
} as const;

type FileId = keyof typeof files;

function isFileId(value: string): value is FileId {
  return Object.prototype.hasOwnProperty.call(files, value);
}

export async function GET(
  request: Request,
  context: { params: Promise<{ file: string }> },
) {
  const { file } = await context.params;
  const id = file.endsWith(".vcf") ? file.slice(0, -4) : file;

  if (!isFileId(id)) {
    return new Response("Not found", { status: 404 });
  }

  const item = files[id];
  const buffer = await readFile(
    path.join(process.cwd(), "public", item.folder, item.filename),
  );
  const isVcard = item.filename.endsWith(".vcf");
  const isIphone = /iPhone|iPad|iPod/i.test(request.headers.get("user-agent") || "");

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": isVcard ? "text/vcard; charset=utf-8" : "application/octet-stream",
      "Content-Disposition": `${isVcard && isIphone ? "inline" : "attachment"}; filename="${item.filename}"`,
      "Content-Length": String(buffer.byteLength),
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
