/**
 * Copies only the images and videos currently used by the site from the
 * "Fitvilla photos" Google Drive folder into public/. Keeps repo small for git push.
 *
 * In-use assets copied:
 *   Logo: fitvilla-logo.png (from root or logo/ in Drive)
 *   Hero: athlete-female.png, athlete-male.png (from root or hero/ in Drive), hero-1..hero-9.jpg
 *   Locations: sector-76, sector-133, mayur-vihar
 *   Experience: experience.jpg
 *   Videos: hero.mp4, card-1/2/3.mp4 (from Raw vids – not committed; use locally or host elsewhere for deploy)
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

  const sourceExists = fs.existsSync(source);
  if (!sourceExists) {
    console.log("  (Fitvilla photos folder not found – will only copy videos if public/videos/Raw vids exists)");
  }

  const files = sourceExists ? fs.readdirSync(source, { withFileTypes: true }) : [];
  const imageNames = files.filter((f) => f.isFile() && /\.(jpg|jpeg|png|JPG|JPEG|PNG)$/.test(f.name)).map((f) => f.name).sort();
  const rawVidsPathFromSource = sourceExists ? path.join(source, "Raw vids") : "";
  let rawVidsPath = rawVidsPathFromSource;
  let hasRawVids = rawVidsPath && fs.existsSync(rawVidsPath) && fs.statSync(rawVidsPath).isDirectory();
  if (!hasRawVids) {
    const publicRawVids = path.join(PUBLIC, "videos", "Raw vids");
    if (fs.existsSync(publicRawVids) && fs.statSync(publicRawVids).isDirectory()) {
      rawVidsPath = publicRawVids;
      hasRawVids = true;
      console.log("  Using videos from public/videos/Raw vids");
    }
  }
  const logoPath = sourceExists ? path.join(source, "logo") : "";
  const heroPath = sourceExists ? path.join(source, "hero") : "";
  const hasLogoDir = logoPath && fs.existsSync(logoPath) && fs.statSync(logoPath).isDirectory();
  const hasHeroDir = heroPath && fs.existsSync(heroPath) && fs.statSync(heroPath).isDirectory();

  function findImage(nameOrNames) {
    const names = Array.isArray(nameOrNames) ? nameOrNames : [nameOrNames];
    const lower = (s) => s.toLowerCase();
    for (const n of names) {
      const match = files.find((f) => f.isFile() && lower(f.name) === lower(n));
      if (match) return path.join(source, match.name);
      if (hasLogoDir) {
        const inLogo = fs.readdirSync(logoPath).find((f) => lower(f) === lower(n));
        if (inLogo) return path.join(logoPath, inLogo);
      }
      if (hasHeroDir) {
        const inHero = fs.readdirSync(heroPath).find((f) => lower(f) === lower(n));
        if (inHero) return path.join(heroPath, inHero);
      }
    }
    return null;
  }

  let copied = 0;

  // 0. Logo and athlete images (used in navbar, footer, hero)
  ensureDir(path.join(PUBLIC, "images", "logo"));
  ensureDir(path.join(PUBLIC, "images", "hero"));
  const logoSrc = findImage("fitvilla-logo.png");
  if (logoSrc && copyFile(logoSrc, path.join(PUBLIC, "images", "logo", "fitvilla-logo.png"))) copied++;
  const athleteFemaleSrc = findImage("athlete-female.png");
  if (athleteFemaleSrc && copyFile(athleteFemaleSrc, path.join(PUBLIC, "images", "hero", "athlete-female.png"))) copied++;
  const athleteMaleSrc = findImage("athlete-male.png");
  if (athleteMaleSrc && copyFile(athleteMaleSrc, path.join(PUBLIC, "images", "hero", "athlete-male.png"))) copied++;
  if (!logoSrc) console.log("  (Logo not found in Drive – add public/images/logo/fitvilla-logo.png manually for deploy)");
  if (!athleteFemaleSrc || !athleteMaleSrc) console.log("  (Athlete images – add athlete-female.png and athlete-male.png to public/images/hero/ if missing)");

  // 1. Videos from Raw vids (hero + 3 card videos)
  if (hasRawVids) {
    ensureDir(path.join(PUBLIC, "videos"));
    const vidDir = fs.readdirSync(rawVidsPath, { withFileTypes: true });
    const videoFiles = vidDir.filter((f) => f.isFile() && /\.(mp4|mov|webm|MP4|MOV|WEBM)$/i.test(f.name)).sort((a, b) => a.name.localeCompare(b.name));
    const byName = Object.fromEntries(videoFiles.map((f) => [f.name.toUpperCase(), f.name]));

    // Hero: use C3630.MP4 when present (smaller, can be committed to GitHub); else first video not used for cards
    const cardNamesForCards = ["C3631.MP4", "C3632.MP4", "C3633.MP4"];
    const heroName = byName["C3630.MP4"] || (videoFiles.find((f) => !cardNamesForCards.includes(f.name.toUpperCase())) || videoFiles[0]).name;
    const heroSrc = path.join(rawVidsPath, heroName);
    if (copyFile(heroSrc, path.join(PUBLIC, "videos", "hero.mp4"))) copied++;

    const cardNames = ["C3631.MP4", "C3632.MP4", "C3633.MP4"];
    const cardSources = [];
    for (const name of cardNames) {
      const actual = byName[name.toUpperCase()];
      if (actual) cardSources.push(path.join(rawVidsPath, actual));
    }
    if (cardSources.length < 3 && videoFiles.length >= 4) {
      cardSources.length = 0;
      for (let i = 1; i <= 3 && i < videoFiles.length; i++) cardSources.push(path.join(rawVidsPath, videoFiles[i].name));
    }
    cardSources.forEach((src, i) => {
      if (copyFile(src, path.join(PUBLIC, "videos", `card-${i + 1}.mp4`))) copied++;
    });
    if (videoFiles.length === 0) console.log("  (No video files in Raw vids – add .mp4/.mov to Raw vids and run again)");
  } else {
    console.log("  (No 'Raw vids' folder – create Fitvilla photos/Raw vids and add .mp4 files)");
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
