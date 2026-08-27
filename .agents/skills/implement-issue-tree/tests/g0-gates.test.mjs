// implement-issue-tree の自動マージゲート（G0）の決定的回帰テスト。
// 下流 rust-ai-library PR #456 codex P2「新しい自動マージゲートに決定的な回帰テストがない」への
// upstream 対応として、モデル出力に依存しない JS 純粋部分（引数パーサ・プロンプト契約・
// execReason 状態写像・reason enum）を node:test で検証する。
//
// 読み込み方式: 対象スクリプトは Workflow ハーネス専用文法（トップレベル return・注入グローバル
// args / agent / log / phase）を含むため module として丸ごと import できない。テストは
// __IMPLEMENT_ISSUE_TREE_DRIVER_START__ マーカーより上（セクション 1〜5 = 定義と決定的な引数
// パースのみ）を一時ファイルへ切り出して import する。マーカーより上に駆動部の副作用がない
// ことは、args 未注入でこの import 自体が成功することで検証される（駆動部が混入すれば
// agent / phase 等の未定義参照で必ず失敗する）。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const SCRIPT_PATH = join(
  dirname(fileURLToPath(import.meta.url)),
  '..', 'scripts', 'implement-issue-tree.js',
)
const DRIVER_MARKER = '__IMPLEMENT_ISSUE_TREE_DRIVER_START__'

const source = readFileSync(SCRIPT_PATH, 'utf8')
const markerIndex = source.indexOf(DRIVER_MARKER)
if (markerIndex < 0) {
  throw new Error(`テスト境界マーカー ${DRIVER_MARKER} が実装スクリプトに存在しない（削除・改名は回帰テストを無効化する）`)
}
// マーカー行の行頭までを定義部として切り出す（マーカー行自体は含めない）。
const definitionPart = source.slice(0, source.lastIndexOf('\n', markerIndex))
const sliceDir = mkdtempSync(join(tmpdir(), 'implement-issue-tree-defs-'))
const slicePath = join(sliceDir, 'implement-issue-tree-defs.mjs')
// 実装スクリプトは Workflow ランタイムの制約により `export const meta` 以外の top-level export を
// 持てない（他に export があると起動時に SyntaxError: Unexpected keyword 'export' となり
// スクリプト全体が実行不能になる）。そのため定義部は非 export のまま置き、テスト側で
// 切り出したスライスへ export 文を付与して module として読み込む。
const SLICE_EXPORTS = [
  'parseExternalChecks',
  'mergeExecutePrompt',
  'classifyMergeExecDispatch',
  'planForcedThreadRescan',
  'reconcileRescueRoundState',
  'MERGE_EXEC_SCHEMA',
  'MERGE_EXEC_VALID_REASONS',
  'implementPrompt',
  'fixPrompt',
  'recoverImplementPrompt',
  'monitorPrompt',
  'mergeVerifyPrompt',
  'FIX_SCHEMA',
]
// fixPrompt は boundaryNonce()（未信頼データの境界トークン生成）を内部で使う。本番では
// ensureBoundaryNonceSeed() が agent() 経由で乱数 seed を注入してから呼ばれるが、agent は
// このスライスに未注入のため、テスト専用の setter を同一モジュールスコープへ追記して
// 非 export の module-scope let（boundaryNonceSeed）へ疑似乱数値を直接注入する。
const TEST_ONLY_SETTER =
  'export function __setBoundaryNonceSeedForTest(v) { boundaryNonceSeed = v }\n'
writeFileSync(
  slicePath,
  `${definitionPart}\nexport { ${SLICE_EXPORTS.join(', ')} }\n${TEST_ONLY_SETTER}`,
)

// args 未注入の import。駆動部の副作用がマーカーより上に混入していればここで失敗する。
const mod = await import(pathToFileURL(slicePath).href)
const {
  parseExternalChecks,
  mergeExecutePrompt,
  classifyMergeExecDispatch,
  MERGE_EXEC_SCHEMA,
  MERGE_EXEC_VALID_REASONS,
  implementPrompt,
  fixPrompt,
  recoverImplementPrompt,
  monitorPrompt,
  mergeVerifyPrompt,
  FIX_SCHEMA,
} = mod

