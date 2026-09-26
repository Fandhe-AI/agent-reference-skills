#!/usr/bin/env node
// run-checks — 承認済みの計画（validate-plan を通過した JSON）にある検証コマンドのみを実行し、
// 結果を構造化して返す。既定は dry-run。明示的な --execute フラグと、計画内の
// 各 check.approved === true の両方が揃ったときだけ実際に起動する。
//
// 任意の文字列を eval/shell 展開しない。実行ファイルと引数配列（execFileSync）を使う。
// Windows の .cmd/.bat は lib/exec-safe.mjs の専用処理に分離する（shell:true を無条件に使わない）。
//
// 使い方:
//   node run-checks.mjs --plan <path.json> [--json]                # 既定: dry-run
//   node run-checks.mjs --plan <path.json> --execute [--json]      # 承認済み check のみ実行
//
// 終了コード: 0=PASS/SKIPPED/NOT_APPLICABLE, 1=FAIL, 2=引数エラー, 3=BLOCKED
import { parseFlags } from "./lib/args.mjs";
import { loadPlanFile, validatePlanShape, planBaseDir, PlanError } from "./lib/plan.mjs";
import { resolvePlanPath } from "./lib/paths.mjs";
import { runCheckCommand } from "./lib/exec-safe.mjs";
import { buildResult, emitResult, aggregateStatus, STATUS, diag } from "./lib/result.mjs";

const HELP = `run-checks — 承認済み計画の検証コマンドのみを実行する（既定は dry-run）

使い方:
  node run-checks.mjs --plan <path.json> [オプション]

オプション:
  --plan <path>   計画 JSON ファイルへのパス（必須。validate-plan と同じスキーマを再検証する）
  --execute       実際にコマンドを起動する（既定は dry-run。個々の check は approved:true も必要）
  --json          結果を JSON で stdout に出力（診断は stderr）
  --help          このヘルプを表示

終了コード: 0=PASS/SKIPPED/NOT_APPLICABLE, 1=FAIL, 2=引数エラー, 3=BLOCKED

実行しない条件:
  - --execute を指定しない限り、常に dry-run（コマンドを起動しない）
  - --execute 指定時も、個々の check に approved:true がない場合はその check を BLOCKED のまま実行しない
  - 計画の形式検証（validate-plan と同じロジック）に失敗した場合は全体を BLOCKED にし何も実行しない

計画内の root が相対パスの場合、起動時の cwd ではなく計画ファイル自身のディレクトリを基準に解決する
（validate-plan.mjs と同じ解決基準）。checks[].cwd はその解決後の root を基準に解決する。
`;

function main() {
  let values;
  try {
    ({ values } = parseFlags(process.argv.slice(2), {
      plan: { type: "string" },
      execute: { type: "boolean", default: false },
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

  if (!values.plan) {
    process.stderr.write(`${HELP}\n`);
    diag("引数エラー: --plan は必須です");
    process.exit(2);
  }

  let plan;
  try {
    plan = loadPlanFile(values.plan);
  } catch (err) {
    if (err instanceof PlanError) {
      diag(`計画読み込みエラー: ${err.message}`);
      process.exit(1);
    }
    throw err;
  }

  // 古い承認・改変された計画を信用しない: validate-plan と同じロジックで毎回再検証する。
  // 計画内の相対 root は計画ファイル自身のディレクトリ基準（validate-plan と同じ解決基準）。
  const { findings: planFindings, root } = validatePlanShape(plan, { baseDir: planBaseDir(values.plan) });
  const planInvalid = planFindings.some((f) => f.status === STATUS.FAIL);
  if (planInvalid) {
    const result = buildResult({
      mode: "verify",
      command: "run-checks",
      status: STATUS.BLOCKED,
      profile: values.execute ? "execute" : "dry-run",
      scope: { planPath: values.plan, root },
      findings: planFindings,
      unresolved: ["計画の再検証に失敗したため checks は一切実行していません"],
    });
    // --json 未指定時に出力形式を人間向けに保つため、他の成功経路と同様に必ず humanSummary を渡す
    // （出力形式の選択は全経路で --json フラグのみに依存させる）。
    const code = emitResult(result, {
      json: values.json,
      humanSummary: (r) =>
        [
          `run-checks: ${r.status} (plan=${r.scope.planPath}, profile=${r.profile})`,
          ...r.findings.map((f) => `  - [${f.status}] ${f.id}: ${f.detail}`),
          r.unresolved.length ? `未確認:\n${r.unresolved.map((u) => `  - ${u}`).join("\n")}` : "",
        ]
          .filter(Boolean)
          .join("\n"),
    });
    process.exit(code);
  }

  const checksDef = Array.isArray(plan.checks) ? plan.checks : [];
  const checkResults = [];

  for (const check of checksDef) {
    // 文字列連結ではなく resolvePlanPath を再利用する（validate-plan と同じ root 逸脱判定を通す）。
    // validatePlanShape 側で既に cwd の逸脱は FAIL 済みのはずだが、二重に安全側へ倒す。
    const cwd = check.cwd ? resolvePlanPath(root, check.cwd).resolved : root;
    const base = {
      name: check.name,
      command: check.command,
      args: check.args ?? [],
      cwd,
      timeoutMs: check.timeoutMs ?? 60000,
    };

    if (!values.execute) {
      checkResults.push({
        ...base,
        status: STATUS.SKIPPED,
        executed: false,
        reason: "dry-run（--execute 未指定）",
      });
      continue;
    }

    if (check.approved !== true) {
      checkResults.push({
        ...base,
        status: STATUS.BLOCKED,
        executed: false,
        reason: "この check には approved:true がありません（承認不足のため実行しません）",
      });
      continue;
    }

    const execResult = runCheckCommand({
      command: check.command,
      args: check.args ?? [],
      cwd,
      timeoutMs: check.timeoutMs ?? 60000,
    });
    checkResults.push({
      ...base,
      status: execResult.status,
      // cmd.exe 経由で安全に渡せない引数は起動前に BLOCKED になる（executed: false）
      executed: execResult.executed !== false,
      exitCode: execResult.exitCode,
      signal: execResult.signal,
      timedOut: execResult.timedOut,
      stdoutTail: execResult.stdoutTail,
      stderrTail: execResult.stderrTail,
      viaShellWrapper: execResult.viaShellWrapper,
    });
  }

  const status = checkResults.length === 0 ? STATUS.NOT_APPLICABLE : aggregateStatus(checkResults);

  const unresolved = [];
  if (!values.execute) {
    unresolved.push("dry-run のため checks は実行していません。実行するには --execute と各 check の approved:true が必要です");
  }
  const blockedNames = checkResults.filter((c) => c.status === STATUS.BLOCKED).map((c) => c.name);
  if (blockedNames.length > 0) {
    unresolved.push(`承認不足で未実行: ${blockedNames.join(", ")}`);
  }

  const result = buildResult({
    mode: "verify",
    command: "run-checks",
    status,
    profile: values.execute ? "execute" : "dry-run",
    scope: { planPath: values.plan, root },
    checks: checkResults,
    unresolved,
  });

  const code = emitResult(result, {
    json: values.json,
    humanSummary: (r) =>
      [
        `run-checks: ${r.status} (plan=${r.scope.planPath}, profile=${r.profile})`,
        ...r.checks.map((c) => `  - [${c.status}] ${c.name} (executed=${c.executed})`),
      ].join("\n"),
  });
  process.exit(code);
}

main();
