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

// 通常経路（Recover が discard で Plan へ戻る）。保存状態に branch / pr が残った状態（discard 後の planning 書き込みが反映されなかった場合を模す）
const normalRun = (saved) => {
  const item = { status: 'failed', branch: 'feat/2-x', worktree: '/repo/wt/old', pr: 77, ...saved }
  const hashes = { 2: m.sha256Hex(m.canonicalJson(item)) }
  const keysSha = m.sha256Hex(m.canonicalJson(Object.keys(hashes).sort()))
  return runScript({
    args: BASE_ARGS,
    override: (label) => {
      if (label === 'state:load') return { ok: true, fileExisted: true, items: { 2: item }, highWaterBytes: 0, highWaterVersion: 0 }
      if (label === 'state:load-verify') return { fileExists: true, hashes, keysSha256: keysSha, keysCount: 1, highWaterBytes: 0, highWaterVersion: 0 }
      if (label === 'recover:#2') return { decision: 'discard', branch: 'feat/2-x', wipCommitted: true, worktreeMissing: false, reason: 'test' }
      if (label === 'state:cleanup:#2') return { ok: true, retained: false }
      if (label === 'impl:#2') return { branch: violating(2), summary: 's', worktreePath: '/repo/wt/2' }
      return undefined
    },
  })
}

test('通常経路: 命名違反の blocked は pr: 0 と branch: "" を明示し、保存状態の pr: 77 / 正規 branch を残さない', async () => {
  const { calls } = await normalRun({})
  assert.ok(calls.some((c) => c.opts.label === 'impl:#2'), '通常経路の impl まで進んでいない（テストの前提が崩れた）')
  const w = stateWrites(calls).find((p) => p.includes('blocked') && p.includes('命名規約'))
  assert.ok(w, 'blocked の書き込みがある')
  assert.match(w, /"pr":\s*0/, 'pr: 0 を含む')
  assert.match(w, /"branch":\s*""/, 'branch を空へ戻す')
  assert.match(w, /"worktree":\s*""/, 'worktree も空へ戻す（古い worktree で Recover を余計に回さない）')
})

