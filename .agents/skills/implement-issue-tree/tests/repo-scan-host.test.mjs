// ホスト（implement-issue-tree.src.js）側の repo-scan.sh の配線の回帰テスト。
//
// - observedExternalApps: 外部チェック観測の封筒の照合（nonce・sha256・入力の束縛・apps の形式）を表で検査する（純粋関数）。
// - 配線: detect:external-checks は run-verified.sh 経由の repo-scan.sh の 1 行だけをプロンプトに持ち、gh・xargs・jq を書かない。
//   封筒が通れば observed として返却値に載り、通らなければ apps: [] で続行して警告を出す（旧版と同じ。再試行も throw もしない）。
// - 実スクリプト結合: stub agent がプロンプトの起動行を解釈して実際の repo-scan.sh を偽 gh で走らせ、標準出力をそのまま返す
//   （スタブ製の封筒ではなく、スクリプトの正準形がホストの照合を通ることを確かめる）。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { join } from 'node:path'
import { importDefinitions, runScript, BASE_ARGS } from './lib/stub-run.mjs'
import { availableBashes, externalChecksReply, makeEnvelope, parseRepoScanCommand, repoScanInputSha256, skipLabelsInputSha256, skipLabelsReply, toolExists, treeFetchReply, TREE_DEFAULT_REPO } from './lib/signed-output.mjs'
import { makeGhRepoScanStub, checkRuns, issueList } from './lib/gh-repo-scan-stub.mjs'
import { SCRIPT } from './lib/repo-scan-suite.mjs'

const D = await importDefinitions(['observedExternalApps', 'externalChecksPrompt', 'skipLabelsPrompt', 'repoScanCommand', 'repoScanInputSha256'], 'repo-scan-host')
const ARGS = (extra = {}) => ({ ...BASE_ARGS, ...extra })
const labelsOf = (calls) => calls.map((c) => c.opts.label)
const NONCE = 'n0nce'

// --- observedExternalApps（純粋関数） ---

const REPO = 'o/r'
const good = (over = {}, nonce = NONCE) => makeEnvelope(nonce, { apps: ['codecov', 'cursor'], dropped: 0, errs: 0, inputSha256: repoScanInputSha256('external-checks', REPO), prs: 3, ...over })

test('observedExternalApps: 正しい封筒は apps と errs を返す（空の apps も可）', () => {
  assert.deepEqual(D.observedExternalApps(good(), NONCE, REPO), { apps: ['codecov', 'cursor'], errs: 0 })
  assert.deepEqual(D.observedExternalApps(good({ apps: [], errs: 2, prs: 0 }), NONCE, REPO), { apps: [], errs: 2 })
})

test('observedExternalApps: 封筒の欠落・nonce・sha256・入力の束縛・形式・昇順・重複・件数の不正は null（採用しない）', () => {
  const env = good()
  const bad = [
    ['null', null],
    ['文字列', 'x'],
    ['平らな旧形式', { apps: ['cursor'] }],
    ['sha256 なし', { nonce: env.nonce, payload: env.payload }],
    ['nonce 違い', good({}, 'other')],
    ['sha256 違い', { ...env, sha256: '0'.repeat(64) }],
    ['payload の書き換え（sha256 が合わない）', { ...env, payload: { ...env.payload, apps: ['cursor'] } }],
    ['別の repo の入力', good({ inputSha256: repoScanInputSha256('external-checks', 'Fandhe-AI/x') })],
    ['別のモードの入力', good({ inputSha256: repoScanInputSha256('skip-labels', REPO) })],
    ['repo を空にした入力（カレントのリポジトリを走査した旧形）', good({ inputSha256: repoScanInputSha256('external-checks', '') })],
    ['slug に大文字', good({ apps: ['Cursor'] })],
    ['slug に空白', good({ apps: ['a b'] })],
    ['slug にシェルの特殊文字', good({ apps: ['a;b'] })],
    ['slug が 65 文字', good({ apps: ['a'.repeat(65)] })],
    ['slug がハイフン始まり', good({ apps: ['-a'] })],
    ['slug が文字列でない', good({ apps: [1] })],
    ['昇順でない', good({ apps: ['cursor', 'codecov'] })],
    ['重複', good({ apps: ['cursor', 'cursor'] })],
    ['101 件', good({ apps: Array.from({ length: 101 }, (_, k) => `a${String(k).padStart(3, '0')}`) })],
    ['apps が配列でない', good({ apps: 'cursor' })],
    ['errs が負', good({ errs: -1 })],
    ['errs が整数でない', good({ errs: 1.5 })],
    ['errs が無い', (() => { const p = { ...good().payload }; delete p.errs; return makeEnvelope(NONCE, p) })()],
  ]
  for (const [name, reply] of bad) assert.equal(D.observedExternalApps(reply, NONCE, REPO), null, name)
})

