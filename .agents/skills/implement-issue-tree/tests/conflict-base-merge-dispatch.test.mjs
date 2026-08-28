// Issue #441 の回帰テスト: monitor が mergeable: CONFLICTING を検出したときのホスト側分岐が
// fixCount（レビュー指摘対応・上限 6）ではなく独立予算の baseMergeCount（上限 maxBaseMerges）を
// 消費すること、base 取り込み専用エージェント（baseMergePrompt）がレビュー指摘の修正・スレッド
// resolve・PR 本文編集を一切行わない権限境界を持つこと、merge-exec の not-mergeable も同じ
// conflicting 状態へ写像されることを、モデル出力に依存しない JS 純粋部分（引数パーサ・
// プロンプト契約・状態写像・スキーマ・駆動部のソース走査）で固定する。
//
// 読み込み方式は skills/implement-issue-tree/tests/g0-gates.test.mjs と同一（マーカー切り出し
// スライス方式）。実装スクリプトは Workflow ハーネス専用文法のため module として丸ごと import
// できないための回避策であり、他のテストファイルと重複しても踏襲する。
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
const driverPart = source.slice(markerIndex)
const sliceDir = mkdtempSync(join(tmpdir(), 'implement-issue-tree-base-merge-'))
const slicePath = join(sliceDir, 'implement-issue-tree-defs.mjs')
const SLICE_EXPORTS = [
  'parseMaxBaseMerges',
  'classifyMergeExecDispatch',
  'MERGE_SCHEMA',
  'MERGE_VALID_STATES',
  'BASE_MERGE_SCHEMA',
  'baseMergePrompt',
  'baseMergeInstruction',
  'monitorPrompt',
  'fixPrompt',
  'isValidRepoSlug',
  'parseRepoArg',
  'ALLOWED_REMOTE_HOST',
]
// fixPrompt / baseMergePrompt はいずれも sanitize() 経由で item.title を untrusted() タグへ
// 埋め込む。boundaryNonce() 自体は fixPrompt の finding 埋め込みでのみ使うが、モジュール
// スコープの seed 未注入だと boundaryNonce() 呼び出しが失敗するため g0-gates.test.mjs と同じ
// テスト専用 setter を付与する。
const TEST_ONLY_SETTER =
  'export function __setBoundaryNonceSeedForTest(v) { boundaryNonceSeed = v }\n'
writeFileSync(
  slicePath,
  `${definitionPart}\nexport { ${SLICE_EXPORTS.join(', ')} }\n${TEST_ONLY_SETTER}`,
)

const mod = await import(pathToFileURL(slicePath).href)
const {
  parseMaxBaseMerges,
  classifyMergeExecDispatch,
  MERGE_SCHEMA,
  MERGE_VALID_STATES,
  BASE_MERGE_SCHEMA,
  baseMergePrompt,
  baseMergeInstruction,
  monitorPrompt,
  fixPrompt,
  isValidRepoSlug,
  parseRepoArg,
  ALLOWED_REMOTE_HOST,
} = mod
mod.__setBoundaryNonceSeedForTest('b'.repeat(64))

const item = { number: 441, title: 'monitor で CONFLICTING を検出し base 取り込みを自動実行する' }
const impl = { prNumber: 999, branch: 'feat/441-base-merge' }

// ---------------------------------------------------------------------------
// 構造ガード
// ---------------------------------------------------------------------------

test('構造ガード: マーカーは 1 か所のみ存在し、対象関数が副作用なく import できる', () => {
  assert.equal(source.split(DRIVER_MARKER).length - 1, 1)
  assert.equal(typeof parseMaxBaseMerges, 'function')
  assert.equal(typeof classifyMergeExecDispatch, 'function')
  assert.equal(typeof baseMergePrompt, 'function')
  assert.equal(typeof monitorPrompt, 'function')
  assert.equal(typeof MERGE_SCHEMA, 'object')
  assert.equal(typeof BASE_MERGE_SCHEMA, 'object')
  assert.equal(typeof parseRepoArg, 'function')
})

// ---------------------------------------------------------------------------
// parseMaxBaseMerges（マージゲート入力のため寛容フォールバック禁止）
// ---------------------------------------------------------------------------

test('parseMaxBaseMerges: undefined/null は既定値 3', () => {
  assert.equal(parseMaxBaseMerges(undefined), 3)
  assert.equal(parseMaxBaseMerges(null), 3)
})

test('parseMaxBaseMerges: 0〜10 の整数はそのまま受理する（境界値含む）', () => {
  assert.equal(parseMaxBaseMerges(0), 0)
  assert.equal(parseMaxBaseMerges(10), 10)
  assert.equal(parseMaxBaseMerges(5), 5)
})

test('parseMaxBaseMerges: 範囲外・非整数・文字列・真偽値は throw する', () => {
  for (const bad of [-1, 11, 1.5, '3', true, false, NaN, Infinity]) {
    assert.throws(() => parseMaxBaseMerges(bad), /args\.maxBaseMerges/, `${String(bad)} で throw しない`)
  }
})

// ---------------------------------------------------------------------------
// MERGE_SCHEMA / MERGE_VALID_STATES
// ---------------------------------------------------------------------------

test('MERGE_SCHEMA.state.enum に conflicting が含まれ、MERGE_VALID_STATES と同期する', () => {
  assert.ok(MERGE_SCHEMA.properties.state.enum.includes('conflicting'), 'state enum に conflicting がない')
  assert.ok(MERGE_VALID_STATES.has('conflicting'), 'MERGE_VALID_STATES に conflicting がない（enum との二重検証が不同期）')
})

// ---------------------------------------------------------------------------
// classifyMergeExecDispatch: not-mergeable → conflicting（needs-fix ではない）
// ---------------------------------------------------------------------------

test('classifyMergeExecDispatch: not-mergeable は conflicting へ写像し needs-fix へは写像しない', () => {
  const result = classifyMergeExecDispatch('not-mergeable', 'unrecoverable')
  assert.deepEqual(result, { lastState: 'conflicting', lastBlockedReason: 'unrecoverable' })
  assert.notEqual(result.lastState, 'needs-fix')
})

// ---------------------------------------------------------------------------
// BASE_MERGE_SCHEMA
// ---------------------------------------------------------------------------

test('BASE_MERGE_SCHEMA: required は pushed/summary/worktreePath のみ', () => {
  assert.deepEqual(BASE_MERGE_SCHEMA.required, ['pushed', 'summary', 'worktreePath'])
  assert.ok('commitFailed' in BASE_MERGE_SCHEMA.properties, 'commitFailed が定義されていない')
  assert.ok('routingError' in BASE_MERGE_SCHEMA.properties, 'routingError が定義されていない')
  assert.ok(!BASE_MERGE_SCHEMA.required.includes('commitFailed'), 'commitFailed が required に含まれている（省略可のはず）')
  assert.ok(!BASE_MERGE_SCHEMA.required.includes('routingError'), 'routingError が required に含まれている（省略可のはず）')
})

test('BASE_MERGE_SCHEMA.mergeableAfter は MERGEABLE/CONFLICTING/UNKNOWN の enum 完全一致のみ受理する', () => {
  assert.deepEqual(BASE_MERGE_SCHEMA.properties.mergeableAfter.enum, ['MERGEABLE', 'CONFLICTING', 'UNKNOWN'])
})

// ---------------------------------------------------------------------------
// baseMergePrompt: プロンプト契約（fetch < merge < push < mergeable 確認の位置関係、禁止コマンド）
// ---------------------------------------------------------------------------

test('baseMergePrompt: base fetch → merge → push → mergeable 確認の順で現れる', () => {
  const prompt = baseMergePrompt(item, impl)
  // baseBranch 名はテストスライスの parsedArgs 未注入時の既定値（'main'）に依存するため、
  // 固定文字列ではなく行の並び順で検証する（refspec 保存形式の base fetch 行を特定する）。
  const baseFetchIdx = prompt.indexOf(':refs/remotes/origin/')
  const mergeIdx = prompt.indexOf('git merge --no-edit')
  const abortIdx = prompt.indexOf('git merge --abort')
  const pushIdx = prompt.indexOf('git push origin HEAD:refs/heads/')
  const mergeableIdx = prompt.indexOf('--json state,mergeable,headRefOid')
  assert.ok(baseFetchIdx >= 0, 'base fetch（保存先明示 refspec）の指示がない')
  assert.ok(mergeIdx >= 0, 'git merge --no-edit の指示がない')
  assert.ok(abortIdx >= 0, '解消不能時の git merge --abort 指示がない')
  assert.ok(pushIdx >= 0, 'git push origin HEAD:refs/heads/<branch> の指示がない')
  assert.ok(mergeableIdx >= 0, 'push 後の mergeable 再取得指示がない')
  assert.ok(baseFetchIdx < mergeIdx, 'base fetch が merge より前に現れない')
  assert.ok(mergeIdx < pushIdx, 'merge が push より前に現れない')
  assert.ok(pushIdx < mergeableIdx, 'push が mergeable 確認より前に現れない')
})

