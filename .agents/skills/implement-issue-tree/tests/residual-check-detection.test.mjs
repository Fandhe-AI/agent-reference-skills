// implement-issue-tree の「cancel された run の残存 check」検知コマンド (A) の決定的回帰テスト
// （Issue #338）。
//
// 背景: (A) は `gh api ... | sort | uniq -d | wc -l` のパイプ直結だった。`gh api` は HTTP エラーの
// JSON 本文も stdout に出す仕様のため（.claude/rules/ruleset-policy.md 手順 B と同じ罠）、
// 認証失敗・404・レート制限時にエラー 1 行がそのまま uniq -d に流れ込み、ヒットせず出力が `0` に
// なる。旧「1 以上なら重複あり」の読み方定義に従うと、この `0` が「重複なし」と誤読され、この節が
// 防ごうとしている誤診断（CI 由来を除外して PR 差分を疑う）そのものを誘発していた。
// 修正は (A) を「取得 → 終了コード検証 → 出力形式検証 → 件数算出」の 4 段へ作り直し、出力語彙を
// `UNDETERMINED` / `dup=<D> bad=<B>` の 2 形に固定し、対処側にゼロ件分岐を追加した。
//
// 追加修正（Issue #338 P1 の codex-review 指摘）: 旧 (A) は `bad` を cancelled / failure /
// timed_out の 3 conclusion のみに限定していたため、`pending`（未完了）・`action_required`・
// `startup_failure`・`stale` を含む重複が bad=0 になり「正常な重複（再実行）」と誤診断され得た。
// 特に success + pending の重複では、その pending 自体が mergeStateStatus=BLOCKED の直接原因
// たり得るのに、別原因の調査へ進んでしまう。`success` 以外を正常扱いしない分類へ変更し、
// `pending`（未完了）は bad とは別の `pend` フィールドで検知して「待機・判定不能」に倒し、
// それ以外の非 success conclusion は `bad` として通常の CI 失敗経路へ倒す。出力語彙は
// `dup=<D> bad=<B> pend=<P>` の 3 値へ拡張した。
//
// 再修正（Issue #338 PR #354 の codex-review / Bugbot 指摘）: 上記の「success 以外を bad」
// 分類は `neutral`・`skipped` という、GitHub の required status checks 判定では合格・
// 非ブロック扱いになる 2 つの conclusion まで bad に含めてしまい、success+neutral や
// skipped+skipped の健全な重複を「通常の CI 失敗」と誤診断していた。正常集合を
// `success` / `neutral` / `skipped` の 3 conclusion に拡張し、それ以外（cancelled /
// failure / timed_out / action_required / startup_failure / stale 等）のみを bad とする。
//
// 再修正（Issue #338 PR #354 の Bugbot 指摘）: awk の `command -v` 存在チェックが
// `gh api` fetch の**後**（結果を変数へ代入する行の下）に置かれており、awk 不在でも
// fetch 自体は実行されてしまっていた。「前提が満たされない場合は実行しない」という
// 契約に反し、(B) の `jq` ゲート（fetch 前に command -v で確認）とも不整合で、
// レート制限下で無駄な API 呼び出しを発生させ得た。awk の存在チェックを fetch より
// 前段（if/else の外側）へ移動し、不在時は `gh api` 自体を実行せず `UNDETERMINED` を
// 返すよう修正した。
//
// 再修正（Issue #338 PR #354 の codex-review 指摘）: `rows=$(gh api ...)` が独立した
// 単純コマンドのまま置かれていたため、呼び出し元 shell で `set -e`（errexit）が有効な
// 場合、`gh api` の非ゼロ終了（認証失敗・404・レート制限等）で shell がその行で即終了し、
// 次行の `status=$?` および `UNDETERMINED` 分岐へ到達できなかった。「出力は 2 形のみ」
// 「取得失敗は判定不能として fail-closed」という契約が実行環境（呼び出し元の errexit
// 設定）によって破られ得た。代入自体を `if rows=$(gh api ...); then ... else ...; fi`
// の条件式へ移し（条件式に置かれたコマンドは errexit の対象外という shell の仕様を
// 利用）、errexit 下でも必ず失敗分岐（`status=$?` の捕捉 → `UNDETERMINED`）を実行できる
// 形にした。
//
// 追加（Issue #338 PR #354 の codex-review P2 指摘）: 群 A は `UNDETERMINED` や `status=$?`
// といった文字列が SKILL.md の**どこかに**存在することしか見ておらず、説明コメントに語が
// 残るだけで通過してしまう。今回の変更の中心契約（取得失敗・空出力・awk 不在を必ず
// `UNDETERMINED` に倒す／errexit 下でも失敗分岐へ到達する）を実行ベースで固定するため、
// (A) のシェル本体を抽出し、偽の `gh` を置いた PATH で実際に走らせる群 D を追加した。
//
// 4 群構成:
//   群 A（SKILL.md 記述の固定）: UNDETERMINED・dup=・bad=・ゼロ件分岐・終了コード検証の記載を固定。
//   群 B（旧文言の再発防止）: 「1 以上なら重複あり」が 0 回であることを固定。
//   群 C（集計ロジックの決定性）: SKILL.md から (A) の awk 式を抽出し、fixture 行を流して
//     dup/bad の算出が決定的であることを実測する（doc と挙動の乖離を同時に防ぐ）。
//   群 D（シェル本体の契約）: SKILL.md から (A) のシェルスニペット全体を抽出し、偽の `gh` を
//     PATH の先頭に置いて bash で実行する。取得成功／非ゼロ終了／空出力／awk 不在 ×
//     errexit 有無の各ケースで、出力が定義済み 2 形のいずれかであることと、
//     awk 不在時に `gh api` を呼ばないことを実測する。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'