test('observedExternalApps: 100 件ちょうどは採用する', () => {
  const apps = Array.from({ length: 100 }, (_, k) => `a${String(k).padStart(3, '0')}`)
  assert.equal(D.observedExternalApps(good({ apps }), NONCE, REPO).apps.length, 100)
})

// --- プロンプトの配線 ---

test('externalChecksPrompt: 起動行は run-verified.sh 経由の repo-scan.sh の 1 行で、gh・xargs・jq のコマンドを書かない', () => {
  const p = D.externalChecksPrompt('n1', REPO)
  const line = p.split('\n').find((l) => l.includes('repo-scan.sh'))
  assert.match(line, /^bash '<skillDir>\/scripts\/run-verified\.sh' \S+ repo-scan\.sh --mode external-checks --nonce n1 --repo o\/r$/)
  assert.ok(!/xargs|sh -c|gh pr list|gh api repos|--jq|sort -u|REPO=/.test(p), '転記させるコマンドがプロンプトに残っている')
  assert.ok(p.includes('標準出力は nonce・payload・sha256 を持つ 1 行の JSON'), '封筒の転記指示')
  assert.ok(p.includes('外部チェック観測タスク'), '参考値であることの明記')
})

test('repoScanInputSha256 / repoScanCommand: ホストの定義がスクリプトの束縛と同じ（repo なし・あり・ラベル）', () => {
  assert.equal(D.repoScanInputSha256('external-checks', undefined), repoScanInputSha256('external-checks', ''))
  assert.equal(D.repoScanInputSha256('skip-labels', 'Fandhe-AI/x', ['a', 'b']), repoScanInputSha256('skip-labels', 'Fandhe-AI/x', ['a', 'b']))
  assert.match(D.repoScanCommand('external-checks', undefined, REPO), /--nonce NONCE_NOT_PROVIDED --repo o\/r$/)
})

// --- 駆動部の配線（stub agent） ---

test('detect:external-checks: 封筒が通れば observed として返却値に載る', async () => {
  const { result, calls, logs } = await runScript({
    args: ARGS(),
    override: (label, opts, prompt) => (label === 'detect:external-checks' ? externalChecksReply(prompt, { apps: ['cursor'], prs: 3 }) : undefined),
  })
  assert.deepEqual(result.externalChecksObserved, ['cursor'])
  assert.equal(result.externalChecksConfirmed, false, '観測は参考値で、構成の確定にはならない')
  assert.equal(calls.filter((c) => c.opts.label === 'detect:external-checks').length, 1, '再試行しない（旧版と同じ 1 回）')
  assert.ok(!logs.some((m) => m.includes('観測を採用しない')))
})

// Issue #806: 観測が判断に載るのは未確定時の停止理由だけ。明示時と dryRun では起動しない（観測で App が見つかる応答を置いても呼ばれないことで確かめる）
const cursorObserved = (label, opts, prompt) => (label === 'detect:external-checks' ? externalChecksReply(prompt, { apps: ['cursor'] }) : undefined)
const detectCalls = (calls) => calls.filter((c) => c.opts.label === 'detect:external-checks').length

test('detect:external-checks: 未指定なら起動し、停止理由の文言に観測した apps が入る', async () => {
  const { calls, logs } = await runScript({ args: ARGS(), override: cursorObserved })
  assert.equal(detectCalls(calls), 1)
  assert.ok(logs.some((m) => m.includes('明示されていないため自動マージを停止した') && m.includes('観測結果は参考値: cursor。')), '停止理由に apps')
})

