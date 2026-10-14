// Issue #435 の回帰テスト: 作成時点から base とコンフリクトした PR が CI 未起動のまま
// blocked 終端し自動回復しないバグへの対応。push 前の base 最新化ゲート（prCreatePrompt /
// fixPrompt(pushAfterFix: true)）と、monitor の mergeable: CONFLICTING 検出ルーティング
// （monitorPrompt）をプロンプト契約として固定する。
//
// 読み込み方式は skills/implement-issue-tree/tests/g0-gates.test.mjs と同じ: 対象スクリプトは
// Workflow ハーネス専用文法（トップレベル return・注入グローバル args / agent / log / phase）を
// 含むため module として丸ごと import できない。__IMPLEMENT_ISSUE_TREE_DRIVER_START__ マーカー
// より上（定義部のみ）を一時ファイルへ切り出し、対象関数へ export を付与して import する。
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
const sliceDir = trackTmp(mkdtempSync(join(tmpdir(), 'implement-issue-tree-conflict-gate-')))
const slicePath = join(sliceDir, 'implement-issue-tree-defs.mjs')
const SLICE_EXPORTS = ['prCreatePrompt', 'fixPrompt', 'monitorPrompt']
// fixPrompt は boundaryNonce() を内部で使う。本番では ensureBoundaryNonceSeed() が agent()
// 経由で乱数 seed を注入してから呼ばれるが、agent はこのスライスに未注入のため、テスト専用の
// setter を同一モジュールスコープへ追記して非 export の module-scope let（boundaryNonceSeed）
// へ疑似乱数値を直接注入する（g0-gates.test.mjs と同一パターン）。
const TEST_ONLY_SETTER =
  'export function __setBoundaryNonceSeedForTest(v) { boundaryNonceSeed = v }\n'
writeFileSync(
  slicePath,
  `${definitionPart}\nexport { ${SLICE_EXPORTS.join(', ')} }\n${TEST_ONLY_SETTER}`,
)

const mod = await import(pathToFileURL(slicePath).href)
const { prCreatePrompt, fixPrompt, monitorPrompt } = mod
// prCreatePrompt の push 後確認コマンドが nonce（boundaryNonce）を使うため、seed を注入しておく
mod.__setBoundaryNonceSeedForTest('a'.repeat(64))

const item = { number: 435, title: 'テストイシュー' }
const impl = { prNumber: 777, branch: 'fix/435-conflict-gate' }

test('構造ガード: マーカーは 1 か所のみ存在し、対象 3 関数が import できる', () => {
  assert.equal(source.split(DRIVER_MARKER).length - 1, 1)
  assert.equal(typeof prCreatePrompt, 'function')
  assert.equal(typeof fixPrompt, 'function')
  assert.equal(typeof monitorPrompt, 'function')
})

// --- push 前 base 最新化ゲート（Issue #435）: 手順はスクリプトへ移った（Issue #603 第 4 弾） ---
// 旧テストは prCreatePrompt / fixPrompt の文章（base fetch の終了コード確認・起点の 4 分岐・差分ゼロ・push 前後の ls-remote
// 二条件判定）を語句で固定していた。同じ意味は実行テストで固定している:
//   tests/pr-push.test.mjs      base-fetch-failed（stale な base を取り込まない）・起点 3 種と remote-ahead / diverged / local-missing の中止・
//                               conflict の途中残し・hook-rejected・no-diff・push の 1 形・push-failed / unverified（実 git）
//   tests/pr-push-unit.test.mjs pp_decide_origin の 4 分岐の表（local ahead を diverged 扱いしない）
//   tests/push-verify.test.mjs  pushed になる二条件（前 sha ≠ HEAD かつ後 sha == HEAD）
// ここはホスト側の配線（プロンプトがスクリプトを正しい順序と失敗の返し方で呼ぶこと）だけを固定する。
const finding = { summary: 'テスト用の指摘', unresolvedComments: [] }