// mergeExecutePrompt へ渡す最小フィクスチャ（プロンプトは番号のみを参照する）。
const item = { number: 42 }
const impl = { prNumber: 123 }
// 新規マージ経路のコマンド形（手順 5）。この形の有無が「マージを出力するプロンプトか」の判定基準。
const MERGE_COMMAND = `gh pr merge ${impl.prNumber} --squash --delete-branch --match-head-commit`

// ---------------------------------------------------------------------------
// 構造ガード（マーカー境界と副作用なし import）
// ---------------------------------------------------------------------------

test('駆動部マーカーは 1 か所のみ存在し、定義部の import は副作用なく成功する', () => {
  // マーカーが複数あると切り出し位置が曖昧になるため 1 か所に固定する。
  assert.equal(source.split(DRIVER_MARKER).length - 1, 1)
  // import の成功自体は上の top-level await で検証済み。ここでは代表 export の存在を確認する。
  assert.equal(mod.meta.name, 'implement-issue-tree')
  assert.equal(typeof parseExternalChecks, 'function')
  assert.equal(typeof mergeExecutePrompt, 'function')
  assert.equal(typeof classifyMergeExecDispatch, 'function')
  // 副作用なしの検証は「args / agent / phase 未注入で top-level import が成功した」こと自体が
  // 担う（駆動コードが定義部へ混入すれば未定義参照で import が必ず失敗する。関数本体の中に
  // await agent(...) が現れるのは定義であって副作用ではないため、テキスト走査では判定しない）。
})

// ---------------------------------------------------------------------------
// parseExternalChecks（args.externalChecks の決定的パーサ）
// ---------------------------------------------------------------------------

test('parseExternalChecks: 未指定（undefined / null）は確定不能として undefined を返す', () => {
  assert.equal(parseExternalChecks(undefined), undefined)
  assert.equal(parseExternalChecks(null), undefined)
})

test('parseExternalChecks: [] は「外部チェックなし」の人間による確定として空配列を返す', () => {
  assert.deepEqual(parseExternalChecks([]), [])
})

test('parseExternalChecks: app + context（単数）を contexts 配列へ正規化する', () => {
  assert.deepEqual(parseExternalChecks([{ app: 'cursor', context: 'Cursor Bugbot' }]), [
    { app: 'cursor', contexts: ['Cursor Bugbot'] },
  ])
})

test('parseExternalChecks: app + contexts（複数）は重複排除して保持する', () => {
  assert.deepEqual(parseExternalChecks([{ app: 'sonarcloud', contexts: ['SonarCloud Code Analysis', 'SonarCloud Code Analysis', 'quality gate'] }]), [
    { app: 'sonarcloud', contexts: ['SonarCloud Code Analysis', 'quality gate'] },
  ])
})

test('parseExternalChecks: 同一 slug の分割宣言は contexts を統合する', () => {
  assert.deepEqual(
    parseExternalChecks([
      { app: 'cursor', context: 'Cursor Bugbot' },
      { app: 'cursor', contexts: ['Cursor Bugbot', 'other-check'] },
    ]),
    [{ app: 'cursor', contexts: ['Cursor Bugbot', 'other-check'] }],
  )
})

test('parseExternalChecks: 旧形式（slug のみ）は contexts: [] の fail-closed 入力として受理する', () => {
  // contexts: [] は externalChecksContextsConfirmed を満たさず、クライアント側自動マージを開かない。
  assert.deepEqual(parseExternalChecks(['cursor']), [{ app: 'cursor', contexts: [] }])
})

