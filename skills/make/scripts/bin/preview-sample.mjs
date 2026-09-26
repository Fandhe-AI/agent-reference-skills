#!/usr/bin/env node
// preview-sample — skills/make/samples/projects/<name>/ から選択したサンプルの導入予定ファイルと、
// 対象 root の既存ファイルとの差分を表示する。既定では対象を書き換えない。
// 既存ファイルがある場合は競合として表示する。
//
// 使い方:
//   node preview-sample.mjs --sample <name> --root <path> [--json]
//   node preview-sample.mjs --sample <name> --root <path> --apply [--force]   # 明示指定時のみ書き込む
//
// 終了コード: 0=PASS/SKIPPED/NOT_APPLICABLE, 1=FAIL, 2=引数エラー, 3=BLOCKED
import { existsSync, readFileSync, mkdirSync, writeFileSync, statSync } from "node:fs";
import { join, relative, dirname } from "node:path";
import { createHash } from "node:crypto";
import { parseFlags } from "./lib/args.mjs";
import { resolveRoot, getSkillRoot, PathError } from "./lib/paths.mjs";
import { scanTree } from "./lib/scan.mjs";
import { buildResult, emitResult, aggregateStatus, STATUS, diag } from "./lib/result.mjs";

const HELP = `preview-sample — samples/projects/<name>/ と対象 root の差分をプレビューする

使い方:
  node preview-sample.mjs --sample <name> --root <path> [オプション]

オプション:
  --sample <name>   skills/make/samples/projects/<name> のサンプル名（必須）
  --root <path>     導入予定の対象ディレクトリ（必須）
  --apply           プレビューではなく実際に書き込む（既定はプレビューのみ・書き込まない）
  --force           --apply 時、競合しているファイルも上書きする（既定は競合をスキップ）
  --json            結果を JSON で stdout に出力（診断は stderr）
  --help            このヘルプを表示

終了コード: 0=PASS/SKIPPED/NOT_APPLICABLE, 1=FAIL(競合あり), 2=引数エラー, 3=BLOCKED

実行しない条件: --apply を指定しない限り、対象 root への書き込みは一切行わない。
`;

function listSampleFiles(sampleRoot) {
  const { entries } = scanTree(sampleRoot, { maxDepth: 32, maxEntries: 20000 });
  return entries.filter((e) => e.type === "file").map((e) => e.path);
}

function sha256(path) {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

function main() {
  let values;
  try {
    ({ values } = parseFlags(process.argv.slice(2), {
      sample: { type: "string" },
      root: { type: "string" },
      apply: { type: "boolean", default: false },
      force: { type: "boolean", default: false },
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

  if (!values.sample || !values.root) {
    process.stderr.write(`${HELP}\n`);
    diag("引数エラー: --sample と --root は必須です");
    process.exit(2);
  }

  const skillRoot = getSkillRoot(import.meta.url);
  const sampleRoot = join(skillRoot, "samples", "projects", values.sample);
  if (!existsSync(sampleRoot) || !statSync(sampleRoot).isDirectory()) {
    diag(`サンプルが見つかりません: ${sampleRoot}`);
    process.exit(1);
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

  const sampleFiles = listSampleFiles(sampleRoot);
  const findings = [];
  const plannedWrites = [];

  for (const sf of sampleFiles) {
    const rel = relative(sampleRoot, sf);
    const dest = join(root, rel);
    if (existsSync(dest)) {
      const sameContent = statSync(dest).isFile() && sha256(sf) === sha256(dest);
      if (sameContent) {
        findings.push({ id: `file:${rel}`, status: STATUS.PASS, detail: "既存ファイルと内容が一致（差分なし）", evidence: rel });
      } else {
        findings.push({ id: `file:${rel}`, status: STATUS.FAIL, detail: "競合: 既存ファイルが存在し内容が異なります", evidence: rel });
      }
    } else {
      findings.push({ id: `file:${rel}`, status: STATUS.PASS, detail: "新規導入予定（既存ファイルなし）", evidence: rel });
      plannedWrites.push({ src: sf, dest, rel });
    }
  }

  let applied = [];
  let skippedConflicts = [];
  if (values.apply) {
    for (const f of findings) {
      if (f.status === STATUS.FAIL && !values.force) {
        skippedConflicts.push(f.evidence);
      }
    }
    const toWrite = [...plannedWrites];
    if (values.force) {
      for (const sf of sampleFiles) {
        const rel = relative(sampleRoot, sf);
        const dest = join(root, rel);
        if (existsSync(dest) && !toWrite.some((w) => w.rel === rel)) {
          toWrite.push({ src: sf, dest, rel });
        }
      }
    }
    for (const w of toWrite) {
      mkdirSync(dirname(w.dest), { recursive: true });
      writeFileSync(w.dest, readFileSync(w.src));
      applied.push(w.rel);
    }
  }

  const status = aggregateStatus(findings);
  const unresolved = [];
  if (!values.apply) {
    unresolved.push("--apply を指定していないため、実際の書き込みは行っていません（プレビューのみ）");
  } else if (skippedConflicts.length > 0) {
    unresolved.push(`--force なしのため競合ファイルはスキップしました: ${skippedConflicts.join(", ")}`);
  }

  const result = buildResult({
    mode: values.apply ? "apply" : "plan",
    command: "preview-sample",
    status,
    profile: values.apply ? "apply" : "preview",
    scope: { sample: values.sample, sampleRoot, root },
    findings,
    unresolved,
    extra: { applied, skippedConflicts },
  });

  const code = emitResult(result, {
    json: values.json,
    humanSummary: (r) =>
      [
        `preview-sample: ${r.status} (sample=${r.scope.sample}, root=${r.scope.root})`,
        ...r.findings.map((f) => `  - [${f.status}] ${f.detail} (${f.evidence})`),
        r.applied?.length ? `applied: ${r.applied.join(", ")}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
  });
  process.exit(code);
}

main();
