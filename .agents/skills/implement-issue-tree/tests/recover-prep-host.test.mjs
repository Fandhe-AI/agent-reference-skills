// Recover の機械的な部分をスクリプト（scripts/recover-prep.sh）へ切り出した（Issue #603 第 9 弾）あとの、ホスト側の配線の回帰テスト。
//
//   1. recoverPrompt の組み立て: run-verified.sh 経由の 1 コマンド（旧 worktree と記録のブランチの有無で --worktree / --branch が変わる）。
//      ブランチ解決・WIP commit・base の取得をエージェントに手で実行させる文章（git -C … / rev-parse --abbrev-ref / git add -A / git commit /
//      git fetch / git diff --quiet）が残っていない。判断（continue / discard）と回復ブリーフはエージェントに残る。
//   2. 封筒は使わない: wipCommitted はエージェントが結果の行から写した自己申告のままホストの第 1 層のゲートに入り、第 2 層（worktree-remove.sh
//      --mode discard の独立観測）が破る余地を残さないこと。偽の wipCommitted:true でも、掃除が保持したら削除せず failed になる。
//   3. SCRIPT_SHA256 に載り、予検査の対象になる。
// スクリプト自体の挙動は tests/recover-prep*.test.mjs が実 git で固定する。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { importDefinitions, runScript, BASE_ARGS, source } from './lib/stub-run.mjs'

globalThis.args = { parent: 1, skillDir: '/opt/skills/implement-issue-tree' }
const m = await importDefinitions(['sha256Hex', 'canonicalJson'], 'recover-prep-host')

const labels = (calls) => calls.map((c) => c.opts.label)

function recoverRun(item, reply) {
  const hashes = Object.fromEntries(Object.entries({ 2: item }).map(([k, v]) => [k, m.sha256Hex(m.canonicalJson(v))]))
  const keysSha = m.sha256Hex(m.canonicalJson(Object.keys(hashes).sort()))
  return runScript({
    args: BASE_ARGS,
    override: (label) => {
      if (label === 'state:load') return { ok: true, fileExisted: true, items: { 2: item }, highWaterBytes: 0, highWaterVersion: 0 }
      if (label === 'state:load-verify') return { fileExists: true, hashes, keysSha256: keysSha, keysCount: 1, highWaterBytes: 0, highWaterVersion: 0 }
      if (label === 'recover:#2') return reply
      if (label === 'state:cleanup:#2') return { ok: false, retained: true }
      return undefined
    },
  })
}
const promptOf = (calls) => calls.find((c) => c.opts.label === 'recover:#2').prompt
const COMMAND = /bash '\/repo\/\.claude\/skills\/implement-issue-tree\/scripts\/run-verified\.sh' \S+ recover-prep\.sh( [^\n]*)/

const WITH_BOTH = { type: 'implement', status: 'failed', pr: 0, branch: 'feat/2-x', worktree: '/repo/wt/old', fixCount: 0, note: '' }
const BRANCH_ONLY = { ...WITH_BOTH, worktree: '' }
const WORKTREE_ONLY = { ...WITH_BOTH, branch: '' }
const DISCARD = { decision: 'discard', branch: 'feat/2-x', wipCommitted: true, worktreeMissing: false, reason: 'test' }

for (const [name, item, args] of [
  ['旧 worktree と記録のブランチの両方', WITH_BOTH, " --base 'main' --worktree '/repo/wt/old' --branch 'feat/2-x'"],
  ['branch だけの残骸（--worktree を渡さない）', BRANCH_ONLY, " --base 'main' --branch 'feat/2-x'"],
  ['旧 worktree だけ（記録のブランチが無い。--branch を渡さない）', WORKTREE_ONLY, " --base 'main' --worktree '/repo/wt/old'"],
]) {
  test(`recoverPrompt: ${name} → run-verified.sh 経由の recover-prep.sh を 1 コマンドで実行させる`, async () => {
    const { calls } = await recoverRun(item, DISCARD)
    const p = promptOf(calls)
    assert.equal(COMMAND.exec(p)?.[1], args)
    assert.match(p, /RECOVER_PREP_RESULT/)
    assert.match(p, /branch・worktreeMissing・wipCommitted を/)
    assert.match(p, /timeout に 600000/)
  })
}

