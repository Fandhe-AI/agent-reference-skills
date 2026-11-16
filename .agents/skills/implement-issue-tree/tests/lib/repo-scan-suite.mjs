// scripts/repo-scan.sh（外部チェック App の観測・対象外ラベルの取得）を偽 gh で実行して確かめる回帰テスト一式。
// bash ごとに登録できるよう関数にしてある（tests/repo-scan.test.mjs が 1 つ目の bash、tests/repo-scan-alt-bash.test.mjs が 2 つ目以降。
// fetch-tree-suite と同じ分割）。
//
// 期待する封筒（sha256・inputSha256）は、ホスト・スクリプトの実装とは独立に node:crypto で計算する（signed-output.mjs）。
// 旧コマンド（切り出し前の origin/main がプロンプトへ埋め込んでいた gh + jq の文字列）は fixtures に凍結してあり、同じ偽 gh の応答で
// 実行した結果と新スクリプトの結果を突き合わせる（意味を変えていないことの確認。差が出る入力は『意図した差』として明示する）。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { chmodSync, readFileSync, writeFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { makeGhRepoScanStub, checkRuns, issueList } from './gh-repo-scan-stub.mjs'
import { expectedSha256, repoScanInputSha256, skipLabelsInputSha256, toolExists } from './signed-output.mjs'
import { importDefinitions } from './stub-run.mjs'
import { bundleSha256 } from '../../scripts/build-workflow.mjs'

const HERE = dirname(fileURLToPath(import.meta.url))
export const SCRIPTS = join(HERE, '..', '..', 'scripts')
export const SCRIPT = join(SCRIPTS, 'repo-scan.sh')
const RUN_VERIFIED = join(SCRIPTS, 'run-verified.sh')
const FIXTURES = join(HERE, '..', 'fixtures')
const OLD_EXTERNAL = readFileSync(join(FIXTURES, 'repo-scan-old-external-checks-main.txt'), 'utf8')
const OLD_SKIP = readFileSync(join(FIXTURES, 'repo-scan-old-skip-labels-main.txt'), 'utf8').trim()
const NONCE = 'abc123nonce'
export const REPO = 'o/r'
// skip-labels の既定の --numbers（ツリーの open ノード。Issue #807）。既存のケースの番号（1000 以下）をすべて含み、交わりで結果が変わらない
const chunk = (a, n) => Array.from({ length: Math.ceil(a.length / n) }, (_, k) => a.slice(k * n, k * n + n))
export const NUMS = Array.from({ length: 1000 }, (_, k) => k + 1).join(',')
const A = 'a'.repeat(40)
const B = 'b'.repeat(40)
const C = 'c'.repeat(40)
const D = 'd'.repeat(40)
const haveJq = toolExists('jq')

const H = await importDefinitions(['verifySignedOutput', 'repoScanInputSha256', 'observedExternalApps', 'collectSkipLabelEntries'], 'repo-scan-suite')

export function run(bash, stub, args, { launcher = false, env = {} } = {}) {
  const argv = launcher ? [RUN_VERIFIED, bundleSha256(SCRIPTS, 'repo-scan.sh'), 'repo-scan.sh', ...args] : [SCRIPT, ...args]
  const r = spawnSync(bash, argv, { env: { ...stub.env(), ...env }, encoding: 'utf8' })
  return { status: r.status, stdout: r.stdout, stderr: r.stderr }
}

// 成功した実行の封筒（1 行）を検査して返す: 1 行・nonce・独立計算の sha256
function envelopeOf(r) {
  assert.equal(r.status, 0, r.stderr)
  assert.match(r.stdout, /^[^\n]+\n$/, '標準出力は封筒 1 行だけ')
  const e = JSON.parse(r.stdout)
  assert.deepEqual(Object.keys(e).sort(), ['nonce', 'payload', 'sha256'])
  assert.equal(e.nonce, NONCE)
  assert.equal(e.sha256, expectedSha256(NONCE, e.payload), 'sha256 は nonce + payload の正規形')
  // 出力の payload は、キー昇順・空白なしの正規形のまま（JSON.stringify と同じバイト列。キー順は実装が昇順で出す）
  assert.ok(r.stdout.includes(`"payload":${JSON.stringify(e.payload)}`), 'payload は正規形')
  return e
}

// 偽のコマンドを stub の bin（PATH の先頭）へ置く。本物は PATH の先頭 1 要素（stub の bin）を外して呼ぶ。
// 引数の並びが argsLine と完全に一致する呼び出しだけ action を実行する（他の呼び出しは本物へ渡す）
function installFake(stub, name, argsLine, action) {
  const f = join(stub.bin, name)
  writeFileSync(f, `#!/bin/sh\nif [ "$*" = '${argsLine}' ]; then ${action}; fi\nPATH=\${PATH#*:}\nexec ${name} "$@"\n`)
  chmodSync(f, 0o755)
}
const FAIL_STATUS = 'cat >/dev/null; echo "${0##*/}: boom secret-token" >&2; exit 2' // 標準エラーへ本文を出して失敗
const EMPTY_SUCCESS = 'cat >/dev/null; exit 0' // 何も出さずに成功（入力があるのに空の結果）