test('detect:external-checks: externalChecks を明示（[] を含む）したランでは起動しない。返却値・ログは未観測の形', async () => {
  for (const externalChecks of [[], [{ app: 'cursor', context: 'Cursor Bugbot' }], ['codecov']]) {
    const name = JSON.stringify(externalChecks)
    const { result, calls, logs } = await runScript({ args: ARGS({ externalChecks }), override: cursorObserved })
    assert.equal(detectCalls(calls), 0, name)
    assert.deepEqual(result.externalChecksObserved, [], name)
    assert.equal(result.externalChecksConfirmed, true, name)
    assert.deepEqual(result.externalChecks, externalChecks.map((e) => e.app ?? e), name)
    assert.ok(!logs.some((m) => m.includes('観測を採用しない') || m.includes('観測結果は参考値')), name)
    assert.ok(logs.some((m) => m.includes(externalChecks.length ? '外部チェック（args.externalChecks による明示指定）' : '外部チェックなし（args.externalChecks: [] による明示確定）')), name)
  }
})

test('detect:external-checks: dryRun では起動せず、見積りの返却は観測の有無で変わらない', async () => {
  for (const extra of [{}, { externalChecks: [] }]) {
    const name = JSON.stringify(extra)
    const { result, calls, logs } = await runScript({ args: ARGS({ dryRun: true, ...extra }), override: cursorObserved })
    assert.equal(result.dryRun, true, name)
    assert.equal(detectCalls(calls), 0, name)
    assert.ok(!Object.keys(result).some((k) => k.startsWith('externalChecks')), `${name}: 見積りの返却に観測を載せない`)
    if (!extra.externalChecks) assert.ok(logs.some((m) => m.includes('観測結果は参考値: 未観測。')), `${name}: 未観測を「なし」と書かない`)
  }
})

test('detect:external-checks: 封筒が通らなければ apps: [] で続行し、警告を出す（再試行も throw もしない）', async () => {
  for (const [name, mk] of [
    ['旧形式の平らな応答', () => ({ apps: ['cursor'] })],
    ['null', () => null],
    ['nonce 違い', (prompt) => makeEnvelope('stale', externalChecksReply(prompt).payload)],
    ['入力の束縛が違う（別の repo）', (prompt) => externalChecksReply(prompt, { inputSha256: repoScanInputSha256('external-checks', 'Fandhe-AI/other') })],
    ['slug の形式不正', (prompt) => externalChecksReply(prompt, { apps: ['evil;rm'] })],
  ]) {
    const { result, calls, logs } = await runScript({ args: ARGS(), override: (label, opts, prompt) => (label === 'detect:external-checks' ? mk(prompt) : undefined) })
    assert.deepEqual(result.externalChecksObserved, [], name)
    assert.equal(calls.filter((c) => c.opts.label === 'detect:external-checks').length, 1, name)
    assert.ok(logs.some((m) => m.includes('外部チェックの観測を採用しない')), name)
  }
})

test('detect:external-checks: gh の失敗があった封筒は取れた分で続行し、失敗の件数を警告する', async () => {
  const { result, logs } = await runScript({
    args: ARGS(),
    override: (label, opts, prompt) => (label === 'detect:external-checks' ? externalChecksReply(prompt, { apps: ['cursor'], errs: 2 }) : undefined),
  })
  assert.deepEqual(result.externalChecksObserved, ['cursor'])
  assert.ok(logs.some((m) => m.includes('gh の失敗が 2 件')))
})

test('detect:external-checks: args.repo は起動行の --repo と入力の束縛に入る。未指定ならツリー取得の封筒の repo が入る（空にならない）。nonce は repo ごとに違う', async () => {
  const seen = {}
  for (const repo of [undefined, 'Fandhe-AI/target']) {
    const { calls } = await runScript({ args: ARGS(repo ? { repo } : {}), override: () => undefined })
    seen[repo ?? ''] = parseRepoScanCommand(calls.find((c) => c.opts.label === 'detect:external-checks').prompt)
  }
  assert.equal(seen[''].repo, TREE_DEFAULT_REPO, 'args.repo 未指定でもツリーのリポジトリへ束縛する（Issue #808）')
  assert.equal(seen['Fandhe-AI/target'].repo, 'Fandhe-AI/target')
  assert.notEqual(seen[''].nonce, seen['Fandhe-AI/target'].nonce)
  assert.match(seen[''].nonce, /^[0-9a-z]{1,64}$/)
})

