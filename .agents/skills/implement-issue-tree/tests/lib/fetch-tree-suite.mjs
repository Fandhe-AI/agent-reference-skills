// scripts/fetch-tree.sh を偽 gh で実行して確かめる回帰テスト一式（Issue #668）。
// bash ごとに登録できるよう関数にしてある（tests/fetch-tree.test.mjs が 1 つ目の bash、
// tests/fetch-tree-alt-bash.test.mjs が 2 つ目以降）。node --test はファイル単位で並列に走るため、
// bash ごとにファイルを分けると所要が bash の数ではなく 1 つ分で済む（base-merge-suite と同じ分割）。
//
// 期待する検査値（nodesSha256 など）は、ホストの実装・スクリプトの実装とは独立に node:crypto で計算する。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { copyFileSync, mkdirSync, mkdtempSync, readdirSync, writeFileSync, readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { spawnSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { makeGhTreeStub, issue } from './gh-tree-stub.mjs'
import { trackTmp } from './tmp-track.mjs'
import { expectedSha256 } from './signed-output.mjs'
import { bundleSha256 } from '../../scripts/build-workflow.mjs'

const HERE = dirname(fileURLToPath(import.meta.url))
export const SCRIPTS = join(HERE, '..', '..', 'scripts')
export const SCRIPT = join(SCRIPTS, 'fetch-tree.sh')
export const RUN_VERIFIED = join(SCRIPTS, 'run-verified.sh')
const NONCE = 'abc123nonce'
const sha = (s) => createHash('sha256').update(s, 'utf8').digest('hex')

// 独立実装: 6 欄のダイジェスト（number 昇順・title は SHA-256 の 16 進）
export function independentNodesSha(rows) {
  return sha(
    [...rows]
      .sort((a, b) => a.number - b.number)
      .map((r) => [r.number, r.parent, r.siblingIndex, r.state, r.subIssuesTotal, sha(r.title)].join('\t'))
      .join('\n'),
  )
}
export const inputShaOf = (root, repo = '') => sha(`fetch-tree\n${root}\n${repo}`)

export function run(bash, stub, args, { script = SCRIPT, launcher = null } = {}) {
  const argv = launcher ? [launcher.runVerified, launcher.sha, launcher.name, ...args] : [script, ...args]
  const r = spawnSync(bash, argv, { env: stub.env(), encoding: 'utf8' })
  return { status: r.status, stdout: r.stdout, stderr: r.stderr }
}

// 標準出力を { rows, envelope } に分ける
export function parseOut(stdout) {
  const lines = stdout.replace(/\n$/, '').split('\n')
  const envelope = JSON.parse(lines[lines.length - 1])
  const rows = lines.slice(0, -1).map((l) => {
    const [number, parent, siblingIndex, state, subIssuesTotal, ...t] = l.split('\t')
    return { number: Number(number), parent: Number(parent), siblingIndex: Number(siblingIndex), state, subIssuesTotal: Number(subIssuesTotal), title: t.join('\t') }
  })
  return { rows, envelope }
}

const P = 'repos/o/r'
// 3 階層: 1 -> (2 closed, 3) ; 2 -> (4) ; 4 -> (5)
function smallTree() {
  return {
    [`${P}/issues/1`]: issue(1, { title: 'root', total: 2 }),
    [`${P}/issues/1/sub_issues`]: { pages: [[issue(2, { state: 'closed', total: 1, title: '日本語 🎉 title' }), issue(3, { title: 'plain' })]] },
    [`${P}/issues/2/sub_issues`]: { pages: [[issue(4, { total: 1 })]] },
    [`${P}/issues/4/sub_issues`]: { pages: [[issue(5)]] },
  }
}

