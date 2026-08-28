// implement-issue-tree の実行ファイル（Workflow へ渡す配布物）を開発ファイルから生成する
// ビルダー。開発ファイル implement-issue-tree.src.js（コメント込み・編集はこちらだけ）から
// コメントのみを除去した implement-issue-tree.js を生成する。Workflow ランタイムのハード上限
// 512 KiB（tests/lib/workflow-script-contract.mjs 参照）に対しコメントが約 28% を占めるため、
// 実行ファイルからコメントを落としてサイズ予算を確保し、開発ファイル側はコメント量の制約から
// 解放する（設計の経緯は PR #241 → 本分離）。
//
// 変換はコメント除去のみで minify はしない: コメント行は空行化し改行を全て保持するため、
// 生成物と開発ファイルの行番号は完全に一致する（スタックトレース・エラー行の突き合わせ用）。
// 生成物の鮮度（開発ファイルとの同期）は tests/build-workflow.test.mjs が CI で検証する —
// 生成物を直接編集したりビルドを忘れたりすると byte 不一致で fail する。
//
// 使い方:
//   node skills/implement-issue-tree/scripts/build-workflow.mjs          # 生成して書き込み
//   node skills/implement-issue-tree/scripts/build-workflow.mjs --check  # 書き込まず鮮度確認
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
export const SRC_PATH = join(HERE, 'implement-issue-tree.src.js')
export const DIST_PATH = join(HERE, 'implement-issue-tree.js')

// 直後の `/` を正規表現リテラルの開始と判定するキーワード。識別子・数値の直後の `/` は
// 除算として素通しする（標準的な division / regex 判別ヒューリスティック）。
const REGEX_PRECEDING_KEYWORDS = new Set([
  'return', 'typeof', 'instanceof', 'in', 'of', 'new', 'delete', 'void',
  'case', 'do', 'else', 'yield', 'await', 'throw',
])

const isWordChar = (ch) => /[A-Za-z0-9_$]/.test(ch)

/**
 * JS ソースからコメントのみを除去する（改行はすべて保持し行番号を維持する）。
 *
 * 文字列・テンプレートリテラル（`${}` のネスト含む）・正規表現リテラルを追跡する lexer で、
 * それらの内部にある `//` `/*` をコメントと誤認しない。本スクリプトはプロンプト用の巨大
 * テンプレートリテラル（コード例を含み得る）を多数持つため、行ベースの正規表現置換では
 * 安全に処理できない — 必ずこの lexer を経由すること。
 *
 * 誤判定の安全性: 除算を正規表現と誤読しても出力は素通しで不変。危険なのは正規表現内の
 * `//` を行コメントと誤認して以降を削る方向のみで、それを判別分岐が防ぐ。変換の妥当性は
 * ビルド時検証（行数保持・先頭 meta 宣言・冪等性）と tests/build-workflow.test.mjs の
 * 固定ケース + 生成物パースゲートで担保する。
 */
