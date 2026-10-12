// 本文の依存宣言の機械抽出（DECLARED_DEPS_JQ・collectDeclaredDeps・mergeDeclaredDeps）の
// 決定的回帰テスト。optin-tests-gate.test.mjs と同じスライス方式（DRIVER マーカーより上を切り出し
// export を付与して import する）で、モデル出力に依存しない純粋関数と jq フィルタ自体を検証する。
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
const DRIVER_MARKER = '__IMPLEMENT_ISSUE_TREE_DRIVER_START__'

const source = readFileSync(SCRIPT_PATH, 'utf8')
const markerIndex = source.indexOf(DRIVER_MARKER)
if (markerIndex < 0) {
  throw new Error(`テスト境界マーカー ${DRIVER_MARKER} が実装スクリプトに存在しない`)
}
const definitionPart = source.slice(0, source.lastIndexOf('\n', markerIndex))
const driverPart = source.slice(markerIndex)
const sliceDir = mkdtempSync(join(tmpdir(), 'implement-issue-tree-declared-deps-'))
const slicePath = join(sliceDir, 'implement-issue-tree-declared-deps-defs.mjs')
const SLICE_EXPORTS = [
  'DECLARED_DEPS_JQ',
  'DECLARED_DEPS_MAX_PER_NODE',
  'DECLARED_DEPS_SIG_JQ',
  'declaredDepsChecksum',
  'declaredDepsPrompt',
  'collectDeclaredDeps',
  'mergeDeclaredDeps',
  'DECLARED_DEPS_CONCURRENCY',
  'RATE_LIMIT_MAX_WAIT_S',
  'RATE_LIMIT_MAX_WAITS',
  'DECLARED_DEPS_SCHEMA',
  'mapBounded',
  'parseRateLimit',
  'extractDeclaredDeps',
]
// 修正前の実装には新規宣言が無い。RED 確認時に import 自体は成功させ、各テストの失敗で示すため typeof で包む。
const optionalExports = SLICE_EXPORTS.map((n) => `const __opt_${n} = typeof ${n} === 'undefined' ? undefined : ${n}`).join('\n')
const exportList = SLICE_EXPORTS.map((n) => `__opt_${n} as ${n}`).join(', ')
writeFileSync(slicePath, `${definitionPart}\n${optionalExports}\nexport { ${exportList} }\n`)

const {
  DECLARED_DEPS_JQ,
  DECLARED_DEPS_MAX_PER_NODE,
  DECLARED_DEPS_SIG_JQ,
  declaredDepsChecksum,
  declaredDepsPrompt,
  collectDeclaredDeps,
  mergeDeclaredDeps,
  DECLARED_DEPS_CONCURRENCY,
  RATE_LIMIT_MAX_WAIT_S,
  RATE_LIMIT_MAX_WAITS,
  DECLARED_DEPS_SCHEMA,
  mapBounded,
  parseRateLimit,
  extractDeclaredDeps,
} = await import(pathToFileURL(slicePath).href)

// プロンプトに埋め込むのと同じ形（{number, deps}）で jq を実行する。
function runFilter(body) {
  const out = execFileSync(
    'jq',
    ['-c', `{number: .number, deps: (${DECLARED_DEPS_JQ})}`],
    { input: JSON.stringify({ number: 1, body }) },
  )
  return JSON.parse(out.toString()).deps
}

test('依存見出し節の #N を抽出し、`## 依存クレート` 等の別見出しは拾わない', () => {
  const body = [
    '## 概要', '#1 とは無関係の説明', '',
    '## 依存', '', '先行完了が必要な issue:', '', '- #78（TASK-12）', '- #85（TASK-13）', '',
    '## 依存クレート', '', '承認 issue #999 に従う',
  ].join('\n')
  assert.deepEqual(runFilter(body), [78, 85])
})

test('英語見出し・見出しレベル違い・CRLF・末尾コロンを受理する', () => {
  assert.deepEqual(runFilter('### Depends on:\r\n- #3\r\n- #2\r\n## Next\r\n- #9\r\n'), [2, 3])
  assert.deepEqual(runFilter('## Blocked by\n#7, #5\n'), [5, 7])
})

test('GitHub 流のインライン記法（Depends on #N / Blocked by #N）を節外でも抽出する', () => {
  assert.deepEqual(runFilter('本文\nDepends on #12\nblocked by: #4\nsee #100\n'), [4, 12])
})

