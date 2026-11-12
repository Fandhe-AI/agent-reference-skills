// scripts/recover-prep.sh を実 git で走らせるテスト一式（Issue #603 第 9 弾）。bash ごとに登録する（tests/recover-prep.test.mjs が
// 1 つ目、tests/recover-prep-alt-bash.test.mjs が 2 つ目以降）。node --test はファイル単位で並列に走るので、bash ごとにファイルを
// 分けると所要が 1 つ分で済む。
//
// 検査の軸:
//   - ブランチ解決: worktree が生きていれば HEAD（state のブランチと食い違えば HEAD）、dead worktree と branch だけの残骸は記録を使う。
//     メイン・未登録・git がそのパス自身を指さない・detached・base と同名は確定せず、何も書かない（メインや無関係な repo に WIP を積まない）。
//   - WIP コミット: 汚れの観測は利用者の設定（status.showUntrackedFiles・グローバルの除外）に左右されない形。フックは通し、拒否されたら
//     wipCommitted:false。退避完了の根拠はコミット後の同じ観測が空であること（フックによる書き換え・submodule 内の変更も false）。
//   - base の取得: 失敗しても差分が空とは言わない（unknown）。stale な追跡 ref が残っていても同じ。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawn, spawnSync } from 'node:child_process'
import { chmodSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { gitEnv, makeRepo } from './worktree-sandbox.mjs'
import { toolExists } from './signed-output.mjs'
import { bundleSha256 } from '../../scripts/build-workflow.mjs'

export const SCRIPT = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'scripts', 'recover-prep.sh')
const SHA40 = /^[0-9a-f]{40}$/
const WIP_SUBJECT = 'chore(recover): 中断時の未コミット変更を退避'

// makeRepo に origin（bare）を足す。main を push 済みにして refs/remotes/origin/main を作れる状態にする
function makeRecoverRepo(opts = {}) {
  const repo = makeRepo(opts)
  const origin = join(repo.root, 'origin.git')
  mkdirSync(origin, { recursive: true })
  repo.git(origin, 'init', '-q', '--bare', '-b', 'main')
  repo.git(repo.main, 'remote', 'add', 'origin', origin)
  repo.git(repo.main, 'push', '-q', 'origin', 'main')
  repo.origin = origin
  return repo
}

