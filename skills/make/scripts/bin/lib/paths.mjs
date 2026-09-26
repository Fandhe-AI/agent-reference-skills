// root（対象プロジェクト）と Skill 自身の設置位置を分離するためのパス解決ユーティリティ。
// cwd や固定相対パスに依存しない。symlink 経由で対象 root の外へ逸脱するケースを検出する。
import { realpathSync, existsSync, statSync, lstatSync } from "node:fs";
import { dirname, resolve, sep, relative, isAbsolute } from "node:path";
import { fileURLToPath } from "node:url";

export class PathError extends Error {}

// 呼び出し元は skills/make/scripts/bin/<name>.mjs の import.meta.url を渡す前提
// （lib/ 配下のファイル自身の import.meta.url ではない）。
// Skill 自身の設置位置（bin/ の親 = scripts/、その親 = skills/make/）を import.meta.url から導く。
// vendored (.agents/skills/make) やグローバル導入で symlink 越しに読み込まれても、
// import.meta.url は実際に読み込まれたファイルパスを指すため、これを正とする。
export function getSkillRoot(importMetaUrl) {
  const here = fileURLToPath(importMetaUrl);
  // <skill-root>/scripts/bin/<name>.mjs → 2階層上が <skill-root>
  return resolve(dirname(here), "..", "..");
}

/**
 * 対象 root を解決する。存在確認・ディレクトリ確認込み。
 * @param {string} rootArg CLI から渡された --root の値、または計画 JSON の root フィールド
 * @param {object} [opts]
 * @param {boolean} [opts.mustExist=true]
 * @param {string} [opts.baseDir] 相対パスの解決基準ディレクトリ（既定: process.cwd()）。
 *   計画 JSON 内の相対 root は、起動時の cwd ではなく計画ファイル自身のディレクトリを基準に
 *   解決すべきなので、呼び出し元（lib/plan.mjs）はここに計画ファイルのディレクトリを渡す。
 */
export function resolveRoot(rootArg, { mustExist = true, baseDir = process.cwd() } = {}) {
  if (typeof rootArg !== "string" || rootArg.length === 0) {
    throw new PathError("--root は必須です");
  }
  const abs = isAbsolute(rootArg) ? rootArg : resolve(baseDir, rootArg);
  if (mustExist) {
    if (!existsSync(abs)) {
      throw new PathError(`root が存在しません: ${abs}`);
    }
    const st = statSync(abs);
    if (!st.isDirectory()) {
      throw new PathError(`root がディレクトリではありません: ${abs}`);
    }
  }
  return abs;
}

/**
 * realpath ベースで root 配下に収まっているかを判定する。
 * symlink を辿った実体が root の外にある場合は false（= 逸脱を検出）。
 * root 自体・candidate が存在しない場合は、存在する最寄りの祖先で判定する
 * （まだ作成されていない apply 先パスも検証できるようにするため）。
 */
export function isWithinRoot(root, candidatePath) {
  const rootReal = safeRealpath(root);
  let real = safeRealpath(candidatePath);
  if (real === null) {
    // candidate 自体が存在しない場合、存在する祖先ディレクトリを辿って realpath 化する
    let dir = candidatePath;
    let lastExisting = null;
    // 無限ループ防止のため最大 64 階層まで
    for (let i = 0; i < 64; i += 1) {
      const parent = dirname(dir);
      if (parent === dir) break;
      if (existsSync(parent)) {
        lastExisting = parent;
        break;
      }
      dir = parent;
    }
    if (lastExisting === null) {
      // 祖先すら見つからない → 判定不能。安全側（逸脱扱い）に倒す。
      return false;
    }
    const ancestorReal = safeRealpath(lastExisting);
    return withinPrefix(rootReal, ancestorReal);
  }
  return withinPrefix(rootReal, real);
}

function withinPrefix(root, candidate) {
  if (candidate === root) return true;
  const rootWithSep = root.endsWith(sep) ? root : root + sep;
  return candidate.startsWith(rootWithSep);
}

function safeRealpath(p) {
  try {
    return realpathSync(p);
  } catch {
    return null;
  }
}

/**
 * plan 内の相対パス指定を root 基準で解決し、`..` や絶対パス指定による明示的な逸脱、
 * および symlink 経由の実体逸脱の双方を検出する。
 * @returns {{resolved: string, escaped: boolean, reason?: string}}
 */
export function resolvePlanPath(root, relativeOrAbsPath) {
  if (isAbsolute(relativeOrAbsPath)) {
    return { resolved: relativeOrAbsPath, escaped: true, reason: "absolute-path-not-allowed" };
  }
  const resolved = resolve(root, relativeOrAbsPath);
  const rel = relative(root, resolved);
  // `..config` のような root 配下の正当な名前を逸脱と誤判定しないよう、親ディレクトリへの
  // 移動（`..` そのもの、または `..` + 区切り文字で始まる）だけを逸脱とみなす
  if (rel === ".." || rel.startsWith(`..${sep}`) || isAbsolute(rel)) {
    return { resolved, escaped: true, reason: "dot-dot-escape" };
  }
  if (!isWithinRoot(root, resolved)) {
    return { resolved, escaped: true, reason: "symlink-escape" };
  }
  return { resolved, escaped: false };
}

export function isSymlink(p) {
  try {
    return lstatSync(p).isSymbolicLink();
  } catch {
    return false;
  }
}