test('インライン記法の複数番号（カンマ・読点・and 区切り）をすべて抽出する', () => {
  assert.deepEqual(runFilter('Depends on #12, #13 and #14\nBlocked by #20、#21\n'), [12, 13, 14, 20, 21])
})

test('#0 は抽出しない（assertInt で決定的に停止させないため）', () => {
  assert.deepEqual(runFilter('## 依存\n- #0\n- #5\nDepends on #0\n'), [5])
})

test('依存節内でも行頭以外の参照・関連/参考/否定の行は依存辺にしない', () => {
  assert.deepEqual(runFilter('## 依存\n\n依存なし。関連 issue #42\n'), [])
  assert.deepEqual(
    runFilter('## 依存\n- 関連: #42\n- #42（関連のみ）\n- #7（TASK-1）\n- [ ] #8\n1. #9, #10\n参考 #11\n* #12 optional\n'),
    [7, 8, 9, 10],
  )
})

test('インライン記法の否定（not / no longer）は除外し、none を含む別単語は除外しない', () => {
  assert.deepEqual(
    runFilter('Not blocked by #3\nno longer depends on #4\nnonetheless depends on #5\n'),
    [5],
  )
})

test('番号の並びは空白・カンマ・and（Oxford comma 含む）・スラッシュ区切りをすべて拾う', () => {
  assert.deepEqual(runFilter('## 依存\n- #1, #2, and #3\n- #4 #5\n- #6/#7\n'), [1, 2, 3, 4, 5, 6, 7])
})

test('コードフェンス内・引用行・インラインコードの例示は依存辺にしない', () => {
  const body = [
    '例:', '```', 'Depends on #90', '## 依存', '- #91', '```',
    '> Depends on #92', '`Depends on #93` は例', 'Depends on #94',
  ].join('\n')
  assert.deepEqual(runFilter(body), [94])
})

test('インデントされた行はコードとみなさず抽出する（入れ子の箇条書き・リスト継続行・段落継続行）', () => {
  // リスト内容インデントは行単位で判定できないため、取りこぼし（halt の原因）より有界な過剰待機を選ぶ。
  assert.deepEqual(runFilter('## 依存\n- #1\n    - #2（入れ子）\n\t- #3\n'), [1, 2, 3])
  const body = ['- 項目', '    Depends on #50（リスト継続）', '段落', '    Blocked by #51（段落継続）', '', 'Depends on #54'].join('\n')
  assert.deepEqual(runFilter(body), [50, 51, 54])
})

test('依存節の行頭項目の否定（not required / 依存不要 / never）は依存辺にしない', () => {
  assert.deepEqual(runFilter('## 依存\n- #42 (not required)\n- #43（依存不要）\n- #44\n- #45 never\n'), [44])
  assert.deepEqual(runFilter('## Blocked by\n- #60\n'), [60])
})

test('異なる種類・短いフェンスではコードブロックを閉じない', () => {
  const body = [
    '```', '~~~', 'Depends on #30', '```', 'Depends on #31',
    '````md', '```', 'Depends on #32', '````',
  ].join('\n')
  assert.deepEqual(runFilter(body), [31])
})

test('否定語の直後（挟まる語は 1 語以内）の宣言は否定として消費し、肯定の宣言だけを抽出する', () => {
  const body = [
    'Not yet blocked by #6', 'This is not needed; depends on #7', 'blocked by #8 but not blocked by #9',
    "isn't blocked by #10", 'never depends on #11. Depends on #12', 'is not currently blocked by #13',
  ].join('\n')
  assert.deepEqual(runFilter(body), [7, 8, 12])
})

test('無関係な否定語・短縮形で同じ行の本物の依存宣言を落とさない', () => {
  const body = ["We can't start yet, depends on #5", "Don't forget this depends on #4", 'Not sure, but blocked by #3'].join('\n')
  assert.deepEqual(runFilter(body), [3, 4, 5])
})

test('否定・関連の判定はインライン宣言ごとに行い、同じ行の別宣言を落とさない', () => {
  assert.deepEqual(
    runFilter('Depends on #12; related: #34\nrelated work, blocked by #35 but not blocked by #36\n'),
    [12, 35],
  )
})

