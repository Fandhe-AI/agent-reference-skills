// ランナーの Codex アダプタ。1 エージェント = 1 つの `codex exec` プロセス（修復ターンは `codex exec resume`）。
// 契約は _/local-plans/iit-runner-adapter-contract.md、実測と決定は _/local-plans/iit-runners-phase0.md の
// 0-1・0-2・0-3・0-4・0-7・0-8。アダプタは schema の検証・修復・並列制限・worktree 作成をしない（agent-host の責務）。
//
// 起動の形（要点）:
//   codex exec [resume] --json -o <logDir>/final-<tag>.txt --ignore-user-config [-m M] -c model_reasoning_effort="E"
//     [-C cwd（resume では付けない。spawn の cwd が効く）] --output-schema <logDir>/schema-strict.json
//     -c permissions={…} -c default_permissions="iit_read|iit_impl"
//     -c hooks.PreToolUse=[…agent-guard を呼ぶ hook…] --dangerously-bypass-hook-trust [<sessionRef>] -
//   プロンプトは標準入力（`-`）で渡す。
//
// CODEX_HOME: start で 1 回だけ解決し（toolConfig.codexHome → cfg.env.CODEX_HOME → ~/.codex）、exec・resume・delete の
// すべてに同じ値を明示で渡す。アダプタはホームへ何も作らず、認証ファイルを読まない・コピーしない。
// `--ignore-user-config` でホームの config.toml を読まない（-m は必ず明示する）。プロジェクトは trusted にしない
// （trusted にすると worktree の .codex/hooks.json が bypass で動くため。toolConfig.trustProject: true で付けられる）。
//
// toolConfig のキー（既定値は runner/config/default.json の toolConfig.codex。コード側の既定も同じ）:
//   deleteSessions: close でラン中に作ったセッションを `codex delete --force` する（契約どおり）
//   codexBin ("codex")・codexHome（上記）・guardScript（agent-guard.sh の絶対パス。既定は lib/guard-script.mjs の探索）・
//   trustProject (false)・killGraceMs (2000。SIGTERM から SIGKILL までの猶予)・extraWritePaths ([]。push 先のローカル origin 等。
//   正規化済みの絶対パスの配列のみ。lib/path-list.mjs が設定の読み込みとアダプタの両方で検査する)
// req の任意の追加: profile ('read' | 'impl'。permission profile の上書き)。
//
// ガード（0-3）: hook は fail-open（スクリプトが無い・exit 1・時間切れで素通し）なので、
//   (1) コマンド行は `bash <hook> … || exit 2`・timeout は指定しない、
//   (2) hook が呼び出しごとに 1 行ログを書き、終了時に「ログの増分 >= command_execution の数」を確かめる
//       （満たさなければ AdapterError('denied')・ガードの欠落）、
//   (3) resume にも同じ hook 引数を渡す（渡さない turn ではマージが通った）。
//   穴（監査 e670648 の MEDIUM-5・PR #851 の P0。実測済み）: exec_command で開いた対話シェルへ write_stdin で送った行は、
//   hook（PreToolUse）にも command_execution にも現れず、(1)(2) のどちらも通らない。2026-11-17（codex-cli 0.169.0・gpt-6.1-sol。
//   scratchpad の cx-probe）に、jq を使わず stdin を生のまま保存して必ず 1 行追記する hook を matcher "*"・".*"・指定なしの
//   3 つで同時に登録して測った: どれも exec_command（tool_name "Bash"）では呼ばれ、write_stdin では呼ばれず、送った
//   `echo PROBE > marker` は実行された（marker が作られた。同じ回の exec_command の `echo PROBE > marker2` は deny で止まった）。
//   hook の入力は tool_input.command だけで tty の有無は見えない。`-c features.unified_exec=false` は効かない（managed
//   requirements で true に固定される）。
//   (4) 事前の封じ（TTY_OFF）: `-c features.unified_exec_tty=false` を exec・resume に渡す。同じ実測で、tty:true の exec_command は
//   「TTY execution is disabled by config」で拒否され、tty の無いセッション（`sh -c 'sleep 8; while read …'` のように走り続ける
//   ものを含む）への write_stdin は「stdin is closed for this session」で失敗し、marker は作られなかった。start で
//   `codex features list -c <TTY_OFF>` を読み、unified_exec_tty が false と確かめられなければ prereq で止める。
//   (5) 事後検知（(4) の補い）: 成功したターンの後、自分のセッションの記録（<CODEX_HOME>/sessions/**/rollout-*-<id>.jsonl）を読み、
//   入力が空でない write_stdin の呼び出しがあれば AdapterError('denied') にする（出力をホストへ流さない）。記録が見つからない・
//   1 つに決まらない・解釈できない場合も denied（fail-closed）。読むのは自分の sessionRef の記録だけで、認証ファイルは開かない。
//   記録の形（2026-11-17・codex-cli 0.169.0・gpt-6.1-sol の 1 回の実測。scratchpad の sec-int/m5）: モデルの tool 呼び出しは
//   code mode の custom_tool_call（name "exec"）の input に JavaScript の文字列として入る
//   （例: `text(await tools.write_stdin({session_id:42023,chars:"",yield_time_ms:1000}));`）。直接の function_call
//   （name "write_stdin"・arguments は JSON 文字列）の形も同じ規則で見る（stdinWritesOf）。code mode の input は静的に読むだけ
//   なので、tools を別名・計算されたプロパティで参照された場合は「解釈できない」として denied に倒す。文字列の空白化は
//   正規表現リテラルを知らないため、元のテキストの `tools.write_stdin(` も別に数える。正規表現リテラルで境界をずらしたうえで
//   別名・計算されたプロパティを使う形や、globalThis 経由等の難読化は検知できない（best-effort。README の既知の限界）。
//   allowMerge は hook のコマンド行へ --merge-re を埋めるかどうかで切り替える。埋める形は req.merge の PR 番号で
//   具体化した guard.mergeExecCommandFor(prNumber) で、merge 段の子の env には GH_REPO=<req.merge.repo> を固定する
//   （監査 e670648 の MEDIUM-8。汎用の MERGE_EXEC_COMMAND は別の PR 番号・GH_REPO を向けた別リポジトリでも通った）。
//   allowMerge でも req.merge が無ければ --merge-re を出さない（汎用の形へは倒さない。マージは hook に止められる）。
//   req.merge がある段は、cwd がリポジトリの外（agent-host が作る空ディレクトリ）なので --skip-git-repo-check を付ける。
//
// permission profile は 2 種（:read-only を土台に、ネットワークは有効）:
//   iit_read: worktree ではない cwd（メイン worktree。観測・状態・計画）。cwd は読み取りのみ・TMPDIR だけ書ける。
//   どちらの profile にも req.writablePaths（契約。agent-host が label ごとに決める）を write で足す。いまは state:load
//   （とそのフォールバック）だけが <main>/_/issue-trees を受け取る（モデルの段で状態ファイルを初期化する。状態ファイルがあるときの
//   state:load は agent-host が直接読むので〔lib/state-read.mjs〕、モデルへ回るのは状態ファイルが無い初回だけ。Phase 3 の通しで、
//   無いと非 dryRun の初回が「状態ファイルの初期化に失敗」で止まった〔27c90eb〕。全段で常時 write にしていたのは
//   監査 e670648 の MEDIUM-4 で、plan・monitor・merge-exec 等が状態ファイルを書き換えられた）。
//   req.readTmpOf（agent-host がツリーのページの段 plan:issue-tree-page-N にだけ、ツリーの段の logDir を渡す）は、その段の
//   TMPDIR を read で足す（PR #851 の P1。fetch-tree.sh --root が TMPDIR に作った iit-tree.XXXXXX/tree.tsv を --page が読む。
//   tmpRoot 全体は deny のままで、より具体的な read が勝つ。2026-11-17 に `codex sandbox -P iit_read` で、足した TMPDIR は
//   読めて書けず、他の段の TMPDIR は読めないままであることを確かめた）。
//   req.recoverGit（agent-host が回復の段 recover:#N にだけ渡す。lib/recover-git.mjs）は iit_read のまま、<main>/.git の
//   objects・refs・logs・packed-refs(.lock)・FETCH_HEAD（recover-prep.sh の base の取得）と、検証できた旧 worktree とその
//   gitdir（WIP コミット。GITDIR_READ_ONLY と worktree の .git は read に戻す）を write で足す（PR #851 の P1）。
//   2026-11-17 に `codex sandbox -P iit_read` で実物の recover-prep.sh を流し、足さないと wip:commit-failed・baseFetched:false、
//   足すと wipCommitted:true・baseFetched:true になり、.git/config・.git/hooks・commondir・gitdir・worktree の .git・
//   メイン worktree と .git 直下は書けないままであることを確かめた。
//   iit_impl: 隔離 worktree。worktree・<main>/.git/{objects,refs,logs,packed-refs,packed-refs.lock}・
//             <main>/.git/worktrees/<name>（正確なパス）・TMPDIR が書ける。.git/hooks と .git/config は読み取りのまま。
//             gitdir の下の commondir・gitdir・config.worktree と worktree の .git は read に戻す（GITDIR_READ_ONLY）。
//   どちらも .codex は読み取り・認証ファイル（<CODEX_HOME>/auth.json と ~/.codex/auth.json）は deny。
//   TMPDIR はエージェントごとに <runDir>/tmp/<logDir の名前>（監査 e670648 の LOW-13。ラン全体で 1 つだと、並行する
//   別のエージェントの一時ファイル〔コミットメッセージ・PR 本文等〕を読み書きできた）。<runDir>/tmp 全体は deny にして
//   自分の分だけを write で開ける（土台の :read-only は全体を読めるので、write を分けるだけでは他の分を読めた。
//   2026-11-17・codex-cli 0.169.0 の `codex sandbox -P iit_read` の実測で、deny 無しは他の分の cat・ls が通り、
//   deny ありは失敗し、自分の分の読み書きは通った。Linux の bubblewrap では未実測）。修復ターンは同じ logDir なので
//   同じ場所を使う。生成物のプロンプトはエージェント間で一時ファイルを受け渡さない（TEMP_FILE_POLICY は自分の mktemp だけ）。
//   darwin では両方に /private/var/tmp（/var/tmp の実体）を書き込み可として足す（sandbox の書き込み範囲を広げる）。
//   macOS の /bin/bash 3.2 は here-doc の一時ファイルを TMPDIR ではなく /var/tmp に作り（書けなければ /tmp →
//   /usr/tmp → cwd の順に探す）、どこにも書けないと here-doc が「cannot create temp file」で落ちるため。
//   `codex sandbox` での実測（2026-11-17・codex-cli 0.169.0）: iit_read は無しで失敗・ありで成功。iit_impl は cwd
//   （worktree）へのフォールバックで通っていただけで、`cd /` の後は無しで失敗・ありで成功した。
//   zsh の here-doc（一時ファイルは $TMPPREFIX。既定 /tmp/zsh）はこの追加では直らない（下の「シェル」）。
//
// シェル: Codex はモデルのコマンドを利用者のログインシェル（macOS の既定は /bin/zsh）の `-c` / `-lc` で実行する。
//   呼び出しごとに bash へ固定する設定は無い（openai-codex の reference の config-reference.md「Shell / environment /
//   execution」・config-advanced.md にシェルを選ぶキーは無い。allow_login_shell は login の可否、
//   shell_environment_policy は環境変数だけ）。子の env の SHELL=/bin/bash も効かない（2026-11-17・codex-cli 0.169.0 の
//   `codex exec` 1 回の実測で、コマンドは `/bin/zsh -c …`・ZSH_VERSION=5.9 で実行された）。代替策として:
//   (1) 子の env に TMPPREFIX=<TMPDIR>/zsh を入れる（zsh の here-doc の一時ファイルを書ける場所へ向ける。`codex sandbox`
//       の実測で、無いと iit_read・iit_impl とも zsh の here-doc が失敗し、あると成功した。書き込み範囲は広げない）、
//   (2) 共通の前置き（lib/preamble.mjs の SHELL_NOTE）で、複数行は `bash <<'EOF'` で実行し zsh の特殊変数名に代入しない
//       よう指示する（Phase 3 の通しで、モデルの `status=$?` が zsh の読み取り専用変数に当たって落ちた）。契約上アダプタは
//       プロンプトを加工しないので、ここでは足さない。
//   既定は req.worktreeGitdir（契約。agent-host が worktree 作成直後に検証した値）があれば iit_impl、無ければ iit_read。
//   worktree の `.git` ファイルは読まない（書き換えで書き込み範囲を広げられるため。監査 e670648 の HIGH-2）。
//   req.profile で上書きできる（契約への任意の追加）。
//
// 時間切れ: プロセスグループへ SIGTERM、猶予後に SIGKILL（孫も止まる。setsid で抜けた孫は止められない）。
// 出力超過: プロセスグループへ SIGKILL。どちらも close（パイプが閉じること）が来なければ猶予の後に決着し、パイプを閉じる
// （抜けた孫がパイプを握っていても、段の時間上限まで並列の枠を握らない）。
import { execFile, spawn } from 'node:child_process'
import { existsSync, lstatSync, mkdirSync, readFileSync, readdirSync, realpathSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { basename, dirname, isAbsolute, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { AdapterError } from '../lib/adapter-error.mjs'
import { mergeExecCommandFor } from '../lib/guard.mjs'
import { isNormalizedAbsPathList } from '../lib/path-list.mjs'
import { isMergeTarget } from '../lib/merge-target.mjs'
import { GUARD_SCRIPT_MISSING, findGuardScript } from '../lib/guard-script.mjs'
import { gitLocationFreeEnv } from '../lib/worktree.mjs'
import { decodeStrictText, strictifySchema } from './codex-strict.mjs'

const HERE = dirname(fileURLToPath(import.meta.url))
export const HOOK_SCRIPT = join(HERE, 'codex-hook.sh')
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const USAGE_LIMIT = /usage[ _-]?limit|UsageLimitExceeded/i

/** darwin の /bin/bash 3.2 が here-doc の一時ファイルを置く場所（/var/tmp は symlink なので実体のパス）。 */
export const DARWIN_HEREDOC_TMP = '/private/var/tmp'

/** プラットフォームごとに両 profile へ足す書き込み可能パス。純関数（platform は process.platform の値）。 */
export function platformWritePaths(platform) {
  return platform === 'darwin' ? [DARWIN_HEREDOC_TMP] : []
}

/**
 * iit_impl で gitdir（write）の下を read に戻すファイル。`codex sandbox`（codex-cli 0.169.0・macOS Seatbelt）の実測で、
 * 戻した後は追記・unlink・新規作成・rename での上書き・symlink の作成が失敗し、commit・amend・reset・merge・rebase・
 * stash・switch -c は通った（2026-11-17。Linux の bubblewrap は未測定）。
 */
export const GITDIR_READ_ONLY = Object.freeze(['commondir', 'gitdir', 'config.worktree'])

/**
 * 対話シェル（tty のある unified exec セッション）を作らせない `-c`。exec と resume の両方に渡す（PR #851 の P0）。
 * write_stdin で送った行は PreToolUse hook を通らない（matcher "*"・".*"・指定なしのどれでも hook は呼ばれなかった）が、
 * tty の無いセッションは stdin が閉じていて write_stdin が「stdin is closed for this session」で失敗する。
 * この設定で exec_command の tty:true は「TTY execution is disabled by config」で拒否される
 * （2026-11-17・codex-cli 0.169.0・gpt-6.1-sol の実測。scratchpad の cx-probe。unified_exec 自体は managed requirements で
 * 外せないが、unified_exec_tty は -c で外せた）。効いていることは start で `codex features list` により確かめる。
 */
export const TTY_OFF = 'features.unified_exec_tty=false'

/**
 * `codex features list` の出力から unified_exec_tty の有効状態を読む。純関数。
 * @returns {boolean|null} 行が 1 つだけで true / false が読めたときその値、他は null（確かめられない）
 */
export function ttyFeatureOf(stdout) {
  const rows = String(stdout).split('\n').map((l) => l.trim().split(/\s+/)).filter((w) => w[0] === 'unified_exec_tty')
  if (rows.length !== 1) return null
  const v = rows[0].at(-1)
  return v === 'true' ? true : v === 'false' ? false : null
}

const q = (s) => JSON.stringify(s)
const shq = (s) => `'${String(s).replace(/'/g, `'\\''`)}'`

/**
 * req.worktreeGitdir（agent-host が worktree 作成直後に検証した git ディレクトリ）から profile 用の git 情報を作る。
 * worktree の `.git` ファイルは読まない（エージェントが書き換え得るため。監査 e670648 の HIGH-2）。
 * null / undefined は null（git の書き込みを足さない）。メインの `.git/worktrees/` の直下でない値は例外（実行しない）。
 * @returns {null | { gitdir: string, commonDir: string }}
 */
/** 共通ディレクトリ（<main>/.git）の下で commit・fetch・update-ref が書く場所。hooks・config は含めない。 */
const COMMON_WRITE = ['objects', 'refs', 'logs', 'packed-refs', 'packed-refs.lock']

export function worktreeGit(mainRoot, worktreeGitdir) {
  if (worktreeGitdir === null || worktreeGitdir === undefined) return null
  // メイン worktree の realpath を基準にする（agent-host の verifyWorktreeGitdir が返す realpath の gitdir と同じ基準。
  // mainRoot の途中の symlink で正しい gitdir を拒まないように。PR #851 の Bugbot）。.git/worktrees 自体は解決しない
  // （外を指す symlink なら直下と見なさない）
  let root
  try { root = realpathSync(mainRoot) } catch { root = mainRoot }
  const parent = join(root, '.git', 'worktrees')
  const ok = typeof worktreeGitdir === 'string' && isAbsolute(worktreeGitdir) && resolve(worktreeGitdir) === worktreeGitdir &&
    dirname(worktreeGitdir) === parent && basename(worktreeGitdir) !== ''
  if (!ok) throw new AdapterError('denied', `worktreeGitdir がメインの .git/worktrees/ の直下に無い: ${String(worktreeGitdir).slice(0, 160)}`)
  return { gitdir: worktreeGitdir, commonDir: join(root, '.git') }
}

/**
 * req.recoverGit（回復の段の git の書き込み先。agent-host が lib/recover-git.mjs で決める）を検証して返す（無ければ null）。
 * 共通ディレクトリは <main>/.git、worktree は <main>/.claude/worktrees/ の直下、gitdir は <main>/.git/worktrees/ の直下で、
 * worktree と gitdir は両方あるか両方無いか。<main> は mainRoot の realpath（lib/recover-git.mjs と同じ基準）。合わなければ例外（実行しない）。
 */
export function checkRecoverGit(mainRoot, v) {
  if (v === null || v === undefined) return null
  const norm = (p) => typeof p === 'string' && isAbsolute(p) && resolve(p) === p
  // lib/recover-git.mjs と同じく、メイン worktree の realpath を基準にする（パスの解決だけで、ファイルは読まない）
  let root
  try { root = realpathSync(mainRoot) } catch { root = mainRoot }
  const ok = typeof v === 'object' && v.commonDir === join(root, '.git') &&
    ((v.worktree === null && v.gitdir === null) ||
      (norm(v.worktree) && dirname(v.worktree) === join(root, '.claude', 'worktrees') && norm(v.gitdir) && dirname(v.gitdir) === join(root, '.git', 'worktrees')))
  if (!ok) throw new AdapterError('denied', 'recoverGit がメインの .git・.claude/worktrees/・.git/worktrees/ の形でない')
  return { commonDir: v.commonDir, worktree: v.worktree, gitdir: v.gitdir }
}

/** req.writablePaths を検証して返す（無ければ []）。正規化済みの絶対パスの配列でなければ例外（実行しない）。 */
export function checkWritablePaths(v) {
  if (v === null || v === undefined) return []
  const ok = Array.isArray(v) && v.every((p) => typeof p === 'string' && isAbsolute(p) && resolve(p) === p)
  if (!ok) throw new AdapterError('denied', 'writablePaths が正規化済みの絶対パスの配列でない')
  return v
}

/** toolConfig.extraWritePaths を検証して返す（無ければ []）。形が不正なら例外（文字列を 1 文字ずつ展開させない。PR #851 の P1）。 */
export function checkExtraWritePaths(v) {
  if (v === null || v === undefined) return []
  if (!isNormalizedAbsPathList(v)) throw new AdapterError('denied', 'extraWritePaths が正規化済みの絶対パス（"/" 以外）の配列でない')
  return v
}

/**
 * permission profile の `-c` 引数（2 引数 × 2）。純関数。
 * @param {{ kind: 'read'|'impl', cwd: string, codexHome: string, tmpDir: string, tmpRoot?: string|null, readablePaths?: string[], home: string, git: null | { gitdir: string, commonDir: string }, writablePaths?: string[], extraWritePaths?: string[], platform?: string }} o
 *   tmpRoot: エージェント別 TMPDIR の親（<runDir>/tmp）。渡すと deny にする（他のエージェントの分を読めなくする）。
 *   readablePaths: tmpRoot の下で read に戻す前の段の TMPDIR（req.readTmpOf を agentTmpDir で写したもの）。
 *            tmpDir はその下で、より具体的なパスとして write が優先される
 *   writablePaths: req.writablePaths（agent-host が label ごとに決める追加の書き込み可パス。checkWritablePaths で検証済み）
 *   platform: process.platform の値（テストが注入する）。darwin なら両 profile に DARWIN_HEREDOC_TMP を足す
 */
export function buildProfileArgs({ kind, cwd, codexHome, tmpDir, tmpRoot = null, readablePaths = [], home, git, recover = null, writablePaths = [], extraWritePaths = [], platform = process.platform }) {
  const name = kind === 'impl' ? 'iit_impl' : 'iit_read'
  const ws = kind === 'impl' ? { '.': 'write' } : { '.': 'read' }
  ws['.codex'] = 'read'
  const fs = { ':minimal': 'read' }
  if (tmpRoot) fs[tmpRoot] = 'deny'
  // 前の段の TMPDIR のうち読んでよいもの（req.readTmpOf から作る。plan:issue-tree-page-N が plan:issue-tree の
  // iit-tree.XXXXXX/tree.tsv を読む）。tmpRoot の deny より具体的なので read が勝つ。書き込みは許さない
  for (const p of readablePaths) fs[p] = 'read'
  fs[tmpDir] = 'write'
  // 共通ディレクトリのうち commit・fetch が書く場所（.git/hooks と .git/config は含めない）
  const commonWrites = (commonDir) => { for (const p of COMMON_WRITE) fs[join(commonDir, p)] = 'write' }
  // 付属 worktree の gitdir を書けるようにし、git の行き先を決めるファイルと worktree の .git ファイルだけ read に戻す
  // （監査 e670648 の HIGH-1。commondir を偽の共通ディレクトリへ向けると、sandbox の外で走る worktree-remove.sh の status が
  // 偽 config の core.fsmonitor を起動し得た）。より具体的なパスの指定が優先される（permission-profiles.md）。書き込みが要る側
  // （index・HEAD・*.lock・MERGE_HEAD・rebase-merge/ 等）は列挙しきれないので gitdir 全体の write に任せ、戻す側を列挙する。
  const gitdirWrites = (gitdir, worktree) => {
    fs[gitdir] = 'write'
    for (const f of GITDIR_READ_ONLY) fs[join(gitdir, f)] = 'read'
    fs[join(worktree, '.git')] = 'read'
  }
  if (kind === 'impl' && git) {
    commonWrites(git.commonDir)
    gitdirWrites(git.gitdir, cwd)
  }
  // 回復の段（recover:#N。req.recoverGit）: cwd はメイン worktree。recover-prep.sh が base を取得し（共通ディレクトリと
  // FETCH_HEAD）、旧 worktree が検証できたときだけ、その worktree と gitdir に WIP コミットする（PR #851 の P1）
  if (kind === 'read' && recover) {
    commonWrites(recover.commonDir)
    fs[join(recover.commonDir, 'FETCH_HEAD')] = 'write'
    if (recover.worktree && recover.gitdir) {
      fs[recover.worktree] = 'write'
      gitdirWrites(recover.gitdir, recover.worktree)
    }
  }
  for (const p of platformWritePaths(platform)) fs[p] = 'write'
  for (const p of checkExtraWritePaths(extraWritePaths)) fs[p] = 'write'
  for (const p of writablePaths) fs[p] = 'write'
  fs[join(codexHome, 'auth.json')] = 'deny'
  fs[join(home, '.codex', 'auth.json')] = 'deny'
  const entries = (o) => Object.entries(o).map(([k, v]) => `${q(k)}=${q(v)}`).join(', ')
  const prof = `extends=":read-only", filesystem={${entries(fs)}, ":workspace_roots"={${entries(ws)}}}, network={enabled=true}`
  return ['-c', `permissions={${name}={${prof}}}`, '-c', `default_permissions=${q(name)}`]
}

/** req.merge を検証して返す（allowMerge でない・merge が無ければ null）。形が不正なら例外（実行しない）。 */
export function checkMerge(allowMerge, merge) {
  if (!allowMerge || merge === null || merge === undefined) return null
  if (!isMergeTarget(merge)) throw new AdapterError('denied', 'merge が { prNumber: 正の整数, repo: owner/repo } の形でない')
  return merge
}

/** hook の `-c` 引数（`--dangerously-bypass-hook-trust` を含む）。merge は checkMerge を通した値か null。 */
export function buildHookArgs({ hookScript, guardScript, hookLog, merge = null }) {
  const parts = ['bash', shq(hookScript), '--guard', shq(guardScript), '--log', shq(hookLog)]
  if (merge !== null) parts.push('--merge-re', shq(mergeExecCommandFor(merge.prNumber).source))
  const command = `${parts.join(' ')} || exit 2`
  return ['-c', `hooks.PreToolUse=[{matcher="^Bash$", hooks=[{type="command", command=${q(command)}}]}]`, '--dangerously-bypass-hook-trust']
}

/** JSONL（1 行 1 イベント）から必要な情報を集める。純関数。 */
export function summarizeEvents(jsonl) {
  const s = { threadIds: [], commandIds: new Set(), commandAnon: 0, lastAgentMessage: null, turnFailed: null, errors: [], completed: 0, usage: null }
  for (const line of String(jsonl).split('\n')) {
    if (!line.startsWith('{')) continue
    let e
    try { e = JSON.parse(line) } catch { continue }
    if (e.type === 'thread.started' && typeof e.thread_id === 'string') s.threadIds.push(e.thread_id)
    else if (e.type === 'turn.completed') {
      s.completed++
      const u = e.usage ?? {}
      s.usage ??= { input_tokens: 0, cached_input_tokens: 0, output_tokens: 0, reasoning_output_tokens: 0 }
      for (const k of Object.keys(s.usage)) s.usage[k] += Number(u[k]) || 0
    } else if (e.type === 'turn.failed') s.turnFailed = String(e.error?.message ?? e.message ?? 'turn.failed').slice(0, 500)
    else if (e.type === 'error') s.errors.push(String(e.message ?? e.error?.message ?? 'error').slice(0, 500))
    else if ((e.type === 'item.started' || e.type === 'item.completed') && e.item?.type === 'command_execution') {
      if (typeof e.item.id === 'string') s.commandIds.add(e.item.id)
      else if (e.type === 'item.completed') s.commandAnon++
    } else if (e.type === 'item.completed' && e.item?.type === 'agent_message' && typeof e.item.text === 'string') s.lastAgentMessage = e.item.text
  }
  s.commandCount = s.commandIds.size + s.commandAnon
  return s
}

// write_stdin の引数のうち、空の入力（出力の poll）として許すキーと値の形。chars は空の文字列リテラルだけ
const POLL_ARG = /^\s*(["']?)(session_id|chars|yield_time_ms|max_output_tokens)\1\s*:\s*(.*?)\s*$/s
const POLL_VALUE = { session_id: /^\d+$/, chars: /^(?:""|''|``)$/, yield_time_ms: /^\d+$/, max_output_tokens: /^\d+$/ }

/** code mode の input 中の `tools.write_stdin({…})` の引数のテキストが、空の入力の poll だけか。 */
function isPollArgs(body) {
  if (/[{}()[\]]/.test(body)) return false // 入れ子・式は読まない（解釈できない側に倒す）
  const parts = body.split(',').filter((p, i, a) => !(i === a.length - 1 && p.trim() === '')) // 末尾のカンマは許す
  if (parts.length === 0) return false
  const seen = new Set()
  for (const p of parts) {
    const m = POLL_ARG.exec(p)
    if (!m || seen.has(m[2]) || !POLL_VALUE[m[2]].test(m[3])) return false
    seen.add(m[2])
  }
  return seen.has('session_id')
}

/**
 * JavaScript のテキストから文字列リテラルの中身とコメントを空白に置き換える（長さと位置は変えない）。
 * `${…}` を含むテンプレートリテラルは式を含むので置き換えない（コードとして読む側に倒す）。
 */
export function blankJsStrings(src) {
  const out = src.split('')
  let i = 0
  const blank = (a, b) => { for (let k = a; k < b; k++) if (out[k] !== '\n') out[k] = ' ' }
  while (i < src.length) {
    const c = src[i]
    if (c === '/' && src[i + 1] === '/') { const e = src.indexOf('\n', i); const end = e < 0 ? src.length : e; blank(i, end); i = end; continue }
    if (c === '/' && src[i + 1] === '*') { const e = src.indexOf('*/', i + 2); const end = e < 0 ? src.length : e + 2; blank(i, end); i = end; continue }
    if (c === '"' || c === "'" || c === '`') {
      let j = i + 1
      while (j < src.length && src[j] !== c) j += src[j] === '\\' ? 2 : 1
      const end = Math.min(j, src.length)
      if (!(c === '`' && src.slice(i + 1, end).includes('${'))) blank(i + 1, end)
      i = end + 1
      continue
    }
    i++
  }
  return out.join('')
}