const SKILL_MD_PATH = join(
  dirname(fileURLToPath(import.meta.url)),
  '..', 'SKILL.md',
)
const skillMd = readFileSync(SKILL_MD_PATH, 'utf8')

// ---------------------------------------------------------------------------
// 群 A: SKILL.md 記述の固定
// ---------------------------------------------------------------------------
test('群A: (A) は取得失敗・空出力を UNDETERMINED として扱う', () => {
  assert.match(skillMd, /UNDETERMINED/)
})

test('群A: (A) は dup=<D> bad=<B> 形式で重複件数と結論内訳を返す', () => {
  assert.match(skillMd, /dup=<D> bad=<B>/)
  assert.match(skillMd, /dup=%d bad=%d/)
})

test('群A: (A) は gh api の終了コードを検証してから件数を返す', () => {
  assert.match(skillMd, /終了コードを見る/)
  assert.match(skillMd, /status=\$\?/)
})

test('群A: 「対処」は cancelled run 0 件の分岐を明記する', () => {
  assert.match(skillMd, /cancelled run が \*\*0 件\*\*/)
})

test('群A: 「対処」は判定不能（前提 0）を rerun せず blocked として扱う', () => {
  assert.match(skillMd, /前提 0（判定不能の扱い）/)
  assert.match(skillMd, /判定不能を「重複なし」と読んで CI 由来を除外してはならない/)
})

test('群A: 「対処」は conclusion（bad）を含めて重複を判定する', () => {
  assert.match(skillMd, /D >= 1 かつ P = 0 かつ B >= 1/)
  assert.match(skillMd, /D >= 1 かつ B = 0 かつ P = 0/)
})

test('群A: 「対処」は pending（未完了）を含む重複を正常な再実行と断定しない（Issue #338 P1）', () => {
  assert.match(skillMd, /D >= 1 かつ P >= 1/)
  assert.match(skillMd, /pending.*BLOCKED.*直接原因/)
})

test('群A: (A)/(B) の権限境界（チェック名をエージェントの文脈へ出さない）は維持される', () => {
  assert.match(skillMd, /チェック名・エラー本文は出力に現れない/)
})

test('群A: 「よくある失敗」表に判定不能の誤読パターンが追加されている', () => {
  assert.match(skillMd, /\(A\) の出力を検証せず `0` を「重複なし」と読む/)
})

test('群A: 前提条件節が awk の command -v 確認と不在時の扱いを明記する（Issue #338 P1）', () => {
  assert.match(skillMd, /`awk` CLI がインストールされていること（`command -v awk` で確認）/)
  assert.match(skillMd, /未導入の場合はそのコマンドを実行せず `UNDETERMINED`（判定不能）として扱う/)
})

test('群A: (A) の awk 存在チェックは gh api fetch より先に実行される（Issue #338 PR #354 Bugbot 指摘: awk gate runs after fetch）', () => {
  const startMarker = '# (A) エージェントが実行してよい形'
  const startIdx = skillMd.indexOf(startMarker)
  assert.ok(startIdx >= 0, '(A) セクションが見つからない')
  const commandVIdx = skillMd.indexOf('command -v awk', startIdx)
  const ghApiIdx = skillMd.indexOf('gh api --paginate "repos/{owner}/{repo}/commits', startIdx)
  assert.ok(commandVIdx >= 0, 'command -v awk が見つからない')
  assert.ok(ghApiIdx >= 0, 'gh api fetch 行が見つからない')
  assert.ok(
    commandVIdx < ghApiIdx,
    'awk 存在チェックは gh api fetch より前になければならない（不在時に fetch 自体を実行しないため）',
  )
})

