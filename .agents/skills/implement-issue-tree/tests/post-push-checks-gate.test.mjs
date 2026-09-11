// Issue #479 の回帰テスト: base とコンフリクトした PR は GitHub が test merge commit を作れず
// pull_request トリガの check-run が 0 件のままになり、monitor が手順 3e（総数 0 件時の
// mergeable 再判定）を通らずに timeout を返し続けて監視枠（7 ラウンド）を空費する経路があった。
//
// 本ファイルが固定する契約は 3 系統:
//   (1) push 直後の CI 起動確認（prCreatePrompt 手順 3b / fixPrompt(pushAfterFix: true) 手順 4）
//   (2) monitor の 0 件直行ルート・timeout の限定（monitorPrompt 手順 2 / 3e / 7・MERGE_SCHEMA）
//   (3) ホスト側の分岐ヒント（mergeableAfterPush → lastState = 'conflicting' seed）と
//       checksTotal: 0 の timeout 拒否
//
// 読み込み方式は g0-gates.test.mjs / conflict-prepush-gate.test.mjs と同一（マーカー切り出し
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
const sliceDir = mkdtempSync(join(tmpdir(), 'implement-issue-tree-post-push-'))
const slicePath = join(sliceDir, 'implement-issue-tree-defs.mjs')
const SLICE_EXPORTS = [
  'prCreatePrompt',
  'fixPrompt',
  'monitorPrompt',
  'postPushChecksInstruction',
  'normalizePushMergeable',
  'PR_CREATE_SCHEMA',
  'FIX_SCHEMA',
  'MERGE_SCHEMA',
]
// fixPrompt は boundaryNonce() を内部で使う。本番では agent() 経由で seed が注入されるが、
// スライスには agent が無いためテスト専用 setter で module-scope let へ直接注入する
// （g0-gates.test.mjs と同一パターン）。
const TEST_ONLY_SETTER =
  'export function __setBoundaryNonceSeedForTest(v) { boundaryNonceSeed = v }\n'
writeFileSync(
  slicePath,
  `${definitionPart}\nexport { ${SLICE_EXPORTS.join(', ')} }\n${TEST_ONLY_SETTER}`,
)

const mod = await import(pathToFileURL(slicePath).href)
const {
  prCreatePrompt,
  fixPrompt,
  monitorPrompt,
  postPushChecksInstruction,
  normalizePushMergeable,
  PR_CREATE_SCHEMA,
  FIX_SCHEMA,
  MERGE_SCHEMA,
} = mod

const item = { number: 479, title: 'テストイシュー' }
const impl = { prNumber: 777, branch: 'fix/479-post-push-checks' }
const NONCE = 'b'.repeat(64)

// ---------------------------------------------------------------------------
// (1) push 直後の CI 起動確認（プロンプト契約）
// ---------------------------------------------------------------------------

test('prCreatePrompt: CI 起動確認が push 行より後に現れ、check-runs と mergeable を有界に観測する', () => {
  const prompt = prCreatePrompt(item, impl, [])
  const pushIdx = prompt.indexOf('git push origin HEAD:refs/heads/')
  const checkIdx = prompt.indexOf('push 後 CI 起動確認（必須。Issue #479）')
  assert.ok(pushIdx >= 0, 'push 指示が見つからない')
  assert.ok(checkIdx >= 0, 'push 後 CI 起動確認の指示がない')
  assert.ok(pushIdx < checkIdx, 'CI 起動確認が push より前に現れる（push していない head を観測してしまう）')
  assert.ok(prompt.includes("check-runs --jq '.total_count'"), 'check-run 総数の取得コマンドがない')
  assert.ok(prompt.includes('--json mergeable --jq .mergeable'), 'mergeable の取得コマンドがない')
  assert.ok(prompt.includes('30 秒間隔で最大 5 分'), '有界（30 秒間隔・最大 5 分）の待機指示がない')
  assert.ok(prompt.includes('checksStarted'), 'checksStarted の返却指示がない')
  assert.ok(prompt.includes('mergeableAfterPush'), 'mergeableAfterPush の返却指示がない')
})

