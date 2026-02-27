const fs = require("fs");
const path = require("path");

const uvDist = path.join(__dirname, "../node_modules/ultraviolet/dist");
const uvOut  = path.join(__dirname, "../public/uv");

// Make sure output dir exists
if (!fs.existsSync(uvOut)) fs.mkdirSync(uvOut, { recursive: true });

// Files to copy from UV dist
const files = [
  "uv.bundle.js",
  "uv.config.js",
  "uv.handler.js",
  "uv.sw.js",
];

let copied = 0;
for (const file of files) {
  const src = path.join(uvDist, file);
  const dst = path.join(uvOut, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dst);
    console.log(`✓ Copied ${file}`);
    copied++;
  } else {
    console.warn(`⚠ Not found: ${file} (check UV dist folder)`);
  }
}

console.log(`\n✅ Nova Hub assets ready (${copied}/${files.length} files copied)`);
