// closed で skip する実装ノードの後始末（Issue #632）の回帰テスト。
//
// 背景: 既定の autoMerge: false で止まった PR を人手でマージすると、PR 本文の Closes #N で子イシューが自動 close し、再実行は
// そのノードを「すでに closed」で skip する。skip は状態ファイルを読まず掃除の入口も通らないため、blocked / monitoring が記録した
// 実装 worktree が残り、状態も blocked のままだった。
// 契約: PR のマージ済み（state == MERGED・結び付き成立・headRefOid 取得）を独立に確認できたときだけ、
//   worktree-remove.sh remove --mode discard --head <PR の head> で破棄し、そのあとで状態を merged へ更新する（掃除 → 状態の順）。
//   確認できない場合（未マージの CLOSED・結び付き不成立・HEAD 不一致や lock で保持・dryRun・状態の照合未成立）は状態も worktree も触らない。
//
// 三層: 1. 候補の特定（純粋関数 closedCleanupCandidate の表）  2. cleanupClosedMergedWorktree（stub agent・台帳と除外集合）
//       3. 実装スクリプト全体（tests/lib/stub-run.mjs）でのホスト結合。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { importDefinitions, runScript, BASE_ARGS } from './lib/stub-run.mjs'

globalThis.args = { parent: 1, skillDir: '/opt/skills/implement-issue-tree' }
const SHA = 'c'.repeat(40)
const OTHER = 'd'.repeat(40)
const WT = '/repo/wt/old'

const m = await importDefinitions(
  ['closedCleanupCandidate', 'closedCleanupAttemptCount', 'orderClosedCleanupCandidates', 'prBindingValuesFetched', 'closedCleanupGate', 'closedCleanupRetainedReason', 'CLOSED_CLEANUP_PER_RUN_MAX', 'AGENT_CALLS_CLOSED_CLEANUP', 'AGENT_CALLS_TERMINAL_BASE', 'AGENT_CALLS_PER_ISSUE', 'cleanupClosedMergedWorktree', 'worktreeRemoveCommand', 'sweepClosedWorktrees', 'sweepEligiblePaths', 'sweepHeldPaths', 'confirmedRemovedPaths', 'ensureBoundaryNonceSeed', 'sha256Hex', 'canonicalJson'],
  'closed-skip-cleanup',
)
globalThis.agent = async (_p, opts) => (opts.label === 'nonce:seed' ? { seedHex: '0'.repeat(64) } : null)
globalThis.log = () => {}
await m.ensureBoundaryNonceSeed()

// ---- 1. 候補の特定 ----

const ctx = { dryRun: false, verified: true, unverified: new Set() }
const impl = { number: 2, kind: 'implement' }
const savedOf = (extra = {}) => ({ status: 'blocked', branch: 'feat/2-x', worktree: WT, pr: 77, ...extra })

test('closedCleanupCandidate: blocked / monitoring で worktree と pr（無ければ unverifiedPr）を記録した実装ノードだけが候補になる', () => {
  assert.deepEqual(m.closedCleanupCandidate(impl, savedOf(), ctx), { pr: 77, worktree: WT, branch: 'feat/2-x' })
  assert.deepEqual(m.closedCleanupCandidate(impl, savedOf({ status: 'monitoring' }), ctx), { pr: 77, worktree: WT, branch: 'feat/2-x' })
  // pr が無ければ unverifiedPr。両方あれば pr が先
  assert.equal(m.closedCleanupCandidate(impl, savedOf({ pr: 0, unverifiedPr: 88 }), ctx).pr, 88)
  assert.equal(m.closedCleanupCandidate(impl, savedOf({ pr: 77, unverifiedPr: 88 }), ctx).pr, 77)
})

test('closedCleanupCandidate: 試行済みの記録（closedCleanupTried）が今の pr と worktree に一致する間は候補にならない。どちらかが変われば再び候補になる', () => {
  const tried = (pr, worktree) => savedOf({ closedCleanupTried: { pr, worktree, reason: 'retained' } })
  assert.equal(m.closedCleanupCandidate(impl, tried(77, WT), ctx), null)
  assert.equal(m.closedCleanupCandidate(impl, savedOf({ status: 'monitoring', closedCleanupTried: { pr: 77, worktree: WT, reason: 'binding' } }), ctx), null)
  // pr か worktree が変わった（別の PR・Recover 後の新しい worktree）。unverifiedPr だけの項目は unverifiedPr で比べる
  assert.deepEqual(m.closedCleanupCandidate(impl, tried(76, WT), ctx), { pr: 77, worktree: WT, branch: 'feat/2-x' })
  assert.deepEqual(m.closedCleanupCandidate(impl, tried(77, '/repo/wt/other'), ctx), { pr: 77, worktree: WT, branch: 'feat/2-x' })
  assert.equal(m.closedCleanupCandidate(impl, savedOf({ pr: 0, unverifiedPr: 88, closedCleanupTried: { pr: 88, worktree: WT, reason: 'binding' } }), ctx), null)
  // 記録が壊れていても例外にせず候補のまま（null・文字列・pr が文字列）
  for (const bad of [null, 'x', 5, {}, { pr: '77', worktree: WT }]) assert.ok(m.closedCleanupCandidate(impl, savedOf({ closedCleanupTried: bad }), ctx), JSON.stringify(bad))
})

test('closedCleanupGate: 1 ランの上限と予算不足を表で固定する（上限が先・予算は 6 + 20 以上の残りが要り、open の実装ノードが残るときは + 30）', () => {
  const need = m.AGENT_CALLS_CLOSED_CLEANUP + m.AGENT_CALLS_TERMINAL_BASE + m.AGENT_CALLS_PER_ISSUE.implement
  const cap = m.CLOSED_CLEANUP_PER_RUN_MAX
  assert.equal(cap, 10)
  const rows = [
    [{ limit: 1000, used: 0, attempted: 0, reserveImplement: true }, 'run'],
    [{ limit: 1000, used: 0, attempted: cap - 1, reserveImplement: true }, 'run'],
    [{ limit: 1000, used: 0, attempted: cap, reserveImplement: true }, 'defer-cap'],
    [{ limit: 1000, used: 0, attempted: cap + 5, reserveImplement: true }, 'defer-cap'],
    [{ limit: 100 + need, used: 100, attempted: 0, reserveImplement: true }, 'run'],
    [{ limit: 100 + need, used: 101, attempted: 0, reserveImplement: true }, 'defer-budget'],
    [{ limit: 100, used: 100, attempted: 0, reserveImplement: true }, 'defer-budget'],
    [{ limit: 100, used: 150, attempted: 0, reserveImplement: true }, 'defer-budget'],
    [{ limit: 100 + need, used: 101, attempted: cap, reserveImplement: true }, 'defer-cap'],
    // open の実装ノードが残らない後始末だけの再実行は、実装 1 件分を予約しない（6 + 20 だけ要る）
    [{ limit: 100 + need - m.AGENT_CALLS_PER_ISSUE.implement, used: 100, attempted: 0, reserveImplement: false }, 'run'],
    [{ limit: 100 + need - m.AGENT_CALLS_PER_ISSUE.implement, used: 101, attempted: 0, reserveImplement: false }, 'defer-budget'],
    [{ limit: 100 + need - m.AGENT_CALLS_PER_ISSUE.implement, used: 100, attempted: 0, reserveImplement: true }, 'defer-budget'],
    [{ limit: 100 + need - m.AGENT_CALLS_PER_ISSUE.implement, used: 100, attempted: 0 }, 'run'],
    // 合法な最小の agentCallLimit（開始処理 30 + 20 + 30 + 1 = 81）で開始処理を使い切った残り 51 でも、実装が残らなければ進む
    [{ limit: 81, used: 30, attempted: 0, reserveImplement: false }, 'run'],
    [{ limit: 81, used: 30, attempted: 0, reserveImplement: true }, 'defer-budget'],
  ]
  for (const [input, want] of rows) assert.equal(m.closedCleanupGate(input), want, JSON.stringify(input))
})

