// worktree の破棄・掃除をスクリプト（scripts/worktree-remove.sh）へ切り出した（Issue #603 第 7 弾）あとの、ホスト側の配線の回帰テスト。
//
// 三層:
//   1. updateStateDetailed の掃除（state:cleanup）: モード（superseded / discard）・引数の組み立て・結果（ok / retained / branchSha）の扱い・
//      削除成功に数える条件（confirmedRemovedPaths）。
//   2. sweepClosedWorktrees: 1 コマンド（候補は nonce 区切りのヒアドキュメント）・返ってきた removed を候補集合と突き合わせること。
//   3. Recover の流れ（stub agent で実装スクリプト全体を走らせる）: wipCommitted の自己申告ゲートは残り、独立観測は削除と同じプロセス
//      （--mode discard）に移った。保持なら削除せず failed で保全する現行の意味が変わらないこと。verifyDiscardSafety（haiku）は呼ばれない。
// スクリプト自体の挙動（保持・削除の判断）は tests/worktree-remove*.test.mjs が実 git で固定する。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { importDefinitions, runScript, BASE_ARGS, source } from './lib/stub-run.mjs'

globalThis.args = { parent: 1, skillDir: '/opt/skills/implement-issue-tree' }
const m = await importDefinitions(
  ['updateStateDetailed', 'updateState', 'sweepClosedWorktrees', 'sweepEligiblePaths', 'sweepHeldPaths', 'confirmedRemovedPaths', 'classifyStateWriteFailureStatus', 'ensureBoundaryNonceSeed', 'sha256Hex', 'canonicalJson'],
  'worktree-remove-host',
)
globalThis.agent = async (_p, opts) => (opts.label === 'nonce:seed' ? { seedHex: '0'.repeat(64) } : null)
globalThis.log = () => {}
await m.ensureBoundaryNonceSeed()

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
const cleanupCalls = (calls, n) => calls.filter((c) => c.opts.label.startsWith(`state:cleanup:#${n}`))
const SHA = 'a'.repeat(40)
const CMD = /run-verified\.sh' \S+ worktree-remove\.sh (remove|sweep) [^\n]*/

// ---- 1. 掃除 ----

test('モード: 既定は superseded（--branch なし）。cleanupMode: discard は --mode discard。deleteBranch は discard で --branch と --base を付ける', async () => {
  const { calls } = stub(() => ({ ok: true, retained: false }))
  assert.equal(await m.updateState(10, { status: 'merged' }, { cleanupWorktree: '/tmp/wt-10' }), true)
  assert.equal(CMD.exec(cleanupCalls(calls, 10)[0].prompt)[0].replace(/^.*worktree-remove\.sh /, ''), "remove --mode superseded --path '/tmp/wt-10'")

  stub(() => ({ ok: true, retained: false }))
  const c2 = stub(() => ({ ok: true, retained: false }))
  await m.updateState(11, { status: 'implementing', branch: 'feat/11-x', worktree: '' }, { cleanupWorktree: '/tmp/wt-11', cleanupMode: 'discard' })
  assert.match(CMD.exec(cleanupCalls(c2.calls, 11)[0].prompt)[0], /worktree-remove\.sh remove --mode discard --path '\/tmp\/wt-11'$/)

  const c3 = stub(() => ({ ok: true, retained: false }))
  await m.updateState(12, { branch: 'feat/12-x' }, { cleanupWorktree: '/tmp/wt-12', deleteBranch: true })
  assert.match(CMD.exec(cleanupCalls(c3.calls, 12)[0].prompt)[0], /worktree-remove\.sh remove --mode discard --path '\/tmp\/wt-12' --branch 'feat\/12-x' --base 'main'$/)
})

test('worktree 指定のない discard（ブランチだけ）は --path なしの 1 コマンドで、.worktree のクリア手順を持たない。base と同名・不正な名前のブランチは渡さない', async () => {
  const c1 = stub(() => ({ ok: true, retained: false }))
  await m.updateState(13, { branch: 'feat/13-x' }, { deleteBranch: true })
  const p = cleanupCalls(c1.calls, 13)[0].prompt
  assert.match(CMD.exec(p)[0], /worktree-remove\.sh remove --mode discard --branch 'feat\/13-x' --base 'main'$/)
  assert.doesNotMatch(p, /state\.sh/)

  for (const branch of ['main', 'a b', "x'; rm -x", '-D', '']) {
    const c = stub(() => ({ ok: true, retained: false }))
    assert.equal(await m.updateState(14, { branch }, { deleteBranch: true }), true)
    assert.equal(cleanupCalls(c.calls, 14).length, 0, `掃除エージェントを起動しない: ${JSON.stringify(branch)}`)
  }
})

test('検証を通らないパス（引用符・.. ・相対・空）は掃除の対象にならず、コマンドに入らない。空白を含む正当なパスは単一引用符で包む', async () => {
  for (const bad of ["/tmp/a'b", '/tmp/../x', 'relative', '/tmp/a;b', '/tmp/$(x)', '']) {
    const c = stub(() => ({ ok: true, retained: false }))
    await m.updateState(15, { status: 'merged' }, { cleanupWorktree: bad })
    assert.equal(cleanupCalls(c.calls, 15).length, 0, bad)
  }
  const c = stub(() => ({ ok: true, retained: false }))
  await m.updateState(15, { status: 'merged' }, { cleanupWorktree: '/tmp/my repo/wt-15' })
  assert.match(CMD.exec(cleanupCalls(c.calls, 15)[0].prompt)[0], /--path '\/tmp\/my repo\/wt-15'$/)
})