test('parseExternalChecks: 形式不正はフォールバックせず throw する（fail-closed）', () => {
  // 非配列
  assert.throws(() => parseExternalChecks('cursor'), /配列で指定/)
  // 不正 slug（大文字・記号・39 文字超）
  assert.throws(() => parseExternalChecks([{ app: 'Cursor!', context: 'x' }]), /App slug/)
  assert.throws(() => parseExternalChecks([{ app: 'a'.repeat(40), context: 'x' }]), /App slug/)
  // context / contexts の同時指定（どちらを正とするか判別できない）
  assert.throws(
    () => parseExternalChecks([{ app: 'cursor', context: 'a', contexts: ['b'] }]),
    /同時指定しない/,
  )
  // context の形式不正（制御文字・前後空白・空文字）
  assert.throws(() => parseExternalChecks([{ app: 'cursor', context: 'a\nb' }]), /context/)
  assert.throws(() => parseExternalChecks([{ app: 'cursor', context: ' padded ' }]), /context/)
  assert.throws(() => parseExternalChecks([{ app: 'cursor', context: '' }]), /context/)
  // contexts が文字列配列でない
  assert.throws(() => parseExternalChecks([{ app: 'cursor', contexts: 'a' }]), /文字列配列/)
  // 要素の型不正
  assert.throws(() => parseExternalChecks([42]), /旧形式の slug 文字列/)
  // 要素数上限（fail-closed の DoS ガード）
  assert.throws(() => parseExternalChecks(Array.from({ length: 11 }, (_, i) => `app-${i}`)), /要素数が多すぎる/)
})

// ---------------------------------------------------------------------------
// mergeExecutePrompt（マージ実行プロンプトの契約）
// ---------------------------------------------------------------------------

test('mergeExecutePrompt: allowMerge=true かつ contexts 空の宣言が混入したら throw する（多層防御ガード）', () => {
  assert.throws(
    () => mergeExecutePrompt(item, impl, true, [{ app: 'cursor', contexts: [] }]),
    /externalChecksContextsConfirmed/,
  )
  // 回復専用経路（allowMerge=false）は新規マージを出力しないため、同じ入力でも throw しない。
  assert.doesNotThrow(() => mergeExecutePrompt(item, impl, false, [{ app: 'cursor', contexts: [] }]))
})

test('mergeExecutePrompt: 回復専用経路（allowMerge=false）はマージ実行コマンド形を一切含まない', () => {
  const prompt = mergeExecutePrompt(item, impl, false, [])
  assert.ok(!prompt.includes(MERGE_COMMAND))
  assert.ok(!prompt.includes('--match-head-commit'))
  // G0（サーバー側強制の実測）は新規マージ経路専用の手順であり、回復専用経路には現れない。
  assert.ok(!prompt.includes('bypass_actors'))
  // 回復専用の宣言（マージ実行主体を名乗らない）。
  assert.ok(prompt.includes('gh pr merge）は一切行わない'))
})

test('mergeExecutePrompt: 新規マージ経路（allowMerge=true）は G0 の全判定記述とコマンド形を含む', () => {
  const entries = [{ app: 'cursor', contexts: ['Cursor Bugbot'] }]
  const prompt = mergeExecutePrompt(item, impl, true, entries)
  // 手順 5 のコマンド形（--match-head-commit による TOCTOU 防止付き squash merge）。
  assert.ok(prompt.includes(MERGE_COMMAND))
  // (i-b) ruleset の bypass 不能性（bypass_actors 空 + Repository ソース）。
  assert.ok(prompt.includes('bypass_actors'))
  assert.ok(prompt.includes('"Repository"'))
  // (iii) レビュースレッド解消のサーバー側強制。
  assert.ok(prompt.includes('required_review_thread_resolution'))
  // (iv) 宣言 context + App ID（integration_id）の組による required 化の照合。
  // App ID は App ごとに一意な変数（APP_ID_<SLUG>）で束縛される（共有 $APP_ID は使わない）。
  assert.ok(prompt.includes('(iv)'))
  assert.ok(prompt.includes(`APP_ID_CURSOR=$(gh api "apps/cursor" --jq '.id')`))
  assert.ok(prompt.includes('--argjson appid "$APP_ID_CURSOR"'))
  assert.ok(!prompt.includes('--argjson appid "$APP_ID"'))
  assert.ok(prompt.includes(`--arg ctx 'Cursor Bugbot'`))
  // (v) client-only チェックの検出（required に含まれない check-run / commit status の件数照合）。
  assert.ok(prompt.includes('(v)'))
  assert.ok(prompt.includes('client-only'))
  // (v-b) required checks の発行元束縛（integration_id の数値必須 + App 発行 check-run の存在）。
  assert.ok(prompt.includes('(v-b)'))
  assert.ok(prompt.includes('integration_id'))
})