// PR #443 codex P0（submodule 例外撤去）の回帰テスト: gitlink コンフリクトは双方がポインタを
// 変更した状態であり、base 側採用（git checkout origin/<base> -- <path> → git add → commit）は
// PR 側の gitlink 更新を黙って破棄する。旧実装の submodule 自動解消指示が復活していないことと、
// check-runs 起動確認は維持されていることを固定する。
test('baseMergePrompt: submodule 自動解消指示を含まず（fail-closed）、check-runs 起動確認を含む', () => {
  const prompt = baseMergePrompt(item, impl)
  assert.ok(!prompt.includes('git checkout origin/'), '撤去済みの submodule base 側採用（git checkout origin/<base> -- <path>）指示が復活している')
  assert.ok(!prompt.includes('git add '), '撤去済みの submodule ポインタ git add 指示が復活している')
  assert.ok(prompt.includes('check-runs'), 'push 後の check-run 起動確認指示がない')
  assert.ok(prompt.includes('checksStarted'), 'checksStarted の返却指示がない')
})

test('baseMergePrompt: commitFailed の返却指示を含む', () => {
  const prompt = baseMergePrompt(item, impl)
  assert.ok(prompt.includes('commitFailed: true'), 'commitFailed: true の返却指示がない')
})

// PR #443 codex P1（PR ブランチ取得の起点で fail-closed が無い問題。skills/implement-issue-tree/
// scripts/implement-issue-tree.js:2575）の回帰テスト。旧文言 `git fetch origin && git checkout
// --detach origin/<branch>` は終了コード未確認・失敗時の終端指示が無く、fetch/checkout 失敗時に
// 隔離 worktree の元の HEAD のまま手順 2 の merge・手順 3 の push へ進み得た。fetch・checkout の
// 終了コード確認、checkout 後 HEAD が origin/<branch> と一致することの確認、いずれかの失敗時に
// merge/push を行わず commitFailed: true で即終了する指示になっていることを固定する。
test('baseMergePrompt: PR ブランチ取得（fetch・checkout・HEAD 一致確認）が fail-closed である', () => {
  const prompt = baseMergePrompt(item, impl)
  assert.ok(
    !prompt.includes('git fetch origin && git checkout --detach origin/'),
    '旧来の終了コード未確認 fetch && checkout 一文が残っている',
  )
  const branchFetchIdx = prompt.indexOf(`git fetch origin ${impl.branch}:refs/remotes/origin/${impl.branch}`)
  const checkoutIdx = prompt.indexOf(`git checkout --detach origin/${impl.branch}`)
  const revParseIdx = prompt.indexOf(`git rev-parse origin/${impl.branch}`)
  const mergeIdx = prompt.indexOf('git merge --no-edit')
  assert.ok(branchFetchIdx >= 0, '対象ブランチの保存先明示 refspec fetch の指示がない')
  assert.ok(checkoutIdx >= 0, 'origin/<branch> への detached checkout 指示がない')
  assert.ok(revParseIdx >= 0, 'checkout 後の HEAD 一致確認（git rev-parse origin/<branch>）の指示がない')
  assert.ok(branchFetchIdx < checkoutIdx, 'branch fetch が checkout より前に現れない')
  assert.ok(checkoutIdx < revParseIdx, 'checkout が HEAD 一致確認より前に現れない')
  assert.ok(revParseIdx < mergeIdx, 'HEAD 一致確認が merge より前に現れない')
  assert.ok(prompt.includes('branch fetch 失敗'), 'branch fetch 失敗時の fail-closed summary 文言がない')
  assert.ok(prompt.includes('branch checkout 失敗'), 'checkout 失敗時の fail-closed summary 文言がない')
  assert.ok(
    prompt.includes('checkout 後の HEAD が origin/') && prompt.includes('と不一致'),
    'checkout 後の HEAD 不一致時の fail-closed summary 文言がない',
  )
})

// PR #443 codex P0（thread PRRT_kwDORuXFg86cbn_T）の回帰テスト: baseMergePrompt は COMMON
// （CLAUDE.md・.claude/rules を読んで従うよう指示する）を挿入しない。COMMON は PR ブランチが
// 改変できる未信頼文書を読ませる指示であり、コンフリクト解消コミットを作成して push できる
// 本エージェントへ挿入すると命令注入経路になる。BASE_MERGE_CONTEXT_COMMON という専用の
// 最小固定指示（--no-verify 禁止・push timeout・グローバル状態不変更・自動運転モード等の
// 安全規則を含み、リポジトリ内文書・Issue/PR 本文・レビュー本文は読まない）を使うことを固定する。
test('baseMergePrompt: COMMON のリポジトリ内文書読み取り指示（CLAUDE.md・.claude/rules）を含まず、専用の安全規則を含む', () => {
  const prompt = baseMergePrompt(item, impl)
  assert.ok(!prompt.includes('CLAUDE.md・.claude/rules・テスト実行規約・コーディング規約があれば必ず読んで従う'), 'COMMON の CLAUDE.md/.claude/rules 読み取り指示が混入している')
  assert.ok(!prompt.includes('delegation ルールや専門サブエージェントがあれば、それに従い役割単位で委譲する'), 'COMMON の delegation 委譲指示が混入している')
  assert.ok(prompt.includes('--no-verify 禁止'), '--no-verify 禁止の安全規則がない')
  assert.ok(prompt.includes('timeout に 600000'), 'push timeout の安全規則がない')
  assert.ok(prompt.includes('文書'), 'リポジトリ内文書を読まない旨の明示がない')
})

test('baseMergeInstruction: runVerification=false のコンフリクト解消指示は CLAUDE.md・rules の遵守を指示しない', () => {
  const noVerify = baseMergeInstruction('main', false)
  const withVerify = baseMergeInstruction('main')
  assert.ok(!noVerify.includes('CLAUDE.md・rules を遵守し'), 'runVerification=false でも CLAUDE.md・rules 遵守の指示が残っている')
  assert.ok(withVerify.includes('CLAUDE.md・rules を遵守し'), '既定 true（pr-create・fixPrompt 経路）で既存の CLAUDE.md・rules 遵守指示が失われている')
})

test('baseMergePrompt: gh pr merge の実行コマンド形・resolveReviewThread mutation を含まない（権限境界）', () => {
  const prompt = baseMergePrompt(item, impl)
  // 権限境界の説明文中に「gh pr merge / gh issue close / ... を実行しない」と禁止コマンド名を
  // 列挙するため、文字列そのものの不在ではなく実行可能なコマンド形の不在で判定する
  // （--squash 付きの実マージコマンド・resolveReviewThread の GraphQL mutation 呼び出し行）。
  // 「--no-verify で強行しない」という禁止の明記自体は baseMergeInstruction（fixPrompt / prCreatePrompt
  // と共用）の既存契約でありこの文字列を含むのが正しいため、ここでは検証しない。
  assert.ok(!prompt.includes('--squash --delete-branch --match-head-commit'), 'マージ実行コマンド形が混入している')
  assert.ok(!prompt.includes('mutation($tid:ID!){resolveReviewThread'), 'resolveReviewThread mutation の実行コマンド行が混入している')
})

