// merge-guard-hook.sh（best-effort の deny hook）のリポジトリ設定変更 deny の回帰テスト。
//
// 対象事例: Merge ループの fix エージェントが承認なしに gh api --method PUT repos/<o>/<r>/rulesets/<id>
// で ruleset を変更した。プロンプトの権限境界（REPO_SETTINGS_POLICY）に加え、hook を導入したリポでは
// 同種の書き込みコマンドを安価に deny する。
//
// 契約: subagent（agent_id あり）の ruleset・branch protection・リポジトリ本体への書き込み・同種 GraphQL
// mutation・gh repo edit 等は deny。読み取り（G0 が実行する rules/branches・rulesets/<id> の GET を含む）
// と main スレッド（agent_id なし）は許可（出力なし）。hook は同一トラストドメインでの best-effort であり
// 間接実行は防げない（ファイル冒頭コメント参照）。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const HOOK = join(dirname(fileURLToPath(import.meta.url)), '..', 'scripts', 'merge-guard-hook.sh')

function run(command, { agentId = 'agent-1' } = {}) {
  const input = { tool_name: 'Bash', tool_input: { command } }
  if (agentId) input.agent_id = agentId
  const out = execFileSync('bash', [HOOK], { input: JSON.stringify(input) }).toString()
  if (out.trim() === '') return { decision: 'allow' }
  const o = JSON.parse(out)
  return { decision: o.hookSpecificOutput.permissionDecision, reason: o.hookSpecificOutput.permissionDecisionReason }
}

const DENY = [
  // 実際の事例と同形
  'gh api --method PUT repos/Fandhe-AI/example/rulesets/123 --input /tmp/rs.json',
  'gh api -X PATCH "repos/{owner}/{repo}/rulesets/5" -f name=main-protection',
  'gh api -XDELETE repos/o/r/rulesets/5',
  'gh api --method=PUT repos/o/r/branches/main/protection --input p.json',
  'gh api -X DELETE repos/o/r/branches/release%2F1.0/protection',
  // フィールド指定による暗黙の POST
  'gh api repos/o/r/rulesets -f name=x -f enforcement=active',
  'gh api orgs/o/rulesets --input rs.json',
  'gh api repos/o/r/branches/main/protection/required_status_checks -F strict=false',
  // グローバルオプションの挟み込み
  'gh -R o/r api --method PUT repos/o/r/rulesets/1 --input x.json',
  // リポジトリ本体への明示の書き込み
  'gh api -X PATCH repos/o/r -f allow_auto_merge=true',
  'gh api --method DELETE repos/o/r',
  // GraphQL
  `gh api graphql -f query='mutation{updateRepositoryRuleset(input:{repositoryRulesetId:"x"}){clientMutationId}}'`,
  `gh api graphql -f query='mutation($i:CreateBranchProtectionRuleInput!){createBranchProtectionRule(input:$i){clientMutationId}}'`,
  `gh api graphql -f query='mutation{updateRepository(input:{repositoryId:"x",hasWikiEnabled:false}){clientMutationId}}'`,
  // gh repo の設定変更系サブコマンド
  'gh repo edit --enable-auto-merge',
  'gh repo edit o/r --default-branch develop',
  'gh repo archive o/r --yes',
  // security-auditor 実証のバイパス形（証拠照合を norm・tokenized の両方で行う契約・アンカー・終端・
  // 結合ショートオプション・`-f=` 形）
  'gh api -X POST -f name=x repos/O/R/rulesets;true',
  'gh api -X PATCH https://api.github.com/repos/OWNER/REPO -f name=x',
  'gh api -X DELETE repos/OWNER/REPO/',
  'gh api -iX DELETE repos/O/R/rulesets/1',
  'gh api -f=name=x repos/O/R/rulesets',
  // 同系統の派生形
  'gh api -XPUT repos/o/r/rulesets/1&&true',
  'gh api --method=delete repos/o/r/branches/main/protection',
  'gh api -F=enforcement=active orgs/o/rulesets',
  'gh api --field=name=x repos/o/r/rulesets',
  'gh api --raw-field=name=x repos/o/r/rulesets',
  'gh api -X PATCH /repos/o/r;echo',
  // 読み取りフィルタ除外の迂回防止（gh api 側のフィールド指定は引き続き deny。Issue #537）
  `gh api repos/o/r/rulesets -f enforcement=active | grep x`,
  `gh api repos/o/r/rulesets --jq '.a | .b' -f name=x`,
  `gh api repos/o/r/rulesets --jq ';' -f name=x`,
  'gh api repos/o/r/rulesets 2>&1 -f name=x',
  'echo x | gh api repos/o/r/rulesets -f name=x',
  'grep -F a=b f | gh api repos/o/r/rulesets -f name=x',
  'gh api repos/o/r/rulesets | grep -F a=b; gh api repos/o/r/rulesets -f name=x',
  'echo -f name=x | xargs gh api repos/o/r/rulesets',
  'gh api repos/o/r/rulesets $(true) | grep -F a=b -f name=x',
  'gh api repos/o/r/rulesets -f name=x | grep -F a=b',
  // GraphQL の repository 削除・archive mutation
  `gh api graphql -f query='mutation{deleteRepository(input:{repositoryId:"x"}){clientMutationId}}'`,
  `gh api graphql -f query='mutation{archiveRepository(input:{repositoryId:"x"}){clientMutationId}}'`,
]

