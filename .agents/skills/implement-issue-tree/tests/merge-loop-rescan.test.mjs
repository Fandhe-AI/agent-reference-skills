// implement-issue-tree の merge 監視ループにおける「強制スレッド再走査の監視枠確保」の決定的
// 回帰テスト（Fandhe-AI/ideas PR #248 codex-review の P1 指摘）。
//
// 対象バグ1: merge-exec が reason 'unresolved-threads' を返したのにスレッド一覧が空のとき、
// runMergeLoop は forceThreadRescan を立てて continue する。しかし監視予算 monitorsLeft は
// ループ先頭で減算済みのため、その回が最後の枠だと while 条件が false になり救済ラウンドが
// 一度も走らないまま 'unresolved-comments' の blocked 終端に落ちていた。
//
// 対象バグ3（Issue #248 の本題）: 上記の救済ラウンドを判定する rescueRoundPending の消費
// タイミングが monitor 結果の直後だったため、同じラウンドで merge-exec が返す reason
// （head-moved / checks-not-green / merge-failed）を classifyMergeExecDispatch が monitor
// 判定より後で 'timeout' へ写像するケースを見逃していた。pending は既に false に落ちた後
// なので、この merge-exec 由来の timeout は救済判定を受けられず failed 終端（halt カウント・
// 再開対象外）になる。修正は判定地点を「予約 → 今ラウンドの active フラグへ移送」した上で
// ループ退出後の単一 choke point（break / continue / while 条件 false のすべてが通る）へ移し、
// merge-exec 写像後の lastState でも救済ラウンドの判定を受けられるようにした（#248 時点では
// 判定を受けた結果は一律 blocked だった）。
//
// 契約更新（agent-cli-skills#365）: #248 は「判定地点（choke point）」の修正であり、#365 は
// 「判定内容（timeout の出所別分類）」の修正である。choke point 自体（ループ退出後・単一地点で
// 1 回だけ評価する構造）は #365 でも維持する。#248 時点の reconcileRescueRoundState は救済ラウンド
// 中の timeout を出所を問わず一律 blocked（halt 非カウント）へ分類していたが、これだと恒常的な
// merge-exec 失敗（特に merge-failed）が halt カウントに一切算入されず同じ救済経路へ再入し続け、
// halt 防御を迂回する（#365 の P1）。#365 は timeout の出所を第 3 引数 timeoutExecReason
// （''=monitor 由来 / 非空=merge-exec 由来のリテラル reason）で区別し、monitor 由来のみ blocked、
// merge-exec 由来は既定の failed（halt カウント対象）へ進むよう契約を変更した。
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
  '..', 'scripts', 'implement-issue-tree.src.js',
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
// 実装スクリプトは Workflow ランタイムの制約により `export const meta` 以外の top-level export を
// 持てない（他に export があると起動時に SyntaxError: Unexpected keyword 'export' となり
// スクリプト全体が実行不能になる）。そのため定義部は非 export のまま置き、テスト側で
// 切り出したスライスへ export 文を付与して module として読み込む。
const SLICE_EXPORTS = [
  'parseExternalChecks',
  'mergeExecutePrompt',
  'classifyMergeExecDispatch',
  'planForcedThreadRescan',
  'reconcileRescueRoundState',
  'MERGE_EXEC_SCHEMA',
  'MERGE_EXEC_VALID_REASONS',
]
writeFileSync(slicePath, `${definitionPart}\nexport { ${SLICE_EXPORTS.join(', ')} }\n`)

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

