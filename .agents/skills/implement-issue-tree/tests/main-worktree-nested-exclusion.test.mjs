// メイン worktree 配下に残置した linked worktree（前ランの isolation worktree 等）が、メイン
// worktree の容量見積り（measureMainWorktreeContentBytes → 1 worktree あたりの容量予約
// perWorktreeByteReserve）へ二重計上されるのを防ぐ回帰テスト（Issue #496）。
//
// 背景: isolation worktree は `<main>/.claude/worktrees/<runId>-N` に作られる。前ランの worktree
// が削除されずに残っていると、その中身（cargo target/ 込みで 1 件あたり数〜十数 GiB）がメイン
// worktree の du に丸ごと含まれ、1 worktree あたりの予約が数十 GiB まで膨らみ、実ディスクの空き
// 容量が十分でも新規着手が全件 blocked になる。加えて Issue #471 の高水位（縮めない・状態ファイル
// へ永続化）がこの膨張値を次ラン以降にも引き継いでしまう。
//
// 読み込み方式は high-water-reserve.test.mjs と同一: 実装スクリプトは Workflow ハーネス専用文法
// を含み module として丸ごと import できないため、__IMPLEMENT_ISSUE_TREE_DRIVER_START__ マーカー
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
const sliceDir = mkdtempSync(join(tmpdir(), 'implement-issue-tree-nested-exclusion-defs-'))
const slicePath = join(sliceDir, 'implement-issue-tree-nested-exclusion-defs.mjs')
// 実装スクリプトは `export const meta` 以外の top-level export を持てない（Workflow 起動制約）
// ため、定義部は非 export のまま置き、切り出したスライス側で export 文を付与する。
const SLICE_EXPORTS = [
  'selectNestedLinkedWorktreePaths',
  'computeMainContentKib',
  'decideRunStartHighWater',
  'HIGH_WATER_SCHEMA_VERSION',
  'HIGH_WATER_DECAY_MIN_SAMPLES',
  'HIGH_WATER_DECAY_RATIO',
  'projectFreeDiskReserveBytes',
  'shouldSuppressForFreeDisk',
]
writeFileSync(slicePath, `${definitionPart}\nexport { ${SLICE_EXPORTS.join(', ')} }\n`)

const mod = await import(pathToFileURL(slicePath).href)
const {
  selectNestedLinkedWorktreePaths,
  computeMainContentKib,
  decideRunStartHighWater,
  HIGH_WATER_SCHEMA_VERSION,
  HIGH_WATER_DECAY_MIN_SAMPLES,
  HIGH_WATER_DECAY_RATIO,
  projectFreeDiskReserveBytes,
  shouldSuppressForFreeDisk,
} = mod

// --- selectNestedLinkedWorktreePaths ---

test('selectNestedLinkedWorktreePaths: メイン配下の isolation worktree だけを返す', () => {
  const mainPath = '/repo'
  const entries = [
    { path: mainPath, isMain: true },
    { path: '/repo/.claude/worktrees/wf_x-1', isMain: false },
    { path: '/repo/.claude/worktrees/wf_x-2', isMain: false },
  ]
  const result = selectNestedLinkedWorktreePaths(mainPath, entries)
  assert.deepEqual(
    new Set(result),
    new Set(['/repo/.claude/worktrees/wf_x-1', '/repo/.claude/worktrees/wf_x-2']),
  )
})

test('selectNestedLinkedWorktreePaths: メイン外のパスは含めない', () => {
  const mainPath = '/repo'
  const entries = [
    { path: mainPath, isMain: true },
    { path: '/other/wt', isMain: false },
  ]
  assert.deepEqual(selectNestedLinkedWorktreePaths(mainPath, entries), [])
})

test('selectNestedLinkedWorktreePaths: /repo と /repo2/... の接頭辞誤一致を拾わない', () => {
  const mainPath = '/repo'
  const entries = [
    { path: mainPath, isMain: true },
    { path: '/repo2/worktrees/x', isMain: false },
  ]
  assert.deepEqual(selectNestedLinkedWorktreePaths(mainPath, entries), [])
})

test('selectNestedLinkedWorktreePaths: メイン自身は含めない', () => {
  const mainPath = '/repo'
  const entries = [{ path: mainPath, isMain: true }]
  assert.deepEqual(selectNestedLinkedWorktreePaths(mainPath, entries), [])
})

test('selectNestedLinkedWorktreePaths: 検証不能パスが混在したら null を返す（fail-closed）', () => {
  const mainPath = '/repo'
  const entries = [
    { path: mainPath, isMain: true },
    { path: '/repo/.claude/worktrees/wf_x-1', isMain: false },
    { path: '../etc/passwd', isMain: false },
  ]
  assert.equal(selectNestedLinkedWorktreePaths(mainPath, entries), null)
})

