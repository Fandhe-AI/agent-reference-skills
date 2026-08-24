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
const definitionPart = source.slice(0, source.lastIndexOf('\n', markerIndex))
const sliceDir = mkdtempSync(join(tmpdir(), 'implement-issue-tree-conflict-gate-'))
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

const item = { number: 435, title: 'テストイシュー' }
const impl = { prNumber: 777, branch: 'fix/435-conflict-gate' }

test('構造ガード: マーカーは 1 か所のみ存在し、対象 3 関数が import できる', () => {
  assert.equal(source.split(DRIVER_MARKER).length - 1, 1)
  assert.equal(typeof prCreatePrompt, 'function')
  assert.equal(typeof fixPrompt, 'function')
  assert.equal(typeof monitorPrompt, 'function')
})

test('prCreatePrompt: push 前 base 最新化ゲートが git push より前に現れ、push は detached HEAD を直接指定する', () => {
  const prompt = prCreatePrompt(item, impl, [])
  const fetchIdx = prompt.indexOf('refs/remotes/origin/')
  const mergeIdx = prompt.indexOf('git merge --no-edit')
  const abortIdx = prompt.indexOf('git merge --abort')
  const pushIdx = prompt.indexOf('git push origin HEAD:refs/heads/')
  assert.ok(fetchIdx >= 0, 'base fetch（保存先明示 refspec）の指示がない')
  assert.ok(mergeIdx >= 0, 'git merge --no-edit の指示がない')
  assert.ok(abortIdx >= 0, '解消不能時の git merge --abort 指示がない')
  assert.ok(pushIdx >= 0, 'git push origin HEAD:refs/heads/<branch> 形式の push 指示がない（ローカルブランチ ref 未更新のまま push origin <branch> すると手順 0 の変更が失われる）')
  assert.ok(fetchIdx < pushIdx, 'base fetch が git push より前に現れない')
  assert.ok(mergeIdx < pushIdx, 'git merge が git push より前に現れない')
  assert.ok(prompt.includes('prNumber: 0'), '解消不能時に prNumber: 0 を返す指示がない')
  // git branch -f はブランチが別 worktree で checkout 済みの場合に失敗し得るため、実行対象
  // コマンドとしては使わない方針（手順 0 は detached HEAD のまま作業し、手順 1 は
  // HEAD:refs/heads/<branch> で直接 push する）。実行コマンド行に登場しないことを確認する
  // （「使わない理由」の説明文中に語として現れるのは許容する）。
  const pushLine = prompt.split('\n').find((l) => l.includes('git push origin HEAD:refs/heads/'))
  assert.ok(pushLine && !pushLine.includes('git branch -f'), 'push 行自体が git branch -f に依存している')
})

test('base fetch の非ゼロ終了時は merge も push もせず fail-closed 終端する（prCreate / fix 両経路）', () => {
  // codex P1（PR #436 discussion_r3837960807）の回帰テスト: base 最新化ゲートが
  // git fetch origin <base>:refs/remotes/origin/<base> の成功確認を指示しないと、通信・認証・
  // refspec エラー時に以前の処理が残した stale な origin/<base> を merge したまま push でき、
  // 「必ず最新 base を取り込む」ゲート自体を迂回できる。両経路に終了コード確認と fail-closed
  // 終端（prCreate は prNumber: 0、fix は pushed: false）の明記があることを固定する。
  const prPrompt = prCreatePrompt(item, impl, [])
  const prFetchIdx = prPrompt.indexOf('base fetch の終了コードを必ず確認し')
  assert.ok(prFetchIdx >= 0, 'prCreatePrompt に base fetch の終了コード確認の指示がない')
  const prSection = prPrompt.slice(prFetchIdx, prFetchIdx + 400)
  assert.ok(
    prSection.includes('merge も push も行わず prNumber: 0') && prSection.includes('base fetch 失敗'),
    'prCreatePrompt の base fetch 失敗時に merge/push せず prNumber: 0 で終端する指示がない',
  )
  assert.ok(
    prSection.includes('stale な origin/'),
    'prCreatePrompt に stale な base ref の merge によるゲート迂回の根拠明記がない',
  )

  mod.__setBoundaryNonceSeedForTest('a'.repeat(64))
  const finding = { summary: 'テスト用の指摘', unresolvedComments: [] }
  const fixPromptText = fixPrompt(item, impl, finding, true)
  const fixFetchIdx = fixPromptText.indexOf('base fetch の終了コードを必ず確認し')
  assert.ok(fixFetchIdx >= 0, 'fixPrompt に base fetch の終了コード確認の指示がない')
  const fixSection = fixPromptText.slice(fixFetchIdx, fixFetchIdx + 400)
  assert.ok(
    fixSection.includes('merge も push も行わず') && fixSection.includes('pushed: false') && fixSection.includes('base fetch 失敗'),
    'fixPrompt の base fetch 失敗時に merge/push せず pushed: false で終端する指示がない',
  )
  assert.ok(
    fixSection.includes('stale な origin/'),
    'fixPrompt に stale な base ref の merge によるゲート迂回の根拠明記がない',
  )
})

