import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const DIR = "src/assets";
const MAX_WIDTH = 1400;
const QUALITY = 78;

const kb = (n) => `${Math.round(n / 1024)} KB`;

for (const file of await readdir(DIR)) {
  if (!/\.(jpe?g)$/i.test(file)) continue;

  const full = path.join(DIR, file);
  const input = await readFile(full);
  const output = await sharp(input)
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toBuffer();

  if (output.length < input.length) {
    await writeFile(full, output);
    console.log(`✔ ${file}: ${kb(input.length)} → ${kb(output.length)}`);
  } else {
    console.log(`· ${file}: ya estaba optimizada (${kb(input.length)})`);
  }
}