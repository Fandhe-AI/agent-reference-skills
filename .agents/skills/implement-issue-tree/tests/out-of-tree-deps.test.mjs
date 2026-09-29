// ツリー外の前提イシュー（Tree のノード集合に無い dependsOn 番号）を待つ fail-closed 挙動の回帰テスト。
//
// 対象バグ: depsMap 構築が `!inTree.has(d)` でツリー外の番号を黙って捨てていたため、人間担当 issue を
// 別トラッキングツリーで管理し実装 issue 本文の依存節にその番号を書く運用では、前提が open のまま
// 着手していた。
//
// 是正後の契約:
//   - Tree フェーズで毎ラン、ツリー外の前提の state のみを機械取得する（状態ファイルの保存値は使わない）。
//   - open・取得不能（fail-closed）の前提は failedSet 入りの疑似前提として depsMap へ入れ、既存の
//     dep-blocked → cascade → markBlockedByDeps（recordFailure の status: 'blocked'。halt 非カウント）で
//     待たせる。後続は既存の「前提イシューの失敗・ブロックにより未着手」伝搬で待つ。
//   - closed（PR 番号なら MERGED も）は従来どおり制約なし。ルートの祖先は待たない。
//
// 検証の二層構造（dep-reeval.test.mjs と同じ方針）: 純粋関数はスライス import で、駆動部（マーカーより
// 下）はソース走査で配線を固定する。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const SCRIPT_PATH = join(
  dirname(fileURLToPath(import.meta.url)),
  '..', 'scripts', 'implement-issue-tree.src.js',
)
// マーカー文字列はソース中に 1 回しか現れてはならない（g0-gates.test.mjs が出現回数を固定）ため分割して組み立てる。
const DRIVER_MARKER = ['__IMPLEMENT', 'ISSUE', 'TREE', 'DRIVER', 'START__'].join('_')

const source = readFileSync(SCRIPT_PATH, 'utf8')
const markerIndex = source.indexOf(DRIVER_MARKER)
if (markerIndex < 0) throw new Error(`テスト境界マーカー ${DRIVER_MARKER} が実装スクリプトに存在しない`)
const definitionPart = source.slice(0, source.lastIndexOf('\n', markerIndex))
const driverPart = source.slice(markerIndex)
const sliceDir = mkdtempSync(join(tmpdir(), 'implement-issue-tree-out-of-tree-'))
const slicePath = join(sliceDir, 'implement-issue-tree-out-of-tree-defs.mjs')
const SLICE_EXPORTS = [
  'OUT_OF_TREE_DEPS_MAX',
  'OUT_OF_TREE_STATE_SIG_JQ',
  'outOfTreeStateChecksum',
  'ROOT_ANCESTOR_DEPTH',
  'ROOT_ANCESTOR_TRUNCATED',
  'ROOT_ANCESTOR_MAX_ROUNDS',
  'collectOutOfTreeDeps',
  'outOfTreeStatePrompt',
  'rootAncestorsPrompt',
  'collectOutOfTreeStates',
  'collectRootAncestorsChunk',
  'mergeRootAncestorChunk',
  'classifyOutOfTreeDeps',
  'outOfTreeBlockNote',
  'classifyDispatchReadiness',
  'MERGE_CONTEXT_COMMON',
]
writeFileSync(slicePath, `${definitionPart}\nexport { ${SLICE_EXPORTS.join(', ')} }\n`)
const {
  OUT_OF_TREE_DEPS_MAX,
  OUT_OF_TREE_STATE_SIG_JQ,
  outOfTreeStateChecksum,
  ROOT_ANCESTOR_DEPTH,
  ROOT_ANCESTOR_TRUNCATED,
  ROOT_ANCESTOR_MAX_ROUNDS,
  collectOutOfTreeDeps,
  outOfTreeStatePrompt,
  rootAncestorsPrompt,
  collectOutOfTreeStates,
  collectRootAncestorsChunk,
  mergeRootAncestorChunk,
  classifyOutOfTreeDeps,
  outOfTreeBlockNote,
  classifyDispatchReadiness,
  MERGE_CONTEXT_COMMON,
} = await import(pathToFileURL(slicePath).href)

// ---------------------------------------------------------------------------
// 純粋関数
// ---------------------------------------------------------------------------