test('prCreatePrompt: 起点決定は 4 分岐（初回/remote ahead/local ahead/diverged）で local-ahead を diverged 扱いしない', () => {
  // Bugbot High 1 巡目（PR #436 discussion_r3837843354）+ 2 巡目（discussion_r3837878036）の
  // 回帰テスト: prCreatePrompt はローカル refs/heads/<branch> を意図的に更新しないため、
  // 初回 push 成功後の再入でローカル起点からマージコミットを再作成すると non-fast-forward で
  // push が拒否される（1 巡目 → remote-ahead はリモート tip 起点で継続）。一方、片方向の
  // ancestor 判定だけだと、既存 PR 再利用 + implement/Review の新規コミットで local ahead に
  // なった通常の回復フローまで diverged 扱いで終端し、push・PR 作成が永久に回復しない
  // （2 巡目 → 双方向判定の 4 分岐）。
  const prompt = prCreatePrompt(item, impl, [])
  const branch = impl.branch
  assert.ok(
    prompt.includes(`git fetch origin ${branch}:refs/remotes/origin/${branch}`),
    '起点決定のためのリモート branch fetch（保存先明示 refspec）の指示がない',
  )
  // (i) 初回: リモート branch 不在 → ローカル起点。
  assert.ok(
    prompt.includes(' が存在しない（fetch がその旨で失敗する）場合は初回実行なのでローカル起点'),
    '初回実行（リモート branch なし）でローカル起点へフォールバックする指示がない',
  )
  // (ii) 同一 sha のみ継続（取り込む差分が存在せず安全）。
  assert.ok(
    prompt.includes('両 tip が同一 sha') && prompt.includes('取り込む差分が存在せず'),
    '同一 sha のみ継続する（差分ゼロで安全）分岐の明記がない',
  )
  assert.ok(
    prompt.includes(`git checkout --detach refs/remotes/origin/${branch}`),
    '同一 sha で継続する際の detached HEAD checkout 指示がない',
  )
  // (ii-b) 真の remote ahead は fail-closed（codex P0 3 巡目 discussion_r3837883767）:
  // 「ローカル tip がリモート tip の ancestor」は第三者・別ランの fast-forward push でも成立し、
  // pr-create 単体では自己 push と区別不能。リモート起点を採用すると未レビューの第三者コミットを
  // 保持したまま base merge・push し、autoMerge opt-in ではそのままマージされ得る。
  assert.ok(
    prompt.includes(`git merge-base --is-ancestor refs/heads/${branch} refs/remotes/origin/${branch}`),
    'remote-ahead 判定（ローカル tip がリモート tip の ancestor）の確認指示がない',
  )
  const remoteAheadIdx = prompt.indexOf('真の ancestor = remote ahead')
  assert.ok(remoteAheadIdx >= 0, '真の remote-ahead（同一 sha を除く）の分岐記述がない')
  const remoteAheadSection = prompt.slice(remoteAheadIdx, remoteAheadIdx + 900)
  assert.ok(
    remoteAheadSection.includes('fail-closed'),
    '真の remote-ahead を fail-closed にする指示がない',
  )
  assert.ok(
    remoteAheadSection.includes('第三者・別ラン') && remoteAheadSection.includes('区別できない'),
    '自己 push と第三者 fast-forward push が観測上区別不能である根拠の明記がない',
  )
  assert.ok(
    remoteAheadSection.includes('リモートコミットを黙って採用してはならない'),
    '未レビューのリモートコミットを黙って取り込まない旨の明記がない',
  )
  assert.ok(
    remoteAheadSection.includes('remote-ahead: 自己の過去 push か第三者 push か判別不能'),
    'remote-ahead 終端時の理由文言（prNumber: 0 と併記）がない',
  )
  assert.ok(
    remoteAheadSection.includes('0b-a') && remoteAheadSection.includes('0b-b'),
    '回復経路（次回ランの impl 手順 0b-a / 0b-b）の明記がない',
  )
  assert.ok(
    !prompt.includes('既存のマージコミットの上から継続する。(iii)'),
    '旧文言（真の remote-ahead でもリモート起点で継続）が残っている',
  )
  // (iii) local ahead（既存 PR 再利用 + 新規コミットの通常回復フロー）: ローカル起点で継続。
  assert.ok(
    prompt.includes(`git merge-base --is-ancestor refs/remotes/origin/${branch} refs/heads/${branch}`),
    'local-ahead 判定（リモート tip がローカル tip の ancestor）の逆向き確認指示がない（片方向判定のみだと local ahead が diverged 扱いされ回復不能になる）',
  )
  const localAheadIdx = prompt.indexOf('local ahead')
  assert.ok(localAheadIdx >= 0, 'local ahead 分岐の記述がない')
  const localAheadSection = prompt.slice(localAheadIdx, localAheadIdx + 400)
  assert.ok(
    localAheadSection.includes('ローカル起点') && localAheadSection.includes('fast-forward になる'),
    'local ahead をローカル起点で継続する（push は fast-forward）指示がない',
  )
  assert.ok(
    localAheadSection.includes('diverged 扱いして終端してはならない'),
    'local ahead を diverged 扱いしない旨の明記がない',
  )
  // (iv) 真の diverged（双方向とも ancestor 不成立）のみ fail-closed。
  const divergedIdx = prompt.indexOf('どちらの向きの ancestor 関係も成立しない（真の diverged')
  assert.ok(divergedIdx >= 0, '真の diverged（双方向とも不成立の場合のみ）の分岐条件の記述がない')
  const divergedSection = prompt.slice(divergedIdx, divergedIdx + 400)
  assert.ok(
    divergedSection.includes('merge も push もせず prNumber: 0'),
    'diverged 時に push せず prNumber: 0 で返す fail-closed の指示がない',
  )
  assert.ok(
    divergedSection.includes('第三者の変更を取り込んではならない'),
    'リモート sha を無条件に信頼しない（第三者 push 非取り込み）根拠の明記がない',
  )
})

