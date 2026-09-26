// 共通の結果契約（JSON 出力・終了コード）を集約するモジュール。
// 5本の補助 CLI（inspect-repo / validate-plan / preview-sample / verify-layout / run-checks）が
// 共有する。ここでの契約を変えると全 CLI の出力形状・終了コードが変わるため単独では変更しない。

export const SCHEMA_VERSION = "1.0.0";

// status は「合格したことにしない」区別を保つための固定語彙。
// PASS: 検証・確認が完了し問題なし
// FAIL: 検証・確認が完了し問題あり（または実行が失敗した）
// BLOCKED: 承認・権限・前提が不足していて実行できなかった（PASS に変換しない）
// SKIPPED: 対象外・未実行（dry-run 等。PASS に変換しない）
// NOT_APPLICABLE: この profile/scope では判定できない・該当しない
export const STATUS = Object.freeze({
  PASS: "PASS",
  FAIL: "FAIL",
  BLOCKED: "BLOCKED",
  SKIPPED: "SKIPPED",
  NOT_APPLICABLE: "NOT_APPLICABLE",
});

// 終了コード契約（全 CLI 共通）。
// 0 = 成功（status が PASS / SKIPPED / NOT_APPLICABLE の場合。SKIPPED 等は「失敗」ではなく
//     「判定不能・対象外」を表すため、プロセスとしては異常終了ではない。JSON の status フィールドで
//     区別を保持する）
// 1 = FAIL（検証・実行の結果、問題が見つかった／コマンドが失敗した）
// 2 = 引数エラー・使用方法の誤り
// 3 = BLOCKED（承認・前提不足で実行できなかった）
export const EXIT_CODE = Object.freeze({
  OK: 0,
  FAIL: 1,
  ARG_ERROR: 2,
  BLOCKED: 3,
});

export function exitCodeForStatus(status) {
  switch (status) {
    case STATUS.FAIL:
      return EXIT_CODE.FAIL;
    case STATUS.BLOCKED:
      return EXIT_CODE.BLOCKED;
    case STATUS.PASS:
    case STATUS.SKIPPED:
    case STATUS.NOT_APPLICABLE:
      return EXIT_CODE.OK;
    default:
      throw new Error(`unknown status: ${status}`);
  }
}

// findings/checks の配列から全体 status を導く。BLOCKED 優先度 > FAIL > SKIPPED 部分 > PASS。
// 「未確認」「BLOCKED」を含む場合に全体を PASS へ丸めない。
export function aggregateStatus(items, statusKey = "status") {
  if (!Array.isArray(items) || items.length === 0) {
    return STATUS.NOT_APPLICABLE;
  }
  const statuses = new Set(items.map((item) => item[statusKey]));
  if (statuses.has(STATUS.BLOCKED)) return STATUS.BLOCKED;
  if (statuses.has(STATUS.FAIL)) return STATUS.FAIL;
  if (statuses.has(STATUS.SKIPPED) && !statuses.has(STATUS.PASS)) {
    // 全件 SKIPPED（または SKIPPED + NOT_APPLICABLE のみ）なら SKIPPED を表に出す
    if ([...statuses].every((s) => s === STATUS.SKIPPED || s === STATUS.NOT_APPLICABLE)) {
      return STATUS.SKIPPED;
    }
  }
  if (statuses.has(STATUS.NOT_APPLICABLE) && statuses.size === 1) {
    return STATUS.NOT_APPLICABLE;
  }
  if ([...statuses].every((s) => s === STATUS.PASS)) return STATUS.PASS;
  // PASS と SKIPPED/NOT_APPLICABLE の混在は「全部確認できたわけではない」ので PASS に丸めない
  return STATUS.SKIPPED;
}

/**
 * 結果オブジェクトを組み立てる。全 CLI 共通のフィールド集合。
 * @param {object} params
 * @param {"consult"|"audit"|"plan"|"apply"|"verify"} params.mode
 * @param {string} params.command CLI 名（例: "inspect-repo"）
 * @param {string} params.status STATUS のいずれか
 * @param {string} params.profile 実行プロファイル（例: "static", "dry-run", "execute"）
 * @param {object} params.scope 対象範囲（root 等）
 * @param {Array<object>} [params.findings]
 * @param {Array<object>} [params.checks]
 * @param {Array<string>} [params.unresolved] 未確認事項
 * @param {object} [params.cache] キャッシュ利用の有無・種別（合否とは別フィールド）
 * @param {object} [params.extra] CLI 固有の追加フィールド
 */
export function buildResult(params) {
  const {
    mode,
    command,
    status,
    profile,
    scope,
    findings,
    checks,
    unresolved = [],
    cache = { used: false },
    extra = {},
  } = params;
  const result = {
    schemaVersion: SCHEMA_VERSION,
    command,
    mode,
    status,
    profile,
    scope,
    cache,
    unresolved,
    ...extra,
  };
  if (findings !== undefined) result.findings = findings;
  if (checks !== undefined) result.checks = checks;
  return result;
}

/**
 * 結果を出力する。--json 指定時は stdout を JSON のみにし、診断は stderr へ。
 * 非 JSON 時は人間可読の要約を stdout に出す。
 */
export function emitResult(result, { json, humanSummary } = {}) {
  if (json) {
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  } else {
    process.stdout.write(`${humanSummary ? humanSummary(result) : JSON.stringify(result, null, 2)}\n`);
  }
  return exitCodeForStatus(result.status);
}

export function diag(...args) {
  // 診断ログは常に stderr（--json 指定時に stdout を汚さないため）
  console.error(...args);
}