test('複数バッククォートのインラインコードは内容ごと除外し、閉じないバッククォートは文字として扱う', () => {
  assert.deepEqual(runFilter('日本語 ``Depends on #42`` と ``a ` Depends on #43`` 後 Depends on #44\n'), [44])
  assert.deepEqual(runFilter('`` 閉じない Depends on #45\n'), [45])
})

test('改行をまたぐインラインコードは段落内で除去し、ブロック境界はまたがない', () => {
  assert.deepEqual(runFilter('説明 `コード例\nDepends on #70\n続き` 本文\nDepends on #71\n'), [71])
  assert.deepEqual(runFilter('段落 `開き\n\nDepends on #72\n'), [72])
  assert.deepEqual(runFilter('~~~\na`b\n~~~\n## 依存\n- #5\n`c`\n'), [5])
  assert.deepEqual(runFilter('## 依存\n- #1 `a\n- #2 b` 項目\n'), [1, 2])
  assert.deepEqual(runFilter('## 依存\n- #3\n  続き `x\n  Depends on #4\n  y` 終わり\n- #5\n'), [3, 5])
  // 除去後も行構造を保ち、閉じ側の行の語（関連 / not）を宣言の行の否定判定へ混ぜない。
  assert.deepEqual(runFilter('## 依存\n- #5 `code\nfoo` 関連の説明\n- #6\n'), [5, 6])
  assert.deepEqual(runFilter('`x\ny` not needed. Depends on #7\n'), [7])
})

test('見出し行のインライン記法も抽出する（見出し自体は依存節にならない）', () => {
  assert.deepEqual(runFilter('## Depends on #20, #21\n## 依存\n- #22\n## 依存クレート\n- #99\n'), [20, 21, 22])
})

test('依存宣言がなければ空配列・body が null でも失敗しない', () => {
  assert.deepEqual(runFilter('## 概要\n#5 を参照\n'), [])
  assert.deepEqual(runFilter(null), [])
})