test('collectOutOfTreeDeps: open ノードの dependsOn からツリー外の番号だけを重複なし昇順で集める', () => {
  const nodes = [
    { number: 4, state: 'open', dependsOn: [] },
    { number: 10, state: 'open', dependsOn: [11, 50, 7] },
    { number: 11, state: 'open', dependsOn: [50, 11, 3] },
    { number: 12, state: 'closed', dependsOn: [99] },
  ]
  assert.deepEqual(collectOutOfTreeDeps(nodes, new Set([4, 10, 11, 12])), [3, 7, 50])
})

test('collectOutOfTreeDeps: 非整数・0 以下は拾わない（ツリー内・自己参照も除外）', () => {
  const nodes = [{ number: 10, state: 'open', dependsOn: [10, 0, -1, 1.5, '8', 20] }]
  assert.deepEqual(collectOutOfTreeDeps(nodes, new Set([10, 20])), [])
})

// 正しい sig 付きの返却エントリ。
const ent = (number, state) => ({ number, state, sig: outOfTreeStateChecksum(number, state) })

test('collectOutOfTreeStates: OPEN / CLOSED / MERGED を受理し、欠落を missing で返す', () => {
  const r = collectOutOfTreeStates([5, 6, 7, 8], {
    entries: [ent(5, 'OPEN'), ent(6, 'CLOSED'), ent(7, 'MERGED')],
  })
  assert.deepEqual([...r.byNumber], [[5, 'OPEN'], [6, 'CLOSED'], [7, 'MERGED']])
  assert.deepEqual(r.missing, [8])
})

test('collectOutOfTreeStates: 依頼外番号・重複・enum 外 state は契約違反として throw する', () => {
  assert.throws(() => collectOutOfTreeStates([5], { entries: [ent(6, 'OPEN')] }), /依頼外/)
  assert.throws(() => collectOutOfTreeStates([5], { entries: [ent(5, 'OPEN'), ent(5, 'CLOSED')] }), /重複/)
  assert.throws(() => collectOutOfTreeStates([5], { entries: [ent(5, 'closed')] }), /想定外/)
  assert.throws(() => collectOutOfTreeStates([5], { entries: [{ ...ent(5, 'OPEN'), number: '5' }] }), /正の整数/)
})

test('collectOutOfTreeStates: state の転記誤り（OPEN → CLOSED）を sig 不一致で検出して throw する', () => {
  // jq が OPEN から計算した sig のまま state だけ CLOSED と写し違えた返却。
  const wrong = { number: 5, state: 'CLOSED', sig: outOfTreeStateChecksum(5, 'OPEN') }
  assert.throws(() => collectOutOfTreeStates([5], { entries: [wrong] }), /sig/)
  assert.throws(() => collectOutOfTreeStates([5], { entries: [{ number: 5, state: 'OPEN' }] }), /sig/)
})

test('OUT_OF_TREE_STATE_SIG_JQ: jq の計算値がホストの outOfTreeStateChecksum と一致する', () => {
  for (const [number, state] of [[5, 'OPEN'], [1234567, 'CLOSED'], [99999, 'MERGED']]) {
    const out = execFileSync('jq', ['-c', `{number: .number, state: .state} | ${OUT_OF_TREE_STATE_SIG_JQ}`], {
      input: JSON.stringify({ number, state }),
    })
    assert.equal(JSON.parse(out.toString()).sig, outOfTreeStateChecksum(number, state))
  }
})

test('collectOutOfTreeStates: null 返却は全件 missing（取得不能 = open 扱いの入力）', () => {
  assert.deepEqual(collectOutOfTreeStates([5, 6], null).missing, [5, 6])
})

// start=4 → 親 3 → 親 1（最上位）の整合したチェーン（ROOT_ANCESTOR_DEPTH に収まる = 打ち切りなし）。
const chain = [{ number: 4, parent: 3 }, { number: 3, parent: 1 }, { number: 1, parent: 0 }]

test('collectRootAncestorsChunk: start から始まり parent が次の number に一致する連鎖なら start を除く祖先の Set と truncatedAt: null を返す', () => {
  const r = collectRootAncestorsChunk({ fetched: true, chain }, 4)
  assert.deepEqual([...r.ancestors], [3, 1])
  assert.equal(r.truncatedAt, null)
  // 親を持たない start は祖先なし（空集合）。
  const r2 = collectRootAncestorsChunk({ fetched: true, chain: [{ number: 4, parent: 0 }] }, 4)
  assert.deepEqual([...r2.ancestors], [])
  assert.equal(r2.truncatedAt, null)
})