// Issue #808: args.repo が無いとき、repo-scan.sh はツリー取得の封筒の repo（fetch-tree.sh がルートの repository_url から解決）へ束縛する
// ツリー取得の正直な封筒（葉は root #1 の子）。repo だけを差し替える（fetch-tree.sh が返すツリーのリポジトリ）
const treeReplyWithRepo = (prompt, leaves, repo) => {
  const nodes = [{ number: 1, title: 'root', state: 'open', parent: 0, siblingIndex: 0, dependsOn: [], subIssuesTotal: leaves.length, optinTests: [] },
    ...leaves.map((n, i) => ({ number: n, title: `issue ${n}`, state: 'open', parent: 1, siblingIndex: i, dependsOn: [], subIssuesTotal: 0, optinTests: [] }))]
  return treeFetchReply(prompt, nodes, { payload: { repo } })
}
const scanLabels = (calls) => calls.filter((c) => c.opts.label === 'detect:external-checks' || c.opts.label.startsWith('plan:skip-labels'))
test('args.repo 未指定: 観測・対象外ラベルの起動行の --repo と期待する inputSha256 はツリー取得の封筒の repo（args.repo の束縛先は広げない）', async () => {
  const treeRepo = 'Fandhe-AI/tree-repo'
  const { result, calls } = await runScript({
    args: ARGS({ skipLabels: ['owner:human'] }),
    leaves: [2, 3],
    override: (label, opts, prompt) => {
      if (label === 'plan:issue-tree') return treeReplyWithRepo(prompt, [2, 3], treeRepo)
      if (label === 'detect:external-checks') return externalChecksReply(prompt, { apps: ['cursor'] })
      if (label === 'plan:skip-labels') return skipLabelsReply(prompt, { entries: [{ i: 1, numbers: [3] }] })
      return undefined
    },
  })
  const scans = scanLabels(calls)
  assert.equal(scans.length, 2)
  for (const c of scans) {
    const p = parseRepoScanCommand(c.prompt)
    assert.equal(p.repo, treeRepo, c.opts.label)
    assert.match(c.prompt, / --repo Fandhe-AI\/tree-repo( |$)/m)
  }
  // 応答は起動行の repo で作った封筒なので、ホストの期待値（scanRepo から計算）と一致して採用される
  assert.deepEqual(result.externalChecksObserved, ['cursor'])
  assert.deepEqual(result.skippedLabels.matched, [3])
  // args.repo の束縛先（base-merge・merge-gate・fetch-tree の --repo）にはツリーの repo を入れない
  const others = calls.filter((c) => !scans.includes(c))
  assert.ok(others.every((c) => !c.prompt.includes(treeRepo)), others.filter((c) => c.prompt.includes(treeRepo)).map((c) => c.opts.label).join(','))
})

test('args.repo 未指定: 別の repo（空の repo を含む）で作った封筒は入力の束縛で拒否される', async () => {
  for (const bad of ['', 'Fandhe-AI/other']) {
    const { result, logs } = await runScript({
      args: ARGS({ skipLabels: ['a'] }),
      leaves: [2],
      override: (label, opts, prompt) => {
        if (label !== 'detect:external-checks' && !label.startsWith('plan:skip-labels')) return undefined
        const c = parseRepoScanCommand(prompt)
        if (label === 'detect:external-checks') return makeEnvelope(c.nonce, { apps: ['cursor'], dropped: 0, errs: 0, inputSha256: repoScanInputSha256('external-checks', bad), prs: 3 })
        if (label.startsWith('plan:skip-labels')) return makeEnvelope(c.nonce, { absent: [], entries: [{ i: 1, numbers: [] }], failed: [], inputSha256: skipLabelsInputSha256(bad, c.numbers, c.labels) })
        return undefined
      },
    })
    assert.deepEqual(result.externalChecksObserved, [], bad)
    assert.deepEqual(result.skippedLabels.unknown, ['a'], `${bad}: 取得できなかったものとして全 open ノードを待たせる`)
    assert.ok(logs.some((m) => m.includes('出力封筒の照合に失敗した（input）')), bad)
  }
})