// PR #443 codex P0（thread PRRT_kwDORuXFg86cbSqr）の回帰テスト: baseMergePrompt は PR head
// checkout 後に fmt / lint / build / test 等、PR 由来の未信頼コード実行を指示しない。PR は
// package scripts・Makefile・テストランナー設定を自由に変更できるため、これらを実行すると
// 悪意ある PR から任意コード実行 → 本エージェントの push 用 GitHub 認証情報の奪取・外部送信に
// つながる。
// PR #443 codex P1（thread PRRT_kwDORuXFg86cck5D）の回帰テスト: 上記 P0 対応（f8701bf）は
// build/lint/test の実行だけを禁じたが、それでも「git diff --check の conflict marker 確認
// だけで通常ファイルの内容コンフリクトを編集し push する」余地が残っていた（構文・意味の破損を
// 検出できないまま無検証で push され得る）。この対応は実行検証を復活させる代わりに、
// runVerification=false ではコンフリクト解消そのものを行う権限自体を持たせない（当初あった
// submodule gitlink ポインタの機械的な合わせ込み例外も、base 側採用が PR 側の gitlink 更新を
// 黙って破棄するため codex P0 指摘で撤去した）。コンフリクトは種別を問わず commitFailed: true
// で停止し、build/lint/test を正当に実行できる fix/implement 経路（runVerification=true）へ
// 委ねる。
// Bugbot High（thread c52cd32b-3157-4fa5-9010-5bc0c92bec7b）の回帰テスト: f8701bf は
// baseMergePrompt 手順 2 の直接記述からは build/lint/test 実行指示を消したが、同じ手順に
// 埋め込まれる共有ヘルパー baseMergeInstruction 内には「ビルド・lint・テストを通してから
// コミットする」という実行命令形が残っていた（呼び出し元の文言だけを直しても、共有ヘルパーが
// 展開後の合成文字列に実行指示を混入させれば RCE 緩和は不完全になる）。ここでは baseMergePrompt
// が返す最終合成文字列（テンプレートリテラルの埋め込み展開後の全文）を対象に、
// build / lint / test / fmt / npm / yarn / make / cargo / pytest / go test 等の実行を命じる
// 言い回しが一切含まれないこと、かつ内容編集を伴う解消の権限自体が無いことを検査する。
// 狙い撃ちした部分文字列ではなく合成後の全文が対象なので、baseMergeInstruction 側に実行指示や
// 内容編集の権限が復活しても本テストは失敗する。
test('baseMergePrompt: fmt / lint / build / test 等の未信頼コード実行指示を含まず、内容編集を伴う解消の権限も持たない（合成後の全文を検査）', () => {
  const prompt = baseMergePrompt(item, impl)
  // 旧実装の実行指示そのもの（「〜を通してからコミットする」という命令形）が消えていることを
  // 固定する。否定文脈での「fmt / lint / build / test」という語の言及自体（実行しない旨の
  // 説明）は許容するため、語の不在ではなく実行を命じる言い回しの不在で判定する。
  assert.ok(!prompt.includes('を通してからコミットする'), '旧実装の実行命令形（〜を通してからコミットする）が残っている')
  assert.ok(!prompt.includes('ビルド・lint・テストを通してから'), 'baseMergeInstruction 側の実行命令形（ビルド・lint・テストを通してから）が残っている')
  for (const word of [
    'npm run', 'npm test', 'npm ci', 'yarn ', 'pnpm ', 'make ',
    'cargo test', 'cargo build', 'pytest', 'go test', 'go build',
    'fmt を実行', 'lint を実行', 'build を実行', 'test を実行',
  ]) {
    assert.ok(!prompt.includes(word), `未信頼コード実行コマンド／実行を命じる言い回し「${word}」が混入している`)
  }
  // PR #443 codex P1 対応の核: 内容コンフリクトは編集せず commitFailed で停止する旨の明示。
  assert.ok(prompt.includes('内容を編集する') || prompt.includes('内容編集の権限'), '内容編集を伴う解消の権限が無い旨の明示がない')
  // PR #443 codex P0 対応の核: submodule 例外の撤去（種別を問わず解消しない fail-closed）。
  assert.ok(prompt.includes('コンフリクト種別を問わず解消しない'), 'コンフリクト種別を問わない fail-closed の明示がない')
  assert.ok(!prompt.includes('submodule ポインタ差分のみ'), '撤去済みの submodule ポインタ自動解消例外が復活している')
})

// baseMergeInstruction の runVerification 引数そのものを直接検査する（合成後の baseMergePrompt
// テストだけでは、呼び出し元が今後増えたときに false 渡し忘れを検出できないため）。
test('baseMergeInstruction: runVerification=false は実行命令形を含まず内容編集の権限も持たない。既定 true は既存どおり実行指示を含む', () => {
  const noVerify = baseMergeInstruction('main', false)
  const withVerify = baseMergeInstruction('main')
  assert.ok(!noVerify.includes('ビルド・lint・テストを通してから'), 'runVerification=false でも実行命令形が残っている')
  assert.ok(noVerify.includes('内容を編集する') || noVerify.includes('内容編集の権限'), 'runVerification=false で内容編集権限が無い旨の明示がない')
  assert.ok(noVerify.includes('commitFailed: true'), 'runVerification=false でコンフリクト時に commitFailed: true を返す明示がない')
  // PR #443 codex P0: submodule gitlink 例外の撤去（base 側採用は PR 側の gitlink 更新を破棄する）。
  assert.ok(noVerify.includes('コンフリクト種別を問わず解消しない'), 'runVerification=false でコンフリクト種別を問わない fail-closed の明示がない')
  assert.ok(!noVerify.includes('git checkout origin/'), 'runVerification=false に撤去済みの submodule base 側採用指示が復活している')
  assert.ok(withVerify.includes('ビルド・lint・テストを通してから'), '既定 true（pr-create・fixPrompt 経路）で既存の実行指示が失われている')
})

test('baseMergePrompt: レビュー指摘の修正を行わない権限境界の文言を含む', () => {
  const prompt = baseMergePrompt(item, impl)
  assert.ok(prompt.includes('レビュー指摘の修正'), 'レビュー指摘の修正を行わない旨の権限境界文言がない')
})

test('baseMergePrompt: 動的な未信頼データ境界トークン（UNTRUSTED_<nonce>）を含まない', () => {
  const prompt = baseMergePrompt(item, impl)
  assert.ok(!/UNTRUSTED_[0-9a-f]+_BEGIN/.test(prompt), 'fixPrompt 由来の動的境界トークンが混入している（monitor summary 等の自由文を埋め込まない設計に反する）')
})

test('baseMergePrompt: worktree routing ガード（remote 確認 + PR 番号・headRefName 照合）を含む', () => {
  const prompt = baseMergePrompt(item, impl)
  assert.ok(prompt.includes('git remote get-url origin'), 'worktree routing ガードの remote 確認がない')
  assert.ok(prompt.includes('gh pr view'), 'PR 番号・headRefName 照合の gh pr view 指示がない')
  assert.ok(prompt.includes('headRefName'), 'headRefName による照合指示がない')
  assert.ok(prompt.includes('routingError: true'), 'routing error 時の返却指示がない')
})

