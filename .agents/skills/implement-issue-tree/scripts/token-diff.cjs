// build-workflow の変換前後でトークン列（種類・テキスト・開始行）が一致することを、Node 同梱の
// acorn で検証するヘルパー。ビルダー（build-workflow.mjs）がビルド時の照合（生成物のトークン列が
// src と一致しなければ書き込まず中止する fail-closed 検査）に使い、tests/build-workflow.test.mjs も
// 同じ比較を使う。ビルダーの lexer は `/` の判別（除算と正規表現）を誤り得るため、文字列・テンプレート・
// 正規表現の中身が詰められていないこと、コードがコメントとして消えていないことを、lexer とは独立の
// 字句解析で確かめる。acorn は内部モジュール（internal/deps/acorn/...）で、`node --expose-internals`
// を付けた子プロセスでしか読み込めないため、呼び出し側が spawnSync で本ファイルを起動する（通常の
// `node` / `node --test` は --expose-internals を伝播しない）。acorn を取得できない Node では
// require が失敗して非ゼロで終了する（呼び出し側はそれを検査の失敗として扱い、黙って飛ばさない）。
//
// 入力（stdin）: JSON `[{ "name": string, "mode": "parse" | "tokenize", "before": string, "after": string, "lenient"?: boolean }]`
// 出力（stdout）: JSON `{ "acornVersion": string, "results": [{ "name", "ok", "kind", "detail" }] }`
//   ok が true = 変換前後のトークン列が完全一致。kind は ok のとき "match"、不一致のとき
//   "mismatch" | "source-unparsable"（変換前を解釈できない = 検査できない）| "artifact-unparsable"（変換後を解釈できない）。
//   mode は必須（省略は例外）。ビルドと --check が使うのは "parse" で、"tokenize" はテスト専用。
//
// mode: "parse"（ビルド・--check・実ファイルの照合）
//   acorn.parse の onToken で集めたトークン列を比べる。パーサがトークンごとに文脈（`/` が除算か正規表現か、
//   `if (x) /re/` の括弧の意味、ブロックかオブジェクトリテラルか、for await の括弧）を決めるので、ビルダーの
//   lexer と同じ位置で `/` を誤読しても、src と生成物が「同じ誤読」で一致して通ってしまうことがない。
//   どちらかがパースできなければ ok: false にする（変換前がパースできないなら検査できないので中止、
//   変換後がパースできないなら生成物が壊れている）。tokenizer へフォールバックしない。
//   2 つのゴールで読み、**両方**で一致することを要求する:
//   - module: 開発ファイルの書き方どおり（先頭が `export const meta`）。ecmaVersion は latest、
//     allowReturnOutsideFunction は必須（実 src implement-issue-tree.src.js は Workflow スクリプトで最上位に
//     return を持つ）。top-level await は module + ecmaVersion latest で既定で許可される
//   - script: Workflow ランタイムが実際に評価する形。ランタイムは module ではなく、先頭の `export const meta`
//     の `export ` を外した本体を関数本体（AsyncFunction）として評価する（tests/lib/workflow-script-contract.mjs
//     の stripMetaExport と同じ規則: 行頭の `export const meta` だけ `const meta` に置き換える）。関数本体は
//     script ゴールなので、`<!--` と行頭の `-->` が行末までのコメントになる（module では普通の演算子列）。
//     module の parse だけだと `r = a <!-- b /*` の後のコードが消えて実行結果が変わっても、トークン列が
//     同じに見えて通ってしまう。オプションは sourceType: script + allowReturnOutsideFunction +
//     allowAwaitOutsideFunction（AsyncFunction の本体は最上位の return と await を許す）
//   どちらかで変換前がパースできなければ source-unparsable、変換後がパースできなければ artifact-unparsable。
//
// mode: "tokenize"（テスト専用）
//   acorn.tokenizer 単体のトークン列を比べる。tokenizer はパーサ文脈を持たないので `/` の読みはビルダーの
//   lexer と同じ誤読をし得る — ビルドの判定には使わない。構文エラーになる入力（トークンの羅列）も比べるために
//   あり、sourceType は module と script の両方で行い両方の一致を要求する（`<!--` と行頭の `-->` は
//   script でだけ HTML 風コメントで、module だけでは空白を詰めて `a<!--b` ができた場合の変化を検出できない）。
//   lenient が偽: tokenizer が例外を投げたら ok: false。lenient が真: 例外までに得たトークン列と、例外が
//   起きたか否かを比較し、変換前後の一方だけが例外になる・例外までのトークンが違う場合を不一致とする。
'use strict'

const acorn = require('internal/deps/acorn/acorn/dist/acorn')

const SOURCE_TYPES = ['module', 'script']

// 例外の文面。メッセージが空・未定義でも、失敗を表す null でない値（文字列）を返す
const errorText = (e) => String(e?.message ?? e)

const entry = (t, code) => [t.type.label, code.slice(t.start, t.end), t.loc.start.line]

// tokenizer: 例外までのトークンを返す。error は例外メッセージ（無ければ null）
const tokenize = (code, sourceType) => {
  const tokens = []
  try {
    for (const t of acorn.tokenizer(code, { ecmaVersion: 'latest', sourceType, locations: true })) tokens.push(entry(t, code))
  } catch (e) {
    return { tokens, error: errorText(e) }
  }
  return { tokens, error: null }
}

