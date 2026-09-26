#!/usr/bin/env node
// inspect-repo — 対象 root を静的に調査し、構成・既存の入口・設定ファイル・capability 候補・
// 問題と根拠・未確認項目を返す。何も実行・変更しない（audit の consult/audit 相当）。
//
// 使い方:
//   node inspect-repo.mjs --root <path> [--json] [--max-depth 6] [--max-entries 5000]
//
// 終了コード: 0=PASS/SKIPPED/NOT_APPLICABLE, 1=FAIL, 2=引数エラー, 3=BLOCKED
import { readdirSync } from "node:fs";
import { join, relative, basename } from "node:path";
import { parseFlags } from "./lib/args.mjs";
import { resolveRoot, PathError } from "./lib/paths.mjs";
import { scanTree, isSecretLikeName, DEFAULT_MAX_DEPTH, DEFAULT_MAX_ENTRIES } from "./lib/scan.mjs";
import { buildResult, emitResult, STATUS, diag } from "./lib/result.mjs";

const HELP = `inspect-repo — 対象 root の静的構成調査（何も実行・変更しない）

使い方:
  node inspect-repo.mjs --root <path> [オプション]

オプション:
  --root <path>        対象ディレクトリ（必須）
  --max-depth <n>       走査する最大深さ（既定: ${DEFAULT_MAX_DEPTH}）
  --max-entries <n>      走査するエントリ数上限（既定: ${DEFAULT_MAX_ENTRIES}）
  --json                結果を JSON で stdout に出力（診断は stderr）
  --help                このヘルプを表示

終了コード: 0=PASS/SKIPPED/NOT_APPLICABLE, 1=FAIL, 2=引数エラー, 3=BLOCKED

実行しない条件: 資料を読んだだけでは自動起動しない。--root を明示しない限り何も調べない。
入力: --root のみ。設定ファイルの中身は読まない（.env 等は存在のみ記録）。
`;

// 既知の入口候補（存在確認のみ。中身は読まない）
const ENTRY_CANDIDATES = [
  { file: "Makefile", capability: "make" },
  { file: "makefile", capability: "make" },
  { file: "GNUmakefile", capability: "make" },
  { file: "package.json", capability: "node" },
  { file: "pnpm-workspace.yaml", capability: "pnpm-workspace" },
  { file: "pnpm-lock.yaml", capability: "pnpm" },
  { file: "package-lock.json", capability: "npm" },
  { file: "yarn.lock", capability: "yarn" },
  { file: "turbo.json", capability: "turborepo" },
  { file: "Cargo.toml", capability: "cargo" },
  { file: "Cargo.lock", capability: "cargo-lock" },
  { file: "rust-toolchain.toml", capability: "rust-toolchain" },
  { file: ".cargo/config.toml", capability: "cargo-config" },
  { file: "justfile", capability: "just" },
  { file: "Justfile", capability: "just" },
  { file: "Taskfile.yml", capability: "task" },
  { file: "lefthook.yml", capability: "lefthook" },
  { file: ".git", capability: "git" },
  { file: ".github/workflows", capability: "github-actions" },
];