test('mergeExecutePrompt: G0 は strict 適用を要件にしない（並列ランを止めるため意図的な非要件）', () => {
  // 回帰テスト: strict_required_status_checks_policy を G0 の合格条件に戻すと、
  // 1 件マージするたびに他の open PR の base が陳腐化し、parallel >= 2 のランが
  // 収束しなくなる（全 PR が BLOCKED のまま相互に進めない）。
  // strict は鮮度制御であって bypass 不能性の制御ではないため、要件から外しても
  // 「サーバーが同条件で拒否する」という G0 の主張は成立する。
  // 詳細: references/automerge-design.md「strict を G0 の要件にしない理由」節。
  const prompt = mergeExecutePrompt(item, impl, true, [{ app: 'cursor', contexts: ['Cursor Bugbot'] }])
  // jq の合格判定（`... == true`）としては現れないこと。非要件である旨の記述は残るため、
  // 識別子そのものの不在ではなく「真偽比較による判定」の不在を検査する。
  assert.ok(!prompt.includes('strict_required_status_checks_policy == true'))
  assert.ok(!prompt.includes('strict_required_status_checks_policy=true'))
  // 非要件であることが明示され、後続の読み手が「抜け漏れ」と誤読して復活させないこと。
  assert.ok(prompt.includes('(i-c)'))
  assert.ok(prompt.includes('意図的な非要件'))
  // 不合格理由の列挙からも strict が消えていること（存在しないゲート名を summary に書かせない）。
  assert.ok(!prompt.includes('(i-c) の strict 適用なし'))
})

test('mergeExecutePrompt: 複数 App 宣言時は G0 (iv) が App ごとに slug と APP_ID 取得を対で出力する', () => {
  // 回帰テスト（下流 rust-ai-library PR #456 Bugbot Medium）: 全 context が共有 $APP_ID に
  // 束縛されると、後続 App の context が先行 App の APP_ID と照合されて正しい ruleset でも
  // fail する。App ごとに「slug での取得 → その App 専用変数での照合」が対で現れること。
  const prompt = mergeExecutePrompt(item, impl, true, [
    { app: 'cursor', contexts: ['Cursor Bugbot'] },
    { app: 'sonarqubecloud', contexts: ['SonarQubeCloud Code Analysis', 'quality gate'] },
  ])
  // App ごとの取得コマンドが slug とセットでインライン出力される。
  assert.ok(prompt.includes(`APP_ID_CURSOR=$(gh api "apps/cursor" --jq '.id')`))
  assert.ok(prompt.includes(`APP_ID_SONARQUBECLOUD=$(gh api "apps/sonarqubecloud" --jq '.id')`))
  // 各 context の照合コマンドが自 App の変数のみを参照する（他 App の変数と混線しない）。
  const cursorLine = prompt.split('\n').find((l) => l.includes(`--arg ctx 'Cursor Bugbot'`))
  assert.ok(cursorLine.includes('--argjson appid "$APP_ID_CURSOR"'))
  for (const ctx of ['SonarQubeCloud Code Analysis', 'quality gate']) {
    const line = prompt.split('\n').find((l) => l.includes(`--arg ctx '${ctx}'`))
    assert.ok(line.includes('--argjson appid "$APP_ID_SONARQUBECLOUD"'))
    assert.ok(!line.includes('$APP_ID_CURSOR'))
  }
  // 共有変数 $APP_ID（後続 App が先行 App の値を引きずる形）はどこにも現れない。
  assert.ok(!prompt.includes('--argjson appid "$APP_ID"'))
  // slug にハイフンを含む App も一意な変数名（ハイフン→アンダースコア）で束縛される。
  const hyphenPrompt = mergeExecutePrompt(item, impl, true, [
    { app: 'my-check-app', contexts: ['my check'] },
  ])
  assert.ok(hyphenPrompt.includes(`APP_ID_MY_CHECK_APP=$(gh api "apps/my-check-app" --jq '.id')`))
  assert.ok(hyphenPrompt.includes('--argjson appid "$APP_ID_MY_CHECK_APP"'))
})

