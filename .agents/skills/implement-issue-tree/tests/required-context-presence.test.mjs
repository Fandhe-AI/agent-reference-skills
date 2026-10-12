// Issue #577 の回帰テスト: monitor が ruleset の required context の揃う前に ready を返し、
// merge-exec (v-b) が issuer-unbound（終端）で止まる経路を塞ぐ契約を固定する。
//   (1) REQUIRED_MISSING_JQ の実動作（jq 実行）
//   (2) monitorPrompt 手順 3g（clientMergeActive 限定・有界待機・件数のみ）
//   (3) merge-exec (v-b) の一過性（checks-not-green）/ 構成問題（issuer-unbound）分岐
// 読み込み方式は post-push-checks-gate.test.mjs と同一のマーカー切り出しスライス方式。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs'
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
const sliceDir = mkdtempSync(join(tmpdir(), 'implement-issue-tree-reqctx-'))
const slicePath = join(sliceDir, 'defs.mjs')
const SLICE_EXPORTS = ['monitorPrompt', 'mergeExecutePrompt', 'classifyMergeExecDispatch', 'MERGE_EXEC_SCHEMA', 'REQUIRED_MISSING_JQ']
writeFileSync(slicePath, `${definitionPart}\nexport { ${SLICE_EXPORTS.join(', ')} }\n`)
const { monitorPrompt, mergeExecutePrompt, classifyMergeExecDispatch, MERGE_EXEC_SCHEMA, REQUIRED_MISSING_JQ } = await import(pathToFileURL(slicePath).href)

const item = { number: 577, title: 't' }
const impl = { prNumber: 1, branch: 'fix/577-x' }

const jqAvailable = spawnSync('jq', ['--version']).status === 0
const missing = (req, have) => {
  const r = spawnSync('jq', ['-n', '--argjson', 'r', JSON.stringify(req), '--argjson', 'h', JSON.stringify(have), REQUIRED_MISSING_JQ], { encoding: 'utf8' })
  assert.equal(r.status, 0, r.stderr)
  return Number(r.stdout.trim())
}

test('REQUIRED_MISSING_JQ: required が HEAD に無ければ不足件数を返す', { skip: !jqAvailable }, () => {
  const req = Array.from({ length: 29 }, (_, i) => `ci-${i}`)
  assert.equal(missing(req, ['bugbot', 'ai-review']), 29)
  assert.equal(missing(req, [...req.slice(0, 20), 'bugbot']), 9)
})

test('REQUIRED_MISSING_JQ: 全て存在すれば 0、required 空でも 0', { skip: !jqAvailable }, () => {
  assert.equal(missing(['a', 'b', 'c'], ['c', 'b', 'a', 'x']), 0)
  assert.equal(missing([], ['x']), 0)
})

test('monitorPrompt(clientMergeActive): 手順 3g が手順 6 より前にあり有界待機と再判定を持つ', () => {
  const p = monitorPrompt(item, impl, [], true, true)
  const i3g = p.indexOf('3g.')
  assert.ok(i3g >= 0, '手順 3g が無い')
  const i6 = p.indexOf('\n6. ')
  assert.ok(i3g < i6, '3g は手順 6 より前')
  const s = p.slice(i3g, i6)
  assert.ok(s.includes('rules/branches/'))
  assert.ok(s.includes('check-runs') && s.includes('statuses'))
  assert.ok(s.includes(REQUIRED_MISSING_JQ))
  assert.ok(s.includes('最大 10 分'))
  assert.ok(s.includes('gh pr view') && s.includes('CONFLICTING'))
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
  // 手順 2 は取得失敗時に checksTotal を省略して --watch → 手順 3 へ進む。3g の前提が「手順 2 の
  // checksTotal が 1 件以上」だと、省略時は文字通りには満たされず 3g が走らない読みが成立し、
  // 手順 6 の ready 条件（3g の不足 0 件の実測）を満たせないまま ready にも失敗終端にもならない。
  const p = monitorPrompt(item, impl, [], true, true)
  const s = p.slice(p.indexOf('3g.'), p.indexOf('\n6. '))
  const head = s.slice(0, s.indexOf('\n'))
  assert.ok(!head.includes('手順 2 の checksTotal が 1 件以上のとき'), '3g の前提が手順 2 の checksTotal 限定のまま')
  // #586: 前提は観測状態表の状態 1 に一本化された。手順 2 が取得失敗でも状態 1 なら 3g は走る。
  assert.ok(head.includes('手順 2 が取得失敗でも状態 1 なら飛ばさず実行する'), '3g が checksTotal 省略時も実行される旨がない')
  assert.ok(!head.includes('確定 0 件だけが手順 3e'), '0 件の行き先を確定 0 件に限る旧文言が残っている')
  // 取得失敗を 0 件・緑扱いへ倒さない（fail-closed）: 総数は手順 3 の実測列挙件数を使う（状態 1 の定義）。
  assert.ok(stateLine(p, 1).includes('取得失敗なら列挙件数'), '省略時の総数の出所がない')
})

