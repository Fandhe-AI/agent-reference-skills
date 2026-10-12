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

test('monitorPrompt: 3g は手順 2 が checksTotal を省略した（取得失敗）経路でも実行され、行き止まりにならない', () => {
  // 手順 2 は取得失敗時に checksTotal を省略して --watch → 手順 3 へ進む。3g の前提が「手順 2 の
  // checksTotal が 1 件以上」だと、省略時は文字通りには満たされず 3g が走らない読みが成立し、
  // 手順 6 の ready 条件（3g の不足 0 件の実測）を満たせないまま ready にも失敗終端にもならない。
  const p = monitorPrompt(item, impl, [], true, true)
  const s = p.slice(p.indexOf('3g.'), p.indexOf('\n6. '))
  const head = s.slice(0, s.indexOf('\n'))
  assert.ok(!head.includes('手順 2 の checksTotal が 1 件以上のとき'), '3g の前提が手順 2 の checksTotal 限定のまま')
  assert.ok(head.includes('手順 2 で取得に失敗して checksTotal を省略した場合も'), '3g が checksTotal 省略時も実行される旨がない')
  assert.ok(head.includes('確定 0 件だけが手順 3e'), '0 件の扱いが手順 3e の確定 0 件に限られる旨がない')
  // 取得失敗を 0 件・緑扱いへ倒さない（fail-closed）: 総数は手順 3 の実測列挙件数を使う。
  assert.ok(head.includes('手順 3 の gh pr checks が列挙したチェック件数'), '省略時の総数の出所がない')
})

test('monitorPrompt: 3g の timeout が返す checksTotal の出所を手順 2 失敗時も含めて定め、手順 7・返却仕様と矛盾しない', () => {
  const p = monitorPrompt(item, impl, [], true, true)
  const s3g = p.slice(p.indexOf('3g.'), p.indexOf('\n6. '))
  assert.ok(s3g.includes('state: timeout（checksTotal は 1 以上'), '3g の timeout の checksTotal が 1 以上と明示されていない')
  assert.ok(s3g.includes('手順 2 で取得に失敗していれば手順 3 の gh pr checks が列挙した件数'))
  const tail = p.slice(p.indexOf('\n7. '))
  const s7 = tail.slice(0, tail.indexOf('\n返却: '))
  assert.ok(s7.includes('手順 2 で取得に失敗した場合は手順 3 の gh pr checks が列挙した件数'))
  const ret = tail.slice(tail.indexOf('\n返却: '))
  assert.ok(ret.includes('timeout を返す場合は 1 以上') && ret.includes('手順 2 で取得に失敗していても'))
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