test('prCreatePrompt: CI 起動確認は PR 番号確定後（手順 3 の後）に置かれ、再利用経路も通る', () => {
  const prompt = prCreatePrompt(item, impl, [])
  const step3Idx = prompt.indexOf('3. PR 作成成功後、prNumber を返す')
  const step3bIdx = prompt.indexOf('3b. push 後 CI 起動確認')
  assert.ok(step3Idx >= 0 && step3bIdx > step3Idx, '手順 3b が手順 3 の後に無い（PR 番号未確定のまま観測できない）')
  // 既存 open PR 再利用経路（手順 1c）も手順 3b を経由してから終了する。
  assert.ok(
    prompt.includes('その後は手順 3b へ進む'),
    '既存 PR 再利用経路が手順 3b（CI 起動確認）を飛ばしている',
  )
})

test('fixPrompt(pushAfterFix: true): CI 起動確認が push 検証の後に現れる', () => {
  mod.__setBoundaryNonceSeedForTest(NONCE)
  const prompt = fixPrompt(item, impl, { summary: 'テスト用の指摘', unresolvedComments: [] }, true)
  const pushIdx = prompt.indexOf('git push origin HEAD:refs/heads/')
  const checkIdx = prompt.indexOf('push 後 CI 起動確認（必須。Issue #479）')
  assert.ok(pushIdx >= 0, 'push 指示が見つからない')
  assert.ok(checkIdx >= 0, 'push 後 CI 起動確認の指示がない')
  assert.ok(pushIdx < checkIdx, 'CI 起動確認が push より前に現れる')
  assert.ok(prompt.includes('mergeableAfterPush'), 'mergeableAfterPush の返却指示がない')
})

test('fixPrompt(pushAfterFix: false): CI 起動確認を含まない（Review ループは push しない）', () => {
  mod.__setBoundaryNonceSeedForTest(NONCE)
  const prompt = fixPrompt(item, impl, { summary: 'テスト用の指摘', unresolvedComments: [] }, false)
  assert.ok(!prompt.includes('push 後 CI 起動確認'), 'push しない Review ループに CI 起動確認が混入している')
  assert.ok(!prompt.includes('mergeableAfterPush'), 'push しない Review ループに mergeableAfterPush の返却指示が混入している')
})

test('postPushChecksInstruction: 未確定・観測不能を CONFLICTING へ倒さない（fail-closed は UNKNOWN 側）', () => {
  const text = postPushChecksInstruction('123')
  assert.ok(text.includes('UNKNOWN のまま返す'), '上限到達時に UNKNOWN のまま返す指示がない')
  assert.ok(
    text.includes('CONFLICTING とみなさず UNKNOWN を返す'),
    '未確定を CONFLICTING とみなさない（誤って base 取り込みを起動しない）指示がない',
  )
  assert.ok(
    text.includes('返却値（prNumber / pushed）の判定を変えてはならない'),
    '既存返却値の意味を変えない旨の指示がない',
  )
})

// PR #480 の codex P1 / Bugbot Medium 回帰テスト: 「チェック総数」を check-run の total_count
// だけで数えると、check-run を作らず commit status のみを発行する CI を使うリポジトリで、
// 正常なチェックが存在するのに 0 件と誤判定して 3e（blocked）や base 取り込みへ回してしまう。
// gh pr checks / merge-exec の集計（gh 公式実装 pkg/cmd/pr/checks/aggregate.go）と同じく
// check-run + commit status の合計で数えること、および取得失敗を 0 件扱いにしないことを固定する。
const COUNT_TARGETS = [
  ['prCreatePrompt', () => prCreatePrompt(item, impl, [])],
  ['fixPrompt(pushAfterFix: true)', () => {
    mod.__setBoundaryNonceSeedForTest(NONCE)
    return fixPrompt(item, impl, { summary: 'テスト用の指摘', unresolvedComments: [] }, true)
  }],
  ['monitorPrompt', () => monitorPrompt(item, impl, [], true, true)],
]