test('monitorPrompt: 3g の timeout が返す checksTotal の出所を手順 2 失敗時も含めて定め、手順 7・返却仕様と矛盾しない', () => {
  const p = monitorPrompt(item, impl, [], true, true)
  const s3g = p.slice(p.indexOf('3g.'), p.indexOf('\n6. '))
  // #586: checksTotal の出所は観測状態表の状態 1 の総数（確定値、取得失敗なら列挙件数）に一本化された。
  assert.ok(s3g.includes('state: timeout（checksTotal は状態 1 の総数 = 1 以上）'), '3g の timeout の checksTotal が状態 1 の総数と明示されていない')
  assert.ok(stateLine(p, 1).includes('総数（checksTotal・timeout に載せる値）は手順 2 の確定値、取得失敗なら列挙件数'))
  const tail = p.slice(p.indexOf('\n7. '))
  const s7 = tail.slice(0, tail.indexOf('\n返却: '))
  assert.ok(s7.includes('checksTotal に状態 1 の総数（1 以上）を入れる'))
  const ret = tail.slice(tail.indexOf('\n返却: '))
  assert.ok(ret.includes('timeout を返す場合は状態 1 の総数で 1 以上'))
})

test('monitorPrompt: 手順 2 失敗かつ列挙 0 件は 3g へ入らず 3e へ回り、0 件では timeout を返さない', () => {
  // 手順 2 失敗 + gh pr checks が 0 件列挙の経路が 3g の timeout（checksTotal: 0）へ落ちると、
  // ホストが確定 0 件と読んで conflicting へ再判定してしまう。行き先を 3e に固定する。
  const p = monitorPrompt(item, impl, [], true, true)
  const s3g = p.slice(p.indexOf('3g.'), p.indexOf('\n6. '))
  const head = s3g.slice(0, s3g.indexOf('\n'))
  // #586: 行き先は観測状態表に一本化された。取得失敗かつ列挙 0 件は状態 2（→ 3e）で、3g は状態 1 限定。
  const s2 = stateLine(p, 2)
  assert.ok(s2.includes('手順 2 取得失敗かつ列挙 0 件') && s2.includes('手順 3e'), '列挙 0 件が 3e へ回る旨がない')
  assert.ok(head.includes('状態 2 は手順 3e') && head.includes('本手順へ入らない'), '3g 前提に状態 2 を入れない旨がない')
  assert.ok(!s2.includes('timeout'), '状態 2 に timeout が混ざっている')
  // gh pr checks 失敗時の再取得は有界で、終端は blocked / quality（状態 3）。
  const s3 = stateLine(p, 3)
  assert.ok(s3.includes('30 秒間隔で最大 3 回'), 'gh pr checks 失敗時の再取得が有界でない')
  assert.ok(s3.includes('読取不能') && s3.includes('state: blocked / blockedReason: "quality"'), '読めない場合の終端がない')
  const tail = p.slice(p.indexOf('\n7. '))
  const s7 = tail.slice(0, tail.indexOf('\n返却: '))
  assert.ok(s7.includes('状態 2 は timeout を返さず手順 3e'), '手順 7 に状態 2 の除外がない')
  const s3e = p.slice(p.indexOf('   e. チェック総数が 0 件'), p.indexOf('   f. '))
  assert.ok(s3e.includes('本手順へ来るのは状態 2 のみ'), '3e の到達経路が状態 2 に限られていない')
})