test('declaredDepsPrompt は整数の対象番号と jq フィルタを単一引用符で埋め込む', () => {
  const p = declaredDepsPrompt([34, 45])
  assert.match(p, /for n in 34 45; do out=\$\(gh api "repos\/\{owner\}\/\{repo\}\/issues\/\$n" --jq '/)
  assert.match(p, /\) && printf '%s\\n' "\$out" \|\| echo "FAILED #\$n" >&2; done/)
  assert.ok(p.includes(DECLARED_DEPS_JQ))
  assert.ok(!DECLARED_DEPS_JQ.includes("'"), 'jq フィルタに単一引用符を含めない（シェル埋め込みが壊れる）')
})

// Issue #589: 本文の取得は REST（core 枠）で行い、GraphQL 枠をイシュー 1 件ごとに消費しない。
test('declaredDepsPrompt は gh issue view（GraphQL）を使わず gh api（REST）を指示する (#589)', () => {
  const p = declaredDepsPrompt([1])
  assert.ok(!p.includes('gh issue view'), 'GraphQL を使う gh issue view を指示しない')
  assert.ok(!p.includes('gh repo view'), 'リポジトリ解決で GraphQL を使わない（{owner}/{repo} は gh がローカルで展開する）')
  assert.match(p, /gh api "repos\/\{owner\}\/\{repo\}\/issues\/\$n"/)
})

test('declaredDepsPrompt は gh を sandbox 無効で実行する指示を含む', () => {
  assert.match(declaredDepsPrompt([1]), /sandbox 無効/)
})

// コマンド出力と同じ sig 付きの entry を作る。
const e = (number, deps) => ({ number, deps, sig: declaredDepsChecksum(number, deps) })

test('jq が出力する sig はホストの declaredDepsChecksum と一致する', () => {
  const samples = [
    [34, '## 依存\n- #21\n'],
    [91, '## 依存\n- #78\n- #85\n'],
    [21, '本文のみ\n'],
    [999999, 'Depends on #99997, #99998, #99999\n'],
  ]
  for (const [number, body] of samples) {
    const out = JSON.parse(execFileSync(
      'jq',
      ['-c', `{number: .number, deps: (${DECLARED_DEPS_JQ})} | ${DECLARED_DEPS_SIG_JQ}`],
      { input: JSON.stringify({ number, body }) },
    ).toString())
    assert.equal(out.sig, declaredDepsChecksum(number, out.deps))
  }
})

test('collectDeclaredDeps: sig の欠落・不一致（deps の脱落・書き換え・並べ替え）は throw する', () => {
  assert.throws(() => collectDeclaredDeps([1], { entries: [{ number: 1, deps: [] }] }), /sig/)
  const ok = e(1, [42, 43])
  assert.throws(() => collectDeclaredDeps([1], { entries: [{ ...ok, deps: [] }] }), /sig/)
  assert.throws(() => collectDeclaredDeps([1], { entries: [{ ...ok, deps: [43, 42] }] }), /sig/)
  assert.throws(() => collectDeclaredDeps([1], { entries: [{ ...ok, deps: [42, 44] }] }), /sig/)
})

test('collectDeclaredDeps: 全件返却なら missing は空・欠落は missing に出る', () => {
  const r = collectDeclaredDeps([1, 2, 3], { entries: [e(1, [5]), e(3, [])] })
  assert.deepEqual([...r.byNumber.get(1)], [5])
  assert.deepEqual([...r.byNumber.get(3)], [])
  assert.deepEqual(r.missing, [2])
  assert.deepEqual(collectDeclaredDeps([1], null).missing, [1])
})

test('collectDeclaredDeps: 非整数・deps 非配列・重複・上限超過は throw する', () => {
  assert.throws(() => collectDeclaredDeps([1], { entries: [{ number: 1, deps: ['3'], sig: 0 }] }), /正の整数/)
  assert.throws(() => collectDeclaredDeps([1], { entries: [{ number: 1, sig: 0 }] }), /配列ではない/)
  assert.throws(() => collectDeclaredDeps([1], { entries: [e(1, [42]), e(1, [])] }), /重複/)
  assert.throws(() => collectDeclaredDeps([1], { entries: [{ number: 1, deps: '3', sig: 0 }] }), /配列ではない/)
  const many = Array.from({ length: DECLARED_DEPS_MAX_PER_NODE + 1 }, (_, i) => i + 1)
  assert.throws(() => collectDeclaredDeps([1], { entries: [e(1, many)] }), /上限/)
})

test('mergeDeclaredDeps: 既存 dependsOn と和集合を取り、自己参照は除く', () => {
  const nodes = [
    { number: 34, dependsOn: [] },
    { number: 91, dependsOn: [78] },
    { number: 21, dependsOn: [] },
  ]
  const added = mergeDeclaredDeps(nodes, new Map([
    [34, new Set([21])],
    [91, new Set([78, 85, 91])],
  ]))
  assert.deepEqual(nodes.map((n) => n.dependsOn), [[21], [78, 85], []])
  assert.deepEqual(added, [{ from: 34, to: 21 }, { from: 91, to: 85 }])
})

test('駆動部は Tree 検証後・byParent 構築前に抽出結果を取り込み、欠落時は停止する', () => {
  const mergeIdx = driverPart.indexOf('mergeDeclaredDeps(tree.nodes, declaredByNumber)')
  const byParentIdx = driverPart.indexOf('const byParent = new Map()')
  assert.ok(mergeIdx > 0 && byParentIdx > mergeIdx, 'depsMap の元になる byParent 構築より前に取り込むこと')
  assert.ok(driverPart.includes('await extractDeclaredDeps(chunks)'), '駆動部は有界並列の抽出関数を呼ぶ')
  assert.ok(!driverPart.includes('Promise.all(chunks.map(runChunk))'), '全チャンクを無制限に同時起動しない')
  assert.ok(definitionPart.includes('本文の依存宣言を抽出できなかったイシューがある'), '欠落時の fail-closed 停止')
})

// Issue #558: Workflow ハーネスが中継するユーザー発言に複数のイシュー番号があると、抽出エージェントが
// 依頼外番号まで返す。依頼外エントリは採用せず無視し、ラン開始前停止を起こさない。
test('collectDeclaredDeps: 依頼外エントリは throw せず無視して ignored に記録する (#558)', () => {
  const r = collectDeclaredDeps([545], { entries: [e(545, [1]), e(546, [2])] })
  assert.deepEqual([...r.byNumber.keys()], [545])
  assert.deepEqual(r.missing, [])
  assert.deepEqual(r.ignored, [546])
})

test('collectDeclaredDeps: 依頼外エントリだけの返却は missing に依頼番号が残る（全件照合の fail-closed 維持）', () => {
  const r = collectDeclaredDeps([545], { entries: [e(546, [])] })
  assert.equal(r.byNumber.size, 0)
  assert.deepEqual(r.missing, [545])
  assert.deepEqual(r.ignored, [546])
})

test('collectDeclaredDeps: 依頼外エントリは検査対象外・依頼番号側の違反は従来どおり throw する', () => {
  const many = Array.from({ length: DECLARED_DEPS_MAX_PER_NODE + 1 }, (_, i) => i + 1)
  assert.doesNotThrow(() => collectDeclaredDeps([1], { entries: [e(1, []), e(2, many), e(2, []), { number: 3, deps: 'x', sig: 0 }] }))
  assert.throws(() => collectDeclaredDeps([1], { entries: [e(2, []), { number: 1, deps: [2], sig: 0 }] }), /sig/)
  assert.throws(() => collectDeclaredDeps([1], { entries: [e(2, []), { number: 'x', deps: [], sig: 0 }] }), /正の整数/)
})

test('collectDeclaredDeps: 依頼外エントリの number を依頼番号へ書き換えても sig 不一致で throw する（化けない）', () => {
  assert.throws(() => collectDeclaredDeps([545], { entries: [{ number: 545, deps: [], sig: declaredDepsChecksum(546, []) }] }), /sig/)
})

test('declaredDepsPrompt: 担当範囲（for n in の番号のみ）を明記する (#558)', () => {
  assert.match(declaredDepsPrompt([1]), /担当は.*番号だけ/)
})

test('抽出関数は ignored を警告ログに出す (#558)', () => {
  assert.match(definitionPart, /collectDeclaredDeps\(pending, result\)/)
  assert.ok(/ignored\.length > 0/.test(definitionPart), 'runChunk が ignored をログに出すこと')
})

// ---------------------------------------------------------------------------
// Issue #589: 有界並列・レート制限の復帰待ち・fail-closed の維持
// ---------------------------------------------------------------------------

const logs = []
globalThis.log = (m) => { logs.push(m) }
const requestedOf = (prompt) => /for n in ([0-9 ]+); do/.exec(prompt)[1].trim().split(' ').map(Number)
const okEntries = (prompt) => ({ entries: requestedOf(prompt).map((n) => e(n, [])) })
const chunksOf = (total, size = 3) => Array.from({ length: Math.ceil(total / size) }, (_, i) =>
  Array.from({ length: Math.min(size, total - i * size) }, (_, j) => i * size + j + 1))
const NO_SLEEP = async () => { throw new Error('待機してはならない') }

test('mapBounded: 同時実行数は limit を超えず、結果は入力順を保つ', async () => {
  let active = 0
  let maxActive = 0
  const out = await mapBounded([5, 1, 4, 2, 3, 6, 7], 3, async (x, i) => {
    active++
    maxActive = Math.max(maxActive, active)
    await new Promise((r) => setTimeout(r, x))
    active--
    return `${i}:${x}`
  })
  assert.equal(maxActive, 3)
  assert.deepEqual(out, ['0:5', '1:1', '2:4', '3:2', '4:3', '5:6', '6:7'])
})

test('mapBounded: reject したら新規の起動を止め、最初の reject を伝播する', async () => {
  const started = []
  await assert.rejects(
    mapBounded([1, 2, 3, 4, 5, 6], 2, async (x) => {
      started.push(x)
      await new Promise((r) => setTimeout(r, 1))
      if (x === 2) throw new Error('boom')
    }),
    /boom/,
  )
  assert.ok(started.length < 6, `失敗後に残りを起動しない（起動 ${started.length} 件）`)
})

test('extractDeclaredDeps: 同時に起動するチャンクは DECLARED_DEPS_CONCURRENCY を超えない (#589)', async () => {
  assert.equal(DECLARED_DEPS_CONCURRENCY, 3)
  let active = 0
  let maxActive = 0
  let total = 0
  globalThis.agent = async (prompt) => {
    active++
    total++
    maxActive = Math.max(maxActive, active)
    await new Promise((r) => setTimeout(r, 3))
    active--
    return okEntries(prompt)
  }
  const m = await extractDeclaredDeps(chunksOf(42), NO_SLEEP) // 14 チャンク（実測の再現規模）
  assert.equal(total, 14)
  assert.ok(maxActive <= DECLARED_DEPS_CONCURRENCY, `最大同時起動 ${maxActive}`)
  assert.equal(maxActive, DECLARED_DEPS_CONCURRENCY, '上限まで並列に使う')
  assert.deepEqual([...m.keys()].sort((a, b) => a - b), Array.from({ length: 42 }, (_, i) => i + 1))
})

test('スキーマ: レート制限の申告フィールドは任意（required は entries のみ）', () => {
  assert.deepEqual(DECLARED_DEPS_SCHEMA.required, ['entries'])
  for (const k of ['rateLimited', 'resetAt', 'waitSeconds']) assert.ok(DECLARED_DEPS_SCHEMA.properties[k], k)
})

test('parseRateLimit: 申告を検証し、不正な waitSeconds・resetAt は採用しない', () => {
  assert.equal(parseRateLimit({ entries: [] }), null)
  assert.equal(parseRateLimit({ rateLimited: 'true' }), null)
  assert.deepEqual(parseRateLimit({ rateLimited: true, waitSeconds: 119.2, resetAt: '2026-10-12T08:26:17Z' }), { waitSeconds: 120, resetAt: '2026-10-12T08:26:17Z' })
  assert.deepEqual(parseRateLimit({ rateLimited: true, waitSeconds: -1, resetAt: 'あした' }), { waitSeconds: null, resetAt: '' })
  assert.deepEqual(parseRateLimit({ rateLimited: true, waitSeconds: Infinity }), { waitSeconds: null, resetAt: '' })
})

test('extractDeclaredDeps: レート制限を返したチャンクは復帰時刻まで待ってから残りだけ再試行する (#589)', async () => {
  const prompts = []
  globalThis.agent = async (prompt, opts) => {
    prompts.push({ prompt, label: opts.label })
    if (prompts.length === 1) {
      // 1 件だけ取得できた後にレート制限へ到達した
      return { entries: [e(1, [9])], rateLimited: true, waitSeconds: 120, resetAt: '2026-10-12T08:26:17Z' }
    }
    return okEntries(prompt)
  }
  const waits = []
  const m = await extractDeclaredDeps([[1, 2, 3]], async (ms) => { waits.push(ms) })
  assert.deepEqual(waits, [125_000], '申告された復帰までの秒数（+ 余裕 5 秒）を待つ')
  assert.deepEqual(requestedOf(prompts[1].prompt), [2, 3], '取得済みの #1 は再依頼しない')
  assert.equal(prompts[1].label, 'plan:declared-deps-1-retry')
  assert.deepEqual([...m.get(1)], [9], '待機前に取得できた分は採用する')
  assert.deepEqual([...m.keys()].sort(), [1, 2, 3])
  assert.ok(logs.some((l) => l.includes('レート制限') && l.includes('2026-10-12T08:26:17Z')))
})

test('extractDeclaredDeps: レート制限による待機は通常の再試行回数（2 回）を消費しない', async () => {
  let n = 0
  globalThis.agent = async (prompt) => {
    n++
    if (n === 1) return { entries: [], rateLimited: true, waitSeconds: 10 }
    if (n === 2) return { entries: [] } // 通常の欠落（1 回目の attempt）
    return okEntries(prompt)
  }
  const m = await extractDeclaredDeps([[1]], async () => {})
  assert.equal(n, 3)
  assert.deepEqual([...m.keys()], [1])
})

test('extractDeclaredDeps: 復帰が待ち上限を超えるときは待たず、一過性と再開可能時刻を例外文に含めて停止する (#589)', async () => {
  globalThis.agent = async () => ({ entries: [], rateLimited: true, waitSeconds: RATE_LIMIT_MAX_WAIT_S + 1, resetAt: '2026-10-12T09:30:00Z' })
  await assert.rejects(
    extractDeclaredDeps([[7, 8]], NO_SLEEP),
    (err) => /一過性/.test(err.message) && err.message.includes('2026-10-12T09:30:00Z') && /#7, #8/.test(err.message),
  )
})

test('extractDeclaredDeps: 待ち上限ちょうどの復帰は待つ', async () => {
  let n = 0
  globalThis.agent = async (prompt) => (++n === 1 ? { entries: [], rateLimited: true, waitSeconds: RATE_LIMIT_MAX_WAIT_S } : okEntries(prompt))
  const waits = []
  await extractDeclaredDeps([[1]], async (ms) => { waits.push(ms) })
  assert.deepEqual(waits, [(RATE_LIMIT_MAX_WAIT_S + 5) * 1000])
})

test('extractDeclaredDeps: 復帰待ちは 1 チャンク RATE_LIMIT_MAX_WAITS 回までで、尽きたら再開可能時刻つきで停止する', async () => {
  let calls = 0
  globalThis.agent = async () => { calls++; return { entries: [], rateLimited: true, waitSeconds: 30, resetAt: '2026-10-12T08:00:00Z' } }
  const waits = []
  await assert.rejects(
    extractDeclaredDeps([[1]], async (ms) => { waits.push(ms) }),
    (err) => /一過性/.test(err.message) && err.message.includes('2026-10-12T08:00:00Z'),
  )
  assert.equal(waits.length, RATE_LIMIT_MAX_WAITS)
  assert.equal(calls, RATE_LIMIT_MAX_WAITS + 1, '無限に待たされない')
})

test('extractDeclaredDeps: 待機手段が無い環境（sleep なし）では待たずに再開可能時刻つきで停止する', async () => {
  globalThis.agent = async () => ({ entries: [], rateLimited: true, waitSeconds: 30, resetAt: '2026-10-12T08:00:00Z' })
  await assert.rejects(extractDeclaredDeps([[1]], null), /一過性.*2026-10-12T08:00:00Z/s)
})

test('extractDeclaredDeps: 復帰を申告しない抽出失敗は従来どおり待たず、残りがあれば着手せず停止する (#589)', async () => {
  let calls = 0
  globalThis.agent = async (prompt) => {
    calls++
    return { entries: requestedOf(prompt).filter((n) => n !== 2).map((n) => e(n, [])) } // #2 だけ常に欠落
  }
  await assert.rejects(extractDeclaredDeps([[1, 2, 3]], NO_SLEEP), /本文の依存宣言を抽出できなかったイシューがある（#2）/)
  assert.equal(calls, 2, '初回 + 再試行 1 回')
})

test('extractDeclaredDeps: sig 不一致（契約違反）は部分採用せず破棄し、再試行でも直らなければ停止する', async () => {
  let calls = 0
  globalThis.agent = async () => { calls++; return { entries: [{ number: 1, deps: [5], sig: 0 }] } }
  await assert.rejects(extractDeclaredDeps([[1]], NO_SLEEP), /抽出できなかった/)
  assert.equal(calls, 2)
  assert.ok(logs.some((l) => l.includes('契約に違反するため破棄した')))
})

test('extractDeclaredDeps: レート制限の申告があっても全件返却されていれば待たない', async () => {
  globalThis.agent = async (prompt) => ({ ...okEntries(prompt), rateLimited: true, waitSeconds: 600 })
  const m = await extractDeclaredDeps([[1, 2]], NO_SLEEP)
  assert.deepEqual([...m.keys()], [1, 2])
})

// Bugbot B（fandhe-edge-model#537・ideas#447）: HTTP 403 を無条件にレート制限とみなさない。
test('declaredDepsPrompt: レート制限と判定するのはメッセージに rate limit 系の語がある、または core の remaining が 0 のときに限る (Bugbot B)', () => {
  const p = declaredDepsPrompt([1])
  assert.match(p, /rate limit・secondary rate limit・RATE_LIMITED/, 'メッセージ側の判定語')
  assert.match(p, /remaining/, 'core の残量（remaining）で判定する')
  assert.match(p, /gh api rate_limit --jq '\.resources\.core \| \{remaining,/, 'remaining を取得するコマンド')
  assert.match(p, /remaining が 0 のときだけ rateLimited を true/, '条件を限定する')
  assert.match(p, /権限・SSO など他の 403 は rateLimited にしない/, '権限系の 403 は対象外と明記')
  assert.match(p, /通常の失敗として扱う/)
  // 旧文言（403 があれば無条件に rateLimited）が残っていない
  assert.doesNotMatch(p, /HTTP 403・429・rate limit が出たら/)
  assert.doesNotMatch(DECLARED_DEPS_SCHEMA.properties.rateLimited.description, /HTTP 403・429・rate limit）が出たら true/)
})

test('declaredDepsPrompt: secondary rate limit は core の reset と無関係なので retry-after を待ち時間にし、無ければ省略させる (Bugbot B)', () => {
  const p = declaredDepsPrompt([1])
  assert.match(p, /secondary rate limit なら resetAt は省略して waitSeconds に retry-after の秒数を入れる（無ければ省略）/)
  assert.match(DECLARED_DEPS_SCHEMA.properties.waitSeconds.description, /secondary rate limit なら retry-after/)
})

test('extractDeclaredDeps: 権限系の 403（rateLimited を立てない返却）は待たず通常の失敗として再試行し、一過性と案内せず停止する (Bugbot B)', async () => {
  let calls = 0
  // 403 を受けたエージェントが rate_limit の remaining > 0 を確認し、rateLimited を立てずに失敗を返した状況
  globalThis.agent = async () => { calls++; return { entries: [], rateLimited: false } }
  const waits = []
  await assert.rejects(
    extractDeclaredDeps([[7]], async (ms) => { waits.push(ms) }),
    (err) => /本文の依存宣言を抽出できなかったイシューがある（#7）/.test(err.message) && !/一過性のため停止/.test(err.message) && !/レート制限により/.test(err.message),
  )
  assert.deepEqual(waits, [], 'core の reset まで待たない')
  assert.equal(calls, 2, '既存の再試行（初回 + 1 回）に回る')
})

test('extractDeclaredDeps: secondary rate limit は retry-after があればそれ、無ければ固定の短い待機（60 秒 + 余裕）で待つ (Bugbot B)', async () => {
  const run = async (limited) => {
    let n = 0
    globalThis.agent = async (prompt) => (++n === 1 ? { entries: [], rateLimited: true, ...limited } : okEntries(prompt))
    const waits = []
    await extractDeclaredDeps([[1]], async (ms) => { waits.push(ms) })
    return waits
  }
  assert.deepEqual(await run({ waitSeconds: 45 }), [50_000], 'retry-after 45 秒 + 余裕 5 秒')
  assert.deepEqual(await run({}), [65_000], 'retry-after も resetAt も無ければ固定の 60 秒 + 余裕 5 秒（core の reset を待たない）')
})

// Bugbot C（fandhe-edge-model#537）: 全体が reject した後に、レート制限待機中のチャンクが agent() を呼ばない。
test('mapBounded: reject 時に共有の中止フラグを立てる', async () => {
  const signal = { aborted: false }
  await assert.rejects(mapBounded([1, 2], 2, async (x) => { if (x === 2) throw new Error('boom') }, signal), /boom/)
  assert.equal(signal.aborted, true)
})

test('extractDeclaredDeps: 他チャンクが失敗して reject した後、レート制限の待機から目覚めたチャンクは agent() を呼ばない (Bugbot C)', async () => {
  const labels = []
  let release
  const gate = new Promise((r) => { release = r })
  globalThis.agent = async (prompt, opts) => {
    labels.push(opts.label)
    const asked = requestedOf(prompt)
    if (asked.includes(1)) return { entries: [], rateLimited: true, waitSeconds: 30 } // チャンク 1: レート制限で待機に入る
    return { entries: [] } // チャンク 2: 常に欠落 → 2 回で失敗して全体が reject
  }
  await assert.rejects(extractDeclaredDeps([[1], [2]], () => gate), /本文の依存宣言を抽出できなかったイシューがある（#2）/)
  const before = labels.length
  release() // 待機から目覚める
  await new Promise((r) => setTimeout(r, 10))
  assert.equal(labels.length, before, `失敗後に agent() が増えていない: ${labels.join(', ')}`)
  assert.ok(!labels.includes('plan:declared-deps-1-retry'), '待機明けの再試行を起動しない')
})

test('extractDeclaredDeps: 他チャンクが失敗した後、実行中だったチャンクの返却が不完全でも再試行の agent() を呼ばない (Bugbot C)', async () => {
  const labels = []
  let release
  const gate = new Promise((r) => { release = r })
  globalThis.agent = async (prompt, opts) => {
    labels.push(opts.label)
    if (requestedOf(prompt).includes(1)) {
      await gate // 実行中のまま他チャンクの失敗を待つ
      return { entries: [] } // 欠落 → 通常なら再試行する
    }
    return { entries: [] }
  }
  await assert.rejects(extractDeclaredDeps([[1], [2]], NO_SLEEP), /抽出できなかった/)
  release()
  await new Promise((r) => setTimeout(r, 10))
  assert.deepEqual(labels.filter((l) => l.startsWith('plan:declared-deps-1')), ['plan:declared-deps-1'], 'チャンク 1 の再試行は起動しない')
})