// PR #443 codex P0（thread PRRT_kwDORuXFg86caswK）の回帰テスト: 8dda694 は remote 確認と
// PR 番号・headRefName 照合を追加したが、比較対象となる期待 owner/repo をプロンプトへ渡して
// いなかった（PR 番号・headRefName は別リポジトリでも偶然一致し得るため、それだけでは誤配置
// worktree から別リポジトリの同名ブランチへ push できてしまう）。expectedRepo 引数がホスト
// 検証済みの owner/repo としてプロンプトへ明示的に埋め込まれ、remote 正規化・一致確認が
// gh fetch / checkout / merge より前（手順 0）に行われることを固定する。
test('baseMergePrompt: 期待 owner/repo がプロンプトへ明示的に埋め込まれ、fetch/checkout/merge より前に一致確認する', () => {
  const prompt = baseMergePrompt(item, impl, 'Fandhe-AI/agent-cli-skills')
  // codex P1（thread PRRT_kwDORuXFg86cbaJN）の修正により、埋め込み値は ASCII 小文字化される
  // （owner/repo は case-insensitive に解決されるため、大文字小文字差のみの正当な clone を
  // 誤配置扱いしない）。埋め込まれる文字列は小文字化後の値であることを固定する。
  assert.ok(prompt.includes('"fandhe-ai/agent-cli-skills"'), '期待 owner/repo の値が小文字化されてプロンプトへ埋め込まれていない')
  assert.ok(!prompt.includes('"Fandhe-AI/agent-cli-skills"'), '期待 owner/repo が小文字化されず元の大文字小文字混在のまま埋め込まれている')
  const remoteIdx = prompt.indexOf('git remote get-url origin')
  const expectedRepoIdx = prompt.indexOf('"fandhe-ai/agent-cli-skills"')
  const step1FetchCmd = `git fetch origin ${impl.branch}:refs/remotes/origin/${impl.branch}`
  const fetchIdx = prompt.indexOf(step1FetchCmd)
  // 手順 1（対象ブランチ fetch）自体が保存先明示 refspec の ':refs/remotes/origin/' を含むため、
  // fetchIdx + 1 からの検索では手順 1 自身のマッチ文字列内の ':refs/remotes/origin/' に
  // 再ヒットしてしまい、手順 2（base fetch）を指さない（Bugbot Low・thread
  // PRRT_kwDORuXFg86cd8LB）。手順 1 のマッチ文字列全体の終端（fetchIdx + step1FetchCmd.length）
  // より後を検索することで、手順 2 の base fetch だけを一意に特定する。
  const baseFetchIdx = prompt.indexOf(':refs/remotes/origin/', fetchIdx + step1FetchCmd.length)
  const mergeIdx = prompt.indexOf('git merge --no-edit')
  assert.ok(remoteIdx >= 0, 'git remote get-url origin の指示がない')
  assert.ok(expectedRepoIdx >= 0, '期待 owner/repo の埋め込みが見つからない')
  assert.ok(expectedRepoIdx < fetchIdx, '期待 owner/repo の照合指示が git fetch より前に現れない')
  assert.ok(expectedRepoIdx < baseFetchIdx, '期待 owner/repo の照合指示が base fetch より前に現れない')
  assert.ok(expectedRepoIdx < mergeIdx, '期待 owner/repo の照合指示が merge より前に現れない')
  assert.ok(prompt.includes('.git'), '.git 接尾辞の除去指示がない')
  assert.ok(prompt.includes('ssh://git@'), 'SSH 形式の正規化指示がない')
  assert.ok(prompt.includes('https://<host>/<owner>/<repo>'), 'HTTPS 形式の正規化指示がない')
})

// codex P1（thread PRRT_kwDORuXFg86cbaJN）の回帰テスト: routing ガードは args.repo と remote
// 抽出 slug の比較を大文字小文字区別の完全一致で行っていたため、GitHub 上は同一リポジトリを
// 指す大文字小文字差のみの正当な clone（例: remote が fandhe-ai/agent-cli-skills.git）を誤配置
// 扱いし、base 取り込みを failed・halt カウント対象で終端させていた。両 slug を ASCII 小文字へ
// 正規化してから比較する指示になっていること、かつ異なるリポジトリを拒否する fail-closed 性
// （不一致なら routingError で終了する指示）が引き続き残っていることを固定する。
test('baseMergePrompt: 大文字小文字差のみの入力は小文字正規化して比較する指示になる（fail-closed 性は維持）', () => {
  const promptMixedCase = baseMergePrompt(item, impl, 'Fandhe-AI/Agent-CLI-Skills')
  const promptLowerCase = baseMergePrompt(item, impl, 'fandhe-ai/agent-cli-skills')
  // 大文字小文字違いの入力でも、埋め込まれるリテラルは同一の小文字化済み値になる（比較対象が
  // 揃っていないと、remote 側だけ小文字化しても一致しない）。
  assert.equal(promptMixedCase, promptLowerCase, '大文字小文字違いの owner/repo 入力でプロンプト内容が変化している（小文字化が両者を揃えていない）')
  assert.ok(promptMixedCase.includes('小文字'), 'remote 側を小文字化してから比較する指示がない')
  assert.ok(promptMixedCase.includes('case-insensitive'), '大文字小文字を区別しない理由の説明がない')
  assert.ok(promptMixedCase.includes('routingError: true'), '不一致時に routingError で終端する fail-closed 指示が失われている')
})

// PR #443 codex P0（2026-08-26T13:11:07Z レビュー）の回帰テスト: owner/repo だけを remote から
// 抽出して比較するとホスト名が捨てられ、期待 owner/repo と同じ owner/repo を持つ別ホスト
// （例: git@evil.example:Fandhe-AI/example.git）が誤って一致とみなされ、別ホストへの
// fetch/checkout/merge/push を防げない。host を許可ホスト（ALLOWED_REMOTE_HOST = github.com）
// と完全一致させる指示が owner/repo 比較より前段にあり、host 不一致時の routingError 文言にも
// ホストが含まれることを固定する。
test('baseMergePrompt: remote のホスト名を許可ホストと照合する指示を含み、owner/repo のみの一致では通さない', () => {
  const prompt = baseMergePrompt(item, impl, 'Fandhe-AI/agent-cli-skills')
  assert.equal(ALLOWED_REMOTE_HOST, 'github.com', 'ALLOWED_REMOTE_HOST が想定値から変更されている（このテストの前提が崩れる）')
  assert.ok(prompt.includes(`"${ALLOWED_REMOTE_HOST}"`), '許可ホストがプロンプトへ明示的に埋め込まれていない')
  assert.ok(prompt.includes('host'), 'host を照合する旨の指示が見当たらない')
  assert.ok(prompt.includes('evil.example'), '別ホストでの誤一致を防ぐ具体例（別ホスト名）が指示に含まれていない')
  // host の照合指示が owner/repo の照合指示（期待 owner/repo リテラル）より前に現れることを
  // 固定する（host を検証せず owner/repo だけ先に一致させてしまう順序退行を防ぐ）。
  const hostIdx = prompt.indexOf(`"${ALLOWED_REMOTE_HOST}"`)
  const ownerRepoIdx = prompt.indexOf('"fandhe-ai/agent-cli-skills"')
  assert.ok(hostIdx >= 0 && ownerRepoIdx >= 0, 'host または owner/repo の埋め込みが見つからない')
  assert.ok(hostIdx < ownerRepoIdx, 'host の照合指示が owner/repo の照合指示より後に現れている（host 未検証のまま owner/repo だけ一致確認できてしまう）')
  // git fetch（手順 1）より前に host 照合指示が現れることも固定する。
  const fetchIdx = prompt.indexOf(`git fetch origin ${impl.branch}:refs/remotes/origin/${impl.branch}`)
  assert.ok(fetchIdx > 0, 'git fetch（手順1）の呼び出し文字列が見つからない')
  assert.ok(hostIdx < fetchIdx, 'host の照合指示が git fetch より前に現れていない')
  // 不一致時の routingError 文言に host が含まれる（owner/repo だけの不一致メッセージへ
  // 後退していない）ことを確認する。
  assert.ok(prompt.includes(`${ALLOWED_REMOTE_HOST}/`), 'routingError の不一致メッセージにホストが含まれていない')
})

// 期待 owner/repo が未確定（host 側で isValidRepoSlug を通らなかった／引数省略）の場合、
// 常に不一致として fail-closed する契約を固定する。空文字を「常に不一致」の番人にするため、
// 埋め込み値自体が空文字であることと、その旨の分岐説明がプロンプトに含まれることを確認する。
test('baseMergePrompt: 期待 owner/repo が未確定（省略／不正形式）のとき、常に不一致として fail-closed する指示になる', () => {
  const promptOmitted = baseMergePrompt(item, impl)
  const promptInvalid = baseMergePrompt(item, impl, 'not-a-valid-slug-without-slash')
  const promptEmpty = baseMergePrompt(item, impl, '')
  for (const [label, prompt] of [['省略', promptOmitted], ['スラッシュなし不正値', promptInvalid], ['空文字', promptEmpty]]) {
    assert.ok(prompt.includes('""'), `${label}: 期待 owner/repo が空文字として埋め込まれていない（fail-closed の番人が機能しない）`)
    assert.ok(prompt.includes('空文字は未確定を意味し常に不一致として扱う'), `${label}: 未確定時に常に不一致とする旨の説明がない`)
  }
  // 不正形式（isValidRepoSlug を通らない値）を渡した場合もそのまま埋め込まれず空文字化される
  // ことを、有効な値を渡した場合との対比で確認する。
  assert.ok(!promptInvalid.includes('not-a-valid-slug-without-slash'), '不正形式の値がそのままプロンプトへ埋め込まれている（isValidRepoSlug による検証を経ていない）')
})