test('mergeExecutePrompt: G0 の辞退 reason 名は返却スキーマの enum と一致した形でプロンプトに現れる', () => {
  const prompt = mergeExecutePrompt(item, impl, true, [{ app: 'cursor', contexts: ['Cursor Bugbot'] }])
  // reason 名の正本は MERGE_EXEC_SCHEMA の enum（共有定数）。テスト側の一覧は enum 所属を
  // 先に検証してから使い、literal の独立定義がドリフトしても検出できるようにする。
  for (const reason of ['server-enforcement-missing', 'classic-unsupported', 'issuer-unbound']) {
    assert.ok(MERGE_EXEC_VALID_REASONS.has(reason), `enum に ${reason} が存在すること`)
    assert.ok(prompt.includes(reason), `プロンプトに ${reason} が含まれること`)
  }
})

test('mergeExecutePrompt: externalChecks なし確定（[]）の新規マージ経路は外部チェック手順 4b を含まない', () => {
  const prompt = mergeExecutePrompt(item, impl, true, [])
  assert.ok(!prompt.includes('4b.'))
  // G0 のサーバー側強制（(i)〜(v-b)）自体は externalChecks の有無と無関係に要求される。
  assert.ok(prompt.includes('bypass_actors'))
  assert.ok(prompt.includes(MERGE_COMMAND))
})

// ---------------------------------------------------------------------------
// MERGE_EXEC_SCHEMA / MERGE_EXEC_VALID_REASONS（reason enum の契約）
// ---------------------------------------------------------------------------

test('MERGE_EXEC_VALID_REASONS は schema の reason enum と完全一致する（二重検証の同一性）', () => {
  const enumValues = MERGE_EXEC_SCHEMA.properties.reason.enum
  assert.equal(MERGE_EXEC_VALID_REASONS.size, enumValues.length)
  for (const reason of enumValues) assert.ok(MERGE_EXEC_VALID_REASONS.has(reason))
})

// ---------------------------------------------------------------------------
// classifyMergeExecDispatch（execReason → runMergeLoop 状態遷移の写像）
// ---------------------------------------------------------------------------

test('classifyMergeExecDispatch: G0 辞退系 reason は blocked + quality（再実行で回復可能）へ遷移する', () => {
  for (const reason of ['server-enforcement-missing', 'classic-unsupported', 'issuer-unbound', 'wrong-target', 'external-review-missing']) {
    assert.ok(MERGE_EXEC_VALID_REASONS.has(reason), `enum に ${reason} が存在すること`)
    assert.deepEqual(
      classifyMergeExecDispatch(reason, 'unrecoverable'),
      { lastState: 'blocked', lastBlockedReason: 'quality' },
      `reason ${reason} の遷移`,
    )
  }
})

test('classifyMergeExecDispatch: pr-closed は blocked + unrecoverable（再監視で回復し得ない）へ遷移する', () => {
  assert.deepEqual(classifyMergeExecDispatch('pr-closed', 'quality'), {
    lastState: 'blocked',
    lastBlockedReason: 'unrecoverable',
  })
})

test('classifyMergeExecDispatch: 一過性 reason は timeout（再監視）へ遷移し blockedReason を変えない', () => {
  for (const reason of ['head-moved', 'checks-not-green', 'merge-failed']) {
    assert.deepEqual(
      classifyMergeExecDispatch(reason, 'unrecoverable'),
      { lastState: 'timeout', lastBlockedReason: 'unrecoverable' },
      `reason ${reason} の遷移`,
    )
  }
})

