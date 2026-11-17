// worktree 掃除の複合段（state:cleanup:#N の実行仕様なしの形）を、ホストが直接実行するための読み取りと検証（PR #851 の codex P1）。
//
// 役割: 生成物の updateStateDetailed は、追跡中の worktree を消して状態の worktree を空にする掃除（clearWorktreeAfterCleanup）だけ、
// 実行仕様（0 行目の iit-exec v1）を付けずに次の 2 段をモデルへ渡す。
//   1. `bash '<skillDir>/scripts/run-verified.sh' <sha256> worktree-remove.sh remove --mode … --path '<worktree>' …`
//   2. 結果の worktree の語が removed / not-registered / skipped のときだけ、
//      `bash '<skillDir>/scripts/run-verified.sh' <sha256> state.sh --file _/issue-trees/<parent>.json merge <<'STATE_EOF'`
//      （本文は `[{"numbers":[N],"patch":{"worktree":""}}]` の 1 行）で .items["N"].worktree を空にする。
// ランナーではこの段は隔離なし・読み取りの profile（writablePaths も recoverGit も無い）なので、モデルは worktree・gitdir の削除も
// 状態ファイルの書き込みもできない。Workflow 版（Claude Code）では同じ段がセッションの権限のサブエージェントとして書ける。
//
// 権限を足す（recoverGit と同じ形）のではなく、ホストが直接実行する理由:
//   - git worktree remove は gitdir（commondir・gitdir・config.worktree を含む）と worktree の .git を消す。recoverGit・iit_impl が
//     read に戻しているこれらを書けるようにすると、監査 e670648 の HIGH-1（commondir の付け替えで sandbox の外の git を偽の
//     共通ディレクトリへ向ける）の経路を開き直すことになる。
//   - worktree-remove.sh と state.sh は、実行仕様のある段（state:cleanup:#N の単独の掃除・state:update:#N）ですでにホストが
//     sandbox の外で直接実行している。worktree-remove.sh は sandbox の外での実行を前提に、付属 worktree の偽の git 設定を照合してから
//     git を呼ぶ（スクリプト冒頭の「付属 worktree の中の git」）。ここはその 2 本を、プロンプトに書かれた条件どおりに続けて起動するだけである。
//   - 2 段目を行うかの判断は、1 段目の結果の語だけで決まる（モデルの判断が要らない）。
//
// 読み取りは recover-git.mjs と同じく行単位の完全一致で、どちらの行もちょうど 1 つ、run-verified.sh を起動する行は全体で 2 つだけのときに限る。
// 値（sha256・パス・ブランチ名・状態ファイルの番号・イシュー番号）はプロンプトの行から取り、label の N と本文の numbers を束縛する。
// discard は結びつけ（--expect-branch・--branch・--require-missing のどれか 1 つ）が付いた形だけを読む（無い形は HEAD を照合せずに消すため）。
// 対象の worktree は、ホストが次を確かめたものに限る（checkCleanupTarget）:
//   - 字面で <main>/.claude/worktrees/ の直下（<main> は mainRoot そのもの、またはその realpath）。.claude/worktrees は symlink で外へ出ない
//   - 実体があれば、その realpath も同じ直下（symlink で外を指さない）でディレクトリ。実体が無い（手で消された）ときは拒まない
//     （拒むと状態の記録が消えないまま残る。worktree-remove.sh が not-registered か登録だけの片づけで扱う）
//   - <main>/.git/worktrees/ の下にその worktree を指す gitdir（中身が相対パスなら gitdir ファイルのディレクトリを基準に直す）があれば、ちょうど 1 つで、realpath がその直下、commondir が
//     <main>/.git を指し、worktree の .git ファイルがその gitdir を指す
//   - 状態ファイル（_/issue-trees/<parent>.json）の .items["N"].worktree が、そのパスか空文字（JSON マージが先に空にした形）
//
// 呼び出し元: lib/agent-host.mjs（label が CLEANUP_LABEL に当たり、0 行目が実行仕様でない呼び出し）。
import { lstatSync, readFileSync, readdirSync, realpathSync } from 'node:fs'
import { basename, dirname, isAbsolute, join, resolve } from 'node:path'
import { verifyWorktreeGitdir } from './worktree.mjs'
import { gitdirTarget } from './recover-git.mjs'

// runStateAgent がモデルを切り替えるときに付ける `:fallback-<model>` だけを許す（:retry 等は付かない）
export const CLEANUP_LABEL = /^state:cleanup:#([1-9][0-9]*)(?::fallback-[a-z0-9]+)*$/
// 2 段目を行う 1 段目の語（生成物のプロンプトの手順 2 の条件と同じ）
export const CLEAR_WORDS = Object.freeze(['removed', 'not-registered', 'skipped'])

