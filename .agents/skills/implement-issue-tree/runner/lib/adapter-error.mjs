// アダプタ（runner/adapters/<tool>.mjs）が agent-host・run.mjs へ失敗を伝える唯一の例外型。
//
// 契約（_/local-plans/iit-runner-adapter-contract.md。クラス名・kind・sessionRef の名前は変えない）:
//   - アダプタの start() / run() / close() は、失敗を AdapterError(kind, message, { sessionRef? }) で投げる。
//   - kind は KINDS の 6 つだけ。agent-host は run() の AdapterError をすべて null（Workflow 版の
//     「StructuredOutput が返らなかった」と同じ値）に倒し、run.mjs は start() の 'prereq' を終了コード 3 にする。
//   - sessionRef は修復ターンや後片づけのための参照（Codex のセッション UUID）。
// message はログにだけ載せる。秘密（トークン・認証ファイルの中身）を入れないのはアダプタの責務。

/** kind の一覧。timeout = 時間切れで停止した / usage-limit = 利用上限 / exit = プロセスの異常終了 /
 * api = API・プロトコルの失敗 / denied = 権限で拒否された / prereq = 前提の不足（ツール未導入・版・認証）。 */
export const KINDS = Object.freeze(['timeout', 'usage-limit', 'exit', 'api', 'denied', 'prereq'])

export class AdapterError extends Error {
  /**
   * @param {'timeout'|'usage-limit'|'exit'|'api'|'denied'|'prereq'} kind
   * @param {string} message
   * @param {{ sessionRef?: string }} [extra]
   */
  constructor(kind, message, { sessionRef } = {}) {
    if (!KINDS.includes(kind)) throw new TypeError(`AdapterError の kind が未知: ${String(kind)}`)
    super(String(message))
    this.name = 'AdapterError'
    this.kind = kind
    if (sessionRef !== undefined) this.sessionRef = String(sessionRef)
  }
}

/** 別モジュール境界（動的 import したアダプタが自前の最小定義を持つ場合）でも判定できるよう、形で見る。 */
export function isAdapterError(e) {
  return e instanceof AdapterError || (e !== null && typeof e === 'object' && e.name === 'AdapterError' && KINDS.includes(e.kind))
}
