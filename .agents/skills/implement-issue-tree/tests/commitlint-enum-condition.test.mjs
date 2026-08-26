// articles#52（下流同期 PR）の codex P1 に対する回帰テスト: commitlint の rule tuple は
// [severity, when, value] であり、type-enum / scope-enum の列挙値は when が always なら許可リスト、
// never なら拒否リストになる。従来の手順は never を区別せず「候補が尽きたら type-enum 先頭へ
// フォールバック」「scope-enum から scope を選ぶ」としていたため、never 構成では明示的に禁止された
// 値を採用して commit-msg hook に拒否されていた。本テストは commitlintCheckInstruction と
// baseMergeInstruction の両方で、severity 0 の無視・always / never の解釈・never 列挙値への
// フォールバック禁止・never 全候補拒否時の fail-closed 終端が文言として固定されることを検証する。
//
// 読み込み方式は conflict-prepush-gate.test.mjs と同一: __IMPLEMENT_ISSUE_TREE_DRIVER_START__
// マーカーより上（定義部のみ）を一時ファイルへ切り出し、対象へ export を付与して import する。
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
const sliceDir = mkdtempSync(join(tmpdir(), 'implement-issue-tree-commitlint-enum-'))
const slicePath = join(sliceDir, 'implement-issue-tree-defs.mjs')
const SLICE_EXPORTS = ['baseMergeInstruction', 'commitlintCheckInstruction', 'FIX_SCHEMA', 'EPHEMERAL_KIND_MAX']
writeFileSync(slicePath, `${definitionPart}\nexport { ${SLICE_EXPORTS.join(', ')} }\n`)

const { baseMergeInstruction, commitlintCheckInstruction, FIX_SCHEMA, EPHEMERAL_KIND_MAX } = await import(pathToFileURL(slicePath).href)
// ホスト側（マーカーより下の driver 部）は import できないため、文字列として検査する。
const driverPart = source.slice(markerIndex)

const merge = baseMergeInstruction('main')

test('構造ガード: baseMergeInstruction / commitlintCheckInstruction が import できる', () => {
  assert.equal(typeof baseMergeInstruction, 'function')
  assert.equal(typeof commitlintCheckInstruction, 'string')
  assert.ok(merge.includes('origin/main'))
})

test('両指示: rule tuple [severity, when, value] の解釈（severity 0 無視・always は許可リスト・never は拒否リスト）を含む', () => {
  for (const [label, text] of [['commitlintCheckInstruction', commitlintCheckInstruction], ['baseMergeInstruction', merge]]) {
    assert.ok(text.includes('[severity, when, value]'), `${label}: rule tuple の解釈がない`)
    assert.ok(text.includes('severity 0 の rule は無視'), `${label}: severity 0（disabled）を無視する指示がない`)
    assert.ok(text.includes('always') && text.includes('許可リスト'), `${label}: always = 許可リストの明記がない`)
    assert.ok(text.includes('never') && text.includes('拒否リスト'), `${label}: never = 拒否リストの明記がない`)
    // never の列挙値を候補に使わない旨（許可リスト扱いの禁止）
    assert.ok(/never の列挙値(を候補にしない|へフォールバックしない)/.test(text), `${label}: never の列挙値を採用しない明記がない`)
    // extends 継承時にプリセット側 rule を同じ規則で読む
    assert.ok(text.includes('extends') && text.includes('プリセット側の rule'), `${label}: extends プリセットの rule 解釈がない`)
  }
})