test('selectNestedLinkedWorktreePaths: 空配列・非配列の入力を扱える', () => {
  assert.deepEqual(selectNestedLinkedWorktreePaths('/repo', []), [])
  assert.deepEqual(selectNestedLinkedWorktreePaths('/repo', null), [])
  assert.deepEqual(selectNestedLinkedWorktreePaths('/repo', undefined), [])
})

test('selectNestedLinkedWorktreePaths: mainPath が空文字・非文字列なら null', () => {
  assert.equal(selectNestedLinkedWorktreePaths('', [{ path: '/repo', isMain: true }]), null)
  assert.equal(selectNestedLinkedWorktreePaths(undefined, [{ path: '/repo', isMain: true }]), null)
})

test('selectNestedLinkedWorktreePaths: 重複を除去する', () => {
  const mainPath = '/repo'
  const entries = [
    { path: mainPath, isMain: true },
    { path: '/repo/.claude/worktrees/wf_x-1', isMain: false },
    { path: '/repo/.claude/worktrees/wf_x-1', isMain: false },
  ]
  assert.deepEqual(selectNestedLinkedWorktreePaths(mainPath, entries), ['/repo/.claude/worktrees/wf_x-1'])
})

// 後段は各パスの du を合算してメインの総量から差し引くため、包含関係にある 2 パスを両方返すと
// 内側を二重に控除し、メイン見積りが過小（危険側）になる。
test('selectNestedLinkedWorktreePaths: 包含関係にある nested worktree は最上位のみ返す（二重控除防止）', () => {
  const mainPath = '/repo'
  const entries = [
    { path: mainPath, isMain: true },
    { path: '/repo/wt/inner', isMain: false },
    { path: '/repo/wt', isMain: false },
  ]
  assert.deepEqual(selectNestedLinkedWorktreePaths(mainPath, entries), ['/repo/wt'])
})

test('selectNestedLinkedWorktreePaths: /repo/wt と /repo/wt2 は包含関係とみなさず両方返す', () => {
  const mainPath = '/repo'
  const entries = [
    { path: mainPath, isMain: true },
    { path: '/repo/wt', isMain: false },
    { path: '/repo/wt2', isMain: false },
  ]
  assert.deepEqual(new Set(selectNestedLinkedWorktreePaths(mainPath, entries)), new Set(['/repo/wt', '/repo/wt2']))
})

test('selectNestedLinkedWorktreePaths: 包含関係のパスがあっても検証不能パスが混在すれば null（fail-closed 不変）', () => {
  const mainPath = '/repo'
  const entries = [
    { path: mainPath, isMain: true },
    { path: '/repo/wt', isMain: false },
    { path: '/repo/wt/inner', isMain: false },
    { path: '../etc/passwd', isMain: false },
  ]
  assert.equal(selectNestedLinkedWorktreePaths(mainPath, entries), null)
})

// --- computeMainContentKib ---

test('computeMainContentKib: いずれか null なら null', () => {
  assert.equal(computeMainContentKib({ totalKib: null, gitKib: 100, nestedKib: 0 }), null)
  assert.equal(computeMainContentKib({ totalKib: 100, gitKib: null, nestedKib: 0 }), null)
  assert.equal(computeMainContentKib({ totalKib: 100, gitKib: 10, nestedKib: null }), null)
})

test('computeMainContentKib: 通常の差し引き', () => {
  assert.equal(computeMainContentKib({ totalKib: 1000, gitKib: 200, nestedKib: 300 }), 500)
})

test('computeMainContentKib: 負値は 0 にクランプする', () => {
  assert.equal(computeMainContentKib({ totalKib: 100, gitKib: 200, nestedKib: 0 }), 0)
})

test('computeMainContentKib: vector-db 相当の合成値（残置 16 件・約 99 GiB 相当）でネスト分を含まない小さな値になる', () => {
  const GIB_KIB = 1024 * 1024
  const totalKib = 100 * GIB_KIB // メイン全体 100 GiB 相当（ネスト混入で膨張した想定）
  const gitKib = 1 * GIB_KIB
  const nestedKib = 99 * GIB_KIB // 残置 16 件分の isolation worktree
  const result = computeMainContentKib({ totalKib, gitKib, nestedKib })
  assert.equal(result, 0 * GIB_KIB) // 100 - 1 - 99 = 0（クランプ域だが少なくとも 99 GiB 膨張しない）
  assert.ok(result < 1 * GIB_KIB, 'ネストを除外した結果は 1 GiB 未満に収まるべき')
})

// --- decideRunStartHighWater ---

const GIB = 1024 * 1024 * 1024

test('decideRunStartHighWater: 旧版（version 0）で値 > 0 なら無効化（reason legacy）', () => {
  const r = decideRunStartHighWater({
    persistedBytes: 40 * GIB,
    persistedVersion: 0,
    freshEstimateBytes: 6 * GIB,
    residualSampleCount: 5,
  })
  assert.deepEqual(r, { effectiveBytes: 0, rewriteBytes: 0, reason: 'legacy' })
})

