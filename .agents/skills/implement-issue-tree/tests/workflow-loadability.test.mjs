// implement-issue-tree.js の起動可否契約（Workflow ランタイムに受理されるか）の唯一の
// テストスイート。判定ロジックは tests/lib/workflow-script-contract.mjs に集約されており、
// 本ファイルはその契約に対する回帰テストのみを持つ（実装ロジックをここへ複製しない）。
//
// 背景（#239 → #276 → 本 Issue #277）: `implement-issue-tree.js` は Workflow ランタイム専用
// 文法（トップレベル return・注入グローバル args / agent / log / phase）を持つスクリプトで、
// `export const meta` 以外の top-level `export` を含むと起動時に SyntaxError となり全体が
// 実行不能になる。この回帰が #239 で混入し、単体テストが全件グリーンのまま下流 22 リポへ
// 配布された（#276 で export 混入自体は修正済み）。原因は、当時のテストが境界マーカーより
// 上の定義部だけを切り出して import する方式のため、スクリプト全体がランタイムに受理される
// かを一度も検証していなかったこと。本ファイルはその欠落— サイズ・パースの両ゲート — を
// CI で機械的に埋める。
//
// CI では実 Workflow ハーネスを起動しない（runner にランタイム・認証情報が存在しないため）。
// 実起動の確認は references/verification.md 記載の人手 probe が担う。
//
// 検証対象はランタイムへ渡される**実行ファイル**（implement-issue-tree.js。開発ファイル
// implement-issue-tree.src.js から build-workflow.mjs がコメント除去して生成する配布物）で
// あり、開発ファイルではない。サイズ予算はコメント込みの開発ファイルではなく実行ファイルに
// 課す。生成物の鮮度（開発ファイルとの同期）は build-workflow.test.mjs が検証する。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, statSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  WORKFLOW_SCRIPT_HARD_LIMIT_BYTES,
  WORKFLOW_SCRIPT_BUDGET_BYTES,
  META_EXPORT_PATTERN,
  stripMetaExport,
  parseAsWorkflowBody,
  findSuspectExportLines,
  checkWorkflowScript,
} from './lib/workflow-script-contract.mjs'

const SCRIPT_PATH = join(
  dirname(fileURLToPath(import.meta.url)),
  '..', 'scripts', 'implement-issue-tree.js',
)
const source = readFileSync(SCRIPT_PATH, 'utf8')
const byteLength = statSync(SCRIPT_PATH).size

// ---------------------------------------------------------------------------
// (a) サイズゲート
// ---------------------------------------------------------------------------

test('定数の大小関係: 運用予算はハード上限より小さい（逆転すると budget が発火しなくなる）', () => {
  assert.ok(
    WORKFLOW_SCRIPT_BUDGET_BYTES < WORKFLOW_SCRIPT_HARD_LIMIT_BYTES,
    `予算 ${WORKFLOW_SCRIPT_BUDGET_BYTES} B はハード上限 ${WORKFLOW_SCRIPT_HARD_LIMIT_BYTES} B 未満であること`,
  )
})

test('実装スクリプトのファイルサイズが運用予算未満であること（ディスク実体を計測）', () => {
  const headroom = WORKFLOW_SCRIPT_HARD_LIMIT_BYTES - byteLength
  assert.ok(
    byteLength < WORKFLOW_SCRIPT_BUDGET_BYTES,
    `実測 ${byteLength} B が運用予算 ${WORKFLOW_SCRIPT_BUDGET_BYTES} B 以上（ハード上限まで残り ${headroom} B）。`
      + `ハード上限 ${WORKFLOW_SCRIPT_HARD_LIMIT_BYTES} B は PR #241 の実測に基づく値で公式ドキュメント未記載。`
      + `#241 でコメント圧縮によりサイズを縮小した経緯があるため、今回も同様の縮小を検討すること。`,
  )
})

// ---------------------------------------------------------------------------
// (b) パースゲート（g0-gates.test.mjs から移設。起動可否契約はこのファイルが単一の置き場）
// ---------------------------------------------------------------------------

test('先頭に `export const meta` 宣言がちょうど 1 回だけ存在する（ランタイムが特別扱いするのはこの宣言のみという前提の固定）', () => {
  assert.ok(META_EXPORT_PATTERN.test(source), '先頭に `export const meta` が見つからない')
  const allOccurrences = source.match(/\bexport const meta\b/g) ?? []
  assert.equal(allOccurrences.length, 1, `export const meta の出現回数は 1 のはずが ${allOccurrences.length}`)
})

test('スクリプトが Workflow ランタイムの評価形態で構文解析できる（meta 以外の top-level export 禁止）', () => {
  try {
    // 呼び出さない。構文解析の成否のみを見る（parseAsWorkflowBody 内のコメント参照）。
    parseAsWorkflowBody(source)
  } catch (error) {
    const suspects = findSuspectExportLines(source)
    assert.fail(
      `Workflow ランタイムがスクリプトを受理しない: ${error.message}\n`
        + 'meta 以外の top-level export を置くと起動時に SyntaxError となりスキルが実行不能になる。'
        + 'テストから使いたい定義は export せずに置き、スライスへ export 文を付与する '
        + 'SLICE_EXPORTS 方式（g0-gates.test.mjs 参照）で読み込むこと。'
        + `疑わしい行: ${suspects.length > 0 ? suspects.join(' / ') : '(検出なし)'}`,
    )
  }
})

