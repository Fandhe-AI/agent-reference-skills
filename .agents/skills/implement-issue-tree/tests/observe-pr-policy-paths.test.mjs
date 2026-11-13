// observe-pr.sh --mode policy-paths（fix を経た PR の計画外の方針パス変更の観測。Issue #760）を、偽 gh
// （tests/lib/gh-observe-stub.mjs）を PATH の先頭に置いて実際に実行する回帰テスト。判定の表は tests/policy-paths-unit.test.mjs。
//
// 検証する契約:
//   - REST を読む: pulls/<pr>（state・merged・changed_files）と pulls/<pr>/files（ページ送り）。--repo があれば repos/<repo> に束縛する
//   - 方針パスの件数と、--allow に無い件数（unplanned）を返す。リネームは新旧の両方を数える
//   - OPEN でない PR は一覧を取らず 0 件。changed_files が取得件数より多ければ truncated:1
//   - payload はパスの文字列を含めず、inputSha256 は他のモードの 9 行に allow の行を足したもの
//   - 取得失敗・形の違う応答は err=1（0 件に畳まない）。--allow の誤り・他のモードでの指定は exit 2
// 利用できる bash をすべて回す。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { availableBashes, expectedSha256, inputSha256, toolExists } from './lib/signed-output.mjs'
import { createObserveStub } from './lib/gh-observe-stub.mjs'

const SCRIPT = join(dirname(fileURLToPath(import.meta.url)), '..', 'scripts', 'observe-pr.sh')
const NONCE = 'pp0b1c2d3e4f5a6b7c8d9e0f'
const jqAvailable = toolExists('jq')

const pull = (over = {}) => JSON.stringify({ state: 'open', merged: false, changed_files: 3, ...over })
const page = (names) => JSON.stringify(names.map((n) => (Array.isArray(n) ? { filename: n[0], previous_filename: n[1], status: 'renamed' } : { filename: n, status: 'modified' })))
const inputOf = ({ pr, repo = '', allow = '' }) => ['observe-pr', 'policy-paths', pr, repo, '', '', '', '', '', allow].join('\n')

function run(bash, stub, args) {
  return spawnSync(bash, [SCRIPT, '--nonce', NONCE, '--mode', 'policy-paths', ...args], { encoding: 'utf8', env: stub.env() })
}
function envelope(r) {
  assert.equal(r.status, 0, `exit ${r.status} / stderr: ${r.stderr}`)
  assert.match(r.stdout, /^[^\n]+\n$/, '標準出力は 1 行')
  const e = JSON.parse(r.stdout)
  assert.equal(e.nonce, NONCE)
  assert.equal(e.sha256, expectedSha256(NONCE, e.payload))
  return e.payload
}

