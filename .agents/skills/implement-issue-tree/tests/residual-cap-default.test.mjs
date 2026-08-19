// 残置 worktree 上限ゲートの既定値回帰テスト（Issue #348）。
// 旧既定 20 では 1 イシューあたり最大 6 件（EPHEMERAL_RESERVE_PER_NEW_START）の積み増しにより
// 1 ラン 3 件で新規着手が頭打ちになっていた。本テストは既定値そのものと、それが導く
// 「10 イシュー以上/ラン」というキャパシティ算術、および fail-closed 経路（観測失敗時の
// 抑止・誤記拒否）が退行していないことを固定する。
//
// 読み込み方式は g0-gates.test.mjs と同一: 実装スクリプトは Workflow ハーネス専用文法
// （トップレベル return・注入グローバル args / agent / log / phase）を含み module として
// 丸ごと import できないため、__IMPLEMENT_ISSUE_TREE_DRIVER_START__ マーカーより上
// （定義部のみ）を一時ファイルへ切り出して import する。
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
const DRIVER_MARKER = '__IMPLEMENT_ISSUE_TREE_DRIVER_START__'

const source = readFileSync(SCRIPT_PATH, 'utf8')
const markerIndex = source.indexOf(DRIVER_MARKER)
if (markerIndex < 0) {
  throw new Error(`テスト境界マーカー ${DRIVER_MARKER} が実装スクリプトに存在しない（削除・改名は回帰テストを無効化する）`)
}
const definitionPart = source.slice(0, source.lastIndexOf('\n', markerIndex))
const sliceDir = mkdtempSync(join(tmpdir(), 'implement-issue-tree-residual-cap-defs-'))
const slicePath = join(sliceDir, 'implement-issue-tree-residual-cap-defs.mjs')
// 実装スクリプトは `export const meta` 以外の top-level export を持てない（Workflow 起動制約）
// ため、定義部は非 export のまま置き、切り出したスライス側で export 文を付与する。
const SLICE_EXPORTS = [
  'parseMaxResidualWorktrees',
  'DEFAULT_MAX_RESIDUAL_WORKTREES',
  'LEGACY_DEFAULT_MAX_RESIDUAL_WORKTREES',
  'parseMaxResidualWorktreeBytes',
  'DEFAULT_MAX_RESIDUAL_WORKTREE_BYTES',
  'EPHEMERAL_KIND_MAX',
  'EPHEMERAL_RESERVE_PER_NEW_START',
  'projectResidualBytes',
  'clampPerWorktreeByteReserve',
]
writeFileSync(slicePath, `${definitionPart}\nexport { ${SLICE_EXPORTS.join(', ')} }\n`)

const mod = await import(pathToFileURL(slicePath).href)
const {
  parseMaxResidualWorktrees,
  DEFAULT_MAX_RESIDUAL_WORKTREES,
  LEGACY_DEFAULT_MAX_RESIDUAL_WORKTREES,
  parseMaxResidualWorktreeBytes,
  DEFAULT_MAX_RESIDUAL_WORKTREE_BYTES,
  EPHEMERAL_KIND_MAX,
  EPHEMERAL_RESERVE_PER_NEW_START,
  projectResidualBytes,
  clampPerWorktreeByteReserve,
} = mod

test('既定値は 100（未指定・null のいずれも DEFAULT_MAX_RESIDUAL_WORKTREES を返す）', () => {
  assert.equal(DEFAULT_MAX_RESIDUAL_WORKTREES, 100)
  assert.equal(parseMaxResidualWorktrees(undefined), 100)
  assert.equal(parseMaxResidualWorktrees(null), 100)
})

test('0 は上限なしの明示オプトアウトとして通り、正の整数はそのまま返る', () => {
  assert.equal(parseMaxResidualWorktrees(0), 0)
  assert.equal(parseMaxResidualWorktrees(5), 5)
  assert.equal(parseMaxResidualWorktrees(250), 250)
})

test('負値・非整数・文字列・NaN は fail-closed で throw する（誤記拒否の維持）', () => {
  assert.throws(() => parseMaxResidualWorktrees(-1))
  assert.throws(() => parseMaxResidualWorktrees(1.5))
  assert.throws(() => parseMaxResidualWorktrees('20'))
  assert.throws(() => parseMaxResidualWorktrees(NaN))
})

// --- bytesAxisDisabled フォールバック（codex-review 指摘・PR #390 第 2 ラウンド）---
// 件数軸既定 100 の根拠は本リポジトリ 1 件のみの実測であり、リポジトリ非依存の絶対閾値である
// バイト軸が併用されている前提で許容される。利用者がバイト軸のみを明示オプトアウト
// （maxResidualWorktreeBytes: 0）し件数軸を未指定のままにした場合、この補強が働かないため
// 件数軸自体を安全側の旧既定値へ自動的に引き下げる。

