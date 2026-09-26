// 1 worktree あたり容量予約の高水位の永続化・回帰テスト（Issue #471）。
//
// 背景: 実ディスク空き容量ゲート（rawPerWorktreeByteReserve）はラン開始時 1 回の見積りで確定し、
// 以後は remeasureResidualBytesNow の実測で安全側（Math.max・縮めない）へ更新される。しかし
// 開始直後（クリーンな checkout やビルド成果物削除直後）は見積りが極端に小さくなり得る。最初の
// parallel 件の implement バッチは実測し直しの反映前に着手してしまうため、ビルド成果物の再生成で
// ディスクを圧迫し得る（Bugbot 指摘・baby-tasks-app#40）。本 issue はラン単位の高水位フィールド
// （.perWorktreeByteReserveHighWater）を状態ファイルへ永続化し、次回以降のランの開始時見積りの
// 下限として使うことで軽減する。
//
// 読み込み方式は free-disk-gate.test.mjs と同一: 実装スクリプトは Workflow ハーネス専用文法
// （トップレベル return・注入グローバル args / agent / log / phase）を含み module として丸ごと
// import できないため、__IMPLEMENT_ISSUE_TREE_DRIVER_START__ マーカーより上（定義部のみ）を
// 一時ファイルへ切り出して import する。raiseAndPersistHighWater は driver スコープの
// persistedHighWaterBytes（let）を直接ミューテートするため定義部には無く、配線テスト（文字列
// 走査）でのみ検証する。
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
const sliceDir = mkdtempSync(join(tmpdir(), 'implement-issue-tree-high-water-defs-'))
const slicePath = join(sliceDir, 'implement-issue-tree-high-water-defs.mjs')
// 実装スクリプトは `export const meta` 以外の top-level export を持てない（Workflow 起動制約）
// ため、定義部は非 export のまま置き、切り出したスライス側で export 文を付与する。
const SLICE_EXPORTS = ['computeNextHighWater', 'STATE_LOAD_SCHEMA', 'HIGH_WATER_SCHEMA_VERSION']
writeFileSync(slicePath, `${definitionPart}\nexport { ${SLICE_EXPORTS.join(', ')} }\n`)

const mod = await import(pathToFileURL(slicePath).href)
const { computeNextHighWater, STATE_LOAD_SCHEMA, HIGH_WATER_SCHEMA_VERSION } = mod

// --- 1. 純粋関数（computeNextHighWater）の境界値テスト ---

test('computeNextHighWater: 現在値 0・候補 100 → 100 を返す（初回永続化）', () => {
  assert.equal(computeNextHighWater(0, 100), 100)
})

test('computeNextHighWater: 現在値 100・候補 100（同値）→ null（更新不要。縮めない/据え置きの境界）', () => {
  assert.equal(computeNextHighWater(100, 100), null)
})

test('computeNextHighWater: 現在値 100・候補 99 → null（縮めない）', () => {
  assert.equal(computeNextHighWater(100, 99), null)
})

test('computeNextHighWater: 現在値 100・候補 101 → 101（僅差でも成長は反映する）', () => {
  assert.equal(computeNextHighWater(100, 101), 101)
})

test('computeNextHighWater: 候補が非整数 → null（fail-closed: 不正な値では高水位を更新しない）', () => {
  assert.equal(computeNextHighWater(0, 1.5), null)
})

test('computeNextHighWater: 候補が 0 → null', () => {
  assert.equal(computeNextHighWater(0, 0), null)
})

test('computeNextHighWater: 候補が負数 → null', () => {
  assert.equal(computeNextHighWater(0, -100), null)
})

test('computeNextHighWater: 現在値が非整数・負数（壊れた状態ファイル由来を想定）→ 0 として扱われ、正の候補は常に採用される', () => {
  assert.equal(computeNextHighWater(-5, 10), 10)
  assert.equal(computeNextHighWater(NaN, 10), 10)
  assert.equal(computeNextHighWater(1.5, 10), 10)
})

// --- STATE_LOAD_SCHEMA の契約 ---

test('STATE_LOAD_SCHEMA: required に highWaterBytes が含まれる', () => {
  assert.ok(STATE_LOAD_SCHEMA.required.includes('highWaterBytes'))
})

test('STATE_LOAD_SCHEMA: required に highWaterVersion が含まれる（Issue #496）', () => {
  assert.ok(STATE_LOAD_SCHEMA.required.includes('highWaterVersion'))
})