test('prBindingValuesFetched: 4 項目すべてが取得できた値のときだけ true（番兵が 1 つでも混じれば false）', () => {
  assert.equal(m.prBindingValuesFetched(bindOk), true)
  assert.equal(m.prBindingValuesFetched({ ...bindOk, closingIssues: [] }), true, '空配列は紐付け無しの正当値')
  assert.equal(m.prBindingValuesFetched({ ...bindOk, baseRefName: 'dev' }), true, '取得できた値が期待と違うのは実際の不成立')
  for (const o of [{ isCrossRepository: true }, { isCrossRepository: undefined }, { headRefName: '' }, { baseRefName: '' }, { headRefName: 5 }, { closingIssues: [-1] }, { closingIssues: [2, -1] }, { closingIssues: null }, { closingIssues: undefined }]) {
    assert.equal(m.prBindingValuesFetched({ ...bindOk, ...o }), false, JSON.stringify(o))
  }
  assert.equal(m.prBindingValuesFetched(null), false)
  assert.equal(m.prBindingValuesFetched(undefined), false)
})

test('closedCleanupRetainedReason: スクリプトが結果行の固定語で保持を明示したときだけ記録する（結果なし・非 0 終了・launcher 不一致・lock・固定語以外は記録しない）', () => {
  const r = (worktree, extra = {}) => ({ ok: false, retained: true, worktree, ...extra })
  for (const w of ['retained-dirty', 'retained-submodule', 'retained-head-mismatch', 'retained-detached', 'retained-broken', 'retained-unregistered']) assert.equal(m.closedCleanupRetainedReason(r(w), false), 'retained', w)
  // エージェントが非 0 終了・launcher の exit 3 / 4・結果の行なしを ok:false / retained:true / worktree 空で返す
  assert.equal(m.closedCleanupRetainedReason({ ok: false, retained: true, worktree: '' }, false), null)
  assert.equal(m.closedCleanupRetainedReason({ ok: false, retained: true }, false), null)
  for (const w of ['retained-unobservable', 'retained-locked', 'retained-branch-mismatch', 'failed', 'main', 'cwd', 'removed', 'not-registered', 'skipped', 'retained-other', 'RETAINED-DIRTY', 5, null]) assert.equal(m.closedCleanupRetainedReason(r(w), false), null, String(w))
  assert.equal(m.closedCleanupRetainedReason(r('retained-dirty'), true), null, '出力なし')
  assert.equal(m.closedCleanupRetainedReason({ ...r('retained-dirty'), retained: false }, false), null)
  assert.equal(m.closedCleanupRetainedReason(undefined, false), null)
})

test('closedCleanupCandidate: 候補にならない条件（dryRun・照合未成立・state-unverified・種別・状態・worktree/pr の欠落や不正）', () => {
  const rows = [
    ['dryRun', impl, savedOf(), { ...ctx, dryRun: true }],
    ['状態の照合未成立', impl, savedOf(), { ...ctx, verified: false }],
    ['state-unverified の項目', impl, savedOf(), { ...ctx, unverified: new Set([2]) }],
    ['verify-close', { number: 2, kind: 'verify-close' }, savedOf(), ctx],
    ['保存状態なし', impl, undefined, ctx],
    ['status: failed', impl, savedOf({ status: 'failed' }), ctx],
    ['status: merged', impl, savedOf({ status: 'merged' }), ctx],
    ['status: closed', impl, savedOf({ status: 'closed' }), ctx],
    ['status: pending', impl, savedOf({ status: 'pending' }), ctx],
    ['worktree なし', impl, savedOf({ worktree: '' }), ctx],
    ['worktree が相対パス', impl, savedOf({ worktree: 'rel/p' }), ctx],
    ['worktree に ..', impl, savedOf({ worktree: '/repo/../x' }), ctx],
    ['worktree が文字列でない', impl, savedOf({ worktree: 5 }), ctx],
    ['pr も unverifiedPr もなし', impl, savedOf({ pr: 0 }), ctx],
    ['pr が整数でない', impl, savedOf({ pr: '77' }), ctx],
    ['pr が負', impl, savedOf({ pr: -1 }), ctx],
  ]
  for (const [name, item, saved, c] of rows) assert.equal(m.closedCleanupCandidate(item, saved, c), null, name)
})

// ---- 2. cleanupClosedMergedWorktree ----

const bindOk = { state: 'MERGED', headRefOid: SHA, headRefName: 'feat/2-x', baseRefName: 'main', isCrossRepository: false, closingIssues: [2] }
function stub(behavior) {
  const calls = []
  const logs = []
  globalThis.agent = async (prompt, opts) => {
    calls.push({ prompt, opts })
    return behavior(opts, prompt)
  }
  globalThis.log = (msg) => { logs.push(msg) }
  return { calls, logs }
}
const labelsOf = (calls) => calls.map((c) => c.opts.label)
const mergedWrites = (calls) => calls.filter((c) => c.opts.label.startsWith('state:update:#2') && c.prompt.includes('"merged"'))