/**
 * code mode（custom_tool_call の name "exec"）の input を静的に読み、空でない（か解釈できない）write_stdin の数を返す。
 * 文字列リテラルとコメントの中は見ない（コマンドに `tools` という語が入るのは普通にある）。コードの部分の `tools` は
 * `tools.<名前>(` の直接の呼び出しだけを読める形とし、それ以外の参照（別名・計算されたプロパティ・分割代入）と、
 * `tools.write_stdin(` 以外の形の `write_stdin` は、解釈できないものとして 1 件と数える（fail-closed）。
 */
function codeModeStdinWrites(input) {
  const code = blankJsStrings(input)
  let n = 0
  let direct = 0
  for (const m of code.matchAll(/(?<![\w$])tools(?![\w$])/g)) {
    const at = m.index + m[0].length
    const call = /^\s*\.\s*([A-Za-z_$][\w$]*)\s*\(/.exec(code.slice(at))
    if (!call) { n++; continue }
    if (call[1] !== 'write_stdin') continue
    direct++
    // 引数は元のテキストから読む（chars の値を見るため）。位置は code と同じ
    const args = /^\s*\{([^]*?)\}\s*\)/.exec(input.slice(at + call[0].length))
    if (!args || !isPollArgs(args[1])) n++
  }
  const named = [...code.matchAll(/(?<![\w$])write_stdin(?![\w$])/g)].length
  // 空白化は正規表現リテラルを知らない（`/"/` のような引用符を含む正規表現で文字列の境界がずれ、直接の呼び出しまで
  // 空白になる）。そこで元のテキストでも `tools.write_stdin(` を全部拾い、poll の形でないものを数えて大きい方を採る。
  // 誤検知はコマンドの文字列にこの綴りそのものが入る場合に限られる
  let raw = 0
  for (const m of input.matchAll(/(?<![\w$])tools\s*\.\s*write_stdin\s*\(/g)) {
    const args = /^\s*\{([^]*?)\}\s*\)/.exec(input.slice(m.index + m[0].length))
    if (!args || !isPollArgs(args[1])) raw++
  }
  return Math.max(n + Math.max(0, named - direct), raw)
}