test('チェック総数は check-run と commit status の合計で数える（PR #480）', () => {
  for (const [name, build] of COUNT_TARGETS) {
    const prompt = build()
    assert.ok(prompt.includes("check-runs --jq '.total_count'"), `${name}: check-run 総数の取得指示がない`)
    assert.ok(
      prompt.includes("/status --jq '.statuses | length'"),
      `${name}: commit status（combined status）件数の取得指示がない — check-run のみを数えると commit status だけの CI で 0 件と誤判定する`,
    )
    assert.ok(prompt.includes('合計'), `${name}: 両者を合算する指示がない`)
  }
})

test('チェック総数の取得失敗を 0 件扱いにしない（PR #480 codex P1）', () => {
  for (const [name, build] of COUNT_TARGETS) {
    const prompt = build()
    assert.ok(
      prompt.includes('どちらか一方でも失敗した場合は「取得失敗」として扱う'),
      `${name}: 片方の取得失敗を「取得失敗」として扱う指示がない`,
    )
    assert.ok(
      prompt.includes('0 件と同一視してはならない'),
      `${name}: 取得失敗を 0 件と同一視しない旨の指示がない`,
    )
  }
})

test('monitorPrompt: 取得失敗時は checksTotal を省略し、--watch へ進む（0 件直行させない）', () => {
  const prompt = monitorPrompt(item, impl, [], true, true)
  const idx2 = prompt.indexOf('\n2. ')
  const section2 = prompt.slice(idx2, prompt.indexOf('\n3. ', idx2))
  assert.ok(
    section2.includes('取得失敗時は checksTotal を省略し、0 を返してはならない'),
    '取得失敗時に checksTotal を省略する指示がない（0 を返すとホストが timeout を conflicting へ誤って倒す）',
  )
  assert.ok(
    section2.includes('取得に失敗した場合は次へ進む'),
    '取得失敗時に --watch へ進む（0 件直行させない）指示がない',
  )
})

// ---------------------------------------------------------------------------
// (2) スキーマ（新フィールドと enum の同期）
// ---------------------------------------------------------------------------

test('PR_CREATE_SCHEMA / FIX_SCHEMA: 新フィールドは任意で、mergeableAfterPush の enum が同期している', () => {
  for (const [name, schema] of [['PR_CREATE_SCHEMA', PR_CREATE_SCHEMA], ['FIX_SCHEMA', FIX_SCHEMA]]) {
    assert.equal(schema.properties.checksStarted?.type, 'boolean', `${name}.checksStarted が boolean でない`)
    assert.deepEqual(
      schema.properties.mergeableAfterPush?.enum,
      ['MERGEABLE', 'CONFLICTING', 'UNKNOWN'],
      `${name}.mergeableAfterPush の enum が MERGEABLE / CONFLICTING / UNKNOWN と一致しない`,
    )
    // 旧エージェント出力との互換のため required へ足さない（足すと過去バージョンの応答が
    // schema 不適合になり、pr-create / fix が丸ごと失敗終端する）。
    assert.ok(!schema.required.includes('checksStarted'), `${name}.required に checksStarted が入っている`)
    assert.ok(!schema.required.includes('mergeableAfterPush'), `${name}.required に mergeableAfterPush が入っている`)
  }
})

test('MERGE_SCHEMA: checksTotal は 0 以上の整数の任意フィールド', () => {
  assert.equal(MERGE_SCHEMA.properties.checksTotal?.type, 'integer', 'checksTotal が integer でない')
  assert.equal(MERGE_SCHEMA.properties.checksTotal?.minimum, 0, 'checksTotal の下限が 0 でない')
  assert.ok(!MERGE_SCHEMA.required.includes('checksTotal'), 'checksTotal が required に入っている（旧応答形式と非互換になる）')
})

test('normalizePushMergeable: enum 完全一致のみ受理し、それ以外は UNKNOWN へ倒す', () => {
  assert.equal(normalizePushMergeable('CONFLICTING'), 'CONFLICTING')
  assert.equal(normalizePushMergeable('MERGEABLE'), 'MERGEABLE')
  for (const v of ['UNKNOWN', 'conflicting', '', undefined, null, 0, {}, ['CONFLICTING']]) {
    assert.equal(normalizePushMergeable(v), 'UNKNOWN', `${JSON.stringify(v)} が UNKNOWN へ倒れていない`)
  }
})

