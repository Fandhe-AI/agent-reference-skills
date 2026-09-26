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
import { existsSync, readFileSync, mkdirSync, writeFileSync, statSync, realpathSync } from "node:fs";
import { join, relative, dirname } from "node:path";
import { createHash } from "node:crypto";
import { parseFlags } from "./lib/args.mjs";
import { resolveRoot, getSkillRoot, resolvePlanPath, isWithinRoot, isSymlink, PathError } from "./lib/paths.mjs";
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
  const { entries, truncated, errors, skippedDirs } = scanTree(sampleRoot, { maxDepth: 32, maxEntries: 20000 });
  // 一部を読めなかった・打ち切った・除外規則（build / dist / node_modules 等や深さ制限）で
  // 走査しなかったディレクトリがあるサンプルを「全ファイル」として扱い、欠けたまま適用しない
  if (errors.length > 0 || truncated || skippedDirs.length > 0) {
    const why =
      errors.length > 0
        ? errors.map((e) => `${e.path} (${e.code})`).join(", ")
        : truncated
          ? "件数上限で打ち切り"
          : `走査対象外のディレクトリを含む: ${skippedDirs.join(", ")}`;
    throw new Error(`サンプルを完全には走査できませんでした: ${why}`);
  }
  return entries.filter((e) => e.type === "file").map((e) => e.path);
}

// サンプル名は samples/projects/ 直下の単一ディレクトリ名に限る（`../` や区切り文字で
// サンプル領域外を読ませない）。
const SAMPLE_NAME_RE = /^[A-Za-z0-9][A-Za-z0-9._-]*$/;

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

  if (!SAMPLE_NAME_RE.test(values.sample) || values.sample.includes("..")) {
    process.stderr.write(`${HELP}\n`);
    diag(`引数エラー: --sample は samples/projects/ 直下のディレクトリ名のみ指定できます: ${values.sample}`);
    process.exit(2);
  }

  const skillRoot = getSkillRoot(import.meta.url);
  const projectsRoot = join(skillRoot, "samples", "projects");
  const sampleRoot = join(projectsRoot, values.sample);
  if (!existsSync(sampleRoot) || !statSync(sampleRoot).isDirectory()) {
    diag(`サンプルが見つかりません: ${sampleRoot}`);
    process.exit(1);
  }
  // 名前の形式に加え、symlink を辿った実体も samples/projects 配下であることを確認する
  if (realpathSync(sampleRoot) === realpathSync(projectsRoot) || !isWithinRoot(projectsRoot, sampleRoot)) {
    diag(`サンプルの実体が samples/projects の外にあります: ${sampleRoot}`);
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

  let sampleFiles;
  try {
    sampleFiles = listSampleFiles(sampleRoot);
  } catch (err) {
    diag(err.message);
    process.exit(1);
  }
  const findings = [];
  const plannedWrites = [];
  const conflicts = [];

  for (const sf of sampleFiles) {
    const rel = relative(sampleRoot, sf);
    // 書き込み先は symlink を辿った実体まで root 配下であることを確認する。親ディレクトリや
    // 既存ファイルが root 外への symlink の場合、プレビューでも --apply --force でも書き込まない。
    const target = resolvePlanPath(root, rel);
    const dest = target.resolved;
    if (target.escaped || isSymlink(dest)) {
      findings.push({
        id: `file:${rel}`,
        status: STATUS.FAIL,
        detail: `書き込み先が root 外へ逸脱するか symlink です（${target.reason ?? "symlink"}）。適用対象から除外します`,
        evidence: rel,
      });
      continue;
    }
    if (existsSync(dest)) {
      if (!statSync(dest).isFile()) {
        findings.push({ id: `file:${rel}`, status: STATUS.FAIL, detail: "競合: 同名のディレクトリ等が存在します（上書き不可）", evidence: rel });
        continue;
      }
      if (sha256(sf) === sha256(dest)) {
        findings.push({ id: `file:${rel}`, status: STATUS.PASS, detail: "既存ファイルと内容が一致（差分なし）", evidence: rel });
      } else {
        const finding = { id: `file:${rel}`, status: STATUS.FAIL, detail: "競合: 既存ファイルが存在し内容が異なります", evidence: rel };
        findings.push(finding);
        conflicts.push({ src: sf, dest, rel, finding });
      }
    } else {
      findings.push({ id: `file:${rel}`, status: STATUS.PASS, detail: "新規導入予定（既存ファイルなし）", evidence: rel });
      plannedWrites.push({ src: sf, dest, rel, finding: null });
    }
  }

  const applied = [];
  const skippedConflicts = [];
  if (values.apply) {
    const toWrite = [...plannedWrites];
    if (values.force) {
      toWrite.push(...conflicts);
    } else {
      skippedConflicts.push(...conflicts.map((c) => c.rel));
    }
    for (const w of toWrite) {
      try {
        // プレビュー時点から親ディレクトリが差し替えられた場合に備え、mkdir の前後で実体を確認する
        // （mkdir 前の確認がないと、root 外への symlink 越しにディレクトリを作成してしまう）
        if (!isWithinRoot(root, w.dest) || isSymlink(w.dest)) {
          throw new Error("書き込み直前の確認で root 外への逸脱を検出しました");
        }
        mkdirSync(dirname(w.dest), { recursive: true });
        if (!isWithinRoot(root, w.dest) || isSymlink(w.dest)) {
          throw new Error("書き込み直前の確認で root 外への逸脱を検出しました");
        }
        writeFileSync(w.dest, readFileSync(w.src));
        applied.push(w.rel);
        // --force で上書きした競合は、適用結果として実態（上書き済み）に合わせて報告する
        if (w.finding) {
          w.finding.status = STATUS.PASS;
          w.finding.detail = "競合していた既存ファイルを --force で上書きしました";
        }
      } catch (err) {
        const detail = `書き込みに失敗しました: ${err.message}`;
        if (w.finding) {
          w.finding.status = STATUS.FAIL;
          w.finding.detail = detail;
        } else {
          findings.push({ id: `write:${w.rel}`, status: STATUS.FAIL, detail, evidence: w.rel });
        }
      }
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
