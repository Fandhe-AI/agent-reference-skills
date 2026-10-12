// build-workflow の変換前後でトークン列（種類・テキスト・開始行）が一致することを、Node 同梱の
// acorn（字句解析器）で検証するヘルパー。ビルダー（build-workflow.mjs）がビルド時の照合
// （生成物のトークン列が src と一致しなければ書き込まず中止する fail-closed 検査）に使い、
// tests/build-workflow.test.mjs も同じ比較を使う。ビルダーの lexer は `/` の判別（除算と正規表現）を
// 誤り得るため、文字列・テンプレート・正規表現の中身が詰められていないことを lexer とは独立の字句解析で
// 確かめる。acorn は内部モジュール（internal/deps/acorn/...）で、`node --expose-internals` を付けた
// 子プロセスでしか読み込めないため、呼び出し側が spawnSync で本ファイルを起動する（通常の
// `node` / `node --test` は --expose-internals を伝播しない）。acorn を取得できない Node では
// require が失敗して非ゼロで終了する（呼び出し側はそれを検査の失敗として扱い、黙って飛ばさない）。
//
// 入力（stdin）: JSON `[{ "name": string, "before": string, "after": string, "lenient"?: boolean }]`
// 出力（stdout）: JSON `{ "acornVersion": string, "results": [{ "name", "ok", "detail" }] }`
//   ok が true = 変換前後のトークン列が完全一致。
//
// 字句解析は sourceType を module と script の両方で行い、両方の一致を要求する。`<!--` と行頭の
// `-->` は HTML 風コメントで、script でだけコメントとして読まれる（module では普通の演算子列）ため、
// module だけでは空白を詰めて `a<!--b` ができた場合の変化を検出できない。
//
// lenient が偽（既定）: tokenizer が例外を投げたら ok: false（実ファイルや固定ケースは必ず字句解析できる）。
// lenient が真: 構文エラーになる入力も比べる。例外までに得たトークン列と、例外が起きたか否かを比較し、
// 変換前後の一方だけが例外になる・例外までのトークンが違う場合を不一致とする（生成的テスト用）。
'use strict'

const acorn = require('internal/deps/acorn/acorn/dist/acorn')

const SOURCE_TYPES = ['module', 'script']

// 例外までのトークンを返す。error は例外メッセージ（無ければ null）
const tokenize = (code, sourceType) => {
  const tokens = []
  try {
    for (const t of acorn.tokenizer(code, { ecmaVersion: 'latest', sourceType, locations: true })) {
      tokens.push([t.type.label, code.slice(t.start, t.end), t.loc.start.line])
    }
  } catch (e) {
    return { tokens, error: e.message }
  }
  return { tokens, error: null }
}

const compareOne = (before, after, sourceType, lenient) => {
  const a = tokenize(before, sourceType)
  const b = tokenize(after, sourceType)
  const tag = `[${sourceType}]`
  if (!lenient) {
    if (a.error) return `${tag} 変換前の字句解析に失敗: ${a.error}`
    if (b.error) return `${tag} 変換後の字句解析に失敗: ${b.error}`
  } else if ((a.error === null) !== (b.error === null)) {
    return `${tag} 例外の有無が不一致（変換前 ${a.error ?? 'なし'} / 変換後 ${b.error ?? 'なし'}）`
  }
  const show = (t) => (t ? JSON.stringify([t[0], t[1].length > 80 ? `${t[1].slice(0, 80)}…` : t[1], t[2]]) : '(なし)')
  const common = Math.min(a.tokens.length, b.tokens.length)
  for (let i = 0; i < common; i++) {
    if (a.tokens[i][0] !== b.tokens[i][0] || a.tokens[i][1] !== b.tokens[i][1] || a.tokens[i][2] !== b.tokens[i][2]) {
      return (
        `${tag} トークン ${i}（変換前 ${a.tokens[i][2]} 行）が不一致: 変換前 ${show(a.tokens[i])} ≠ 変換後 ${show(b.tokens[i])}。` +
        `直前 ${show(a.tokens[i - 1])}、直後（変換前）${show(a.tokens[i + 1])}`
      )
    }
  }
  if (a.tokens.length !== b.tokens.length) {
    return (
      `${tag} トークン数が不一致（変換前 ${a.tokens.length} / 変換後 ${b.tokens.length}）。` +
      `最初に差が出る位置はトークン ${common}: 変換前 ${show(a.tokens[common])} / 変換後 ${show(b.tokens[common])}、直前 ${show(a.tokens[common - 1])}`
    )
  }
  return null
}

const compare = ({ name, before, after, lenient = false }) => {
  for (const sourceType of SOURCE_TYPES) {
    const problem = compareOne(before, after, sourceType, lenient)
    if (problem) return { name, ok: false, detail: problem }
  }
  const n = tokenize(before, 'script').tokens.length
  return { name, ok: true, detail: `${n} トークン一致` }
}

const chunks = []
process.stdin.on('data', (d) => chunks.push(d))
process.stdin.on('end', () => {
  const cases = JSON.parse(Buffer.concat(chunks).toString('utf8'))
  process.stdout.write(JSON.stringify({ acornVersion: acorn.version, results: cases.map(compare) }))
})