test('MERGED かつ結び付き成立: --head つきの discard で掃除し、掃除のあとで merged・pr・unverifiedPr: 0・worktree: "" を書く。ブランチは消さない', async () => {
  const s = stub((opts) => {
    if (opts.label.startsWith('pr-bind:')) return bindOk
    if (opts.label.startsWith('state:cleanup')) return { ok: true, retained: false }
    return { ok: true }
  })
  const note = await m.cleanupClosedMergedWorktree(impl, { pr: 77, worktree: WT, branch: 'feat/2-x' })
  assert.match(note, /worktree を破棄して状態を merged/)
  const labels = labelsOf(s.calls)
  assert.deepEqual(labels.filter((l) => l !== 'state:update:#2:fallback-sonnet'), ['pr-bind:#2', 'state:cleanup:#2', 'state:update:#2'])
  const cleanup = s.calls[1].prompt
  assert.match(cleanup, new RegExp(`worktree-remove\\.sh remove --mode discard --path '${WT}' --head '${SHA}'$`, 'm'))
  assert.doesNotMatch(cleanup, /--branch/, 'ブランチは消さない')
  // 保持理由の記録は結果行の worktree の語に依る。返却行に明示して省かれないようにする（指摘 F）
  assert.match(cleanup, /返却: ok \/ retained \/ branchSha \/ worktree（上記のとおり）/)
  assert.doesNotMatch(cleanup, /state\.sh/, '状態の書き込みは掃除エージェントに持たせない')
  const w = s.calls[2].prompt
  assert.match(w, /"status":\s*"merged"/)
  assert.match(w, /"pr":\s*77/)
  assert.match(w, /"unverifiedPr":\s*0/)
  assert.match(w, /"worktree":\s*""/)
  assert.ok(m.confirmedRemovedPaths.has(WT))
  assert.ok(!m.sweepHeldPaths.has(WT))
})

// 4 番目: 決定的な不成立として試行済みを記録する理由（null = 一過性・あとで変わり得るので記録しない）
const NO_CHANGE = [
  ['未マージの CLOSED', (o) => (o.label.startsWith('pr-bind:') ? { ...bindOk, state: 'CLOSED' } : undefined), /マージ済みではない/, 'not-merged'],
  ['OPEN（あとでマージされ得る）', (o) => (o.label.startsWith('pr-bind:') ? { ...bindOk, state: 'OPEN' } : undefined), /マージ済みではない/, null],
  ['取得失敗（UNKNOWN）', (o) => (o.label.startsWith('pr-bind:') ? { ...bindOk, state: 'UNKNOWN', headRefOid: '', headRefName: '', baseRefName: '', isCrossRepository: true, closingIssues: [-1] } : undefined), /結び付きを確認できない/, null],
  ['結び付き不成立（head のブランチ名が違う）', (o) => (o.label.startsWith('pr-bind:') ? { ...bindOk, headRefName: 'feat/3-x' } : undefined), /結び付きを確認できない/, 'binding'],
  ['結び付き不成立（別イシューに紐付く）', (o) => (o.label.startsWith('pr-bind:') ? { ...bindOk, closingIssues: [3] } : undefined), /結び付きを確認できない/, 'binding'],
  ['結び付き不成立（base が違う）', (o) => (o.label.startsWith('pr-bind:') ? { ...bindOk, baseRefName: 'dev' } : undefined), /結び付きを確認できない/, 'binding'],
  // isCrossRepository: true は取得不能の番兵と本物の fork PR が同じ値で区別できないので、記録しない側に倒す
  ['結び付き不成立（fork。番兵と区別できないので記録しない）', (o) => (o.label.startsWith('pr-bind:') ? { ...bindOk, isCrossRepository: true } : undefined), /結び付きを確認できない/, null],
  // 部分的にしか取れなかった pr-bind（取得不能の番兵が混じる）は一過性。1 回の部分取得で永久に飛ばさない
  ['部分取得（headRefName が空の番兵）', (o) => (o.label.startsWith('pr-bind:') ? { ...bindOk, headRefName: '' } : undefined), /結び付きを確認できない/, null],
  ['部分取得（baseRefName が空の番兵）', (o) => (o.label.startsWith('pr-bind:') ? { ...bindOk, baseRefName: '' } : undefined), /結び付きを確認できない/, null],
  ['部分取得（closingIssues が [-1] の番兵）', (o) => (o.label.startsWith('pr-bind:') ? { ...bindOk, closingIssues: [-1] } : undefined), /結び付きを確認できない/, null],
  ['部分取得（番兵が複数。state だけ MERGED）', (o) => (o.label.startsWith('pr-bind:') ? { ...bindOk, headRefName: '', baseRefName: '', closingIssues: [-1], isCrossRepository: true } : undefined), /結び付きを確認できない/, null],
  ['結び付き不成立（closingIssues が空でも別ブランチ名は取得値による不成立）', (o) => (o.label.startsWith('pr-bind:') ? { ...bindOk, headRefName: 'feat/3-x', closingIssues: [] } : undefined), /結び付きを確認できない/, 'binding'],
  ['PR の取得が null', (o) => (o.label.startsWith('pr-bind:') ? null : undefined), /結び付きを確認できない/, null],
  ['headRefOid が 40 桁でない', (o) => (o.label.startsWith('pr-bind:') ? { ...bindOk, headRefOid: 'abc123' } : undefined), /head を取得できない/, null],
  ['headRefOid に大文字', (o) => (o.label.startsWith('pr-bind:') ? { ...bindOk, headRefOid: 'C'.repeat(40) } : undefined), /head を取得できない/, null],
]
// 記録の書き込み: status・worktree・pr を含まない（sweep の保持照合から外れない）closedCleanupTried だけの更新
const triedWrites = (calls) => calls.filter((c) => c.opts.label.startsWith('state:update:#2') && c.prompt.includes('closedCleanupTried'))
// 記録の入れ子のオブジェクト（pr・worktree を持つ）を除いたうえで、トップレベルの status・worktree・pr の書き込みを探す
const anyStatusWrite = (calls) => calls.filter((c) => c.opts.label.startsWith('state:update:#2') && /"(status|worktree|pr)"/.test(c.prompt.replace(/"closedCleanupTried":\{[^}]*\}/g, '')))
for (const [name, bindBehavior, expected, reason] of NO_CHANGE) {
  test(`状態も worktree も触らない: ${name}${reason ? `（試行済みを記録: ${reason}）` : '（記録しない）'}`, async () => {
    const s = stub((opts) => {
      const b = bindBehavior(opts)
      if (b !== undefined) return b
      if (opts.label.startsWith('pr-bind:')) return bindOk
      return { ok: true, retained: false }
    })
    const note = await m.cleanupClosedMergedWorktree(impl, { pr: 77, worktree: WT, branch: 'feat/2-x' })
    assert.match(note, expected)
    assert.equal(labelsOf(s.calls).filter((l) => l.startsWith('state:cleanup')).length, 0, '掃除は起動しない')
    const w = triedWrites(s.calls)
    assert.equal(w.length, reason ? 1 : 0)
    if (reason) {
      assert.match(w[0].prompt, new RegExp(`"closedCleanupTried":\\{"pr":77,"worktree":"${WT}","reason":"${reason}"\\}`))
      assert.equal(anyStatusWrite(s.calls).length, 0, 'status・worktree・pr は書かない')
    } else {
      assert.equal(s.calls.filter((c) => c.opts.label.startsWith('state:update')).length, 0, '状態の書き込みを起動しない')
    }
  })
}

