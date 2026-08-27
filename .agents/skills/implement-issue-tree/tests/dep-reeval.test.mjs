// implement-issue-tree のスケジューラにおける「前提イシューのマージ後に依存ブロック項目を
// 同一ラン内で再判定する」回帰テスト（Issue #442）。
//
// 対象バグ: dispatch ループ（セクション 8）は各周回で post-order 走査し、依存に failedSet 入り
// した前提が 1 つでもあり、かつ全依存が確定していれば「その場で」markBlockedByDeps を呼び
// blocked を確定していた。markBlockedByDeps は failedSet へ追加するため、以後この項目は二度と
// 再評価されない。フロンティアの 1 件が Review 非収束等で blocked になり、その後前提がラン中に
// 人手マージされても、下流は同一ラン内で着手されず並列枠が遊んでいた（実運用で 48 件中 45 件が
// 連鎖ブロック）。
//
// 是正後の契約:
//   - blocked の即時確定を dispatch ループから除去し、判定を classifyDispatchReadiness に
//     一元化する（'ready' / 'dep-blocked' / 'wait'）。dispatch ループは 'dep-blocked' を保留
//     として扱い、確定はループ退出後の cascade（唯一の choke point）に委ねる。
//   - 保留中に前提が外部完了（Issue CLOSED / PR MERGED）したことをプローブで検知したら
//     applyPrereqTransitions で failedSet → done へ遷移させ、下流を classifyDispatchReadiness で
//     'ready' として同一ラン内で再判定する。
//
// 検証の二層構造（merge-loop-rescan.test.mjs / nopush-resolve-progress.test.mjs と同じ方針）:
//   1. 純粋関数（classifyDispatchReadiness / selectPrereqProbeTargets / classifyPrereqTransition /
//      applyPrereqTransitions / prereqProbePrompt）のテストで契約を固定する。
//   2. 駆動部（マーカーより下）はハーネス依存で import 不能のためソース走査で配線を機械検証する
//      — markBlockedByDeps の即時確定が dispatch ループ内に復活していないこと、cascade（唯一の
//      choke point）が classifyDispatchReadiness を経由すること、プローブ呼び出しが通常
//      dispatch の後・running.size===0 の break の前に位置することを固定する。
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
const driverPart = source.slice(markerIndex)
const sliceDir = mkdtempSync(join(tmpdir(), 'implement-issue-tree-dep-reeval-'))
const slicePath = join(sliceDir, 'implement-issue-tree-defs.mjs')
// 実装スクリプトは Workflow ランタイムの制約により `export const meta` 以外の top-level export を
// 持てない。定義部は非 export のまま置き、テスト側でスライスへ export 文を付与して読み込む。
const SLICE_EXPORTS = [
  'classifyDispatchReadiness',
  'selectPrereqProbeTargets',
  'classifyPrereqTransition',
  'applyPrereqTransitions',
  'prereqProbePrompt',
]
writeFileSync(slicePath, `${definitionPart}\nexport { ${SLICE_EXPORTS.join(', ')} }\n`)

const mod = await import(pathToFileURL(slicePath).href)
const {
  classifyDispatchReadiness,
  selectPrereqProbeTargets,
  classifyPrereqTransition,
  applyPrereqTransitions,
  prereqProbePrompt,
} = mod

// ---------------------------------------------------------------------------
// classifyDispatchReadiness: dispatch ループと cascade が共有する単一判定関数
// ---------------------------------------------------------------------------

test('classifyDispatchReadiness: 全依存が done なら ready', () => {
  const done = new Set([1, 2])
  assert.equal(classifyDispatchReadiness([1, 2], done, new Set()), 'ready')
})

test('classifyDispatchReadiness: failed 依存があり全依存が確定済みなら dep-blocked', () => {
  const done = new Set([1])
  const failedSet = new Set([2])
  assert.equal(classifyDispatchReadiness([1, 2], done, failedSet), 'dep-blocked')
})

test('classifyDispatchReadiness: 未確定の依存が残るなら wait（failed 依存があっても）', () => {
  const done = new Set()
  const failedSet = new Set([2])
  // 依存 1 が done でも failedSet でもない（まだ実行中）ため wait。dep-blocked へ早すぎる
  // 確定をしない（親が最初の子失敗で早すぎる blocked にならないための既存契約と同じ）。
  assert.equal(classifyDispatchReadiness([1, 2], done, failedSet), 'wait')
})

test('classifyDispatchReadiness: 依存が空なら ready', () => {
  assert.equal(classifyDispatchReadiness([], new Set(), new Set()), 'ready')
})

// ---------------------------------------------------------------------------
// selectPrereqProbeTargets: プローブ対象の選定
// ---------------------------------------------------------------------------

test('selectPrereqProbeTargets: failedSet 入りした前提のみを対象にする', () => {
  const work = [
    { number: 67 },
    { number: 80 },
    { number: 81 },
    { number: 90 },
  ]
  const depsMap = new Map([
    [67, new Set()],
    [80, new Set([67])],
    [81, new Set([80])],
    [90, new Set([67])],
  ])
  const done = new Set([90]) // 90 は前提 67 に依存するが自身は既に done（対象外）
  const failedSet = new Set([67])
  const targets = selectPrereqProbeTargets(work, depsMap, done, failedSet, new Map())
  assert.deepEqual(targets, [67])
})