test('args.repo 未指定でツリー取得の封筒の repo が形式不正なら repo-scan.sh を起動しない（観測は未観測・対象外ラベルは全 open ノード待機）', async () => {
  for (const repo of ['bad repo', 'a/b/c', '-x/y']) {
    const { result, calls, logs } = await runScript({
      args: ARGS({ skipLabels: ['a'] }),
      leaves: [2, 3],
      override: (label, opts, prompt) => (label === 'plan:issue-tree' ? treeReplyWithRepo(prompt, [2, 3], repo) : undefined),
    })
    assert.equal(scanLabels(calls).length, 0, repo)
    assert.deepEqual(result.skippedLabels.matched, [1, 2, 3], repo)
    assert.deepEqual(result.skippedLabels.unknown, ['a'], repo)
    assert.ok(logs.some((m) => m.includes('観測結果は参考値: 未観測。')), repo)
  }
})

test('detect:external-checks の返却スキーマは封筒（nonce・payload・sha256）で、skip-labels も同じ', async () => {
  const { calls } = await runScript({ args: ARGS({ skipLabels: ['a'] }), override: () => undefined })
  for (const label of ['detect:external-checks', 'plan:skip-labels']) {
    const schema = calls.find((c) => c.opts.label === label).opts.schema
    assert.deepEqual(schema.required, ['nonce', 'payload', 'sha256'], label)
    assert.deepEqual(Object.keys(schema.properties.payload.properties).sort(), label === 'plan:skip-labels' ? ['absent', 'entries', 'failed', 'inputSha256'] : ['apps', 'dropped', 'errs', 'inputSha256', 'prs'], label)
  }
})

// --- 実スクリプト結合（偽 gh） ---

// プロンプトの起動行を解釈して、実際の repo-scan.sh を偽 gh で走らせ、標準出力の封筒をそのまま返す（正直なエージェント）
function runRealScan(bash, stub, prompt) {
  const c = parseRepoScanCommand(prompt)
  const argv = [SCRIPT, '--mode', c.mode, '--nonce', c.nonce, ...(c.repo ? ['--repo', c.repo] : []), ...(c.mode === 'skip-labels' ? ['--numbers', c.numbers, '--', ...c.labels] : [])]
  const r = spawnSync(bash, argv, { env: stub.env(), encoding: 'utf8' })
  assert.equal(r.status, 0, r.stderr)
  return JSON.parse(r.stdout)
}

