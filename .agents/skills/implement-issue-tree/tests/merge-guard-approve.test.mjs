// merge-guard-hook.sh のレビュー承認 deny の回帰テスト（Issue #783）。
//
// 契約: subagent（agent_id あり）の次の承認操作は deny する。
//   - gh pr review の --approve と短縮 -a（-ab 等の束ね書き。-b / -F の値は本文）
//   - REST: pulls/<n>/reviews と pulls/<n>/reviews/<id>/events への event=APPROVE
//     （-f / -F / --field / --raw-field。--jq 等の値と明示 GET は対象外。@file・変数・--input は判定不能で deny）
//   - GraphQL: addPullRequestReview / submitPullRequestReview と APPROVE（APPROVED は除く）
// 対照として COMMENT / REQUEST_CHANGES・GET の読み取り・addPullRequestReviewThreadReply は許可する。
// 判定表は init-codex の agent-guard.test.mjs と同じ入力を使い、/bin/bash（3.2）と PATH の bash（5 系）の両方で確かめる。
// 子プロセスは並列に流し、実時間の待機は行わない。
import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { spawn, execFileSync } from 'node:child_process'
import { join, dirname } from 'node:path'
import { mkdtempSync, rmSync, symlinkSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { fileURLToPath } from 'node:url'

const HOOK = join(dirname(fileURLToPath(import.meta.url)), '..', 'scripts', 'merge-guard-hook.sh')

const pathBash = execFileSync('/bin/sh', ['-c', 'command -v bash']).toString().trim()
const BASHES = [...new Set(['/bin/bash', pathBash])]

function run(bash, command, { agentId = 'agent-1' } = {}) {
  const input = { tool_name: 'Bash', tool_input: { command } }
  if (agentId) input.agent_id = agentId
  return new Promise((resolve, reject) => {
    const p = spawn(bash, [HOOK], { stdio: ['pipe', 'pipe', 'pipe'] })
    let out = ''
    p.stdout.on('data', (d) => { out += d })
    p.on('error', reject)
    p.on('close', (code) => {
      if (code !== 0) return reject(new Error(`exit ${code}`))
      if (out.trim() === '') return resolve({ decision: 'allow' })
      const o = JSON.parse(out)
      resolve({ decision: o.hookSpecificOutput.permissionDecision, reason: o.hookSpecificOutput.permissionDecisionReason })
    })
    p.stdin.on('error', () => {})
    p.stdin.end(JSON.stringify(input))
  })
}

const DENY = [
  // 現状でも止まる対照
  'gh pr review 5 --approve',
  'gh pr review --approve 5',
  // 短縮 -a・束ね書き（-b / -F は値を取る）・順序違い
  'gh pr review 5 -a',
  'gh pr review -a 5',
  'gh pr review 5 --body x -a',
  'gh pr review 5 -ab ok',
  'gh pr review 5 -b ok -a',
  'gh -R o/r pr review 5 -a',
  'gh pr review 5 -ca',
  'gh pr review 5 -b "x; y" -a',
  // フルパス・相対パスの gh
  '/usr/bin/gh pr review 5 -a',
  '/opt/homebrew/bin/gh pr review -a 5',
  './gh pr review 5 -a',
  'gh pr review 5 -b gh -a',
  'gh pr review 5 -b /usr/bin/gh -a',
  '(gh pr review 5 -a)',
  'gh pr review 5 -c -b ok; gh pr review 6 -a',
  'gh pr review 5 -ab ok && ls',
  'gh api -X GET repos/o/r/pulls/5/reviews -X POST -f event=APPROVE',
  'gh api repos/o/r/pulls/5/reviews --jq x -f event=APPROVE',
  // REST: reviews 作成・events 送信
  'gh api repos/o/r/pulls/5/reviews -f event=APPROVE',
  'gh api -X POST repos/o/r/pulls/5/reviews -f event=APPROVE',
  'gh api repos/o/r/pulls/5/reviews -f event=APPROVE -f body=ok',
  'gh api repos/o/r/pulls/5/reviews -F event=APPROVE',
  'gh api repos/o/r/pulls/5/reviews --field event=APPROVE',
  'gh api repos/o/r/pulls/5/reviews --raw-field event=APPROVE',
  'gh api repos/o/r/pulls/5/reviews --field=event=APPROVE',
  'gh api repos/o/r/pulls/5/reviews -f event=approve',
  'gh api repos/o/r/pulls/5/reviews -f event = APPROVE',
  `gh api repos/o/r/pulls/5/reviews -f 'event=APPROVE'`,
  'gh api -X POST repos/o/r/pulls/5/reviews/9/events -f event=APPROVE',
  '/usr/bin/gh api repos/o/r/pulls/5/reviews -f event=APPROVE',
  // REST: 判定できない形（--input・@file・変数）
  'gh api repos/o/r/pulls/5/reviews --input review.json',
  'gh api repos/o/r/pulls/5/reviews --input -',
  'gh api repos/o/r/pulls/5/reviews/9/events --input=review.json',
  'gh api repos/o/r/pulls/5/reviews -F event=@ev.txt',
  'gh api repos/o/r/pulls/5/reviews -f event=$EV',
  // GraphQL
  `gh api graphql -f query='mutation{addPullRequestReview(input:{pullRequestId:"x",event:APPROVE}){clientMutationId}}'`,
  `gh api graphql -f query='mutation{submitPullRequestReview(input:{pullRequestId:"x",event:APPROVE}){clientMutationId}}'`,
  `gh api graphql -f query='mutation($e:PullRequestReviewEvent!){addPullRequestReview(input:{event:$e}){clientMutationId}}' -f e=APPROVE`,
  'gh api graphql -f query=@q.graphql',
  'gh api graphql -F query=@q.graphql',
  'gh api graphql --input q.json',
  'gh -R o/r pr review 5 --approve;echo',
  // 監査指摘（Issue #783 後続）: GET 免除はコマンド全体の `-X GET` 文字列では成立させない
  'gh api -X GET repos/o/r/pulls/1/reviews >/dev/null; gh api repos/o/r/pulls/5/reviews -f event=APPROVE',
  'gh api repos/o/r/pulls/5/reviews -f event=APPROVE # -X GET',
  `gh api --method GET repos/o/r/pulls/5/reviews -F per_page=100 -f event=APPROVE`,
  'gh api -X GET repos/o/r/pulls/5/reviews -f event=APPROVE',
  // パス中のコマンド置換・末尾スラッシュ（reviews / merge の両方）
  'gh api repos/{owner}/{repo}/pulls/$(gh pr view --json number -q .number)/reviews -f event=APPROVE',
  'gh api repos/{owner}/{repo}/pulls/`gh pr view --json number -q .number`/reviews -f event=APPROVE',
  'gh api repos/o/r/pulls/5/reviews/ -f event=APPROVE',
  'gh api -X PUT repos/{owner}/{repo}/pulls/$(gh pr view --json number -q .number)/merge',
  // 引用符の中・コメントの中のコマンド（-a の走査が見落とさない）
  `bash -c 'gh pr review 5 -a'`,
  `sh -c "gh pr review 5 -a"`,
  `eval 'gh pr review 5 -a'`,
  `gh pr review 5 -c; bash -c 'gh pr review 6 -a'`,
  "echo # don't\ngh pr review 5 -a",
  "echo # don't\ngh api repos/o/r/pulls/5/reviews -f event=APPROVE",
  // 全体走査でも gh / git の語で状態を戻さない
  'gh pr review 5 -b "see $(git rev-parse HEAD)" -a',
  'gh pr review fix/git -a',
  'gh pr review gh -a',
  'gh pr review git -a',
  // GraphQL: graphql の語が /graphql や URL の形でも、event が literal でないものは deny
  `gh api /graphql -f query='mutation{addPullRequestReview(input:{pullRequestId:"x",event:APPROVE}){clientMutationId}}'`,
  `gh api https://api.github.com/graphql -f query='mutation{submitPullRequestReview(input:{pullRequestId:"x",event:APPROVE}){clientMutationId}}'`,
  `gh api graphql -f query='mutation($e:PullRequestReviewEvent!){submitPullRequestReview(input:{event:$e}){clientMutationId}}' -f e=COMMENT`,
  `gh api graphql -f query='mutation{addPullRequestReview(input:{pullRequestId:"x"}){clientMutationId}}'`,
  `gh api graphql -f query='mutation{addPullRequestReview(input:{pullRequestId:"x",event:COMMENT,body:"ok"}){clientMutationId}}' -F input=@in.json`,
  `gh api graphql -f query='mutation{addPullRequestReview(input:{event:COMMENT}){x}}' -f query2=1 -f query="$Q"`,
  'gh api graphql -f query=$Q',
  'gh api graphql -f query="$(cat q.graphql)"',
  'gh api /graphql --input q.json',
  'gh api https://api.github.com/graphql -F query=@q.graphql',
  // コマンド名の大文字小文字
  'GH pr review 5 -a',
  'Gh pr review 5 --approve',
  '/usr/bin/GH pr review 5 -a',
  'GH pr merge 5',
  'GH api repos/o/r/pulls/5/reviews -f event=APPROVE',
  'GH -R o/r pr merge 5',
  // 制御文字（SEP_MARK の注入など）
  'gh pr review 5 -c -b "x\u0001SEP y"',
  'gh pr review 5 -c\u0001',
]

const ALLOW = [
  '/usr/bin/gh pr review 5 -c -b ok',
  'gh pr review 5 --comment --body ok',
  'gh pr review 5 -c -b ok',
  'gh pr review 5 -r -b x',
  'gh pr review 5 --body -a -c',
  'gh pr view 5 --json state',
  'gh pr checks 5',
  // reviews の読み取り・event を持たない書き込み
  'gh api repos/o/r/pulls/5/reviews',
  'gh api repos/o/r/pulls/5/reviews --jq length',
  'gh api -X POST repos/o/r/pulls/5/reviews -f event=COMMENT -f body=x',
  'gh api -X POST repos/o/r/pulls/5/reviews -f event=REQUEST_CHANGES -f body=x',
  'gh api -X POST repos/o/r/pulls/5/reviews/9/events -f event=COMMENT',
  'gh api repos/o/r/pulls/5/reviews -f body=pending',
  'gh api repos/o/r/pulls/5/comments -f body=x',
  // 後続の別コマンドの -a は gh pr review の引数ではない
  'gh pr review 5 -c -b ok && ls -la',
  'gh pr review 5 -c -b ok; cp -a x y',
  'gh pr review 5 --comment -b x | grep -a y',
  'gh pr review 5 -c -b ok || ls -a',
  'gh pr review 5 -c -b ok\nls -la',
  // GraphQL: 別名の mutation・enum APPROVED は承認ではない
  `gh api graphql -f query='mutation{addPullRequestReviewThreadReply(input:{pullRequestReviewThreadId:"x",body:"ok"}){clientMutationId}}'`,
  `gh api graphql -f query='mutation{addPullRequestReviewComment(input:{pullRequestReviewId:"x",body:"APPROVE me"}){clientMutationId}}'`,
  `gh api graphql -f query='query{repository(owner:"o",name:"r"){pullRequest(number:5){reviewDecision}}}' --jq '.. | select(. == "APPROVED")?'`,
  `gh api graphql -f query='query{repository(owner:"o",name:"r"){pullRequest(number:5){reviews(states:APPROVED,first:10){nodes{id}}}}}'`,
  // REST reviews の GET: jq フィルタ内の event= はフィールド指定ではない
  `gh api repos/o/r/pulls/5/reviews --jq '.[] | select(.event=="APPROVE")'`,
  `gh api repos/o/r/pulls/5/reviews -q '.[] | select(.event=="APPROVE")'`,
  `gh api -X GET repos/o/r/pulls/5/reviews -f per_page=100`,
  // GraphQL: literal の COMMENT / REQUEST_CHANGES は許可（スレッド返信は従来どおり許可）
  `gh api graphql -f query='mutation{addPullRequestReview(input:{pullRequestId:"x",event:COMMENT,body:"ok"}){clientMutationId}}'`,
  `gh api graphql -f query='mutation{submitPullRequestReview(input:{pullRequestReviewId:"x",event: REQUEST_CHANGES}){clientMutationId}}'`,
  `gh api graphql -f query='mutation{addPullRequestReviewThreadReply(input:{pullRequestReviewThreadId:"x",body:"event: APPROVE"}){clientMutationId}}'`,
  // 日本語・タブを含むコマンドは制御文字として扱わない
  "gh pr comment 5 --body '確認しました\tOK'",
  // コメントの中のアポストロフィでも、-a を持たなければ止めない
  "echo # don't\ngh pr review 5 -c -b ok",
  // 全体走査でも -a の無い承認でない review は止めない
  'gh pr review 5 -b "see $(git rev-parse HEAD)" -c',
  // 既存の許可（スレッドの対応報告・催促コメント）
  'gh pr comment 5 --body "@cursor review"',
]

for (const bash of BASHES) {
  describe(`merge-guard-hook.sh レビュー承認 (${bash})`, { concurrency: 8 }, () => {
    for (const cmd of DENY) {
      it(`deny: ${JSON.stringify(cmd)}`, async () => {
        const r = await run(bash, cmd)
        assert.equal(r.decision, 'deny')
        assert.match(r.reason, /implement-issue-tree-merge-guard/)
      })
    }
    for (const cmd of ALLOW) {
      it(`allow: ${JSON.stringify(cmd)}`, async () => {
        assert.equal((await run(bash, cmd)).decision, 'allow')
      })
    }
    it('main スレッド（agent_id なし）は承認系の形でも制限対象外', async () => {
      for (const cmd of ['gh pr review 5 -a', 'gh api repos/o/r/pulls/5/reviews -f event=APPROVE']) {
        assert.equal((await run(bash, cmd, { agentId: null })).decision, 'allow', cmd)
      }
    })
  })
}

// 想定外の異常終了・基盤コマンドの不在は、exit 1（非ブロック）ではなく deny にする。
describe('merge-guard-hook.sh の fail-closed（異常終了）', () => {
  function withTmp(fn) {
    const dir = mkdtempSync(join(tmpdir(), 'mg-'))
    try { return fn(dir) } finally { rmSync(dir, { recursive: true, force: true }) }
  }
  const payload = JSON.stringify({ tool_name: 'Bash', agent_id: 'a', tool_input: { command: 'gh pr view 5' } })

  it('awk が無い環境では deny する', () => {
    withTmp((dir) => {
      for (const c of ['jq', 'grep', 'sed', 'tr', 'cat']) {
        const p = execFileSync('/bin/sh', ['-c', `command -v ${c}`]).toString().trim()
        symlinkSync(p, join(dir, c))
      }
      const out = execFileSync('/bin/bash', [HOOK], { input: payload, env: { PATH: dir } }).toString()
      assert.equal(JSON.parse(out).hookSpecificOutput.permissionDecision, 'deny')
    })
  })

  it('結果を出さずに異常終了したら（未定義変数）EXIT trap が deny を出す', () => {
    withTmp((dir) => {
      const src = readFileSync(HOOK, 'utf8')
      const needle = '[ -z "$cmd" ] && allow_exit\n'
      assert.ok(src.includes(needle))
      const mod = join(dir, 'hook.sh')
      writeFileSync(mod, src.replace(needle, needle + ': "$__mg_undefined_var"\n'))
      const out = execFileSync('/bin/bash', [mod], { input: payload, stdio: ['pipe', 'pipe', 'ignore'] }).toString()
      assert.equal(JSON.parse(out).hookSpecificOutput.permissionDecision, 'deny')
    })
  })
})