test('LEGACY_DEFAULT_MAX_RESIDUAL_WORKTREES は 20（旧既定値のまま不変）', () => {
  assert.equal(LEGACY_DEFAULT_MAX_RESIDUAL_WORKTREES, 20)
})

test('bytesAxisDisabled が true のとき、未指定・null は旧既定 20 を返す（バイト軸オプトアウト時の安全側フォールバック）', () => {
  assert.equal(parseMaxResidualWorktrees(undefined, true), LEGACY_DEFAULT_MAX_RESIDUAL_WORKTREES)
  assert.equal(parseMaxResidualWorktrees(null, true), LEGACY_DEFAULT_MAX_RESIDUAL_WORKTREES)
})

test('bytesAxisDisabled が false・未指定のときは従来どおり既定 100 のまま（回帰なし）', () => {
  assert.equal(parseMaxResidualWorktrees(undefined, false), DEFAULT_MAX_RESIDUAL_WORKTREES)
  assert.equal(parseMaxResidualWorktrees(undefined), DEFAULT_MAX_RESIDUAL_WORKTREES)
})

test('bytesAxisDisabled が true でも利用者が明示指定した値は上書きしない', () => {
  assert.equal(parseMaxResidualWorktrees(5, true), 5)
  assert.equal(parseMaxResidualWorktrees(0, true), 0)
})

test('EPHEMERAL_RESERVE_PER_NEW_START は EPHEMERAL_KIND_MAX の合計から導出され 6 のまま不変', () => {
  const expected = Object.values(EPHEMERAL_KIND_MAX).reduce((a, b) => a + b, 0)
  assert.equal(EPHEMERAL_RESERVE_PER_NEW_START, expected)
  assert.equal(EPHEMERAL_RESERVE_PER_NEW_START, 6)
})

test('キャパシティ算術: 既定値・最悪積み増し 6 件/イシューでも 10 イシュー以上/ランに着手できる', () => {
  // 受け入れ条件（Issue #348）: 開始時残置 0 の前提で、既定設定のまま 10 件以上のツリーを
  // 1 ランで消化できること。この床の算術を回帰として固定する。
  const capacity = Math.floor(parseMaxResidualWorktrees(undefined) / EPHEMERAL_RESERVE_PER_NEW_START)
  assert.ok(capacity >= 10, `既定値からのキャパシティが 10 未満に退行した: ${capacity}`)
})