test('monitorPrompt: 列挙 0 件 → 3e は手順 2 取得失敗の経路に限定され、確定値 1 件以上の列挙 0 件は 3e にも 3g にも行かない', () => {
  // 列挙 0 件 → 3e の分岐が経路を限定しないと、手順 2 が 1 件以上と確定している PR まで 3e
  // （0 件判定 → blocked / quality）へ回り、required context の確認（3g）が飛ぶ（Issue #583 / #584）。
  // #586 で意味が変わった点: 確定値 1 件以上 + 列挙 0 件で「確定値を総数として 3g を実行する」旧挙動は、
  // a・b が結論の無いまま空虚に満たされる穴だったため廃止し、状態 3（有界再取得 → blocked / quality）へ移した。
  // 「確定値 1 件以上を 0 件扱いの 3e へ回さない」(#584) は維持する。
  const p = monitorPrompt(item, impl, [], true, true)
  const s2 = stateLine(p, 2)
  const s3 = stateLine(p, 3)
  // 3e（状態 2）に入るのは「確定値 0」か「手順 2 取得失敗かつ列挙 0 件」だけ。確定値 1 件以上は含まない。
  assert.ok(s2.includes('手順 2 確定値が 0（列挙結果は問わない') && s2.includes('または手順 2 取得失敗かつ列挙 0 件'))
  assert.ok(!s2.includes('1 件以上'), '状態 2 に確定値 1 件以上が混ざっている')
  // 確定値 1 件以上 + 列挙 0 件は状態 3。3e にも ready にも倒さず、3g も走らせない。
  assert.ok(s3.includes('手順 2 確定値が 1 件以上で列挙 0 件または読取不能'))
  assert.ok(s3.includes('ready・timeout・手順 3e に倒さない'))
  const s3g = p.slice(p.indexOf('3g.'), p.indexOf('\n6. '))
  const head = s3g.slice(0, s3g.indexOf('\n'))
  assert.ok(!head.includes('列挙件数が 0 件でも確定値を総数として本手順を実行'), '列挙 0 件のまま確定値で 3g を実行する旧文言が残っている')
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

test('mergeExecutePrompt (v-b): 未発行のみなら checks-not-green、未束縛・取得不能は issuer-unbound', () => {
  const p = mergeExecutePrompt(item, impl, true, [], 'a'.repeat(40))
  const i = p.indexOf('(v-b)')
  assert.ok(i >= 0)
  const s = p.slice(i)
  assert.ok(/checks-not-green[^。]*未発行|未発行[^。]*checks-not-green/.test(s))
  assert.ok(s.includes('issuer-unbound'))
})

test('分類: issuer-unbound は blocked/quality、checks-not-green は timeout（再監視）、enum は維持', () => {
  assert.deepEqual(classifyMergeExecDispatch('issuer-unbound', null), { lastState: 'blocked', lastBlockedReason: 'quality' })
  assert.equal(classifyMergeExecDispatch('checks-not-green', null).lastState, 'timeout')
  const e = MERGE_EXEC_SCHEMA.properties.reason.enum
  assert.ok(e.includes('issuer-unbound') && e.includes('checks-not-green'))
})

// --- Issue #586: 手順 2 の総数と gh pr checks の列挙結果の組を 3 状態に分ける ---
// 手順 2 が 1 件以上と確定しているのに gh pr checks が 1 件も列挙しない観測で、a・b が結論の
// 無いまま空虚に満たされ、名前の有無しか見ない 3g を通って ready になる穴を塞ぐ契約を固定する。
// 不整合・読取不能を「緑」にも「0 件」にも倒さず、有界再取得 → 終端（blocked / quality）とする。
// 手順 3 冒頭の観測状態表（状態 1 / 2 / 3）を 3g・3e・手順 7・返却・スキーマの単一の根拠にする。
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
    assert.ok(stateLine(p, 3).includes('「不整合・読取不能」'))
  }
})

test('#586 状態 1（整合）: 確定値 1 件以上または手順 2 取得失敗で、列挙 1 件以上 → a・b を列挙結果で検証して 3g/手順 4 へ', () => {
  const l = stateLine(monitorPrompt(item, impl, [], true, true), 1)
  assert.ok(l.includes('手順 2 確定値が 1 件以上、または手順 2 取得失敗') && l.includes('列挙 1 件以上'))
  assert.ok(l.includes('a・b を列挙結果で検証') && l.includes('手順 3g') && l.includes('手順 4'))
  // #581 の退行防止: 取得失敗（checksTotal 省略）でも 3g が走り、総数は列挙件数を使う
  assert.ok(l.includes('取得失敗なら列挙件数'), '取得失敗時に列挙件数を総数に使う旨がない')
})

