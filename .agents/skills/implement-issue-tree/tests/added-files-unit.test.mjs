// scripts/lib/added-files-lib.sh（observe-pr.sh の added-files モードの判定だけの純関数）を、表で単体検査する回帰テスト（Issue #658）。
//
// 新規追加ファイルの「同じパス」「同じディレクトリ・同じ連番・別の幹」の衝突の数え方を、git・gh を呼ばずに 1 回の bash 起動で
// 表の全ケースに当てる（スクリプト全体を偽 gh で走らせるケースは tests/observe-pr-added-files.test.mjs）。
// 契約: 連番 = basename 先頭の 3 桁以上の数字 + - / _、幹 = 最初の . の前。先行 PR は OPEN だけを比べる。base は自分が削除する
// ファイルを比べない。形の違う入力は何も出さず rc 1。利用できる bash（macOS の 3.2 と Homebrew の 5 など）をすべて回す。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { availableBashes, toolExists } from './lib/signed-output.mjs'

const LIB = join(dirname(fileURLToPath(import.meta.url)), '..', 'scripts', 'lib', 'added-files-lib.sh')

// 1 行 1 ケース（関数名 TAB 入力 JSON）を読み、`<番号> <rc> [<出力>]` を返す
const DRIVER = `
set -u
LC_ALL=C
export LC_ALL
. "$1" || exit 9
i=0
TAB=$(printf '\\t')
while IFS="$TAB" read -r fn input; do
  rc=0
  out=$(printf '%s' "$input" | "$fn") || rc=$?
  printf '%s %s [%s]\\n' "$i" "$rc" "$out"
  i=$((i + 1))
done
`

function table(bash, rows) {
  const lines = rows.map(([fn, input]) => `${fn}\t${typeof input === 'string' ? input : JSON.stringify(input)}`).join('\n') + '\n'
  const r = spawnSync(bash, ['-c', DRIVER, 'driver', LIB], { input: lines, encoding: 'utf8' })
  assert.equal(r.status, 0, `exit ${r.status} / stderr: ${r.stderr}`)
  const out = r.stdout.split('\n').filter((l) => l !== '')
  assert.equal(out.length, rows.length, `行数が合わない:\n${r.stdout}`)
  return out.map((l, i) => {
    const m = /^(\d+) (\d+) \[(.*)\]$/.exec(l)
    assert.ok(m && Number(m[1]) === i, l)
    return { rc: Number(m[2]), out: m[3] === '' ? null : JSON.parse(m[3]) }
  })
}

const self = (added, deleted = [], pr = 20) => ({ pr, state: 'OPEN', added, deleted, truncated: 0 })
const peer = (pr, added, state = 'OPEN', truncated = 0) => ({ pr, state, added, truncated })
const files = (s, peers = []) => ({ self: s, peers })
const cls = (f, base = {}) => ['added_files_classify', { files: f, base }]
const pick = (o) => o && { samePath: o.samePath, seqPeer: o.seqPeer, seqBase: o.seqBase, pathPeers: o.pathPeers, seqPeers: o.seqPeers }