test('collectRootAncestorsChunk: 取得失敗・形式不正は null（祖先除外なし = 待つ側）', () => {
  assert.equal(collectRootAncestorsChunk({ fetched: false, chain }, 4), null)
  assert.equal(collectRootAncestorsChunk(null, 4), null)
  assert.equal(collectRootAncestorsChunk({ fetched: true, chain: [] }, 4), null)
  assert.equal(collectRootAncestorsChunk({ fetched: true, chain: [{ number: 4, parent: 'x' }] }, 4), null)
  const tooLong = Array.from({ length: ROOT_ANCESTOR_DEPTH + 2 }, (_, i) => ({ number: 100 - i, parent: i === ROOT_ANCESTOR_DEPTH + 1 ? 0 : 99 - i }))
  assert.equal(collectRootAncestorsChunk({ fetched: true, chain: tooLong }, 100), null)
})

test('collectRootAncestorsChunk: 連鎖の不整合（start 不一致・parent と次の number の食い違い・末尾の親の欠落・重複）は null', () => {
  // start が依頼と異なる
  assert.equal(collectRootAncestorsChunk({ fetched: true, chain }, 5), null)
  // 途中の parent が次の number と一致しない（誤った祖先 #7 の混入）
  assert.equal(collectRootAncestorsChunk({ fetched: true, chain: [{ number: 4, parent: 3 }, { number: 7, parent: 0 }] }, 4), null)
  // 末尾の要素が親を持つと申告しているのに次の要素がない（切り詰め。かつ最大段数未満なので打ち切りマーカーとしても認めない）
  assert.equal(collectRootAncestorsChunk({ fetched: true, chain: [{ number: 4, parent: 3 }, { number: 3, parent: 1 }] }, 4), null)
  // 番号の重複（循環）
  assert.equal(collectRootAncestorsChunk({ fetched: true, chain: [{ number: 4, parent: 3 }, { number: 3, parent: 4 }, { number: 4, parent: 0 }] }, 4), null)
})

// ROOT_ANCESTOR_DEPTH + 1 個（1 ラウンドで取得できる最大段数）まで埋まったチェーンを組み立てる。
// 末尾要素の parent だけ差し替えて、打ち切りマーカーの位置・値に関する不変条件を検証する。
function fullChain(tailParent) {
  const c = []
  let n = 100
  for (let i = 0; i < ROOT_ANCESTOR_DEPTH; i++) { c.push({ number: n, parent: n - 1 }); n -= 1 }
  c.push({ number: n, parent: tailParent })
  return { chain: c, tail: n }
}

test('collectRootAncestorsChunk: 最大段数まで埋まったチャンクの末尾が ROOT_ANCESTOR_TRUNCATED なら打ち切りとして受理し truncatedAt を返す', () => {
  const { chain: c, tail } = fullChain(ROOT_ANCESTOR_TRUNCATED)
  const r = collectRootAncestorsChunk({ fetched: true, chain: c }, 100)
  assert.ok(r)
  assert.equal(r.truncatedAt, tail)
  assert.ok(r.ancestors.has(tail))
})

test('collectRootAncestorsChunk: 最大段数まで埋まったチャンクの末尾が ROOT_ANCESTOR_TRUNCATED 以外（具体的な親番号・0）を名乗ったら null', () => {
  const { chain: withNumber } = fullChain(1)
  assert.equal(collectRootAncestorsChunk({ fetched: true, chain: withNumber }, 100), null)
  const { chain: withZero } = fullChain(0)
  assert.equal(collectRootAncestorsChunk({ fetched: true, chain: withZero }, 100), null)
})

test('collectRootAncestorsChunk: 最大段数に達していないチャンクの末尾が ROOT_ANCESTOR_TRUNCATED を名乗ったら null（逆方向の不整合）', () => {
  assert.equal(collectRootAncestorsChunk({ fetched: true, chain: [{ number: 4, parent: ROOT_ANCESTOR_TRUNCATED }] }, 4), null)
})