test('baseMergeInstruction: always の列挙値フォールバックは先頭だけでなく安全な値を順に探索し、never 列挙値へはフォールバックしない', () => {
  // codex P1（PR #438 5 巡目）: 先頭要素だけへ落ちると ["@invalid", "custom"] のように先頭が
  // 安全文字集合に不適合でも後続に有効な許可値がある設定を誤って失敗終端する。
  const fallbackIdx = merge.indexOf('type-enum の列挙値を先頭から順に探索し、後述の正規表現を満たす最初の値へフォールバックする')
  assert.ok(fallbackIdx >= 0, 'always 時の列挙値順探索フォールバックがない')
  assert.ok(!merge.includes('type-enum の先頭要素へフォールバック'), '旧契約（先頭要素のみへのフォールバック）が残っている')
  assert.ok(merge.lastIndexOf('always で全候補が不許可なら', fallbackIdx) >= 0, 'フォールバックの前提が always に限定されていない')
  const after = merge.slice(fallbackIdx, fallbackIdx + 260)
  assert.ok(after.includes('先頭要素だけを見ない'), '先頭要素だけを見ない旨がない')
  assert.ok(after.includes('1 つも無ければ git merge を実行せず「base merge subject の type を commitlint 設定から決定できない」'), 'always で安全な列挙値が 1 つも無いときの fail-closed がない')
  assert.ok(after.includes('この列挙値探索は always に限る'), 'フォールバックが always 限定である旨の文言がない')
  assert.ok(after.includes('never の列挙値へフォールバックしない'), 'never の列挙値へフォールバックしない旨がない')
})

test('commitlintCheckInstruction: always で標準 type が 1 つも許可されなければ列挙値を順に探索し、無ければ fail-closed', () => {
  const text = commitlintCheckInstruction
  assert.ok(text.includes('always で標準 type が 1 つも許可されなければ、type-enum の列挙値を先頭から順に探索し ^[A-Za-z0-9_-]{1,64}$ を満たす最初のものを使う'), 'always 時の列挙値順探索がない')
  assert.ok(text.includes('先頭だけを見て諦めない'), '先頭だけで諦めない旨がない')
  assert.ok(text.includes('いずれでも決まらなければ type を決定できないとして下記の fail-closed 返却に従う'), '列挙値探索でも決まらない場合の fail-closed がない')
})

test('baseMergeInstruction: base ブランチ名由来の scope にも never の禁止値除外を適用し、該当すれば fail-closed', () => {
  // Bugbot Medium（PR #438 5 巡目）: 禁止値除外が直前コミットの scope にしか無く、ブランチ名由来
  // （main 等）は正規表現検証のみで禁止値がそのまま使われ得た。commitlintCheckInstruction と揃える。
  const idx = merge.indexOf('base ブランチ名の英数字以外を - に置換した文字列を使う（これも never の禁止値に該当すれば使わず')
  assert.ok(idx >= 0, 'ブランチ名由来 scope への禁止値除外がない')
  const section = merge.slice(idx, idx + 200)
  assert.ok(section.includes('git merge を実行せず「base merge subject の scope を commitlint 設定から決定できない」'), 'ブランチ名由来 scope が禁止値のときの fail-closed がない')
  assert.ok(commitlintCheckInstruction.includes('base ブランチ名の英数字以外を - に置換した値（同様に検証）'), 'commitlintCheckInstruction 側のブランチ名由来 scope 検証が残っていない')
})

test('baseMergeInstruction: never で全候補が拒否されたら列挙外候補 merge → sync を経て、それも拒否されたときだけ (c) と同じ終端へ倒す', () => {
  // codex P1（PR #438 3 巡目）: never で固定候補が全て列挙されていても列挙外の安全な type は
  // commitlint を通過できる。直ちに停止せず決定的な列挙外候補を試し、それも拒否されたときだけ停止する。
  const idx = merge.indexOf('never で全候補が拒否されたら列挙外の決定的候補 merge → sync の順で拒否リストに無く')
  assert.ok(idx >= 0, 'never 全候補拒否時の列挙外候補 merge → sync がない')
  const section = merge.slice(idx, idx + 260)
  assert.ok(section.includes('^[A-Za-z0-9_-]{1,64}$'), '列挙外候補の安全文字集合検証がない')
  const stopIdx = section.indexOf('それも拒否されたときだけ git merge を実行せず')
  assert.ok(stopIdx >= 0, '列挙外候補も拒否された場合に限る停止条件がない')
  const after = section.slice(stopIdx)
  assert.ok(after.includes('base merge subject の type を commitlint 設定から決定できない'), 'fail-closed の理由文言がない')
  assert.ok(after.includes('(c) と同じ終端へ倒す'), '(c) と同じ終端へ倒す旨がない')
  assert.ok(!merge.includes('never で全候補が拒否されたら git merge を実行せず'), '旧契約（never 全候補拒否で即停止）が残っている')
})

