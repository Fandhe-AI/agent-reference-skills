#!/usr/bin/env node
// make skill sample (mixed): fail-closed "clean" for the Node side.
//
// Removes only this sample's regeneratable paths (listed in the constants
// below). A plain `rm -rf packages/*/dist` is not safe enough for that:
// rm does not follow a symlink that is itself the operand, but it does
// follow symlinks in the operand's intermediate path components, so if
// packages/foo is a symlink to another checkout, `rm -rf packages/foo/dist`
// deletes that other checkout's dist/.
//
// This script therefore checks every candidate before deleting anything:
// each path component below the sample root (and the candidate itself)
// must not be a symlink, and its real path must stay inside the root. If
// any candidate fails the check, nothing at all is deleted and the script
// exits 1 (fail-closed, like the rust-crate sample refusing a symlinked
// target/). This is a guard against symlinks that already exist, not
// against a concurrent process swapping paths while the script runs.
//
// The sample root is resolved from this file's own location, not from the
// caller's cwd, so `make clean` and `node scripts/clean.mjs` behave the same.
//
// Usage: node scripts/clean.mjs (no arguments)
// Exit code: 0 on success (including nothing to remove), 1 if refused
// (nothing deleted), 2 on bad usage.

import { lstatSync, readdirSync, realpathSync, rmSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

// Paths relative to the sample root, removed when present.
const ROOT_PATHS = ["node_modules", "packages/web/generated"];
// Removed under every entry of PACKAGES_DIR (the `packages/*` glob).
const PACKAGES_DIR = "packages";
const PER_PACKAGE_PATHS = ["node_modules", "dist"];
// Checked the same way but never removed by this script: the Makefile
// removes target/ afterwards with `cargo clean --target-dir target`, so a
// symlinked target/ (possibly a shared build directory) aborts the whole
// clean before anything is deleted.
const GUARD_ONLY_PATHS = ["target"];

if (process.argv.length > 2) {
  console.error("usage: node scripts/clean.mjs (no arguments)");
  process.exit(2);
}

const root = realpathSync(join(dirname(fileURLToPath(import.meta.url)), ".."));
const violations = [];

function lstatOrNull(p) {
  try {
    return lstatSync(p);
  } catch (err) {
    if (err.code === "ENOENT" || err.code === "ENOTDIR") return null;
    throw err;
  }
}

function isInsideRoot(p) {
  return p === root || p.startsWith(root.endsWith(sep) ? root : root + sep);
}

// Returns the absolute path to remove, or null when there is nothing to
// remove. Records a violation (and returns null) when any component below
// the root is a symlink or resolves outside the root.
function checkCandidate(rel) {
  let current = root;
  const parts = rel.split("/");
  for (const [i, part] of parts.entries()) {
    current = join(current, part);
    let st;
    try {
      st = lstatOrNull(current);
    } catch (err) {
      violations.push(`${rel}: cannot inspect ${relative(root, current)} (${err.code ?? "UNKNOWN"})`);
      return null;
    }
    if (st === null) return null;
    if (st.isSymbolicLink()) {
      violations.push(`${rel}: ${relative(root, current)} is a symlink`);
      return null;
    }
    if (i < parts.length - 1 && !st.isDirectory()) return null;
  }
  if (!isInsideRoot(realpathSync(current))) {
    violations.push(`${rel}: resolves outside ${root}`);
    return null;
  }
  return current;
}

function packageCandidates() {
  const dir = checkCandidate(PACKAGES_DIR);
  if (dir === null) return [];
  let entries;
  try {
    entries = readdirSync(dir);
  } catch (err) {
    violations.push(`${PACKAGES_DIR}: cannot list (${err.code ?? "UNKNOWN"})`);
    return [];
  }
  return entries.flatMap((name) => PER_PACKAGE_PATHS.map((p) => `${PACKAGES_DIR}/${name}/${p}`));
}

const toRemove = [];
for (const rel of [...ROOT_PATHS, ...packageCandidates()]) {
  const abs = checkCandidate(rel);
  if (abs !== null) toRemove.push({ rel, abs });
}
for (const rel of GUARD_ONLY_PATHS) checkCandidate(rel);

if (violations.length > 0) {
  for (const v of violations) console.error(`clean: ${v}`);
  console.error("clean: refusing to delete anything (a path would leave this sample's root)");
  process.exit(1);
}

for (const { rel, abs } of toRemove) {
  rmSync(abs, { recursive: true, force: true });
  console.log(`clean: removed ${rel}`);
}
