// scripts/fetch-tree.sh を偽 gh で実行して確かめる回帰テスト一式（Issue #668）。
// bash ごとに登録できるよう関数にしてある（tests/fetch-tree.test.mjs が 1 つ目の bash、
// tests/fetch-tree-alt-bash.test.mjs が 2 つ目以降）。node --test はファイル単位で並列に走るため、
// bash ごとにファイルを分けると所要が bash の数ではなく 1 つ分で済む（base-merge-suite と同じ分割）。
//
// 期待する検査値（nodesSha256 など）は、ホストの実装・スクリプトの実装とは独立に node:crypto で計算する。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { copyFileSync, existsSync, lstatSync, mkdirSync, mkdtempSync, readdirSync, rmSync, symlinkSync, unlinkSync, writeFileSync, readFileSync } from 'node:fs'
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
// 独立実装: 構造 5 欄（title を除く）のダイジェスト（Issue #687）
export function independentStructSha(rows) {
  return sha(
    [...rows]
      .sort((a, b) => a.number - b.number)
      .map((r) => [r.number, r.parent, r.siblingIndex, r.state, r.subIssuesTotal].join('\t'))
      .join('\n'),
  )
}
// 独立実装: タイトル先頭のタスク ID のダイジェスト（Issue #687）
export function independentTaskIdSha(rows) {
  const re = /^\s*(?:[a-z]+(?:\([^()\n]{0,64}\))?!?:\s*)?[[【]?([A-Z][A-Z0-9]{0,19}(?:-[0-9]{1,6}){1,4})(?=$|[\s\]】:：])/
  return sha([...rows].sort((a, b) => a.number - b.number).map((r) => `${r.number}\t${re.exec(r.title)?.[1] ?? ''}`).join('\n'))
}
export const inputShaOf = (root, repo = '') => sha(`fetch-tree\n${root}\n${repo}`)
// 独立実装: tree.tsv 全体（各行 + 改行）の SHA-256 と、--page の入力の束縛（Issue #690）
const tsvLine = (r) => [r.number, r.parent, r.siblingIndex, r.state, r.subIssuesTotal, r.title].join('\t')
export const independentTsvSha = (rows) => sha(rows.map((r) => `${tsvLine(r)}\n`).join(''))
export const pageInputShaOf = (tsvSha, page) => sha(`fetch-tree-page\n${tsvSha}\n${page}`)

export function run(bash, stub, args, { script = SCRIPT, launcher = null, env = {} } = {}) {
  const argv = launcher ? [launcher.runVerified, launcher.sha, launcher.name, ...args] : [script, ...args]
  const r = spawnSync(bash, argv, { env: { ...stub.env(), ...env }, encoding: 'utf8' })
  return { status: r.status, stdout: r.stdout, stderr: r.stderr }
}

function parseRow(l) {
  const [number, parent, siblingIndex, state, subIssuesTotal, ...t] = l.split('\t')
  return { number: Number(number), parent: Number(parent), siblingIndex: Number(siblingIndex), state, subIssuesTotal: Number(subIssuesTotal), title: t.join('\t') }
}

// --page の出力（TSV 行だけ）を行オブジェクトにする
export function parseRows(text) {
  return text.replace(/\n$/, '').split('\n').filter((l) => l !== '').map(parseRow)
}

