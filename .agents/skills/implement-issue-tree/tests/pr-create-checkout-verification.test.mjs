// Issue #466 の回帰テスト（実測元 #464。vector-db #629 ラン #645）: pr-create フェーズが
// detached HEAD の起点確立（git checkout --detach ${branch}）の実行結果を検証しないまま
// base merge・push まで進むと、隔離 worktree に残っていた無関係な HEAD（base の tip 等）が
// そのまま push され、実装コミットを含まない ref が origin へ反映され得た。この結果 push した
// remote branch の tip が origin/main の tip と一致し、gh pr create が「No commits between
// base and branch」で失敗した（prNumber: 0 で failed 終端）。
//
// 本テストは prCreatePrompt が生成するプロンプト文字列を対象に、(1) checkout 直後の起点検証
// （終了コード確認 + git rev-parse HEAD と refs/heads/<branch> の一致確認）が (i)（初回・
// ローカル起点）・(iii)（local-ahead・回復フロー）の両分岐に存在すること、(2) push 前の
// 差分ゼロチェック（手順 0b）が base merge 指示より後・push 指示より前に位置すること、
// (3) 差分ゼロチェックが具体的に git rev-list --count origin/<base>..HEAD を使うこと、
// (4) 差分ゼロ時に fail-closed（prNumber: 0）で終端する文言が存在すること、(5) 要件1（明示
// refspec による push）が既存実装のまま維持されていることを固定する。
//
// 読み込み方式は skills/implement-issue-tree/tests/conflict-prepush-gate.test.mjs と同じ:
// 対象スクリプトは Workflow ハーネス専用文法（トップレベル return・注入グローバル
// args / agent / log / phase）を含むため module として丸ごと import できない。
// __IMPLEMENT_ISSUE_TREE_DRIVER_START__ マーカーより上（定義部のみ）を一時ファイルへ切り出し、
// 対象関数へ export を付与して import する。
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
const DRIVER_MARKER = '__IMPLEMENT_ISSUE_TREE_DRIVER_START__'

const source = readFileSync(SCRIPT_PATH, 'utf8')
const markerIndex = source.indexOf(DRIVER_MARKER)
if (markerIndex < 0) {
  throw new Error(`テスト境界マーカー ${DRIVER_MARKER} が実装スクリプトに存在しない（削除・改名は回帰テストを無効化する）`)
}
const definitionPart = source.slice(0, source.lastIndexOf('\n', markerIndex))
const sliceDir = mkdtempSync(join(tmpdir(), 'implement-issue-tree-pr-create-checkout-'))
const slicePath = join(sliceDir, 'implement-issue-tree-defs.mjs')
const SLICE_EXPORTS = ['prCreatePrompt', 'fixPrompt', 'baseMergePrompt']
// fixPrompt は boundaryNonce() を内部で使う。本番では ensureBoundaryNonceSeed() が agent()
// 経由で乱数 seed を注入してから呼ばれるが、agent はこのスライスに未注入のため、テスト専用の
// setter を同一モジュールスコープへ追記して非 export の module-scope let（boundaryNonceSeed）
// へ疑似乱数値を直接注入する（conflict-prepush-gate.test.mjs と同一パターン）。
const TEST_ONLY_SETTER =
  'export function __setBoundaryNonceSeedForTest(v) { boundaryNonceSeed = v }\n'
writeFileSync(
  slicePath,
  `${definitionPart}\nexport { ${SLICE_EXPORTS.join(', ')} }\n${TEST_ONLY_SETTER}`,
)

const mod = await import(pathToFileURL(slicePath).href)
const { prCreatePrompt, fixPrompt, baseMergePrompt, __setBoundaryNonceSeedForTest } = mod
__setBoundaryNonceSeedForTest(123456789)

const item = { number: 466, title: 'テストイシュー' }
const impl = { prNumber: 0, branch: 'fix/466-pr-create-checkout-verify' }

test('構造ガード: マーカーは 1 か所のみ存在し、対象 3 関数が import できる', () => {
  assert.equal(source.split(DRIVER_MARKER).length - 1, 1)
  assert.equal(typeof prCreatePrompt, 'function')
  assert.equal(typeof fixPrompt, 'function')
  assert.equal(typeof baseMergePrompt, 'function')
})

test('prCreatePrompt: ケース (i)（初回・ローカル起点）の checkout 直後に終了コード確認と rev-parse 一致確認の指示がある', () => {
  const prompt = prCreatePrompt(item, impl, [])
  // ケース (i) の checkout 文言と、その後に続く検証文言をこの順で確認する。
  const caseIIdx = prompt.indexOf('場合は初回実行なのでローカル起点')
  const verifyIdx = prompt.indexOf('この checkout の終了コードを必ず確認する')
  const revParseIdx = prompt.indexOf('git rev-parse HEAD と git rev-parse refs/heads/')
  const failClosedIdx = prompt.indexOf('ローカルブランチ ${branch} の checkout に失敗'.replace('${branch}', impl.branch))
  assert.ok(caseIIdx >= 0, 'ケース (i) の分岐文言がない')
  assert.ok(verifyIdx >= 0, '終了コード確認の指示がない')
  assert.ok(revParseIdx >= 0, 'rev-parse による一致確認の指示がない')
  assert.ok(caseIIdx < verifyIdx, '終了コード確認がケース (i) より前に現れる（別分岐の文言と誤認する）')
  assert.ok(verifyIdx < revParseIdx, 'rev-parse 確認が終了コード確認より前に現れる')
  // base merge（baseMergeInstruction の結果）より前に位置すること。
  const baseMergeIdx = prompt.indexOf('git merge --no-edit')
  assert.ok(baseMergeIdx >= 0, 'base merge 指示（git merge --no-edit）が見つからない')
  assert.ok(revParseIdx < baseMergeIdx, '起点検証指示が base merge 指示より後に現れる')
  assert.ok(failClosedIdx >= 0, 'checkout 失敗・不一致時の fail-closed 理由文言がない')
})