test('#586 状態 2（確定 0 件）: 確定値 0、または手順 2 取得失敗かつ列挙 0 件 → 3e（timeout にしない）', () => {
  const l = stateLine(monitorPrompt(item, impl, [], true, true), 2)
  assert.ok(l.includes('手順 2 確定値が 0'))
  assert.ok(l.includes('手順 2 取得失敗かつ列挙 0 件'), '#582: 取得失敗かつ列挙 0 件が 3e へ行く旨がない')
  assert.ok(l.includes('手順 3e'))
  assert.ok(!l.includes('timeout'), '状態 2 に timeout が混ざっている')
})

test('#586 状態 3（不整合・読取不能）: 確定値 1 件以上なのに列挙 0 件、または読取不能 → 緑にも 0 件にも倒さず有界再取得、終端は blocked/quality', () => {
  const l = stateLine(monitorPrompt(item, impl, [], true, true), 3)
  assert.ok(l.includes('手順 2 確定値が 1 件以上で列挙 0 件または読取不能'))
  assert.ok(l.includes('手順 2 取得失敗で読取不能'))
  assert.ok(l.includes('a・b を満たしたとみなさず') && l.includes('緑にも 0 件にも倒さない'))
  assert.ok(l.includes('30 秒間隔で最大 3 回'))
  assert.ok(l.includes('state: blocked / blockedReason: "quality"'), '終端が blocked / quality でない')
  assert.ok(l.includes('ready・timeout・手順 3e に倒さない'), '#584: 確定値 1 件以上を 0 件扱いの 3e へ回さない旨がない')
})

test('#586 状態 3: 再取得で状態 1 / 2 へ戻れば通常経路へ合流する（手順 2 の集計と列挙の両方を取り直す）', () => {
  const l = stateLine(monitorPrompt(item, impl, [], true, true), 3)
  assert.ok(l.includes('手順 2 の集計と gh pr checks の両方を取り直して状態を判定し直し'))
  assert.ok(l.includes('状態 1 / 2 に戻れば該当の行き先へ合流'))
  assert.ok(l.includes('3 回後も状態 3'), '3 回で解消しない場合の終端条件がない')
})

test('#586 状態 3: checksTotal は手順 2 の確定値があるときだけ載せ、0 を返さない', () => {
  const l = stateLine(monitorPrompt(item, impl, [], true, true), 3)
  assert.ok(l.includes('checksTotal は手順 2 の確定値があるときだけ載せ') && l.includes('0 は返さない'))
})

test('#586 列挙結果は終了コードではなく出力で分類する: 行あり = 列挙 N 件、行なしの no checks reported = 列挙 0 件、行なしのそれ以外 = 読取不能', () => {
  const sec = observationSection(monitorPrompt(item, impl, [], true, true))
  assert.ok(sec.includes('終了コードではなく出力で分類する'))
  assert.ok(sec.includes('チェック行が 1 行以上あれば終了コード 1（失敗あり）・8（pending あり）でも「列挙 N 件」'))
  assert.ok(sec.includes('行が無く「no checks reported」なら「列挙 0 件」'))
  assert.ok(sec.includes('行が無くそれ以外（認証・通信・API エラー等）なら「読取不能」'))
})

test('#586 チェック行があり終了コード 1 / 8 のときは状態 1 に入り、状態 3（読取不能）に入らない', () => {
  // 失敗チェックあり（終了コード 1）が読取不能へ落ちると CI 失敗が needs-fix に届かず、pending あり
  // （終了コード 8）も再監視されないまま 3 回後に blocked / quality で止まる（codex P1）。
  const p = monitorPrompt(item, impl, [], true, true)
  const sec = observationSection(p)
  assert.ok(sec.includes('終了コード 1（失敗あり）・8（pending あり）でも「列挙 N 件」（a・b が failure / pending を判定する）'))
  // 状態 3 の「読取不能」は「行が無く」の定義にだけ結び付き、終了コードを条件にしない。
  const s3 = stateLine(p, 3)
  assert.ok(!/終了コード/.test(s3), '状態 3 が終了コードを条件にしている')
  // 状態 1 は列挙 1 件以上であり、a・b が結論（failure / pending）を判定する経路へ進む。
  const s1 = stateLine(p, 1)
  assert.ok(s1.includes('列挙 1 件以上') && s1.includes('a・b を列挙結果で検証'))
  assert.ok(p.includes('   c. いずれかが failure / cancelled / timed_out の場合') && p.includes('state: needs-fix'))
})