/**
 * セッションの記録（rollout の JSONL）から、入力が空でない write_stdin の呼び出しを数える。純関数。
 * 戻り値: { writes: 空でない（か解釈できない）呼び出しの数, sessionIds: session_meta の id の一覧, badLines: JSON でない行の数 }
 * 形は 2026-11-17 の実測（ファイル冒頭の (5)）。直接の function_call（arguments は JSON 文字列かオブジェクト）と、
 * code mode の custom_tool_call（name "exec"・input は JavaScript）の両方を見る。
 */
export function stdinWritesOf(jsonl) {
  const r = { writes: 0, sessionIds: [], badLines: 0 }
  for (const line of String(jsonl).split('\n')) {
    if (line.trim() === '') continue
    let e
    try { e = JSON.parse(line) } catch { r.badLines++; continue }
    const p = e?.payload
    if (e?.type === 'session_meta' && typeof p?.id === 'string') { r.sessionIds.push(p.id); continue }
    if (e?.type !== 'response_item' || p === null || typeof p !== 'object') continue
    if (p.type === 'function_call' && typeof p.name === 'string' && /(?:^|\.)write_stdin$/.test(p.name)) {
      let a = p.arguments
      if (typeof a === 'string') { try { a = JSON.parse(a) } catch { a = undefined } }
      if (a === null || typeof a !== 'object' || (a.chars !== undefined && typeof a.chars !== 'string')) r.writes++
      else if (typeof a.chars === 'string' && a.chars !== '') r.writes++
    } else if (p.type === 'custom_tool_call' && p.name === 'exec') {
      if (typeof p.input !== 'string') r.writes++
      else r.writes += codeModeStdinWrites(p.input)
    }
  }
  return r
}