test('mergeRootAncestorChunk: 通常合流・root 再出現による循環検出・既出番号の再出現による循環検出', () => {
  const merged = mergeRootAncestorChunk(new Set([1, 2]), { ancestors: new Set([3, 4]) }, 99)
  assert.deepEqual([...merged].sort((a, b) => a - b), [1, 2, 3, 4])
  assert.equal(mergeRootAncestorChunk(new Set(), { ancestors: new Set([5, 99]) }, 99), null)
  assert.equal(mergeRootAncestorChunk(new Set([5]), { ancestors: new Set([5]) }, 99), null)
  // チャンク自体が null（取得失敗・構造不整合）ならそのまま null を伝播する。
  assert.equal(mergeRootAncestorChunk(new Set([1]), null, 99), null)
  // 非破壊: 入力の acc 自体は変更しない。
  const acc = new Set([1])
  mergeRootAncestorChunk(acc, { ancestors: new Set([2]) }, 99)
  assert.deepEqual([...acc], [1])
})

test('受入条件: ROOT_ANCESTOR_DEPTH を超える祖先も複数ラウンドで確定し、classifyOutOfTreeDeps で通常のツリー外前提から除外される', () => {
  // ラウンド1: root=100 から 8 段掘って打ち切り（9 番目の要素の parent が ROOT_ANCESTOR_TRUNCATED）。
  const { chain: round1Chain, tail: truncatedAt } = fullChain(ROOT_ANCESTOR_TRUNCATED)
  const chunk1 = collectRootAncestorsChunk({ fetched: true, chain: round1Chain }, 100)
  assert.equal(chunk1.truncatedAt, truncatedAt)
  let acc = mergeRootAncestorChunk(new Set(), chunk1, 100)
  assert.ok(acc)
  // ラウンド2: 打ち切り位置を起点に継ぎ足し、真の終端（parent: 0）に到達する。9 階層目の祖先が新規に確定する。
  const ninthAncestor = truncatedAt - 1
  const chunk2 = collectRootAncestorsChunk(
    { fetched: true, chain: [{ number: truncatedAt, parent: ninthAncestor }, { number: ninthAncestor, parent: 0 }] },
    truncatedAt,
  )
  assert.equal(chunk2.truncatedAt, null)
  acc = mergeRootAncestorChunk(acc, chunk2, 100)
  assert.ok(acc && acc.has(ninthAncestor))
  // classifyOutOfTreeDeps: 確定した 9 階層目の祖先は open のままでもツリー外前提として待たれない。
  const r = classifyOutOfTreeDeps([ninthAncestor], new Map([[ninthAncestor, 'OPEN']]), acc)
  assert.deepEqual(r.ancestors, [ninthAncestor])
  assert.deepEqual(r.open, [])
})

test('classifyOutOfTreeDeps: 祖先除外はツリー外依存に実際に現れた番号だけに限る', () => {
  const ancestors = collectRootAncestorsChunk({ fetched: true, chain }, 4).ancestors
  const r = classifyOutOfTreeDeps([3, 9], new Map([[9, 'OPEN']]), ancestors)
  assert.deepEqual(r.ancestors, [3])
  assert.deepEqual(r.open, [9])
})

test('classifyOutOfTreeDeps: open / closed（MERGED 含む）/ 取得不能 / 祖先に分類する', () => {
  const states = new Map([[5, 'OPEN'], [6, 'CLOSED'], [7, 'MERGED'], [1, 'OPEN']])
  assert.deepEqual(classifyOutOfTreeDeps([1, 5, 6, 7, 8], states, new Set([1])), {
    open: [5],
    unknown: [8],
    closed: [6, 7],
    ancestors: [1],
  })
})

test('classifyOutOfTreeDeps: 祖先チェーン取得失敗（null）では祖先除外をせず open として待つ（fail-closed）', () => {
  const r = classifyOutOfTreeDeps([1], new Map([[1, 'OPEN']]), null)
  assert.deepEqual(r.open, [1])
  assert.deepEqual(r.ancestors, [])
})

test('outOfTreeStatePrompt: state のみを取得する固定コマンドで、本文・書き込み系を含まない', () => {
  const p = outOfTreeStatePrompt([5, 12])
  assert.ok(p.includes('for n in 5 12; do'))
  const q = `{number: .number, state: .state} | ${OUT_OF_TREE_STATE_SIG_JQ}`
  // issue として取れない番号（PR 番号）は gh pr view へフォールバックし、MERGED を取得できる。
  assert.ok(p.includes(`out=$(gh issue view "$n" --json number,state --jq '${q}' 2>/dev/null || gh pr view "$n" --json number,state --jq '${q}')`))
  assert.ok(p.includes(MERGE_CONTEXT_COMMON))
  assert.doesNotMatch(p, /--json [^\n]*body|gh issue close|gh pr merge|--method/)
  assert.throws(() => outOfTreeStatePrompt([5, '6; rm -rf /']), /正の整数/)
})