test('prCreatePrompt: 手順 0（prepare）は push（手順 1）より前にあり、失敗は merge も push もせず prNumber: 0 で終端する', () => {
  const prompt = prCreatePrompt(item, impl, [])
  const prepareIdx = prompt.indexOf('--mode prepare --origin pr-create')
  const pushIdx = prompt.indexOf('--mode push --origin pr-create')
  assert.ok(prepareIdx >= 0 && pushIdx >= 0 && prepareIdx < pushIdx, 'prepare が push より前に現れない')
  assert.ok(prompt.includes('0. 起点の確立と push 前 base 最新化ゲート'))
  // 失敗の status は列挙され、先へ進めず prNumber: 0 で返す（fail-closed。コンフリクトのまま・base 未取り込みのまま push しない）
  const list = 'routing-error・dirty-worktree・base-fetch-failed・branch-fetch-failed・local-missing・remote-ahead・diverged・checkout-failed・sha-mismatch・no-own-commits・merge-failed・error'
  assert.ok(prompt.includes(`それ以外の status（${list}）は先へ進めず`), '中止する status の列挙がない')
  assert.ok(prompt.includes('コンフリクトのまま・base 未取り込みのまま push してはならない'))
  assert.ok(prompt.includes('prNumber: 0 で返す'))
  // 手順 1 の push は detached HEAD の内容を HEAD:refs/heads/<branch> の 1 形で送る（スクリプトの固定。ローカルの refs/heads/ は更新しない）
  assert.ok(prompt.includes(`push は detached HEAD の内容を HEAD:refs/heads/${impl.branch} へ送る 1 形`))
})

test('fixPrompt(pushAfterFix: true): 手順 1 の prepare が修正作業（手順 2）より前にあり、失敗は commitFailed: true で終端する', () => {
  mod.__setBoundaryNonceSeedForTest('a'.repeat(64))
  const prompt = fixPrompt(item, impl, finding, true)
  const prepareIdx = prompt.indexOf('--mode prepare --origin fix')
  const fixWorkIdx = prompt.indexOf('2. 指摘を重要度を問わずすべて修正する')
  const pushIdx = prompt.indexOf('--mode push --origin fix')
  assert.ok(prepareIdx >= 0 && prepareIdx < fixWorkIdx && fixWorkIdx < pushIdx, 'prepare → 修正 → push の順序が崩れている')
  assert.ok(prompt.includes('push 前 base 最新化ゲート（必須。修正作業の前に実行する）'), 'base 取り込みが必須実行である旨のゲート文言がない')
  // 修正コミット未作成のためホストは commitFailed で失敗終端する。pushed: false だけでは no-push ラウンドとして消費される
  assert.ok(prompt.includes('pushed: false・commitFailed: true・routingError なしで返す'))
  assert.ok(prompt.includes('ホストは commitFailed で失敗終端する'))
  // git branch -f への依存を持たない（別 worktree で checkout 済みのブランチでも detach で取得する）
  assert.ok(!prompt.slice(0, pushIdx).includes('git branch -f'))
})

test('fixPrompt(pushAfterFix: true): base 取り込みだけの HEAD でも push を省略しない。pushed: true は status が pushed のときだけで、noop・race・unverified・push-failed では resolve しない', () => {
  mod.__setBoundaryNonceSeedForTest('a'.repeat(64))
  const prompt = fixPrompt(item, impl, { summary: 'mergeable: CONFLICTING（実測値）。base 取り込みとコンフリクト解消が必要。', unresolvedComments: [] }, true)
  assert.ok(prompt.includes('base 取り込みだけの HEAD でも必ず実行する'), 'push を省略しない旨がない（省略すると detached HEAD の解消作業が worktree 破棄で失われる）')
  assert.ok(prompt.includes('status が pushed のときだけ pushed: true'))
  for (const s of ['noop は pushed: false', 'race は pushed: false', 'unverified・push-failed は pushed: false']) assert.ok(prompt.includes(s), s)
  // 手順 5 (a) の resolve 許可条件は 2 条件判定（自ローカル HEAD との一致）で pushed: true と確認できた場合に限る
  assert.ok(prompt.includes('push 後の ls-remote sha が自ローカル HEAD と一致）で pushed: true と確認できた場合のみ'))
  assert.ok(!prompt.includes('sha が進んだ場合のみ実 push ありとして pushed: true とする'))
})