/**
 * <codexHome>/sessions の下から、ファイル名が `-<id>.jsonl` で終わる記録を探す（名前だけで探し、他のセッションのファイルは開かない）。
 * symlink・通常ファイルでないものは除く。戻り値は絶対パスの配列。
 */
export function findRollouts(codexHome, id) {
  const dir = join(codexHome, 'sessions')
  let names
  try { names = readdirSync(dir, { recursive: true }) } catch { return [] }
  const suffix = `-${id}.jsonl`
  return names.map(String).filter((f) => basename(f).startsWith('rollout-') && f.endsWith(suffix)).map((f) => join(dir, f)).filter((p) => {
    try { return lstatSync(p).isFile() } catch { return false }
  })
}

/** 終了状態から失敗の kind を決める。純関数。失敗でなければ null。 */
export function classifyFailure({ timedOut, spawnError, exitCode, signal, summary }) {
  if (timedOut) return { kind: 'timeout', message: '時間切れ' }
  if (spawnError) return { kind: 'exit', message: `codex を起動できない: ${spawnError}` }
  const msg = summary.turnFailed ?? summary.errors.at(-1) ?? null
  const failed = summary.turnFailed !== null || (exitCode !== 0 && summary.errors.length > 0)
  if (failed) return { kind: USAGE_LIMIT.test(msg) ? 'usage-limit' : 'api', message: msg }
  if (exitCode !== 0) return { kind: 'exit', message: `codex が異常終了（終了コード ${exitCode ?? '-'}、signal ${signal ?? '-'}）` }
  return null
}

