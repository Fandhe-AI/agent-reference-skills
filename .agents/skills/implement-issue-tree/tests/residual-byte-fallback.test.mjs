// worktreePath 省略時のバイトゲート恒久停止に対する物理一覧フォールバックの回帰テスト
// （Issue #404）。
//
// 背景: implement / review / pr-create / fix エージェントが worktreePath を省略・空文字で
// 返すと recordEphemeralWorktree が path: '' で台帳（ephemeralWorktrees）へ計上する
// （件数の過小評価を防ぐ既存の fail-closed 設計）。旧実装の remeasureResidualBytesNow は、
// この未検証エントリが 1 件でも台帳に残っていれば実測を即座に失敗（kib = null）とし、
// newStartSuppressed latch を立てて新規着手全体（worktree を作らない verify-close ノードを
// 含む）を恒久停止させていた。本テストは、ホスト側が物理一覧（git worktree list --porcelain）
// から測定を継続できる場合はバイト実測が継続し、物理一覧も検証できない場合のみ従来どおり
// fail-closed を維持することを固定する。
//
// 読み込み方式は g0-gates.test.mjs / residual-cap-default.test.mjs と同一: 実装スクリプトは
// Workflow ハーネス専用文法（トップレベル return・注入グローバル args / agent / log / phase）を
// 含み module として丸ごと import できないため、__IMPLEMENT_ISSUE_TREE_DRIVER_START__ マーカー
// より上（定義部のみ）を一時ファイルへ切り出して import する。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const SCRIPT_PATH = join(
  dirname(fileURLToPath(import.meta.url)),
  '..', 'scripts', 'implement-issue-tree.src.js',
)
const DRIVER_MARKER = '__IMPLEMENT_ISSUE_TREE_DRIVER_START__'

const source = readFileSync(SCRIPT_PATH, 'utf8')
const markerIndex = source.indexOf(DRIVER_MARKER)
if (markerIndex < 0) {
  throw new Error(`テスト境界マーカー ${DRIVER_MARKER} が実装スクリプトに存在しない（削除・改名は回帰テストを無効化する）`)
}
const definitionPart = source.slice(0, source.lastIndexOf('\n', markerIndex))
const sliceDir = mkdtempSync(join(tmpdir(), 'implement-issue-tree-byte-fallback-defs-'))
const slicePath = join(sliceDir, 'implement-issue-tree-byte-fallback-defs.mjs')
// 実装スクリプトは `export const meta` 以外の top-level export を持てない（Workflow 起動制約）
// ため、定義部は非 export のまま置き、切り出したスライス側で export 文を付与する。
const SLICE_EXPORTS = [
  'buildPhysicalByteMeasureTargets',
  'sanitizeWorktreePath',
  'IMPL_SCHEMA',
  'REVIEW_SCHEMA',
  'PR_CREATE_SCHEMA',
  'FIX_SCHEMA',
]
writeFileSync(slicePath, `${definitionPart}\nexport { ${SLICE_EXPORTS.join(', ')} }\n`)

const mod = await import(pathToFileURL(slicePath).href)
const {
  buildPhysicalByteMeasureTargets,
  IMPL_SCHEMA,
  REVIEW_SCHEMA,
  PR_CREATE_SCHEMA,
  FIX_SCHEMA,
} = mod

// --- スキーマ契約: worktreePath の省略受理が再発しないことの固定（Issue #404）---

test('IMPL_SCHEMA / REVIEW_SCHEMA / PR_CREATE_SCHEMA / FIX_SCHEMA はいずれも worktreePath を required にする', () => {
  assert.ok(IMPL_SCHEMA.required.includes('worktreePath'), 'IMPL_SCHEMA')
  assert.ok(REVIEW_SCHEMA.required.includes('worktreePath'), 'REVIEW_SCHEMA')
  assert.ok(PR_CREATE_SCHEMA.required.includes('worktreePath'), 'PR_CREATE_SCHEMA')
  assert.ok(FIX_SCHEMA.required.includes('worktreePath'), 'FIX_SCHEMA')
})

test('4 スキーマすべてで worktreePath の型は string のまま固定される', () => {
  for (const schema of [IMPL_SCHEMA, REVIEW_SCHEMA, PR_CREATE_SCHEMA, FIX_SCHEMA]) {
    assert.equal(schema.properties.worktreePath.type, 'string')
  }
})

// --- buildPhysicalByteMeasureTargets: フォールバック対象構成の決定性 ---

test('正常系: 先頭メイン + 2 件のエントリ・独立カウント一致で ok:true、メインは位置で除外される', () => {
  const entries = [
    { path: '/repo', branch: 'main', isMain: true },
    { path: '/tmp/wt-a', branch: 'feat/1-a', isMain: false },
    { path: '/tmp/wt-b', branch: '', isMain: false },
  ]
  const result = buildPhysicalByteMeasureTargets(entries, 3)
  assert.equal(result.ok, true)
  assert.deepEqual(result.paths.sort(), ['/tmp/wt-a', '/tmp/wt-b'])
})

test('一覧が空配列なら ok:false（一覧取得不成立）', () => {
  const result = buildPhysicalByteMeasureTargets([], 0)
  assert.equal(result.ok, false)
})