test('fixPrompt(pushAfterFix: false): push 行も必須 base merge ゲートの文言も含まない（既存契約の維持）', () => {
  mod.__setBoundaryNonceSeedForTest('a'.repeat(64))
  const prompt = fixPrompt(item, impl, finding, false)
  assert.ok(!prompt.includes('pr-push.sh'), 'push しない Review ループにスクリプト呼び出しが混入している')
  assert.ok(!prompt.includes('git push origin HEAD:refs/heads/'), 'push しない Review ループに push 指示が混入している')
  assert.ok(!prompt.includes('push 前 base 最新化ゲート（必須'), 'push しない Review ループに push 前必須ゲートの文言が混入している')
})

test('monitorPrompt: 手順 1 の取得フィールドに mergeable が含まれる', () => {
  const prompt = monitorPrompt(item, impl, [], true, true)
  // #603 第 2 弾: 手順 1 の gh pr view は observe-pr.sh --mode pr へ移った。--json の項目（state,headRefOid,mergeable,…）と語彙の
  // 検証は observe-pr.test.mjs の 'pr:' テスト群が固定する。ここでは手順 1 がスクリプトの mergeable を読むことを固定する。
  const idx1 = prompt.indexOf('\n1. ')
  const section1 = prompt.slice(idx1, prompt.indexOf('\n1c. ', idx1))
  assert.match(section1, /--mode pr --pr \d+ --base main --branch fix\/\S+ --issue \d+/, '手順 1 が観測スクリプトの pr モードを実行していない')
  assert.ok(section1.includes('payload の state・headSha・mergeable・bound'), '手順 1 が mergeable を payload から読んでいない')
})

test('monitorPrompt: CONFLICTING を検出したら state: OPEN 限定で conflicting へルーティングし、UNKNOWN を CONFLICTING と扱わない', () => {
  const prompt = monitorPrompt(item, impl, [], true, true)
  assert.ok(prompt.includes('CONFLICTING'), 'CONFLICTING 判定の記述がない')
  assert.ok(prompt.includes('state が OPEN の場合のみ判定する'), 'OPEN 限定の判定条件がない（MERGED/CLOSED との混線防止）')
  // Issue #441: CONFLICTING は品質問題ではないため fix 予算を消費しない conflicting へ回す
  // （needs-fix ではない）。
  assert.ok(prompt.includes('state: conflicting'), 'CONFLICTING 検出時の conflicting ルーティングがない')
  assert.ok(
    prompt.includes('UNKNOWN を CONFLICTING と扱って fix 予算を空費しない'),
    'UNKNOWN を CONFLICTING と誤判定しない旨の指示がない',
  )
})

test('monitorPrompt: 手順 3e（チェック総数 0 件）が blocked へ進む前に mergeable を再確認する', () => {
  const prompt = monitorPrompt(item, impl, [], true, true)
  const idxE = prompt.indexOf('チェック総数が 0 件の場合は green とみなさず')
  assert.ok(idxE >= 0, '手順 3e の記述が見つからない')
  const sectionE = prompt.slice(idxE, idxE + 3200)
  assert.ok(sectionE.includes('mergeable'), '手順 3e に mergeable 再確認の指示がない')
  assert.ok(sectionE.includes('CONFLICTING の可能性'), '手順 3e の summary 例に CONFLICTING の可能性の言及がない')
})

