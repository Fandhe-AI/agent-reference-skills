// implement-issue-tree の merge 監視ループにおける「強制スレッド再走査の監視枠確保」の決定的
// 回帰テスト（Fandhe-AI/ideas PR #248 codex-review の P1 指摘）。
//
// 対象バグ: merge-exec が reason 'unresolved-threads' を返したのにスレッド一覧が空のとき、
// runMergeLoop は forceThreadRescan を立てて continue する。しかし監視予算 monitorsLeft は
// ループ先頭で減算済みのため、その回が最後の枠だと while 条件が false になり救済ラウンドが
// 一度も走らないまま 'unresolved-comments' の blocked 終端に落ちていた。
//
// 検証の二層構造:
//   1. 判定ロジック（planForcedThreadRescan）の純粋関数テスト。ここで枠確保と 1 回限りラッチの
//      契約を固定する。
//   2. 呼び出し側（runMergeLoop）の配線に対する構造アサーション。runMergeLoop は Workflow
//      ハーネス依存（注入グローバル agent / log）でテスト境界マーカーより下にあり import できない
//      ため、ソース走査で「空一覧分岐が planForcedThreadRescan を呼び monitorsLeft へ書き戻す」
//      「ラッチ変数が while の外で 1 回だけ宣言される」ことを機械検証する。この層がないと
//      純粋関数テストは配線なしでもグリーンになり、P1 の回帰検知にならない。
//
// 読み込み方式は g0-gates.test.mjs と同じ（境界マーカーより上を一時ファイルへ切り出して import）。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const SCRIPT_PATH = join(
  dirname(fileURLToPath(import.meta.url)),
  '..', 'scripts', 'implement-issue-tree.js',
)
// マーカー文字列はソース中に 1 回しか現れてはならない（g0-gates.test.mjs が出現回数を固定して
// いる）ため、リテラルを直接書かず分割して組み立てる。
const DRIVER_MARKER = ['__IMPLEMENT', 'ISSUE', 'TREE', 'DRIVER', 'START__'].join('_')

const source = readFileSync(SCRIPT_PATH, 'utf8')
const markerIndex = source.indexOf(DRIVER_MARKER)
if (markerIndex < 0) {
  throw new Error(`テスト境界マーカー ${DRIVER_MARKER} が実装スクリプトに存在しない（削除・改名は回帰テストを無効化する）`)
}
const definitionPart = source.slice(0, source.lastIndexOf('\n', markerIndex))
const sliceDir = mkdtempSync(join(tmpdir(), 'implement-issue-tree-rescan-'))
const slicePath = join(sliceDir, 'implement-issue-tree-defs.mjs')
writeFileSync(slicePath, definitionPart)

const mod = await import(pathToFileURL(slicePath).href)
const { planForcedThreadRescan, classifyMergeExecDispatch } = mod

// 監視ループの初期予算（実装の `let monitorsLeft = 7` と対応）。
const MONITOR_BUDGET = 7

// ---------------------------------------------------------------------------
// planForcedThreadRescan（監視枠確保の判定ロジック）
// ---------------------------------------------------------------------------

test('planForcedThreadRescan: 最終監視ラウンド（枠 0・延長未使用）で 1 枠を確保しラッチを消費する', () => {
  // P1 の再現条件そのもの。減算後 monitorsLeft === 0 の状態で空一覧を受けた場合。
  assert.deepEqual(planForcedThreadRescan(0, false), {
    monitorsLeft: 1,
    rescueUsed: true,
    granted: true,
  })
})

test('planForcedThreadRescan: 2 回目（ラッチ消費済み）は枠を延長せず終端させる', () => {
  // 再入対策。merge-exec が空一覧を返し続けても予算は延びない。
  assert.deepEqual(planForcedThreadRescan(0, true), {
    monitorsLeft: 0,
    rescueUsed: true,
    granted: false,
  })
})

test('planForcedThreadRescan: 監視枠が残っていれば延長せずラッチも温存する', () => {
  // 枠がある回に無駄にラッチを消費すると、本当に必要な最終ラウンドで救済できなくなる。
  assert.deepEqual(planForcedThreadRescan(3, false), {
    monitorsLeft: 3,
    rescueUsed: false,
    granted: false,
  })
  assert.deepEqual(planForcedThreadRescan(1, true), {
    monitorsLeft: 1,
    rescueUsed: true,
    granted: false,
  })
})