function main() {
  let values;
  try {
    ({ values } = parseFlags(process.argv.slice(2), {
      root: { type: "string" },
      "max-depth": { type: "string", default: String(DEFAULT_MAX_DEPTH) },
      "max-entries": { type: "string", default: String(DEFAULT_MAX_ENTRIES) },
      json: { type: "boolean", default: false },
      help: { type: "boolean", default: false },
    }));
  } catch (err) {
    process.stderr.write(`${HELP}\n`);
    diag(`引数エラー: ${err.message}`);
    process.exit(2);
  }

  if (values.help) {
    process.stdout.write(HELP);
    process.exit(0);
  }

  if (!values.root) {
    process.stderr.write(`${HELP}\n`);
    diag("引数エラー: --root は必須です");
    process.exit(2);
  }

  const maxDepth = Number(values["max-depth"]);
  const maxEntries = Number(values["max-entries"]);
  if (!Number.isFinite(maxDepth) || maxDepth < 0 || !Number.isFinite(maxEntries) || maxEntries < 1) {
    process.stderr.write(`${HELP}\n`);
    diag("引数エラー: --max-depth / --max-entries は正の数値である必要があります");
    process.exit(2);
  }

  let root;
  try {
    root = resolveRoot(values.root, { mustExist: true });
  } catch (err) {
    if (err instanceof PathError) {
      diag(`root エラー: ${err.message}`);
      process.exit(1);
    }
    throw err;
  }

  const findings = [];

  // ディレクトリを readdirSync で一度だけ読み、実在するエントリ名と厳密な文字列一致で照合する。
  // existsSync（大文字小文字を区別しないファイルシステムでは OS 側でパスが畳み込まれる）を
  // 使うと、Makefile / makefile のような大文字小文字違いの候補が物理的に同じ1ファイルを
  // 指していても両方ヒットしてしまう。readdirSync が返す実際のエントリ名（ディスク上の表記）
  // に対して候補名を厳密一致させることで、同じ実体を二重に数えない。
  const dirListingCache = new Map();
  function dirEntryNames(dir) {
    if (dirListingCache.has(dir)) return dirListingCache.get(dir);
    let names;
    try {
      names = readdirSync(dir);
    } catch {
      names = null;
    }
    dirListingCache.set(dir, names);
    return names;
  }
  function existsExact(candidatePath) {
    const segments = candidatePath.split("/");
    let dir = root;
    for (const segment of segments) {
      const names = dirEntryNames(dir);
      if (!names || !names.includes(segment)) return false;
      dir = join(dir, segment);
    }
    return true;
  }

  for (const candidate of ENTRY_CANDIDATES) {
    if (existsExact(candidate.file)) {
      const full = join(root, candidate.file);
      findings.push({
        id: `entry:${candidate.file}`,
        status: STATUS.PASS,
        detail: `入口候補を検出: ${candidate.file}（capability 候補: ${candidate.capability}）`,
        evidence: relative(root, full) || candidate.file,
        confidence: "observed",
      });
    }
  }

  const { entries, truncated, skippedDirs, errors: scanErrors } = scanTree(root, { maxDepth, maxEntries });

  // 読み取れなかった領域は「調査済み・問題なし」にしない（権限等の前提不足として BLOCKED）
  for (const e of scanErrors) {
    findings.push({
      id: "scan-error",
      status: STATUS.BLOCKED,
      detail: `読み取れないため走査できませんでした（${e.code}）`,
      evidence: relative(root, e.path) || ".",
      confidence: "observed",
    });
  }

  const secretLike = entries.filter((e) => e.type === "file" && isSecretLikeName(basename(e.path)));
  for (const s of secretLike) {
    // 中身は絶対に読まない。存在とパスのみを記録する。
    findings.push({
      id: "secret-like-file",
      status: STATUS.NOT_APPLICABLE,
      detail: "秘密情報を含み得るファイルを検出（中身は読んでいない・未確認）",
      evidence: relative(root, s.path),
      confidence: "observed",
    });
  }

  const symlinks = entries.filter((e) => e.type === "symlink");
  for (const s of symlinks) {
    findings.push({
      id: "symlink",
      status: STATUS.NOT_APPLICABLE,
      detail: "symlink を検出（辿っていない・未確認）",
      evidence: relative(root, s.path),
      confidence: "observed",
    });
  }

  const unresolved = [];
  if (truncated) {
    unresolved.push(`走査は max-entries=${maxEntries} で打ち切られました（未確認の領域が残っています）`);
  }
  if (skippedDirs.length > 0) {
    unresolved.push(
      `以下のディレクトリは深さ制限または既知の生成物ディレクトリとしてスキップしました: ${skippedDirs
        .slice(0, 10)
        .map((d) => relative(root, d))
        .join(", ")}${skippedDirs.length > 10 ? ` 他 ${skippedDirs.length - 10} 件` : ""}`,
    );
  }
  unresolved.push(
    "設定ファイルの中身は読んでいません（存在確認のみ）。capability の実際の有効性は audit/plan で個別確認してください。",
  );

  // 走査が完了した場合のみ PASS。読み取り失敗は BLOCKED、件数上限での打ち切りは SKIPPED
  // （未確認の領域が残るため PASS に丸めない）。何も見つからなくても走査が完了していれば PASS。
  const status = findings.some((f) => f.status === STATUS.BLOCKED)
    ? STATUS.BLOCKED
    : findings.some((f) => f.status === STATUS.FAIL)
      ? STATUS.FAIL
      : truncated
        ? STATUS.SKIPPED
        : STATUS.PASS;

  const result = buildResult({
    mode: "audit",
    command: "inspect-repo",
    status,
    profile: "static",
    scope: { root, maxDepth, maxEntries },
    findings,
    unresolved,
    extra: {
      entriesScanned: entries.length,
      truncated,
    },
  });

  const code = emitResult(result, {
    json: values.json,
    humanSummary: (r) =>
      [
        `inspect-repo: ${r.status} (root=${r.scope.root})`,
        `findings: ${r.findings.length} 件, entriesScanned: ${r.entriesScanned}${r.truncated ? " (truncated)" : ""}`,
        ...r.findings.map((f) => `  - [${f.status}] ${f.detail}${f.evidence ? ` (${f.evidence})` : ""}`),
        r.unresolved.length ? `未確認:\n${r.unresolved.map((u) => `  - ${u}`).join("\n")}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
  });
  process.exit(code);
}

main();
