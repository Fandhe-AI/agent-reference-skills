// 残置 worktree バイト軸の平均算出・未検証 implement エントリの帰属解決・空き容量 latch の
// 適用範囲に関する回帰テスト（PR #467/#468 に対する Bugbot / codex-review 指摘への対応）。
//
// 固定する契約:
//   1. computeAveragePerWorktreeBytes — 1 worktree あたりの平均バイト数の分母は「送ったパス数
//      − 欠落数」に限る（Bugbot Medium: 並行 cleanup で消えたパスを分母へ残すと平均が希釈され、
//      実ディスク空き容量ゲートの予約量が過小になる fail-open）。
//   2. resolveUnverifiedImplementPaths — 未検証 implement エントリを物理一覧へ一意に帰属できた
//      場合のみ測定対象へ含め、曖昧・不在なら解決不能として返す（codex P1: 既知パスの部分集合
//      だけで平均を更新すると、パス未取得の大きな worktree の実サイズが見積りへ反映されない）。
//   3. shouldSkipForNewStartSuppressed — 空き容量起因の latch（implementOnly: true）は worktree
//      を作らない verify-close を止めない（Bugbot Medium）。件数軸・バイト軸の latch は従来どおり
//      全 kind を止める。
//
// 読み込み方式は free-disk-gate.test.mjs / residual-byte-fallback.test.mjs と同一:
// 実装スクリプトは Workflow ハーネス専用文法（トップレベル return・注入グローバル）を含み
// module として丸ごと import できないため、__IMPLEMENT_ISSUE_TREE_DRIVER_START__ マーカーより
// 上（定義部のみ）を一時ファイルへ切り出して import する。
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
const sliceDir = mkdtempSync(join(tmpdir(), 'implement-issue-tree-avg-latch-defs-'))
const slicePath = join(sliceDir, 'implement-issue-tree-avg-latch-defs.mjs')
// 実装スクリプトは `export const meta` 以外の top-level export を持てない（Workflow 起動制約）
// ため、定義部は非 export のまま置き、切り出したスライス側で export 文を付与する。
const SLICE_EXPORTS = [
  'computeAveragePerWorktreeBytes',
  'resolveUnverifiedImplementPaths',
  'listUnverifiedImplementIssues',
  'shouldSkipForNewStartSuppressed',
  'escalateNewStartSuppressed',
  'classifyStartMeasurementFailure',
  'ORPHAN_BYTES_SCHEMA',
]
writeFileSync(slicePath, `${definitionPart}\nexport { ${SLICE_EXPORTS.join(', ')} }\n`)

const mod = await import(pathToFileURL(slicePath).href)
const {
  computeAveragePerWorktreeBytes,
  resolveUnverifiedImplementPaths,
  listUnverifiedImplementIssues,
  shouldSkipForNewStartSuppressed,
  escalateNewStartSuppressed,
  classifyStartMeasurementFailure,
  ORPHAN_BYTES_SCHEMA,
} = mod

// --- 1. 平均算出の分母（Bugbot Medium: 欠落パスによる希釈）---

test('computeAveragePerWorktreeBytes: 欠落なしなら送ったパス数で割る', () => {
  assert.equal(
    computeAveragePerWorktreeBytes({ kib: 3 * 1024 * 1024, sentCount: 3, missing: 0 }),
    1024 * 1024 * 1024,
  )
})

test('computeAveragePerWorktreeBytes: 欠落分を分母から差し引く（希釈しない）', () => {
  // 3 件送って 2 件が並行 cleanup で消えた場合、実在 1 件分の合計を 1 で割る。
  // 分母を 3 のままにすると 1/3 の過小見積りになり空き容量ゲートが fail-open する。
  assert.equal(
    computeAveragePerWorktreeBytes({ kib: 1024 * 1024, sentCount: 3, missing: 2 }),
    1024 * 1024 * 1024,
  )
})

test('computeAveragePerWorktreeBytes: 分母が 0 以下なら null（更新スキップの合図。測定失敗ではない）', () => {
  assert.equal(computeAveragePerWorktreeBytes({ kib: 0, sentCount: 2, missing: 2 }), null)
  assert.equal(computeAveragePerWorktreeBytes({ kib: 10, sentCount: 1, missing: 3 }), null)
  assert.equal(computeAveragePerWorktreeBytes({ kib: 10, sentCount: 0, missing: 0 }), null)
})

