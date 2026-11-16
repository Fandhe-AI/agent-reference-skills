// scripts/fetch-tree.sh を偽 gh で実行して確かめる回帰テスト一式（Issue #668）。
// bash ごとに登録できるよう関数にしてある（tests/fetch-tree.test.mjs が 1 つ目の bash、
// tests/fetch-tree-alt-bash.test.mjs が 2 つ目以降）。node --test はファイル単位で並列に走るため、
// bash ごとにファイルを分けると所要が bash の数ではなく 1 つ分で済む（base-merge-suite と同じ分割）。
//
// 期待する検査値（nodesSha256 など）は、ホストの実装・スクリプトの実装とは独立に node:crypto で計算する。
// TSV の第 7 欄 optinTests（本文の opt-in テスト宣言）は、open ノードの本文から jq が抽出・正規化した compact JSON で、
// optinSha256 が束縛する。値の正規化（許可外の文字は 1 文字ずつ ?）と上限（1 値 300 文字・20 件）は独立に期待値を書く。
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
// 独立実装: 第 7 欄 optinTests のダイジェスト（number 昇順・`number TAB compact JSON`）
export function independentOptinSha(rows) {
  return sha([...rows].sort((a, b) => a.number - b.number).map((r) => `${r.number}\t${JSON.stringify(r.optinTests)}`).join('\n'))
}
// 独立実装: タイトル先頭のタスク ID のダイジェスト（Issue #687）
export function independentTaskIdSha(rows) {
  const re = /^\s*(?:[a-z]+(?:\([^()\n]{0,64}\))?!?:\s*)?[[【]?([A-Z][A-Z0-9]{0,19}(?:-[0-9]{1,6}){1,4})(?=$|[\s\]】:：])/
  return sha([...rows].sort((a, b) => a.number - b.number).map((r) => `${r.number}\t${re.exec(r.title)?.[1] ?? ''}`).join('\n'))
}
export const inputShaOf = (root, repo = '') => sha(`fetch-tree\n${root}\n${repo}`)
// 独立実装: tree.tsv 全体（各行 + 改行）の SHA-256 と、--page の入力の束縛（Issue #690）
const tsvLine = (r) => [r.number, r.parent, r.siblingIndex, r.state, r.subIssuesTotal, r.title, JSON.stringify(r.optinTests)].join('\t')
export const independentTsvSha = (rows) => sha(rows.map((r) => `${tsvLine(r)}\n`).join(''))
export const pageInputShaOf = (tsvSha, page) => sha(`fetch-tree-page\n${tsvSha}\n${page}`)

export function run(bash, stub, args, { script = SCRIPT, launcher = null, env = {} } = {}) {
  const argv = launcher ? [launcher.runVerified, launcher.sha, launcher.name, ...args] : [script, ...args]
  const r = spawnSync(bash, argv, { env: { ...stub.env(), ...env }, encoding: 'utf8' })
  return { status: r.status, stdout: r.stdout, stderr: r.stderr }
}