test('fixPrompt(pushAfterFix: true): push 行の前に必須 base merge 指示があり、コミット前に位置する', () => {
  mod.__setBoundaryNonceSeedForTest('a'.repeat(64))
  const finding = { summary: 'テスト用の指摘', unresolvedComments: [] }
  const prompt = fixPrompt(item, impl, finding, true)
  const checkoutIdx = prompt.indexOf('git checkout --detach origin/')
  const mergeIdx = prompt.indexOf('git merge --no-edit')
  const abortIdx = prompt.indexOf('git merge --abort')
  const pushIdx = prompt.indexOf('git push origin HEAD:refs/heads/')
  assert.ok(checkoutIdx >= 0, 'detached HEAD 取得の指示がない')
  assert.ok(mergeIdx >= 0, '必須 base merge の指示がない')
  assert.ok(abortIdx >= 0, '解消不能時の git merge --abort 指示がない')
  assert.ok(pushIdx >= 0, 'push 行がない')
  // 修正作業（コミット）より前に base 取り込みが行われることを、checkout 直後・push よりずっと
  // 前に merge 指示が現れる位置関係で確認する（コミット後の abort は作業を失うため禁止 —
  // Issue #435 レビュー時の指摘）。
  assert.ok(checkoutIdx < mergeIdx, 'base merge が checkout より前に現れている（順序異常）')
  assert.ok(mergeIdx < pushIdx, 'base merge が push より後に現れている')
  assert.ok(prompt.includes('push 前 base 最新化ゲート（必須）'), 'base 取り込みが必須実行である旨のゲート文言がない')
  // git branch -f への依存を除去した回帰確認: 手順 4 は HEAD:refs/heads/<branch> で push する
  // ため、手順 0〜1 の間でローカルブランチ ref を更新する必要はない（別 worktree checkout 済み
  // 時の git branch -f 失敗を避ける設計。プレフィックス確認で pushAfterFix=false 側の
  // 「コミット後に git branch -f」文言との誤マッチを避ける）。
  assert.ok(!prompt.slice(0, pushIdx).includes('git branch -f'), 'base merge ゲートに不要な git branch -f への依存が残っている')
})