test('群A: (A) は rows=$(gh api ...) の代入を if の条件式へ置き errexit 下でも失敗分岐へ到達する（Issue #338 P1）', () => {
  assert.match(skillMd, /if rows=\$\(gh api --paginate "repos\/\{owner\}\/\{repo\}\/commits/)
})

// ---------------------------------------------------------------------------
// 群 B: 旧文言の再発防止
// ---------------------------------------------------------------------------
test('群B: 旧文言「1 以上なら重複あり」は 0 回（判定不能を重複なしと誤読させない）', () => {
  const matches = skillMd.match(/1 以上なら重複あり/g)
  assert.equal(matches, null)
})

test('群B: rows=$(gh api ...) が if の条件式に含まれず独立した単純コマンドのまま残る箇所は 0 件（errexit 下で失敗分岐へ到達できなくなる退行を防ぐ）', () => {
  const bareAssignment = skillMd.match(/\nrows=\$\(gh api/g)
  assert.equal(bareAssignment, null)
})

// ---------------------------------------------------------------------------
// 群 C: 集計ロジックの決定性（SKILL.md から (A) の awk 式を抽出して実行）
// ---------------------------------------------------------------------------
function extractAwkProgram(markdown) {
  const startMarker = "awk -F'\\t' '"
  const startIdx = markdown.indexOf(startMarker)
  if (startIdx < 0) {
    throw new Error('(A) の awk 起動部が SKILL.md に見つからない（記述形式が変わった可能性がある）')
  }
  const bodyStart = startIdx + startMarker.length
  const endMarker = "}'\nfi"
  const endIdx = markdown.indexOf(endMarker, bodyStart)
  if (endIdx < 0) {
    throw new Error('(A) の awk 終端（}\'\\nfi）が SKILL.md に見つからない')
  }
  return markdown.slice(bodyStart, endIdx + 1)
}

const awkProgram = extractAwkProgram(skillMd)

function runAwk(rows) {
  return execFileSync('awk', ['-F', '\t', awkProgram], {
    input: rows,
    encoding: 'utf8',
  }).trim()
}

test('群C: 重複あり・cancelled 混在で dup=2 bad=1 pend=0 を返す', () => {
  // ci/build は cancelled + success（重複かつ結論に cancelled を含む）。
  // ci/test は success x2（重複だが結論は健全）。ci/lint は単発（重複なし）。
  const rows = [
    'ci/build\tcancelled',
    'ci/build\tsuccess',
    'ci/test\tsuccess',
    'ci/test\tsuccess',
    'ci/lint\tsuccess',
    '',
  ].join('\n')
  assert.equal(runAwk(rows), 'dup=2 bad=1 pend=0')
})

test('群C: 重複はあるが結論が健全な場合は dup=1 bad=0 pend=0 を返す（前提1の D>=1 B=0 P=0 分岐に対応）', () => {
  const rows = [
    'ci/build\tsuccess',
    'ci/build\tsuccess',
    'ci/lint\tsuccess',
    '',
  ].join('\n')
  assert.equal(runAwk(rows), 'dup=1 bad=0 pend=0')
})

test('群C: 重複なしの場合は dup=0 bad=0 pend=0 を返す', () => {
  const rows = [
    'ci/build\tsuccess',
    'ci/lint\tsuccess',
    '',
  ].join('\n')
  assert.equal(runAwk(rows), 'dup=0 bad=0 pend=0')
})

test('群C: pending（conclusion 欠落）は bad に数えず pend に数える（Issue #338 P1: 旧実装は bad=0 のみで見分けがつかなかった）', () => {
  const rows = [
    'ci/build\tpending',
    'ci/build\tpending',
    '',
  ].join('\n')
  assert.equal(runAwk(rows), 'dup=1 bad=0 pend=1')
})

test('群C: success + pending の重複は「正常な重複」に丸め込まず pend=1 で検知する（Issue #338 P1 の指摘シナリオそのもの）', () => {
  const rows = [
    'ci/build\tsuccess',
    'ci/build\tpending',
    '',
  ].join('\n')
  assert.equal(runAwk(rows), 'dup=1 bad=0 pend=1')
})

test('群C: action_required / startup_failure / stale は bad に数える（success 以外を正常扱いしない）', () => {
  const rows = [
    'ci/build\taction_required',
    'ci/build\tsuccess',
    'ci/deploy\tstartup_failure',
    'ci/deploy\tsuccess',
    'ci/lint\tstale',
    'ci/lint\tsuccess',
    '',
  ].join('\n')
  assert.equal(runAwk(rows), 'dup=3 bad=3 pend=0')
})

test('群C: 同一重複名に bad な結論と pending が両方含まれる場合は B・P 双方が立つ', () => {
  const rows = [
    'ci/build\tfailure',
    'ci/build\tpending',
    'ci/build\tsuccess',
    '',
  ].join('\n')
  assert.equal(runAwk(rows), 'dup=1 bad=1 pend=1')
})

test('群C: success + neutral の重複は bad に数えない（Issue #338 P1 の codex-review / Bugbot 指摘シナリオ）', () => {
  const rows = [
    'codex-review\tsuccess',
    'codex-review\tneutral',
    '',
  ].join('\n')
  assert.equal(runAwk(rows), 'dup=1 bad=0 pend=0')
})

test('群C: skipped + skipped の重複は bad に数えない（Issue #338 P1 の codex-review / Bugbot 指摘シナリオ）', () => {
  const rows = [
    'ci/optional\tskipped',
    'ci/optional\tskipped',
    '',
  ].join('\n')
  assert.equal(runAwk(rows), 'dup=1 bad=0 pend=0')
})

test('群C: success + skipped + neutral の 3 重複も bad=0 で健全と判定する', () => {
  const rows = [
    'ci/build\tsuccess',
    'ci/build\tskipped',
    'ci/build\tneutral',
    '',
  ].join('\n')
  assert.equal(runAwk(rows), 'dup=1 bad=0 pend=0')
})

// ---------------------------------------------------------------------------
// 群 D: シェル本体の契約（SKILL.md から (A) のシェルスニペット全体を抽出して実行）
//
// 群 C は awk 集計式だけを取り出して流しており、(A) の中心契約である
// 「取得失敗・空出力・awk 不在を必ず UNDETERMINED に倒す」「errexit 下でも失敗分岐へ到達する」
// を実行ベースでは固定していなかった（群 A の文字列一致は、説明コメントに該当語が残るだけで
// 通過してしまう）。ここでは偽の `gh` を PATH の先頭へ置いてスニペット本体を bash で実行し、
// 出力（2 形のいずれか）と `gh api` の呼び出し有無を実測する。
// ---------------------------------------------------------------------------
import { mkdtempSync, writeFileSync, existsSync, chmodSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'

/**
 * SKILL.md の (A) コードブロックからシェル本体を抽出する。
 * 末尾の「→ 出力は次の 2 形のみ」以降は読み方の説明コメントであり実行対象ではないため落とす。
 */
function extractShellSnippet(markdown) {
  const startMarker = '# (A) エージェントが実行してよい形'
  const startIdx = markdown.indexOf(startMarker)
  if (startIdx < 0) {
    throw new Error('(A) のシェルスニペット開始位置が SKILL.md に見つからない')
  }
  const endMarker = '# → 出力は次の 2 形のみ'
  const endIdx = markdown.indexOf(endMarker, startIdx)
  if (endIdx < 0) {
    throw new Error('(A) のシェルスニペット終端（出力形式の説明コメント）が見つからない')
  }
  return markdown.slice(startIdx, endIdx)
}

const shellSnippet = extractShellSnippet(skillMd)

/**
 * 偽の `gh` を置いた一時 PATH を作り、(A) のスニペットを bash で実行する。
 * mode: 'success' | 'fail' | 'empty'、withAwk: false なら PATH から awk を落とす、
 * errexit: true なら呼び出し元 shell の `set -e` 有効状態を再現する。
 */
function runSnippet({ mode = 'success', withAwk = true, errexit = false } = {}) {
  const dir = mkdtempSync(join(tmpdir(), 'iit-residual-'))
  const calledMarker = join(dir, 'gh-called')
  const bodies = {
    // 正常系: 重複 1 件（ci/build が cancelled + success）を含む TSV
    success: `printf 'ci/build\\tcancelled\\nci/build\\tsuccess\\nci/lint\\tsuccess\\n'\nexit 0`,
    // 取得失敗: gh api は HTTP エラーの JSON 本文も stdout へ出す（この罠こそが (A) 改修の動機）
    fail: `printf '{"message":"Bad credentials","status":"401"}\\n'\nexit 1`,
    // 空出力: check-run が 1 件も返らない（この節の前提と矛盾するため判定不能へ倒す）
    empty: `exit 0`,
  }
  const gh = join(dir, 'gh')
  // 呼び出し痕跡はリダイレクトで残す。`touch` のような外部コマンドを使うと、withAwk=false で
  // PATH を一時ディレクトリのみに絞ったケースで `touch` 自体が解決できず痕跡が書かれない。
  // その状態では「awk 不在なら gh を呼ばない」という否定アサーションが、実際に gh が
  // 呼ばれていても通ってしまう（PR #354 Bugbot Medium）。`>` は sh の構文であり PATH に依存しない。
  writeFileSync(gh, `#!/bin/sh\n: > ${JSON.stringify(calledMarker)}\n${bodies[mode]}\n`)
  chmodSync(gh, 0o755)

  // withAwk=false のときは PATH を偽 gh のディレクトリのみにして awk を解決不能にする。
  // スニペットが使う printf / echo / [ は bash 組み込みのため PATH に依存しない
  const path = withAwk ? `${dir}:${process.env.PATH}` : dir
  const script = errexit ? `set -e\n${shellSnippet}` : shellSnippet
  try {
    // bash は絶対パスで起動する。withAwk=false では PATH を偽 gh のディレクトリのみに
    // 絞るため、PATH 解決に頼ると bash 自体が見つからず ENOENT になる
    const stdout = execFileSync('/bin/bash', ['-c', script], {
      encoding: 'utf8',
      env: { ...process.env, PATH: path, HEAD_SHA: 'deadbeef' },
    }).trim()
    // 痕跡の判定は一時ディレクトリを消す前に済ませる（下の finally で消えるため）。
    return { stdout, ghCalled: existsSync(calledMarker) }
  } finally {
    // 最後の組み合わせテストだけで 12 回走るため、後始末しないと一時領域を食い続ける。
    // self-hosted runner のように workspace が永続する環境では回を追って蓄積する。
    rmSync(dir, { recursive: true, force: true })
  }
}

test('群D: 取得成功時は dup=/bad=/pend= 形式を返す（gh は呼ばれる）', () => {
  const { stdout, ghCalled } = runSnippet({ mode: 'success' })
  assert.equal(stdout, 'dup=1 bad=1 pend=0')
  assert.equal(ghCalled, true)
})

test('群D: gh api が非ゼロ終了したら UNDETERMINED（エラー本文を重複判定へ流さない）', () => {
  const { stdout, ghCalled } = runSnippet({ mode: 'fail' })
  assert.equal(stdout, 'UNDETERMINED')
  assert.equal(ghCalled, true)
})

test('群D: errexit（set -e）下でも gh api 失敗が UNDETERMINED に倒れる（Issue #338 P1）', () => {
  const { stdout } = runSnippet({ mode: 'fail', errexit: true })
  assert.equal(stdout, 'UNDETERMINED')
})

test('群D: 空出力は「重複なし」ではなく UNDETERMINED', () => {
  const { stdout } = runSnippet({ mode: 'empty' })
  assert.equal(stdout, 'UNDETERMINED')
})

test('群D: errexit 下の空出力も UNDETERMINED', () => {
  const { stdout } = runSnippet({ mode: 'empty', errexit: true })
  assert.equal(stdout, 'UNDETERMINED')
})

test('群D: awk 不在なら gh api を呼ばずに UNDETERMINED（前提確認を fetch より先に行う契約）', () => {
  const { stdout, ghCalled } = runSnippet({ mode: 'success', withAwk: false })
  assert.equal(stdout, 'UNDETERMINED')
  assert.equal(ghCalled, false, 'awk 不在時に gh api を呼んではならない（無駄な API 消費の防止）')
})

test('群D: errexit 下の awk 不在も gh api を呼ばずに UNDETERMINED', () => {
  const { stdout, ghCalled } = runSnippet({ mode: 'success', withAwk: false, errexit: true })
  assert.equal(stdout, 'UNDETERMINED')
  assert.equal(ghCalled, false)
})

test('群D: 出力は必ず定義済み 2 形のいずれかに一致する（形式外の出力を作らない）', () => {
  const shapes = /^(UNDETERMINED|dup=[0-9]+ bad=[0-9]+ pend=[0-9]+)$/
  for (const mode of ['success', 'fail', 'empty']) {
    for (const errexit of [false, true]) {
      for (const withAwk of [true, false]) {
        const { stdout } = runSnippet({ mode, errexit, withAwk })
        assert.match(stdout, shapes, `mode=${mode} errexit=${errexit} withAwk=${withAwk}`)
      }
    }
  }
})
