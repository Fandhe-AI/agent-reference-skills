#!/usr/bin/env node
// make skill sample (node-pnpm): minimal zero-dependency "build".
//
// Not a bundler. Copies a package's src/ tree verbatim into dist/ and
// prepends a build banner. This is enough to give the sample a real file
// output that `make clean` has something to remove, without adding a
// bundler dependency the sample does not otherwise need.
//
// Usage: node <repo>/scripts/build.mjs <package-dir>
// Exit code: 0 on success, 2 on bad usage or missing src/.

import { readdirSync, mkdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const pkgDir = process.argv[2];
if (!pkgDir) {
  console.error("usage: node scripts/build.mjs <package-dir>");
  process.exit(2);
}

const srcDir = join(pkgDir, "src");
const distDir = join(pkgDir, "dist");

let srcStat;
try {
  srcStat = statSync(srcDir);
} catch {
  console.error(`build: no src/ directory under ${pkgDir}`);
  process.exit(2);
}
if (!srcStat.isDirectory()) {
  console.error(`build: ${srcDir} is not a directory`);
  process.exit(2);
}

function copyTree(from, to) {
  mkdirSync(to, { recursive: true });
  for (const entry of readdirSync(from, { withFileTypes: true })) {
    if (entry.isSymbolicLink()) continue;
    const src = join(from, entry.name);
    const dst = join(to, entry.name);
    if (entry.isDirectory()) {
      copyTree(src, dst);
      continue;
    }
    if (!entry.isFile()) continue;
    const contents = readFileSync(src, "utf8");
    const banner = `// built by scripts/build.mjs from ${relative(pkgDir, src)} -- do not edit\n`;
    writeFileSync(dst, banner + contents);
  }
}

copyTree(srcDir, distDir);
console.log(`build: wrote ${distDir}`);