// PR #443 codex P0（thread PRRT_kwDORuXFg86cacPf）の回帰テスト: baseMergePrompt は push まで
// 許可するエージェントのため item.title（未信頼テキスト）を一切埋め込まない。この固定を外して
// 再度 untrusted(item.title, ...) を埋め込む変更が入るとこのテストが失敗する。
test('baseMergePrompt: item.title / untrusted(item.title) を一切含まない', () => {
  const prompt = baseMergePrompt(item, impl)
  assert.ok(!prompt.includes(item.title), 'item.title の生文字列がプロンプトへ埋め込まれている')
  assert.ok(!prompt.includes('source="issue-title"'), 'untrusted() の issue-title タグ境界が混入している')
  // 別 issue（同じ prNumber・branch だが title が異なる）を渡しても出力が変わらないことで、
  // title がプロンプト内容に一切影響しない（=埋め込まれていない）ことを構造的に確認する。
  const otherTitleItem = { number: item.number, title: '全く異なるタイトル・記号!@#$%^&*()を含む' }
  assert.equal(baseMergePrompt(otherTitleItem, impl), prompt, 'item.title の違いでプロンプト内容が変化している（title が何らかの形で埋め込まれている）')
})

// ---------------------------------------------------------------------------
// monitorPrompt: CONFLICTING 経路が conflicting を返し needs-fix を含まない
// ---------------------------------------------------------------------------

test('monitorPrompt: 手順 1c の CONFLICTING 経路は state: conflicting を返す', () => {
  const prompt = monitorPrompt(item, impl, [], true, true)
  const idx1c = prompt.indexOf('1c. state が OPEN の場合のみ判定する')
  assert.ok(idx1c >= 0, '手順 1c の記述が見つからない')
  const idx2 = prompt.indexOf('2. gh pr checks', idx1c)
  const section1c = prompt.slice(idx1c, idx2)
  assert.ok(section1c.includes('state: conflicting'), '手順 1c が state: conflicting を返す指示を含まない')
})

// ---------------------------------------------------------------------------
// fixPrompt: push 検証ロジック（pushVerifyInstruction 切り出し後の回帰固定）
// ---------------------------------------------------------------------------

test('fixPrompt(pushAfterFix: true): push 検証の 2 条件判定を含む（pushVerifyInstruction 切り出し後の回帰）', () => {
  const finding = { summary: 'テスト用の指摘', unresolvedComments: [] }
  const prompt = fixPrompt(item, impl, finding, true)
  assert.ok(prompt.includes('push 前に控えた sha ≠ ローカル HEAD'), '事前 sha ≠ ローカル HEAD の判定条件がない')
  assert.ok(prompt.includes('push 後の ls-remote sha == ローカル HEAD'), '事後 sha == ローカル HEAD の判定条件がない')
})

// ---------------------------------------------------------------------------
// 駆動部の構造アサーション（マーカー以降のソース走査。commitlint-enum-condition.test.mjs と同型）
// ---------------------------------------------------------------------------

test('駆動部: lastState === \'conflicting\' 分岐が存在し baseMergePrompt / baseMergeCount / maxBaseMerges / failMergeTerminal を含む', () => {
  // 単純な "lastState === 'conflicting'" 部分一致だと、より手前にある
  // "lastState === 'needs-fix' || lastState === 'conflicting'"（needs-fix と conflicting を
  // 一括 dispatch する別の分岐。line 4111 相当）の部分文字列にもマッチし、branchIdx が誤って
  // その手前の行を指してしまう（この誤指定のまま次の needs-fix 境界まで切り出すと、conflicting
  // 単独分岐だけでなく needs-fix 単独分岐（noPushRounds >= 2 の blocked 判定を含む）まで
  // branchBody に混入し、後続の分岐専有アサーションが意図せず緩くなる）。
  // 本テストが対象とする単独 `} else if (lastState === 'conflicting') {` 宣言のみに一致する
  // よう `} else if (` を含めて検索する。
  const branchIdx = driverPart.indexOf("} else if (lastState === 'conflicting') {")
  assert.ok(branchIdx >= 0, "駆動部に単独の `} else if (lastState === 'conflicting') {` 分岐が見つからない")
  // 次の else if までを分岐本体として切り出す（needs-fix 分岐との境界）。
  const nextBranchIdx = driverPart.indexOf("lastState === 'needs-fix' || lastState === 'unresolved-comments'", branchIdx)
  assert.ok(nextBranchIdx > branchIdx, 'needs-fix 分岐の開始位置を特定できない（conflicting 分岐の終端が不明）')
  const branchBody = driverPart.slice(branchIdx, nextBranchIdx)
  assert.ok(branchBody.includes('baseMergePrompt('), 'conflicting 分岐が baseMergePrompt を呼んでいない')
  assert.ok(branchBody.includes('baseMergeCount++'), 'conflicting 分岐が baseMergeCount を加算していない')
  assert.ok(branchBody.includes('maxBaseMerges'), 'conflicting 分岐が maxBaseMerges 上限を参照していない')
  assert.ok(branchBody.includes('failMergeTerminal('), 'conflicting 分岐が failMergeTerminal を呼んでいない')
  assert.ok(!branchBody.includes('fixCount++'), 'conflicting 分岐が fixCount を消費している（fix 予算と独立のはず）')
  // PR #443 codex 指摘の是正: base-merge push 成功時も CONFLICTING→fix 経路（needs-fix 分岐）と
  // 同じ advanceNoPushRounds を経由して noPushRounds をリセットする必要がある。リセットしないと
  // 直前の no-push fix ラウンドで積んだカウントが base merge の push 成功後も残留し、後続の
  // no-push fix 1 回だけで noPushRounds >= 2 に達して誤って blocked 終端し得る
  // （リモートへは実際に進捗があったのに）。noPushRounds への「参照」自体は正当な進捗リセットで
  // あり禁止しないが、fix ループ専用の分岐終了条件（`noPushRounds >= 2` によるブロック判定）は
  // 引き続き conflicting 分岐に持ち込まない。
  assert.ok(branchBody.includes('advanceNoPushRounds('), 'conflicting 分岐が advanceNoPushRounds を呼んでいない（push 成功時の noPushRounds リセットが未実装）')
  assert.ok(!branchBody.includes('noPushRounds >= 2'), 'conflicting 分岐が fix ループ専用の blocked 終端条件（noPushRounds >= 2）を持ち込んでいる')
})

// ---------------------------------------------------------------------------
// 駆動部: baseMergeCount >= maxBaseMerges 上限到達時の終端分類（Issue #441 codex-review P1・PR #443
// の回帰）。'unrecoverable' を使うと terminalStatus 決定部
// （`blockedIsRecoverable = lastState === 'blocked' && lastBlockedReason === 'quality'`）が
// 'failed'（halt カウント対象）へ倒し、SKILL.md・args-example.json の「コンフリクトは即 blocked
// にする」という公開契約と不一致になり、maxBaseMerges: 0 の明示オプトアウトだけで連続失敗 halt を
// 誘発していた。上限到達専用の if ブロックのみを切り出し、'quality' を設定し 'unrecoverable' を
// 一切含まないことを固定する（同分岐内の他コメントに 'unrecoverable' という語自体が残っていても
// 誤検出しないよう、実際に代入している行を対象にする）。
// ---------------------------------------------------------------------------

test('駆動部: baseMergeCount >= maxBaseMerges 到達時は lastBlockedReason を quality に設定する（unrecoverable を代入しない）', () => {
  const capIdx = driverPart.indexOf('if (baseMergeCount >= maxBaseMerges) {')
  assert.ok(capIdx >= 0, 'baseMergeCount >= maxBaseMerges の上限到達ブロックが見つからない')
  const capEndIdx = driverPart.indexOf('\n      }', capIdx)
  assert.ok(capEndIdx > capIdx, '上限到達ブロックの終端（break を含む閉じ括弧）が見つからない')
  const capBody = driverPart.slice(capIdx, capEndIdx)
  assert.ok(capBody.includes("lastBlockedReason = 'quality'"), '上限到達ブロックが lastBlockedReason を quality に設定していない')
  assert.ok(!capBody.includes("lastBlockedReason = 'unrecoverable'"), '上限到達ブロックが lastBlockedReason に unrecoverable を代入している（blocked ではなく failed 終端へ倒れる）')
  assert.ok(capBody.includes("lastState = 'blocked'"), '上限到達ブロックが lastState を blocked に設定していない')
  assert.ok(capBody.includes('break'), '上限到達ブロックが break していない')
  // maxBaseMerges: 0 の明示オプトアウトは cap-reached と同じ if 条件（0 >= 0）を通るため、
  // 「上限到達」ではなく「無効化されている」という別文言を出し分ける契約を固定する
  // （0 回到達というメッセージは opt-out の実態と合わないため）。
  assert.ok(capBody.includes('maxBaseMerges === 0'), '上限到達ブロックが maxBaseMerges === 0 の分岐を持たない（opt-out 専用メッセージがない）')
})