test('fail-closed 分岐（スキャン失敗時の新規着手抑止）がスクリプト全体に存在する', () => {
  // 上限引き上げが観測失敗時の抑止ロジックを消していないことのソース存在確認（軽量な退行検知）。
  // この分岐はスケジューラ（駆動部）側にあり DRIVER_MARKER より下のためスクリプト全文で確認する。
  // バイト軸（Issue #348 案 B）追加により条件は件数軸単独の判定から OR 判定
  // （residualGateActive）へ拡張されているため、その形へ合わせて確認する。
  assert.match(
    source,
    /if \(!scanFailureDetail && residualGateActive\) {/,
  )
  assert.match(source, /newStartSuppressed/)
})

// --- バイト軸（maxResidualWorktreeBytes。Issue #348 案 B・PR #390 codex-review 指摘対応）---
// 件数軸だけでは配布先リポジトリのファイル量に依存する実バイト消費を捉えられないため、
// リポジトリ非依存の絶対閾値を独立した第2軸として併用する。検証・既定値・0 の意味・
// throw 条件は件数軸の parseMaxResidualWorktrees と同型のため、同じ観点で固定する。

test('バイト軸の既定値は 2 GiB（未指定・null のいずれも DEFAULT_MAX_RESIDUAL_WORKTREE_BYTES を返す）', () => {
  assert.equal(DEFAULT_MAX_RESIDUAL_WORKTREE_BYTES, 2 * 1024 * 1024 * 1024)
  assert.equal(parseMaxResidualWorktreeBytes(undefined), 2 * 1024 * 1024 * 1024)
  assert.equal(parseMaxResidualWorktreeBytes(null), 2 * 1024 * 1024 * 1024)
})

test('バイト軸の 0 はこの軸のみの明示オプトアウトとして通り、正の整数はそのまま返る', () => {
  assert.equal(parseMaxResidualWorktreeBytes(0), 0)
  assert.equal(parseMaxResidualWorktreeBytes(1024), 1024)
})

test('バイト軸の負値・非整数・文字列・NaN は fail-closed で throw する（誤記拒否の維持）', () => {
  assert.throws(() => parseMaxResidualWorktreeBytes(-1))
  assert.throws(() => parseMaxResidualWorktreeBytes(1.5))
  assert.throws(() => parseMaxResidualWorktreeBytes('2147483648'))
  assert.throws(() => parseMaxResidualWorktreeBytes(NaN))
})

test('両軸は独立に検証される（件数軸の値はバイト軸の検証・既定値に影響しない）', () => {
  // 件数軸を明示オプトアウト（0）にしても、バイト軸は独立に既定値のまま検証されること
  // （件数軸 0 がバイト軸の fail-closed まで無効化する fail-open を防ぐ）。
  assert.equal(parseMaxResidualWorktrees(0), 0)
  assert.equal(parseMaxResidualWorktreeBytes(undefined), DEFAULT_MAX_RESIDUAL_WORKTREE_BYTES)
})

test('バイト測定の呼び出しと OR 判定・latch 保持がスクリプト全体に存在する', () => {
  assert.match(source, /measureResidualWorktreeBytes/)
  assert.match(source, /residualGateActive/)
  // 件数軸の途中経過再評価（3b/3c）・monitoring 再開の projected 判定は、比較式そのものは
  // 件数軸単独のまま維持する（可読性・過去の回帰固定のため）。該当行に maxResidualWorktreeBytes
  // が同居しないことを軽量に確認する。
  assert.match(source, /residualObservedAtStart \+ ephemeralWorktrees\.length > maxResidualWorktrees\b/)
  assert.doesNotMatch(
    source,
    /residualObservedAtStart \+ ephemeralWorktrees\.length > maxResidualWorktrees.*maxResidualWorktreeBytes/,
  )
})

// --- バイト軸のラン中再評価（Issue #348 codex-review 指摘・PR #390。measureResidualWorktreeBytes
// の追加呼び出しなしで perWorktreeByteReserve による安全側予約を dispatch ループの新規着手・
// monitoring 再開の両方に及ぼす）---

test('バイト軸はラン開始時の残置 0 件でもメイン worktree 測定で予約を確定できる構造になっている（開始時 0 件だと軸が丸ごと働かなかった穴の再発防止）', () => {
  // 旧実装は `maxResidualWorktreeBytes > 0 && residual.paths.length > 0` を条件にしていたため、
  // 開始時残置 0 件のランではバイト軸の測定自体がスキップされていた。修正後は
  // `maxResidualWorktreeBytes > 0` のみを条件にし、mainWorktreePath の独立測定で
  // perWorktreeByteReserve を確定する。mainKib の測定は measureMainWorktreeContentBytes へ
  // 委譲する（共有 .git object store を除外した working tree 相当のみを floor に使うため。
  // PR #390 codex-review P1・Cursor Bugbot High: 素の du 値は object store 全量を含み過大予約
  // になっていた）。
  assert.doesNotMatch(source, /if \(maxResidualWorktreeBytes > 0 && residual\.paths\.length > 0\)/)
  assert.match(source, /if \(maxResidualWorktreeBytes > 0\) {/)
  assert.match(source, /mainWorktreePath \? await measureMainWorktreeContentBytes\(mainWorktreePath\)/)
  assert.match(source, /rawPerWorktreeByteReserve = Math\.max\(mainKib \* 1024, avgResidualBytes\)/)
  // クランプ適用を確認する（Issue #348 codex-review High 対応: mainKib の過大評価で
  // 1 件目着手候補が予約のみで恒久停止する回帰を防ぐ）。
  assert.match(source, /perWorktreeByteReserve = clampPerWorktreeByteReserve\(/)
})

test('measureMainWorktreeContentBytes はメイン worktree 全体から .git を差し引いた working tree 相当を返す構造になっている（.git object store の過大予約防止）', () => {
  assert.match(source, /async function measureMainWorktreeContentBytes\(mainPath\)/)
  assert.match(source, /const gitPath = sanitizeWorktreePath\(`\$\{mainPath\}\/\.git`\)/)
  assert.match(source, /return Math\.max\(0, totalKib - gitKib\)/)
})

test('measureResidualWorktreeBytes はプロンプトへ渡す前に sanitizeWorktreePath で全パスを検証し、UNTRUSTED_POLICY を含める（codex-review P0 対応）', () => {
  assert.match(source, /const sanitizedPaths = paths\.map\(\(p\) => sanitizeWorktreePath/)
  assert.match(source, /if \(sanitizedPaths\.some\(\(p\) => p === ''\)\) {/)
  // measureResidualWorktreeBytes のプロンプト配列に UNTRUSTED_POLICY が直接含まれることを確認する
  // （du -sk の呼び出し指示より前の行に存在する = このプロンプトの一部であることの軽量確認）。
  const fnStart = source.indexOf('async function measureResidualWorktreeBytes(paths)')
  const fnBody = source.slice(fnStart, fnStart + 3000)
  assert.match(fnBody, /UNTRUSTED_POLICY,/)
  assert.match(fnBody, /jq -r '\.\[\]'/)
})

test('新規着手・monitoring 再開の両方が projectResidualBytes による projected バイト判定を持つ', () => {
  assert.match(source, /projectedBytesA = projectResidualBytes\(\{/)
  const projectedByteOccurrences = source.match(/const projectedBytes = projectResidualBytes\(\{/g) ?? []
  assert.ok(
    projectedByteOccurrences.length >= 2,
    'projectedBytes 系の計算式（新規着手・monitoring 再開の双方）が見つからない',
  )
})

test('容量軸のラン中再評価: 開始時残置 0 件でも 1 worktree あたりの予約が大きいと件数上限より先に新規着手を止める', () => {
  // 実装の projected バイト計算式（(a) 恒久 latch の単純形。予約 reservedUnits=0 の近似）を
  // そのまま模倣する。1 worktree ≈ 1.5 GiB（既定 2 GiB 上限に対し数件で到達する大きさ）の
  // 配布先で、件数軸だけなら 100/6 ≈ 16 イシュー着手できるはずが、バイト軸により
  // 数イシュー以内で止まることを固定する（Issue #348 codex-review 指摘の核心シナリオ）。
  const maxResidualWorktreeBytes = DEFAULT_MAX_RESIDUAL_WORKTREE_BYTES // 2 GiB
  const perWorktreeByteReserve = 1.5 * 1024 * 1024 * 1024 // 1 worktree ≈ 1.5 GiB
  const residualBytesAtStart = 0 // 開始時残置 0 件（旧実装ではバイト軸が丸ごと不成立になっていたケース）
  let ephemeralCount = 0
  let suppressedAtIssue = null
  for (let issue = 1; issue <= 10; issue++) {
    const projected = residualBytesAtStart + (ephemeralCount + EPHEMERAL_RESERVE_PER_NEW_START) * perWorktreeByteReserve
    if (projected > maxResidualWorktreeBytes) {
      suppressedAtIssue = issue
      break
    }
    ephemeralCount += 1 // 1 イシューあたり最低 1 worktree（implement）を積み増す近似
  }
  assert.ok(
    suppressedAtIssue !== null && suppressedAtIssue <= 2,
    `1 worktree ≈1.5GiB のとき 2 GiB 上限は 1〜2 イシュー目で抑止されるべきだが suppressedAtIssue=${suppressedAtIssue}`,
  )
})

// --- バイト軸のラン中「実測し直し」（codex-review 指摘 5・PR #390 第 2 ラウンド）---
// perWorktreeByteReserve は開始時に確定する floor 値であり、ビルド成果物等でラン中に 1
// worktree が floor を超えて成長した場合、projection（floor × 台帳件数）だけでは実際の
// ディスク消費を過小評価し得る。台帳の積み増しが一定件数に達するたびに実測し直し、
// 実測超過を独立に検知して新規着手を止める構造になっていることをソース存在確認する。

test('ラン中の実測し直し（remeasureResidualBytesIfDue）が dispatch ループの毎周回冒頭で呼ばれる', () => {
  assert.match(source, /async function remeasureResidualBytesIfDue\(\)/)
  assert.match(source, /const BYTE_REMEASURE_LEDGER_INTERVAL = 3/)
  assert.match(source, /await remeasureResidualBytesIfDue\(\)/)
})

test('実測し直しは残置パス一覧＋台帳パスの合計を測定し、上限超過時に newStartSuppressed を立てる', () => {
  const fnStart = source.indexOf('async function remeasureResidualBytesIfDue()')
  const fnEnd = source.indexOf('\nwhile (true) {', fnStart)
  const fnBody = source.slice(fnStart, fnEnd)
  assert.match(fnBody, /residualPathsAtStart, \.\.\.ephemeralWorktrees\.map\(\(e\) => e\.path\)/)
  assert.match(fnBody, /actualBytes > maxResidualWorktreeBytes && !newStartSuppressed/)
})

// --- K8Dc 回帰: ラン中実測し直しが以後の projection の基準を更新すること（PR #390 codex-review
// 指摘・CI fail 対象）。従来は actualBytes を上限超過の即時判定にのみ使い破棄していたため、
// 実測が上限直下でも以後の projection は開始時の古い residualBytesAtStart のまま更新されず、
// 容量超過の新規着手を許す fail-open になっていた。remeasureResidualBytesIfDue が
// residualBytesAtStart と byteBaselineLedgerCount を同一代入で更新することをソース確認する。

test('実測し直し成功時に residualBytesAtStart と byteBaselineLedgerCount を同一箇所で更新する（K8Dc 対応）', () => {
  const fnStart = source.indexOf('async function remeasureResidualBytesIfDue()')
  const fnEnd = source.indexOf('\nwhile (true) {', fnStart)
  const fnBody = source.slice(fnStart, fnEnd)
  assert.match(fnBody, /residualBytesAtStart = actualBytes/)
  assert.match(fnBody, /byteBaselineLedgerCount = ephemeralWorktrees\.length/)
  // 更新順序: actualBytes 算出後・kib === null の早期 return より後（成功時のみ更新される）
  const nullReturnIdx = fnBody.indexOf('if (kib === null)')
  const baselineUpdateIdx = fnBody.indexOf('residualBytesAtStart = actualBytes')
  assert.ok(nullReturnIdx >= 0 && baselineUpdateIdx > nullReturnIdx)
})

// --- projectResidualBytes（K8Dc 対応で切り出した純粋関数）の回帰テスト ---
// 基準確定後に台帳が増えていない場合、projection は基準値そのものと一致すべき（二重計上なし）。

test('projectResidualBytes: 台帳増分 0・予約 0 なら projection は baselineBytes と一致する', () => {
  const p = projectResidualBytes({
    baselineBytes: 500 * 1024 * 1024,
    ledgerLength: 10,
    baselineLedgerCount: 10,
    reservedUnits: 0,
    extraReserveUnits: 0,
    perWorktreeByteReserve: 4 * 1024 * 1024,
  })
  assert.equal(p, 500 * 1024 * 1024)
})

test('projectResidualBytes: 基準確定済みの台帳分は二重計上しない（K8Dc 回帰の核心）', () => {
  const perWorktree = 4 * 1024 * 1024
  // 基準確定時点で台帳が既に 10 件（baselineBytes にその実消費が反映済み）。
  // ledgerLength をそのまま乗じる旧実装なら 10 件分を再度予約し過大評価になる。
  const p = projectResidualBytes({
    baselineBytes: 500 * 1024 * 1024,
    ledgerLength: 10,
    baselineLedgerCount: 10,
    reservedUnits: 2,
    extraReserveUnits: 1,
    perWorktreeByteReserve: perWorktree,
  })
  assert.equal(p, 500 * 1024 * 1024 + (0 + 2 + 1) * perWorktree)
})

test('projectResidualBytes: 基準以降に積み増された台帳分のみ floor 予約する', () => {
  const perWorktree = 4 * 1024 * 1024
  const p = projectResidualBytes({
    baselineBytes: 500 * 1024 * 1024,
    ledgerLength: 13, // 基準確定後に 3 件積み増された
    baselineLedgerCount: 10,
    reservedUnits: 0,
    extraReserveUnits: 0,
    perWorktreeByteReserve: perWorktree,
  })
  assert.equal(p, 500 * 1024 * 1024 + 3 * perWorktree)
})

test('projectResidualBytes: baselineLedgerCount が ledgerLength を上回っても負の予約にならない（防御的 clamp）', () => {
  const p = projectResidualBytes({
    baselineBytes: 500 * 1024 * 1024,
    ledgerLength: 5,
    baselineLedgerCount: 10,
    reservedUnits: 0,
    extraReserveUnits: 0,
    perWorktreeByteReserve: 4 * 1024 * 1024,
  })
  assert.equal(p, 500 * 1024 * 1024)
})

// --- clampPerWorktreeByteReserve 回帰（Issue #348 codex-review High）---
// mainKib（メイン worktree 全体 − .git）は gitignored なビルド成果物・依存関係を全量含み
// 得るため、クランプ無しだと残置 0 件・実行中タスク 0 件の 1 件目着手候補ですら
// `EPHEMERAL_RESERVE_PER_NEW_START × perWorktreeByteReserve` が容量上限を超え、
// 予約起因の defer を経由せずそのまま恒久停止する（1 ラン 0 件という Issue #348 より
// 重い回帰）。クランプがこの経路を塞ぐことと、正当な圧迫時には引き続き latch することの
// 両方を固定する。

test('clampPerWorktreeByteReserve: 上限超過時は maxResidualWorktreeBytes / reservePerNewStart へ切り詰める', () => {
  const maxResidualWorktreeBytes = 2 * 1024 * 1024 * 1024 // 既定 2 GiB
  const reservePerNewStart = EPHEMERAL_RESERVE_PER_NEW_START // 既定 6
  // 27 GB のメイン worktree（node_modules 等の gitignored 成果物込み）を模す実測値。
  const rawValue = 27 * 1024 * 1024 * 1024
  const clamped = clampPerWorktreeByteReserve(rawValue, maxResidualWorktreeBytes, reservePerNewStart)
  assert.equal(clamped, Math.floor(maxResidualWorktreeBytes / reservePerNewStart))
  assert.ok(clamped < rawValue)
})

test('clampPerWorktreeByteReserve: 上限内なら実測値をそのまま通す（過小評価しない）', () => {
  const maxResidualWorktreeBytes = 2 * 1024 * 1024 * 1024
  const reservePerNewStart = EPHEMERAL_RESERVE_PER_NEW_START
  const rawValue = 10 * 1024 * 1024 // 10 MiB（本リポジトリ相当の小さい実測値）
  const clamped = clampPerWorktreeByteReserve(rawValue, maxResidualWorktreeBytes, reservePerNewStart)
  assert.equal(clamped, rawValue)
})

test('回帰証明: クランプ済み perWorktreeByteReserve なら baseline 0・reservedUnits 0 の 1 件目候補は projection が上限を超えない（着手できる）', () => {
  const maxResidualWorktreeBytes = 2 * 1024 * 1024 * 1024
  const reservePerNewStart = EPHEMERAL_RESERVE_PER_NEW_START
  const rawPerWorktreeByteReserve = 27 * 1024 * 1024 * 1024 // 過大なメイン worktree 実測値
  const perWorktreeByteReserve = clampPerWorktreeByteReserve(
    rawPerWorktreeByteReserve,
    maxResidualWorktreeBytes,
    reservePerNewStart,
  )
  // dispatch ループ (b) 分岐と同じ形の projection: baseline 0・台帳増分 0・実行中タスク予約 0・
  // 候補自身の最大増分のみ。
  const projectedBytes = projectResidualBytes({
    baselineBytes: 0,
    ledgerLength: 0,
    baselineLedgerCount: 0,
    reservedUnits: 0,
    extraReserveUnits: reservePerNewStart,
    perWorktreeByteReserve,
  })
  assert.ok(
    projectedBytes <= maxResidualWorktreeBytes,
    `クランプ後も projection (${projectedBytes}) が上限 (${maxResidualWorktreeBytes}) を超えており、` +
      '1 件目候補が予約のみで恒久停止する回帰が再発している',
  )
})

test('クランプ後も正当な容量圧迫（baseline が既に上限近傍）は引き続き latch する（fail-open への振れ過ぎ防止）', () => {
  const maxResidualWorktreeBytes = 2 * 1024 * 1024 * 1024
  const reservePerNewStart = EPHEMERAL_RESERVE_PER_NEW_START
  const rawPerWorktreeByteReserve = 27 * 1024 * 1024 * 1024
  const perWorktreeByteReserve = clampPerWorktreeByteReserve(
    rawPerWorktreeByteReserve,
    maxResidualWorktreeBytes,
    reservePerNewStart,
  )
  // baseline 自体が既に上限の 90% を占めている状態（実残置ディスク圧が実在するケース）。
  const nearLimitBaseline = Math.floor(maxResidualWorktreeBytes * 0.9)
  const projectedBytes = projectResidualBytes({
    baselineBytes: nearLimitBaseline,
    ledgerLength: 0,
    baselineLedgerCount: 0,
    reservedUnits: 0,
    extraReserveUnits: reservePerNewStart,
    perWorktreeByteReserve,
  })
  assert.ok(
    projectedBytes > maxResidualWorktreeBytes,
    'baseline が既に上限近傍のケースまでクランプで通してしまうと、実容量圧迫時の fail-closed が壊れる',
  )
})

// --- K-YX 回帰（Cursor Bugbot High）: 実測 du が並行 cleanup とのパス削除競合に耐えること ---
// 従来は「存在しないパス」も measureResidualWorktreeBytes 全体の失敗として扱っていたため、
// 並行 runOne の cleanup が remeasure 測定中にパスを削除すると 1 件の欠落で全体が失敗し、
// newStartSuppressed（fail-closed）が恒久化して新規着手が止まっていた。存在しないパスは
// 0 として扱い（missing カウント）、実エラー（du 失敗等）のみを fail-closed 対象とする
// ことをプロンプト・スキーマの両方でソース確認する。

test('measureResidualWorktreeBytes は存在しないパスを ENOENT 耐性で 0 扱いし、実エラーのみ fail-closed にする', () => {
  const fnStart = source.indexOf('async function measureResidualWorktreeBytes(paths)')
  const fnEnd = source.indexOf('\n\n// メイン worktree の', fnStart)
  const fnBody = source.slice(fnStart, fnEnd)
  assert.ok(fnStart >= 0 && fnEnd > fnStart, 'measureResidualWorktreeBytes の関数境界を検出できない')
  assert.match(fnBody, /\[ ! -e "\$p" \]/)
  assert.match(fnBody, /missing=\$\(\(missing\+1\)\)/)
  assert.match(fnBody, /err=\$\(\(err\+1\)\)/)
  // ERR>0 の扱いはエージェントの自己申告（旧文言「ERR が 0 より大きい場合は…失敗として報告」）
  // ではなく、観測値をそのまま返させてホスト側の err === 0 検証で fail-closed にする
  // （PR #390 codex-review P1: schema が kib しか必須にしないと部分合計が成功として通る）
  assert.match(fnBody, /ERR を err として、観測値のまま返す/)
  assert.match(fnBody, /Number\.isInteger\(v\?\.err\) && v\.err === 0/)
})

test('measureResidualWorktreeBytes は du の終了コードと jq の展開失敗を個別に検出する（fail-open 防止）', () => {
  const fnStart = source.indexOf('async function measureResidualWorktreeBytes(paths)')
  const fnEnd = source.indexOf('\n\n// メイン worktree の', fnStart)
  const fnBody = source.slice(fnStart, fnEnd)
  // du | cut のパイプ直結は終了状態が cut のものになる fail-open（PR #390 codex-review P1）。
  // また `duout=$(du ...); durc=$?` の素の代入は errexit 下で失敗時に即終了し err 計上へ到達
  // しないため、終了状態は if の条件式で検査する（PR #390 codex-review P1 第 3 ラウンド）
  assert.match(fnBody, /if duout=\$\(du -sk -- "\$p" 2>\/dev\/null\); then/)
  assert.match(fnBody, /else err=\$\(\(err\+1\)\); fi;/)
  assert.doesNotMatch(fnBody, /du -sk -- "\$p" 2>\/dev\/null \| cut/)
  assert.doesNotMatch(fnBody, /durc=\$\?/)
  // jq を while ループへ直結すると jq の非 0 終了が「入力 0 件の正常測定」に化ける
  // （PR #390 codex-review P1）。一時ファイル経由で終了コードを検査し ERR=1 へ倒す
  assert.match(fnBody, /if ! jq -r/)
  assert.match(fnBody, /TOTAL=0 MISSING=0 ERR=1/)
})

test('ORPHAN_BYTES_SCHEMA は err を必須フィールドとして要求する', () => {
  assert.match(source, /required: \['kib', 'err'\]/)
})

test('バイト軸は新規着手直前に台帳増分によらず実測し直す（PR #390 P1 第 4 ラウンド）', () => {
  // 実測本体（Now）が分離され、新規着手（implement）の直前で直接呼ばれること
  assert.match(source, /async function remeasureResidualBytesNow\(\)/)
  assert.match(
    source,
    /if \(item\.kind === 'implement'\) \{\n\s*await remeasureResidualBytesNow\(\)\n\s*if \(newStartSuppressed\) continue\n\s*\}/,
  )
  // 測定コストの有界化: 同一 dispatch 周回内は 1 回に間引く
  assert.match(source, /byteRemeasureAtIterationSeq === dispatchIterationSeq/)
  assert.match(source, /dispatchIterationSeq \+= 1/)
  // 台帳増分ゲート（IfDue）は毎周回のループ先頭経路として残る
  assert.match(
    source,
    /ephemeralWorktrees\.length - byteRemeasureAtLedgerCount < BYTE_REMEASURE_LEDGER_INTERVAL/,
  )
})

test('ORPHAN_BYTES_SCHEMA は missing を任意フィールドとして持ち、成否判定に使わないと明記する', () => {
  assert.match(source, /missing: \{\s*type: 'integer'/)
})

// --- monitoring 再開の実測失敗・超過検出は remeasureResidualBytesNow の戻り値のみで行うこと
// （PR #390 cursor Bugbot High "Remeasure failure miss for resume" / codex-review P1 第 5
// ラウンド）。newStartSuppressed は一度立てたら理由文字列を上書きしない latch であるため、
// 「呼び出し前後の newStartSuppressed の identity 比較」で検出しようとすると、latch が既に
// 立っている状態での 2 回目以降の実測失敗・超過が検出漏れになる。

test('remeasureResidualBytesNow は全ての exit で構造化された { failed, exceeded } を返す（bare return 禁止）', () => {
  const fnStart = source.indexOf('async function remeasureResidualBytesNow()')
  const fnEnd = source.indexOf('\nwhile (true) {', fnStart)
  const fnBody = source.slice(fnStart, fnEnd)
  assert.ok(fnStart >= 0 && fnEnd > fnStart, 'remeasureResidualBytesNow 本体を特定できること')
  // ガード節（無効・未観測）の早期 return
  assert.match(fnBody, /return \{ failed: false, exceeded: false \}/)
  // 同一周回内 2 回目以降の間引き return は直近周回の結果を返す
  assert.match(fnBody, /return lastByteRemeasureOutcome/)
  // 測定失敗（kib === null）の return
  assert.match(fnBody, /lastByteRemeasureOutcome = \{ failed: true, exceeded: false \}/)
  // 測定成功時の return（超過有無を反映）
  assert.match(fnBody, /lastByteRemeasureOutcome = \{ failed: false, exceeded: actualBytes > maxResidualWorktreeBytes \}/)
  // 値を返さない bare `return`（改行または `}` が直後に続く形）が本体に残っていないこと。
  // 将来ここへ bare return が再混入すると、呼び出し元の `remeasureOutcome.failed` 参照が
  // `TypeError: Cannot read properties of undefined` になり monitoring 再開ゲートが例外で落ちる。
  assert.doesNotMatch(fnBody, /\breturn\s*\n/)
})

// --- recordEphemeralWorktree が path: '' で計上した検証不可エントリは、実測し直しの du 対象
// からは除外されるが、それを「測定済みとして基準へ取り込む」（byteBaselineLedgerCount へ含める）
// と、実体が巨大でもバイト軸から恒久的に不可視になる（CI codex-review fail 対象・
// PRRT_kwDORuXFg86aPIh5）。未検証エントリが 1 件でもあれば measureResidualWorktreeBytes を
// 呼ばず kib を null（測定失敗）にし、byteBaselineLedgerCount を更新させない（= 常に
// unbaselinedLedgerCount へ残り続け、解消されるまで perWorktreeByteReserve の floor 予約が
// 積み増され続ける）ことをソース確認する。

test('実測し直しは検証不可（空パス）エントリが台帳に残る間、測定を試みず fail-closed で基準更新を止める', () => {
  const fnStart = source.indexOf('async function remeasureResidualBytesNow()')
  const fnEnd = source.indexOf('\nwhile (true) {', fnStart)
  const fnBody = source.slice(fnStart, fnEnd)
  assert.ok(fnStart >= 0 && fnEnd > fnStart, 'remeasureResidualBytesNow 本体を特定できること')
  // 未検証エントリの検出
  assert.match(
    fnBody,
    /const unverifiedEphemeralCount = ephemeralWorktrees\.filter\(/,
  )
  // 未検証エントリが 1 件でもあれば measureResidualWorktreeBytes を呼ばず kib は null
  assert.match(
    fnBody,
    /const kib =\s*\n?\s*unverifiedEphemeralCount > 0 \? null : /,
  )
  // kib===null の早期 return より前で byteBaselineLedgerCount への代入が起きないこと
  // （成功時の代入 `byteBaselineLedgerCount = ephemeralWorktrees.length` は kib===null 分岐の
  // 後にのみ存在する = 未検証エントリが残る限り基準が更新されない）
  const nullReturnIdx = fnBody.indexOf('if (kib === null)')
  const baselineAssignIdx = fnBody.indexOf('byteBaselineLedgerCount = ephemeralWorktrees.length')
  assert.ok(nullReturnIdx >= 0 && baselineAssignIdx > nullReturnIdx)
})

test('monitoring 再開ゲートは remeasureResidualBytesNow の戻り値のみで defer 判定し、newStartSuppressed の identity 比較を使わない', () => {
  const anchor = 'monitoring 再開の直前にも実測し直す'
  const start = source.indexOf(anchor)
  assert.ok(start >= 0, 'monitoring 再開の実測し直しブロックを特定できること')
  const blockEnd = source.indexOf('\n          const recordedByIssue = new Map()', start)
  assert.ok(blockEnd > start, 'ブロック終端（予約計上ロジックの開始）を特定できること')
  const block = source.slice(start, blockEnd)
  // 戻り値を保持して失敗・超過の両方を判定すること
  assert.match(block, /const remeasureOutcome = await remeasureResidualBytesNow\(\)/)
  assert.match(block, /if \(remeasureOutcome\.failed \|\| remeasureOutcome\.exceeded\)/)
  // 旧実装（identity 比較）が復活していないこと（バグの再発防止の核心的な回帰検出）
  assert.doesNotMatch(block, /suppressedBeforeResumeRemeasure/)
  assert.doesNotMatch(block, /newStartSuppressed !== /)
})