test('prCreatePrompt: ケース (iii)（local-ahead・回復フロー）にも起点検証の参照指示がある', () => {
  const prompt = prCreatePrompt(item, impl, [])
  const caseIIIIdx = prompt.indexOf('local ahead')
  assert.ok(caseIIIIdx >= 0, 'ケース (iii)（local ahead）の分岐文言がない')
  const refVerifyIdx = prompt.indexOf('この checkout も (i) と同じ終了コード確認')
  assert.ok(refVerifyIdx >= 0, 'ケース (iii) に (i) と同じ検証を行う旨の指示がない')
  assert.ok(caseIIIIdx < refVerifyIdx, '検証指示がケース (iii) の分岐文言より前に現れる')
})

test('prCreatePrompt: 手順 0b（push 前 差分ゼロチェック）が base merge より後・push より前に位置する', () => {
  const prompt = prCreatePrompt(item, impl, [])
  const zeroDiffIdx = prompt.indexOf('push 前 差分ゼロチェック')
  const baseMergeAnchorIdx = prompt.indexOf('起点を checkout したら base を取り込む')
  const pushIdx = prompt.indexOf('git push origin HEAD:refs/heads/')
  assert.ok(zeroDiffIdx >= 0, '手順 0b（差分ゼロチェック）の文言がない')
  assert.ok(baseMergeAnchorIdx >= 0, 'base 取り込み指示のアンカー文言がない')
  assert.ok(pushIdx >= 0, 'push 指示（git push origin HEAD:refs/heads/<branch>）がない')
  assert.ok(baseMergeAnchorIdx < zeroDiffIdx, '手順 0b が base 取り込み指示より前に現れる')
  assert.ok(zeroDiffIdx < pushIdx, '手順 0b が push 指示より後に現れる')
})

test('prCreatePrompt: 差分ゼロチェックは git rev-list --count origin/<base>..HEAD を使い、0 件時は fail-closed（prNumber: 0）で終端する', () => {
  const prompt = prCreatePrompt(item, impl, [])
  // baseBranch はテスト環境では args 未定義のため既定値 'main' に解決される。
  assert.ok(
    prompt.includes('git rev-list --count origin/main..HEAD'),
    'git rev-list --count origin/<base>..HEAD の具体的なコマンド文字列が含まれない',
  )
  const zeroDiffSection = prompt.slice(prompt.indexOf('push 前 差分ゼロチェック'))
  assert.ok(zeroDiffSection.includes('prNumber: 0'), '差分ゼロ時に prNumber: 0 を返す指示がない')
  assert.ok(
    zeroDiffSection.includes('差分が 0 件'),
    '差分ゼロ時の理由文言に「差分が 0 件」に相当する文言がない',
  )
})

test('prCreatePrompt: 要件1（明示 refspec による push）は既存実装のまま維持されている（git push origin <branch> の暗黙形式は使わない）', () => {
  const prompt = prCreatePrompt(item, impl, [])
  assert.ok(
    prompt.includes(`git push origin HEAD:refs/heads/${impl.branch}`),
    '明示 refspec 形式（git push origin HEAD:refs/heads/<branch>）の push 指示がない',
  )
  const pushLine = prompt.split('\n').find((l) => l.includes('を ${branch} へ push する'.replace('${branch}', impl.branch)) || l.startsWith('1. git push origin HEAD:refs/heads/'))
  assert.ok(pushLine, 'push 手順の行が見つからない')
  assert.ok(
    !pushLine.includes(`git push origin ${impl.branch}`) || pushLine.includes(`git push origin HEAD:refs/heads/${impl.branch}`),
    'push 手順が暗黙形式 git push origin <branch> のみになっている',
  )
  // 暗黙形式そのもの（HEAD:refs/heads/ を伴わない git push origin <branch>）が
  // 単独のコマンドとして登場しないことを固定する。
  const implicitFormPattern = new RegExp(`git push origin ${impl.branch}(?!:refs/heads/)`)
  const explicitOnly = prompt
    .split(`git push origin HEAD:refs/heads/${impl.branch}`)
    .join('')
  assert.ok(
    !implicitFormPattern.test(explicitOnly) || explicitOnly.includes(`git push origin ${impl.branch} は使わない`),
    '暗黙形式 git push origin <branch> が実行対象コマンドとして残っている（使わない旨の説明以外での出現）',
  )
})

test('fixPrompt / baseMergePrompt には新設した checkout 検証・差分ゼロゲートを追加していない（スコープ外の確認）', () => {
  // Issue #466 の要件は pr-create フェーズの push 処理に限定される。fixPrompt / baseMergePrompt
  // 側の類似構造（checkout + base merge）は本 Issue のスコープ外であり、新規追加した固有文言が
  // 混入していないことのみを確認する（既存動作への回帰がないことの傍証）。
  const fixText = fixPrompt(item, impl, { summary: 'テスト用の指摘要約', unresolvedComments: [] }, true, [])
  const baseMergeText = baseMergePrompt(item, { ...impl, prNumber: 777 }, 'Fandhe-AI/agent-cli-skills')
  for (const text of [fixText, baseMergeText]) {
    assert.ok(!text.includes('push 前 差分ゼロチェック'), '手順 0b（pr-create 専用）が他プロンプトに混入している')
  }
})