// ---------------------------------------------------------------------------
// ループ不変条件（空一覧が返り続けても監視回数が有界であること）
// ---------------------------------------------------------------------------

// runMergeLoop の while 構造（先頭で減算 → 空一覧分岐で枠確保 → continue）だけを写した最小模擬。
// 実ループそのものではないため、配線の検証は下の構造アサーションが担う。
function simulateEmptyUnresolvedRounds() {
  let monitorsLeft = MONITOR_BUDGET
  let rescueUsed = false
  let rounds = 0
  const grants = []
  const merged = false
  while (!merged && monitorsLeft > 0) {
    monitorsLeft--
    rounds++
    // 毎ラウンド merge-exec が 'unresolved-threads' かつ unresolvedComments: [] を返す最悪ケース。
    const rescan = planForcedThreadRescan(monitorsLeft, rescueUsed)
    monitorsLeft = rescan.monitorsLeft
    rescueUsed = rescan.rescueUsed
    if (rescan.granted) grants.push(rounds)
    // 実装の continue に相当（fix は起動しない）。
  }
  return { rounds, grants, monitorsLeft }
}

test('空一覧が返り続けても救済は 1 回のみで、監視回数は初期予算 + 1 で有界に終端する', () => {
  const { rounds, grants, monitorsLeft } = simulateEmptyUnresolvedRounds()
  // 救済は最終ラウンド（7 回目）で 1 度だけ発動する。
  assert.deepEqual(grants, [MONITOR_BUDGET])
  // 予算 7 + 救済 1 = 8 ラウンドで停止する（無限ループにならない）。
  assert.equal(rounds, MONITOR_BUDGET + 1)
  assert.equal(monitorsLeft, 0)
})

test('終端時の状態写像は unresolved-comments のまま（blocked 終端・halt 非カウント）', () => {
  // 救済枠を使い切った後の終端は「品質ブロック」として扱われる契約。ここが変わると halt 防御の
  // 分類（blocked か failed か）が変わるため、状態写像を明示的に固定する。
  assert.deepEqual(classifyMergeExecDispatch('unresolved-threads', undefined), {
    lastState: 'unresolved-comments',
    lastBlockedReason: undefined,
  })
})

// ---------------------------------------------------------------------------
// 配線の構造アサーション（runMergeLoop 側。import できないためソース走査で検証する）
// ---------------------------------------------------------------------------

const driverPart = source.slice(markerIndex)

test('空一覧分岐が planForcedThreadRescan を呼び monitorsLeft へ書き戻している', () => {
  const branchStart = driverPart.indexOf('if (finding.unresolvedComments.length === 0) {')
  assert.notEqual(branchStart, -1, '空一覧分岐が見つからない（構造変更時は本テストも更新すること）')
  // 分岐の終端は continue 文。コメント中の「continue」に当たらないよう行単位の文として探す。
  const rest = driverPart.slice(branchStart)
  const continueMatch = /\n[ \t]*continue[ \t]*\n/.exec(rest)
  assert.notEqual(continueMatch, null, '空一覧分岐の continue 文が見つからない')
  const branchBody = rest.slice(0, continueMatch.index)
  // forceThreadRescan を立てるだけでは最終ラウンドで救済が走らない（P1 の中身）。
  assert.match(branchBody, /forceThreadRescan = true/)
  assert.match(branchBody, /planForcedThreadRescan\(monitorsLeft, forceThreadRescanBudgetUsed\)/)
  assert.match(branchBody, /monitorsLeft = rescan\.monitorsLeft/)
  assert.match(branchBody, /forceThreadRescanBudgetUsed = rescan\.rescueUsed/)
})

test('ラッチ変数は while ループの外で 1 回だけ宣言される', () => {
  // ループ内で let 宣言すると毎ラウンド false に戻り、ラッチが無効化されて予算が延び続ける。
  const declarations = driverPart.match(/let forceThreadRescanBudgetUsed\b/g) ?? []
  assert.equal(declarations.length, 1, 'ラッチ変数の宣言は 1 か所でなければならない')
  const declIndex = driverPart.indexOf('let forceThreadRescanBudgetUsed')
  const whileIndex = driverPart.indexOf('while (!merged && monitorsLeft > 0) {')
  assert.notEqual(whileIndex, -1, '監視ループの while が見つからない（構造変更時は本テストも更新すること）')
  assert.ok(declIndex < whileIndex, 'ラッチ変数は while より前で宣言されていなければならない')
})
