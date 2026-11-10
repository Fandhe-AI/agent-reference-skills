// pr-create の prepare が diverged で止まったときのホスト側の振り分け（Issue #730）の回帰テスト。
//
// 回復 Implement が push 済みブランチを書き換えて分岐させると、pr-create は fail-closed で止まる。
// 契約: 両 sha が sanitizeSha を通り互いに違うときだけ blocked（halt を数えない・pr: 0・branch 保持・sha を note に残す）。
// それ以外（divergedShas なし・不正な値・同一値・3 要素）は従来どおり failed。divergedShas は自己申告で、振り分けにしか使わない。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { importDefinitions, runScript, BASE_ARGS } from './lib/stub-run.mjs'

globalThis.args = { parent: 1, skillDir: '/opt/skills/implement-issue-tree' }
const m = await importDefinitions(['sha256Hex', 'canonicalJson'], 'recover-diverged')

const A = 'a'.repeat(40)
const B = 'b'.repeat(40)
const stateWrites = (calls) => calls.filter((c) => c.opts.label.startsWith('state:')).map((c) => c.prompt)

const run = (prCreate) => {
  const item = { status: 'failed', branch: 'feat/2-x', worktree: '/repo/wt/old', pr: 0 }
  const hashes = { 2: m.sha256Hex(m.canonicalJson(item)) }
  const keysSha = m.sha256Hex(m.canonicalJson(Object.keys(hashes).sort()))
  return runScript({
    args: BASE_ARGS,
    override: (label) => {
      if (label === 'state:load') return { ok: true, fileExisted: true, items: { 2: item }, highWaterBytes: 0, highWaterVersion: 0 }
      if (label === 'state:load-verify') return { fileExists: true, hashes, keysSha256: keysSha, keysCount: 1, highWaterBytes: 0, highWaterVersion: 0 }
      if (label === 'recover:#2') return { decision: 'continue', branch: 'feat/2-x', wipCommitted: true, worktreeMissing: false, reason: 'test', brief: { done: 'd', remaining: 'r', broken: '' } }
      if (label === 'state:cleanup:#2') return { ok: true, retained: false }
      if (label === 'impl:#2') return { branch: 'feat/2-x', summary: 's', worktreePath: '/repo/wt/2' }
      if (label === 'pr-create:#2') return { prNumber: 0, summary: 'prepare が diverged', worktreePath: '/repo/wt/pc', ...prCreate }
      return undefined
    },
  })
}

test('diverged: 両 sha が有効で異なれば blocked。sha を note に残し、pr: 0 と branch を書き、halt を数えない', async () => {
  const { result, calls } = await run({ divergedShas: [A, B] })
  assert.ok(calls.some((c) => c.opts.label === 'pr-create:#2'), 'pr-create まで進んでいない（前提が崩れた）')
  const entry = result.done.find((r) => r.issue === 2)
  assert.equal(entry.status, 'blocked')
  assert.ok(entry.note.includes(A) && entry.note.includes(B))
  const w = stateWrites(calls).find((p) => p.includes('blocked') && p.includes(A))
  assert.ok(w, 'blocked の書き込みがある')
  assert.match(w, /"pr":\s*0/)
  assert.match(w, /"branch":\s*"feat\/2-x"/)
  assert.equal(result.halted, null)
})

test('対照: divergedShas なし・短い・大文字・同一値・3 要素は従来どおり failed', async () => {
  const cases = [{}, { divergedShas: ['abc', B] }, { divergedShas: [A.toUpperCase(), B] }, { divergedShas: [A, A] }, { divergedShas: [A, B, A] }]
  for (const c of cases) {
    const { result } = await run(c)
    const entry = result.done.find((r) => r.issue === 2)
    assert.equal(entry.status, 'failed', JSON.stringify(c))
  }
})

// 回復 Implement の手順 2: 分岐のマージを取り込むとき、コンフリクト解消後に git commit --no-edit で
// マージコミットを確定させる。git add だけでは MERGE_HEAD が残り is-ancestor 検査が通らない（PR #736 指摘）。
test('回復 Implement のプロンプトは、コンフリクト解消後に git add だけでなく git commit --no-edit で確定させる', async () => {
  const { calls } = await run({ divergedShas: [A, B] })
  const impl = calls.find((c) => c.opts.label === 'impl:#2')
  assert.ok(impl, 'impl:#2 が起動している')
  const at = impl.prompt.indexOf('git merge --no-ff --no-edit')
  assert.ok(at >= 0, '分岐取り込みの手順がある')
  const seg = impl.prompt.slice(at, at + 400)
  assert.match(seg, /git add[^。]*git commit --no-edit/)
  assert.match(seg, /MERGE_HEAD/)
  assert.ok(!impl.prompt.includes('--no-verify で'), '--no-verify を勧めない')
})