for (const bash of availableBashes()) {
  const tag = `[${bash}]`
  const t = (name, fn) => test(`${tag} ${name}`, { skip: !toolExists('jq') }, fn)

  t('added_files_classify: 下流の事例（ADR 番号・置き場ファイル）を先行 PR・base との衝突として数える', () => {
    const [r] = table(bash, [cls(
      files(self(['docs/decisions/0065-judgment.md', 'docs/payment-pack-judgment-unset.md', 'src/a.rs']), [
        peer(18, ['docs/decisions/0065-payment.md', 'docs/payment-pack-judgment-unset.md']),
        peer(17, ['docs/decisions/0064-confirm.md'], 'MERGED'),
      ]),
      { 'docs/decisions': ['0063-a.md', '0064-confirm.md'] },
    )])
    assert.equal(r.rc, 0)
    assert.deepEqual(r.out, { added: 3, numbered: 1, samePath: 1, seqPeer: 1, seqBase: 0, pathPeers: [18], seqPeers: [18], truncated: 0 })
  })

  t('added_files_classify: 連番の衝突は同じディレクトリ・同じ数字・別の幹だけ', () => {
    const rows = [
      // [自分の追加, 先行 PR の追加, base, 期待 seqPeer, 期待 seqBase]
      [['d/0063-a.md'], ['d/0063-b.md'], {}, 1, 0],
      [['d/0063-a.md'], ['e/0063-b.md'], {}, 0, 0], // 別のディレクトリ
      [['d/0063-a.md'], ['d/0064-b.md'], {}, 0, 0], // 別の番号
      [['d/0063-a.md'], ['d/063-b.md'], {}, 0, 0], // 桁の違う数字は別の番号
      [['d/0063-a.md'], ['d/0063-a.txt'], {}, 0, 0], // 同じ幹
      [['m/0018_create.up.sql'], ['m/0018_create.down.sql'], {}, 0, 0], // 同じ幹の組
      [['m/0018_create.up.sql'], ['m/0018_drop.sql'], {}, 1, 0], // `_` 区切り
      [['d/63-a.md'], ['d/63-b.md'], {}, 0, 0], // 2 桁は連番とみなさない
      [['d/0063a.md'], ['d/0063b.md'], {}, 0, 0], // 区切りが無い
      [['0001-a.md'], ['0001-b.md'], { '': ['0001-c.md'] }, 1, 1], // ルート直下
      [['d/0063-a.md'], [], { d: ['0063-z.md'] }, 0, 1],
      [['d/0063-a.md'], [], { d: ['0063-a.ja.md'] }, 0, 0], // base の同じ幹（翻訳など）
      [['d/0063-a.md'], [], { e: ['0063-z.md'] }, 0, 0],
      [['d/0063-a.md', 'd/0063-b.md'], [], {}, 0, 0], // 自分の中どうしは比べない
    ]
    const res = table(bash, rows.map(([s, p, b]) => cls(files(self(s), [peer(9, p)]), b)))
    rows.forEach(([s, p, b, wantPeer, wantBase], i) => {
      assert.equal(res[i].rc, 0, JSON.stringify(rows[i]))
      assert.deepEqual([res[i].out.seqPeer, res[i].out.seqBase], [wantPeer, wantBase], JSON.stringify({ s, p, b }))
    })
  })

  t('added_files_classify: 同じパスは samePath だけに数え、先行 PR は OPEN だけ・自分自身は比べない', () => {
    const res = table(bash, [
      cls(files(self(['d/0063-a.md', 'x.md']), [peer(9, ['d/0063-a.md', 'x.md'])])),
      cls(files(self(['x.md']), [peer(9, ['x.md'], 'MERGED'), peer(8, ['x.md'], 'CLOSED')])),
      cls(files(self(['x.md']), [peer(20, ['x.md'])])),
      cls(files(self(['x.md']), [peer(9, ['x.md']), peer(7, ['x.md'])])),
    ])
    assert.deepEqual(pick(res[0].out), { samePath: 2, seqPeer: 0, seqBase: 0, pathPeers: [9], seqPeers: [] })
    assert.deepEqual(pick(res[1].out), { samePath: 0, seqPeer: 0, seqBase: 0, pathPeers: [], seqPeers: [] })
    assert.deepEqual(pick(res[2].out), { samePath: 0, seqPeer: 0, seqBase: 0, pathPeers: [], seqPeers: [] })
    assert.deepEqual(pick(res[3].out), { samePath: 2, seqPeer: 0, seqBase: 0, pathPeers: [7, 9], seqPeers: [] })
  })

  t('added_files_classify: 自分が削除する base のファイルとは比べない（改番 = 削除 + 追加を衝突にしない）', () => {
    const res = table(bash, [
      cls(files(self(['d/0064-a.md'], ['d/0064-old.md'])), { d: ['0064-old.md'] }),
      cls(files(self(['d/0064-a.md'], ['e/0064-old.md'])), { d: ['0064-old.md'] }),
    ])
    assert.equal(res[0].out.seqBase, 0)
    assert.equal(res[1].out.seqBase, 1, '別のディレクトリの削除は関係しない')
  })

  t('added_files_classify: truncated は 100 件で切れた PR の数', () => {
    const [r] = table(bash, [cls({ self: { ...self([]), truncated: 1 }, peers: [peer(9, [], 'OPEN', 1), peer(8, [], 'MERGED', 0)] })])
    assert.equal(r.out.truncated, 2)
  })

  t('added_files_numbered_dirs: 自分の連番ファイルのディレクトリを重複なく返す', () => {
    const res = table(bash, [
      ['added_files_numbered_dirs', files(self(['a/0001-x.md', 'a/0002-y.md', '0003_z.sql', 'b/readme.md', 'c/d/123-e']))],
      ['added_files_numbered_dirs', files(self([]))],
    ])
    assert.deepEqual(res[0].out, ['', 'a', 'c/d'])
    assert.deepEqual(res[1].out, [])
  })

  t('形の違う入力は何も出さず rc 1', () => {
    const bad = [
      ['added_files_classify', 'null'],
      ['added_files_classify', '{"files":{"self":{"pr":1,"added":"x","deleted":[]},"peers":[]},"base":{}}'],
      ['added_files_classify', '{"files":{"self":{"pr":1,"added":[],"deleted":[]},"peers":[{"pr":"2","state":"OPEN","added":[]}]},"base":{}}'],
      ['added_files_classify', '{"files":{"self":{"pr":1,"added":[],"deleted":[]},"peers":[]},"base":{"d":"0001-a"}}'],
      ['added_files_classify', 'not json'],
      ['added_files_numbered_dirs', '{"self":{"pr":1,"added":[1],"deleted":[]},"peers":[]}'],
    ]
    for (const r of table(bash, bad)) assert.deepEqual(r, { rc: 1, out: null })
  })
}
