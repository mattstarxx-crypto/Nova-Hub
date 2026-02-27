// postinstall — copies uv.config.js into public/uv
// (all other UV files are served directly from node_modules via server.js)
import { copyFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicUv = join(__dirname, "../public/uv");

if (!existsSync(publicUv)) mkdirSync(publicUv, { recursive: true });

// Copy our custom uv.config.js into public/uv
const src = join(__dirname, "../public/uv/uv.config.js");
if (existsSync(src)) {
  console.log("✓ uv.config.js already in place");
} else {
  console.warn("⚠ uv.config.js missing from public/uv — make sure it exists");
}

console.log("✅ postinstall complete");
