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
// マーカー行の行頭までを定義部として切り出す（マーカー行自体は含めない）。
const definitionPart = source.slice(0, source.lastIndexOf('\n', markerIndex))
const sliceDir = trackTmp(mkdtempSync(join(tmpdir(), 'implement-issue-tree-defs-')))
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

test('mergeExecutePrompt: 回復専用経路（allowMerge=false）はマージ実行コマンド形も検証スクリプトの起動も含まない', () => {
  const prompt = mergeExecutePrompt(item, impl, false, [])
  assert.ok(!prompt.includes(MERGE_COMMAND))
  assert.ok(!prompt.includes('--match-head-commit'))
  // G0（サーバー側強制の実測）は新規マージ経路専用の手順であり、回復専用経路には現れない。
  assert.ok(!prompt.includes('merge-gate.sh'))
  assert.ok(!prompt.includes('bypass_actors'))
  // 回復専用の宣言（マージ実行主体を名乗らない）。
  assert.ok(prompt.includes('gh pr merge）は一切行わない'))
})

// 第 6 弾（#603）: G0・チェック・未解決スレッド・mergeable・外部チェックの検証はプロンプトの gh / jq ではなくスクリプトが行う。
// 判定の中身（bypass_actors・integration_id・client-only など）は merge-gate-unit.test.mjs / merge-gate.test.mjs が検査する。
test('mergeExecutePrompt: 新規マージ経路（allowMerge=true）は検証スクリプトの起動とマージのコマンド形を含み、gh api / jq の検証手順を含まない', () => {
  const entries = [{ app: 'cursor', contexts: ['Cursor Bugbot'] }]
  const prompt = mergeExecutePrompt(item, impl, true, entries, '', 'noncex1')
  // 手順 3 のコマンド形（--match-head-commit による TOCTOU 防止付き squash merge）。
  assert.ok(prompt.includes(MERGE_COMMAND))
  // 手順 2 のスクリプト起動（run-verified.sh 経由・nonce・PR・base・外部チェックの宣言）。
  assert.match(prompt, /bash '[^']+\/scripts\/run-verified\.sh' \S+ merge-gate\.sh --nonce noncex1 --pr 123 --base \S+ --external '\[\{"app":"cursor","contexts":\["Cursor Bugbot"\]\}\]'/)
  // ok 以外は verdict をそのまま reason にして辞退し、ok のときだけ payload.headSha でマージへ進む。
  assert.ok(prompt.includes('payload.verdict が ok 以外ならマージせず'))
  assert.ok(prompt.includes('ok のときだけ手順 3 へ進む'))
  assert.ok(prompt.includes('payload.headSha'))
  // 検証の手順（旧 2b〜4b）は文面から消えている。
  for (const gone of ['bypass_actors', 'required_review_thread_resolution', 'rules/branches', 'integration_id', '--slurp', 'reviewThreads', 'APP_ID_', 'gh pr checks --json state']) {
    assert.ok(!prompt.includes(gone), `${gone} がプロンプトに残っている`)
  }
  // 権限境界: スクリプト以外の gh api / jq による検証の代替を禁じる。
  assert.ok(prompt.includes('gh api・jq・GraphQL を自分で実行して代替・追加しない'))
})

test('mergeExecutePrompt: 期待 HEAD sha（opt-in ゲートの確認値）は --expect-sha としてコマンドに束縛され、無ければ付かない', () => {
  const SHA = 'c'.repeat(40)
  assert.ok(mergeExecutePrompt(item, impl, true, [], SHA, 'n1').includes(`--expect-sha ${SHA}`))
  assert.ok(!mergeExecutePrompt(item, impl, true, [], '', 'n1').includes('--expect-sha'))
  assert.throws(() => mergeExecutePrompt(item, impl, true, [], 'not-a-sha', 'n1'), /expect-sha/)
})