// ---------------------------------------------------------------------------
// 救済ラウンドの終端分類（Fandhe-AI/rust-ai-library#681 の Bugbot 指摘、および
// その初回修正に対する Fandhe-AI/agent-cli-skills#246 の Bugbot High 指摘）
//
// 対象バグ1: 予算枯渇時に延長した救済ラウンドが 'timeout' を返すと terminalStatus が
// blocked（halt 非カウント・次ラン monitoring 再開）から failed（halt カウント・再開対象外）へ
// 化ける。救済機構を入れる前の同じケースは blocked で終端していたため回帰である。
//
// 対象バグ2（初回修正の欠陥）: これを lastState の 'unresolved-comments' への書き換えで
// 直すと、その値は fix ループ起動状態でもあるため制御が fix 分岐へ流れ、timeout の finding で
// fix が走り monitorsLeft が積み増され、狙った blocked 終端に到達しない。無効な fix 結果は
// 既定の failed 終端になり回帰がそのまま再現する。よって state は触らず、ループを即座に
// 抜けて終端 status だけを品質ブロックへ分類する設計に改めた。
// ---------------------------------------------------------------------------

test('reconcileRescueRoundState: 救済ラウンド中・monitor 由来の timeout（reason 空）は即終端 + 品質ブロック分類を指示する', () => {
  const r = mod.reconcileRescueRoundState('timeout', true, '')
  assert.equal(r.terminate, true, 'fix 分岐へ流さずループを抜けなければ blocked 終端に到達しない')
  assert.equal(r.qualityBlock, true, 'timeout のまま分類すると failed になり halt にカウントされる')
  assert.equal(r.rescuePending, false)
  assert.equal(r.timeoutOrigin, 'monitor')
})

test('reconcileRescueRoundState: 救済ラウンド中・merge-exec 由来の timeout（reason 非空）は品質ブロックへ分類しない（#365）', () => {
  // #365 の本題: merge-exec 由来の timeout 写像を品質ブロックへ含めると、恒常的な merge 失敗が
  // halt カウントに算入されず同じ救済経路へ再入し続ける（halt 防御の迂回）。
  for (const reason of ['head-moved', 'checks-not-green', 'merge-failed']) {
    const r = mod.reconcileRescueRoundState('timeout', true, reason)
    assert.equal(r.terminate, false, `${reason}: 品質ブロックへ終端させてはならない（既定の failed へ進ませる）`)
    assert.equal(r.qualityBlock, false, `${reason}: qualityBlock を立てると halt カウントが迂回される`)
    assert.equal(r.rescuePending, false)
    assert.equal(r.timeoutOrigin, 'merge-exec', `${reason}: 出所は merge-exec と判定されなければならない`)
  }
})

test('reconcileRescueRoundState: 想定外の非空 reason も merge-exec 由来（fail-closed）として扱う', () => {
  // 分岐条件のリテラル以外が渡っても、品質ブロックへ倒れる方向（halt 防御を弱める側）の
  // フォールバックにしない。非空はすべて merge-exec 由来として扱う既定の安全側。
  const r = mod.reconcileRescueRoundState('timeout', true, 'unexpected-value')
  assert.equal(r.terminate, false)
  assert.equal(r.qualityBlock, false)
  assert.equal(r.timeoutOrigin, 'merge-exec')
})

test('reconcileRescueRoundState: lastState を書き換えるフィールドを返さない', () => {
  // 'unresolved-comments' への書き換えは fix 起動状態への変更となり #246 の欠陥を再現する。
  const r = mod.reconcileRescueRoundState('timeout', true, '')
  assert.equal(Object.hasOwn(r, 'lastState'), false, 'state の書き換えを戻り値に含めてはならない')
})

test('reconcileRescueRoundState: 観測が成立した結果では何もしない', () => {
  // 救済の目的はスレッド内容の取り直し。observation が成立した以上その判定と通常分岐を尊重する。
  for (const state of ['ready', 'needs-fix', 'blocked', 'unresolved-comments', 'invalid-monitor-result']) {
    const r = mod.reconcileRescueRoundState(state, true, '')
    assert.equal(r.terminate, false, `${state} で終端させてはならない`)
    assert.equal(r.qualityBlock, false)
    assert.equal(r.rescuePending, false)
    assert.equal(r.timeoutOrigin, 'none')
  }
})