// ランタイムが関数本体として評価する形にする（先頭の `export const meta` の `export ` を外す。
// tests/lib/workflow-script-contract.mjs の stripMetaExport と同じ規則。一致しなければそのまま）
const toRuntimeBody = (code) => code.replace(/^export const meta\b/, 'const meta')

const PARSE_GOALS = {
  module: { code: (c) => c, options: { sourceType: 'module', allowReturnOutsideFunction: true } },
  script: {
    code: toRuntimeBody,
    options: { sourceType: 'script', allowReturnOutsideFunction: true, allowAwaitOutsideFunction: true },
  },
}

// parser: パーサ文脈つきのトークン列。パースできなければ error にメッセージ（例外までのトークンは使わない）
const parseTokens = (original, goal) => {
  const { code: toCode, options } = PARSE_GOALS[goal]
  const code = toCode(original)
  const tokens = []
  try {
    acorn.parse(code, { ecmaVersion: 'latest', locations: true, ...options, onToken: (t) => tokens.push(entry(t, code)) })
  } catch (e) {
    return { tokens: [], error: errorText(e) }
  }
  return { tokens, error: null }
}

const show = (t) => (t ? JSON.stringify([t[0], t[1].length > 80 ? `${t[1].slice(0, 80)}…` : t[1], t[2]]) : '(なし)')

// 2 つのトークン列を比べ、最初の差を説明する文字列（一致なら null）を返す
const diffTokens = (a, b, tag) => {
  const common = Math.min(a.length, b.length)
  for (let i = 0; i < common; i++) {
    if (a[i][0] !== b[i][0] || a[i][1] !== b[i][1] || a[i][2] !== b[i][2]) {
      return (
        `${tag} トークン ${i}（変換前 ${a[i][2]} 行）が不一致: 変換前 ${show(a[i])} ≠ 変換後 ${show(b[i])}。` +
        `直前 ${show(a[i - 1])}、直後（変換前）${show(a[i + 1])}`
      )
    }
  }
  if (a.length !== b.length) {
    return (
      `${tag} トークン数が不一致（変換前 ${a.length} / 変換後 ${b.length}）。` +
      `最初に差が出る位置はトークン ${common}: 変換前 ${show(a[common])} / 変換後 ${show(b[common])}、直前 ${show(a[common - 1])}`
    )
  }
  return null
}

const compareTokenizeOne = (before, after, sourceType, lenient) => {
  const a = tokenize(before, sourceType)
  const b = tokenize(after, sourceType)
  const tag = `[${sourceType}]`
  if (!lenient) {
    // error は例外メッセージ。空文字でも失敗として扱う（真偽判定にしない）
    if (a.error !== null) return `${tag} 変換前の字句解析に失敗: ${a.error}`
    if (b.error !== null) return `${tag} 変換後の字句解析に失敗: ${b.error}`
  } else if ((a.error === null) !== (b.error === null)) {
    return `${tag} 例外の有無が不一致（変換前 ${a.error ?? 'なし'} / 変換後 ${b.error ?? 'なし'}）`
  }
  return diffTokens(a.tokens, b.tokens, tag)
}

const compareTokenize = ({ name, before, after, lenient = false }) => {
  for (const sourceType of SOURCE_TYPES) {
    const problem = compareTokenizeOne(before, after, sourceType, lenient)
    if (problem) return { name, ok: false, kind: 'mismatch', detail: problem }
  }
  const n = tokenize(before, 'script').tokens.length
  return { name, ok: true, kind: 'match', detail: `${n} トークン一致` }
}

const compareParse = ({ name, before, after }) => {
  // まず両ゴールで変換前をパースする（どちらかでパースできなければ検査できない）
  const parsed = {}
  for (const goal of Object.keys(PARSE_GOALS)) {
    const a = parseTokens(before, goal)
    if (a.error !== null) return { name, ok: false, kind: 'source-unparsable', detail: `[${goal}] 変換前のパースに失敗: ${a.error}` }
    parsed[goal] = a
  }
  let count = 0
  for (const goal of Object.keys(PARSE_GOALS)) {
    const b = parseTokens(after, goal)
    if (b.error !== null) return { name, ok: false, kind: 'artifact-unparsable', detail: `[${goal}] 変換後のパースに失敗: ${b.error}` }
    const problem = diffTokens(parsed[goal].tokens, b.tokens, `[${goal}]`)
    if (problem) return { name, ok: false, kind: 'mismatch', detail: problem }
    count = parsed[goal].tokens.length
  }
  return { name, ok: true, kind: 'match', detail: `${count} トークン一致（module・script の両ゴール）` }
}

const compare = (c) => {
  if (c.mode === 'parse') return compareParse(c)
  if (c.mode === 'tokenize') return compareTokenize(c)
  throw new Error(`mode は "parse" か "tokenize" を指定する（受け取った値: ${JSON.stringify(c.mode)}）`)
}

const chunks = []
process.stdin.on('data', (d) => chunks.push(d))
process.stdin.on('end', () => {
  const cases = JSON.parse(Buffer.concat(chunks).toString('utf8'))
  process.stdout.write(JSON.stringify({ acornVersion: acorn.version, results: cases.map(compare) }))
})
