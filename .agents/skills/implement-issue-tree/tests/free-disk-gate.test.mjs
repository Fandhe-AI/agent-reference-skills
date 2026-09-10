// 実ディスク空き容量ゲートの回帰テスト（Issue #467 P0/High 再指摘対応）。
//
// 背景: Issue #467 で maxResidualWorktreeBytes の既定値を 2 GiB → 50 GiB へ引き上げた際、
// codex-review が P0 指摘「容量上限の緩和は導入先の明示指定か空き容量確認を条件にする」を
// 出した（残置 worktree の合計サイズが上限未満でも、実ディスクの空き容量自体はそれより
// ずっと小さいことがあり得るため、上限緩和後の 50 GiB に達するよりずっと早くディスクが
// 枯渇し得る）。PR #468 でこのゲートに対し追加の P0/High 指摘が入った:
//   - P0: ラン開始時 1 回の測定だけでは、着手が進むほど空き容量が減っていく事実を反映できない
//   - P0: 投入済み予約（実行中タスクの未消費予約＋候補自身の予約）を合算していない
//   - High: 比較に使う予約量が clampPerWorktreeByteReserve 通過後の値で、実際の 1 worktree
//     サイズより小さくなり得る
// 本テストは、それらへの対応として追加した純粋関数 projectFreeDiskReserveBytes（投入済み予約を
// 反映した必要バイト数の算出。raw 値を使い clamp 後の値は使わない）・shouldSuppressForFreeDisk
// （実測と必要バイト数の比較）の境界値と、DISK_FREE_SCHEMA が fail-closed（部分値・エラー時に
// freeKib を 0 で補わない）契約を保つことを固定する。
//
// 読み込み方式は residual-cap-default.test.mjs と同一: 実装スクリプトは Workflow ハーネス
// 専用文法（トップレベル return・注入グローバル args / agent / log / phase）を含み module
// として丸ごと import できないため、__IMPLEMENT_ISSUE_TREE_DRIVER_START__ マーカーより上
// （定義部のみ）を一時ファイルへ切り出して import する。
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
const sliceDir = mkdtempSync(join(tmpdir(), 'implement-issue-tree-free-disk-defs-'))
const slicePath = join(sliceDir, 'implement-issue-tree-free-disk-defs.mjs')
// 実装スクリプトは `export const meta` 以外の top-level export を持てない（Workflow 起動制約）
// ため、定義部は非 export のまま置き、切り出したスライス側で export 文を付与する。
const SLICE_EXPORTS = ['shouldSuppressForFreeDisk', 'projectFreeDiskReserveBytes', 'DISK_FREE_SCHEMA']
writeFileSync(slicePath, `${definitionPart}\nexport { ${SLICE_EXPORTS.join(', ')} }\n`)

const mod = await import(pathToFileURL(slicePath).href)
const { shouldSuppressForFreeDisk, projectFreeDiskReserveBytes, DISK_FREE_SCHEMA } = mod

test('shouldSuppressForFreeDisk: 実空き容量が必要バイト数を下回れば抑止する（境界: 未満で true）', () => {
  assert.equal(shouldSuppressForFreeDisk(4 * 1024 * 1024 * 1024, 8 * 1024 * 1024 * 1024), true)
})

test('shouldSuppressForFreeDisk: 実空き容量が必要バイト数と厳密に等しい場合は抑止しない（許容側の境界。既存の残置バイト軸〔bytes > cap〕と同じ「超過のみ発火」設計に合わせる）', () => {
  assert.equal(shouldSuppressForFreeDisk(8 * 1024 * 1024 * 1024, 8 * 1024 * 1024 * 1024), false)
})

test('shouldSuppressForFreeDisk: 実空き容量が必要バイト数を上回れば抑止しない', () => {
  assert.equal(shouldSuppressForFreeDisk(50 * 1024 * 1024 * 1024, 8 * 1024 * 1024 * 1024), false)
})

test('shouldSuppressForFreeDisk: Issue #467 P0 codex-review が指摘した具体例（残置 8 GiB・実空き 4 GiB・上限 50 GiB）で抑止が発火する', () => {
  // 残置サイズだけを見るバイト軸ゲートは 50 GiB に達するまで新規着手を止めないが、
  // 空き容量ゲートは実空き 4 GiB < 新規 1 件分の予約（8 GiB と仮定）で独立に発火する。
  const requiredFreeDiskBytes = 8 * 1024 * 1024 * 1024
  const freeDiskBytes = 4 * 1024 * 1024 * 1024
  assert.equal(shouldSuppressForFreeDisk(freeDiskBytes, requiredFreeDiskBytes), true)
})

test('projectFreeDiskReserveBytes: reservedUnits と extraReserveUnits の合計に raw 予約を掛ける（unbaselinedLedgerCount は加算しない — df は既に消費済みのディスクを直接見るため）', () => {
  const rawPerWorktreeByteReserve = 8 * 1024 * 1024 * 1024
  const result = projectFreeDiskReserveBytes({ reservedUnits: 2, extraReserveUnits: 6, rawPerWorktreeByteReserve })
  assert.equal(result, 8 * rawPerWorktreeByteReserve)
})

test('projectFreeDiskReserveBytes: PR #468 P0 指摘の具体例（実行中タスクの未消費予約 3 件＋候補自身の最大増分 6 件を合算）', () => {
  // clampPerWorktreeByteReserve 通過後の値ではなく raw 値（実測ベースの生の 1 worktree サイズ
  // 見積り）をそのまま掛けることを固定する（Bugbot High 指摘: クランプ後の値は容量上限に対する
  // 予算配分でしかなく、実際の 1 worktree サイズより小さくなり得るため物理的な枯渇判定には使えない）。
  const rawPerWorktreeByteReserve = 8 * 1024 * 1024 * 1024 // 実測ベースの 1 worktree あたり ~8 GiB
  const reservedUnits = 3 // 実行中タスクの未消費予約
  const extraReserveUnits = 6 // 着手候補自身の最大増分（EPHEMERAL_RESERVE_PER_NEW_START 相当）
  const required = projectFreeDiskReserveBytes({ reservedUnits, extraReserveUnits, rawPerWorktreeByteReserve })
  assert.equal(required, 9 * rawPerWorktreeByteReserve) // (3 + 6) * 8 GiB = 72 GiB
  // 単一 worktree 分の予約とだけ比較していた旧実装では見逃していたはずの危険側を、集約後の
  // 必要量との比較なら実測空き容量が下回った時点で正しく検知できることを確認する。
  assert.equal(shouldSuppressForFreeDisk(50 * 1024 * 1024 * 1024, required), true)
})

test('DISK_FREE_SCHEMA: freeKib・err の両方を必須とする（部分値の受理を防ぐ契約の固定）', () => {
  assert.deepEqual(DISK_FREE_SCHEMA.required, ['freeKib', 'err'])
  assert.equal(DISK_FREE_SCHEMA.properties.freeKib.type, 'integer')
  assert.equal(DISK_FREE_SCHEMA.properties.freeKib.minimum, 0)
  assert.equal(DISK_FREE_SCHEMA.properties.err.type, 'integer')
  assert.equal(DISK_FREE_SCHEMA.properties.err.minimum, 0)
})