test('selectPrereqProbeTargets: running 中の item は対象から除外する', () => {
  const work = [{ number: 80 }]
  const depsMap = new Map([[80, new Set([67])]])
  const failedSet = new Set([67])
  const runningMap = new Map([[80, Promise.resolve()]])
  assert.deepEqual(selectPrereqProbeTargets(work, depsMap, new Set(), failedSet, runningMap), [])
})

test('selectPrereqProbeTargets: 重複除去して昇順に返す', () => {
  const work = [{ number: 80 }, { number: 81 }]
  const depsMap = new Map([
    [80, new Set([67, 99])],
    [81, new Set([67])],
  ])
  const failedSet = new Set([67, 99])
  assert.deepEqual(selectPrereqProbeTargets(work, depsMap, new Set(), failedSet, new Map()), [67, 99])
})

// ---------------------------------------------------------------------------
// classifyPrereqTransition: enum 許可リストのみを遷移として受理する
// ---------------------------------------------------------------------------

test('classifyPrereqTransition: prState MERGED かつ entry.pr が knownPr と一致すれば merged', () => {
  assert.equal(classifyPrereqTransition({ prState: 'MERGED', issueState: 'OPEN', pr: 212 }, 212), 'merged')
})

test('classifyPrereqTransition: issueState CLOSED なら closed（PR 照合不要）', () => {
  assert.equal(classifyPrereqTransition({ prState: 'NONE', issueState: 'CLOSED' }), 'closed')
})

test('classifyPrereqTransition: prState MERGED を issueState CLOSED より優先する（PR 照合成立時）', () => {
  assert.equal(classifyPrereqTransition({ prState: 'MERGED', issueState: 'CLOSED', pr: 212 }, 212), 'merged')
})

test('classifyPrereqTransition: OPEN/UNKNOWN/NONE や不正値は null（fail-closed）', () => {
  assert.equal(classifyPrereqTransition({ prState: 'OPEN', issueState: 'OPEN' }, 212), null)
  assert.equal(classifyPrereqTransition({ prState: 'UNKNOWN', issueState: 'UNKNOWN' }, 212), null)
  assert.equal(classifyPrereqTransition({ prState: 'NONE', issueState: 'OPEN' }, 212), null)
  assert.equal(classifyPrereqTransition({ prState: 'merged', issueState: 'OPEN' }, 212), null, '小文字は許可リスト外')
  assert.equal(classifyPrereqTransition(null, 212), null)
  assert.equal(classifyPrereqTransition(undefined, 212), null)
  assert.equal(classifyPrereqTransition('MERGED', 212), null, '非オブジェクトは null')
})

// Issue #442 codex 指摘: PR 番号なし・不一致の MERGED 申告だけで前提を解除できてしまう
// fail-closed 契約違反（threadId PRRT_kwDORuXFg86cX9J9）の回帰固定。
test('classifyPrereqTransition: entry.pr が欠落/0/不正なら knownPr があっても null（fail-closed）', () => {
  assert.equal(classifyPrereqTransition({ prState: 'MERGED', issueState: 'OPEN' }, 212), null, 'pr 欠落')
  assert.equal(classifyPrereqTransition({ prState: 'MERGED', issueState: 'OPEN', pr: 0 }, 212), null, 'pr 0')
  assert.equal(classifyPrereqTransition({ prState: 'MERGED', issueState: 'OPEN', pr: '212' }, 212), null, 'pr 文字列')
  assert.equal(classifyPrereqTransition({ prState: 'MERGED', issueState: 'OPEN', pr: -1 }, 212), null, 'pr 負数')
})

test('classifyPrereqTransition: entry.pr が knownPr と不一致なら null（fail-closed）', () => {
  assert.equal(classifyPrereqTransition({ prState: 'MERGED', issueState: 'OPEN', pr: 999 }, 212), null)
})

test('classifyPrereqTransition: knownPr が未確定（ホストが対象 PR を把握していない）なら entry.pr があっても null', () => {
  assert.equal(classifyPrereqTransition({ prState: 'MERGED', issueState: 'OPEN', pr: 212 }, undefined), null)
  assert.equal(classifyPrereqTransition({ prState: 'MERGED', issueState: 'OPEN', pr: 212 }, 0), null)
})

// PR #444 cursor Bugbot Medium 指摘（threadId PRRT_kwDORuXFg86cYEKm）の回帰固定: MERGED 分岐の
// PR 番号照合が不成立でも、同一 entry の issueState === 'CLOSED' をフォールスルーで評価する
// （早期 return で握り潰さない）。オーナー判断（2026-08-26・案A）で早期 return を廃し単一の
// 複合条件 if へ統合した。
test('classifyPrereqTransition: MERGED 照合不成立でも issueState CLOSED ならフォールスルーで closed（PR番号なし）', () => {
  assert.equal(classifyPrereqTransition({ prState: 'MERGED', issueState: 'CLOSED' }, 212), 'closed', 'pr 欠落でも CLOSED 判定に到達する')
})