test('monitorPrompt: 手順 3e の待機前・待機後の各再取得で state が MERGED / CLOSED なら手順 1 の分岐に従い blocked/quality へ落とさない', () => {
  // Bugbot（PR #436 追補）: 3e は OPEN + CONFLICTING と UNKNOWN だけを特別扱いしていたため、
  // 再取得で MERGED / CLOSED になっていても「CONFLICTING でなければ blocked/quality」に落ちていた。
  // 各再取得の直後（待機・blocked 結論より前）に MERGED → ready / CLOSED → unrecoverable の
  // 分岐が現れることを位置関係で固定する。
  const prompt = monitorPrompt(item, impl, [], true, false)
  const idxE = prompt.indexOf('チェック総数が 0 件の場合は green とみなさず')
  assert.ok(idxE >= 0, '手順 3e の記述が見つからない')
  const sectionE = prompt.slice(idxE, idxE + 3200)
  const branchText = 'MERGED → 即 state: ready、CLOSED → state: blocked / blockedReason: "unrecoverable"'
  const firstFetchIdx = sectionE.indexOf('state と mergeable を再取得する')
  const waitIdx = sectionE.indexOf('最大 10 分待って再確認する')
  const rematchIdx = sectionE.indexOf('もう一度実行して mergeable を再判定する')
  const blockedIdx = sectionE.indexOf('state: blocked / blockedReason: "quality"')
  assert.ok(firstFetchIdx >= 0 && waitIdx >= 0 && rematchIdx >= 0 && blockedIdx >= 0, '3e の各節点が見つからない')
  const firstBranchIdx = sectionE.indexOf(branchText, firstFetchIdx)
  assert.ok(firstBranchIdx >= 0 && firstBranchIdx < waitIdx, '待機前の再取得直後に MERGED → ready / CLOSED → unrecoverable の分岐がない')
  const secondBranchIdx = sectionE.indexOf(branchText, rematchIdx)
  assert.ok(secondBranchIdx >= 0 && secondBranchIdx < blockedIdx, '待機後の再判定直後（blocked 結論より前）に MERGED → ready / CLOSED → unrecoverable の分岐がない')
  assert.ok(sectionE.includes('mergeable は MERGED / CLOSED では判定に使わない'), 'MERGED / CLOSED で mergeable を判定に使わない旨がない')
  assert.ok(sectionE.includes('この再判定でも state が OPEN かつ CONFLICTING でなければ state: blocked'), 'blocked/quality の結論が state: OPEN 限定になっていない')
})

// base merge の subject と失敗の返し方（pr-create / fix 共通の basePrepareInstruction）。マージ自体はスクリプトが行うが、commitlint に合わせた
// subject の決定とコンフリクトの解消はエージェントの判断として残る（検証権限を持つ経路だけ）
test('base merge の subject は固定 chore ではなく commitlint 設定から決め、hook 拒否は abort 済みの hook-rejected として subject を渡して再実行する（prCreate / fix 両経路）', () => {
  // Bugbot（PR #436 追補）: 固定 subject は type-enum / scope-enum を持つリポの commit-msg hook に拒否され得る。この第 3 状態を
  // 定義しないと、エージェントが失敗を無視して base 未取り込みの HEAD を push し得る。
  mod.__setBoundaryNonceSeedForTest('a'.repeat(64))
  for (const [label, prompt, failToken] of [
    ['prCreatePrompt', prCreatePrompt(item, impl, []), 'prNumber: 0'],
    ['fixPrompt', fixPrompt(item, impl, finding, true), 'pushed: false'],
  ]) {
    assert.ok(!prompt.includes('-m "chore:'), `${label}: 固定 subject の -m "chore: が残っている`)
    const lintIdx = prompt.indexOf('対象リポの commitlint 設定')
    assert.ok(lintIdx >= 0, `${label}: commitlint 設定を読む指示がない`)
    const section = prompt.slice(lintIdx - 200, lintIdx + 6200)
    assert.ok(section.includes('hook-rejected は abort 済み'), `${label}: hook-rejected の再実行手順がない`)
    assert.ok(section.includes('--subject-file <そのファイルの絶対パス>'), `${label}: subject をファイルで渡す指示がない`)
    assert.ok(section.includes('再実行でも hook-rejected なら'), `${label}: 再実行でも拒否されたときの終端がない`)
    assert.ok(section.includes('base merge コミット拒否'), `${label}: hook 拒否時の理由文言がない`)
    assert.ok(section.includes('--no-verify で強行せず'), `${label}: --no-verify 禁止の明記がない`)
    assert.ok(section.includes(failToken), `${label}: fail-closed の返却（${failToken}）が base merge 指示の近傍にない`)
  }
})

test('base merge 分岐 conflict の解消後コミットが hook に拒否された場合も git merge --abort で fail-closed する（prCreate / fix 両経路）', () => {
  // Bugbot（PR #437）: 解消後の git commit も pre-commit / commit-msg hook を通る。失敗時に abort 経路が無いと MERGE_HEAD 残存のまま
  // merge 前の HEAD を push でき、ゲートを迂回する。push モードも MERGE_HEAD が残っていれば merge-in-progress で止まる（実 git のテストで固定）
  mod.__setBoundaryNonceSeedForTest('a'.repeat(64))
  for (const [label, prompt] of [
    ['prCreatePrompt', prCreatePrompt(item, impl, [])],
    ['fixPrompt', fixPrompt(item, impl, finding, true)],
  ]) {
    const commitIdx = prompt.indexOf('git commit -F <そのファイル> で確定する')
    assert.ok(commitIdx >= 0, `${label}: 解消後の git commit -F の指示がない`)
    const section = prompt.slice(commitIdx, commitIdx + 300)
    assert.ok(section.includes('git merge --abort') && section.includes('base merge コミット拒否'), `${label}: 解消後コミットの hook 拒否時に git merge --abort + 「base merge コミット拒否」で fail-closed する指示が commit の直後にない`)
    assert.ok(section.includes('--no-verify で強行せず'), `${label}: 解消後コミットの --no-verify 禁止がない`)
  }
})

