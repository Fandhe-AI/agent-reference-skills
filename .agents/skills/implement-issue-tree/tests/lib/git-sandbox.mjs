// 実 git を使うスクリプトテスト用のサンドボックス（Issue #603 第 3 弾）。ファイル名が `*.test.mjs` に一致しないため
// node --test の glob には拾われない。
//
// 構成: bare の origin（一時ディレクトリ）と、それを clone した作業用 worktree（スクリプトの cwd）を作る。
//   - main: 初期コミット a.txt。ブランチ feat/603-x: main から分岐して feature.txt を追加。
//   - main はその後 base.txt（または conflict: true なら a.txt の同じ行）を進める。
// 偽の `git`（シム）: `git remote get-url …`（--push / --all を含む）は実 git に問い合わせた結果（実 config を反映する）を
//   返したうえで、各行を置き換える。origin 自身のパス（SHIM_ORIGIN_PATH）は環境変数 FAKE_REMOTE_URL の値へ、その他のパスは
//   SHIM_URL_MAP（「実パス|見せる URL」を 1 行ずつ）に載っていればその URL へ置き換える（実 remote はローカルのパスだが、
//   スクリプトの routing ガードは github.com の URL を要求するため。pushurl・pushInsteadOf・url の追加といった実 config の
//   書き換えは、そのまま get-url の出力に現れる）。ls-remote は呼び出し回数ごとに
//   FAKE_LS_<n> = fail（失敗）/ head（今の HEAD をリモート head として返す）で差し替えられる。それ以外はすべて実 git へ
//   exec する。すべての呼び出しを SHIM_LOG に 1 行ずつ記録するので、「routing 不一致のあとに fetch / merge / push を
//   一切呼んでいない」ことを呼び出し履歴で確かめられる。
// 偽の `gh`: tests/lib/gh-observe-stub.mjs（pr view の応答を経路キー prview で設定する）。
import { spawnSync } from 'node:child_process'
import { chmodSync, cpSync, mkdirSync, mkdtempSync, readFileSync, realpathSync, writeFileSync } from 'node:fs'
import { trackTmp } from './tmp-track.mjs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createObserveStub } from './gh-observe-stub.mjs'

export const REAL_GIT = (() => {
  const r = spawnSync('sh', ['-c', 'command -v git'], { encoding: 'utf8' })
  return r.stdout.trim()
})()

export const BRANCH = 'feat/603-x'
export const BASE = 'main'
export const REPO = 'Fandhe-AI/agent-cli-skills'
export const PR = 12
export const MERGE_SUBJECT = 'chore: base ブランチの変更を取り込む'

const SHIM = `#!/bin/sh
echo "$*" >> "\${SHIM_LOG:?}"
if [ "$1" = remote ] && [ "$2" = get-url ]; then
  out=$("\${REAL_GIT:?}" "$@") || exit $?
  printf '%s\\n' "$out" | while IFS= read -r l; do
    if [ "$l" = "\${SHIM_ORIGIN_PATH:-}" ]; then
      printf '%s\\n' "\${FAKE_REMOTE_URL-$l}"
      continue
    fi
    shown=$l
    while IFS='|' read -r a b; do
      if [ -n "$a" ] && [ "$a" = "$l" ]; then shown=$b; break; fi
    done <<EOM
\${SHIM_URL_MAP:-}
EOM
    printf '%s\\n' "$shown"
  done
  exit 0
fi
if [ "$1" = ls-remote ]; then
  c=0
  [ -f "\${SHIM_DIR:?}/ls.count" ] && c=$(cat "$SHIM_DIR/ls.count")
  c=$((c + 1))
  echo "$c" > "$SHIM_DIR/ls.count"
  eval "mode=\\\${FAKE_LS_$c:-}"
  case "$mode" in
    fail) exit 1 ;;
    head) printf '%s\\trefs/heads/%s\\n' "$("\${REAL_GIT:?}" rev-parse HEAD)" "\${FAKE_LS_BRANCH:?}"; exit 0 ;;
  esac
fi
exec "\${REAL_GIT:?}" "$@"
`

export function git(cwd, ...args) {
  const r = spawnSync(REAL_GIT, args, { cwd, encoding: 'utf8', env: gitEnv(cwd) })
  if (r.status !== 0) throw new Error(`git ${args.join(' ')} (cwd=${cwd}) 失敗: ${r.stderr}`)
  return r.stdout.trim()
}

