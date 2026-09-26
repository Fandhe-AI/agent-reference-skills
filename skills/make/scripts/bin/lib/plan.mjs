// 計画（plan）JSON の読み込み・形式検証・パス逸脱検出。
// validate-plan と run-checks の双方から使う（run-checks が独自の緩い読み込みをして
// 古い/改変された計画を信用しないようにするため、検証ロジックを共有する）。
import { readFileSync, existsSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, resolve } from "node:path";
import { resolveRoot, resolvePlanPath } from "./paths.mjs";

export class PlanError extends Error {}

const VALID_ACTIONS = new Set(["create", "modify", "delete"]);
// この CLI が解釈できる計画スキーマの版。未知の版（将来版を含む）は検証を通さず、
// run-checks がそのコマンドを実行しないようにする。
export const SUPPORTED_PLAN_SCHEMA_VERSIONS = new Set(["1.0.0"]);
const VALID_EXPECTED_STATES = new Set(["absent", "present", "matches-hash", "any"]);

function isPlainObject(v) {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

// 対象パスの実際の状態を返す。存在しない場合は "absent"、通常ファイルなら "file"、それ以外
// （ディレクトリ等）は "other"。stat の失敗は例外にせず "error" として finding に変換させる。
function entryKind(p) {
  if (!existsSync(p)) return "absent";
  try {
    return statSync(p).isFile() ? "file" : "other";
  } catch {
    return "error";
  }
}

/**
 * plan ファイルを読み込み JSON.parse する。存在しない・壊れている場合は PlanError。
 */
export function loadPlanFile(planPath) {
  if (!existsSync(planPath)) {
    throw new PlanError(`計画ファイルが存在しません: ${planPath}`);
  }
  let raw;
  try {
    raw = readFileSync(planPath, "utf8");
  } catch (err) {
    throw new PlanError(`計画ファイルを読み込めません: ${err.message}`);
  }
  let json;
  try {
    json = JSON.parse(raw);
  } catch (err) {
    throw new PlanError(`計画ファイルが JSON として不正です: ${err.message}`);
  }
  return json;
}

/**
 * 計画 JSON ファイルのパスから、その相対パス解決基準ディレクトリ（絶対パス）を求める。
 * 計画内の相対 root はこのディレクトリを基準に解決する（起動時の cwd を使わない）。
 * @param {string} planPath --plan に渡された値（相対・絶対どちらも可）
 */
export function planBaseDir(planPath) {
  return dirname(resolve(process.cwd(), planPath));
}

/**
 * 計画の形式・対象 root・変更対象・元ファイル状態・パス逸脱・衝突・検証定義を検証する。
 * ファイルシステムへの書き込み・コマンド実行は一切行わない（stat による存在確認のみ）。
 * @param {object} plan loadPlanFile が返した計画 JSON
 * @param {object} [opts]
 * @param {string} [opts.baseDir] 計画内の相対 root を解決する基準ディレクトリ（既定: process.cwd()）。
 *   同じ計画ファイルが異なる cwd から起動されても同じ結果になるよう、呼び出し元は
 *   `planBaseDir(値.plan)` の結果を渡すこと（絶対 root はこの基準に関係なくそのまま使われる）。
 * @returns {{findings: Array<object>, root: string|null}}
 */
export function validatePlanShape(plan, { baseDir = process.cwd() } = {}) {
  const findings = [];

  if (typeof plan !== "object" || plan === null || Array.isArray(plan)) {
    findings.push({ id: "schema", status: "FAIL", detail: "計画は JSON オブジェクトである必要があります" });
    return { findings, root: null };
  }
  if (typeof plan.schemaVersion !== "string") {
    findings.push({ id: "schema", status: "FAIL", detail: "schemaVersion が必要です" });
  } else if (!SUPPORTED_PLAN_SCHEMA_VERSIONS.has(plan.schemaVersion)) {
    findings.push({
      id: "schema",
      status: "FAIL",
      detail: `未対応の schemaVersion です: ${plan.schemaVersion}（対応: ${[...SUPPORTED_PLAN_SCHEMA_VERSIONS].join(", ")}）`,
    });
  }
  if (typeof plan.root !== "string" || plan.root.length === 0) {
    findings.push({ id: "root", status: "FAIL", detail: "root（対象ディレクトリ）が必要です" });
    return { findings, root: null };
  }

  let root;
  try {
    root = resolveRoot(plan.root, { mustExist: true, baseDir });
  } catch (err) {
    findings.push({ id: "root", status: "FAIL", detail: err.message });
    return { findings, root: null };
  }
  findings.push({ id: "root", status: "PASS", detail: `root を確認: ${root}` });

  const changes = Array.isArray(plan.changes) ? plan.changes : [];
  if (!Array.isArray(plan.changes)) {
    findings.push({ id: "changes", status: "FAIL", detail: "changes は配列である必要があります" });
  }
  for (const [i, change] of changes.entries()) {
    const label = `changes[${i}]`;
    // null・配列・プリミティブを要素に含む計画でも例外終了させず、構造化された FAIL として返す
    if (!isPlainObject(change)) {
      findings.push({ id: label, status: "FAIL", detail: "changes の各要素はオブジェクトである必要があります" });
      continue;
    }
    if (typeof change.path !== "string" || change.path.length === 0) {
      findings.push({ id: label, status: "FAIL", detail: "path が必要です" });
      continue;
    }
    if (!VALID_ACTIONS.has(change.action)) {
      findings.push({ id: label, status: "FAIL", detail: `action が不正です: ${change.action}` });
    }
    if (change.expectedState !== undefined && !VALID_EXPECTED_STATES.has(change.expectedState)) {
      findings.push({ id: label, status: "FAIL", detail: `expectedState が不正です: ${change.expectedState}` });
    }

    const resolved = resolvePlanPath(root, change.path);
    if (resolved.escaped) {
      findings.push({
        id: label,
        status: "FAIL",
        detail: `root 外への逸脱を検出（${resolved.reason}）: ${change.path}`,
      });
      continue;
    }

    const kind = entryKind(resolved.resolved);
    const exists = kind !== "absent";
    if (kind === "error") {
      findings.push({ id: label, status: "FAIL", detail: `対象の状態を確認できません: ${change.path}` });
      continue;
    }
    if (change.action === "create" && exists) {
      findings.push({
        id: label,
        status: "FAIL",
        detail: `衝突: create 指定だが既存ファイルがあります: ${change.path}`,
      });
    } else if (change.action === "modify" && !exists) {
      findings.push({
        id: label,
        status: "FAIL",
        detail: `modify 指定だが元ファイルが存在しません: ${change.path}`,
      });
    } else if (change.action === "modify" && kind !== "file") {
      findings.push({
        id: label,
        status: "FAIL",
        detail: `modify 指定だが対象が通常ファイルではありません: ${change.path}`,
      });
    } else if (change.action === "delete" && !exists) {
      findings.push({
        id: label,
        status: "SKIPPED",
        detail: `delete 指定だが対象が既に存在しません（no-op）: ${change.path}`,
      });
    } else {
      findings.push({ id: label, status: "PASS", detail: `${change.action} の前提を確認: ${change.path}` });
    }

    // expectedState は宣言だけ受理して比較しない状態にしない。absent / present は実際の存在状態と、
    // matches-hash は元ファイルの実際の内容（sha256）と計画の contentHash を突き合わせる。
    if (change.expectedState === "absent" || change.expectedState === "present") {
      const actual = exists ? "present" : "absent";
      if (actual === change.expectedState) {
        findings.push({
          id: label,
          status: "PASS",
          detail: `expectedState: ${change.expectedState} と実際の状態が一致: ${change.path}`,
        });
      } else {
        findings.push({
          id: label,
          status: "FAIL",
          detail: `expectedState: ${change.expectedState} だが実際は ${actual} です（計画作成時から状態が変わっています）: ${change.path}`,
        });
      }
    } else if (change.expectedState === "matches-hash") {
      if (typeof change.contentHash !== "string" || !/^sha256:[0-9a-f]{64}$/.test(change.contentHash)) {
        findings.push({
          id: label,
          status: "FAIL",
          detail: `expectedState: matches-hash には "sha256:<64桁16進数>" 形式の contentHash が必要です: ${change.path}`,
        });
      } else if (!exists) {
        findings.push({
          id: label,
          status: "FAIL",
          detail: `matches-hash を指定していますが元ファイルが存在しません: ${change.path}`,
        });
      } else if (kind !== "file") {
        findings.push({
          id: label,
          status: "FAIL",
          detail: `matches-hash を指定していますが対象が通常ファイルではありません: ${change.path}`,
        });
      } else {
        let actualHash = null;
        try {
          actualHash = `sha256:${createHash("sha256").update(readFileSync(resolved.resolved)).digest("hex")}`;
        } catch (err) {
          findings.push({ id: label, status: "FAIL", detail: `元ファイルを読み込めません（${err.code ?? err.message}）: ${change.path}` });
        }
        if (actualHash === change.contentHash) {
          findings.push({
            id: label,
            status: "PASS",
            detail: `元ファイルの内容が計画の contentHash と一致（変更されていません）: ${change.path}`,
          });
        } else if (actualHash !== null) {
          findings.push({
            id: label,
            status: "FAIL",
            detail: `元ファイルの内容が計画作成時から変更されています（contentHash 不一致。古い承認を再利用しないでください）: ${change.path}`,
          });
        }
      }
    }
  }

  // checks は省略可（検証なしの計画）。ただし指定されている場合は配列以外を黙って空扱いにしない。
  const checks = Array.isArray(plan.checks) ? plan.checks : [];
  if (plan.checks !== undefined && !Array.isArray(plan.checks)) {
    findings.push({ id: "checks", status: "FAIL", detail: "checks は配列である必要があります" });
  }
  for (const [i, check] of checks.entries()) {
    const label = `checks[${i}]`;
    if (!isPlainObject(check)) {
      findings.push({ id: label, status: "FAIL", detail: "checks の各要素はオブジェクトである必要があります" });
      continue;
    }
    if (typeof check.name !== "string" || check.name.length === 0) {
      findings.push({ id: label, status: "FAIL", detail: "name が必要です" });
    }
    if (typeof check.command !== "string" || check.command.length === 0) {
      findings.push({ id: label, status: "FAIL", detail: "command（実行ファイル名）が必要です" });
    } else if (/[\s|&;$><`]/.test(check.command)) {
      findings.push({
        id: label,
        status: "FAIL",
        detail: "command に空白・shell メタ文字を含めることはできません（実行ファイル名のみ）",
      });
    }
    if (check.args !== undefined && !Array.isArray(check.args)) {
      findings.push({ id: label, status: "FAIL", detail: "args は配列である必要があります" });
    } else if (Array.isArray(check.args) && !check.args.every((a) => typeof a === "string")) {
      // execFileSync へそのまま渡すため、数値・オブジェクト等は実行前にここで拒否する
      findings.push({ id: label, status: "FAIL", detail: "args の各要素は文字列である必要があります" });
    }
    if (check.cwd !== undefined && (typeof check.cwd !== "string" || check.cwd.length === 0)) {
      findings.push({ id: label, status: "FAIL", detail: "cwd は空でない文字列である必要があります" });
    } else if (check.cwd !== undefined) {
      const cwdResolved = resolvePlanPath(root, check.cwd);
      if (cwdResolved.escaped) {
        findings.push({
          id: label,
          status: "FAIL",
          detail: `cwd が root 外へ逸脱します（${cwdResolved.reason}）: ${check.cwd}`,
        });
      } else if (!existsSync(cwdResolved.resolved) || !statSync(cwdResolved.resolved).isDirectory()) {
        findings.push({ id: label, status: "FAIL", detail: `cwd が存在しないかディレクトリではありません: ${check.cwd}` });
      }
    }
    if (check.timeoutMs !== undefined && (typeof check.timeoutMs !== "number" || check.timeoutMs <= 0)) {
      findings.push({ id: label, status: "FAIL", detail: "timeoutMs は正の数値である必要があります" });
    }
    if (check.approved !== undefined && typeof check.approved !== "boolean") {
      findings.push({ id: label, status: "FAIL", detail: "approved は真偽値である必要があります" });
    }
  }

  return { findings, root };
}