test('base merge の subject 決定は候補外 type-enum と scope-enum 無しの scope 必須リポでも決定的に定まる（prCreate / fix 両経路）', () => {
  // codex P1（PR #437）: type-enum: [feat, docs] のようなリポでは chore → build → ci → fix が全て不許可で type が決まらず、
  // scope-empty: never + scope-enum 無しでは scope が決まらない。どちらも hook 拒否 → fail-closed 停止になるため、フォールバック手順の明記を固定する。
  mod.__setBoundaryNonceSeedForTest('a'.repeat(64))
  for (const [label, prompt] of [
    ['prCreatePrompt', prCreatePrompt(item, impl, [])],
    ['fixPrompt', fixPrompt(item, impl, finding, true)],
  ]) {
    const lintIdx = prompt.indexOf('対象リポの commitlint 設定')
    assert.ok(lintIdx >= 0, `${label}: commitlint 読み取り指示がない`)
    const section = prompt.slice(lintIdx, lintIdx + 3600)
    assert.ok(section.includes('type-enum の列挙値を先頭から順に探索し'), `${label}: 候補 type が全て不許可のときの type-enum 列挙値順探索フォールバックがない`)
    assert.ok(section.includes('scope-enum が無い / never の場合に限り') && section.includes('直前の implement / fix コミットの scope（never の禁止値は除外）を再利用'), `${label}: scope-enum 無しで scope 必須のときの決定手順がない`)
    assert.ok(section.includes('base ブランチ名'), `${label}: 直前コミットにも scope が無いときの base ブランチ名フォールバックがない`)
  }
})

test('base merge の subject は安全文字集合で検証し、ファイル経由（--subject-file / git commit -F）で渡す（未信頼値のシェル再展開を禁止。prCreate / fix 両経路）', () => {
  // codex P0（PR #437）: type-enum / scope-enum / 直前コミットの scope は対象リポ由来の未信頼データであり、-m "<subject>" へ補間すると
  // $(...)・バッククォート・引用符でインジェクションになる。検証（正規表現 + 不適合 fail-closed）と受け渡し（ファイル）の両方を固定する。
  mod.__setBoundaryNonceSeedForTest('a'.repeat(64))
  for (const [label, prompt] of [
    ['prCreatePrompt', prCreatePrompt(item, impl, [])],
    ['fixPrompt', fixPrompt(item, impl, finding, true)],
  ]) {
    const lintIdx = prompt.indexOf('対象リポの commitlint 設定')
    assert.ok(lintIdx >= 0, `${label}: commitlint 読み取り指示がない`)
    const section = prompt.slice(lintIdx, lintIdx + 4200)
    assert.ok(section.includes('^[A-Za-z0-9_-]{1,64}$'), `${label}: type / scope の安全文字集合（正規表現）検証がない`)
    assert.ok(section.includes('不適合ならその候補を捨てて同じ連鎖内の次の候補へ進む'), `${label}: 不適合候補を捨てて同じ連鎖内の次へ進む指示がない`)
    assert.ok(section.includes('base merge subject の type/scope が安全文字集合に不適合'), `${label}: 最終候補も不適合なときの fail-closed 理由文言がない`)
    assert.ok(section.includes('Write ツール等でファイル内容として一時ファイルへ書き（シェルの引数にしない'), `${label}: ファイル経由の受け渡し指示がない`)
    assert.ok(!/git merge --no-edit -m|git commit -m/.test(section), `${label}: -m へのシェル文字列補間が実行コマンドとして残っている`)
  }
})