test('rootAncestorsPrompt: parent を ROOT_ANCESTOR_DEPTH 段辿る読み取り専用 GraphQL クエリを含み、has("parent") で打ち切りを区別する', () => {
  const p = rootAncestorsPrompt(4)
  assert.equal((p.match(/parent\{/g) ?? []).length, ROOT_ANCESTOR_DEPTH)
  assert.ok(p.includes('-F n=4 '))
  assert.ok(p.includes('recurse(.parent // empty) | {number: .number, parent: (if has("parent") then (.parent.number // 0) else -1 end)}'))
  assert.ok(p.includes('-1'), '打ち切りマーカー -1 の意味を説明文に含む')
  // 実行コマンド行は読み取り専用の query のみ（共通指示の禁止事項の説明文は対象外）。
  const cmd = p.split('\n').find((l) => l.startsWith('gh api graphql '))
  assert.ok(cmd)
  assert.doesNotMatch(cmd, /mutation/)
  assert.throws(() => rootAncestorsPrompt(0), /正の整数/)
})

test('rootAncestorsPrompt jq 実行: 深さ以内の null（真の終端）と深さが尽きたキー不在（打ち切り）を -1 で区別する', () => {
  const p = rootAncestorsPrompt(4)
  const cmd = p.split('\n').find((l) => l.startsWith('gh api graphql '))
  const m = cmd.match(/--jq '(.+)'$/)
  assert.ok(m, 'gh api graphql コマンド行から --jq 式を抽出できる')
  const jqExpr = m[1]
  // 真の終端: GraphQL がフィールドを返すが値が null（.parent キーは存在する）。
  const terminal = JSON.parse(execFileSync('jq', ['-c', jqExpr], {
    input: JSON.stringify({ data: { repository: { issue: { number: 4, parent: { number: 3, parent: null } } } } }),
  }).toString())
  assert.deepEqual(terminal, [{ number: 4, parent: 3 }, { number: 3, parent: 0 }])
  // 打ち切り: 深さが尽きて GraphQL クエリ自体が parent フィールドを要求していない（キー不在）。
  const truncated = JSON.parse(execFileSync('jq', ['-c', jqExpr], {
    input: JSON.stringify({ data: { repository: { issue: { number: 4, parent: { number: 3 } } } } }),
  }).toString())
  assert.deepEqual(truncated, [{ number: 4, parent: 3 }, { number: 3, parent: -1 }])
})

test('outOfTreeBlockNote: 待ちの理由のツリー外番号と再実行の案内を含む', () => {
  assert.equal(
    outOfTreeBlockNote([51, 52]),
    'ツリー外の前提イシュー #51, #52 が open のため未着手（close 後に再実行すると着手する）',
  )
})

test('OUT_OF_TREE_DEPS_MAX: 正の整数の上限を持つ', () => {
  assert.ok(Number.isInteger(OUT_OF_TREE_DEPS_MAX) && OUT_OF_TREE_DEPS_MAX > 0)
})

// ---------------------------------------------------------------------------
// スケジューラ意味論（駆動部と同じ depsMap / failedSet の組み立てを classifyDispatchReadiness で再現）
// ---------------------------------------------------------------------------

// 駆動部の depsMap 構築（ツリー外 open を疑似前提として failedSet に入れる）と cascade の最小再現。
function simulate({ queue, outOfTreeWait }) {
  const inTree = new Set(queue.map((q) => q.number))
  const failedSet = new Set(outOfTreeWait)
  const done = new Set()
  const depsMap = new Map(queue.map((q) => [q.number, new Set()]))
  for (const item of queue) {
    for (const d of item.dependsOn ?? []) {
      if (d === item.number) continue
      if (!inTree.has(d)) {
        if (outOfTreeWait.has(d)) depsMap.get(item.number).add(d)
        continue
      }
      depsMap.get(item.number).add(d)
    }
  }
  // dispatch: ready のものを完了扱いにし、残りを cascade で blocked 確定する。
  let progressed = true
  while (progressed) {
    progressed = false
    for (const item of queue) {
      const n = item.number
      if (done.has(n) || failedSet.has(n)) continue
      if (classifyDispatchReadiness(depsMap.get(n), done, failedSet) === 'ready') {
        done.add(n)
        progressed = true
      }
    }
  }
  const blocked = []
  let cascaded = true
  while (cascaded) {
    cascaded = false
    for (const item of queue) {
      const n = item.number
      if (done.has(n) || failedSet.has(n)) continue
      if (classifyDispatchReadiness(depsMap.get(n), done, failedSet) === 'dep-blocked') {
        blocked.push({ issue: n, failedDeps: [...depsMap.get(n)].filter((d) => failedSet.has(d)) })
        failedSet.add(n)
        cascaded = true
      }
    }
  }
  return { done: [...done].sort((a, b) => a - b), blocked }
}

test('受入条件: ツリー外の前提 #5 が open なら #10 は着手せず、#10 に依存する #11 も待ちへ伝搬する', () => {
  const r = simulate({
    queue: [
      { number: 10, dependsOn: [5] },
      { number: 11, dependsOn: [10] },
      { number: 12, dependsOn: [] },
    ],
    outOfTreeWait: new Set([5]),
  })
  assert.deepEqual(r.done, [12])
  assert.deepEqual(r.blocked, [
    { issue: 10, failedDeps: [5] },
    { issue: 11, failedDeps: [10] },
  ])
})

test('受入条件: ツリー外の前提が closed（outOfTreeWait に無い）なら従来どおり制約なしで着手する', () => {
  const r = simulate({
    queue: [
      { number: 10, dependsOn: [5] },
      { number: 11, dependsOn: [10] },
    ],
    outOfTreeWait: new Set(),
  })
  assert.deepEqual(r.done, [10, 11])
  assert.deepEqual(r.blocked, [])
})

test('受入条件: 再実行時の再評価 — 1 回目 open で blocked、close 後の 2 回目は取得し直した state で着手する', () => {
  const queue = [{ number: 10, dependsOn: [5] }]
  const run = (state) => {
    const c = classifyOutOfTreeDeps([5], new Map([[5, state]]), new Set())
    return simulate({ queue, outOfTreeWait: new Set([...c.open, ...c.unknown]) })
  }
  assert.deepEqual(run('OPEN').blocked, [{ issue: 10, failedDeps: [5] }])
  assert.deepEqual(run('CLOSED').done, [10])
})

test('受入条件: state を取得できなかった前提は open 扱いで待つ（fail-closed）', () => {
  const c = classifyOutOfTreeDeps([5], new Map(), new Set())
  const r = simulate({ queue: [{ number: 10, dependsOn: [5] }], outOfTreeWait: new Set([...c.open, ...c.unknown]) })
  assert.deepEqual(r.blocked, [{ issue: 10, failedDeps: [5] }])
})

// ---------------------------------------------------------------------------
// 駆動部の配線（ソース走査）
// ---------------------------------------------------------------------------

// Tree フェーズの取得ブロック（`const outOfTreeDeps =` から `const byParent` まで）。
function treeFetchBlock() {
  const start = driverPart.indexOf('const outOfTreeDeps = {')
  const end = driverPart.indexOf('const byParent = new Map()')
  assert.ok(start >= 0 && end > start, 'Tree フェーズのツリー外前提取得ブロックが queue 構築（byParent）より前に見つからない')
  return driverPart.slice(start, end)
}

test('駆動部: ツリー外前提の state 取得は本文宣言の和集合（mergeDeclaredDeps）の後に毎ラン行う', () => {
  const block = treeFetchBlock()
  assert.ok(driverPart.indexOf('mergeDeclaredDeps(tree.nodes') < driverPart.indexOf('const outOfTreeDeps = {'))
  assert.match(block, /collectOutOfTreeDeps\(tree\.nodes,/)
  assert.match(block, /schema: OUT_OF_TREE_STATE_SCHEMA/)
  assert.match(block, /schema: ROOT_ANCESTORS_SCHEMA \}\), cur\)/, '祖先チェーンはラウンド起点 cur を渡して連鎖の起点を検証する')
  // 状態ファイルの保存値を使わない（close 後の再実行で必ず再評価される）。
  assert.doesNotMatch(block, /savedItems|loadState/)
})