test('decideRunStartHighWater: 旧版で値 0 なら書き換えなし', () => {
  const r = decideRunStartHighWater({
    persistedBytes: 0,
    persistedVersion: 0,
    freshEstimateBytes: 6 * GIB,
    residualSampleCount: 5,
  })
  assert.deepEqual(r, { effectiveBytes: 0, rewriteBytes: null, reason: null })
})

test('decideRunStartHighWater: 現行版・サンプル 0 なら据え置き（Issue #471 の過小見積り防止を回帰させない）', () => {
  const r = decideRunStartHighWater({
    persistedBytes: 40 * GIB,
    persistedVersion: HIGH_WATER_SCHEMA_VERSION,
    freshEstimateBytes: 6 * GIB,
    residualSampleCount: 0,
  })
  assert.deepEqual(r, { effectiveBytes: 40 * GIB, rewriteBytes: null, reason: null })
})

test('decideRunStartHighWater: 現行版・サンプルが閾値未満なら据え置き', () => {
  assert.equal(HIGH_WATER_DECAY_MIN_SAMPLES, 3)
  const r = decideRunStartHighWater({
    persistedBytes: 40 * GIB,
    persistedVersion: HIGH_WATER_SCHEMA_VERSION,
    freshEstimateBytes: 6 * GIB,
    residualSampleCount: 2,
  })
  assert.deepEqual(r, { effectiveBytes: 40 * GIB, rewriteBytes: null, reason: null })
})

test('decideRunStartHighWater: 現行版・サンプル閾値以上・4 倍超なら max(fresh, ceil(p/2)) へ引き下げ', () => {
  assert.equal(HIGH_WATER_DECAY_RATIO, 4)
  const persisted = 40 * GIB
  const fresh = 6 * GIB // 40 > 6*4=24 なので decay 発火
  const r = decideRunStartHighWater({
    persistedBytes: persisted,
    persistedVersion: HIGH_WATER_SCHEMA_VERSION,
    freshEstimateBytes: fresh,
    residualSampleCount: 3,
  })
  const expected = Math.max(fresh, Math.ceil(persisted / 2))
  assert.deepEqual(r, { effectiveBytes: expected, rewriteBytes: expected, reason: 'decay' })
  assert.equal(r.effectiveBytes, Math.ceil(persisted / 2))
})

test('decideRunStartHighWater: ちょうど 4 倍は据え置き（境界。厳密な超過のみ発火）', () => {
  const fresh = 10 * GIB
  const persisted = fresh * HIGH_WATER_DECAY_RATIO // ちょうど4倍
  const r = decideRunStartHighWater({
    persistedBytes: persisted,
    persistedVersion: HIGH_WATER_SCHEMA_VERSION,
    freshEstimateBytes: fresh,
    residualSampleCount: 5,
  })
  assert.deepEqual(r, { effectiveBytes: persisted, rewriteBytes: null, reason: null })
})

test('decideRunStartHighWater: persisted が非整数・負値なら 0 とみなす', () => {
  const r1 = decideRunStartHighWater({
    persistedBytes: -5,
    persistedVersion: HIGH_WATER_SCHEMA_VERSION,
    freshEstimateBytes: 6 * GIB,
    residualSampleCount: 5,
  })
  assert.deepEqual(r1, { effectiveBytes: 0, rewriteBytes: null, reason: null })

  const r2 = decideRunStartHighWater({
    persistedBytes: 1.5,
    persistedVersion: HIGH_WATER_SCHEMA_VERSION,
    freshEstimateBytes: 6 * GIB,
    residualSampleCount: 5,
  })
  assert.deepEqual(r2, { effectiveBytes: 0, rewriteBytes: null, reason: null })
})

// --- 必要空き容量の合成シナリオ（是正前後の比較。projectFreeDiskReserveBytes /
// shouldSuppressForFreeDisk は既存関数をそのまま再利用し、Issue #496 の是正が実ディスクゲートの
// 判定へちゃんと波及することを end-to-end に近い形で固定する） ---

test('必要空き容量: 是正後の見積り（ネスト除外・平均 6 GiB 程度）なら抑止されない', () => {
  const required = projectFreeDiskReserveBytes({
    reservedUnits: 1,
    extraReserveUnits: 0,
    rawPerWorktreeByteReserve: 6 * GIB,
  })
  const freeDiskBytesAtStart = 40 * GIB
  assert.equal(shouldSuppressForFreeDisk(freeDiskBytesAtStart, required), false)
})

test('必要空き容量: 旧来の膨張値（38 GiB。ネスト混入 16 件分を含む見積り）なら抑止される', () => {
  const required = projectFreeDiskReserveBytes({
    reservedUnits: 2, // 2 件同時着手を仮定すると 38 GiB * 2 = 76 GiB > 40 GiB
    extraReserveUnits: 0,
    rawPerWorktreeByteReserve: 38 * GIB,
  })
  const freeDiskBytesAtStart = 40 * GIB
  assert.equal(shouldSuppressForFreeDisk(freeDiskBytesAtStart, required), true)
})