for (const bash of availableBashes()) {
  const t = (name, fn) => test(`[${bash}] ${name}`, { skip: !jqAvailable }, fn)

  t('ページ送りの合算・リネームの新旧・許可の差し引きを数え、パスの文字列を payload に入れない', () => {
    const stub = createObserveStub({
      pulls: { out: pull({ changed_files: 4 }) },
      'pulls-files': { out: `${page(['src/a.js', '.github/workflows/ci.yml'])}\n${page([['docs/x.yml', '.github/workflows/old.yml'], 'CODEOWNERS'])}` },
    })
    const p = envelope(run(bash, stub, ['--pr', '7', '--repo', 'o/r', '--allow', '.github/workflows/']))
    assert.deepEqual(p, {
      mode: 'policy-paths', inputSha256: inputSha256(inputOf({ pr: '7', repo: 'o/r', allow: '.github/workflows/' })), outcome: 'observed', err: 0,
      state: 'OPEN', files: 4, policy: 3, unplanned: 1, truncated: 0,
    })
    assert.doesNotMatch(JSON.stringify(p), /workflows|CODEOWNERS|docs|src/)
    const calls = stub.calls()
    assert.match(calls[0], /repos\/o\/r\/pulls\/7$/)
    assert.match(calls[1], /--paginate repos\/o\/r\/pulls\/7\/files\?per_page=100/)
  })

  t('pulls/files は filename / previous_filename だけへ --jq で射影して取る（巨大な patch を含む応答でも成功する）', () => {
    const big = 'x'.repeat(200000)
    const raw = JSON.stringify([
      { filename: 'src/a.js', status: 'modified', patch: big },
      { filename: 'docs/x.yml', previous_filename: '.github/workflows/old.yml', status: 'renamed', patch: big },
    ])
    const stub = createObserveStub({ pulls: { out: pull({ changed_files: 2 }) }, 'pulls-files': { out: raw } })
    const p = envelope(run(bash, stub, ['--pr', '7', '--repo', 'o/r']))
    assert.equal(p.err, 0)
    assert.equal(p.files, 2)
    assert.equal(p.policy, 1)
    assert.match(stub.calls()[1], /--jq \[\.\[\] \| \{filename, previous_filename\}\]/)
  })

  t('--allow なしは方針パスが全件計画外。--repo なしは gh のプレースホルダ', () => {
    const stub = createObserveStub({ pulls: { out: pull({ changed_files: 1 }) }, 'pulls-files': { out: page(['.github/workflows/ci.yml']) } })
    const p = envelope(run(bash, stub, ['--pr', '7']))
    assert.deepEqual([p.err, p.policy, p.unplanned, p.truncated], [0, 1, 1, 0])
    assert.equal(p.inputSha256, inputSha256(inputOf({ pr: '7' })))
    assert.match(stub.calls()[0], /repos\/\{owner\}\/\{repo\}\/pulls\/7$/)
  })

  t('OPEN でない PR は一覧を取らず 0 件で返す', () => {
    for (const [body, state] of [[pull({ state: 'closed', merged: true }), 'MERGED'], [pull({ state: 'closed' }), 'CLOSED']]) {
      const stub = createObserveStub({ pulls: { out: body } })
      const p = envelope(run(bash, stub, ['--pr', '7']))
      assert.deepEqual([p.err, p.state, p.policy, p.unplanned], [0, state, 0, 0])
      assert.equal(stub.countOf('pulls-files'), 0)
    }
  })

  t('changed_files が取得件数より多ければ truncated:1（REST の上限）', () => {
    const stub = createObserveStub({ pulls: { out: pull({ changed_files: 3001 }) }, 'pulls-files': { out: page(['src/a.js']) } })
    const p = envelope(run(bash, stub, ['--pr', '7']))
    assert.deepEqual([p.err, p.files, p.truncated], [0, 1, 1])
  })

  t('取得失敗・HTTP エラー・形の違う応答は err=1 で、件数は 0 に戻る', () => {
    const bad = [
      { pulls: { out: '{"message":"Not Found"}', exit: 1 } },
      { pulls: { out: '{"state":"open"}' } },
      { pulls: { out: pull() }, 'pulls-files': { out: '{"message":"x"}', exit: 1 } },
      { pulls: { out: pull() }, 'pulls-files': { out: '{"filename":"a"}' } },
      { pulls: { out: pull() }, 'pulls-files': { out: '[{"status":"added"}]' } },
    ]
    for (const routes of bad) {
      const p = envelope(spawnRun(bash, createObserveStub(routes), ['--pr', '7']))
      assert.deepEqual([p.err, p.outcome, p.policy, p.unplanned, p.state], [1, 'error', 0, 0, ''], JSON.stringify(routes))
    }
  })

  t('--allow の誤りと他のモードでの指定は exit 2（gh を呼ばない）', () => {
    const many = Array.from({ length: 21 }, (_, i) => `a${i}`).join(',')
    for (const allow of ['a b', '-x', '/abs', 'a/../b', 'a//b', ',a', 'a,', 'a,,b', 'a,a', 'a;rm', '$(x)', many, `${'x'.repeat(201)}`]) {
      const stub = createObserveStub({})
      const r = run(bash, stub, ['--pr', '7', '--allow', allow])
      assert.equal(r.status, 2, `allow=${allow}: exit ${r.status}`)
      assert.equal(stub.calls().length, 0)
    }
    const other = spawnSync(bash, [SCRIPT, '--nonce', NONCE, '--mode', 'threads', '--pr', '7', '--allow', 'a'], { encoding: 'utf8', env: createObserveStub({}).env() })
    assert.equal(other.status, 2)
    assert.equal(run(bash, createObserveStub({ pulls: { out: pull({ state: 'closed' }) } }), ['--pr', '7', '--allow', '']).status, 0, '空の --allow は許可なし')
  })
}

// 失敗のループで同じ run を使う薄い別名
function spawnRun(bash, stub, args) {
  return run(bash, stub, args)
}