function gitEnv(home) {
  return {
    PATH: process.env.PATH,
    HOME: home,
    GIT_CONFIG_NOSYSTEM: '1',
    GIT_CONFIG_GLOBAL: '/dev/null',
    GIT_AUTHOR_NAME: 'test',
    GIT_AUTHOR_EMAIL: 'test@example.com',
    GIT_COMMITTER_NAME: 'test',
    GIT_COMMITTER_EMAIL: 'test@example.com',
  }
}

function commit(dir, file, content, message) {
  writeFileSync(join(dir, file), content)
  git(dir, 'add', file)
  git(dir, 'commit', '-q', '-m', message)
}

// opts:
//   conflict          main とブランチが a.txt の同じ行を別内容に変える（マージでコンフリクト）
//   baseAdvanced      main がブランチ分岐後に進んでいる（既定 true）。false なら main は分岐点のまま
//   branchHasBase     ブランチが main の先頭をすでに取り込んでいる（Already up to date になる）
//   branchBehindOnly  ブランチに独自コミットが無く、main だけが進んでいる（ブランチの先頭が base に含まれる）
//   gitlinkConflict   サブモジュールのポインタ（gitlink）を main とブランチが別のコミットへ変える（マージでコンフリクト）
//   submodule         実体のあるサブモジュール sub を持つ。wt は初期化済みで、dirtySubmodule() で未コミットの変更を作れる
//
// 作り方（速度）: opts の組ごとに、origin / seed / wt（と subrepo）だけを持つ『テンプレート』を 1 回だけ実 git で作り、
// makeSandbox はそれを新しい一時ディレクトリへコピーして使う（実 git の呼び出し約 15 回 ≒ 0.5 秒 → コピー数十ミリ秒）。
// コピー後に直すのは seed と wt の .git/config にある origin の URL（テンプレートの絶対パス）だけで、テストごとに別の
// ディレクトリ・別のリポジトリ状態になる（テスト間は独立。互いの push・設定変更はコピー先だけに及ぶ）。
// サブモジュールの url（テンプレートの subrepo）と .gitmodules のコミット済みの値は書き換えない（書き換えると .gitmodules が
// 未コミットの変更になり、worktree が clean でなくなる）。テンプレートは同じプロセスの間だけ trackTmp で保持し、終了時に消える。
const templates = new Map()

export function makeSandbox(opts = {}) {
  const { conflict = false, baseAdvanced = true, branchHasBase = false, branchBehindOnly = false, gitlinkConflict = false, submodule = false } = opts
  const key = JSON.stringify({ conflict, baseAdvanced, branchHasBase, branchBehindOnly, gitlinkConflict, submodule })
  let tpl = templates.get(key)
  if (tpl === undefined) {
    tpl = buildTemplate({ conflict, baseAdvanced, branchHasBase, branchBehindOnly, gitlinkConflict, submodule })
    templates.set(key, tpl)
  }
  const root = realpathSync(trackTmp(mkdtempSync(join(tmpdir(), 'iit-base-merge-'))))
  cpSync(tpl, root, { recursive: true, preserveTimestamps: true })
  for (const repo of ['seed', 'wt']) {
    const cfg = join(root, repo, '.git', 'config')
    const text = readFileSync(cfg, 'utf8')
    const from = `${tpl}/origin.git`
    if (!text.includes(from)) throw new Error(`${cfg} にテンプレートの origin URL が無い`)
    writeFileSync(cfg, text.split(from).join(`${root}/origin.git`))
  }
  return sandboxOf(root)
}