test('駆動部: 祖先チェーン取得はラウンドループで ROOT_ANCESTOR_DEPTH 超の打ち切りを継ぎ足し、安全上限で蓄積分を破棄せず終端する', () => {
  const block = treeFetchBlock()
  // ラウンド数は ROOT_ANCESTOR_MAX_ROUNDS を上限にする（無限ループしない）。
  assert.match(block, /round <= ROOT_ANCESTOR_MAX_ROUNDS/)
  // agent() 例外時・チャンク null 時・循環検出時はいずれも mergeRootAncestorChunk が null を返し、acc を破棄する。
  assert.match(block, /const merged = mergeRootAncestorChunk\(acc, chunk, parent\)/)
  assert.match(block, /if \(merged === null\) \{\n\s+acc = null\n\s+break\n\s+\}/)
  // 真の終端（truncatedAt が null）に到達したらラウンドを終える。
  assert.match(block, /if \(chunk\.truncatedAt === null\) break/)
  // 安全上限到達時は打ち切り位置を明示した警告を出し、蓄積済みの acc をそのまま採用する（discard しない）。
  assert.match(block, /round === ROOT_ANCESTOR_MAX_ROUNDS/)
  const warnIdx = block.search(/round === ROOT_ANCESTOR_MAX_ROUNDS\) \{\n\s+log\(`⚠️[^`]*ROOT_ANCESTOR_MAX_ROUNDS[^`]*`\)/)
  assert.ok(warnIdx >= 0, '安全上限到達時のログに ROOT_ANCESTOR_MAX_ROUNDS を含む警告がある')
  assert.match(block, /cur = chunk\.truncatedAt/)
  assert.match(block, /ancestors = acc/)
})