test('#586 3 状態は排他: 判定は状態 2 → 3 → 1 の順で最初に当たる 1 つへ確定する', () => {
  const p = monitorPrompt(item, impl, [], true, true)
  const sec = observationSection(p)
  assert.ok(sec.includes('判定は状態 2 → 3 → 1 の順に最初に当たる 1 つへ確定する（3 状態は排他）'))
  assert.ok(stateLine(p, 3).includes('（状態 2 に当たらない場合のみ）'))
  assert.ok(stateLine(p, 1).includes('状態 2・3 のいずれにも当たらない場合'))
})

test('#586 手順 2 確定値 0 は列挙結果（読取不能を含む）に関係なく状態 2 だけになる', () => {
  const p = monitorPrompt(item, impl, [], true, true)
  const s2 = stateLine(p, 2)
  // 確定値 0 の節は列挙結果への条件を持たない（「かつ列挙…」が後続するのは取得失敗の節だけ）。
  const zeroClause = s2.slice(s2.indexOf('手順 2 確定値が 0'), s2.indexOf('、または'))
  assert.ok(zeroClause.includes('列挙結果は問わない') && !zeroClause.includes('かつ'), '確定値 0 が列挙結果で条件付けられている')
  // 状態 3 の再取得で確定値 0 に変わった場合も状態 2（3e）へ合流する。
  assert.ok(stateLine(p, 3).includes('状態 1 / 2 に戻れば該当の行き先へ合流'))
})

test('#586 状態 3 の条件は手順 2 確定値 0 を含まない（確定値 1 件以上、または手順 2 取得失敗に限る）', () => {
  const p = monitorPrompt(item, impl, [], true, true)
  const s3 = stateLine(p, 3)
  const cond = s3.slice(s3.indexOf('手順 2 確定値'), s3.indexOf(' → '))
  assert.ok(cond.includes('手順 2 確定値が 1 件以上で列挙 0 件または読取不能'))
  assert.ok(cond.includes('手順 2 取得失敗で読取不能'))
  assert.ok(!/確定値が 0/.test(cond), '状態 3 の条件に確定値 0 が含まれている')
  assert.ok(!cond.includes('gh pr checks が読取不能'), '確定値・取得失敗を問わない「読取不能」単独の旧条件が残っている')
})

test('#586 3e へ来るのは状態 2 のみ（状態 3・確定値 1 件以上の経路は 3e に来ない）', () => {
  const p = monitorPrompt(item, impl, [], true, true)
  const s3e = p.slice(p.indexOf('   e. チェック総数が 0 件'), p.indexOf('   f. '))
  assert.ok(s3e.includes('本手順へ来るのは状態 2 のみ'))
  assert.ok(s3e.includes('状態 3 は来ない'))
  assert.ok(!s3e.includes('手順 3g の前提'), '旧: 3g 前提からの到達文が残っている')
  // 返却規則は維持（post-push-checks-gate.test.mjs と同じ契約）
  assert.ok(s3e.includes('checksTotal: 0 を必ず併せて返す') && s3e.includes('「check-run 0 件」と明記'))
})

test('#586 3g は状態 1 かつ a・b 充足のときだけ実行し、列挙 0 件のまま確定値で走らせない', () => {
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
  for (const needle of ['整合', '確定 0 件', '不整合・読取不能', '30 秒間隔で最大 3 回', '`blocked` / `"quality"`', '3 状態は排他', '終了コードではなく出力で分類', '確定値 0 は含まない']) {
    assert.ok(line.includes(needle), `automerge-design.md に「${needle}」がない`)
  }
  assert.ok(!line.includes('確定値で 3g を実行し、3e へは回さない'), '旧: 列挙 0 件でも確定値で 3g を走らせる記述が残っている')
})
