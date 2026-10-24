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
import { trackTmp } from './lib/tmp-track.mjs'
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
const sliceDir = trackTmp(mkdtempSync(join(tmpdir(), 'implement-issue-tree-free-disk-defs-')))
const slicePath = join(sliceDir, 'implement-issue-tree-free-disk-defs.mjs')
// 実装スクリプトは `export const meta` 以外の top-level export を持てない（Workflow 起動制約）
// ため、定義部は非 export のまま置き、切り出したスライス側で export 文を付与する。
const SLICE_EXPORTS = ['shouldSuppressForFreeDisk', 'projectFreeDiskReserveBytes', 'computeUnmeasuredLedgerIncrement', 'DISK_FREE_SCHEMA', 'computeFreeDiskReserveUnits', 'splitNewStartReserve', 'splitResumeReserve', 'effectiveCheckoutByteReserve', 'computeCheckoutByteReserve', 'EPHEMERAL_RESERVE_PER_NEW_START', 'EPHEMERAL_RESERVE_PER_MONITORING_RESUME']
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
  assert.deepEqual(DISK_FREE_SCHEMA.required, ['freeKib', 'err', 'inputSha256'])
  assert.equal(DISK_FREE_SCHEMA.properties.freeKib.type, 'integer')
  assert.equal(DISK_FREE_SCHEMA.properties.freeKib.minimum, 0)
  assert.equal(DISK_FREE_SCHEMA.properties.err.type, 'integer')
  assert.equal(DISK_FREE_SCHEMA.properties.err.minimum, 0)
})

// --- df 実測後の台帳増分反映（Issue #475 codex P1）---
// df の実測値（freeDiskBytesAtStart）とその後に並行タスクが記録した worktree 消費は独立に
// 増えるため、観測時点の台帳長（measuredAtLedgerCount）を基準に未反映の増分を予約へ加算しないと、
// df 実測後〜判定までの間に生じた消費がキャッシュ済み空き容量にも予約にも反映されない。

test('projectFreeDiskReserveBytes: df 実測後の台帳増分を未測定予約として加算する（Issue #475 codex P1: 実測〜判定間に並行タスクが worktree を記録すると消費が反映されない）', () => {
  const rawPerWorktreeByteReserve = 8 * 1024 * 1024 * 1024
  const result = projectFreeDiskReserveBytes({
    reservedUnits: 0,
    extraReserveUnits: 0,
    rawPerWorktreeByteReserve,
    ledgerLength: 5,
    measuredAtLedgerCount: 2,
  })
  assert.equal(result, 3 * rawPerWorktreeByteReserve)
})

test('projectFreeDiskReserveBytes: 台帳が df 実測後に減っていても負の予約にしない（Math.max で 0 下限）', () => {
  const rawPerWorktreeByteReserve = 8 * 1024 * 1024 * 1024
  const result = projectFreeDiskReserveBytes({
    reservedUnits: 1,
    extraReserveUnits: 0,
    rawPerWorktreeByteReserve,
    ledgerLength: 2,
    measuredAtLedgerCount: 5,
  })
  assert.equal(result, 1 * rawPerWorktreeByteReserve)
})

test('projectFreeDiskReserveBytes: ledgerLength / measuredAtLedgerCount を省略した既存呼び出しは増分 0 として扱う（後方互換）', () => {
  const rawPerWorktreeByteReserve = 8 * 1024 * 1024 * 1024
  const result = projectFreeDiskReserveBytes({ reservedUnits: 3, extraReserveUnits: 6, rawPerWorktreeByteReserve })
  assert.equal(result, 9 * rawPerWorktreeByteReserve)
})

