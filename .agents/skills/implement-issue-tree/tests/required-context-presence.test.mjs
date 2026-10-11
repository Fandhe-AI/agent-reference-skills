// Issue #577 の回帰テスト: monitor が ruleset の required context の揃う前に ready を返し、
// merge-exec (v-b) が issuer-unbound（終端）で止まる経路を塞ぐ契約を固定する。
//   (1) REQUIRED_MISSING_JQ の実動作（jq 実行）
//   (2) monitorPrompt 手順 3g（clientMergeActive 限定・有界待機・件数のみ）
//   (3) merge-exec (v-b) の一過性（checks-not-green）/ 構成問題（issuer-unbound）分岐
// 読み込み方式は post-push-checks-gate.test.mjs と同一のマーカー切り出しスライス方式。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { spawnSync } from 'node:child_process'

const SCRIPT_PATH = join(dirname(fileURLToPath(import.meta.url)), '..', 'scripts', 'implement-issue-tree.src.js')
const DRIVER_MARKER = '__IMPLEMENT_ISSUE_TREE_DRIVER_START__'
const source = readFileSync(SCRIPT_PATH, 'utf8')
const markerIndex = source.indexOf(DRIVER_MARKER)
if (markerIndex < 0) throw new Error(`テスト境界マーカー ${DRIVER_MARKER} が存在しない`)
const definitionPart = source.slice(0, source.lastIndexOf('\n', markerIndex))
const sliceDir = mkdtempSync(join(tmpdir(), 'implement-issue-tree-reqctx-'))
const slicePath = join(sliceDir, 'defs.mjs')
const SLICE_EXPORTS = ['monitorPrompt', 'mergeExecutePrompt', 'classifyMergeExecDispatch', 'MERGE_EXEC_SCHEMA', 'REQUIRED_MISSING_JQ']
writeFileSync(slicePath, `${definitionPart}\nexport { ${SLICE_EXPORTS.join(', ')} }\n`)
const { monitorPrompt, mergeExecutePrompt, classifyMergeExecDispatch, MERGE_EXEC_SCHEMA, REQUIRED_MISSING_JQ } = await import(pathToFileURL(slicePath).href)

const item = { number: 577, title: 't' }
const impl = { prNumber: 1, branch: 'fix/577-x' }

const jqAvailable = spawnSync('jq', ['--version']).status === 0
const missing = (req, have) => {
  const r = spawnSync('jq', ['-n', '--argjson', 'r', JSON.stringify(req), '--argjson', 'h', JSON.stringify(have), REQUIRED_MISSING_JQ], { encoding: 'utf8' })
  assert.equal(r.status, 0, r.stderr)
  return Number(r.stdout.trim())
}

test('REQUIRED_MISSING_JQ: required が HEAD に無ければ不足件数を返す', { skip: !jqAvailable }, () => {
  const req = Array.from({ length: 29 }, (_, i) => `ci-${i}`)
  assert.equal(missing(req, ['bugbot', 'ai-review']), 29)
  assert.equal(missing(req, [...req.slice(0, 20), 'bugbot']), 9)
})

test('REQUIRED_MISSING_JQ: 全て存在すれば 0、required 空でも 0', { skip: !jqAvailable }, () => {
  assert.equal(missing(['a', 'b', 'c'], ['c', 'b', 'a', 'x']), 0)
  assert.equal(missing([], ['x']), 0)
})

test('monitorPrompt(clientMergeActive): 手順 3g が手順 6 より前にあり有界待機と再判定を持つ', () => {
  const p = monitorPrompt(item, impl, [], true, true)
  const i3g = p.indexOf('3g.')
  assert.ok(i3g >= 0, '手順 3g が無い')
  const i6 = p.indexOf('\n6. ')
  assert.ok(i3g < i6, '3g は手順 6 より前')
  const s = p.slice(i3g, i6)
  assert.ok(s.includes('rules/branches/'))
  assert.ok(s.includes('check-runs') && s.includes('statuses'))
  assert.ok(s.includes(REQUIRED_MISSING_JQ))
  assert.ok(s.includes('最大 10 分'))
  assert.ok(s.includes('gh pr view') && s.includes('CONFLICTING'))
  assert.ok(s.includes('state: timeout') && s.includes('checksTotal'))
})

test('monitorPrompt: context 名・App 名を取得・転記せず REQ/HAVE を表示しない', () => {
  const p = monitorPrompt(item, impl, [], true, true)
  const s = p.slice(p.indexOf('3g.'), p.indexOf('\n6. '))
  assert.ok(s.includes('件数のみ'))
  assert.ok(!/echo\s+"?\$(REQ|HAVE)/.test(s))
})

test('monitorPrompt: 3g の取得不能は有界再取得後に blocked/quality（ready にも timeout にもしない）', () => {
  const p = monitorPrompt(item, impl, [], false, true)
  const s = p.slice(p.indexOf('3g.'), p.indexOf('\n6. '))
  assert.ok(s.includes('最大 3 回') && s.includes('state: blocked') && s.includes('"quality"'))
  assert.ok(!s.includes('手順 4 へ進む（0 件扱いにも blocked にもしない'))
  const s6 = p.slice(p.indexOf('\n6. '), p.indexOf('\n7. '))
  assert.ok(s6.includes('取得不能のまま ready にしない'))
  assert.ok(p.slice(p.indexOf('\n7. ')).includes('取得不能は timeout ではなく'))
})

test('monitorPrompt: 手順 7 に 3g 由来の timeout 条件があり既存文言は維持される', () => {
  const p = monitorPrompt(item, impl, [], true, true)
  const s7 = p.slice(p.indexOf('\n7. '))
  assert.ok(s7.includes('手順 3g'))
  assert.ok(s7.includes('チェックが 1 件以上存在し'))
  assert.ok(s7.includes('checksTotal: 0 の timeout を受理しない'))
})

test('monitorPrompt(autoMerge 無効): 手順 3g を含まない', () => {
  assert.ok(!monitorPrompt(item, impl, [], false, false).includes('3g.'))
})

test('mergeExecutePrompt (v-b): 未発行のみなら checks-not-green、未束縛・取得不能は issuer-unbound', () => {
  const p = mergeExecutePrompt(item, impl, true, [], 'a'.repeat(40))
  const i = p.indexOf('(v-b)')
  assert.ok(i >= 0)
  const s = p.slice(i)
  assert.ok(/checks-not-green[^。]*未発行|未発行[^。]*checks-not-green/.test(s))
  assert.ok(s.includes('issuer-unbound'))
})

test('分類: issuer-unbound は blocked/quality、checks-not-green は timeout（再監視）、enum は維持', () => {
  assert.deepEqual(classifyMergeExecDispatch('issuer-unbound', null), { lastState: 'blocked', lastBlockedReason: 'quality' })
  assert.equal(classifyMergeExecDispatch('checks-not-green', null).lastState, 'timeout')
  const e = MERGE_EXEC_SCHEMA.properties.reason.enum
  assert.ok(e.includes('issuer-unbound') && e.includes('checks-not-green'))
})
