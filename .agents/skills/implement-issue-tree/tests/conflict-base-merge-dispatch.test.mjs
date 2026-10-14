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
import { trackTmp } from './lib/tmp-track.mjs'
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
const sliceDir = trackTmp(mkdtempSync(join(tmpdir(), 'implement-issue-tree-base-merge-')))
const slicePath = join(sliceDir, 'implement-issue-tree-defs.mjs')
const SLICE_EXPORTS = [
  'parseMaxBaseMerges',
  'classifyMergeExecDispatch',
  'MERGE_SCHEMA',
  'MERGE_VALID_STATES',
  'BASE_MERGE_SCHEMA',
  'baseMergePrompt',
  'basePrepareInstruction',
  'monitorPrompt',
  'fixPrompt',
  'isValidRepoSlug',
  'parseRepoArg',
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

// スクリプトの起動コマンド（scriptInvocation）は args.skillDir を要る。実ランでは起動手順が渡す
globalThis.args = { skillDir: '/opt/skills/implement-issue-tree' }
const mod = await import(pathToFileURL(slicePath).href)
const {
  parseMaxBaseMerges,
  classifyMergeExecDispatch,
  MERGE_SCHEMA,
  MERGE_VALID_STATES,
  BASE_MERGE_SCHEMA,
  baseMergePrompt,
  basePrepareInstruction,
  monitorPrompt,
  fixPrompt,
  isValidRepoSlug,
  parseRepoArg,
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

test('BASE_MERGE_SCHEMA: ログ専用だった mergeableAfter / checksStarted / headSha を持たない（Issue #603 第 3 弾で撤去。push 後の観測は次ラウンドの monitor が行う）', () => {
  for (const k of ['mergeableAfter', 'checksStarted', 'headSha']) {
    assert.ok(!(k in BASE_MERGE_SCHEMA.properties), `${k} が BASE_MERGE_SCHEMA に残っている`)
  }
  assert.deepEqual(
    Object.keys(BASE_MERGE_SCHEMA.properties).sort(),
    ['commitFailed', 'conflict', 'hookRejected', 'pushed', 'routingError', 'summary', 'worktreePath'],
    'スキーマのキーは base-merge.sh の結果の JSON のキーと一致する（tests/base-merge.test.mjs が実出力のキーを検査する）',
  )
})

test('実装スクリプト: base-merge 返却のログ専用 3 項目を読む・書く箇所が残っていない（状態ファイル・ログ・返却のいずれも）', () => {
  assert.ok(!/\bb\.(mergeableAfter|checksStarted|headSha)\b/.test(source), 'b.mergeableAfter / b.checksStarted / b.headSha を参照している箇所が残っている')
  assert.ok(!/mergeableAfter(?!Push)/.test(source), 'mergeableAfter（mergeableAfterPush 以外）が残っている')
})


// ---------------------------------------------------------------------------
// baseMergePrompt: プロンプト契約。Issue #603 第 3 弾で、routing ガード・fetch・checkout・マージ・push 検証の手順の文章を
// スクリプト scripts/base-merge.sh に移した。手順そのものの挙動（位置関係・fail-closed・禁止コマンド・routing 照合）は
// tests/base-merge.test.mjs が実 git で固定し、ここは『エージェントに何を実行させ、何を返させるか』のプロンプト契約を固定する。
// ---------------------------------------------------------------------------

const BASE_MERGE_SH = readFileSync(join(dirname(fileURLToPath(import.meta.url)), '..', 'scripts', 'base-merge.sh'), 'utf8')
// コメント行を除いたスクリプト本文（禁止語の検査をコメント中の説明文で誤検出しない）
const baseMergeCode = BASE_MERGE_SH.split('\n').filter((l) => !/^\s*#/.test(l)).join('\n')
// 許可ホストの定数と URL 照合の関数は lib/base-merge-lib.sh（スクリプト本体から無変更で切り出したもの。テストが表で単体検査するため）
const BASE_MERGE_LIB_SH = readFileSync(join(dirname(fileURLToPath(import.meta.url)), '..', 'scripts', 'lib', 'base-merge-lib.sh'), 'utf8')
const baseMergeLibCode = BASE_MERGE_LIB_SH.split('\n').filter((l) => !/^\s*#/.test(l)).join('\n')
const commandOf = (prompt) => /```sh\n([\s\S]*?)\n```/.exec(prompt)?.[1]

test('baseMergePrompt: base-merge.sh を run-verified.sh 経由の 1 コマンドで起動し、引数は検証済みの値だけを渡す', () => {
  const prompt = baseMergePrompt(item, impl, 'Fandhe-AI/agent-cli-skills')
  const command = commandOf(prompt)
  assert.ok(command, 'sh のコードブロックが無い')
  assert.equal(command.split('\n').length, 1, 'コマンドは 1 行')
  assert.equal(
    command,
    "bash '/opt/skills/implement-issue-tree/scripts/run-verified.sh' @@SCRIPT_SHA256:base-merge.sh@@ base-merge.sh --pr 999 --branch feat/441-base-merge --base main --repo 'fandhe-ai/agent-cli-skills'",
  )
  assert.ok(!command.includes('--nonce'), '封筒を使わないので nonce は付けない（ホストが新たに採用する値が無い）')
  assert.ok(prompt.includes('一字一句そのまま'), '改変禁止の指示がない')
  assert.ok(prompt.includes('timeout に 600000'), 'push が長い pre-push hook を持ち得るため timeout の指定がいる')
})

test('baseMergePrompt: 異常終了の fallback（非 0 終了・結果の行なし）は pushed: false・commitFailed: true で返させ、取り込み直さない', () => {
  const prompt = baseMergePrompt(item, impl, 'Fandhe-AI/agent-cli-skills')
  assert.ok(prompt.includes('非 0 終了や該当行が無いとき'), '異常終了の扱いの指示がない')
  assert.ok(prompt.includes('他の方法で取り込み直さず'), '自己流のやり直しを禁じる指示がない')
  assert.ok(prompt.includes('pushed: false・commitFailed: true'), 'fallback の返却値の指示がない')
  assert.ok(prompt.includes('BASE_MERGE_RESULT'), '結果の行の識別子がない')
})

test('baseMergePrompt: 手順の文章を持たない（fetch / merge / push / routing の手順は base-merge.sh が持つ）', () => {
  const prompt = baseMergePrompt(item, impl, 'Fandhe-AI/agent-cli-skills')
  for (const w of ['git fetch origin', 'git merge --no-edit', 'git push origin', 'git checkout --detach', 'remote get-url', 'ls-remote', 'gh pr view', '手順:']) {
    assert.ok(!prompt.includes(w), `手順の記述「${w}」がプロンプトに残っている`)
  }
})

// PR #443 codex P0（submodule 例外撤去）の回帰: gitlink コンフリクトは双方がポインタを変更した状態であり、base 側採用は
// PR 側の gitlink 更新を黙って破棄する。コンフリクトは種別を問わず解消しない（スクリプトは abort して conflict を返す）。
test('base-merge.sh: コンフリクトを解消する操作（git add / checkout <ref> -- <path> / commit）を持たず、abort して conflict + commitFailed で返す', () => {
  assert.ok(!/\bgit add\b/.test(baseMergeCode), 'git add が含まれている（submodule ポインタ等の機械的な解消の復活）')
  assert.ok(!/git checkout (?!--detach )/.test(baseMergeCode), 'detached checkout 以外の git checkout（片側採用等）が含まれている')
  assert.ok(!/\bgit commit\b/.test(baseMergeCode), 'git commit が含まれている（マージコミットは git merge が作る）')
  assert.ok(baseMergeCode.includes('git merge --abort'), 'merge --abort がない')
  assert.ok(baseMergeCode.includes('emit false "base コンフリクト解消不能（内容編集の権限なし。fix/implement へ委譲要）" commitFailed conflict'), 'コンフリクト時の返却（commitFailed + conflict）がない')
})

// PR #443 codex P0（thread PRRT_kwDORuXFg86cbn_T）の回帰: baseMergePrompt は COMMON（CLAUDE.md・.claude/rules を読んで従う指示）を
// 挿入しない。COMMON は PR ブランチが改変できる未信頼文書を読ませる指示であり、push できる本エージェントへ入れると命令注入経路になる。
// BASE_MERGE_CONTEXT_COMMON という専用の最小固定指示を使う。
test('baseMergePrompt: COMMON のリポジトリ内文書読み取り指示（CLAUDE.md・.claude/rules）を含まず、専用の安全規則を含む', () => {
  const prompt = baseMergePrompt(item, impl)
  assert.ok(!prompt.includes('CLAUDE.md・.claude/rules・テスト実行規約・コーディング規約があれば必ず読んで従う'), 'COMMON の CLAUDE.md/.claude/rules 読み取り指示が混入している')
  assert.ok(!prompt.includes('delegation ルールや専門サブエージェントがあれば、それに従い役割単位で委譲する'), 'COMMON の delegation 委譲指示が混入している')
  assert.ok(prompt.includes('--no-verify 禁止'), '--no-verify 禁止の安全規則がない')
  assert.ok(prompt.includes('文書'), 'リポジトリ内文書を読まない旨の明示がない')
})

test('baseMergePrompt: gh pr merge の実行コマンド形・resolveReviewThread mutation を含まない（権限境界）', () => {
  const prompt = baseMergePrompt(item, impl)
  // 権限境界の説明文中に「マージ・クローズは行わない」と書くため、実行可能なコマンド形の不在で判定する
  assert.ok(!prompt.includes('--squash --delete-branch --match-head-commit'), 'マージ実行コマンド形が混入している')
  assert.ok(!prompt.includes('mutation($tid:ID!){resolveReviewThread'), 'resolveReviewThread mutation の実行コマンド行が混入している')
})

// PR #443 codex P0 / P1 の回帰: baseMergePrompt は PR 由来の未信頼コード実行（fmt / lint / build / test 等）を指示せず、
// 内容編集を伴う解消の権限も持たない。合成後の全文を検査する（共有ヘルパーに実行指示が復活しても失敗する）。
test('baseMergePrompt: fmt / lint / build / test 等の未信頼コード実行指示を含まない（合成後の全文を検査）', () => {
  const prompt = baseMergePrompt(item, impl)
  assert.ok(!prompt.includes('を通してからコミットする'), '旧実装の実行命令形（〜を通してからコミットする）が残っている')
  assert.ok(!prompt.includes('ビルド・lint・テストを通してから'), '実行命令形（ビルド・lint・テストを通してから）が残っている')
  for (const word of [
    'npm run', 'npm test', 'npm ci', 'yarn ', 'pnpm ', 'make ',
    'cargo test', 'cargo build', 'pytest', 'go test', 'go build',
    'fmt を実行', 'lint を実行', 'build を実行', 'test を実行',
  ]) {
    assert.ok(!prompt.includes(word), `未信頼コード実行コマンド／実行を命じる言い回し「${word}」が混入している`)
  }
  assert.ok(!baseMergeCode.match(/\b(npm|yarn|pnpm|make|cargo|pytest)\b/), 'base-merge.sh がビルド・テストの実行コマンドを含んでいる')
})

test('baseMergePrompt: レビュー指摘の修正を行わない権限境界の文言を含む', () => {
  const prompt = baseMergePrompt(item, impl)
  assert.ok(prompt.includes('レビュー指摘の修正'), 'レビュー指摘の修正を行わない旨の権限境界文言がない')
})

test('baseMergePrompt: 動的な未信頼データ境界トークン（UNTRUSTED_<nonce>）を含まない', () => {
  const prompt = baseMergePrompt(item, impl)
  assert.ok(!/UNTRUSTED_[0-9a-f]+_BEGIN/.test(prompt), 'fixPrompt 由来の動的境界トークンが混入している（monitor summary 等の自由文を埋め込まない設計に反する）')
})

// 期待 owner/repo は ASCII 小文字化してコマンドへ渡す（owner/repo は case-insensitive。スクリプトも同じ規則で比較する）。
test('baseMergePrompt: 期待 owner/repo は小文字化して --repo に渡され、大文字小文字違いの入力でプロンプトが変わらない', () => {
  const mixed = baseMergePrompt(item, impl, 'Fandhe-AI/Agent-CLI-Skills')
  const lower = baseMergePrompt(item, impl, 'fandhe-ai/agent-cli-skills')
  assert.equal(mixed, lower, '大文字小文字違いの owner/repo 入力でプロンプト内容が変化している')
  assert.ok(commandOf(mixed).endsWith("--repo 'fandhe-ai/agent-cli-skills'"))
  assert.ok(!mixed.includes('Fandhe-AI'), '小文字化されない値が埋め込まれている')
})

// 期待 owner/repo が未確定（省略／不正形式）の場合、空文字を渡す。スクリプトは空の --repo を『未確定』の routingError
// （常に不一致 = fail-closed）で返す（tests/base-merge.test.mjs の「期待リポジトリが空」）。
test('baseMergePrompt: 期待 owner/repo が未確定（省略／不正形式）のとき --repo は空文字になり、不正値はそのまま埋め込まれない', () => {
  for (const [label, repo] of [['省略', undefined], ['スラッシュなし不正値', 'not-a-valid-slug-without-slash'], ['空文字', ''], ['注入', "x/y'; touch pwned #"]]) {
    const command = commandOf(baseMergePrompt(item, impl, repo))
    assert.ok(command.endsWith("--repo ''"), `${label}: --repo が空文字になっていない: ${command}`)
    assert.ok(!command.includes('not-a-valid-slug') && !command.includes('pwned'), `${label}: 不正値がコマンドへ埋め込まれている`)
  }
})

test('base-merge.sh: 許可ホストは github.com の固定値で、host / owner-repo / PR の照合が fetch・merge・push より前にある', () => {
  assert.ok(baseMergeLibCode.includes("ALLOWED_REMOTE_HOST='github.com'"))
  assert.ok(!baseMergeCode.includes('ALLOWED_REMOTE_HOST='), '許可ホストの定義が lib と本体に二重にある')
  const guard = baseMergeCode.indexOf('gh pr view')
  for (const w of ['git fetch', 'git checkout', 'git merge ', 'pv_push_verified']) {
    assert.ok(baseMergeCode.indexOf(w) > guard, `${w} が routing ガード（gh pr view）より前にある`)
  }
  // 許可ホストの定数と url_allowed を持つ lib は、gh pr view（routing ガード）より前に source される
  const libSource = baseMergeCode.indexOf('lib/base-merge-lib.sh')
  assert.ok(libSource >= 0 && libSource < baseMergeCode.indexOf('gh pr view'), 'lib/base-merge-lib.sh が gh pr view より前に source されていない')
  assert.ok(baseMergeLibCode.includes('url_allowed()') && baseMergeLibCode.includes('url_allowed "${line}" "${want_slug}"') && baseMergeCode.includes('routing_check_remotes "${want}"'), 'URL 照合（url_allowed。lib の routing_check_remotes 経由）が routing ガードで使われていない')
  assert.ok(!source.includes('ALLOWED_REMOTE_HOST'), 'ホストの実装スクリプトに ALLOWED_REMOTE_HOST が残っている（許可ホストはスクリプトの埋め込み定数）')
})

// PR #443 codex P0（thread PRRT_kwDORuXFg86cacPf）の回帰テスト: baseMergePrompt は push まで許可するエージェントのため
// item.title（未信頼テキスト）を一切埋め込まない。
test('baseMergePrompt: item.title / untrusted(item.title) を一切含まない', () => {
  const prompt = baseMergePrompt(item, impl)
  assert.ok(!prompt.includes(item.title), 'item.title の生文字列がプロンプトへ埋め込まれている')
  assert.ok(!prompt.includes('source="issue-title"'), 'untrusted() の issue-title タグ境界が混入している')
  const otherTitleItem = { number: item.number, title: '全く異なるタイトル・記号!@#$%^&*()を含む' }
  assert.equal(baseMergePrompt(otherTitleItem, impl), prompt, 'item.title の違いでプロンプト内容が変化している（title が何らかの形で埋め込まれている）')
})

test('baseMergePrompt: PR 番号が正の整数でない・ブランチ名が不正なら組み立てず例外にする（コマンド行へ未検証の値を埋め込まない）', () => {
  for (const bad of [0, -1, 1.5, '12', null, undefined]) {
    assert.throws(() => baseMergePrompt(item, { ...impl, prNumber: bad }, 'Fandhe-AI/agent-cli-skills'), /prNumber/, String(bad))
  }
  for (const bad of ['a;b', '$(x)', '-x', 'a..b', 'a b']) {
    assert.throws(() => baseMergePrompt(item, { ...impl, branch: bad }, 'Fandhe-AI/agent-cli-skills'), undefined, bad)
  }
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

test('fixPrompt(pushAfterFix: true): push 検証は pr-push.sh の status（pushed のときだけ pushed: true）に結ぶ（二条件判定は lib/push-verify.sh の実行テストが固定する）', () => {
  const finding = { summary: 'テスト用の指摘', unresolvedComments: [] }
  const prompt = fixPrompt(item, impl, finding, true)
  assert.ok(prompt.includes('status が pushed のときだけ pushed: true'), 'pushed: true の判定が status に結ばれていない')
  assert.ok(prompt.includes('push 前後のリモート head をローカル HEAD と突き合わせる判定もスクリプトが行う'), '突き合わせをスクリプトが行う旨がない')
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

test('basePrepareInstruction: 検証権限を持つ経路（pr-create・fix）専用で、コンフリクトはその場で解消する。conflict: true / hookRejected の返却指示は含まない', () => {
  const instr = basePrepareInstruction('pr-create', 'feat/x', 'prNumber: 0 で返す')
  assert.ok(!instr.includes('conflict: true'), '検証権限あり経路に conflict: true の返却指示が混入している')
  assert.ok(!instr.includes('hookRejected'), '検証権限あり経路に hookRejected の返却指示が混入している')
  assert.ok(instr.includes('conflict はマージが途中のまま残っている: CLAUDE.md・rules を遵守して解消し'), 'コンフリクトをその場で解消する指示が失われている')
  assert.ok(instr.includes('git merge --abort'), 'merge --abort の指示が失われている')
  assert.equal(basePrepareInstruction.length, 3, '引数は origin・branch・failTail の 3 つ（自動 base 取り込みは base-merge.sh）')
})

test('baseMergePrompt: 返却キーに conflict / hookRejected / routingError / commitFailed を列挙する（スクリプトの結果の転記指示）', () => {
  const prompt = baseMergePrompt(item, impl)
  for (const k of ['pushed', 'summary', 'worktreePath', 'routingError', 'commitFailed', 'conflict', 'hookRejected']) {
    assert.ok(prompt.includes(k), `${k} の転記指示がない`)
  }
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
// 読み取り専用 subject 算出エージェント方式はプロンプト指示のみでランタイム強制できないため撤去した。push 権限を持つ
// 自動 base 取り込みは commitlint 設定・コミット履歴という未信頼テキストを一切読まず、subject は固定値のみを使う。
// Issue #603 第 3 弾で、その固定値はホストのリテラルから base-merge.sh の埋め込み定数（run-verified.sh のハッシュで
// 固定される）に移った。commitlint がこの固定値を拒否するリポでは分岐 (c) が hookRejected: true で返り、ホストは
// failed 終端せず fix 経路（push 前 base 最新化ゲート）へ委譲する（実 hook での挙動は tests/base-merge.test.mjs）。
// ---------------------------------------------------------------------------

const HOST_SUBJECT = 'chore: base ブランチの変更を取り込む'

test('baseMergePrompt: commitlint 設定・コミット履歴の読取指示を一切含まない（未信頼読取ゼロ化・合成後の全文）', () => {
  for (const [label, prompt] of [
    ['期待リポジトリあり', baseMergePrompt(item, impl, 'Fandhe-AI/agent-cli-skills')],
    ['期待リポジトリなし', baseMergePrompt(item, impl)],
  ]) {
    assert.ok(!prompt.includes('commitlint.config'), `${label}: commitlint 設定ファイルの読取指示が含まれている`)
    assert.ok(!prompt.includes('.commitlintrc'), `${label}: .commitlintrc の読取指示が含まれている`)
    assert.ok(!prompt.includes('を読み、マージコミットの subject'), `${label}: subject 決定のための設定読取指示が含まれている`)
    assert.ok(!prompt.includes('type-enum'), `${label}: type-enum 解釈手順（commitlint 読取前提）が含まれている`)
    assert.ok(!prompt.includes('直前の implement / fix コミットの scope'), `${label}: コミット履歴（scope 再利用）の読取指示が含まれている`)
  }
})

test('base-merge.sh: マージの subject は埋め込み定数を一時ファイルに書いて -F で渡す。commitlint 設定もコミット履歴も読まない', () => {
  assert.ok(baseMergeCode.includes(`MERGE_SUBJECT='${HOST_SUBJECT}'`), '埋め込み subject がホスト固定値と違う')
  assert.ok(/git merge [^\n]*-F "\$\{msgfile\}"/.test(baseMergeCode), '-F 一時ファイル渡しでない（-m の文字列補間は使わない）')
  assert.ok(!/git merge [^\n]*\s-m\b/.test(baseMergeCode), 'git merge -m を使っている')
  assert.ok(baseMergeCode.includes('trap cleanup EXIT'), '一時ファイルを trap で消していない')
  assert.ok(!/commitlint|git log|\.commitlintrc/.test(baseMergeCode), 'commitlint 設定・コミット履歴を読んでいる')
  assert.ok(!source.includes("const hostSubject = 'chore: base ブランチの変更を取り込む'"), 'ホスト側に subject のリテラルが残っている')
})

test('BASE_MERGE_SCHEMA: hookRejected は省略可の boolean として定義される', () => {
  assert.ok('hookRejected' in BASE_MERGE_SCHEMA.properties, 'hookRejected が定義されていない')
  assert.equal(BASE_MERGE_SCHEMA.properties.hookRejected.type, 'boolean')
  assert.ok(!BASE_MERGE_SCHEMA.required.includes('hookRejected'), 'hookRejected が required に含まれている（省略可のはず）')
  assert.ok(BASE_MERGE_SCHEMA.properties.hookRejected.description.includes('分岐 (c)'), 'hookRejected の description が分岐 (c) 限定を明示していない')
})

test('実装スクリプト: subject 算出エージェント（baseMergeSubjectPrompt / BASE_MERGE_SUBJECT_*）が完全に撤去されている', () => {
  // プロンプト指示のみの読み取り専用契約はランタイム強制されない（Workflow の agent() に権限
  // 制約オプションが無い）ため、未信頼読取を担うエージェント自体が存在してはならない。
  assert.ok(!source.includes('baseMergeSubjectPrompt'), 'baseMergeSubjectPrompt が実装スクリプトに残存している')
  assert.ok(!source.includes('BASE_MERGE_SUBJECT'), 'BASE_MERGE_SUBJECT_* が実装スクリプトに残存している')
})

test('駆動部: conflicting 分岐は subject を持たず（hostSubject を渡さず）、スクリプト base-merge.sh の埋め込み定数に任せる', () => {
  const branchIdx = driverPart.indexOf("} else if (lastState === 'conflicting') {")
  assert.ok(branchIdx >= 0, 'conflicting 分岐が見つからない')
  const nextBranchIdx = driverPart.indexOf("lastState === 'needs-fix' || lastState === 'unresolved-comments'", branchIdx)
  const branchBody = driverPart.slice(branchIdx, nextBranchIdx)
  assert.ok(!branchBody.includes('hostSubject'), 'conflicting 分岐に hostSubject が残っている')
  assert.ok(branchBody.includes('await agent(baseMergePrompt(item, impl, expectedRepo), '), 'baseMergePrompt は (item, impl, expectedRepo) の 3 引数で起動する')
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