test('remeasureFreeDiskNow は df 実行前（await の前）に確定した台帳長を freeDiskMeasuredAtLedgerCount へ採用する（Issue #475/#477 codex P1）', () => {
  const fnStart = source.indexOf('async function remeasureFreeDiskNow()')
  const fnEnd = source.indexOf('\n// targets（failedSet 入りした前提の番号集合）の外部完了を', fnStart)
  assert.ok(fnStart >= 0 && fnEnd > fnStart, 'remeasureFreeDiskNow 本体を特定できること')
  const fnBody = source.slice(fnStart, fnEnd)
  // measureFreeDiskKib は await を挟むため、await 後に ephemeralWorktrees.length を読むと
  // df 実行中に並行タスクが積んだ増分まで「測定済み」扱いになってしまう（未測定消費を
  // 予約へ反映する契約に反する）。await より前の位置で台帳長を変数へ保持し、成功時に
  // その変数を採用していることを固定する。
  const measureCallIndex = fnBody.indexOf('await measureFreeDiskKib(')
  assert.ok(measureCallIndex >= 0, 'measureFreeDiskKib の呼び出しを特定できること')
  const beforeMeasure = fnBody.slice(0, measureCallIndex)
  const afterMeasure = fnBody.slice(measureCallIndex)
  const captureMatch = beforeMeasure.match(/const (\w+) = ephemeralWorktrees\.length/)
  assert.ok(captureMatch, 'await 前に ephemeralWorktrees.length を変数へ捕捉していること')
  const capturedVar = captureMatch[1]
  assert.match(afterMeasure, new RegExp(`freeDiskMeasuredAtLedgerCount = ${capturedVar}\\b`))
  // await 後に ephemeralWorktrees.length を直接代入していない（バグの再発防止）。
  assert.doesNotMatch(afterMeasure, /freeDiskMeasuredAtLedgerCount = ephemeralWorktrees\.length/)
})

test('projectFreeDiskReserveBytes の呼び出しのうち、実測時点の判定を行う 3 箇所すべてが ledgerLength / measuredAtLedgerCount を渡す（df 実測後の台帳増分未反映の再発防止）', () => {
  // 関数定義自体（`function projectFreeDiskReserveBytes({ ... })`）も同じ字面にマッチするため、
  // `= projectFreeDiskReserveBytes({` の呼び出し形のみを対象にする。Issue #477 対応で追加した
  // requiredWithoutGap（一時的な計測ギャップの有無を切り分けるための呼び出し。意図的に
  // ledgerLength へ ephemeralWorktrees.length ではなく freeDiskMeasuredAtLedgerCount を渡す）は
  // 別テストで検証するため、ここでは ledgerLength: ephemeralWorktrees.length を渡す「実測時点の
  // 判定」呼び出しのみを対象にする。
  const occurrences = source.match(/\w+ = projectFreeDiskReserveBytes\(\{[^}]*\}\)/gs) ?? []
  const liveCalls = occurrences.filter((call) => /ledgerLength: ephemeralWorktrees\.length/.test(call))
  assert.equal(liveCalls.length, 3, `実測時点の判定を行う呼び出しは 3 箇所であること（実測 ${liveCalls.length}）`)
  for (const call of liveCalls) {
    assert.match(call, /measuredAtLedgerCount: freeDiskMeasuredAtLedgerCount/, call)
  }
})

// --- 一時的な計測ギャップのみを理由とした恒久 latch の防止（Issue #477 Bugbot Medium 指摘）---
// unmeasuredLedgerIncrement（df 実測〜判定までの間に積み増された未測定分）は次の
// remeasureFreeDiskNow で解消する一時的な計測ギャップであり、これだけを理由に
// newStartSuppressed を latch（恒久停止）すると、一時的なキャッシュミスで以降の新規着手が
// 全て凍結される。この増分を除いても抑止条件を満たす場合のみ latch する挙動を、
// 新規着手ブロックの実装から直接検証する。

test('computeUnmeasuredLedgerIncrement: ledgerLength が measuredAtLedgerCount を上回る分のみを返す', () => {
  assert.equal(mod.computeUnmeasuredLedgerIncrement({ ledgerLength: 5, measuredAtLedgerCount: 2 }), 3)
})

test('computeUnmeasuredLedgerIncrement: 台帳が df 実測後に減っていても負値にしない（Math.max で 0 下限）', () => {
  assert.equal(mod.computeUnmeasuredLedgerIncrement({ ledgerLength: 2, measuredAtLedgerCount: 5 }), 0)
})

// 新規着手ブロック（dispatch ループ内）と開始時ゲート（ラン開始時 1 回のみ・実測直後に
// freeDiskMeasuredAtLedgerCount を確定するため unmeasuredLedgerIncrement は構造的に常に 0）を
// 区別するため、新規着手ブロックにのみ現れる一意なコメント文字列をアンカーにする。
const NEW_START_BLOCK_ANCHOR = '// reservedUnits をそのまま再利用し、投入済み予約（実行中タスクの未消費予約＋着手候補'