test('駆動部: 取得の失敗・契約違反はチャンク単位で 1 回再試行し、throw でランを止めない（open 扱いへ倒す）', () => {
  const block = treeFetchBlock()
  assert.match(block, /attempt <= 2 && pending\.length > 0/)
  assert.doesNotMatch(block, /throw new Error/)
  assert.match(block, /classifyOutOfTreeDeps\(requested, states, ancestors\)/)
})

test('駆動部: open・取得不能のツリー外前提を failedSet と depsMap へ入れる（closed は従来どおり捨てる）', () => {
  assert.match(driverPart, /const outOfTreeWait = new Set\(\[\.\.\.outOfTreeDeps\.open, \.\.\.outOfTreeDeps\.unknown\]\)/)
  assert.match(driverPart, /for \(const d of outOfTreeWait\) failedSet\.add\(d\)/)
  assert.match(driverPart, /if \(!inTree\.has\(d\)\) \{\n\s+if \(item\.state === 'open' && outOfTreeWait\.has\(d\)\) depsMap\.get\(item\.number\)\.add\(d\)\n\s+continue\n\s+\}/)
})

test('駆動部: 前提完了プローブの対象からツリー外の番号を除外する（状態ファイル・results を汚さない）', () => {
  const calls = [...driverPart.matchAll(/selectPrereqProbeTargets\(work, depsMap, done, failedSet, running\)(.*)/g)]
  assert.equal(calls.length, 2)
  for (const m of calls) assert.equal(m[1], '.filter((d) => inTree.has(d))')
})

test('駆動部: markBlockedByDeps はツリー外前提待ちを recordFailure（status: blocked・outOfTreeDeps 付き）で記録する', () => {
  const start = driverPart.indexOf('async function markBlockedByDeps(')
  const body = driverPart.slice(start, driverPart.indexOf('\n}\n', start))
  assert.match(body, /const oot = allFailedDeps\.filter\(\(d\) => outOfTreeWait\.has\(d\)\)/)
  assert.match(body, /outOfTreeBlockNote\(oot\)/)
  assert.match(body, /recordFailure\(\{ issue: entry\.issue, reason: entry\.note, status: 'blocked', pr: entry\.pr, outOfTreeDeps: oot \}\)/)
  // 再開情報（PR 作成済み）の保持は既存どおり: active monitoring 分岐は updateState しない。
  const monitoringBranch = body.slice(body.indexOf('if (isActiveMonitoring(item.number))'), body.indexOf('return\n'))
  assert.doesNotMatch(monitoringBranch, /updateState/)
})

test('駆動部: recordFailure は outOfTreeDeps を results へ引き継ぎ、返却値に outOfTreeDeps を含める', () => {
  const start = source.indexOf('function recordFailure(failure)')
  const body = source.slice(start, source.indexOf('\n}\n', start))
  assert.match(body, /resultEntry\.outOfTreeDeps = failure\.outOfTreeDeps/)
  assert.match(driverPart, /failures, outOfTreeDeps, notStarted/)
})