// ---------------------------------------------------------------------------
// (3) monitor プロンプト（0 件直行・timeout の限定）
// ---------------------------------------------------------------------------

test('monitorPrompt: 手順 2 は --watch の前に check-run 総数を取得し、0 件なら手順 3e へ直行する', () => {
  const prompt = monitorPrompt(item, impl, [], true, true)
  const idx2 = prompt.indexOf('\n2. ')
  assert.ok(idx2 >= 0, '手順 2 が見つからない')
  const idx3 = prompt.indexOf('\n3. ', idx2)
  assert.ok(idx3 > idx2, '手順 3 の開始位置を特定できない')
  const section2 = prompt.slice(idx2, idx3)
  const totalIdx = section2.indexOf("check-runs --jq '.total_count'")
  // 集計定義の説明文にも「gh pr checks」の語が出るため、--watch 実行コマンドで位置決めする。
  const watchIdx = section2.indexOf(`gh pr checks ${impl.prNumber} --watch`)
  assert.ok(totalIdx >= 0, '手順 2 に check-run 総数の取得指示がない')
  assert.ok(watchIdx >= 0, '手順 2 に --watch 監視の指示がない')
  assert.ok(totalIdx < watchIdx, 'check-run 総数の取得が --watch より後にある（0 件のまま watch へ入ってしまう）')
  assert.ok(section2.includes('手順 3e'), '総数 0 件時に手順 3e へ直行する指示がない')
  assert.ok(section2.includes('checksTotal'), '手順 2 に checksTotal の返却指示がない')
})

test('monitorPrompt: 手順 2 の再実行枯渇時は timeout を返さず手順 3 の総数確認へ進む', () => {
  const prompt = monitorPrompt(item, impl, [], true, true)
  const idx2 = prompt.indexOf('\n2. ')
  const idx3 = prompt.indexOf('\n3. ', idx2)
  const section2 = prompt.slice(idx2, idx3)
  assert.ok(
    section2.includes('再実行 4 回を使い切っても完了しない場合も、ここで timeout を返さず手順 3 の総数確認へ進む'),
    '再実行枯渇時の接続（timeout ではなく手順 3 へ）が明記されていない',
  )
})

test('monitorPrompt: 手順 7 の timeout はチェック 1 件以上の pending 限定で、0 件は手順 3e へ倒す', () => {
  const prompt = monitorPrompt(item, impl, [], true, true)
  const idx7 = prompt.indexOf('\n7. ')
  assert.ok(idx7 >= 0, '手順 7 が見つからない')
  const section7 = prompt.slice(idx7)
  assert.ok(
    !section7.startsWith('\n7. 監視上限まで待っても完了しない場合は state: timeout。'),
    '旧文言（総数を問わず timeout）が残っている',
  )
  assert.ok(
    section7.includes('チェックが 1 件以上存在し'),
    'timeout の条件がチェック 1 件以上に限定されていない',
  )
  assert.ok(
    section7.includes('checksTotal: 0 の timeout を受理しない'),
    'ホストが checksTotal: 0 の timeout を受理しない旨が明記されていない',
  )
})

test('monitorPrompt: 手順 3e は check-run 0 件を理由文に含め、checksTotal: 0 を返させる', () => {
  const prompt = monitorPrompt(item, impl, [], true, true)
  const idxE = prompt.indexOf('チェック総数が 0 件の場合は green とみなさず')
  assert.ok(idxE >= 0, '手順 3e が見つからない')
  const sectionE = prompt.slice(idxE, idxE + 4000)
  assert.ok(sectionE.includes('「check-run 0 件」と明記'), 'blocked 理由文に「check-run 0 件」を含める指示がない')
  assert.ok(sectionE.includes('checksTotal: 0 を必ず併せて返す'), '手順 3e から checksTotal: 0 を返す指示がない')
})

// ---------------------------------------------------------------------------
// (4) ホスト側（駆動部のソース走査。runMergeLoop は import 不能）
// ---------------------------------------------------------------------------