function execFileP(file, args, opts) {
  return new Promise((res) => execFile(file, args, { ...opts, encoding: 'utf8' }, (err, stdout, stderr) => res({ err, stdout, stderr })))
}

// codex の標準出力・標準エラーの上限。直接実行側（lib/agent-host.mjs の spawnScript）と同じ値: 標準出力 16 MiB を超えたら
// プロセスグループごと止めて失敗にする。標準エラーは先頭 1 MiB だけ残し（spawnScript と同じ）、暴走（残す量の 16 倍 =
// 16 MiB 超）は標準出力と同様に止める。JSONL のイベントは 1 ターンで数 MiB に収まる実測（aggregated_output を含む）ため余裕がある。
export const MAX_STDOUT_BYTES = 16 * 1024 * 1024
export const MAX_STDERR_KEEP_BYTES = 1024 * 1024
export const MAX_STDERR_TOTAL_BYTES = 16 * 1024 * 1024

const killGroup = (pid, sig) => { try { process.kill(-pid, sig) } catch { /* 既に終了 */ } }

/**
 * @param {{ skillDir: string, mainRoot: string, runDir: string, toolConfig?: object, guard?: object, env?: object, platform?: string }} cfg
 *   platform: 省略時は process.platform（テストが注入する。permission profile の darwin 分岐に使う）
 */
