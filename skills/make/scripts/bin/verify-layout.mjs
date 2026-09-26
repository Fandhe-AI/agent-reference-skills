#!/usr/bin/env node
// verify-layout — 適用後の想定構成に対して、参照先・設定・help と公開コマンドの整合性、
// Skill 固有パスへの不要な依存を静的に確認する。完全な shell 解析が必要な事項は
// unresolved（未確認）として明示する。何も実行・変更しない。
//
// 使い方:
//   node verify-layout.mjs --root <path> [--makefile Makefile] [--json]
//
// 終了コード: 0=PASS/SKIPPED/NOT_APPLICABLE, 1=FAIL, 2=引数エラー, 3=BLOCKED
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { parseFlags } from "./lib/args.mjs";
import { resolveRoot, PathError } from "./lib/paths.mjs";
import { buildResult, emitResult, aggregateStatus, STATUS, diag } from "./lib/result.mjs";

const HELP = `verify-layout — 適用後構成の help/公開コマンド整合性・Skill 固有パス依存を静的確認する

使い方:
  node verify-layout.mjs --root <path> [オプション]

オプション:
  --root <path>       確認対象ディレクトリ（必須）
  --makefile <name>   確認する Makefile 名（既定: Makefile）
  --json              結果を JSON で stdout に出力（診断は stderr）
  --help              このヘルプを表示

終了コード: 0=PASS/SKIPPED/NOT_APPLICABLE, 1=FAIL, 2=引数エラー, 3=BLOCKED

実行しない条件: 常に実行しない（make や任意コマンドを起動しない。ファイルを読むだけ）。
未確認の扱い: recipe 内部の実際の shell 解析は行わず、該当箇所は status: NOT_APPLICABLE で明示する。
`;

// `## ` で始まるコメントを help エントリとみなす（`target: prereq ## comment` 形式のみを対象にする）。
const HELP_LINE_RE = /^([A-Za-z0-9_.\/-]+)\s*:[^=]*?##\s*(.+)$/;
const TARGET_LINE_RE = /^([A-Za-z0-9_.\/-]+)\s*:(?!=)/;
const PHONY_LINE_RE = /^\.PHONY\s*:\s*(.+)$/;
// Skill 自身の設置パスに依存していないか（サンプルはこのリポジトリ内の相対位置に依存すべきではない）
const SKILL_PATH_PATTERNS = [/skills\/make(\/|$)/, /\.claude\/skills\/make(\/|$)/, /\.agents\/skills\/make(\/|$)/];

function parseMakefile(text) {
  const lines = text.split(/\r\n|\n/);
  const helpEntries = [];
  const targets = new Set();
  const phony = new Set();
  for (const line of lines) {
    const helpMatch = line.match(HELP_LINE_RE);
    if (helpMatch) {
      helpEntries.push({ target: helpMatch[1], comment: helpMatch[2].trim() });
    }
    const phonyMatch = line.match(PHONY_LINE_RE);
    if (phonyMatch) {
      for (const t of phonyMatch[1].trim().split(/\s+/)) phony.add(t);
    }
    // タブで始まる行（recipe）は target 行ではない
    if (/^\t/.test(line)) continue;
    const targetMatch = line.match(TARGET_LINE_RE);
    if (targetMatch && !line.trim().startsWith("#")) {
      targets.add(targetMatch[1]);
    }
  }
  return { helpEntries, targets, phony };
}

