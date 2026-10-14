// Issue #577 の回帰テスト: monitor が ruleset の required context の揃う前に ready を返し、
// merge-exec (v-b) が issuer-unbound（終端）で止まる経路を塞ぐ契約を固定する。
//   (1) required context 不足件数の算出（#603 第 2 弾で REQUIRED_MISSING_JQ は scripts/observe-pr.sh の required モードへ移った。
//       jq 式と取得失敗の扱いはスクリプトを実際に走らせる observe-pr.test.mjs の 'required:' テスト群が固定する）
//   (2) monitorPrompt 手順 3g（clientMergeActive 限定・有界待機・件数のみ）
//   (3) merge-exec (v-b) の一過性（checks-not-green）/ 構成問題（issuer-unbound）分岐
// 読み込み方式は post-push-checks-gate.test.mjs と同一のマーカー切り出しスライス方式。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs'
import { trackTmp } from './lib/tmp-track.mjs'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { spawnSync } from 'node:child_process'

const SCRIPT_PATH = join(dirname(fileURLToPath(import.meta.url)), '..', 'scripts', 'implement-issue-tree.src.js')
const DRIVER_MARKER = '__IMPLEMENT_ISSUE_TREE_DRIVER_START__'
const source = readFileSync(SCRIPT_PATH, 'utf8')
const markerIndex = source.indexOf(DRIVER_MARKER)
if (markerIndex < 0) throw new Error(`テスト境界マーカー ${DRIVER_MARKER} が存在しない`)
const definitionPart = source.slice(0, source.lastIndexOf('\n', markerIndex))
const sliceDir = trackTmp(mkdtempSync(join(tmpdir(), 'implement-issue-tree-reqctx-')))
const slicePath = join(sliceDir, 'defs.mjs')
const SLICE_EXPORTS = ['monitorPrompt', 'mergeExecutePrompt', 'classifyMergeExecDispatch', 'MERGE_EXEC_SCHEMA']
writeFileSync(slicePath, `${definitionPart}\nexport { ${SLICE_EXPORTS.join(', ')} }\n`)
const { monitorPrompt, mergeExecutePrompt, classifyMergeExecDispatch, MERGE_EXEC_SCHEMA } = await import(pathToFileURL(slicePath).href)

const item = { number: 577, title: 't' }
const impl = { prNumber: 1, branch: 'fix/577-x' }

test('monitorPrompt(clientMergeActive): 手順 3g が手順 6 より前にあり有界待機と再判定を持つ', () => {
  const p = monitorPrompt(item, impl, [], true, true)
  const i3g = p.indexOf('3g.')
  assert.ok(i3g >= 0, '手順 3g が無い')
  const i6 = p.indexOf('\n6. ')
  assert.ok(i3g < i6, '3g は手順 6 より前')
  const s = p.slice(i3g, i6)
  assert.match(s, /observe-pr\.sh --nonce \S+ --mode required --pr 1 --base main --wait --attempt 1/)
  assert.ok(!s.includes('rules/branches/') && !s.includes('--slurp'), '旧: required 取得を gh api / jq の組み立てで書いている')
  assert.ok(s.includes('最大 10 分'))
  assert.ok(s.includes('--attempt を 1 増やして同じコマンド'), '待機は pending のたびに attempt を進めて再実行する')
  assert.ok(s.includes('手順 1 のコマンドを再実行し') && s.includes('CONFLICTING'))
  assert.ok(s.includes('state: timeout') && s.includes('checksTotal'))
})