export function registerFetchTreeTests(bash) {
  const tag = `[${bash}]`

  test(`${tag} 3 階層のツリーで TSV と封筒が期待どおり（closed の中間ノードも貫通・total 0 では sub_issues を呼ばない）`, () => {
    const stub = makeGhTreeStub(smallTree())
    const r = run(bash, stub, ['--nonce', NONCE, '--root', '1', '--repo', 'o/r'])
    assert.equal(r.status, 0, r.stderr)
    const { rows, envelope } = parseOut(r.stdout)
    assert.deepEqual(rows.map((x) => [x.number, x.parent, x.siblingIndex, x.state, x.subIssuesTotal]), [
      [1, 0, 0, 'open', 2],
      [2, 1, 0, 'closed', 1],
      [3, 1, 1, 'open', 0],
      [4, 2, 0, 'open', 1],
      [5, 4, 0, 'open', 0],
    ])
    assert.equal(rows[1].title, '日本語 🎉 title')
    assert.deepEqual(envelope.payload, { count: 5, inputSha256: inputShaOf(1, 'o/r'), nodesSha256: independentNodesSha(rows) })
    assert.equal(envelope.nonce, NONCE)
    assert.equal(envelope.sha256, expectedSha256(NONCE, envelope.payload))
    assert.equal(stub.callsTo('issues/3/sub_issues'), 0)
    assert.equal(stub.callsTo('issues/5/sub_issues'), 0)
    assert.equal(stub.callsTo('issues/2/sub_issues'), 1)
  })

  test(`${tag} 子が 100 件超（2 ページ）でも siblingIndex がページをまたいで連続する`, () => {
    const kids = Array.from({ length: 120 }, (_, i) => issue(100 + i, { title: `k${i}` }))
    const stub = makeGhTreeStub({
      [`${P}/issues/1`]: issue(1, { total: 120 }),
      [`${P}/issues/1/sub_issues`]: { pages: [kids.slice(0, 100), kids.slice(100)] },
    })
    const r = run(bash, stub, ['--nonce', NONCE, '--root', '1', '--repo', 'o/r'])
    assert.equal(r.status, 0, r.stderr)
    const { rows } = parseOut(r.stdout)
    assert.equal(rows.length, 121)
    assert.deepEqual(rows.slice(1).map((x) => x.siblingIndex), Array.from({ length: 120 }, (_, i) => i))
  })

  test(`${tag} 5 段の深さ・closed の中間ノードの下の open 子孫まで辿る`, () => {
    const routes = { [`${P}/issues/1`]: issue(1, { total: 1 }) }
    for (let d = 1; d <= 4; d++) {
      routes[`${P}/issues/${d}/sub_issues`] = { pages: [[issue(d + 1, { total: d < 4 ? 1 : 0, state: d === 2 ? 'closed' : 'open' })]] }
    }
    const stub = makeGhTreeStub(routes)
    const r = run(bash, stub, ['--nonce', NONCE, '--root', '1', '--repo', 'o/r'])
    assert.equal(r.status, 0, r.stderr)
    assert.deepEqual(parseOut(r.stdout).rows.map((x) => x.number), [1, 2, 3, 4, 5])
  })

  test(`${tag} 件数不一致（ページの取り落とし）は exit 6 で封筒なし`, () => {
    const routes = smallTree()
    routes[`${P}/issues/1`] = issue(1, { total: 3 })
    const r = run(bash, makeGhTreeStub(routes), ['--nonce', NONCE, '--root', '1', '--repo', 'o/r'])
    assert.equal(r.status, 6)
    assert.equal(r.stdout, '')
    assert.match(r.stderr, /不一致/)
  })

  test(`${tag} 番号の重複は exit 6`, () => {
    const stub = makeGhTreeStub({
      [`${P}/issues/1`]: issue(1, { total: 2 }),
      [`${P}/issues/1/sub_issues`]: { pages: [[issue(2), issue(2)]] },
    })
    const r = run(bash, stub, ['--nonce', NONCE, '--root', '1', '--repo', 'o/r'])
    assert.equal(r.status, 6)
    assert.equal(r.stdout, '')
  })

  test(`${tag} gh の失敗（本文を標準出力へ出して非 0）は exit 5 で封筒なし。応答の型が不正でも exit 5`, () => {
    let r = run(bash, makeGhTreeStub({}), ['--nonce', NONCE, '--root', '1', '--repo', 'o/r'])
    assert.equal(r.status, 5)
    assert.equal(r.stdout, '')
    r = run(bash, makeGhTreeStub({ [`${P}/issues/1`]: issue(1, { total: 1 }), [`${P}/issues/1/sub_issues`]: { raw: '{"message":"boom"}', exit: 1 } }), ['--nonce', NONCE, '--root', '1', '--repo', 'o/r'])
    assert.equal(r.status, 5)
    // 200 でも形が違う（state が open / closed でない・total が文字列・番号が小数・応答がオブジェクト）
    for (const bad of [
      { ...issue(2), state: 'weird' },
      { ...issue(2), sub_issues_summary: { total: '0' } },
      { ...issue(2), number: 2.5 },
      { ...issue(2), title: null },
    ]) {
      r = run(bash, makeGhTreeStub({ [`${P}/issues/1`]: issue(1, { total: 1 }), [`${P}/issues/1/sub_issues`]: { pages: [[bad]] } }), ['--nonce', NONCE, '--root', '1', '--repo', 'o/r'])
      assert.equal(r.status, 5, JSON.stringify(bad))
    }
    r = run(bash, makeGhTreeStub({ [`${P}/issues/1`]: issue(1, { total: 1 }), [`${P}/issues/1/sub_issues`]: { raw: '{"a":1}' } }), ['--nonce', NONCE, '--root', '1', '--repo', 'o/r'])
    assert.equal(r.status, 5)
    // ルートの番号が違う
    r = run(bash, makeGhTreeStub({ [`${P}/issues/1`]: issue(9) }), ['--nonce', NONCE, '--root', '1', '--repo', 'o/r'])
    assert.equal(r.status, 5)
  })

  test(`${tag} 出力が大きすぎると exit 7（中央が欠けて静かに壊れない）`, () => {
    const kids = Array.from({ length: 90 }, (_, i) => issue(100 + i, { title: 'x'.repeat(300) }))
    const stub = makeGhTreeStub({ [`${P}/issues/1`]: issue(1, { total: 90 }), [`${P}/issues/1/sub_issues`]: { pages: [kids] } })
    const r = run(bash, stub, ['--nonce', NONCE, '--root', '1', '--repo', 'o/r'])
    assert.equal(r.status, 7)
    assert.equal(r.stdout, '')
  })

  test(`${tag} 使い方の誤りは exit 2`, () => {
    const stub = makeGhTreeStub({})
    for (const args of [
      ['--root', '1'],
      ['--nonce', 'BAD NONCE', '--root', '1'],
      ['--nonce', NONCE],
      ['--nonce', NONCE, '--root', '0'],
      ['--nonce', NONCE, '--root', 'x1'],
      ['--nonce', NONCE, '--root', '1', '--repo', 'no-slash'],
      ['--nonce', NONCE, '--root', '1', '--repo', 'a/b/c'],
      ['--nonce', NONCE, '--root', '1', '--unknown', 'x'],
    ]) {
      const r = run(bash, stub, args)
      assert.equal(r.status, 2, args.join(' '))
      assert.equal(r.stdout, '')
    }
    assert.equal(stub.calls().length, 0, '引数の誤りでは gh を呼ばない')
  })

  test(`${tag} --repo の有無で gh のパスが変わり、inputSha256 が root と repo に束縛される`, () => {
    const withRepo = makeGhTreeStub({ [`${P}/issues/7`]: issue(7) })
    const a = run(bash, withRepo, ['--nonce', NONCE, '--root', '7', '--repo', 'o/r'])
    assert.equal(a.status, 0, a.stderr)
    assert.ok(withRepo.calls().every((c) => c.includes('repos/o/r/issues/7')), withRepo.calls().join('|'))
    const without = makeGhTreeStub({ 'repos/{owner}/{repo}/issues/7': issue(7) })
    const b = run(bash, without, ['--nonce', NONCE, '--root', '7'])
    assert.equal(b.status, 0, b.stderr)
    assert.ok(without.calls().every((c) => c.includes('repos/{owner}/{repo}/issues/7')))
    const pa = parseOut(a.stdout).envelope.payload
    const pb = parseOut(b.stdout).envelope.payload
    assert.equal(pa.inputSha256, inputShaOf(7, 'o/r'))
    assert.equal(pb.inputSha256, inputShaOf(7, ''))
    assert.notEqual(pa.inputSha256, pb.inputSha256)
    assert.equal(parseOut(a.stdout).envelope.nonce, NONCE)
  })

  test(`${tag} title の制御文字（タブ・改行）は空白に置換され、置換後の文字列でハッシュされる`, () => {
    const stub = makeGhTreeStub({ [`${P}/issues/1`]: issue(1, { title: 'a\tb\nc\u0001d\u007fe  ' }) })
    const r = run(bash, stub, ['--nonce', NONCE, '--root', '1', '--repo', 'o/r'])
    assert.equal(r.status, 0, r.stderr)
    const { rows, envelope } = parseOut(r.stdout)
    assert.equal(rows.length, 1)
    assert.equal(rows[0].title, 'a b c d e  ')
    assert.equal(envelope.payload.nodesSha256, independentNodesSha(rows))
  })

  test(`${tag} run-verified.sh 経由で起動でき、スクリプトか lib を書き換えるとハッシュ不一致で起動しない`, () => {
    const dir = trackTmp(mkdtempSync(join(tmpdir(), 'iit-ft-launch-')))
    mkdirSync(join(dir, 'lib'))
    for (const f of readdirSync(SCRIPTS)) if (f.endsWith('.sh')) copyFileSync(join(SCRIPTS, f), join(dir, f))
    for (const f of readdirSync(join(SCRIPTS, 'lib'))) if (f.endsWith('.sh')) copyFileSync(join(SCRIPTS, 'lib', f), join(dir, 'lib', f))
    const launcher = { runVerified: join(dir, 'run-verified.sh'), sha: bundleSha256(dir, 'fetch-tree.sh'), name: 'fetch-tree.sh' }
    const stub = makeGhTreeStub({ [`${P}/issues/1`]: issue(1) })
    const args = ['--nonce', NONCE, '--root', '1', '--repo', 'o/r']
    assert.equal(run(bash, stub, args, { launcher }).status, 0)
    writeFileSync(join(dir, 'fetch-tree.sh'), `${readFileSync(join(dir, 'fetch-tree.sh'), 'utf8')}\n# tamper\n`)
    assert.equal(run(bash, stub, args, { launcher }).status, 3)
    copyFileSync(join(SCRIPTS, 'fetch-tree.sh'), join(dir, 'fetch-tree.sh'))
    assert.equal(run(bash, stub, args, { launcher }).status, 0)
    writeFileSync(join(dir, 'lib', 'fetch-tree-lib.sh'), `${readFileSync(join(dir, 'lib', 'fetch-tree-lib.sh'), 'utf8')}\n# tamper\n`)
    assert.equal(run(bash, stub, args, { launcher }).status, 3)
  })
}