test('fixPrompt(pushAfterFix: true): base merge のみで解消した場合も push を省略しない指示を含む', () => {
  mod.__setBoundaryNonceSeedForTest('a'.repeat(64))
  const finding = { summary: 'mergeable: CONFLICTING（実測値）。base 取り込みとコンフリクト解消が必要。', unresolvedComments: [] }
  const prompt = fixPrompt(item, impl, finding, true)
  assert.ok(
    prompt.includes('この push を省略すると'),
    'base merge のみで完了した場合に push を省略してはならない旨の指示がない（省略すると detached HEAD の解消作業が worktree 破棄で失われる）',
  )
})

test('fixPrompt(pushAfterFix: true): 空振り push は pushed: false とし resolve を禁止する（ls-remote 前後比較）', () => {
  // codex P0（PR #436 discussion_r3837626582）の回帰テスト: git push は積むものが無くても
  // Everything up-to-date で成功終了するため、「push コマンドの成功」を pushed: true の根拠に
  // すると、変更なしの空振り push だけで手順 5 (a) の resolve が解禁され
  // required_review_thread_resolution ゲートの不当解除になる。push 前後の ls-remote 比較で
  // 実 push を確認し、進んでいなければ pushed: false（resolve 禁止）へ倒す契約を固定する。
  mod.__setBoundaryNonceSeedForTest('a'.repeat(64))
  const finding = { summary: 'テスト用の指摘', unresolvedComments: [] }
  const prompt = fixPrompt(item, impl, finding, true)
  const preLsRemoteIdx = prompt.indexOf(`push 直前のリモート head を git ls-remote origin refs/heads/${impl.branch} で取得して控える`)
  const pushIdx = prompt.indexOf('git push origin HEAD:refs/heads/')
  assert.ok(preLsRemoteIdx >= 0, 'push 前に ls-remote でリモート head を控える指示がない')
  assert.ok(pushIdx >= 0, 'push 行がない')
  assert.ok(preLsRemoteIdx < pushIdx, 'ls-remote の事前取得が push より後に現れている')
  assert.ok(
    prompt.includes('push 後にもう一度 git ls-remote origin refs/heads/'),
    'push 後の ls-remote 再取得（前後比較）の指示がない',
  )
  // codex P0 3 巡目（PR #436 discussion_r3837787753）の回帰確認: 「前後で sha が変化した」を
  // 根拠にすると、並行 push 競合（自 push 拒否 + 他者更新）でも sha が変化して resolve が
  // 解禁される。pushed: true は変化比較ではなく自ローカル HEAD との一致比較 2 条件
  // （(i) 事前 sha ≠ ローカル HEAD = 新規コミットの存在、(ii) 事後 sha == ローカル HEAD =
  // 自己反映の直接証明）でのみ成立する契約を固定する。
  assert.ok(
    prompt.includes('pushed: true としてよいのは次の 2 条件を両方満たす場合のみ'),
    'pushed: true が 2 条件判定（新規コミット存在 + 自ローカル HEAD 一致）に限定されていない',
  )
  assert.ok(
    prompt.includes('push 前に控えた sha ≠ ローカル HEAD'),
    '条件 (i)（事前 sha ≠ ローカル HEAD = 空振り push の検出）の明記がない',
  )
  assert.ok(
    prompt.includes('push 後の ls-remote sha == ローカル HEAD'),
    '条件 (ii)（事後 sha == ローカル HEAD = 自己反映の直接証明）の明記がない',
  )
  assert.ok(
    prompt.includes('push 前後で sha が「変化した」ことを根拠にしてはならない'),
    '変化ベース判定の禁止（並行 push 競合での誤認遮断）の明記がない',
  )
  assert.ok(
    prompt.includes('並行 push 競合とみなし pushed: false'),
    '条件 (ii) 不一致（並行 push 競合）を pushed: false へ倒す指示がない',
  )
  assert.ok(
    !prompt.includes('sha が進んだ場合のみ実 push ありとして pushed: true とする'),
    '変化ベース（sha が進んだら pushed: true）の旧判定文言が残っている',
  )
  assert.ok(
    prompt.includes('push コマンドが成功していても pushed: false として返し、手順 5 の resolve を一切実行しない'),
    '空振り push（Everything up-to-date）を pushed: false・resolve 禁止へ倒す指示がない',
  )
  // Bugbot Medium（PR #436 discussion_r3837782458）の回帰確認: 事前 ls-remote の失敗で push を
  // スキップすると detached HEAD 上の fix・base 取り込みコミットが worktree 破棄で失われる。
  // push の実行（作業保全・必ず行う）と pushed: true の判定（前後比較で確認できた場合のみ）を
  // 分離し、比較不能時は push 済みのまま pushed: false へ倒す契約を固定する。
  assert.ok(
    prompt.includes('取得に失敗しても push を中止しない'),
    '事前 ls-remote 失敗時にも push を実行する（作業保全）指示がない',
  )
  assert.ok(
    !prompt.includes('取得失敗時は push せず'),
    '事前 ls-remote 失敗で push をスキップする旧指示が残っている（detached HEAD 上の作業が失われる）',
  )
  assert.ok(
    prompt.includes('push 前・push 後いずれかの ls-remote に失敗して判定ができない場合も、push 自体は実行済みのまま pushed: false へ倒す'),
    '判定不能時の fail-closed（push は実行済み・pushed: false）の指示がない',
  )
  // 手順 5 (a) 側も「push コマンド成功」「sha の変化」ではなく 2 条件判定を resolve 許可条件にする。
  assert.ok(
    prompt.includes('push 後の ls-remote sha が自ローカル HEAD と一致）で pushed: true と確認できた場合のみ'),
    '手順 5 (a) の resolve 許可条件が 2 条件判定（自ローカル HEAD 一致）に限定されていない',
  )
})

