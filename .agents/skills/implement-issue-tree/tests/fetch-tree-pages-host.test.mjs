// ツリー取得のページ経路（Issue #690）を、stub agent で実装スクリプト全体を走らせて確かめる回帰テスト。
//
// 封筒の pages が 2 以上のとき、ホストはページごとに別のエージェントで fetch-tree.sh --page を実行させ、ページの封筒で照合してから連結する
// （1 体のエージェントに全件を書き写させない）。期待する封筒は tests/lib/signed-output.mjs が node:crypto で独立に計算する。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { runScript, BASE_ARGS, importDefinitions, source } from './lib/stub-run.mjs'
import { treePagesFetchReply, treePageReply } from './lib/signed-output.mjs'

const LEAVES = [2, 3, 4, 5]
const truth = () => [
  { number: 1, title: 'root', state: 'open', parent: 0, siblingIndex: 0, dependsOn: [], subIssuesTotal: LEAVES.length },
  ...LEAVES.map((n, i) => ({ number: n, title: `issue ${n}`, state: 'open', parent: 1, siblingIndex: i, dependsOn: [], subIssuesTotal: 0 })),
]
const chunk = (nodes, size) => Array.from({ length: Math.ceil(nodes.length / size) }, (_, i) => nodes.slice(i * size, (i + 1) * size))
const TSV = 'a'.repeat(64)
const DIR = '/tmp/iit-tree.AbC123'
const POST = /^(detect:external-checks|plan:declared-deps|plan:root-ancestors|plan:out-of-tree-deps)/
const isMain = (l) => l === 'plan:issue-tree' || l === 'plan:issue-tree-retry'
const isPage = (l) => l.startsWith('plan:issue-tree-page-')
const names = (calls) => calls.map((c) => c.opts.label)
const pageOf = (prompt) => Number(/--page (\d+)/.exec(prompt)[1])

// main: 取得の応答、page(label, prompt, pages): ページ読みの応答、release: 片づけの応答
function run({ main, page, args = BASE_ARGS, leaves = LEAVES, all = truth(), size = 2, dir = DIR } = {}) {
  const parts = chunk(all, size)
  const releases = []
  return runScript({
    args,
    leaves,
    override: (label, _opts, prompt) => {
      if (isMain(label)) return main ? main(prompt, parts) : treePagesFetchReply(prompt, all, { pages: parts.length, dir, tsvSha: TSV })
      if (isPage(label)) return page ? page(label, prompt, parts) : treePageReply(prompt, parts[pageOf(prompt) - 1], TSV)
      if (label === 'plan:issue-tree-release') { releases.push(prompt); return { ok: true } }
      return undefined
    },
  }).then((r) => ({ ...r, releases }), (e) => { e.releases = releases; throw e })
}