export function stripComments(src) {
  let out = ''
  let i = 0
  const n = src.length
  let rawPrev = '' // 直前に出力した文字（空白含む）。単語の連続判定に使う
  let sigCh = '' // 直前の非空白文字。regex / 除算の判別に使う
  let sigCh2 = '' // sigCh の 1 つ前の非空白文字。後置 `++` / `--` の検出に使う（PR #452 P2）
  let sigWord = '' // 直近の単語（識別子・数値・キーワード）。空白を挟んでも保持する
  // 'code'（{} 深度つき）と 'template' のネストを管理する。template 内の `${` で code を
  // push し、その code の深度が閉じたら template へ復帰する
  const stack = [{ mode: 'code', depth: 0 }]

  // コメント除去の直前に出力末尾の行内空白を切り詰める。コメントだけの行は空行になり、
  // `code  // c` は `code` になる（.editorconfig の trim_trailing_whitespace 準拠）
  const trimLineTail = () => {
    out = out.replace(/[ \t]+$/, '')
  }

  while (i < n) {
    const ctx = stack[stack.length - 1]
    const c = src[i]

    if (ctx.mode === 'template') {
      if (c === '\\') {
        out += c + (src[i + 1] ?? '')
        i += 2
        continue
      }
      if (c === '`') {
        out += c
        i++
        stack.pop()
        sigCh2 = sigCh
        sigCh = '`'
        sigWord = ''
        rawPrev = '`'
        continue
      }
      if (c === '$' && src[i + 1] === '{') {
        out += '${'
        i += 2
        stack.push({ mode: 'code', depth: 0 })
        sigCh2 = sigCh
        sigCh = '{'
        sigWord = ''
        rawPrev = '{'
        continue
      }
      out += c
      i++
      continue
    }

    const c2 = src[i + 1]
    // 行コメント: 行末まで削る（改行は次ループで出力される）
    if (c === '/' && c2 === '/') {
      trimLineTail()
      while (i < n && src[i] !== '\n') i++
      continue
    }
    // ブロックコメント: 内部の改行だけ保持して削り、位置に空白 1 個を置いて**全**トークン
    // 境界を保持する（単語文字同士に限ると `x+/*c*/+y` → `x++y` の意味変化や
    // `1/*c*/.toString()` → `1.toString()` の構文破壊を防げない — PR #452 codex P1）。
    // 行末に残った空白は改行出力時の trimLineTail が回収する
    if (c === '/' && c2 === '*') {
      trimLineTail()
      i += 2
      while (i < n && !(src[i] === '*' && src[i + 1] === '/')) {
        if (src[i] === '\n') out += '\n'
        i++
      }
      i = Math.min(i + 2, n)
      out += ' '
      continue
    }
    // 文字列リテラル: 内部の `//` 等を素通しする
    if (c === '"' || c === "'") {
      out += c
      i++
      while (i < n && src[i] !== c) {
        if (src[i] === '\\') {
          out += src[i] + (src[i + 1] ?? '')
          i += 2
          continue
        }
        if (src[i] === '\n') break // 生改行 = 未終端文字列（不正構文）。安全側でそのまま抜ける
        out += src[i]
        i++
      }
      if (i < n && src[i] === c) {
        out += c
        i++
      }
      sigCh2 = sigCh
      sigCh = c
      sigWord = ''
      rawPrev = c
      continue
    }
    // テンプレートリテラル開始
    if (c === '`') {
      out += c
      i++
      stack.push({ mode: 'template' })
      rawPrev = '`'
      continue
    }
    // code モードの {} 深度（template の `${` からの復帰判定）
    if (c === '{') ctx.depth++
    if (c === '}') {
      if (ctx.depth === 0 && stack.length > 1) {
        out += c
        i++
        stack.pop() // `${ ... }` を閉じて template へ復帰
        continue
      }
      ctx.depth--
    }
    // 正規表現リテラル: 直前トークンが識別子・数値・閉じ括弧 `)` `]` `}`・後置 `++` / `--`・
    // リテラル終端なら除算として素通しし、それ以外（演算子・区切り・キーワード直後）は regex
    // として閉じ `/` まで素通しする — regex 内部の `//` をコメントと誤認しないための分岐。
    // `}` はブロック文直後の regex（`if (a) {} /re/`）と曖昧だが除算側へ倒す: regex 側へ
    // 誤読すると閉じ `/` 探索が行内の文字列開始を飲み込み、非コメントを書き換え得る
    // （PR #452 Bugbot）。除算側の誤りは素通しのため出力を変えない
    if (c === '/') {
      const postfixIncDec =
        (sigCh === '+' && sigCh2 === '+') || (sigCh === '-' && sigCh2 === '-')
      const isDivision =
        (sigWord !== '' && !REGEX_PRECEDING_KEYWORDS.has(sigWord)) ||
        /[)\]}]/.test(sigCh) ||
        sigCh === '"' || sigCh === "'" || sigCh === '`' ||
        postfixIncDec
      if (!isDivision) {
        let j = i + 1
        let buf = c
        let inClass = false
        let closed = false
        while (j < n && src[j] !== '\n') {
          if (src[j] === '\\') {
            buf += src[j] + (src[j + 1] ?? '')
            j += 2
            continue
          }
          if (src[j] === '[') inClass = true
          else if (src[j] === ']') inClass = false
          buf += src[j]
          if (src[j] === '/' && !inClass) {
            j++
            closed = true
            break
          }
          j++
        }
        if (closed) {
          out += buf
          i = j
          sigCh2 = sigCh
          sigCh = '/'
          sigWord = ''
          rawPrev = '/'
          continue
        }
        // 行末まで閉じ `/` が無い = regex ではなかった。通常文字として下へ流す
      }
    }

    // code モードの改行出力時に行末空白を回収する（ブロックコメント置換の空白 1 個が
    // 行末に残るケース。文字列・テンプレート内の改行は別経路のため触らない）
    if (c === '\n') trimLineTail()
    out += c
    if (isWordChar(c)) {
      sigWord = isWordChar(rawPrev) ? sigWord + c : c
      sigCh2 = sigCh
      sigCh = c
    } else if (!/\s/.test(c)) {
      sigWord = ''
      sigCh2 = sigCh
      sigCh = c
    }
    rawPrev = c
    i++
  }
  // 末尾に改行を持たないソースで最終行にブロックコメント置換の空白が残るケースの保険
  return out.replace(/[ \t]+$/, '')
}