test('駆動部: baseMergeCount の状態ファイル復元と runMergeLoop への引き渡しが存在する', () => {
  assert.ok(driverPart.includes('savedBaseMergeCount'), '駆動部に savedBaseMergeCount の復元が見つからない')
  assert.ok(driverPart.includes('initialBaseMergeCount'), 'runMergeLoop の initialBaseMergeCount 引数が見つからない')
})

test('駆動部: merge-loop-rescan の境界マーカー対の出現回数が変わらない（1 回のまま）', () => {
  const startCount = driverPart.split('__MERGE_MONITOR_LOOP_START__').length - 1
  assert.equal(startCount, 1, '__MERGE_MONITOR_LOOP_START__ マーカーの出現回数が 1 でない（conflicting 分岐追加でループ境界が壊れていないか確認）')
})

// ---------------------------------------------------------------------------
// isValidRepoSlug（Bugbot Medium・PR #443・thread PRRT_kwDORuXFg86ca6Y_ の回帰）: repo セグメント
// が先頭 `.` を許可し（`org/.github` のような実在の正当な名前）、`.`/`..` という特殊パス名のみ
// 除外すること。owner セグメントは英数字とハイフンのみ・先頭末尾ハイフン不可・39 文字以内。
// ---------------------------------------------------------------------------

test('isValidRepoSlug: 先頭 `.` の repo 名（`.github` 等）を受理する', () => {
  assert.equal(isValidRepoSlug('org/.github'), true)
  assert.equal(isValidRepoSlug('Fandhe-AI/.github'), true)
})

test('isValidRepoSlug: `.`/`..` という repo セグメント単体は拒否する（パストラバーサル特殊名）', () => {
  assert.equal(isValidRepoSlug('org/.'), false)
  assert.equal(isValidRepoSlug('org/..'), false)
})

test('isValidRepoSlug: owner セグメントは英数字とハイフンのみ・先頭末尾ハイフン不可', () => {
  assert.equal(isValidRepoSlug('-org/repo'), false)
  assert.equal(isValidRepoSlug('org-/repo'), false)
  assert.equal(isValidRepoSlug('org.name/repo'), false)
  assert.equal(isValidRepoSlug('a'.repeat(40) + '/repo'), false, 'owner 39 文字超は拒否')
  assert.equal(isValidRepoSlug('a'.repeat(39) + '/repo'), true, 'owner 39 文字ちょうどは受理')
})

test('isValidRepoSlug: repo セグメントは `.`/`_`/`-`（先頭ハイフン以外）を許可し 100 文字以内', () => {
  assert.equal(isValidRepoSlug('org/_private'), true)
  assert.equal(isValidRepoSlug('org/repo-name'), true)
  assert.equal(isValidRepoSlug('org/-repo'), false, 'repo 先頭ハイフンは拒否')
  assert.equal(isValidRepoSlug('org/' + 'a'.repeat(100)), true, 'repo 100 文字ちょうどは受理')
  assert.equal(isValidRepoSlug('org/' + 'a'.repeat(101)), false, 'repo 101 文字は拒否')
})

test('isValidRepoSlug: 従来どおりスラッシュなし・空文字・型不一致は拒否する', () => {
  assert.equal(isValidRepoSlug('not-a-valid-slug-without-slash'), false)
  assert.equal(isValidRepoSlug(''), false)
  assert.equal(isValidRepoSlug(undefined), false)
  assert.equal(isValidRepoSlug(null), false)
})

// PR #443 codex P1（thread PRRT_kwDORuXFg86cbn_b）の回帰テスト: 有効な owner/repo prefix に
// 不正な suffix を付けた値（末尾アンカー欠落時に通過し得る形）を拒否すること。REPO_SLUG_RE は
// 文字列全体一致（`^...$`）で構成済みだが、この不変条件を固定して退行を防ぐ。
test('isValidRepoSlug: 有効な owner/repo prefix に不正な suffix を付けた値は拒否する（末尾アンカー回帰）', () => {
  assert.equal(isValidRepoSlug('owner/repo!!!'), false)
  assert.equal(isValidRepoSlug('owner/repo x'), false)
  assert.equal(isValidRepoSlug('owner/repo\n'), false)
  assert.equal(isValidRepoSlug('owner/repo\nmalicious'), false)
  assert.equal(isValidRepoSlug('owner/repo'), true, '正常値まで拒否していないことの対照')
})

// ---------------------------------------------------------------------------
// parseRepoArg（PR #443 codex P0 回帰）: expectedRepo の唯一の信頼できる入力源。
// エージェント自己申告値ではなく args.repo（ホスト側明示宣言）のみを受理する。
// ---------------------------------------------------------------------------

test('parseRepoArg: undefined/null は未確定（空文字）を返す', () => {
  assert.equal(parseRepoArg(undefined), '')
  assert.equal(parseRepoArg(null), '')
})

test('parseRepoArg: owner/repo 形式はそのまま受理する', () => {
  assert.equal(parseRepoArg('Fandhe-AI/agent-cli-skills'), 'Fandhe-AI/agent-cli-skills')
  assert.equal(parseRepoArg('org/.github'), 'org/.github')
})

test('parseRepoArg: isValidRepoSlug を通らない形式は throw する（誤読み替え防止・fail-closed）', () => {
  assert.throws(() => parseRepoArg('not-a-valid-slug-without-slash'), /args\.repo/)
  assert.throws(() => parseRepoArg(''), /args\.repo/)
  assert.throws(() => parseRepoArg(123), /args\.repo/)
  assert.throws(() => parseRepoArg({ owner: 'org', repo: 'repo' }), /args\.repo/)
})

// ---------------------------------------------------------------------------
// expectedRepo の代入元（PR #443 codex P0 回帰）: エージェント自己申告値（detectResult 等）
// から代入されず、ホスト検証済みの repoArg（= args.repo 由来）からのみ代入されること。
// ---------------------------------------------------------------------------

test('expectedRepo は repoArg（args.repo 由来のホスト検証済み値）からのみ代入され、detectResult からは代入されない', () => {
  const assignIdx = source.indexOf('const expectedRepo = ')
  assert.ok(assignIdx >= 0, 'expectedRepo の代入行が見つからない')
  const lineEnd = source.indexOf('\n', assignIdx)
  const assignLine = source.slice(assignIdx, lineEnd)
  assert.equal(assignLine, 'const expectedRepo = repoArg', `expectedRepo の代入がエージェント申告値経由になっている: ${assignLine}`)
  assert.ok(!assignLine.includes('detectResult'), 'expectedRepo がエージェント自己申告値 detectResult から代入されている')
})

// ---------------------------------------------------------------------------
// 駆動部: expectedRepo 未確定時は baseMergePrompt を起動せず blocked + quality へ直接終端する
// （Bugbot High・PR #443・thread PRRT_kwDORuXFg86ca6Y1 の回帰）。cap 到達到達分岐と同じ
// 「回復可能な CONFLICTING」クラスとして扱い、routingError 経由の 'unrecoverable'（'failed' へ
// 倒れ halt カウント対象になる）を一切通らないことを固定する。
// ---------------------------------------------------------------------------

test("駆動部: conflicting 分岐は expectedRepo === '' を baseMergePrompt 起動より前に判定し、blocked + quality へ直接終端する", () => {
  const branchIdx = driverPart.indexOf("} else if (lastState === 'conflicting') {")
  assert.ok(branchIdx >= 0, "conflicting 分岐が見つからない")
  const guardIdx = driverPart.indexOf("if (expectedRepo === '') {", branchIdx)
  assert.ok(guardIdx > branchIdx, 'conflicting 分岐に expectedRepo 未確定ガードが見つからない')
  const capIdx = driverPart.indexOf('if (baseMergeCount >= maxBaseMerges) {', branchIdx)
  assert.ok(capIdx > guardIdx, 'expectedRepo 未確定ガードが cap 到達判定より後に現れている（baseMergePrompt 起動より前に判定する必要がある）')
  const guardEndIdx = driverPart.indexOf('\n      }', guardIdx)
  assert.ok(guardEndIdx > guardIdx, 'expectedRepo 未確定ガードの終端（break を含む閉じ括弧）が見つからない')
  const guardBody = driverPart.slice(guardIdx, guardEndIdx)
  assert.ok(guardBody.includes("lastBlockedReason = 'quality'"), 'expectedRepo 未確定ガードが lastBlockedReason を quality に設定していない')
  assert.ok(guardBody.includes("lastState = 'blocked'"), 'expectedRepo 未確定ガードが lastState を blocked に設定していない')
  assert.ok(guardBody.includes('break'), 'expectedRepo 未確定ガードが break していない')
  assert.ok(!guardBody.includes('baseMergePrompt('), 'expectedRepo 未確定ガードが baseMergePrompt を起動している（未起動でホスト側直接終端するはず）')
  assert.ok(!guardBody.includes("lastBlockedReason = 'unrecoverable'"), 'expectedRepo 未確定ガードが unrecoverable を代入している（failed/halt カウント対象へ倒れる）')
})

