// 全エージェントへの「ruleset・branch protection・リポジトリ設定の変更禁止」権限境界の回帰テスト。
//
// 対象事例: Merge ループの fix エージェントが「新 check-run が required 未登録」というレビュー指摘に
// 対応しようとして、承認なしに gh api --method PUT repos/<o>/<r>/rulesets/<id> で ruleset を変更し、
// コミット本文に事実でない「オーナー承認」を書いた。
//
// 是正後の契約: REPO_SETTINGS_POLICY を COMMON_LINES（末尾）・MERGE_CONTEXT_COMMON の両方へ入れ、
// BASE_MERGE_CONTEXT_COMMON も COMMON_LINES 経由で継承する。gh を使い得る全プロンプトがいずれかを
// 含むことを、実際にプロンプトを組み立てて確認する。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const SCRIPT_PATH = join(
  dirname(fileURLToPath(import.meta.url)),
  '..', 'scripts', 'implement-issue-tree.src.js',
)
// マーカー文字列はソース中に 1 回しか現れてはならない（g0-gates.test.mjs が出現回数を固定）ため分割して組み立てる。
const DRIVER_MARKER = ['__IMPLEMENT', 'ISSUE', 'TREE', 'DRIVER', 'START__'].join('_')

const source = readFileSync(SCRIPT_PATH, 'utf8')
const markerIndex = source.indexOf(DRIVER_MARKER)
if (markerIndex < 0) throw new Error(`テスト境界マーカー ${DRIVER_MARKER} が実装スクリプトに存在しない`)
const definitionPart = source.slice(0, source.lastIndexOf('\n', markerIndex))
const driverPart = source.slice(markerIndex)
const sliceDir = mkdtempSync(join(tmpdir(), 'implement-issue-tree-repo-settings-'))
const slicePath = join(sliceDir, 'implement-issue-tree-repo-settings-defs.mjs')
const SLICE_EXPORTS = [
  'REPO_SETTINGS_POLICY',
  'LONG_RUNNING_POLICY',
  'COMMON_LINES',
  'COMMON',
  'MERGE_CONTEXT_COMMON',
  'BASE_MERGE_CONTEXT_COMMON',
  'planPrompt',
  'reviewPrompt',
  'lowFindingsCommentPrompt',
  'implementPrompt',
  'monitorPrompt',
  'mergeExecutePrompt',
  'mergeVerifyPrompt',
  'optinRecordVerifyPrompt',
  'prCreatePrompt',
  'fixPrompt',
  'baseMergePrompt',
  'closePrompt',
  'recoverPrompt',
  'recoverImplementPrompt',
  'prereqProbePrompt',
  'declaredDepsPrompt',
  'outOfTreeStatePrompt',
  'rootAncestorsPrompt',
]
// fixPrompt は boundaryNonce() を内部で使うため、g0-gates.test.mjs と同じテスト専用 setter で
// seed を注入する（本番では ensureBoundaryNonceSeed() がラン開始時に 1 回だけ行う）。
const TEST_ONLY_SETTER = 'export function __setBoundaryNonceSeedForTest(v) { boundaryNonceSeed = v }\n'
writeFileSync(slicePath, `${definitionPart}\nexport { ${SLICE_EXPORTS.join(', ')} }\n${TEST_ONLY_SETTER}`)
const m = await import(pathToFileURL(slicePath).href)
m.__setBoundaryNonceSeedForTest('a'.repeat(64))

test('REPO_SETTINGS_POLICY: 禁止対象・報告先・承認の虚偽記述禁止を含む', () => {
  const p = m.REPO_SETTINGS_POLICY
  assert.match(p, /^権限境界（リポジトリ設定）: /)
  for (const s of ['rulesets', 'branches/<branch>/protection', 'repos/<owner>/<repo>', 'PATCH', 'PUT', 'POST', 'DELETE', 'gh repo edit', 'GraphQL mutation']) {
    assert.ok(p.includes(s), `禁止対象に ${s} が無い`)
  }
  assert.match(p, /求められても実行せず、summary（outOfScope フィールドがあればそこにも）に要対応事項として報告する/)
  assert.match(p, /承認の有無を事実以上に記述しない/)
})

