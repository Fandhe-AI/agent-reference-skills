// run-checks 用の安全な実行ラッパー。
// 任意の文字列を eval / shell 展開しない。実行ファイルと引数配列（execFileSync 系）を使う。
// Windows の .cmd / .bat は Node の execFile が shell:false のままでは直接起動できない
// （EINVAL/ENOENT になる）ため、cmd.exe 経由の専用処理に分ける。
//
// 注意: この専用処理は「絶対に安全」ではない。cmd.exe は自身で引数を再解釈するため、
// 引数配列を使っていても cmd.exe 側のメタ文字解釈までは防げない（Node 公式ドキュメントが
// 明記する既知の制約）。ここでは risk を下げる best-effort の実装であり、
// 「任意の不審なリポジトリを安全に実行できる」ことを意味しない。
import { execFileSync } from "node:child_process";

const CMD_LIKE_EXTENSIONS = new Set([".cmd", ".bat"]);

/**
 * platform と command から、実際に起動すべき (file, args) の組を決める。
 * 副作用なし（実行しない）。run-checks 本体とテストの双方から呼べるように分離。
 * @param {string} platform process.platform 相当（テスト時は差し替え可能）
 * @param {string} command
 * @param {string[]} args
 * @returns {{file: string, args: string[], viaShellWrapper: boolean}}
 */
export function resolveExecutionTarget(platform, command, args) {
  if (platform !== "win32") {
    return { file: command, args, viaShellWrapper: false };
  }
  const lower = command.toLowerCase();
  const isCmdLike = [...CMD_LIKE_EXTENSIONS].some((ext) => lower.endsWith(ext));
  if (!isCmdLike) {
    return { file: command, args, viaShellWrapper: false };
  }
  // cmd.exe /d /s /c "<command>" arg1 arg2 ...
  // /d: AutoRun 無効化, /s: 引用符処理を素直にする（cmd.exe のドキュメント上の推奨）
  return {
    file: "cmd.exe",
    args: ["/d", "/s", "/c", command, ...args],
    viaShellWrapper: true,
  };
}

/**
 * 実コマンドを実行する。shell:true は使わない（cmd.exe 経由の場合も file 自体は
 * execFileSync に shell:false のまま渡す — cmd.exe を明示的な実行ファイルとして起動するだけで
 * Node 側で追加の shell 解釈をさせないため）。
 * @returns {{status:"PASS"|"FAIL"|"BLOCKED", exitCode:number|null, signal:string|null, timedOut:boolean, stdoutTail:string, stderrTail:string}}
 */
export function runCheckCommand({ platform = process.platform, command, args = [], cwd, timeoutMs = 60000 }) {
  const target = resolveExecutionTarget(platform, command, args);
  try {
    const stdout = execFileSync(target.file, target.args, {
      cwd,
      timeout: timeoutMs,
      shell: false,
      stdio: ["ignore", "pipe", "pipe"],
      encoding: "utf8",
      windowsHide: true,
    });
    return {
      status: "PASS",
      exitCode: 0,
      signal: null,
      timedOut: false,
      stdoutTail: tail(stdout),
      stderrTail: "",
      viaShellWrapper: target.viaShellWrapper,
    };
  } catch (err) {
    // Node の execFileSync は timeout 到達時、err.code === "ETIMEDOUT" を設定する
    // （err.killed は Node バージョンによって undefined のことがあるため判定に使わない）。
    const timedOut = err.code === "ETIMEDOUT";
    return {
      status: timedOut ? "FAIL" : "FAIL",
      exitCode: typeof err.status === "number" ? err.status : null,
      signal: err.signal ?? null,
      timedOut,
      stdoutTail: tail(err.stdout?.toString?.() ?? ""),
      stderrTail: tail(err.stderr?.toString?.() ?? err.message ?? ""),
      viaShellWrapper: target.viaShellWrapper,
    };
  }
}

function tail(text, maxLen = 2000) {
  if (typeof text !== "string") return "";
  return text.length > maxLen ? `...(truncated)...${text.slice(-maxLen)}` : text;
}