export function registerRecoverPrepTests(bash) {
  const tag = `[${bash}]`
  // 結果の最後の 1 行（RECOVER_PREP_RESULT {json}）を result に解釈する（無ければ null）
  const run = (repo, args, { cwd = repo.main, env = {} } = {}) => {
    const r = spawnSync(bash, [SCRIPT, ...args], { cwd, encoding: 'utf8', env: { ...gitEnv(repo.root), ...env } })
    const lines = r.stdout.split('\n').filter((l) => l !== '')
    const m = /^RECOVER_PREP_RESULT (\{.*\})$/.exec(lines[lines.length - 1] ?? '')
    return { status: r.status, stdout: r.stdout, stderr: r.stderr, lines, result: m ? JSON.parse(m[1]) : null }
  }
  const prep = (repo, w, extra = []) => run(repo, ['--worktree', w.path, '--branch', w.branch, '--base', 'main', ...extra])
  const logSubjects = (repo, ref) => repo.git(repo.main, 'log', '--format=%s', ref).split('\n')
  const hook = (repo, name, body) => {
    const dir = join(repo.main, '.git', 'hooks')
    mkdirSync(dir, { recursive: true })
    writeFileSync(join(dir, name), `#!/bin/sh\n${body}\n`)
    chmodSync(join(dir, name), 0o755)
  }
  // 結果の全項目を一度に確かめる（余計な項目が増えても気付く）
  const KEYS = ['resolved', 'reason', 'branch', 'source', 'worktreeMissing', 'wip', 'wipCommitted', 'dirty', 'branchExists', 'branchSha', 'baseFetched', 'baseSha', 'diff', 'commitsAhead', 'filesChanged', 'detached']

  test(`${tag} clean な live worktree: HEAD のブランチを解決し、WIP は作らず、base を取得して差分が空と判定する`, () => {
    const repo = makeRecoverRepo()
    const a = repo.addWorktree('a')
    const before = repo.head(a.path)
    const r = prep(repo, a)
    assert.equal(r.status, 0, r.stderr)
    assert.deepEqual(Object.keys(r.result), KEYS)
    assert.deepEqual(r.result, {
      resolved: true, reason: '', branch: a.branch, source: 'worktree', worktreeMissing: false, wip: 'none', wipCommitted: true, dirty: 0,
      branchExists: true, branchSha: before, baseFetched: true, baseSha: repo.head(repo.main), diff: 'empty', commitsAhead: 0, filesChanged: 0, detached: 'none',
    })
    assert.equal(r.lines.length, 1, '標準出力は結果の 1 行だけ')
    assert.equal(repo.head(a.path), before)
  })

  const DIRTY_ROWS = [
    ['追跡ファイルの変更', (r, w) => r.write(w, 'a.txt', 'changed\n'), ['a.txt']],
    ['staged のみ', (r, w) => { r.write(w, 'c.txt', 'c\n'); r.git(w, 'add', 'c.txt') }, ['c.txt']],
    ['未追跡', (r, w) => r.write(w, 'u.txt', 'u\n'), ['u.txt']],
    ['未追跡（深い階層）', (r, w) => r.write(w, 'deep/er/u.txt', 'u\n'), ['deep/er/u.txt']],
    ['追跡の変更 + staged + 未追跡', (r, w) => { r.write(w, 'a.txt', 'x\n'); r.write(w, 's.txt', 's\n'); r.git(w, 'add', 's.txt'); r.write(w, 'u.txt', 'u\n') }, ['a.txt', 's.txt', 'u.txt']],
  ]
  for (const [name, setup, files] of DIRTY_ROWS) {
    test(`${tag} ${name}: WIP コミットを対象ブランチへ積み、退避完了（wipCommitted:true）。worktree は clean になる`, () => {
      const repo = makeRecoverRepo()
      const a = repo.addWorktree('a')
      setup(repo, a.path)
      const base = repo.head(a.path)
      const r = prep(repo, a)
      assert.equal(r.status, 0, r.stderr)
      assert.equal(r.result.wip, 'committed')
      assert.equal(r.result.wipCommitted, true)
      assert.ok(r.result.dirty >= 1, `WIP の前の汚れの件数: ${JSON.stringify(r.result)}`)
      assert.equal(repo.git(a.path, 'status', '--porcelain'), '')
      assert.equal(logSubjects(repo, a.branch)[0], WIP_SUBJECT)
      assert.equal(repo.git(a.path, 'rev-parse', 'HEAD~1'), base)
      assert.equal(r.result.branchSha, repo.head(a.path), '結果の branchSha は WIP を含む先頭')
      assert.deepEqual(repo.git(a.path, 'show', '--name-only', '--format=', 'HEAD').split('\n').sort(), [...files].sort())
      assert.deepEqual([r.result.diff, r.result.commitsAhead, r.result.filesChanged], ['nonempty', 1, files.length])
    })
  }

  // Issue #718: type を限定する commit-msg フックのもとでも WIP 退避が成功する（旧件名 wip(...) は type 検証で拒否されていた）
  const TYPE_HOOK = 'head -n1 "$1" | grep -Eq \'^(feat|fix|perf|refactor|test|docs|build|ci|chore)(\\([^)]+\\))?!?: .+\' || { echo "type-enum" >&2; exit 1; }'
  test(`${tag} type を限定する commit-msg フックを通り、WIP 退避が成功する（Issue #718）`, () => {
    const repo = makeRecoverRepo()
    hook(repo, 'commit-msg', TYPE_HOOK)
    const a = repo.addWorktree('a')
    repo.write(a.path, 'a.txt', 'changed\n')
    repo.write(a.path, 'u.txt', 'u\n')
    const r = prep(repo, a)
    assert.equal(r.status, 0, r.stderr)
    assert.equal(r.result.wip, 'committed')
    assert.equal(r.result.wipCommitted, true)
    assert.equal(repo.git(a.path, 'status', '--porcelain'), '')
    assert.equal(logSubjects(repo, a.branch)[0], WIP_SUBJECT)
    assert.equal(r.lines.length, 1, '標準出力は結果の 1 行だけ')
  })

  test(`${tag} 同じ型限定フックの検査式は旧件名 wip(recover) を拒否し chore(recover) を通す（回帰の対照）`, () => {
    // 実 git のフックと同じく件名はファイル経由で渡す（/dev/stdin は環境差が出る）
    const dir = mkdtempSync(join(tmpdir(), 'recover-hook-'))
    try {
      const check = (subject) => {
        const f = join(dir, 'msg')
        writeFileSync(f, `${subject}\n`)
        return spawnSync('sh', ['-c', TYPE_HOOK, 'sh', f], { encoding: 'utf8' }).status
      }
      assert.equal(check('wip(recover): 中断時の未コミット変更を退避'), 1)
      assert.equal(check(WIP_SUBJECT), 0)
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  test(`${tag} ignore 対象のみ（node_modules・dist）: 汚れに数えず WIP は作らない`, () => {
    const repo = makeRecoverRepo()
    const a = repo.addWorktree('a')
    repo.write(a.path, 'node_modules/x/i.js', 'i\n')
    repo.write(a.path, 'dist/o', 'o\n')
    const before = repo.head(a.path)
    const r = prep(repo, a)
    assert.deepEqual([r.result.wip, r.result.wipCommitted, r.result.dirty], ['none', true, 0])
    assert.equal(repo.head(a.path), before)
    assert.ok(existsSync(join(a.path, 'node_modules', 'x', 'i.js')))
  })

  test(`${tag} status.showUntrackedFiles=no でも未追跡を汚れとして数え、WIP に含める（素の status では見えない）`, () => {
    const repo = makeRecoverRepo()
    repo.git(repo.main, 'config', 'status.showUntrackedFiles', 'no')
    const a = repo.addWorktree('a')
    repo.write(a.path, 'precious.txt', '大事\n')
    assert.equal(repo.git(a.path, 'status', '--porcelain'), '', '前提: 設定で素の status は未追跡を隠す')
    const r = prep(repo, a)
    assert.deepEqual([r.result.wip, r.result.wipCommitted, r.result.dirty], ['committed', true, 1])
    assert.equal(repo.git(a.path, 'show', '--name-only', '--format=', 'HEAD'), 'precious.txt')
  })

  test(`${tag} グローバルの除外（core.excludesFile）に載った未追跡ファイルは add -A に拾われず、観測では汚れ: residual-dirty・wipCommitted:false。リポジトリの .gitignore は従う`, () => {
    const repo = makeRecoverRepo()
    const globalIgnore = join(repo.root, 'global-ignore')
    writeFileSync(globalIgnore, '.env\n')
    const globalConfig = join(repo.root, 'global-gitconfig')
    writeFileSync(globalConfig, `[core]\n\texcludesFile = ${globalIgnore}\n`)
    const a = repo.addWorktree('a')
    repo.write(a.path, '.env', 'KEY=1\n')
    repo.write(a.path, 'node_modules/x/i.js', 'i\n')
    repo.write(a.path, 'a.txt', 'changed\n')
    const r = run(repo, ['--worktree', a.path, '--branch', a.branch, '--base', 'main'], { env: { GIT_CONFIG_GLOBAL: globalConfig } })
    assert.deepEqual([r.result.wip, r.result.wipCommitted, r.result.dirty], ['residual-dirty', false, 2])
    assert.deepEqual(repo.git(a.path, 'show', '--name-only', '--format=', 'HEAD'), 'a.txt', '拾われる変更だけ積む')
    // 汚れが除外に載ったファイルだけのとき、コミットできるものが無く commit は失敗する（これも退避完了にしない）
    const b = repo.addWorktree('b')
    repo.write(b.path, '.env', 'KEY=1\n')
    const only = run(repo, ['--worktree', b.path, '--branch', b.branch, '--base', 'main'], { env: { GIT_CONFIG_GLOBAL: globalConfig } })
    assert.deepEqual([only.result.wip, only.result.wipCommitted], ['commit-failed', false])
    assert.ok(existsSync(join(a.path, '.env')), '触らない')
  })

  test(`${tag} フックが拒否したら commit-failed・wipCommitted:false。--no-verify で強行せず、変更はそのまま残る`, () => {
    const repo = makeRecoverRepo()
    hook(repo, 'pre-commit', 'echo "reject" >&2; exit 1')
    const a = repo.addWorktree('a')
    repo.write(a.path, 'a.txt', 'changed\n')
    repo.write(a.path, 'u.txt', 'u\n')
    const before = repo.head(a.path)
    const r = prep(repo, a)
    assert.equal(r.status, 0, r.stderr)
    assert.deepEqual([r.result.wip, r.result.wipCommitted, r.result.resolved, r.result.branch], ['commit-failed', false, true, a.branch])
    assert.equal(repo.head(a.path), before, 'コミットは作られない')
    assert.equal(readFileSync(join(a.path, 'u.txt'), 'utf8'), 'u\n')
    assert.equal(readFileSync(join(a.path, 'a.txt'), 'utf8'), 'changed\n')
    assert.equal(r.lines.length, 1, 'フックの出力は標準出力に混ざらない（最後の 1 行が結果）')
  })

  test(`${tag} フックがコミット成功のあとにもファイルを残す（書き換え）: コミットは成功しても観測が空でないので residual-dirty・wipCommitted:false`, () => {
    const repo = makeRecoverRepo()
    // pre-commit が新しい未追跡ファイルを作って成功する（formatter が生成物を書く状況）
    hook(repo, 'pre-commit', 'echo gen > generated.txt')
    const a = repo.addWorktree('a')
    repo.write(a.path, 'a.txt', 'changed\n')
    const r = prep(repo, a)
    assert.deepEqual([r.result.wip, r.result.wipCommitted], ['residual-dirty', false])
    assert.equal(logSubjects(repo, a.branch)[0], WIP_SUBJECT, 'コミット自体は作られている')
    assert.ok(existsSync(join(a.path, 'generated.txt')))
  })

  test(`${tag} 未マージのエントリ（コンフリクト中）: 触らず unmerged・wipCommitted:false`, () => {
    const repo = makeRecoverRepo()
    const a = repo.addWorktree('a')
    repo.write(a.path, 'a.txt', 'L\n')
    repo.git(a.path, 'commit', '-q', '-am', 'L')
    repo.write(repo.main, 'a.txt', 'R\n')
    repo.git(repo.main, 'commit', '-q', '-am', 'R')
    spawnSync('git', ['merge', 'main'], { cwd: a.path, env: gitEnv(repo.root), encoding: 'utf8' })
    const before = repo.head(a.path)
    const r = prep(repo, a)
    assert.deepEqual([r.result.wip, r.result.wipCommitted], ['unmerged', false])
    assert.equal(repo.head(a.path), before, 'マージを確定させない')
    assert.match(readFileSync(join(a.path, 'a.txt'), 'utf8'), /<<<<<<</)
  })

  test(`${tag} 入れ子の独立 git リポジトリ: add -A はポインタだけを記録して中身を失うので触らず nested-repo・wipCommitted:false`, () => {
    const repo = makeRecoverRepo()
    const a = repo.addWorktree('a')
    mkdirSync(join(a.path, 'nested'), { recursive: true })
    repo.git(join(a.path, 'nested'), 'init', '-q')
    repo.write(a.path, 'nested/x', 'x\n')
    const before = repo.head(a.path)
    const r = prep(repo, a)
    assert.deepEqual([r.result.wip, r.result.wipCommitted], ['nested-repo', false])
    assert.equal(repo.head(a.path), before)
  })

  // パスが C 引用で出る名前（非 ASCII・"・\・タブ・改行）の入れ子 repo。-z なしの status は `? "…/"` と出すので末尾 / の検出が取りこぼし、
  // gitlink だけを WIP コミットして wipCommitted:true にしていた
  const QUOTED_NAMES = [['非 ASCII', '日本語'], ['二重引用符', 'q"x'], ['バックスラッシュ', 'b\\s'], ['タブ', 'a\tb'], ['改行', 'n\nl'], ['空白', 'sp ace'], ['全部入り', '日"\\\t\nx']]
  for (const [label, name] of QUOTED_NAMES) {
    test(`${tag} 引用される名前（${label}）の入れ子の独立 git リポジトリ: nested-repo・wipCommitted:false。gitlink だけを WIP コミットしない`, () => {
      const repo = makeRecoverRepo()
      const a = repo.addWorktree('a')
      mkdirSync(join(a.path, name), { recursive: true })
      repo.git(join(a.path, name), 'init', '-q')
      repo.write(a.path, `${name}/x`, 'x\n')
      repo.write(a.path, 'u.txt', 'u\n')
      const before = repo.head(a.path)
      const r = prep(repo, a)
      assert.equal(r.status, 0, r.stderr)
      assert.deepEqual([r.result.wip, r.result.wipCommitted], ['nested-repo', false])
      assert.equal(repo.head(a.path), before, '何もコミットしない')
      assert.equal(readFileSync(join(a.path, name, 'x'), 'utf8'), 'x\n')
    })
  }

  test(`${tag} 引用される名前の通常ファイルと rename: パスは無加工で数え（rename は 1 件）、WIP に積んで退避完了`, () => {
    const repo = makeRecoverRepo()
    const a = repo.addWorktree('a')
    repo.git(a.path, 'mv', 'a.txt', 'r"enamed 日本.txt')
    repo.write(a.path, 'q"y\t.txt', 'q\n')
    repo.write(a.path, '日本語.txt', 'j\n')
    const r = prep(repo, a)
    assert.deepEqual([r.result.wip, r.result.wipCommitted, r.result.dirty], ['committed', true, 3], '改名 1 + 未追跡 2（改名の元のパスを別の件として数えない）')
    assert.equal(repo.git(a.path, 'status', '--porcelain'), '')
    assert.equal(logSubjects(repo, a.branch)[0], WIP_SUBJECT)
  })

  // マージ・cherry-pick・revert の途中は、HEAD がブランチを指したまま staged の変更が残る。add -A は途中状態を確定させるので触らない
  const IN_PROGRESS_ROWS = [
    ['マージ（--no-commit）', (repo, a) => {
      repo.write(repo.main, 'm.txt', 'm\n')
      repo.git(repo.main, 'add', 'm.txt')
      repo.git(repo.main, 'commit', '-q', '-m', 'm')
      repo.git(a.path, 'merge', '-q', '--no-commit', '--no-ff', 'main')
      return 'MERGE_HEAD'
    }],
    ['cherry-pick（エディタが失敗して commit に至らず止まる）', (repo, a) => {
      repo.write(repo.main, 'm.txt', 'm\n')
      repo.git(repo.main, 'add', 'm.txt')
      repo.git(repo.main, 'commit', '-q', '-m', 'm')
      spawnSync('git', ['cherry-pick', '-e', 'main'], { cwd: a.path, env: { ...gitEnv(repo.root), GIT_EDITOR: 'false' }, encoding: 'utf8' })
      return 'CHERRY_PICK_HEAD'
    }],
    ['revert（--no-commit で止まる）', (repo, a) => {
      repo.write(a.path, 'v.txt', 'v\n')
      repo.git(a.path, 'add', 'v.txt')
      repo.git(a.path, 'commit', '-q', '-m', 'v')
      spawnSync('git', ['revert', '-n', 'HEAD'], { cwd: a.path, env: gitEnv(repo.root), encoding: 'utf8' })
      return 'REVERT_HEAD'
    }],
  ]
  for (const [name, setup] of IN_PROGRESS_ROWS) {
    test(`${tag} ${name}の途中: 触らず in-progress・wipCommitted:false。途中状態を確定させない`, () => {
      const repo = makeRecoverRepo()
      const a = repo.addWorktree('a')
      const ref = setup(repo, a)
      assert.ok(spawnSync('git', ['rev-parse', '-q', '--verify', ref], { cwd: a.path, env: gitEnv(repo.root) }).status === 0, `前提: ${ref} がある`)
      assert.ok(Number(repo.git(a.path, 'status', '--porcelain').split('\n').filter(Boolean).length) >= 1, '前提: 汚れがある')
      const before = repo.head(a.path)
      const r = prep(repo, a)
      assert.equal(r.status, 0, r.stderr)
      assert.deepEqual([r.result.wip, r.result.wipCommitted], ['in-progress', false])
      assert.equal(repo.head(a.path), before, 'コミットを作らない')
      assert.equal(spawnSync('git', ['rev-parse', '-q', '--verify', ref], { cwd: a.path, env: gitEnv(repo.root) }).status, 0, `${ref} は残る`)
    })
  }

  test(`${tag} フックが commit のあとで変更を捨てる（post-commit の reset --hard）: 終了コード成功・汚れ無しでも empty-commit・wipCommitted:false`, () => {
    const repo = makeRecoverRepo()
    hook(repo, 'post-commit', 'git reset -q --hard HEAD~1')
    const a = repo.addWorktree('a')
    repo.write(a.path, 'a.txt', 'changed\n')
    const before = repo.head(a.path)
    const r = prep(repo, a)
    assert.equal(r.status, 0, r.stderr)
    assert.deepEqual([r.result.wip, r.result.wipCommitted, r.result.resolved], ['empty-commit', false, true])
    assert.equal(repo.head(a.path), before, 'HEAD は進んでいない')
    assert.equal(repo.git(a.path, 'status', '--porcelain'), '', '汚れは無く見える（変更は捨てられた）')
  })

  test(`${tag} フックが commit のあとで変更を捨て、空のコミットを積む（HEAD は進むが前の HEAD との差分が空）: empty-commit・wipCommitted:false`, () => {
    const repo = makeRecoverRepo()
    hook(repo, 'post-commit', 'if [ -z "$RP_TEST_NESTED" ]; then RP_TEST_NESTED=1 git reset -q --hard HEAD~1 && RP_TEST_NESTED=1 git commit -q --allow-empty -m e; fi')
    const a = repo.addWorktree('a')
    repo.write(a.path, 'a.txt', 'changed\n')
    const before = repo.head(a.path)
    const r = prep(repo, a)
    assert.deepEqual([r.result.wip, r.result.wipCommitted], ['empty-commit', false])
    assert.notEqual(repo.head(a.path), before, '前提: HEAD は進んでいる')
    assert.equal(repo.git(a.path, 'diff', '--name-only', before, 'HEAD'), '', '前提: 差分は空')
  })

  test(`${tag} コミット後の観測が失敗する（post-commit が index を壊す）: コミットは作られても unverified・wipCommitted:false。clean と見なさない`, () => {
    const repo = makeRecoverRepo()
    hook(repo, 'post-commit', 'echo garbage > "$(git rev-parse --git-path index)"')
    const a = repo.addWorktree('a')
    repo.write(a.path, 'a.txt', 'changed\n')
    const r = prep(repo, a)
    assert.deepEqual([r.result.wip, r.result.wipCommitted, r.result.dirty], ['unverified', false, 1], 'dirty は WIP の前の件数')
    assert.equal(logSubjects(repo, a.branch)[0], WIP_SUBJECT)
  })

  const smTest = toolExists('git') ? test : test.skip
  smTest(`${tag} submodule 初期化済み・clean: WIP は作らず wipCommitted:true（初期化済み submodule の保持は worktree-remove.sh が判定する）`, () => {
    const repo = makeRecoverRepo({ submodule: true })
    repo.git(repo.main, 'push', '-q', 'origin', 'main')
    const a = repo.addWorktree('a')
    repo.initSubmodule(a.path)
    const r = prep(repo, a)
    assert.deepEqual([r.result.wip, r.result.wipCommitted, r.result.dirty], ['none', true, 0])
  })

  smTest(`${tag} submodule 内の未コミット変更: 親の WIP コミットに入らないので submodule・wipCommitted:false。ほかの変更は WIP に積む`, () => {
    const repo = makeRecoverRepo({ submodule: true })
    repo.git(repo.main, 'push', '-q', 'origin', 'main')
    // 利用者の設定が submodule の変更を隠していても観測する（--ignore-submodules=none）
    repo.git(repo.main, 'config', 'diff.ignoreSubmodules', 'all')
    const a = repo.addWorktree('a')
    repo.initSubmodule(a.path)
    repo.write(a.path, 'sm/f', 'dirty-in-submodule\n')
    assert.equal(repo.git(a.path, 'status', '--porcelain'), '', '前提: 設定で素の status は submodule 内の変更を隠す')
    const only = prep(repo, a)
    assert.deepEqual([only.result.wip, only.result.wipCommitted], ['submodule', false], 'コミットできるものが無い（commit が失敗しても submodule と分類する）')
    repo.write(a.path, 'u.txt', 'u\n')
    const mixed = prep(repo, a)
    assert.deepEqual([mixed.result.wip, mixed.result.wipCommitted], ['submodule', false])
    assert.equal(logSubjects(repo, a.branch)[0], WIP_SUBJECT, '親で記録できる変更は積む')
    assert.equal(readFileSync(join(a.path, 'sm', 'f'), 'utf8'), 'dirty-in-submodule\n')
  })

  test(`${tag} 汚れを観測できない（index が壊れて status が失敗）: unverified・dirty:-1・wipCommitted:false。clean と見なして退避完了にしない`, () => {
    const repo = makeRecoverRepo()
    const a = repo.addWorktree('a')
    repo.write(a.path, 'u.txt', 'u\n')
    writeFileSync(join(repo.git(a.path, 'rev-parse', '--absolute-git-dir'), 'index'), 'garbage')
    const before = repo.head(a.path)
    const r = prep(repo, a)
    assert.deepEqual([r.result.resolved, r.result.wip, r.result.wipCommitted, r.result.dirty], [true, 'unverified', false, -1])
    assert.equal(repo.head(a.path), before)
  })

  // ---- ブランチ解決 ----
  test(`${tag} state のブランチと worktree の HEAD が食い違う: HEAD を優先し、WIP は HEAD のブランチへ積む（state のブランチは動かさない）`, () => {
    const repo = makeRecoverRepo()
    const a = repo.addWorktree('a')
    const other = repo.addWorktree('other')
    repo.write(a.path, 'u.txt', 'u\n')
    const otherBefore = repo.head(other.path)
    const r = run(repo, ['--worktree', a.path, '--branch', other.branch, '--base', 'main'])
    assert.deepEqual([r.result.resolved, r.result.branch, r.result.source, r.result.wip], [true, a.branch, 'worktree', 'committed'])
    assert.equal(logSubjects(repo, a.branch)[0], WIP_SUBJECT)
    assert.equal(repo.head(other.path), otherBefore)
  })

  test(`${tag} state にブランチが無くても live なら HEAD から解決する`, () => {
    const repo = makeRecoverRepo()
    const a = repo.addWorktree('a')
    const r = run(repo, ['--worktree', a.path, '--base', 'main'])
    assert.deepEqual([r.result.resolved, r.result.branch, r.result.source], [true, a.branch, 'worktree'])
  })

  test(`${tag} dead worktree（パスが無い）: 記録されたブランチへ切り替え、WIP は不要（wipCommitted:true・worktreeMissing:true）。差分は branch に対して調べる`, () => {
    const repo = makeRecoverRepo()
    const a = repo.addWorktree('a')
    repo.write(a.path, 'f.txt', 'f\n')
    repo.git(a.path, 'add', 'f.txt')
    repo.git(a.path, 'commit', '-q', '-m', 'f')
    const sha = repo.head(a.path)
    spawnSync('rm', ['-r', a.path])
    const r = prep(repo, a)
    assert.deepEqual(
      [r.result.resolved, r.result.branch, r.result.source, r.result.worktreeMissing, r.result.wip, r.result.wipCommitted, r.result.diff, r.result.branchSha],
      [true, a.branch, 'state', true, 'skipped', true, 'nonempty', sha],
    )
  })

  test(`${tag} dead worktree で記録のブランチも無い: 対象なし（branch 空）で確定。取り残すデータは無いので wipCommitted:true`, () => {
    const repo = makeRecoverRepo()
    const missing = join(repo.root, 'wts', 'gone')
    const r = run(repo, ['--worktree', missing, '--base', 'main'])
    assert.deepEqual(
      [r.result.resolved, r.result.branch, r.result.source, r.result.worktreeMissing, r.result.wip, r.result.wipCommitted, r.result.branchExists, r.result.diff],
      [true, '', 'none', true, 'skipped', true, false, 'unknown'],
    )
  })

  test(`${tag} branch だけの残骸: 記録のブランチを使い、WIP は不要。差分を調べる`, () => {
    const repo = makeRecoverRepo()
    const a = repo.addWorktree('a')
    repo.git(repo.main, 'worktree', 'remove', '--force', a.path)
    const r = run(repo, ['--branch', a.branch, '--base', 'main'])
    assert.deepEqual([r.result.resolved, r.result.branch, r.result.source, r.result.worktreeMissing, r.result.wip, r.result.wipCommitted, r.result.diff], [true, a.branch, 'state', false, 'skipped', true, 'empty'])
  })

  test(`${tag} branch だけの残骸でブランチが実在しない: branchExists:false・diff:unknown（空とは言わない）`, () => {
    const repo = makeRecoverRepo()
    const r = run(repo, ['--branch', 'feat/9-nothing', '--base', 'main'])
    assert.deepEqual([r.result.resolved, r.result.branch, r.result.branchExists, r.result.branchSha, r.result.diff], [true, 'feat/9-nothing', false, '', 'unknown'])
  })

  // Issue #731: Review の fix が detached HEAD に残したコミットは、ブランチ先端が HEAD の祖先なら取り込んで継続・破棄できる。
  // 分岐・先行・使用中・途中状態・記録なしなどは従来どおり確定せず（detached）、何も書かない
  const DETACHED_KEEP = ['resolved', 'reason', 'branch', 'wip', 'wipCommitted', 'diff', 'detached']
  const detachedWith = (repo, { commit = true } = {}) => {
    const a = repo.addWorktree('a')
    repo.git(a.path, 'checkout', '-q', '--detach')
    if (commit) {
      repo.write(a.path, 'fix.txt', 'fix\n')
      repo.git(a.path, 'add', 'fix.txt')
      repo.git(a.path, 'commit', '-q', '-m', 'fix: 指摘への対応')
    }
    return a
  }
  const expectKept = (repo, a, r, why, before) => {
    assert.equal(r.status, 0, r.stderr)
    assert.deepEqual(DETACHED_KEEP.map((k) => r.result[k]), [false, 'detached', '', 'skipped', false, 'unknown', why])
    assert.equal(repo.head(a.path), before.head, 'worktree の HEAD は動かない')
    assert.equal(repo.head(repo.main, `refs/heads/${a.branch}`), before.tip, 'ブランチ ref は動かない')
    assert.equal(repo.git(a.path, 'rev-parse', '--abbrev-ref', 'HEAD'), 'HEAD', 'detached のまま')
    assert.equal(r.result.baseFetched, false, '確定しなければ fetch もしない')
  }
  const snap = (repo, a) => ({ head: repo.head(a.path), tip: repo.head(repo.main, `refs/heads/${a.branch}`) })

  test(`${tag} detached の子孫コミット: ブランチを先端まで進めて worktree を付け直し、通常の live として確定する（Issue #731）`, () => {
    const repo = makeRecoverRepo()
    const a = detachedWith(repo)
    const child = repo.head(a.path)
    const r = prep(repo, a)
    assert.equal(r.status, 0, r.stderr)
    assert.deepEqual(Object.keys(r.result), KEYS)
    assert.deepEqual([r.result.resolved, r.result.branch, r.result.source, r.result.detached, r.result.wip, r.result.wipCommitted], [true, a.branch, 'worktree', 'attached', 'none', true])
    assert.equal(repo.head(repo.main, `refs/heads/${a.branch}`), child)
    assert.equal(repo.git(a.path, 'symbolic-ref', 'HEAD'), `refs/heads/${a.branch}`)
    assert.equal(repo.git(a.path, 'status', '--porcelain'), '')
    assert.deepEqual([r.result.branchSha, r.result.diff, r.result.commitsAhead], [child, 'nonempty', 1])
  })

  test(`${tag} detached の子孫コミットを付け直したあと、worktree-remove.sh の discard（--expect-branch）が通り、コミットはブランチに残る（Issue #731）`, () => {
    const repo = makeRecoverRepo()
    const a = detachedWith(repo)
    const child = repo.head(a.path)
    assert.equal(prep(repo, a).result.detached, 'attached')
    const rm = spawnSync(bash, [join(dirname(SCRIPT), 'worktree-remove.sh'), 'remove', '--mode', 'discard', '--path', a.path, '--expect-branch', a.branch], { cwd: repo.main, encoding: 'utf8', env: gitEnv(repo.root) })
    const last = rm.stdout.split('\n').filter(Boolean).pop() ?? ''
    const res = JSON.parse(last.replace(/^WORKTREE_REMOVE_RESULT /, ''))
    assert.equal(res.ok, true, rm.stdout + rm.stderr)
    assert.ok(!existsSync(a.path))
    assert.equal(repo.head(repo.main, `refs/heads/${a.branch}`), child)
  })

  test(`${tag} detached HEAD がブランチ先端と同一: 付け直すだけで確定する（Issue #731）`, () => {
    const repo = makeRecoverRepo()
    const a = detachedWith(repo, { commit: false })
    const r = prep(repo, a)
    assert.deepEqual([r.result.resolved, r.result.branch, r.result.detached, r.result.diff], [true, a.branch, 'attached', 'empty'])
    assert.equal(repo.git(a.path, 'symbolic-ref', 'HEAD'), `refs/heads/${a.branch}`)
  })

  test(`${tag} detached の子孫コミットに未コミット変更がある: 付け直したあと WIP コミットがブランチの先頭に積まれる（Issue #731）`, () => {
    const repo = makeRecoverRepo()
    const a = detachedWith(repo)
    const child = repo.head(a.path)
    repo.write(a.path, 'u.txt', 'u\n')
    const r = prep(repo, a)
    assert.deepEqual([r.result.resolved, r.result.detached, r.result.wip, r.result.wipCommitted], [true, 'attached', 'committed', true])
    assert.equal(logSubjects(repo, a.branch)[0], WIP_SUBJECT)
    assert.equal(repo.git(repo.main, 'rev-parse', `refs/heads/${a.branch}~1`), child)
    assert.equal(repo.git(a.path, 'status', '--porcelain'), '')
  })

  test(`${tag} detached でブランチが HEAD と分岐している: 確定せず（detached）、何も動かさない`, () => {
    const repo = makeRecoverRepo()
    const a = detachedWith(repo)
    repo.write(repo.main, 'm.txt', 'm\n')
    repo.git(repo.main, 'add', 'm.txt')
    repo.git(repo.main, 'commit', '-q', '-m', 'other')
    repo.git(repo.main, 'update-ref', `refs/heads/${a.branch}`, repo.head(repo.main))
    const before = snap(repo, a)
    expectKept(repo, a, prep(repo, a), 'diverged', before)
  })

  test(`${tag} detached でブランチが HEAD より先行している: 確定せず（detached）、何も動かさない`, () => {
    const repo = makeRecoverRepo()
    const a = detachedWith(repo, { commit: false })
    repo.write(repo.main, 'm.txt', 'm\n')
    repo.git(repo.main, 'add', 'm.txt')
    repo.git(repo.main, 'commit', '-q', '-m', 'other')
    repo.git(repo.main, 'update-ref', `refs/heads/${a.branch}`, repo.head(repo.main))
    const before = snap(repo, a)
    expectKept(repo, a, prep(repo, a), 'diverged', before)
  })

  test(`${tag} detached でブランチを別の worktree が checkout 中: 確定せず（detached）、何も動かさない`, () => {
    const repo = makeRecoverRepo()
    const a = detachedWith(repo)
    repo.git(repo.main, 'worktree', 'add', '-q', join(repo.root, 'wts', 'other'), a.branch)
    const before = snap(repo, a)
    expectKept(repo, a, prep(repo, a), 'in-use', before)
  })

  // Issue #755: ブランチを握ったままの使い捨て worktree（Claude Code の lock・clean・HEAD が先端）は、付け直しの前に先端のコミットへ detached にして解放する。
  // それ以外の握り手は従来どおり in-use のまま保全する（何も書かない）
  const holderOf = (repo, a, { lock = `claude agent x (pid ${process.pid})`, name = 'holder' } = {}) => {
    const dir = join(repo.root, 'wts', name)
    repo.git(repo.main, 'worktree', 'add', '-q', dir, a.branch)
    if (lock !== null) repo.git(repo.main, 'worktree', 'lock', '--reason', lock, dir)
    return dir
  }
  const holderHeld = (repo, dir, a) => repo.git(dir, 'rev-parse', '--abbrev-ref', 'HEAD') === a.branch
  const expectHolderKept = (repo, a, h, why) => {
    const before = snap(repo, a)
    expectKept(repo, a, prep(repo, a), why, before)
    assert.ok(holderHeld(repo, h, a), '握り手はブランチ上のまま')
  }

  for (const [label, lock] of [
    ['生きた pid（このランのセッション = 祖先）', `claude agent x (pid ${process.pid})`],
    ['死んだ pid', 'claude agent x (pid 999999)'],
    ['start つき', `claude agent x (pid ${process.pid} start 123)`],
    ['session 形', `claude session x (pid ${process.pid})`],
  ]) {
    test(`${tag} detached の子孫コミットで握り手が使い捨て（${label}）: 握り手を先端へ detached にして付け直し、ブランチが fix の HEAD へ進む（Issue #755）`, () => {
      const repo = makeRecoverRepo()
      const a = detachedWith(repo)
      const tip = repo.head(repo.main, `refs/heads/${a.branch}`)
      const child = repo.head(a.path)
      const h = holderOf(repo, a, { lock })
      const r = prep(repo, a)
      assert.equal(r.status, 0, r.stderr)
      assert.deepEqual(Object.keys(r.result), KEYS)
      assert.deepEqual([r.result.resolved, r.result.detached, r.result.branch], [true, 'attached', a.branch])
      assert.equal(repo.head(repo.main, `refs/heads/${a.branch}`), child)
      assert.equal(repo.git(a.path, 'symbolic-ref', 'HEAD'), `refs/heads/${a.branch}`)
      assert.equal(repo.git(h, 'rev-parse', '--abbrev-ref', 'HEAD'), 'HEAD', '握り手は detached')
      assert.equal(repo.head(h), tip, '握り手は先端のコミットに残る')
      assert.equal(repo.git(h, 'status', '--porcelain'), '')
      assert.match(r.stderr, /detached にした/)
    })
  }

  test(`${tag} 握り手を解放して付け直したあと、fix の worktree の discard が通り、コミットはブランチに残る。別の worktree が同じブランチを checkout できる（Issue #755）`, () => {
    const repo = makeRecoverRepo()
    const a = detachedWith(repo)
    const child = repo.head(a.path)
    holderOf(repo, a)
    assert.equal(prep(repo, a).result.detached, 'attached')
    const rm = spawnSync(bash, [join(dirname(SCRIPT), 'worktree-remove.sh'), 'remove', '--mode', 'discard', '--path', a.path, '--expect-branch', a.branch], { cwd: repo.main, encoding: 'utf8', env: gitEnv(repo.root) })
    const res = JSON.parse((rm.stdout.split('\n').filter(Boolean).pop() ?? '').replace(/^WORKTREE_REMOVE_RESULT /, ''))
    assert.equal(res.ok, true, rm.stdout + rm.stderr)
    assert.equal(repo.head(repo.main, `refs/heads/${a.branch}`), child)
    repo.git(repo.main, 'worktree', 'add', '-q', join(repo.root, 'wts', 'again'), a.branch)
  })

  test(`${tag} 握り手が lock の無い worktree・手動の lock: 解放せず in-use のまま保全する（Issue #755）`, () => {
    for (const lock of [null, 'manual lock by user']) {
      const repo = makeRecoverRepo()
      const a = detachedWith(repo)
      const h = holderOf(repo, a, { lock })
      expectHolderKept(repo, a, h, 'in-use')
    }
  })

  test(`${tag} 握り手が汚れている（追跡の変更・未追跡）: 解放せず in-use のまま保全する（Issue #755）`, () => {
    for (const dirty of [(r, h) => r.write(h, 'a.txt', 'changed\n'), (r, h) => r.write(h, 'u.txt', 'u\n')]) {
      const repo = makeRecoverRepo()
      const a = detachedWith(repo)
      const h = holderOf(repo, a)
      dirty(repo, h)
      expectHolderKept(repo, a, h, 'in-use')
    }
  })

  test(`${tag} 握り手がマージの途中: 解放せず in-use のまま保全する（Issue #755）`, () => {
    const repo = makeRecoverRepo()
    const a = detachedWith(repo)
    const h = holderOf(repo, a)
    writeFileSync(join(repo.git(h, 'rev-parse', '--absolute-git-dir'), 'MERGE_HEAD'), `${repo.head(repo.main)}\n`)
    expectHolderKept(repo, a, h, 'in-use')
  })

  test(`${tag} 握り手がメイン worktree: 解放せず保全する（Issue #755）`, () => {
    const repo = makeRecoverRepo()
    const a = detachedWith(repo)
    repo.git(repo.main, 'checkout', '-q', a.branch)
    const before = snap(repo, a)
    expectKept(repo, a, prep(repo, a), 'in-use', before)
    assert.equal(repo.git(repo.main, 'rev-parse', '--abbrev-ref', 'HEAD'), a.branch)
  })

  test(`${tag} 握り手の登録のパスが worktree 自身でない（.git が無い・別 clone が置かれた）: 何も書かず in-use のまま保全する（Issue #755）`, () => {
    {
      const repo = makeRecoverRepo()
      const a = detachedWith(repo)
      const h = holderOf(repo, a)
      rmSync(join(h, '.git'))
      const before = snap(repo, a)
      expectKept(repo, a, prep(repo, a), 'in-use', before)
      assert.equal(repo.git(repo.main, 'rev-parse', '--abbrev-ref', 'HEAD'), 'main')
    }
    {
      const repo = makeRecoverRepo()
      const a = detachedWith(repo)
      const h = holderOf(repo, a)
      rmSync(h, { recursive: true, force: true })
      repo.git(repo.main, 'clone', '-q', repo.main, h)
      const cloneHead = repo.head(h)
      const before = snap(repo, a)
      expectKept(repo, a, prep(repo, a), 'in-use', before)
      assert.equal(repo.head(h), cloneHead, '別 clone の HEAD は動かない')
      assert.equal(repo.git(h, 'rev-parse', '--abbrev-ref', 'HEAD'), 'main')
    }
  })

  test(`${tag} 握り手が別 worktree へ移された（gitdir の逆参照がパスと食い違う）: 保全する（Issue #755）`, () => {
    const repo = makeRecoverRepo()
    const a = detachedWith(repo)
    const h = holderOf(repo, a)
    const gd = repo.git(h, 'rev-parse', '--absolute-git-dir')
    writeFileSync(join(gd, 'gitdir'), `${join(repo.root, 'wts', 'elsewhere', '.git')}\n`)
    const before = snap(repo, a)
    expectKept(repo, a, prep(repo, a), 'in-use', before)
    assert.ok(holderHeld(repo, h, a))
  })

  test(`${tag} 握り手が 2 つで 1 つだけ資格が無い: どちらにも触れず in-use のまま保全する（Issue #755）`, () => {
    const repo = makeRecoverRepo()
    const a = detachedWith(repo)
    // 同じブランチは 2 つの worktree が同時に checkout できないので --force で作る
    const dir2 = join(repo.root, 'wts', 'plain')
    const h1 = holderOf(repo, a)
    repo.git(repo.main, 'worktree', 'add', '-q', '--force', dir2, a.branch)
    expectHolderKept(repo, a, h1, 'in-use')
    assert.ok(holderHeld(repo, dir2, a))
  })

  test(`${tag} 先端が HEAD の祖先でない（diverged）: Claude の lock の握り手でも解放しない（Issue #755）`, () => {
    const repo = makeRecoverRepo()
    const a = detachedWith(repo)
    const h = holderOf(repo, a)
    repo.write(h, 'extra.txt', 'x\n')
    repo.git(h, 'add', 'extra.txt')
    repo.git(h, 'commit', '-q', '-m', 'holder own commit')
    // 握り手のコミットでブランチ先端が動き、fix の HEAD と分岐する。握り手が残るので in-use（握り手は解放されない）
    expectHolderKept(repo, a, h, 'in-use')
  })

  test(`${tag} 握り手の HEAD.lock が取られている（解放の瞬間に別の更新が走る競合）: 書かず失敗して保全する。ブランチも握り手も付け直しも動かない（Issue #755）`, () => {
    const repo = makeRecoverRepo()
    const a = detachedWith(repo)
    const h = holderOf(repo, a)
    const hh = repo.head(h)
    const before = snap(repo, a)
    const lock = join(repo.git(h, 'rev-parse', '--absolute-git-dir'), 'HEAD.lock')
    writeFileSync(lock, 'other\n')
    const r = prep(repo, a)
    assert.equal(r.status, 0, r.stderr)
    assert.equal(r.result.detached, 'in-use')
    assert.equal(readFileSync(lock, 'utf8'), 'other\n', '他者のロックは消さない')
    rmSync(lock)
    assert.equal(repo.head(repo.main, `refs/heads/${a.branch}`), before.tip)
    assert.equal(repo.head(a.path), before.head)
    assert.equal(repo.git(a.path, 'rev-parse', '--abbrev-ref', 'HEAD'), 'HEAD')
    assert.equal(repo.head(h), hh)
    assert.ok(holderHeld(repo, h, a))
  })

  test(`${tag} 握り手の lock が稼働中の別セッション（祖先でない生きた pid）: clean でも解放せず in-use のまま保全する（Issue #755）`, () => {
    const other = spawn('sleep', ['120'], { detached: true, stdio: 'ignore' })
    try {
      const repo = makeRecoverRepo()
      const a = detachedWith(repo)
      const h = holderOf(repo, a, { lock: `claude agent x (pid ${other.pid})` })
      expectHolderKept(repo, a, h, 'in-use')
    } finally {
      other.kill()
    }
  })

  test(`${tag} --mode free: 使い捨ての握り手を解放して freed。WIP コミットも fetch も行わず、--worktree のパスには触れない（Issue #755）`, () => {
    const repo = makeRecoverRepo()
    const a = detachedWith(repo)
    const h = holderOf(repo, a)
    repo.write(a.path, 'u.txt', 'u\n')
    const tip = repo.head(repo.main, `refs/heads/${a.branch}`)
    const r = run(repo, ['--mode', 'free', '--branch', a.branch, '--base', 'main', '--worktree', a.path])
    assert.equal(r.status, 0, r.stderr)
    assert.deepEqual(Object.keys(r.result), KEYS)
    assert.deepEqual([r.result.resolved, r.result.reason, r.result.detached, r.result.wip, r.result.baseFetched], [false, 'free-only', 'freed', 'skipped', false])
    assert.equal(repo.git(h, 'rev-parse', '--abbrev-ref', 'HEAD'), 'HEAD')
    assert.equal(repo.head(h), tip)
    assert.equal(repo.head(repo.main, `refs/heads/${a.branch}`), tip, 'ブランチは動かさない')
    assert.equal(repo.git(a.path, 'status', '--porcelain'), '?? u.txt', 'WIP コミットは作らない')
  })

  // git の rev-parse --show-ref-format だけを差し替える PATH 先頭の git ラッパー（out は標準出力・rc は終了コード）
  const shimGit = (repo, out, rc) => {
    const real = spawnSync('sh', ['-c', 'command -v git'], { encoding: 'utf8' }).stdout.trim()
    const dir = mkdtempSync(join(repo.root, 'shim-'))
    writeFileSync(join(dir, 'git'), `#!/bin/sh\ncase " $* " in *" rev-parse --show-ref-format "*) printf '%s' '${out}'; exit ${rc};; esac\nexec '${real}' "$@"\n`)
    chmodSync(join(dir, 'git'), 0o755)
    return { PATH: `${dir}:${process.env.PATH}` }
  }

  for (const [label, out, rc, word] of [['Git 2.45 未満（オプションをそのまま返す）', '--show-ref-format', 0, 'freed'], ['Git 2.45 未満（出力が空で非 0）', '', 1, 'freed'], ['reftable が明示された', 'reftable', 0, 'failed']]) {
    test(`${tag} --mode free: ${label}ときの握り手の解放は ${word}（Issue #755）`, () => {
      const repo = makeRecoverRepo()
      const a = detachedWith(repo)
      const h = holderOf(repo, a)
      const r = run(repo, ['--mode', 'free', '--branch', a.branch, '--base', 'main', '--worktree', a.path], { env: shimGit(repo, out, rc) })
      assert.equal(r.status, 0, r.stderr)
      assert.equal(r.result.detached, word)
      assert.equal(repo.git(h, 'rev-parse', '--abbrev-ref', 'HEAD') === 'HEAD', word === 'freed')
    })
  }

  test(`${tag} --mode free: 握り手なしは none、資格の無い握り手は in-use、ブランチが無ければ no-ref、base と同名は base-branch、--worktree 自身は握り手に数えない（Issue #755）`, () => {
    const repo = makeRecoverRepo()
    const a = repo.addWorktree('a')
    const free = (extra = []) => run(repo, ['--mode', 'free', '--branch', a.branch, '--base', 'main', ...extra]).result.detached
    assert.equal(free(['--worktree', a.path]), 'none')
    const h = join(repo.root, 'wts', 'plain')
    repo.git(repo.main, 'worktree', 'add', '-q', '--force', h, a.branch)
    assert.equal(free(), 'in-use')
    assert.ok(holderHeld(repo, h, a))
    assert.equal(run(repo, ['--mode', 'free', '--branch', 'feat/9-nothing', '--base', 'main']).result.detached, 'no-ref')
    assert.equal(run(repo, ['--mode', 'free', '--branch', 'main', '--base', 'main']).result.detached, 'base-branch')
  })

  test(`${tag} 引数検証: --mode の不正値・free で --branch 欠落は exit 2 で結果の行を出さない（Issue #755）`, () => {
    const repo = makeRecoverRepo()
    for (const args of [['--mode', 'x', '--branch', 'b', '--base', 'main'], ['--mode', 'free', '--base', 'main', '--worktree', '/tmp/x'], ['--mode', 'free', '--branch', 'b'], ['--mode']]) {
      const r = run(repo, args)
      assert.equal(r.status, 2, args.join(' '))
      assert.equal(r.result, null)
    }
  })

  test(`${tag} detached で状態のブランチが無い・ローカルに無い・base と同名: 確定せず（detached）`, () => {
    const repo = makeRecoverRepo()
    const a = detachedWith(repo)
    const before = snap(repo, a)
    expectKept(repo, a, run(repo, ['--worktree', a.path, '--base', 'main']), 'no-state-branch', before)
    expectKept(repo, a, run(repo, ['--worktree', a.path, '--branch', 'feat/9-nothing', '--base', 'main']), 'no-ref', before)
    expectKept(repo, a, run(repo, ['--worktree', a.path, '--branch', a.branch, '--base', a.branch]), 'base-branch', before)
  })

  test(`${tag} detached でマージの途中: 確定せず（detached）、何も動かさない`, () => {
    const repo = makeRecoverRepo()
    const a = detachedWith(repo)
    writeFileSync(join(repo.git(a.path, 'rev-parse', '--absolute-git-dir'), 'MERGE_HEAD'), `${repo.head(repo.main)}\n`)
    const before = snap(repo, a)
    expectKept(repo, a, prep(repo, a), 'in-progress', before)
  })

  test(`${tag} detached の付け直しの途中で生存 agent が HEAD を進めた: 付け直さず保全し、ブランチも元へ戻す（Issue #731）`, () => {
    const repo = makeRecoverRepo()
    const a = detachedWith(repo)
    const before = snap(repo, a)
    // ブランチ ref の更新が確定した直後（symbolic-ref の前）に、worktree の detached HEAD へ空コミットを積む
    const hook = join(repo.main, '.git', 'hooks', 'reference-transaction')
    const marker = join(repo.root, 'raced')
    writeFileSync(hook, `#!/bin/sh\n[ "$1" = committed ] || exit 0\n[ -e '${marker}' ] && exit 0\ngrep -q "refs/heads/${a.branch}" || exit 0\n: > '${marker}'\ngit -C '${a.path}' commit -q --allow-empty -m race </dev/null >/dev/null 2>&1\nexit 0\n`)
    chmodSync(hook, 0o755)
    const r = prep(repo, a)
    assert.ok(existsSync(marker), '競合が注入された')
    assert.equal(r.status, 0, r.stderr)
    assert.equal(r.result.detached, 'failed')
    assert.equal(r.result.resolved, false)
    assert.equal(repo.git(a.path, 'rev-parse', '--abbrev-ref', 'HEAD'), 'HEAD', 'detached のまま（競合で積まれたコミットを上書きしない）')
    assert.notEqual(repo.head(a.path), before.head, '競合のコミットが HEAD に残る')
    assert.equal(repo.head(repo.main, `refs/heads/${a.branch}`), before.head, 'ブランチは観測した HEAD（競合コミットの祖先）まで。競合コミットは含まない')
    assert.ok(existsSync(a.path), 'worktree は削除されない')
  })

  test(`${tag} detached でブランチ ref の更新に失敗（lock 競合）: detached:failed で確定せず、HEAD もブランチも動かさない`, () => {
    const repo = makeRecoverRepo()
    const a = detachedWith(repo)
    writeFileSync(join(repo.main, '.git', 'refs', 'heads', `${a.branch}.lock`), '')
    const before = snap(repo, a)
    expectKept(repo, a, prep(repo, a), 'failed', before)
  })

  test(`${tag} メイン worktree のパスを渡されたとき: 確定せず（main-worktree）、メインの変更に触らない`, () => {
    const repo = makeRecoverRepo()
    repo.write(repo.main, 'dirty.txt', 'd\n')
    const before = repo.head(repo.main)
    const r = run(repo, ['--worktree', repo.main, '--branch', 'main', '--base', 'main'])
    assert.deepEqual([r.result.resolved, r.result.reason, r.result.wip, r.result.wipCommitted], [false, 'main-worktree', 'skipped', false])
    assert.equal(repo.head(repo.main), before)
    assert.equal(repo.git(repo.main, 'status', '--porcelain'), '?? dirty.txt')
    // メインの別名（末尾の /）でも通らない
    const viaSlash = run(repo, ['--worktree', `${repo.main}/`, '--base', 'main'])
    assert.equal(viaSlash.result.reason, 'main-worktree')
    assert.equal(repo.git(repo.main, 'status', '--porcelain'), '?? dirty.txt')
  })

  test(`${tag} 未登録のパス（git worktree list に無い別の clone など）: 確定せず（not-registered）、触らない`, () => {
    const repo = makeRecoverRepo()
    const clone = join(repo.root, 'clone')
    repo.git(repo.root, 'clone', '-q', repo.main, clone)
    repo.write(clone, 'u.txt', 'u\n')
    const before = repo.head(clone)
    const r = run(repo, ['--worktree', clone, '--branch', 'main', '--base', 'main'])
    assert.deepEqual([r.result.resolved, r.result.reason, r.result.wip, r.result.wipCommitted], [false, 'not-registered', 'skipped', false])
    assert.equal(repo.head(clone), before)
    assert.ok(existsSync(join(clone, 'u.txt')))
    // 存在しない未登録のパスは dead worktree と同じ扱い（取り残すデータが無い）
    const gone = run(repo, ['--worktree', join(repo.root, 'nowhere'), '--branch', 'feat/1-x', '--base', 'main'])
    assert.deepEqual([gone.result.resolved, gone.result.worktreeMissing], [true, true])
  })

  test(`${tag} .git が壊れた worktree（git が親の repo を指す）: toplevel が一致せず確定しない。メインの変更を WIP にしない`, () => {
    const repo = makeRecoverRepo()
    const inner = join(repo.main, 'inner-wt')
    const a = repo.addWorktree('a', { dir: inner })
    repo.write(repo.main, 'main-dirty.txt', 'm\n')
    repo.write(a.path, 'u.txt', 'u\n')
    spawnSync('rm', [join(a.path, '.git')])
    assert.equal(repo.git(a.path, 'rev-parse', '--show-toplevel'), repo.main, '前提: git は親の repo を指す')
    const before = repo.head(repo.main)
    const r = prep(repo, a)
    assert.deepEqual([r.result.resolved, r.result.reason, r.result.wip, r.result.wipCommitted], [false, 'toplevel-mismatch', 'skipped', false])
    assert.equal(repo.head(repo.main), before, 'メインにコミットしない')
    assert.ok(existsSync(join(a.path, 'u.txt')))
  })

  test(`${tag} worktree の HEAD が base と同名のブランチ: 確定せず（base-branch）、WIP を積まない`, () => {
    const repo = makeRecoverRepo()
    repo.git(repo.main, 'checkout', '-q', '-b', 'park')
    const dir = join(repo.root, 'wts', 'on-main')
    repo.git(repo.main, 'worktree', 'add', '-q', dir, 'main')
    repo.write(dir, 'u.txt', 'u\n')
    const before = repo.head(dir)
    const r = run(repo, ['--worktree', dir, '--branch', 'main', '--base', 'main'])
    assert.deepEqual([r.result.resolved, r.result.reason, r.result.branch, r.result.wip, r.result.wipCommitted], [false, 'base-branch', '', 'skipped', false])
    assert.equal(repo.head(dir), before)
  })

  // ---- base の取得・差分 ----
  test(`${tag} 差分: 先行コミット数と変更ファイル数を出す。base が origin で進んでいても、取得した最新の base との三点差分で数える`, () => {
    const repo = makeRecoverRepo()
    const a = repo.addWorktree('a')
    for (const [f, c] of [['f1.txt', '1\n'], ['f2.txt', '2\n']]) {
      repo.write(a.path, f, c)
      repo.git(a.path, 'add', f)
      repo.git(a.path, 'commit', '-q', '-m', f)
    }
    repo.write(a.path, 'f1.txt', '1b\n')
    repo.write(repo.main, 'base-only.txt', 'b\n')
    repo.git(repo.main, 'add', 'base-only.txt')
    repo.git(repo.main, 'commit', '-q', '-m', 'base advance')
    repo.git(repo.main, 'push', '-q', 'origin', 'main')
    const r = prep(repo, a)
    assert.deepEqual([r.result.wip, r.result.diff, r.result.commitsAhead, r.result.filesChanged], ['committed', 'nonempty', 3, 2])
    assert.equal(r.result.baseSha, repo.head(repo.main), '取得した最新の base')
    assert.match(r.result.baseSha, SHA40)
    assert.match(r.result.branchSha, SHA40)
  })

  test(`${tag} コミットはあるが差分が空（打ち消し）: diff:empty・commitsAhead は出さない`, () => {
    const repo = makeRecoverRepo()
    const a = repo.addWorktree('a')
    repo.write(a.path, 'x.txt', 'x\n')
    repo.git(a.path, 'add', 'x.txt')
    repo.git(a.path, 'commit', '-q', '-m', 'add')
    repo.git(a.path, 'rm', '-q', 'x.txt')
    repo.git(a.path, 'commit', '-q', '-m', 'remove')
    const r = prep(repo, a)
    assert.deepEqual([r.result.diff, r.result.commitsAhead, r.result.filesChanged], ['empty', 0, 0])
  })

  test(`${tag} base だけが origin で進み、ブランチに独自のコミットが無い: 三点差分は空（diff:empty）。先端同士の差分（二点）で nonempty にしない`, () => {
    const repo = makeRecoverRepo()
    const a = repo.addWorktree('a')
    repo.write(repo.main, 'base-only.txt', 'b\n')
    repo.git(repo.main, 'add', 'base-only.txt')
    repo.git(repo.main, 'commit', '-q', '-m', 'base advance')
    repo.git(repo.main, 'push', '-q', 'origin', 'main')
    const r = prep(repo, a)
    assert.deepEqual([r.result.wip, r.result.diff, r.result.commitsAhead, r.result.filesChanged], ['none', 'empty', 0, 0])
  })

  smTest(`${tag} submodule ポインタだけの変更: diff.ignoreSubmodules=all の利用者設定でも差分あり（nonempty）。empty にして discard の根拠にしない`, () => {
    const repo = makeRecoverRepo({ submodule: true })
    repo.git(repo.main, 'push', '-q', 'origin', 'main')
    repo.git(repo.main, 'config', 'diff.ignoreSubmodules', 'all')
    const a = repo.addWorktree('a')
    repo.initSubmodule(a.path)
    repo.write(a.path, 'sm/g', 'new\n')
    repo.git(join(a.path, 'sm'), 'add', 'g')
    repo.git(join(a.path, 'sm'), 'commit', '-q', '-m', 'sub change')
    repo.git(a.path, 'add', 'sm')
    repo.git(a.path, 'commit', '-q', '-m', 'bump sm')
    assert.equal(repo.git(a.path, 'diff', '--name-only', 'main...HEAD'), '', '前提: 設定のもとで素の diff は submodule ポインタの変更を隠す')
    const r = prep(repo, a)
    assert.deepEqual([r.result.wip, r.result.diff, r.result.commitsAhead, r.result.filesChanged], ['none', 'nonempty', 1, 1])
  })

  test(`${tag} base の取得に失敗: diff:unknown・baseFetched:false。stale な追跡 ref が残っていても空とは言わない。WIP は積む`, () => {
    const repo = makeRecoverRepo()
    repo.git(repo.main, 'fetch', '-q', 'origin') // 前提: refs/remotes/origin/main は存在する（stale になる）
    assert.ok(repo.git(repo.main, 'rev-parse', 'refs/remotes/origin/main'))
    const a = repo.addWorktree('a')
    repo.write(a.path, 'u.txt', 'u\n')
    repo.git(repo.main, 'remote', 'set-url', 'origin', join(repo.root, 'no-such-origin.git'))
    const r = prep(repo, a)
    assert.equal(r.status, 0, r.stderr)
    assert.deepEqual(
      [r.result.wip, r.result.wipCommitted, r.result.baseFetched, r.result.baseSha, r.result.diff, r.result.commitsAhead, r.result.filesChanged],
      ['committed', true, false, '', 'unknown', 0, 0],
    )
    // ブランチが base と同一の clean な状態でも、取得失敗は empty ではない
    const b = repo.addWorktree('b')
    const clean = prep(repo, b)
    assert.deepEqual([clean.result.baseFetched, clean.result.diff], [false, 'unknown'])
  })

  test(`${tag} base が origin に無い: 取得失敗として unknown`, () => {
    const repo = makeRecoverRepo()
    const a = repo.addWorktree('a')
    const r = run(repo, ['--worktree', a.path, '--branch', a.branch, '--base', 'no-such-base'])
    assert.deepEqual([r.result.baseFetched, r.result.diff, r.result.wip], [false, 'unknown', 'none'])
  })

  // ---- 引数・起動 ----
  test(`${tag} 使い方の誤り: --base 無し・対象無し・形が不正・未知の引数・値が無い → exit 2 で結果の行を出さない`, () => {
    const repo = makeRecoverRepo()
    const a = repo.addWorktree('a')
    const bad = [
      ['--worktree', a.path],
      ['--base', 'main'],
      ['--base', 'main', '--branch', '-D'],
      ['--base', 'main', '--branch', 'a b'],
      ['--base', '-x', '--branch', 'feat/1-x'],
      ['--base', 'main', '--worktree', 'relative/path'],
      ['--base', 'main', '--worktree', "/tmp/a'b"],
      ['--base', 'main', '--worktree', '/tmp/a/../b'],
      ['--base', 'main', '--branch', 'feat/1-x', '--force'],
      ['--base'],
      ['--base', 'main', '--branch'],
      [],
    ]
    for (const args of bad) {
      const r = run(repo, args)
      assert.equal(r.status, 2, JSON.stringify(args))
      assert.equal(r.result, null, JSON.stringify(args))
      assert.equal(r.stdout, '', JSON.stringify(args))
    }
  })

  test(`${tag} cwd がリポジトリの外: worktree の一覧を取れず確定しない（list-failed）。何も書かない。リポジトリの中（worktree の中を含む）なら動く`, () => {
    const repo = makeRecoverRepo()
    const a = repo.addWorktree('a')
    repo.write(a.path, 'u.txt', 'u\n')
    const before = repo.head(a.path)
    const r = run(repo, ['--worktree', a.path, '--branch', a.branch, '--base', 'main'], { cwd: join(repo.root, 'wts') })
    assert.deepEqual([r.result.resolved, r.result.reason, r.result.wip, r.result.wipCommitted], [false, 'list-failed', 'skipped', false])
    assert.equal(repo.head(a.path), before)
    const inside = run(repo, ['--worktree', a.path, '--branch', a.branch, '--base', 'main'], { cwd: a.path })
    assert.equal(inside.result.wip, 'committed')
  })

  test(`${tag} run-verified.sh 経由: ハッシュが一致すれば起動でき、不一致なら実行しない`, () => {
    const repo = makeRecoverRepo()
    const a = repo.addWorktree('a')
    const scripts = dirname(SCRIPT)
    const args = ['--worktree', a.path, '--branch', a.branch, '--base', 'main']
    const ok = spawnSync(bash, [join(scripts, 'run-verified.sh'), bundleSha256(scripts, 'recover-prep.sh'), 'recover-prep.sh', ...args], { cwd: repo.main, encoding: 'utf8', env: gitEnv(repo.root) })
    assert.equal(ok.status, 0, ok.stderr)
    assert.match(ok.stdout.trim().split('\n').pop(), /^RECOVER_PREP_RESULT \{/)
    repo.write(a.path, 'u.txt', 'u\n')
    const bad = spawnSync(bash, [join(scripts, 'run-verified.sh'), '0'.repeat(64), 'recover-prep.sh', ...args], { cwd: repo.main, encoding: 'utf8', env: gitEnv(repo.root) })
    assert.equal(bad.status, 3)
    assert.equal(bad.stdout.includes('RECOVER_PREP_RESULT'), false)
    assert.equal(repo.git(a.path, 'status', '--porcelain'), '?? u.txt', '不一致では何も書かない')
  })
}
