// 設定・要求で受ける「パスの配列」の検査（純関数）。
//
// 役割: toolConfig.codex.extraWritePaths のように、permission profile の書き込み許可へそのまま入るパスの配列の形を
// 確かめる。文字列 "/tmp/origin" が for…of で 1 文字ずつ展開され `"/"="write"` が入る事故（PR #851 の codex P1）を、
// 設定の読み込み（models.mjs の validateConfig）とアダプタ（adapters/codex.mjs）の両方で止める。
// 条件: 配列・各要素が空でない文字列・絶対パス・正規化済み（resolve(p) === p）・ルート "/" ではない
// （"/" の write は全面許可と同じ）。
import { isAbsolute, resolve } from 'node:path'

/** v が条件を満たすパスの配列なら true。 */
export function isNormalizedAbsPathList(v) {
  return Array.isArray(v) && v.every((p) => typeof p === 'string' && p !== '' && isAbsolute(p) && resolve(p) === p && p !== resolve('/'))
}