// markBlockedByDeps・recordFailure の実体を切り出して実行し、ツリー外前提待ちの記録経路でも
// 再開情報（PR 番号・再実行の案内）が done（results）と failures の双方に残ることを振る舞いで固定する。
function runMarkBlockedByDeps({ item, allFailedDeps, outOfTree, monitoringPr }) {
  const extract = (src, head) => {
    const start = src.indexOf(head)
    assert.ok(start >= 0, `${head} が見つからない`)
    return src.slice(start, src.indexOf('\n}\n', start) + 2)
  }
  const recordFailureSrc = extract(source, 'function recordFailure(failure)')
  const markSrc = extract(driverPart, 'async function markBlockedByDeps(')
  const ctx = {
    failedSet: new Set(),
    outOfTreeWait: new Set(outOfTree),
    byParent: new Map(),
    phaseGateEdgeKeys: new Set(),
    outOfTreeBlockNote,
    results: [],
    failures: [],
    isActiveMonitoring: () => monitoringPr > 0,
    savedItems: { [String(item.number)]: { pr: monitoringPr } },
    stateUpdates: [],
    log: () => {},
    isValidBranchName: () => false,
    sanitizeWorktreePath: () => '',
  }
  ctx.updateState = async (n, patch) => { ctx.stateUpdates.push({ n, patch }) }
  const factory = new Function('ctx', [
    'const { failedSet, outOfTreeWait, byParent, phaseGateEdgeKeys, outOfTreeBlockNote, results, failures,',
    '  isActiveMonitoring, savedItems, updateState, log, isValidBranchName, sanitizeWorktreePath } = ctx',
    'let failureEpoch = 0',
    'let consecutiveFailures = 0',
    'let halted = null',
    recordFailureSrc,
    markSrc,
    'return markBlockedByDeps',
  ].join('\n'))
  return factory(ctx)(item, allFailedDeps).then(() => ctx)
}

test('振る舞い: 再開情報が有効なイシューのツリー外前提待ちは done・failures の双方に PR 番号と再開案内を残し、状態を上書きしない', async () => {
  const ctx = await runMarkBlockedByDeps({ item: { number: 10 }, allFailedDeps: [5], outOfTree: [5], monitoringPr: 42 })
  assert.equal(ctx.results.length, 1)
  assert.equal(ctx.failures.length, 1)
  const [done] = ctx.results
  const [failure] = ctx.failures
  assert.equal(done.issue, 10)
  assert.equal(done.status, 'blocked')
  assert.equal(done.pr, 42)
  assert.deepEqual(done.outOfTreeDeps, [5])
  assert.match(done.note, /ツリー外の前提イシュー #5 が open のため未着手/)
  assert.match(done.note, /中断時に PR #42 作成済み。同じ引数で再実行すると monitor から再開する/)
  assert.equal(failure.issue, 10)
  assert.equal(failure.status, 'blocked')
  assert.equal(failure.pr, 42)
  assert.equal(failure.reason, done.note)
  assert.deepEqual(ctx.stateUpdates, [])
  assert.ok(ctx.failedSet.has(10))
})

test('振る舞い: 再開情報が無いイシューのツリー外前提待ちは pr: 0 で状態をクリアし、done・failures の双方に記録する', async () => {
  const ctx = await runMarkBlockedByDeps({ item: { number: 11 }, allFailedDeps: [5], outOfTree: [5], monitoringPr: 0 })
  assert.equal(ctx.results.length, 1)
  assert.equal(ctx.failures.length, 1)
  assert.equal(ctx.results[0].status, 'blocked')
  assert.equal(ctx.results[0].pr, undefined)
  assert.equal(ctx.failures[0].reason, ctx.results[0].note)
  assert.deepEqual(ctx.stateUpdates, [
    { n: 11, patch: { status: 'blocked', note: 'ツリー外の前提イシュー #5 が open のため未着手（close 後に再実行すると着手する）', pr: 0 } },
  ])
})

test('振る舞い: ツリー内の前提失敗のみなら従来どおり results のみに記録し failures へは載せない', async () => {
  const ctx = await runMarkBlockedByDeps({ item: { number: 12 }, allFailedDeps: [7], outOfTree: [], monitoringPr: 42 })
  assert.equal(ctx.failures.length, 0)
  assert.deepEqual(ctx.results, [{
    issue: 12,
    status: 'blocked',
    pr: 42,
    note: '前提イシューの失敗・ブロックにより未着手: #7（中断時に PR #42 作成済み。同じ引数で再実行すると monitor から再開する）',
  }])
  assert.deepEqual(ctx.stateUpdates, [])
})
