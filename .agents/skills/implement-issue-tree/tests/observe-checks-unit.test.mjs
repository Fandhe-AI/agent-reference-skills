// scripts/lib/observe-checks-lib.sh（observe-pr.sh の checks --until settled の分類だけの純関数）を、表で単体検査する回帰テスト
// （Issue #603 第 8 弾）。
//
// check-run の配列と commit status の配列を「合格 未完了 不合格」の件数に分類する規則を、git・gh を呼ばずに 1 回の bash 起動で
// 表の全ケースに当てる（スクリプト全体を偽 gh で走らせるケースは tests/observe-pr-checks-settled.test.mjs）。
// 契約: 合格 = success / neutral / skipped、未完了 = queued 系、それ以外（未知の語彙を含む）はすべて不合格。形の違う入力は件数を出さず rc 1。
// 利用できる bash（macOS の 3.2 と Homebrew の 5 など）をすべて回す。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { availableBashes, toolExists } from './lib/signed-output.mjs'

const LIB = join(dirname(fileURLToPath(import.meta.url)), '..', 'scripts', 'lib', 'observe-checks-lib.sh')
const US = '\u001f'

const DRIVER = `
set -u
LC_ALL=C
export LC_ALL
. "$1" || exit 9
US=$(printf '\\037')
i=0
while IFS="$US" read -r runs sts; do
  rc=0
  out=$(checks_classify "$runs" "$sts") || rc=$?
  printf '%s %s [%s]\\n' "$i" "$rc" "$out"
  i=$((i + 1))
done
`

function table(bash, rows) {
  const lines = rows.map(([runs, sts]) => `${typeof runs === 'string' ? runs : JSON.stringify(runs)}${US}${typeof sts === 'string' ? sts : JSON.stringify(sts)}`).join('\n') + '\n'
  const r = spawnSync(bash, ['-c', DRIVER, 'driver', LIB], { input: lines, encoding: 'utf8' })
  assert.equal(r.status, 0, `exit ${r.status} / stderr: ${r.stderr}`)
  const out = r.stdout.split('\n').filter((l) => l !== '')
  assert.equal(out.length, rows.length, `行数が合わない:\n${r.stdout}`)
  return out.map((l, i) => {
    const m = /^(\d+) (\d+) \[(.*)\]$/.exec(l)
    assert.ok(m && Number(m[1]) === i, l)
    return { rc: Number(m[2]), out: m[3] }
  })
}

const run = (status, conclusion = null) => ({ status, conclusion })
const st = (state) => ({ state })