// 生成物の worktreeQuote（単一引用符で囲む値の許可文字）と同じ
const Q = "'([A-Za-z0-9._/ -]+)'"
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/**
 * label とプロンプトから 2 段のコマンドを読む。
 * @param {string} label
 * @param {string} prompt  ホストが組んだプロンプト（前置きを足す前）
 * @param {{ skillDir: string }} p
 * @returns {null | { ok: false, reason: string } | { ok: true, issue: number, parent: number, path: string,
 *   remove: { sha256: string, argv: string[] }, state: { sha256: string, argv: string[], stdin: string } }}
 *   null は掃除の段でない（label が当たらない）
 */
export function parseCleanupPrompt(label, prompt, { skillDir }) {
  const lm = typeof label === 'string' ? CLEANUP_LABEL.exec(label) : null
  if (!lm) return null
  const no = (reason) => ({ ok: false, reason })
  if (typeof prompt !== 'string') return no('プロンプトが文字列でない')
  if (typeof skillDir !== 'string' || skillDir.includes("'")) return no('skillDir を引用符で囲めない')
  const issue = Number(lm[1])
  const launcher = `bash '${escapeRe(skillDir)}/scripts/run-verified\\.sh' ([0-9a-f]{64}) `
  const rmRe = new RegExp(`^${launcher}worktree-remove\\.sh remove --mode (superseded|discard) --path ${Q}(?: --expect-branch ${Q})?( --require-missing)?(?: --branch ${Q}(?: --base ${Q})?)?$`)
  const stRe = new RegExp(`^${launcher}state\\.sh --file _/issue-trees/([1-9][0-9]*)\\.json merge <<'STATE_EOF'$`)
  const lines = prompt.split('\n')
  // launcher を起動する行（引用符で閉じた launcher のパスを含む行）は 2 つだけ（注意書きの「run-verified.sh の exit 3 / 4」は数えない）
  if (lines.filter((l) => l.includes("run-verified.sh'")).length !== 2) return no('run-verified.sh を起動する行が 2 つでない')
  const rmAt = lines.flatMap((l, i) => (rmRe.test(l) ? [i] : []))
  const stAt = lines.flatMap((l, i) => (stRe.test(l) ? [i] : []))
  if (rmAt.length !== 1 || stAt.length !== 1) return no('worktree-remove.sh・state.sh の行がそれぞれ 1 つでない')
  if (!(rmAt[0] < stAt[0])) return no('worktree-remove.sh の行が state.sh の行より前にない')
  const r = rmRe.exec(lines[rmAt[0]])
  const s = stRe.exec(lines[stAt[0]])
  const body = `[{"numbers":[${issue}],"patch":{"worktree":""}}]`
  if (lines[stAt[0] + 1] !== body || lines[stAt[0] + 2] !== 'STATE_EOF') return no('state.sh の本文が label のイシューの worktree を空にする 1 行でない')
  const [, rmSha, mode, path, expectBranch, requireMissing, branch, base] = r
  // 生成物の worktreeRemoveRest が組める形のうち、src が実際に出す組み合わせだけ（discard 以外に結びつけは付かない・
  // --require-missing は他と併用しない・discard には結びつけが 1 つ要る）
  if (mode !== 'discard' && (expectBranch || requireMissing || branch)) return no('superseded に discard 専用の引数がある')
  if (requireMissing && (expectBranch || branch)) return no('--require-missing と他の結びつけが併用されている')
  if (expectBranch && branch) return no('--expect-branch と --branch が併用されている')
  // 結びつけの無い discard は、clean な worktree なら固有のコミットごと消す。src の discard の呼び出しはどれも結びつけを付ける
  // （--expect-branch・--branch・--require-missing）ので、無い形は状態ファイルの破損等で値が落ちたものとして実行しない
  if (mode === 'discard' && !expectBranch && !requireMissing && !branch) return no('discard に結びつけ（--expect-branch・--branch・--require-missing）が無い')
  const argv = ['remove', '--mode', mode, '--path', path]
  if (expectBranch) argv.push('--expect-branch', expectBranch)
  if (requireMissing) argv.push('--require-missing')
  if (branch) argv.push('--branch', branch, ...(base ? ['--base', base] : []))
  const parent = Number(s[2])
  return {
    ok: true,
    issue,
    parent,
    path,
    remove: { sha256: rmSha, argv },
    state: { sha256: s[1], argv: ['--file', `_/issue-trees/${parent}.json`, 'merge'], stdin: `${body}\n` },
  }
}