test('computeAveragePerWorktreeBytes: 入力が整数でない・負値なら null（推測で補わない）', () => {
  assert.equal(computeAveragePerWorktreeBytes({ kib: null, sentCount: 2, missing: 0 }), null)
  assert.equal(computeAveragePerWorktreeBytes({ kib: -1, sentCount: 2, missing: 0 }), null)
  assert.equal(computeAveragePerWorktreeBytes({ kib: 10, sentCount: 2, missing: undefined }), null)
  assert.equal(computeAveragePerWorktreeBytes({ kib: 10, sentCount: 1.5, missing: 0 }), null)
})

test('ORPHAN_BYTES_SCHEMA: missing は必須フィールド（欠落を 0 とみなすと分母が過大になる）', () => {
  assert.ok(ORPHAN_BYTES_SCHEMA.required.includes('missing'), 'missing が required に含まれること')
  assert.equal(ORPHAN_BYTES_SCHEMA.properties.missing.type, 'integer')
})

// --- 2. 未検証 implement エントリの帰属解決（codex P1）---

const PHYSICAL = [
  { path: '/repo', branch: 'main', isMain: true },
  { path: '/tmp/wt-100', branch: 'feat/100-alpha', isMain: false },
  { path: '/tmp/wt-200', branch: 'fix/200-beta', isMain: false },
]

test('resolveUnverifiedImplementPaths: 候補が一意なら物理一覧のパスへ帰属する', () => {
  const r = resolveUnverifiedImplementPaths({
    issues: [100],
    physicalEntries: PHYSICAL,
    independentCount: PHYSICAL.length,
    claimedPaths: [],
    mainPath: '/repo',
  })
  assert.deepEqual(r.paths, ['/tmp/wt-100'])
  assert.deepEqual(r.unresolvedIssues, [])
})

test('resolveUnverifiedImplementPaths: 候補が 0 件なら解決不能として返す（呼び出し側が fail-closed に倒す）', () => {
  const r = resolveUnverifiedImplementPaths({
    issues: [999],
    physicalEntries: PHYSICAL,
    independentCount: PHYSICAL.length,
    claimedPaths: [],
    mainPath: '/repo',
  })
  assert.deepEqual(r.paths, [])
  assert.deepEqual(r.unresolvedIssues, [999])
})

test('resolveUnverifiedImplementPaths: 同一イシューに複数候補があれば推測せず解決不能とする', () => {
  const entries = [
    ...PHYSICAL,
    { path: '/tmp/wt-100-review', branch: 'feat/100-alpha-review', isMain: false },
  ]
  const r = resolveUnverifiedImplementPaths({
    issues: [100],
    physicalEntries: entries,
    independentCount: entries.length,
    claimedPaths: [],
    mainPath: '/repo',
  })
  assert.deepEqual(r.paths, [])
  assert.deepEqual(r.unresolvedIssues, [100])
})

test('resolveUnverifiedImplementPaths: 台帳で検証済みのパス（claimedPaths）は候補から除外する（二重帰属の防止）', () => {
  const r = resolveUnverifiedImplementPaths({
    issues: [100],
    physicalEntries: PHYSICAL,
    independentCount: PHYSICAL.length,
    claimedPaths: ['/tmp/wt-100'],
    mainPath: '/repo',
  })
  assert.deepEqual(r.paths, [])
  assert.deepEqual(r.unresolvedIssues, [100])
})

test('resolveUnverifiedImplementPaths: 同一パスを 2 イシューへ重複帰属させない', () => {
  const entries = [
    { path: '/repo', branch: 'main', isMain: true },
    { path: '/tmp/wt-100', branch: 'feat/100-alpha', isMain: false },
  ]
  const r = resolveUnverifiedImplementPaths({
    issues: [100, 100],
    physicalEntries: entries,
    independentCount: entries.length,
    claimedPaths: [],
    mainPath: '/repo',
  })
  assert.deepEqual(r.paths, ['/tmp/wt-100'])
  assert.deepEqual(r.unresolvedIssues, [100])
})

