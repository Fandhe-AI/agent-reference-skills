// args.skipLabels（対象外ラベル）と args.notifyBlocked（待機中の issue の通知）の回帰テスト（Issue #720）。
//
// 契約:
//   - skipLabels 未指定・notifyBlocked 未指定では、新しい agent を 1 回も呼ばず、返却値のキーも増えない。
//   - skipLabels の形式不正は agent を呼ぶ前に起動時エラーで止める。notifyBlocked は boolean だけ。
//   - ラベルごとにリポジトリ全体の open issue を 1 体の agent で列挙し、ホストがツリーのノード番号と突き合わせる。
//     sig（declaredDepsChecksum と同じ式）の不一致は 1 回だけ再試行し、なお取得できないラベルがあれば
//     open ノードを全て対象外にする（fail-closed）。
//   - 一致した open ノードは blocked（halt に数えない）。ラベルは本人だけに効き子孫へ継承しない。
//   - dryRun は blocked.skippedLabel と skippedLabels.matched を返し、書き込み系の agent を起動しない。
//   - notifyBlocked: 待ちがあるときだけルート issue へ 1 回コメントし、本文は整数と固定の文言だけ。
//
// 判定は純粋関数（定義部のスライス）を表で検査し、配線は stub agent で実スクリプト全体を走らせて検査する。
// 実時間では待たない（偽 gh を PATH に置いたコマンドの実行も同期で一瞬）。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdtempSync, writeFileSync, chmodSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { importDefinitions, runScript, BASE_ARGS } from './lib/stub-run.mjs'
import { trackTmp } from './lib/tmp-track.mjs'

const D = await importDefinitions(
  ['parseSkipLabels', 'collectSkipLabelEntries', 'classifySkipLabels', 'skipLabelNote', 'skipLabelsPrompt', 'notifyBlockedPrompt', 'declaredDepsChecksum', 'estimateDispatch', 'sha256Hex', 'canonicalJson'],
  'skip-labels',
)

