// メイン worktree 直下への一時ファイル残置事故（Issue #497）の回帰テスト。
//
// 背景: vector-db #861 ツリーのラン中、メイン worktree（リポジトリルート）直下に空ファイル
// `.lines`（0 バイト）が作られ、ラン終了後も残った。作成元は特定できていないが、
// measureResidualWorktreeBytesDetailed が `${tmpFile}.lines` という絶対パスのリテラルを
// プロンプト内に複数回書き下ろす構造を持ち、1 箇所でも写し間違えれば相対パス
// （カレント直下の `.lines`）へ化ける経路を持っていた（唯一 `.lines`（複数形）という
// ファイル名を生成する箇所）。本テストは、この経路の硬化（変数の単一代入・二重引用符参照・
// 件数照合）と、再発検出用のメイン worktree 未追跡ファイル検査（AC2）の両方を固定する。
//
// 読み込み方式は他の回帰テストと同一: 実装スクリプトは Workflow ハーネス専用文法（トップレベル
// return・注入グローバル args / agent / log / phase）を含み module として丸ごと import
// できないため、__IMPLEMENT_ISSUE_TREE_DRIVER_START__ マーカーより上（定義部のみ）を
// 一時ファイルへ切り出して import する。agent() を呼ぶ非同期関数（measure*・scan*）は
// グローバル注入前提のため直接呼び出さず、他の回帰テスト（remeasureResidualBytesNow 等）と
// 同じ「ソーステキストの部分一致固定」で契約を確認する。
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
const sliceDir = mkdtempSync(join(tmpdir(), 'implement-issue-tree-temp-file-placement-defs-'))
const slicePath = join(sliceDir, 'implement-issue-tree-temp-file-placement-defs.mjs')
// 実装スクリプトは `export const meta` 以外の top-level export を持てない（Workflow 起動制約）
// ため、定義部は非 export のまま置き、切り出したスライス側で export 文を付与する。
const SLICE_EXPORTS = [
  'COMMON',
  'MERGE_CONTEXT_COMMON',
  'BASE_MERGE_CONTEXT_COMMON',
  'TEMP_FILE_POLICY',
  'UNTRUSTED_POLICY',
  'ORPHAN_BYTES_SCHEMA',
  'MAIN_UNTRACKED_SCHEMA',
  'diffMainWorktreeUntracked',
  'formatMainWorktreeUntrackedWarning',
  'sanitize',
]
writeFileSync(slicePath, `${definitionPart}\nexport { ${SLICE_EXPORTS.join(', ')} }\n`)

const mod = await import(pathToFileURL(slicePath).href)
const {
  COMMON,
  MERGE_CONTEXT_COMMON,
  BASE_MERGE_CONTEXT_COMMON,
  TEMP_FILE_POLICY,
  UNTRUSTED_POLICY,
  ORPHAN_BYTES_SCHEMA,
  MAIN_UNTRACKED_SCHEMA,
  diffMainWorktreeUntracked,
  formatMainWorktreeUntrackedWarning,
} = mod

// --- (a) COMMON 系が TEMP_FILE_POLICY / UNTRUSTED_POLICY をちょうど 1 回含む ---

function countOccurrences(haystack, needle) {
  if (needle === '') return 0
  let count = 0
  let idx = 0
  while ((idx = haystack.indexOf(needle, idx)) !== -1) {
    count += 1
    idx += needle.length
  }
  return count
}

test('COMMON は TEMP_FILE_POLICY と UNTRUSTED_POLICY をちょうど 1 回ずつ含む', () => {
  assert.equal(countOccurrences(COMMON, TEMP_FILE_POLICY), 1)
  assert.equal(countOccurrences(COMMON, UNTRUSTED_POLICY), 1)
})

test('MERGE_CONTEXT_COMMON は TEMP_FILE_POLICY と UNTRUSTED_POLICY をちょうど 1 回ずつ含む', () => {
  assert.equal(countOccurrences(MERGE_CONTEXT_COMMON, TEMP_FILE_POLICY), 1)
  assert.equal(countOccurrences(MERGE_CONTEXT_COMMON, UNTRUSTED_POLICY), 1)
})