test('G0 は strict 適用を要件にしない（並列ランを止めるため意図的な非要件）', () => {
  // 回帰テスト: strict_required_status_checks_policy を G0 の合格条件に戻すと、
  // 1 件マージするたびに他の open PR の base が陳腐化し、parallel >= 2 のランが
  // 収束しなくなる（全 PR が BLOCKED のまま相互に進めない）。第 6 弾以降は判定をスクリプトが持つので、
  // スクリプトと判定ライブラリのコード行（コメントを除く）が strict を読まないことで固定する。
  // 詳細: references/automerge-design.md「strict を G0 の要件にしない理由」節。
  for (const f of ['merge-gate.sh', join('lib', 'merge-gate-lib.sh')]) {
    const code = readFileSync(join(dirname(SCRIPT_PATH), f), 'utf8').split('\n').filter((l) => !/^\s*#/.test(l)).join('\n')
    assert.ok(!/strict/i.test(code), `${f} のコード行が strict に触れている`)
  }
  // 非要件であることはスクリプトの先頭コメントに残り、後続の読み手が「抜け漏れ」と誤読して復活させない。
  const header = readFileSync(join(dirname(SCRIPT_PATH), 'merge-gate.sh'), 'utf8')
  assert.ok(header.includes('strict_required_status_checks_policy は読まない'))
})

test('mergeExecutePrompt: 複数 App 宣言は --external の JSON 1 つにそのまま束縛され、context の引用符も壊れない', () => {
  const entries = [
    { app: 'cursor', contexts: ['Cursor Bugbot'] },
    { app: 'sonarqubecloud', contexts: ['SonarQubeCloud Code Analysis', "it's a 'quote' check"] },
    { app: 'my-check-app', contexts: ['my check'] },
  ]
  const prompt = mergeExecutePrompt(item, impl, true, entries, '', 'n1')
  const line = prompt.split('\n').find((l) => l.includes('merge-gate.sh'))
  // シェルの単一引用符（' は '\'' に置換）を戻して JSON を取り出す。
  const m = /--external ((?:'(?:[^']|'\\'')*')+)/.exec(line)
  assert.ok(m, line)
  const arg = m[1].slice(1, -1).replace(/'\\''/g, "'")
  assert.deepEqual(JSON.parse(arg), entries)
})

test('mergeExecutePrompt: externalChecks なし確定（[]）の新規マージ経路は --external を付けない', () => {
  const prompt = mergeExecutePrompt(item, impl, true, [], '', 'n1')
  assert.ok(!prompt.includes('--external'))
  assert.ok(prompt.includes(MERGE_COMMAND))
})

test('merge-gate.sh が返し得る verdict は、すべて merge-exec の返却 reason の enum に含まれる（ok を除く）', () => {
  // 正本は MERGE_EXEC_SCHEMA の enum。スクリプトが enum 外の語を返すと、ホストは reason を受理できず systemic failure になる。
  const text = readFileSync(join(dirname(SCRIPT_PATH), 'merge-gate.sh'), 'utf8')
  const verdicts = new Set([...text.matchAll(/\bstop ([a-z-]+) [a-z0-9-]+ [a-z0-9-]+/g)].map((m) => m[1]))
  assert.ok(verdicts.size >= 8, `stop の呼び出しから verdict を取り出せていない: ${[...verdicts].join(',')}`)
  for (const v of verdicts) assert.ok(v === 'ok' || MERGE_EXEC_VALID_REASONS.has(v), `${v} は reason の enum に無い`)
  for (const must of ['server-enforcement-missing', 'classic-unsupported', 'issuer-unbound', 'checks-not-green', 'unresolved-threads', 'not-mergeable', 'wrong-target', 'head-moved', 'external-review-missing', 'pr-closed']) {
    assert.ok(verdicts.has(must), `${must} を返す経路がスクリプトに無い`)
  }
})

// ---------------------------------------------------------------------------
// MERGE_EXEC_SCHEMA / MERGE_EXEC_VALID_REASONS（reason enum の契約）
// ---------------------------------------------------------------------------

test('MERGE_EXEC_SCHEMA.gate.payload は merge-gate.sh が常に出力する全キー（detail と件数 7 種を含む）を必須にする（転記漏れを StructuredOutput で弾く）', () => {
  const gate = MERGE_EXEC_SCHEMA.properties.gate
  assert.deepEqual([...gate.required].sort(), ['nonce', 'payload', 'sha256'])
  const req = [...gate.properties.payload.required].sort()
  assert.deepEqual(req, ['checks', 'clientOnly', 'detail', 'err', 'headSha', 'inputSha256', 'mode', 'notGreen', 'requiredTotal', 'stage', 'unbound', 'unissued', 'unresolved', 'verdict'])
  assert.deepEqual(req, Object.keys(gate.properties.payload.properties).sort(), '必須キーと定義済みキーが一致する')
  assert.ok(!MERGE_EXEC_SCHEMA.required.includes('gate'), 'gate 自体は任意（回復専用経路・辞退では不要）')
})

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

test('classifyMergeExecDispatch: agentOutputMissing=true は execReason を無視し agent-output-missing へ遷移する（Issue #465）', () => {
  // 第 3 引数 true は他の判定より優先される（execReason が有効値でも上書きする）。
  assert.deepEqual(classifyMergeExecDispatch('', 'unrecoverable', true), {
    lastState: 'agent-output-missing',
    lastBlockedReason: 'unrecoverable',
  })
  assert.deepEqual(classifyMergeExecDispatch('unresolved-threads', 'quality', true), {
    lastState: 'agent-output-missing',
    lastBlockedReason: 'quality',
  })
})

test('classifyMergeExecDispatch: agentOutputMissing 省略時は既定 false（後方互換）で従来どおり分類する', () => {
  assert.deepEqual(
    classifyMergeExecDispatch('unresolved-threads', 'unrecoverable'),
    { lastState: 'unresolved-comments', lastBlockedReason: 'unrecoverable' },
  )
  assert.deepEqual(
    classifyMergeExecDispatch('unresolved-threads', 'unrecoverable', false),
    { lastState: 'unresolved-comments', lastBlockedReason: 'unrecoverable' },
  )
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