test('resolveUnverifiedImplementPaths: メイン worktree・不正パス・不正ブランチ名は候補にしない', () => {
  const entries = [
    { path: '/repo', branch: 'feat/300-main-checkout', isMain: true },
    { path: '/tmp/x$(rm -rf ~)', branch: 'feat/300-inject', isMain: false },
    { path: 'relative/path', branch: 'feat/300-relative', isMain: false },
  ]
  const r = resolveUnverifiedImplementPaths({
    issues: [300],
    physicalEntries: entries,
    independentCount: entries.length,
    claimedPaths: [],
    mainPath: '/repo',
  })
  assert.deepEqual(r.paths, [])
  assert.deepEqual(r.unresolvedIssues, [300])
})

test('resolveUnverifiedImplementPaths: 物理一覧が未取得（null）なら全件解決不能', () => {
  const r = resolveUnverifiedImplementPaths({
    issues: [100, 200],
    physicalEntries: null,
    claimedPaths: [],
    mainPath: '/repo',
  })
  assert.deepEqual(r.paths, [])
  assert.deepEqual(r.unresolvedIssues, [100, 200])
})

test('resolveUnverifiedImplementPaths: 独立カウントと一覧件数が不一致なら候補が一意でも全件解決不能とする（一覧転記脱落の疑いを fail-closed で扱う。Issue #475 4 巡目 Bugbot Medium）', () => {
  const r = resolveUnverifiedImplementPaths({
    issues: [100],
    physicalEntries: PHYSICAL, // 本来なら wt-100 が一意候補
    independentCount: PHYSICAL.length - 1, // 転記脱落を模した不一致
    claimedPaths: [],
    mainPath: '/repo',
  })
  assert.deepEqual(r.paths, [])
  assert.deepEqual(r.unresolvedIssues, [100])
})

test('resolveUnverifiedImplementPaths: isMain フラグが 0 件なら判定不能として全件解決不能とする', () => {
  const entries = PHYSICAL.map((e) => ({ ...e, isMain: false }))
  const r = resolveUnverifiedImplementPaths({
    issues: [100],
    physicalEntries: entries,
    independentCount: entries.length,
    claimedPaths: [],
    mainPath: '/repo',
  })
  assert.deepEqual(r.paths, [])
  assert.deepEqual(r.unresolvedIssues, [100])
})

test('resolveUnverifiedImplementPaths: isMain フラグが複数件なら判定不能として全件解決不能とする', () => {
  const entries = PHYSICAL.map((e, i) => (i === 1 ? { ...e, isMain: true } : e))
  const r = resolveUnverifiedImplementPaths({
    issues: [100],
    physicalEntries: entries,
    independentCount: entries.length,
    claimedPaths: [],
    mainPath: '/repo',
  })
  assert.deepEqual(r.paths, [])
  assert.deepEqual(r.unresolvedIssues, [100])
})

test('resolveUnverifiedImplementPaths: 部分一致のブランチ名は帰属させない（アンカー付き一致の維持）', () => {
  const entries = [
    { path: '/repo', branch: 'main', isMain: true },
    { path: '/tmp/wt-1000', branch: 'feat/1000-gamma', isMain: false },
  ]
  const r = resolveUnverifiedImplementPaths({
    issues: [100],
    physicalEntries: entries,
    independentCount: entries.length,
    claimedPaths: [],
    mainPath: '/repo',
  })
  assert.deepEqual(r.paths, [])
  assert.deepEqual(r.unresolvedIssues, [100])
})

test('listUnverifiedImplementIssues: 未検証エントリを持つイシューを返す', () => {
  const entries = [
    { issue: 100, kind: 'implement', path: '' },
    { issue: 200, kind: 'implement', path: '/tmp/wt-200' },
  ]
  assert.deepEqual(listUnverifiedImplementIssues(entries), [100])
})

test('listUnverifiedImplementIssues: 同一イシューに検証済みパスがあれば解決不要とみなす（implement は 1 イシュー 1 worktree のため同一実体の重複記録）', () => {
  // 除外しないと「既に測定対象へ入っている worktree」に対して候補が枯れ、恒久 latch になる。
  const entries = [
    { issue: 100, kind: 'implement', path: '/tmp/wt-100' },
    { issue: 100, kind: 'implement', path: '' },
  ]
  assert.deepEqual(listUnverifiedImplementIssues(entries), [])
})

