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
// add の後（lock・gitdir の検証）で失敗したら、作った worktree とブランチを片づけてから例外にする（ホストはパスを知らないため）。
// add 自体の失敗（時間切れで止めた途中状態を含む）では、add の前に無かったもの（ブランチ・worktree の登録・パス）だけを片づける。
// 状態の確認は「無い」と「調べられない」（読み取りエラー・起動失敗・時間切れ）を分ける。add の前に調べられなければ add へ進まず、
// add の後に調べられなければ消さずに文面へ足す（既にあったものを今回のものと取り違えて消さない）。
//
// git の環境: 継いだ GIT_DIR 等（gitLocationFreeEnv）を外して起動する。残すと git は cwd ではなくその変数が指す
// リポジトリを対象にする（シェル側は worktree-remove.sh・recover-prep.sh が unset している）。
// createWorktree の git は非同期で、時間切れ（fetch とそれ以外で別の上限）を付ける。origin が応答しないときに
// イベントループごと止めない（並行するエージェントのタイマ・シグナル処理・並列の枠を止めない）。時間切れはまず SIGTERM を送り
// （git が *.lock を片づけられるように）、終わらなければ猶予の後に SIGKILL する。
// 同じ mainRoot への createWorktree の git（fetch〜add〜lock〜gitdir の検証、失敗時の片づけまで）はキュー（serialize）で
// 1 本ずつ流す。非同期にしたことで並列の呼び出しが同じ origin/<既定> を同時に更新したり、片づけ（worktree remove・
// branch -D）が別の worktree add と重なったりして、ref・管理領域・packed-refs の lock の競合で失敗し得るため。
import { spawn, spawnSync } from 'node:child_process'
import { randomBytes } from 'node:crypto'
import { existsSync, lstatSync, mkdirSync, realpathSync, rmSync } from 'node:fs'
import { basename, dirname, isAbsolute, join } from 'node:path'

const RUN_ID = /^wf_[0-9a-f]{8}-[0-9a-f]{3}$/

/** git の出力に載った URL の認証情報（`scheme://user:pass@host`）を伏せる。エラー文・ログへ流さないため。 */
export function maskUrlCredentials(text) {
  return String(text).replace(/([A-Za-z][A-Za-z0-9+.-]*:\/\/)[^\s/@]+@/g, '$1***@')
}

/**
 * リポジトリの位置・中身の解釈を変える git の環境変数。`git rev-parse --local-env-vars`（git がサブモジュール等の
 * 別リポジトリへ入るときに外す一覧）に、探索の範囲を変えるもの（GIT_CEILING_DIRECTORIES・GIT_DISCOVERY_ACROSS_FILESYSTEM・
 * GIT_NAMESPACE）と実行ファイルの場所（GIT_EXEC_PATH）、古い git の一覧にあった GIT_INTERNAL_SUPER_PREFIX を足したもの。GIT_CONFIG_KEY_<n>・GIT_CONFIG_VALUE_<n> も外す
 * （GIT_CONFIG_COUNT と組で -c と同じ設定になるため）。GIT_CONFIG_GLOBAL・GIT_CONFIG_SYSTEM・GIT_CONFIG_NOSYSTEM は
 * 位置を変えない利用者の設定なので残す。
 */
export const GIT_LOCATION_ENV_VARS = Object.freeze([
  'GIT_ALTERNATE_OBJECT_DIRECTORIES', 'GIT_CONFIG', 'GIT_CONFIG_PARAMETERS', 'GIT_CONFIG_COUNT', 'GIT_OBJECT_DIRECTORY',
  'GIT_DIR', 'GIT_WORK_TREE', 'GIT_IMPLICIT_WORK_TREE', 'GIT_GRAFT_FILE', 'GIT_INDEX_FILE', 'GIT_NO_REPLACE_OBJECTS',
  'GIT_REPLACE_REF_BASE', 'GIT_PREFIX', 'GIT_SHALLOW_FILE', 'GIT_COMMON_DIR',
  // 2.40 より前の git の --local-env-vars に含まれる（古い git の環境から起動されても外す）
  'GIT_INTERNAL_SUPER_PREFIX',
  'GIT_CEILING_DIRECTORIES', 'GIT_DISCOVERY_ACROSS_FILESYSTEM', 'GIT_NAMESPACE', 'GIT_EXEC_PATH',
])
const GIT_LOCATION_ENV = new Set(GIT_LOCATION_ENV_VARS)
const GIT_CONFIG_PAIR = /^GIT_CONFIG_(?:KEY|VALUE)_\d+$/