export function createAdapter(cfg) {
  const tc = cfg.toolConfig ?? {}
  const bin = tc.codexBin ?? 'codex'
  // エージェント別の TMPDIR の親。start / close の codex 呼び出し（--version・delete）はここを TMPDIR にする
  const tmpRoot = join(cfg.runDir, 'tmp')
  /** エージェント別の TMPDIR（<tmpRoot>/<logDir の名前>）。名前が空・. ・.. なら例外（実行しない）。 */
  const agentTmpDir = (logDir) => {
    const name = typeof logDir === 'string' ? basename(logDir) : ''
    if (name === '' || name === '.' || name === '..') throw new AdapterError('denied', 'logDir から TMPDIR を決められない')
    return join(tmpRoot, name)
  }
  /**
   * req.readTmpOf（読んでよい前の段の logDir。agent-host がツリーのページの段にだけ渡す）を、その段の TMPDIR へ写す。
   * <runDir>/agents/ 直下の正規化済みの絶対パスでなければ例外（実行しない）。無ければ []。
   */
  const readableTmpDirs = (v) => {
    if (v === null || v === undefined) return []
    const agents = join(cfg.runDir, 'agents')
    const ok = Array.isArray(v) && v.every((p) => typeof p === 'string' && isAbsolute(p) && resolve(p) === p && dirname(p) === agents)
    if (!ok) throw new AdapterError('denied', 'readTmpOf が <runDir>/agents/ 直下の絶対パスの配列でない')
    return v.map(agentTmpDir)
  }
  const platform = cfg.platform ?? process.platform
  // 継いだ GIT_DIR 等（リポジトリの位置を変える git の変数）を外す。残すと Codex のエージェントが worktree の中で
  // 打つ git が cwd ではなくその変数の指すリポジトリへ向く（lib/worktree.mjs の gitLocationFreeEnv）
  const baseEnv = gitLocationFreeEnv(cfg.env ?? process.env)
  const home = baseEnv.HOME ?? homedir()
  let codexHome = null
  const killGraceMs = tc.killGraceMs ?? 2000
  const sessions = new Set()
  const running = new Set()
  let guardScript = null
  let started = false

  const resolveCodexHome = () => resolve(tc.codexHome ?? baseEnv.CODEX_HOME ?? join(home, '.codex'))

  const childEnv = (merge = null, tmpDir = tmpRoot) => {
    // TMPPREFIX: zsh の here-doc の一時ファイルの接頭辞（ファイル冒頭の「シェル」）。TMPDIR と同じく両 profile で書ける
    const env = { ...baseEnv, CODEX_HOME: codexHome, TMPDIR: tmpDir, TMPPREFIX: join(tmpDir, 'zsh') }
    // merge 段は対象リポジトリを固定する（gh pr merge <N> を別リポジトリへ向けさせない。MEDIUM-8）
    if (merge !== null) env.GH_REPO = merge.repo
    // 追跡ブランチの自動設定を止める（0-2）。継いだ GIT_CONFIG_COUNT・KEY・VALUE は baseEnv で外してあるので 0 番に置く
    env.GIT_CONFIG_KEY_0 = 'branch.autoSetupMerge'
    env.GIT_CONFIG_VALUE_0 = 'false'
    env.GIT_CONFIG_COUNT = '1'
    return env
  }

  async function start() {
    if (started) return
    codexHome = resolveCodexHome()
    // 子の TMPDIR（childEnv の既定）を、それを渡して起動するより前に作る
    mkdirSync(tmpRoot, { recursive: true })
    const r = await execFileP(bin, ['--version'], { env: childEnv(), timeout: 30000 })
    if (r.err) throw new AdapterError('prereq', `codex を実行できない（${bin}）: ${r.err.code ?? r.err.message}`)
    // 対話シェルを事前に塞げる構成かを確かめる（TTY_OFF。確かめられない・効かない環境では止める。exec は 1 度も起動しない）
    const f = await execFileP(bin, ['features', 'list', '-c', TTY_OFF], { env: childEnv(), timeout: 30000 })
    const tty = f.err ? null : ttyFeatureOf(f.stdout)
    if (tty !== false) {
      const why = f.err ? `codex features list が失敗（${f.err.code ?? f.err.message}）` : tty === null ? 'codex features list に unified_exec_tty の行が無い・読めない' : '-c で false にしても unified_exec_tty が true のまま（managed requirements 等）'
      throw new AdapterError('prereq', `unified_exec_tty を無効にできることを確かめられない（${why}）。tty のある対話シェルへ write_stdin で送った行はガードを通らないため、起動しない`)
    }
    const j = await execFileP('jq', ['--version'], { env: childEnv(), timeout: 30000 })
    if (j.err) throw new AdapterError('prereq', 'jq が見つからない（Codex の hook が fail-closed になるため必須）')
    guardScript = findGuardScript({ toolConfig: tc, skillDir: cfg.skillDir, mainRoot: cfg.mainRoot })
    if (!guardScript) throw new AdapterError('prereq', GUARD_SCRIPT_MISSING)
    if (!existsSync(HOOK_SCRIPT)) throw new AdapterError('prereq', 'codex-hook.sh が見つからない')
    started = true
  }

  const countLines = (p) => (existsSync(p) ? readFileSync(p, 'utf8').split('\n').filter(Boolean).length : 0)

  /**
   * セッションの記録を読み、入力が空でない write_stdin があれば理由の文字列を返す（無ければ null）。
   * 記録が 0 件・2 件以上・session_meta の id が合わない・JSON でない行がある・id が UUID でない場合も理由を返す（fail-closed）。
   */
  function checkStdinWrites(ids) {
    if (ids.size === 0) return 'write_stdin の事後検知: 確かめるセッションが無い（thread.started も resume 先も無い）'
    for (const id of ids) {
      if (!UUID.test(id)) return `write_stdin の事後検知: セッション ID の形が不正（${String(id).slice(0, 80)}）`
      const files = findRollouts(codexHome, id)
      if (files.length !== 1) return `write_stdin の事後検知: セッション ${id} の記録が ${files.length} 件（1 件に決まらない）。出力を使わない`
      let text
      try { text = readFileSync(files[0], 'utf8') } catch (e) { return `write_stdin の事後検知: セッション ${id} の記録を読めない（${e.code ?? e.message}）` }
      const r = stdinWritesOf(text)
      if (r.badLines > 0) return `write_stdin の事後検知: セッション ${id} の記録に JSON でない行が ${r.badLines} 行ある`
      if (!r.sessionIds.includes(id)) return `write_stdin の事後検知: 記録の session_meta がセッション ${id} と一致しない`
      if (r.writes > 0) return `write_stdin の事後検知: セッション ${id} に入力が空でない（か解釈できない）write_stdin が ${r.writes} 件ある。ガードを通らずに実行された可能性があるので出力を使わない`
    }
    return null
  }

  async function run(req) {
    await start()
    // 起動前に検証する（不正な worktreeGitdir・writablePaths では codex を起動しない）
    worktreeGit(cfg.mainRoot, req.worktreeGitdir)
    checkExtraWritePaths(tc.extraWritePaths)
    const writablePaths = checkWritablePaths(req.writablePaths)
    const readablePaths = readableTmpDirs(req.readTmpOf)
    const recover = checkRecoverGit(cfg.mainRoot, req.recoverGit)
    if (recover && req.worktreeGitdir) throw new AdapterError('denied', 'recoverGit は隔離 worktree の段では受けない')
    const merge = checkMerge(req.allowMerge === true, req.merge)
    const { prompt, schema, model, effort, cwd, timeoutMs, resume = null, logDir } = req
    mkdirSync(logDir, { recursive: true })
    const tmpDir = agentTmpDir(logDir)
    mkdirSync(tmpDir, { recursive: true })
    const n = readdirSync(logDir).filter((f) => /^events-t\d+\.jsonl$/.test(f)).length + 1
    const tag = `t${n}`
    const hookLog = join(logDir, 'hook.log')
    const lastPath = join(logDir, `final-${tag}.txt`)
    const git = worktreeGit(cfg.mainRoot, req.worktreeGitdir)
    const kind = req.profile ?? (git ? 'impl' : 'read')

    const args = ['exec']
    if (resume) args.push('resume')
    args.push('--json', '-o', lastPath, '--ignore-user-config')
    if (model) args.push('-m', model)
    if (effort) args.push('-c', `model_reasoning_effort=${q(effort)}`)
    if (!resume) args.push('-C', cwd)
    // マージを許す段は、agent-host がリポジトリの外の空ディレクトリを cwd にする（gh pr merge --delete-branch がローカルの
    // ブランチを見つけず、sandbox で書けない .git/refs への削除を試みないように）。codex exec は git リポジトリの外では
    // このフラグが無いと起動しないため、その段だけ付ける（resume も同じ cwd で続く）
    if (merge !== null) args.push('--skip-git-repo-check')
    if (tc.trustProject) args.push('-c', `projects={${q(cwd)}={trust_level="trusted"}}`)
    if (schema) {
      const sp = join(logDir, 'schema-strict.json')
      writeFileSync(sp, JSON.stringify(strictifySchema(schema)))
      args.push('--output-schema', sp)
    }
    args.push(...buildProfileArgs({ kind, cwd, codexHome, tmpDir, tmpRoot, readablePaths, home, git, recover, writablePaths, extraWritePaths: tc.extraWritePaths, platform }))
    args.push('-c', TTY_OFF)
    args.push(...buildHookArgs({ hookScript: HOOK_SCRIPT, guardScript, hookLog, merge }))
    if (resume) args.push(resume.sessionRef)
    args.push('-')
    writeFileSync(join(logDir, `argv-${tag}.json`), JSON.stringify(args))

    const hookBefore = countLines(hookLog)
    const input = resume ? resume.message : prompt
    const res = await new Promise((done) => {
      // Buffer のまま溜め、終了時に連結してから復号する（チャンクごとに文字列化すると UTF-8 の複数バイト文字が境界で壊れる）
      const outChunks = []
      const errChunks = []
      let outBytes = 0
      let errBytes = 0
      let overflow = null
      let timedOut = false
      let settled = false
      let forceTimer = null
      const p = spawn(bin, args, { cwd, env: childEnv(merge, tmpDir), stdio: ['pipe', 'pipe', 'pipe'], detached: true })
      running.add(p)
      const termTimer = setTimeout(() => {
        timedOut = true
        killGroup(p.pid, 'SIGTERM')
        setTimeout(() => killGroup(p.pid, 'SIGKILL'), killGraceMs).unref()
        // 子が終了しなくても返す（close を待たない上限）
        if (forceTimer === null) {
          forceTimer = setTimeout(() => finish({ exitCode: null, signal: 'SIGKILL', forced: true }), killGraceMs + 1000)
          forceTimer.unref()
        }
      }, timeoutMs)
      const finish = ({ exitCode, signal, spawnError, forced = false }) => {
        if (settled) return
        settled = true
        clearTimeout(termTimer)
        clearTimeout(forceTimer)
        running.delete(p)
        if (timedOut || overflow !== null) killGroup(p.pid, 'SIGKILL')
        // close が来ていない: 抜けた孫が握るパイプの読み口を閉じる（イベントループを握らせず、決着後に溜め込まない。agent-host の spawnScript と同じ）
        if (forced) { p.stdout.destroy(); p.stderr.destroy() }
        done({ out: Buffer.concat(outChunks).toString('utf8'), err: Buffer.concat(errChunks).toString('utf8'), timedOut, overflow, exitCode, signal, spawnError })
      }
      // 出力超過: グループを止め、猶予の後は close を待たずに決着する（新しいセッションへ抜けた孫がパイプを握っていても、
      // 段の時間上限まで並列の枠を握らない。時間切れの経路・agent-host の spawnScript と同じ）
      const stop = (which) => {
        if (overflow !== null) return
        overflow = which
        killGroup(p.pid, 'SIGKILL')
        if (forceTimer === null) {
          forceTimer = setTimeout(() => finish({ exitCode: null, signal: 'SIGKILL', forced: true }), killGraceMs)
          forceTimer.unref()
        }
      }
      p.stdout.on('data', (d) => {
        if (overflow !== null) return
        outBytes += d.length
        if (outBytes > MAX_STDOUT_BYTES) { stop('stdout'); return }
        outChunks.push(d)
      })
      p.stderr.on('data', (d) => {
        if (overflow !== null) return
        if (errBytes < MAX_STDERR_KEEP_BYTES) errChunks.push(d.subarray(0, MAX_STDERR_KEEP_BYTES - errBytes))
        errBytes += d.length
        if (errBytes > MAX_STDERR_TOTAL_BYTES) stop('stderr')
      })
      p.on('error', (e) => finish({ exitCode: null, spawnError: e.code ?? e.message }))
      // codex が終わったら（正常終了を含む）、同じプロセスグループに残った子・孫をその場で SIGKILL する。終了後は running から
      // 外れて close・killSync の対象にならないため（PR #851 の codex P1）。回収直後に送るので pid の再利用で別のグループは撃たない
      p.on('exit', () => killGroup(p.pid, 'SIGKILL'))
      p.on('close', (exitCode, signal) => finish({ exitCode, signal }))
      p.stdin.on('error', () => {})
      p.stdin.end(input)
    })

    writeFileSync(join(logDir, `events-${tag}.jsonl`), res.out)
    writeFileSync(join(logDir, `stderr-${tag}.txt`), res.err)
    const summary = summarizeEvents(res.out)
    for (const id of summary.threadIds) if (UUID.test(id)) sessions.add(id)
    const sessionRef = summary.threadIds.find((id) => UUID.test(id)) ?? resume?.sessionRef ?? undefined
    const extra = sessionRef ? { sessionRef } : {}

    if (res.overflow !== null) {
      const limit = res.overflow === 'stdout' ? MAX_STDOUT_BYTES : MAX_STDERR_TOTAL_BYTES
      throw new AdapterError('exit', `codex の${res.overflow === 'stdout' ? '標準出力' : '標準エラー'}が上限（${limit} バイト）を超えたのでプロセスグループを止めた`, extra)
    }
    const failure = classifyFailure({ ...res, summary })
    if (failure) throw new AdapterError(failure.kind, failure.message, extra)

    const hookLines = countLines(hookLog) - hookBefore
    if (hookLines < summary.commandCount) {
      throw new AdapterError('denied', `ガードの欠落: hook の呼び出し ${hookLines} 件がコマンド実行 ${summary.commandCount} 件より少ない`, extra)
    }
    // write_stdin の事後検知（冒頭の (5)。MEDIUM-5）。このターンの thread と resume 先のセッションの記録を全部見る
    const ids = new Set([...summary.threadIds.filter((id) => UUID.test(id)), ...(resume ? [resume.sessionRef] : [])])
    const stdinProblem = checkStdinWrites(ids)
    if (stdinProblem) {
      try { writeFileSync(join(logDir, `stdin-check-${tag}.txt`), `${stdinProblem}\n`) } catch { /* ログ失敗で判定を変えない */ }
      throw new AdapterError('denied', stdinProblem, extra)
    }
    let text = null
    try { text = readFileSync(lastPath, 'utf8') } catch { /* 下で代替 */ }
    if (text === null || text.trim() === '') text = summary.lastAgentMessage
    if (text === null || text.trim() === '') throw new AdapterError('exit', '最終応答が空', extra)
    writeFileSync(lastPath, text)
    if (!sessionRef) throw new AdapterError('exit', 'セッション ID を得られない（thread.started が無い）')
    return { text: schema ? decodeStrictText(schema, text) : text, sessionRef, ...(summary.usage ? { usage: summary.usage } : {}) }
  }

  async function close() {
    for (const p of running) killGroup(p.pid, 'SIGKILL')
    running.clear()
    const result = { deleted: [], failed: [] }
    if (!(tc.deleteSessions ?? false)) return result
    for (const id of sessions) {
      const r = await execFileP(bin, ['delete', '--force', id], { env: childEnv(), timeout: 60000 })
      ;(r.err ? result.failed : result.deleted).push(id)
    }
    sessions.clear()
    return result
  }

  /** 実行中の codex のプロセスグループを同期で SIGKILL する（ランナーの終了時・シグナルの処理。close を待てない経路用）。 */
  function killSync() {
    for (const p of running) killGroup(p.pid, 'SIGKILL')
  }

  return { name: 'codex', start, run, close, killSync }
}