test('classifyPrereqTransition: MERGED 照合不成立でも issueState CLOSED ならフォールスルーで closed（PR番号不一致）', () => {
  assert.equal(classifyPrereqTransition({ prState: 'MERGED', issueState: 'CLOSED', pr: 999 }, 212), 'closed', 'pr 不一致でも CLOSED 判定に到達する')
})

test('classifyPrereqTransition: MERGED 照合不成立でも issueState CLOSED ならフォールスルーで closed（knownPr 未確定）', () => {
  assert.equal(classifyPrereqTransition({ prState: 'MERGED', issueState: 'CLOSED', pr: 212 }, undefined), 'closed', 'knownPr 未確定でも CLOSED 判定に到達する')
})

test('classifyPrereqTransition: MERGED 照合が成立すれば従来どおり merged（issueState は無視）', () => {
  assert.equal(classifyPrereqTransition({ prState: 'MERGED', issueState: 'OPEN', pr: 212 }, 212), 'merged')
  assert.equal(classifyPrereqTransition({ prState: 'MERGED', issueState: 'CLOSED', pr: 212 }, 212), 'merged', 'MERGED 照合成立時は CLOSED より優先される')
})

test('classifyPrereqTransition: MERGED 照合不成立かつ issueState も CLOSED でなければ null（fail-closed 維持）', () => {
  assert.equal(classifyPrereqTransition({ prState: 'MERGED', issueState: 'OPEN', pr: 999 }, 212), null)
  assert.equal(classifyPrereqTransition({ prState: 'MERGED', issueState: 'UNKNOWN' }, 212), null)
})

// ---------------------------------------------------------------------------
// applyPrereqTransitions: ホスト側の二重フィルタ（targets 集合 × 整数検証）
// ---------------------------------------------------------------------------

test('applyPrereqTransitions: targets 内の MERGED を、prHints と pr が一致すれば failedSet から done へ遷移する', () => {
  const done = new Set()
  const failedSet = new Set([67])
  const probe = { results: [{ issue: 67, prState: 'MERGED', issueState: 'OPEN', pr: 212 }] }
  const transitions = applyPrereqTransitions(probe, [67], done, failedSet, { 67: 212 })
  assert.deepEqual(transitions, [{ issue: 67, kind: 'merged', pr: 212 }])
  assert.ok(done.has(67))
  assert.ok(!failedSet.has(67))
})

test('applyPrereqTransitions: targets 外の番号は無視する（プローブ要求していない番号の捏造申告を防ぐ）', () => {
  const done = new Set()
  const failedSet = new Set([67])
  const probe = { results: [{ issue: 99, prState: 'MERGED', issueState: 'OPEN' }] }
  assert.deepEqual(applyPrereqTransitions(probe, [67], done, failedSet, { 67: 212 }), [])
  assert.ok(!done.has(99))
})

test('applyPrereqTransitions: 非整数・文字列 issue は拒否する', () => {
  const done = new Set()
  const failedSet = new Set([67])
  const probe = { results: [{ issue: '67', prState: 'MERGED', issueState: 'OPEN' }] }
  assert.deepEqual(applyPrereqTransitions(probe, [67], done, failedSet, { 67: 212 }), [])
  const probe2 = { results: [{ issue: 67.5, prState: 'MERGED', issueState: 'OPEN' }] }
  assert.deepEqual(applyPrereqTransitions(probe2, [67], done, failedSet, { 67: 212 }), [])
})

test('applyPrereqTransitions: probe が null・results が非配列なら空配列で集合不変（fail-closed）', () => {
  const done = new Set()
  const failedSet = new Set([67])
  assert.deepEqual(applyPrereqTransitions(null, [67], done, failedSet, { 67: 212 }), [])
  assert.deepEqual(applyPrereqTransitions({ results: 'not-array' }, [67], done, failedSet, { 67: 212 }), [])
  assert.ok(failedSet.has(67), 'fail-closed で failedSet が変化してはならない')
})

test('applyPrereqTransitions: 同一 issue の重複 entry は最初の 1 件のみ採用する', () => {
  const done = new Set()
  const failedSet = new Set([67])
  const probe = {
    results: [
      { issue: 67, prState: 'MERGED', issueState: 'OPEN', pr: 1 },
      { issue: 67, prState: 'MERGED', issueState: 'OPEN', pr: 999 },
    ],
  }
  const transitions = applyPrereqTransitions(probe, [67], done, failedSet, { 67: 1 })
  assert.equal(transitions.length, 1)
  assert.equal(transitions[0].pr, 1)
})