test('fixPrompt(pushAfterFix: false): push 行も必須 base merge ゲートの文言も含まない（既存契約の維持）', () => {
  mod.__setBoundaryNonceSeedForTest('a'.repeat(64))
  const finding = { summary: 'テスト用の指摘', unresolvedComments: [] }
  const prompt = fixPrompt(item, impl, finding, false)
  assert.ok(!prompt.includes('git push origin HEAD:refs/heads/'), 'push しない Review ループに push 指示が混入している')
  assert.ok(!prompt.includes('push 前 base 最新化ゲート（必須）'), 'push しない Review ループに push 前必須ゲートの文言が混入している')
})

test('monitorPrompt: 手順 1 の取得フィールドに mergeable が含まれる', () => {
  const prompt = monitorPrompt(item, impl, [], true, true)
  assert.ok(prompt.includes('--json state,headRefOid,mergeable'), '手順 1 の --json に mergeable が含まれない')
})

test('monitorPrompt: CONFLICTING を検出したら state: OPEN 限定で needs-fix へルーティングし、UNKNOWN を CONFLICTING と扱わない', () => {
  const prompt = monitorPrompt(item, impl, [], true, true)
  assert.ok(prompt.includes('CONFLICTING'), 'CONFLICTING 判定の記述がない')
  assert.ok(prompt.includes('state が OPEN の場合のみ判定する'), 'OPEN 限定の判定条件がない（MERGED/CLOSED との混線防止）')
  assert.ok(prompt.includes('needs-fix'), 'CONFLICTING 検出時の needs-fix ルーティングがない')
  assert.ok(
    prompt.includes('UNKNOWN を CONFLICTING と扱って fix 予算を空費しない'),
    'UNKNOWN を CONFLICTING と誤判定しない旨の指示がない',
  )
})

