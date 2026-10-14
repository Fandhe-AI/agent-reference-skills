// scripts/worktree-remove.sh を実 git で試すためのサンドボックス（Issue #603 第 7 弾）。ファイル名が `*.test.mjs` に一致しないため
// node --test の glob には拾われない。
//
// 構成: 一時ディレクトリの下に、メイン worktree（root/main。初期コミット a.txt・.gitignore で node_modules/ と dist/ を無視）と、
// 付属の worktree（既定は root/wts/<名前>。メインの外）を作る。submodule: true なら、サブリポジトリ（root/subrepo）を sm として
// メインに登録済みで、付属の worktree では未初期化（initSubmodule で初期化する）。
// git の呼び出しは利用者の設定に左右されないよう HOME・グローバル設定を空にし、file プロトコルの submodule だけ許す
// （スクリプト本体の環境には渡さない）。
import { spawnSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, realpathSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { trackTmp } from './tmp-track.mjs'

export function gitEnv(home, extra = {}) {
  return {
    PATH: process.env.PATH,
    HOME: home,
    GIT_CONFIG_NOSYSTEM: '1',
    GIT_CONFIG_GLOBAL: '/dev/null',
    GIT_AUTHOR_NAME: 'test',
    GIT_AUTHOR_EMAIL: 'test@example.com',
    GIT_COMMITTER_NAME: 'test',
    GIT_COMMITTER_EMAIL: 'test@example.com',
    ...extra,
  }
}

const SM_ENV = { GIT_CONFIG_COUNT: '1', GIT_CONFIG_KEY_0: 'protocol.file.allow', GIT_CONFIG_VALUE_0: 'always' }

export function makeRepo({ submodule = false } = {}) {
  const root = realpathSync(trackTmp(mkdtempSync(join(tmpdir(), 'iit-wtrm-'))))
  const main = join(root, 'main')
  const sub = join(root, 'subrepo')
  const git = (cwd, ...args) => {
    const r = spawnSync('git', args, { cwd, encoding: 'utf8', env: gitEnv(root, SM_ENV) })
    if (r.status !== 0) throw new Error(`git ${args.join(' ')} (cwd=${cwd}) 失敗: ${r.stderr}`)
    return r.stdout.trim()
  }
  const write = (dir, file, content) => {
    const p = join(dir, file)
    mkdirSync(join(p, '..'), { recursive: true })
    writeFileSync(p, content)
  }
  mkdirSync(main, { recursive: true })
  if (submodule) {
    mkdirSync(sub, { recursive: true })
    git(sub, 'init', '-q', '-b', 'main')
    write(sub, 'f', 'one\n')
    git(sub, 'add', 'f')
    git(sub, 'commit', '-q', '-m', 's1')
  }
  git(main, 'init', '-q', '-b', 'main')
  write(main, 'a.txt', 'a\n')
  write(main, '.gitignore', 'node_modules/\ndist/\n')
  git(main, 'add', '-A')
  git(main, 'commit', '-q', '-m', 'init')
  if (submodule) {
    git(main, 'submodule', 'add', '-q', sub, 'sm')
    git(main, 'commit', '-q', '-m', 'sm')
  }
  const api = {
    root,
    main,
    sub,
    git,
    write,
    // 付属の worktree を作って絶対パスを返す。dir を省略すると root/wts/<name>
    addWorktree(name, { branch = `b-${name.replace(/[^A-Za-z0-9]/g, '')}`, dir = join(root, 'wts', name) } = {}) {
      mkdirSync(join(dir, '..'), { recursive: true })
      git(main, 'worktree', 'add', '-q', dir, '-b', branch)
      return { path: dir, branch }
    },
    initSubmodule(wt) {
      git(wt, 'submodule', 'update', '-q', '--init')
    },
    head(dir, ref = 'HEAD') {
      return git(dir, 'rev-parse', ref)
    },
    branches() {
      return git(main, 'branch', '--format=%(refname:short)').split('\n').filter(Boolean)
    },
    worktrees() {
      return git(main, 'worktree', 'list', '--porcelain')
        .split('\n')
        .filter((l) => l.startsWith('worktree '))
        .map((l) => l.slice('worktree '.length))
    },
  }
  return api
}

// スクリプトを走らせる。結果の最後の 1 行（WORKTREE_REMOVE_RESULT {json}）を result に解釈して返す（無ければ null）
export function runScript(bash, script, repo, args, { cwd = repo.main, input = '', env = {} } = {}) {
  const r = spawnSync(bash, [script, ...args], { cwd, input, encoding: 'utf8', env: { ...gitEnv(repo.root), ...env } })
  const lines = r.stdout.split('\n').filter((l) => l !== '')
  const last = lines[lines.length - 1] ?? ''
  const m = /^WORKTREE_REMOVE_RESULT (\{.*\})$/.exec(last)
  return { status: r.status, stdout: r.stdout, stderr: r.stderr, result: m ? JSON.parse(m[1]) : null }
}
