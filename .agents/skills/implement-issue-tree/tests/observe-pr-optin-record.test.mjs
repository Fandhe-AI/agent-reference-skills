// observe-pr.sh --mode optin-record（マージ前の opt-in テスト記録ゲートの観測。Issue #495 の記録確認を #603 でスクリプト化）を、偽 gh
// （tests/lib/gh-observe-stub.mjs）を PATH の先頭に置いて実際に実行する回帰テスト。件数の数え方の表は tests/optin-record-unit.test.mjs。
//
// 検証する契約:
//   - gh pr view の 1 回の呼び出し（--json body,headRefOid。--repo があれば -R に束縛）で本文と HEAD sha を取る
//   - 宣言コマンド（--optin-cmd。渡した順）ごとに、現在の HEAD の sha に対する pass の件数と、fail + not-run の件数を返す
//   - payload は headSha と整数の配列だけで、本文・コマンドの文字列を含まない。inputSha256 は 9 行 + 個数 + 各コマンド
//   - 取得失敗・形の違う応答・HEAD sha の形式不正は err=1（0 件に畳まない）。本文が null は空の本文（件数 0）
//   - --optin-cmd の誤り（許可外の文字・改行・重複・0 個・11 個・他のモードでの指定）と --wait は exit 2（gh を呼ばない）
// 利用できる bash をすべて回す。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { chmodSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { availableBashes, expectedSha256, inputSha256, toolExists } from './lib/signed-output.mjs'
import { createObserveStub } from './lib/gh-observe-stub.mjs'

const SCRIPT = join(dirname(fileURLToPath(import.meta.url)), '..', 'scripts', 'observe-pr.sh')
const NONCE = 'or0b1c2d3e4f5a6b7c8d9e0f'
const jqAvailable = toolExists('jq')
const SHA = 'a'.repeat(40)
const OLD = 'b'.repeat(40)
// 本文に入れる固有の文字列。標準出力にも標準エラーにも現れてはならない（本文は件数にだけ使い、内容を返さない）
const CANARY = 'CANARY-本文-9f3c1d7e'
const marker = (sha, result, cmd) => `<!-- optin-test-record: ${sha} ${result} ${cmd} -->`
const view = (body, over = {}) => JSON.stringify({ body, headRefOid: SHA, ...over })
const inputOf = ({ pr, repo = '', cmds }) => ['observe-pr', 'optin-record', pr, repo, '', '', '', '', '', String(cmds.length), ...cmds].join('\n')
const cmdArgs = (cmds) => cmds.flatMap((c) => ['--optin-cmd', c])

function run(bash, stub, args) {
  return spawnSync(bash, [SCRIPT, '--nonce', NONCE, '--mode', 'optin-record', ...args], { encoding: 'utf8', env: stub.env() })
}
function envelope(r) {
  assert.equal(r.status, 0, `exit ${r.status} / stderr: ${r.stderr}`)
  assert.ok(!r.stdout.includes(CANARY) && !r.stderr.includes(CANARY), '本文の文字列が標準出力・標準エラーへ出ていない')
  assert.match(r.stdout, /^[^\n]+\n$/, '標準出力は 1 行')
  const e = JSON.parse(r.stdout)
  assert.equal(e.nonce, NONCE)
  assert.equal(e.sha256, expectedSha256(NONCE, e.payload))
  return e.payload
}