const node = (number, parent, o = {}) => ({
  number,
  title: `title-${number}`,
  state: o.state ?? 'open',
  parent,
  siblingIndex: o.si ?? 0,
  dependsOn: o.dependsOn ?? [],
  subIssuesTotal: o.sub ?? 0,
})
// ルート 1 の直下に葉 leaves を並べたツリー
const flat = (leaves, o = {}) => [node(1, 0, { sub: leaves.length }), ...leaves.map((n, i) => node(n, 1, { si: i, ...(o[n] ?? {}) }))]
// x = 1 はラベルがリポジトリに無い。sig の number スロットは i * 2 + x
const labelEntry = (i, numbers, x = 0) => ({ i, x, numbers, sig: D.declaredDepsChecksum(i * 2 + x, numbers) })
// ラベル → 番号 の表から plan:skip-labels の応答を作る（添字は 1 始まり。番号は jq の unique と同じ昇順・重複なし）。table に無いラベルは該当なし。
const skipReply = (labels, table, absent = []) => ({ entries: labels.map((l, k) => labelEntry(k + 1, [...new Set(table[l] ?? [])].sort((a, b) => a - b), absent.includes(l) ? 1 : 0)) })
const ARGS = (extra = {}) => ({ ...BASE_ARGS, ...extra })
const labelsOf = (calls) => calls.map((c) => c.opts.label)
const startedLabels = (calls) => labelsOf(calls).filter((l) => /^(plan|impl):#/.test(l))

// --- 入力の検証（純粋関数） ---

test('parseSkipLabels: 未指定・null・空配列は指定なし、重複は除く', () => {
  assert.equal(D.parseSkipLabels(undefined), undefined)
  assert.equal(D.parseSkipLabels(null), undefined)
  assert.equal(D.parseSkipLabels([]), undefined)
  assert.deepEqual(D.parseSkipLabels(['owner:human', 'owner:joint', 'owner:human']), ['owner:human', 'owner:joint'])
})

test('parseSkipLabels: エラーメッセージが途中で切れず、不正な要素を含む', () => {
  assert.throws(() => D.parseSkipLabels(['a,b']), (e) => e.message.includes('「,」') && e.message.endsWith(': a,b'))
})

test('parseSkipLabels: 正常形（: と空白を許す・50 文字・10 件・日本語）', () => {
  assert.deepEqual(D.parseSkipLabels(['good first issue']), ['good first issue'])
  assert.deepEqual(D.parseSkipLabels(['a'.repeat(50)]), ['a'.repeat(50)])
  assert.deepEqual(D.parseSkipLabels(['人手']), ['人手'])
  assert.equal(D.parseSkipLabels(Array.from({ length: 10 }, (_, k) => `l${k}`)).length, 10)
})

test('parseSkipLabels: 形式不正は throw（配列でない・11 件・空文字・改行・制御文字・カンマ・51 文字・文字列でない・前後空白）', () => {
  const bad = [
    'owner:human',
    { a: 1 },
    Array.from({ length: 11 }, (_, k) => `l${k}`),
    [''],
    ['a\nb'],
    ['a\tb'],
    ['a\u0000b'],
    ['a,b'],
    ['a'.repeat(51)],
    [1],
    [null],
    [['x']],
    [' x'],
    ['x '],
    ['   '],
  ]
  for (const raw of bad) assert.throws(() => D.parseSkipLabels(raw), /args\.skipLabels/, JSON.stringify(raw))
})

// --- 取得コマンドと転記の照合（純粋関数） ---

test('skipLabelsPrompt: ラベルは単一引用符化し、gh は GET・ページ送りで、成否は終了コードで判定する', () => {
  const p = D.skipLabelsPrompt(['owner:human', "it's $(rm -rf x) `y`"])
  assert.ok(p.includes(`for l in 'owner:human' 'it'\\''s $(rm -rf x) \`y\`'; do`), 'ラベルがシェルへ生で入っている')
  assert.ok(p.includes('gh api -X GET repos/{owner}/{repo}/issues'))
  assert.ok(p.includes('-f state=open') && p.includes('-f labels="$l"') && p.includes('--paginate'))
  assert.ok(p.includes('select(.pull_request==null)'))
  assert.ok(p.includes('--argjson i "$i"'), '添字は jq の --argjson で渡す')
  assert.ok(p.includes('|| echo "FAILED $i" >&2'), '失敗を終了コードで判定していない')
})

test('collectSkipLabelEntries: 正常・依頼外の添字は無視・欠落は missing', () => {
  const r = D.collectSkipLabelEntries([1, 2, 3], { entries: [labelEntry(1, [3, 5]), labelEntry(3, []), labelEntry(9, [1])] })
  assert.deepEqual([...r.byIndex], [[1, [3, 5]], [3, []]])
  assert.deepEqual(r.missing, [2])
  assert.deepEqual(D.collectSkipLabelEntries([1], undefined).missing, [1])
  assert.deepEqual(D.collectSkipLabelEntries([1], { entries: 'x' }).missing, [1])
})

test('collectSkipLabelEntries: sig 不一致・重複・昇順でない・非整数・0 以下は契約違反として throw', () => {
  const bad = [
    { entries: [{ i: 1, x: 0, numbers: [3, 5], sig: 1 }] },
    { entries: [{ i: 1, numbers: [3], sig: D.declaredDepsChecksum(2, [3]) }] },
    { entries: [{ i: 1, x: 2, numbers: [3], sig: D.declaredDepsChecksum(4, [3]) }] },
    { entries: [{ i: 1, x: 1, numbers: [3], sig: D.declaredDepsChecksum(2, [3]) }] },
    { entries: [labelEntry(1, [3]), labelEntry(1, [3])] },
    { entries: [{ i: 1, x: 0, numbers: [5, 3], sig: D.declaredDepsChecksum(2, [5, 3]) }] },
    { entries: [{ i: 1, x: 0, numbers: [3, 3], sig: D.declaredDepsChecksum(2, [3, 3]) }] },
    { entries: [{ i: 1, x: 0, numbers: [1.5], sig: D.declaredDepsChecksum(2, [1.5]) }] },
    { entries: [{ i: 1, x: 0, numbers: [0], sig: D.declaredDepsChecksum(2, [0]) }] },
    { entries: [{ i: 1, x: 0, numbers: 'x', sig: 0 }] },
    { entries: [{ i: 1, x: 0, numbers: [3], sig: D.declaredDepsChecksum(2, [3]) + 1 }] },
  ]
  for (const r of bad) assert.throws(() => D.collectSkipLabelEntries([1], r), /対象外ラベルの取得結果/, JSON.stringify(r))
})

test('sig は番号の改変・脱落・並べ替えで変わる（転記の誤りを検出できる）', () => {
  const base = D.declaredDepsChecksum(1, [3, 5, 9])
  for (const other of [[3, 5], [3, 5, 8], [5, 3, 9], [3, 5, 9, 10]]) assert.notEqual(D.declaredDepsChecksum(1, other), base)
  assert.notEqual(D.declaredDepsChecksum(2, [3, 5, 9]), base)
})

test('classifySkipLabels: open のノードだけが該当し、複数ラベルに該当すれば先のラベル、ツリー外の番号は無視する', () => {
  const nodes = [node(1, 0), node(2, 1), node(3, 1, { state: 'closed' }), node(4, 1)]
  const byIndex = new Map([[1, [2, 3, 99]], [2, [2, 4]]])
  const r = D.classifySkipLabels(nodes, ['owner:human', 'owner:joint'], byIndex, [])
  assert.deepEqual([...r.hit], [[2, 'owner:human'], [4, 'owner:joint']])
  assert.deepEqual(r.unknownLabels, [])
})

test('classifySkipLabels: 取得できないラベルが 1 つでもあれば open ノードを全て対象外にする（fail-closed）', () => {
  const nodes = [node(1, 0), node(2, 1), node(3, 1, { state: 'closed' })]
  const r = D.classifySkipLabels(nodes, ['a', 'b'], new Map([[1, [2]]]), [2])
  assert.deepEqual([...r.hit], [[1, null], [2, null]])
  assert.deepEqual(r.unknownLabels, ['b'])
})

test('skipLabelNote: 該当時は仕様の文言、取得不能時は別の文言', () => {
  assert.equal(D.skipLabelNote('owner:human', []), '対象外ラベル（owner:human）のため未着手（close するかラベルを外して再実行すると着手する）')
  assert.match(D.skipLabelNote(null, ['a', 'b']), /対象外ラベル（a, b）の一覧を取得できず未着手/)
})

test('estimateDispatch: skippedLabel は preBlocked に入らず blocked.skippedLabel に数え、下流は downstream', () => {
  const work = [{ number: 2 }, { number: 3 }, { number: 4 }]
  const depsMap = new Map([[2, new Set()], [3, new Set([2])], [4, new Set()]])
  const p = D.estimateDispatch(work, depsMap, new Set(), new Set([2]), { outOfTreeWait: new Set(), phaseGateEdgeKeys: new Set(), skippedLabel: new Set([2]) })
  assert.deepEqual(p.blocked.skippedLabel, [2])
  assert.deepEqual(p.blocked.downstream, [3])
  assert.deepEqual(p.preBlocked, [])
  assert.deepEqual(p.startable, [4])
  // skippedLabel を渡さなければ従来どおり preBlocked
  const q = D.estimateDispatch(work, depsMap, new Set(), new Set([2]), { outOfTreeWait: new Set(), phaseGateEdgeKeys: new Set() })
  assert.deepEqual(q.preBlocked, [2])
  assert.ok(!('skippedLabel' in q.blocked))
})

test('notifyBlockedPrompt: 本文は整数と固定の文言だけ。多数の番号は件数 + 先頭に切る', () => {
  const p = D.notifyBlockedPrompt(7, { outOfTree: [11, 12], skippedLabel: [3], waitingOn: [99] })
  assert.ok(p.includes("gh issue comment 7 --body \"$(cat <<'NBEOF'"))
  assert.ok(p.includes('- ツリー外の前提で待機中: #11, #12'))
  assert.ok(p.includes('- 対象外ラベルで待機中: #3'))
  assert.ok(p.includes('- 待たれている前提: #99'))
  const many = D.notifyBlockedPrompt(7, { outOfTree: [], skippedLabel: Array.from({ length: 100 }, (_, k) => k + 2), waitingOn: [] })
  assert.ok(many.includes('100 件（先頭 30 件: #2, #3'))
  assert.ok(!many.includes('ツリー外の前提で待機中'), '空の行は出さない')
  assert.throws(() => D.notifyBlockedPrompt(7, { outOfTree: ['1; rm -rf /'], skippedLabel: [], waitingOn: [] }))
  assert.throws(() => D.notifyBlockedPrompt('7; x', { outOfTree: [], skippedLabel: [], waitingOn: [] }))
})

// --- 偽 gh で実際にコマンドを走らせる（jq が出す sig をホストの検査が受理すること） ---

test('取得コマンドを偽 gh で実行: 番号は昇順・重複なし、失敗ラベルは FAILED、sig はホストの検査を通る', { skip: spawnSync('jq', ['--version']).status !== 0 && 'jq が無い' }, () => {
  const dir = trackTmp(mkdtempSync(join(tmpdir(), 'skip-labels-gh-')))
  writeFileSync(join(dir, 'gh'), `#!/bin/bash
label=""
for a in "$@"; do case "$a" in labels=*) label="\${a#labels=}";; esac; done
case "$*" in *"/issues"*) ;; *) printf '%s\\n' 'Owner:Human' "It's" broken; exit 0;; esac
case "$label" in
  'owner:human') printf '%s\\n' 9 3 5 3;;
  "it's") printf '%s\\n' 4;;
  'broken') echo '{"message":"boom"}'; exit 1;;
  *) ;;
esac
`)
  chmodSync(join(dir, 'gh'), 0o755)
  const labels = ['owner:human', "it's", 'broken', 'none']
  const command = D.skipLabelsPrompt(labels).split('\n').find((l) => l.startsWith('names=$('))
  const r = spawnSync('/bin/bash', ['-c', command], { env: { ...process.env, PATH: `${dir}:${process.env.PATH}` }, encoding: 'utf8' })
  assert.equal(r.status, 0, r.stderr)
  assert.match(r.stderr, /FAILED 3/)
  assert.ok(!r.stdout.includes('boom'), 'gh のエラー本文が標準出力の転記対象に混ざった')
  const entries = r.stdout.trim().split('\n').map((l) => JSON.parse(l))
  assert.deepEqual(entries.map((e) => [e.i, e.x, e.numbers]), [[1, 0, [3, 5, 9]], [2, 0, [4]], [4, 1, []]], '大文字小文字は区別せず、リポジトリに無い none だけ x = 1')
  const c = D.collectSkipLabelEntries([1, 2, 3, 4], { entries })
  assert.deepEqual([...c.byIndex.keys()], [1, 2, 4])
  assert.deepEqual(c.missing, [3])
  assert.deepEqual(c.absent, [4])
})

// --- 起動時の検証（agent を呼ぶ前に止まる） ---

test('不正な skipLabels・notifyBlocked は agent を 1 回も呼ばずに起動時エラー', async () => {
  for (const extra of [
    { skipLabels: 'owner:human' },
    { skipLabels: Array.from({ length: 11 }, (_, k) => `l${k}`) },
    { skipLabels: [''] },
    { skipLabels: ['a\nb'] },
    { skipLabels: ['a'.repeat(51)] },
    { skipLabels: [1] },
    { notifyBlocked: 'true' },
    { notifyBlocked: 1 },
  ]) {
    let n = 0
    await assert.rejects(runScript({ args: ARGS(extra), override: () => { n++ } }), /args\.(skipLabels|notifyBlocked)/, JSON.stringify(extra))
    assert.equal(n, 0, `agent が呼ばれた: ${JSON.stringify(extra)}`)
  }
})

// --- 既定（未指定）では挙動が変わらない ---

test('未指定: 新しい agent を呼ばず、返却値にキーを増やさない', async () => {
  const { result, calls } = await runScript({ args: ARGS(), leaves: [2, 3] })
  assert.ok(!labelsOf(calls).some((l) => l.startsWith('plan:skip-labels') || l === 'notify-blocked'))
  assert.ok(!('skippedLabels' in result) && !('blockedWaiting' in result))
  assert.deepEqual(startedLabels(calls).filter((l) => l.startsWith('plan:')).sort(), ['plan:#2', 'plan:#3'])
})

test('空の skipLabels は未指定と同じ（agent を呼ばない）', async () => {
  const { result, calls } = await runScript({ args: ARGS({ skipLabels: [], notifyBlocked: false }), leaves: [2] })
  assert.ok(!labelsOf(calls).some((l) => l.startsWith('plan:skip-labels') || l === 'notify-blocked'))
  assert.ok(!('skippedLabels' in result) && !('blockedWaiting' in result))
})

// --- 待機（blocked）の挙動 ---

const skipOverride = (table, tree) => (label, opts, prompt) => {
  if (label.startsWith('plan:issue-tree') && tree) return { nodes: tree }
  if (label === 'plan:skip-labels') return skipReply(['owner:human', 'owner:joint'], table)
  return undefined
}

test('一致した葉は Plan / Implement を起動せず blocked になり、3 件以上でも halt しない', async () => {
  const labels = ['owner:human', 'owner:joint']
  const { result, calls } = await runScript({
    args: ARGS({ skipLabels: labels }),
    leaves: [2, 3, 4, 5],
    override: (label) => (label === 'plan:skip-labels' ? skipReply(labels, { 'owner:human': [2, 3], 'owner:joint': [4, 2] }) : undefined),
  })
  assert.equal(calls.filter((c) => c.opts.label === 'plan:skip-labels').length, 1, 'ラベル取得はツリーの大きさによらず 1 体')
  assert.deepEqual(startedLabels(calls).map((l) => l.replace(/^[a-z]+:/, '')), ['#5', '#5'], '対象外の葉に Plan / Implement を起動した')
  const byIssue = Object.fromEntries(result.done.filter((r) => [2, 3, 4].includes(r.issue)).map((r) => [r.issue, r]))
  assert.equal(byIssue[2].status, 'blocked')
  assert.equal(byIssue[2].note, '対象外ラベル（owner:human）のため未着手（close するかラベルを外して再実行すると着手する）', '複数ラベルは先のラベル')
  assert.match(byIssue[4].note, /owner:joint/)
  assert.equal(result.halted, null, 'blocked は halt に数えない')
  assert.deepEqual(result.skippedLabels, { labels, matched: [2, 3, 4], unknown: [], absent: [] })
  assert.ok(result.failures.some((f) => f.issue === 3 && f.status === 'blocked'))
})

test('対象外ノードの blocked は状態ファイルへ一括で書かれる（ノードごとの state:update は起動しない）', async () => {
  const { calls } = await runScript({
    args: ARGS({ skipLabels: ['owner:human'] }),
    leaves: [2, 3],
    override: (label) => (label === 'plan:skip-labels' ? skipReply(['owner:human'], { 'owner:human': [2, 3] }) : undefined),
  })
  const batch = calls.filter((c) => c.opts.label.startsWith('state:update-batch'))
  assert.ok(batch.length >= 1, '一括書き込みが無い')
  assert.ok(batch.some((c) => c.prompt.includes('対象外ラベル（owner:human）のため未着手')))
  assert.ok(!calls.some((c) => /^state:update:#(2|3)$/.test(c.opts.label)))
})

test('対象外ノードを dependsOn に持つ後続は、前提の blocked で待つ', async () => {
  const tree = flat([2, 3, 4], { 3: { dependsOn: [2] } })
  const { result, calls } = await runScript({
    args: ARGS({ skipLabels: ['owner:human'] }),
    override: skipOverride({ 'owner:human': [2] }, tree),
  })
  const r3 = result.done.find((r) => r.issue === 3)
  assert.equal(r3.status, 'blocked')
  assert.match(r3.note, /前提イシューの失敗・ブロックにより未着手: #2/)
  assert.ok(!labelsOf(calls).includes('plan:#3'))
  assert.ok(labelsOf(calls).includes('plan:#4'), '無関係な葉は通常どおり実装する')
})

test('中間ノードのラベルはそのノードの verify-close だけを止め、子は実装され、親は待つ（子孫へは継承しない）', async () => {
  const tree = [node(1, 0, { sub: 1 }), node(10, 1, { sub: 2 }), node(11, 10), node(12, 10, { si: 1 })]
  const { result, calls } = await runScript({
    args: ARGS({ skipLabels: ['owner:human'] }),
    override: skipOverride({ 'owner:human': [10] }, tree),
  })
  const l = labelsOf(calls)
  assert.ok(l.includes('plan:#11') && l.includes('plan:#12'), '子が実装されていない')
  assert.ok(!l.some((x) => /verify|close/.test(x) && x.includes('#10')), '対象外ノードの verify-close を起動した')
  const r10 = result.done.find((r) => r.issue === 10)
  assert.equal(r10.status, 'blocked')
  assert.match(r10.note, /owner:human/)
  const r1 = result.done.find((r) => r.issue === 1)
  assert.equal(r1.status, 'blocked')
  assert.match(r1.note, /子イシューの失敗・ブロックによりクローズ検証を保留: #10/)
})

test('closed のノードは番号が一致しても対象外にならない（既存の closed skip）', async () => {
  const tree = [node(1, 0, { sub: 2 }), node(2, 1, { state: 'closed' }), node(3, 1, { si: 1 })]
  const { result } = await runScript({ args: ARGS({ skipLabels: ['owner:human'] }), override: skipOverride({ 'owner:human': [2] }, tree) })
  assert.equal(result.done.find((r) => r.issue === 2).note, 'すでに closed')
  assert.deepEqual(result.skippedLabels.matched, [])
})

// --- 取得の再試行と fail-closed ---

test('sig の不一致は 1 回だけ再試行し、再試行で取れれば通常どおり', async () => {
  const labels = ['owner:human']
  let n = 0
  const { result, calls } = await runScript({
    args: ARGS({ skipLabels: labels }),
    leaves: [2, 3],
    override: (label) => {
      if (!label.startsWith('plan:skip-labels')) return undefined
      n++
      return n === 1 ? { entries: [{ i: 1, x: 0, numbers: [2], sig: 12345 }] } : skipReply(labels, { 'owner:human': [2] })
    },
  })
  assert.deepEqual(labelsOf(calls).filter((l) => l.startsWith('plan:skip-labels')), ['plan:skip-labels', 'plan:skip-labels-retry'])
  assert.deepEqual(result.skippedLabels, { labels, matched: [2], unknown: [], absent: [] })
  assert.ok(labelsOf(calls).includes('plan:#3'))
  assert.ok(!labelsOf(calls).includes('plan:#2'))
})

test('欠落したラベルだけでも再試行は 1 回で、なお取れなければ open ノードを全て待たせる（fail-closed）', async () => {
  const labels = ['owner:human', 'owner:joint']
  const { result, calls } = await runScript({
    args: ARGS({ skipLabels: labels }),
    leaves: [2, 3],
    override: (label) => {
      if (label.startsWith('plan:skip-labels')) return { entries: [labelEntry(1, [])] } // 2 番目のラベルが常に欠落
      return undefined
    },
  })
  assert.deepEqual(labelsOf(calls).filter((l) => l.startsWith('plan:skip-labels')), ['plan:skip-labels', 'plan:skip-labels-retry'])
  assert.deepEqual(startedLabels(calls), [], '取得できないのに着手した')
  assert.deepEqual(result.skippedLabels, { labels, matched: [1, 2, 3], unknown: ['owner:joint'], absent: [] })
  for (const n of [1, 2, 3]) assert.equal(result.done.find((r) => r.issue === n).status, 'blocked')
  assert.match(result.done.find((r) => r.issue === 2).note, /対象外ラベル（owner:joint）の一覧を取得できず未着手/)
  assert.equal(result.halted, null)
})

test('agent の例外が続いても fail-closed（着手しない）', async () => {
  const { result, calls } = await runScript({
    args: ARGS({ skipLabels: ['owner:human'] }),
    leaves: [2],
    override: (label) => {
      if (label.startsWith('plan:skip-labels')) throw new Error('agent boom')
      return undefined
    },
  })
  assert.deepEqual(startedLabels(calls), [])
  assert.deepEqual(result.skippedLabels.unknown, ['owner:human'])
})

// --- dryRun ---

test('dryRun: blocked.skippedLabel と skippedLabels.matched を返し、書き込み系の agent を起動しない', async () => {
  const labels = ['owner:human']
  const leaves = [2, 3, 4, 5, 6, 7, 8, 9]
  const { result, calls } = await runScript({
    args: ARGS({ skipLabels: labels, dryRun: true, notifyBlocked: true }),
    leaves,
    override: (label) => (label === 'plan:skip-labels' ? skipReply(labels, { 'owner:human': [2, 3, 4, 5, 6, 7, 8] }) : undefined),
  })
  assert.equal(result.dryRun, true)
  assert.deepEqual(result.blocked.skippedLabel, { count: 7, first: [2, 3, 4, 5, 6] })
  assert.deepEqual(result.skippedLabels, { labels, matched: [2, 3, 4, 5, 6, 7, 8], unknown: [], absent: [] })
  assert.deepEqual(result.startable.first, [9])
  assert.deepEqual(result.blocked.downstream.first, [1], '親は子の対象外で止まる（downstream）')
  assert.deepEqual(result.preBlocked, [], '対象外ラベルは preBlocked ではなく skippedLabel に数える')
  assert.ok(labelsOf(calls).includes('plan:skip-labels'), 'dryRun でもラベルの取得（読み取り）は行う')
  assert.ok(!calls.some((c) => /^(state:(update|init|cleanup)|plan:#|impl:#|notify-blocked)/.test(c.opts.label)), `書き込み系を起動: ${labelsOf(calls)}`)
})

test('dryRun: 未指定なら blocked に skippedLabel キーを足さない', async () => {
  const { result } = await runScript({ args: ARGS({ dryRun: true }), leaves: [2] })
  assert.ok(!('skippedLabel' in result.blocked) && !('skippedLabels' in result))
})

// --- notifyBlocked ---

test('notifyBlocked: 待ちがあれば、ルート issue へのコメントが 1 回呼ばれ、本文は番号と固定の文言だけ', async () => {
  const labels = ['owner:human']
  const tree = flat([2, 3])
  tree.find((n) => n.number === 2).title = 'INJECT-TITLE $(x)'
  const { result, calls } = await runScript({
    args: ARGS({ skipLabels: labels, notifyBlocked: true }),
    override: skipOverride({ 'owner:human': [2] }, tree),
  })
  const notify = calls.filter((c) => c.opts.label === 'notify-blocked')
  assert.equal(notify.length, 1)
  const p = notify[0].prompt
  assert.ok(p.includes("gh issue comment 1 --body \"$(cat <<'NBEOF'"))
  assert.ok(p.includes('- 対象外ラベルで待機中: #2'))
  assert.ok(!p.includes('INJECT-TITLE') && !p.includes('owner:human'), '外部由来の文字列（タイトル・ラベル名）が本文に入った')
  assert.deepEqual(result.blockedWaiting, { outOfTree: [], skippedLabel: [2], waitingOn: [] })
  assert.ok(labelsOf(calls).lastIndexOf('notify-blocked') > labelsOf(calls).findIndex((l) => l.startsWith('state:update-batch')), '状態ファイルの記録より後')
})

test('notifyBlocked: ツリー外の前提で blocked のときも通知し、blockedWaiting に前提の番号が出る', async () => {
  const tree = flat([2, 3], { 3: { dependsOn: [99] } })
  const { result, calls } = await runScript({
    args: ARGS({ notifyBlocked: true }),
    override: (label) => (label.startsWith('plan:issue-tree') ? { nodes: tree } : undefined),
  })
  assert.equal(calls.filter((c) => c.opts.label === 'notify-blocked').length, 1)
  assert.deepEqual(result.blockedWaiting, { outOfTree: [3], skippedLabel: [], waitingOn: [99] })
  assert.ok(!labelsOf(calls).some((l) => l.startsWith('plan:skip-labels')), 'skipLabels 未指定ではラベルを取得しない')
})

test('notifyBlocked: 待ちが無ければコメントしないが、blockedWaiting は空で返る', async () => {
  const { result, calls } = await runScript({ args: ARGS({ notifyBlocked: true }), leaves: [2] })
  assert.ok(!labelsOf(calls).includes('notify-blocked'))
  assert.deepEqual(result.blockedWaiting, { outOfTree: [], skippedLabel: [], waitingOn: [] })
})

test('notifyBlocked: false（既定）では待ちがあってもコメントせず、blockedWaiting も返さない', async () => {
  const labels = ['owner:human']
  const { result, calls } = await runScript({
    args: ARGS({ skipLabels: labels }),
    leaves: [2],
    override: (label) => (label === 'plan:skip-labels' ? skipReply(labels, { 'owner:human': [2] }) : undefined),
  })
  assert.ok(!labelsOf(calls).includes('notify-blocked'))
  assert.ok(!('blockedWaiting' in result))
})

test('notifyBlocked: コメントの agent が失敗してもランは完了する（非致命）', async () => {
  const labels = ['owner:human']
  const { result, logs } = await runScript({
    args: ARGS({ skipLabels: labels, notifyBlocked: true }),
    leaves: [2],
    override: (label) => {
      if (label === 'plan:skip-labels') return skipReply(labels, { 'owner:human': [2] })
      if (label === 'notify-blocked') throw new Error('comment boom')
      return undefined
    },
  })
  assert.deepEqual(result.blockedWaiting.skippedLabel, [2])
  assert.ok(logs.some((m) => m.includes('コメントに失敗した（非致命）')))
})

// --- ラン中に人手で close された対象外ノード ---
// 葉 2 は対象外ラベル、葉 3 は 2 に依存する。前提完了プローブで 2 が CLOSED と確認されたら done に入る。
// 開始時の blocked の予約や通知の対象をそのまま使うと、完了済みの 2 を古い blocked で上書き・通知してしまう。
const closedLeafOverride = (tree) => (label) => {
  if (label.startsWith('plan:issue-tree')) return { nodes: tree }
  if (label === 'plan:skip-labels') return skipReply(['owner:human'], { 'owner:human': [2] })
  if (label === 'prereq:probe') return { results: [{ issue: 2, issueState: 'CLOSED', prState: 'NONE', pr: 0, headRefName: '', baseRefName: '', isCrossRepository: true, closingIssues: [-1] }] }
  return undefined
}

test('ラン中に close された対象外ノードを、終了時の blocked 一括書き込みで上書きしない', async () => {
  const { calls } = await runScript({
    args: ARGS({ skipLabels: ['owner:human'] }),
    override: closedLeafOverride(flat([2, 3], { 3: { dependsOn: [2] } })),
  })
  assert.ok(labelsOf(calls).includes('prereq:probe'), '前提完了プローブが走っていない')
  const batch = calls.filter((c) => c.opts.label.startsWith('state:update-batch'))
  assert.ok(!batch.some((c) => c.prompt.includes('対象外ラベル（owner:human）のため未着手')), '完了済みの #2 を blocked で書いた')
  assert.ok(!batch.some((c) => /#2\b/.test(c.prompt)), '一括書き込みに #2 が含まれる')
})

test('notifyBlocked: ラン中に close された対象外ノードは待機中として通知・返却しない', async () => {
  const { result, calls } = await runScript({
    args: ARGS({ skipLabels: ['owner:human'], notifyBlocked: true }),
    override: closedLeafOverride(flat([2, 3], { 3: { dependsOn: [2] } })),
  })
  assert.ok(labelsOf(calls).includes('prereq:probe'), '前提完了プローブが走っていない')
  assert.deepEqual(result.blockedWaiting.skippedLabel, [])
  assert.ok(!labelsOf(calls).includes('notify-blocked'), '待ちが無いのに通知した')
})

// --- 保存状態を壊さない（merged / closed は書かず、pr / branch は消さない） ---
// 葉 2 に保存済みの状態 saved があり、対象外ラベルが付いたランで、一括書き込みのプロンプトを集める。
const withSaved = (saved, o = {}) => {
  const items = { 2: saved }
  const hashes = { 2: D.sha256Hex(D.canonicalJson(saved)) }
  const keysSha256 = D.sha256Hex(D.canonicalJson(['2']))
  const labels = ['owner:human', 'owner:joint']
  return runScript({
    args: ARGS({ skipLabels: labels }),
    leaves: [2],
    override: (label) => {
      if (label === 'state:load') return { ok: true, fileExisted: true, items, highWaterBytes: 0, highWaterVersion: 2 }
      if (label === 'state:load-verify') return { fileExists: true, hashes, keysSha256, keysCount: 1, highWaterBytes: 0, highWaterVersion: 2 }
      if (label.startsWith('plan:skip-labels')) return o.failClosed ? { entries: [labelEntry(1, [])] } : skipReply(labels, { 'owner:human': [2] })
      return undefined
    },
  })
}
// 一括書き込みの JSON 行（[{"numbers":[...],"patch":{...}}]）を集める
const batchEntries = (calls) => calls
  .filter((c) => c.opts.label.startsWith('state:update-batch'))
  .flatMap((c) => c.prompt.split('\n').filter((l) => l.startsWith('[{"numbers"')).flatMap((l) => JSON.parse(l)))
const batchNumbers = (calls) => batchEntries(calls).flatMap((e) => e.numbers)

for (const [name, o] of [['対象外ラベル', {}], ['取得失敗の fail-closed', { failClosed: true }]]) {
  test(`${name}: 保存状態が merged（pr・branch あり）で open のノードは、一括書き込みに含めない`, async () => {
    const { result, calls } = await withSaved({ status: 'merged', branch: 'feat/2-x', pr: 77 }, o)
    assert.ok(!batchNumbers(calls).includes(2), `merged の #2 を書いた: ${JSON.stringify(batchEntries(calls))}`)
    assert.equal(result.done.find((r) => r.issue === 2).status, 'blocked', 'このランでは着手しない')
    assert.equal(startedLabels(calls).filter((l) => l.endsWith('#2')).length, 0)
  })
  test(`${name}: 保存状態が closed で open のノードも、一括書き込みに含めない`, async () => {
    const { calls } = await withSaved({ status: 'closed', pr: 0 }, o)
    assert.ok(!batchNumbers(calls).includes(2), `closed の #2 を書いた: ${JSON.stringify(batchEntries(calls))}`)
  })
}

test('保存状態が blocked・pr>0（再開情報としては無効な branch なし）のノードを対象外にしても、書き込む patch に pr:0 を入れない', async () => {
  const { calls } = await withSaved({ status: 'blocked', note: 'old', pr: 77 })
  const e = batchEntries(calls).find((x) => x.numbers.includes(2))
  assert.ok(e && e.patch.status === 'blocked' && e.patch.note.includes('対象外ラベル（owner:human）のため未着手'), `対象外の blocked を書いていない: ${JSON.stringify(batchEntries(calls))}`)
  assert.ok(!('pr' in e.patch), `pr を書いた（pr・branch を保つ）: ${JSON.stringify(e.patch)}`)
})

// --- リポジトリへの束縛 ---

test('args.repo があれば、ラベル一覧・issue 一覧・通知コメントの全 gh 呼び出しが対象リポジトリに束縛される', async () => {
  const labels = ['owner:human']
  const { calls } = await runScript({
    args: ARGS({ repo: 'Fandhe-AI/target', skipLabels: labels, notifyBlocked: true }),
    leaves: [2],
    override: (label) => (label === 'plan:skip-labels' ? skipReply(labels, { 'owner:human': [2] }) : undefined),
  })
  const fetchPrompt = calls.find((c) => c.opts.label === 'plan:skip-labels').prompt
  assert.ok(fetchPrompt.includes('repos/Fandhe-AI/target/labels') && fetchPrompt.includes('repos/Fandhe-AI/target/issues'))
  assert.ok(!fetchPrompt.includes('{owner}'), 'カレントのリポジトリへ解決される形が残っている')
  const notify = calls.find((c) => c.opts.label === 'notify-blocked').prompt
  assert.ok(notify.includes("gh issue comment 1 -R Fandhe-AI/target --body"))
})

test('args.repo が無ければ、ツリー取得と同じくカレントのリポジトリ（{owner}/{repo}）で解決する', () => {
  const p = D.skipLabelsPrompt(['a'])
  assert.ok(p.includes('repos/{owner}/{repo}/labels') && p.includes('repos/{owner}/{repo}/issues'))
  assert.ok(D.notifyBlockedPrompt(7, { outOfTree: [1], skippedLabel: [], waitingOn: [] }).includes('gh issue comment 7 --body'))
})

// --- 存在しないラベル（typo・未作成）は fail-closed にせず警告と absent で知らせる ---

test('存在確認: ラベル一覧との照合は取得コマンド内で行い、ラベル名を外から取り込まない（grep -Fxiq の終了コードだけ）', () => {
  const p = D.skipLabelsPrompt(['owner:human'])
  assert.ok(p.includes('-f per_page=100 --paginate --jq \'.[].name\''))
  assert.ok(p.includes('grep -Fxiq -- "$l"'))
  assert.ok(p.includes('--argjson x "$x"'))
})

test('collectSkipLabelEntries: x = 1 は absent に集め、x は sig の対象（x の書き換えを検出する）', () => {
  const r = D.collectSkipLabelEntries([1, 2], { entries: [labelEntry(1, [], 1), labelEntry(2, [4], 0)] })
  assert.deepEqual(r.absent, [1])
  assert.deepEqual([...r.byIndex], [[1, []], [2, [4]]])
  const forged = { i: 1, x: 0, numbers: [], sig: D.declaredDepsChecksum(1 * 2 + 1, []) }
  assert.throws(() => D.collectSkipLabelEntries([1], { entries: [forged] }), /契約違反/)
})

test('存在しないラベル: 全停止せず（他のラベルの対象外は効く）、警告ログと skippedLabels.absent（sanitize 済み）を出す', async () => {
  const labels = ['owner:human', 'typo`$x']
  const { result, calls, logs } = await runScript({
    args: ARGS({ skipLabels: labels }),
    leaves: [2, 3],
    override: (label) => (label === 'plan:skip-labels' ? skipReply(labels, { 'owner:human': [2] }, ['typo`$x']) : undefined),
  })
  assert.deepEqual(result.skippedLabels.absent, ["typo'\\$x"])
  assert.deepEqual(result.skippedLabels.unknown, [])
  assert.deepEqual(result.skippedLabels.matched, [2])
  assert.ok(labelsOf(calls).includes('plan:#3'), '存在しないラベルのせいで全停止した')
  assert.ok(logs.some((m) => m.includes('リポジトリに存在しない') && m.includes("typo'\\$x")))
})

test('存在しないラベル: dryRun の skippedLabels.absent にも出る', async () => {
  const labels = ['nope']
  const { result } = await runScript({
    args: ARGS({ skipLabels: labels, dryRun: true }),
    leaves: [2],
    override: (label) => (label === 'plan:skip-labels' ? skipReply(labels, {}, ['nope']) : undefined),
  })
  assert.deepEqual(result.skippedLabels, { labels, matched: [], unknown: [], absent: ['nope'] })
})

test('存在するラベルだけなら absent は空', async () => {
  const { result } = await runScript({ args: ARGS({ skipLabels: ['a'] }), leaves: [2] })
  assert.deepEqual(result.skippedLabels.absent, [])
})