test('commitlintCheckInstruction: type は CC 標準 type から always / never で選び、never 全拒否なら change → update を経てから fail-closed', () => {
  const text = commitlintCheckInstruction
  assert.ok(text.includes('feat / fix / docs / refactor / perf / test / style / build / ci / chore / revert'), 'type 候補の列挙がない')
  assert.ok(text.includes('always なら列挙値に含まれる値、never なら列挙値に含まれない値'), 'always / never の許可定義がない')
  assert.ok(text.includes('never で全て拒否されたら change → update の順で拒否リストに無いものを使う'), 'never 全拒否時の列挙外候補 change → update がない')
  assert.ok(text.includes('いずれでも決まらなければ type を決定できないとして下記の fail-closed 返却に従う'), '列挙外候補も拒否された場合の fail-closed がない')
})

test('commitlintCheckInstruction: fail-closed 返却はホストが検出する既存形式（implement / recover は branch 空文字、fix は commitFailed: true）に結び付く', () => {
  // Bugbot Medium（PR #438 3 巡目）: ホストは summary の理由を読まない。Implement の成否は
  // impl.branch の有無、fix の成否は typeof pushed === 'boolean' のみで判定するため、
  // 「その経路の失敗返却形式に従う」だけでは失敗として検出されず続行してしまう。
  const text = commitlintCheckInstruction
  assert.ok(text.includes('summary の文言だけでは検出されない'), 'summary 文言では検出されない旨の明記がない')
  assert.ok(text.includes('implement / recover 経路は branch を空文字にし summary に理由を書く'), 'implement / recover の失敗返却形式（branch 空文字）がない')
  assert.ok(text.includes('fix 経路は pushed: false・commitFailed: true・summary に理由を書く'), 'fix の失敗返却形式（commitFailed: true）がない')
  // スキーマ側にシグナルが存在する
  assert.equal(FIX_SCHEMA.properties.commitFailed?.type, 'boolean', 'FIX_SCHEMA に commitFailed が無い')
  assert.ok(!FIX_SCHEMA.required.includes('commitFailed'), 'commitFailed は省略可でなければならない')
  // ホスト側: Review ループ・Merge ループの両 fix 呼び出し直後で commitFailed を失敗終端として扱う
  const reviewIdx = driverPart.indexOf('fReview.commitFailed === true')
  assert.ok(reviewIdx >= 0, 'Review ループの host が fReview.commitFailed を判定していない')
  const reviewSection = driverPart.slice(reviewIdx, reviewIdx + 900)
  assert.ok(reviewSection.includes("status: 'failed'") && reviewSection.includes('recordFailure') && reviewSection.includes('return false'), 'Review ループの commitFailed が failed 終端になっていない')
  const mergeIdx = driverPart.indexOf('f.commitFailed === true')
  assert.ok(mergeIdx >= 0, 'Merge ループの host が f.commitFailed を判定していない')
  const mergeSection = driverPart.slice(mergeIdx, mergeIdx + 500)
  assert.ok(mergeSection.includes('return await failMergeTerminal('), 'Merge ループの commitFailed が failMergeTerminal で終端していない')
  // いずれも fixCount++（成功扱い）より前に置かれている
  assert.ok(driverPart.indexOf('fixCount++', reviewIdx) > reviewIdx && driverPart.indexOf('fixCount++', mergeIdx) > mergeIdx)
})

