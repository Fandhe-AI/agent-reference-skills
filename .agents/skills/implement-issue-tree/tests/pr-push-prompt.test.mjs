// pr-create / fix のプロンプトが scripts/pr-push.sh を正しく呼ぶことの契約テスト（Issue #603 第 4 弾。旧 Issue #466 の回帰テスト
// pr-create-checkout-verification.test.mjs の置き換え）。
//
// 旧テストは prCreatePrompt の文章（起点確立の終了コード確認・rev-parse の一致確認・差分ゼロチェック・明示 refspec の push）を
// 語句で固定していた。それらの手順はスクリプトへ移ったので、同じ意味は実行テストで固定する:
//   - 起点の確立・sha の一致確認・4 分岐: tests/pr-push.test.mjs（実 git）と tests/pr-push-unit.test.mjs（pp_decide_origin の表）
//   - 差分ゼロ（no-diff）・push の 1 形・push 後の確認: tests/pr-push.test.mjs / tests/push-verify.test.mjs
// ここで見るのはホスト側の配線だけ: プロンプトが (1) 手順を prepare → push → pr の順に、固定の引数で呼ぶこと、(2) git / gh で手順を
// 組み立て直す指示（fetch・checkout・rev-list・push・pr list・pr create）を持たないこと、(3) 失敗の status を固定の返し方に結ぶこと。
//
// 読み込み方式は conflict-prepush-gate.test.mjs と同じ（定義部をスライスして import する）。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs'
import { trackTmp } from './lib/tmp-track.mjs'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const SCRIPT_PATH = join(dirname(fileURLToPath(import.meta.url)), '..', 'scripts', 'implement-issue-tree.src.js')
const DRIVER_MARKER = '__IMPLEMENT_ISSUE_TREE_DRIVER_START__'

const source = readFileSync(SCRIPT_PATH, 'utf8')
const markerIndex = source.indexOf(DRIVER_MARKER)
if (markerIndex < 0) {
  throw new Error(`テスト境界マーカー ${DRIVER_MARKER} が実装スクリプトに存在しない（削除・改名は回帰テストを無効化する）`)
}
const definitionPart = source.slice(0, source.lastIndexOf('\n', markerIndex))
const sliceDir = trackTmp(mkdtempSync(join(tmpdir(), 'implement-issue-tree-pr-push-prompt-')))
const slicePath = join(sliceDir, 'implement-issue-tree-defs.mjs')
const SLICE_EXPORTS = ['prCreatePrompt', 'fixPrompt', 'baseMergePrompt']
// fixPrompt は boundaryNonce() を内部で使う。テスト専用の setter で seed を注入する（conflict-prepush-gate.test.mjs と同一パターン）
const TEST_ONLY_SETTER = 'export function __setBoundaryNonceSeedForTest(v) { boundaryNonceSeed = v }\n'
writeFileSync(slicePath, `${definitionPart}\nexport { ${SLICE_EXPORTS.join(', ')} }\n${TEST_ONLY_SETTER}`)

// 起動コマンドは args.skillDir と args.repo を使う。実ランでは起動手順が渡す
globalThis.args = { skillDir: '/opt/skills/implement-issue-tree', repo: 'Fandhe-AI/agent-cli-skills' }
const mod = await import(pathToFileURL(slicePath).href)
const { prCreatePrompt, fixPrompt, baseMergePrompt, __setBoundaryNonceSeedForTest } = mod
__setBoundaryNonceSeedForTest(123456789)

const item = { number: 466, title: 'テストイシュー' }
const impl = { prNumber: 777, branch: 'fix/466-pr-create-checkout-verify' }
const B = impl.branch
const CMD = (rest) => `bash '/opt/skills/implement-issue-tree/scripts/run-verified.sh' @@SCRIPT_SHA256:pr-push.sh@@ pr-push.sh${rest}`
const R = ' --repo Fandhe-AI/agent-cli-skills'