test('通常経路: 違反で止まった結果の状態で次ランを回しても pr-bind / merge へ直行しない（pr が残る状態は対照）', async () => {
  const { calls: first } = await normalRun({})
  const w = first.find((c) => c.opts.label.startsWith('state:') && c.prompt.includes('blocked') && c.prompt.includes('命名規約'))
  const patch = JSON.parse(/\{[^{}]*"status":\s*"blocked"[^{}]*\}/.exec(w.prompt)[0])
  const { calls } = await normalRun(patch)
  for (const l of calls.map((c) => c.opts.label)) assert.ok(!/^(pr-bind|merge):#2/.test(l), `監視再開へ直行してはならない: ${l}`)
  const { calls: ctl } = await normalRun({ status: 'blocked', branch: 'feat/2-x', pr: 77 })
  assert.ok(ctl.some((c) => /^(pr-bind|merge):#2/.test(c.opts.label)), '対照: pr > 0 の blocked + 正規 branch は監視再開へ入る')
})

// レビューアの再現形: 保存状態は branch 空・worktree あり。Recover が worktree の HEAD（規約外の既定ブランチ名）を解決して返す。
const nonconformingRun = (decision, extra = {}) => {
  const item = { status: 'failed', branch: '', worktree: '/repo/wt/old', pr: 0, ...extra.saved }
  const hashes = { 2: m.sha256Hex(m.canonicalJson(item)) }
  const keysSha = m.sha256Hex(m.canonicalJson(Object.keys(hashes).sort()))
  return runScript({
    args: BASE_ARGS,
    override: (label) => {
      if (label === 'state:load') return { ok: true, fileExisted: true, items: { 2: item }, highWaterBytes: 0, highWaterVersion: 0 }
      if (label === 'state:load-verify') return { fileExists: true, hashes, keysSha256: keysSha, keysCount: 1, highWaterBytes: 0, highWaterVersion: 0 }
      if (label === 'recover:#2') return { decision, branch: violating(2), wipCommitted: true, worktreeMissing: false, reason: 'test', brief: { done: 'd', remaining: 'r', broken: '' }, ...extra.recover }
      if (label === 'state:cleanup:#2') return extra.cleanup ?? { ok: true, retained: false }
      if (label === 'impl:#2') return { branch: 'feat/2-x', summary: 's', worktreePath: '/repo/wt/2' }
      return undefined
    },
  })
}

test('Recover discard が規約外 branch を解決: worktree は discard で掃除し branch は消さず、新規 Plan / Implement へ進む（毎ラン同じ failed に戻らない）', async () => {
  const { calls } = await nonconformingRun('discard')
  const labels = calls.map((c) => c.opts.label)
  // discard の掃除だけを見る（後続の通常フローが旧 worktree に対して起動する superseded の掃除は対象外）
  const cleanup = calls.filter((c) => c.opts.label === 'state:cleanup:#2' && c.prompt.includes('--mode discard'))
  assert.equal(cleanup.length, 1, '旧 worktree の掃除を 1 回起動する')
  assert.match(cleanup[0].prompt, /worktree-remove\.sh|run-verified\.sh/)
  assert.match(cleanup[0].prompt, /remove --mode discard --path/)
  assert.ok(!/--branch/.test(cleanup[0].prompt), '規約外 branch は消さない（--branch を渡さない）')
  assert.ok(labels.includes('plan:#2') && labels.includes('impl:#2'), '新規の Plan / Implement へ進む')
  for (const w of stateWrites(calls)) assert.ok(!wroteAsBranch(w, violating(2)), '規約外の branch を状態へ書いてはならない')
  assert.ok(stateWrites(calls).some((w) => w.includes('planning')), 'planning へ戻す')
  // 残した規約外ブランチの名前を状態の note に残す（掃除成功後の planning 書き込みに載せる）
  const planning = stateWrites(calls).find((w) => w.includes('planning') && w.includes('削除せず残した'))
  assert.ok(planning, 'planning の書き込みに「削除せず残した」note がある')
  assert.ok(planning.includes(violating(2)), 'note に規約外ブランチ名が入る')
})

test('Recover discard が規約外 branch を解決: 保存済みの pr が正なら、pr: 0 で切り離す前にその番号をログに残す', async () => {
  const { calls, logs } = await nonconformingRun('discard', { saved: { pr: 77 } })
  assert.ok(calls.some((c) => c.opts.label === 'plan:#2'))
  assert.ok((logs ?? []).some((l) => /#77/.test(l) && /#2/.test(l)), '保存済み PR #77 をログに残す')
})

test('Recover discard が規約外 branch を解決: 掃除で worktree が保持されたら、既存の discard 保持時と同じく Plan へ進まず保全する', async () => {
  const { result, calls } = await nonconformingRun('discard', { cleanup: { ok: false, retained: true } })
  for (const l of calls.map((c) => c.opts.label)) assert.ok(!/^(plan|impl|review|pr-create|pr-bind|merge):#2/.test(l), `起動してはならない: ${l}`)
  const entry = result.done.find((r) => r.issue === 2)
  assert.ok(['failed', 'blocked'].includes(entry.status))
  assert.match(entry.note, /保持/)
})

test('Recover discard が規約外 branch を解決: 掃除が保持を返したら、保存済みの branch / pr を書き換えない（planning も書かない）', async () => {
  const { calls, result } = await nonconformingRun('discard', { saved: { pr: 77, branch: 'feat/2-prev' }, cleanup: { ok: false, retained: true } })
  assert.ok(['failed', 'blocked'].includes(result.done.find((r) => r.issue === 2).status))
  for (const w of stateWrites(calls).filter((p) => p.includes('"numbers":[2]'))) {
    assert.ok(!/"branch":\s*""/.test(w) && !/"pr":\s*0/.test(w), `保存済みの branch / pr を消してはならない: ${w.slice(-300)}`)
    assert.ok(!/"status":\s*"planning"/.test(w), '保持なら planning を書かない')
  }
})

test('Recover discard が規約外 branch を解決: wipCommitted が true でなければ掃除せず failed で保全する', async () => {
  const { result, calls } = await nonconformingRun('discard', { recover: { wipCommitted: false } })
  for (const c of calls) assert.ok(!c.opts.label.startsWith('state:cleanup'), '掃除を起動してはならない')
  for (const l of calls.map((c) => c.opts.label)) assert.ok(!/^(plan|impl):#2/.test(l))
  assert.equal(result.done.find((r) => r.issue === 2).status, 'failed')
})

test('Recover continue が規約外 branch を解決: 継続せず blocked（halt に数えない）で止め、note に人が直す手段を書き、worktree と branch を触らない', async () => {
  const { result, calls } = await nonconformingRun('continue')
  const labels = calls.map((c) => c.opts.label)
  for (const l of labels) assert.ok(!/^(impl|plan|review|pr-create|pr-bind|merge):#2/.test(l), `起動してはならない: ${l}`)
  for (const c of calls) assert.ok(!c.opts.label.startsWith('state:cleanup'), '掃除を起動してはならない')
  for (const w of stateWrites(calls)) assert.ok(!wroteAsBranch(w, violating(2)), '規約外の branch を書いてはならない')
  const entry = result.done.find((r) => r.issue === 2)
  assert.equal(entry.status, 'blocked')
  assert.match(entry.note, /命名規約/)
  assert.match(entry.note, /<type>\/2-<short-name> へ改名/)
  assert.ok(!/worktree を削除して再実行/.test(entry.note), '削除の案内は書かない（状態の worktree 記録が残り保全の failed に戻るため）')
  const w = stateWrites(calls).find((p) => p.includes('blocked'))
  assert.match(w, /"pr":\s*0/, '以前の PR を残さない')
  assert.ok(!/"worktree":\s*""/.test(w), 'worktree の記録は消さない')
})

test('Recover continue が規約外 branch を解決: 3 イシュー連続でも halt しない', async () => {
  const items = {}
  for (const n of [2, 3, 4]) items[n] = { status: 'failed', branch: '', worktree: `/repo/wt/old${n}`, pr: 0 }
  const hashes = Object.fromEntries(Object.entries(items).map(([k, v]) => [k, m.sha256Hex(m.canonicalJson(v))]))
  const keysSha = m.sha256Hex(m.canonicalJson(Object.keys(hashes).sort()))
  const { result } = await runScript({
    args: BASE_ARGS,
    leaves: [2, 3, 4, 5],
    override: (label) => {
      if (label === 'state:load') return { ok: true, fileExisted: true, items, highWaterBytes: 0, highWaterVersion: 0 }
      if (label === 'state:load-verify') return { fileExists: true, hashes, keysSha256: keysSha, keysCount: 3, highWaterBytes: 0, highWaterVersion: 0 }
      const n = Number(/#(\d+)/.exec(label)?.[1])
      if (label.startsWith('recover:#')) return { decision: 'continue', branch: violating(n), wipCommitted: true, worktreeMissing: false, reason: 'test', brief: { done: 'd', remaining: 'r', broken: '' } }
      return undefined
    },
  })
  assert.equal(result.halted, null, 'halt してはならない')
})

test('implement のプロンプト: 規約外の headRefName を持つ既存 open PR は本イシューの PR として採用しない', async () => {
  const { calls } = await runScript({ args: BASE_ARGS })
  const p = calls.find((c) => c.opts.label === 'impl:#2').prompt
  assert.match(p, /headRefName が <type>\/2-<short-name> 形式[^\n]*に合わない PR を本イシューの PR として採用しない[^\n]*0b-b へ進む。以降は 0b-b の判定に従う/)
  // 0b-a が手順 2 での新規作成を断定すると、0b-b の再利用（手順 2 スキップ）と食い違う
  assert.ok(!/0b-b へ進み、手順 2 で規約どおりのブランチを新規に作る/.test(p))
  assert.match(p, /0b-b\. open PR が見つからなかった場合（形式に合わず採用しなかった場合を含む）/)
  assert.match(p, /既存 PR を採用した場合のみ、手順 2 はスキップして/)
  // 成功経路でホストが読む返却項目 outOfScope（PR 本文の対象外節へ流れる）に入れさせる。summary は成功時に誰も読まない
  assert.match(p, /採用しなかった PR[^\n]*があれば、返却フィールド outOfScope に「既存 PR #<番号> は head が命名規約外のため採用していない」の形で 1 PR 1 要素/)
  assert.ok(!/その番号を返却の summary に書く/.test(p))
})

test('採用しなかった PR の申告は outOfScope 経由で pr-create のプロンプト（PR 本文の対象外節）に届く', async () => {
  const note = '既存 PR #77 は head が命名規約外のため採用していない'
  const { calls } = await runScript({
    args: BASE_ARGS,
    override: (label) => (label === 'impl:#2' ? { branch: 'feat/2-x', summary: 's', worktreePath: '/repo/wt/2', outOfScope: [note] } : undefined),
  })
  const pr = calls.find((c) => c.opts.label === 'pr-create:#2')
  assert.ok(pr, 'pr-create まで進む')
  assert.ok(pr.prompt.includes('## 対象外（out-of-scope）') && pr.prompt.includes(note), 'PR 本文の対象外節に載る')
  // 既存 PR を再利用する経路（gh pr edit で本文を更新する側）にも同じ対象外節の追記指示がある
  assert.match(pr.prompt, /対象外項目は最終レポートの issue 化判断の材料であり、再利用経路でも失われてはならない/)
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

// worktree の記録だけが残る形: 状態は branch 空・worktree 記録あり、Recover は worktreeMissing: true / branch 空 で discard を返す。
const gone = { status: 'blocked', branch: '', worktree: '/repo/wt/old', pr: 0, note: 'x' }
const goneRecover = { decision: 'discard', branch: '', worktreeMissing: true, wipCommitted: true, reason: 'no commits' }
const goneRun = (saved, recover) => {
  const item = { ...gone, ...saved }
  const hashes = { 2: m.sha256Hex(m.canonicalJson(item)) }
  const keysSha = m.sha256Hex(m.canonicalJson(Object.keys(hashes).sort()))
  return runScript({
    args: BASE_ARGS,
    override: (label) => {
      if (label === 'state:load') return { ok: true, fileExisted: true, items: { 2: item }, highWaterBytes: 0, highWaterVersion: 0 }
      if (label === 'state:load-verify') return { fileExists: true, hashes, keysSha256: keysSha, keysCount: 1, highWaterBytes: 0, highWaterVersion: 0 }
      if (label === 'recover:#2') return { ...goneRecover, ...recover }
      if (label === 'state:cleanup:#2') return { ok: true, retained: false }
      if (label === 'impl:#2') return { branch: 'feat/2-x', summary: 's', worktreePath: '/repo/wt/2' }
      return undefined
    },
  })
}

test('worktreeMissing 申告で branch がどこにも無い discard: 従来どおり failed で保全し、何も削除せず Plan へ進まない', async () => {
  // 申告は誤りうる（旧パスに未 push のコミットを持つ detached worktree が実在しうる）ため、削除の根拠にしない
  const { result, calls } = await goneRun({}, {})
  for (const c of calls) assert.ok(!c.opts.label.startsWith('state:cleanup'), `掃除（worktree-remove）を起動してはならない: ${c.opts.label}`)
  for (const l of calls.map((c) => c.opts.label)) assert.ok(!/^(plan|impl|review|pr-create|pr-bind|merge):#2/.test(l), `起動してはならない: ${l}`)
  assert.equal(result.done.find((r) => r.issue === 2).status, 'failed')
  for (const w of stateWrites(calls)) assert.ok(!/"status":\s*"planning"/.test(w) && !/"worktree":\s*""/.test(w), 'planning を書かず worktree の記録も消さない')
})

test('worktreeMissing の discard でも、branch がどちらかにあれば従来どおり（worktree と branch を掃除）', async () => {
  // 保存済み branch あり: 既存の discard 経路（worktree と branch を掃除）
  const a = await goneRun({ branch: 'feat/2-x' }, {})
  assert.ok(a.calls.some((c) => c.opts.label === 'state:cleanup:#2' && c.prompt.includes('--branch')), '保存済み branch がある場合は branch を含む既存の discard 掃除')
  // Recover が解決した branch あり（worktree 不在・保存済み branch なし）も既存の discard 経路（新しい分岐は使わない）
  const b = await goneRun({}, { branch: 'feat/2-x' })
  assert.ok(b.calls.some((c) => c.opts.label === 'state:cleanup:#2' && c.prompt.includes('--branch')))
  // worktreeMissing が false なら従来の保全（failed）
  const c = await goneRun({}, { worktreeMissing: false })
  assert.ok(!c.calls.some((x) => /^(plan|impl):#2/.test(x.opts.label)))
  assert.equal(c.result.done.find((r) => r.issue === 2).status, 'failed')
})

test('continue の blocked の対処 (a): ブランチを <type>/N-<name> へ改名して再実行すると継続できる', async () => {
  const { result, calls } = await goneRun({}, { decision: 'continue', branch: 'feat/2-renamed', worktreeMissing: false, brief: { done: 'd', remaining: 'r', broken: '' } })
  const labels = calls.map((c) => c.opts.label)
  assert.ok(labels.includes('impl:#2'), '継続の Implement へ進む')
  assert.ok(!labels.includes('plan:#2'), '継続なので Plan は起動しない')
  assert.ok(labels.includes('pr-create:#2'), 'Review を通って PR 作成まで進む（命名ゲートで止まらない）')
  assert.ok(!/命名規約/.test(result.done.find((r) => r.issue === 2)?.note ?? ''))
})
