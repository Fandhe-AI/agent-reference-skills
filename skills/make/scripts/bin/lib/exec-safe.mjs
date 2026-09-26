// run-checks 用の安全な実行ラッパー。
// 任意の文字列を eval / shell 展開しない。実行ファイルと引数配列（execFileSync 系）を使う。
// Windows の .cmd / .bat は Node の execFile が shell:false のままでは直接起動できない
// （EINVAL/ENOENT になる）ため、cmd.exe 経由の専用処理に分ける。
//
// 注意: この専用処理は「絶対に安全」ではない。cmd.exe は自身で引数を再解釈するため、
// 引数配列を使っていても cmd.exe 側のメタ文字解釈までは防げない（Node 公式ドキュメントが
// 明記する既知の制約）。ここでは risk を下げる best-effort の実装であり、
// 「任意の不審なリポジトリを安全に実行できる」ことを意味しない。
// そのため cmd.exe 経由になる場合は、cmd.exe がコマンド区切り・リダイレクト・変数展開として
// 再解釈し得る文字を含む引数を実行せず BLOCKED にする（承認したコマンドと異なる処理を走らせない）。
import { execFileSync } from "node:child_process";

const CMD_LIKE_EXTENSIONS = new Set([".cmd", ".bat"]);
// cmd.exe が解釈するメタ文字（区切り & |、リダイレクト < >、エスケープ ^、変数展開 % !、
// 引用・グループ化 " ( )、空白・改行）。cmd.exe /c は引数を 1 本のコマンド行へ連結して
// 再解釈するため、空白を含む引数も分割されて承認時と異なる引数になる。これらを含む引数や
// 空文字列の引数は cmd.exe 経由では実行しない（安全に引用できる保証がないため BLOCKED）。
const CMD_META_RE = /[&|<>^%!"()\s]/;

/**
 * platform と command から、実際に起動すべき (file, args) の組を決める。
 * 副作用なし（実行しない）。run-checks 本体とテストの双方から呼べるように分離。
 * @param {string} platform process.platform 相当（テスト時は差し替え可能）
 * @param {string} command
 * @param {string[]} args
 * @returns {{file: string, args: string[], viaShellWrapper: boolean, unsafeReason?: string}}
 *   unsafeReason がある場合、呼び出し元は実行してはならない（runCheckCommand は BLOCKED を返す）。
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
  const target = {
    file: "cmd.exe",
    args: ["/d", "/s", "/c", command, ...args],
    viaShellWrapper: true,
  };
  const unsafe = [command, ...args].find((a) => a.length === 0 || CMD_META_RE.test(a));
  if (unsafe !== undefined) {
    target.unsafeReason = `cmd.exe が再解釈し得る文字を含む引数は .cmd/.bat 経由で実行しません: ${JSON.stringify(unsafe)}`;
  }
  return target;
}

/**
 * 実コマンドを実行する。shell:true は使わない（cmd.exe 経由の場合も file 自体は
 * execFileSync に shell:false のまま渡す — cmd.exe を明示的な実行ファイルとして起動するだけで
 * Node 側で追加の shell 解釈をさせないため）。
 * コマンドの stdout / stderr は収集も表示もしない（stdio: "ignore"）。検証コマンドがトークン等を
 * 出力しても結果 JSON・ログへ混入させないため。失敗の詳細は利用者がコマンドを直接実行して確認する。
 * @returns {{status:"PASS"|"FAIL"|"BLOCKED", executed:boolean, exitCode:number|null, signal:string|null, timedOut:boolean, errorCode:string|null, reason?:string, viaShellWrapper:boolean}}
 */
export function runCheckCommand({ platform = process.platform, command, args = [], cwd, timeoutMs = 60000 }) {
  const target = resolveExecutionTarget(platform, command, args);
  if (target.unsafeReason) {
    return {
      status: "BLOCKED",
      executed: false,
      exitCode: null,
      signal: null,
      timedOut: false,
      errorCode: null,
      reason: target.unsafeReason,
      viaShellWrapper: target.viaShellWrapper,
    };
  }
  try {
    execFileSync(target.file, target.args, {
      cwd,
      timeout: timeoutMs,
      shell: false,
      stdio: "ignore",
      windowsHide: true,
    });
    return {
      status: "PASS",
      executed: true,
      exitCode: 0,
      signal: null,
      timedOut: false,
      errorCode: null,
      viaShellWrapper: target.viaShellWrapper,
    };
  } catch (err) {
    // Node の execFileSync は timeout 到達時、err.code === "ETIMEDOUT" を設定する
    // （err.killed は Node バージョンによって undefined のことがあるため判定に使わない）。
    const timedOut = err.code === "ETIMEDOUT";
    // err.message は起動引数を含み得るため結果へ載せず、OS のエラーコード（ENOENT 等）だけを返す
    return {
      status: "FAIL",
      executed: true,
      exitCode: typeof err.status === "number" ? err.status : null,
      signal: err.signal ?? null,
      timedOut,
      errorCode: typeof err.code === "string" && !timedOut ? err.code : null,
      viaShellWrapper: target.viaShellWrapper,
    };
  }
}