test('BASE_MERGE_CONTEXT_COMMON は TEMP_FILE_POLICY・UNTRUSTED_POLICY をいずれもちょうど 1 回含む', () => {
  // BASE_MERGE_CONTEXT_COMMON は COMMON_LINES を index フィルタ [0,2,3,4,9] で再利用する。
  // index 9（旧 UNTRUSTED_POLICY の位置）は除外されるため COMMON_LINES 由来では 0 回になり、
  // 代わりに専用の「リポジトリ内ファイルを読まない」文言とセットで独自に 1 回だけ追加し直す
  // 設計（PR #443 codex P0）。TEMP_FILE_POLICY は index 10（フィルタ対象外の末尾要素）のため
  // COMMON_LINES 由来の 1 回のみが残る。両者とも合計 1 回であることを固定する。
  assert.equal(countOccurrences(BASE_MERGE_CONTEXT_COMMON, TEMP_FILE_POLICY), 1)
  assert.equal(countOccurrences(BASE_MERGE_CONTEXT_COMMON, UNTRUSTED_POLICY), 1)
})

// --- (b) measureResidualWorktreeBytesDetailed のプロンプト硬化（ソーステキスト固定） ---

function extractFunctionBody(fnSignature, stopSignature) {
  const start = source.indexOf(fnSignature)
  assert.ok(start >= 0, `関数 ${fnSignature} を特定できること`)
  const end = source.indexOf(stopSignature, start)
  assert.ok(end > start, `関数 ${fnSignature} の終端（${stopSignature}）を特定できること`)
  return source.slice(start, end)
}

