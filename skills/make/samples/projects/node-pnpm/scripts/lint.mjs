#!/usr/bin/env node
// make skill sample (node-pnpm): minimal zero-dependency "lint".
//
// This is deliberately not ESLint/Biome/etc. -- the sample keeps zero
// third-party lint dependencies so `pnpm install` stays deterministic and
// fast to verify. It does two real, deterministic checks per *.mjs file
// under each given package's src/ and test/ directories:
//
//   1. `node --check <file>` -- catches actual syntax errors (a real gate,
//      not an echo-only placeholder).
//   2. Rejects a literal `debugger;` statement left in source.
//
// Usage: node scripts/lint.mjs <package-dir> [<package-dir> ...]
// Exit code: 0 if every file passes both checks, 1 otherwise.
// stdout: one line per file checked. stderr: unexpected/internal errors only.

import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const targets = process.argv.slice(2);

if (targets.length === 0) {
  console.error("usage: node scripts/lint.mjs <package-dir> [<package-dir> ...]");
  process.exit(2);
}

const SCAN_SUBDIRS = ["src", "test"];
const SKIP_DIR_NAMES = new Set(["node_modules", "dist", "generated"]);

function collectMjsFiles(rootDir) {
  const files = [];
  const stack = [rootDir];
  while (stack.length > 0) {
    const dir = stack.pop();
    let entries;
    try {
      entries = readdirSync(dir, { withFileTypes: true });
    } catch (err) {
      if (err.code === "ENOENT") continue;
      throw err;
    }
    for (const entry of entries) {
      if (SKIP_DIR_NAMES.has(entry.name)) continue;
      const full = join(dir, entry.name);
      if (entry.isSymbolicLink()) continue; // do not follow symlinks out of the package
      if (entry.isDirectory()) {
        stack.push(full);
        continue;
      }
      if (entry.isFile() && entry.name.endsWith(".mjs")) {
        files.push(full);
      }
    }
  }
  return files.sort();
}

let failures = 0;
let checked = 0;

for (const pkgDir of targets) {
  let st;
  try {
    st = statSync(pkgDir);
  } catch {
    console.error(`lint: package dir not found: ${pkgDir}`);
    process.exit(2);
  }
  if (!st.isDirectory()) {
    console.error(`lint: not a directory: ${pkgDir}`);
    process.exit(2);
  }

  for (const sub of SCAN_SUBDIRS) {
    const files = collectMjsFiles(join(pkgDir, sub));
    for (const file of files) {
      checked += 1;
      const rel = relative(process.cwd(), file);

      try {
        execFileSync(process.execPath, ["--check", file], { stdio: "pipe" });
      } catch (err) {
        failures += 1;
        console.log(`FAIL ${rel}: syntax error`);
        if (err.stderr) process.stderr.write(err.stderr);
        continue;
      }

      const src = readFileSyncSafe(file);
      if (src !== null && /(^|[^.\w])debugger\s*;/.test(src)) {
        failures += 1;
        console.log(`FAIL ${rel}: leftover debugger; statement`);
        continue;
      }

      console.log(`PASS ${rel}`);
    }
  }
}

function readFileSyncSafe(file) {
  try {
    return readFileSync(file, "utf8");
  } catch {
    return null;
  }
}

console.log(`lint: ${checked} file(s) checked, ${failures} failure(s)`);
process.exit(failures > 0 ? 1 : 0);