test('retained: ok でも worktree が残った（lock・submodule の未記録の変更・削除の失敗）パスは confirmedRemovedPaths に入れない。消せたパスは入れる', async () => {
  stub(() => ({ ok: true, retained: true }))
  const d1 = await m.updateStateDetailed(20, { status: 'merged' }, { cleanupWorktree: '/tmp/wt-20' })
  assert.deepEqual([d1.ok, d1.cleanupOk, d1.retained, d1.outputMissing], [true, true, true, false])
  assert.ok(!m.confirmedRemovedPaths.has('/tmp/wt-20'), '残った実体を du の対象から外さない')

  stub(() => ({ ok: true, retained: false }))
  const d2 = await m.updateStateDetailed(21, { status: 'merged' }, { cleanupWorktree: '/tmp/wt-21' })
  assert.deepEqual([d2.ok, d2.retained], [true, false])
  assert.ok(m.confirmedRemovedPaths.has('/tmp/wt-21'))
})

test('discard が保持した（汚れ・初期化済み submodule・lock）= ok:false・retained:true・outputMissing:false → 終端は blocked ではなく failed。ブランチも消えない前提で保全される', async () => {
  const { calls, logs } = stub((opts) => (opts.label.startsWith('state:cleanup') ? { ok: false, retained: true } : { ok: true }))
  const d = await m.updateStateDetailed(22, { branch: 'feat/22-x' }, { cleanupWorktree: '/tmp/wt-22', cleanupMode: 'discard', deleteBranch: true })
  assert.deepEqual([d.ok, d.mergeOk, d.cleanupOk, d.retained, d.outputMissing], [false, true, false, true, false])
  assert.equal(cleanupCalls(calls, 22).length, 1, '保持は StructuredOutput の未返却ではないのでフォールバックしない')
  assert.equal(m.classifyStateWriteFailureStatus({ outputMissing: d.outputMissing, terminalSaved: false, prNumber: 0 }), 'failed')
  assert.ok(logs.some((l) => /worktree を保持した/.test(l)))
  assert.ok(!m.confirmedRemovedPaths.has('/tmp/wt-22'))
})

test('掃除の返却に retained が無い（古い形の {ok:true}）は有効な結果として受理しない: sonnet へフォールバックし、それでも無ければ outputMissing（削除成功に数えない）', async () => {
  const { calls } = stub((opts) => (opts.label.startsWith('state:cleanup') ? { ok: true } : { ok: true }))
  const d = await m.updateStateDetailed(23, { status: 'merged' }, { cleanupWorktree: '/tmp/wt-23' })
  assert.equal(cleanupCalls(calls, 23).length, 2)
  assert.deepEqual([d.ok, d.outputMissing, d.retained], [false, true, true])
  assert.ok(!m.confirmedRemovedPaths.has('/tmp/wt-23'))
})

test('マージ段が失敗したときは掃除を起動せず、retained 扱い（削除成功に数えない）', async () => {
  const { calls } = stub(() => ({ ok: false }))
  const d = await m.updateStateDetailed(24, { status: 'merged' }, { cleanupWorktree: '/tmp/wt-24' })
  assert.equal(cleanupCalls(calls, 24).length, 0)
  assert.deepEqual([d.ok, d.mergeOk, d.retained], [false, false, true])
})

test('branchSha: 40 桁の 16 進だけをログに出す（復元の手がかり）。形が違う値・消していないブランチでは出さず、プロンプトにも入らない', async () => {
  const s1 = stub((opts) => (opts.label.startsWith('state:cleanup') ? { ok: true, retained: false, branchSha: SHA } : { ok: true }))
  const d = await m.updateStateDetailed(25, { branch: 'feat/25-x' }, { cleanupWorktree: '/tmp/wt-25', deleteBranch: true })
  assert.equal(d.branchSha, SHA)
  assert.ok(s1.logs.some((l) => l.includes(SHA) && /reflog に残らない/.test(l)))
  assert.ok(cleanupCalls(s1.calls, 25).every((c) => !c.prompt.includes(SHA)))

  for (const bad of ['xyz', 'A'.repeat(40), 'a'.repeat(39), '']) {
    const s = stub((opts) => (opts.label.startsWith('state:cleanup') ? { ok: true, retained: false, branchSha: bad } : { ok: true }))
    const r = await m.updateStateDetailed(26, { branch: 'feat/26-x' }, { cleanupWorktree: '/tmp/wt-26', deleteBranch: true })
    assert.equal(r.branchSha, '')
    assert.ok(!s.logs.some((l) => /削除前の先頭 sha/.test(l)), JSON.stringify(bad))
  }
})

test('掃除プロンプトの手順の本文はスクリプトに移っている（unlock・--force・rm・porcelain の確認を文章で持たない）', async () => {
  const { calls } = stub(() => ({ ok: true, retained: false }))
  await m.updateState(27, { branch: 'feat/27-x' }, { cleanupWorktree: '/tmp/wt-27', deleteBranch: true })
  const p = cleanupCalls(calls, 27)[0].prompt
  // 「自分で実行して代替しない」という禁止の一文は除く（手順として持っていないことを見る）
  const body = p.slice(p.indexOf('対象は下記コマンド')).replace(/git worktree remove \/ unlock・git branch -D・rm を[^\n]*/, '')
  assert.doesNotMatch(body, /git worktree (list|unlock|remove)|branch -D -- "\$b"|rm -rf|--porcelain|realpath/)
})