test('measureResidualWorktreeBytesDetailed: TEMP_FILE_POLICY を含み、tmpFile リテラルの埋め込みは tf= 代入の1箇所に限られ、以降は "$tf" 参照になる', () => {
  const body = extractFunctionBody(
    'async function measureResidualWorktreeBytesDetailed(paths) {',
    'async function measureResidualWorktreeBytes(paths) {',
  )
  assert.match(body, /TEMP_FILE_POLICY/)
  // tmpFile の JS テンプレートリテラル埋め込みは、ヒアドキュメントの書き出し例と `tf=` 代入の
  // 2 箇所のみ（旧実装は `.lines` を含めて 5 箇所前後に埋め込んでいた）。
  const literalEmbeds = countOccurrences(body, '${tmpFile}')
  assert.ok(literalEmbeds <= 2, `tmpFile リテラルの埋め込み回数は 2 以下であるべき（実際: ${literalEmbeds}）`)
  // 引用なしの変数展開によるリダイレクト（例: > .lines のような相対パス化の温床）が無いこと。
  assert.doesNotMatch(body, />\s*\$\{tmpFile\}\.lines(?!['"])/)
  assert.match(body, /tf=\$\{tmpFile\}/)
  assert.match(body, /"\$tf\.lines"/)
  assert.match(body, /rm -f -- "\$tf" "\$tf\.lines"/)
  // 1 回の Bash 呼び出しで実行する指示を含む（Bash ツールは呼び出し間で変数を保持しないため）。
  assert.match(body, /1 回の Bash 呼び出しで実行/)
  // COUNT による件数照合（fail-closed 強化）。
  assert.match(body, /COUNT=\$count/)
  assert.match(body, /v\.count/)
})

test('measureResidualWorktreeBytesDetailed: tf が空のとき rm を実行しない（tf="" での `rm -f -- "" "$tf.lines"` はカレント直下の .lines を削除しかねないため）', () => {
  const body = extractFunctionBody(
    'async function measureResidualWorktreeBytesDetailed(paths) {',
    'async function measureResidualWorktreeBytes(paths) {',
  )
  assert.match(body, /if \[ -n "\$tf" \]; then rm -f -- "\$tf" "\$tf\.lines"/)
  assert.doesNotMatch(body, /^\s*'   rm -f -- "\$tf"/m)
})

test('measureFreeDiskKib: tf が空のとき rm を実行しない', () => {
  const body = extractFunctionBody(
    'async function measureFreeDiskKib(path) {',
    'function findMainWorktreePath(entries) {',
  )
  assert.match(body, /if \[ -n "\$tf" \]; then rm -f -- "\$tf" "\$tf\.line"/)
})

test('measureFreeDiskKib: TEMP_FILE_POLICY を含み、tmpFile リテラルの埋め込みは最小化され "$tf" 参照へ統一されている', () => {
  const body = extractFunctionBody(
    'async function measureFreeDiskKib(path) {',
    'function findMainWorktreePath(entries) {',
  )
  assert.match(body, /TEMP_FILE_POLICY/)
  const literalEmbeds = countOccurrences(body, '${tmpFile}')
  assert.ok(literalEmbeds <= 2, `tmpFile リテラルの埋め込み回数は 2 以下であるべき（実際: ${literalEmbeds}）`)
  assert.match(body, /tf=\$\{tmpFile\}/)
  assert.match(body, /"\$tf\.line"/)
  assert.match(body, /rm -f -- "\$tf" "\$tf\.line"/)
  assert.match(body, /1 回の Bash 呼び出しで実行/)
})

// --- (c) ORPHAN_BYTES_SCHEMA の count 必須化（fail-closed 強化） ---

test('ORPHAN_BYTES_SCHEMA は count を required に含む', () => {
  assert.ok(ORPHAN_BYTES_SCHEMA.required.includes('count'))
  assert.equal(ORPHAN_BYTES_SCHEMA.properties.count.type, 'integer')
})

test('measureResidualWorktreeBytesDetailed: count が対象パス数と不一致なら null を返す fail-closed 分岐を持つ（ソーステキスト固定）', () => {
  const body = extractFunctionBody(
    'async function measureResidualWorktreeBytesDetailed(paths) {',
    'async function measureResidualWorktreeBytes(paths) {',
  )
  assert.match(body, /v\.count\s*===\s*sanitizedPaths\.length/)
  assert.match(body, /count が対象パス数と不一致/)
})

// PR #501 の Bugbot 指摘（Empty tf path stays silent）の回帰。tf が空（未定義を含む——手順 1 の
// case ガードを経ずにこのスクリプト断片だけが新規 Bash 呼び出しで実行された場合を含む）のとき、
// 以前は `:;`（no-op）で ERR=1/COUNT=0 のいずれも出力せずホスト側に失敗シグナルが渡らなかった。
// コメント「第1段（tf 未定義・不正な接頭辞）でも…ERR=1 かつ COUNT=0 を返し」の主張どおり、
// tf 未定義（-z 分岐）自体でも明示的に ERR=1 COUNT=0 を返すことを固定する。
test('measureResidualWorktreeBytesDetailed: tf が空（-z 分岐）のとき no-op ではなく ERR=1 COUNT=0 を明示的に返す', () => {
  const body = extractFunctionBody(
    'async function measureResidualWorktreeBytesDetailed(paths) {',
    'async function measureResidualWorktreeBytes(paths) {',
  )
  assert.doesNotMatch(body, /if \[ -z "\$tf" \]; then :;/)
  assert.match(body, /if \[ -z "\$tf" \]; then echo "TOTAL=0 MISSING=0 ERR=1 COUNT=0";/)
})

test('measureFreeDiskKib: tf が空（-z 分岐）のとき no-op ではなく FREE=0 ERR=1 を明示的に返す（PR #501 Bugbot 指摘の回帰）', () => {
  const body = extractFunctionBody(
    'async function measureFreeDiskKib(path) {',
    'function findMainWorktreePath(entries) {',
  )
  assert.doesNotMatch(body, /if \[ -z "\$tf" \]; then :;/)
  assert.match(body, /if \[ -z "\$tf" \]; then echo "FREE=0 ERR=1";/)
})

// --- (e) diffMainWorktreeUntracked ---

test('diffMainWorktreeUntracked: baseline に無い新規パスのみを added として返す', () => {
  const baseline = { observed: true, paths: ['/repo/existing.txt'] }
  const end = { observed: true, paths: ['/repo/existing.txt', '/repo/.lines'] }
  const result = diffMainWorktreeUntracked(baseline, end, '_/issue-trees/1.json')
  assert.equal(result.observed, true)
  assert.deepEqual(result.added, ['/repo/.lines'])
  assert.equal(result.baselineCount, 1)
})

test('diffMainWorktreeUntracked: baseline に既存のものは除外する', () => {
  const baseline = { observed: true, paths: ['/repo/a', '/repo/b'] }
  const end = { observed: true, paths: ['/repo/a', '/repo/b'] }
  const result = diffMainWorktreeUntracked(baseline, end, '')
  assert.deepEqual(result.added, [])
})

test('diffMainWorktreeUntracked: ホストが正規に書き込む状態ファイル自身は除外する', () => {
  const stateFile = '_/issue-trees/1.json'
  const baseline = { observed: true, paths: [] }
  const end = { observed: true, paths: [stateFile, '/repo/.lines'] }
  const result = diffMainWorktreeUntracked(baseline, end, stateFile)
  assert.deepEqual(result.added, ['/repo/.lines'])
})

test('diffMainWorktreeUntracked: 状態ファイルの mktemp 残骸（<stateFile>.XXXXXX）は除外しない（書き戻し失敗の痕跡のため警告対象に残す）', () => {
  const stateFile = '_/issue-trees/1.json'
  const residue = `${stateFile}.ab12cd`
  const baseline = { observed: true, paths: [] }
  const end = { observed: true, paths: [residue] }
  const result = diffMainWorktreeUntracked(baseline, end, stateFile)
  assert.deepEqual(result.added, [residue])
})

test('diffMainWorktreeUntracked: baseline / end のいずれかが未観測なら observed:false・added: []', () => {
  const observedEnd = { observed: true, paths: ['/repo/x'] }
  assert.deepEqual(diffMainWorktreeUntracked({ observed: false }, observedEnd, ''), { observed: false, added: [], baselineCount: 0 })
  assert.deepEqual(diffMainWorktreeUntracked(observedEnd, { observed: false }, ''), { observed: false, added: [], baselineCount: 0 })
})

// PR #501 の Bugbot 指摘（Scan flags nested isolation worktrees）の回帰。ラン中に本スキル自身が
// メイン worktree 配下へ作る isolation worktree（`.claude/worktrees/<runId>-N`）は、git status が
// ネストした別リポジトリ境界として単一の未追跡ディレクトリで報告するため、除外しなければ
// 「残置ジャンク」と誤認される。
test('diffMainWorktreeUntracked: .claude/worktrees/ 配下の新規パスは isolation worktree として除外する', () => {
  const baseline = { observed: true, paths: [] }
  const end = { observed: true, paths: ['.claude/worktrees/wf_abc123/', '/repo/.lines'] }
  const result = diffMainWorktreeUntracked(baseline, end, '')
  assert.deepEqual(result.added, ['/repo/.lines'])
})

test('diffMainWorktreeUntracked: .claude/worktrees/ に前方一致しないパス（例: 兄弟ディレクトリ名の接頭辞衝突）は除外しない', () => {
  const baseline = { observed: true, paths: [] }
  const end = { observed: true, paths: ['.claude/worktrees-backup/junk'] }
  const result = diffMainWorktreeUntracked(baseline, end, '')
  assert.deepEqual(result.added, ['.claude/worktrees-backup/junk'])
})

// --- (f) formatMainWorktreeUntrackedWarning ---

test('formatMainWorktreeUntrackedWarning: added が空なら空文字を返す（警告を出さない）', () => {
  assert.equal(formatMainWorktreeUntrackedWarning({ observed: true, added: [] }), '')
  assert.equal(formatMainWorktreeUntrackedWarning({ observed: false, added: ['/x'] }), '')
})

test('formatMainWorktreeUntrackedWarning: 上限を超えた件数は省略し「ほか N 件」を付与する', () => {
  const added = Array.from({ length: 25 }, (_, i) => `/repo/file-${i}`)
  const warning = formatMainWorktreeUntrackedWarning({ observed: true, added }, 20)
  assert.match(warning, /ほか 5 件/)
  assert.match(warning, /file-0/)
  assert.doesNotMatch(warning, /file-24/)
})

test('formatMainWorktreeUntrackedWarning: バッククォート・$ を含むパスは sanitize されて出力される（未信頼データのため）', () => {
  const warning = formatMainWorktreeUntrackedWarning({ observed: true, added: ['/repo/$(rm -rf ~)`x`'] })
  // sanitize() は $ を \$ へエスケープしバッククォートを ' へ置換する。エスケープされていない
  // 生の $( や生のバッククォートが出力に残らないことを確認する。
  assert.doesNotMatch(warning, /[^\\]\$\(/)
  assert.doesNotMatch(warning, /`/)
})

// --- 計画 §3.1 で列挙した State / worktree 系 haiku プロンプトへの TEMP_FILE_POLICY 挿入
// （COMMON を持たないためこれらは個別挿入が必要。ソーステキスト固定で dead code 化を防ぐ）---

test('State/worktree 系の主要プロンプト（loadState・updateState merge/cleanup・state:init-all・state:high-water・sweep・orphan-scan・record-count）は TEMP_FILE_POLICY を個別に含む', () => {
  const labelsAndWindows = [
['状態ファイル読み込みタスク。', 600],
    ['const mergePromptText = [', 400],
    ["`worktree / branch 掃除タスク（状態ファイルの JSON マージは別エージェントが実施済み）。`", 400],
    ["状態ファイル更新タスク（トップレベルフィールド perWorktreeByteReserveHighWater・", 400],
    ["状態ファイル一括初期化タスク。", 400],
    ["'worktree スイープタスク（ラン終了時の残骸回収）。'", 500],
    ["'git worktree 一覧の取得タスク（読み取り専用。削除・変更は一切行わない）。'", 400],
    ["'git worktree レコード総数の取得タスク（読み取り専用。削除・変更は一切行わない）。'", 400],
  ]
  for (const [marker, window] of labelsAndWindows) {
    const idx = source.indexOf(marker)
    assert.ok(idx >= 0, `マーカーを特定できること: ${marker}`)
    const section = source.slice(idx, idx + window)
    assert.match(section, /TEMP_FILE_POLICY/, `TEMP_FILE_POLICY が見つからない: ${marker}`)
  }
})

test('worktree:sweep はプロンプトに「1 回の Bash 呼び出しで実行する」旨を含む（retain_file/registered_file/candidates_file を mktemp で手順をまたいで参照するため）', () => {
  const idx = source.indexOf("'worktree スイープタスク（ラン終了時の残骸回収）。'")
  const section = source.slice(idx, idx + 700)
  assert.match(section, /1 回の Bash 呼び出しで一連の手順すべてを実行する/)
})

// --- (g) scanMainWorktreeUntracked のプロンプトが破壊的操作を含まず例外時に throw しない ---

test('scanMainWorktreeUntracked: プロンプトが rm・git clean・git checkout -- を含まない読み取り専用タスクである', () => {
  const body = extractFunctionBody(
    'async function scanMainWorktreeUntracked(label) {',
    'function diffMainWorktreeUntracked(',
  )
  // プロンプトは「git clean・git checkout -- は一切行わない」という禁止の文言としてのみ
  // これらの語を含み、実行コマンドとして組み立てる箇所（例: 独立したシェル行）は持たない。
  assert.doesNotMatch(body, /^\s*git clean/m)
  assert.doesNotMatch(body, /^\s*git checkout --/m)
  assert.match(body, /一切行わない/)
  assert.match(body, /読み取り専用/)
  assert.match(body, /status --porcelain=v1 --untracked-files=all/)
})

test('scanMainWorktreeUntracked: 例外時は throw せず observed:false を返す（本処理を止めない）', () => {
  const body = extractFunctionBody(
    'async function scanMainWorktreeUntracked(label) {',
    'function diffMainWorktreeUntracked(',
  )
  assert.match(body, /catch \(e\) \{/)
  assert.match(body, /return \{ observed: false \}/)
})

// --- 駆動部の配線固定（dead code 化防止） ---

test('駆動部は scanMainWorktreeUntracked をラン開始直後（baseline）とラン終了直前（end）の2回呼ぶ', () => {
  const driverPart = source.slice(markerIndex)
  assert.match(driverPart, /const mainUntrackedBaseline = await scanMainWorktreeUntracked\('baseline'\)/)
  assert.match(driverPart, /const mainUntrackedEnd = await scanMainWorktreeUntracked\('end'\)/)
  assert.match(driverPart, /diffMainWorktreeUntracked\(mainUntrackedBaseline, mainUntrackedEnd, STATE_FILE\)/)
})

test('baseline 観測は ensureBoundaryNonceSeed・loadState より前に取得する（それら自身が残置を作っても baseline がマスクしないため）', () => {
  const driverPart = source.slice(markerIndex)
  const baselineIdx = driverPart.indexOf("scanMainWorktreeUntracked('baseline')")
  const nonceSeedIdx = driverPart.indexOf('await ensureBoundaryNonceSeed()')
  const loadStateIdx = driverPart.indexOf('await loadState()')
  assert.ok(baselineIdx >= 0 && nonceSeedIdx >= 0 && loadStateIdx >= 0, '3 箇所とも駆動部から特定できること')
  assert.ok(baselineIdx < nonceSeedIdx, 'baseline 取得は ensureBoundaryNonceSeed より前であること')
  assert.ok(baselineIdx < loadStateIdx, 'baseline 取得は loadState より前であること')
})

test('駆動部の返却値に mainWorktreeUntracked フィールドが含まれる', () => {
  const driverPart = source.slice(markerIndex)
  assert.match(driverPart, /mainWorktreeUntracked:\s*\{\s*observed:/)
})

test('駆動部は mainUntrackedDiff.added に対して削除コマンドを発行しない（警告のみ）', () => {
  const driverPart = source.slice(markerIndex)
  const idx = driverPart.indexOf('mainUntrackedDiff')
  const idxEnd = driverPart.indexOf('return { parent, baseBranch')
  const section = driverPart.slice(idx, idxEnd)
  assert.doesNotMatch(section, /rm -rf/)
  assert.doesNotMatch(section, /git worktree remove/)
})