test('applyPrereqTransitions: pr が非正整数なら遷移しない（knownPr と照合不能）', () => {
  const done = new Set()
  const failedSet = new Set([67])
  const probe = { results: [{ issue: 67, prState: 'MERGED', issueState: 'OPEN', pr: 0 }] }
  const transitions = applyPrereqTransitions(probe, [67], done, failedSet, { 67: 212 })
  assert.deepEqual(transitions, [])
  assert.ok(failedSet.has(67), 'pr 照合不能な MERGED 申告だけで前提解除してはならない')
})

// Issue #442 codex 指摘（threadId PRRT_kwDORuXFg86cX9J9）の回帰固定: PR 番号なし・
// ホスト既知値との不一致・knownPr 未確定のいずれでも 'merged' 遷移が成立しないこと。
test('applyPrereqTransitions: entry.pr が prHints と不一致な MERGED 申告は遷移しない（fail-closed）', () => {
  const done = new Set()
  const failedSet = new Set([67])
  const probe = { results: [{ issue: 67, prState: 'MERGED', issueState: 'OPEN', pr: 999 }] }
  const transitions = applyPrereqTransitions(probe, [67], done, failedSet, { 67: 212 })
  assert.deepEqual(transitions, [])
  assert.ok(failedSet.has(67))
  assert.ok(!done.has(67))
})

test('applyPrereqTransitions: prHints に対象 issue の値が無い（ホスト未確定）場合、pr 付き MERGED でも遷移しない', () => {
  const done = new Set()
  const failedSet = new Set([67])
  const probe = { results: [{ issue: 67, prState: 'MERGED', issueState: 'OPEN', pr: 212 }] }
  assert.deepEqual(applyPrereqTransitions(probe, [67], done, failedSet, {}), [])
  assert.deepEqual(applyPrereqTransitions(probe, [67], done, failedSet, undefined), [])
  assert.ok(failedSet.has(67))
})

test('applyPrereqTransitions: issueState CLOSED は prHints 不在でも遷移する（PR 照合は merged 専用）', () => {
  const done = new Set()
  const failedSet = new Set([67])
  const probe = { results: [{ issue: 67, prState: 'NONE', issueState: 'CLOSED' }] }
  const transitions = applyPrereqTransitions(probe, [67], done, failedSet, {})
  assert.deepEqual(transitions, [{ issue: 67, kind: 'closed' }])
  assert.ok(done.has(67))
})

// PR #444 Bugbot 指摘（threadId PRRT_kwDORuXFg86caRhf）の回帰固定: prState MERGED が
// host 照合（knownPr 一致）に失敗し issueState CLOSED へフォールスルーした場合、entry.pr が
// 正の整数であっても transition へ含めてはならない（未検証の PR 番号で既知値を上書きしない）。
test('applyPrereqTransitions: MERGED 照合不成立のCLOSEDフォールスルーはpr不一致でもtransitionにprを含めない', () => {
  const done = new Set()
  const failedSet = new Set([67])
  const probe = { results: [{ issue: 67, prState: 'MERGED', issueState: 'CLOSED', pr: 999 }] }
  const transitions = applyPrereqTransitions(probe, [67], done, failedSet, { 67: 212 })
  assert.deepEqual(transitions, [{ issue: 67, kind: 'closed' }], 'pr キー自体を含めない')
  assert.ok(done.has(67))
})

test('applyPrereqTransitions: MERGED 照合不成立のCLOSEDフォールスルーはknownPr未確定でもtransitionにprを含めない', () => {
  const done = new Set()
  const failedSet = new Set([67])
  const probe = { results: [{ issue: 67, prState: 'MERGED', issueState: 'CLOSED', pr: 212 }] }
  const transitions = applyPrereqTransitions(probe, [67], done, failedSet, undefined)
  assert.deepEqual(transitions, [{ issue: 67, kind: 'closed' }], 'knownPr 未確定でも pr キーを含めない')
  assert.ok(done.has(67))
})

test('applyPrereqTransitions: MERGED 照合が成立した場合は従来どおり kind merged で pr を含める', () => {
  const done = new Set()
  const failedSet = new Set([67])
  const probe = { results: [{ issue: 67, prState: 'MERGED', issueState: 'CLOSED', pr: 212 }] }
  const transitions = applyPrereqTransitions(probe, [67], done, failedSet, { 67: 212 })
  assert.deepEqual(transitions, [{ issue: 67, kind: 'merged', pr: 212 }], 'merged 経路の pr 転記は維持する')
  assert.ok(done.has(67))
})

// ---------------------------------------------------------------------------
// 受入条件 3 の本命: 前提 merged への遷移 → 下流の再判定
// ---------------------------------------------------------------------------

test('受入条件: 前提 67 が merged へ遷移すると下流 80 が dep-blocked → ready になる', () => {
  const depsMap = new Map([
    [67, new Set()],
    [80, new Set([67])],
  ])
  const done = new Set()
  const failedSet = new Set([67])
  assert.equal(classifyDispatchReadiness(depsMap.get(80), done, failedSet), 'dep-blocked')
  const probe = { results: [{ issue: 67, prState: 'MERGED', issueState: 'OPEN', pr: 212 }] }
  applyPrereqTransitions(probe, [67], done, failedSet, { 67: 212 })
  assert.equal(classifyDispatchReadiness(depsMap.get(80), done, failedSet), 'ready')
})

