// iit の *_SCHEMA が使う JSON Schema のサブセットを検証する、外部依存なしの検証器。
//
// 役割: agent() が受け取った応答（Codex の最終出力から取り出した JSON）を、
// ホストへ渡す前に schema で検証する境界。不適合な値をホストへ渡さない（受入基準 4）ための唯一の判定。
//
// 対象キーワードは、生成物と開発ファイルの全 schema（`*_SCHEMA` と signedOutputSchema・obj が組む
// インライン schema）を機械的に列挙した結果だけ（2026-11-16・38 個の定数）:
//   type（object・string・integer・array・number・boolean）・properties・required・enum・items・
//   additionalProperties（真偽値のみ）・minimum・maximum・maxLength・maxItems・pattern・description（注釈）
// これ以外のキーワードは assertSupportedSchema が例外にする（fail-closed。未対応のキーワードを黙って
// 無視すると、検証が緩くなったまま不適合な値が通るため）。schema が増えたときは、キーワードを足す前に
// テスト（runner-schema-validate）の列挙が落ちて気づける。
//
// 意味づけは JSON Schema の既定に合わせる: properties は存在するキーだけを検証し、
// additionalProperties の既定は許可、integer は整数値の number。
const SUPPORTED_KEYWORDS = Object.freeze([
  'type', 'properties', 'required', 'enum', 'items', 'additionalProperties',
  'minimum', 'maximum', 'maxLength', 'maxItems', 'pattern', 'description',
])
export { SUPPORTED_KEYWORDS }

const TYPES = Object.freeze(['object', 'string', 'integer', 'array', 'number', 'boolean'])
const MAX_ERRORS = 20
const MAX_ERROR_LENGTH = 200
// maxLength が無い文字列に pattern を実行する長さの上限（超えたら pattern は実行せず不適合にする。ReDoS の抑止）
const MAX_PATTERN_INPUT = 65_536
const MAX_WALK_NODES = 100_000
const SAFE_KEY = /^[A-Za-z0-9_]{1,40}$/
// 値の木に現れたら拒否するキー（own キーとして持つ値は、後段の代入・マージでプロトタイプ汚染の入口になる）
const FORBIDDEN_KEYS = new Set(['__proto__', 'constructor', 'prototype'])

/** エラーに載せるキー名。単純な識別子の形のときだけそのまま載せ、それ以外は値の中身を運ばないよう伏せる。 */
export const safeKeyName = (k) => (typeof k === 'string' && SAFE_KEY.test(k) ? k : '(不正なキー名)')

/** エラー 1 件を 1 行・上限の長さに整える（改行・制御文字は空白にする）。 */
export function sanitizeErrorLine(msg) {
  const flat = String(msg).replace(/[\p{Cc}\u2028\u2029]+/gu, ' ')
  return flat.length > MAX_ERROR_LENGTH ? `${flat.slice(0, MAX_ERROR_LENGTH)}…` : flat
}

const isPlainObject = (x) => x !== null && typeof x === 'object' && !Array.isArray(x)
const isNonNegInt = (x) => Number.isInteger(x) && x >= 0

/**
 * schema 自体が対応範囲の形かを検査する。違反は例外（起動時に 1 度だけ呼ぶ想定）。
 * @param {unknown} schema
 * @param {string} [path]
 */
export function assertSupportedSchema(schema, path = '$') {
  if (!isPlainObject(schema)) throw new Error(`schema がオブジェクトではない（${path}）`)
  for (const key of Object.keys(schema)) {
    if (!SUPPORTED_KEYWORDS.includes(key)) throw new Error(`未対応の JSON Schema キーワード "${key}"（${path}）`)
  }
  const { type, properties, required, enum: en, items, additionalProperties, minimum, maximum, maxLength, maxItems, pattern, description } = schema
  if ('type' in schema && !TYPES.includes(type)) throw new Error(`未対応の type（${path}）: ${JSON.stringify(type)}`)
  if ('properties' in schema) {
    if (!isPlainObject(properties)) throw new Error(`properties がオブジェクトではない（${path}）`)
    for (const [k, v] of Object.entries(properties)) assertSupportedSchema(v, `${path}.${k}`)
  }
  if ('required' in schema && !(Array.isArray(required) && required.every((k) => typeof k === 'string'))) {
    throw new Error(`required が文字列の配列ではない（${path}）`)
  }
  if ('enum' in schema && !(Array.isArray(en) && en.length > 0)) throw new Error(`enum が空でない配列ではない（${path}）`)
  if ('items' in schema) assertSupportedSchema(items, `${path}[]`)
  if ('additionalProperties' in schema && typeof additionalProperties !== 'boolean') {
    throw new Error(`additionalProperties は真偽値だけに対応（${path}）`)
  }
  for (const [k, v] of [['minimum', minimum], ['maximum', maximum]]) {
    if (k in schema && !(typeof v === 'number' && Number.isFinite(v))) throw new Error(`${k} が有限の数ではない（${path}）`)
  }
  for (const [k, v] of [['maxLength', maxLength], ['maxItems', maxItems]]) {
    if (k in schema && !isNonNegInt(v)) throw new Error(`${k} が 0 以上の整数ではない（${path}）`)
  }
  if ('pattern' in schema) {
    if (typeof pattern !== 'string') throw new Error(`pattern が文字列ではない（${path}）`)
    try { new RegExp(pattern) } catch { throw new Error(`pattern が正規表現として不正（${path}）`) }
  }
  if ('description' in schema && typeof description !== 'string') throw new Error(`description が文字列ではない（${path}）`)
}

/**
 * schema 木に現れるキーワードの集合（schema の位置だけを辿る。properties のキー名・enum の値は含めない）。
 * テストの全 schema 列挙と、未知キーワードの検出に使う。
 * @param {unknown} schema
 * @param {Set<string>} [into]
 * @returns {Set<string>}
 */