/**
 * env から GIT_LOCATION_ENV_VARS と GIT_CONFIG_KEY_<n>・GIT_CONFIG_VALUE_<n> を外した写しを返す（元は変えない）。
 * ランナーが起動する git・gh・Codex の子へ渡す env はこれを通す（run.mjs・adapters/codex.mjs）。
 */
export function gitLocationFreeEnv(env = process.env) {
  const out = {}
  for (const [k, v] of Object.entries(env)) if (!GIT_LOCATION_ENV.has(k) && !GIT_CONFIG_PAIR.test(k)) out[k] = v
  return out
}

/** ランナー自身が起動する git の env（gitLocationFreeEnv に、認証の入力で止まらない GIT_TERMINAL_PROMPT=0 を足す）。 */
export function gitSafeEnv(env = process.env) {
  return { ...gitLocationFreeEnv(env), GIT_TERMINAL_PROMPT: '0' }
}

const gitFailure = (args, status, stderr) => new Error(`git ${args[0]} が失敗した（終了コード ${status}）: ${maskUrlCredentials((stderr || '').trim().split('\n')[0])}`)

// 同期の git（起動時だけ使う resolveMainRoot と、ローカルの参照だけを読む resolveDefaultBranch）。通信はしないが上限は付ける
const SYNC_GIT_TIMEOUT_MS = 120_000
function git(cwd, args, { allowFail = false } = {}) {
  const r = spawnSync('git', args, { cwd, encoding: 'utf8', env: gitSafeEnv(), timeout: SYNC_GIT_TIMEOUT_MS, killSignal: 'SIGKILL' })
  if (r.status !== 0 && !allowFail) {
    if (r.error) throw new Error(`git ${args[0]} が失敗した（${r.error.code === 'ETIMEDOUT' ? `${SYNC_GIT_TIMEOUT_MS} ms で時間切れ` : String(r.error.code ?? r.error.message).slice(0, 80)}）`)
    throw gitFailure(args, r.status, r.stderr)
  }
  return r.status === 0 ? r.stdout.trim() : null
}

/** createWorktree の git の既定の上限（fetch は origin との通信を含むので長め）。設定の timeoutsSec.worktree で変えられる（run.mjs）。 */
export const DEFAULT_FETCH_TIMEOUT_MS = 300_000
export const DEFAULT_GIT_TIMEOUT_MS = 120_000
/** 時間切れの SIGTERM から SIGKILL までの既定の猶予（adapters/codex.mjs の killGraceMs・agent-host の spawnScript と同じ値）。 */
export const DEFAULT_GIT_KILL_GRACE_MS = 2000
// 標準出力・標準エラーの保持の上限。標準出力は rev-parse の 1 行のほか、isRegistered・unlockOwnWorktree・relockOwnWorktree が
// `worktree list --porcelain` の全体を読む。切った一覧では登録を「無い」と読み違えるため、標準出力が上限を超えた呼び出しは
// 成功として返さない（gitAsync）。標準エラーは失敗文の 1 行目だけを使うので、超えても切るだけにする
const MAX_GIT_OUTPUT_BYTES = 1024 * 1024

// 実行中の非同期 git（プロセスグループの長）。detached で端末の Ctrl-C が届かないため、ランナーの終了時に
// killGitSync が同期で止める（agent-host の killScriptsSync と同じ扱い。LOW-11）
const liveGits = new Set()

/** 実行中の非同期 git のプロセスグループを同期で SIGKILL する（run.mjs の process の exit・シグナルの処理から呼ぶ）。 */
export function killGitSync() {
  for (const c of liveGits) {
    try { process.kill(-c.pid, 'SIGKILL') } catch { try { c.kill('SIGKILL') } catch { /* 既に終了 */ } }
  }
  liveGits.clear()
}

