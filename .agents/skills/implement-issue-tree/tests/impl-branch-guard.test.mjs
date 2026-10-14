// implement が返した branch の受理ゲート（implBranchViolation）の回帰テスト。
//
// 実ランで、implement が命名規約 <type>/<issueNumber>-<short-name> のブランチを作らず worktree の既定ブランチ
// （worktree-wf_…-37）のまま返した。従来のゲートは文字種（isValidBranchName）だけで、このブランチ名も通ったため Review・push・PR 作成
// まで進み、後段の checkPrBinding で初めて blocked になった（命名違反のリモートブランチと、ホストが追跡できない PR が残った）。
// 契約: Review・push より前に branchMatchesIssue まで検証し、通らなければ push も PR 作成もせず blocked で止める。
// 状態ファイルへ違反 branch を書かない（再実行が savedBranchMismatch で詰まらないように）。worktree は台帳に載せ、自動削除しない。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { importDefinitions, runScript, BASE_ARGS, source } from './lib/stub-run.mjs'

globalThis.args = { parent: 1, skillDir: '/opt/skills/implement-issue-tree' }
const m = await importDefinitions(['implBranchViolation', 'implBranchViolationKind', 'sha256Hex', 'canonicalJson'], 'impl-branch-guard')

test('implBranchViolation: 命名規約に合う branch は通る', () => {
  assert.equal(m.implBranchViolation('feat/628-x', 628), '')
  assert.equal(m.implBranchViolation('docs/627-testing-md-measured', 627), '')
  assert.equal(m.implBranchViolation('fix/2-a/b.c', 2), '')
})

test('implBranchViolation: worktree の既定ブランチ名・別イシューの番号・番号の前方一致・大文字の type を弾く', () => {
  assert.match(m.implBranchViolation('worktree-wf_ccc43988-8bf-37', 628), /命名規約/)
  assert.match(m.implBranchViolation('feat/627-x', 628), /命名規約/)
  assert.match(m.implBranchViolation('feat/6280-x', 628), /命名規約/)
  assert.match(m.implBranchViolation('Feat/628-x', 628), /命名規約/)
})

test('implBranchViolation: 文字種が不正・空・非文字列は「不正」で弾く', () => {
  for (const bad of ['', undefined, null, 'feat/628-x;rm', 'feat/..628-x', 5]) assert.match(m.implBranchViolation(bad, 628), /不正/, String(bad))
})

test('implBranchViolationKind: 文字種不正は invalid・命名違反は naming・受理は空文字', () => {
  for (const bad of ['', undefined, null, 'feat/628-x;rm', 'feat/..628-x', 5]) assert.equal(m.implBranchViolationKind(bad, 628), 'invalid', String(bad))
  for (const bad of ['worktree-wf_ccc43988-8bf-37', 'feat/627-x', 'feat/6280-x', 'Feat/628-x']) assert.equal(m.implBranchViolationKind(bad, 628), 'naming', bad)
  assert.equal(m.implBranchViolationKind('feat/628-x', 628), '')
})

const violating = (n) => `worktree-wf_test-${n}`
const stateWrites = (calls) => calls.filter((c) => c.opts.label.startsWith('state:')).map((c) => c.prompt)
// 違反名が branch / worktree の値として書かれていないこと（note の説明文に名前が出るのは可）
const wroteAsBranch = (prompt, name) => new RegExp(`"(branch|worktree)":\\s*"[^"]*${name}`).test(prompt)