// ---------------------------------------------------------------------------
// PR #443 codex P1（thread: baseMergePrompt のコンフリクト検出が commitFailed → failed 終端に
// 直結し、SKILL.md / automerge-design.md の「コンフリクトは検証権限を持つ fix/implement 経路へ
// 委譲」という遷移が実装されていない問題）の回帰。分岐 (b) のコンフリクトは conflict: true を
// 伴う commitFailed として返り、ホストは failMergeTerminal せず lastState = 'needs-fix' へ
// 委譲する（fixPrompt の push 前 base 最新化ゲートが解消・検証・push を担う）。conflict を
// 伴わない commitFailed（fetch / checkout 失敗・hook 拒否等）は従来どおり失敗終端する。
// ---------------------------------------------------------------------------

test('BASE_MERGE_SCHEMA: conflict は省略可の boolean として定義される', () => {
  assert.ok('conflict' in BASE_MERGE_SCHEMA.properties, 'conflict が定義されていない')
  assert.equal(BASE_MERGE_SCHEMA.properties.conflict.type, 'boolean')
  assert.ok(!BASE_MERGE_SCHEMA.required.includes('conflict'), 'conflict が required に含まれている（省略可のはず）')
})

test('baseMergeInstruction: runVerification=false のみコンフリクト時に conflict: true を返す指示を含む', () => {
  const noVerify = baseMergeInstruction('main', false)
  const withVerify = baseMergeInstruction('main')
  assert.ok(noVerify.includes('conflict: true'), 'runVerification=false でコンフリクト時に conflict: true を返す明示がない')
  // conflict は分岐 (b) 専用: 他の commitFailed 経路（fetch / checkout 失敗・hook 拒否等）では
  // 付けない旨の限定が無いと、ホストが回復不能クラスまで fix 経路へ回してしまう。
  assert.ok(noVerify.includes('他の commitFailed 経路では conflict を付けない'), 'conflict を分岐 (b) 限定にする指示がない')
  // 検証権限を持つ既定 true（pr-create / fixPrompt 経路）はその場で解消するため conflict を返さない。
  assert.ok(!withVerify.includes('conflict: true'), '既定 true（検証権限あり経路）に conflict: true の返却指示が混入している')
})

test('baseMergePrompt: 手順 2 と返却行に conflict: true の返却指示を含む（合成後の全文）', () => {
  const prompt = baseMergePrompt(item, impl)
  assert.ok(prompt.includes('conflict: true'), 'conflict: true の返却指示がない')
  assert.ok(prompt.includes('/ conflict（'), '返却行に conflict フィールドの説明がない')
})

test('駆動部: commitFailed + conflict / hookRejected は failMergeTerminal せず needs-fix（fix 経路）へ委譲する', () => {
  const branchIdx = driverPart.indexOf("} else if (lastState === 'conflicting') {")
  assert.ok(branchIdx >= 0, 'conflicting 分岐が見つからない')
  const nextBranchIdx = driverPart.indexOf("lastState === 'needs-fix' || lastState === 'unresolved-comments'", branchIdx)
  assert.ok(nextBranchIdx > branchIdx, 'needs-fix 分岐の開始位置を特定できない')
  const branchBody = driverPart.slice(branchIdx, nextBranchIdx)
  // conflict 判定は conflict なし commitFailed の失敗終端より前に評価される（後ろだと到達不能）。
  const conflictIdx = branchBody.indexOf('b.commitFailed === true && (b.conflict === true || b.hookRejected === true)')
  assert.ok(conflictIdx >= 0, 'conflict / hookRejected 委譲の判定（b.commitFailed === true && (b.conflict === true || b.hookRejected === true)）が見つからない')
  const plainFailIdx = branchBody.indexOf('} else if (b.commitFailed === true) {')
  assert.ok(plainFailIdx > conflictIdx, 'conflict なし commitFailed の失敗終端分岐が conflict 委譲判定の後に無い')
  // conflict 委譲ブロック本体: needs-fix 設定・finding 合成を行い、failMergeTerminal・
  // baseMergeCount 消費・noPushRounds 前進を行わない。
  const delegBody = branchBody.slice(conflictIdx, plainFailIdx)
  assert.ok(delegBody.includes("lastState = 'needs-fix'"), 'conflict 委譲が lastState を needs-fix に設定していない')
  assert.ok(delegBody.includes('finding = {'), 'conflict 委譲が fix 用の finding を合成していない')
  assert.ok(!delegBody.includes('failMergeTerminal('), 'conflict 委譲が failMergeTerminal を呼んでいる（failed 終端せず fix 経路へ委譲するはず）')
  assert.ok(!delegBody.includes('baseMergeCount++'), 'conflict 委譲が baseMergeCount を消費している（コミット未作成のため消費しないはず）')
  assert.ok(!delegBody.includes('advanceNoPushRounds('), 'conflict 委譲が noPushRounds を進めている（fix 側の既存処理に委ねるはず）')
  // conflict なし commitFailed は従来どおり失敗終端する。
  const plainFailBody = branchBody.slice(plainFailIdx, branchBody.indexOf('} else {', plainFailIdx))
  assert.ok(plainFailBody.includes('return await failMergeTerminal('), 'conflict なし commitFailed が failMergeTerminal で失敗終端していない')
})

test('駆動部: needs-fix 分岐は conflicting チェーンへ else if で連結せず、同一周回で fix を起動できる（2 段チェーン構造）', () => {
  // else if のままだと conflict 委譲が設定した lastState = 'needs-fix' は同一周回で評価されず、
  // 次ラウンドの monitor が CONFLICTING を再観測して 'conflicting' へ戻すため fix が永久に
  // 起動しない（monitor → baseMerge → conflict のループ）。
  assert.ok(
    !driverPart.includes("} else if (lastState === 'needs-fix' || lastState === 'unresolved-comments')"),
    "needs-fix 分岐が conflicting チェーンへ else if で連結されている（conflict 委譲が同一周回で fix へ到達できない）",
  )
  const branchIdx = driverPart.indexOf("} else if (lastState === 'conflicting') {")
  const reDispatchIdx = driverPart.indexOf("if (lastState === 'needs-fix' || lastState === 'unresolved-comments') {")
  assert.ok(reDispatchIdx > branchIdx, 'conflicting 分岐の後に独立の needs-fix 再ディスパッチ if が見つからない')
})

// ---------------------------------------------------------------------------
// PR #443 codex P0（host 固定 subject への転換）の回帰テスト:
// 読み取り専用 subject 算出エージェント方式はプロンプト指示のみでランタイム強制できないため
// 撤去した。push 権限を持つ baseMergePrompt は commitlint 設定・コミット履歴という未信頼
// テキストを一切読まず、subject は host のリテラル固定値 HOST_SUBJECT のみを使う。commitlint
// がこの固定値を拒否するリポでは分岐 (c) が hookRejected: true で返り、ホストは failed 終端
// せず fix 経路（runVerification=true の base 最新化ゲート）へ委譲する。
// ---------------------------------------------------------------------------

const HOST_SUBJECT = 'chore: base ブランチの変更を取り込む'

