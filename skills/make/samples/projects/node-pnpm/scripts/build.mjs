#!/usr/bin/env node
// make skill sample (node-pnpm): minimal zero-dependency "build".
//
// Not a bundler. Copies a package's src/ tree verbatim into dist/ and
// prepends a build banner. This is enough to give the sample a real file
// output that `make clean` has something to remove, without adding a
// bundler dependency the sample does not otherwise need. dist/ is removed
// and regenerated on every run, so a source file that was deleted or
// renamed never leaves a stale built copy behind (which Turborepo would
// otherwise cache as well).
//
// Usage: node <repo>/scripts/build.mjs <package-dir>
// Exit code: 0 on success, 2 on bad usage, missing src/, a package outside
// this sample's root (e.g. packages/<name> symlinked to another checkout),
// or a symlinked dist/ (refused rather than followed).

import { readdirSync, mkdirSync, readFileSync, writeFileSync, statSync, lstatSync, realpathSync, rmSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

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

// dist/ is fully regenerated output, so it is removed before copying. That
// removal must never reach outside this sample: the package's real path must
// be inside the sample root (resolved from this file's location, like
// scripts/clean.mjs), which rejects a packages/<name> symlinked elsewhere,
// and a symlinked dist/ is refused instead of being followed.
const sampleRoot = realpathSync(join(dirname(fileURLToPath(import.meta.url)), ".."));
const pkgReal = realpathSync(pkgDir);
if (pkgReal !== sampleRoot && !pkgReal.startsWith(sampleRoot.endsWith(sep) ? sampleRoot : sampleRoot + sep)) {
  console.error(`build: ${pkgDir} resolves outside ${sampleRoot}; refusing to replace its dist/`);
  process.exit(2);
}
let distStat = null;
try {
  distStat = lstatSync(distDir);
} catch (err) {
  if (err.code !== "ENOENT") throw err;
}
if (distStat?.isSymbolicLink()) {
  console.error(`build: ${distDir} is a symlink; refusing to replace it`);
  process.exit(2);
}
rmSync(distDir, { recursive: true, force: true });

copyTree(srcDir, distDir);
console.log(`build: wrote ${distDir}`);