// 標準出力を { rows, envelope, dir } に分ける（dir は FETCH_TREE_DIR の行の値。無ければ null）
export function parseOut(stdout) {
  const lines = stdout.replace(/\n$/, '').split('\n')
  const envelope = JSON.parse(lines[lines.length - 1])
  const dirLine = lines.find((l) => l.startsWith('FETCH_TREE_DIR='))
  const rows = lines.slice(0, -1).filter((l) => !l.startsWith('FETCH_TREE_DIR=')).map(parseRow)
  return { rows, envelope, dir: dirLine === undefined ? null : dirLine.slice('FETCH_TREE_DIR='.length) }
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
    assert.deepEqual(envelope.payload, { count: 5, inputSha256: inputShaOf(1, 'o/r'), nodesSha256: independentNodesSha(rows), pages: 1, structSha256: independentStructSha(rows), taskIdSha256: independentTaskIdSha(rows), dir: '', tsvSha256: independentTsvSha(rows) })
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

  // 大きなツリー（Issue #673）: 1 回の Bash 出力（24000 バイト）に収まらない TSV は一時ファイルへ書き出し、1 ページずつ読む
  const bigTree = (n, titleLen) => {
    const kids = Array.from({ length: n }, (_, i) => issue(100 + i, { title: `${i}-`.padEnd(titleLen, 'x') }))
    return { [`${P}/issues/1`]: issue(1, { total: n }), [`${P}/issues/1/sub_issues`]: { pages: [kids.slice(0, 100), kids.slice(100)].filter((x) => x.length > 0) } }
  }
  const tmpBase = () => trackTmp(mkdtempSync(join(tmpdir(), 'iit-ft-tmp-')))
  const ARGS = ['--nonce', NONCE, '--root', '1', '--repo', 'o/r']
  const BYTES_LIMIT = 24000

  test(`${tag} 出力が 1 ページに収まらない大きなツリーは封筒だけを出し、--page がページごとの封筒つきで全行を返す（連結すると全 TSV・全体の検査値と一致）`, () => {
    const tmp = tmpBase()
    const stub = makeGhTreeStub(bigTree(90, 300))
    const r = run(bash, stub, ARGS, { env: { TMPDIR: tmp } })
    assert.equal(r.status, 0, r.stderr)
    assert.ok(Buffer.byteLength(r.stdout) <= BYTES_LIMIT, `1 回目の出力 ${Buffer.byteLength(r.stdout)} バイト`)
    const lines = r.stdout.replace(/\n$/, '').split('\n')
    assert.equal(lines.length, 1, '取得モードは封筒 1 行だけ')
    const envelope = JSON.parse(lines[0])
    const dir = envelope.payload.dir
    assert.ok(envelope.payload.pages >= 2, `pages=${envelope.payload.pages}`)
    assert.ok(dir.startsWith(tmp.replace(/\/$/, '')) && /\/iit-tree\.[A-Za-z0-9]+$/.test(dir), dir)
    assert.equal(envelope.sha256, expectedSha256(NONCE, envelope.payload))
    // ディレクトリは 700、ファイルは 600
    assert.equal(lstatSync(dir).mode & 0o777, 0o700)
    assert.equal(lstatSync(join(dir, 'tree.tsv')).mode & 0o777, 0o600)
    let all = []
    for (let p = 1; p <= envelope.payload.pages; p++) {
      const pn = `pn${p}`
      const pr = run(bash, stub, ['--nonce', pn, '--page', String(p), '--dir', dir])
      assert.equal(pr.status, 0, pr.stderr)
      assert.ok(Buffer.byteLength(pr.stdout) <= BYTES_LIMIT, `ページ ${p} が ${Buffer.byteLength(pr.stdout)} バイト`)
      const { rows, envelope: pe } = parseOut(pr.stdout)
      assert.equal(pe.nonce, pn)
      assert.equal(pe.sha256, expectedSha256(pn, pe.payload))
      assert.deepEqual(pe.payload, {
        count: rows.length,
        inputSha256: pageInputShaOf(envelope.payload.tsvSha256, p),
        nodesSha256: independentNodesSha(rows),
        page: p,
        structSha256: independentStructSha(rows),
        taskIdSha256: independentTaskIdSha(rows),
      })
      all = all.concat(rows)
    }
    assert.equal(all.length, 91)
    assert.equal(envelope.payload.count, all.length)
    assert.deepEqual(all.map((x) => x.number), [1, ...Array.from({ length: 90 }, (_, i) => 100 + i)])
    assert.equal(envelope.payload.tsvSha256, independentTsvSha(all))
    assert.equal(envelope.payload.nodesSha256, independentNodesSha(all))
    assert.equal(envelope.payload.structSha256, independentStructSha(all))
    assert.equal(envelope.payload.taskIdSha256, independentTaskIdSha(all))
    // ページ範囲外は exit 2。--page は gh を呼ばない
    const callsBefore = stub.calls().length
    assert.equal(run(bash, stub, ['--nonce', NONCE, '--page', String(envelope.payload.pages + 1), '--dir', dir]).status, 2)
    assert.equal(stub.calls().length, callsBefore)
    // 片づけ: ディレクトリが消え、TMPDIR は空に戻る。2 回目は何も無くても exit 0
    const rel = run(bash, stub, ['--release', '--dir', dir])
    assert.equal(rel.status, 0, rel.stderr)
    assert.equal(existsSync(dir), false)
    assert.deepEqual(readdirSync(tmp), [])
    assert.equal(run(bash, stub, ['--release', '--dir', dir]).status, 0)
  })

  test(`${tag} 1 ページに収まるツリーは一時ファイルを作らない（pages は 1・dir は空）`, () => {
    const tmp = tmpBase()
    const r = run(bash, makeGhTreeStub(smallTree()), ARGS, { env: { TMPDIR: tmp } })
    assert.equal(r.status, 0, r.stderr)
    assert.equal(parseOut(r.stdout).envelope.payload.pages, 1)
    assert.equal(parseOut(r.stdout).envelope.payload.dir, '')
    assert.ok(!r.stdout.includes('FETCH_TREE_DIR='))
    assert.deepEqual(readdirSync(tmp), [])
  })

  test(`${tag} --page / --release は --dir を検証してから使う（形・シンボリックリンク・余計なファイル・取得引数との混在）`, () => {
    const tmp = tmpBase()
    const stub = makeGhTreeStub(bigTree(90, 300))
    const r = run(bash, stub, ARGS, { env: { TMPDIR: tmp } })
    assert.equal(r.status, 0, r.stderr)
    const dir = parseOut(r.stdout).envelope.payload.dir
    const PG = ['--nonce', NONCE, '--page', '2']
    // 形が不正
    for (const bad of ['relative/iit-tree.x', `${tmp}/other.x`, `${tmp}/iit-tree.a b`, `${tmp}/../iit-tree.x`, '/']) {
      assert.equal(run(bash, stub, [...PG, '--dir', bad]).status, 4, bad)
      assert.equal(run(bash, stub, ['--release', '--dir', bad]).status, 4, bad)
    }
    // シンボリックリンク（実体は正しいディレクトリ）は拒否し、実体も消さない
    const link = join(tmp, 'iit-tree.link')
    symlinkSync(dir, link)
    assert.equal(run(bash, stub, [...PG, '--dir', link]).status, 4)
    assert.equal(run(bash, stub, ['--release', '--dir', link]).status, 4)
    assert.equal(existsSync(join(dir, 'tree.tsv')), true)
    // 余計なファイルがあるディレクトリは片づけない
    writeFileSync(join(dir, 'extra'), 'x')
    assert.equal(run(bash, stub, ['--release', '--dir', dir]).status, 4)
    assert.equal(existsSync(join(dir, 'tree.tsv')), true)
    assert.equal(run(bash, stub, [...PG, '--dir', dir]).status, 4)
    // 使い方の誤り: ページ 0 以下・--dir 無し・取得引数との混在・--page と --release の同時指定
    for (const args of [
      ['--nonce', NONCE, '--page', '0', '--dir', dir],
      ['--nonce', NONCE, '--page', 'x', '--dir', dir],
      ['--page', '1', '--dir', dir],
      ['--nonce', 'BAD NONCE', '--page', '1', '--dir', dir],
      ['--nonce', NONCE, '--page', '2'],
      ['--release'],
      [...PG, '--dir', dir, '--root', '1'],
      ['--release', '--dir', dir, '--nonce', NONCE],
      [...PG, '--release', '--dir', dir],
      [...ARGS, '--dir', dir],
    ]) {
      assert.equal(run(bash, stub, args).status, 2, args.join(' '))
    }
    // 後始末
    rmSync(join(dir, 'extra'))
    unlinkSync(link)
    assert.equal(run(bash, stub, ['--release', '--dir', dir]).status, 0)
    assert.deepEqual(readdirSync(tmp), [])
  })

  test(`${tag} ページ数が上限（30）を超えるツリーだけが exit 7 で、何も残さない`, () => {
    const tmp = tmpBase()
    const r = run(bash, makeGhTreeStub(bigTree(250, 3000)), ARGS, { env: { TMPDIR: tmp } })
    assert.equal(r.status, 7)
    assert.equal(r.stdout, '')
    assert.deepEqual(readdirSync(tmp), [])
  })

  test(`${tag} 一時ディレクトリを作れない（TMPDIR が書けない場所）と exit 4 で、封筒を出さない`, () => {
    const r = run(bash, makeGhTreeStub(bigTree(90, 300)), ARGS, { env: { TMPDIR: '/nonexistent-iit-tmp/none' } })
    assert.equal(r.status, 4)
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
    assert.equal(envelope.payload.structSha256, independentStructSha(rows))
    assert.equal(envelope.payload.taskIdSha256, independentTaskIdSha(rows))
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