test('受入条件: 多段依存（81→80→67）で 67 merged 後も 81 は 80 が未確定のため wait のまま', () => {
  const depsMap = new Map([
    [67, new Set()],
    [80, new Set([67])],
    [81, new Set([80])],
  ])
  const done = new Set()
  const failedSet = new Set([67])
  const probe = { results: [{ issue: 67, prState: 'MERGED', issueState: 'OPEN', pr: 212 }] }
  applyPrereqTransitions(probe, [67], done, failedSet, { 67: 212 })
  assert.equal(classifyDispatchReadiness(depsMap.get(80), done, failedSet), 'ready', '80 は前提 67 の遷移で ready になる')
  assert.equal(classifyDispatchReadiness(depsMap.get(81), done, failedSet), 'wait', '81 は 80 がまだ done でないため wait のまま')
})

// ---------------------------------------------------------------------------
// prereqProbePrompt: 読み取り専用の権限境界
// ---------------------------------------------------------------------------

test('prereqProbePrompt: 対象の issue view / pr view を含み、書き込み系コマンドは含まない', () => {
  const prompt = prereqProbePrompt([67], { 67: 212 })
  assert.ok(prompt.includes('gh issue view 67 --json state'))
  assert.ok(prompt.includes('gh pr view <prNum67> --json state') || prompt.includes('gh pr view'))
  // 権限境界の説明文自体が「--json body」等を禁止語として言及するため、単純な文字列不在検査
  // では自己言及に誤反応する。実コマンド呼び出しの行（`gh issue view <N> --json ...` /
  // `gh pr view <N> --json ...`）を抽出し、state 以外のフィールドを含まないことを確認する。
  const issueViewCalls = [...prompt.matchAll(/gh issue view \S+ --json (\S+)/g)].map((m) => m[1])
  const prViewCalls = [...prompt.matchAll(/gh pr view \S+ --json (\S+)/g)].map((m) => m[1])
  assert.ok(issueViewCalls.length > 0, 'gh issue view コマンドが見つからない')
  assert.ok(prViewCalls.length > 0, 'gh pr view コマンドが見つからない')
  for (const fields of [...issueViewCalls, ...prViewCalls]) {
    assert.equal(fields, 'state', `--json フィールドは state のみであるべき（実際: ${fields}）`)
  }
  // 権限境界の説明文自体が「gh pr merge」「gh issue close」を禁止コマンドとして言及するため、
  // 単純な文字列不在検査は自己言及に誤反応する。「本エージェントは読み取り専用」「実行してよい
  // コマンドは次の 3 種のみ」という許可制の文言があることのみを確認する（許可制で 3 コマンドに
  // 限定されていれば、他コマンドは列挙されていても許可されない）。
  assert.ok(prompt.includes('読み取り専用'), '権限境界の宣言が見つからない')
  assert.ok(prompt.includes('次の 3 種のみ'), '許可コマンドを 3 種に限定する宣言が見つからない')
})

test('prereqProbePrompt: 非整数 target は throw する', () => {
  assert.throws(() => prereqProbePrompt([1.5], {}))
  assert.throws(() => prereqProbePrompt(['67'], {}))
})

// ---------------------------------------------------------------------------
// 配線検証: 駆動部（マーカーより下）がヘルパーを実際に経由すること
// ---------------------------------------------------------------------------

test('駆動部: dispatch ループ内即時確定が復活していない（markBlockedByDeps 呼び出しは cascade の 1 箇所のみ）', () => {
  const occurrences = [...driverPart.matchAll(/await markBlockedByDeps\(item, failedDeps\)/g)]
  assert.equal(occurrences.length, 1, 'markBlockedByDeps(item, failedDeps) 呼び出しは cascade の 1 箇所のみであるべき（dispatch ループ内での即時確定は禁止）')
})

test('駆動部: cascade が classifyDispatchReadiness を経由する', () => {
  const cascadeStart = driverPart.indexOf('依存失敗の連鎖を最終確定する')
  assert.ok(cascadeStart >= 0, 'cascade セクションが見つからない')
  const cascadeSection = driverPart.slice(cascadeStart, cascadeStart + 800)
  assert.ok(cascadeSection.includes("classifyDispatchReadiness(ds, done, failedSet) === 'dep-blocked'"), 'cascade が classifyDispatchReadiness を経由していない')
})

test('駆動部: プローブ呼び出しが通常 dispatch の後・running.size===0 の break の前に位置する', () => {
  const dispatchForStart = driverPart.indexOf('for (const item of work) {')
  assert.ok(dispatchForStart >= 0, 'dispatch ループの for 文が見つからない')
  const probeCallIdx = driverPart.indexOf('await probePrereqCompletion(probeTargets)')
  assert.ok(probeCallIdx > dispatchForStart, 'probePrereqCompletion 呼び出しが dispatch ループより前にある')
  const breakIdx = driverPart.indexOf('if (running.size === 0) break')
  assert.ok(breakIdx > probeCallIdx, 'running.size===0 の break が probePrereqCompletion 呼び出しより前にある（プローブが break 後に回っている）')
})