test('fixPrompt(pushAfterFix: true): base fetch 失敗・base merge の失敗返却は commitFailed: true を伴う（prCreate 経路は prNumber: 0 のまま）', () => {
  // codex P1（articles#52）+ Bugbot（baby-tasks-app#31 / actions#109 / pronunciation-vocab-app#25）: ホストは commitFailed だけで
  // 「コミット失敗」と「修正済みで push 不要」を区別する。base merge の失敗が pushed: false のみで返ると no-push ラウンドとして消費され
  // fail-closed 終端を通らない。
  mod.__setBoundaryNonceSeedForTest('a'.repeat(64))
  const prompt = fixPrompt(item, impl, finding, true)
  const failIdx = prompt.indexOf('を理由として pushed: false・commitFailed: true・routingError なしで返す')
  assert.ok(failIdx >= 0, 'base 取り込みの失敗返却に commitFailed: true がない')
  assert.ok(prompt.includes('ホストは commitFailed で失敗終端する'), 'commitFailed でホストが失敗終端する旨がない')
  assert.ok(!/pushed: false \/ routingError なしで/.test(prompt), '旧契約（pushed: false / routingError なしのみ）が残っている')
  const returnIdx = prompt.indexOf('返却: pushed / summary')
  assert.ok(returnIdx >= 0 && prompt.slice(returnIdx).includes('commitFailed（修正コミットを作成できなかった場合のみ true — base fetch 失敗・base merge の解消不能 / hook 拒否'), '返却行の commitFailed に base merge 失敗が含まれていない')
  // prCreate 経路は prNumber: 0 の既存契約のまま（commitFailed は FIX_SCHEMA 専用）
  const pr = prCreatePrompt(item, impl, [])
  assert.ok(pr.includes('prNumber: 0') && !pr.includes('commitFailed'), 'prCreate 経路に commitFailed が混入している')
})

test('monitorPrompt: 手順 1c の UNKNOWN リトライ途中で CONFLICTING に確定した場合も conflicting 経路へ回す', () => {
  // Bugbot Medium 3 巡目（PR #436 discussion_r3837954196）の回帰テスト: 手順 1c の UNKNOWN
  // リトライは state 変化しか書いておらず、リトライ途中で mergeable が CONFLICTING に確定した
  // ケースの needs-fix 経路が欠落していた（3e には明示があり「1c と同じ扱い」の相互参照とも
  // 食い違う）。作成直後に base が動く並列ランでコンフリクト検出が遅れたり通常フローへ落ちる
  // 余地を塞ぎ、1c / 3e の文言整合を固定する。
  const prompt = monitorPrompt(item, impl, [], true, true)
  const idx1c = prompt.indexOf('1c. state が OPEN の場合のみ判定する')
  assert.ok(idx1c >= 0, '手順 1c の記述が見つからない')
  // 手順 1c の範囲は次の手順（2.）の直前まで。1c 内の文言だけを検査する（手順 2 の冒頭は
  // Issue #479 で「--watch 前の check-run 総数取得」へ変わったため行頭の番号で位置決めする）。
  const idx2 = prompt.indexOf('\n2. ', idx1c)
  assert.ok(idx2 > idx1c, '手順 2 の開始位置を特定できない')
  const section1c = prompt.slice(idx1c, idx2)
  assert.ok(
    section1c.includes('state と mergeable の両方を確認する'),
    '手順 1c の UNKNOWN リトライが state 変化しか確認していない（mergeable の再判定が欠落）',
  )
  const midConflictIdx = section1c.indexOf('リトライの途中で state が OPEN のまま mergeable が "CONFLICTING" に確定した場合')
  assert.ok(midConflictIdx >= 0, '手順 1c にリトライ途中の CONFLICTING 確定ケースの終端動作が未規定')
  const afterMidConflict = section1c.slice(midConflictIdx)
  assert.ok(afterMidConflict.includes('state: conflicting'), '手順 1c のリトライ途中 CONFLICTING 確定が conflicting 経路へ回されない')
  assert.ok(afterMidConflict.includes('reviewThreads 走査'), '手順 1c のリトライ途中 CONFLICTING 確定経路に reviewThreads 走査の指示がない')
})