// ---- 2. 最終スイープ ----

// 候補の集合（sweepEligiblePaths）はモジュール内に溜まるので、スイープのテストはそれぞれ新しいモジュールを読み込む
async function fresh(tag) {
  const saved = globalThis.agent
  globalThis.agent = async (_p, opts) => (opts.label === 'nonce:seed' ? { seedHex: '0'.repeat(64) } : null)
  const mod = await importDefinitions(['sweepClosedWorktrees', 'ensureBoundaryNonceSeed'], tag)
  await mod.ensureBoundaryNonceSeed()
  globalThis.agent = saved
  return mod
}

test('sweep: 候補がなければエージェントを起動しない。あれば worktree-remove.sh sweep の 1 コマンド（候補は nonce 区切りのヒアドキュメント）で、手順の本文を持たない', async () => {
  const f = await fresh('sweep-1')
  const none = stub(() => ({ removed: [] }))
  assert.deepEqual(await f.sweepClosedWorktrees([]), [])
  assert.equal(none.calls.length, 0)

  const s = stub(() => ({ removed: ['/tmp/orph-1'] }))
  const removed = await f.sweepClosedWorktrees(['/tmp/orph-1', '/tmp/orph-2'])
  assert.deepEqual(removed, ['/tmp/orph-1'])
  assert.equal(s.calls.length, 1)
  const p = s.calls[0].prompt
  assert.match(p, /worktree-remove\.sh sweep --file _\/issue-trees\/1\.json <<'SWEEP_EOF_[0-9a-z]+'\n\[[^\n]*\/tmp\/orph-1[^\n]*\]\nSWEEP_EOF_[0-9a-z]+\n/)
  // 共通規則（TEMP_FILE_POLICY）は mktemp などの語を含むので、手順の本文（「次のコマンドを」以降）だけを見る
  assert.doesNotMatch(p.slice(p.indexOf('次のコマンドを')).replace(/git worktree remove \/ unlock・git branch -D・rm を[^\n]*/, ''), /retain_file|registered_file|candidates_file|mktemp|git worktree|rm -rf/)
  assert.equal(s.calls[0].opts.label, 'worktree:sweep')
  assert.ok(s.logs.some((l) => /1 件を削除した/.test(l)))
})

test('sweep: 返ってきた removed のうち候補にないパス・文字列でないものは数えない。結果が無効・例外でも throw せず空', async () => {
  const f = await fresh('sweep-2')
  stub(() => ({ removed: ['/tmp/orph-3', '/etc', '/tmp/orph-3/../x', 5, null] }))
  assert.deepEqual(await f.sweepClosedWorktrees(['/tmp/orph-3']), ['/tmp/orph-3'])
  for (const reply of [null, undefined, {}, { removed: 'x' }, { removed: {} }]) {
    stub(() => reply)
    assert.deepEqual(await f.sweepClosedWorktrees(['/tmp/orph-4']), [], JSON.stringify(reply))
  }
  stub(() => { throw new Error('boom') })
  assert.deepEqual(await f.sweepClosedWorktrees(['/tmp/orph-5']), [])
})