test('reconcileRescueRoundState: 救済ラウンド外の timeout は失敗のまま残す（reason の有無によらない）', () => {
  // 残枠があった回の timeout まで品質ブロックへ写像すると、実際の監視失敗を隠してしまう。
  for (const reason of ['', 'merge-failed']) {
    const r = mod.reconcileRescueRoundState('timeout', false, reason)
    assert.equal(r.terminate, false)
    assert.equal(r.qualityBlock, false)
    assert.equal(r.rescuePending, false)
    assert.equal(r.timeoutOrigin, 'none')
  }
})

test('救済ラウンドの pending は granted のときだけ立つ', () => {
  const branchStart = driverPart.indexOf('if (finding.unresolvedComments.length === 0) {')
  assert.notEqual(branchStart, -1)
  const rest = driverPart.slice(branchStart)
  const continueMatch = /\n[ \t]*continue[ \t]*\n/.exec(rest)
  assert.notEqual(continueMatch, null)
  const branchBody = rest.slice(0, continueMatch.index)
  // granted 以外で立てると、残枠のある回の timeout まで品質ブロックへ化ける。
  assert.match(branchBody, /if \(rescan\.granted\) rescueRoundPending = true/)
})

// 監視ループの範囲は実装側に置いたマーカー対で切り出す（Issue #336）。
//
// 経緯: 当初は波括弧の深さを数えて閉じ位置を求めていたが、文字列・テンプレートリテラル・
// コメント内の片側波括弧で境界がずれるため字句走査（手書きレキサー）へ置き換えた。しかし
// レキサーは正規表現/除算の判別・ASI・Unicode 識別子・ラベル付き break といった JS 文法の
// 全域を相手にすることになり、テストヘルパーとしては見合わない大きさと不確かさを抱えた。
// 実装スクリプトは自分たちが所有しているため、境界そのものをソースへ書き込むほうが確実で
// 小さい。既に同じファイルで __IMPLEMENT_ISSUE_TREE_DRIVER_START__ が同じ方式を採っている。
//
// 「コメントに依存する」点は当初の問題（「即座にループを抜けて」等の説明文＝**偶発的な散文**へ
// の依存。文面を書き換えるだけで回帰検知が黙って無効化される）とは別物である。マーカーは
// 単一目的の固定文字列で、出現回数を下のテストが 1 回に固定し、消えれば読み込み時点で throw
// する。黙って無効化される経路が無い。
const LOOP_START_MARKER = ['__MERGE', 'MONITOR', 'LOOP', 'START__'].join('_')
const LOOP_END_MARKER = ['__MERGE', 'MONITOR', 'LOOP', 'END__'].join('_')

const loopStartMarkerIndex = driverPart.indexOf(LOOP_START_MARKER)
const loopEndMarkerIndex = driverPart.indexOf(LOOP_END_MARKER)
if (loopStartMarkerIndex === -1 || loopEndMarkerIndex === -1) {
  throw new Error(`監視ループの境界マーカー（${LOOP_START_MARKER} / ${LOOP_END_MARKER}）が実装スクリプトに存在しない（削除・改名は回帰テストを無効化する）`)
}

const WHILE_HEADER = 'while (!merged && monitorsLeft > 0) {'
const whileIndex = driverPart.indexOf(WHILE_HEADER, loopStartMarkerIndex)
if (whileIndex === -1 || whileIndex > loopEndMarkerIndex) {
  throw new Error('監視ループの while が開始マーカーと終了マーカーの間に見つからない（構造変更時はマーカーも一緒に動かすこと）')
}
const loopOpenBraceIndex = whileIndex + WHILE_HEADER.length - 1
// 終了マーカーは閉じ括弧の直後の行に置く規約のため、マーカーから後ろ向きに最初の `}` が
// ループの閉じ括弧そのものになる。波括弧の対応付けを一切行わないため、文字列・コメント・
// テンプレートリテラル内の片側波括弧の影響を原理的に受けない。
const loopEndIndex = driverPart.lastIndexOf('}', loopEndMarkerIndex)
if (loopEndIndex === -1 || loopEndIndex < loopOpenBraceIndex) {
  throw new Error('監視ループの閉じ括弧が終了マーカーの直前に見つからない（マーカー配置の規約違反）')
}