test('monitorPrompt: context 名・App 名を取得・転記せず REQ/HAVE を表示しない', () => {
  const p = monitorPrompt(item, impl, [], true, true)
  const s = p.slice(p.indexOf('3g.'), p.indexOf('\n6. '))
  assert.ok(s.includes('件数のみ'))
  assert.ok(!/echo\s+"?\$(REQ|HAVE)/.test(s))
})

test('monitorPrompt: 3g の取得不能は有界再取得後に blocked/quality（ready にも timeout にもしない）', () => {
  const p = monitorPrompt(item, impl, [], false, true)
  const s = p.slice(p.indexOf('3g.'), p.indexOf('\n6. '))
  assert.ok(s.includes('最大 3 回') && s.includes('state: blocked') && s.includes('"quality"'))
  assert.ok(!s.includes('手順 4 へ進む（0 件扱いにも blocked にもしない'))
  const s6 = p.slice(p.indexOf('\n6. '), p.indexOf('\n7. '))
  assert.ok(s6.includes('取得不能のまま ready にしない'))
  assert.ok(p.slice(p.indexOf('\n7. ')).includes('取得不能は timeout ではなく'))
})

test('monitorPrompt: 手順 7 に 3g 由来の timeout 条件があり既存文言は維持される', () => {
  const p = monitorPrompt(item, impl, [], true, true)
  const s7 = p.slice(p.indexOf('\n7. '))
  assert.ok(s7.includes('手順 3g'))
  assert.ok(s7.includes('チェックが 1 件以上存在し'))
  assert.ok(s7.includes('checksTotal: 0 の timeout を受理しない'))
})

test('monitorPrompt: 3g は手順 2 が checksTotal を省略した（取得失敗）経路でも実行され、行き止まりにならない', () => {
  // 手順 2 は取得失敗時に checksTotal を省略して手順 3（--until settled の完了待ち）へ進む。3g の前提が「手順 2 の
  // checksTotal が 1 件以上」だと、省略時は文字通りには満たされず 3g が走らない読みが成立し、
  // 手順 6 の ready 条件（3g の不足 0 件の実測）を満たせないまま ready にも失敗終端にもならない。
  const p = monitorPrompt(item, impl, [], true, true)
  const s = p.slice(p.indexOf('3g.'), p.indexOf('\n6. '))
  const head = s.slice(0, s.indexOf('\n'))
  assert.ok(!head.includes('手順 2 の checksTotal が 1 件以上のとき'), '3g の前提が手順 2 の checksTotal 限定のまま')
  // #586: 前提は観測状態表の状態 1 に一本化された。手順 2 が取得失敗でも状態 1 なら 3g は走る。
  assert.ok(head.includes('手順 2 が取得失敗でも状態 1 なら飛ばさず実行する'), '3g が checksTotal 省略時も実行される旨がない')
  assert.ok(!head.includes('確定 0 件だけが手順 3e'), '0 件の行き先を確定 0 件に限る旧文言が残っている')
  // 取得失敗を 0 件・緑扱いへ倒さない（fail-closed）: 総数は手順 3 の実測件数を使う（状態 1 の定義）。
  assert.ok(stateLine(p, 1).includes('取得失敗なら手順 3 の total'), '省略時の総数の出所がない')
})

test('monitorPrompt: 3g の timeout が返す checksTotal の出所を手順 2 失敗時も含めて定め、手順 7・返却仕様と矛盾しない', () => {
  const p = monitorPrompt(item, impl, [], true, true)
  const s3g = p.slice(p.indexOf('3g.'), p.indexOf('\n6. '))
  // #586: checksTotal の出所は観測状態表の状態 1 の総数（確定値、取得失敗なら手順 3 の total）に一本化された。
  assert.ok(s3g.includes('state: timeout（checksTotal は状態 1 の総数 = 1 以上）'), '3g の timeout の checksTotal が状態 1 の総数と明示されていない')
  assert.ok(stateLine(p, 1).includes('総数（checksTotal・timeout に載せる値）は手順 2 の確定値、取得失敗なら手順 3 の total'))
  const tail = p.slice(p.indexOf('\n7. '))
  const s7 = tail.slice(0, tail.indexOf('\n返却: '))
  assert.ok(s7.includes('checksTotal に状態 1 の総数（1 以上）を入れる'))
  const ret = tail.slice(tail.indexOf('\n返却: '))
  assert.ok(ret.includes('timeout を返す場合は状態 1 の総数で 1 以上'))
})

test('monitorPrompt: 手順 2 失敗かつ手順 3 が total 0 は 3g へ入らず 3e へ回り、0 件では timeout を返さない', () => {
  // 手順 2 失敗 + 手順 3 が total 0 の経路が 3g の timeout（checksTotal: 0）へ落ちると、
  // ホストが確定 0 件と読んで conflicting へ再判定してしまう。行き先を 3e に固定する。
  const p = monitorPrompt(item, impl, [], true, true)
  const s3g = p.slice(p.indexOf('3g.'), p.indexOf('\n6. '))
  const head = s3g.slice(0, s3g.indexOf('\n'))
  // #586: 行き先は観測状態表に一本化された。取得失敗かつ手順 3 が total 0 は状態 2（→ 3e）で、3g は状態 1 限定。
  const s2 = stateLine(p, 2)
  assert.ok(s2.includes('手順 2 取得失敗') && s2.includes('total 0') && s2.includes('手順 3e'), 'total 0 が 3e へ回る旨がない')
  assert.ok(head.includes('状態 2 は手順 3e') && head.includes('本手順へ入らない'), '3g 前提に状態 2 を入れない旨がない')
  assert.ok(!s2.includes('timeout'), '状態 2 に timeout が混ざっている')
  // 手順 3 の取得不能時の再取得は有界で、終端は blocked / quality（状態 3）。
  const s3 = stateLine(p, 3)
  assert.ok(s3.includes('30 秒間隔で最大 3 回'), '取得不能時の再取得が有界でない')
  assert.ok(s3.includes('取得不能') && s3.includes('state: blocked / blockedReason: "quality"'), '読めない場合の終端がない')
  const tail = p.slice(p.indexOf('\n7. '))
  const s7 = tail.slice(0, tail.indexOf('\n返却: '))
  assert.ok(s7.includes('状態 2 は timeout を返さず手順 3e'), '手順 7 に状態 2 の除外がない')
  const s3e = p.slice(p.indexOf('   e. チェック総数が 0 件'), p.indexOf('   f. '))
  assert.ok(s3e.includes('本手順へ来るのは状態 2 のみ'), '3e の到達経路が状態 2 に限られていない')
})

test('monitorPrompt: total 0 → 3e は手順 2 取得失敗の経路に限定され、確定値 1 件以上なのに total 0 は 3e にも 3g にも行かない', () => {
  // total 0 → 3e の分岐が経路を限定しないと、手順 2 が 1 件以上と確定している PR まで 3e
  // （0 件判定 → blocked / quality）へ回り、required context の確認（3g）が飛ぶ（Issue #583 / #584）。
  // #586 で意味が変わった点（第 8 弾でも維持）: 確定値 1 件以上 + 手順 3 が total 0 で「確定値を総数として 3g を実行する」旧挙動は、
  // a・b が結論の無いまま空虚に満たされる穴だったため廃止し、状態 3（有界再取得 → blocked / quality）へ移した。
  // 「確定値 1 件以上を 0 件扱いの 3e へ回さない」(#584) は維持する。
  const p = monitorPrompt(item, impl, [], true, true)
  const s2 = stateLine(p, 2)
  const s3 = stateLine(p, 3)
  // 3e（状態 2）に入るのは「確定値 0」か「手順 2 取得失敗かつ手順 3 が total 0」だけ。確定値 1 件以上は含まない。
  assert.ok(s2.includes('手順 2 確定値が 0（手順 3 のコマンドは実行しない') && s2.includes('または手順 2 取得失敗で手順 3 のコマンドが met かつ total 0'))
  assert.ok(!s2.includes('1 件以上'), '状態 2 に確定値 1 件以上が混ざっている')
  // 確定値 1 件以上 + 手順 3 が total 0 は状態 3。3e にも ready にも倒さず、3g も走らせない。
  assert.ok(s3.includes('手順 2 確定値が 1 件以上なのに手順 3 が met で total 0'))
  assert.ok(s3.includes('ready・timeout・手順 3e に倒さない'))
  const s3g = p.slice(p.indexOf('3g.'), p.indexOf('\n6. '))
  const head = s3g.slice(0, s3g.indexOf('\n'))
  assert.ok(!head.includes('列挙件数が 0 件でも確定値を総数として本手順を実行'), 'total 0 のまま確定値で 3g を実行する旧文言が残っている')
  assert.ok(head.includes('状態 1 で a・b を満たしたとき'))
  // 確定 0 件は手順 2 から 3e へ直行し 3g に来ない。
  assert.ok(p.slice(p.indexOf('\n2. '), p.indexOf('\n3. ')).includes('直ちに手順 3e'), '手順 2 の確定 0 件直行がない')
})

test('MERGE_SCHEMA: checksTotal の description が状態 2 は timeout ではなく 3e、状態 3 は blocked/quality と述べる', () => {
  assert.ok(source.includes('状態 2 は timeout ではなく手順 3e、状態 3 は blocked / quality'))
})

test('monitorPrompt(autoMerge 無効): 手順 3g を含まない', () => {
  assert.ok(!monitorPrompt(item, impl, [], false, false).includes('3g.'))
})

// 第 6 弾（#603）で (v-b) の判定はプロンプトからスクリプトへ移った。判定の中身は merge-gate-unit.test.mjs / merge-gate.test.mjs が
// 検査する。ここでは語彙の対応（未発行のみ = 一過性の checks-not-green、未束縛・取得不能 = issuer-unbound）だけを固定する
test('merge-gate.sh (v-b): 未発行のみなら checks-not-green、未束縛・取得不能は issuer-unbound', () => {
  const text = readFileSync(new URL('../scripts/merge-gate.sh', import.meta.url), 'utf8')
  assert.ok(text.includes('stop checks-not-green g0 unissued'))
  assert.ok(text.includes('stop issuer-unbound g0 unbound'))
  assert.ok(text.includes('stop issuer-unbound g0 rsc-format 1'))
  // 未束縛の判定は未発行の判定より先（束縛できない構成を一過性として再監視へ回さない）
  assert.ok(text.indexOf('stop issuer-unbound g0 unbound') < text.indexOf('stop checks-not-green g0 unissued'))
  // プロンプトは判定語をそのまま reason にするだけで、(v-b) の手順を持たない
  assert.ok(!mergeExecutePrompt(item, impl, true, [], 'a'.repeat(40), 'n1').includes('(v-b)'))
})

test('分類: issuer-unbound は blocked/quality、checks-not-green は timeout（再監視）、enum は維持', () => {
  assert.deepEqual(classifyMergeExecDispatch('issuer-unbound', null), { lastState: 'blocked', lastBlockedReason: 'quality' })
  assert.equal(classifyMergeExecDispatch('checks-not-green', null).lastState, 'timeout')
  const e = MERGE_EXEC_SCHEMA.properties.reason.enum
  assert.ok(e.includes('issuer-unbound') && e.includes('checks-not-green'))
})

// --- Issue #586 / #603 第 8 弾: 手順 2 の総数と手順 3 の件数（observe-pr.sh --until settled）の組を 3 状態に分ける ---
// 手順 2 が 1 件以上と確定しているのに手順 3 が total 0 を返す観測で、a・b が結論の無いまま空虚に満たされ、
// 名前の有無しか見ない 3g を通って ready になる穴を塞ぐ契約を固定する。不整合・取得不能を「緑」にも「0 件」にも倒さず、
// 有界再取得 → 終端（blocked / quality）とする。手順 3 冒頭の観測状態表（状態 1 / 2 / 3）を 3g・3e・手順 7・返却・スキーマの
// 単一の根拠にする。第 8 弾で CI の完了待ちが gh pr checks --watch からスクリプトの件数へ移り、gh pr checks の出力の列挙
// （終了コード 1 / 8 の読み分け・no checks reported の判別）は廃止された（件数の出所が REST 1 本になった）。
const observationSection = (p) => p.slice(p.indexOf('\n3. '), p.indexOf('   a. '))
const stateLine = (p, n) => {
  const line = observationSection(p).split('\n').find((l) => l.startsWith(`   - 状態 ${n}「`))
  assert.ok(line, `観測状態表に状態 ${n} の行がない`)
  return line
}

test('#586 観測状態表: 手順 3 の冒頭（a より前）に 3 状態があり、autoMerge の有無によらず存在する', () => {
  for (const merge of [true, false]) {
    const p = monitorPrompt(item, impl, [], merge, merge)
    const i1 = p.indexOf('   - 状態 1「')
    assert.ok(p.indexOf('\n3. ') < i1 && i1 < p.indexOf('   a. '), `autoMerge=${merge}: 状態表が手順 3 の a より前にない`)
    assert.ok(stateLine(p, 1).includes('「整合」'))
    assert.ok(stateLine(p, 2).includes('「確定 0 件」'))
    assert.ok(stateLine(p, 3).includes('「不整合・取得不能」'))
  }
})

test('#603-8 手順 3 は gh pr checks --watch ではなく --until settled のスクリプトで完了を待ち、件数だけを根拠にする', () => {
  const p = monitorPrompt(item, impl, [], true, true, false, '', 'nonce1')
  const sec = observationSection(p)
  assert.ok(sec.includes('gh pr checks --watch は使わない'))
  assert.match(sec, /observe-pr\.sh --nonce nonce1w --mode checks --pr 1 --until settled --wait --attempt 1/)
  assert.ok(sec.includes('--attempt を 1 増やして同じコマンドを再実行する'))
  assert.ok(sec.includes('最大 30 回 = およそ 40 分'))
  assert.ok(sec.includes('passed（合格）・pending（未完了）・failed（不合格'))
  assert.ok(sec.includes('以降の判断は最後の封筒の件数だけを根拠にする'))
  // 旧: gh pr checks の出力の列挙と終了コードの読み分け・--watch の再実行指示は残さない
  for (const old of ['--watch --interval', '列挙結果', '列挙 0 件', '終了コードではなく出力で分類', 'no checks reported']) {
    assert.ok(!p.includes(old), `旧来の記述が残っている: ${old}`)
  }
  // checksObservation には --until を持たない checks コマンドの出力だけを転記する（settled の封筒は入力束縛が別のため採用されない）
  assert.ok(p.includes('手順 3 の --until settled の出力は転記しない'))
})

test('#603-8 状態 1（整合）: met で total 1 以上、または exhausted（headSha あり）→ a・b を件数で検証して 3g/手順 4 へ', () => {
  const l = stateLine(monitorPrompt(item, impl, [], true, true), 1)
  assert.ok(l.includes('met で total 1 以上') && l.includes('exhausted（headSha あり'))
  assert.ok(l.includes('a・b を件数で検証') && l.includes('手順 3g') && l.includes('手順 4'))
  // #581 の退行防止: 取得失敗（checksTotal 省略）でも 3g が走り、総数は手順 3 の total を使う
  assert.ok(l.includes('取得失敗なら手順 3 の total'), '取得失敗時に手順 3 の total を総数に使う旨がない')
})

test('#603-8 a・b・c: failed が 1 件以上は needs-fix、pending が残る exhausted は timeout（3g の前に止まる）', () => {
  const p = monitorPrompt(item, impl, [], true, true)
  assert.ok(p.includes('   a. 状態 1 で failed が 0 件であること。'))
  const b = p.split('\n').find((l) => l.startsWith('   b. '))
  assert.ok(b.includes('pending が 0 件であること（met なら満たす）') && b.includes('exhausted は pending が残ったままなので満たさない') && b.includes('state: timeout（手順 7。checksTotal は状態 1 の総数）'))
  const c = p.split('\n').find((l) => l.startsWith('   c. '))
  assert.ok(c.includes('failed が 1 件以上の場合') && c.includes('gh run view <run-id> --log-failed') && c.includes('state: needs-fix'))
  // 3c は run-id の出所（gh run list --commit <HEAD sha>）を持つ。判定には gh pr checks の出力を使わないが、原因調査には gh run を使える
  assert.ok(c.includes('gh run list --commit <手順 1 の HEAD sha>'), '3c に失敗 run の探し方がない')
  assert.ok(observationSection(p).includes('失敗の原因調査だけは手順 3c の gh run を使う'))
  assert.ok(c.includes('--attempt 1 から再監視'), 'flaky の rerun 後は完了待ちを最初から')
})

test('#586 状態 2（確定 0 件）: 確定値 0、または手順 2 取得失敗かつ手順 3 が met で total 0 → 3e（timeout にしない）', () => {
  const l = stateLine(monitorPrompt(item, impl, [], true, true), 2)
  assert.ok(l.includes('手順 2 確定値が 0'))
  assert.ok(l.includes('手順 2 取得失敗') && l.includes('met かつ total 0'), '#582: 取得失敗かつ total 0 が 3e へ行く旨がない')
  assert.ok(l.includes('手順 3e'))
  assert.ok(!l.includes('timeout'), '状態 2 に timeout が混ざっている')
})

test('#586 状態 3（不整合・取得不能）: 確定値 1 件以上なのに total 0、または取得不能 → 緑にも 0 件にも倒さず有界再取得、終端は blocked/quality', () => {
  const l = stateLine(monitorPrompt(item, impl, [], true, true), 3)
  assert.ok(l.includes('手順 2 確定値が 1 件以上なのに手順 3 が met で total 0'))
  assert.ok(l.includes('outcome が error・非 0 終了・JSON なし、または headSha が空のまま exhausted'))
  assert.ok(l.includes('a・b を満たしたとみなさず') && l.includes('緑にも 0 件にも倒さない'))
  assert.ok(l.includes('30 秒間隔で最大 3 回'))
  assert.ok(l.includes('state: blocked / blockedReason: "quality"'), '終端が blocked / quality でない')
  assert.ok(l.includes('ready・timeout・手順 3e に倒さない'), '#584: 確定値 1 件以上を 0 件扱いの 3e へ回さない旨がない')
})

test('#586 状態 3: 再取得で状態 1 / 2 へ戻れば通常経路へ合流する（手順 2 の集計と手順 3 のコマンドの両方を取り直す）', () => {
  const l = stateLine(monitorPrompt(item, impl, [], true, true), 3)
  assert.ok(l.includes('手順 2 の集計と手順 3 のコマンド（--attempt は直前と同じ値）を取り直して状態を判定し直し'))
  assert.ok(l.includes('状態 1 / 2 に戻れば該当の行き先へ合流'))
  assert.ok(l.includes('3 回後も状態 3'), '3 回で解消しない場合の終端条件がない')
})

test('#586 状態 3: checksTotal は手順 2 の確定値があるときだけ載せ、0 を返さない', () => {
  const l = stateLine(monitorPrompt(item, impl, [], true, true), 3)
  assert.ok(l.includes('checksTotal は手順 2 の確定値があるときだけ載せ') && l.includes('0 は返さない'))
})

test('#586 3 状態は排他: 判定は状態 2 → 3 → 1 の順で最初に当たる 1 つへ確定する', () => {
  const p = monitorPrompt(item, impl, [], true, true)
  const sec = observationSection(p)
  assert.ok(sec.includes('判定は状態 2 → 3 → 1 の順に最初に当たる 1 つへ確定する（3 状態は排他）'))
  assert.ok(stateLine(p, 3).includes('（状態 2 に当たらない場合のみ）'))
  assert.ok(stateLine(p, 1).includes('状態 2・3 のいずれにも当たらない場合'))
})

test('#586 手順 2 確定値 0 は手順 3 の結果に関係なく状態 2 だけになる（手順 3 は実行しない）', () => {
  const p = monitorPrompt(item, impl, [], true, true)
  const s2 = stateLine(p, 2)
  const zeroClause = s2.slice(s2.indexOf('手順 2 確定値が 0'), s2.indexOf('、または'))
  assert.ok(zeroClause.includes('手順 3 のコマンドは実行しない') && !zeroClause.includes('かつ'), '確定値 0 が手順 3 の結果で条件付けられている')
  assert.ok(p.slice(p.indexOf('\n2. '), p.indexOf('\n3. ')).includes('手順 3 へは進まず、直ちに手順 3e'))
  // 状態 3 の再取得で確定値 0 に変わった場合も状態 2（3e）へ合流する。
  assert.ok(stateLine(p, 3).includes('状態 1 / 2 に戻れば該当の行き先へ合流'))
})

test('#586 状態 3 の条件は手順 2 確定値 0 を含まない（確定値 1 件以上、または手順 3 が取得不能に限る）', () => {
  const p = monitorPrompt(item, impl, [], true, true)
  const s3 = stateLine(p, 3)
  const cond = s3.slice(s3.indexOf('手順 3 のコマンドが取得不能'), s3.indexOf(' → '))
  assert.ok(cond.includes('手順 2 確定値が 1 件以上なのに手順 3 が met で total 0'))
  assert.ok(!/確定値が 0/.test(cond), '状態 3 の条件に確定値 0 が含まれている')
})

test('#586 3e へ来るのは状態 2 のみ（状態 3・確定値 1 件以上の経路は 3e に来ない）', () => {
  const p = monitorPrompt(item, impl, [], true, true)
  const s3e = p.slice(p.indexOf('   e. チェック総数が 0 件'), p.indexOf('   f. '))
  assert.ok(s3e.includes('本手順へ来るのは状態 2 のみ'))
  assert.ok(s3e.includes('状態 3 は来ない'))
  assert.ok(s3e.includes('手順 3 を経ずに直行する'))
  assert.ok(!s3e.includes('手順 3g の前提'), '旧: 3g 前提からの到達文が残っている')
  // 3e の待機で total が 1 以上になったら手順 3 の完了待ち（--attempt 1 から）へ戻って状態を確定し直す
  assert.ok(s3e.includes('手順 3 へ戻り、--until settled のコマンドを --attempt 1 から実行して観測状態を確定し直す'))
  // 返却規則は維持（post-push-checks-gate.test.mjs と同じ契約）
  assert.ok(s3e.includes('checksTotal: 0 を必ず併せて返す') && s3e.includes('「check-run 0 件」と明記'))
})

test('#586 3g は状態 1 かつ a・b 充足のときだけ実行し、total 0 のまま確定値で走らせない', () => {
  const p = monitorPrompt(item, impl, [], true, true)
  const s3g = p.slice(p.indexOf('3g.'), p.indexOf('\n6. '))
  const head = s3g.slice(0, s3g.indexOf('\n'))
  assert.ok(head.includes('状態 1 で a・b を満たしたとき'))
  assert.ok(head.includes('状態 2 は手順 3e、状態 3 は手順 3 冒頭の再取得・終端') && head.includes('本手順へ入らない'))
  assert.ok(!head.includes('列挙件数が 0 件でも確定値を総数として本手順を実行'), '空虚な a・b で 3g を走らせる旧文言が残っている')
  assert.ok(s3g.includes('state: timeout（checksTotal は状態 1 の総数 = 1 以上）'))
})

test('#586 手順 7・返却説明・checksTotal description は状態表を参照し、timeout の総数は状態 1 の総数に限る', () => {
  const p = monitorPrompt(item, impl, [], true, true)
  const tail = p.slice(p.indexOf('\n7. '))
  const s7 = tail.slice(0, tail.indexOf('\n返却: '))
  const ret = tail.slice(tail.indexOf('\n返却: '))
  assert.ok(s7.includes('checksTotal に状態 1 の総数（1 以上）を入れる'))
  assert.ok(s7.includes('状態 2 は timeout を返さず手順 3e、状態 3 は blocked / "quality"'))
  assert.ok(ret.includes('timeout を返す場合は状態 1 の総数で 1 以上'))
  const desc = source.slice(source.indexOf('    checksTotal: {'))
  assert.ok(desc.slice(0, desc.indexOf('\n    },')).includes('状態 1 の総数'))
  // 条件文の重複を戻さない: 旧来の長い再掲が残っていない
  for (const old of ['手順 2 で取得に失敗していれば手順 3 の gh pr checks が列挙した件数', '列挙 0 件なら timeout を返さず手順 3e']) {
    assert.ok(!p.includes(old), `旧来の重複文が残っている: ${old}`)
  }
})

test('#586 references/automerge-design.md は観測状態表（3 状態）と同じ意味になっている', () => {
  const doc = readFileSync(join(dirname(SCRIPT_PATH), '..', 'references', 'automerge-design.md'), 'utf8')
  const line = doc.split('\n').find((l) => l.startsWith('3. **monitor の 0 件直行と `timeout` の限定**'))
  assert.ok(line, 'monitor の 0 件直行の節がない')
  for (const needle of ['整合', '確定 0 件', '不整合・取得不能', '30 秒間隔で最大 3 回', '`blocked` / `"quality"`', '3 状態は排他', '--until settled', '最大 30 回', '確定値 0 は含まない']) {
    assert.ok(line.includes(needle), `automerge-design.md に「${needle}」がない`)
  }
  assert.ok(!line.includes('確定値で 3g を実行し、3e へは回さない'), '旧: total 0 でも確定値で 3g を走らせる記述が残っている')
})

test('#603-8 3e が起動を確認した時点（met・total 1 以上）で手順 2 の確定値を更新し、往復は 1 回で完了待ちを繰り返さない', () => {
  const p = monitorPrompt(item, impl, [], true, true)
  const s3e = p.slice(p.indexOf('   e. チェック総数が 0 件'), p.indexOf('   f. '))
  const upd = s3e.indexOf('3e の met で確定値を更新')
  const back = s3e.indexOf('手順 3 へ戻り、--until settled のコマンドを --attempt 1 から実行')
  const once = s3e.indexOf('往復は 1 回')
  // 更新は手順 3 へ戻るより前（手順 3 の結果を待たない）。往復の上限の文は戻る指示の後
  assert.ok(upd >= 0 && back > upd, '確定値の更新が手順 3 へ戻る指示より前にない')
  assert.ok(s3e.slice(upd, back).includes('手順 2 の確定値へ反映'))
  assert.ok(s3e.slice(upd, back).includes('手順 3 の結果を待たない'))
  assert.ok(once > back, '往復は 1 回の文が戻る指示の後にない')
  assert.ok(s3e.includes('2 回目の 3e には入らない'))
  assert.ok(s3e.includes('どの経路でも --attempt 1 からの完了待ちを繰り返さない'))
  // 状態表（手順 3 冒頭）は 3e より前にあり、状態 2 が最優先のまま。更新後は状態 2 に戻らない
  assert.ok(p.indexOf('   - 状態 2「') < p.indexOf('   e. チェック総数が 0 件'))
  assert.ok(s3e.includes('確定値 1 件以上なので状態 2 には戻らない'))
})

test('#603-8 exhausted の扱い（failed ≥ 1 は needs-fix 優先）は状態 1 に 1 か所だけ定義され、b と 3e はそれを参照する', () => {
  const p = monitorPrompt(item, impl, [], true, true)
  const state1 = p.indexOf('   - 状態 1「整合」')
  const ruleAt = p.indexOf('exhausted の規則（exhausted の扱いの唯一の定義')
  const b = p.indexOf('   b. pending が 0 件であること')
  const s3e = p.indexOf('   e. チェック総数が 0 件')
  // 定義は状態 1 の行の中にあり、b と 3e より前にある
  assert.ok(state1 >= 0 && ruleAt > state1 && ruleAt < b && b < s3e, '規則の位置が 状態 1 < b < 3e の順になっていない')
  assert.ok(p.slice(ruleAt, b).includes('failed が 1 件以上なら timeout ではなく c の needs-fix を優先'))
  assert.ok(p.slice(ruleAt, b).includes('3e → 手順 3 の往復後の exhausted も同じ規則'))
  // 規則の本体（needs-fix を優先する文）はプロンプト全体で 1 回だけ
  assert.equal(p.split('timeout ではなく c の needs-fix を優先').length - 1, 1, '規則の本体が複数か所にある')
  // b と 3e は状態 1 の規則を参照し、3e は timeout へ直送しない
  const bText = p.slice(b, p.indexOf('   c. ', b))
  assert.ok(bText.includes('状態 1 の exhausted の規則に従う'))
  assert.ok(bText.includes('1 件以上なら c の needs-fix'))
  const e3 = p.slice(s3e, p.indexOf('   f. '))
  assert.ok(e3.includes('状態 1 の exhausted の規則に従う（failed が 1 件以上なら c の needs-fix を優先'))
  assert.ok(!e3.includes('状態 1 の timeout'), '3e が exhausted を timeout へ直送している')
})