// ---------------------------------------------------------------------------
// (c) 回帰検知能力の恒久担保（変異ケース）
// #239 と同型の export 混入を、現行ソースへの注入によって再現し全件 fail することを示す。
// 履歴コミット（efae3ab / 1b5a647）に対する実証は git 履歴依存のため CI に含めない
// （下流 vendoring 先に履歴が存在しない・actions/checkout は既定 shallow）。
// 一回限りの手動実測コマンドは references/verification.md に記載する。
// ---------------------------------------------------------------------------

test('変異: 行頭に export function を追加すると parse-error で fail する', () => {
  const mutated = `${source}\nexport function __probe() {}\n`
  const result = checkWorkflowScript({ source: mutated, byteLength: Buffer.byteLength(mutated) })
  assert.equal(result.ok, false)
  assert.ok(result.violations.some((v) => v.code === 'parse-error'))
})

test('変異: 行中（セミコロン後）に export const を追加すると parse-error で fail する', () => {
  const mutated = `${source}\nconst __p = 1; export const __q = 2\n`
  const result = checkWorkflowScript({ source: mutated, byteLength: Buffer.byteLength(mutated) })
  assert.equal(result.ok, false)
  assert.ok(result.violations.some((v) => v.code === 'parse-error'))
})

test('変異: 空白なしの export{...} を追加すると parse-error で fail する', () => {
  const mutated = `${source}\nconst __probe = 1;export{__probe}\n`
  const result = checkWorkflowScript({ source: mutated, byteLength: Buffer.byteLength(mutated) })
  assert.equal(result.ok, false)
  assert.ok(result.violations.some((v) => v.code === 'parse-error'))
})

test('変異: 2 つ目の export const meta を末尾に追加すると parse-error で fail する（先頭の 1 つだけが除去対象）', () => {
  const mutated = `${source}\nexport const meta = { name: '__dup' }\n`
  const result = checkWorkflowScript({ source: mutated, byteLength: Buffer.byteLength(mutated) })
  assert.equal(result.ok, false)
  assert.ok(result.violations.some((v) => v.code === 'parse-error'))
})

test('変異: export const meta 宣言を持たないソースは meta-export-missing で fail する', () => {
  const mutated = source.replace(META_EXPORT_PATTERN, 'const meta')
  assert.equal(stripMetaExport(mutated), null, '前提: meta 宣言が既に export されていないこと')
  const result = checkWorkflowScript({ source: mutated, byteLength: Buffer.byteLength(mutated) })
  assert.equal(result.ok, false)
  assert.ok(result.violations.some((v) => v.code === 'meta-export-missing'))
})

// サイズゲート単体の境界値検証。実スクリプトの source を使うと、パース可否（(b)/(c) の関心事）
// と byteLength の組み合わせで violations が変動し、size 専用テストの期待値が実ソースの
// パース状態に依存してしまう（#239 型の export 混入時、size テストまで巻き込まれて誤診断の
// 原因になる）。それを避けるため、常にパース可能な最小フィクスチャで byteLength のみ変える。
const SIZE_FIXTURE = "export const meta = { name: 'fixture' }\nreturn 1\n"

test('変異: byteLength = 運用予算ちょうどは oversize-budget で fail する', () => {
  const result = checkWorkflowScript({ source: SIZE_FIXTURE, byteLength: WORKFLOW_SCRIPT_BUDGET_BYTES })
  assert.equal(result.ok, false)
  assert.deepEqual(result.violations.map((v) => v.code), ['oversize-budget'])
})

test('変異: byteLength = ハード上限 + 1 は oversize-hard で fail する（budget とは重複しない単一違反）', () => {
  const result = checkWorkflowScript({ source: SIZE_FIXTURE, byteLength: WORKFLOW_SCRIPT_HARD_LIMIT_BYTES + 1 })
  assert.equal(result.ok, false)
  assert.deepEqual(result.violations.map((v) => v.code), ['oversize-hard'])
})

test('境界の非発火: byteLength = 運用予算 - 1 はサイズ違反なし', () => {
  const result = checkWorkflowScript({ source: SIZE_FIXTURE, byteLength: WORKFLOW_SCRIPT_BUDGET_BYTES - 1 })
  assert.ok(!result.violations.some((v) => v.code === 'oversize-budget' || v.code === 'oversize-hard'))
})

// ---------------------------------------------------------------------------
// (d) 評価形態の前提アサート（受入条件 B の機械化できる部分）
//
// ここで固定するのは Node の AsyncFunction コンストラクタという評価形態の性質であって、
// Workflow ハーネス自体の仕様検証ではない。ハーネス側の乖離（AsyncFunction ラップが
// 実際のランタイム評価と食い違う事態）は機械的に検知できないため、
// references/verification.md に版スタンプ付きの人手 probe 手順を残し、そちらで担保する。
// ---------------------------------------------------------------------------

const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor

test('評価形態の前提: AsyncFunction は関数ボディとして top-level return を許容する', () => {
  assert.doesNotThrow(() => new AsyncFunction('return 1'))
})

test('評価形態の前提: AsyncFunction は async ボディとして top-level await を許容する', () => {
  assert.doesNotThrow(() => new AsyncFunction('await Promise.resolve()'))
})

test('評価形態の前提: AsyncFunction は export を拒否する（本スクリプト固有ではなく評価形態自体の性質）', () => {
  assert.throws(() => new AsyncFunction('export const x = 1'), SyntaxError)
})

test('評価形態の前提: 実装スクリプトは実際に top-level return を持つ（module ではなく関数ボディとして評価される必然性）', () => {
  assert.match(source, /^return /m, 'スクリプト本体に行頭 `return ` が見つからない')
})