test('baseMergeInstruction: type 候補は chore → build → ci → fix の後に Conventional Commits 標準 type へ続き、always / never の両条件で「許可される」を定義する', () => {
  assert.ok(merge.includes('chore → build → ci → fix → feat → docs → refactor → perf → test → style → revert'), '候補 type の順序が固定されていない')
  assert.ok(merge.includes('always なら列挙値に含まれる値、never なら列挙値に含まれない値'), 'always / never それぞれの「許可される」定義がない')
})

test('baseMergeInstruction: scope-empty は tuple 解釈（never = 必須・always = 禁止・severity 0 = 省略）、scope-enum never は禁止値を除いたフォールバック連鎖を使う', () => {
  assert.ok(merge.includes('scope-empty が [*, "never"]（scope 必須）の場合のみ付け'), 'scope-empty never = 必須の解釈がない')
  assert.ok(merge.includes('[*, "always"]（scope 禁止）・severity 0・未設定なら省略'), 'scope-empty always = 禁止 / 無効時省略の解釈がない')
  assert.ok(merge.includes('scope-enum が always なら後述の正規表現を満たす列挙値だけを順に探索し'), 'scope-enum always 時に安全な列挙値だけを探索する指示がない')
  assert.ok(merge.includes('base merge subject の scope を commitlint 設定から決定できない'), 'always で該当列挙値が無いときの fail-closed 理由文言がない')
  assert.ok(merge.includes('scope-enum が無い / never の場合に限り'), 'フォールバック連鎖が未設定 / never に限定されていない')
  assert.ok(merge.includes('直前の implement / fix コミットの scope（never の禁止値は除外）を再利用') && merge.includes('base ブランチ名'), '未設定 / never 時のフォールバック連鎖が残っていない')
})

test('両指示: scope-enum が always のとき直前コミット / base ブランチ名由来の scope へ落ちず、安全な列挙値が無ければ fail-closed', () => {
  // codex P1（PR #438 4 巡目）: always の列挙値が安全文字集合に不適合（例: @app/core のみ）のとき
  // 直前コミット / ブランチ名へ落ちると always の許可リスト外の値を採用して hook に拒否される。
  for (const [label, text, failText] of [
    ['commitlintCheckInstruction', commitlintCheckInstruction, 'scope を決定できないとして fail-closed にする'],
    ['baseMergeInstruction', merge, 'base merge subject の scope を commitlint 設定から決定できない'],
  ]) {
    assert.ok(text.includes('always の許可リストに含まれる保証が無いため使わない'), `${label}: always 時に直前コミット / ブランチ名由来を使わない旨がない`)
    assert.ok(text.includes(failText), `${label}: always で安全な列挙値が無いときの fail-closed がない`)
    // 探索対象は正規表現を満たす列挙値のみ（「次の候補へ」で連鎖をまたがない）
    assert.ok(!/不適合なら次の候補へ/.test(text), `${label}: 連鎖をまたぐ旧文言「不適合なら次の候補へ」が残っている`)
  }
  assert.ok(commitlintCheckInstruction.includes('scope-enum が未設定 / never の場合に限り'), 'commitlintCheckInstruction: フォールバック連鎖が未設定 / never に限定されていない')
  assert.ok(merge.includes('連鎖をまたいで直前コミット / ブランチ名へは落ちない'), 'baseMergeInstruction: 正規表現不適合時に連鎖をまたがない旨がない')
})

