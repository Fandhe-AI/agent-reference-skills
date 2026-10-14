// required status check の context の受理条件が、ホスト（parseExternalChecks / EXTERNAL_CHECK_CONTEXT_RE + 前後空白の拒否）と
// scripts/merge-gate.sh（--external の jq 検査）で食い違わないことを、同じ入力表で固定する（PR #621 の codex 指摘: 上限 200 と 255 の食い違い）。
//
// 片方だけ受理する入力があると、ホストが受理した宣言をスクリプトが exit 2 で拒否し、自動マージへ進めない（または逆に緩い側へ倒れる）。
// ここでは同じ表をホストのパーサとスクリプト（利用できる bash すべて）へ通し、受理・拒否が一致することを確かめる。
// スクリプト側は gh を常に失敗させる偽 gh を PATH に置き、引数検査の段階（exit 2 = 拒否）を通過したかどうかだけを見る。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { chmodSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { trackTmp } from './lib/tmp-track.mjs'
import { availableBashes, toolExists } from './lib/signed-output.mjs'
import { spawnAsync } from './lib/run-async.mjs'

const HERE = dirname(fileURLToPath(import.meta.url))
const SCRIPT = join(HERE, '..', 'scripts', 'merge-gate.sh')
const SRC = join(HERE, '..', 'scripts', 'implement-issue-tree.src.js')
const MARKER = '__IMPLEMENT_ISSUE_TREE_DRIVER_START__'

const source = readFileSync(SRC, 'utf8')
const markerIndex = source.indexOf(MARKER)
assert.ok(markerIndex >= 0, `テスト境界マーカー ${MARKER} が無い`)
const tmp = trackTmp(mkdtempSync(join(tmpdir(), 'iit-ctx-parity-')))
const slicePath = join(tmp, 'defs.mjs')
writeFileSync(slicePath, `${source.slice(0, source.lastIndexOf('\n', markerIndex))}\nexport { parseExternalChecks }\n`)
const { parseExternalChecks } = await import(pathToFileURL(slicePath).href)

// 偽 gh: 常に失敗する。検査を通った入力は view 段階で fail-closed の封筒（exit 0）になり、拒否された入力は exit 2
const fakeBin = join(tmp, 'bin')
writeFileSync(join(tmp, 'mk'), '')
mkdirSync(fakeBin)
writeFileSync(join(fakeBin, 'gh'), '#!/bin/sh\nexit 1\n')
chmodSync(join(fakeBin, 'gh'), 0o755)

const rep = (ch, n) => ch.repeat(n)
// [名前, context, 期待（true = 受理）]
const TABLE = [
  ['1 文字', 'a', true],
  ['空文字', '', false],
  ['200 文字', rep('a', 200), true],
  ['201 文字（旧上限の直後）', rep('a', 201), true],
  ['255 文字（上限）', rep('a', 255), true],
  ['256 文字', rep('a', 256), false],
  ['255 コードポイントの絵文字（UTF-16 では 510）', rep('😀', 255), true],
  ['256 コードポイントの絵文字', rep('😀', 256), false],
  ['内部の空白は可', 'Cursor Bugbot', true],
  ['記号・日本語は可', 'ci/テスト (unit) [node@24]', true],
  ['先頭の半角空白', ' a', false],
  ['末尾の半角空白', 'a ', false],
  ['末尾の NBSP', 'a ', false],
  ['先頭の全角空白', '　a', false],
  ['末尾の BOM', 'a﻿', false],
  ['先頭の EN SPACE', ' a', false],
  ['末尾の U+2028', 'a ', false],
  ['内部の U+2028', 'a b', false],
  ['内部の U+2029', 'a b', false],
  ['内部のタブ', 'a\tb', false],
  ['内部の改行', 'a\nb', false],
  ['内部の CR', 'a\rb', false],
  ['内部の NUL 相当（U+0001）', 'a\u0001b', false],
  ['DEL', 'a\u007fb', false],
  ['C1 制御（U+0085）', 'a\u0085b', false],
  ['ゼロ幅スペース（空白類ではない）は両端でも可', '​a​', true],
  ['U+180E（現行の空白類ではない）は末尾でも可', 'a᠎', true],
  ['内部の NBSP は可', 'a b', true],
]

const hostAccepts = (c) => {
  try {
    parseExternalChecks([{ app: 'cursor', contexts: [c] }])
    return true
  } catch {
    return false
  }
}

test('表の期待値はホストのパーサの実挙動と一致する（表自体の検算）', () => {
  for (const [name, c, expected] of TABLE) assert.equal(hostAccepts(c), expected, `ホスト: ${name}`)
})

test('256 文字は拒否・255 文字は受理（ホスト）', () => {
  assert.equal(hostAccepts(rep('a', 255)), true)
  assert.equal(hostAccepts(rep('a', 256)), false)
})

if (!toolExists('jq')) {
  test('jq が無い環境ではスクリプト側の照合を飛ばす', { skip: true }, () => {})
} else {
  for (const bash of availableBashes()) {
    test(`merge-gate.sh（${bash}）の --external 検査はホストと同じ入力表で一致する`, async () => {
      const results = await Promise.all(
        TABLE.map(async ([name, c, expected]) => {
          const r = await spawnAsync(
            bash,
            [SCRIPT, '--nonce', 'n1', '--pr', '5', '--base', 'main', '--repo', 'o/r', '--external', JSON.stringify([{ app: 'cursor', contexts: [c] }])],
            { env: { ...process.env, PATH: `${fakeBin}:${process.env.PATH}` } },
          )
          return { name, expected, status: r.status, stderr: r.stderr }
        }),
      )
      for (const { name, expected, status, stderr } of results) {
        assert.equal(status !== 2, expected, `スクリプト: ${name}（exit ${status} / ${stderr}）`)
      }
    })
  }
}

test('255 文字は受理・256 文字は拒否（スクリプト・境界の単独確認）', async (t) => {
  if (!toolExists('jq')) return t.skip('jq なし')
  const run = (c) =>
    spawnAsync('bash', [SCRIPT, '--nonce', 'n1', '--pr', '5', '--base', 'main', '--external', JSON.stringify([{ app: 'cursor', contexts: [c] }])], {
      env: { ...process.env, PATH: `${fakeBin}:${process.env.PATH}` },
    })
  assert.notEqual((await run(rep('a', 255))).status, 2)
  assert.equal((await run(rep('a', 256))).status, 2)
})