test('baseMergePrompt: commitlint 設定・コミット履歴の読取指示を一切含まない（未信頼読取ゼロ化・合成後の全文）', () => {
  for (const [label, prompt] of [
    ['hostSubject あり', baseMergePrompt(item, impl, 'Fandhe-AI/agent-cli-skills', HOST_SUBJECT)],
    ['hostSubject なし（防御的フォールバック）', baseMergePrompt(item, impl)],
  ]) {
    assert.ok(!prompt.includes('commitlint.config'), `${label}: commitlint 設定ファイルの読取指示が含まれている`)
    assert.ok(!prompt.includes('.commitlintrc'), `${label}: .commitlintrc の読取指示が含まれている`)
    assert.ok(!prompt.includes('を読み、マージコミットの subject'), `${label}: subject 決定のための設定読取指示が含まれている`)
    assert.ok(!prompt.includes('type-enum'), `${label}: type-enum 解釈手順（commitlint 読取前提）が含まれている`)
    assert.ok(!prompt.includes('直前の implement / fix コミットの scope'), `${label}: コミット履歴（scope 再利用）の読取指示が含まれている`)
  }
})

test('baseMergePrompt: ホスト固定 subject をそのまま使う指示になり、-F 一時ファイル渡しは維持される', () => {
  const prompt = baseMergePrompt(item, impl, 'Fandhe-AI/agent-cli-skills', HOST_SUBJECT)
  assert.ok(prompt.includes(HOST_SUBJECT), 'ホスト固定 subject がプロンプトへ埋め込まれていない')
  assert.ok(prompt.includes('ホスト固定文字列'), 'subject が host 固定値である旨の明示がない')
  assert.ok(prompt.includes('git merge --no-edit -F'), '-F 一時ファイル渡しの指示が失われている')
})

test('baseMergePrompt: hostSubject 未指定・テンプレート不一致は subject 未確定の fail-closed へ倒す', () => {
  for (const [label, prompt] of [
    ['未指定', baseMergePrompt(item, impl, 'Fandhe-AI/agent-cli-skills')],
    ['任意文字列', baseMergePrompt(item, impl, 'Fandhe-AI/agent-cli-skills', 'evil $(rm -rf /) subject')],
    ['type 不正（空白入り）', baseMergePrompt(item, impl, 'Fandhe-AI/agent-cli-skills', 'bad type: base ブランチの変更を取り込む')],
  ]) {
    assert.ok(prompt.includes('base merge subject 未確定'), `${label}: subject 未確定の fail-closed 文言がない`)
  }
  const evil = baseMergePrompt(item, impl, 'Fandhe-AI/agent-cli-skills', 'evil $(rm -rf /) subject')
  assert.ok(!evil.includes('evil $(rm -rf /) subject'), 'テンプレート不一致の hostSubject がそのまま埋め込まれている（防御的再検証が働いていない）')
})

test('baseMergeInstruction: hostSubject あり（false 経路）は subject 決定手順を含まず、3 分岐の終了コード処理は維持する', () => {
  const withHost = baseMergeInstruction('main', false, HOST_SUBJECT)
  assert.ok(withHost.includes(HOST_SUBJECT), 'hostSubject が埋め込まれていない')
  assert.ok(!withHost.includes('commitlint.config'), 'hostSubject ありでも commitlint 設定の読取指示が残っている')
  assert.ok(!withHost.includes('type-enum'), 'hostSubject ありでも type-enum 解釈手順が残っている')
  assert.ok(withHost.includes('終了コードで 3 分岐する'), '3 分岐の終了コード処理が失われている')
  assert.ok(withHost.includes('git merge --abort'), 'merge --abort の指示が失われている')
  assert.ok(withHost.includes('conflict: true'), 'コンフリクト時の conflict: true 返却が失われている')
})

test('baseMergeInstruction: false 経路の分岐 (c) は hookRejected: true を返し、true 経路（検証権限あり）は hookRejected を含まない', () => {
  const withHost = baseMergeInstruction('main', false, HOST_SUBJECT)
  assert.ok(withHost.includes('hookRejected: true'), 'false 経路の (c) に hookRejected: true の返却指示がない')
  assert.ok(withHost.includes('分岐 (c) の hook 拒否時のみ付ける'), 'hookRejected を分岐 (c) 限定にする指示がない')
  assert.ok(withHost.includes('fix 経路へ委譲する'), 'hookRejected が fix 委譲シグナルである旨の明示がない')
  const withVerify = baseMergeInstruction('main')
  assert.ok(!withVerify.includes('hookRejected'), '検証権限あり経路（runVerification=true）に hookRejected の返却指示が混入している')
})

test('BASE_MERGE_SCHEMA: hookRejected は省略可の boolean として定義される', () => {
  assert.ok('hookRejected' in BASE_MERGE_SCHEMA.properties, 'hookRejected が定義されていない')
  assert.equal(BASE_MERGE_SCHEMA.properties.hookRejected.type, 'boolean')
  assert.ok(!BASE_MERGE_SCHEMA.required.includes('hookRejected'), 'hookRejected が required に含まれている（省略可のはず）')
  assert.ok(BASE_MERGE_SCHEMA.properties.hookRejected.description.includes('分岐 (c)'), 'hookRejected の description が分岐 (c) 限定を明示していない')
})

test('baseMergePrompt: 返却行に hookRejected の説明を含む（合成後の全文）', () => {
  const prompt = baseMergePrompt(item, impl, 'Fandhe-AI/agent-cli-skills', HOST_SUBJECT)
  assert.ok(prompt.includes('/ hookRejected（'), '返却行に hookRejected フィールドの説明がない')
})

test('実装スクリプト: subject 算出エージェント（baseMergeSubjectPrompt / BASE_MERGE_SUBJECT_*）が完全に撤去されている', () => {
  // プロンプト指示のみの読み取り専用契約はランタイム強制されない（Workflow の agent() に権限
  // 制約オプションが無い）ため、未信頼読取を担うエージェント自体が存在してはならない。
  assert.ok(!source.includes('baseMergeSubjectPrompt'), 'baseMergeSubjectPrompt が実装スクリプトに残存している')
  assert.ok(!source.includes('BASE_MERGE_SUBJECT'), 'BASE_MERGE_SUBJECT_* が実装スクリプトに残存している')
})

test('駆動部: conflicting 分岐は subject をエージェント起動なしの host リテラル固定値で確定し、baseMergePrompt へ渡す', () => {
  const branchIdx = driverPart.indexOf("} else if (lastState === 'conflicting') {")
  assert.ok(branchIdx >= 0, 'conflicting 分岐が見つからない')
  const nextBranchIdx = driverPart.indexOf("lastState === 'needs-fix' || lastState === 'unresolved-comments'", branchIdx)
  const branchBody = driverPart.slice(branchIdx, nextBranchIdx)
  const constIdx = branchBody.indexOf("const hostSubject = 'chore: base ブランチの変更を取り込む'")
  assert.ok(constIdx >= 0, 'host リテラル固定 subject の定義が見つからない')
  const bmpIdx = branchBody.indexOf('baseMergePrompt(item, impl, expectedRepo, hostSubject)')
  assert.ok(bmpIdx > constIdx, '固定 subject が baseMergePrompt 起動より前に確定していない')
  // 固定値確定後の最初のエージェント起動が baseMergePrompt であり、間に別エージェント起動が
  // 無い（subject がどのエージェント出力にも依存しない完全な定数であることの構造確認）。
  const firstAgentIdx = branchBody.indexOf('await agent(', constIdx)
  assert.ok(firstAgentIdx >= 0, '固定 subject 確定後のエージェント起動が見つからない')
  assert.ok(branchBody.startsWith('await agent(baseMergePrompt(', firstAgentIdx), '固定 subject の確定と baseMergePrompt 起動の間に別エージェント起動が挟まっている')
})

test('駆動部: hookRejected 委譲の finding は hook 拒否の理由を明示し、conflict とログ文言を区別する', () => {
  const branchIdx = driverPart.indexOf("} else if (lastState === 'conflicting') {")
  const nextBranchIdx = driverPart.indexOf("lastState === 'needs-fix' || lastState === 'unresolved-comments'", branchIdx)
  const branchBody = driverPart.slice(branchIdx, nextBranchIdx)
  assert.ok(branchBody.includes('const isConflict = b.conflict === true'), '委譲理由の判別（isConflict）が見つからない')
  assert.ok(branchBody.includes('commit-msg hook に拒否された'), 'hook 拒否用の finding 文言が見つからない')
  assert.ok(branchBody.includes('内容コンフリクトを検出した'), 'conflict 用の finding 文言が見つからない')
  assert.ok(branchBody.includes("'subject の commit-msg hook 拒否'"), 'ログ文言が conflict と hook 拒否を区別していない')
})
