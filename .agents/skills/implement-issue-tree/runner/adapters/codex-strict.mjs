// iit の JSON Schema を Codex の `--output-schema`（strict 構造化出力）が受理する形へ変換し、
// 応答を元の schema の形へ戻す。Codex アダプタ（codex.mjs）の下請けで、副作用は無い純関数。
//
// strict が課す制約: すべての object が additionalProperties:false で、properties の全キーが required。
// そのため次の規則で変換し、応答は元の schema を見ながら戻す（実測は _/local-plans/iit-runners-phase0.md の 0-1）。
//   1. properties を持つ object: additionalProperties:false・required は全キー。元が任意のキーは null 許容にする
//      （type に 'null' を足す・enum に null を足す・type が無ければ anyOf で包む）。説明の末尾に「省くときは null」を足す
//      （OMIT_HINT。元から null を許すキーには足さない。null が値の意味を持つため）。
//   2. properties を持たない object（自由形式。additionalProperties が true・省略・schema）: [{key, value}] の配列へ置き換える。
//      value は additionalProperties が schema ならその型、そうでなければ JSON を文字列化したもの。
//   3. oneOf は anyOf へ置き換える（strict は oneOf を受理しない）。
// 戻すとき:
//   - 元が任意で、応答が null のキーは落とす。ただし元の schema が null を許すキーと、自由形式の値（JSON 文字列から
//     読み戻した値）は null を保つ。封筒の payload は自由形式で、sha256(canonicalJson(payload)) が全キーに依存するため、
//     null を落とすと検証が壊れる。
//   - 自由形式の値が JSON として読めなければ文字列のまま残す。元の schema の検証が不合格にし、agent-host の修復に回る
//     （アダプタは修復を要求しない）。
const isObj = (x) => x !== null && typeof x === 'object' && !Array.isArray(x)
const typesOf = (s) => (s.type === undefined ? [] : Array.isArray(s.type) ? s.type : [s.type])
const isObjectSchema = (s) => isObj(s) && (typesOf(s).includes('object') || (s.type === undefined && isObj(s.properties)))
const isFreeObject = (s) => isObjectSchema(s) && (!isObj(s.properties) || Object.keys(s.properties).length === 0) && s.additionalProperties !== false
export const allowsNull = (s) => isObj(s) && (typesOf(s).includes('null') || (Array.isArray(s.enum) && s.enum.includes(null)))

// 任意のキーの説明に足す文面。strict では全キーが required になり、モデルは欄を省けない。省き方を示さないと、
// 「封筒に出たときだけ」の欄に空文字等を書き、戻した応答に元に無い欄が残る（封筒の sha256 の再計算・欄の有無の検査で拒否される）。
// 「無ければ空文字」のように空文字を値として指示する説明とも矛盾しないよう、空文字の禁止ではなく「省く = null」とだけ書く
export const OMIT_HINT = 'この欄を省くときは null を書く'
const withOmitHint = (description) => (typeof description === 'string' && description !== '' ? `${description}（${OMIT_HINT}）` : OMIT_HINT)

function nullable(w) {
  if (allowsNull(w)) return w
  const withEnum = Array.isArray(w.enum) ? { enum: [...w.enum, null] } : {}
  if (w.type === undefined) {
    const { description, ...rest } = w
    return { anyOf: [rest, { type: 'null' }], description: withOmitHint(description) }
  }
  return { ...w, type: [...typesOf(w), 'null'], ...withEnum, description: withOmitHint(w.description) }
}

/** 元の schema から strict 用の schema を作る（入力は変更しない）。 */
export function strictifySchema(schema) {
  const walk = (s) => {
    if (!isObj(s)) return s
    const o = { ...s }
    if (Array.isArray(o.oneOf)) { o.anyOf = o.oneOf; delete o.oneOf }
    if (Array.isArray(o.anyOf)) o.anyOf = o.anyOf.map(walk)
    if (isFreeObject(o)) {
      const typed = isObj(o.additionalProperties)
      const { description } = o
      return {
        type: 'array',
        ...(description ? { description: `${description}（[{key, value}] の配列。value は ${typed ? '値' : 'JSON を文字列化したもの'}）` } : {}),
        items: {
          type: 'object',
          properties: { key: { type: 'string' }, value: typed ? walk(o.additionalProperties) : { type: 'string' } },
          required: ['key', 'value'],
          additionalProperties: false,
        },
      }
    }
    if (isObjectSchema(o)) {
      const req = new Set(Array.isArray(o.required) ? o.required : [])
      const props = {}
      for (const [k, v] of Object.entries(o.properties ?? {})) {
        const w = walk(v)
        props[k] = req.has(k) ? w : nullable(w)
      }
      o.properties = props
      o.required = Object.keys(props)
      o.additionalProperties = false
    }
    if (isObj(o.items)) o.items = walk(o.items)
    return o
  }
  return walk(schema)
}

function setOwn(obj, key, value) {
  Object.defineProperty(obj, key, { value, enumerable: true, writable: true, configurable: true })
}

function parseJsonString(v) {
  if (typeof v !== 'string') return v
  try { return JSON.parse(v) } catch { return v }
}

/** strict 形の応答を、元の schema の形へ戻す（入力は変更しない）。 */
export function decodeStrictValue(schema, value) {
  if (!isObj(schema)) return value
  if (isFreeObject(schema) && Array.isArray(value)) {
    const typed = isObj(schema.additionalProperties)
    const out = {}
    for (const e of value) {
      if (!isObj(e) || typeof e.key !== 'string') continue
      setOwn(out, e.key, typed ? decodeStrictValue(schema.additionalProperties, e.value) : parseJsonString(e.value))
    }
    return out
  }
  if (Array.isArray(value)) return value.map((x) => decodeStrictValue(schema.items, x))
  if (isObj(value) && isObjectSchema(schema)) {
    const req = new Set(Array.isArray(schema.required) ? schema.required : [])
    const props = isObj(schema.properties) ? schema.properties : {}
    const out = {}
    for (const [k, v] of Object.entries(value)) {
      if (v === null && !req.has(k) && !allowsNull(props[k])) continue
      setOwn(out, k, decodeStrictValue(props[k], v))
    }
    return out
  }
  return value
}

/**
 * 応答テキストを元の schema の形の JSON テキストへ戻す。JSON として読めない・object でないテキストは触らず返す
 * （agent-host の抽出と修復に任せる）。
 */
export function decodeStrictText(schema, text) {
  let v
  try { v = JSON.parse(String(text).trim()) } catch { return text }
  if (!isObj(v)) return text
  return JSON.stringify(decodeStrictValue(schema, v))
}