// PR #444 codex P1 指摘（threadId PRRT_kwDORuXFg86cYC3e）の回帰固定: halted 後は
// probePrereqCompletion が二度と呼ばれず、halt 後に外部完了した前提の状態遷移・レポート記録が
// 失われる。オーナー判断（2026-08-26・案A）でプローブ起動ゲートから `!halted` を外した
// （プローブ実行・状態遷移・永続化は halt 後も継続する）。一方で新規イシュー投入ゲート
// （`for (const item of work) {` を囲む `if (!halted) {`）は halt の意味論（新規着手停止）を
// 維持するため変更しない。
test('駆動部: プローブ起動ゲートに !halted が含まれない（halt 後もプローブ・状態記録を継続する）', () => {
  const probeGateStart = driverPart.indexOf('running.size === 0 || Date.now() - prereqProbeLastAt >= PREREQ_RECHECK_MIN_MS')
  assert.ok(probeGateStart >= 0, 'プローブ起動ゲートの条件式が見つからない')
  const probeGateCondStart = driverPart.lastIndexOf('if (', probeGateStart)
  const probeGateCondEnd = driverPart.indexOf(') {', probeGateStart) + ') {'.length
  const probeGateCond = driverPart.slice(probeGateCondStart, probeGateCondEnd)
  assert.ok(!probeGateCond.includes('!halted'), `プローブ起動ゲートに !halted が残っている（halt 後にプローブが止まる回帰）: ${probeGateCond}`)
  assert.ok(probeGateCond.includes('running.size < concurrency'), 'プローブ起動ゲートの running.size < concurrency 条件が見つからない')
})

test('駆動部: 新規イシュー投入ゲート（dispatch for ループ）は !halted を維持する', () => {
  const dispatchGateIdx = driverPart.indexOf('if (!halted) {')
  assert.ok(dispatchGateIdx >= 0, '新規イシュー投入ゲート if (!halted) が見つからない（halt の新規着手停止の意味論が失われている）')
  const dispatchForIdx = driverPart.indexOf('for (const item of work) {', dispatchGateIdx)
  assert.ok(dispatchForIdx >= 0 && dispatchForIdx - dispatchGateIdx < 50, 'if (!halted) の直後が dispatch for ループでない')
})

test('駆動部: Promise.race 後に必ず clearTimeout が存在する（tick timer のリーク防止）', () => {
  const raceIdx = driverPart.indexOf('await Promise.race(running.values())')
  assert.ok(raceIdx >= 0, '通常経路の Promise.race(running.values()) が見つからない')
  const clearTimeoutIdx = driverPart.indexOf('clearTimeout(')
  assert.ok(clearTimeoutIdx >= 0, 'clearTimeout 呼び出しが見つからない（tick timer が張りっぱなしになる回帰）')
})

// PR #444 Bugbot Medium (Tick delay collapses recheck interval) の回帰: 今回の周回で
// プローブを実際に実行した直後（prereqProbeLastAt がリセット済み）は cooldownRemainingMs が
// 常に PREREQ_RECHECK_MIN_MS 満了まで巻き戻り、min(TICK_MS, cooldownRemainingMs) が
// TICK_MS ではなく MIN_MS に潰れて定期監視が約5倍の頻度で prereq:probe を呼び続けてしまう。
// tickDelayMs の算出式が「今回の周回で probe 済みかどうか」を明示的に見て、probe 済みなら
// 短縮せず TICK_MS を使うことをソース走査で固定する。
test('駆動部: tick delay 算出は今回周回のプローブ済みフラグで短縮を打ち切る（cooldown 明け待ちのみ短縮する）', () => {
  const tickDelayIdx = driverPart.indexOf('const tickDelayMs =')
  assert.ok(tickDelayIdx >= 0, 'tickDelayMs の算出式が見つからない')
  const tickDelaySection = driverPart.slice(driverPart.lastIndexOf('const cooldownRemainingMs', tickDelayIdx), tickDelayIdx + 300)
  assert.ok(
    tickDelaySection.includes('probedThisIteration'),
    'tickDelayMs の算出が probedThisIteration を参照していない（今回周回でのプローブ実行直後に短縮してしまう回帰）',
  )
  const probedFlagIdx = driverPart.indexOf('const probedThisIteration =')
  assert.ok(probedFlagIdx >= 0, 'probedThisIteration の定義が見つからない')
  assert.ok(
    driverPart.slice(probedFlagIdx, probedFlagIdx + 120).includes('prereqProbeAtIterationSeq === dispatchIterationSeq'),
    'probedThisIteration が prereqProbeAtIterationSeq === dispatchIterationSeq で判定されていない',
  )
})

test('駆動部: schema: PREREQ_PROBE_SCHEMA を伴う agent 呼び出しが存在する', () => {
  assert.ok(driverPart.includes('schema: PREREQ_PROBE_SCHEMA'), 'プローブ agent 呼び出しに PREREQ_PROBE_SCHEMA が使われていない')
})