test('通常経路: 命名違反の branch は Review・push・PR 作成を起動せず blocked で止まり、状態へ branch を書かない', async () => {
  const { result, calls } = await runScript({
    args: BASE_ARGS,
    override: (label) => (label === 'impl:#2' ? { branch: violating(2), summary: 's', worktreePath: '/repo/wt/2' } : undefined),
  })
  const labels = calls.map((c) => c.opts.label)
  assert.ok(labels.includes('impl:#2'))
  for (const l of labels) assert.ok(!/^(review|security-review|fix|pr-create|pr-bind|merge):#2/.test(l), `起動してはならない: ${l}`)
  const writes = stateWrites(calls)
  assert.ok(writes.length > 0)
  for (const w of writes) assert.ok(!wroteAsBranch(w, violating(2)), '違反 branch を状態ファイルへ書いてはならない')
  assert.ok(writes.some((w) => w.includes('blocked') && w.includes('命名規約')), 'blocked と理由を書く')
  const entry = result.done.find((r) => r.issue === 2)
  assert.equal(entry.status, 'blocked')
  assert.match(entry.note, /命名規約/)
  assert.equal(entry.worktree, '/repo/wt/2')
  assert.equal(entry.pr, undefined)
  assert.match(entry.note, /次回実行で再実装を試みる/)
})

test('通常経路: 文字種不正の branch は failed で止まり、halt の連続失敗に数える', async () => {
  const { result } = await runScript({
    args: BASE_ARGS,
    leaves: [2, 3, 4, 5],
    override: (label) => {
      const n = Number(/#(\d+)/.exec(label)?.[1])
      if (label.startsWith('impl:#') && n !== 5) return { branch: `feat/${n};rm`, summary: 's', worktreePath: `/repo/wt/${n}` }
      return undefined
    },
  })
  assert.ok(result.halted, '3 件連続の文字種不正で halt する')
  const e = result.done.find((r) => r.issue === 2)
  assert.equal(e.status, 'failed')
  assert.match(e.note, /不正/)
})

test('blocked は halt を数えない（違反が 3 イシュー連続しても新規着手を止めない）', async () => {
  const { result } = await runScript({
    args: BASE_ARGS,
    leaves: [2, 3, 4, 5],
    override: (label) => {
      const n = Number(/#(\d+)/.exec(label)?.[1])
      if (label.startsWith('impl:#') && n !== 5) return { branch: violating(n), summary: 's', worktreePath: `/repo/wt/${n}` }
      return undefined
    },
  })
  assert.equal(result.halted, null, 'halt してはならない')
  assert.deepEqual(result.done.filter((r) => r.note && /命名規約/.test(r.note)).map((r) => r.issue).sort(), [2, 3, 4])
  assert.ok(result.done.some((r) => r.issue === 5), '4 件目も着手された')
})

const recoverRun = (implBranch, extra = {}) => {
  const item = { status: 'failed', branch: 'feat/2-x', worktree: '/repo/wt/old', pr: 77, ...extra }
  const hashes = { 2: m.sha256Hex(m.canonicalJson(item)) }
  const keysSha = m.sha256Hex(m.canonicalJson(Object.keys(hashes).sort()))
  return runScript({
    args: BASE_ARGS,
    override: (label) => {
      if (label === 'state:load') return { ok: true, fileExisted: true, items: { 2: item }, highWaterBytes: 0, highWaterVersion: 0 }
      if (label === 'state:load-verify') return { fileExists: true, hashes, keysSha256: keysSha, keysCount: 1, highWaterBytes: 0, highWaterVersion: 0 }
      if (label === 'recover:#2') return { decision: 'continue', branch: 'feat/2-x', wipCommitted: true, worktreeMissing: false, reason: 'test', brief: { done: 'd', remaining: 'r', broken: '' } }
      if (label === 'state:cleanup:#2') return { ok: true, retained: false }
      if (label === 'impl:#2') return { branch: implBranch, summary: 's', worktreePath: '/repo/wt/2' }
      return undefined
    },
  })
}

test('回復経路: 回復 Implement が命名違反の branch を返しても同じゲートで止まり、blocked の書き込みが pr: 0 で以前の PR を切り離す', async () => {
  const { result, calls } = await recoverRun(violating(2))
  const labels = calls.map((c) => c.opts.label)
  assert.ok(labels.includes('impl:#2'), '回復 Implement まで進んでいない（テストの前提が崩れた）')
  for (const l of labels) assert.ok(!/^(review|fix|pr-create|pr-bind|merge):#2/.test(l), `起動してはならない: ${l}`)
  const writes = stateWrites(calls)
  for (const w of writes) assert.ok(!wroteAsBranch(w, violating(2)))
  const blockedWrite = writes.find((w) => w.includes('blocked') && w.includes('回復 Implement'))
  assert.ok(blockedWrite, 'blocked の書き込みがある')
  assert.match(blockedWrite, /"pr":\s*0/, 'pr: 0 を含む（以前の pr: 77 を残さない）')
  const entry = result.done.find((r) => r.issue === 2)
  assert.equal(entry.status, 'blocked')
  assert.match(entry.note, /回復 Implement/)
})

test('回復経路: 文字種不正の branch は failed で止まり、halt に数える', async () => {
  const { result, calls } = await recoverRun('feat/2-x;rm')
  assert.ok(calls.some((c) => c.opts.label === 'impl:#2'))
  const entry = result.done.find((r) => r.issue === 2)
  assert.equal(entry.status, 'failed')
  assert.match(entry.note, /回復 Implement の branch 名が不正/)
})

test('回復経路: 違反で止まった結果の状態で次ランを回すと pr-bind / merge へ直行せず recover / impl から入る（pr が残る状態は対照）', async () => {
  const { calls: first } = await recoverRun(violating(2))
  const w = first.find((c) => c.opts.label.startsWith('state:') && c.prompt.includes('blocked') && c.prompt.includes('回復 Implement'))
  const patch = JSON.parse(/\{[^{}]*"status":\s*"blocked"[^{}]*\}/.exec(w.prompt)[0])
  // 書かれた patch を保存状態へ適用（continue 掃除が先に書く branch: 正規名 / worktree '' を含む）
  const next = { branch: 'feat/2-x', worktree: '', ...patch }
  const { calls } = await recoverRun(violating(2), next)
  const labels = calls.map((c) => c.opts.label)
  assert.ok(labels.some((l) => /^(recover|impl):#2/.test(l)), '再実装側へ入る')
  for (const l of labels) assert.ok(!/^(pr-bind|merge):#2/.test(l), `監視再開へ直行してはならない: ${l}`)
  // 対照: pr が残った blocked + 正規 branch は監視再開に入る（修正前の挙動）
  const { calls: ctl } = await recoverRun(violating(2), { status: 'blocked', branch: 'feat/2-x', worktree: '', pr: 77 })
  assert.ok(ctl.some((c) => /^(pr-bind|merge):#2/.test(c.opts.label)), '対照: pr > 0 の blocked は監視再開へ入る')
})

test('配線: implement の 2 つの受理地点が同じ implBranchViolation を経由し、文字種だけの旧ゲートが残っていない', () => {
  assert.equal(source.split('implBranchViolation(impl.branch, item.number)').length - 1, 2)
  assert.ok(!/if \(!isValidBranchName\(impl\.branch \?\? ''\)\)/.test(source))
})

test('implement のプロンプトの返却仕様に branch の命名要件がある', async () => {
  const { calls } = await runScript({ args: BASE_ARGS })
  const p = calls.find((c) => c.opts.label === 'impl:#2').prompt
  assert.match(p, /返却: branch（<type>\/2-<short-name> 形式のみ受理/)
})