const ALLOW = [
  // G0（merge-exec 手順 2b）が実際に実行する読み取りと同形
  `gh api --paginate --slurp "repos/{owner}/{repo}/rules/branches/main" | jq '[.[][] | select(.type == "required_status_checks")] | length'`,
  `gh api "repos/{owner}/{repo}/rulesets/<id>" --jq '.bypass_actors | type == "array" and length == 0'`,
  'gh api repos/o/r/rulesets/123 --jq .enforcement',
  'gh api repos/o/r/branches/main/protection',
  'gh api -i repos/o/r/branches/main/protection',
  // 明示の GET + クエリパラメータ
  'gh api --method GET repos/o/r/rulesets -F per_page=100',
  'gh api -X GET repos/o/r/rulesets -f includes_parents=true',
  // 同名フラグの誤検知回避（grep -F / jq -f は key=value 形ではない）
  'gh api repos/o/r/rulesets | grep -F bypass_actors',
  'gh api repos/o/r/rulesets/1 | jq -f /tmp/filter.jq',
  // 既定 GET の読み取りのパイプ後段 grep -F key=value は書き込みではない（Issue #537）
  `gh api repos/o/r/rulesets | grep -F 'enforcement=active'`,
  'gh api repos/o/r/rulesets | grep -F enforcement=active | head -1',
  'gh api repos/o/r/rulesets && grep -F enforcement=active out.txt',
  'gh api repos/o/r/rulesets; grep -F enforcement=active out.txt',
  'gh api repos/o/r/branches/main/protection | egrep -F strict=false',
  `gh api repos/o/r/rulesets --jq '.[] | select(.name == "x")' | grep -F enforcement=active`,
  // リポジトリ本体の GET・設定以外への POST
  'gh api repos/o/r --jq .default_branch',
  'gh api repos/o/r/issues/5/comments -f body=hello',
  'gh repo view --json defaultBranchRef --jq .defaultBranchRef.name',
  // リポジトリ本体配下の非設定エンドポイントへの書き込み・フル URL の GET
  'gh api -X POST repos/o/r/issues/5/comments -f body=hi',
  'gh api https://api.github.com/repos/o/r --jq .default_branch',
  'gh api -X GET repos/o/r/',
  // GraphQL の読み取り
  `gh api graphql -f query='query{repository(owner:"o",name:"r"){rulesets(first:10){nodes{name}}}}'`,
  `gh api graphql -F owner='{owner}' -F name='{repo}' -F n=4 -f query='query($owner:String!,$name:String!,$n:Int!){repository(owner:$owner,name:$name){issue(number:$n){number parent{number}}}}'`,
]

for (const cmd of DENY) {
  test(`deny: ${cmd}`, () => {
    const r = run(cmd)
    assert.equal(r.decision, 'deny')
    assert.match(r.reason, /^implement-issue-tree-merge-guard: /)
  })
}

for (const cmd of ALLOW) {
  test(`allow: ${cmd}`, () => {
    assert.deepEqual(run(cmd), { decision: 'allow' })
  })
}

test('main スレッド（agent_id なし）は設定変更コマンドでも制限対象外', () => {
  assert.deepEqual(run('gh api --method PUT repos/o/r/rulesets/1 --input x.json', { agentId: '' }), { decision: 'allow' })
})

test('既存のマージ系 deny は維持される', () => {
  assert.equal(run('gh pr merge 5 --squash').decision, 'deny')
  assert.equal(run('gh api -X PUT repos/o/r/pulls/5/merge').decision, 'deny')
})