// 手順の組み立て直しになる git / gh の直接呼び出し。プロンプトに実行コマンドとして現れてはならない
const FORBIDDEN = [/git fetch origin/, /git checkout --detach/, /git rev-list/, /git push origin/, /gh pr list/, /gh pr create/, /git merge --no-edit/, /git ls-remote/]

test('構造ガード: マーカーは 1 か所のみ存在し、対象 3 関数が import できる', () => {
  assert.equal(source.split(DRIVER_MARKER).length - 1, 1)
  for (const f of [prCreatePrompt, fixPrompt, baseMergePrompt]) assert.equal(typeof f, 'function')
})

test('prCreatePrompt: prepare → push → pr の順に pr-push.sh を固定の引数で呼ぶ（--repo は args.repo から）', () => {
  const prompt = prCreatePrompt(item, impl, [])
  const prepare = prompt.indexOf(CMD(` --mode prepare --origin pr-create --branch ${B} --base main${R}`))
  const push = prompt.indexOf(CMD(` --mode push --origin pr-create --branch ${B} --base main${R}`))
  const pr = prompt.indexOf(CMD(` --mode pr --branch ${B} --base main --title-file <タイトルファイル> --body-file <本文ファイル> --issue 466 --expect-sha <headSha>${R}`))
  assert.ok(prepare >= 0 && push >= 0 && pr >= 0, `${prepare} ${push} ${pr}`)
  assert.ok(prepare < push && push < pr, '呼び出しの順序が崩れている')
  // push 後 CI 起動確認は PR 番号の確定後
  assert.ok(prompt.indexOf('3b. push 後 CI 起動確認') > pr)
})

test('prCreatePrompt: git / gh で手順を組み立て直す指示を持たない。失敗は prNumber: 0 と status で返す', () => {
  const prompt = prCreatePrompt(item, impl, [])
  // 実行コマンドとしての git / gh（push 後確認の observe-pr.sh と、既存 PR 本文の取得・更新の gh pr view / gh pr edit は残る）
  for (const re of FORBIDDEN) assert.doesNotMatch(prompt, re, String(re))
  assert.match(prompt, /prNumber: 0 で返す/)
  assert.match(prompt, /remote-ahead・diverged は localSha・remoteSha も/)
  assert.match(prompt, /no-diff は「base main との差分が 0 件/)
  assert.match(prompt, /hook-rejected は abort 済み/)
  assert.match(prompt, /--subject-file/)
  // 既存 PR を再利用する経路（reused）だけが手順 1c に進む
  assert.match(prompt, /reused は base と head の sha が一致する既存の open PR を再利用する場合で、その prNumber で手順 1c へ進む/)
  assert.match(prompt, /1c\. （1b が reused を返したときのみ）/)
})

test('prCreatePrompt: push の status は race を含めて PR 作成を止める。進めるのは pushed・noop・unverified だけで、headSha を 1b の --expect-sha へ渡す', () => {
  const prompt = prCreatePrompt(item, impl, [])
  assert.match(prompt, /push-failed・no-diff・merge-in-progress・base-not-fetched・base-not-merged（[^）]*）・routing-error・error なら push していないので prNumber: 0/)
  assert.match(prompt, /race（[^）]*）も PR を作らず prNumber: 0 と race を理由として返す/)
  assert.match(prompt, /pushed・noop（再入でリモートが既に HEAD）・unverified（[^）]*）なら push は届いているので、結果の headSha（40 桁の sha）を控えて手順 1b へ進む/)
  assert.doesNotMatch(prompt, /pushed・noop[^。]*race[^。]*手順 1b へ進む/, 'race で PR 作成へ進めない')
  // pr モードの失敗 status（サーバー head の照合・milestone）は PR を作らずに返す
  assert.match(prompt, /head-moved・remote-head-missing・remote-head-unknown・remote-head-mismatch/)
  assert.match(prompt, /milestone-check-failed（milestone を取得できない。PR は作っていない）/)
})