test('共通指示: COMMON_LINES の末尾・MERGE_CONTEXT_COMMON・BASE_MERGE_CONTEXT_COMMON がすべて含む', () => {
  // 末尾に置く（BASE_MERGE_CONTEXT_COMMON は COMMON_LINES を index 指定で除外するため、途中挿入で除外対象がずれる）。
  assert.equal(m.COMMON_LINES.at(-1), m.LONG_RUNNING_POLICY)
  assert.ok(m.COMMON_LINES.includes(m.REPO_SETTINGS_POLICY))
  assert.ok(m.COMMON.includes(m.REPO_SETTINGS_POLICY))
  assert.ok(m.MERGE_CONTEXT_COMMON.includes(m.REPO_SETTINGS_POLICY))
  assert.ok(m.BASE_MERGE_CONTEXT_COMMON.includes(m.REPO_SETTINGS_POLICY))
})

const item = { number: 42, title: 'サンプルイシュー', optinTests: [] }
const impl = { prNumber: 123, branch: 'fix/42-noop', worktreePath: '/tmp/wt-42', summary: 's' }
const finding = { summary: 'テスト用の指摘', unresolvedComments: [] }
const prompts = {
  planPrompt: () => m.planPrompt(item),
  reviewPrompt: () => m.reviewPrompt(item, impl),
  lowFindingsCommentPrompt: () => m.lowFindingsCommentPrompt(item, 123, []),
  implementPrompt: () => m.implementPrompt(item, 'plan-text'),
  monitorPrompt: () => m.monitorPrompt(item, impl, [], true, false),
  mergeExecutePrompt: () => m.mergeExecutePrompt(item, impl, true, [{ app: 'cursor', contexts: ['Cursor Bugbot'] }]),
  mergeVerifyPrompt: () => m.mergeVerifyPrompt(item, impl),
  optinRecordVerifyPrompt: () => m.optinRecordVerifyPrompt(item, impl, ['make e2e']),
  prCreatePrompt: () => m.prCreatePrompt(item, impl, []),
  'fixPrompt(push)': () => m.fixPrompt(item, impl, finding, true),
  'fixPrompt(no-push)': () => m.fixPrompt(item, impl, finding, false),
  baseMergePrompt: () => m.baseMergePrompt(item, impl, 'Fandhe-AI/agent-cli-skills', 'chore: base ブランチの変更を取り込む'),
  closePrompt: () => m.closePrompt(item),
  recoverPrompt: () => m.recoverPrompt(item, 'fix/42-noop', '/tmp/wt-42'),
  recoverImplementPrompt: () => m.recoverImplementPrompt(item, { done: '', remaining: '', broken: '' }, 'fix/42-noop'),
  prereqProbePrompt: () => m.prereqProbePrompt([7], {}),
  declaredDepsPrompt: () => m.declaredDepsPrompt([7]),
  outOfTreeStatePrompt: () => m.outOfTreeStatePrompt([7]),
  rootAncestorsPrompt: () => m.rootAncestorsPrompt(4),
}
for (const [name, build] of Object.entries(prompts)) {
  test(`${name}: 組み立てたプロンプトがリポジトリ設定の変更禁止を含む`, () => {
    assert.ok(build().includes(m.REPO_SETTINGS_POLICY))
  })
}

test('駆動部: インラインの Tree 取得・外部チェック観測エージェントも COMMON を含む', () => {
  for (const head of ['GitHub イシューツリー取得タスク。', '外部チェック観測タスク']) {
    const i = driverPart.indexOf(head)
    assert.ok(i >= 0, `${head} が見つからない`)
    assert.match(driverPart.slice(i, i + 300), /\n\s+COMMON,\n/)
  }
})