test('3 ページの正直な返却: ページごとのエージェントで読み、連結し、最後に片づける', async () => {
  const { result, calls, releases } = await run()
  assert.equal(result.treeFetch.pages, 3)
  assert.equal(result.treeFetch.attempts, 1)
  assert.equal(result.treeFetch.titleMismatch, false)
  const treeLabels = names(calls).filter((l) => l.startsWith('plan:issue-tree'))
  assert.equal(treeLabels[0], 'plan:issue-tree')
  assert.deepEqual(treeLabels.slice(1, 4).sort(), ['plan:issue-tree-page-1', 'plan:issue-tree-page-2', 'plan:issue-tree-page-3'])
  assert.equal(treeLabels[4], 'plan:issue-tree-release')
  assert.equal(treeLabels.length, 5)
  // 後続の agent は片づけの後に起動する
  const firstPost = names(calls).findIndex((l) => POST.test(l))
  assert.ok(firstPost > names(calls).indexOf('plan:issue-tree-release'))
  // 取得のプロンプトは --page を起動させない。ページのプロンプトは launcher 経由・単一引用符で囲んだ dir・ページごとに違う nonce
  const pagePrompts = calls.filter((c) => isPage(c.opts.label)).map((c) => c.prompt)
  const nonces = pagePrompts.map((p) => /--nonce ([0-9a-z]{28}) --page/.exec(p)[1])
  assert.equal(new Set(nonces).size, 3)
  for (const p of pagePrompts) assert.match(p, /run-verified\.sh' [0-9a-f]*\S* fetch-tree\.sh --nonce [0-9a-z]{28} --page \d+ --dir '\/tmp\/iit-tree\.AbC123'\n/)
  assert.equal(releases.length, 1)
  assert.match(releases[0], /fetch-tree\.sh --release --dir '\/tmp\/iit-tree\.AbC123'/)
})

test('1 ページだけ書き写しを誤ると、そのページだけを取り直して続行する（nonce は試行ごとに違う）', async () => {
  let n = 0
  const prompts = []
  const { result, calls } = await run({
    page: (label, prompt, parts) => {
      const p = pageOf(prompt)
      prompts.push([label, prompt])
      if (p === 2 && n++ === 0) return treePageReply(prompt, parts[1].map((x, i) => (i === 0 ? { ...x, siblingIndex: 7 } : x)), TSV, { digestNodes: parts[1] })
      return treePageReply(prompt, parts[p - 1], TSV)
    },
  })
  assert.equal(result.treeFetch.pages, 3)
  const ls = names(calls)
  assert.equal(ls.filter((l) => l === 'plan:issue-tree-page-2-retry').length, 1)
  assert.equal(ls.filter((l) => l.endsWith('-retry')).length, 1)
  const nn = (label) => /--nonce ([0-9a-z]{28})/.exec(prompts.find(([l]) => l === label)[1])[1]
  assert.notEqual(nn('plan:issue-tree-page-2'), nn('plan:issue-tree-page-2-retry'))
})

test('同じページが 2 回とも構造不一致なら停止し、後続 agent は 0 件・片づけは呼ばれる', async () => {
  const bad = (label, prompt, parts) => {
    const p = pageOf(prompt)
    if (p !== 3) return treePageReply(prompt, parts[p - 1], TSV)
    return treePageReply(prompt, parts[2].map((x) => ({ ...x, state: 'closed' })), TSV, { digestNodes: parts[2] })
  }
  await assert.rejects(run({ page: bad }).catch((e) => { assert.equal(e.releases.length, 1); throw e }), /ページ 3: .*検査値/)
  const seen = []
  await assert.rejects(runScript({ args: BASE_ARGS, leaves: LEAVES, override: (label, _o, prompt) => { seen.push(label); return isMain(label) ? treePagesFetchReply(prompt, truth(), { pages: 3, dir: DIR, tsvSha: TSV }) : isPage(label) ? bad(label, prompt, chunk(truth(), 2)) : label === 'plan:issue-tree-release' ? { ok: true } : undefined } }))
  assert.ok(!seen.some((l) => POST.test(l)))
})

test('ページの title だけの不一致は取り直しのあと警告つきで続行する（titleMismatch: true）', async () => {
  const titleOff = (label, prompt, parts) => {
    const p = pageOf(prompt)
    if (p !== 1) return treePageReply(prompt, parts[p - 1], TSV)
    return treePageReply(prompt, parts[0].map((x) => (x.number === 2 ? { ...x, title: 'issue 2 ' } : x)), TSV, { digestNodes: parts[0] })
  }
  const { result, calls, logs } = await run({ page: titleOff })
  assert.equal(result.treeFetch.titleMismatch, true)
  assert.equal(names(calls).filter((l) => l.startsWith('plan:issue-tree-page-1')).length, 2)
  assert.ok(logs.some((l) => l.includes('title の一部が取得スクリプトの出力と違う可能性')))
})

test('ページの封筒が別ページの入力に束縛されていると拒否する（流用の検出）', async () => {
  const swapped = (label, prompt, parts) => {
    const p = pageOf(prompt)
    // ページ 1 の内容を、ページ 2 の入力の束縛で返す = 別の呼び出し（別ページ）の出力の流用
    if (p === 2) return treePageReply(prompt, parts[1], TSV, { payload: { inputSha256: 'f'.repeat(64) } })
    return treePageReply(prompt, parts[p - 1], TSV)
  }
  await assert.rejects(run({ page: swapped }), /ページ 2: .*input/)
})

for (const bad of ['relative/iit-tree.x', '/tmp/iit-tree.a b', "/tmp/iit-tree.x'y", '/tmp/../iit-tree.x', '/tmp/./iit-tree.x', '/tmp/other.x', '/tmp/iit-tree.', '/tmp/iit-tree.x;rm', '']) {
  test(`dir が不正（${JSON.stringify(bad)}）ならページ読みを起動せず停止する`, async () => {
    const seen = []
    await assert.rejects(
      runScript({ args: BASE_ARGS, leaves: LEAVES, override: (label, _o, prompt) => { seen.push(label); return isMain(label) ? treePagesFetchReply(prompt, truth(), { pages: 3, dir: bad, tsvSha: TSV }) : undefined } }),
      /封筒が不正/,
    )
    assert.ok(!seen.some(isPage))
  })
}

for (const [name, payload] of [['ページ数が 31', { pages: 31 }], ['tsvSha256 が 16 進でない', { tsvSha256: 'zz' }]]) {
  test(`${name}ならページ読みを起動せず停止する`, async () => {
    const seen = []
    await assert.rejects(
      runScript({ args: BASE_ARGS, leaves: LEAVES, override: (label, _o, prompt) => { seen.push(label); return isMain(label) ? treePagesFetchReply(prompt, truth(), { pages: 3, dir: DIR, tsvSha: TSV, payload }) : label === 'plan:issue-tree-release' ? { ok: true } : undefined } }),
      /封筒が不正/,
    )
    assert.ok(!seen.some(isPage))
  })
}

test('呼び出し数の上限が小さいと、ページ読みの前の事前検査が数値つきで止める（片づけは呼ぶ）', async () => {
  const seen = []
  await assert.rejects(
    runScript({
      args: { ...BASE_ARGS, agentCallLimit: 81 },
      leaves: LEAVES,
      override: (label, _o, prompt) => { seen.push(label); return isMain(label) ? treePagesFetchReply(prompt, truth(), { pages: 30, dir: DIR, tsvSha: TSV }) : label === 'plan:issue-tree-release' ? { ok: true } : undefined },
    }),
    /必要なエージェント呼び出し数（\d+）が残り（\d+）を超える（30 ページ・5 ノード）/,
  )
  assert.ok(!seen.some(isPage))
  assert.ok(seen.includes('plan:issue-tree-release'))
})

test('ページごとの照合に通っても取得時の封筒と食い違えば、取得を取り直さずに停止する', async () => {
  const skewed = truth().map((x) => (x.number === 3 ? { ...x, siblingIndex: 9 } : x))
  const seen = []
  await assert.rejects(
    runScript({
      args: BASE_ARGS,
      leaves: LEAVES,
      override: (label, _o, prompt) => {
        seen.push(label)
        if (isMain(label)) return treePagesFetchReply(prompt, skewed, { pages: 3, dir: DIR, tsvSha: TSV })
        if (isPage(label)) return treePageReply(prompt, chunk(truth(), 2)[pageOf(prompt) - 1], TSV)
        return label === 'plan:issue-tree-release' ? { ok: true } : undefined
      },
    }),
    /連結した結果が取得時の検査値と一致しない/,
  )
  assert.ok(!seen.includes('plan:issue-tree-retry'))
  assert.ok(seen.includes('plan:issue-tree-release'))
  assert.ok(!seen.some((l) => POST.test(l)))
})

test('約 1460 ノードの合成ツリー（10 ページ）が通る。ツリー取得系のエージェントは 1 + ページ数 + 1', async () => {
  const leaves = Array.from({ length: 1459 }, (_, i) => i + 2)
  const all = [
    { number: 1, title: 'root', state: 'open', parent: 0, siblingIndex: 0, dependsOn: [], subIssuesTotal: leaves.length },
    ...leaves.map((n, i) => ({ number: n, title: `issue ${n}`, state: 'open', parent: 1, siblingIndex: i, dependsOn: [], subIssuesTotal: 0 })),
  ]
  const { result, calls } = await run({ args: { ...BASE_ARGS, dryRun: true }, leaves, all, size: 146 })
  assert.ok(result)
  assert.equal(names(calls).filter((l) => l.startsWith('plan:issue-tree')).length, 1 + 10 + 1)
})

test('1 ページのツリーではページ用・片づけ用のエージェントを起動しない', async () => {
  const { calls } = await runScript({ args: BASE_ARGS, leaves: LEAVES })
  assert.ok(!names(calls).some((l) => isPage(l) || l === 'plan:issue-tree-release'))
})

// 兄弟のタスク ID の依存（Issue: fandhe-browser#1263 の Bugbot 指摘「Paged fetch drops sibling dependencies」）。
// ページ読みの agent は他ページの兄弟のタイトルを持たないため、ページを跨ぐ兄弟参照を解決できるのは連結後の全ノードを使うホストの declared-deps だけである。
const { declaredDepsChecksum } = await importDefinitions(['declaredDepsChecksum'], 'pages-host')
const TASK_LEAVES = [2, 3, 4, 5, 6]
const taskTree = (leaves = TASK_LEAVES) => [
  { number: 1, title: 'root', state: 'open', parent: 0, siblingIndex: 0, dependsOn: [], subIssuesTotal: leaves.length },
  ...leaves.map((n, i) => ({ number: n, title: `TASK-9-${i + 1} step ${i + 1}`, state: 'open', parent: 1, siblingIndex: i, dependsOn: [], subIssuesTotal: 0 })),
]
// #5（TASK-9-4・ページ 3）の「前の工程」= #4（ページ 2）、#6（TASK-9-5・ページ 3）の「TASK-9-1 の結果を踏まえ」= #2（ページ 1）
const TASK_BODIES = {
  5: '## 受け入れ条件\n- 前の工程の結果を踏まえている',
  6: '## 受け入れ条件\n- TASK-9-1 の結果を踏まえている',
}

// ページ経路の 3 ページ取得で、本文を bodies から与えて declared-deps の jq フィルタ（実ホストが組み立てたもの）を実行させる
function runTaskTree(bodies) {
  const all = taskTree()
  const parts = chunk(all, 2)
  return runScript({
    args: { ...BASE_ARGS, parallel: 5 },
    leaves: TASK_LEAVES,
    override: (label, _o, prompt) => {
      if (isMain(label)) return treePagesFetchReply(prompt, all, { pages: parts.length, dir: DIR, tsvSha: TSV })
      if (isPage(label)) return treePageReply(prompt, parts[pageOf(prompt) - 1], TSV)
      if (label === 'plan:issue-tree-release') return { ok: true }
      if (label.startsWith('plan:declared-deps')) {
        const filter = /--jq '([^']*)'\) && printf/.exec(prompt)[1]
        const numbers = /for n in ([0-9 ]+); do/.exec(prompt)[1].trim().split(' ').map(Number)
        return {
          entries: numbers.map((number) => {
            const out = JSON.parse(execFileSync('jq', ['-c', filter], { input: JSON.stringify({ number, body: bodies[number] ?? '' }) }).toString())
            return { number, deps: out.deps, sig: declaredDepsChecksum(number, out.deps) }
          }),
        }
      }
      return undefined
    },
  })
}
// 呼び出しの順序: ラベル l の最初の位置（無ければ Infinity = 着手しなかった）
const posOf = (calls, l) => { const i = names(calls).indexOf(l); return i < 0 ? Infinity : i }