for (const bash of availableBashes()) {
  test(`[${bash}] 実スクリプト結合: 外部チェック観測（check-runs の App）がホストの照合を通って observed になる`, { skip: !toolExists('jq') && 'jq が無い' }, async () => {
    const stub = makeGhRepoScanStub({ prs: [{ headRefOid: 'a'.repeat(40) }], checkRuns: { ['a'.repeat(40)]: checkRuns(['cursor', 'github-actions', 'codecov']) } })
    const { result, logs } = await runScript({
      args: ARGS(),
      override: (label, opts, prompt) => (label === 'detect:external-checks' ? runRealScan(bash, stub, prompt) : undefined),
    })
    assert.deepEqual(result.externalChecksObserved, ['codecov', 'cursor'])
    assert.ok(!logs.some((m) => m.includes('観測を採用しない')))
  })

  test(`[${bash}] 実スクリプト結合: 対象外ラベル（引用符・日本語・空白を含む）の open issue が blocked になり、存在しないラベルは absent`, { skip: !toolExists('jq') && 'jq が無い' }, async () => {
    const labels = ["it's me", '人手 要確認', 'owner:human', 'typo']
    const stub = makeGhRepoScanStub({
      labels: [{ name: "it's me" }, { name: '人手 要確認' }, { name: 'owner:human' }],
      issues: { "it's me": issueList([2]), '人手 要確認': issueList([3, 4]), 'owner:human': issueList([]), typo: issueList([]) },
    })
    const { result, calls } = await runScript({
      args: ARGS({ skipLabels: labels }),
      leaves: [2, 3, 4, 5],
      override: (label, opts, prompt) => (label === 'plan:skip-labels' ? runRealScan(bash, stub, prompt) : undefined),
    })
    assert.deepEqual(result.skippedLabels, { labels, matched: [2, 3, 4], unknown: [], absent: ['typo'] })
    assert.deepEqual(labelsOf(calls).filter((l) => /^plan:#/.test(l)), ['plan:#5'], '対象外の葉に Plan を起動した')
    assert.equal(calls.filter((c) => c.opts.label.startsWith('plan:skip-labels')).length, 1, '1 回で取れた')
  })

  // Issue #807: リポジトリ全体で 5,000 件の open issue を持つラベルでも、交わるノードだけが blocked になり（全待機にならない）、封筒は上限内
  test(`[${bash}] 実スクリプト結合: 5,000 件の open issue を持つラベルでも、ツリーと交わるノードだけが blocked になる`, { skip: !toolExists('jq') && 'jq が無い' }, async () => {
    const many = issueList(Array.from({ length: 5000 }, (_, k) => 3 + k * 2)) // 3, 5, 7, … （偶数のノードとは交わらない）
    const stub = makeGhRepoScanStub({ labels: [{ name: 'owner:human' }], issues: { 'owner:human': { pages: Array.from({ length: 50 }, (_, p) => many.slice(p * 100, p * 100 + 100)) } } })
    let bytes = 0
    const { result, calls } = await runScript({
      args: ARGS({ skipLabels: ['owner:human'] }),
      leaves: [2, 4, 5, 6],
      override: (label, opts, prompt) => {
        if (label !== 'plan:skip-labels') return undefined
        const env = runRealScan(bash, stub, prompt)
        bytes = JSON.stringify(env).length
        return env
      },
    })
    assert.deepEqual(result.skippedLabels, { labels: ['owner:human'], matched: [5], unknown: [], absent: [] })
    assert.ok(bytes < 1000, `封筒は交わりの大きさ（${bytes} バイト）`)
    assert.deepEqual(labelsOf(calls).filter((l) => /^plan:#/.test(l)), ['plan:#2', 'plan:#4', 'plan:#6'], '交わらないノードは待たせない')
  })

  test(`[${bash}] 実スクリプト結合: 取得できなかったラベルがあれば（failed）再試行し、なお取れなければ open ノードを全て待たせる`, { skip: !toolExists('jq') && 'jq が無い' }, async () => {
    const labels = ['a', 'b']
    const stub = makeGhRepoScanStub({ labels: [{ name: 'a' }, { name: 'b' }], issues: { a: issueList([2]), b: { exit: 1 } } })
    const { result, calls } = await runScript({
      args: ARGS({ skipLabels: labels }),
      leaves: [2, 3],
      override: (label, opts, prompt) => (label.startsWith('plan:skip-labels') ? runRealScan(bash, stub, prompt) : undefined),
    })
    assert.deepEqual(labelsOf(calls).filter((l) => l.startsWith('plan:skip-labels')), ['plan:skip-labels', 'plan:skip-labels-retry'])
    assert.deepEqual(result.skippedLabels.unknown, ['b'])
    assert.deepEqual(labelsOf(calls).filter((l) => /^plan:#/.test(l)), [], '取得できないのに着手した')
  })
}

// 取り違え: 別のラベルの並びの封筒（転記でラベルが入れ替わった・欠けた）は入力の束縛で拒否され、そのラベルの結果として採られない
test('取り違え: ラベルの並びが違う入力で作られた封筒は採用しない（再試行で正しい封筒なら通る）', async () => {
  const labels = ['owner:human', 'owner:joint']
  let n = 0
  const { result, calls, logs } = await runScript({
    args: ARGS({ skipLabels: labels }),
    leaves: [2, 3],
    override: (label, opts, prompt) => {
      if (!label.startsWith('plan:skip-labels')) return undefined
      n++
      const c = parseRepoScanCommand(prompt)
      // 1 回目: 2 つのラベルを入れ替えた入力で走らせた封筒（2 番目のラベルの結果が 1 番目として届く）
      if (n === 1) return makeEnvelope(c.nonce, { absent: [], entries: [{ i: 1, numbers: [3] }, { i: 2, numbers: [] }], failed: [], inputSha256: skipLabelsInputSha256(c.repo, c.numbers, [...c.labels].reverse()) })
      return makeEnvelope(c.nonce, { absent: [], entries: [{ i: 1, numbers: [2] }, { i: 2, numbers: [] }], failed: [], inputSha256: skipLabelsInputSha256(c.repo, c.numbers, c.labels) })
    },
  })
  assert.deepEqual(result.skippedLabels.matched, [2], '入れ替わった封筒の結果（3 が一致）を採っていない')
  assert.equal(calls.filter((c) => c.opts.label.startsWith('plan:skip-labels')).length, 2)
  assert.ok(logs.some((m) => m.includes('出力封筒の照合に失敗した（input）')))
})
