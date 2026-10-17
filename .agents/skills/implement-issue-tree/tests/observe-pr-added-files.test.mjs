// observe-pr.sh --mode added-files（同じランの先行 PR・base との新規追加ファイルの衝突の観測。Issue #658）を、偽 gh
// （tests/lib/gh-observe-stub.mjs）を PATH の先頭に置いて実際に実行する回帰テスト。判定の表は tests/added-files-unit.test.mjs。
//
// 検証する契約:
//   - GraphQL は 2 回まで（自分と peers の files をエイリアスで 1 回、連番ファイルのディレクトリの base の木を 1 回）。連番ファイルが
//     無ければ 2 回目を呼ばない
//   - パスはクエリの文字列へ入れず GraphQL 変数（-f e<i>=<base>:<dir>）で渡す
//   - payload はパスの文字列を含まず、件数と peers の番号だけ。inputSha256 は他のモードの 9 行に peers の行を足したもの
//   - 取得失敗・形の違う応答・ディレクトリ数の超過は err=1（衝突 0 件に畳まない）
//   - --peers の形式の誤り・自分の番号・重複・31 個以上・他のモードでの指定は exit 2
// 利用できる bash をすべて回す。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { availableBashes, expectedSha256, inputSha256, toolExists } from './lib/signed-output.mjs'
import { createObserveStub } from './lib/gh-observe-stub.mjs'

const SCRIPT = join(dirname(fileURLToPath(import.meta.url)), '..', 'scripts', 'observe-pr.sh')
const NONCE = 'af0b1c2d3e4f5a6b7c8d9e0f'
const BASHES = availableBashes()
const jqAvailable = toolExists('jq')

const prNode = (number, nodes, state = 'OPEN', hasNextPage = false) => ({
  number, state, files: { nodes: nodes.map(([path, changeType = 'ADDED']) => ({ path, changeType })), pageInfo: { hasNextPage } },
})
const filesResp = (prs) => JSON.stringify({ data: { repository: Object.fromEntries(prs.map((p) => [`p${p.number}`, p])) } })
const treeResp = (dirs) => JSON.stringify({ data: { repository: Object.fromEntries(dirs.map((d, i) => [`d${i}`, d === null ? null : { entries: d.map((name) => ({ name })) }])) } })

function run(bash, stub, args) {
  return spawnSync(bash, [SCRIPT, '--nonce', NONCE, '--mode', 'added-files', ...args], { encoding: 'utf8', env: stub.env() })
}
function envelope(r) {
  assert.equal(r.status, 0, `exit ${r.status} / stderr: ${r.stderr}`)
  assert.match(r.stdout, /^[^\n]+\n$/, '標準出力は 1 行')
  const e = JSON.parse(r.stdout)
  assert.equal(e.nonce, NONCE)
  assert.equal(e.sha256, expectedSha256(NONCE, e.payload))
  return e.payload
}
// ホストが再計算する入力文字列（implement-issue-tree.src.js の observeInputText と同じ定義）
const inputOf = ({ pr, repo = '', base = 'main', peers = '' }) => ['observe-pr', 'added-files', pr, repo, base, '', '', '', '', peers].join('\n')