test('listUnverifiedImplementIssues: 削除確認済みの検証済みパスを持つイシューも解決対象から外す（Bugbot Medium「Removed path breaks implement resolution」）', () => {
  // マージ後 cleanup の典型形。呼び出し側は confirmedRemovedPaths のエントリを落とさずに渡すため、
  // 「同一イシューに検証済みパスがあれば重複記録」の規則がそのまま効き、実体の無い worktree の
  // 候補を探して恒久 latch する経路に入らない。
  const entries = [
    { issue: 100, kind: 'implement', path: '/tmp/wt-100' }, // 削除確認済み（呼び出し側で除外しない）
    { issue: 100, kind: 'implement', path: '' },
  ]
  assert.deepEqual(listUnverifiedImplementIssues(entries), [])
})

test('listUnverifiedImplementIssues: 検証不可プレースホルダも未検証として扱う', () => {
  const entries = [{ issue: 300, kind: 'implement', path: '(検証不可: 応答欠落)' }]
  assert.deepEqual(listUnverifiedImplementIssues(entries), [300])
})

// --- 3. 空き容量 latch の適用範囲（Bugbot Medium）---

test('shouldSkipForNewStartSuppressed: latch なしなら skip しない', () => {
  assert.equal(shouldSkipForNewStartSuppressed(null, 'implement'), false)
  assert.equal(shouldSkipForNewStartSuppressed(null, 'verify-close'), false)
})

test('shouldSkipForNewStartSuppressed: 空き容量起因（implementOnly）は implement のみ skip する', () => {
  const latch = { reason: '空き容量不足', implementOnly: true }
  assert.equal(shouldSkipForNewStartSuppressed(latch, 'implement'), true)
  assert.equal(shouldSkipForNewStartSuppressed(latch, 'verify-close'), false)
})

test('shouldSkipForNewStartSuppressed: 件数軸・バイト軸の latch は全 kind を skip する（過剰抑止＝安全側の維持）', () => {
  const latch = { reason: '残置件数上限超過' }
  assert.equal(shouldSkipForNewStartSuppressed(latch, 'implement'), true)
  assert.equal(shouldSkipForNewStartSuppressed(latch, 'verify-close'), true)
})

// --- 4. latch の昇格規則（Bugbot Medium「Weaker latch blocks stricter fail-closed」）---

test('escalateNewStartSuppressed: 未設定なら新しい latch を採用する', () => {
  const next = { reason: '件数上限超過' }
  const r = escalateNewStartSuppressed(null, next)
  assert.equal(r.latch, next)
  assert.equal(r.changed, true)
  assert.equal(r.escalated, false)
})

test('escalateNewStartSuppressed: implement 限定 latch は全 kind latch へ昇格する（verify-close を通し続ける穴を塞ぐ）', () => {
  const current = { reason: '空き容量不足', implementOnly: true }
  const next = { reason: 'バイト軸の実測失敗' }
  const r = escalateNewStartSuppressed(current, next)
  assert.equal(r.latch, next)
  assert.equal(r.changed, true)
  assert.equal(r.escalated, true)
})

test('escalateNewStartSuppressed: 全 kind latch は implement 限定 latch で上書きされない（適用範囲を狭めない）', () => {
  const current = { reason: '件数上限超過' }
  const next = { reason: '空き容量不足', implementOnly: true }
  const r = escalateNewStartSuppressed(current, next)
  assert.equal(r.latch, current)
  assert.equal(r.changed, false)
  assert.equal(r.escalated, false)
})

test('escalateNewStartSuppressed: 同種同士（全 kind → 全 kind / implement 限定 → implement 限定）は最初の理由を保つ', () => {
  const fullA = { reason: '件数上限超過' }
  const fullB = { reason: 'バイト軸の容量超過' }
  assert.deepEqual(escalateNewStartSuppressed(fullA, fullB), { latch: fullA, changed: false, escalated: false })
  const onlyA = { reason: '開始時の空き容量不足', implementOnly: true }
  const onlyB = { reason: 'ラン中の空き容量不足', implementOnly: true }
  assert.deepEqual(escalateNewStartSuppressed(onlyA, onlyB), { latch: onlyA, changed: false, escalated: false })
})

test('escalateNewStartSuppressed: 昇格後の latch は verify-close も止める（shouldSkipForNewStartSuppressed との結合）', () => {
  const escalated = escalateNewStartSuppressed({ reason: '空き容量不足', implementOnly: true }, { reason: '件数上限超過' })
  assert.equal(shouldSkipForNewStartSuppressed(escalated.latch, 'verify-close'), true)
  assert.equal(shouldSkipForNewStartSuppressed(escalated.latch, 'implement'), true)
})

// --- 5. ラン開始時の測定失敗の帰属（Bugbot Medium「df failure poisons residual observation」）---

