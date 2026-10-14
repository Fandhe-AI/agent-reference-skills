// scripts/lib/merge-gate-lib.sh（merge-gate.sh の判定だけの純関数）を、表で単体検査する回帰テスト（Issue #603 第 6 弾）。
//
// G0（ベースブランチのサーバー側強制）とマージ直前の再検証の判定は、gh を呼ばず JSON を判定語・件数へ畳む純関数に切り出してある。
// 1 回の bash 起動で表の全ケースを source した関数へ渡し、1 行ずつ結果を返させる（gh を差し替えたスクリプト全体の実行は
// tests/merge-gate.test.mjs の代表に絞る）。実時間を待つ処理は無い。利用できる bash（macOS の 3.2 と Homebrew の 5 など）をすべて回す。
//
// 契約の要点: 想定外の形（型違い・欠落・JSON でない）は非ゼロ return で何も出さない = 呼び出し側が判定不能として fail-closed に倒す。
// 危険側（bypass・未束縛・enforcement が active でない・Organization 継承）は、必ず「通さない」側の結果になることを表で固定する。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { availableBashes } from './lib/signed-output.mjs'

const LIB = join(dirname(fileURLToPath(import.meta.url)), '..', 'scripts', 'lib', 'merge-gate-lib.sh')
const US = '\u001f'

// 各行 [関数名, 引数...]。出力は `<i> <rc> [<stdout>]`
const DRIVER = `
set -u
LC_ALL=C
export LC_ALL
. "$1" || exit 9
US=$(printf '\\037')
i=0
while IFS="$US" read -r fn a b c; do
  rc=0
  out=$("$fn" "$a" "$b" "$c" 2>/dev/null) || rc=$?
  printf '%s %s [%s]\\n' "$i" "$rc" "$out"
  i=$((i + 1))
done
`

function table(bash, rows) {
  const input = rows.map((r) => r.join(US)).join('\n') + '\n'
  const r = spawnSync(bash, ['-c', DRIVER, 'driver', LIB], { input, encoding: 'utf8' })
  assert.equal(r.status, 0, `exit ${r.status} / stderr: ${r.stderr}`)
  const lines = r.stdout.split('\n').filter((l) => l !== '')
  assert.equal(lines.length, rows.length, `行数が合わない:\n${r.stdout}`)
  return lines.map((l, i) => {
    const m = /^(\d+) (\d+) \[(.*)\]$/.exec(l)
    assert.ok(m && Number(m[1]) === i, l)
    // 契約は「成功 = 0、判定不能 = 非ゼロ」。非ゼロの具体値は jq の失敗の種類で変わるので 1 に畳む
    return { rc: Number(m[2]) === 0 ? 0 : 1, out: m[3] }
  })
}
const J = (x) => JSON.stringify(x)
const rsc = (...e) => ({ type: 'required_status_checks', ruleset_id: 1, ruleset_source_type: 'Repository', parameters: { required_status_checks: e } })
const pr = (v) => ({ type: 'pull_request', ruleset_id: 1, ruleset_source_type: 'Repository', parameters: { required_review_thread_resolution: v } })