test('sweep: 検証を通らない候補（引用符・.. ・相対）はヒアドキュメントに入れない', async () => {
  const f = await fresh('sweep-3')
  const s = stub(() => ({ removed: [] }))
  await f.sweepClosedWorktrees(["/tmp/a'b", '/tmp/../x', 'relative', '/tmp/ok-6'])
  const p = s.calls[0].prompt
  assert.match(p, /\["\/tmp\/ok-6"\]/)
  assert.doesNotMatch(p, /a'b|\.\.\/x|"relative"/)
})

// ---- 2b. discard で保持した worktree は最終スイープの候補から外れる ----

// 候補の集合（sweepEligiblePaths・sweepHeldPaths）はモジュール内に溜まるので、テストごとに新しいモジュールを読み込む
async function freshAll(tag) {
  const saved = globalThis.agent
  globalThis.agent = async (_p, opts) => (opts.label === 'nonce:seed' ? { seedHex: '0'.repeat(64) } : null)
  const mod = await importDefinitions(['updateStateDetailed', 'updateState', 'sweepClosedWorktrees', 'sweepEligiblePaths', 'sweepHeldPaths', 'confirmedRemovedPaths', 'ensureBoundaryNonceSeed'], tag)
  await mod.ensureBoundaryNonceSeed()
  globalThis.agent = saved
  return mod
}
const sweepCalls = (calls) => calls.filter((c) => c.opts.label === 'worktree:sweep')

test('discard が保持した worktree は sweepEligiblePaths に残っても最終スイープの候補に入らない（superseded で保持したものは回収対象のまま）', async () => {
  const f = await freshAll('held-1')
  const s1 = stub((opts) => (opts.label.startsWith('state:cleanup') ? { ok: false, retained: true } : { ok: true }))
  await f.updateStateDetailed(30, { status: 'implementing', branch: 'feat/30-x', worktree: '' }, { cleanupWorktree: '/tmp/wt-30', cleanupMode: 'discard' })
  assert.ok(f.sweepEligiblePaths.has('/tmp/wt-30') && f.sweepHeldPaths.has('/tmp/wt-30'))
  assert.deepEqual(await f.sweepClosedWorktrees([]), [])
  assert.equal(sweepCalls(s1.calls).length, 0, '候補が無いのでスイープのエージェントを起動しない')

  // 同じスイープに別の候補（superseded で保持した worktree）があれば、そちらだけが候補になる
  await f.updateStateDetailed(31, { status: 'merged' }, { cleanupWorktree: '/tmp/wt-31' })
  const s2 = stub(() => ({ removed: ['/tmp/wt-31'] }))
  assert.deepEqual(await f.sweepClosedWorktrees([]), ['/tmp/wt-31'])
  const p = sweepCalls(s2.calls)[0].prompt
  assert.match(p, /\["\/tmp\/wt-31"\]/)
  assert.doesNotMatch(p, /wt-30/)
  // orphan として渡されても同じ（除外のまま）
  const s3 = stub(() => ({ removed: [] }))
  await f.sweepClosedWorktrees(['/tmp/wt-30'])
  assert.ok(sweepCalls(s3.calls).every((c) => !c.prompt.includes('wt-30')))
})

test('discard の掃除が結果なし（StructuredOutput 未返却）・例外・マージ段の失敗でも、スイープの候補から外れたまま。削除を確認できたときだけ外が戻る', async () => {
  for (const [name, behavior] of [
    ['結果なし', (opts) => (opts.label.startsWith('state:cleanup') ? null : { ok: true })],
    ['無効な結果', (opts) => (opts.label.startsWith('state:cleanup') ? { ok: true } : { ok: true })],
    ['掃除が例外', (opts) => { if (opts.label.startsWith('state:cleanup')) throw new Error('boom'); return { ok: true } }],
    ['マージ段が失敗', () => ({ ok: false })],
    ['ok だが保持', (opts) => (opts.label.startsWith('state:cleanup') ? { ok: true, retained: true } : { ok: true })],
  ]) {
    const f = await freshAll(`held-2-${name}`)
    const s = stub(behavior)
    await f.updateStateDetailed(32, { branch: 'feat/32-x' }, { cleanupWorktree: '/tmp/wt-32', cleanupMode: 'discard', deleteBranch: true }).catch(() => {})
    assert.deepEqual(await f.sweepClosedWorktrees([]), [], name)
    assert.equal(sweepCalls(s.calls).length, 0, `${name}: スイープを起動しない`)
  }
  // 削除を確認できた discard は除外に残らない（実体が無いので候補にしても無害だが、集合は確認の結果に従う）
  const f = await freshAll('held-3')
  stub(() => ({ ok: true, retained: false }))
  await f.updateStateDetailed(33, { branch: 'feat/33-x' }, { cleanupWorktree: '/tmp/wt-33', cleanupMode: 'discard', deleteBranch: true })
  assert.ok(!f.sweepHeldPaths.has('/tmp/wt-33'))
  // 同じパスへの後の superseded の試みは、その結果に従う（discard で保持したあとでも回収対象に戻る）
  stub((opts) => (opts.label.startsWith('state:cleanup') ? { ok: false, retained: true } : { ok: true }))
  await f.updateStateDetailed(34, { status: 'implementing' }, { cleanupWorktree: '/tmp/wt-34', cleanupMode: 'discard' })
  assert.ok(f.sweepHeldPaths.has('/tmp/wt-34'))
  stub(() => ({ ok: true, retained: true }))
  await f.updateStateDetailed(34, { status: 'merged' }, { cleanupWorktree: '/tmp/wt-34' })
  assert.ok(!f.sweepHeldPaths.has('/tmp/wt-34'))
})

test('discard で .worktree を空にする patch は JSON マージに含めず、掃除エージェントの手順 2（worktree が無くなったときだけ）に任せる。superseded は従来どおり patch に含める', async () => {
  const f = await freshAll('defer-1')
  const d = stub(() => ({ ok: true, retained: false }))
  await f.updateStateDetailed(35, { status: 'implementing', branch: 'feat/35-x', worktree: '' }, { cleanupWorktree: '/tmp/wt-35', cleanupMode: 'discard' })
  const merge = d.calls.find((c) => c.opts.label === 'state:update:#35')
  assert.match(merge.prompt, /"branch":"feat\/35-x"/)
  assert.doesNotMatch(merge.prompt, /"worktree"/, 'worktree を空にする更新を先に書かない')
  assert.match(d.calls.find((c) => c.opts.label === 'state:cleanup:#35').prompt, /"worktree":""/, '手順 2 が worktree の無くなったときだけ空にする')

  const sp = stub(() => ({ ok: true, retained: false }))
  await f.updateStateDetailed(36, { status: 'merged', worktree: '' }, { cleanupWorktree: '/tmp/wt-36' })
  assert.match(sp.calls.find((c) => c.opts.label === 'state:update:#36').prompt, /"worktree":""/)
  // 削除対象がない（worktree 指定なし）なら patch はそのまま
  const nw = stub(() => ({ ok: true, retained: false }))
  await f.updateStateDetailed(37, { status: 'planning', branch: '', worktree: '' }, {})
  assert.match(nw.calls.find((c) => c.opts.label === 'state:update:#37').prompt, /"worktree":""/)
})

// ---- 3. Recover の流れ ----

const ITEM = { type: 'implement', status: 'failed', pr: 0, branch: 'feat/2-x', worktree: '/repo/wt/old', fixCount: 0, note: '' }
const hashes = Object.fromEntries(Object.entries({ 2: ITEM }).map(([k, v]) => [k, m.sha256Hex(m.canonicalJson(v))]))
const keysSha = m.sha256Hex(m.canonicalJson(Object.keys(hashes).sort()))

function recoverRun({ decision, wipCommitted, cleanup, branch = 'feat/2-x', argsExtra = {} }) {
  return runScript({
    args: { ...BASE_ARGS, ...argsExtra },
    override: (label, opts, prompt) => {
      if (label === 'state:load') return { ok: true, fileExisted: true, items: { 2: ITEM }, highWaterBytes: 0, highWaterVersion: 0 }
      if (label === 'state:load-verify') return { fileExists: true, hashes, keysSha256: keysSha, keysCount: 1, highWaterBytes: 0, highWaterVersion: 0 }
      if (label === 'recover:#2') return { decision, branch, wipCommitted, worktreeMissing: false, reason: 'test', brief: { done: 'd', remaining: 'r', broken: '' } }
      if (label === 'state:cleanup:#2') return cleanup
      return undefined
    },
  })
}
const labels = (calls) => calls.map((c) => c.opts.label)
const failureOf = (result) => (result.failures ?? []).find((f) => f.issue === 2)

test('Recover discard: wipCommitted が true でなければ掃除エージェントを起動せず、failed で保全する（verifyDiscardSafety は廃止）', async () => {
  const { calls, result, logs } = await recoverRun({ decision: 'discard', wipCommitted: false, cleanup: { ok: true, retained: false } })
  assert.ok(!labels(calls).includes('state:cleanup:#2'))
  assert.ok(!labels(calls).some((l) => l.startsWith('discard-safety')))
  assert.ok(!labels(calls).includes('plan:#2'), 'Plan へ進まない')
  assert.equal(failureOf(result)?.status ?? 'failed', 'failed')
  assert.ok(logs.some((l) => /discard を保全へ格下げ/.test(l) && /wipCommitted: true を返さなかった/.test(l)))
})

test('Recover discard: wipCommitted:true なら --mode discard の 1 コマンドで worktree と branch を掃除し（削除前の sha をログ）、Plan へ進む', async () => {
  const { calls, logs } = await recoverRun({ decision: 'discard', wipCommitted: true, cleanup: { ok: true, retained: false, branchSha: SHA } })
  // Plan 以降の流れが別の掃除（使い捨て worktree）を起動し得るので、Recover の掃除（--mode discard）だけを見る
  const c = calls.filter((x) => x.opts.label === 'state:cleanup:#2' && /--mode discard/.test(x.prompt))
  assert.equal(c.length, 1)
  assert.match(CMD.exec(c[0].prompt)[0], /worktree-remove\.sh remove --mode discard --path '\/repo\/wt\/old' --branch 'feat\/2-x' --base 'main'$/)
  assert.ok(!labels(calls).some((l) => l.startsWith('discard-safety')))
  assert.ok(labels(calls).includes('plan:#2'), '掃除が済んだら通常の Plan へ進む')
  assert.ok(logs.some((l) => l.includes(SHA)))
})

test('Recover discard: 掃除が保持した（汚れ・初期化済み submodule・lock）ら Plan へ進まず、保持の理由つきで failed にする', async () => {
  const { calls, result, logs } = await recoverRun({ decision: 'discard', wipCommitted: true, cleanup: { ok: false, retained: true } })
  assert.ok(!labels(calls).includes('plan:#2'))
  const f = failureOf(result)
  assert.equal(f?.status, 'failed')
  assert.match(f?.reason ?? '', /削除せず保持した/)
  assert.ok(logs.some((l) => /Recover → discard を保全へ格下げ/.test(l)))
})

test('Recover discard: 掃除対象のブランチが base と同名でも --mode discard のまま（ブランチは渡さない）。superseded（--force）へ倒れない', async () => {
  // base を本イシューの命名に合う名前にして、ホストの命名ゲートを通したうえで worktree-remove.sh 側の base 同名ガード（ブランチを渡さない）を見る
  const { calls } = await recoverRun({ decision: 'discard', wipCommitted: true, cleanup: { ok: true, retained: false }, branch: 'feat/2-x', argsExtra: { branch: 'feat/2-x' } })
  const c = calls.filter((x) => x.opts.label === 'state:cleanup:#2' && /--mode discard --path '\/repo\/wt\/old'/.test(x.prompt))
  assert.equal(c.length, 1)
  assert.match(CMD.exec(c[0].prompt)[0], /worktree-remove\.sh remove --mode discard --path '\/repo\/wt\/old'$/)
})

test('Recover discard: Recover が解決した branch が本イシューの命名に合わない（base と同名の main 等）ときは worktree だけ掃除し、branch は消さない（--branch なし）', async () => {
  const { calls } = await recoverRun({ decision: 'discard', wipCommitted: true, cleanup: { ok: true, retained: false }, branch: 'main' })
  const c = calls.filter((x) => x.opts.label === 'state:cleanup:#2' && x.prompt.includes('--mode discard'))
  assert.equal(c.length, 1)
  const cmd = CMD.exec(c[0].prompt)[0]
  // 規約外の名前は --expect-branch で渡す（HEAD の照合だけ。--branch は渡さないので branch は消さない）
  assert.match(cmd, /worktree-remove\.sh remove --mode discard --path '\/repo\/wt\/old' --expect-branch 'main'$/)
  assert.ok(!/--branch/.test(cmd), 'branch は消さない')
  assert.ok(labels(calls).includes('plan:#2'), '新規 Plan へ進む')
})

test('Recover discard: 解決した branch の文字種が不正（空白・.. ・; など）なときは照合できないので discard を呼ばず、例外にもせず保全（failed）する。規約外でも文字種が妥当な名前だけが --expect-branch に渡る（Bugbot 指摘 Q）', async () => {
  for (const branch of ['bad name', 'feat/2-x;rm', 'feat/../2-x', '-feat/2-x', 'feat/2-x`id`']) {
    const { calls, result } = await recoverRun({ decision: 'discard', wipCommitted: true, cleanup: { ok: true, retained: false }, branch })
    assert.equal(calls.filter((x) => x.opts.label === 'state:cleanup:#2').length, 0, `${branch}: 掃除を呼ばない`)
    assert.ok(!labels(calls).includes('plan:#2'), `${branch}: Plan へ進まない`)
    assert.ok(failureOf(result), `${branch}: 保全して failed にする（例外で落ちない）`)
  }
})

test('Recover continue: wipCommitted:true なら --mode discard --expect-branch <continue 先>（--branch なし）で旧 worktree だけ掃除して Implement へ。保持なら Implement を起動せず failed。wipCommitted が true でなければ掃除しない', async () => {
  const ok = await recoverRun({ decision: 'continue', wipCommitted: true, cleanup: { ok: true, retained: false } })
  const c = ok.calls.filter((x) => x.opts.label === 'state:cleanup:#2')
  assert.equal(c.length, 1)
  // continue も HEAD を照合する（--expect-branch は continue 先のブランチ。ブランチは消さないので --branch は付かない）
  assert.match(CMD.exec(c[0].prompt)[0], /worktree-remove\.sh remove --mode discard --path '\/repo\/wt\/old' --expect-branch 'feat\/2-x'$/)
  assert.doesNotMatch(c[0].prompt, /--branch|--head/)
  assert.ok(labels(ok.calls).includes('impl:#2'))

  const held = await recoverRun({ decision: 'continue', wipCommitted: true, cleanup: { ok: false, retained: true } })
  assert.ok(!labels(held.calls).includes('impl:#2'))
  assert.match(failureOf(held.result)?.reason ?? '', /削除せず保持した/)

  const undeclared = await recoverRun({ decision: 'continue', wipCommitted: false, cleanup: { ok: true, retained: false } })
  assert.ok(!labels(undeclared.calls).includes('state:cleanup:#2'))
  assert.ok(!labels(undeclared.calls).includes('impl:#2'))
})

test('Recover continue / discard: 掃除が保持し、failed の書き戻しも失敗しても、最終スイープは旧 worktree を消さない（スイープのエージェントにパスが渡らない）', async () => {
  for (const decision of ['continue', 'discard']) {
    let writes = 0
    const { calls, result } = await runScript({
      args: BASE_ARGS,
      override: (label, opts, prompt) => {
        if (label === 'state:load') return { ok: true, fileExisted: true, items: { 2: ITEM }, highWaterBytes: 0, highWaterVersion: 0 }
        if (label === 'state:load-verify') return { fileExists: true, hashes, keysSha256: keysSha, keysCount: 1, highWaterBytes: 0, highWaterVersion: 0 }
        if (label === 'recover:#2') return { decision, branch: 'feat/2-x', wipCommitted: true, worktreeMissing: false, reason: 'test', brief: { done: 'd', remaining: 'r', broken: '' } }
        if (label === 'state:cleanup:#2') return { ok: false, retained: true }
        // Recover の掃除より後の状態書き込み（failed の書き戻し）をすべて失敗させる
        if (label.startsWith('state:update:#2') || label.startsWith('state:#2')) { writes += 1; return writes > 1 ? { ok: false } : undefined }
        return undefined
      },
    })
    assert.ok(!labels(calls).includes('plan:#2') && !labels(calls).includes('impl:#2'), decision)
    assert.ok(result.failures?.some((f) => f.issue === 2), decision)
    const sweeps = calls.filter((c) => c.opts.label === 'worktree:sweep')
    assert.ok(sweeps.every((c) => !c.prompt.includes('/repo/wt/old')), `${decision}: 保持した worktree をスイープに渡さない`)
  }
})

// ---- Recover continue の掃除は HEAD を照合する（Issue #637 の関連）----

test('Recover continue: 掃除が HEAD の不一致で保持した（detached・別ブランチ）ら Implement を起動せず failed。理由に HEAD の不一致が出る。effectiveBranch が空の continue は掃除に入らない', async () => {
  const held = await recoverRun({ decision: 'continue', wipCommitted: true, cleanup: { ok: false, retained: true, worktree: 'retained-branch-mismatch' } })
  assert.ok(!labels(held.calls).includes('impl:#2'))
  assert.match(failureOf(held.result)?.reason ?? '', /HEAD が継続するブランチ上に無く/)
  // 空 branch（state にも worktree の HEAD にも無い）は continue 経路に入らず保全で止まる = 照合できない掃除をしない
  const empty = await recoverRun({ decision: 'continue', wipCommitted: true, cleanup: { ok: true, retained: false }, branch: '' })
  assert.ok(!labels(empty.calls).includes('impl:#2'))
})

// ---- 規約外ブランチで blocked → 人が worktree を消した後の再実行（Issue #637）----

const BLOCKED = { type: 'implement', status: 'blocked', pr: 0, branch: '', worktree: '/repo/wt/old', fixCount: 0, note: 'x' }
const bKeysSha = m.sha256Hex(m.canonicalJson(['2']))
function absentRun({ absent, recover = {}, saved = BLOCKED }) {
  const h = { 2: m.sha256Hex(m.canonicalJson(saved)) }
  return runScript({
    args: BASE_ARGS,
    override: (label, opts, prompt) => {
      if (label === 'state:load') return { ok: true, fileExisted: true, items: { 2: saved }, highWaterBytes: 0, highWaterVersion: 0 }
      if (label === 'state:load-verify') return { fileExists: true, hashes: h, keysSha256: bKeysSha, keysCount: 1, highWaterBytes: 0, highWaterVersion: 0 }
      if (label === 'recover:#2') return { decision: 'discard', branch: '', wipCommitted: false, worktreeMissing: true, reason: 'test', ...recover }
      if (label === 'worktree:absent:#2') { if (absent instanceof Error) throw absent; return absent }
      if (label === 'state:cleanup:#2') return { ok: true, retained: false }
      return undefined
    },
  })
}
const absentCalls = (calls) => calls.filter((c) => c.opts.label.startsWith('worktree:absent:#2'))
const removeCalls = (calls) => calls.filter((c) => c.opts.label.startsWith('state:cleanup:#2') || /worktree-remove\.sh remove/.test(c.prompt))

test('不在確認 absent / prunable: check-absent の 1 コマンドを 1 回だけ呼び、planning へ進む。旧パスの掃除（superseded・discard）は一切呼ばれない', async () => {
  for (const word of ['absent', 'prunable']) {
    const { calls, logs } = await absentRun({ absent: { ok: true, retained: false, worktree: word } })
    const a = absentCalls(calls)
    assert.equal(a.length, 1, word)
    assert.match(a[0].prompt, /worktree-remove\.sh check-absent --path '\/repo\/wt\/old' --repo-root '\/repo'\n/) // ラン開始時に特定したメイン worktree を渡し、スクリプトがカレントのリポジトリと照合する
    assert.doesNotMatch(a[0].prompt, /remove --mode|--force|--branch|--expect-branch|sweep/)
    assert.ok(labels(calls).includes('plan:#2'), `${word}: 新規 Plan へ進む`)
    assert.equal(removeCalls(calls).length, 0, `${word}: 旧パスを後続の掃除へ渡さない`)
    assert.ok(calls.every((c) => !/--mode superseded --path '\/repo\/wt\/old'/.test(c.prompt)))
    assert.ok(logs.some((l) => /不在を確認した/.test(l)))
    // 状態: planning・branch/worktree/pr を空にする書き込みがある
    assert.ok(calls.some((c) => c.opts.label.startsWith('state:update:#2') && /"status":"planning"/.test(c.prompt) && /"worktree":""/.test(c.prompt) && /"branch":""/.test(c.prompt) && /"pr":0/.test(c.prompt)))
  }
})

test('不在確認が不在と言わない（実体あり・保全の語・判定不能・ok:false・retained:true・結果なし・例外・schema 不適合）: 何も削除せず failed で止まり、Plan へ進まない', async () => {
  const replies = [
    { ok: false, retained: true, worktree: 'present' },
    { ok: false, retained: true, worktree: 'unregistered-present' },
    { ok: false, retained: true, worktree: 'prunable-detached' },
    { ok: false, retained: true, worktree: 'prunable-locked' },
    { ok: false, retained: true, worktree: 'main' },
    { ok: false, retained: true, worktree: 'unknown' },
    { ok: false, retained: true, worktree: '' },
    { ok: true, retained: false, worktree: 'removed' },
    { ok: true, retained: false, worktree: 'not-registered' },
    { ok: true, retained: false, worktree: '' },
    { ok: true, retained: true, worktree: 'absent' },
    { ok: false, retained: false, worktree: 'absent' },
    { ok: true, retained: false },
    { ok: true },
    null,
    new Error('boom'),
  ]
  for (const absent of replies) {
    const { calls, result } = await absentRun({ absent })
    const tag = absent instanceof Error ? 'throw' : JSON.stringify(absent)
    assert.ok(!labels(calls).includes('plan:#2'), tag)
    assert.equal(removeCalls(calls).length, 0, `${tag}: 何も削除しない`)
    const f = failureOf(result)
    assert.equal(f?.status ?? 'failed', 'failed', tag)
    assert.match(f?.reason ?? '', /対象ブランチを確定できないため安全に削除できない/, tag)
  }
})

test('不在確認は条件がそろったときだけ呼ぶ: worktreeMissing が true でない・branch が空でない（保存済みも解決も）・decision が discard でない・worktree の記録が無いときは呼ばない', async () => {
  const cases = [
    ['worktreeMissing:false', { recover: { worktreeMissing: false } }],
    ['解決 branch あり', { recover: { branch: 'feat/2-x' } }],
    ['解決 branch が規約外', { recover: { branch: 'worktree-wf_ab12' } }],
    ['保存済み branch あり', { saved: { ...BLOCKED, branch: 'feat/2-x' } }],
    ['decision:continue', { recover: { decision: 'continue' } }],
    ['decision:unresolved', { recover: { decision: 'unresolved' } }],
  ]
  for (const [name, o] of cases) {
    const { calls } = await absentRun({ absent: { ok: true, retained: false, worktree: 'absent' }, ...o })
    assert.equal(absentCalls(calls).length, 0, name)
  }
  // worktree の記録が無く branch も空なら Recover 自体が起動しない
  const { calls } = await absentRun({ absent: { ok: true, retained: false, worktree: 'absent' }, saved: { ...BLOCKED, worktree: '' } })
  assert.equal(absentCalls(calls).length, 0)
  assert.ok(!labels(calls).includes('recover:#2'))
})

test('規約外ブランチで継続できず blocked にする note は、ブランチの改名と worktree の削除（git worktree remove）の両方を案内する', async () => {
  const { calls } = await recoverRun({ decision: 'continue', wipCommitted: true, cleanup: { ok: true, retained: false }, branch: 'worktree-wf_ab12' })
  const w = calls.find((c) => c.opts.label.startsWith('state:update:#2') && /継続しない/.test(c.prompt))
  assert.ok(w, '規約外 continue の blocked 書き込み')
  assert.match(w.prompt, /改名して再実行するか/)
  assert.match(w.prompt, /git worktree remove で削除して再実行/)
  assert.doesNotMatch(/"note":"[^\n]*/.exec(w.prompt)[0], /\brm\b/, 'note に rm の綴りを出さない')
})

test('check-absent の呼び出し形は confirmWorktreeAbsent の 1 か所だけ（remove 系の組み立て worktreeRemoveCommand とは別）。worktreeRemoveCommand は check-absent を作らない', () => {
  const sites = [...source.matchAll(/ check-absent --path/g)]
  assert.equal(sites.length, 1)
  assert.match(source, /async function confirmWorktreeAbsent\(issueNumber, path\) \{/)
  const fn = source.slice(source.indexOf('function worktreeRemoveCommand('), source.indexOf('const WORKTREE_NOTE'))
  assert.doesNotMatch(fn, /check-absent/)
})

// ---- ソース走査 ----

test('verifyDiscardSafety / DISCARD_SAFETY_SCHEMA / discard-safety は残っておらず、reflog から復元できるという誤った記述もない。worktree-remove.sh は SCRIPT_SHA256 に載る', () => {
  assert.doesNotMatch(source, /verifyDiscardSafety|DISCARD_SAFETY_SCHEMA|discard-safety/)
  assert.doesNotMatch(source, /reflog から復元(可能|できる)|削除後も reflog/)
  assert.match(source, /'worktree-remove\.sh': '@@SCRIPT_SHA256:worktree-remove\.sh@@'/)
  const dist = readFileSync(new URL('../scripts/implement-issue-tree.js', import.meta.url), 'utf8')
  assert.match(dist, /'worktree-remove\.sh':'[0-9a-f]{64}'/)
})

// ---- closed 後始末（Issue #632）の呼び出し形 ----

test('--head つきの呼び出し形は closed 後始末の 1 か所だけ。updateStateDetailed の掃除（superseded・discard・Recover）は --head を付けない', async () => {
  const calls = [...source.matchAll(/worktreeRemoveCommand\(([^\n]*)\)/g)].map((x) => x[1]).filter((a) => !a.startsWith('mode, path'))
  assert.deepEqual(calls, ['cleanupMode, cleanupWorktreePath, deleteBranchName, \'\', expectBranchName', "'discard', w, '', head"])
  // updateStateDetailed の経路は head を渡さないので、どのモードでも --head は付かない
  for (const [o, label] of [[{ cleanupWorktree: '/tmp/wt-40' }, 'superseded'], [{ cleanupWorktree: '/tmp/wt-40', cleanupMode: 'discard' }, 'discard'], [{ cleanupWorktree: '/tmp/wt-40', deleteBranch: true }, 'discard+branch']]) {
    const c = stub(() => ({ ok: true, retained: false }))
    await m.updateState(40, { status: 'merged', branch: 'feat/40-x' }, o)
    assert.doesNotMatch(cleanupCalls(c.calls, 40)[0].prompt, /--head/, label)
  }
})

// ---- 規約外ブランチの discard の HEAD 照合（--expect-branch）----

test('--expect-branch: discard + expectBranch のときだけ付き、--branch は付かない。superseded・deleteBranch ありでは付かない。形式不正は掃除を起動せず失敗にする', async () => {
  const run = async (o, patch = { status: 'planning' }) => {
    const c = stub(() => ({ ok: true, retained: false }))
    const ok = await m.updateState(41, patch, { cleanupWorktree: '/tmp/wt-41', ...o })
    return { ok, cmds: cleanupCalls(c.calls, 41).map((x) => CMD.exec(x.prompt)?.[0] ?? '') }
  }
  const d = await run({ cleanupMode: 'discard', expectBranch: 'worktree-wf_ab12' })
  assert.equal(d.cmds.length, 1)
  assert.match(d.cmds[0], /worktree-remove\.sh remove --mode discard --path '\/tmp\/wt-41' --expect-branch 'worktree-wf_ab12'$/)
  assert.doesNotMatch(d.cmds[0], /--branch|--head/)
  // superseded（既定）では付けない（discard 専用）
  assert.doesNotMatch((await run({ expectBranch: 'worktree-wf_ab12' })).cmds[0], /--expect-branch/)
  // deleteBranch（--branch で照合する経路）とは併用しない
  const del = (await run({ cleanupMode: 'discard', deleteBranch: true, expectBranch: 'worktree-wf_ab12' }, { status: 'planning', branch: 'feat/41-x' })).cmds[0]
  assert.match(del, /--branch 'feat\/41-x'/)
  assert.doesNotMatch(del, /--expect-branch/)
  // expectBranch なしは従来どおり
  assert.doesNotMatch((await run({ cleanupMode: 'discard' })).cmds[0], /--expect-branch/)
  // 形式不正は黙って落とさない（落とすと HEAD の照合なしで消す呼び出しになる）。掃除エージェントを起動せず ok にしない
  const c = stub(() => ({ ok: true, retained: false }))
  await assert.rejects(m.updateState(41, { status: 'planning' }, { cleanupWorktree: '/tmp/wt-41', cleanupMode: 'discard', expectBranch: 'a b; rm' }), /--expect-branch/)
  assert.deepEqual(cleanupCalls(c.calls, 41), [])
})
