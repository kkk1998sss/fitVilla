/**
 * Checks that all image and video paths used by the site exist under public/.
 * Run from project root: node scripts/check-assets.js
 * To create missing files: npm run copy-assets (with Fitvilla photos folder).
 */

const fs = require("fs");
const path = require("path");

const PUBLIC = path.join(__dirname, "..", "public");

// Every file the site references (images + videos)
const allRequired = [
  "images/logo/fitvilla-logo.png",
  "images/hero/hero-1.jpg",
  "images/hero/hero-2.jpg",
  "images/hero/hero-3.jpg",
  "images/hero/hero-4.jpg",
  "images/hero/hero-5.jpg",
  "images/hero/hero-6.jpg",
  "images/hero/hero-7.jpg",
  "images/hero/hero-8.jpg",
  "images/hero/hero-9.jpg",
  "images/hero/athlete-female.png",
  "images/hero/athlete-male.png",
  "images/locations/sector-76.jpg",
  "images/locations/sector-133.jpg",
  "images/locations/mayur-vihar.jpg",
  "images/experience/experience.jpg",
  "videos/hero.mp4",
  "videos/card-1.mp4",
  "videos/card-2.mp4",
  "videos/card-3.mp4",
];

const missing = allRequired.filter((rel) => !fs.existsSync(path.join(PUBLIC, rel)));
const ok = allRequired.length - missing.length;

console.log("--- Asset check (public/) ---\n");
console.log("Files used by the site:", ok + "/" + allRequired.length);

if (missing.length > 0) {
  console.log("Missing:\n  " + missing.join("\n  "));
  console.log("\nRun: npm run copy-assets (with Fitvilla photos folder), then re-run this check.");
  process.exit(1);
}

console.log("All assets present.\n");
process.exit(0);