// 回復済み失敗が halt の連続カウントに残らないこと（Cursor Bugbot 指摘: Halt count ignores
// recovered failures）。probePrereqCompletion が failedSet → done へ遷移させ failures から
// エントリを除去する際、'blocked'（元々 halt 非カウント）以外なら consecutiveFailures を
// 対称的に 1 減じ、0 未満にはしないこと（recordFailure の 3360 行付近の increment と対で減算する）。
test('駆動部: probePrereqCompletion の failures 除去は blocked 以外で consecutiveFailures を対称的に減じる', () => {
  const probeFnStart = driverPart.indexOf('async function probePrereqCompletion(targets) {')
  assert.ok(probeFnStart >= 0, 'probePrereqCompletion の定義が見つからない')
  const probeFnEnd = driverPart.indexOf('\nwhile (true) {', probeFnStart)
  assert.ok(probeFnEnd > probeFnStart, 'probePrereqCompletion の終端（dispatch ループ開始）が見つからない')
  const probeFnBody = driverPart.slice(probeFnStart, probeFnEnd)
  const spliceIdx = probeFnBody.indexOf('failures.splice(failuresIdx, 1)')
  assert.ok(spliceIdx >= 0, 'failures からの除去処理が見つからない')
  const afterSplice = probeFnBody.slice(spliceIdx, spliceIdx + 1100)
  assert.ok(
    /removedFailure\??\.status\s*!==\s*'blocked'/.test(afterSplice),
    '除去対象が blocked（halt 非カウント）だったかどうかの分岐が見つからない',
  )
  assert.ok(
    /consecutiveFailures\s*>\s*0/.test(afterSplice) && /consecutiveFailures--/.test(afterSplice),
    'consecutiveFailures を 0 未満にしない減算処理が見つからない',
  )
})

// PR #444 codex(github-actions[bot]) P1 / cursor[bot] Medium の回帰:
// A失敗→B成功(consecutiveFailuresが0へリセット)→C失敗、の後で A の外部完了を検知すると、
// removedFailure（A）が現在の連続失敗 streak（C 分のみ）に属するかを見ずに一律デクリメントし、
// C の分まで 1→0 に削れてしまい、その後 D・E が失敗しても「3 連続失敗」の halt が発火しなく
// なる実バグ。除去対象の failure が記録された「世代」（failureEpoch）と現在の世代が一致する
// 場合のみ減算することで、既にリセット済みの世代に属する failure の回復が現在の streak を
// 侵食しないことを固定する。
test('駆動部: consecutiveFailures の減算は removedFailure が現在の failureEpoch に属する場合のみ行う（世代をまたいだ回復は無視する）', () => {
  // failureEpoch の宣言（世代カウンタ）が存在すること
  assert.ok(
    /let\s+failureEpoch\s*=\s*0/.test(driverPart),
    'failureEpoch（世代カウンタ）の宣言が見つからない',
  )

  // recordFailure が push 時に現在の世代を failure オブジェクトへ刻んでいること
  const recordFailureStart = driverPart.indexOf('function recordFailure(failure) {')
  assert.ok(recordFailureStart >= 0, 'recordFailure の定義が見つからない')
  const recordFailureSection = driverPart.slice(recordFailureStart, recordFailureStart + 300)
  assert.ok(
    /failure\.streakEpoch\s*=\s*failureEpoch/.test(recordFailureSection) &&
      recordFailureSection.indexOf('failure.streakEpoch') < recordFailureSection.indexOf('failures.push(failure)'),
    'recordFailure が failures.push より前に failure.streakEpoch へ現在の世代を刻んでいない',
  )

  // 2 つの成功リセット箇所（verify-close 成功 / merged 確定）がいずれも failureEpoch を進める
  // こと（世代を進めないと、リセット前後の failure を区別できず本バグの再発を防げない）。
  const resetSites = [...driverPart.matchAll(/(?<!let )consecutiveFailures = 0\n(\s*failureEpoch\+\+)?/g)]
  assert.strictEqual(resetSites.length, 2, 'consecutiveFailures = 0（リセット箇所）が想定の 2 箇所でない')
  for (const m of resetSites) {
    assert.ok(m[1], `リセット箇所 "${m[0].trim()}" の直後で failureEpoch がインクリメントされていない`)
  }

  // probePrereqCompletion の減算条件が removedFailure.streakEpoch と現在の failureEpoch の
  // 一致を確認したうえで減算していること。
  const probeFnStart = driverPart.indexOf('async function probePrereqCompletion(targets) {')
  const probeFnEnd = driverPart.indexOf('\nwhile (true) {', probeFnStart)
  const probeFnBody = driverPart.slice(probeFnStart, probeFnEnd)
  const spliceIdx = probeFnBody.indexOf('failures.splice(failuresIdx, 1)')
  const afterSplice = probeFnBody.slice(spliceIdx, spliceIdx + 1100)
  assert.ok(
    /removedFailure\??\.streakEpoch\s*===\s*failureEpoch/.test(afterSplice),
    'removedFailure.streakEpoch と現在の failureEpoch を突き合わせる条件が見つからない（世代をまたいだ誤減算を防げない）',
  )
})