/**
 * 非同期の git。detached（setsid）で制御端末から外し、ssh が /dev/tty で尋ねて止まらないようにする。
 * timeoutMs を超えたらプロセスグループへ SIGTERM を送る（git は SIGTERM なら作りかけの *.lock〔index.lock・refs の lock〕を消して終わる。
 * SIGKILL では消えずに残り、後続の git が lock で失敗する）。git が終わったら（exit）、グループの残りを SIGKILL してから例外にする
 * （後続の git〔add の失敗の片づけ等〕が死にかけの git と重ならないように）。killGraceMs を過ぎても終わらなければ SIGKILL を送り、
 * 終了を待たずに例外にする（パイプを握った孫で待ち続けない。close ではなく exit で決着するのも同じ理由）。
 * 成功なら標準出力（前後の空白を除く）、allowFail で失敗なら null。allowExit に挙げた終了コードも null（それ以外の失敗は例外）。
 * 標準出力が MAX_GIT_OUTPUT_BYTES を超えたら、終了コードによらず失敗にする（allowFail なら null、そうでなければ例外。
 * allowExit の null は「無い」の意味で使われるため、そちらでは null にしない）。
 */
function gitAsync(cwd, args, { timeoutMs, killGraceMs = DEFAULT_GIT_KILL_GRACE_MS, allowFail = false, allowExit = [] }) {
  return new Promise((resolve, reject) => {
    const spawnFailure = (e) => new Error(`git ${args[0]} を起動できない: ${String(e?.code ?? e?.message ?? e).slice(0, 80)}`)
    let child
    try {
      child = spawn('git', args, { cwd, env: gitSafeEnv(), stdio: ['ignore', 'pipe', 'pipe'], detached: true })
    } catch (e) {
      reject(spawnFailure(e))
      return
    }
    if (child.pid !== undefined) liveGits.add(child)
    const out = []
    const err = []
    let outBytes = 0
    let errBytes = 0
    let settled = false
    let timedOut = false
    let timer = null
    let killTimer = null
    const settle = (fn) => {
      if (settled) return
      settled = true
      clearTimeout(timer)
      clearTimeout(killTimer)
      liveGits.delete(child)
      fn()
    }
    const signalGroup = (sig) => {
      try { process.kill(-child.pid, sig) } catch { try { child.kill(sig) } catch { /* 既に終了 */ } }
    }
    // 時間切れの決着。自分の側のパイプを閉じる（グループの外へ逃げた孫が握っていても、このプロセスを引き留めない）
    const failTimedOut = () => settle(() => {
      child.stdout.destroy()
      child.stderr.destroy()
      reject(new Error(`git ${args[0]} が ${timeoutMs} ms で時間切れになった（プロセスグループを止めた）`))
    })
    timer = setTimeout(() => {
      timedOut = true
      signalGroup('SIGTERM')
      killTimer = setTimeout(() => { signalGroup('SIGKILL'); failTimedOut() }, killGraceMs)
    }, timeoutMs)
    // SIGTERM で終わった: グループに残った子・孫を止めてから決着する（回収直後に送るので pid の再利用で別のグループは撃たない）
    child.on('exit', () => { if (timedOut) { signalGroup('SIGKILL'); failTimedOut() } })
    child.stdout.on('data', (b) => { if (outBytes < MAX_GIT_OUTPUT_BYTES) out.push(b); outBytes += b.length })
    child.stderr.on('data', (b) => { if (errBytes < MAX_GIT_OUTPUT_BYTES) err.push(b); errBytes += b.length })
    child.on('error', (e) => settle(() => reject(spawnFailure(e))))
    child.on('close', (code) => {
      // 時間切れの後に閉じた（exit より先に届いた場合も）: 終了コードによらず時間切れとして決着する
      if (timedOut) { failTimedOut(); return }
      settle(() => closeResult(code))
    })
    const closeResult = (code) => {
      if (outBytes > MAX_GIT_OUTPUT_BYTES) {
        if (allowFail) resolve(null)
        else reject(new Error(`git ${args[0]} の標準出力が上限（${MAX_GIT_OUTPUT_BYTES} バイト）を超えた（切った出力は使わない）`))
      } else if (code === 0) resolve(Buffer.concat(out).toString('utf8').trim())
      else if (allowFail || allowExit.includes(code)) resolve(null)
      else reject(gitFailure(args, code, Buffer.concat(err).toString('utf8')))
    }
  })
}