test('monitorPrompt: 手順 3e（チェック総数 0 件）が blocked へ進む前に mergeable を再確認する', () => {
  const prompt = monitorPrompt(item, impl, [], true, true)
  const idxE = prompt.indexOf('チェック総数が 0 件の場合は green とみなさず')
  assert.ok(idxE >= 0, '手順 3e の記述が見つからない')
  const sectionE = prompt.slice(idxE, idxE + 2400)
  assert.ok(sectionE.includes('mergeable'), '手順 3e に mergeable 再確認の指示がない')
  assert.ok(sectionE.includes('CONFLICTING の可能性'), '手順 3e の summary 例に CONFLICTING の可能性の言及がない')
})

test('monitorPrompt: 手順 1c の UNKNOWN リトライ途中で CONFLICTING に確定した場合も needs-fix 経路へ回す', () => {
  // Bugbot Medium 3 巡目（PR #436 discussion_r3837954196）の回帰テスト: 手順 1c の UNKNOWN
  // リトライは state 変化しか書いておらず、リトライ途中で mergeable が CONFLICTING に確定した
  // ケースの needs-fix 経路が欠落していた（3e には明示があり「1c と同じ扱い」の相互参照とも
  // 食い違う）。作成直後に base が動く並列ランでコンフリクト検出が遅れたり通常フローへ落ちる
  // 余地を塞ぎ、1c / 3e の文言整合を固定する。
  const prompt = monitorPrompt(item, impl, [], true, true)
  const idx1c = prompt.indexOf('1c. state が OPEN の場合のみ判定する')
  assert.ok(idx1c >= 0, '手順 1c の記述が見つからない')
  // 手順 1c の範囲は次の手順（2.）の直前まで。1c 内の文言だけを検査する。
  const idx2 = prompt.indexOf('2. gh pr checks', idx1c)
  assert.ok(idx2 > idx1c, '手順 2 の開始位置を特定できない')
  const section1c = prompt.slice(idx1c, idx2)
  assert.ok(
    section1c.includes('state と mergeable の両方を確認する'),
    '手順 1c の UNKNOWN リトライが state 変化しか確認していない（mergeable の再判定が欠落）',
  )
  const midConflictIdx = section1c.indexOf('リトライの途中で state が OPEN のまま mergeable が "CONFLICTING" に確定した場合')
  assert.ok(midConflictIdx >= 0, '手順 1c にリトライ途中の CONFLICTING 確定ケースの終端動作が未規定')
  const afterMidConflict = section1c.slice(midConflictIdx)
  assert.ok(afterMidConflict.includes('needs-fix'), '手順 1c のリトライ途中 CONFLICTING 確定が needs-fix 経路へ回されない')
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
  const sectionE = prompt.slice(idxE, idxE + 2400)
  const waitIdx = sectionE.indexOf('最大 10 分待って再確認する')
  const rematchIdx = sectionE.indexOf('もう一度実行して mergeable を再判定する')
  const blockedIdx = sectionE.indexOf('state: blocked / blockedReason: "quality"')
  assert.ok(waitIdx >= 0, '手順 3e に最大 10 分待機の指示がない')
  assert.ok(rematchIdx >= 0, '待機後に mergeable を再判定する指示がない（待機前の判定だけでは待機中の CONFLICTING 変化を取りこぼす）')
  assert.ok(blockedIdx >= 0, '手順 3e に blocked 終端の指示がない')
  assert.ok(waitIdx < rematchIdx, 'mergeable 再判定が待機指示より前にしか現れない（待機後の再判定になっていない）')
  assert.ok(rematchIdx < blockedIdx, 'mergeable 再判定が blocked 結論より後に現れている（blocked へ倒す前に再判定する順序になっていない）')
  assert.ok(sectionE.includes('待機前の判定結果を流用しない'), '待機前の判定結果を流用しない旨の指示がない')
  // UNKNOWN の扱いは手順 1c と同じ上限（30 秒 x 最大 3 回）に揃える。
  const unknownIdx = sectionE.indexOf('手順 1c と同じ扱いで 30 秒程度あけて最大 3 回再取得')
  assert.ok(unknownIdx >= 0, '待機後再判定の UNKNOWN の扱いが手順 1c と揃っていない')
  assert.ok(unknownIdx > rematchIdx && unknownIdx < blockedIdx, 'UNKNOWN の扱いが再判定〜blocked の間に現れない')
})