for (const bash of BASHES) {
  const tag = `[${bash}]`
  const t = (name, fn) => test(`${tag} ${name}`, { skip: !jqAvailable }, fn)

  t('先行 PR と ADR 番号・置き場ファイルが衝突し、base とも番号が衝突する（下流の事例の形）', () => {
    const stub = createObserveStub({
      graphql: [
        { out: filesResp([
          prNode(3620, [['docs/decisions/0066-judgment.md'], ['docs/payment-pack-judgment-unset.md'], ['docs/old.md', 'DELETED'], ['src/a.rs', 'MODIFIED']]),
          prNode(3618, [['docs/decisions/0066-payment.md'], ['docs/payment-pack-judgment-unset.md']]),
          prNode(3617, [['docs/decisions/0065-confirm.md']], 'MERGED'),
        ]) },
        { out: treeResp([['0064-a.md', '0066-other.md']]) },
      ],
    })
    const p = envelope(run(bash, stub, ['--pr', '3620', '--base', 'main', '--repo', 'o/r', '--peers', '3617,3618']))
    assert.deepEqual(p, {
      mode: 'added-files', inputSha256: inputSha256(inputOf({ pr: '3620', repo: 'o/r', peers: '3617,3618' })), outcome: 'observed', err: 0,
      attempt: 0, maxAttempts: 0, state: 'OPEN', added: 2, numbered: 1, samePath: 1, seqPeer: 1, seqBase: 1, truncated: 0,
      pathPeers: [3618], seqPeers: [3618],
    })
    const gql = stub.calls().filter((c) => c.startsWith('api graphql'))
    assert.equal(gql.length, 2)
    assert.match(gql[0], /p3620:pullRequest\(number:3620\)/)
    assert.match(gql[0], /p3618:pullRequest\(number:3618\).*p3617|p3617:pullRequest\(number:3617\)/)
    assert.match(gql[0], /-F owner=o -F name=r/)
    assert.match(gql[1], /-f e0=main:docs\/decisions/, 'パスは GraphQL 変数で渡す')
    assert.doesNotMatch(gql[1].split(' -F ')[0], /docs\/decisions/, 'クエリの文字列にパスを入れない')
    assert.doesNotMatch(JSON.stringify(p), /docs|judgment|payment/, 'payload にパスの文字列を入れない')
  })

  t('連番ファイルが無ければ base の木を取らず、衝突 0 件で返す', () => {
    const stub = createObserveStub({ graphql: { out: filesResp([prNode(5, [['src/a.rs'], ['docs/x.md']])]) } })
    const p = envelope(run(bash, stub, ['--pr', '5', '--base', 'main']))
    assert.deepEqual([p.err, p.added, p.numbered, p.samePath, p.seqPeer, p.seqBase], [0, 2, 0, 0, 0, 0])
    assert.equal(stub.countOf('graphql'), 1)
    assert.equal(p.inputSha256, inputSha256(inputOf({ pr: '5' })))
    assert.match(stub.calls()[0], /-F owner=\{owner\} -F name=\{repo\}/, '--repo なしは gh のプレースホルダ')
  })

  t('base に無いディレクトリ（object が null）は比べない。MERGED の自分の PR は state で返す', () => {
    const stub = createObserveStub({
      graphql: [{ out: filesResp([prNode(5, [['new/0001-a.md']], 'MERGED')]) }, { out: treeResp([null]) }],
    })
    const p = envelope(run(bash, stub, ['--pr', '5', '--base', 'main', '--peers', '']))
    assert.deepEqual([p.err, p.state, p.seqBase], [0, 'MERGED', 0])
  })

  t('100 件を超える PR は truncated に数える（先頭 100 件だけで比べる）', () => {
    const stub = createObserveStub({ graphql: { out: filesResp([prNode(5, [['a.md']], 'OPEN', true), prNode(4, [['a.md']], 'OPEN', true)]) } })
    const p = envelope(run(bash, stub, ['--pr', '5', '--base', 'main', '--peers', '4']))
    assert.deepEqual([p.err, p.truncated, p.samePath], [0, 2, 1])
  })

  t('上限いっぱい（peers 30 本 × 100 件・長いパス）の一覧でも判定できる（集約 JSON を引数で渡さない。E2BIG 回避）', () => {
    const long = (pr, i) => [`docs/very/long/directory/name/for/testing/argument/limits/pr${pr}/file-${'x'.repeat(40)}-${i}.md`]
    const peers = Array.from({ length: 30 }, (_, i) => i + 10)
    const self = prNode(5, [...Array.from({ length: 99 }, (_, i) => long(5, i)), ['docs/decisions/0063-self.md']])
    const others = peers.map((n) => prNode(n, n === 39 ? [['docs/decisions/0063-other.md']] : Array.from({ length: 100 }, (_, i) => long(n, i))))
    const resp = filesResp([self, ...others])
    assert.ok(resp.length > 200 * 1024, `応答は 200 KiB を超える（${resp.length}）`)
    const stub = createObserveStub({ graphql: [{ out: resp }, { out: treeResp([[]]) }] })
    const p = envelope(run(bash, stub, ['--pr', '5', '--base', 'main', '--peers', peers.join(',')]))
    assert.deepEqual([p.err, p.added, p.seqPeer, p.seqPeers], [0, 100, 1, [39]])
  })

  t('取得失敗・形の違う応答・peers の欠落・ディレクトリ数の超過は err=1 で、件数を 0 にする', () => {
    const many = Array.from({ length: 21 }, (_, i) => [`d${i}/0001-a.md`])
    const cases = [
      [{ graphql: { out: '{"message":"Bad credentials"}', exit: 1 } }, ['--peers', '4']],
      [{ graphql: { out: '{"data":{"repository":null}}' } }, []],
      [{ graphql: { out: filesResp([prNode(5, [['a.md']])]) } }, ['--peers', '4']], // peer の応答が無い
      [{ graphql: { out: filesResp([{ ...prNode(5, []), number: 6 }]) } }, []], // 番号が違う
      [{ graphql: { out: filesResp([prNode(5, many)]) } }, []],
      [{ graphql: [{ out: filesResp([prNode(5, [['d/0001-a.md']])]) }, { out: '{"message":"x"}', exit: 1 }] }, []],
      [{ graphql: [{ out: filesResp([prNode(5, [['d/0001-a.md']])]) }, { out: '{"data":{"repository":{"d0":{"entries":[{"name":1}]}}}}' }] }, []],
    ]
    for (const [routes, extra] of cases) {
      const stub = createObserveStub(routes)
      const p = envelope(run(bash, stub, ['--pr', '5', '--base', 'main', ...extra]))
      assert.deepEqual([p.err, p.outcome, p.state, p.samePath, p.seqPeer, p.seqBase, p.pathPeers, p.seqPeers], [1, 'error', '', 0, 0, 0, [], []], JSON.stringify(routes))
    }
  })

  t('--peers と added-files の引数の誤りは exit 2（封筒を出さない）', () => {
    const stub = createObserveStub({})
    const bad = [
      ['--pr', '5'], // --base なし
      ['--pr', '5', '--base', 'main', '--peers', '4,'],
      ['--pr', '5', '--base', 'main', '--peers', ',4'],
      ['--pr', '5', '--base', 'main', '--peers', '4,,6'],
      ['--pr', '5', '--base', 'main', '--peers', '4,x'],
      ['--pr', '5', '--base', 'main', '--peers', '5'],
      ['--pr', '5', '--base', 'main', '--peers', '4,4'],
      ['--pr', '5', '--base', 'main', '--peers', Array.from({ length: 31 }, (_, i) => i + 10).join(',')],
      ['--pr', '5', '--base', 'main', '--peers', '4;id'],
      ['--pr', '5', '--base', 'main', '--wait', '--attempt', '1'],
    ]
    for (const args of bad) {
      const r = run(bash, stub, args)
      assert.equal(r.status, 2, `${args.join(' ')} / ${r.stderr}`)
      assert.equal(r.stdout, '')
    }
    const other = spawnSync(bash, [SCRIPT, '--nonce', NONCE, '--mode', 'threads', '--pr', '5', '--peers', '4'], { encoding: 'utf8', env: stub.env() })
    assert.equal(other.status, 2, '--peers は added-files だけが取る')
    assert.equal(stub.countOf('graphql'), 0, '引数の誤りでは gh を呼ばない')
    const ok = run(bash, createObserveStub({ graphql: { out: filesResp([prNode(5, []), ...Array.from({ length: 30 }, (_, i) => prNode(i + 10, []))]) } }),
      ['--pr', '5', '--base', 'main', '--peers', Array.from({ length: 30 }, (_, i) => i + 10).join(',')])
    assert.equal(envelope(ok).err, 0, '30 個までは受け付ける')
  })
}