test('HIGH_WATER_SCHEMA_VERSION: 現行値は 2（Issue #496。旧版=1 未満・番兵値 0 と区別する）', () => {
  assert.equal(HIGH_WATER_SCHEMA_VERSION, 2)
})

// --- 2. 配線テスト（フルソーステキストに対する文字列走査。driver 部はハーネス依存で import 不能） ---

test('配線: ラン開始時の raw 値確定行が persistedHighWaterBytes を Math.max の第3引数に含む', () => {
  assert.match(
    source,
    /rawPerWorktreeByteReserve = Math\.max\(mainKib \* 1024, avgResidualBytes, persistedHighWaterBytes\)/,
  )
})

test('配線: ラン開始時の raw 値確定直後に raiseAndPersistHighWater(avgResidualBytes) 呼び出しが続く（Issue #496: 永続化候補を mainKib 項を含まない実測平均へ限定）', () => {
  const idx = source.indexOf('rawPerWorktreeByteReserve = Math.max(mainKib * 1024, avgResidualBytes, persistedHighWaterBytes)')
  assert.ok(idx >= 0)
  const after = source.slice(idx, idx + 700)
  assert.match(after, /await raiseAndPersistHighWater\(avgResidualBytes\)/)
})

test('配線: raw 値確定より前に decideRunStartHighWater の呼び出しと persistedHighWaterBytes の再代入がある（Issue #496）', () => {
  const decideIdx = source.indexOf('const highWaterDecision = decideRunStartHighWater(')
  const rawIdx = source.indexOf('rawPerWorktreeByteReserve = Math.max(mainKib * 1024, avgResidualBytes, persistedHighWaterBytes)')
  assert.ok(decideIdx >= 0)
  assert.ok(rawIdx >= 0)
  assert.ok(decideIdx < rawIdx, 'decideRunStartHighWater の呼び出しは raw 値確定より前になければならない')
  const between = source.slice(decideIdx, rawIdx)
  assert.match(between, /persistedHighWaterBytes = highWaterDecision\.effectiveBytes/)
})

test('配線: remeasureResidualBytesNow 内で raiseAndPersistHighWater(avgActualBytes) 呼び出しが厳密に2箇所存在する（Issue #510: raw 代入結果ではなく実測値そのものを渡す）', () => {
  const needle = 'await raiseAndPersistHighWater(avgActualBytes)'
  const calls = []
  let searchFrom = 0
  for (;;) {
    const idx = source.indexOf(needle, searchFrom)
    if (idx < 0) break
    calls.push(idx)
    searchFrom = idx + needle.length
  }
  assert.equal(calls.length, 2, 'raiseAndPersistHighWater(avgActualBytes) 呼び出しが2箇所であるという前提が崩れている（実装の作り変えを要確認）')
})

test('配線: remeasureResidualBytesNow の raiseAndPersistHighWater(avgActualBytes) 呼び出し2箇所いずれも、raw 予約を更新する if (avgActualBytes > rawPerWorktreeByteReserve) ブロックの外側（閉じ括弧より後）にある（Issue #510: raw が増えない周回でも実測平均を永続化する回帰防止）', () => {
  const callNeedle = 'await raiseAndPersistHighWater(avgActualBytes)'
  const ifNeedle = 'if (avgActualBytes > rawPerWorktreeByteReserve) {'

  const callIdxs = []
  let searchFrom = 0
  for (;;) {
    const idx = source.indexOf(callNeedle, searchFrom)
    if (idx < 0) break
    callIdxs.push(idx)
    searchFrom = idx + callNeedle.length
  }
  assert.equal(callIdxs.length, 2)

  const ifIdxs = []
  searchFrom = 0
  for (;;) {
    const idx = source.indexOf(ifNeedle, searchFrom)
    if (idx < 0) break
    ifIdxs.push(idx)
    searchFrom = idx + ifNeedle.length
  }
  assert.equal(ifIdxs.length, 2, 'raw 予約更新の if 分岐が2箇所であるという前提が崩れている（実装の作り変えを要確認）')

  // 各 call の直前にある最も近い if 開始位置を対応する if ブロックとみなし、その if ブロックの
  // 閉じ括弧（同じインデントの "}" 行）が call より前に来ていることを確認する。これにより
  // 「call が if ブロックの内側に戻っていない（= raw 増加時のみの実行に後退していない）」ことを
  // 文字列オフセット比較だけで検証する。
  for (const callIdx of callIdxs) {
    const precedingIfIdxs = ifIdxs.filter((i) => i < callIdx)
    assert.ok(precedingIfIdxs.length > 0, `call (idx ${callIdx}) より前に対応する if 開始が見つからない`)
    const ifIdx = Math.max(...precedingIfIdxs)
    // if 開始直後から call 直前までの範囲に、その if ブロックを閉じる行（2箇所の分岐は
    // ネスト位置が異なり、それぞれ 6・8 スペースインデントの "}" 単独行になる）が
    // call より前に出現することを確認する。
    const between = source.slice(ifIdx, callIdx)
    assert.match(
      between,
      /\n {6,8}\}\n/,
      `if (idx ${ifIdx}) の閉じ括弧が call (idx ${callIdx}) より前に見つからない（call が if ブロック内側に後退している疑い）`,
    )
  }
})