const lstatOrNull = (p) => {
  try { return lstatSync(p) } catch (e) { if (e?.code === 'ENOENT' || e?.code === 'ENOTDIR') return null; throw e }
}

/**
 * 掃除の対象をファイルシステムと状態ファイルで確かめる（何も書かない）。
 * @param {{ mainRoot: string, path: string, parent: number, issue: number }} p
 * @returns {{ ok: true } | { ok: false, reason: string }}
 */
export function checkCleanupTarget({ mainRoot, path, parent, issue }) {
  const no = (reason) => ({ ok: false, reason })
  try {
    const root = realpathSync(mainRoot)
    const wtParent = join(root, '.claude', 'worktrees')
    const commonDir = join(root, '.git')
    if (!lstatSync(commonDir).isDirectory()) return no('メインの .git がディレクトリでない')
    if (typeof path !== 'string' || !isAbsolute(path)) return no('パスが絶対パスでない')
    // .. の区間は扱わない（生成物の sanitizeWorktreePath と同じ）。. の区間・末尾の /・// は src の記録に残り得るため、
    // 位置の検査は正規化した形で行い、argv と状態の記録の照合は元の綴りのまま行う
    if (path.split('/').includes('..')) return no('パスに .. の区間がある')
    const p = resolve(path)
    if (basename(p) === '') return no('パスが worktree を指さない')
    if (dirname(p) !== wtParent && dirname(p) !== join(mainRoot, '.claude', 'worktrees')) return no('パスが <main>/.claude/worktrees/ の直下でない')
    // .claude/worktrees 自体が symlink 等で別の場所にあるときは扱わない（無ければ worktree も無い）
    if (lstatOrNull(join(root, '.claude', 'worktrees')) !== null && realpathSync(wtParent) !== wtParent) return no('.claude/worktrees がメイン worktree の外を指す')
    // 末尾の / があると lstat が symlink を辿るため、正規化した形で調べる
    const own = lstatOrNull(p)
    let real = null
    if (own !== null) {
      real = realpathSync(p)
      if (dirname(real) !== wtParent) return no('worktree の実体が <main>/.claude/worktrees/ の直下にない（symlink で外を指す）')
      if (!lstatSync(real).isDirectory()) return no('worktree の実体がディレクトリでない')
    }
    // この worktree を指す gitdir（<main>/.git/worktrees/<name>/gitdir の中身が <worktree>/.git）。中身が相対パス
    // （worktree.useRelativePaths=true）なら gitdir ファイルのディレクトリを基準に直して比べる（Issue #865。recover-git.mjs と同じ gitdirTarget）
    const wts = join(commonDir, 'worktrees')
    const want = new Set([`${p}/.git`, `${join(wtParent, basename(p))}/.git`, ...(real ? [`${real}/.git`] : [])])
    const names = lstatOrNull(wts) === null ? [] : readdirSync(wts)
    const found = names.filter((n) => {
      try { return want.has(gitdirTarget(join(wts, n))) } catch { return false }
    })
    if (found.length > 1) return no('この worktree を指す gitdir が 2 つ以上ある')
    if (found.length === 1) {
      const gitdir = verifyWorktreeGitdir(root, join(wts, found[0]))
      if (dirname(gitdir) !== wts) return no('gitdir が <main>/.git/worktrees/ の直下にない')
      const cd = readFileSync(join(gitdir, 'commondir'), 'utf8').replace(/\n$/, '')
      if (realpathSync(resolve(gitdir, cd)) !== commonDir) return no('gitdir の commondir がメインの .git を指さない')
      if (real !== null) {
        const dotGit = lstatOrNull(join(real, '.git'))
        if (dotGit === null || !dotGit.isFile()) return no('worktree の .git が通常ファイルでない')
        const g = /^gitdir: (.+)\n?$/.exec(readFileSync(join(real, '.git'), 'utf8'))
        if (!g || realpathSync(resolve(real, g[1])) !== gitdir) return no('worktree の .git が gitdir を指さない')
      }
    }
    // 状態ファイルの記録との束縛。JSON マージが先に worktree を空にした形（superseded で patch.worktree が空）も受ける
    const st = JSON.parse(readFileSync(join(root, '_', 'issue-trees', `${parent}.json`), 'utf8'))
    const rec = st?.items?.[String(issue)]?.worktree
    if (rec !== path && rec !== '') return no('状態ファイルの worktree の記録が対象のパスでも空文字でもない')
    return { ok: true }
  } catch (e) {
    return no(`確かめられない（${String(e?.code ?? e?.message ?? e).slice(0, 80)}）`)
  }
}