test('monitorPrompt: 手順 3e は 10 分待機の後にも mergeable を再判定してから blocked へ倒す', () => {
  // Cursor Bugbot Medium（PR #436 discussion_r3837612684）の回帰テスト: 待機前の 1 回だけの
  // mergeable 確認では、待機中に兄弟 PR のマージで CONFLICTING へ変化したケースが blocked へ
  // 落ちて Issue #435 の needs-fix 経路に乗らない。待機後の再判定指示が blocked 結論より前に
  // 現れることを位置関係で固定する。
  const prompt = monitorPrompt(item, impl, [], true, true)
  const idxE = prompt.indexOf('チェック総数が 0 件の場合は green とみなさず')
  assert.ok(idxE >= 0, '手順 3e の記述が見つからない')
  const sectionE = prompt.slice(idxE, idxE + 3200)
  const waitIdx = sectionE.indexOf('最大 10 分待って再確認する')
  const rematchIdx = sectionE.indexOf('もう一度実行して mergeable を再判定する')
  const blockedIdx = sectionE.indexOf('state: blocked / blockedReason: "quality"')
  assert.ok(waitIdx >= 0, '手順 3e に最大 10 分待機の指示がない')
  assert.ok(rematchIdx >= 0, '待機後に mergeable を再判定する指示がない（待機前の判定だけでは待機中の CONFLICTING 変化を取りこぼす）')
  assert.ok(blockedIdx >= 0, '手順 3e に blocked 終端の指示がない')
  assert.ok(waitIdx < rematchIdx, 'mergeable 再判定が待機指示より前にしか現れない（待機後の再判定になっていない）')
  assert.ok(rematchIdx < blockedIdx, 'mergeable 再判定が blocked 結論より後に現れている（blocked へ倒す前に再判定する順序になっていない）')
  assert.ok(sectionE.includes('待機前の判定結果を流用しない'), '待機前の判定結果を流用しない旨の指示がない')
  // UNKNOWN の扱いは手順 1c と同じ（待機つきの手順 1 のコマンド。25 秒間隔で最大 4 回観測）に揃える。
  const unknownIdx = sectionE.indexOf('手順 1c と同じ扱いで再取得し')
  assert.ok(unknownIdx >= 0, '待機後再判定の UNKNOWN の扱いが手順 1c と揃っていない')
  assert.ok(unknownIdx > rematchIdx && unknownIdx < blockedIdx, 'UNKNOWN の扱いが再判定〜blocked の間に現れない')
})

test('monitorPrompt: 手順 3e の UNKNOWN リトライ途中で CONFLICTING に確定した場合も conflicting 経路へ回す', () => {
  // Cursor Bugbot Medium 2 巡目（PR #436 discussion_r3837621385）の回帰テスト: 待機後再判定の
  // UNKNOWN リトライ分岐に「途中で CONFLICTING に確定した場合」の終端動作が未規定だと、この
  // 修正が狙う経路そのもの（兄弟 PR マージ直後の base 移動）が needs-fix に乗らず blocked /
  // stall し得る。リトライ分岐内に CONFLICTING 確定 → needs-fix の明記があることを固定する。
  const prompt = monitorPrompt(item, impl, [], true, true)
  const idxE = prompt.indexOf('チェック総数が 0 件の場合は green とみなさず')
  assert.ok(idxE >= 0, '手順 3e の記述が見つからない')
  const sectionE = prompt.slice(idxE, idxE + 3200)
  const unknownIdx = sectionE.indexOf('手順 1c と同じ扱いで再取得し')
  const blockedIdx = sectionE.indexOf('state: blocked / blockedReason: "quality"')
  assert.ok(unknownIdx >= 0 && blockedIdx >= 0, '手順 3e の UNKNOWN リトライ / blocked 終端の記述が見つからない')
  const retryBranch = sectionE.slice(unknownIdx, blockedIdx)
  const midConflictIdx = retryBranch.indexOf('リトライの途中で state が OPEN のまま mergeable が "CONFLICTING" に確定した場合')
  assert.ok(midConflictIdx >= 0, 'UNKNOWN リトライ途中の CONFLICTING 確定ケースの終端動作が未規定')
  const afterMidConflict = retryBranch.slice(midConflictIdx)
  assert.ok(afterMidConflict.includes('state: conflicting'), 'リトライ途中の CONFLICTING 確定が conflicting 経路へ回されない')
  assert.ok(afterMidConflict.includes('reviewThreads 走査'), 'リトライ途中の CONFLICTING 確定経路に reviewThreads 走査（unresolvedComments 収集）の指示がない')
})