test('prCreatePrompt: 再利用 PR の本文取得・更新（gh pr view / gh pr edit）にも args.repo を -R で渡す。args.repo が無ければ付けない', () => {
  const prompt = prCreatePrompt(item, impl, [])
  assert.match(prompt, /gh pr view <番号> -R Fandhe-AI\/agent-cli-skills --json body --jq \.body > "\$f"/)
  assert.match(prompt, /gh pr edit <番号> -R Fandhe-AI\/agent-cli-skills --body-file "\$f" && rm -f "\$f"/)
  assert.match(prompt, /<タイトルファイル>・<本文ファイル> はそれぞれ書いたファイルの絶対パスへ、<headSha> は手順 1 の結果の headSha へ置き換え、他は一字一句そのまま/, '置換対象の列挙に <headSha> を含める')
  assert.match(prompt, /milestone が unassigned のときは、"\$f" の末尾にも「> \*\*警告\*\*/)
})

test('prCreatePrompt: PR 本文のテンプレートは 1b に 1 箇所だけあり、Closes 行・対象外節を含む。タイトルと本文はファイル経由で渡す', () => {
  const prompt = prCreatePrompt(item, impl, ['対象外の項目 A'])
  assert.equal(prompt.split('## Summary').length - 1, 1)
  assert.match(prompt, /Closes #466/)
  assert.match(prompt, /## 対象外（out-of-scope）\n\s*- 対象外の項目 A/)
  assert.match(prompt, /一時ファイルへ Write ツール等でファイル内容として書く（シェルの引数・HEREDOC にしない）/)
  assert.doesNotMatch(prompt, /手順 2 の body テンプレート/)
})

test('fixPrompt(pushAfterFix: true): 手順 1 で prepare --origin fix、手順 4 で push --origin fix を呼び、git / gh で組み立て直さない', () => {
  const text = fixPrompt(item, impl, { summary: 'テスト用の指摘要約', unresolvedComments: [] }, true, [])
  const prepare = text.indexOf(CMD(` --mode prepare --origin fix --branch ${B} --base main${R}`))
  const push = text.indexOf(CMD(` --mode push --origin fix --branch ${B} --base main${R}`))
  assert.ok(prepare >= 0 && push >= 0)
  assert.ok(prepare < text.indexOf('2. 指摘を重要度を問わずすべて修正する') && text.indexOf('2. 指摘を重要度を問わずすべて修正する') < push, 'prepare は修正作業の前、push は修正のコミットの後')
  for (const re of FORBIDDEN.filter((r) => !/gh pr/.test(String(r)))) assert.doesNotMatch(text, re, String(re))
  // 失敗は commitFailed: true（修正コミット未作成のためホストが失敗終端する）
  assert.match(text, /pushed: false・commitFailed: true・routingError なしで返す/)
})

test('fixPrompt(pushAfterFix: true): push の status を pushed 判定へ結ぶ（pushed だけが true。noop・race では resolve しない）', () => {
  const text = fixPrompt(item, impl, { summary: 's', unresolvedComments: [] }, true, [])
  assert.match(text, /status が pushed のときだけ pushed: true/)
  assert.match(text, /noop は pushed: false・summary に「変更なしのため push は no-op」（手順 5 の resolve を一切実行しない/)
  assert.match(text, /race は pushed: false・summary に「リモート head がローカル HEAD と不一致（並行 push 競合の可能性）」（resolve しない/)
  assert.match(text, /merge-in-progress・base-not-fetched・base-not-merged（[^）]*）・routing-error・error は push していないので、pushed: false・commitFailed: true/)
  // 非 0 終了・結果の行なしは「push 不要」と区別できる commitFailed 側へ倒す
  assert.match(text, /非 0 終了・結果の行なしも同じ扱い（pushed: false・commitFailed: true/)
  assert.ok(text.includes(CMD(` --mode push --origin fix --branch ${B} --base main${R}`)), 'fix の push にも --repo を渡す')
  assert.match(text, /gh pr view 777 -R Fandhe-AI\/agent-cli-skills --json body/)
  assert.match(text, /gh pr edit 777 -R Fandhe-AI\/agent-cli-skills --body-file/)
})

test('fixPrompt(pushAfterFix: false): pr-push.sh を呼ばない（push 前の Review ループ。ローカル修正のみ）', () => {
  const text = fixPrompt(item, impl, { summary: 's', unresolvedComments: [] }, false, [])
  assert.doesNotMatch(text, /pr-push\.sh/)
  assert.match(text, /git branch -f/)
})

test('baseMergePrompt（自動 base 取り込み）は pr-push.sh を呼ばない（base-merge.sh のまま）', () => {
  const text = baseMergePrompt(item, impl, 'Fandhe-AI/agent-cli-skills')
  assert.doesNotMatch(text, /pr-push\.sh/)
  assert.match(text, /base-merge\.sh/)
})

test('prCreatePrompt: milestone 警告の追記は最後の gh pr edit より前（更新後に足しても PR へ反映されない）で、最後の更新の列挙にも含む', () => {
  for (const outOfScope of [[], ['対象外の項目 A']]) {
    const prompt = prCreatePrompt(item, impl, outOfScope)
    const warn = prompt.indexOf('milestone が unassigned のときは、"$f" の末尾にも')
    const edit = prompt.indexOf(`gh pr edit <番号> -R Fandhe-AI/agent-cli-skills --body-file "$f" && rm -f "$f"`)
    assert.ok(warn >= 0 && edit >= 0)
    assert.ok(warn < edit, `警告の指示(${warn})が gh pr edit(${edit})より後ろにある`)
    assert.match(prompt, /本文への追記（Closes 行・対象外節[^）]*milestone 警告）をすべて終えてから、最後に 1 回だけ更新/)
  }
})

test('prCreatePrompt: push 前（prepare 後・push 前）に base の SHA から HEAD までの差分でセキュリティ確認し、問題・検査失敗は push も PR 作成もせず prNumber: 0 で返す', () => {
  const prompt = prCreatePrompt(item, impl, [])
  const prepare = prompt.indexOf(CMD(` --mode prepare --origin pr-create --branch ${B} --base main${R}`))
  const sec = prompt.indexOf('0e. push 前のセキュリティ確認')
  const push = prompt.indexOf(CMD(` --mode push --origin pr-create --branch ${B} --base main${R}`))
  assert.ok(prepare >= 0 && sec > prepare && sec < push, '確認は prepare の後・push の前')
  assert.match(prompt, /git rev-parse refs\/worktree\/pr-push\/base/)
  assert.match(prompt, /git diff <その SHA> HEAD の差分（[^）]*コンフリクト解消コミットの変更を含む）/)
  assert.match(prompt, /skills\/create-pr\/SKILL\.md Step 2/)
  assert.match(prompt, /\.claude\/rules\/security\.md の方針に従う（追加行のみ対象・マッチ行は出力せず件数と終了コードで判定・grep が終了コード 2 以上なら検査失敗として中止）/)
  assert.match(prompt, /push も PR 作成もせず prNumber: 0 と「セキュリティ確認で問題を検出/)
})

test('prCreatePrompt: 手順 0e を通らずに手順 1 へ進む指示がない（optinTests の有無どちらでも）。0d の進み先は 0e', () => {
  for (const optinTests of [[], [{ command: 'npm run e2e' }]]) {
    const prompt = prCreatePrompt({ ...item, optinTests }, impl, [])
    // 「手順 1 へ進む」と書けるのは 0e だけ
    const gotos = [...prompt.matchAll(/手順 1 へ進む/g)].map((m) => m.index)
    const sec = prompt.indexOf('0e. push 前のセキュリティ確認')
    assert.ok(sec >= 0)
    assert.equal(gotos.length, 1, `手順 1 へ進む指示は 0e の 1 箇所だけ: ${gotos.length}`)
    assert.ok(gotos[0] > sec && gotos[0] < prompt.indexOf('1. push（Bash の timeout'), '0e の本文内にある')
    if (optinTests.length) assert.match(prompt, /0d\. [^\n]*両方成立した場合のみ手順 0e へ進む/)
  }
})
