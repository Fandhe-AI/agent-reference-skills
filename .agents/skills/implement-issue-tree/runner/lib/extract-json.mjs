// エージェントの応答テキストから、応答が返した JSON オブジェクトを 1 つ取り出す。
//
// 役割: OpenCode v2 は JSON Schema を強制できないため、応答は前後に文章やコードフェンスが付き得る。
// agent-host が schema 検証へ渡す前の取り出し段で、Codex でも最終出力が壊れたときの保険に使う。
// 取り出した値の正しさは保証しない（適合の判定は schema-validate が行う）。
//
// 対象はオブジェクトだけ（iit の全 schema の最上位は object）。配列・数値だけの応答は取り出さない。
// 採用の順序（曖昧なら採用せず undefined を返し、呼び出し側の修復ターンに回す。最後の 1 つを拾う挙動はしない。
// 応答に含まれる引用文・ログ中の JSON を、エージェントの答えとして取り違えないため）:
//   1. 応答全体（前後の空白を除く）が object として読めるなら、それだけを採用する。
//   2. 応答全体が単一のコードフェンスで、中身が object として読めるなら、それを採用する。
//   3. 上記以外は、文章の中の「JSON として読める最も外側の object」を集め、ちょうど 1 つのときだけ採用する。
//      2 つ以上あるときは undefined。外側が JSON として読めたとき、その内側の部分 object は別候補にしない。
// 文字列リテラルの中の波括弧は数えない。
const MAX_INPUT = 2 * 1024 * 1024
// 閉じない `{` が大量にある入力での二次の走査を避ける上限。試行の回数と、走査した文字の総量の両方で打ち切る
// （超えたら採用せず undefined。部分的な結果から 1 つを選ばない）
const MAX_ATTEMPTS = 1000
const MAX_SCANNED = 8 * 1024 * 1024

const WHOLE_FENCE = /^```[A-Za-z0-9_-]*\r?\n([\s\S]*?)\r?\n?```$/

const isObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v)

function parseObject(text) {
  try {
    const v = JSON.parse(text)
    return isObject(v) ? v : undefined
  } catch {
    return undefined
  }
}

/** start の `{` に対応する `}` の位置（無ければ -1）。走査した文字数を budget.scanned に足し、超過で -2 を返す。 */
function balancedEnd(text, start, budget) {
  let depth = 0
  let inStr = false
  for (let i = start; i < text.length; i++) {
    if (++budget.scanned > MAX_SCANNED) return -2
    const c = text[i]
    if (inStr) {
      if (c === '\\') i++
      else if (c === '"') inStr = false
      continue
    }
    if (c === '"') inStr = true
    else if (c === '{') depth++
    else if (c === '}' && --depth === 0) return i
  }
  return -1
}

/**
 * @param {string} text
 * @returns {object | undefined} 一意に決まらない・見つからない・上限超過のときは undefined
 */
export function extractLastJson(text) {
  if (typeof text !== 'string' || text.length === 0 || text.length > MAX_INPUT) return undefined
  const trimmed = text.trim()
  const whole = parseObject(trimmed)
  if (whole !== undefined) return whole
  const fence = WHOLE_FENCE.exec(trimmed)
  if (fence) {
    const inner = parseObject(fence[1].trim())
    if (inner !== undefined) return inner
  }

  const found = []
  const budget = { scanned: 0 }
  let attempts = 0
  let i = text.indexOf('{')
  while (i >= 0) {
    if (++attempts > MAX_ATTEMPTS) return undefined
    const end = balancedEnd(text, i, budget)
    if (end === -2) return undefined
    if (end > i) {
      const v = parseObject(text.slice(i, end + 1))
      if (v !== undefined) {
        found.push(v)
        if (found.length > 1) return undefined
        i = text.indexOf('{', end + 1)
        continue
      }
    }
    // JSON として読めない塊は、内側の `{` から探し直す
    i = text.indexOf('{', i + 1)
  }
  return found.length === 1 ? found[0] : undefined
}

/** 名前が実態に合う別名（最後の 1 つではなく、一意に決まる 1 つを返す）。 */
export const extractJsonObject = extractLastJson
