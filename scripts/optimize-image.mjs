import sharp from 'sharp';
import { readdirSync, mkdirSync, existsSync, statSync } from 'fs';
import path from 'path';

// ==== SESUAIKAN INI ====
// Tiap entry: folder sumber (foto asli) -> folder output (hasil optimasi).
// Struktur folder di dalamnya akan tetap dipertahankan (subfolder ikut kebawa).
const SOURCE_MAP = [
  { source: 'src/assets/raws', output: 'src/assets/optimize' },
  // tambahin baris lain sesuai folder-folder yang lo punya
];

const MAX_WIDTH = 1600;  // lebar maksimal (px)
const QUALITY = 78;      // kualitas webp, 75-80 itu sweet spot
// ========================

const VALID_EXT = ['.jpg', '.jpeg', '.png', '.webp'];

function walk(dir) {
  let files = [];
  for (const entry of readdirSync(dir)) {
    const fullPath = path.join(dir, entry);
    if (statSync(fullPath).isDirectory()) {
      files = files.concat(walk(fullPath));
    } else if (VALID_EXT.includes(path.extname(entry).toLowerCase())) {
      files.push(fullPath);
    }
  }
  return files;
}

async function optimizeFolder(sourceDir, outputDir) {
  if (!existsSync(sourceDir)) {
    console.warn(`⚠️  Lewati "${sourceDir}" — folder tidak ditemukan.`);
    return { before: 0, after: 0, count: 0 };
  }

  const files = walk(sourceDir);
  if (files.length === 0) {
    console.log(`(kosong) ${sourceDir}`);
    return { before: 0, after: 0, count: 0 };
  }

  console.log(`\n=== ${sourceDir} -> ${outputDir} ===`);

  let before = 0;
  let after = 0;

  for (const file of files) {
    const relative = path.relative(sourceDir, file);
    const outPath = path.join(outputDir, relative.replace(path.extname(relative), '.webp'));

    mkdirSync(path.dirname(outPath), { recursive: true });

    const sizeBefore = statSync(file).size;

    const image = sharp(file);
    const metadata = await image.metadata();

    const pipeline =
      metadata.width > MAX_WIDTH ? image.resize({ width: MAX_WIDTH }) : image;

    await pipeline.webp({ quality: QUALITY }).toFile(outPath);

    const sizeAfter = statSync(outPath).size;
    before += sizeBefore;
    after += sizeAfter;

    console.log(
      `  ${relative}  ${(sizeBefore / 1024).toFixed(0)}KB → ${(sizeAfter / 1024).toFixed(0)}KB ` +
      `(-${(100 - (sizeAfter / sizeBefore) * 100).toFixed(0)}%)`
    );
  }

  return { before, after, count: files.length };
}

async function run() {
  let totalBefore = 0;
  let totalAfter = 0;
  let totalCount = 0;

  for (const { source, output } of SOURCE_MAP) {
    const result = await optimizeFolder(source, output);
    totalBefore += result.before;
    totalAfter += result.after;
    totalCount += result.count;
  }

  console.log('\n=== SELESAI (SEMUA FOLDER) ===');
  console.log(`Total foto    : ${totalCount}`);
  console.log(`Total sebelum : ${(totalBefore / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Total sesudah : ${(totalAfter / 1024 / 1024).toFixed(2)} MB`);
  if (totalBefore > 0) {
    console.log(`Hemat         : ${(100 - (totalAfter / totalBefore) * 100).toFixed(1)}%`);
  }
}

run();