test('commitlintCheckInstruction: scope-empty を tuple 解釈し、scope 必須時は決定連鎖で値を決め、決定できなければ fail-closed でコミットしない', () => {
  // codex P1（PR #438 2 巡目）: 共通指示が scope-empty: [2, "never"]（scope 必須）を考慮せず
  // 「該当する scope が無ければ省略」としていたため、scope-enum 無しで scope 必須のリポでは
  // impl / recover / fix の各コミットが commit-msg hook に必ず拒否されていた。
  const text = commitlintCheckInstruction
  assert.ok(text.includes('scope-empty は [*, "never"]（severity > 0）なら scope 必須'), 'scope-empty never = 必須の解釈がない')
  assert.ok(text.includes('[*, "always"] なら scope 禁止（付けない）'), 'scope-empty always = 禁止の解釈がない')
  assert.ok(text.includes('severity 0・未設定なら任意（該当する scope が無ければ scope を省略する）'), 'severity 0 / 未設定 = 任意（無ければ省略）の解釈がない')
  const chainIdx = text.indexOf('scope 必須のときは')
  assert.ok(chainIdx >= 0, 'scope 必須時の決定連鎖がない')
  const chain = text.slice(chainIdx)
  const enumIdx = chain.indexOf('scope-enum が always なら ^[A-Za-z0-9_-]{1,64}$ を満たす列挙値だけを順に探索し')
  const prevIdx = chain.indexOf('直前コミットの scope（never の禁止値・上記正規表現に不適合な値は除外）')
  const branchIdx = chain.indexOf('base ブランチ名の英数字以外を - に置換した値')
  assert.ok(enumIdx >= 0 && prevIdx > enumIdx && branchIdx > prevIdx, '決定連鎖（scope-enum always は安全な列挙値のみ / 未設定 or never は直前コミットの scope → base ブランチ名）の順序が固定されていない')
  assert.ok(chain.includes('^[A-Za-z0-9_-]{1,64}$'), '安全文字集合の検証がない')
  assert.ok(chain.includes('決定できなければコミットせず'), '決定不能時にコミットしない指示がない')
  assert.ok(chain.includes('commitlint の scope-empty が scope を要求するが決定できない'), 'fail-closed の理由文言がない')
  assert.ok(text.includes('scope にイシュー番号を置かない'), '「scope にイシュー番号を置かない」が維持されていない')
})

test('host: commitFailed 終端は routingError と同じく fix worktree を台帳（recordEphemeralWorktree）へ記録してから終端する', () => {
  // Bugbot（articles#52）: commitFailed abort 経路が recordEphemeralWorktree を呼ばずに抜けると
  // 残留 worktree が台帳に載らず、fail-closed ディスクゲートの in-run 残留予測が過小になる。
  // kind は routingError と同じ fix-terminal（両者は排他的な即終端のため 1 イシュー最大 1 件）。
  assert.equal(EPHEMERAL_KIND_MAX['fix-terminal'], 1, 'EPHEMERAL_KIND_MAX に fix-terminal が宣言されていない')
  assert.ok(!('fix-routing-error' in EPHEMERAL_KIND_MAX), '旧 kind fix-routing-error が残っている')
  for (const [label, cond, path, terminal] of [
    ['Review ループ', 'fReview.commitFailed === true', "recordEphemeralWorktree(item.number, fReview?.worktreePath, 'fix-terminal')", "await updateState(item.number, { status: 'failed'"],
    ['Merge ループ', 'f.commitFailed === true', "recordEphemeralWorktree(item.number, f?.worktreePath, 'fix-terminal')", 'return await failMergeTerminal('],
  ]) {
    const condIdx = driverPart.indexOf(cond)
    assert.ok(condIdx >= 0, `${label}: commitFailed 判定がない`)
    const section = driverPart.slice(condIdx, condIdx + 900)
    const recIdx = section.indexOf(path)
    const termIdx = section.indexOf(terminal)
    assert.ok(recIdx >= 0, `${label}: commitFailed 終端で recordEphemeralWorktree が呼ばれていない`)
    assert.ok(termIdx > recIdx, `${label}: recordEphemeralWorktree が終端処理より後にある`)
    // routingError ハンドラも同じ kind・引数で記録している（両者の整合）
    const routingIdx = driverPart.lastIndexOf(path, condIdx)
    assert.ok(routingIdx >= 0 && routingIdx < condIdx, `${label}: routingError ハンドラ側の同一引数の記録がない`)
  }
})