const RETAINED = [
  ['HEAD 不一致で保持（結果行が retained-head-mismatch）', () => ({ ok: false, retained: true, worktree: 'retained-head-mismatch' })],
  ['汚れで保持（retained-dirty）', () => ({ ok: false, retained: true, worktree: 'retained-dirty' })],
  ['ok だが保持（retained-detached）', () => ({ ok: true, retained: true, worktree: 'retained-detached' })],
  // 非 0 終了・launcher の exit 3 / 4・結果の行なしはエージェントが ok:false / retained:true / worktree 空で返す。一過性なので記録しない
  ['非 0 終了・結果行なし（ok:false・retained:true・worktree 空）', () => ({ ok: false, retained: true, worktree: '' }), false],
  ['worktree の語を返さない旧形式の応答', () => ({ ok: false, retained: true }), false],
  ['生きている lock（retained-locked）はセッション終了後に解消し得るので記録しない', () => ({ ok: false, retained: true, worktree: 'retained-locked' }), false],
  ['.git の破損・git の対象が worktree 自身でない（retained-broken）は決定的なので記録する', () => ({ ok: false, retained: true, worktree: 'retained-broken' })],
  // 登録は無いが実体のあるパス: not-registered（削除済みと同じ扱い）にすると merged にして追跡から外し、未 push のチェックアウトを見失う（Bugbot 指摘 P）。決定的なので記録する
  ['登録は無いが実体のあるパス（retained-unregistered）は merged にせず、決定的なので記録する', () => ({ ok: false, retained: true, worktree: 'retained-unregistered' })],
  ['観測の失敗（retained-unobservable: git status コマンドの失敗・--head 指定時の HEAD の一過性の読み取り失敗）は一過性かもしれないので記録せず、次のランで再試行させる', () => ({ ok: false, retained: true, worktree: 'retained-unobservable' }), false],
  ['掃除の結果なし（StructuredOutput 未返却）', () => null, false],
  ['掃除が例外', () => { throw new Error('boom') }, false],
  // 誤転記（ok:false なのに retained:false）は削除成功と見なさず、決定的な保持でもないので記録しない
  ['ok:false かつ retained:false（誤転記）', () => ({ ok: false, retained: false }), false],
]
for (const [name, cleanupBehavior, decisive = true] of RETAINED) {
  test(`掃除が保持した: ${name} → 状態を書かず、最終スイープの候補にも載せない`, async () => {
    const s = stub((opts) => {
      if (opts.label.startsWith('pr-bind:')) return bindOk
      if (opts.label.startsWith('state:cleanup')) return cleanupBehavior()
      return { ok: true }
    })
    const note = await m.cleanupClosedMergedWorktree(impl, { pr: 77, worktree: '/repo/wt/keep', branch: 'feat/2-x' })
    assert.match(note, /worktree を保持した。status は変更しない/)
    assert.equal(mergedWrites(s.calls).length, 0, 'merged を書かない')
    assert.equal(anyStatusWrite(s.calls).length, 0, 'status・worktree・pr を書かない')
    assert.equal(triedWrites(s.calls).length, decisive ? 1 : 0, decisive ? 'スクリプトが保持を返したときだけ試行済みを記録する' : '一過性の失敗は記録しない')
    if (decisive) assert.match(triedWrites(s.calls)[0].prompt, /"reason":"retained"/)
    assert.ok(!m.confirmedRemovedPaths.has('/repo/wt/keep'))
    assert.ok(m.sweepHeldPaths.has('/repo/wt/keep'), '削除を確認できるまで最終スイープから除外したまま')
    const sw = stub(() => ({ removed: [] }))
    assert.deepEqual(await m.sweepClosedWorktrees([]), [])
    assert.ok(sw.calls.every((c) => !c.prompt.includes('/repo/wt/keep')), '最終スイープのエージェントにパスが渡らない')
  })
}

test('掃除のあとの状態更新が失敗しても例外にしない（次の実行が同じ経路で再試行する）', async () => {
  stub((opts) => {
    if (opts.label.startsWith('pr-bind:')) return bindOk
    if (opts.label.startsWith('state:cleanup')) return { ok: true, retained: false }
    return { ok: false }
  })
  const note = await m.cleanupClosedMergedWorktree(impl, { pr: 77, worktree: '/repo/wt/other', branch: 'feat/2-x' })
  assert.match(note, /状態の更新に失敗/)
})

test('worktreeRemoveCommand: --head は discard・--path・40 桁の小文字 16 進のときだけ付く', () => {
  assert.match(m.worktreeRemoveCommand('discard', WT, '', SHA), new RegExp(`remove --mode discard --path '${WT}' --head '${SHA}'$`))
  assert.doesNotMatch(m.worktreeRemoveCommand('discard', WT, ''), /--head/)
  assert.doesNotMatch(m.worktreeRemoveCommand('superseded', WT, '', SHA), /--head/)
  assert.doesNotMatch(m.worktreeRemoveCommand('discard', '', 'feat/2-x', SHA), /--head/)
  // 空は指定なし。空でない不正な値は黙って落とさず例外（落とすと照合なしで消す呼び出しになる）
  assert.doesNotMatch(m.worktreeRemoveCommand('discard', WT, '', ''), /--head/)
  for (const bad of ['abc', SHA.toUpperCase(), `${SHA}0`, `${SHA.slice(1)}'`, '$(x)']) assert.throws(() => m.worktreeRemoveCommand('discard', WT, '', bad), /--head/, bad)
})

// ---- 3. 実装スクリプト全体でのホスト結合 ----

function tree(closed) {
  return {
    nodes: [
      { number: 1, title: 'root', state: 'open', parent: 0, siblingIndex: 0, dependsOn: [], subIssuesTotal: 2 },
      { number: 2, title: 'issue 2', state: closed ? 'closed' : 'open', parent: 1, siblingIndex: 0, dependsOn: [], subIssuesTotal: 0 },
      { number: 3, title: 'issue 3', state: 'open', parent: 1, siblingIndex: 1, dependsOn: [], subIssuesTotal: 0 },
    ],
  }
}