test('entries が配列でない（未取得・例外経路の戻り値）場合も ok:false', () => {
  assert.equal(buildPhysicalByteMeasureTargets(null, 0).ok, false)
  assert.equal(buildPhysicalByteMeasureTargets(undefined, 0).ok, false)
})

test('独立カウントが null（countWorktreeRecords 取得失敗）なら ok:false', () => {
  const entries = [
    { path: '/repo', branch: 'main', isMain: true },
    { path: '/tmp/wt-a', branch: 'feat/1-a', isMain: false },
  ]
  const result = buildPhysicalByteMeasureTargets(entries, null)
  assert.equal(result.ok, false)
})

test('独立カウントが entries.length と不一致（転記脱落想定）なら ok:false', () => {
  const entries = [
    { path: '/repo', branch: 'main', isMain: true },
    { path: '/tmp/wt-a', branch: 'feat/1-a', isMain: false },
    { path: '/tmp/wt-b', branch: '', isMain: false },
  ]
  const result = buildPhysicalByteMeasureTargets(entries, 2) // 実際は 3 件
  assert.equal(result.ok, false)
})

test('シェルメタ文字・相対パス・".." 混入パスは sanitizeWorktreePath fail-closed により ok:false になる', () => {
  const metaCharCase = [
    { path: '/repo', branch: 'main', isMain: true },
    { path: '/tmp/x$(rm -rf ~)', branch: 'feat/1-a', isMain: false },
  ]
  assert.equal(buildPhysicalByteMeasureTargets(metaCharCase, 2).ok, false)

  const relativePathCase = [
    { path: '/repo', branch: 'main', isMain: true },
    { path: 'relative/path', branch: 'feat/1-a', isMain: false },
  ]
  assert.equal(buildPhysicalByteMeasureTargets(relativePathCase, 2).ok, false)

  const dotDotCase = [
    { path: '/repo', branch: 'main', isMain: true },
    { path: '/tmp/../etc/passwd', branch: 'feat/1-a', isMain: false },
  ]
  assert.equal(buildPhysicalByteMeasureTargets(dotDotCase, 2).ok, false)
})

test('メイン以外に重複パスがあれば ok:false（件数一致だけでは他パスの取りこぼしを検出できないため）', () => {
  // independentCount === entries.length（3 === 3）は「行数」が一致することしか保証しない。
  // 物理レコードが本来 main/A/B の 3 件でも、転記時に B を誤って A の重複で埋めれば
  // この件数一致は崩れないため、重複を検出したら測定失敗として扱い、A だけを du した
  // 過小値で byteBaselineLedgerCount を更新して B を projection から落とす fail-open を防ぐ。
  const entries = [
    { path: '/repo', branch: 'main', isMain: true },
    { path: '/tmp/wt-a', branch: 'feat/1-a', isMain: false },
    { path: '/tmp/wt-a', branch: 'feat/1-a', isMain: false }, // 本来は別 worktree（例: B）のはずが重複記載
  ]
  const result = buildPhysicalByteMeasureTargets(entries, 3)
  assert.equal(result.ok, false)
})

test('メイン以外に重複が無ければ通常どおり測定を継続する（ok:true）', () => {
  const entries = [
    { path: '/repo', branch: 'main', isMain: true },
    { path: '/tmp/wt-a', branch: 'feat/1-a', isMain: false },
    { path: '/tmp/wt-b', branch: 'feat/1-b', isMain: false },
  ]
  const result = buildPhysicalByteMeasureTargets(entries, 3)
  assert.equal(result.ok, true)
  assert.deepEqual(result.paths, ['/tmp/wt-a', '/tmp/wt-b'])
})

// --- 駆動部の配線固定（dead code 化防止）---
// remeasureResidualBytesNow はマーカーより下（駆動部）にあり import 不能なため、既存テスト群
// （residual-cap-default.test.mjs 等）と同型のソーステキスト固定で、新規追加した関数が実際に
// 駆動部から参照されていることを確認する。

test('remeasureResidualBytesNow は buildPhysicalByteMeasureTargets と scanOrphanWorktrees を参照する（配線の dead code 化防止）', () => {
  const fnStart = source.indexOf('async function remeasureResidualBytesNow()')
  const fnEnd = source.indexOf('\nwhile (true) {', fnStart)
  assert.ok(fnStart >= 0 && fnEnd > fnStart, 'remeasureResidualBytesNow 本体を特定できること')
  const fnBody = source.slice(fnStart, fnEnd)
  assert.match(fnBody, /buildPhysicalByteMeasureTargets\(/)
  assert.match(fnBody, /scanOrphanWorktrees\(\)/)
  assert.match(fnBody, /countWorktreeRecords\(\)/)
})

test('フォールバックで得たパスは削除経路（sweepEligiblePaths 等）へ追加されない（測定専用の維持）', () => {
  const fnStart = source.indexOf('async function remeasureResidualBytesNow()')
  const fnEnd = source.indexOf('\nwhile (true) {', fnStart)
  const fnBody = source.slice(fnStart, fnEnd)
  assert.doesNotMatch(fnBody, /sweepEligiblePaths\.(add|push)/)
})