test('recoverPrompt: ブランチ解決・WIP commit・base の取得・差分の確認を手で実行させる文章が残っていない（--no-verify も無い）', async () => {
  const { calls } = await recoverRun(WITH_BOTH, DISCARD)
  const full = promptOf(calls)
  // 全エージェント共通の前文（COMMON）は --no-verify 禁止や git -C を含むので、Recover 固有の手順（「手順:」以降）だけを見る
  const p = full.slice(full.indexOf('\n手順:\n'))
  assert.ok(p.length > 100 && p.length < full.length)
  for (const re of [/git -C/, /rev-parse --abbrev-ref/, /git add -A/, /git commit/, /WIPEOF/, /git fetch origin/, /git diff --quiet|--quiet で/, /status --porcelain/, /--no-verify/]) {
    assert.doesNotMatch(p, re, String(re))
  }
  assert.match(full, /--no-verify 禁止/, '前文（COMMON）の禁止文は残る')
  // 判断と回復ブリーフはエージェントに残る
  assert.match(p, /継続可否の判断/)
  assert.match(p, /done: 実装済み内容の要約/)
  assert.match(p, /gh issue view 2/)
  // 差分が unknown のときは空と見なさない（discard の根拠にしない）
  assert.match(p, /"unknown"[^\n]*空とは見なさず、discard の根拠にしない/)
  assert.match(p, /resolved が false/)
})

test('第 1 層（wipCommitted の自己申告）だけでは削除しない: wipCommitted:true を返しても第 2 層（--mode discard の独立観測）が保持すれば Plan へ進まず failed', async () => {
  const { calls, result } = await recoverRun(WITH_BOTH, DISCARD)
  assert.ok(!labels(calls).includes('plan:#2'))
  assert.match((result.failures ?? []).find((f) => f.issue === 2)?.reason ?? '', /削除せず保持した/)
})

test('第 1 層: wipCommitted が false（WIP を退避できなかった）なら掃除エージェントを起動せず failed で保全する。結果の行が無い場合の返却（wipCommitted:false・branch 空・decision 無し）も同じく保全する', async () => {
  const noWip = await recoverRun(WITH_BOTH, { ...DISCARD, wipCommitted: false })
  assert.ok(!labels(noWip.calls).includes('state:cleanup:#2'))
  assert.ok(!labels(noWip.calls).includes('plan:#2'))
  const failed = await recoverRun(WITH_BOTH, { decision: 'discard', branch: '', wipCommitted: false, worktreeMissing: false, reason: 'recover-prep.sh の失敗' })
  assert.ok(!labels(failed.calls).includes('state:cleanup:#2'))
  assert.ok(!labels(failed.calls).includes('plan:#2'))
  assert.ok(!labels(failed.calls).includes('impl:#2'))
})

test('recover-prep.sh は SCRIPT_SHA256 に載り（生成物には 64 桁のハッシュが埋まる）、recoverPrompt は SCRIPT_SHA256 経由で起動する', () => {
  assert.match(source, /'recover-prep\.sh': '@@SCRIPT_SHA256:recover-prep\.sh@@'/)
  assert.match(source, /scriptInvocation\('recover-prep\.sh', undefined, prepArgs\)/)
  const dist = readFileSync(new URL('../scripts/implement-issue-tree.js', import.meta.url), 'utf8')
  assert.match(dist, /'recover-prep\.sh':'[0-9a-f]{64}'/)
  assert.doesNotMatch(dist, /@@SCRIPT_SHA256/)
})