export function registerRepoScanTests(bash) {
  const T = (name, fn, o = {}) => test(`[${bash}] ${name}`, { skip: !haveJq && 'jq が無い', ...o }, fn)
  // --repo は必須（Issue #808）。extra に --repo が無ければ既定の REPO を付ける
  const withRepo = (extra) => (extra.includes('--repo') ? extra : ['--repo', REPO, ...extra])
  const ext = (stub, extra = [], opts = {}) => run(bash, stub, ['--mode', 'external-checks', '--nonce', NONCE, ...withRepo(extra)], opts)
  // skip-labels は --numbers も必須（Issue #807）。extra に無ければ既定の NUMS を付ける
  const withNums = (extra) => (extra.includes('--numbers') ? extra : [...extra, '--numbers', NUMS])
  const skip = (stub, labels, extra = [], opts = {}) => run(bash, stub, ['--mode', 'skip-labels', '--nonce', NONCE, ...withNums(withRepo(extra)), '--', ...labels], opts)

  // ---------------- external-checks ----------------

  T('external-checks: GitHub Actions 以外の App の slug を昇順・重複なしで返し、封筒はホストの照合を通る', () => {
    const stub = makeGhRepoScanStub({
      prs: [{ headRefOid: A }, { headRefOid: B }, { headRefOid: C }],
      checkRuns: { [A]: checkRuns(['cursor', 'github-actions', 'codecov']), [B]: checkRuns(['cursor']), [C]: checkRuns([]) },
    })
    const r = ext(stub)
    const e = envelopeOf(r)
    assert.deepEqual(e.payload, { apps: ['codecov', 'cursor'], dropped: 0, errs: 0, inputSha256: repoScanInputSha256('external-checks', REPO), prs: 3 })
    // 実スクリプトの標準出力をホストの verifySignedOutput に通す（正準形のずれはスタブ製の封筒では見つからない）
    const signed = H.verifySignedOutput(e, NONCE, H.repoScanInputSha256('external-checks', REPO))
    assert.equal(signed.ok, true, JSON.stringify(signed))
  })

  T('external-checks: gh の呼び出しは pr list 1 回 + 各 PR の check-runs 1 回（per_page=100・GET だけ）で、--repo のリポジトリだけを使う（cwd の {owner}/{repo} に倒れない）', () => {
    const stub = makeGhRepoScanStub({ prs: [{ headRefOid: A }, { headRefOid: B }], checkRuns: { [A]: checkRuns(['x']), [B]: checkRuns(['y']) } })
    assert.equal(ext(stub).status, 0)
    const calls = stub.calls()
    assert.equal(calls.length, 3)
    assert.match(calls[0], /^pr list -R o\/r --state merged --limit 3 --json headRefOid --jq /)
    // 1 ページ目が 100 件未満なら 2 ページ目を読まない（page= を数えるページ送り。--paginate は上限を置けないので使わない。Issue #809）
    assert.ok(calls[1].startsWith(`api repos/o/r/commits/${A}/check-runs?per_page=100&page=1 --jq `) && !calls.some((c) => c.includes('--paginate')))
    assert.ok(!calls.some((c) => c.includes('{owner}')))
    assert.ok(!calls.some((c) => /-X |-f |-F |--method|--input/.test(c)), '書き込み系の指定がある')
  })

  T('external-checks: --repo は pr list の -R と check-runs のパスと入力の束縛に入る', () => {
    const stub = makeGhRepoScanStub({ prs: [{ headRefOid: A }], checkRuns: { [A]: checkRuns(['cursor']) } })
    const e = envelopeOf(ext(stub, ['--repo', 'Fandhe-AI/target']))
    assert.equal(e.payload.inputSha256, repoScanInputSha256('external-checks', 'Fandhe-AI/target'))
    assert.notEqual(e.payload.inputSha256, repoScanInputSha256('external-checks', REPO))
    const calls = stub.calls()
    assert.match(calls[0], /^pr list -R Fandhe-AI\/target --state merged /)
    assert.ok(calls[1].includes('repos/Fandhe-AI/target/commits/'))
    assert.ok(!calls.some((c) => c.includes('{owner}')))
  })

  T('external-checks: slug の形式（小文字英数字とハイフン）でない値・app が null の check-run は apps に入れない（形式不正は dropped に数える）', () => {
    const stub = makeGhRepoScanStub({
      prs: [{ headRefOid: A }],
      checkRuns: { [A]: checkRuns(['cursor', null, 'Bad_Slug', 'a b', '-lead', 'x;rm -rf /', '$(id)', 'UPPER', 'ok-1']) },
    })
    const r = ext(stub)
    const e = envelopeOf(r)
    assert.deepEqual(e.payload.apps, ['cursor', 'ok-1'])
    assert.equal(e.payload.dropped, 6, 'null は jq が落とすので数えない。形式不正の 6 件')
    assert.ok(!r.stdout.includes('rm -rf') && !r.stdout.includes('$(id)') && !r.stderr.includes('rm -rf'), '外部由来の文字列が出力に漏れた')
  })

  T('external-checks: slug が 65 文字以上なら捨てる', () => {
    const stub = makeGhRepoScanStub({ prs: [{ headRefOid: A }], checkRuns: { [A]: checkRuns(['a'.repeat(64), 'a'.repeat(65)]) } })
    const e = envelopeOf(ext(stub))
    assert.deepEqual(e.payload.apps, ['a'.repeat(64)])
    assert.equal(e.payload.dropped, 1)
  })

  T('external-checks: 並びは LC_ALL=C の昇順で、環境のロケールに依存しない', () => {
    const stub = makeGhRepoScanStub({ prs: [{ headRefOid: A }], checkRuns: { [A]: checkRuns(['b-app', 'a1', 'a-app', 'a', '9x']) } })
    const want = ['9x', 'a', 'a-app', 'a1', 'b-app']
    for (const env of [{ LC_ALL: 'C' }, { LC_ALL: 'en_US.UTF-8' }, { LC_ALL: 'ja_JP.UTF-8', LANG: 'ja_JP.UTF-8' }]) {
      assert.deepEqual(envelopeOf(ext(stub, [], { env })).payload.apps, want, JSON.stringify(env))
    }
  })

  T('external-checks: merged PR が 0 件なら apps は空・prs は 0（エラーではない）', () => {
    const stub = makeGhRepoScanStub({ prs: [] })
    const e = envelopeOf(ext(stub))
    assert.deepEqual([e.payload.apps, e.payload.prs, e.payload.errs], [[], 0, 0])
  })

  T('external-checks: pr list の失敗は errs に数えて apps: []（旧コマンドと同じく止まらない）', () => {
    for (const prs of [{ exit: 1 }, { raw: '{"message":"boom"}', exit: 1 }]) {
      const stub = makeGhRepoScanStub({ prs })
      const r = ext(stub)
      const e = envelopeOf(r)
      assert.deepEqual([e.payload.apps, e.payload.prs, e.payload.errs], [[], 0, 1])
      assert.ok(!r.stdout.includes('boom'), 'gh のエラー本文が出力に混ざった')
    }
  })

  T('external-checks: 一部の PR の check-runs の取得失敗は errs に数え、取れた分だけを返す', () => {
    const stub = makeGhRepoScanStub({
      prs: [{ headRefOid: A }, { headRefOid: B }, { headRefOid: C }],
      checkRuns: { [A]: checkRuns(['cursor']), [B]: { exit: 1 }, [C]: checkRuns(['codecov']) },
    })
    const e = envelopeOf(ext(stub))
    assert.deepEqual([e.payload.apps, e.payload.prs, e.payload.errs], [['codecov', 'cursor'], 3, 1])
  })

  T('external-checks: sha でない行は errs に数えて check-runs を呼ばない・4 件目以降は見ない', () => {
    const stub = makeGhRepoScanStub({
      prs: [{ headRefOid: 'not-a-sha; echo x' }, { headRefOid: A }, { headRefOid: B }, { headRefOid: C }, { headRefOid: D }],
      checkRuns: { [A]: checkRuns(['one']), [B]: checkRuns(['two']), [C]: checkRuns(['three']), [D]: checkRuns(['four']) },
    })
    const e = envelopeOf(ext(stub))
    assert.deepEqual(e.payload.apps, ['one', 'two'], '先頭 3 行だけを見る（--limit 3 の防御）')
    assert.deepEqual([e.payload.prs, e.payload.errs], [2, 1])
    assert.equal(stub.callsTo('check-runs'), 2)
  })

  T('external-checks: 旧コマンド（凍結）と同じ入力で同じ apps になる', () => {
    const data = {
      prs: [{ headRefOid: A }, { headRefOid: B }, { headRefOid: C }],
      checkRuns: { [A]: checkRuns(['cursor', 'github-actions', 'codecov', 'vercel']), [B]: checkRuns(['cursor', 'github-actions']), [C]: checkRuns([]) },
    }
    const oldStub = makeGhRepoScanStub(data)
    const old = spawnSync(bash, ['-c', OLD_EXTERNAL], { env: oldStub.env(), encoding: 'utf8' })
    assert.equal(old.status, 0, old.stderr)
    const newE = envelopeOf(ext(makeGhRepoScanStub(data)))
    assert.deepEqual(old.stdout.split('\n').filter((l) => l !== ''), newE.payload.apps)
  })

  T('external-checks: 意図した差: check-runs の取得に失敗した PR の HTTP エラー本文（gh は標準出力へ出す）を、旧コマンドは apps に混ぜ、新スクリプトは混ぜない', () => {
    const data = { prs: [{ headRefOid: A }, { headRefOid: B }], checkRuns: { [A]: checkRuns(['cursor']), [B]: { exit: 1 } } }
    const oldStub = makeGhRepoScanStub(data)
    const old = spawnSync(bash, ['-c', OLD_EXTERNAL], { env: oldStub.env(), encoding: 'utf8' })
    assert.ok(old.stdout.includes('"message"'), '旧コマンドはエラー本文を出力に含める（終了コードで判定していない）')
    const e = envelopeOf(ext(makeGhRepoScanStub(data)))
    assert.deepEqual([e.payload.apps, e.payload.errs, e.payload.dropped], [['cursor'], 1, 0])
  })

  T('external-checks: 意図した差: app が null の check-run を、旧コマンドは文字列 null として出し、新スクリプトは落とす', () => {
    const data = { prs: [{ headRefOid: A }], checkRuns: { [A]: checkRuns(['cursor', null]) } }
    const oldStub = makeGhRepoScanStub(data)
    const old = spawnSync(bash, ['-c', OLD_EXTERNAL], { env: oldStub.env(), encoding: 'utf8' })
    assert.deepEqual(old.stdout.split('\n').filter((l) => l !== '').sort(), ['cursor', 'null'])
    assert.deepEqual(envelopeOf(ext(makeGhRepoScanStub(data))).payload.apps, ['cursor'])
  })

  T('external-checks: check-runs は per_page=100 で取るので、31 件目以降にしか無い外部 App も拾う（旧コマンドは既定の 30 件で取りこぼした）', () => {
    // 先頭 35 件は GitHub Actions、36 件目だけが外部 App。per_page を付けない呼び出しは偽 gh が 30 件で切る（実 GitHub と同じ）
    const slugs = [...Array.from({ length: 35 }, () => 'github-actions'), 'late-app']
    const data = { prs: [{ headRefOid: A }], checkRuns: { [A]: checkRuns(slugs) } }
    const old = spawnSync(bash, ['-c', OLD_EXTERNAL], { env: makeGhRepoScanStub(data).env(), encoding: 'utf8' })
    assert.equal(old.status, 0, old.stderr)
    assert.deepEqual(old.stdout.split('\n').filter((l) => l !== ''), [], '旧コマンドは 31 件目以降の App を取りこぼす（前提の自己検証）')
    assert.deepEqual(envelopeOf(ext(makeGhRepoScanStub(data))).payload.apps, ['late-app'])
  })

  // ---------------- external-checks のページ送り（Issue #809）----------------
  const actions = (n) => Array.from({ length: n }, () => 'github-actions')

  T('external-checks: check-runs をページ送りし、150 件目にだけある外部 App も apps に入る（件数行は slug に混ぜない）', () => {
    const stub = makeGhRepoScanStub({ prs: [{ headRefOid: A }], checkRuns: { [A]: checkRuns([...actions(149), 'late-app']) } })
    const e = envelopeOf(ext(stub))
    assert.deepEqual(e.payload.apps, ['late-app'])
    assert.deepEqual([e.payload.errs, e.payload.dropped, e.payload.prs], [0, 0, 1], '件数行（100・50）を slug の候補や dropped に数えない')
    assert.deepEqual(stub.calls().filter((c) => c.includes('check-runs')).map((c) => c.split(' ')[1]), [`repos/o/r/commits/${A}/check-runs?per_page=100&page=1`, `repos/o/r/commits/${A}/check-runs?per_page=100&page=2`])
  })

  T('external-checks: ちょうど 100 件なら 2 ページ目（0 件）まで読んで終わる', () => {
    const stub = makeGhRepoScanStub({ prs: [{ headRefOid: A }], checkRuns: { [A]: checkRuns([...actions(99), 'edge-app']) } })
    const e = envelopeOf(ext(stub))
    assert.deepEqual([e.payload.apps, e.payload.errs], [['edge-app'], 0])
    assert.equal(stub.callsTo('check-runs'), 2)
  })

  T('external-checks: ページの取得失敗は errs に数え、読めたページの App は返し、その PR の残りのページは読まない', () => {
    for (const fail of [{ exit: 1 }, { raw: '{"message":"boom secret-token"}', exit: 1 }]) {
      const stub = makeGhRepoScanStub({
        prs: [{ headRefOid: A }, { headRefOid: B }],
        checkRuns: { [A]: checkRuns([...actions(99), 'first-page', ...actions(100), 'third-page']), [`${A}@2`]: fail, [B]: checkRuns(['other']) },
      })
      const r = ext(stub)
      const e = envelopeOf(r)
      assert.deepEqual([e.payload.apps, e.payload.errs, e.payload.prs], [['first-page', 'other'], 1, 2])
      assert.ok(!stub.calls().some((c) => c.includes(`${A}/check-runs?per_page=100&page=3`)), '失敗したページの後を読んだ')
      assert.ok(!r.stdout.includes('boom') && !r.stdout.includes('secret'))
    }
  })

  T('external-checks: 件数行が整数でない応答（check_runs が配列でない等）は errs に数える', () => {
    for (const resp of [{ raw: 'x\ncursor\n', exit: 0 }, { total_count: 1, check_runs: null }]) {
      const stub = makeGhRepoScanStub({ prs: [{ headRefOid: A }], checkRuns: { [A]: resp } })
      const e = envelopeOf(ext(stub))
      assert.deepEqual([e.payload.apps, e.payload.errs], [[], 1], JSON.stringify(resp))
    }
  })

  T('external-checks: ページ数の上限（10 ページ = 1,000 件）まで埋まっていれば読むのを止めて errs に数え、取りこぼしを黙らない', () => {
    const stub = makeGhRepoScanStub({ prs: [{ headRefOid: A }], checkRuns: { [A]: checkRuns([...actions(500), 'mid-app', ...actions(599), 'beyond-app']) } })
    const e = envelopeOf(ext(stub))
    assert.deepEqual([e.payload.apps, e.payload.errs], [['mid-app'], 1])
    assert.equal(stub.callsTo('check-runs'), 10, '上限を超えて読んだ')
    // 1,000 件未満なら上限に当たらない
    const ok = makeGhRepoScanStub({ prs: [{ headRefOid: A }], checkRuns: { [A]: checkRuns([...actions(998), 'last-app']) } })
    assert.deepEqual(Object.values(envelopeOf(ext(ok)).payload).slice(0, 3), [['last-app'], 0, 0])
  })

  T('external-checks: 3 件の PR がすべて上限まで読んでも、封筒は上限内で時間の見積り（gh api 30 回 + pr list 1 回）に収まる', () => {
    const many = checkRuns([...actions(990), ...Array.from({ length: 10 }, (_, k) => `app-${k}`)])
    const stub = makeGhRepoScanStub({ prs: [{ headRefOid: A }, { headRefOid: B }, { headRefOid: C }], checkRuns: { [A]: many, [B]: many, [C]: many } })
    const r = ext(stub)
    const e = envelopeOf(r)
    assert.equal(e.payload.apps.length, 10)
    assert.equal(e.payload.errs, 3, '3 件とも上限のページまで埋まっていた')
    assert.equal(stub.calls().length, 31)
    assert.ok(r.stdout.length < 24000)
  })

  T('external-checks: slug の整列（sort）が失敗しても、入力があるのに空の結果で成功しても、apps を空の成功にせず errs に数える', () => {
    for (const action of [FAIL_STATUS, EMPTY_SUCCESS]) {
      const stub = makeGhRepoScanStub({ prs: [{ headRefOid: A }], checkRuns: { [A]: checkRuns(['cursor', 'codecov']) } })
      installFake(stub, 'sort', '-u', action)
      const r = ext(stub)
      const e = envelopeOf(r)
      assert.deepEqual([e.payload.apps, e.payload.errs, e.payload.prs], [[], 1, 1], action)
      assert.ok(!r.stdout.includes('boom') && !r.stdout.includes('secret'), '偽 sort の標準エラーは封筒に出ない')
    }
  })

  // ---------------- skip-labels ----------------

  T('skip-labels: ラベルごとの open issue 番号を昇順・重複なし・PR を除いて返し、ページ送りを跨ぐ', () => {
    const stub = makeGhRepoScanStub({
      labels: [{ name: 'owner:human' }, { name: 'owner:joint' }],
      issues: {
        'owner:human': { pages: [issueList([5, 3, { number: 4, pr: true }]), issueList([9, 3])] },
        'owner:joint': issueList([]),
      },
    })
    const r = skip(stub, ['owner:human', 'owner:joint'])
    const e = envelopeOf(r)
    assert.deepEqual(e.payload, {
      absent: [],
      entries: [{ i: 1, numbers: [3, 5, 9] }, { i: 2, numbers: [] }],
      failed: [],
      inputSha256: skipLabelsInputSha256(REPO, NUMS, ['owner:human', 'owner:joint']),
    })
    const signed = H.verifySignedOutput(e, NONCE, H.repoScanInputSha256('skip-labels', REPO, [NUMS, ...['owner:human', 'owner:joint']]))
    assert.equal(signed.ok, true, JSON.stringify(signed))
    const c = H.collectSkipLabelEntries([1, 2], signed.payload, 2)
    assert.deepEqual([[...c.byIndex], c.missing, c.absent], [[[1, [3, 5, 9]], [2, []]], [], []])
  })

  T('skip-labels: gh の呼び出しは GET だけ（-f / -X を使わず、ラベルはクエリ文字列へパーセントエンコードして渡す）', () => {
    const stub = makeGhRepoScanStub({ labels: [{ name: 'a' }], issues: { a: issueList([1]) } })
    assert.equal(skip(stub, ['a']).status, 0)
    const calls = stub.calls()
    assert.deepEqual(calls.map((c) => c.split(' --')[0]), ['api repos/o/r/labels?per_page=100', 'api repos/o/r/issues?state=open&labels=a&per_page=100'])
    assert.ok(calls.every((c) => c.includes('--paginate')))
    assert.ok(!calls.some((c) => /(^| )(-f|-F|-X|--field|--raw-field|--input|--method)( |$)/.test(c)))
  })

  T('skip-labels: 空白・コロン・& # % + \' ? / = ・日本語・絵文字を含むラベルも、エンコードされた 1 つの値として正しいラベルの結果になる', () => {
    const labels = ['good first issue', 'owner:human', 'a&b#c', '100%', 'c++', "it's", 'q?x=1/2', '人手', '🚧 wip', '~._-']
    const issues = Object.fromEntries(labels.map((l, k) => [l, issueList([100 + k])]))
    const stub = makeGhRepoScanStub({ labels: labels.map((name) => ({ name })), issues })
    const e = envelopeOf(skip(stub, labels))
    assert.deepEqual(e.payload.entries, labels.map((_, k) => ({ i: k + 1, numbers: [100 + k] })), '各ラベルが自分の応答（取り違えなし）')
    assert.deepEqual([e.payload.absent, e.payload.failed], [[], []])
    assert.equal(e.payload.inputSha256, skipLabelsInputSha256(REPO, NUMS, labels))
  })

  T('skip-labels: --repo はラベル一覧・issue 一覧の全 gh 呼び出しと入力の束縛に入る', () => {
    const stub = makeGhRepoScanStub({ labels: [{ name: 'a' }], issues: { a: issueList([1]) } })
    const e = envelopeOf(skip(stub, ['a'], ['--repo', 'Fandhe-AI/target']))
    assert.equal(e.payload.inputSha256, skipLabelsInputSha256('Fandhe-AI/target', NUMS, ['a']))
    const calls = stub.calls()
    assert.ok(calls.length === 2 && calls.every((c) => c.includes('repos/Fandhe-AI/target/')) && !calls.some((c) => c.includes('{owner}')))
  })

  T('skip-labels: 入力の束縛はラベルの並び（添字）を区別する', () => {
    assert.notEqual(skipLabelsInputSha256(REPO, NUMS, ['a', 'b']), skipLabelsInputSha256(REPO, NUMS, ['b', 'a']))
    assert.notEqual(skipLabelsInputSha256(REPO, NUMS, ['a', 'b']), skipLabelsInputSha256(REPO, NUMS, ['a']))
    assert.notEqual(skipLabelsInputSha256(REPO, NUMS, ['a']), repoScanInputSha256('external-checks', REPO, []))
    const stub = makeGhRepoScanStub({ labels: [{ name: 'a' }, { name: 'b' }], issues: { a: issueList([1]), b: issueList([2]) } })
    const ab = envelopeOf(skip(stub, ['a', 'b'])).payload
    const ba = envelopeOf(skip(stub, ['b', 'a'])).payload
    assert.notEqual(ab.inputSha256, ba.inputSha256)
    assert.deepEqual(ba.entries, [{ i: 1, numbers: [2] }, { i: 2, numbers: [1] }])
  })

  T('skip-labels: ラベル一覧に無いラベルだけ absent（ASCII の大文字小文字は区別しない）。ラベル一覧を取得できなければ absent を判定しない', () => {
    const issues = { 'Owner:Human': issueList([1]), nope: issueList([]), 'ＡＢ': issueList([]) }
    const stub = makeGhRepoScanStub({ labels: [{ name: 'owner:human' }, { name: 'ab' }], issues })
    assert.deepEqual(envelopeOf(skip(stub, ['Owner:Human', 'nope', 'ＡＢ'])).payload.absent, [2, 3], '全角の ＡＢ は ab と同じにしない（ロケール依存の畳み込みをしない）')
    for (const labels of [{ exit: 1 }, { raw: '{"message":"boom"}', exit: 1 }]) {
      const s2 = makeGhRepoScanStub({ labels, issues })
      const e = envelopeOf(skip(s2, ['Owner:Human', 'nope']))
      assert.deepEqual([e.payload.absent, e.payload.failed], [[], []], 'ラベル一覧が取れないときは absent を出さない（待機側へは倒さない）')
      assert.equal(e.payload.entries.length, 2)
    }
  })

  T('skip-labels: ラベル一覧もページ送りを跨ぐ（2 ページ目にあるラベルは absent にならない）', () => {
    const stub = makeGhRepoScanStub({
      labels: { pages: [[{ name: 'first' }], [{ name: 'second-page' }]] },
      issues: { first: issueList([1]), 'Second-Page': issueList([2]), nope: issueList([]) },
    })
    const e = envelopeOf(skip(stub, ['first', 'Second-Page', 'nope']))
    assert.deepEqual(e.payload.absent, [3])
    assert.deepEqual(e.payload.entries.map((x) => x.numbers), [[1], [2], []])
  })

  T('skip-labels: ラベル一覧が空（ラベルが 1 件も無いリポジトリ）なら全ラベルが absent', () => {
    const stub = makeGhRepoScanStub({ labels: [], issues: { a: issueList([]), b: issueList([]) } })
    assert.deepEqual(envelopeOf(skip(stub, ['a', 'b'])).payload.absent, [1, 2])
  })

  T('skip-labels: 取得に失敗したラベルは entries に入れず failed に出し（標準エラーは固定語彙と添字だけ）、他のラベルは返る', () => {
    const stub = makeGhRepoScanStub({
      labels: [{ name: 'ok' }, { name: 'ng' }, { name: 'weird' }, { name: 'ok2' }],
      issues: { ok: issueList([2]), ng: { raw: '{"message":"boom secret-token"}', exit: 1 }, weird: { raw: 'abc\n7\n', exit: 0 }, ok2: issueList([]) },
    })
    const r = skip(stub, ['ok', 'ng', 'weird', 'ok2'])
    const e = envelopeOf(r)
    assert.deepEqual(e.payload.entries, [{ i: 1, numbers: [2] }, { i: 4, numbers: [] }])
    assert.deepEqual(e.payload.failed, [2, 3], '番号でない行（想定外の応答）は欠かさず失敗に倒す')
    assert.equal(r.stderr, 'FAILED 2\nFAILED 3\n')
    assert.ok(!r.stdout.includes('boom') && !r.stdout.includes('secret'))
  })

  T('skip-labels: 番号の整列（sort）が失敗しても、入力があるのに空の結果で成功しても、番号が空の成功にせず failed に出す（入力が空のラベルは成功のまま）', () => {
    for (const action of [FAIL_STATUS, EMPTY_SUCCESS]) {
      const stub = makeGhRepoScanStub({ labels: [{ name: 'a' }, { name: 'b' }], issues: { a: issueList([3, 1]), b: issueList([]) } })
      installFake(stub, 'sort', '-un', action)
      const r = skip(stub, ['a', 'b'])
      const e = envelopeOf(r)
      assert.deepEqual([e.payload.entries, e.payload.failed], [[{ i: 2, numbers: [] }], [1]], action)
      assert.equal(r.stderr, 'FAILED 1\n', '標準エラーは固定語彙と添字だけ（偽 sort の本文は出ない）')
    }
  })

  T('skip-labels: ラベルのエンコード（jq）が失敗したラベルは gh を呼ばずに failed に出し、標準エラーに jq の本文を出さない', () => {
    const stub = makeGhRepoScanStub({ labels: [{ name: 'a' }], issues: { a: issueList([1]) } })
    installFake(stub, 'jq', '-rn --arg l a $l | @uri', 'echo "jq: boom secret-token" >&2; exit 5')
    const r = skip(stub, ['a'])
    const e = envelopeOf(r)
    assert.deepEqual([e.payload.entries, e.payload.failed], [[], [1]])
    assert.equal(r.stderr, 'FAILED 1\n')
    assert.equal(stub.callsTo('issues?'), 0, 'エンコードできなかったラベルで issues を引かない')
  })

  T('skip-labels: 全ラベルが失敗しても封筒は出る（終了コード 0。判定はホスト）', () => {
    const stub = makeGhRepoScanStub({ labels: [{ name: 'a' }], issues: { a: { exit: 1 } } })
    const e = envelopeOf(skip(stub, ['a']))
    assert.deepEqual([e.payload.entries, e.payload.failed], [[], [1]])
  })

  // Issue #807: open issue が 5,000 件あるラベルでも、ツリーの open ノード（--numbers）と交わらない番号は出力に入らず、封筒の上限を超えない
  T('skip-labels: 5,000 件のラベルでもツリーの open ノードとの交わりだけを返し、封筒は上限内（交わらない番号は出力に入らない）', () => {
    const many = Array.from({ length: 5000 }, (_, k) => 100000 + k)
    const stub = makeGhRepoScanStub({ labels: [{ name: 'big' }, { name: 'none' }], issues: { big: { pages: chunk(issueList(many), 100) }, none: issueList([3, 4, 5]) } })
    const nodes = [1, 2, 100003, 101234, 104999, 200000]
    const r = skip(stub, ['big', 'none'], ['--numbers', nodes.join(',')])
    const e = envelopeOf(r)
    assert.deepEqual(e.payload.entries, [{ i: 1, numbers: [100003, 101234, 104999] }, { i: 2, numbers: [] }])
    assert.deepEqual(e.payload.failed, [])
    assert.ok(r.stdout.length < 1000, `封筒は交わりの大きさで抑えられる（${r.stdout.length} バイト）`)
    assert.ok(!r.stdout.includes('100000,') && !r.stdout.includes('104998'), '交わらない番号が出力に入った')
    assert.equal(e.payload.inputSha256, skipLabelsInputSha256(REPO, nodes.join(','), ['big', 'none']))
    // 大量ノード（fetch-tree.sh の上限 約 4,500 件 × 6 桁）の --numbers も 1 引数で渡せる（約 31,500 バイト < MAX_ARG_STRLEN 131,072）
    const bigNodes = Array.from({ length: 4500 }, (_, k) => 300000 + k * 2)
    const big = skip(stub, ['big'], ['--numbers', bigNodes.join(',')])
    assert.deepEqual(envelopeOf(big).payload.entries, [{ i: 1, numbers: [] }])
  })

  T('skip-labels: 交わりが封筒の上限（24000 バイト）を超えると封筒を出さず exit 7（ホストは取得できなかったものとして全 open ノードを待たせる）', () => {
    const many = Array.from({ length: 4000 }, (_, k) => 100000 + k)
    const stub = makeGhRepoScanStub({ labels: [{ name: 'big' }], issues: { big: issueList(many) } })
    const r = skip(stub, ['big'], ['--numbers', many.join(',')])
    assert.equal(r.status, 7)
    assert.equal(r.stdout, '')
    // 収まる大きさなら通る
    const ok = skip(stub, ['big'], ['--numbers', many.slice(0, 1500).join(',')])
    assert.equal(envelopeOf(ok).payload.entries[0].numbers.length, 1500)
  })

  T('skip-labels: 番号の形が違う行があれば、交わりの外でもそのラベルは failed（絞り込みは全行の形式検査の後）', () => {
    const stub = makeGhRepoScanStub({ labels: [{ name: 'a' }], issues: { a: { raw: '3\n007\n', exit: 0 } } })
    const e = envelopeOf(skip(stub, ['a'], ['--numbers', '3']))
    assert.deepEqual([e.payload.entries, e.payload.failed], [[], [1]])
  })

  T('skip-labels: 入力の束縛はノード番号の集合を区別する', () => {
    const stub = makeGhRepoScanStub({ labels: [{ name: 'a' }], issues: { a: issueList([1, 2]) } })
    const a = envelopeOf(skip(stub, ['a'], ['--numbers', '1,2'])).payload
    const b = envelopeOf(skip(stub, ['a'], ['--numbers', '1'])).payload
    assert.notEqual(a.inputSha256, b.inputSha256)
    assert.deepEqual([a.entries[0].numbers, b.entries[0].numbers], [[1, 2], [1]])
    assert.notEqual(skipLabelsInputSha256(REPO, '1', ['a']), skipLabelsInputSha256(REPO, '', ['1', 'a']))
  })

  T('skip-labels: --numbers の誤り（無い・空・昇順でない・重複・先頭 0・0・10 桁・数字以外・前後のカンマ・長すぎる・external-checks に付ける）は gh を呼ばず exit 2', () => {
    const stub = makeGhRepoScanStub({ labels: [], issues: {} })
    const base = ['--mode', 'skip-labels', '--nonce', NONCE, '--repo', REPO]
    const cases = [
      [...base, '--', 'x'],
      ...['', '2,1', '1,1', '01', '0', '1234567890', '1,a', ',1', '1,', '1,,2', '1 2', '-1', Array.from({ length: 20000 }, (_, k) => k + 1).join(',')].map((n) => [...base, '--numbers', n, '--', 'x']),
      [...base, '--numbers', '1', '--numbers', '1', '--', 'x'],
      ['--mode', 'external-checks', '--nonce', NONCE, '--repo', REPO, '--numbers', '1'],
    ]
    for (const args of cases) {
      const r = run(bash, stub, args)
      assert.equal(r.status, 2, JSON.stringify(args).slice(0, 120))
      assert.equal(r.stdout, '')
    }
    assert.equal(stub.calls().length, 0, 'gh を呼んだ')
  })

  T('skip-labels: ロケールに依存しない（番号の並び・absent は LC_ALL が違っても同じ）', () => {
    const issues = { a: issueList([10, 9, 100, 2]), 'Ａ': issueList([1]) }
    const stub = makeGhRepoScanStub({ labels: [{ name: 'a' }], issues })
    const base = skip(stub, ['a', 'Ａ'], [], { env: { LC_ALL: 'C' } }).stdout
    for (const env of [{ LC_ALL: 'en_US.UTF-8' }, { LC_ALL: 'ja_JP.UTF-8', LANG: 'ja_JP.UTF-8' }]) assert.equal(skip(stub, ['a', 'Ａ'], [], { env }).stdout, base, JSON.stringify(env))
    assert.deepEqual(JSON.parse(base).payload.entries[0].numbers, [2, 9, 10, 100], '数値順')
  })

  T('skip-labels: 旧コマンド（凍結）と同じ入力で、番号・存在確認・失敗が同じになる', () => {
    const labels = ['owner:human', "It's", 'broken', 'none', 'Mixed Case']
    const data = {
      labels: [{ name: 'Owner:Human' }, { name: "it's" }, { name: 'broken' }, { name: 'mixed case' }],
      issues: {
        'owner:human': { pages: [issueList([9, 3]), issueList([5, 3, { number: 6, pr: true }])] },
        "It's": issueList([4]),
        broken: { raw: '{"message":"boom"}', exit: 1 },
        none: issueList([]),
        'Mixed Case': issueList([8, 1]),
      },
    }
    const q = (l) => `'${l.replace(/'/g, `'\\''`)}'`
    const oldCmd = OLD_SKIP.replace("'__L1__' '__L2__'", labels.map(q).join(' '))
    const oldStub = makeGhRepoScanStub(data)
    const old = spawnSync(bash, ['-c', oldCmd], { env: oldStub.env(), encoding: 'utf8' })
    assert.equal(old.status, 0, old.stderr)
    const oldEntries = old.stdout.trim().split('\n').map((l) => JSON.parse(l))
    const newE = envelopeOf(skip(makeGhRepoScanStub(data), labels))
    assert.deepEqual(newE.payload.entries, oldEntries.map((x) => ({ i: x.i, numbers: x.numbers })))
    assert.deepEqual(newE.payload.absent, oldEntries.filter((x) => x.x === 1).map((x) => x.i))
    assert.match(old.stderr, /FAILED 3/)
    assert.deepEqual(newE.payload.failed, [3])
  })

  T('skip-labels: 起動行の誤り（ラベルなし・11 件・カンマ・空・制御文字・前後空白・長すぎる）は gh を呼ばず exit 2', () => {
    const stub = makeGhRepoScanStub({ labels: [], issues: {} })
    const bad = [
      [],
      Array.from({ length: 11 }, (_, k) => `l${k}`),
      ['a,b'],
      [''],
      ['a\nb'],
      ['a\tb'],
      ['a\u0001b'],
      [' x'],
      ['x '],
      ['a'.repeat(201)],
    ]
    for (const labels of bad) {
      const r = skip(stub, labels)
      assert.equal(r.status, 2, JSON.stringify(labels))
      assert.equal(r.stdout, '')
    }
    assert.equal(stub.calls().length, 0, 'gh を呼んだ')
  })

  // ---------------- 共通の引数検証・launcher ----------------

  T('引数の誤り（モードなし・不明なモード・nonce なし・不正な nonce・不正な repo・--repo の空・重複・未知の引数・external-checks のラベル）は gh を呼ばず exit 2', () => {
    const stub = makeGhRepoScanStub({})
    const cases = [
      [],
      ['--nonce', NONCE],
      ['--mode', 'bogus', '--nonce', NONCE],
      ['--mode', 'external-checks'],
      ['--mode', 'external-checks', '--nonce', 'BAD NONCE'],
      ['--mode', 'external-checks', '--nonce', 'UPPER'],
      ['--mode', 'external-checks', '--nonce', NONCE, '--repo', 'bad repo'],
      ['--mode', 'external-checks', '--nonce', NONCE, '--repo', ''],
      ['--mode', 'external-checks', '--nonce', NONCE, '--repo', 'a/b', '--repo', 'a/b'],
      ['--mode', 'external-checks', '--mode', 'skip-labels', '--nonce', NONCE, '--repo', REPO, '--numbers', '1', '--', 'x'],
      ['--mode', 'external-checks', '--nonce', NONCE, '--bogus'],
      ['--mode', 'external-checks', '--nonce', NONCE, '--', 'label'],
      ['--mode', 'skip-labels', '--nonce', NONCE, '--repo', '--', 'x'],
      ['--mode'],
      // --repo の省略（Issue #808。他は正しい起動行。省くと gh がカレントのリポジトリへ倒れるため使い方の誤り）
      ['--mode', 'external-checks', '--nonce', NONCE],
      ['--mode', 'skip-labels', '--nonce', NONCE, '--numbers', '1', '--', 'x'],
    ]
    for (const args of cases) {
      const r = run(bash, stub, args)
      assert.equal(r.status, 2, JSON.stringify(args))
      assert.equal(r.stdout, '', JSON.stringify(args))
    }
    assert.equal(stub.calls().length, 0, 'gh を呼んだ')
  })

  T('run-verified.sh 経由（SHA-256 照合つき）で起動でき、スクリプトのハッシュが違えば起動しない', () => {
    const stub = makeGhRepoScanStub({ prs: [{ headRefOid: A }], checkRuns: { [A]: checkRuns(['cursor']) } })
    const ok = run(bash, stub, ['--mode', 'external-checks', '--nonce', NONCE, '--repo', REPO], { launcher: true })
    assert.deepEqual(envelopeOf(ok).payload.apps, ['cursor'])
    const bad = spawnSync(bash, [RUN_VERIFIED, '0'.repeat(64), 'repo-scan.sh', '--mode', 'external-checks', '--nonce', NONCE], { env: stub.env(), encoding: 'utf8' })
    assert.equal(bad.status, 3)
    assert.equal(bad.stdout, '')
  })
}