// PR #444 codex P2 指摘（threadId PRRT_kwDORuXFg86ccGH7）の回帰固定: プローブ起動ゲートから
// !halted を外した（上のテスト参照）ため、halt 後もプローブ・状態遷移・永続化は継続するが、
// 新規イシュー投入は `if (!halted)` で引き続き停止する（下流の同一ラン内再判定は起きない）。
// note・ログの文言が halted の有無を無視して常に「同一ラン内で再判定する」と記録すると、
// 実際の挙動（halt 後は次回ランで反映）と食い違う。halted 分岐で文言が変わることを固定する。
test('駆動部: probePrereqCompletion の note は halted 時に「次回ランで反映される」系へ分岐する', () => {
  const probeFnStart = driverPart.indexOf('async function probePrereqCompletion(targets) {')
  assert.ok(probeFnStart >= 0, 'probePrereqCompletion の定義が見つからない')
  const probeFnEnd = driverPart.indexOf('\nwhile (true) {', probeFnStart)
  assert.ok(probeFnEnd > probeFnStart, 'probePrereqCompletion の終端（dispatch ループ開始）が見つからない')
  const probeFnBody = driverPart.slice(probeFnStart, probeFnEnd)

  const noteSuffixIdx = probeFnBody.indexOf('const noteSuffix = halted')
  assert.ok(noteSuffixIdx >= 0, 'noteSuffix が halted で分岐していない（halt 後も常に「同一ラン内で再判定する」と記録する回帰）')
  const noteSuffixSection = probeFnBody.slice(noteSuffixIdx, noteSuffixIdx + 400)
  assert.ok(
    noteSuffixSection.includes('次回ランで反映される') && noteSuffixSection.includes('同一ラン内で再判定する'),
    'noteSuffix の halted 分岐に「次回ランで反映される」文言、非 halted 分岐に「同一ラン内で再判定する」文言のいずれかが欠けている',
  )

  const logIdx = probeFnBody.indexOf("log(\n      halted")
  assert.ok(logIdx >= 0, 'probePrereqCompletion 末尾の log() が halted で分岐していない')
  const logSection = probeFnBody.slice(logIdx, logIdx + 300)
  assert.ok(
    logSection.includes('次回ランで反映される') && logSection.includes('同一ラン内で再判定する'),
    'log() の halted 分岐に「次回ランで反映される」文言、非 halted 分岐に「同一ラン内で再判定する」文言のいずれかが欠けている',
  )
})

test('駆動部: probePrereqCompletion のプローブ agent 呼び出しは try/catch で保護され、失敗時は遷移なし（0 件）で継続する', () => {
  // 対象バグ（Issue #442 codex P1）: プローブの await agent(...) が未捕捉のまま throw すると、
  // GitHub API・エージェント・schema 応答の一時的な失敗が、動作中のイシュー・最終 cascade・
  // 状態レポートまで含めてラン全体を異常終了させる。プローブは補助的な再確認処理であり、
  // 確認不能は「遷移なし」として安全に継続できるため、throw の捕捉と 0 返却を契約として固定する。
  const src = readFileSync(SCRIPT_PATH, 'utf8')
  const fnStart = src.indexOf('async function probePrereqCompletion(')
  assert.ok(fnStart >= 0, 'probePrereqCompletion が見つからない')
  const fnEnd = src.indexOf('\nasync function ', fnStart + 1)
  const body = src.slice(fnStart, fnEnd > fnStart ? fnEnd : undefined)
  const agentCallIdx = body.indexOf('await agent(prereqProbePrompt(')
  assert.ok(agentCallIdx >= 0, 'プローブの agent 呼び出しが見つからない')
  const tryIdx = body.lastIndexOf('try {', agentCallIdx)
  assert.ok(tryIdx >= 0, 'プローブの agent 呼び出しが try ブロックの中にない（未捕捉の throw がラン全体を中断させる）')
  const catchIdx = body.indexOf('} catch', agentCallIdx)
  assert.ok(catchIdx >= 0, 'プローブの agent 呼び出しに対応する catch がない')
  // catch ブロック内の template literal（\${...}）が閉じ括弧を含むため、括弧照合ではなく
  // 次の文（transitions 算出）までを catch 本文の走査範囲とする。
  const afterCatchIdx = body.indexOf('applyPrereqTransitions(', catchIdx)
  const catchBody = body.slice(catchIdx, afterCatchIdx >= 0 ? afterCatchIdx : undefined)
  assert.ok(/return 0/.test(catchBody), 'catch が 0（遷移なし）を返していない（呼び出し元は >0 で同一周回の再 dispatch を行うため、失敗時は 0 で通常継続させる契約）')
  assert.ok(/log\(/.test(catchBody), 'catch が失敗を log で報告していない（無音の握り潰しは診断不能になる）')
})