test('ページを跨ぐ兄弟のタスク ID（ID なしの「前の工程」・TASK-9-1 の参照）は連結後の declared-deps で解決され、スケジューラが待つ', async () => {
  const { result, calls, logs } = await runTaskTree(TASK_BODIES)
  assert.equal(result.treeFetch.pages, 3)
  // 埋め込まれた表は全ページの兄弟の ID を載せる（ページ 1 の TASK-9-1 もページ 3 の依頼に含まれる）
  const dd = calls.filter((c) => c.opts.label.startsWith('plan:declared-deps')).map((c) => c.prompt).join('\n')
  for (const id of ['TASK-9-1', 'TASK-9-2', 'TASK-9-3', 'TASK-9-4', 'TASK-9-5']) assert.ok(dd.includes(id), `表に ${id} が無い`)
  const added = logs.find((l) => l.includes('本文の依存宣言から dependsOn を'))
  assert.ok(added, '依存宣言の補完ログが無い')
  assert.match(added, /#5→#4/)
  assert.match(added, /#6→#2/)
  // 待つ: #5 の計画は #4 の終端（merge）より後、#6 の計画は #2 の終端より後（先行が終端するまで着手しない。着手しないままラン終了でもよい）
  assert.ok(posOf(calls, 'plan:#5') > posOf(calls, 'merge:#4'), '#5 が #4 の完了を待たずに計画へ進んだ')
  assert.ok(posOf(calls, 'plan:#6') > posOf(calls, 'merge:#2'), '#6 が #2 の完了を待たずに計画へ進んだ')
})

test('対照: 本文に先行の記述が無ければ、同じ 3 ページのツリーで #5・#6 は #4・#2 の完了を待たずに着手する（上のテストの待機が依存宣言由来である証拠）', async () => {
  const { calls, logs } = await runTaskTree({})
  assert.ok(logs.some((l) => l.includes('本文の依存宣言による dependsOn の補完なし')))
  assert.ok(posOf(calls, 'plan:#5') < posOf(calls, 'merge:#4'))
  assert.ok(posOf(calls, 'plan:#6') < posOf(calls, 'merge:#2'))
})

test('page >= 1 のプロンプトは兄弟のタスク ID の突き合わせを指示せず、単一ページ（page 0）のプロンプトには残る', async () => {
  const all = taskTree()
  const parts = chunk(all, 2)
  const { calls } = await run({ all, leaves: TASK_LEAVES })
  const pagePrompts = calls.filter((c) => isPage(c.opts.label)).map((c) => c.prompt)
  assert.equal(pagePrompts.length, 3)
  const MATCH = '兄弟のタイトル先頭のタスク ID と突き合わせ'
  for (const p of pagePrompts) {
    assert.ok(!p.includes(MATCH), 'ページ読みに突き合わせ指示が残っている')
    assert.ok(!p.includes('1 つ戻した ID の兄弟'))
    assert.ok(p.includes('タスク ID による兄弟参照は扱わない（ホストが全ノードで解決する）'))
  }
  assert.equal(parts.length, 3)
  // 単一ページ: 同じ手順 4 に突き合わせ指示が残る
  const single = await runScript({ args: BASE_ARGS, leaves: TASK_LEAVES, override: (label) => (label === 'plan:issue-tree' ? { nodes: all } : undefined) })
  const main = single.calls.find((c) => c.opts.label === 'plan:issue-tree').prompt
  assert.ok(main.includes(MATCH))
  assert.ok(main.includes('1 つ戻した ID の兄弟'))
  assert.ok(!main.includes('ホストが全ノードで解決する'))
})

// ID 付きの兄弟が上限（100 件）を超える親は兄弟の表を作らない。ページ経路ではその親のページ跨ぎの参照を解決できる者がいないため停止する。
const BIG_LEAVES = Array.from({ length: 101 }, (_, i) => i + 2)

test('兄弟のタスク ID が上限超過の親がページを跨ぐと、何も着手せず親番号つきで停止する', async () => {
  const all = taskTree(BIG_LEAVES)
  const seen = []
  const parts = chunk(all, 40)
  await assert.rejects(
    runScript({
      args: BASE_ARGS,
      leaves: BIG_LEAVES,
      override: (label, _o, prompt) => {
        seen.push(label)
        if (isMain(label)) return treePagesFetchReply(prompt, all, { pages: parts.length, dir: DIR, tsvSha: TSV })
        if (isPage(label)) return treePageReply(prompt, parts[pageOf(prompt) - 1], TSV)
        if (label === 'plan:issue-tree-release') return { ok: true }
        return undefined
      },
    }),
    /上限 100 件を超える親（#1）.*親を分けて実行する/,
  )
  assert.equal(parts.length, 3)
  assert.ok(!seen.some((l) => /^(plan|impl|review|pr-create|merge):#/.test(l)), '停止の後に着手している')
  assert.ok(!seen.some((l) => l.startsWith('plan:declared-deps')), '依存宣言の抽出に進んでいる')
})

test('兄弟のタスク ID が上限超過の親でも、単一ページなら警告だけで続行する', async () => {
  const all = taskTree(BIG_LEAVES)
  const { calls, logs } = await runScript({
    args: { ...BASE_ARGS, dryRun: true },
    leaves: BIG_LEAVES,
    override: (label) => (label === 'plan:issue-tree' ? { nodes: all } : undefined),
  })
  assert.ok(logs.some((l) => l.includes('上限 100 件を超える親（#1）')), '警告ログが無い')
  assert.ok(names(calls).some((l) => l.startsWith('plan:declared-deps')), '依存宣言の抽出に進んでいない')
})

test('駆動部のソース: 上限超過の停止は treeFetch.pages >= 2 のときだけ', () => {
  assert.ok(source.includes('if (treeFetch.pages >= 2) throw new Error('))
})
