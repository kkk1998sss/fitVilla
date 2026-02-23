/**
 * Copies only the images and videos currently used by the site from the
 * "Fitvilla photos" Google Drive folder into public/. Keeps repo small for git push.
 *
 * In-use assets copied:
 *   Videos: hero.mp4, card-1.mp4, card-2.mp4, card-3.mp4 (from Raw vids)
 *   Images: hero-1..hero-9, sector-76/sector-133/mayur-vihar, experience.jpg
 *   Logo and athlete cutouts: add manually to public/images/logo and public/images/hero if needed.
 *
 * Usage:
 *   1. Download the Fitvilla photos folder from Google Drive to your Downloads folder.
 *   2. From the fitvilla directory run:  npm run copy-assets
 *   Or set the path:  FITVILLA_DRIVE_PATH="C:\path\to\Fitvilla photos" npm run copy-assets
 */

const fs = require("fs");
const path = require("path");

const PROJECT_ROOT = path.resolve(__dirname, "..");
const PUBLIC = path.join(PROJECT_ROOT, "public");

function getSourceDir() {
  const env = process.env.FITVILLA_DRIVE_PATH;
  if (env) return path.resolve(env);
  const home = process.env.USERPROFILE || process.env.HOME || "";
  const downloads = path.join(home, "Downloads", "Fitvilla photos");
  const local = path.join(PROJECT_ROOT, "Fitvilla photos");
  if (fs.existsSync(downloads)) return downloads;
  if (fs.existsSync(local)) return local;
  return downloads; // default for message
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function copyFile(src, dest) {
  if (!fs.existsSync(src)) return false;
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
  console.log("  Copied:", path.basename(src), "->", path.relative(PROJECT_ROOT, dest));
  return true;
}

function main() {
  const source = getSourceDir();
  console.log("Source folder:", source);

  if (!fs.existsSync(source)) {
    console.error("\nFolder not found. Either:");
    console.error("  1. Download 'Fitvilla photos' from Google Drive to your Downloads folder, or");
    console.error("  2. Set FITVILLA_DRIVE_PATH to the full path of the folder.");
    console.error("\nExample (PowerShell): $env:FITVILLA_DRIVE_PATH='C:\\Users\\You\\Downloads\\Fitvilla photos'; npm run copy-assets");
    process.exit(1);
  }

  const files = fs.readdirSync(source, { withFileTypes: true });
  const imageNames = files.filter((f) => f.isFile() && /\.(jpg|jpeg|png|JPG|JPEG|PNG)$/.test(f.name)).map((f) => f.name).sort();
  const rawVidsPath = path.join(source, "Raw vids");
  const hasRawVids = fs.existsSync(rawVidsPath) && fs.statSync(rawVidsPath).isDirectory();

  let copied = 0;

  // 1. Videos from Raw vids (only in-use: hero + 3 card videos)
  if (hasRawVids) {
    const vidDir = fs.readdirSync(rawVidsPath, { withFileTypes: true });
    const videoFiles = vidDir.filter((f) => f.isFile() && /\.(mp4|mov|webm|MP4|MOV|WEBM)$/i.test(f.name));
    const byName = Object.fromEntries(videoFiles.map((f) => [f.name.toUpperCase(), f.name]));
    const cardNames = ["C3630.MP4", "C3631.MP4", "C3632.MP4"];

    const heroFile = videoFiles.find((f) => !cardNames.includes(f.name.toUpperCase())) || videoFiles[0];
    if (heroFile && copyFile(path.join(rawVidsPath, heroFile.name), path.join(PUBLIC, "videos", "hero.mp4"))) copied++;

    cardNames.forEach((name, i) => {
      const actualName = byName[name.toUpperCase()] || name;
      const src = path.join(rawVidsPath, actualName);
      if (copyFile(src, path.join(PUBLIC, "videos", `card-${i + 1}.mp4`))) copied++;
    });
  }

  // 2. Hero images (first 9 only – used by features + video cards + hero poster) -> public/images/hero/hero-1.jpg ... hero-9.jpg
  ensureDir(path.join(PUBLIC, "images", "hero"));
  for (let i = 0; i < Math.min(9, imageNames.length); i++) {
    const name = imageNames[i];
    const ext = path.extname(name).toLowerCase();
    const dest = path.join(PUBLIC, "images", "hero", `hero-${i + 1}${ext === ".png" ? ".png" : ".jpg"}`);
    if (copyFile(path.join(source, name), dest)) copied++;
  }

  // 3. Location images (next 3 – sector-76, sector-133, mayur-vihar) -> sector-76, sector-133, mayur-vihar
  ensureDir(path.join(PUBLIC, "images", "locations"));
  const locationSlugs = ["sector-76", "sector-133", "mayur-vihar"];
  for (let i = 0; i < 3; i++) {
    const idx = 9 + i;
    if (idx >= imageNames.length) break;
    const name = imageNames[idx];
    const ext = path.extname(name).toLowerCase();
    const dest = path.join(PUBLIC, "images", "locations", `${locationSlugs[i]}${ext === ".png" ? ".png" : ".jpg"}`);
    if (copyFile(path.join(source, name), dest)) copied++;
  }

  // 4. Experience section (one image – in-use only)
  ensureDir(path.join(PUBLIC, "images", "experience"));
  if (imageNames.length > 0) {
    const idx = Math.min(12, imageNames.length - 1);
    const name = imageNames[idx];
    const ext = path.extname(name).toLowerCase();
    if (copyFile(path.join(source, name), path.join(PUBLIC, "images", "experience", `experience${ext === ".png" ? ".png" : ".jpg"}`))) copied++;
  }

  console.log("\nDone. Copied", copied, "file(s). Restart or refresh the app to see them.");
}

main();