for (const bash of availableBashes()) {
  const t = (name, fn) => test(`[${bash}] ${name}`, { skip: !jqAvailable }, fn)

  t('宣言コマンドごとに、現在の HEAD の pass と pass 以外を渡した順に数える。gh は 1 回だけ（-R 束縛）', () => {
    const cmds = ['make e2e', 'cargo test -- --ignored', 'make none']
    const body = [
      `ふつうの本文 ${CANARY}`,
      marker(SHA, 'pass', 'make e2e'),
      `  ${marker(SHA, 'fail', 'make e2e')}\r`,
      marker(SHA, 'pass', 'cargo test -- --ignored'),
      marker(SHA, 'not-run', 'cargo test -- --ignored'),
      marker(SHA, 'not-run', 'cargo test -- --ignored'),
      marker(OLD, 'pass', 'make none'),
    ].join('\n')
    const stub = createObserveStub({ prview: { out: view(body) } })
    const p = envelope(run(bash, stub, ['--pr', '7', '--repo', 'o/r', ...cmdArgs(cmds)]))
    assert.deepEqual(p, {
      mode: 'optin-record', inputSha256: inputSha256(inputOf({ pr: '7', repo: 'o/r', cmds })), outcome: 'observed', err: 0,
      headSha: SHA, pass: [1, 1, 0], nonPass: [1, 2, 0],
    })
    assert.doesNotMatch(JSON.stringify(p), /make|cargo|ふつう/)
    assert.deepEqual(stub.calls(), ['pr view 7 -R o/r --json body,headRefOid'])
  })

  t('LC_ALL=C が削らない Unicode の空白（全角空白・NBSP・U+2028）が付いた fail / not-run 行も pass 以外に数える。先頭 NBSP の pass 行は数えない', () => {
    const cmds = ['make e2e', 'make b', 'make c', 'make d']
    const body = [
      `${CANARY}`,
      marker(SHA, 'pass', 'make e2e'),
      `\u3000${marker(SHA, 'fail', 'make e2e')}`,
      marker(SHA, 'pass', 'make b'),
      `${marker(SHA, 'fail', 'make b')}\u00a0`,
      marker(SHA, 'pass', 'make c'),
      `\u2028${marker(SHA, 'not-run', 'make c')}`,
      `\u00a0${marker(SHA, 'pass', 'make d')}`,
      '- opt-in テスト結果: make d => fail',
    ].join('\n')
    const stub = createObserveStub({ prview: { out: view(body) } })
    const p = envelope(run(bash, stub, ['--pr', '7', ...cmdArgs(cmds)]))
    assert.deepEqual([p.err, p.pass, p.nonPass], [0, [1, 1, 1, 0], [1, 1, 1, 0]])
  })

  t('--repo なしは gh の既定の解決。大きな本文の末尾のマーカーも数える。正規表現の記号は固定文字列として扱う', () => {
    const cmds = ['make a.b', 'make a+b']
    const body = `${'x'.repeat(60000)}\n${marker(SHA, 'pass', 'make a.b')}\n${marker(SHA, 'pass', 'make aXb')}\n${marker(SHA, 'pass', 'make a+b')}`
    const stub = createObserveStub({ prview: { out: view(body) } })
    const p = envelope(run(bash, stub, ['--pr', '7', ...cmdArgs(cmds)]))
    assert.deepEqual([p.err, p.pass, p.nonPass], [0, [1, 1], [0, 0]])
    assert.equal(p.inputSha256, inputSha256(inputOf({ pr: '7', cmds })))
    assert.deepEqual(stub.calls(), ['pr view 7 --json body,headRefOid'])
  })

  t('宣言コマンドは 10 個まで。本文が null は空の本文（件数 0・err 0）', () => {
    const cmds = Array.from({ length: 10 }, (_, i) => `make t${i}`)
    const stub = createObserveStub({ prview: { out: view(null) } })
    const p = envelope(run(bash, stub, ['--pr', '7', ...cmdArgs(cmds)]))
    assert.deepEqual([p.err, p.outcome, p.headSha, p.pass, p.nonPass], [0, 'observed', SHA, Array(10).fill(0), Array(10).fill(0)])
  })

  t('同じ並びでも渡す順が違えば inputSha256 が変わる（ホストの照合が順序と個数を束縛する）', () => {
    const stub = createObserveStub({ prview: { out: view('') } })
    const a = envelope(run(bash, stub, ['--pr', '7', ...cmdArgs(['make a', 'make b'])]))
    const b = envelope(run(bash, stub, ['--pr', '7', ...cmdArgs(['make b', 'make a'])]))
    const c = envelope(run(bash, stub, ['--pr', '7', ...cmdArgs(['make a'])]))
    assert.equal(new Set([a.inputSha256, b.inputSha256, c.inputSha256]).size, 3)
  })

  t('取得失敗・HTTP エラー・形の違う応答・HEAD sha の形式不正は err=1 で、headSha は空・件数の配列は空に戻る', () => {
    const bad = [
      { prview: { out: '{"message":"Not Found"}', exit: 1 } },
      { prview: { out: '' } },
      { prview: { out: 'not json' } },
      { prview: { out: '[]' } },
      { prview: { out: JSON.stringify({ body: 'x' }) } },
      { prview: { out: JSON.stringify({ body: 5, headRefOid: SHA }) } },
      { prview: { out: JSON.stringify({ body: {}, headRefOid: SHA }) } },
      { prview: { out: view('', { headRefOid: 'A'.repeat(40) }) } },
      { prview: { out: view('', { headRefOid: 'a'.repeat(39) }) } },
      { prview: { out: view('', { headRefOid: 'a'.repeat(41) }) } },
      { prview: { out: view('', { headRefOid: 5 }) } },
      { prview: { out: view('', { headRefOid: '' }) } },
    ]
    for (const routes of bad) {
      const p = envelope(run(bash, createObserveStub(routes), ['--pr', '7', ...cmdArgs(['make e2e'])]))
      assert.deepEqual([p.err, p.outcome, p.headSha, p.pass, p.nonPass], [1, 'error', '', [], []], JSON.stringify(routes))
    }
  })

  t('--optin-cmd の誤りは exit 2（gh を呼ばない）。0 個・11 個・許可外の文字・改行・重複・先頭が記号・長すぎる', () => {
    const many = Array.from({ length: 11 }, (_, i) => `make t${i}`)
    const cases = [
      [],
      many,
      ["make 'x'"],
      ['make "x"'],
      ['make $(x)'],
      ['make `x`'],
      ['make a;b'],
      ['make a\nmake b'],
      ['make a\\b'],
      ['make e2e', 'make e2e'],
      ['-x'],
      [' make'],
      [''],
      ['a'.repeat(201)],
      ['make テスト'],
    ]
    for (const cmds of cases) {
      const stub = createObserveStub({ prview: { out: view('') } })
      const r = run(bash, stub, ['--pr', '7', ...cmdArgs(cmds)])
      assert.equal(r.status, 2, `${JSON.stringify(cmds)}: exit ${r.status}`)
      assert.equal(r.stdout, '', '封筒は出力しない')
      assert.equal(stub.calls().length, 0)
    }
  })

  t('--optin-cmd は optin-record だけが取る。--wait も取らない（exit 2）', () => {
    const other = spawnSync(bash, [SCRIPT, '--nonce', NONCE, '--mode', 'threads', '--pr', '7', '--optin-cmd', 'make e2e'], { encoding: 'utf8', env: createObserveStub({}).env() })
    assert.equal(other.status, 2)
    const stub = createObserveStub({ prview: { out: view('') } })
    const waited = run(bash, stub, ['--pr', '7', '--wait', '--attempt', '1', ...cmdArgs(['make e2e'])])
    assert.equal(waited.status, 2)
    assert.equal(stub.calls().length, 0)
  })

  t('grep が 0 / 1 以外で終わる（構文エラー・入出力エラー）と 0 件に畳まず err=1（headSha は空・配列は空）', () => {
    const stub = createObserveStub({ prview: { out: view(marker(SHA, 'pass', 'make e2e')) } })
    // スタブのディレクトリは PATH の先頭にある。そこへ exit 2 の偽の grep を置く
    writeFileSync(join(stub.dir, 'grep'), '#!/bin/sh\nexit 2\n')
    chmodSync(join(stub.dir, 'grep'), 0o755)
    const p = envelope(run(bash, stub, ['--pr', '7', ...cmdArgs(['make e2e'])]))
    assert.deepEqual([p.err, p.outcome, p.headSha, p.pass, p.nonPass], [1, 'error', '', [], []])
    // 件数が数字でない出力も同じ
    writeFileSync(join(stub.dir, 'grep'), '#!/bin/sh\necho x\nexit 0\n')
    const q = envelope(run(bash, stub, ['--pr', '7', ...cmdArgs(['make e2e'])]))
    assert.deepEqual([q.err, q.headSha, q.pass], [1, '', []])
  })

  t('正規化の tr が失敗する（偽の tr が exit 1）と 0 件に畳まず err=1', () => {
    const stub = createObserveStub({ prview: { out: view(marker(SHA, 'pass', 'make e2e')) } })
    writeFileSync(join(stub.dir, 'tr'), '#!/bin/sh\ncat >/dev/null\nexit 1\n')
    chmodSync(join(stub.dir, 'tr'), 0o755)
    const p = envelope(run(bash, stub, ['--pr', '7', ...cmdArgs(['make e2e'])]))
    assert.deepEqual([p.err, p.outcome, p.headSha, p.pass, p.nonPass], [1, 'error', '', [], []])
  })

  t('200 文字のコマンドも通る（許可形の上限）。記号 _./:=@+,- を含む', () => {
    const cmds = ['make ' + 'a'.repeat(195), 'cargo test -p a_b --features x=1,y -- --ignored']
    const body = `${marker(SHA, 'pass', cmds[0])}\n${marker(SHA, 'pass', cmds[1])}`
    const p = envelope(run(bash, createObserveStub({ prview: { out: view(body) } }), ['--pr', '7', ...cmdArgs(cmds)]))
    assert.deepEqual([p.err, p.pass, p.nonPass], [0, [1, 1], [0, 0]])
  })
}