// mainRoot ごとの直列化のキュー（最後に積んだ処理の Promise。失敗も成功として扱い、後続を止めない）
const queues = new Map()

/** 同じ key の fn を積んだ順に 1 本ずつ実行する。戻り値は fn の結果（失敗はそのまま投げる）。 */
function serialize(key, fn) {
  const run = (queues.get(key) ?? Promise.resolve()).then(fn)
  const tail = run.then(() => {}, () => {})
  queues.set(key, tail)
  tail.then(() => { if (queues.get(key) === tail) queues.delete(key) })
  return run
}

/**
 * mainRoot のリポジトリの管理領域・ref を書く処理を、createWorktree と同じキューで 1 本ずつ流す。agent-host が直接実行する
 * worktree-remove.sh（worktree remove・prune・branch -D）と recover-prep.sh（ref の更新）は、別のエージェントの createWorktree
 * （fetch・worktree add）と並行し得るため、この関数を通して packed-refs・worktrees/ の lock の競合を避ける。
 * fn の失敗はそのまま投げ、後続は止めない。fn の中から同じ mainRoot の createWorktree・unlockOwnWorktree 等を待ってはならない（自分を待つ）。
 */
export function runExclusive(mainRoot, fn) {
  let queueKey = mainRoot
  try { queueKey = realpathSync(mainRoot) } catch { /* 渡された形のまま */ }
  return serialize(queueKey, fn)
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
 * linked worktree の git ディレクトリ（`<mainRoot>/.git/worktrees/<name>`）を検証して realpath を返す。
 * realpath の親がメインの `.git/worktrees` の realpath と一致しなければ例外。Codex アダプタはこの値だけを
 * permission profile の書き込み可に入れ、worktree の `.git` ファイルは読まない（監査 e670648 の HIGH-2。
 * `.git` はエージェントが書き換え得るため、中身を信じると書き込み範囲を任意のパスへ広げられる）。
 * 基準は Codex アダプタの worktreeGit と同じ: `.git/worktrees` の realpath が `<mainRoot の realpath>/.git/worktrees`
 * そのもの（`.git`・`.git/worktrees` が symlink でない）であることも要求する。mainRoot の途中の symlink は解決して通す。
 * 片方だけが通すと、作成は成功して隔離の段がすべて denied になり、lock 済みの worktree が残る。
 */
export function verifyWorktreeGitdir(mainRoot, gitdir) {
  if (typeof gitdir !== 'string' || !isAbsolute(gitdir)) throw new Error(`worktree の git ディレクトリが絶対パスでない: ${String(gitdir).slice(0, 80)}`)
  let real, parent, rootReal
  try {
    real = realpathSync(gitdir)
    parent = realpathSync(join(mainRoot, '.git', 'worktrees'))
    rootReal = realpathSync(mainRoot)
  } catch (e) {
    throw new Error(`worktree の git ディレクトリを解決できない: ${String(e?.code ?? e?.message ?? e).slice(0, 80)}`)
  }
  if (parent !== join(rootReal, '.git', 'worktrees')) {
    throw new Error(`メインの .git が symlink のリポジトリ（.git/worktrees の実体が ${parent.slice(0, 160)}）は隔離の段に対応しない`)
  }
  if (dirname(real) !== parent || basename(real) === '') throw new Error(`worktree の git ディレクトリがメインの .git/worktrees/ の直下に無い: ${real.slice(0, 160)}`)
  return real
}

/**
 * isolation: 'worktree' の worktree を作る（非同期。git は時間切れ付きで起動し、イベントループを止めない）。
 * gitdir は作成直後（エージェントが触る前）に git へ問い合わせて検証した値（verifyWorktreeGitdir）。
 * 同じ mainRoot への git 操作（fetch〜add〜lock〜検証、失敗時の片づけまで）は 1 つのキューで直列にする
 * （並列の呼び出しで origin/<既定> の更新や管理領域・packed-refs の書き込みが競合しないように）。
 * add 自体が失敗したら（時間切れで止めた途中状態を含む）、add の前に無かったブランチ・登録・パスだけを片づける。
 * add の前の状態を調べられなければ add へ進まず例外。add の後に調べられなかったものは消さず、文面に足す。
 * add の後の lock・gitdir の検証が失敗したら、作った worktree とブランチを片づけてから元の例外を投げる。
 * 片づけも失敗したら、残ったパス・ブランチを例外の文面に足す（利用者が手で消せるように）。
 * @param {{ mainRoot: string, runId: string, n: number, baseBranch?: string, fetch?: boolean, lock?: boolean, pid?: number,
 *   fetchTimeoutMs?: number, gitTimeoutMs?: number, gitKillGraceMs?: number }} p
 * @returns {Promise<{ path: string, branch: string, baseBranch: string, baseSha: string, gitdir: string, lockReason: string|null }>}
 *   lockReason は付けた lock の理由（lock: false なら null）。agent-host が unlockOwnWorktree の照合に使う
 */
export async function createWorktree({ mainRoot, runId, n, baseBranch, fetch = true, lock = true, pid = process.pid, fetchTimeoutMs = DEFAULT_FETCH_TIMEOUT_MS, gitTimeoutMs = DEFAULT_GIT_TIMEOUT_MS, gitKillGraceMs = DEFAULT_GIT_KILL_GRACE_MS }) {
  const { path, branch } = worktreeNames(mainRoot, runId, n)
  if (!Number.isInteger(pid) || pid < 1) throw new Error(`pid が不正: ${pid}`)
  for (const [name, v] of [['fetchTimeoutMs', fetchTimeoutMs], ['gitTimeoutMs', gitTimeoutMs], ['gitKillGraceMs', gitKillGraceMs]]) {
    if (!Number.isInteger(v) || v < 1) throw new Error(`${name} が不正: ${String(v).slice(0, 40)}`)
  }
  const g = (cwd, args, opts = {}) => gitAsync(cwd, args, { timeoutMs: gitTimeoutMs, killGraceMs: gitKillGraceMs, ...opts })
  const base = baseBranch ?? resolveDefaultBranch(mainRoot)
  // 名前の検証は git 自身の規則（`--branch` は @{-1} 等を展開するので、展開されず元の名前のままのものだけ通す）に、
  // シェルが特別扱いする文字を持たない制限を重ねる（git は `$(x)` のような名前も有効とするため）
  const checked = typeof base === 'string' && /^[A-Za-z0-9._\/-]+$/.test(base) && !base.startsWith('-') ? await g(mainRoot, ['check-ref-format', '--branch', base], { allowFail: true }) : null
  if (checked !== base) throw new Error(`基点ブランチ名が不正: ${String(base).slice(0, 80)}`)
  let queueKey = mainRoot
  try { queueKey = realpathSync(mainRoot) } catch { /* 解決できなければ渡された形のまま（後の git が失敗を返す） */ }
  return serialize(queueKey, async () => {
    // 「作成時点の最新の origin/<既定>」を起点にする。fetch の失敗・時間切れは握りつぶさない（古い起点で隔離を作らない）
    if (fetch) await g(mainRoot, ['fetch', '--quiet', 'origin', `+refs/heads/${base}:refs/remotes/origin/${base}`], { timeoutMs: fetchTimeoutMs })
    const sha = await g(mainRoot, ['rev-parse', '--verify', `refs/remotes/origin/${base}^{commit}`])
    mkdirSync(join(mainRoot, '.claude', 'worktrees'), { recursive: true })
    // add の前にあったもの（同じ番号の衝突等）は、add が失敗しても片づけない。調べられなければ（null）add へ進まない
    const before = await probeState(mainRoot, path, branch, g)
    const unprobed = STATE_KINDS.filter((k) => before[k] === null)
    if (unprobed.length > 0) throw new Error(`worktree add の前の状態を調べられない（${unprobed.map((k) => STATE_LABEL[k]).join('・')}）。既にあるものを消さないよう作成をやめた`)
    try {
      await g(mainRoot, ['worktree', 'add', '--quiet', '--no-track', '-b', branch, '--', path, sha])
    } catch (e) {
      // 時間切れで止めた add は、ブランチ・登録・パスを作った途中で残り得る。今回新しく現れたと確かめられたものだけを片づける。
      // 後の調べが失敗した（null）ものは消さずに文面へ足す。登録を調べられなければ、ディレクトリも登録済みの worktree かもしれないので消さない
      const after = await probeState(mainRoot, path, branch, g)
      if (after.worktree === null) after.path = null
      const made = {}
      const unknown = []
      for (const k of STATE_KINDS) {
        made[k] = !before[k] && after[k] === true
        if (!before[k] && after[k] === null) unknown.push(k === 'branch' ? `ブランチ ${branch}` : `${k === 'worktree' ? 'worktree' : 'パス'} ${path}`)
      }
      const err = made.worktree || made.branch || made.path ? await discardCreated(mainRoot, path, branch, e, g, made) : e
      if (unknown.length > 0) {
        err.message = `${err.message}（add の後の状態を調べられず、片づけていない: ${unknown.join('・')}。今回作られたものなら手で消す: git worktree remove --force / git branch -D）`
      }
      throw err
    }
    // lock・検証とその失敗の片づけもキューの中で行う（片づけが同じリポジトリの別の add と重ならないように）
    try {
      const lockReason = lock ? `claude agent ${runId}-${n} (pid ${pid})` : null
      if (lock) await g(mainRoot, ['worktree', 'lock', '--reason', lockReason, '--', path])
      const gitdir = verifyWorktreeGitdir(mainRoot, await g(path, ['rev-parse', '--absolute-git-dir']))
      return { path, branch, baseBranch: base, baseSha: sha, gitdir, lockReason }
    } catch (e) {
      throw await discardCreated(mainRoot, path, branch, e, g)
    }
  })
}

/**
 * このランナーが createWorktree で付けた lock だけを外す（Phase 4。ランナーは自分の pid で lock し、同じプロセスが worktree-remove.sh を
 * 起動するため、スクリプトからは lock が常に生存と見え、旧 worktree が retained-locked で残った）。`git worktree list --porcelain` の
 * その worktree の `locked <理由>` が reason と完全一致するときだけ unlock する（利用者・別のセッションが付け直した lock は外さない）。
 * 汚れ・submodule・登録の判定はしない（呼び出し後の worktree-remove.sh が行う）。同じ mainRoot の createWorktree と同じキューで直列にする。
 * @returns {Promise<'unlocked'|'not-locked'|'other-lock'|'unregistered'|'error'>}
 */
export async function unlockOwnWorktree({ mainRoot, path, reason, gitTimeoutMs = DEFAULT_GIT_TIMEOUT_MS, gitKillGraceMs = DEFAULT_GIT_KILL_GRACE_MS }) {
  if (typeof path !== 'string' || !isAbsolute(path) || typeof reason !== 'string' || reason === '' || reason.includes('\n')) return 'error'
  const g = (args) => gitAsync(mainRoot, args, { timeoutMs: gitTimeoutMs, killGraceMs: gitKillGraceMs })
  let queueKey = mainRoot
  try { queueKey = realpathSync(mainRoot) } catch { /* 渡された形のまま */ }
  return serialize(queueKey, async () => {
    try {
      const block = (await g(['worktree', 'list', '--porcelain'])).split('\n\n').map((b) => b.split('\n')).find((ls) => ls[0] === `worktree ${path}`)
      if (!block) return 'unregistered'
      const locked = block.find((l) => l === 'locked' || l.startsWith('locked '))
      if (locked === undefined) return 'not-locked'
      if (locked !== `locked ${reason}`) return 'other-lock'
      await g(['worktree', 'unlock', '--', path])
      return 'unlocked'
    } catch {
      return 'error'
    }
  })
}

/**
 * unlockOwnWorktree で外した lock を、スクリプトが worktree を残したとき（retained-dirty 等）に付け直す。登録があり lock が無いときだけ
 * reason で lock する（別の lock が付いていれば触らない）。
 * @returns {Promise<'relocked'|'locked'|'unregistered'|'error'>}
 */
export async function relockOwnWorktree({ mainRoot, path, reason, gitTimeoutMs = DEFAULT_GIT_TIMEOUT_MS, gitKillGraceMs = DEFAULT_GIT_KILL_GRACE_MS }) {
  if (typeof path !== 'string' || !isAbsolute(path) || typeof reason !== 'string' || reason === '' || reason.includes('\n')) return 'error'
  const g = (args) => gitAsync(mainRoot, args, { timeoutMs: gitTimeoutMs, killGraceMs: gitKillGraceMs })
  let queueKey = mainRoot
  try { queueKey = realpathSync(mainRoot) } catch { /* 渡された形のまま */ }
  return serialize(queueKey, async () => {
    try {
      const block = (await g(['worktree', 'list', '--porcelain'])).split('\n\n').map((b) => b.split('\n')).find((ls) => ls[0] === `worktree ${path}`)
      if (!block) return 'unregistered'
      if (block.some((l) => l === 'locked' || l.startsWith('locked '))) return 'locked'
      await g(['worktree', 'lock', '--reason', reason, '--', path])
      return 'relocked'
    } catch {
      return 'error'
    }
  })
}

const STATE_KINDS = ['worktree', 'branch', 'path']
const STATE_LABEL = { worktree: '登録', branch: 'ブランチ', path: 'パス' }

/** 登録・ブランチ・パスの有無（true / false、調べられなければ null）。 */
async function probeState(mainRoot, path, branch, g) {
  return { worktree: await isRegistered(mainRoot, path, g), branch: await branchExists(mainRoot, branch, g), path: pathExists(path) }
}

/** path が mainRoot のリポジトリの worktree として登録されているか（一覧を取れなければ〔失敗・時間切れ〕null）。 */
async function isRegistered(mainRoot, path, g) {
  try {
    return (await g(mainRoot, ['worktree', 'list', '--porcelain'])).split('\n').includes(`worktree ${path}`)
  } catch {
    return null
  }
}

/**
 * ローカルブランチ branch があるか。show-ref の --verify --quiet は、無いときだけ終了コード 1 を返す。
 * それ以外の失敗（参照を読めない 128 等・起動失敗・時間切れ）は「無い」と区別して null にする。
 */
async function branchExists(mainRoot, branch, g) {
  try {
    return (await g(mainRoot, ['show-ref', '--verify', '--quiet', `refs/heads/${branch}`], { allowExit: [1] })) !== null
  } catch {
    return null
  }
}

/** path に何かあるか（symlink はリンク先を見ずに「ある」）。ENOENT だけを「無い」とし、ほかのエラー（権限等）は null。 */
function pathExists(path) {
  try {
    lstatSync(path)
    return true
  } catch (e) {
    return e?.code === 'ENOENT' ? false : null
  }
}

/**
 * 今回作った worktree・ブランチ・パスを片づけ、投げる例外を返す（元の文面を保ち、片づけの失敗はその後ろに足す）。
 * 作成直後でエージェントは触っていないので、変更の有無を見ずに消す。lock 済み（lock の後の検証で失敗）なら先に外す。
 * made で片づける対象を絞る（add 自体の失敗では、add の前に無かったものだけ。add の後の失敗ではすべて）。
 */
async function discardCreated(mainRoot, path, branch, original, g, made = { worktree: true, branch: true, path: true }) {
  const left = []
  if (made.worktree) {
    await g(mainRoot, ['worktree', 'unlock', '--', path], { allowFail: true }).catch(() => null)
    if (!(await g(mainRoot, ['worktree', 'remove', '--force', '--', path]).then(() => true, () => false))) left.push(`worktree ${path}`)
  } else if (made.path && existsSync(path)) {
    // 登録の前に止まった add のディレクトリ（add の前には無かった）
    try { rmSync(path, { recursive: true, force: true }) } catch { left.push(`パス ${path}`) }
  }
  // worktree が残っているとブランチは消せない（チェックアウト中）。消せなかった分だけ文面に足す
  if (made.branch && !(await g(mainRoot, ['branch', '-D', branch]).then(() => true, () => false))) left.push(`ブランチ ${branch}`)
  const e = original instanceof Error ? original : new Error(String(original))
  if (left.length > 0) {
    e.message = `${e.message}（作った worktree の片づけにも失敗した。残っている: ${left.join('・')}。手で消す: git worktree unlock / git worktree remove --force / git branch -D）`
  }
  return e
}