// 第 7 欄は compact JSON のまま持つ（optin）と、解釈した配列（optinTests）の両方。ASCII だけの JSON なので、再 stringify と一致する（エスケープが出ない契約）
function parseRow(l) {
  const f = l.split('\t')
  assert.equal(f.length, 7, `TSV は 7 欄: ${JSON.stringify(l)}`)
  const optinTests = JSON.parse(f[6])
  assert.equal(JSON.stringify(optinTests), f[6], '第 7 欄は compact JSON')
  return { number: Number(f[0]), parent: Number(f[1]), siblingIndex: Number(f[2]), state: f[3], subIssuesTotal: Number(f[4]), title: f[5], optin: f[6], optinTests }
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
    [`${P}/issues/1`]: issue(1, { title: 'root', total: 2, body: '<!-- optin-tests: make e2e -->' }),
    [`${P}/issues/1/sub_issues`]: { pages: [[issue(2, { state: 'closed', total: 1, title: '日本語 🎉 title', body: '<!-- optin-tests: make closed -->' }), issue(3, { title: 'plain', body: 'a\n<!-- optin-tests: npm run e2e -->\n<!--optin-tests:\tcargo test -- --ignored -->' })]] },
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
    // 第 7 欄: open ノードだけ本文の宣言を抽出（root・#3）。closed の #2 と宣言の無い #4・#5（body: null）は []
    assert.deepEqual(rows.map((x) => x.optinTests), [['make e2e'], [], ['npm run e2e', 'cargo test -- --ignored'], [], []])
    assert.deepEqual(envelope.payload, { count: 5, inputSha256: inputShaOf(1, 'o/r'), nodesSha256: independentNodesSha(rows), optinSha256: independentOptinSha(rows), pages: 1, repo: 'o/r', structSha256: independentStructSha(rows), taskIdSha256: independentTaskIdSha(rows) })
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
    const kids = Array.from({ length: n }, (_, i) => issue(100 + i, { title: `${i}-`.padEnd(titleLen, 'x'), body: i % 7 === 0 ? `<!-- optin-tests: make e2e-${i} -->` : null }))
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
        optinSha256: independentOptinSha(rows),
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
    assert.equal(envelope.payload.optinSha256, independentOptinSha(all))
    assert.deepEqual(all.filter((x) => x.optinTests.length > 0).map((x) => x.optinTests[0]), Array.from({ length: 13 }, (_, k) => `make e2e-${k * 7}`))
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
    // 転記で落ちやすい空文字の dir と tsvSha256 は 1 ページの署名対象に入れない（欠落で sha256 が毎回不一致になるため）
    assert.equal('dir' in parseOut(r.stdout).envelope.payload, false)
    assert.equal('tsvSha256' in parseOut(r.stdout).envelope.payload, false)
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
    // 封筒の repo（Issue #808）: --repo があればその値、無ければルートの repository_url の末尾 2 成分（ホストが repo-scan.sh の --repo に使う）
    assert.equal(pa.repo, 'o/r')
    assert.equal(pb.repo, 'o/r')
  })

  test(`${tag} --repo を省いた取得は、ルートの repository_url からツリーのリポジトリを封筒の repo に出す（取れない・形が違えば exit 5 で封筒を出さない）`, () => {
    const ok = makeGhTreeStub({ 'repos/{owner}/{repo}/issues/7': issue(7, { repositoryUrl: 'https://ghe.example.com/api/v3/repos/Fandhe-AI/tree-repo' }) })
    const r = run(bash, ok, ['--nonce', NONCE, '--root', '7'])
    assert.equal(r.status, 0, r.stderr)
    const e = parseOut(r.stdout).envelope
    assert.equal(e.payload.repo, 'Fandhe-AI/tree-repo')
    assert.equal(e.sha256, expectedSha256(NONCE, e.payload))
    // --repo があれば repository_url は見ない（パスの束縛と同じ値を出す）
    const given = run(bash, makeGhTreeStub({ [`${P}/issues/7`]: issue(7, { repositoryUrl: null }) }), ['--nonce', NONCE, '--root', '7', '--repo', 'o/r'])
    assert.equal(parseOut(given.stdout).envelope.payload.repo, 'o/r')
    for (const repositoryUrl of [null, 1, '', 'https://api.github.com/repos/bad repo/x', 'https://api.github.com/repos/-a/x', 'x']) {
      const b = run(bash, makeGhTreeStub({ 'repos/{owner}/{repo}/issues/7': issue(7, { repositoryUrl }) }), ['--nonce', NONCE, '--root', '7'])
      assert.equal(b.status, 5, `${JSON.stringify(repositoryUrl)}: ${b.stderr}`)
      assert.equal(b.stdout, '')
      assert.ok(!b.stderr.includes('bad repo'), '外部由来の文字列を標準エラーへ出さない')
    }
  })

  test(`${tag} title の制御文字（タブ・改行）は空白に置換され、置換後の文字列でハッシュされる`, () => {
    const stub = makeGhTreeStub({ [`${P}/issues/1`]: issue(1, { title: 'a\tb\nc\u0001d\u007fe  ' }) })
    const r = run(bash, stub, ['--nonce', NONCE, '--root', '1', '--repo', 'o/r'])
    assert.equal(r.status, 0, r.stderr)
    const { rows, envelope } = parseOut(r.stdout)
    assert.equal(rows.length, 1)
    assert.equal(rows[0].title, 'a b c d e  ')
    assert.equal(envelope.payload.nodesSha256, independentNodesSha(rows))
    assert.equal(envelope.payload.optinSha256, independentOptinSha(rows))
    assert.equal(envelope.payload.structSha256, independentStructSha(rows))
    assert.equal(envelope.payload.taskIdSha256, independentTaskIdSha(rows))
  })

  // ---- 第 7 欄 optinTests（本文の opt-in テスト宣言）。ルートの本文と子の本文の両方から、jq 1 本で抽出・正規化する ----
  // 本文 bodies を持つ子 #2, #3, ... を持つツリーを走らせ、{ r, rows（ルートを除く）} を返す
  const withBodies = (bodies, { states = [] } = {}) => {
    const kids = bodies.map((b, i) => issue(2 + i, { body: b, state: states[i] ?? 'open' }))
    const stub = makeGhTreeStub({
      [`${P}/issues/1`]: issue(1, { total: kids.length }),
      [`${P}/issues/1/sub_issues`]: { pages: [kids] },
    })
    const r = run(bash, stub, ARGS)
    return { r, rows: r.status === 0 ? parseOut(r.stdout).rows.slice(1) : [], stub }
  }
  const mark = (v) => `<!-- optin-tests: ${v} -->`
  // 期待値の独立実装: タブは空白 1 つ、許可文字 [A-Za-z0-9 _./:=@+,-] の外は 1 コードポイントごとに ?
  const norm = (v) => [...v.replace(/\t/g, ' ')].map((c) => (/^[A-Za-z0-9 _./:=@+,-]$/.test(c) ? c : '?')).join('')

  test(`${tag} optinTests: 値に n を含む宣言が落ちずに残る（jq の \\n が n に化けて n を含む値が消える fail-open の回帰）`, () => {
    const values = ['npm run e2e', 'node --test', 'cargo nextest run', 'make e2e-three-client', 'pnpm run test:nightly -- --grep nn']
    const { r, rows } = withBodies([values.map(mark).join('\n')])
    assert.equal(r.status, 0, r.stderr)
    assert.deepEqual(rows[0].optinTests, values)
    assert.equal(r.stderr, '')
  })

  test(`${tag} optinTests: コードフェンス内の宣言も拾い、空の宣言は空文字、前後の空白は落とす（従来の scan と同じ意味）`, () => {
    const body = ['説明', '```', mark('node --test'), '```', '<!--  optin-tests:   make a   -->', '<!-- optin-tests: -->', '<!-- OPTIN-TESTS: make upper -->'].join('\n')
    const { r, rows } = withBodies([body])
    assert.equal(r.status, 0, r.stderr)
    assert.deepEqual(rows[0].optinTests, ['node --test', 'make a', ''])
  })

  test(`${tag} optinTests: 同じ行で --> が閉じない宣言があるノードは ["?"] 1 件（閉じた宣言があっても値は出さない・本文中の構文の説明でも止まる）。Issue #802`, () => {
    const closed = ['説明', mark('node --test'), mark('make a')].join('\n')
    const { r, rows } = withBodies([
      `${closed}\n<!-- optin-tests: no close`,
      '<!-- optin-tests: make a\n-->',
      '宣言は `<!-- optin-tests:` で始める',
      closed,
    ])
    assert.equal(r.status, 0, r.stderr)
    assert.deepEqual(rows.map((x) => x.optinTests), [['?'], ['?'], ['?'], ['node --test', 'make a']])
  })

  test(`${tag} optinTests: 1 ノードの宣言の合計が 1,000 文字を超えたら ["?"]（1,000 ちょうどは変えない）。第 7 欄は 1 ノード 1,061 バイト以下。Issue #803`, () => {
    const decls = (n, len) => Array.from({ length: n }, (_, i) => mark(`make ${String.fromCharCode(97 + i).repeat(len - 5)}`)).join('\n')
    const { r, rows } = withBodies([decls(20, 50), decls(4, 300), `${decls(3, 250)}\n${mark(`make ${'z'.repeat(246)}`)}`, Array.from({ length: 200 }, () => mark(`make ${'q'.repeat(295)}`)).join('\n')])
    assert.equal(r.status, 0, r.stderr)
    assert.equal(rows[0].optinTests.length, 20)
    assert.equal(rows[0].optin.length, 1061)
    assert.deepEqual(rows.slice(1).map((x) => x.optinTests), [['?'], ['?'], ['?']])
    for (const x of rows) assert.ok(Buffer.byteLength(x.optin) <= 1061, `#${x.number} ${x.optin.length}`)
  })

  test(`${tag} optinTests: タブは空白 1 つ・許可文字の外（NBSP・全角・シェルのメタ文字・引用符・バックスラッシュ・CR・制御文字・絵文字）は 1 文字ずつ ?`, () => {
    const raw = [
      'make\te2e',
      'make e2e', // NBSP
      'make　e2e', // 全角空白
      'make e2e; rm -rf x',
      'make $(id) `id` "q" \'s\' \\ | & < > ( ) { }',
      'cargo test\r',
      'go test 🎉',
      'ｍａｋｅ',
      'make e2e\u0001',
    ]
    const { r, rows } = withBodies([raw.map(mark).join('\n')])
    assert.equal(r.status, 0, r.stderr)
    assert.deepEqual(rows[0].optinTests, raw.map(norm))
    assert.deepEqual(rows[0].optinTests.slice(0, 3), ['make e2e', 'make?e2e', 'make?e2e'])
    assert.equal(rows[0].optinTests[3], 'make e2e? rm -rf x')
    assert.equal(rows[0].optinTests[5], 'cargo test?')
    assert.equal(rows[0].optinTests[6], 'go test ?')
    for (const v of rows[0].optinTests) assert.match(v, /^[A-Za-z0-9 _./:=@+,?-]*$/)
    // JSON のエスケープが出ない（jq の tojson と JS の JSON.stringify が同じバイト列）
    assert.doesNotMatch(r.stdout.split('\n')[1], /\\/)
  })

  test(`${tag} optinTests: 1 値が 300 文字を超えると先頭 299 文字 + ? に切り（必ず invalid）、300 文字ちょうどは切らない`, () => {
    const exact = `make ${'a'.repeat(295)}`
    const over = `make ${'a'.repeat(296)}`
    const huge = `make ${'b'.repeat(5000)}`
    const wide = `make ${'日'.repeat(400)}` // 正規化後は ? が並ぶ（バイト数ではなく文字数で切る）
    // 4 値を 1 ノードに置くと合計 1,200 文字で合計の上限（Issue #803）に掛かるため、1 ノード 1 値にする
    const { r, rows } = withBodies([exact, over, huge, wide].map(mark))
    assert.equal(r.status, 0, r.stderr)
    assert.deepEqual(rows.map((x) => x.optinTests.length), [1, 1, 1, 1])
    const [a, b, c, d] = rows.map((x) => x.optinTests[0])
    assert.equal(exact.length, 300)
    assert.equal(a, exact)
    for (const v of [b, c, d]) {
      assert.equal(v.length, 300)
      assert.ok(v.endsWith('?'))
    }
    assert.equal(b, `${over.slice(0, 299)}?`)
    assert.equal(c, `${huge.slice(0, 299)}?`)
    assert.equal(d, `make ${'?'.repeat(295)}`)
  })

  test(`${tag} optinTests: 宣言が 20 件ちょうどはそのまま、21 件以上は先頭 19 件 + ? の 20 件（スキーマの上限内・必ず invalid を含む）`, () => {
    const decls = (n) => Array.from({ length: n }, (_, i) => mark(`make t${i}`)).join('\n')
    const { r, rows } = withBodies([decls(20), decls(21), decls(500)])
    assert.equal(r.status, 0, r.stderr)
    assert.deepEqual(rows[0].optinTests, Array.from({ length: 20 }, (_, i) => `make t${i}`))
    for (const k of [1, 2]) {
      assert.equal(rows[k].optinTests.length, 20)
      assert.deepEqual(rows[k].optinTests.slice(0, 19), Array.from({ length: 19 }, (_, i) => `make t${i}`))
      assert.equal(rows[k].optinTests[19], '?')
    }
  })

  test(`${tag} optinTests: closed のノードは宣言があっても []、宣言の無い・本文が null のノードも []（空欄にしない）`, () => {
    const { r, rows } = withBodies([mark('make a'), mark('make b'), null, ''], { states: ['open', 'closed', 'open', 'open'] })
    assert.equal(r.status, 0, r.stderr)
    assert.deepEqual(rows.map((x) => x.optinTests), [['make a'], [], [], []])
    for (const line of r.stdout.split('\n').slice(0, -2)) assert.equal(line.split('\t').length, 7, line)
  })

  test(`${tag} optinTests: 本文が文字列でも null でもない応答は exit 5 で封筒なし。本文は標準エラーにも標準出力にも出さない`, () => {
    const secret = 'SECRET-BODY-MARKER-123'
    for (const body of [123, { x: secret }, [secret]]) {
      const { r } = withBodies([body])
      assert.equal(r.status, 5, JSON.stringify(body))
      assert.equal(r.stdout, '')
      assert.ok(!r.stderr.includes(secret), r.stderr)
    }
    const ok = withBodies([`${secret}\n${mark('make a')}`])
    assert.equal(ok.r.status, 0)
    assert.ok(!ok.r.stderr.includes(secret))
    assert.ok(!ok.r.stdout.includes(secret), '本文は標準出力にも出ない（宣言の値だけ）')
  })

  test(`${tag} optinTests: body キーの欠落（子・ルート）とルートの body が文字列でも null でもない応答は exit 5 で封筒なし。本文は標準エラーに出さない`, () => {
    const noBody = (n, o = {}) => {
      const x = issue(n, o)
      delete x.body
      return x
    }
    const secret = 'SECRET-BODY-MARKER-456'
    const cases = {
      '子の body 欠落': { [`${P}/issues/1`]: issue(1, { total: 1 }), [`${P}/issues/1/sub_issues`]: { pages: [[noBody(2)]] } },
      '閉じた子の body 欠落': { [`${P}/issues/1`]: issue(1, { total: 1 }), [`${P}/issues/1/sub_issues`]: { pages: [[noBody(2, { state: 'closed' })]] } },
      'ルートの body 欠落': { [`${P}/issues/1`]: noBody(1) },
      'ルートの body が数値': { [`${P}/issues/1`]: issue(1, { body: 123 }) },
      '閉じた子の body が数値': { [`${P}/issues/1`]: issue(1, { total: 1 }), [`${P}/issues/1/sub_issues`]: { pages: [[issue(2, { state: 'closed', body: { x: secret } })]] } },
    }
    for (const [name, routes] of Object.entries(cases)) {
      const r = run(bash, makeGhTreeStub(routes), ARGS)
      assert.equal(r.status, 5, name)
      assert.equal(r.stdout, '', name)
      assert.ok(!r.stderr.includes(secret), name)
    }
  })

  test(`${tag} optinTests: 値の前後は ASCII の空白とタブだけ落とす。末尾・先頭の NBSP・全角空白は ? になって残る（旧経路のホストの trim() とは異なり invalid = blocked）`, () => {
    const body = ['<!--\toptin-tests:\t \tmake a\t \t-->', '<!-- optin-tests:\u00a0make b\u00a0-->', '<!-- optin-tests: make c\u3000 -->', '<!--optin-tests:-->', '<!-- optin-tests: \t -->'].join('\n')
    const { r, rows } = withBodies([body])
    assert.equal(r.status, 0, r.stderr)
    assert.deepEqual(rows[0].optinTests, ['make a', '?make b?', 'make c?', '', ''])
  })

  // 抽出の正規表現がバックトラックしない回帰。値の前後に [ \t]* を置いた形は、システムの jq 1.7.1（Oniguruma）で空白の長い行に対し
  // 約 15 秒後に retry-limit-in-match over で異常終了し（exit 5 = ツリー取得全体が停止）、旧経路の gojq は線形だった。
  // 閉じない宣言の判定（Issue #802）も正規表現を足さない線形の処理で、閉じない開始のある本文では scan を走らせない。e〜m は GitHub の本文の上限（65,536 文字）近くの最悪形。
  {
    const sp = (n) => ' '.repeat(n)
    const fit = (unit) => unit.repeat(Math.floor(65000 / unit.length))
    const longCases = [
      ['a 閉じない宣言 + 空白 65000', `<!-- optin-tests:${sp(65000)}`, ['?']],
      ['b 空白 65000 のあとに改行と -->', `<!-- optin-tests:${sp(65000)}\n-->`, ['?']],
      ['c 値の途中に空白 60000', `<!-- optin-tests: x${sp(60000)}y -->`, [`x${sp(298)}?`]],
      ['d 閉じない宣言を 3000 個並べた行', '<!-- optin-tests:'.repeat(3000), ['?']],
      ['e <!-- の連続', fit('<!--'), []],
      ['f --> の連続', fit('-->'), []],
      ['g 閉じない開始と改行の連続', fit('<!-- optin-tests:\n'), ['?']],
      ['h 閉じた宣言の連続の最後に閉じない開始', `${fit(mark('make a'))}<!-- optin-tests:`, ['?']],
      // i は今回変えていない既存の scan の経路（jq の match の g が一致数 × 長さで伸びる・負荷の低いときで約 0.6 秒）。
      // 負荷の高いときに 5 秒を超えたことがあるため、時間は固定せず値だけを検査する
      ['i 閉じた宣言の連続（1 行）', fit(mark('make a')), [...Array(19).fill('make a'), '?'], { timed: false }],
      ['j <!-- の後ろに空白 64000（開始ではない）', `<!--${sp(64000)}x`, []],
      ['k <!-- の後ろにタブ 64000 と閉じない開始', `<!--${'\t'.repeat(64000)}optin-tests:`, ['?']],
      ['l 日本語と <!-- と空白の混在', fit('日本<!-- \t'), []],
      ['m 開始の後ろに <!-- の連続（閉じない）', `<!-- optin-tests:${fit('<!--')}`, ['?']],
    ]
    for (const [name, body, expected, { timed = true } = {}] of longCases) {
      test(`${tag} optinTests: 長い入力でもバックトラックしない（${name}）。exit 0${timed ? ' で 5 秒未満' : '（時間は固定しない）'}`, () => {
        const t0 = Date.now()
        const { r, rows } = withBodies([body])
        const ms = Date.now() - t0
        assert.equal(r.status, 0, r.stderr)
        assert.deepEqual(rows[0].optinTests, expected)
        if (timed) assert.ok(ms < 5000, `${ms} ms`)
      })
    }
  }

  test(`${tag} optinTests: 宣言の値だけが optinSha256 を変える（title・構造の検査値は変わらない）`, () => {
    const a = withBodies([mark('make a')])
    const b = withBodies([mark('make b')])
    const pa = parseOut(a.r.stdout).envelope.payload
    const pb = parseOut(b.r.stdout).envelope.payload
    assert.notEqual(pa.optinSha256, pb.optinSha256)
    assert.equal(pa.nodesSha256, pb.nodesSha256)
    assert.equal(pa.structSha256, pb.structSha256)
    assert.equal(pa.optinSha256, independentOptinSha(parseOut(a.r.stdout).rows))
  })

  test(`${tag} optinTests: title が空・空白だけでも 7 欄の分割がずれず、nodesSha256 は title までの 6 欄のまま`, () => {
    const stub = makeGhTreeStub({
      [`${P}/issues/1`]: issue(1, { total: 2, title: '', body: mark('make a') }),
      [`${P}/issues/1/sub_issues`]: { pages: [[issue(2, { title: '\t', body: mark('make b') }), issue(3, { title: 'x', body: null })]] },
    })
    const r = run(bash, stub, ARGS)
    assert.equal(r.status, 0, r.stderr)
    const { rows, envelope } = parseOut(r.stdout)
    assert.deepEqual(rows.map((x) => [x.title, x.optinTests]), [['', ['make a']], [' ', ['make b']], ['x', []]])
    assert.equal(envelope.payload.nodesSha256, independentNodesSha(rows))
    assert.equal(envelope.payload.optinSha256, independentOptinSha(rows))
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
