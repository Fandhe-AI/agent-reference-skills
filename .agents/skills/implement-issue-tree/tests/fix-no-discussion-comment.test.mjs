// fix / monitor エージェントの「議論コメント投稿禁止」回帰テスト（Issue #564）。
//
// 対象事例: Merge ループの fix が外部 AI レビューの P0 指摘に対し、コードを直さず「既存実装も同じ方式」と
// 反論するコメントをレビュースレッドへ投稿した（gh 認証はラン起動者のため利用者名義で公開された）。
// 是正後の契約: FIX_NO_DISCUSSION_POLICY を fixPrompt の UNTRUSTED 境界の外側へ、
// MONITOR_NO_REBUTTAL_POLICY を monitorPrompt へ入れる。実際にプロンプトを組み立てて確認する。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const SCRIPT_PATH = join(
  dirname(fileURLToPath(import.meta.url)),
  '..', 'scripts', 'implement-issue-tree.src.js',
)
// マーカー文字列はソース中に 1 回しか現れてはならないため分割して組み立てる。
const DRIVER_MARKER = ['__IMPLEMENT', 'ISSUE', 'TREE', 'DRIVER', 'START__'].join('_')

const source = readFileSync(SCRIPT_PATH, 'utf8')
const markerIndex = source.indexOf(DRIVER_MARKER)
if (markerIndex < 0) throw new Error(`テスト境界マーカー ${DRIVER_MARKER} が実装スクリプトに存在しない`)
const definitionPart = source.slice(0, source.lastIndexOf('\n', markerIndex))
const sliceDir = mkdtempSync(join(tmpdir(), 'implement-issue-tree-no-discussion-'))
const slicePath = join(sliceDir, 'implement-issue-tree-no-discussion-defs.mjs')
const SLICE_EXPORTS = ['FIX_NO_DISCUSSION_POLICY', 'MONITOR_NO_REBUTTAL_POLICY', 'fixPrompt', 'monitorPrompt']
const TEST_ONLY_SETTER = 'export function __setBoundaryNonceSeedForTest(v) { boundaryNonceSeed = v }\n'
writeFileSync(slicePath, `${definitionPart}\nexport { ${SLICE_EXPORTS.join(', ')} }\n${TEST_ONLY_SETTER}`)
const m = await import(pathToFileURL(slicePath).href)
m.__setBoundaryNonceSeedForTest('a'.repeat(64))

const item = { number: 42, title: 'サンプルイシュー', optinTests: [] }
const impl = { prNumber: 123, branch: 'fix/42-noop', worktreePath: '/tmp/wt-42', summary: 's' }
const finding = { summary: 'テスト用の指摘', unresolvedComments: [] }

test('FIX_NO_DISCUSSION_POLICY: 返信・議論投稿の禁止、定型操作の例外、pushed: false 返却を含む', () => {
  const p = m.FIX_NO_DISCUSSION_POLICY
  for (const s of ['レビュースレッドへの返信', 'gh pr comment', 'gh pr review', '議論投稿はしない']) {
    assert.ok(p.includes(s), `禁止対象に ${s} が無い`)
  }
  assert.match(p, /例外は.*resolve.*再実行依頼のみ/)
  assert.match(p, /修正しない判断も反論で済ませず手順 2 に従う（P0\/P1・セキュリティは pushed: false と理由、それ以外は outOfScopeComments）/)
})

test('fixPrompt: push / no-push 両経路で UNTRUSTED 境界より前に固定文を含む', () => {
  for (const push of [true, false]) {
    const out = m.fixPrompt(item, impl, finding, push)
    const at = out.indexOf(m.FIX_NO_DISCUSSION_POLICY)
    const begin = out.indexOf('=== UNTRUSTED_')
    assert.ok(at >= 0, `push=${push}: 固定文が無い`)
    assert.ok(begin >= 0 && at < begin, `push=${push}: 固定文が UNTRUSTED 境界の外側（前）にない`)
  }
})

test('MONITOR_NO_REBUTTAL_POLICY: P0/P1 の対応案を修正案に限り反論・返信案を排除する', () => {
  const p = m.MONITOR_NO_REBUTTAL_POLICY
  assert.match(p, /P0\/P1 相当・セキュリティ指摘の対応案は修正案のみ/)
  assert.match(p, /反論・返信で済ませる案は書かない/)
})

test('monitorPrompt: 外部チェックなし・cursor あり双方で固定文を含み、cursor ありでは定型投稿手順が残る', () => {
  const none = m.monitorPrompt(item, impl, [], true, false)
  assert.ok(none.includes(m.MONITOR_NO_REBUTTAL_POLICY))
  const cursor = m.monitorPrompt(item, impl, ['cursor'], true, false)
  assert.ok(cursor.includes(m.MONITOR_NO_REBUTTAL_POLICY))
  assert.ok(cursor.includes('gh pr comment'))
  assert.match(cursor, /"@cursor review"/)
  // 固定文は既存の権限境界行の直後にある
  const boundaryAt = cursor.indexOf('権限境界: 本エージェントはマージ・クローズの実行権限を持たない')
  assert.ok(boundaryAt >= 0 && cursor.indexOf(m.MONITOR_NO_REBUTTAL_POLICY) > boundaryAt)
})