test('監視ループの境界マーカーは実装スクリプト内にそれぞれ 1 か所のみ存在する', () => {
  // 複数あると切り出し位置が曖昧になる。driverPart ではなくスクリプト全体（source）で数える。
  assert.equal(source.split(LOOP_START_MARKER).length - 1, 1, `${LOOP_START_MARKER} は 1 か所だけでなければならない`)
  assert.equal(source.split(LOOP_END_MARKER).length - 1, 1, `${LOOP_END_MARKER} は 1 か所だけでなければならない`)
})

test('救済ラウンドの終端分類はループ退出後・単一地点で 1 回だけ評価される', () => {
  // reconcileRescueRoundState の呼び出しは driverPart 内でちょうど 1 回。呼び出し形（引数名）を
  // 固定した正規表現だと、#246/#248 と同じ形の regression（旧引数名 rescueRoundPending でのラウンド
  // 内再呼び出し等）が紛れ込んでも「別の呼び出し」としてカウントから漏れ、1 のままテストが通って
  // しまう。裸の呼び出し（開き括弧まで）で数えることで、本 Issue が守るべき不変条件
  // 「呼び出しは 1 か所だけ」を引数の綴りに関係なく検証する。
  const allCalls = driverPart.match(/reconcileRescueRoundState\(/g) ?? []
  assert.equal(allCalls.length, 1, '救済ラウンドの判定呼び出しは driverPart 内で 1 か所だけでなければならない')
  const callIndex = driverPart.indexOf('reconcileRescueRoundState(lastState, rescueRoundActive, roundTimeoutExecReason)')
  assert.notEqual(callIndex, -1, '判定呼び出しの引数形（lastState, rescueRoundActive, roundTimeoutExecReason）が見つからない（#365 で 3 引数化）')
  // ループの外（閉じ括弧より後）かつ terminalStatus の算出より前でなければならない
  // （merge-exec 由来の timeout 写像まで確定した lastState を見て判定する必要があるため）。
  assert.ok(callIndex > loopEndIndex, '判定はループ退出後（choke point）でなければならない')
  const terminalStatusIndex = driverPart.indexOf('const terminalStatus =')
  assert.notEqual(terminalStatusIndex, -1, '終端 status の判定が見つからない（構造変更時は本テストも更新すること）')
  assert.ok(callIndex < terminalStatusIndex, '判定は terminalStatus の算出より前でなければならない')
  // 同じブロックに qualityBlock フラグの配線があること。
  const block = driverPart.slice(callIndex, terminalStatusIndex)
  assert.match(block, /rescueTimeoutQualityBlock = reconciled\.qualityBlock/)
  // lastState への再代入が残っていると fix 起動状態への書き換えが復活する（#246 の欠陥の再発防止）。
  assert.doesNotMatch(block, /lastState = reconciled/)
})

test('救済ラウンドの予約はラウンド先頭（monitorsLeft-- の直後）で active へ移送される', () => {
  const handoffActiveIndex = driverPart.indexOf('rescueRoundActive = rescueRoundPending')
  const handoffClearIndex = driverPart.indexOf('rescueRoundPending = false', handoffActiveIndex)
  assert.notEqual(handoffActiveIndex, -1, '予約の移送（active への代入）が見つからない')
  assert.notEqual(handoffClearIndex, -1, '予約の移送後にクリアする代入が見つからない')
  // ループの内側（開始 index と loopEndIndex の間）にあること。
  assert.ok(handoffActiveIndex > loopOpenBraceIndex && handoffActiveIndex < loopEndIndex, '移送はループ内でなければならない')
  assert.ok(handoffClearIndex < loopEndIndex, '移送後のクリアもループ内でなければならない')
  // monitorsLeft-- の直後（ラウンド先頭）に位置すること。同ラウンド内の他の処理より前でなければ
  // 予約消費前に別の分岐が rescueRoundActive を参照してしまう。
  const decrIndex = driverPart.indexOf('monitorsLeft--', loopOpenBraceIndex)
  assert.notEqual(decrIndex, -1)
  assert.ok(decrIndex < handoffActiveIndex, '移送は monitorsLeft-- より後でなければならない')
  const monitorCallIndex = driverPart.indexOf('const m = await agent(monitorPrompt(', loopOpenBraceIndex)
  assert.notEqual(monitorCallIndex, -1)
  assert.ok(handoffClearIndex < monitorCallIndex, '移送は monitor 呼び出しより前（ラウンド先頭）でなければならない')
})

test('roundTimeoutExecReason はラウンド先頭（monitor 呼び出しより前）でリセットされる（#365）', () => {
  // リセットを落とすと前ラウンドの merge-exec 由来 reason が今ラウンドの monitor 由来 timeout へ
  // 漏れ、blocked が静かに failed へ化ける（計画の (c) 負のコントロール）。
  // ループ外の宣言（let roundTimeoutExecReason = ''）と区別するため、ループ本体内から探す。
  const resetIndex = driverPart.indexOf("roundTimeoutExecReason = ''", loopOpenBraceIndex)
  assert.notEqual(resetIndex, -1, 'ラウンド先頭のリセット代入が見つからない')
  const handoffClearIndex = driverPart.indexOf('rescueRoundPending = false')
  assert.notEqual(handoffClearIndex, -1)
  assert.ok(resetIndex > handoffClearIndex, 'リセットは救済ラウンド予約の移送より後（ラウンド先頭の一部）でなければならない')
  const monitorCallIndex = driverPart.indexOf('const m = await agent(monitorPrompt(', loopOpenBraceIndex)
  assert.notEqual(monitorCallIndex, -1)
  assert.ok(resetIndex < monitorCallIndex, 'リセットは monitor 呼び出しより前でなければならない（漏れ防止）')
  assert.ok(resetIndex > loopOpenBraceIndex && resetIndex < loopEndIndex, 'リセットはループ内でなければならない')
})

test('一過性 reason 分岐（head-moved / checks-not-green / merge-failed）は分岐条件のリテラルのみを roundTimeoutExecReason へ代入する（#365）', () => {
  // エージェント自己申告の自由テキスト（execSummaryText）を代入しないことを構造的に固定する
  // （A03 インジェクション対策・分類入力への未検証文字列混入防止）。
  const branchStart = driverPart.indexOf("execReason === 'head-moved' || execReason === 'checks-not-green' || execReason === 'merge-failed'")
  assert.notEqual(branchStart, -1, '一過性 reason 分岐が見つからない（構造変更時は本テストも更新すること）')
  const nextBranchIndex = driverPart.indexOf('} else {', branchStart)
  assert.notEqual(nextBranchIndex, -1)
  const branchBody = driverPart.slice(branchStart, nextBranchIndex)
  assert.match(branchBody, /roundTimeoutExecReason = execReason\b/, 'リテラル execReason の代入が見つからない')
  assert.doesNotMatch(branchBody, /roundTimeoutExecReason = execSummaryText/, '自由テキストを代入してはならない')
})

test('救済 timeout フラグが終端 status の blocked 分類に配線されている', () => {
  const idx = driverPart.indexOf('const terminalStatus =')
  assert.notEqual(idx, -1, '終端 status の判定が見つからない（構造変更時は本テストも更新すること）')
  const expr = driverPart.slice(idx, idx + 400)
  assert.match(expr, /rescueTimeoutQualityBlock/, 'フラグを立てても分類へ配線されていなければ blocked にならない')
  assert.match(expr, /'blocked'/)
})

test('救済 pending / active / 品質ブロックフラグ / timeout 出所は while ループの外で 1 回だけ宣言される', () => {
  // roundTimeoutExecReason は宣言をループ外で 1 回だけ行い、代入（リセット・一過性 reason 分岐の
  // 3 箇所）は複数箇所に散らばる契約のため、ここでは宣言のみを単一性チェックの対象に加える。
  for (const name of ['rescueRoundPending', 'rescueRoundActive', 'rescueTimeoutQualityBlock', 'roundTimeoutExecReason']) {
    const declarations = driverPart.match(new RegExp(`let ${name}\\b`, 'g')) ?? []
    assert.equal(declarations.length, 1, `${name} の宣言は 1 か所でなければならない`)
    const declIndex = driverPart.indexOf(`let ${name}`)
    assert.ok(declIndex < whileIndex, `${name} は while より前で宣言されていなければならない`)
  }
})

// ---------------------------------------------------------------------------
// 合成シナリオ: 純粋関数単体では検知できない「救済ラウンド中に merge-exec 由来の timeout 写像が
// 発生する」合成経路の回帰検証。
// 模擬ラウンド: rescueRoundActive = true / monitor が 'ready' を返す /
// classifyMergeExecDispatch(reason, undefined) で lastState を 'timeout' へ写像 /
// roundTimeoutExecReason にリテラル reason を代入（実装の一過性 reason 分岐と同じ配線） /
// monitorsLeft === 0 でループ退出 /
// reconcileRescueRoundState(lastState, rescueRoundActive, roundTimeoutExecReason) を評価。
//
// 契約更新（agent-cli-skills#365）: #248 時点はこのシナリオが blocked 終端になることを固定して
// いたが、#365 でこれを halt カウント対象の failed へ反転させた（受入基準 4）。#248 が守った
// 「判定はループ退出後の単一 choke point で 1 回だけ」という構造自体は変えていない —— 変えたのは
// timeout の出所を区別する分類内容である。
// ---------------------------------------------------------------------------

// 実装の terminalStatus 算出式（choke point 付近）と同じ式をここで意図的に再実装し、qualityBlock /
// timeoutOrigin が実際の終端 status へ届くところまで検証する（配線だけでなく最終判定結果を担保
// するため）。この複製は実装式との乖離（ドリフト）に対して無防備 —— 実装側が式を変更してもこの
// 関数までは追随しないため、乖離検知は上の「救済 timeout フラグが終端 status の blocked 分類に
// 配線されている」テスト（driverPart のソース走査で rescueTimeoutQualityBlock / 'blocked' の
// 実在を見る）が担う。両テストは相補的であり、どちらか一方だけでは合成回帰を検知できない。
function computeTerminalStatus({ routingErrorDetected, mergedButIssueOpen, lastState, lastBlockedReason, rescueTimeoutQualityBlock }) {
  const blockedIsRecoverable = lastState === 'blocked' && lastBlockedReason === 'quality'
  return !routingErrorDetected
    && (mergedButIssueOpen || blockedIsRecoverable || lastState === 'unresolved-comments' || rescueTimeoutQualityBlock)
    ? 'blocked'
    : 'failed'
}

for (const reason of ['head-moved', 'checks-not-green', 'merge-failed']) {
  test(`合成シナリオ: 救済ラウンド中の merge-exec reason '${reason}' 写像は failed 終端になる（受入基準 4・halt カウント対象）`, () => {
    // monitor は 'ready' を返した想定（監視自体は成立したが、merge-exec が一過性理由でマージを
    // 見送った）。classifyMergeExecDispatch が lastState を 'timeout' へ上書きする。
    const dispatched = classifyMergeExecDispatch(reason, undefined)
    assert.equal(dispatched.lastState, 'timeout')
    // 救済ラウンド中（rescueRoundActive: true）で、この timeout の出所（roundTimeoutExecReason）
    // を reason（リテラル）として判定する。
    const reconciled = mod.reconcileRescueRoundState(dispatched.lastState, true, reason)
    assert.equal(reconciled.terminate, false, '#365: merge-exec 由来は品質ブロックへ終端させない')
    assert.equal(reconciled.qualityBlock, false, '#365: qualityBlock を立てると halt カウントが迂回される')
    assert.equal(reconciled.timeoutOrigin, 'merge-exec')
    const terminalStatus = computeTerminalStatus({
      routingErrorDetected: false,
      mergedButIssueOpen: false,
      lastState: dispatched.lastState,
      lastBlockedReason: dispatched.lastBlockedReason,
      rescueTimeoutQualityBlock: reconciled.qualityBlock,
    })
    assert.equal(terminalStatus, 'failed', '#248 時点の実装ではここが blocked に化け、halt 防御を迂回していた（#365 の P1）')
  })

  test(`対称ケース: 救済ラウンド外での merge-exec reason '${reason}' 写像は failed のまま（パリティ確認）`, () => {
    const dispatched = classifyMergeExecDispatch(reason, undefined)
    assert.equal(dispatched.lastState, 'timeout')
    // 救済ラウンド外（rescueRoundActive: false）では品質ブロックへ写像してはならない
    // （実際の一過性失敗を隠さないため）。#365 の救済ラウンド内 merge-exec 由来判定と結果が
    // 一致すること自体が「新しい厳格化ではなくパリティである」という設計根拠の裏付けになる。
    const reconciled = mod.reconcileRescueRoundState(dispatched.lastState, false, reason)
    assert.equal(reconciled.terminate, false)
    assert.equal(reconciled.qualityBlock, false)
    assert.equal(reconciled.timeoutOrigin, 'none')
    const terminalStatus = computeTerminalStatus({
      routingErrorDetected: false,
      mergedButIssueOpen: false,
      lastState: dispatched.lastState,
      lastBlockedReason: dispatched.lastBlockedReason,
      rescueTimeoutQualityBlock: reconciled.qualityBlock,
    })
    assert.equal(terminalStatus, 'failed')
  })
}

test('負のコントロール: 救済ラウンド中・monitor 由来の timeout（reason 空）は blocked 終端のまま維持される（rust-ai-library#681 / #246 の回帰防止）', () => {
  // #365 は merge-exec 由来だけを failed へ倒す変更であり、monitor 自身が観測に失敗した
  // ケースまで一律 failed にすると rust-ai-library#681 / #246 が固定した挙動が壊れる。
  const reconciled = mod.reconcileRescueRoundState('timeout', true, '')
  assert.equal(reconciled.terminate, true)
  assert.equal(reconciled.qualityBlock, true)
  assert.equal(reconciled.timeoutOrigin, 'monitor')
  const terminalStatus = computeTerminalStatus({
    routingErrorDetected: false,
    mergedButIssueOpen: false,
    lastState: 'timeout',
    lastBlockedReason: undefined,
    rescueTimeoutQualityBlock: reconciled.qualityBlock,
  })
  assert.equal(terminalStatus, 'blocked', '救済ラウンドごと削除する過剰修正でもこのテストは緑になり得るため、上の merge-exec 系テストと対で維持する')
})

// ---------------------------------------------------------------------------
// 片側波括弧混入時の境界不変性（Issue #336 受け入れ条件 1・2）
//
// 上流 Fandhe-AI/brain-training-app #81 の codex-review 指摘: 旧実装は文字列・コメント・
// テンプレートリテラルの区別なくすべての `{`/`}` をカウントしていたため、対象ループ（テンプレート
// リテラル・日本語コメントを多用する）に片側だけの波括弧を含む文字列・コメントが 1 行入るだけで
// loopEndIndex が実体と乖離し得た。
//
// マーカー方式では境界計算が波括弧の対応付けを一切行わないため、この乖離は原理的に起きない。
// それでもフィクスチャを残すのは、将来この境界計算が波括弧カウントへ戻された場合に**必ず落ちる**
// ようにするためである（各フィクスチャは波括弧の収支が片側に偏っており、深さを数える実装では
// 結果が必ずずれる）。テストの teeth はここにある。
// ---------------------------------------------------------------------------

test('境界計算に依存しない不変条件: 監視ループの閉じ括弧はインデント2の行頭にある', () => {
  assert.equal(driverPart.slice(loopEndIndex - 3, loopEndIndex + 1), '\n  }')
})

// 注入位置はループ本体内でなければならない。裸の indexOf('monitorsLeft--') はループより前の
// 出現に当たり得てオフセット計算が非自明な理由で狂うため、fromIndex 付きで探す
// （293〜299 行の構造アサーションと同じ探索パターン）。
const MONITORS_LEFT_DECR = 'monitorsLeft--'
const braceInjectionPos = driverPart.indexOf(MONITORS_LEFT_DECR, loopOpenBraceIndex) + MONITORS_LEFT_DECR.length
assert.ok(
  braceInjectionPos > loopOpenBraceIndex && braceInjectionPos < loopEndIndex,
  '注入位置はループ本体内でなければならない',
)

// 4 キャリア（行コメント・ブロックコメント・シングルクォート文字列・テンプレートリテラル）×
// 2 フィクスチャ（正味 } が 1 個多い / 正味 { が 1 個多い）。`{` と `}` を両方入れて相殺すると
// naive 走査も偶然一致してしまい負のコントロールが無意味化するため、各キャリアは片側のみを含む。
// 波括弧以外の典型的な lexer トラップ（コメント内アポストロフィ・ブロックコメント内の裸クォート・
// テンプレートの `${...}` ネスト）も同梱する。
const BRACE_INJECTION_CARRIERS = [
  {
    name: '行コメント',
    a: "\n      // don't crash on apostrophe; 片側の閉じ括弧のみ }\n",
    b: '\n      // 片側の開き括弧のみ {\n',
  },
  {
    name: 'ブロックコメント',
    a: '\n      /* ブロックコメント内の裸のクォート " と閉じ括弧のみ } */\n',
    b: '\n      /* ブロックコメント内の裸のクォート " と開き括弧のみ { */\n',
  },
  {
    name: 'シングルクォート文字列',
    a: "\n      const _injStr = '}' // 文字列キャリア\n",
    b: "\n      const _injStr = '{' // 文字列キャリア\n",
  },
  {
    name: 'テンプレートリテラル',
    a: '\n      const _injTpl = `${JSON.stringify({ a: 1 })} と文字列としての }`\n',
    b: '\n      const _injTpl = `${JSON.stringify({ a: 1 })} と文字列としての {`\n',
  },
]

/**
 * 変異後のソースに対して、この test ファイルが本番で使うのと同じ手順で境界を求め直す。
 * 実装が波括弧カウントへ戻された場合にここが必ずずれるよう、フィクスチャは波括弧の収支を
 * 片側へ偏らせる。
 */
function locateLoopEnd(text) {
  const endMarkerIndex = text.indexOf(LOOP_END_MARKER)
  assert.notEqual(endMarkerIndex, -1, '変異後も終了マーカーは残っていなければならない')
  return text.lastIndexOf('}', endMarkerIndex)
}

function assertBraceInjectionInvariant(injected) {
  const braceDelta = injected.split('{').length - injected.split('}').length
  assert.notEqual(braceDelta, 0, '注入文字列は片側の波括弧のみを含み、相殺してはならない（波括弧カウント実装への退行を必ず検出するため）')
  const mutated = driverPart.slice(0, braceInjectionPos) + injected + driverPart.slice(braceInjectionPos)
  const got = locateLoopEnd(mutated)
  // (a) 正: 挿入長ぶんだけずれた「同じ閉じ括弧」を指す。
  assert.equal(got, loopEndIndex + injected.length, '境界は挿入長ぶんだけずれた同じ閉じ括弧を指さなければならない')
  // (b) 境界計算に依存しない錨: 変異後の結果もインデント 2 の閉じ括弧行に着地する。
  assert.equal(mutated.slice(got - 3, got + 1), '\n  }', '変異後もインデント2の閉じ括弧行に着地しなければならない')
}

for (const carrier of BRACE_INJECTION_CARRIERS) {
  test(`片側波括弧の混入（${carrier.name}・正味 } が1個多い）でも境界判定は不変`, () => {
    assertBraceInjectionInvariant(carrier.a)
  })

  test(`片側波括弧の混入（${carrier.name}・正味 { が1個多い）でも境界判定は不変`, () => {
    assertBraceInjectionInvariant(carrier.b)
  })
}