test('classifyStartMeasurementFailure: 全測定成功なら none', () => {
  assert.equal(classifyStartMeasurementFailure({ mainKib: 100, kib: 200, freeDiskKib: 300 }), 'none')
})

test('classifyStartMeasurementFailure: du 側（mainKib / kib）の失敗はバイト軸の観測失敗（全 kind 停止）', () => {
  assert.equal(classifyStartMeasurementFailure({ mainKib: null, kib: 200, freeDiskKib: 300 }), 'bytes')
  assert.equal(classifyStartMeasurementFailure({ mainKib: 100, kib: null, freeDiskKib: 300 }), 'bytes')
  // du と df が同時に失敗した場合もバイト軸を優先する（観測不能の範囲が広い側へ倒す）。
  assert.equal(classifyStartMeasurementFailure({ mainKib: null, kib: null, freeDiskKib: null }), 'bytes')
})

test('classifyStartMeasurementFailure: df だけの失敗は free-disk（バイト軸の観測は成立させる）', () => {
  assert.equal(classifyStartMeasurementFailure({ mainKib: 100, kib: 200, freeDiskKib: null }), 'free-disk')
})

test('classifyStartMeasurementFailure: 残置 0 件（kib が 0）を失敗と取り違えない', () => {
  assert.equal(classifyStartMeasurementFailure({ mainKib: 0, kib: 0, freeDiskKib: 0 }), 'none')
})

// --- 配線固定（dead code 化防止）---
// 駆動部（マーカー以下）は import できないため、既存テスト群と同型のソーステキスト固定で
// 新規純粋関数が実際に駆動部から参照されていることを確認する。

