// 回復の段（recover:#N）に足す git の書き込み先を、ホストが組んだプロンプトとファイルシステムから決める（PR #851 の P1）。
//
// 役割: recover:#N はモデルの段（隔離なし・cwd はメイン worktree・読み取りの profile）で、プロンプトの指示どおり
// `bash '<skillDir>/scripts/run-verified.sh' <sha256> recover-prep.sh --base '…' [--worktree '…'] [--branch '…']` を実行する。
// recover-prep.sh は base を取得し（<main>/.git の objects・refs・logs・packed-refs と FETCH_HEAD）、旧 worktree が
// 生きていれば未コミット変更を WIP コミットする（その worktree と <main>/.git/worktrees/<name>）。読み取りの profile の
// ままだとどちらも書けず、wipCommitted:false・baseFetched:false で回復が進まない。
//
// 旧 worktree のパスはモデルの報告ではなく、ホストのプロンプト（生成物の recoverPrompt が状態ファイルの検証済みの値で組んだ行）
// から取る。その行がちょうど 1 つでなければ（イシューのタイトル等に似た行が混ざった場合を含む）何も足さない。worktree の書き込みは、
// 実体が <main>/.claude/worktrees/ の直下にあり（symlink で外へ出ない）、<main>/.git/worktrees/ 直下にその worktree を指す
// gitdir がちょうど 1 つある場合だけ足す（行のパスは .. の区間を拒んだうえで正規化して調べ、gitdir の相対パスは gitdir ファイルの
// ディレクトリを基準に直して比べる。Issue #865・#866）。決められなければ base の取得に要る場所だけを足す（WIP コミットは失敗し、
// recover-prep.sh は wipCommitted:false を返して worktree は保全される）。
// .git/config・.git/hooks・gitdir の commondir・gitdir・config.worktree・worktree の .git ファイルはアダプタが read のまま残す。
// 比較と返すパスはメイン worktree の realpath を基準にする（mainRoot の途中の symlink〔macOS の /tmp → /private/tmp 等〕で
// 判定が外れないように。PR #851 の Bugbot。run.mjs は realpath 済みの mainRoot を渡すので、ランナーの経路では従来と同じ値になる）。
// アダプタの検証（adapters/codex.mjs の checkRecoverGit）も同じ基準で受ける。
//
// 呼び出し元: lib/agent-host.mjs（req.recoverGit）。アダプタ側の検証と profile は adapters/codex.mjs の checkRecoverGit・buildProfileArgs。
import { lstatSync, readdirSync, readFileSync, realpathSync } from 'node:fs'
import { dirname, isAbsolute, join, resolve } from 'node:path'
import { verifyWorktreeGitdir } from './worktree.mjs'

const RECOVER_LABEL = /^recover:#[1-9][0-9]*$/
// 生成物の worktreeQuote（単一引用符で囲む値の許可文字）と同じ
const Q = "'([A-Za-z0-9._/ -]+)'"
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/**
 * <main>/.git/worktrees/<name>/gitdir の中身（その worktree の .git のパス）を比べられる形にする。相対パス（worktree.useRelativePaths=true。
 * git 2.48 以降）は git と同じく gitdir ファイルのあるディレクトリを基準に絶対パスへ直す（Issue #865）。絶対パスは字面のまま返す。
 * cleanup-host.mjs の checkCleanupTarget も使う。読めなければ例外。
 * @param {string} adminDir  <main>/.git/worktrees/<name>
 * @returns {string}
 */
export function gitdirTarget(adminDir) {
  const c = readFileSync(join(adminDir, 'gitdir'), 'utf8').replace(/\n$/, '')
  return isAbsolute(c) ? c : resolve(adminDir, c)
}

/**
 * @param {string} label
 * @param {string} prompt  ホストが組んだプロンプト（前置きを足す前）
 * @param {{ skillDir: string, mainRoot: string }} p
 * @returns {null | { commonDir: string, worktree: string|null, gitdir: string|null }}
 *   null は回復の段でない・プロンプトの行が 1 つに決まらない（何も足さない）
 */
export function recoverGitFor(label, prompt, { skillDir, mainRoot }) {
  if (!RECOVER_LABEL.test(label) || typeof prompt !== 'string') return null
  if (skillDir.includes("'")) return null
  const re = new RegExp(`^bash '${escapeRe(skillDir)}/scripts/run-verified\\.sh' [0-9a-f]{64} recover-prep\\.sh --base ${Q}(?: --worktree ${Q})?(?: --branch ${Q})?$`)
  const hits = prompt.split('\n').map((l) => re.exec(l)).filter(Boolean)
  if (hits.length !== 1) return null
  let root
  try { root = realpathSync(mainRoot) } catch { return null }
  const commonDir = join(root, '.git')
  try { if (!lstatSync(commonDir).isDirectory()) return null } catch { return null }
  const fetchOnly = { commonDir, worktree: null, gitdir: null }
  const wt = hits[0][2]
  // .. の区間は扱わない（生成物の sanitizeWorktreePath と同じ。cleanup-host.mjs の checkCleanupTarget と揃える）。. の区間・末尾の /・// は
  // 状態ファイルの記録（実装エージェントの自己申告の worktreePath）に残り得るため、正規化した形で調べる（Issue #866）。
  // 位置の検査（下の realpath が .claude/worktrees の直下か）は正規化の後でも同じ厳しさで効く（.. を先に拒むので、resolve は綴りを畳むだけ）
  if (wt === undefined || !isAbsolute(wt) || wt.split('/').includes('..')) return fetchOnly
  const p = resolve(wt)
  let real, parent
  try {
    real = realpathSync(p)
    parent = realpathSync(join(root, '.claude', 'worktrees'))
    if (!lstatSync(real).isDirectory()) return fetchOnly
  } catch {
    return fetchOnly // 実体が無い（dead worktree）: WIP コミットは無い
  }
  // .claude/worktrees 自体が symlink 等で別の場所にあるときも足さない（アダプタは <main>/.claude/worktrees/ の直下の形だけを受ける）。
  // 比べる相手は解決したメイン worktree の下の未解決の .claude/worktrees（両辺を realpath にすると自明に一致して、この判定が消える）
  if (dirname(real) !== parent || parent !== join(root, '.claude', 'worktrees')) return fetchOnly
  const wts = join(commonDir, 'worktrees')
  let names
  try { names = readdirSync(wts) } catch { return fetchOnly }
  const want = new Set([`${p}/.git`, `${real}/.git`])
  const found = names.filter((n) => {
    try { return want.has(gitdirTarget(join(wts, n))) } catch { return false }
  })
  if (found.length !== 1) return fetchOnly
  try {
    const gitdir = verifyWorktreeGitdir(root, join(wts, found[0]))
    return dirname(gitdir) === wts ? { commonDir, worktree: real, gitdir } : fetchOnly
  } catch {
    return fetchOnly
  }
}