test('配線: loadState() の初期 JSON テンプレートに perWorktreeByteReserveHighWater が含まれる', () => {
  assert.match(source, /"perWorktreeByteReserveHighWater":0/)
})

test('配線: loadState() の初期 JSON テンプレートに perWorktreeByteReserveHighWaterVersion が現行版で含まれる（Issue #496）', () => {
  assert.match(source, /"perWorktreeByteReserveHighWaterVersion":\$\{HIGH_WATER_SCHEMA_VERSION\}/)
})

test('配線: savedItems 取得が loadState() の分割代入へ変更され highWaterBytes・highWaterVersion を受け取る', () => {
  assert.match(
    source,
    /const \{\s*items: savedItems,\s*highWaterBytes: loadedHighWaterBytes,\s*highWaterVersion: loadedHighWaterVersion,?\s*\} = await loadState\(\)/,
  )
})

test('配線: persistedHighWaterBytes が loadedHighWaterBytes で初期化される', () => {
  assert.match(source, /let persistedHighWaterBytes = loadedHighWaterBytes/)
})

// --- 3. プロンプト文言テスト ---

test('プロンプト文言: persistPerWorktreeByteReserveHighWater が .items に触れない旨の文言を含む', () => {
  const idx = source.indexOf('async function persistPerWorktreeByteReserveHighWater')
  assert.ok(idx >= 0)
  const fnBody = source.slice(idx, idx + 2500)
  assert.match(fnBody, /\.items には一切触れない/)
})

test('プロンプト文言: persistPerWorktreeByteReserveHighWater のプロンプトが version 条件込みの jq 比較式を含む（Issue #496）', () => {
  const idx = source.indexOf('async function persistPerWorktreeByteReserveHighWater')
  assert.ok(idx >= 0)
  const fnBody = source.slice(idx, idx + 3000)
  assert.match(fnBody, /if \(\(\.perWorktreeByteReserveHighWaterVersion \/\/ 0\) != \$v\)/)
  assert.match(fnBody, /or \(\(\.perWorktreeByteReserveHighWater \/\/ 0\) < \$hw\) then/)
  assert.match(fnBody, /\.perWorktreeByteReserveHighWater = \$hw \| \.perWorktreeByteReserveHighWaterVersion = \$v/)
})

test('配線: setPerWorktreeByteReserveHighWater が定義され .items に触れない旨の文言を含む（Issue #496）', () => {
  const idx = source.indexOf('async function setPerWorktreeByteReserveHighWater')
  assert.ok(idx >= 0)
  const fnBody = source.slice(idx, idx + 2000)
  assert.match(fnBody, /\.items には一切触れない/)
  assert.match(fnBody, /'\.perWorktreeByteReserveHighWater = \$hw \| \.perWorktreeByteReserveHighWaterVersion = \$v/)
})

test('配線: ラン開始時の高水位是正（rewriteBytes !== null）が raw 値確定より前に setPerWorktreeByteReserveHighWater を呼ぶ（Issue #496）', () => {
  const rewriteIdx = source.indexOf('if (highWaterDecision.rewriteBytes !== null) {')
  const rawIdx = source.indexOf('rawPerWorktreeByteReserve = Math.max(mainKib * 1024, avgResidualBytes, persistedHighWaterBytes)')
  assert.ok(rewriteIdx >= 0)
  assert.ok(rawIdx >= 0)
  assert.ok(rewriteIdx < rawIdx)
  const between = source.slice(rewriteIdx, rawIdx)
  assert.match(between, /await setPerWorktreeByteReserveHighWater\(highWaterDecision\.rewriteBytes\)/)
})