test('駆動部: pr-create / fix の mergeableAfterPush が conflicting seed へ配線されている', () => {
  // pr-create は runMergeLoop の初期値として、fix はループ内フラグとして seed する。
  assert.ok(
    driverPart.includes('const prCreatePushMergeable = normalizePushMergeable(prCreateResult.mergeableAfterPush)'),
    'pr-create の mergeableAfterPush が正規化されていない（自己申告値をそのまま使ってはならない）',
  )
  assert.ok(
    driverPart.includes('0, prCreatePushMergeable)'),
    'pr-create の観測値が runMergeLoop へ渡されていない',
  )
  assert.ok(
    driverPart.includes("pendingPushConflict = f.pushed === true && fixPushMergeable === 'CONFLICTING'"),
    'fix の seed が「push 成功かつ CONFLICTING」に限定されていない',
  )
  assert.ok(
    driverPart.includes("let pendingPushConflict = normalizePushMergeable(initialPushMergeable) === 'CONFLICTING'"),
    'runMergeLoop 冒頭の seed 初期化が見つからない',
  )
})

test('駆動部: seed ラウンドは monitor を起動せず監視枠を消費しない（有界性は seed 回数で担保）', () => {
  const startIdx = driverPart.indexOf('while (!merged && monitorsLeft > 0) {')
  assert.notEqual(startIdx, -1, '監視ループの while が見つからない（構造変更時は本テストも更新すること）')
  const head = driverPart.slice(startIdx, startIdx + 1600)
  assert.ok(head.includes('const seededConflictRound = pendingPushConflict'), 'seed ラウンドの判定がループ先頭にない')
  assert.ok(head.includes('pendingPushConflict = false'), 'seed が一発限りで消費されていない（無限ループの危険）')
  assert.ok(head.includes('if (seededConflictRound) monitorsLeft++'), 'monitor 非起動ラウンドで監視枠が戻されていない')
  // seed ラウンドでは救済ラウンド予約・resolve (b) 観測を消費しない（実観測が無いため）。
  assert.ok(head.includes('rescueRoundActive = false'), 'seed ラウンドで救済予約が持ち越されていない')
  assert.ok(
    driverPart.includes('if (!seededConflictRound) {\n      resolveProof = applyResolveProofObservation('),
    'seed ラウンドで resolve (b) 観測が抑止されていない（直前 fix の lastRoundPushed を空費する）',
  )
  // monitor エージェント呼び出しは seed でない場合のみ。
  const callIdx = driverPart.indexOf('m = await agent(monitorPrompt(')
  assert.notEqual(callIdx, -1, 'monitor 呼び出しが見つからない')
  assert.match(driverPart.slice(Math.max(0, callIdx - 300), callIdx), /if \(seededConflictRound\) \{/, 'monitor 呼び出しが seed 分岐の else 側に置かれていない')
})

test('駆動部: checksTotal === 0 の timeout は受理せず conflicting へ再判定する', () => {
  const idx = driverPart.indexOf("if (lastState === 'timeout' && m?.checksTotal === 0) {")
  assert.notEqual(idx, -1, 'checksTotal: 0 の timeout 拒否が見つからない')
  const body = driverPart.slice(idx, idx + 400)
  assert.ok(body.includes("lastState = 'conflicting'"), 'conflicting への再判定が行われていない')
  // 判定は lastState 確定の直後に置く（merged→ready 読み替え・救済判定より前）。
  const lastStateIdx = driverPart.indexOf("lastState = m == null ? 'agent-output-missing'")
  assert.ok(lastStateIdx >= 0 && lastStateIdx < idx, 'lastState 確定より前に判定が置かれている')
  assert.ok(idx < driverPart.indexOf("if (lastState === 'merged') {"), "merged 読み替えより後に判定が置かれている")
})

test('駆動部: push 直後の観測値は状態ファイルへ永続化される', () => {
  assert.ok(
    driverPart.includes('pushChecksStarted: prCreateChecksStarted, pushMergeable: prCreatePushMergeable'),
    'pr-create の観測値が updateState で永続化されていない',
  )
  assert.ok(
    driverPart.includes('pushChecksStarted: fixChecksStarted, pushMergeable: fixPushMergeable'),
    'fix の観測値が updateState で永続化されていない',
  )
})
