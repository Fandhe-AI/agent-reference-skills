// sample/args-example.json の全ての例が、生成物の起動時検証を通ることの回帰テスト（Issue #603 PR #611 B2）。
//
// 背景: 起動時に必須の引数（skillDir）を足したとき、利用者が最初にコピーする sample が追従せず、12 例中 11 例が
// 起動時エラーになった。今後必須の引数を足したときに同じ漏れが出ないよう、各例の args を実際の生成物
// （implement-issue-tree.js）へ渡し、起動時検証（引数のパース・必須判定）を通過して最初のエージェント呼び出しまで
// 到達することを確かめる。エージェントは最初の呼び出しで例外を投げて止める（ラン本体は動かさない）。
//
// 検証が空振りしないための対照: skillDir を除いた同じ args は、測定を使うラン（dryRun でなく
// maxResidualWorktreeBytes > 0）では起動時エラーになる。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { stripMetaExport } from './lib/workflow-script-contract.mjs'

const HERE = dirname(fileURLToPath(import.meta.url))
const DIST = readFileSync(join(HERE, '..', 'scripts', 'implement-issue-tree.js'), 'utf8')
const SAMPLE = JSON.parse(readFileSync(join(HERE, '..', 'sample', 'args-example.json'), 'utf8'))
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor
const STOP = 'STOP-AT-FIRST-AGENT'

async function startup(args) {
  const calls = []
  const fn = new AsyncFunction('args', 'agent', 'log', 'phase', stripMetaExport(DIST))
  try {
    await fn(
      args,
      async (_prompt, opts) => {
        calls.push(opts.label)
        throw new Error(STOP)
      },
      () => {},
      () => {},
    )
  } catch (e) {
    return { calls, message: e.message }
  }
  return { calls, message: 'returned' }
}

test('sample/args-example.json: 例が 1 件以上あり、各例は説明と args を持つ', () => {
  assert.ok(Array.isArray(SAMPLE.examples) && SAMPLE.examples.length >= 1)
  for (const [i, e] of SAMPLE.examples.entries()) {
    assert.equal(typeof e.description, 'string', `例 ${i}`)
    assert.ok(e.args && typeof e.args === 'object' && !Array.isArray(e.args), `例 ${i}`)
  }
})

for (const [i, e] of SAMPLE.examples.entries()) {
  test(`sample 例 ${i}: 起動時検証を通って最初のエージェント呼び出しまで到達する（${e.description.slice(0, 30)}…）`, async () => {
    const r = await startup(structuredClone(e.args))
    assert.equal(r.message, STOP, `起動時エラーで止まった: ${r.message}`)
    assert.ok(r.calls.length >= 1, `エージェント呼び出しまで到達していない: ${r.message}`)
  })

  test(`sample 例 ${i}: skillDir を持つ（絶対パスの形式）`, () => {
    assert.match(e.args.skillDir ?? '', /^\/[A-Za-z0-9_][A-Za-z0-9._ \/-]*$/)
  })
}

test('対照: 測定を使う例から skillDir を除くと起動時エラーになる（検証が空振りしていない）', async () => {
  const measuring = SAMPLE.examples.filter((e) => !e.args.dryRun && e.args.maxResidualWorktreeBytes !== 0)
  assert.ok(measuring.length >= 1)
  for (const e of measuring) {
    const { skillDir: _drop, ...rest } = structuredClone(e.args)
    const r = await startup(rest)
    assert.match(r.message, /args\.skillDir にはスキルディレクトリ/, e.description)
    assert.equal(r.calls.length, 0)
  }
})

test('skillDir の説明キー（_skillDir）が sample にある', () => {
  assert.equal(typeof SAMPLE._skillDir, 'string')
  assert.match(SAMPLE._skillDir, /絶対パス/)
})