for (const bash of availableBashes()) {
  const tag = `[${bash}]`

  test(`${tag} mg_rules_class: required status checks が無い = none（classic）、Repository 以外・id が数値でない = source、それ以外 ok。想定外の形は判定不能`, () => {
    const cases = [
      [[rsc({ context: 'ci', integration_id: 1 })], 0, 'ok'],
      [[], 0, 'none'],
      [[pr(true)], 0, 'none'],
      [[{ ...rsc({ context: 'ci', integration_id: 1 }), ruleset_source_type: 'Organization' }], 0, 'source'],
      [[rsc({ context: 'ci', integration_id: 1 }), { ...pr(true), ruleset_source_type: 'Organization' }], 0, 'source'],
      [[{ ...rsc({ context: 'ci', integration_id: 1 }), ruleset_id: '1' }], 0, 'source'],
      [[{ ...rsc({ context: 'ci', integration_id: 1 }), ruleset_id: null }], 0, 'source'],
      [[{ ...rsc({ context: 'ci', integration_id: 1 }), ruleset_source_type: undefined }], 0, 'source'],
      [{ message: 'Not Found' }, 1, ''],
      ['x', 1, ''],
    ]
    const res = table(bash, cases.map(([v]) => ['mg_rules_class', typeof v === 'string' ? v : J(v)]))
    cases.forEach(([v, rc, out], i) => assert.deepEqual(res[i], { rc, out }, J(v)))
    // JSON でない入力
    assert.equal(table(bash, [['mg_rules_class', 'not json']])[0].rc, 1)
  })

  test(`${tag} mg_rule_ids: ruleset_id（数値）を重複排除して 1 行 1 件で返す`, () => {
    const r = spawnSync(bash, ['-c', `. "$1" && mg_rule_ids "$2"`, 'd', LIB, J([rsc({ context: 'a', integration_id: 1 }), { ...pr(true), ruleset_id: 7 }, { ...pr(true), ruleset_id: 7 }, { ...pr(true), ruleset_id: 3 }])], { encoding: 'utf8' })
    assert.equal(r.status, 0)
    assert.deepEqual(r.stdout.split('\n').filter(Boolean), ['1', '3', '7'])
  })

  test(`${tag} mg_ruleset_ok: enforcement が active かつ bypass_actors が空配列のときだけ成立する（それ以外・想定外の形は不成立）`, () => {
    const cases = [
      [{ enforcement: 'active', bypass_actors: [] }, 0],
      [{ enforcement: 'active', bypass_actors: [{ actor_id: 5, actor_type: 'Team', bypass_mode: 'always' }] }, 1],
      [{ enforcement: 'evaluate', bypass_actors: [] }, 1],
      [{ enforcement: 'disabled', bypass_actors: [] }, 1],
      [{ bypass_actors: [] }, 1],
      [{ enforcement: 'active' }, 1],
      [{ enforcement: 'active', bypass_actors: null }, 1],
      [{ enforcement: 'active', bypass_actors: 'none' }, 1],
      [{ enforcement: 'active', bypass_actors: {} }, 1],
      [[], 1],
      [{ message: 'Not Found', status: '404' }, 1],
    ]
    const res = table(bash, cases.map(([v]) => ['mg_ruleset_ok', J(v)]))
    cases.forEach(([v, rc], i) => assert.equal(res[i].rc, rc, J(v)))
    assert.equal(table(bash, [['mg_ruleset_ok', 'not json']])[0].rc, 1)
  })

  test(`${tag} mg_thread_enforced: pull_request ルールのどれかが required_review_thread_resolution == true のときだけ 1`, () => {
    const cases = [
      [[pr(true)], '1'],
      [[pr(false), pr(true)], '1'],
      [[pr(false)], '0'],
      [[], '0'],
      [[rsc({ context: 'ci', integration_id: 1 })], '0'],
      [[{ type: 'pull_request', parameters: {} }], '0'],
      [[{ type: 'pull_request', parameters: { required_review_thread_resolution: 'true' } }], '0'],
    ]
    const res = table(bash, cases.map(([v]) => ['mg_thread_enforced', J(v)]))
    cases.forEach(([v, out], i) => assert.deepEqual(res[i], { rc: 0, out }, J(v)))
    assert.equal(table(bash, [['mg_thread_enforced', '{"a":1}']])[0].rc, 1)
  })

  test(`${tag} mg_rsc: required status checks の {context, integration_id} を重複排除して返す（context 以外は含めない）`, () => {
    const rules = [
      rsc({ context: 'b', integration_id: 2, extra: 1 }, { context: 'a', integration_id: null }),
      { ...rsc({ context: 'b', integration_id: 2 }), ruleset_id: 9 },
      pr(true),
    ]
    const res = table(bash, [['mg_rsc', J(rules)]])
    assert.deepEqual(res[0], { rc: 0, out: J([{ context: 'a', integration_id: null }, { context: 'b', integration_id: 2 }]) })
  })

  test(`${tag} mg_external_bound_count: App ID と context の組の完全一致だけを数える（片方だけの一致は 0）`, () => {
    const set = J([{ context: 'Bugbot', integration_id: 100 }, { context: 'other', integration_id: 100 }, { context: 'Bugbot', integration_id: 200 }, { context: 'free', integration_id: null }])
    const cases = [
      [100, 'Bugbot', '1'],
      [200, 'Bugbot', '1'],
      [300, 'Bugbot', '0'], // context だけ一致（App ID が別）
      [100, 'missing', '0'], // App ID だけ一致（別 context）
      [100, 'free', '0'],
    ]
    const res = table(bash, cases.map(([id, ctx]) => ['mg_external_bound_count', set, String(id), ctx]))
    cases.forEach(([, , out], i) => assert.deepEqual(res[i], { rc: 0, out }))
    assert.equal(table(bash, [['mg_external_bound_count', set, 'abc', 'x']])[0].rc, 1)
  })

  test(`${tag} mg_client_only_count: required に含まれない check-run 名・commit status の context の件数（重複排除）`, () => {
    const req = J([{ context: 'ci', integration_id: 1 }, { context: 'lint', integration_id: 1 }])
    const cases = [
      [['ci', 'lint'], [], '0'],
      [['ci'], ['lint'], '0'],
      [['ci', 'extra'], [], '1'],
      [['ci'], ['extra'], '1'],
      [['ci', 'extra'], ['extra', 'x2'], '2'],
      [[], [], '0'],
    ]
    const res = table(bash, cases.map(([cr, st]) => ['mg_client_only_count', req, J(cr), J(st)]))
    cases.forEach(([, , out], i) => assert.deepEqual(res[i], { rc: 0, out }, String(i)))
    assert.equal(table(bash, [['mg_client_only_count', req, 'x', '[]']])[0].rc !== 0, true)
  })

  test(`${tag} mg_unbound_count: integration_id が数値でない required check の件数`, () => {
    const cases = [
      [[{ context: 'a', integration_id: 1 }], '0'],
      [[{ context: 'a', integration_id: null }], '1'],
      [[{ context: 'a', integration_id: '1' }], '1'],
      [[{ context: 'a' }], '1'],
      [[{ context: 'a', integration_id: 1 }, { context: 'b', integration_id: null }, { context: 'c', integration_id: null }], '2'],
      [[], '0'],
    ]
    const res = table(bash, cases.map(([v]) => ['mg_unbound_count', J(v)]))
    cases.forEach(([v, out], i) => assert.deepEqual(res[i], { rc: 0, out }, J(v)))
  })

  test(`${tag} mg_unissued_count: 宣言 integration_id と一致する App 発行の check-run が HEAD に無い required context の件数（null 同士は一致にしない）`, () => {
    const req = J([{ context: 'ci', integration_id: 15368 }, { context: 'sec', integration_id: 7 }])
    const cases = [
      [[{ n: 'ci', a: 15368 }, { n: 'sec', a: 7 }], '0'],
      [[{ n: 'ci', a: 15368 }], '1'],
      [[{ n: 'ci', a: 15368 }, { n: 'sec', a: 8 }], '1'], // 名前は同じだが別の App が発行
      [[{ n: 'ci', a: 1 }, { n: 'sec', a: 2 }], '2'],
      [[], '2'],
    ]
    const res = table(bash, cases.map(([runs]) => ['mg_unissued_count', req, J(runs)]))
    cases.forEach(([, out], i) => assert.deepEqual(res[i], { rc: 0, out }, String(i)))
    // 未束縛の required（integration_id が null）は、app が無い check-run（a が null）とも一致にしない
    const loose = J([{ context: 'ci', integration_id: null }])
    assert.deepEqual(table(bash, [['mg_unissued_count', loose, J([{ n: 'ci', a: null }])]])[0], { rc: 0, out: '1' })
  })

  test(`${tag} mg_checks_counts: 「総数 合格以外の件数」。合格は SUCCESS / NEUTRAL / SKIPPED だけ。想定外の形は判定不能`, () => {
    const cases = [
      [['SUCCESS', 'NEUTRAL', 'SKIPPED'], 0, '3 0'],
      [['SUCCESS', 'FAILURE'], 0, '2 1'],
      [['SUCCESS', 'PENDING', 'QUEUED', 'IN_PROGRESS'], 0, '4 3'],
      [['CANCELLED', 'TIMED_OUT', 'ACTION_REQUIRED', 'SUCCESS'], 0, '4 3'],
      [['success'], 0, '1 1'], // 小文字は SUCCESS ではない（gh pr checks は大文字で返す）
      [[], 0, '0 0'],
      [['SUCCESS', 1], 1, ''],
      [{ state: 'SUCCESS' }, 1, ''],
    ]
    const res = table(bash, cases.map(([v]) => ['mg_checks_counts', J(v)]))
    cases.forEach(([v, rc, out], i) => assert.deepEqual(res[i], { rc, out }, J(v)))
  })

  test(`${tag} mg_external_verdict: cursor はレビュー到着 + CHANGES_REQUESTED なし、その他は check-run 合格（0 件ならレビュー APPROVED のみ）`, () => {
    const cases = [
      // [kind, check-run の結論, レビュー state, 期待]
      ['cursor', [], ['COMMENTED'], 'ok'],
      ['cursor', [], ['COMMENTED', 'APPROVED'], 'ok'],
      ['cursor', [], [], 'missing'],
      ['cursor', [], ['COMMENTED', 'CHANGES_REQUESTED'], 'missing'],
      ['cursor', [], ['DISMISSED'], 'ok'], // 総数に DISMISSED を含む（旧プロンプトと同じ。否定的 state が無ければ合格）
      ['other', ['success', 'neutral', 'skipped'], [], 'ok'],
      ['other', ['success', 'failure'], ['APPROVED'], 'not-green'], // APPROVED が併存しても check-run の不合格が勝つ
      ['other', ['success', 'in_progress'], [], 'not-green'],
      ['other', ['queued'], [], 'not-green'],
      ['other', [], ['APPROVED'], 'ok'],
      ['other', [], ['APPROVED', 'APPROVED'], 'ok'],
      ['other', [], ['APPROVED', 'CHANGES_REQUESTED'], 'missing'],
      ['other', [], ['APPROVED', 'COMMENTED'], 'missing'],
      ['other', [], ['APPROVED', 'PENDING'], 'missing'],
      ['other', [], ['APPROVED', 'DISMISSED'], 'ok'],
      ['other', [], [], 'missing'],
      ['other', [], ['COMMENTED'], 'missing'],
    ]
    const res = table(bash, cases.map(([k, cr, rv]) => ['mg_external_verdict', k, J(cr), J(rv)]))
    cases.forEach(([k, cr, rv, out], i) => assert.deepEqual(res[i], { rc: 0, out }, `${k} ${J(cr)} ${J(rv)}`))
    assert.equal(table(bash, [['mg_external_verdict', 'other', 'x', '[]']])[0].rc !== 0, true)
  })
}
