// inspect-repo が使う静的ディレクトリ走査ユーティリティ。
// node_modules・target・.git 等の巨大ディレクトリを走査対象から除外し、深さ・件数を制限する。
// symlink は辿らない（対象外へのエスケープを防ぐ）。ファイル内容は読まない。
import { readdirSync, statSync, lstatSync } from "node:fs";
import { join, basename } from "node:path";

export const DEFAULT_MAX_DEPTH = 6;
export const DEFAULT_MAX_ENTRIES = 5000;

// 走査自体をスキップするディレクトリ名（内容を見る意味がない・巨大・生成物）
const SKIP_DIR_NAMES = new Set([
  "node_modules",
  "target",
  ".git",
  "dist",
  "build",
  ".turbo",
  ".cache",
  "coverage",
  ".next",
  ".venv",
  "vendor",
]);

// ファイル名パターン：中身は絶対に読まない。存在と場所だけを findings に記録する。
const SECRET_LIKE_PATTERNS = [
  /^\.env(\..+)?$/i,
  /credentials/i,
  /\.pem$/i,
  /^id_rsa$/,
  /^id_ed25519$/,
  /\.key$/i,
  /\.pfx$/i,
  /secrets?\.(ya?ml|json|toml)$/i,
];

export function isSecretLikeName(name) {
  return SECRET_LIKE_PATTERNS.some((re) => re.test(name));
}

/**
 * root 配下を静的に走査する。ファイル内容は一切読まない（stat 情報のみ）。
 * @param {string} root
 * @param {object} [opts]
 * @param {number} [opts.maxDepth]
 * @param {number} [opts.maxEntries]
 * @returns {{entries: Array<{path:string, type:"file"|"dir", depth:number}>, truncated: boolean, skippedDirs: string[]}}
 */
export function scanTree(root, { maxDepth = DEFAULT_MAX_DEPTH, maxEntries = DEFAULT_MAX_ENTRIES } = {}) {
  const entries = [];
  const skippedDirs = [];
  let truncated = false;

  function walk(dir, depth) {
    if (truncated) return;
    if (depth > maxDepth) {
      skippedDirs.push(dir);
      return;
    }
    let list;
    try {
      list = readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const dirent of list) {
      if (entries.length >= maxEntries) {
        truncated = true;
        return;
      }
      const full = join(dir, dirent.name);
      // symlink は辿らない（対象外への脱出を防ぐ）。symlink 自体の存在は記録する。
      let isSymlink = false;
      try {
        isSymlink = lstatSync(full).isSymbolicLink();
      } catch {
        continue;
      }
      if (isSymlink) {
        entries.push({ path: full, type: "symlink", depth });
        continue;
      }
      if (dirent.isDirectory()) {
        if (SKIP_DIR_NAMES.has(dirent.name)) {
          skippedDirs.push(full);
          continue;
        }
        entries.push({ path: full, type: "dir", depth });
        walk(full, depth + 1);
      } else if (dirent.isFile()) {
        entries.push({ path: full, type: "file", depth });
      }
    }
  }

  walk(root, 0);
  return { entries, truncated, skippedDirs };
}

export function statSafe(p) {
  try {
    return statSync(p);
  } catch {
    return null;
  }
}

export { basename };