/**
 * 開発ファイルのソースから実行ファイルの内容を生成し、変換の安全性を検証して返す。
 * 検証に失敗した場合は throw する（fail-closed: 壊れた生成物を書き出さない）。
 */
export function buildArtifact(src) {
  const stripped = stripComments(src)
  const srcLines = src.split('\n').length
  const outLines = stripped.split('\n').length
  if (srcLines !== outLines) {
    throw new Error(`行数が保持されていない（src ${srcLines} 行 → 生成物 ${outLines} 行）`)
  }
  // Workflow ランタイムはファイル先頭（位置 0）の `export const meta` を要求する
  // （tests/lib/workflow-script-contract.mjs の META_EXPORT_PATTERN）。開発ファイルの
  // 先頭にコメントを置くとここで検出される — 先頭コメントは置けない制約を fail-closed で守る
  if (!/^export const meta\b/.test(stripped)) {
    throw new Error('生成物の先頭が `export const meta` でない（開発ファイル先頭にコメント等が混入）')
  }
  // 冪等性: コメント除去済みの生成物へ再適用しても不変であること（lexer の自己整合検証）
  if (stripComments(stripped) !== stripped) {
    throw new Error('コメント除去が冪等でない（lexer がコメント以外を変更している疑い）')
  }
  return stripped
}

// CLI 実行部（import 時は実行しない）
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const checkOnly = process.argv.includes('--check')
  const src = readFileSync(SRC_PATH, 'utf8')
  const artifact = buildArtifact(src)
  const srcBytes = Buffer.byteLength(src)
  const outBytes = Buffer.byteLength(artifact)
  if (checkOnly) {
    const current = readFileSync(DIST_PATH, 'utf8')
    if (current !== artifact) {
      console.error('鮮度エラー: 実行ファイルが開発ファイルと同期していない。node build-workflow.mjs で再生成せよ')
      process.exit(1)
    }
    console.log(`鮮度 ok: ${outBytes} B（src ${srcBytes} B）`)
  } else {
    writeFileSync(DIST_PATH, artifact)
    console.log(`生成完了: ${DIST_PATH}`)
    console.log(`src ${srcBytes} B → dist ${outBytes} B（-${srcBytes - outBytes} B, -${Math.round(((srcBytes - outBytes) / srcBytes) * 100)}%）`)
  }
}
