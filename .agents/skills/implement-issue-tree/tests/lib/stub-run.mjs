// 実装スクリプト（開発ファイル implement-issue-tree.src.js）全体を Workflow ランタイムと同じ評価形態
// （AsyncFunction。agent は引数）で stub agent に対して実行する共有ハーネス。agent() へ渡った opts
// （label・model 等）とプロンプトを記録し、引数ごとの agent 呼び出しの違いを結合テストで検証するために使う。
//
// stub は 1 issue が plan → impl → review → pr-create → PR 照合 → monitor まで進む最小の応答を返し、
// monitor は blocked(quality) で終端させる（マージまでは進めない）。個別の応答は override で差し替える。
// 構成は agent-call-budget.test.mjs の runScript と同じ（そちらは予算の検証専用の分岐を持つため共有しない）。
//
// ファイル名が `*.test.mjs` に一致しないため node --test の glob には拾われない（テストが import するライブラリ）。
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { stripMetaExport } from './workflow-script-contract.mjs'
import { trackTmp } from './tmp-track.mjs'
import { hashPrecheckReply } from './signed-output.mjs'

export const SCRIPT_PATH = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'scripts', 'implement-issue-tree.src.js')
const DRIVER_MARKER = ['__IMPLEMENT', 'ISSUE', 'TREE', 'DRIVER', 'START__'].join('_')

export const source = readFileSync(SCRIPT_PATH, 'utf8')
const markerIndex = source.indexOf(DRIVER_MARKER)
if (markerIndex < 0) throw new Error(`テスト境界マーカー ${DRIVER_MARKER} が実装スクリプトに存在しない`)
export const definitionPart = source.slice(0, source.lastIndexOf('\n', markerIndex))
export const driverPart = source.slice(markerIndex)

/**
 * 定義部（マーカーより上）をスライスして names を export したモジュールとして読み込む。
 * 実装スクリプトは `export const meta` 以外の top-level export を持てないため、スライス側で export を付ける。
 */
export async function importDefinitions(names, tag) {
  const dir = trackTmp(mkdtempSync(join(tmpdir(), `implement-issue-tree-${tag}-`)))
  const path = join(dir, 'defs.mjs')
  writeFileSync(path, `${definitionPart}\nexport { ${names.join(', ')} }\n`)
  return import(pathToFileURL(path).href)
}

const { declaredDepsChecksum, outOfTreeStateChecksum } = await importDefinitions(
  ['declaredDepsChecksum', 'outOfTreeStateChecksum'],
  'stub-run',
)

const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor
const scriptBody = stripMetaExport(source)

function buildTree(leaves) {
  const nodes = [{ number: 1, title: 'root', state: 'open', parent: 0, siblingIndex: 0, dependsOn: [], subIssuesTotal: leaves.length }]
  leaves.forEach((n, i) => nodes.push({ number: n, title: `issue ${n}`, state: 'open', parent: 1, siblingIndex: i, dependsOn: [], subIssuesTotal: 0 }))
  return nodes
}

/**
 * 測定スクリプトを使わない最小の引数（残置上限の両軸を無効化する）。skillDir は dryRun 以外で必須（Issue #603）。
 * stub agent は測定・観測スクリプトを実行しないため、値は検証を通る形式のダミーでよい。
 */
export const BASE_ARGS = { parent: 1, parallel: 1, maxResidualWorktrees: 0, maxResidualWorktreeBytes: 0, skillDir: '/repo/.claude/skills/implement-issue-tree' }

/**
 * @param {{ args: object, leaves?: number[], override?: (label: string, opts: object, prompt: string) => any }} params
 *   override が undefined 以外を返したらその値を応答にする。
 * @returns {Promise<{ result: any, calls: Array<{ prompt: string, opts: object }>, logs: string[] }>}
 */
export async function runScript({ args, leaves = [2], override = () => undefined }) {
  const nodes = buildTree(leaves)
  const calls = []
  const logs = []
  const handler = (prompt, opts) => {
    const label = opts.label
    const overridden = override(label, opts, prompt)
    if (overridden !== undefined) return overridden
    const n = Number(/#(\d+)/.exec(label)?.[1])
    if (label === 'nonce:seed') return { seedHex: 'b'.repeat(64) }
    if (label === 'script-hash-precheck') return hashPrecheckReply(prompt)
    if (label === 'worktree:untracked-scan') return { count: 0, paths: [] }
    if (label === 'state:load') return { ok: true, fileExisted: false, items: {}, highWaterBytes: 0, highWaterVersion: 0 }
    if (label === 'state:load-verify') return { fileExists: false, hashes: {}, keysSha256: '', keysCount: 0, highWaterBytes: 0, highWaterVersion: 0 }
    if (label === 'plan:issue-tree') return { nodes: structuredClone(nodes) }
    if (label === 'detect:external-checks') return { apps: [] }
    if (label.startsWith('plan:declared-deps')) {
      const m = /for n in ([0-9 ]+); do/.exec(prompt)
      return { entries: m[1].trim().split(' ').map(Number).map((x) => ({ number: x, deps: [], sig: declaredDepsChecksum(x, []) })) }
    }
    if (label.startsWith('plan:root-ancestors')) return { fetched: true, chain: [{ number: args.parent, parent: 0 }] }
    if (label.startsWith('plan:out-of-tree-deps')) {
      const m = /for n in ([0-9 ]+); do/.exec(prompt)
      return { entries: m[1].trim().split(' ').map(Number).map((x) => ({ number: x, state: 'OPEN', sig: outOfTreeStateChecksum(x, 'OPEN') })) }
    }
    if (label === 'worktree:orphan-scan') return { entries: [{ path: '/repo', branch: 'main', isMain: true }] }
    if (label === 'worktree:record-count') return { count: 1 }
    if (label.startsWith('plan:#')) return { plan: 'p', summary: 's' }
    if (label.startsWith('impl:#')) return { branch: `feat/${n}-x`, summary: 's', worktreePath: `/repo/wt/${n}` }
    // セキュリティ専用の Review（args.securityReview）も既定は ok（通常の Review と同じスキーマ）
    if (label.startsWith('review:#') || label.startsWith('security-review:#')) return { state: 'ok', highestSeverity: 'none', summary: 's', worktreePath: `/repo/wt/r${n}` }
    if (label.startsWith('fix:#')) return { pushed: false, summary: 'fixed', worktreePath: `/repo/wt/f${n}` }
    if (label.startsWith('pr-create:#')) return { prNumber: 1000 + n, summary: 's', worktreePath: `/repo/wt/p${n}`, checksStarted: true, mergeableAfterPush: 'MERGEABLE' }
    if (label.startsWith('pr-bind:#')) return { state: 'OPEN', headRefOid: 'a'.repeat(40), headRefName: `feat/${n}-x`, baseRefName: 'main', isCrossRepository: false, closingIssues: [n] }
    if (label.startsWith('merge:#')) return { state: 'blocked', blockedReason: 'quality', summary: '監視中断', unresolvedComments: [] }
    if (label.startsWith('state:')) return { ok: true }
    return null
  }
  const agent = async (prompt, opts) => {
    calls.push({ prompt, opts })
    await Promise.resolve()
    return handler(prompt, opts)
  }
  const fn = new AsyncFunction('args', 'agent', 'log', 'phase', scriptBody)
  const result = await fn(args, agent, (m) => { logs.push(m) }, () => {})
  return { result, calls, logs }
}