test('新規着手ブロック: unmeasuredLedgerIncrement のみが原因で抑止条件を満たす場合は latch せず defer する（reservedUnits > 0 と同じ continue 扱い）', () => {
  const anchorIdx = source.indexOf(NEW_START_BLOCK_ANCHOR)
  assert.ok(anchorIdx >= 0, '新規着手ブロックのアンカーコメントを特定できること')
  const fnStart = source.indexOf('if (shouldSuppressForFreeDisk(freeDiskBytesAtStart, requiredFreeDiskBytes)) {', anchorIdx)
  assert.ok(fnStart >= 0, '新規着手ブロックの実ディスク空き容量ゲート分岐を特定できること')
  const fnEnd = source.indexOf('\n          }\n', fnStart)
  const block = source.slice(fnStart, fnEnd)
  // 増分を除いた必要量（requiredWithoutGap）で再判定し、それでも抑止条件を満たす場合のみ
  // latchNewStartSuppressed へ到達する（満たさなければ continue で次周回へ defer する）こと。
  assert.match(block, /const requiredWithoutGap = projectFreeDiskReserveBytes\(\{/)
  assert.match(block, /ledgerLength: freeDiskMeasuredAtLedgerCount,\s*\n\s*measuredAtLedgerCount: freeDiskMeasuredAtLedgerCount,/)
  assert.match(block, /if \(!shouldSuppressForFreeDisk\(freeDiskBytesAtStart, requiredWithoutGap\)\) continue/)
  // latch 到達より前に defer 分岐がある（latch が「増分を除いても抑止」の場合のみに絞られている）こと。
  const deferIdx = block.indexOf('if (!shouldSuppressForFreeDisk(freeDiskBytesAtStart, requiredWithoutGap)) continue')
  const latchIdx = block.indexOf('latchNewStartSuppressed({')
  assert.ok(deferIdx >= 0 && latchIdx > deferIdx, 'defer 分岐が latch より前に評価されること')
})

test('新規着手ブロック: latch reason の予約件数表示に unmeasuredLedgerIncrement を含める（印字件数と MiB 総額の不一致防止）', () => {
  const anchorIdx = source.indexOf(NEW_START_BLOCK_ANCHOR)
  const fnStart = source.indexOf('if (shouldSuppressForFreeDisk(freeDiskBytesAtStart, requiredFreeDiskBytes)) {', anchorIdx)
  const fnEnd = source.indexOf('\n          }\n', fnStart)
  const block = source.slice(fnStart, fnEnd)
  assert.match(block, /ビルド \$\{fdArgs\.reservedUnits \+ fdArgs\.extraReserveUnits \+ unmeasuredLedgerIncrement\} 件/)
})


// Issue #691: 予約をビルドあり / チェックアウトのみに分ける純関数の表テスト
const GiB = 1024 * 1024 * 1024
const { computeFreeDiskReserveUnits, splitNewStartReserve, splitResumeReserve, effectiveCheckoutByteReserve, computeCheckoutByteReserve, EPHEMERAL_RESERVE_PER_NEW_START: PER_NEW, EPHEMERAL_RESERVE_PER_MONITORING_RESUME: PER_RESUME } = mod

test('splitNewStartReserve: pr-create と fix-terminal を含めてビルドあり側に数え、合計は perNewStart を超えない', () => {
  const sp = splitNewStartReserve(PER_NEW)
  assert.equal(sp.build, 2 + 1) // implement + pr-create + fix-terminal
  assert.equal(sp.build + sp.checkout, PER_NEW)
  assert.equal(splitNewStartReserve(1).checkout, 0)
})

test('splitResumeReserve: monitoring 再開は fix-terminal をビルドあり、base-merge をチェックアウトで数える（合計は perResume）', () => {
  const rs = splitResumeReserve(PER_RESUME)
  assert.equal(rs.build, 1)
  assert.equal(rs.build + rs.checkout, PER_RESUME)
  assert.deepEqual(splitResumeReserve(0), { build: 0, checkout: 0 })
})

test('effectiveCheckoutByteReserve: 0・非整数・負・NaN は raw へ戻り、raw 超過は raw で頭打ち', () => {
  const raw = 8 * GiB
  for (const bad of [0, -1, 1.5, NaN, undefined, null, '3']) assert.equal(effectiveCheckoutByteReserve(bad, raw), raw)
  assert.equal(effectiveCheckoutByteReserve(raw * 2, raw), raw)
  assert.equal(effectiveCheckoutByteReserve(GiB, raw), GiB)
})

test('projectFreeDiskReserveBytes: checkoutByteReserve が 0・非整数・raw 超過なら raw 単価（分割前と同じ式）に収束する', () => {
  const raw = 8 * GiB
  const base = { reservedUnits: 1, extraReserveUnits: 1, rawPerWorktreeByteReserve: raw, checkoutUnits: 3 }
  for (const ck of [0, 1.5, raw * 3, undefined]) {
    assert.equal(projectFreeDiskReserveBytes({ ...base, checkoutByteReserve: ck }), 5 * raw)
  }
  assert.equal(projectFreeDiskReserveBytes({ ...base, checkoutByteReserve: GiB }), 2 * raw + 3 * GiB)
})

test('projectFreeDiskReserveBytes: 未測定台帳増分はビルドあり単価（raw）で数える', () => {
  const raw = 8 * GiB
  const r = projectFreeDiskReserveBytes({ reservedUnits: 0, extraReserveUnits: 0, rawPerWorktreeByteReserve: raw, checkoutUnits: 0, checkoutByteReserve: GiB, ledgerLength: 3, measuredAtLedgerCount: 1 })
  assert.equal(r, 2 * raw)
})

test('computeFreeDiskReserveUnits: 台帳の記録済み分を kind ごとに差し引く（implement / pr-create / fix-terminal / その他）', () => {
  const args = (ledger) => ({ ledger, newStartIssues: [1], resumeIssues: [], perNewStart: PER_NEW, perResume: PER_RESUME })
  const none = computeFreeDiskReserveUnits(args([]))
  const sp = splitNewStartReserve(PER_NEW)
  assert.deepEqual(none, sp)
  assert.equal(computeFreeDiskReserveUnits(args([{ issue: 1, kind: 'implement' }])).build, sp.build - 1)
  assert.deepEqual(computeFreeDiskReserveUnits(args([{ issue: 1, kind: 'review' }])), { build: sp.build, checkout: sp.checkout - 1 })
  // pr-create は opt-in の有無によらずビルドあり側（コンフリクト解消でビルドを実行し得る）
  assert.equal(computeFreeDiskReserveUnits(args([{ issue: 1, kind: 'pr-create' }])).build, sp.build - 1)
  assert.equal(computeFreeDiskReserveUnits(args([{ issue: 1, kind: 'fix-terminal' }])).build, sp.build - 1)
  assert.deepEqual(computeFreeDiskReserveUnits(args([{ issue: 1, kind: 'retained' }, { issue: 2, kind: 'implement' }])), sp)
})

test('computeFreeDiskReserveUnits: 記録が枠を超えても負にならず、monitoring 再開は fix-terminal をビルド・base-merge をチェックアウトで予約する', () => {
  const ledger = Array.from({ length: 50 }, () => ({ issue: 1, kind: 'implement' }))
  const r = computeFreeDiskReserveUnits({ ledger, newStartIssues: [1], resumeIssues: [7], perNewStart: PER_NEW, perResume: PER_RESUME })
  const rs = splitResumeReserve(PER_RESUME)
  assert.equal(r.build, rs.build) // 新規着手側は 0、再開側の fix-terminal 分だけ
  assert.ok(r.checkout >= rs.checkout)
  // 再開 7 の記録で差し引かれる（fix-terminal はビルド側、base-merge はチェックアウト側）
  const r2 = computeFreeDiskReserveUnits({ ledger: [{ issue: 7, kind: 'fix-terminal' }, { issue: 7, kind: 'base-merge' }], newStartIssues: [], resumeIssues: [7], perNewStart: PER_NEW, perResume: PER_RESUME })
  assert.deepEqual(r2, { build: rs.build - 1, checkout: rs.checkout - 1 })
})

test('Issue #691 レビュー指摘: 再開候補・実行中の再開イシューともビルド単価の fix-terminal 枠を含み、20GiB の fix が空き 1GiB で始まらない', () => {
  const raw = 20 * GiB
  const ck = GiB
  const u = computeFreeDiskReserveUnits({ ledger: [], newStartIssues: [], resumeIssues: [7], perNewStart: PER_NEW, perResume: PER_RESUME })
  const rs = splitResumeReserve(PER_RESUME)
  const need = projectFreeDiskReserveBytes({ reservedUnits: u.build, extraReserveUnits: rs.build, checkoutUnits: u.checkout + rs.checkout, checkoutByteReserve: ck, rawPerWorktreeByteReserve: raw })
  assert.ok(need >= 2 * raw)
  assert.equal(shouldSuppressForFreeDisk(GiB, need), true)
})

test('Issue #691 再現: 残置 0 件でチェックアウト単価が小さいとき、小さい空き容量でも着手できる（raw 単価では止まる）', () => {
  const raw = 20 * GiB // implement のビルド成果物込み実測
  const ck = GiB // チェックアウトだけの実測
  const u = computeFreeDiskReserveUnits({ ledger: [], newStartIssues: [], resumeIssues: [], perNewStart: PER_NEW, perResume: PER_RESUME })
  const sp = splitNewStartReserve(PER_NEW)
  const split = projectFreeDiskReserveBytes({ reservedUnits: u.build, extraReserveUnits: sp.build, checkoutUnits: u.checkout + sp.checkout, checkoutByteReserve: ck, rawPerWorktreeByteReserve: raw })
  const legacy = projectFreeDiskReserveBytes({ reservedUnits: 0, extraReserveUnits: PER_NEW, rawPerWorktreeByteReserve: raw })
  const free = 100 * GiB
  assert.equal(shouldSuppressForFreeDisk(free, split), false)
  assert.ok(legacy > free, '分割前の式では必要量が空き容量を超えて止まっていた')
  assert.ok(split < legacy)
})

test('Issue #691 レビュー指摘: free-disk の defer 判定は種別ごとの残り（fuNew.build + fuNew.checkout）を使い、合算 reservedUnits を使わない', () => {
  const anchorIdx = source.indexOf(NEW_START_BLOCK_ANCHOR)
  const fnStart = source.indexOf('if (shouldSuppressForFreeDisk(freeDiskBytesAtStart, requiredFreeDiskBytes)) {', anchorIdx)
  const fnEnd = source.indexOf('\n          }\n', fnStart)
  const block = source.slice(fnStart, fnEnd)
  assert.match(block, /if \(freeDiskReservedUnits > 0\) continue/)
  assert.doesNotMatch(block, /if \(reservedUnits > 0\) continue/)
  assert.match(source, /const freeDiskReservedUnits = fuNew\.build \+ fuNew\.checkout/)
})

test('computeCheckoutByteReserve: 小さな残置平均でも現在のメイン worktree を下限にし、raw で頭打ち', () => {
  const raw = 20 * GiB
  assert.equal(computeCheckoutByteReserve({ mainBytes: 10 * GiB, avgResidualBytes: GiB, rawPerWorktreeByteReserve: raw }), 10 * GiB)
  assert.equal(computeCheckoutByteReserve({ mainBytes: GiB, avgResidualBytes: 4 * GiB, rawPerWorktreeByteReserve: raw }), 4 * GiB)
  assert.equal(computeCheckoutByteReserve({ mainBytes: 10 * GiB, avgResidualBytes: 0, rawPerWorktreeByteReserve: raw }), 10 * GiB)
  assert.equal(computeCheckoutByteReserve({ mainBytes: 30 * GiB, avgResidualBytes: GiB, rawPerWorktreeByteReserve: raw }), raw)
})

test('Issue #691 レビュー指摘: ckMiB は巻き上げられる関数宣言で、起動時の free-disk latch が初期化前に呼んでも TDZ の ReferenceError にならない', () => {
  assert.match(source, /^function ckMiB\(\)/m, 'ckMiB は function 宣言であること')
  assert.doesNotMatch(source, /^\s*(const|let|var)\s+ckMiB\b/m, 'ckMiB を const / let / var で宣言しない（TDZ 再発防止）')
  const callIdx = source.indexOf('${ckMiB()}')
  const declIdx = source.search(/^function ckMiB\(\)/m)
  assert.ok(callIdx > 0 && callIdx < declIdx, '起動時判定の呼び出しが宣言より前にある前提（巻き上げに依存）')
})
