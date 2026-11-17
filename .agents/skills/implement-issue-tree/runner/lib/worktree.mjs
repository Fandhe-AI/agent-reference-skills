// `agent(..., { isolation: 'worktree' })` の再現。Workflow ランタイムが行う worktree の作成を、
// ランナーの共通層が実 git で行う境界（計画 C の方針 4。仕様は _/local-plans/iit-runners-phase0.md の 0-5）。
//
// 再現する契約（過去ランの残骸ブランチ・reflog・状態ファイルからの実測）:
//   - パス: <メイン worktree>/.claude/worktrees/<runId>-<N>。ホストは `.claude/worktrees/` 接頭辞に依存する。
//   - ブランチ: worktree-<runId>-<N>。ホストは `worktree-wf_…` 形のブランチを命名違反として弾くため、
//     実装ブランチへ付け替えるのはエージェントの責務で、ここでは作らない。
//   - 起点: 作成時点の最新の origin/<既定ブランチ>（ローカル HEAD ではない）。
//   - runId は `wf_<16 進 8>-<16 進 3>`、N はラン内の agent() の通し番号（隔離しない呼び出しも数える）。
//   - 後始末はしない。ホストの台帳（ephemeralWorktrees）と worktree-remove.sh に任せる。ブランチも消えずに残る。
//
// 未確定（0-5 の「決めること」）: lock の形。既定ではホストの worktree-remove.sh / recover-prep.sh が
// 解釈する Claude Code の形（`claude agent <名前> (pid <N>)`）で、ランナーの pid を付けて lock する。
// 実際の Workflow が付ける lock は生きた worktree で未確認のため、`lock: false` で外せる。
//
// 失敗は例外（0-5 の方針: throw するのは worktree の作成失敗だけ）。git は引数配列で起動し、シェルを経由しない。
import { spawnSync } from 'node:child_process'
import { randomBytes } from 'node:crypto'
import { mkdirSync } from 'node:fs'
import { isAbsolute, join } from 'node:path'

const RUN_ID = /^wf_[0-9a-f]{8}-[0-9a-f]{3}$/

/** git の出力に載った URL の認証情報（`scheme://user:pass@host`）を伏せる。エラー文・ログへ流さないため。 */
export function maskUrlCredentials(text) {
  return String(text).replace(/([A-Za-z][A-Za-z0-9+.-]*:\/\/)[^\s/@]+@/g, '$1***@')
}

function git(cwd, args, { allowFail = false } = {}) {
  const r = spawnSync('git', args, { cwd, encoding: 'utf8', env: { ...process.env, GIT_TERMINAL_PROMPT: '0' } })
  if (r.status !== 0 && !allowFail) {
    throw new Error(`git ${args[0]} が失敗した（終了コード ${r.status}）: ${maskUrlCredentials((r.stderr || '').trim().split('\n')[0])}`)
  }
  return r.status === 0 ? r.stdout.trim() : null
}

/** `wf_<16 進 8>-<16 進 3>` 形の runId を作る。 */
export function newRunId() {
  const h = randomBytes(6).toString('hex')
  return `wf_${h.slice(0, 8)}-${h.slice(8, 11)}`
}

/** agent() 呼び出しの通し番号（1 始まり）を返すカウンタ。隔離しない呼び出しも数えるため、全呼び出しで next() する。 */
export function createSequencer() {
  let n = 0
  return { next: () => ++n, get count() { return n } }
}

export function worktreeNames(mainRoot, runId, n) {
  if (typeof mainRoot !== 'string' || !isAbsolute(mainRoot)) throw new Error(`メイン worktree のパスは絶対パスで渡す: ${String(mainRoot).slice(0, 80)}`)
  if (!RUN_ID.test(runId)) throw new Error(`runId の形が不正: ${runId}`)
  if (!Number.isInteger(n) || n < 1) throw new Error(`通し番号が不正: ${n}`)
  return {
    path: join(mainRoot, '.claude', 'worktrees', `${runId}-${n}`),
    branch: `worktree-${runId}-${n}`,
  }
}

/** cwd が属するリポジトリのメイン worktree の絶対パス（linked worktree の中から呼んでも本体を返す）。 */
export function resolveMainRoot(cwd) {
  const out = git(cwd, ['worktree', 'list', '--porcelain'])
  const first = out.split('\n').find((l) => l.startsWith('worktree '))
  if (!first) throw new Error('メイン worktree を特定できない')
  return first.slice('worktree '.length)
}

/** origin の既定ブランチ名。origin/HEAD が無ければ origin/main・origin/master の順に探す。 */
export function resolveDefaultBranch(mainRoot) {
  const head = git(mainRoot, ['symbolic-ref', '--short', 'refs/remotes/origin/HEAD'], { allowFail: true })
  if (head?.startsWith('origin/')) return head.slice('origin/'.length)
  for (const b of ['main', 'master']) {
    if (git(mainRoot, ['rev-parse', '--verify', '--quiet', `refs/remotes/origin/${b}`], { allowFail: true })) return b
  }
  throw new Error('origin の既定ブランチを特定できない')
}

/**
 * isolation: 'worktree' の worktree を作る。
 * @param {{ mainRoot: string, runId: string, n: number, baseBranch?: string, fetch?: boolean, lock?: boolean, pid?: number }} p
 * @returns {{ path: string, branch: string, baseBranch: string, baseSha: string }}
 */
export function createWorktree({ mainRoot, runId, n, baseBranch, fetch = true, lock = true, pid = process.pid }) {
  const { path, branch } = worktreeNames(mainRoot, runId, n)
  if (!Number.isInteger(pid) || pid < 1) throw new Error(`pid が不正: ${pid}`)
  const base = baseBranch ?? resolveDefaultBranch(mainRoot)
  // 名前の検証は git 自身の規則（`--branch` は @{-1} 等を展開するので、展開されず元の名前のままのものだけ通す）に、
  // シェルが特別扱いする文字を持たない制限を重ねる（git は `$(x)` のような名前も有効とするため）
  const checked = typeof base === 'string' && /^[A-Za-z0-9._\/-]+$/.test(base) && !base.startsWith('-') ? git(mainRoot, ['check-ref-format', '--branch', base], { allowFail: true }) : null
  if (checked !== base) throw new Error(`基点ブランチ名が不正: ${String(base).slice(0, 80)}`)
  // 「作成時点の最新の origin/<既定>」を起点にする。fetch の失敗は握りつぶさない（古い起点で隔離を作らない）
  if (fetch) git(mainRoot, ['fetch', '--quiet', 'origin', `+refs/heads/${base}:refs/remotes/origin/${base}`])
  const baseSha = git(mainRoot, ['rev-parse', '--verify', `refs/remotes/origin/${base}^{commit}`])
  mkdirSync(join(mainRoot, '.claude', 'worktrees'), { recursive: true })
  git(mainRoot, ['worktree', 'add', '--quiet', '--no-track', '-b', branch, '--', path, baseSha])
  if (lock) git(mainRoot, ['worktree', 'lock', '--reason', `claude agent ${runId}-${n} (pid ${pid})`, '--', path])
  return { path, branch, baseBranch: base, baseSha }
}
