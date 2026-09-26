#!/usr/bin/env node
// preview-sample — skills/make/samples/projects/<name>/ から選択したサンプルの導入予定ファイルと、
// 対象 root の既存ファイルとの差分を表示する。既定では対象を書き換えない。
// 既存ファイルがある場合は競合として表示する。
// 書き込み（--apply）は承認済み計画（--plan）に結び付ける。書き込む全ファイルが計画の changes に
// 対応する action（新規 = create、上書き = modify + matches-hash）で明記され、かつ計画の再検証
// （対象 root の一致・元ファイル状態の再確認を含む）が通った場合にだけ書き込む。1 件でも差異が
// あれば何も書き込まない。
//
// 使い方:
//   node preview-sample.mjs --sample <name> --root <path> [--json]
//   node preview-sample.mjs --sample <name> --root <path> --apply --plan <plan.json> [--force]
//
// 終了コード: 0=PASS/SKIPPED/NOT_APPLICABLE, 1=FAIL, 2=引数エラー, 3=BLOCKED
import { existsSync, readFileSync, mkdirSync, writeFileSync, statSync, realpathSync } from "node:fs";
import { createHash } from "node:crypto";
import { join, relative, dirname, normalize } from "node:path";
import { parseFlags } from "./lib/args.mjs";
import { resolveRoot, getSkillRoot, resolvePlanPath, isWithinRoot, isSymlink, PathError } from "./lib/paths.mjs";
import { loadPlanFile, validatePlanShape, planBaseDir, PlanError } from "./lib/plan.mjs";
import { scanTree } from "./lib/scan.mjs";
import { buildResult, emitResult, aggregateStatus, STATUS, diag } from "./lib/result.mjs";

const HELP = `preview-sample — samples/projects/<name>/ と対象 root の差分をプレビューする

使い方:
  node preview-sample.mjs --sample <name> --root <path> [オプション]

オプション:
  --sample <name>   skills/make/samples/projects/<name> のサンプル名（必須）
  --root <path>     導入予定の対象ディレクトリ（必須）
  --apply           プレビューではなく実際に書き込む（既定はプレビューのみ・書き込まない）
  --plan <path>     --apply 時に必須。書き込む全ファイルを changes に明記した承認済み計画 JSON
  --force           --apply 時、競合しているファイルも上書きする（既定は競合をスキップ）
  --json            結果を JSON で stdout に出力（診断は stderr）
  --help            このヘルプを表示

終了コード: 0=PASS/SKIPPED/NOT_APPLICABLE, 1=FAIL(競合あり), 2=引数エラー, 3=BLOCKED

実行しない条件: --apply を指定しない限り、対象 root への書き込みは一切行わない。
--apply でも、計画の再検証が失敗した・root が一致しない・書き込むファイルが計画に明記されて
いない場合は、1 件も書き込まない。
`;

/**
 * --apply の書き込み予定を承認済み計画に照合する。計画は validatePlanShape で再検証する
 * （create は対象が存在しないこと、modify + matches-hash は元ファイルの内容が承認時と
 * 同じことを、この時点のファイル状態で確認する）。
 * @returns {string[]} 問題の一覧（空なら書き込んでよい）
 */
function checkApplyPlan(planPath, root, toWrite) {
  let plan;
  try {
    plan = loadPlanFile(planPath);
  } catch (err) {
    if (err instanceof PlanError) return [err.message];
    throw err;
  }
  const problems = [];
  const { findings, root: planRoot } = validatePlanShape(plan, { baseDir: planBaseDir(planPath) });
  for (const f of findings.filter((x) => x.status === "FAIL")) {
    problems.push(`計画の再検証に失敗: ${f.id}: ${f.detail}`);
  }
  if (planRoot === null) return problems;
  if (realpathSync(planRoot) !== realpathSync(root)) {
    problems.push(`計画の root（${planRoot}）と --root（${root}）が一致しません`);
  }
  const changes = new Map(
    (Array.isArray(plan.changes) ? plan.changes : [])
      .filter((c) => c && typeof c.path === "string")
      .map((c) => [normalize(c.path), c]),
  );
  for (const w of toWrite) {
    const c = changes.get(normalize(w.rel));
    const expected = w.finding ? "modify" : "create";
    if (!c) {
      problems.push(`計画に含まれないファイル: ${w.rel}`);
    } else if (c.action !== expected) {
      problems.push(`計画の action が ${c.action} だが実際は ${expected} が必要: ${w.rel}`);
    } else if (expected === "modify" && c.expectedState !== "matches-hash") {
      problems.push(`既存ファイルの上書きには expectedState: matches-hash が必要: ${w.rel}`);
    }
  }
  return problems;
}

function listSampleFiles(sampleRoot) {
  const { entries, truncated, errors, skippedDirs } = scanTree(sampleRoot, { maxDepth: 32, maxEntries: 20000 });
  // 一部を読めなかった・打ち切った・除外規則（build / dist / node_modules 等や深さ制限）で
  // 走査しなかったディレクトリや symlink があるサンプルを「全ファイル」として扱い、欠けたまま適用しない
  // symlink は辿らず、FIFO 等の特殊ファイルは複製しないため、含むサンプルも欠けたまま「全ファイル」として扱わない
  const unsupported = entries.filter((e) => e.type !== "file" && e.type !== "dir");
  if (errors.length > 0 || truncated || skippedDirs.length > 0 || unsupported.length > 0) {
    const why =
      errors.length > 0
        ? errors.map((e) => `${e.path} (${e.code})`).join(", ")
        : truncated
          ? "件数上限で打ち切り"
          : skippedDirs.length > 0
            ? `走査対象外のディレクトリを含む: ${skippedDirs.join(", ")}`
            : `symlink・特殊ファイルを含む（辿らない・複製しない）: ${unsupported.map((e) => e.path).join(", ")}`;
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
      plan: { type: "string" },
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

  if (values.apply && !values.plan) {
    process.stderr.write(`${HELP}\n`);
    diag("引数エラー: --apply には承認済み計画の --plan が必要です（validate-plan で確認した計画を渡してください）");
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
    const planProblems = checkApplyPlan(values.plan, root, toWrite);
    for (const p of planProblems) {
      findings.push({ id: "plan", status: STATUS.FAIL, detail: `適用を中止（何も書き込んでいません）: ${p}`, evidence: values.plan });
    }
    if (planProblems.length > 0) toWrite.length = 0;
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
        const detail = `書き込みに失敗しました（${err.code ?? "UNKNOWN"}）`;
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
    scope: { sample: values.sample, sampleRoot, root, ...(values.plan ? { plan: values.plan } : {}) },
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