for (const bash of availableBashes()) {
  const tag = `[${bash}]`
  const t = (name, fn) => test(`${tag} ${name}`, { skip: !toolExists('jq') }, fn)

  t('checks_classify: check-run は conclusion（無ければ status）で 合格 / 未完了 / 不合格 に分かれる', () => {
    // [runs, statuses, 期待「合格 未完了 不合格」]
    const cases = [
      [[run('completed', 'success')], [], '1 0 0'],
      [[run('completed', 'neutral')], [], '1 0 0'],
      [[run('completed', 'skipped')], [], '1 0 0'],
      [[run('queued')], [], '0 1 0'],
      [[run('in_progress')], [], '0 1 0'],
      [[run('waiting')], [], '0 1 0'],
      [[run('pending')], [], '0 1 0'],
      [[run('requested')], [], '0 1 0'],
      [[run('completed', 'failure')], [], '0 0 1'],
      [[run('completed', 'cancelled')], [], '0 0 1'],
      [[run('completed', 'timed_out')], [], '0 0 1'],
      [[run('completed', 'action_required')], [], '0 0 1'],
      [[run('completed', 'stale')], [], '0 0 1'],
      [[run('completed', 'startup_failure')], [], '0 0 1'],
      // 未知の語彙は合格にも未完了にも倒さない（不合格側）
      [[run('completed', 'some_new_conclusion')], [], '0 0 1'],
      [[run('some_new_status')], [], '0 0 1'],
      // completed なのに conclusion が無い（想定外）も合格にしない
      [[run('completed')], [], '0 0 1'],
      // 混在
      [[run('completed', 'success'), run('in_progress'), run('completed', 'failure'), run('completed', 'skipped')], [], '2 1 1'],
      [[], [], '0 0 0'],
    ]
    const got = table(bash, cases.map(([a, b]) => [a, b]))
    cases.forEach(([a], i) => assert.deepEqual(got[i], { rc: 0, out: cases[i][2] }, JSON.stringify(a)))
  })

  t('checks_classify: commit status は state が success なら合格、pending なら未完了、それ以外は不合格（commit status だけの CI も数える）', () => {
    const cases = [
      [[], [st('success')], '1 0 0'],
      [[], [st('pending')], '0 1 0'],
      [[], [st('failure')], '0 0 1'],
      [[], [st('error')], '0 0 1'],
      [[], [st('something_else')], '0 0 1'],
      [[], [st('success'), st('success'), st('pending'), st('error')], '2 1 1'],
      // check-run と commit status は合算する
      [[run('completed', 'success')], [st('pending')], '1 1 0'],
    ]
    const got = table(bash, cases.map(([a, b]) => [a, b]))
    cases.forEach(([a, b], i) => assert.deepEqual(got[i], { rc: 0, out: cases[i][2] }, JSON.stringify([a, b])))
  })

  t('checks_classify: 進行中（status が未完了）の check-run は conclusion を持っていても未完了に数える', () => {
    const cases = [
      [[run('in_progress', 'success')], [], '0 1 0'],
      [[run('queued', 'failure')], [], '0 1 0'],
      [[run('completed', 'success'), run('in_progress', 'cancelled')], [], '1 1 0'],
    ]
    const got = table(bash, cases.map(([a, b]) => [a, b]))
    cases.forEach(([a], i) => assert.deepEqual(got[i], { rc: 0, out: cases[i][2] }, JSON.stringify(a)))
  })

  t('checks_classify: 同じ (app.id, name) の重複は id 最大の 1 件だけを数える。別 app・別名・id か名前が無い要素は畳まない', () => {
    const r = (id, name, conclusion, appId = 1) => ({ id, name, app: { id: appId }, status: 'completed', conclusion })
    const s = (id, context, state) => ({ id, context, state })
    const cases = [
      // cancelled が古く success が新しい → 合格 1
      [[r(1, 'build', 'cancelled'), r(2, 'build', 'success')], [], '1 0 0'],
      // 並び順が逆でも id 最大が勝つ
      [[r(2, 'build', 'success'), r(1, 'build', 'cancelled')], [], '1 0 0'],
      // 新しい方が failure なら不合格のまま
      [[r(1, 'build', 'success'), r(2, 'build', 'failure')], [], '0 0 1'],
      // 最新が進行中なら未完了
      [[r(1, 'build', 'cancelled'), { id: 2, name: 'build', app: { id: 1 }, status: 'in_progress', conclusion: null }], [], '0 1 0'],
      // app.id が違えば別の check
      [[r(1, 'build', 'cancelled', 1), r(2, 'build', 'success', 2)], [], '1 0 1'],
      // 名前が違えば別の check
      [[r(1, 'a', 'cancelled'), r(2, 'b', 'success')], [], '1 0 1'],
      // id か名前が無い要素は畳まない
      [[{ name: 'x', status: 'completed', conclusion: 'cancelled' }, { name: 'x', status: 'completed', conclusion: 'success' }], [], '1 0 1'],
      [[{ id: 1, status: 'completed', conclusion: 'cancelled' }, { id: 2, status: 'completed', conclusion: 'success' }], [], '1 0 1'],
      // commit status は同じ context の id 最大
      [[], [s(1, 'ci', 'failure'), s(2, 'ci', 'success')], '1 0 0'],
      [[], [s(2, 'ci', 'success'), s(1, 'ci', 'failure'), s(3, 'other', 'pending')], '1 1 0'],
    ]
    const got = table(bash, cases.map(([a, b]) => [a, b]))
    cases.forEach(([a, b], i) => assert.deepEqual(got[i], { rc: 0, out: cases[i][2] }, JSON.stringify([a, b])))
  })

  t('checks_classify: 標準入力で渡すので 1 引数 128 KiB を超える入力（150 件 × 長い output.text）でも分類できる', () => {
    const big = 'x'.repeat(10000)
    const many = Array.from({ length: 150 }, (_, i) => ({ id: i + 1, name: `job-${i}`, status: 'completed', conclusion: 'success', output: { text: big } }))
    const got = table(bash, [[many, []]])
    assert.deepEqual(got[0], { rc: 0, out: '150 0 0' })
  })

  t('checks_classify: 形の違う入力は件数を出さず rc 1 を返す（0 件に畳まない）', () => {
    const bad = [
      ['null', '[]'],
      ['[]', 'null'],
      ['{}', '[]'],
      ['[]', '{"state":"success"}'],
      ['["success"]', '[]'],
      [[{ conclusion: 'success' }], []], // status が無い
      [[{ status: 3 }], []],
      [[{ status: 'completed', conclusion: 5 }], []],
      [[], [{ context: 'ci' }]], // state が無い
      [[], [{ state: 1 }]],
      [[], ['success']],
      ['', ''],
    ]
    const got = table(bash, bad)
    got.forEach((g, i) => assert.deepEqual(g, { rc: 1, out: '' }, JSON.stringify(bad[i])))
  })
}