test('classifyMergeExecDispatch: fix ループ系 reason は専用状態へ遷移し blockedReason を変えない', () => {
  assert.deepEqual(classifyMergeExecDispatch('unresolved-threads', 'unrecoverable'), {
    lastState: 'unresolved-comments',
    lastBlockedReason: 'unrecoverable',
  })
  // not-mergeable は fix ループ（needs-fix）ではなく base 取り込み専用の conflicting へ写像する
  // （Issue #441: fix 予算を消費しない base 取り込み経路へ回す）。
  assert.deepEqual(classifyMergeExecDispatch('not-mergeable', 'unrecoverable'), {
    lastState: 'conflicting',
    lastBlockedReason: 'unrecoverable',
  })
})

test('classifyMergeExecDispatch: enum 外・欠落 reason は invalid-monitor-result（systemic failure）へ fail-closed で遷移する', () => {
  for (const reason of ['', 'bogus-reason', undefined, null, 'MERGED']) {
    assert.deepEqual(
      classifyMergeExecDispatch(reason, 'unrecoverable'),
      { lastState: 'invalid-monitor-result', lastBlockedReason: 'unrecoverable' },
      `reason ${String(reason)} の遷移`,
    )
  }
})

// Workflow ランタイムがスクリプトを受理できるか（meta 以外の top-level export 禁止・
// サイズ上限）の起動可否契約は workflow-loadability.test.mjs へ集約した（Issue #277）。
// 判定ロジックの実装は lib/workflow-script-contract.mjs の単一箇所に置き、CI テストと
// 履歴実測 CLI（references/verification.md 参照）の双方がそれを使う。本ファイルでは
// パーステストを重複させない。

// ---------------------------------------------------------------------------
// commitlint 事前確認指示（Issue #290: scope にイシュー番号を置くと commitlint の
// scope-enum で必ず落ちる問題への対策）。実装コミット・fix コミット双方のプロンプトが
// 同じ確認手順を出力することを軽量に固定する回帰テスト。
// ---------------------------------------------------------------------------

const COMMITLINT_MARKERS = ['commitlint', 'scope-enum', 'scope にイシュー番号を置かない', 'Refs #']

test('implementPrompt: commitlint 事前確認の指示（scope にイシュー番号を置かない）を含む', () => {
  const prompt = implementPrompt(item, { steps: ['noop'] })
  for (const marker of COMMITLINT_MARKERS) {
    assert.ok(prompt.includes(marker), `implementPrompt に "${marker}" が含まれない`)
  }
})

test('recoverImplementPrompt: commitlint 事前確認の指示を含む', () => {
  const prompt = recoverImplementPrompt(item, { done: [], remaining: [], broken: [] }, 'fix/42-noop')
  for (const marker of COMMITLINT_MARKERS) {
    assert.ok(prompt.includes(marker), `recoverImplementPrompt に "${marker}" が含まれない`)
  }
})

// Bugbot（PR #436 追補）: pr-create は base 取り込みコミットを detached HEAD から push しローカル
// refs/heads を更新しないため、PR 作成失敗後の Recover → 回復 Implement が古いローカル tip を掴むと
// 次の pr-create が remote-ahead / diverged で再失敗しループする。checkout 後の ff 追従を固定する。
test('recoverImplementPrompt: 手順 2 で checkout 後にリモート tip へ ff-only 追従する', () => {
  const prompt = recoverImplementPrompt(item, { done: [], remaining: [], broken: [] }, 'fix/42-noop')
  const checkoutIdx = prompt.indexOf('git checkout "fix/42-noop"')
  const ffIdx = prompt.indexOf('git merge --ff-only refs/remotes/origin/')
  assert.ok(checkoutIdx >= 0, 'checkout 指示がない')
  assert.ok(ffIdx > checkoutIdx, 'checkout 後の git merge --ff-only refs/remotes/origin/<branch> 追従指示がない')
  assert.ok(prompt.includes('(iv) が fail-closed で止める'), 'ff 不能（真の diverged）を後続 pr-create の (iv) に委ねる旨がない')
})