test('remeasureResidualBytesNow は computeAveragePerWorktreeBytes と resolveUnverifiedImplementPaths を参照する', () => {
  const fnStart = source.indexOf('async function remeasureResidualBytesNow()')
  const fnEnd = source.indexOf('async function remeasureFreeDiskNow()', fnStart)
  assert.ok(fnStart >= 0 && fnEnd > fnStart, 'remeasureResidualBytesNow 本体を特定できること')
  const fnBody = source.slice(fnStart, fnEnd)
  assert.match(fnBody, /computeAveragePerWorktreeBytes\(/)
  assert.match(fnBody, /resolveUnverifiedImplementPaths\(/)
  assert.match(fnBody, /listUnverifiedImplementIssues\(allImplementEntries\)/)
  assert.match(fnBody, /measureResidualWorktreeBytesDetailed\(targetPaths\)/)
  // 全件平均フォールバック側も欠落数を差し引く（片側だけの修正で希釈が残らないことの固定）。
  assert.match(fnBody, /missing: measured\.missing/)
  assert.match(fnBody, /missing: implementMeasured\.missing/)
})

test('dispatch ループの新規着手抑止は shouldSkipForNewStartSuppressed 経由で判定する（真偽値直参照へ戻さない）', () => {
  assert.match(source, /if \(shouldSkipForNewStartSuppressed\(newStartSuppressed, item\.kind\)\) continue/)
})

test('容量予約見積り・空き容量起因の latch は 6 箇所すべてで implementOnly: true を持つ（開始時ゲート・開始時 df 単独失敗・未解決 implement パス・implement 限定 du 失敗・ラン中 df 実測し直し失敗・ループ内ゲート）', () => {
  const occurrences = source.match(/implementOnly: true,/g) ?? []
  assert.equal(occurrences.length, 6, `implementOnly: true の設定箇所は 6 箇所であること（実測 ${occurrences.length}）`)
})

test('rawPerWorktreeByteReserve を更新できない 2 経路は implement 限定 latch にする（verify-close を止めない。Bugbot Medium「Reserve update failures stop verify-close」）', () => {
  const fnStart = source.indexOf('async function remeasureResidualBytesNow()')
  const fnEnd = source.indexOf('async function remeasureFreeDiskNow()', fnStart)
  assert.ok(fnStart >= 0 && fnEnd > fnStart)
  const fnBody = source.slice(fnStart, fnEnd)

  // (1) 未解決の未検証 implement パスが残る経路
  const unresolvedStart = fnBody.indexOf('if (resolution.unresolvedIssues.length > 0) {')
  assert.ok(unresolvedStart >= 0, '未解決 implement パス分岐を特定できること')
  const unresolvedBranch = fnBody.slice(unresolvedStart, fnBody.indexOf('return lastByteRemeasureOutcome', unresolvedStart))
  assert.match(unresolvedBranch, /implementOnly: true/)
  assert.match(
    unresolvedBranch,
    /lastByteRemeasureOutcome = \{ failed: false, exceeded: exceededAtActualMeasurement, reserveStale: true \}/,
  )

  // (2) implement 限定 du の失敗経路
  const measuredNullStart = fnBody.indexOf('if (implementMeasured === null) {')
  assert.ok(measuredNullStart >= 0, 'implement 限定測定の失敗分岐を特定できること')
  const measuredNullBranch = fnBody.slice(measuredNullStart, fnBody.indexOf('return lastByteRemeasureOutcome', measuredNullStart))
  assert.match(measuredNullBranch, /implementOnly: true/)
  assert.match(
    measuredNullBranch,
    /lastByteRemeasureOutcome = \{ failed: false, exceeded: exceededAtActualMeasurement, reserveStale: true \}/,
  )

  // 全件測定（kib === null）の latch は全 kind 停止のまま（バイト軸そのものが未観測のため）。
  const kibNullStart = fnBody.indexOf('if (kib === null) {')
  const kibNullBranch = fnBody.slice(kibNullStart, fnBody.indexOf('return lastByteRemeasureOutcome', kibNullStart))
  assert.doesNotMatch(kibNullBranch, /implementOnly/)
})

test('remeasureResidualBytesNow: 予約更新失敗の 2 経路より前に容量超過判定・全 kind latch を確定する（cap latch 省略の是正・Issue #475）', () => {
  const fnStart = source.indexOf('async function remeasureResidualBytesNow()')
  const fnEnd = source.indexOf('async function remeasureFreeDiskNow()', fnStart)
  assert.ok(fnStart >= 0 && fnEnd > fnStart)
  const fnBody = source.slice(fnStart, fnEnd)

  const capLatchDefIndex = fnBody.indexOf('const exceededAtActualMeasurement = actualBytes > maxResidualWorktreeBytes')
  const unresolvedStart = fnBody.indexOf('if (resolution.unresolvedIssues.length > 0) {')
  const measuredNullStart = fnBody.indexOf('if (implementMeasured === null) {')
  assert.ok(capLatchDefIndex >= 0, '全 kind cap latch の判定定義を特定できること')
  assert.ok(unresolvedStart >= 0 && measuredNullStart >= 0, '予約更新失敗の 2 経路を特定できること')
  assert.ok(
    capLatchDefIndex < unresolvedStart,
    '容量超過判定は未解決 implement パス分岐より前に確定していること',
  )
  assert.ok(
    capLatchDefIndex < measuredNullStart,
    '容量超過判定は implement 限定 du 失敗分岐より前に確定していること',
  )
})

test('未検証 implement の帰属解決は解決直前に物理一覧を取り直す（入口のスナップショットを使い回さない。Bugbot Medium「Stale scan latches unverified implements」）', () => {
  const fnStart = source.indexOf('async function remeasureResidualBytesNow()')
  const fnEnd = source.indexOf('async function remeasureFreeDiskNow()', fnStart)
  const fnBody = source.slice(fnStart, fnEnd)
  const blockStart = fnBody.indexOf('if (unverifiedImplementIssues.length > 0) {')
  assert.ok(blockStart >= 0, '未検証 implement の解決ブロックを特定できること')
  const blockEnd = fnBody.indexOf('const implementPaths = [...implementPathSet]', blockStart)
  const block = fnBody.slice(blockStart, blockEnd)
  // 解決直前の再スキャン結果を渡すこと（入口の physicalEntries を渡さない）。独立レコードカウント
  // （countWorktreeRecords）も同一タイミングで取得し、一覧との照合（fail-closed）に使う
  // （Issue #475 4 巡目 Bugbot Medium）。
  assert.match(
    block,
    /const \[freshEntries, freshIndependentCount\] = await Promise\.all\(\[scanOrphanWorktrees\(\), countWorktreeRecords\(\)\]\)/,
  )
  assert.match(block, /physicalEntries: freshEntries,/)
  assert.match(block, /independentCount: freshIndependentCount,/)
  // 入口のスナップショットを解決へ流用する形（変数名の省略記法）が復活していないこと。
  assert.doesNotMatch(source, /let physicalEntries = null/)
  // 解決要否の判定は削除済みフィルタ前の全件を渡す（B-2）。
  assert.match(fnBody, /listUnverifiedImplementIssues\(allImplementEntries\)/)
  // 測定対象へは削除確認済みを含めない。
  assert.match(fnBody, /!isUnverifiedPath\(v\) && !confirmedRemovedPaths\.has\(v\)/)
})

test('latch の設定は必ず latchNewStartSuppressed 経由で行う（直書き代入・生ガードが残っていない）', () => {
  // 直書き代入が 1 箇所でも残ると、そこだけ昇格規則を通らず「弱い latch が強い latch を
  // ブロックする」バグ（Bugbot Medium）が再発する。宣言（let newStartSuppressed = null）以外の
  // 代入と、`if (!newStartSuppressed)` ガードの直書きが無いことを固定する。
  // 例外は宣言（let ... = null）と latchNewStartSuppressed 内の唯一の代入（outcome.latch）のみ。
  const assignments = source.match(/(?<!let )newStartSuppressed = (?!null|outcome\.latch)/g) ?? []
  assert.deepEqual(assignments, [], '直書きの newStartSuppressed 代入が残っている')
  assert.doesNotMatch(source, /if \(!newStartSuppressed\)/)
  assert.doesNotMatch(source, /&& !newStartSuppressed\)/)
})

test('ラン開始時ゲート: df 単独失敗は implementOnly latch・du 側失敗は全 kind latch・平均は computeAveragePerWorktreeBytes 経由', () => {
  const gateStart = source.indexOf("const startFailure = classifyStartMeasurementFailure({ mainKib, kib, freeDiskKib })")
  assert.ok(gateStart >= 0, 'ラン開始時ゲートの失敗分類を特定できること')
  const gateEnd = source.indexOf('const bytes = residualBytesAtStart', gateStart)
  assert.ok(gateEnd > gateStart, 'ゲート本体の終端（容量上限比較の開始）を特定できること')
  const gateBody = source.slice(gateStart, gateEnd)

  // du 側失敗（'bytes'）は従来どおり全 kind 停止（implementOnly を付けない）。
  const bytesBranchStart = gateBody.indexOf("if (startFailure === 'bytes') {")
  const freeDiskBranchStart = gateBody.indexOf("if (startFailure === 'free-disk') {")
  assert.ok(bytesBranchStart >= 0 && freeDiskBranchStart > bytesBranchStart)
  const bytesBranch = gateBody.slice(bytesBranchStart, gateBody.indexOf('residualBytesObserved = true', bytesBranchStart))
  assert.match(bytesBranch, /!latchNewStartSuppressed\(\{/)
  assert.doesNotMatch(bytesBranch, /implementOnly/)

  // df 単独失敗は implement 限定 latch。freeDiskBytesAtStart を確定させない（未実測値との比較を避ける）。
  const freeDiskBranch = gateBody.slice(freeDiskBranchStart, gateBody.indexOf('} else {', freeDiskBranchStart))
  assert.match(freeDiskBranch, /latchNewStartSuppressed\(\{/)
  assert.match(freeDiskBranch, /implementOnly: true/)
  assert.doesNotMatch(freeDiskBranch, /freeDiskBytesAtStart = /)

  // バイト軸の観測確定（residualBytesObserved）は df 失敗でも巻き戻さない。
  assert.ok(gateBody.indexOf('residualBytesObserved = true') < freeDiskBranchStart)

  // 開始時の 1 worktree あたり平均も欠落パスを分母から差し引く（Bugbot Low 指摘）。
  assert.match(gateBody, /computeAveragePerWorktreeBytes\(\{\n\s*kib,\n\s*sentCount: verifiedResidualPaths\.length,\n\s*missing: residualMeasured\.missing,/)
})

test('latchNewStartSuppressed は escalateNewStartSuppressed の判定に従い、代入とログのみを担う', () => {
  const fnStart = source.indexOf('function latchNewStartSuppressed(next)')
  assert.ok(fnStart >= 0, 'latchNewStartSuppressed の定義を特定できること')
  const fnBody = source.slice(fnStart, source.indexOf('\n}', fnStart))
  assert.match(fnBody, /escalateNewStartSuppressed\(newStartSuppressed, next\)/)
  assert.match(fnBody, /if \(!outcome\.changed\) return false/)
  assert.match(fnBody, /outcome\.escalated/)
})