export function collectKeywords(schema, into = new Set()) {
  if (!isPlainObject(schema)) return into
  for (const [k, v] of Object.entries(schema)) {
    into.add(k)
    if (k === 'properties' && isPlainObject(v)) for (const sub of Object.values(v)) collectKeywords(sub, into)
    else if (k === 'items') collectKeywords(v, into)
  }
  return into
}

function deepEqual(a, b) {
  if (Object.is(a, b)) return true
  if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) return false
  return JSON.stringify(a) === JSON.stringify(b)
}

function typeName(v) {
  if (v === null) return 'null'
  if (Array.isArray(v)) return 'array'
  return typeof v
}

function typeOk(type, v) {
  switch (type) {
    case 'object': return isPlainObject(v)
    case 'array': return Array.isArray(v)
    case 'string': return typeof v === 'string'
    case 'boolean': return typeof v === 'boolean'
    case 'number': return typeof v === 'number' && Number.isFinite(v)
    case 'integer': return typeof v === 'number' && Number.isInteger(v)
    default: return false
  }
}

function check(schema, value, path, errors, regexes) {
  if (errors.length >= MAX_ERRORS) return
  const push = (msg) => { if (errors.length < MAX_ERRORS) errors.push(sanitizeErrorLine(`${path}: ${msg}`)) }
  if ('type' in schema && !typeOk(schema.type, value)) {
    push(`${schema.type} ではない（実際は ${typeName(value)}）`)
    return
  }
  if ('enum' in schema && !schema.enum.some((e) => deepEqual(e, value))) push('enum の候補に無い値')
  if (typeof value === 'string') {
    // maxLength を超えた値には pattern を実行しない（長い入力で正規表現を走らせない）。maxLength が無い schema でも長さの上限を持つ
    const tooLong = 'maxLength' in schema ? [...value].length > schema.maxLength : value.length > MAX_PATTERN_INPUT
    if ('maxLength' in schema && tooLong) push(`maxLength ${schema.maxLength} 超過`)
    if ('pattern' in schema) {
      if (tooLong) { if (!('maxLength' in schema)) push('pattern を検査できない長さの文字列') }
      else if (!regexes.get(schema.pattern).test(value)) push('pattern に不一致')
    }
  }
  if (typeof value === 'number') {
    if ('minimum' in schema && value < schema.minimum) push(`minimum ${schema.minimum} 未満`)
    if ('maximum' in schema && value > schema.maximum) push(`maximum ${schema.maximum} 超過`)
  }
  if (Array.isArray(value)) {
    if ('maxItems' in schema && value.length > schema.maxItems) push(`maxItems ${schema.maxItems} 超過`)
    if ('items' in schema) value.forEach((el, i) => check(schema.items, el, `${path}[${i}]`, errors, regexes))
  }
  if (isPlainObject(value)) {
    for (const key of schema.required ?? []) {
      if (!Object.hasOwn(value, key)) push(`必須キー "${safeKeyName(key)}" が無い`)
    }
    const props = schema.properties ?? {}
    for (const [key, sub] of Object.entries(props)) {
      if (Object.hasOwn(value, key)) check(sub, value[key], `${path}.${safeKeyName(key)}`, errors, regexes)
    }
    if (schema.additionalProperties === false) {
      for (const key of Object.keys(value)) {
        if (!Object.hasOwn(props, key)) push(`未定義のキー "${safeKeyName(key)}"`)
      }
    }
  }
}

/** 値の木のどこかに禁止キー（__proto__・constructor・prototype）の own キーがあるか。走査は上限つき（超えたら true）。 */
function hasForbiddenKey(value) {
  const stack = [value]
  let visited = 0
  while (stack.length > 0) {
    const v = stack.pop()
    if (v === null || typeof v !== 'object') continue
    if (++visited > MAX_WALK_NODES) return true
    for (const k of Array.isArray(v) ? [] : Object.keys(v)) if (FORBIDDEN_KEYS.has(k)) return true
    for (const child of Array.isArray(v) ? v : Object.values(v)) stack.push(child)
  }
  return false
}

/** schema 木の pattern を 1 度だけ RegExp にする（check の中で毎回作らない）。 */
function compilePatterns(schema, into = new Map()) {
  if ('pattern' in schema && !into.has(schema.pattern)) into.set(schema.pattern, new RegExp(schema.pattern))
  if ('properties' in schema) for (const sub of Object.values(schema.properties)) compilePatterns(sub, into)
  if ('items' in schema) compilePatterns(schema.items, into)
  return into
}

/**
 * value が schema に適合するかを検証する。適合なら { ok: true }、不適合なら { ok: false, errors }。
 * errors はパス付きの短い文（値の中身は含めない。キー名は単純な識別子の形のときだけ載せる。
 * 1 件は 1 行・200 文字まで。修復プロンプトとログに載せても秘密や指示を運ばない）で最大 20 件。
 * 未対応のキーワードを持つ schema は例外。呼ぶたびに assertSupportedSchema を通す
 * （検査済みの印を schema オブジェクトに結びつけない。検査後に schema を書き換えられても、次の呼び出しで再検査される）。
 * @param {object} schema
 * @param {unknown} value
 * @returns {{ ok: true } | { ok: false, errors: string[] }}
 */
export function validate(schema, value) {
  assertSupportedSchema(schema)
  const regexes = compilePatterns(schema)
  if (hasForbiddenKey(value)) return { ok: false, errors: ['$: 禁止されたキー名（__proto__・constructor・prototype）または過大な入れ子を含む'] }
  const errors = []
  check(schema, value, '$', errors, regexes)
  return errors.length === 0 ? { ok: true } : { ok: false, errors }
}
