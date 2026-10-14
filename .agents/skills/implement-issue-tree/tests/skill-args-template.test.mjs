// SKILL.md の引数テンプレート（プレースホルダ入りの ```json ブロック）が JSON として解析できることの回帰テスト。
// 値のプレースホルダは文字列として書かれているため、そのまま JSON.parse に通る。行末のカンマ抜けのような
// 追記時の崩れ（models の次へ securityReview を足したときに起きた）を拾う。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const skill = readFileSync(join(dirname(fileURLToPath(import.meta.url)), '..', 'SKILL.md'), 'utf8')
const blocks = [...skill.matchAll(/```json\n([\s\S]*?)```/g)].map((m) => m[1])

test('SKILL.md の ```json ブロックはすべて JSON として解析できる', () => {
  assert.ok(blocks.length >= 3, `json ブロックが見つからない: ${blocks.length}`)
  for (const b of blocks) assert.doesNotThrow(() => JSON.parse(b), b.slice(0, 80))
})

test('引数テンプレート: scriptPath と args を持ち、args のキーが重複しない・securityReview と models を含む', () => {
  const tpl = blocks.find((b) => b.includes('"<このスキルディレクトリ>/scripts/implement-issue-tree.js"'))
  assert.ok(tpl, '引数テンプレートのブロックが見つからない')
  const parsed = JSON.parse(tpl)
  assert.equal(typeof parsed.scriptPath, 'string')
  const keys = Object.keys(parsed.args)
  for (const k of ['parent', 'skillDir', 'agentCallLimit', 'models', 'securityReview']) assert.ok(keys.includes(k), k)
  const written = [...tpl.matchAll(/^ {4}"([A-Za-z]+)":/gm)].map((m) => m[1])
  assert.deepEqual(written, keys, '同じキーを 2 回書いていない（JSON.parse は後勝ちで黙って潰す）')
  for (const v of Object.values(parsed.args)) assert.equal(typeof v, 'string', 'プレースホルダは文字列')
})
