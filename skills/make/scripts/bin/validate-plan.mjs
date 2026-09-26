#!/usr/bin/env node
// validate-plan — 計画 JSON の形式・対象 root・変更対象・元ファイルの状態・パス逸脱・衝突・
// 検証定義の妥当性をチェックする。計画ファイルを受け取っただけでは何も実行しない
// （ファイル書き込み・コマンド実行は一切行わない。stat による存在確認のみ）。
//
// 使い方:
//   node validate-plan.mjs --plan <path.json> [--json]
//
// 終了コード: 0=PASS/SKIPPED/NOT_APPLICABLE, 1=FAIL, 2=引数エラー, 3=BLOCKED
import { parseFlags } from "./lib/args.mjs";
import { readPlanFile, validatePlanShape, planBaseDir, PlanError } from "./lib/plan.mjs";
import { buildResult, emitResult, aggregateStatus, diag } from "./lib/result.mjs";

const HELP = `validate-plan — 計画 JSON の形式・root・パス逸脱・衝突・検証定義を検証する（実行しない）

使い方:
  node validate-plan.mjs --plan <path.json> [オプション]

オプション:
  --plan <path>   計画 JSON ファイルへのパス（必須）
  --json          結果を JSON で stdout に出力（診断は stderr）
  --help          このヘルプを表示

終了コード: 0=PASS/SKIPPED/NOT_APPLICABLE, 1=FAIL, 2=引数エラー, 3=BLOCKED

実行しない条件: 常に実行しない（このスクリプトはコマンドを一切起動しない）。
入力: --plan の計画 JSON（schemaVersion, root, changes[], checks[]）。
root が相対パスの場合、起動時の cwd ではなく計画ファイル自身のディレクトリを基準に解決する。
結果の planDigest（計画ファイルの sha256）は、内容を確認して承認した計画を run-checks --execute /
preview-sample --apply に --approve で渡すための値。計画を 1 バイトでも変えると変わる。
`;

function main() {
  let values;
  try {
    ({ values } = parseFlags(process.argv.slice(2), {
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

  if (!values.plan) {
    process.stderr.write(`${HELP}\n`);
    diag("引数エラー: --plan は必須です");
    process.exit(2);
  }

  let plan;
  let planDigest;
  try {
    ({ plan, digest: planDigest } = readPlanFile(values.plan));
  } catch (err) {
    if (err instanceof PlanError) {
      diag(`計画読み込みエラー: ${err.message}`);
      process.exit(1);
    }
    throw err;
  }

  // 計画内の相対 root は計画ファイル自身のディレクトリを基準に解決する（起動時の cwd に依存しない）。
  const { findings, root } = validatePlanShape(plan, { baseDir: planBaseDir(values.plan) });
  const status = aggregateStatus(findings);

  const unresolved = [];
  if (!Array.isArray(plan.checks) || plan.checks.length === 0) {
    unresolved.push("checks が定義されていません（verify を行う場合は run-checks 前に定義してください）");
  }
  unresolved.push("このスクリプトは形式・存在確認のみを行い、checks の実コマンドは実行していません（run-checks の役割）");

  const result = buildResult({
    mode: "plan",
    command: "validate-plan",
    status,
    profile: "static",
    scope: { planPath: values.plan, root },
    findings,
    unresolved,
    extra: { planDigest },
  });

  const code = emitResult(result, {
    json: values.json,
    humanSummary: (r) =>
      [
        `validate-plan: ${r.status} (plan=${r.scope.planPath})`,
        ...r.findings.map((f) => `  - [${f.status}] ${f.id}: ${f.detail}`),
        `planDigest: ${r.planDigest}`,
      ].join("\n"),
  });
  process.exit(code);
}

main();