test('implementPrompt: 0b-a で既存 open PR のブランチ取得後にリモート tip へ ff-only 追従する', () => {
  const prompt = implementPrompt(item, { steps: ['noop'] })
  const idx0ba = prompt.indexOf('0b-a.')
  const ffIdx = prompt.indexOf('git merge --ff-only "refs/remotes/origin/<branch>"')
  const idx0bb = prompt.indexOf('0b-b.')
  assert.ok(idx0ba >= 0 && idx0bb > idx0ba, '0b-a / 0b-b の記述が見つからない')
  assert.ok(ffIdx > idx0ba && ffIdx < idx0bb, '0b-a 内に git merge --ff-only "refs/remotes/origin/<branch>" の追従指示がない')
  // codex P0（PR #437）: headRefName は open PR 由来の未信頼値。ff 追従の前に isValidBranchName と
  // 同じ安全文字集合の検証と不適合時の fail-closed が現れ、fetch は -- とクォートで受け渡す。
  const validateIdx = prompt.indexOf('headRefName を 0b-b と同じ安全文字集合')
  assert.ok(validateIdx > idx0ba && validateIdx < ffIdx, '0b-a で headRefName の安全文字集合検証が ff 追従より前に現れない')
  const section0ba = prompt.slice(idx0ba, idx0bb)
  assert.ok(section0ba.includes('open PR の headRefName が安全文字集合に不適合'), 'headRefName 不適合時の fail-closed 理由文言がない')
  assert.ok(section0ba.includes('git fetch origin -- "<branch>:refs/remotes/origin/<branch>"'), 'ff 追従の fetch が -- とクォート付きで書かれていない')
})

test('fixPrompt: pushAfterFix の両分岐で commitlint 事前確認の指示を含む', () => {
  // fixPrompt は boundaryNonce() を内部で使うため、テスト専用 setter で seed を注入する
  // （本番では ensureBoundaryNonceSeed() がラン開始時に 1 回だけ行う）。
  mod.__setBoundaryNonceSeedForTest('a'.repeat(64))
  const finding = { summary: 'テスト用の指摘', unresolvedComments: [] }
  const implWithBranch = { ...impl, branch: 'fix/42-noop' }
  const pushPrompt = fixPrompt(item, implWithBranch, finding, true)
  const noPushPrompt = fixPrompt(item, implWithBranch, finding, false)
  for (const marker of COMMITLINT_MARKERS) {
    assert.ok(pushPrompt.includes(marker), `pushAfterFix=true の fixPrompt に "${marker}" が含まれない`)
    assert.ok(noPushPrompt.includes(marker), `pushAfterFix=false の fixPrompt に "${marker}" が含まれない`)
  }
})

// ---------------------------------------------------------------------------
// レビュースレッド resolve の実行主体（Issue #119 の全経路禁止からの方針転換の回帰テスト）
// resolve mutation を出力してよいのは Merge ループの fix（pushAfterFix=true）のみで、
// monitor / merge-exec / merge-verify / Review ループの fix には現れないことを固定する。
// ---------------------------------------------------------------------------

// resolveReviewThread mutation の指示行の有無が「resolve 実行主体か」の判定基準。
const RESOLVE_MUTATION_MARKER = 'resolveReviewThread'