test('monitorPrompt: 手順 3e の UNKNOWN リトライ途中で CONFLICTING に確定した場合も needs-fix 経路へ回す', () => {
  // Cursor Bugbot Medium 2 巡目（PR #436 discussion_r3837621385）の回帰テスト: 待機後再判定の
  // UNKNOWN リトライ分岐に「途中で CONFLICTING に確定した場合」の終端動作が未規定だと、この
  // 修正が狙う経路そのもの（兄弟 PR マージ直後の base 移動）が needs-fix に乗らず blocked /
  // stall し得る。リトライ分岐内に CONFLICTING 確定 → needs-fix の明記があることを固定する。
  const prompt = monitorPrompt(item, impl, [], true, true)
  const idxE = prompt.indexOf('チェック総数が 0 件の場合は green とみなさず')
  assert.ok(idxE >= 0, '手順 3e の記述が見つからない')
  const sectionE = prompt.slice(idxE, idxE + 2400)
  const unknownIdx = sectionE.indexOf('手順 1c と同じ扱いで 30 秒程度あけて最大 3 回再取得')
  const blockedIdx = sectionE.indexOf('state: blocked / blockedReason: "quality"')
  assert.ok(unknownIdx >= 0 && blockedIdx >= 0, '手順 3e の UNKNOWN リトライ / blocked 終端の記述が見つからない')
  const retryBranch = sectionE.slice(unknownIdx, blockedIdx)
  const midConflictIdx = retryBranch.indexOf('リトライの途中で state が OPEN のまま mergeable が "CONFLICTING" に確定した場合')
  assert.ok(midConflictIdx >= 0, 'UNKNOWN リトライ途中の CONFLICTING 確定ケースの終端動作が未規定')
  const afterMidConflict = retryBranch.slice(midConflictIdx)
  assert.ok(afterMidConflict.includes('needs-fix'), 'リトライ途中の CONFLICTING 確定が needs-fix 経路へ回されない')
  assert.ok(afterMidConflict.includes('reviewThreads 走査'), 'リトライ途中の CONFLICTING 確定経路に reviewThreads 走査（unresolvedComments 収集）の指示がない')
})