function buildTemplate({ conflict, baseAdvanced, branchHasBase, branchBehindOnly, gitlinkConflict, submodule }) {
  const root = realpathSync(trackTmp(mkdtempSync(join(tmpdir(), 'iit-base-merge-tpl-'))))
  const origin = join(root, 'origin.git')
  const seed = join(root, 'seed')
  const wt = join(root, 'wt')
  for (const d of [origin, seed]) mkdirSync(d, { recursive: true })
  git(origin, 'init', '-q', '--bare', '-b', BASE)
  git(seed, 'init', '-q', '-b', BASE)
  commit(seed, 'a.txt', 'line1\nline2\n', 'init')
  git(seed, 'remote', 'add', 'origin', origin)
  git(seed, 'push', '-q', 'origin', BASE)
  const gl = (n) => String(n).repeat(40)
  const setGitlink = (n, msg) => {
    git(seed, 'update-index', '--add', '--cacheinfo', `160000,${gl(n)},sub`)
    git(seed, 'commit', '-q', '-m', msg)
  }
  if (gitlinkConflict) {
    setGitlink('1', 'add sub')
    git(seed, 'push', '-q', 'origin', BASE)
  }
  if (submodule) {
    const subrepo = join(root, 'subrepo')
    mkdirSync(subrepo, { recursive: true })
    git(subrepo, 'init', '-q', '-b', 'main')
    commit(subrepo, 's.txt', 's\n', 'sub init')
    git(seed, '-c', 'protocol.file.allow=always', 'submodule', 'add', '-q', subrepo, 'sub')
    git(seed, 'commit', '-q', '-m', 'add submodule')
    git(seed, 'push', '-q', 'origin', BASE)
  }
  git(seed, 'checkout', '-q', '-b', BRANCH)
  if (!branchBehindOnly) {
    if (conflict) commit(seed, 'a.txt', 'line1\nbranch side\n', 'branch change')
    else commit(seed, 'feature.txt', 'feature\n', 'feature')
  }
  if (gitlinkConflict) setGitlink('2', 'branch sub')
  git(seed, 'push', '-q', 'origin', BRANCH)
  git(seed, 'checkout', '-q', BASE)
  if (gitlinkConflict) {
    setGitlink('3', 'base sub')
    git(seed, 'push', '-q', 'origin', BASE)
  } else if (baseAdvanced) {
    if (conflict) commit(seed, 'a.txt', 'line1\nbase side\n', 'base change')
    else commit(seed, 'base.txt', 'base\n', 'base advance')
    git(seed, 'push', '-q', 'origin', BASE)
  }
  if (branchHasBase) {
    git(seed, 'checkout', '-q', BRANCH)
    git(seed, 'merge', '-q', '--no-ff', '-m', 'merge base', BASE)
    git(seed, 'push', '-q', 'origin', BRANCH)
  }
  git(root, 'clone', '-q', origin, wt)
  git(wt, 'config', 'user.name', 'test')
  git(wt, 'config', 'user.email', 'test@example.com')
  if (submodule) git(wt, '-c', 'protocol.file.allow=always', 'submodule', 'update', '--init', '-q')
  return root
}

function sandboxOf(root) {
  const origin = join(root, 'origin.git')
  const seed = join(root, 'seed')
  const wt = join(root, 'wt')
  const shimDir = join(root, 'shim')
  const tmp = join(root, 'tmp')
  for (const d of [shimDir, tmp]) mkdirSync(d, { recursive: true })
  writeFileSync(join(shimDir, 'git'), SHIM)
  chmodSync(join(shimDir, 'git'), 0o755)
  writeFileSync(join(shimDir, 'calls.log'), '')
  const stub = createObserveStub({ prview: { out: JSON.stringify({ number: PR, headRefName: BRANCH }) } })
  const urlMap = []
  return {
    root, origin, seed, wt, shimDir, tmp, stub, urlMap,
    // 別リポジトリを模す空の bare を作り、get-url で見せる URL（既定は owner が違う github.com の URL）を登録する
    makeEvil(shownUrl = 'https://github.com/evil-org/evil-repo') {
      const evil = join(root, 'evil.git')
      mkdirSync(evil, { recursive: true })
      git(evil, 'init', '-q', '--bare', '-b', BASE)
      urlMap.push(`${evil}|${shownUrl}`)
      return evil
    },
    dirtySubmodule() {
      writeFileSync(join(wt, 'sub', 's.txt'), 'dirty\n')
    },
    remoteSha: (b = BRANCH) => git(origin, 'rev-parse', `refs/heads/${b}`),
    headSha: () => git(wt, 'rev-parse', 'HEAD'),
    gitCalls: () => readFileSync(join(shimDir, 'calls.log'), 'utf8').split('\n').filter(Boolean),
    lsCalls: () => {
      try {
        return Number(readFileSync(join(shimDir, 'ls.count'), 'utf8'))
      } catch {
        return 0
      }
    },
    env(extra = {}) {
      return {
        ...gitEnv(root),
        PATH: `${shimDir}:${stub.binDir}:${process.env.PATH}`,
        GH_STUB_DIR: stub.dir,
        SHIM_LOG: join(shimDir, 'calls.log'),
        SHIM_DIR: shimDir,
        SHIM_ORIGIN_PATH: origin,
        SHIM_URL_MAP: urlMap.join('\n'),
        REAL_GIT,
        FAKE_REMOTE_URL: `https://github.com/${REPO}.git`,
        FAKE_LS_BRANCH: BRANCH,
        TMPDIR: tmp,
        ...extra,
      }
    },
    writeHook(dir, name, body) {
      mkdirSync(join(dir, 'hooks'), { recursive: true })
      writeFileSync(join(dir, 'hooks', name), `#!/bin/sh\n${body}\n`)
      chmodSync(join(dir, 'hooks', name), 0o755)
    },
  }
}