test('fixPrompt: pushAfterFix=true はリモート head 反映済み前提の resolveReviewThread mutation 指示と resolvedThreadIds 報告を含む', () => {
  mod.__setBoundaryNonceSeedForTest('a'.repeat(64))
  const finding = { summary: 'テスト用の指摘', unresolvedComments: [{ threadId: 'PRRT_abc123', text: '指摘テキスト' }] }
  const prompt = fixPrompt(item, { ...impl, branch: 'fix/42-noop' }, finding, true)
  assert.ok(prompt.includes(RESOLVE_MUTATION_MARKER), 'pushAfterFix=true の fixPrompt に resolveReviewThread mutation の指示がない')
  assert.ok(
    prompt.includes(`gh api graphql -f query='mutation($tid:ID!){resolveReviewThread(input:{threadId:$tid}){thread{id isResolved}}}' -F tid=<threadId>`),
    'resolve mutation のコマンド形が期待どおりでない',
  )
  assert.ok(prompt.includes('resolvedThreadIds'), 'resolve 済み threadId の報告フィールド（resolvedThreadIds）の指示がない')
  // resolve の前提条件: (a) 今回 push 成功、または (b) ホストが決定的に算出した許可リスト
  // （resolveProof。Issue #430）。fix 自身の反映確認・一覧再取得での対象拡大は禁止する文言を
  // 固定する。詳細は resolve-pushed-head.test.mjs を参照。
  assert.ok(prompt.includes('許可リスト'), 'resolve (b) の許可リストに関する文言がない')
  assert.ok(prompt.includes('一覧の自前再取得での対象拡大は禁止'), 'resolve 対象の一覧限定（自前再取得の禁止）がない')
})

test('fixPrompt: pushAfterFix=false（Review ループ）は resolveReviewThread mutation を含まない', () => {
  mod.__setBoundaryNonceSeedForTest('a'.repeat(64))
  const finding = { summary: 'テスト用の指摘', unresolvedComments: [{ threadId: 'PRRT_abc123', text: '指摘テキスト' }] }
  const prompt = fixPrompt(item, { ...impl, branch: 'fix/42-noop' }, finding, false)
  assert.ok(!prompt.includes(RESOLVE_MUTATION_MARKER), 'push 前の Review ループ fix に resolve mutation の指示が混入している')
  assert.ok(!prompt.includes('resolvedThreadIds'), 'push 前の Review ループ fix に resolvedThreadIds の返却指示が混入している')
})

test('monitorPrompt / mergeExecutePrompt / mergeVerifyPrompt は resolve 実行指示を含まない（実行主体は fix のみ）', () => {
  const monitor = monitorPrompt(item, impl, [], true, true)
  const execAllow = mergeExecutePrompt(item, impl, true, [{ app: 'cursor', contexts: ['Cursor Bugbot'] }])
  const execRecover = mergeExecutePrompt(item, impl, false, [])
  const verify = mergeVerifyPrompt(item, impl)
  for (const [name, prompt] of [
    ['monitorPrompt', monitor],
    ['mergeExecutePrompt(allowMerge=true)', execAllow],
    ['mergeExecutePrompt(allowMerge=false)', execRecover],
    ['mergeVerifyPrompt', verify],
  ]) {
    assert.ok(!prompt.includes(RESOLVE_MUTATION_MARKER), `${name} に resolveReviewThread mutation の指示が混入している`)
  }
  // monitor / merge-verify には resolve 禁止の権限境界文言が残っていることも固定する。
  assert.ok(monitor.includes('resolve mutation は理由を問わず実行しない'), 'monitorPrompt の resolve 禁止文言がない')
  assert.ok(verify.includes('レビュースレッドの resolve も一切行わない'), 'mergeVerifyPrompt の resolve 禁止文言がない')
})

test('FIX_SCHEMA: resolvedThreadIds は maxItems 20・要素 maxLength 100 の string 配列として定義される', () => {
  const prop = FIX_SCHEMA.properties.resolvedThreadIds
  assert.ok(prop, 'FIX_SCHEMA に resolvedThreadIds がない')
  assert.equal(prop.type, 'array')
  assert.equal(prop.maxItems, 20)
  assert.equal(prop.items.type, 'string')
  assert.equal(prop.items.maxLength, 100)
  // resolve 報告は任意フィールド（Review ループの fix は返さない）のため required に含めない。
  assert.ok(!FIX_SCHEMA.required.includes('resolvedThreadIds'))
})