function main() {
  let values;
  try {
    ({ values } = parseFlags(process.argv.slice(2), {
      root: { type: "string" },
      makefile: { type: "string", default: "Makefile" },
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

  const makefilePath = join(root, values.makefile);
  const findings = [];
  const unresolved = [];

  if (!existsSync(makefilePath)) {
    findings.push({ id: "makefile-presence", status: STATUS.NOT_APPLICABLE, detail: `${values.makefile} が見つかりません`, evidence: values.makefile });
    const result = buildResult({
      mode: "verify",
      command: "verify-layout",
      status: STATUS.NOT_APPLICABLE,
      profile: "static",
      scope: { root, makefile: values.makefile },
      findings,
      unresolved: ["Makefile が存在しないため help/target 整合性は確認していません"],
    });
    // --json 未指定時に出力形式を人間向けに保つため、下の成功経路と同様に必ず humanSummary を渡す
    // （出力形式の選択は全経路で --json フラグのみに依存させる。run-checks.mjs の同種修正と揃える）。
    const code = emitResult(result, {
      json: values.json,
      humanSummary: (r) =>
        [
          `verify-layout: ${r.status} (root=${r.scope.root})`,
          ...r.findings.map((f) => `  - [${f.status}] ${f.detail}${f.evidence ? ` (${f.evidence})` : ""}`),
          r.unresolved.length ? `未確認:\n${r.unresolved.map((u) => `  - ${u}`).join("\n")}` : "",
        ]
          .filter(Boolean)
          .join("\n"),
    });
    process.exit(code);
  }

  const text = readFileSync(makefilePath, "utf8");
  const { helpEntries, targets, phony } = parseMakefile(text);

  findings.push({
    id: "makefile-presence",
    status: STATUS.PASS,
    detail: `${values.makefile} を確認`,
    evidence: values.makefile,
  });

  // help エントリが実在する target と一致するか
  for (const entry of helpEntries) {
    if (targets.has(entry.target)) {
      findings.push({
        id: `help:${entry.target}`,
        status: STATUS.PASS,
        detail: `help エントリと target が一致: ${entry.target}`,
        evidence: entry.comment,
      });
    } else {
      findings.push({
        id: `help:${entry.target}`,
        status: STATUS.FAIL,
        detail: `help エントリが存在しない target を指しています: ${entry.target}`,
        evidence: entry.comment,
      });
    }
  }

  // .PHONY に列挙されていない help 対象ターゲット（ファイル成果物を除く可能性があるため FAIL ではなく注意喚起）。
  // findings（全体 status の集計対象）ではなく unresolved（未確認の注記）に置く。
  // ここを findings に混ぜると、ファイル成果物ターゲットを含む正常な Makefile でも
  // NOT_APPLICABLE が混入し、集計後の全体 status が PASS から SKIPPED へ丸まってしまうため。
  const phonyAdvisories = [];
  for (const entry of helpEntries) {
    if (targets.has(entry.target) && !phony.has(entry.target)) {
      phonyAdvisories.push(entry.target);
    }
  }
  if (phonyAdvisories.length > 0) {
    unresolved.push(
      `.PHONY に列挙されていない help 対象ターゲット（ファイル成果物を意図している可能性があり静的には断定できません）: ${phonyAdvisories.join(", ")}`,
    );
  }

  // Skill 固有パスへの不要な依存
  const skillPathHits = [];
  const lines = text.split(/\r\n|\n/);
  lines.forEach((line, idx) => {
    if (SKILL_PATH_PATTERNS.some((re) => re.test(line))) {
      skillPathHits.push({ line: idx + 1, text: line.trim() });
    }
  });
  if (skillPathHits.length > 0) {
    for (const hit of skillPathHits) {
      findings.push({
        id: "skill-path-dependency",
        status: STATUS.FAIL,
        detail: `Skill 自身の設置パスへの依存を検出（対象プロジェクトの Makefile は Skill の配置に依存すべきではない）`,
        evidence: `L${hit.line}: ${hit.text}`,
      });
    }
  } else {
    findings.push({
      id: "skill-path-dependency",
      status: STATUS.PASS,
      detail: "Skill 固有パスへの依存は検出されませんでした",
    });
  }

  unresolved.push(
    "recipe（タブ行）内部の実際の shell 実行内容は解析していません（完全な shell 解析が必要なため未確認）",
  );
  unresolved.push("include されている外部ファイルの中身は展開していません（未確認）");

  const status = aggregateStatus(findings);
  const result = buildResult({
    mode: "verify",
    command: "verify-layout",
    status,
    profile: "static",
    scope: { root, makefile: values.makefile },
    findings,
    unresolved,
    extra: { helpEntryCount: helpEntries.length, targetCount: targets.size },
  });

  const code = emitResult(result, {
    json: values.json,
    humanSummary: (r) =>
      [
        `verify-layout: ${r.status} (root=${r.scope.root})`,
        ...r.findings.map((f) => `  - [${f.status}] ${f.detail}${f.evidence ? ` (${f.evidence})` : ""}`),
      ].join("\n"),
  });
  process.exit(code);
}

main();