function run({ saved = savedOf(), hashOk = true, bind = bindOk, cleanup = { ok: true, retained: false }, args = BASE_ARGS, extra = () => undefined } = {}) {
  const item = saved
  const hashes = { 2: hashOk ? m.sha256Hex(m.canonicalJson(item)) : 'f'.repeat(64) }
  const keysSha = m.sha256Hex(m.canonicalJson(Object.keys(hashes).sort()))
  return runScript({
    args,
    leaves: [2, 3],
    override: (label, opts, prompt) => {
      const x = extra(label, opts, prompt)
      if (x !== undefined) return x
      if (label === 'plan:issue-tree') return tree(true)
      if (label === 'state:load') return { ok: true, fileExisted: true, items: { 2: item }, highWaterBytes: 0, highWaterVersion: 0 }
      if (label === 'state:load-verify') return { fileExists: true, hashes, keysSha256: keysSha, keysCount: 1, highWaterBytes: 0, highWaterVersion: 0 }
      if (label === 'pr-bind:#2') return bind
      if (label === 'state:cleanup:#2') return cleanup
      return undefined
    },
  })
}
const callsOf = (calls, re) => calls.filter((c) => re.test(c.opts.label))
const skipEntry = (result) => result.done.find((r) => r.issue === 2)

test('結合: closed の子 + blocked + MERGED かつ記録どおり → --head つきで掃除し、そのあとで merged へ更新する。skip の status は変わらない', async () => {
  const { result, calls } = await run()
  const labels = labelsOf(calls)
  const bind = labels.indexOf('pr-bind:#2')
  const cleanup = labels.indexOf('state:cleanup:#2')
  const merged = calls.findIndex((c) => c.opts.label.startsWith('state:update:#2') && c.prompt.includes('"status":"merged"'))
  assert.ok(bind >= 0 && cleanup > bind && merged > cleanup, `順序は pr-bind → 掃除 → merged の書き込み: ${[bind, cleanup, merged]}`)
  assert.match(calls[cleanup].prompt, new RegExp(`worktree-remove\\.sh remove --mode discard --path '${WT}' --head '${SHA}'`))
  assert.equal(skipEntry(result).status, 'skipped')
  assert.match(skipEntry(result).note, /^すでに closed。closed 後始末: PR #77 のマージ済みを確認し/)
  // 後始末は他のノードの着手を妨げない
  assert.ok(result.done.some((r) => r.issue === 3))
})

test('結合: monitoring でも同じ。unverifiedPr だけの項目は unverifiedPr の PR で確かめ、pr へ移して unverifiedPr を 0 にする', async () => {
  const { calls } = await run({ saved: savedOf({ status: 'monitoring', pr: 0, unverifiedPr: 88 }) })
  assert.match(callsOf(calls, /^pr-bind:#2/)[0].prompt, /88/)
  const w = calls.find((c) => c.opts.label.startsWith('state:update:#2') && c.prompt.includes('"status":"merged"'))
  assert.ok(w, 'merged を書く')
  assert.match(w.prompt, /"pr":88/)
  assert.match(w.prompt, /"unverifiedPr":0/)
})

const UNTOUCHED = [
  ['HEAD 不一致などで掃除が保持', { cleanup: { ok: false, retained: true } }, { cleanup: true }],
  ['掃除の結果なし', { cleanup: null }, { cleanup: true }],
  ['未マージの CLOSED', { bind: { ...bindOk, state: 'CLOSED' } }, {}],
  ['結び付き不成立', { bind: { ...bindOk, closingIssues: [3] } }, {}],
  ['規約外のブランチ名の PR（unverifiedPr だけ）', { saved: savedOf({ branch: 'worktree-wf_x-2', pr: 0, unverifiedPr: 88 }), bind: { ...bindOk, headRefName: 'worktree-wf_x-2' } }, {}],
  ['状態の照合が成立しない（項目のハッシュ不一致）', { hashOk: false }, { noBind: true }],
  ['dryRun', { args: { ...BASE_ARGS, dryRun: true } }, { noBind: true }],
  ['status が failed', { saved: savedOf({ status: 'failed' }) }, { noBind: true }],
  ['status が merged', { saved: savedOf({ status: 'merged' }) }, { noBind: true }],
  ['worktree の記録なし', { saved: savedOf({ worktree: '' }) }, { noBind: true }],
]
for (const [name, opts, expect] of UNTOUCHED) {
  test(`結合: 状態も worktree も触らない: ${name}`, async () => {
    const { calls, result } = await run(opts)
    const labels = labelsOf(calls)
    assert.equal(labels.some((l) => l.startsWith('state:update:#2') && calls.find((c) => c.opts.label === l && c.prompt.includes('"status":"merged"'))), false, 'merged を書かない')
    if (!expect.cleanup) assert.equal(callsOf(calls, /^state:cleanup:#2/).length, 0, '掃除を起動しない')
    if (expect.noBind) assert.equal(callsOf(calls, /^pr-bind:#2/).length, 0, 'PR の取得すら起動しない')
    // 最終スイープのエージェントに worktree のパスを渡さない
    assert.ok(callsOf(calls, /^worktree:sweep/).every((c) => !c.prompt.includes(WT)), '最終スイープに渡さない')
    if (!opts.args?.dryRun) assert.equal(skipEntry(result)?.status, 'skipped')
  })
}

test('結合: dryRun は書き込み系を起動せず、後始末の対象見込みだけを返す', async () => {
  const { result, calls } = await run({ args: { ...BASE_ARGS, dryRun: true } })
  assert.equal(result.dryRun, true)
  assert.deepEqual(result.closedCleanupPending, { count: 1, first: [2], perRunMax: 10, maxAgentCalls: 6 })
  assert.equal(callsOf(calls, /^(pr-bind|state:cleanup|state:update)/).length, 0)
})

test('結合: retained-unobservable は closedCleanupTried を書かない（retained-dirty は書く）', async () => {
  const r = await run({ cleanup: { ok: false, retained: true, worktree: 'retained-unobservable' } })
  assert.equal(triedWrites(r.calls).length, 0)
  assert.equal(anyStatusWrite(r.calls).length, 0)
})

test('結合: 保持された結果は status を変えずに試行済みを記録し、結果の closedCleanup に件数を出す。記録のある項目は次の実行で pr-bind すら起動しない', async () => {
  const first = await run({ cleanup: { ok: false, retained: true, worktree: 'retained-dirty' } })
  const w = triedWrites(first.calls)
  assert.equal(w.length, 1)
  assert.match(w[0].prompt, /"closedCleanupTried":\{"pr":77,"worktree":"\/repo\/wt\/old","reason":"retained"\}/)
  assert.equal(anyStatusWrite(first.calls).length, 0, 'status・worktree・pr は書かない（sweep の保持照合から外れない）')
  assert.deepEqual(first.result.closedCleanup, { run: 1, 'defer-cap': 0, 'defer-budget': 0 })
  // 記録された状態で再実行
  const second = await run({ saved: savedOf({ closedCleanupTried: { pr: 77, worktree: WT, reason: 'retained' } }) })
  assert.deepEqual(callsOf(second.calls, /^(pr-bind:#2|state:cleanup:#2|state:update:#2)/).map((c) => c.opts.label), [], '同じ条件では何も起動しない')
  assert.deepEqual(second.result.closedCleanup, { run: 0, 'defer-cap': 0, 'defer-budget': 0 })
  assert.equal(skipEntry(second.result).note, 'すでに closed')
  assert.ok(callsOf(second.calls, /^worktree:sweep/).every((c) => !c.prompt.includes(WT)), '記録済みでも最終スイープに渡さない')
  // worktree が変われば（人が直して新しい worktree を記録した等）再び試す
  const third = await run({ saved: savedOf({ worktree: '/repo/wt/new', closedCleanupTried: { pr: 77, worktree: WT, reason: 'retained' } }) })
  assert.equal(callsOf(third.calls, /^pr-bind:#2/).length, 1)
})

test('結合: 結果の行なし・lock などの一過性の保持（worktree が固定語でない・retained-locked）は記録せず、次の実行で再試行する', async () => {
  for (const cleanup of [{ ok: false, retained: true }, { ok: false, retained: true, worktree: '' }, { ok: false, retained: true, worktree: 'retained-locked' }, { ok: false, retained: true, worktree: 'failed' }]) {
    const first = await run({ cleanup })
    assert.equal(triedWrites(first.calls).length, 0, JSON.stringify(cleanup))
    assert.equal(anyStatusWrite(first.calls).length, 0)
    assert.equal(skipEntry(first.result).note.includes('worktree を保持した'), true)
  }
})

test('結合: 1 ランの後始末は上限 10 件で、超えた分は見送って次のランへ回す（件数は結果の closedCleanup に出る）', async () => {
  const numbers = Array.from({ length: 12 }, (_, i) => i + 2)
  const items = Object.fromEntries(numbers.map((n) => [n, { ...savedOf(), branch: `feat/${n}-x`, worktree: `/repo/wt/w${n}`, pr: 100 + n }]))
  const hashes = Object.fromEntries(numbers.map((n) => [n, m.sha256Hex(m.canonicalJson(items[n]))]))
  const keysSha = m.sha256Hex(m.canonicalJson(Object.keys(hashes).sort()))
  const { result, calls } = await runScript({
    args: BASE_ARGS,
    leaves: numbers,
    override: (label, _opts, prompt) => {
      if (label === 'plan:issue-tree') return { nodes: [{ number: 1, title: 'root', state: 'open', parent: 0, siblingIndex: 0, dependsOn: [], subIssuesTotal: 12 }, ...numbers.map((n, i) => ({ number: n, title: `issue ${n}`, state: 'closed', parent: 1, siblingIndex: i, dependsOn: [], subIssuesTotal: 0 }))] }
      if (label === 'state:load') return { ok: true, fileExisted: true, items, highWaterBytes: 0, highWaterVersion: 0 }
      if (label === 'state:load-verify') return { fileExists: true, hashes, keysSha256: keysSha, keysCount: numbers.length, highWaterBytes: 0, highWaterVersion: 0 }
      const mm = /^pr-bind:#(\d+)$/.exec(label)
      if (mm) return { ...bindOk, headRefName: `feat/${mm[1]}-x`, closingIssues: [Number(mm[1])] }
      if (label.startsWith('state:cleanup:')) return { ok: false, retained: true, worktree: 'retained-dirty' }
      return undefined
    },
  })
  assert.equal(callsOf(calls, /^pr-bind:/).length, 10, '試みるのは 10 件')
  assert.deepEqual(result.closedCleanup, { run: 10, 'defer-cap': 2, 'defer-budget': 0 })
  assert.equal(callsOf(calls, /^pr-bind:#(12|13)$/).length, 0, '後ろの 2 件は次のランへ')
  assert.equal(calls.filter((c) => c.prompt.includes('closedCleanupTried')).length, 10, '試みた 10 件は記録される')
})

// ---- 4. 一過性の候補が先頭に 10 件以上あっても、後ろの候補に順番が回る（Bugbot 指摘 V）----
// 記録されない結果（OPEN・取得失敗・retained-locked 等）の候補は次のランでも候補のまま。キューの先頭から 10 件を数える上限では、後ろの候補が毎ラン defer-cap になる。
// 試した候補へ試行回数（closedCleanupAttempts）だけを書き、未試行を先・試行の少ない順に並べる。

test('closedCleanupAttemptCount: 正の整数だけを試行回数として読む（壊れた値・未記録は 0・上限でクランプ）', () => {
  assert.equal(m.closedCleanupAttemptCount({ closedCleanupAttempts: 3 }), 3)
  assert.equal(m.closedCleanupAttemptCount({ closedCleanupAttempts: 1e9 }), 1000000)
  for (const bad of [undefined, null, {}, { closedCleanupAttempts: 0 }, { closedCleanupAttempts: -2 }, { closedCleanupAttempts: 1.5 }, { closedCleanupAttempts: '3' }, { closedCleanupAttempts: null }, { closedCleanupAttempts: NaN }]) {
    assert.equal(m.closedCleanupAttemptCount(bad), 0, JSON.stringify(bad))
  }
})

test('orderClosedCleanupCandidates: 試行回数の昇順・同数はキュー順（安定）。入力は変えない', () => {
  const e = (name, attempts) => ({ name, attempts })
  const input = [e('a', 2), e('b', 0), e('c', 1), e('d', 0), e('e', 2), e('f', 1)]
  const copy = input.slice()
  assert.deepEqual(m.orderClosedCleanupCandidates(input).map((x) => x.name), ['b', 'd', 'c', 'f', 'a', 'e'])
  assert.deepEqual(input, copy)
  assert.deepEqual(m.orderClosedCleanupCandidates([]), [])
  // 全部同数ならキュー順のまま
  assert.deepEqual(m.orderClosedCleanupCandidates([e('x', 1), e('y', 1), e('z', 1)]).map((x) => x.name), ['x', 'y', 'z'])
})

const MANY = Array.from({ length: 12 }, (_, i) => i + 2) // 2..13 は OPEN の PR（一過性）、14 が MERGED
const LAST = 14
const manyItem = (n, extra = {}) => ({ status: 'blocked', branch: `feat/${n}-x`, worktree: `/repo/wt/${n}`, pr: 100 + n, ...extra })
function runMany(items, { cleanup = { ok: true, retained: false } } = {}) {
  const numbers = [...MANY, LAST]
  const hashes = Object.fromEntries(numbers.map((n) => [n, m.sha256Hex(m.canonicalJson(items[n]))]))
  const keysSha = m.sha256Hex(m.canonicalJson(Object.keys(hashes).sort()))
  const nodes = [
    { number: 1, title: 'root', state: 'open', parent: 0, siblingIndex: 0, dependsOn: [], subIssuesTotal: numbers.length },
    ...numbers.map((n, i) => ({ number: n, title: `issue ${n}`, state: 'closed', parent: 1, siblingIndex: i, dependsOn: [], subIssuesTotal: 0 })),
  ]
  return runScript({
    args: BASE_ARGS,
    leaves: numbers,
    override: (label, _opts, _prompt) => {
      if (label === 'plan:issue-tree') return { nodes }
      if (label === 'state:load') return { ok: true, fileExisted: true, items, highWaterBytes: 0, highWaterVersion: 0 }
      if (label === 'state:load-verify') return { fileExists: true, hashes, keysSha256: keysSha, keysCount: numbers.length, highWaterBytes: 0, highWaterVersion: 0 }
      const b = /^pr-bind:#(\d+)$/.exec(label)
      if (b) {
        const n = Number(b[1])
        return { state: n === LAST ? 'MERGED' : 'OPEN', headRefOid: SHA, headRefName: `feat/${n}-x`, baseRefName: 'main', isCrossRepository: false, closingIssues: [n] }
      }
      if (/^state:cleanup:#/.test(label)) return cleanup
      return undefined
    },
  })
}
// 実行 1 回分の書き込みを次のランの状態へ反映する（試行回数の書き込みだけを読む）
function applyAttempts(items, calls) {
  const next = Object.fromEntries(Object.entries(items).map(([k, v]) => [k, { ...v }]))
  for (const c of calls) {
    const w = /^state:update:#(\d+)/.exec(c.opts.label)
    const a = w && /"closedCleanupAttempts":(\d+)/.exec(c.prompt)
    if (a) next[w[1]].closedCleanupAttempts = Number(a[1])
  }
  return next
}
const prBinds = (calls) => callsOf(calls, /^pr-bind:#/).map((c) => Number(/#(\d+)$/.exec(c.opts.label)[1]))

test('結合: 先頭に一過性（OPEN の PR）の候補が 11 件以上あっても、2 ランで後ろの MERGED の候補に順番が回り、merged へ更新される', async () => {
  const items0 = Object.fromEntries([...MANY, LAST].map((n) => [n, manyItem(n)]))
  // ラン 1: キューの先頭から 10 件を試す。OPEN は記録されないが、試した 10 件へ試行回数 1 を書く。後ろの 3 件（12・13・14）は defer-cap
  const r1 = await runMany(items0)
  assert.deepEqual(prBinds(r1.calls), MANY.slice(0, 10))
  assert.deepEqual(r1.result.closedCleanup, { run: 10, 'defer-cap': 3, 'defer-budget': 0 })
  const attemptWrites = r1.calls.filter((c) => c.opts.label.startsWith('state:update:#') && c.prompt.includes('closedCleanupAttempts'))
  assert.equal(attemptWrites.length, 10)
  for (const w of attemptWrites) {
    assert.match(w.prompt, /"closedCleanupAttempts":1/)
    // status・worktree・pr は書かない（sweep の保持照合から外れない）。試行回数のパッチだけ
    assert.doesNotMatch(w.prompt.replace(/"closedCleanupAttempts":1/, ''), /"(status|worktree|pr|closedCleanupTried)"/)
  }
  assert.equal(r1.calls.some((c) => c.prompt.includes('"status":"merged"')), false)
  // ラン 2: 未試行（12・13・14）が先。14 が MERGED なので掃除して merged へ更新する
  const items1 = applyAttempts(items0, r1.calls)
  assert.deepEqual(Object.values(items1).filter((v) => v.closedCleanupAttempts === 1).length, 10)
  const r2 = await runMany(items1)
  assert.deepEqual(prBinds(r2.calls).slice(0, 3), [12, 13, 14], '未試行の候補が先')
  assert.equal(prBinds(r2.calls).length, 10)
  assert.ok(callsOf(r2.calls, /^state:cleanup:#14$/).length === 1, '14 の worktree を掃除する')
  assert.ok(r2.calls.some((c) => c.opts.label.startsWith('state:update:#14') && c.prompt.includes('"status":"merged"')), '14 を merged へ更新する')
  // skip エントリの順序は元のキュー順のまま（結果の並びを変えない）
  assert.deepEqual(r2.result.done.filter((x) => x.status === 'skipped').map((x) => x.issue), [...MANY, LAST])
})

test('結合: 試行回数の書き込みに失敗・例外でも後始末は壊れない（結果は返り、ほかの候補は進む）', async () => {
  const items0 = Object.fromEntries([...MANY, LAST].map((n) => [n, manyItem(n)]))
  const r = await runMany(items0)
  assert.ok(r.result.closedCleanup.run >= 1)
  // 書き込み系が失敗を返す環境でも候補は 10 件試される（書き込みの失敗は警告ログのみ）
  const numbers = [...MANY, LAST]
  const hashes = Object.fromEntries(numbers.map((n) => [n, m.sha256Hex(m.canonicalJson(items0[n]))]))
  const keysSha = m.sha256Hex(m.canonicalJson(Object.keys(hashes).sort()))
  const nodes = [
    { number: 1, title: 'root', state: 'open', parent: 0, siblingIndex: 0, dependsOn: [], subIssuesTotal: numbers.length },
    ...numbers.map((n, i) => ({ number: n, title: `issue ${n}`, state: 'closed', parent: 1, siblingIndex: i, dependsOn: [], subIssuesTotal: 0 })),
  ]
  const f = await runScript({
    args: BASE_ARGS,
    leaves: numbers,
    override: (label) => {
      if (label === 'plan:issue-tree') return { nodes }
      if (label === 'state:load') return { ok: true, fileExisted: true, items: items0, highWaterBytes: 0, highWaterVersion: 0 }
      if (label === 'state:load-verify') return { fileExists: true, hashes, keysSha256: keysSha, keysCount: numbers.length, highWaterBytes: 0, highWaterVersion: 0 }
      const b = /^pr-bind:#(\d+)$/.exec(label)
      if (b) return { state: 'OPEN', headRefOid: SHA, headRefName: `feat/${b[1]}-x`, baseRefName: 'main', isCrossRepository: false, closingIssues: [Number(b[1])] }
      if (/^state:update:#/.test(label)) throw new Error('boom')
      return undefined
    },
  })
  assert.equal(f.result.closedCleanup.run, 10)
  assert.ok(f.logs.some((l) => /試行回数の書き込みが例外終了した|試行回数を書けなかった/.test(l)))
})

test('結合: 記録される結果（retained-dirty = 試行済み）の候補には試行回数を書かない。merged になった候補にも書かない', async () => {
  const items0 = { 2: manyItem(2), 3: manyItem(3) }
  const hashes = { 2: m.sha256Hex(m.canonicalJson(items0[2])), 3: m.sha256Hex(m.canonicalJson(items0[3])) }
  const keysSha = m.sha256Hex(m.canonicalJson(['2', '3']))
  const nodes = [
    { number: 1, title: 'root', state: 'open', parent: 0, siblingIndex: 0, dependsOn: [], subIssuesTotal: 2 },
    { number: 2, title: 'i2', state: 'closed', parent: 1, siblingIndex: 0, dependsOn: [], subIssuesTotal: 0 },
    { number: 3, title: 'i3', state: 'closed', parent: 1, siblingIndex: 1, dependsOn: [], subIssuesTotal: 0 },
  ]
  const { calls } = await runScript({
    args: BASE_ARGS,
    leaves: [2, 3],
    override: (label) => {
      if (label === 'plan:issue-tree') return { nodes }
      if (label === 'state:load') return { ok: true, fileExisted: true, items: items0, highWaterBytes: 0, highWaterVersion: 0 }
      if (label === 'state:load-verify') return { fileExists: true, hashes, keysSha256: keysSha, keysCount: 2, highWaterBytes: 0, highWaterVersion: 0 }
      const b = /^pr-bind:#(\d+)$/.exec(label)
      if (b) return { state: 'MERGED', headRefOid: SHA, headRefName: `feat/${b[1]}-x`, baseRefName: 'main', isCrossRepository: false, closingIssues: [Number(b[1])] }
      if (label === 'state:cleanup:#2') return { ok: false, retained: true, worktree: 'retained-dirty' }
      if (label === 'state:cleanup:#3') return { ok: true, retained: false }
      return undefined
    },
  })
  assert.ok(calls.some((c) => c.opts.label.startsWith('state:update:#2') && c.prompt.includes('closedCleanupTried')))
  assert.ok(calls.some((c) => c.opts.label.startsWith('state:update:#3') && c.prompt.includes('"status":"merged"')))
  assert.equal(calls.filter((c) => c.prompt.includes('closedCleanupAttempts')).length, 0)
})

// ---- Y: settled は書き込みが成功したと分かってから立てる ----
// 書き込みに失敗した候補は次のランでも候補のまま。settled を先に立てると呼び出し側が試行回数を書かず、未試行の候補と同じ順位で先頭の枠を取り続ける。
test('settled: 試行済みの記録（closedCleanupTried）の書き込みが成功したときだけ立つ。失敗したら立たず、呼び出し側が試行回数を書く', async () => {
  for (const [writeOk, expected] of [[true, true], [false, false]]) {
    stub((opts) => {
      if (opts.label.startsWith('pr-bind:')) return { ...bindOk, state: 'CLOSED' }
      return { ok: writeOk }
    })
    const outcome = { settled: false }
    await m.cleanupClosedMergedWorktree(impl, { pr: 77, worktree: WT, branch: 'feat/2-x' }, outcome)
    assert.equal(outcome.settled, expected, `記録の書き込み ok=${writeOk}`)
  }
})

test('settled: merged への更新が成功したときだけ立つ。失敗（worktree は破棄済み）なら立たない', async () => {
  for (const [writeOk, expected] of [[true, true], [false, false]]) {
    stub((opts) => {
      if (opts.label.startsWith('pr-bind:')) return bindOk
      if (opts.label.startsWith('state:cleanup')) return { ok: true, retained: false }
      return { ok: writeOk }
    })
    const outcome = { settled: false }
    await m.cleanupClosedMergedWorktree(impl, { pr: 77, worktree: '/repo/wt/y-merged', branch: 'feat/2-x' }, outcome)
    assert.equal(outcome.settled, expected, `merged の書き込み ok=${writeOk}`)
  }
})

// 結合: 書き込み系を種類ごとに失敗させ、どの候補に試行回数が書かれるかを見る
async function runWithWriteFailure(failWhen, { bind, cleanup }) {
  const items0 = { 2: manyItem(2), 3: manyItem(3) }
  const hashes = { 2: m.sha256Hex(m.canonicalJson(items0[2])), 3: m.sha256Hex(m.canonicalJson(items0[3])) }
  const keysSha = m.sha256Hex(m.canonicalJson(['2', '3']))
  const nodes = [
    { number: 1, title: 'root', state: 'open', parent: 0, siblingIndex: 0, dependsOn: [], subIssuesTotal: 2 },
    { number: 2, title: 'i2', state: 'closed', parent: 1, siblingIndex: 0, dependsOn: [], subIssuesTotal: 0 },
    { number: 3, title: 'i3', state: 'closed', parent: 1, siblingIndex: 1, dependsOn: [], subIssuesTotal: 0 },
  ]
  return runScript({
    args: BASE_ARGS,
    leaves: [2, 3],
    override: (label, _o, prompt) => {
      if (label === 'plan:issue-tree') return { nodes }
      if (label === 'state:load') return { ok: true, fileExisted: true, items: items0, highWaterBytes: 0, highWaterVersion: 0 }
      if (label === 'state:load-verify') return { fileExists: true, hashes, keysSha256: keysSha, keysCount: 2, highWaterBytes: 0, highWaterVersion: 0 }
      const b = /^pr-bind:#(\d+)$/.exec(label)
      if (b) return { state: bind, headRefOid: SHA, headRefName: `feat/${b[1]}-x`, baseRefName: 'main', isCrossRepository: false, closingIssues: [Number(b[1])] }
      if (/^state:cleanup:#/.test(label)) return cleanup
      if (/^state:update:#/.test(label) && failWhen(prompt)) return { ok: false }
      return undefined
    },
  })
}
const attemptWritesOf = (calls) => calls.filter((c) => c.opts.label.startsWith('state:update:#') && c.prompt.includes('closedCleanupAttempts'))
const issueOf = (c) => /#(\d+)/.exec(c.opts.label)[1]

test('結合: 試行済みの記録（closedCleanupTried）の書き込みが失敗した候補には試行回数が書かれる（先頭の枠を取り続けない）', async () => {
  const r = await runWithWriteFailure((p) => p.includes('closedCleanupTried'), { bind: 'CLOSED', cleanup: { ok: true, retained: false } })
  const w = attemptWritesOf(r.calls)
  assert.deepEqual(w.map(issueOf).sort(), ['2', '3'])
  for (const c of w) assert.match(c.prompt, /"closedCleanupAttempts":1/)
})

test('結合: merged への更新が失敗した候補には試行回数が書かれる', async () => {
  const r = await runWithWriteFailure((p) => p.includes('"status":"merged"'), { bind: 'MERGED', cleanup: { ok: true, retained: false } })
  assert.deepEqual(attemptWritesOf(r.calls).map(issueOf).sort(), ['2', '3'])
})

test('結合: 書き込みが成功した候補には試行回数を書かない（記録済み・merged 済み）', async () => {
  const r1 = await runWithWriteFailure(() => false, { bind: 'CLOSED', cleanup: { ok: true, retained: false } })
  assert.equal(attemptWritesOf(r1.calls).length, 0)
  const r2 = await runWithWriteFailure(() => false, { bind: 'MERGED', cleanup: { ok: true, retained: false } })
  assert.equal(attemptWritesOf(r2.calls).length, 0)
})
