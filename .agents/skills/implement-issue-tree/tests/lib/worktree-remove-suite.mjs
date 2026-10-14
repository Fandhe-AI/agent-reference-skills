// scripts/worktree-remove.sh を実 git で走らせるテスト一式（Issue #603 第 7 弾）。bash ごとに登録する（tests/worktree-remove.test.mjs が
// 1 つ目、tests/worktree-remove-alt-bash.test.mjs が 2 つ目以降）。node --test はファイル単位で並列に走るので、bash ごとにファイルを
// 分けると所要が 1 つ分で済む。
//
// 検査の軸（調査レポートの実測表 = git 2.54 の挙動）:
//   - 汚れの確認は利用者の設定（status.showUntrackedFiles=no）に左右されない形で行う。素の status では未追跡が見えず、--force なしの
//     git worktree remove も未追跡を黙って消す。
//   - discard は --force を使わず、汚れ・初期化済み submodule があれば保持する。superseded は汚れていても消すが、submodule に未記録の
//     変更があれば保持する。
//   - lock は agent の形で pid が死んでいるときだけ外す。生きている・他の形の lock は外さず保持する。
//   - メイン worktree・登録されていないパス・カレントがその中にあるパスは消さない。
//   - ブランチは worktree が無くなったあとでだけ消す。消す前の先頭 sha を結果に出す。base と同名のブランチは消さない。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { gitEnv, makeRepo, runScript } from './worktree-sandbox.mjs'
import { toolExists } from './signed-output.mjs'

export const SCRIPT = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'scripts', 'worktree-remove.sh')

// 終了済みの子プロセスの pid（その時点では存在しない）
function deadPid() {
  const r = spawnSync('sh', ['-c', 'echo $$'], { encoding: 'utf8' })
  return Number(r.stdout.trim())
}

// 実プロセス pid の開始時刻（スクリプトが lock の start と突き合わせる値と同じ形）。取れなければ null
function lstart(pid) {
  const r = spawnSync('ps', ['-o', 'lstart=', '-p', String(pid)], { encoding: 'utf8', env: { PATH: process.env.PATH, LC_ALL: 'C', TZ: 'UTC' } })
  const v = (r.stdout ?? '').trim()
  return r.status === 0 && v !== '' ? v : null
}

export function registerWorktreeRemoveTests(bash) {
  const tag = `[${bash}]`
  const run = (repo, args, opts) => runScript(bash, SCRIPT, repo, args, opts)
  const sup = (repo, path) => run(repo, ['remove', '--mode', 'superseded', '--path', path])
  const dis = (repo, path, extra = []) => run(repo, ['remove', '--mode', 'discard', '--path', path, ...extra])

  // ---- 汚れの確認 ----
  const DIRTY_ROWS = [
    ['追跡ファイルの変更', (r, w) => r.write(w, 'a.txt', 'changed\n'), 1],
    ['staged', (r, w) => { r.write(w, 'c.txt', 'c\n'); r.git(w, 'add', 'c.txt') }, 1],
    ['未追跡', (r, w) => r.write(w, 'u.txt', 'u\n'), 1],
    ['未追跡（深い階層）', (r, w) => r.write(w, 'deep/er/u.txt', 'u\n'), 1],
    ['入れ子の独立 repo', (r, w) => { mkdirSync(join(w, 'nested'), { recursive: true }); r.git(join(w, 'nested'), 'init', '-q'); r.write(w, 'nested/x', 'x\n') }, 1],
  ]
  for (const [name, setup, dirty] of DIRTY_ROWS) {
    test(`${tag} ${name}: superseded は強制削除（dirty=${dirty} を記録）、discard は保持して --force を使わない`, () => {
      const repo = makeRepo()
      const a = repo.addWorktree('a')
      setup(repo, a.path)
      const d = dis(repo, a.path, ['--branch', a.branch, '--base', 'main'])
      assert.equal(d.status, 0, d.stderr)
      assert.deepEqual(
        { ok: d.result.ok, worktree: d.result.worktree, branch: d.result.branch, retained: d.result.retained },
        { ok: false, worktree: 'retained-dirty', branch: 'keep', retained: true },
      )
      assert.ok(d.result.dirty >= 1)
      assert.ok(existsSync(a.path), '保持した worktree の実体が残る')
      assert.ok(repo.branches().includes(a.branch), 'worktree が残るのでブランチも消さない')
      const s = sup(repo, a.path)
      assert.equal(s.result.worktree, 'removed')
      assert.equal(s.result.ok, true)
      assert.ok(s.result.dirty >= 1, `汚れの件数を記録する: ${JSON.stringify(s.result)}`)
      assert.ok(!existsSync(a.path))
    })
  }

  test(`${tag} clean: 両モードとも消える。discard はブランチも消し、消す前の先頭 sha を出す`, () => {
    const repo = makeRepo()
    const a = repo.addWorktree('a')
    repo.write(a.path, 'q.txt', 'q\n')
    repo.git(a.path, 'add', 'q.txt')
    repo.git(a.path, 'commit', '-q', '-m', 'q')
    const sha = repo.head(a.path)
    const d = dis(repo, a.path, ['--branch', a.branch, '--base', 'main'])
    assert.deepEqual(d.result, { ok: true, mode: 'discard', worktree: 'removed', branch: 'deleted', branchSha: sha, dirty: 0, unlocked: false, retained: false })
    assert.ok(!existsSync(a.path))
    assert.ok(!repo.branches().includes(a.branch))
    // 到達不能になったコミットは gc まで残る（reflog には出ない）。結果の sha から復元できる
    assert.equal(repo.git(repo.main, 'cat-file', '-t', sha), 'commit')
    const b = repo.addWorktree('b')
    const s = sup(repo, b.path)
    assert.deepEqual(s.result, { ok: true, mode: 'superseded', worktree: 'removed', branch: 'none', branchSha: '', dirty: 0, unlocked: false, retained: false })
    assert.ok(repo.branches().includes(b.branch), 'superseded はブランチに触れない')
  })

  test(`${tag} ignore 対象のみ（node_modules・dist）: 汚れに数えず、両モードとも中身ごと消える`, () => {
    const repo = makeRepo()
    for (const [mode, name] of [['superseded', 'a'], ['discard', 'b']]) {
      const w = repo.addWorktree(name)
      repo.write(w.path, 'node_modules/x/i.js', 'i\n')
      repo.write(w.path, 'dist/o', 'o\n')
      const r = mode === 'superseded' ? sup(repo, w.path) : dis(repo, w.path)
      assert.deepEqual([r.result.worktree, r.result.dirty], ['removed', 0], mode)
      assert.ok(!existsSync(w.path))
    }
  })

  test(`${tag} status.showUntrackedFiles=no でも未追跡を汚れとして数える（素の status では見えず、--force なしの remove も黙って消す）`, () => {
    const repo = makeRepo()
    repo.git(repo.main, 'config', 'status.showUntrackedFiles', 'no')
    const a = repo.addWorktree('a')
    repo.write(a.path, 'precious.txt', '大事\n')
    assert.equal(repo.git(a.path, 'status', '--porcelain'), '', '前提: 設定で素の status は未追跡を隠す')
    const d = dis(repo, a.path, ['--branch', a.branch, '--base', 'main'])
    assert.equal(d.result.worktree, 'retained-dirty')
    assert.equal(d.result.dirty, 1)
    assert.ok(existsSync(join(a.path, 'precious.txt')))
    assert.equal(sup(repo, a.path).result.dirty, 1)
  })

  test(`${tag} グローバルの除外（core.excludesFile・XDG の ignore）に載った未追跡ファイル（.env など）も汚れとして数え、discard は保持する。リポジトリの .gitignore は従う`, () => {
    const repo = makeRepo()
    const globalIgnore = join(repo.root, 'global-ignore')
    writeFileSync(globalIgnore, '.env\n*.secret\n')
    const globalConfig = join(repo.root, 'global-gitconfig')
    writeFileSync(globalConfig, `[core]\n\texcludesFile = ${globalIgnore}\n`)
    mkdirSync(join(repo.root, '.config', 'git'), { recursive: true })
    writeFileSync(join(repo.root, '.config', 'git', 'ignore'), 'xdg.env\n')
    // core.excludesFile を設定した環境と、設定しない環境（既定の XDG の ignore が効く）の両方
    for (const [mode, name, file, env] of [
      ['discard', 'a', '.env', { GIT_CONFIG_GLOBAL: globalConfig }],
      ['discard', 'b', 'k.secret', { GIT_CONFIG_GLOBAL: globalConfig }],
      ['discard', 'c', 'xdg.env', {}],
      ['superseded', 'd', '.env', { GIT_CONFIG_GLOBAL: globalConfig }],
    ]) {
      const w = repo.addWorktree(name)
      repo.write(w.path, file, 'KEY=1\n')
      // 前提: 利用者の環境の素の status では見えない
      const plain = spawnSync('git', ['status', '--porcelain'], { cwd: w.path, encoding: 'utf8', env: { ...gitEnv(repo.root), ...env } })
      assert.equal(plain.stdout, '', `前提: ${file} は素の status に出ない`)
      const r = run(repo, ['remove', '--mode', mode, '--path', w.path], { env })
      if (mode === 'discard') {
        assert.deepEqual([r.result.worktree, r.result.dirty], ['retained-dirty', 1], `${file}: ${JSON.stringify(r.result)}`)
        assert.ok(existsSync(join(w.path, file)), `${file} が残る`)
      } else {
        // superseded は汚れていても消す（件数は記録される）
        assert.deepEqual([r.result.worktree, r.result.dirty], ['removed', 1])
      }
    }
    // リポジトリの .gitignore（node_modules/・dist/）は従う: 汚れに数えず消える
    const g = repo.addWorktree('g')
    repo.write(g.path, 'node_modules/x/i.js', 'i\n')
    const rg = run(repo, ['remove', '--mode', 'discard', '--path', g.path], { env: { GIT_CONFIG_GLOBAL: globalConfig } })
    assert.deepEqual([rg.result.worktree, rg.result.dirty], ['removed', 0])
  })

  test(`${tag} マージのコンフリクト中: superseded は消し、discard は保持する`, () => {
    const repo = makeRepo()
    const a = repo.addWorktree('a')
    repo.write(a.path, 'a.txt', 'L\n')
    repo.git(a.path, 'commit', '-q', '-am', 'L')
    repo.write(repo.main, 'a.txt', 'R\n')
    repo.git(repo.main, 'commit', '-q', '-am', 'R')
    spawnSync('git', ['merge', 'main'], { cwd: a.path, env: { ...process.env, HOME: repo.root, GIT_CONFIG_GLOBAL: '/dev/null', GIT_AUTHOR_NAME: 't', GIT_AUTHOR_EMAIL: 't@t', GIT_COMMITTER_NAME: 't', GIT_COMMITTER_EMAIL: 't@t' }, encoding: 'utf8' })
    assert.equal(dis(repo, a.path).result.worktree, 'retained-dirty')
    assert.equal(sup(repo, a.path).result.worktree, 'removed')
  })

  // ---- submodule ----
  const smTest = toolExists('git') ? test : test.skip
  smTest(`${tag} submodule 未初期化: 両モードとも消える`, () => {
    const repo = makeRepo({ submodule: true })
    const a = repo.addWorktree('a')
    const b = repo.addWorktree('b')
    assert.equal(dis(repo, a.path).result.worktree, 'removed')
    assert.equal(sup(repo, b.path).result.worktree, 'removed')
  })

  smTest(`${tag} submodule 初期化済み・clean: discard は保持（コミットが worktree 専用の modules にしか無いことがある）、superseded は消す`, () => {
    const repo = makeRepo({ submodule: true })
    const a = repo.addWorktree('a')
    repo.initSubmodule(a.path)
    const d = dis(repo, a.path, ['--branch', a.branch, '--base', 'main'])
    assert.deepEqual([d.result.worktree, d.result.branch, d.result.ok], ['retained-submodule', 'keep', false])
    assert.ok(existsSync(a.path))
    assert.equal(sup(repo, a.path).result.worktree, 'removed')
  })

  smTest(`${tag} submodule 内の変更・未追跡・新コミット: superseded も保持する（discard は汚れとして保持）`, () => {
    const cases = [
      ['tracked', (repo, w) => repo.write(w, 'sm/f', 'changed\n')],
      ['untracked', (repo, w) => repo.write(w, 'sm/new.txt', 'n\n')],
      ['newcommit', (repo, w) => { repo.write(w, 'sm/g', 'g\n'); repo.git(join(w, 'sm'), 'add', 'g'); repo.git(join(w, 'sm'), 'commit', '-q', '-m', 'g') }],
    ]
    for (const [name, mutate] of cases) {
      const repo = makeRepo({ submodule: true })
      const a = repo.addWorktree('a')
      repo.initSubmodule(a.path)
      mutate(repo, a.path)
      const s = sup(repo, a.path)
      assert.equal(s.result.worktree, 'retained-submodule', `${name}: ${JSON.stringify(s.result)}`)
      assert.equal(s.result.retained, true)
      assert.equal(s.result.ok, true, 'superseded の保持は非致命')
      assert.ok(existsSync(join(a.path, 'sm')), `${name}: 実体が残る`)
      assert.equal(dis(repo, a.path).result.worktree, 'retained-dirty', name)
    }
  })

  smTest(`${tag} submodule の ignore 設定（diff.ignoreSubmodules=all・submodule.sm.ignore=all）でも submodule 内の変更を見る`, () => {
    for (const [key, value] of [['diff.ignoreSubmodules', 'all'], ['submodule.sm.ignore', 'all']]) {
      const repo = makeRepo({ submodule: true })
      repo.git(repo.main, 'config', key, value)
      const a = repo.addWorktree('a')
      repo.initSubmodule(a.path)
      repo.write(a.path, 'sm/f', 'changed\n')
      assert.equal(repo.git(a.path, 'status', '--porcelain'), '', `前提: ${key} で素の status は submodule の変更を隠す`)
      assert.equal(sup(repo, a.path).result.worktree, 'retained-submodule', key)
      assert.ok(existsSync(join(a.path, 'sm')))
    }
  })

  smTest(`${tag} submodule を deinit した後: discard は modules の残りを見て保持する`, () => {
    const repo = makeRepo({ submodule: true })
    const a = repo.addWorktree('a')
    repo.initSubmodule(a.path)
    repo.git(a.path, 'submodule', 'deinit', '-q', '-f', 'sm')
    assert.equal(dis(repo, a.path).result.worktree, 'retained-submodule')
  })

  test(`${tag} 防御の多重化: 観測が誤って clean を返しても、discard は --force を使わないので git が拒否して消さない（superseded は消す）`, () => {
    const repo = makeRepo()
    const shim = join(repo.root, 'shim')
    mkdirSync(shim)
    const real = spawnSync('sh', ['-c', 'command -v git'], { encoding: 'utf8' }).stdout.trim()
    // status を常に空で返す偽の git（観測の取りこぼしを模す）。それ以外は実 git へ
    writeFileSync(join(shim, 'git'), `#!/bin/sh\nfor a in "$@"; do\n  if [ "$a" = status ]; then exit 0; fi\ndone\nexec ${real} "$@"\n`, { mode: 0o755 })
    const env = { PATH: `${shim}:${process.env.PATH}` }
    const a = repo.addWorktree('a')
    repo.write(a.path, 'u.txt', 'u\n')
    const d = run(repo, ['remove', '--mode', 'discard', '--path', a.path, '--branch', a.branch, '--base', 'main'], { env })
    assert.deepEqual([d.result.worktree, d.result.branch, d.result.ok], ['failed', 'keep', false], JSON.stringify(d.result))
    assert.ok(existsSync(join(a.path, 'u.txt')), '未追跡ファイルが残る')
    assert.ok(repo.branches().includes(a.branch))
    const s = run(repo, ['remove', '--mode', 'superseded', '--path', a.path], { env })
    assert.equal(s.result.worktree, 'removed')
  })

  // ---- lock ----
  const lockReason = (pid) => `claude agent agent-abc123 (pid ${pid})`
  test(`${tag} lock: agent の形で pid が生きている → 外さず保持。pid が死んでいる → 外して消す`, () => {
    const repo = makeRepo()
    const live = repo.addWorktree('live')
    repo.git(repo.main, 'worktree', 'lock', '--reason', lockReason(process.pid), live.path)
    for (const r of [sup(repo, live.path), dis(repo, live.path)]) {
      assert.deepEqual([r.result.worktree, r.result.unlocked, r.result.retained], ['retained-locked', false, true])
    }
    assert.ok(existsSync(live.path))
    assert.match(repo.git(repo.main, 'worktree', 'list', '--porcelain'), /locked claude agent agent-abc123/, 'lock は外されていない')

    for (const [mode, name] of [['superseded', 'dead1'], ['discard', 'dead2']]) {
      const dead = repo.addWorktree(name)
      repo.git(repo.main, 'worktree', 'lock', '--reason', lockReason(deadPid()), dead.path)
      const r = mode === 'superseded' ? sup(repo, dead.path) : dis(repo, dead.path)
      assert.deepEqual([r.result.worktree, r.result.unlocked, r.result.ok], ['removed', true, true], mode)
      assert.ok(!existsSync(dead.path))
    }
  })

  // Claude Code の実物の形: `(pid N start <LC_ALL=C TZ=UTC ps -o lstart= の出力>)`。pid はセッション（メインの claude プロセス）の pid
  const startTest = lstart(process.pid) === null ? test.skip : test
  startTest(`${tag} lock（start つき）: 生きているプロセスで start が一致 → 保持。start が違う（pid の再利用）→ 外して消す。pid が死んでいる → 外して消す`, () => {
    const repo = makeRepo()
    const real = lstart(process.pid)
    const live = repo.addWorktree('live')
    repo.git(repo.main, 'worktree', 'lock', '--reason', `claude agent agent-0123456789abcdef0 (pid ${process.pid} start ${real})`, live.path)
    for (const r of [sup(repo, live.path), dis(repo, live.path)]) {
      assert.deepEqual([r.result.worktree, r.result.unlocked, r.result.retained], ['retained-locked', false, true], JSON.stringify(r.result))
    }
    assert.ok(existsSync(live.path))
    // ps の出力の空白の違い（日が 1 桁のときの 2 連スペースなど）では不一致にならない
    const spaced = repo.addWorktree('spaced')
    repo.git(repo.main, 'worktree', 'lock', '--reason', `claude agent agent-aa (pid ${process.pid} start ${real.replace(/ /g, '  ')})`, spaced.path)
    assert.equal(sup(repo, spaced.path).result.worktree, 'retained-locked')

    for (const [mode, name, reason] of [
      ['superseded', 'reuse1', `claude agent agent-r1 (pid ${process.pid} start Mon Jan  1 00:00:00 2001)`],
      ['discard', 'reuse2', `claude agent agent-r2 (pid ${process.pid} start Mon Jan  1 00:00:00 2001)`],
      ['superseded', 'dead1', `claude agent agent-d1 (pid ${deadPid()} start ${real})`],
      ['discard', 'dead2', `claude agent agent-d2 (pid ${deadPid()} start ${real})`],
    ]) {
      const w = repo.addWorktree(name)
      repo.git(repo.main, 'worktree', 'lock', '--reason', reason, w.path)
      const r = mode === 'superseded' ? sup(repo, w.path) : dis(repo, w.path)
      assert.deepEqual([name, r.result.worktree, r.result.unlocked, r.result.ok], [name, 'removed', true, true], JSON.stringify(r.result))
      assert.ok(!existsSync(w.path))
    }
  })

  startTest(`${tag} lock（start つき）: ps で開始時刻を観測できない（ps が失敗・出力が空）ときは生存扱いで保持する`, () => {
    const repo = makeRepo()
    const real = lstart(process.pid)
    const shim = join(repo.root, 'psshim')
    mkdirSync(shim)
    const realPs = spawnSync('sh', ['-c', 'command -v ps'], { encoding: 'utf8' }).stdout.trim()
    // lstart を求められたときだけ失敗（または空）にする。生死の確認（ps -p）は実物へ
    for (const [name, body] of [['fail', 'exit 1'], ['empty', 'exit 0']]) {
      writeFileSync(join(shim, 'ps'), `#!/bin/sh\ncase "$*" in\n  *lstart*) ${body} ;;\nesac\nexec ${realPs} "$@"\n`, { mode: 0o755 })
      const env = { PATH: `${shim}:${process.env.PATH}` }
      const w = repo.addWorktree(`mismatch-${name}`)
      repo.git(repo.main, 'worktree', 'lock', '--reason', `claude agent agent-x (pid ${process.pid} start Mon Jan  1 00:00:00 2001)`, w.path)
      const r = run(repo, ['remove', '--mode', 'superseded', '--path', w.path], { env })
      assert.deepEqual([name, r.result.worktree, r.result.unlocked], [name, 'retained-locked', false], JSON.stringify(r.result))
      assert.ok(existsSync(w.path))
    }
    assert.ok(real)
  })

  // 死亡を肯定的に確定できないとき（観測不能・エラー）は生存扱いで保持する。pid 1 は他ユーザーのプロセスで kill -0 が EPERM になる（root では成功）
  test(`${tag} lock: kill -0 が EPERM・ps が使えない（失敗・127・自己確認が通らない）・/proc が無い、でも生存を確認できないだけなら保持する`, () => {
    const repo = makeRepo()
    const shim = join(repo.root, 'psshim2')
    mkdirSync(shim)
    for (const [name, body] of [['fail', 'exit 1'], ['notfound', 'exit 127'], ['empty', 'exit 0'], ['err2', 'exit 2']]) {
      writeFileSync(join(shim, 'ps'), `#!/bin/sh\n${body}\n`, { mode: 0o755 })
      const env = { PATH: `${shim}:${process.env.PATH}` }
      for (const mode of ['superseded', 'discard']) {
        const w = repo.addWorktree(`eperm-${name}-${mode}`)
        repo.git(repo.main, 'worktree', 'lock', '--reason', lockReason(1), w.path)
        const r = run(repo, ['remove', '--mode', mode, '--path', w.path], { env })
        assert.deepEqual([name, mode, r.result.worktree, r.result.unlocked], [name, mode, 'retained-locked', false], JSON.stringify(r.result))
        assert.ok(existsSync(w.path))
      }
    }
  })

  // pid 9999999999 は kill -0 が「No such process」ではなく引数エラーになる（判定不能）。観測のうち肯定的に「無い」と言えるのは ps（正常なとき）と /proc（Linux）だけ
  test(`${tag} lock: kill -0 が判定不能のとき、壊れた ps と /proc の不在だけでは外さず、正常な ps が「無い」と言えば外す`, () => {
    const repo = makeRepo()
    const broken = join(repo.root, 'psshim4')
    mkdirSync(broken)
    writeFileSync(join(broken, 'ps'), '#!/bin/sh\nexit 1\n', { mode: 0o755 })
    const reason = lockReason('9999999999')
    const hasProc = existsSync('/proc/self')
    const w1 = repo.addWorktree('unknown-brokenps')
    repo.git(repo.main, 'worktree', 'lock', '--reason', reason, w1.path)
    const r1 = run(repo, ['remove', '--mode', 'superseded', '--path', w1.path], { env: { PATH: `${broken}:${process.env.PATH}` } })
    // /proc が見える Linux では /proc/<pid> の不在が肯定的な「無い」になる。見えない環境（macOS）では保持
    assert.equal(r1.result.worktree, hasProc ? 'removed' : 'retained-locked', JSON.stringify(r1.result))
    const w2 = repo.addWorktree('unknown-goodps')
    repo.git(repo.main, 'worktree', 'lock', '--reason', reason, w2.path)
    const r2 = run(repo, ['remove', '--mode', 'superseded', '--path', w2.path])
    assert.deepEqual([r2.result.worktree, r2.result.unlocked], ['removed', true], JSON.stringify(r2.result))
  })

  test(`${tag} lock: ps が壊れていても kill -0 が ESRCH なら死亡と確定して外す`, () => {
    const repo = makeRepo()
    const shim = join(repo.root, 'psshim3')
    mkdirSync(shim)
    writeFileSync(join(shim, 'ps'), '#!/bin/sh\nexit 1\n', { mode: 0o755 })
    const w = repo.addWorktree('esrch-brokenps')
    repo.git(repo.main, 'worktree', 'lock', '--reason', lockReason(deadPid()), w.path)
    const r = run(repo, ['remove', '--mode', 'superseded', '--path', w.path], { env: { PATH: `${shim}:${process.env.PATH}` } })
    assert.deepEqual([r.result.worktree, r.result.unlocked], ['removed', true], JSON.stringify(r.result))
    assert.ok(!existsSync(w.path))
  })

  test(`${tag} lock: \`claude session …\` の形も agent と同じ規則（pid が生きていれば保持、死んでいれば外して消す）`, () => {
    const repo = makeRepo()
    const live = repo.addWorktree('live')
    repo.git(repo.main, 'worktree', 'lock', '--reason', `claude session sess-1 (pid ${process.pid})`, live.path)
    assert.equal(sup(repo, live.path).result.worktree, 'retained-locked')
    const dead = repo.addWorktree('dead')
    repo.git(repo.main, 'worktree', 'lock', '--reason', `claude session sess-2 (pid ${deadPid()})`, dead.path)
    const r = sup(repo, dead.path)
    assert.deepEqual([r.result.worktree, r.result.unlocked], ['removed', true])
  })

  test(`${tag} lock: agent の形でない理由（手動の lock・理由なし・pid の形が違う）は pid が死んでいても外さない`, () => {
    const repo = makeRepo()
    const reasons = [['manual', 'keep until review'], ['noreason', null], ['nopid', 'claude agent agent-abc'], ['badpid', 'claude agent agent-abc (pid x1)'], ['noname', 'claude agent  (pid 1)'], ['emptystart', `claude agent agent-abc (pid ${deadPid()} start )`], ['other', `claude other agent-abc (pid ${deadPid()})`]]
    for (const [name, reason] of reasons) {
      const w = repo.addWorktree(name)
      repo.git(repo.main, 'worktree', 'lock', ...(reason === null ? [] : ['--reason', reason]), w.path)
      const r = sup(repo, w.path)
      assert.deepEqual([name, r.result.worktree, r.result.unlocked], [name, 'retained-locked', false])
      assert.ok(existsSync(w.path))
    }
  })

  test(`${tag} lock された worktree が汚れていて discard が保持するときは lock を外さない`, () => {
    const repo = makeRepo()
    const w = repo.addWorktree('w')
    repo.write(w.path, 'u.txt', 'u\n')
    repo.git(repo.main, 'worktree', 'lock', '--reason', lockReason(deadPid()), w.path)
    const r = dis(repo, w.path)
    assert.deepEqual([r.result.worktree, r.result.unlocked], ['retained-dirty', false])
    assert.match(repo.git(repo.main, 'worktree', 'list', '--porcelain'), /^locked /m)
  })

  // ---- 実体・登録・メイン ----
  test(`${tag} 実体が既に無い（登録だけ残っている）: 消せたものとして扱い、登録も掃除される`, () => {
    const repo = makeRepo()
    for (const [mode, name] of [['superseded', 'a'], ['discard', 'b']]) {
      const w = repo.addWorktree(name)
      rmSync(w.path, { recursive: true, force: true })
      const r = mode === 'superseded' ? sup(repo, w.path) : dis(repo, w.path, ['--branch', w.branch, '--base', 'main'])
      assert.equal(r.result.ok, true, `${mode}: ${JSON.stringify(r.result)}`)
      assert.ok(!repo.worktrees().includes(w.path), `${mode}: 登録が残る`)
    }
  })

  test(`${tag} メイン worktree は両モードとも消さない（実体のパス・シンボリックリンク・カレントがその中）`, () => {
    const repo = makeRepo()
    const link = join(repo.root, 'link-to-main')
    symlinkSync(repo.main, link)
    for (const p of [repo.main, `${repo.main}/`, link]) {
      for (const r of [sup(repo, p), dis(repo, p)]) {
        assert.equal(r.result.worktree, 'main', p)
        assert.equal(r.result.ok, false)
        assert.equal(r.result.retained, true)
      }
    }
    assert.ok(existsSync(join(repo.main, 'a.txt')) && existsSync(join(repo.main, '.git')))
    // カレントがメインではない（別の worktree の中から呼ばれた）ときも、先頭エントリは消さない
    const other = repo.addWorktree('other')
    for (const mode of ['superseded', 'discard']) {
      const r = run(repo, ['remove', '--mode', mode, '--path', repo.main], { cwd: other.path })
      assert.deepEqual([r.result.worktree, r.result.ok], ['main', false], mode)
    }
    assert.ok(existsSync(join(repo.main, '.git')))
    // カレントが付属 worktree の中: その worktree も消さない
    const w = repo.addWorktree('w')
    assert.equal(sup(repo, w.path).result.worktree, 'removed')
    const w2 = repo.addWorktree('w2')
    const inside = run(repo, ['remove', '--mode', 'superseded', '--path', w2.path], { cwd: w2.path })
    assert.deepEqual([inside.result.worktree, inside.result.ok, inside.result.retained], ['cwd', false, true], 'メインとは区別できる語')
    assert.ok(existsSync(w2.path))
  })

  test(`${tag} 登録されていないパスは消さない（実体が残る・ok）。メイン worktree の下の入れ子のディレクトリも消さない`, () => {
    const repo = makeRepo()
    const stray = join(repo.root, 'stray')
    mkdirSync(stray)
    writeFileSync(join(stray, 'x'), 'x\n')
    for (const r of [sup(repo, stray), dis(repo, stray, ['--branch', 'none-such', '--base', 'main'])]) {
      assert.deepEqual([r.result.worktree, r.result.ok], ['not-registered', true])
    }
    assert.ok(existsSync(join(stray, 'x')))
    const nested = join(repo.main, 'sub-dir')
    mkdirSync(nested)
    assert.equal(sup(repo, nested).result.worktree, 'not-registered')
    assert.ok(existsSync(nested))
  })

  test(`${tag} .git が壊れた worktree（git が親の repo を見てしまう）: メインの status を読まず、汚れの確認不能として保持する`, () => {
    const repo = makeRepo()
    // 1 回の実行ごとに git worktree prune が走り、gitdir を失った登録は消えるため、モードごとに別の worktree を使う
    for (const mode of ['superseded', 'discard']) {
      const w = repo.addWorktree(`broken-${mode}`, { dir: join(repo.main, '.claude', 'worktrees', `broken-${mode}`) })
      rmSync(join(w.path, '.git'))
      const r = mode === 'superseded' ? sup(repo, w.path) : dis(repo, w.path)
      assert.deepEqual([r.result.worktree, r.result.dirty], ['retained-dirty', -1], mode)
      assert.ok(existsSync(w.path))
    }
  })

  test(`${tag} 空白を含むパス`, () => {
    const repo = makeRepo()
    const w = repo.addWorktree('with space', { dir: join(repo.root, 'wts', 'with space') })
    assert.equal(sup(repo, w.path).result.worktree, 'removed')
    assert.ok(!existsSync(w.path))
  })

  // ---- ブランチ ----
  test(`${tag} ブランチ: base と同名は消さない（keep-base・ok）。実在しなければ absent。他の worktree が使用中なら failed で ok にしない`, () => {
    const repo = makeRepo()
    const a = repo.addWorktree('a')
    const d = dis(repo, a.path, ['--branch', a.branch, '--base', a.branch])
    assert.deepEqual([d.result.worktree, d.result.branch, d.result.ok, d.result.branchSha], ['removed', 'keep-base', true, repo.head(repo.main, a.branch)])
    assert.ok(repo.branches().includes(a.branch))

    // 実在しないブランチ（worktree 指定なし。--path と --branch を両方与える場合は HEAD が一致する必要がある）
    const e = run(repo, ['remove', '--mode', 'discard', '--branch', 'feat/never-existed', '--base', 'main'])
    assert.deepEqual([e.result.worktree, e.result.branch, e.result.ok, e.result.branchSha], ['skipped', 'absent', true, ''])

    // 別の worktree が使っているブランチは git が消させない
    const d2 = repo.addWorktree('d')
    const f = run(repo, ['remove', '--mode', 'discard', '--branch', d2.branch, '--base', 'main'])
    assert.deepEqual([f.result.worktree, f.result.branch, f.result.ok, f.result.branchSha], ['skipped', 'failed', false, ''], '削除に失敗したときは「削除前の先頭 sha」を出さない')
    assert.ok(repo.branches().includes(d2.branch))
  })

  // --path と --branch を両方与えたとき、削除の前に同じプロセスでその worktree の HEAD を読み、--branch と違えば worktree もブランチも消さない
  // （呼び出し側のエージェントが無関係なブランチ名を返しても、別の作業を消さない）
  test(`${tag} --branch が worktree の HEAD と違う: retained-branch-mismatch・ok:false。worktree もブランチも消さない（clean でも、無関係なブランチ名でも）`, () => {
    const repo = makeRepo()
    const a = repo.addWorktree('a')
    const b = repo.addWorktree('b')
    repo.write(b.path, 'q.txt', 'q\n')
    repo.git(b.path, 'add', 'q.txt')
    repo.git(b.path, 'commit', '-q', '-m', 'q')
    const bsha = repo.head(b.path)
    // a の worktree に b のブランチ名を結びつけても、a も b も消えない
    const r1 = dis(repo, a.path, ['--branch', b.branch, '--base', 'main'])
    assert.deepEqual([r1.result.ok, r1.result.worktree, r1.result.branch, r1.result.retained, r1.result.branchSha], [false, 'retained-branch-mismatch', 'keep', true, bsha])
    assert.ok(existsSync(a.path) && existsSync(b.path))
    assert.ok(repo.branches().includes(a.branch) && repo.branches().includes(b.branch))
    // 実在しないブランチ名・base 以外の別名でも同じ
    const r2 = dis(repo, a.path, ['--branch', 'feat/unrelated', '--base', 'main'])
    assert.deepEqual([r2.result.ok, r2.result.worktree, r2.result.branch], [false, 'retained-branch-mismatch', 'keep'])
    assert.ok(existsSync(a.path))
    // 一致すれば消える
    const r3 = dis(repo, a.path, ['--branch', a.branch, '--base', 'main'])
    assert.deepEqual([r3.result.ok, r3.result.worktree, r3.result.branch], [true, 'removed', 'deleted'])
    assert.ok(!existsSync(a.path) && repo.branches().includes(b.branch))
  })

  test(`${tag} --branch を与えて worktree が detached HEAD: retained-branch-mismatch で保持する。--branch を与えなければ従来どおり消える（superseded も対象外）`, () => {
    const repo = makeRepo()
    const a = repo.addWorktree('a')
    repo.git(a.path, 'checkout', '-q', '--detach')
    const r1 = dis(repo, a.path, ['--branch', a.branch, '--base', 'main'])
    assert.deepEqual([r1.result.worktree, r1.result.ok], ['retained-branch-mismatch', false])
    assert.ok(existsSync(a.path) && repo.branches().includes(a.branch))
    const r2 = dis(repo, a.path)
    assert.deepEqual([r2.result.worktree, r2.result.ok, r2.result.branch], ['removed', true, 'none'])
    const b = repo.addWorktree('b')
    repo.git(b.path, 'checkout', '-q', '--detach')
    assert.equal(sup(repo, b.path).result.worktree, 'removed')
  })

  // --head <sha>: マージ済み PR の head。worktree の HEAD のコミットが違えば（未 push のコミットがあり得る）、削除と同じプロセスで保持する。
  // squash マージでは base との差分で未 push のコミットを見分けられないため、PR の head との一致だけを根拠にする（Issue #632）
  test(`${tag} --head: HEAD のコミットが一致すれば消える（ブランチは --branch を与えなければ消さない）。違えば retained-head-mismatch で worktree もブランチも残す`, () => {
    const repo = makeRepo()
    const a = repo.addWorktree('a')
    const pushed = repo.head(a.path)
    // 一致: 消える。ブランチは触らない
    const r1 = dis(repo, a.path, ['--head', pushed])
    assert.deepEqual(r1.result, { ok: true, mode: 'discard', worktree: 'removed', branch: 'none', branchSha: '', dirty: 0, unlocked: false, retained: false })
    assert.ok(!existsSync(a.path) && repo.branches().includes(a.branch))
    // 不一致（PR の head のあとに未 push のコミットがある）: 保持
    const b = repo.addWorktree('b')
    const prHead = repo.head(b.path)
    repo.write(b.path, 'late.txt', 'late\n')
    repo.git(b.path, 'add', 'late.txt')
    repo.git(b.path, 'commit', '-q', '-m', 'late')
    const r2 = dis(repo, b.path, ['--head', prHead, '--branch', b.branch, '--base', 'main'])
    assert.deepEqual([r2.result.ok, r2.result.worktree, r2.result.branch, r2.result.retained], [false, 'retained-head-mismatch', 'keep', true])
    assert.ok(existsSync(b.path) && repo.branches().includes(b.branch))
    assert.equal(repo.git(b.path, 'log', '-1', '--format=%s'), 'late', '保持した worktree の作業は残る')
    // 実在しない sha でも同じ
    const r3 = dis(repo, b.path, ['--head', 'e'.repeat(40)])
    assert.deepEqual([r3.result.ok, r3.result.worktree], [false, 'retained-head-mismatch'])
    // 一致すれば --branch も消える
    const r4 = dis(repo, b.path, ['--head', repo.head(b.path), '--branch', b.branch, '--base', 'main'])
    assert.deepEqual([r4.result.ok, r4.result.worktree, r4.result.branch], [true, 'removed', 'deleted'])
  })

  // detached HEAD 上の未 push コミットは worktree を消すと含む ref が 0 件になり失われる。--head が一致していても detached なら保持する
  // （実装 worktree は常にブランチ上。PR の head の自己申告が HEAD と一致しても守る）。--head なしの discard / superseded は従来どおり消える
  test(`${tag} --head: detached HEAD は sha が一致していても retained-detached で保持する（違えば retained-head-mismatch）。--head なしは従来どおり`, () => {
    const repo = makeRepo()
    const a = repo.addWorktree('a')
    const base = repo.head(a.path)
    repo.git(a.path, 'checkout', '-q', '--detach')
    assert.equal(dis(repo, a.path, ['--head', 'f'.repeat(40)]).result.worktree, 'retained-head-mismatch')
    const r1 = dis(repo, a.path, ['--head', base])
    assert.deepEqual([r1.result.ok, r1.result.worktree, r1.result.retained], [false, 'retained-detached', true])
    assert.ok(existsSync(a.path))
    const b = repo.addWorktree('b')
    repo.write(b.path, 'x.txt', 'x\n')
    repo.git(b.path, 'add', 'x.txt')
    repo.git(b.path, 'commit', '-q', '-m', 'unpushed')
    repo.git(b.path, 'checkout', '-q', '--detach')
    const detachedSha = repo.git(b.path, 'rev-parse', 'HEAD')
    assert.equal(dis(repo, b.path, ['--head', base]).result.worktree, 'retained-head-mismatch')
    const r2 = dis(repo, b.path, ['--head', detachedSha])
    assert.deepEqual([r2.result.ok, r2.result.worktree], [false, 'retained-detached'])
    assert.ok(existsSync(b.path) && repo.git(b.path, 'log', '-1', '--format=%s') === 'unpushed', '未 push のコミットを守る')
    // --head を与えなければ従来どおり消える
    assert.equal(dis(repo, a.path).result.worktree, 'removed')
    const c = repo.addWorktree('c')
    repo.git(c.path, 'checkout', '-q', '--detach')
    assert.equal(sup(repo, c.path).result.worktree, 'removed')
  })

  test(`${tag} --head: コミットが無い（unborn）worktree は HEAD を読めないので retained-head-mismatch で保持する`, () => {
    const repo = makeRepo()
    const dir = join(repo.root, 'wts', 'orph')
    mkdirSync(join(dir, '..'), { recursive: true })
    repo.git(repo.main, 'worktree', 'add', '-q', '--orphan', '-b', 'orph-b', dir)
    const r = dis(repo, dir, ['--head', repo.git(repo.main, 'rev-parse', 'HEAD')])
    assert.deepEqual([r.result.ok, r.result.worktree, r.result.retained], [false, 'retained-head-mismatch', true])
    assert.ok(existsSync(dir))
  })

  test(`${tag} --head の値が空・形式不正は usage エラー（exit 2）で何も消さない（照合が黙って無効にならない）`, () => {
    const repo = makeRepo()
    const a = repo.addWorktree('a')
    for (const bad of ['', 'abc', 'A'.repeat(40), 'a'.repeat(41)]) {
      const r = dis(repo, a.path, ['--head', bad])
      assert.equal(r.status, 2, `--head ${JSON.stringify(bad)}`)
      assert.ok(existsSync(a.path))
    }
  })

  test(`${tag} --head: 汚れ・lock の保持が先に効く（一致していても --force は使わない）。実体の無い worktree は失う作業が無いので消せる。未登録・メインは消さない`, () => {
    const repo = makeRepo()
    const a = repo.addWorktree('a')
    const sha = repo.head(a.path)
    repo.write(a.path, 'u.txt', 'u\n')
    assert.equal(dis(repo, a.path, ['--head', sha]).result.worktree, 'retained-dirty')
    assert.ok(existsSync(join(a.path, 'u.txt')))
    const l = repo.addWorktree('l')
    repo.git(repo.main, 'worktree', 'lock', '--reason', 'manual', l.path)
    assert.equal(dis(repo, l.path, ['--head', repo.head(l.path)]).result.worktree, 'retained-locked')
    // 実体が無い（登録だけが残っている）worktree は HEAD を読めないが、失う作業も無いので従来どおり掃除する
    const d = repo.addWorktree('d')
    rmSync(d.path, { recursive: true, force: true })
    const r = dis(repo, d.path, ['--head', sha])
    assert.deepEqual([r.result.ok, r.result.worktree], [true, 'removed'])
    // 登録されていないパス・メイン worktree は --head があっても消さない
    assert.equal(dis(repo, join(repo.root, 'nope'), ['--head', sha]).result.worktree, 'not-registered')
    assert.equal(dis(repo, repo.main, ['--head', repo.head(repo.main)]).result.worktree, 'main')
  })

  test(`${tag} worktree 指定なし（--path 省略）の discard: ブランチだけを消す`, () => {
    const repo = makeRepo()
    repo.git(repo.main, 'branch', 'feat/orphan')
    const r = run(repo, ['remove', '--mode', 'discard', '--branch', 'feat/orphan', '--base', 'main'])
    assert.deepEqual([r.result.worktree, r.result.branch, r.result.ok], ['skipped', 'deleted', true])
    assert.ok(!repo.branches().includes('feat/orphan'))
  })

  // ---- 引数 ----
  test(`${tag} 使い方の誤りは exit 2 で結果の行を出さず、何も消さない`, () => {
    const repo = makeRepo()
    const w = repo.addWorktree('w')
    const bad = [
      [],
      ['bogus'],
      ['remove'],
      ['remove', '--mode', 'force', '--path', w.path],
      ['remove', '--mode', 'superseded'],
      ['remove', '--mode', 'superseded', '--path', 'relative/path'],
      ['remove', '--mode', 'superseded', '--path', `${w.path}/../w`],
      ['remove', '--mode', 'superseded', '--path', `${w.path};touch x`],
      ['remove', '--mode', 'superseded', '--path', `${w.path}'`],
      ['remove', '--mode', 'superseded', '--path', w.path, '--branch', 'b'],
      ['remove', '--mode', 'discard', '--path', w.path, '--branch', '-D'],
      ['remove', '--mode', 'discard', '--path', w.path, '--branch', 'a..b'],
      ['remove', '--mode', 'discard', '--path', w.path, '--branch', 'a b'],
      ['remove', '--mode', 'discard', '--path', w.path, '--base', 'x y'],
      ['remove', '--mode', 'superseded', '--path', w.path, '--file', '_/issue-trees/1.json'],
      ['remove', '--mode', 'superseded', '--path', w.path, '--head', 'a'.repeat(40)],
      ['remove', '--mode', 'discard', '--head', 'a'.repeat(40)],
      ['remove', '--mode', 'discard', '--branch', 'feat/x', '--head', 'a'.repeat(40)],
      ['remove', '--mode', 'discard', '--path', w.path, '--head', 'a'.repeat(39)],
      ['remove', '--mode', 'discard', '--path', w.path, '--head', 'a'.repeat(41)],
      ['remove', '--mode', 'discard', '--path', w.path, '--head', 'A'.repeat(40)],
      ['remove', '--mode', 'discard', '--path', w.path, '--head', 'g'.repeat(40)],
      ['remove', '--mode', 'discard', '--path', w.path, '--head', 'HEAD'],
      ['remove', '--mode', 'discard', '--path', w.path, '--head', `${'a'.repeat(39)};`],
      ['remove', '--mode', 'discard', '--path', w.path, '--head'],
      ['sweep', '--file', '_/issue-trees/1.json', '--head', 'a'.repeat(40)],
      ['remove', '--mode', 'superseded', '--path'],
      ['remove', '--mode', 'superseded', '--path', w.path, '--unknown', 'x'],
      ['sweep'],
      ['sweep', '--file', '/etc/passwd'],
      ['sweep', '--file', '_/issue-trees/0.json'],
      ['sweep', '--file', '_/issue-trees/1.json', '--mode', 'superseded'],
    ]
    for (const args of bad) {
      const r = run(repo, args)
      assert.equal(r.status, 2, `${JSON.stringify(args)}: ${r.stdout}${r.stderr}`)
      assert.equal(r.result, null, JSON.stringify(args))
    }
    assert.ok(existsSync(w.path))
  })

  // ---- sweep ----
  const stateJson = (items) => JSON.stringify({ items })
  const sweep = (repo, candidates, items, { raw } = {}) => {
    const file = '_/issue-trees/1.json'
    mkdirSync(join(repo.main, '_', 'issue-trees'), { recursive: true })
    if (items !== null) writeFileSync(join(repo.main, file), raw ?? stateJson(items))
    return run(repo, ['sweep', '--file', file], { input: typeof candidates === 'string' ? candidates : JSON.stringify(candidates) })
  }

  test(`${tag} sweep: 状態が failed / blocked / monitoring のイシューが記録した worktree は消さず、merged や記録なしの候補は消す`, () => {
    const repo = makeRepo()
    const w = Object.fromEntries(['merged', 'failed', 'blocked', 'monitoring', 'orphan', 'notcand'].map((n) => [n, repo.addWorktree(n).path]))
    const items = {
      1: { status: 'merged', worktree: w.merged },
      2: { status: 'failed', worktree: w.failed },
      3: { status: 'blocked', worktree: w.blocked },
      4: { status: 'monitoring', worktree: w.monitoring },
    }
    const r = sweep(repo, [w.merged, w.failed, w.blocked, w.monitoring, w.orphan], items)
    assert.equal(r.status, 0, r.stderr)
    assert.deepEqual(r.result, { ok: true, mode: 'sweep', removed: [w.merged, w.orphan], retained: 3, skipped: 0, failed: 0, reason: '' })
    assert.deepEqual([w.merged, w.orphan].map(existsSync), [false, false])
    assert.deepEqual([w.failed, w.blocked, w.monitoring, w.notcand].map(existsSync), [true, true, true, true], '保持対象と候補でないものは残る')
  })

  test(`${tag} sweep: 保持対象の照合は実体のパスでも行う（シンボリックリンク経由の記録）`, () => {
    const repo = makeRepo()
    const a = repo.addWorktree('a')
    const link = join(repo.root, 'link-a')
    symlinkSync(a.path, link)
    const r = sweep(repo, [a.path], { 1: { status: 'failed', worktree: link } })
    assert.deepEqual([r.result.removed, r.result.retained], [[], 1])
    assert.ok(existsSync(a.path))
  })

  test(`${tag} sweep: 登録されていないパス・メイン worktree・形式が不正な候補は消さず skipped に数える`, () => {
    const repo = makeRepo()
    const stray = join(repo.root, 'stray')
    mkdirSync(stray)
    const r = sweep(repo, [stray, repo.main, '/etc/../tmp', 'relative'], {})
    assert.deepEqual([r.result.removed, r.result.skipped, r.result.retained], [[], 4, 0])
    assert.ok(existsSync(stray) && existsSync(join(repo.main, 'a.txt')))
  })

  test(`${tag} sweep: 候補の汚れは superseded と同じ扱い（汚れていても消す。submodule の未記録の変更・生きている agent の lock は保持）`, () => {
    const repo = makeRepo({ submodule: true })
    const dirty = repo.addWorktree('dirty')
    repo.write(dirty.path, 'u.txt', 'u\n')
    const smDirty = repo.addWorktree('smdirty')
    repo.initSubmodule(smDirty.path)
    repo.write(smDirty.path, 'sm/f', 'changed\n')
    const live = repo.addWorktree('live')
    repo.git(repo.main, 'worktree', 'lock', '--reason', lockReason(process.pid), live.path)
    const r = sweep(repo, [dirty.path, smDirty.path, live.path], {})
    assert.deepEqual([r.result.removed, r.result.retained, r.result.failed], [[dirty.path], 2, 0])
    assert.deepEqual([dirty.path, smDirty.path, live.path].map(existsSync), [false, true, true])
  })

  test(`${tag} sweep: 状態ファイルを読めない（無い・壊れている・items が無い）ときは何も消さない`, () => {
    const repo = makeRepo()
    const a = repo.addWorktree('a')
    // jq は空ファイル・空白だけの入力でも 0 終了するので、形（ちょうど 1 個の値・items がオブジェクト）を先に確かめる
    const bad = [[null, undefined], [{}, '{not json'], [{}, '{}'], [{}, '[]'], [{}, ''], [{}, '  \n\t\n'], [{}, '{"items":{}}\n{"items":{}}'], [{}, '{"x":1}'], [{}, '{"items":[]}'], [{}, '{"items":null}'], [{}, '{"items":"x"}'], [{}, 'null'], [{}, '"s"'], [{}, '{"items":{"1":5}}'], [{}, '{"items":{"1":null}}'], [{}, '{"items":{"1":"x"}}'], [{}, '{"items":{"1":[]}}'], [{}, '{"items":{"1":{"worktree":3}}}'], [{}, '{"items":{"1":{"status":"failed","worktree":null}}}'], [{}, '{"items":{"1":{"worktree":false}}}'], [{}, '{"items":{"1":{"worktree":"/x"},"2":5}}']]
    for (const [items, raw] of bad) {
      const r = sweep(repo, [a.path], items, { raw })
      assert.deepEqual([r.status, r.result.reason, r.result.removed], [0, 'state-unreadable', []], String(raw))
      assert.ok(existsSync(a.path))
    }
  })

  test(`${tag} sweep: 候補の入力が配列でない・文字列以外を含む・複数の値のときは何も消さない`, () => {
    const repo = makeRepo()
    const a = repo.addWorktree('a')
    for (const input of ['not json', '{"a":1}', JSON.stringify([a.path, 1]), `${JSON.stringify([a.path])}\n${JSON.stringify([a.path])}`, '']) {
      const r = sweep(repo, input, {})
      assert.deepEqual([r.status, r.result.reason, r.result.removed], [0, 'invalid-input', []], input)
      assert.ok(existsSync(a.path))
    }
    // 空配列は有効な入力（削除ゼロ）で、invalid-input ではない
    assert.deepEqual(sweep(repo, [], {}).result, { ok: true, mode: 'sweep', removed: [], retained: 0, skipped: 0, failed: 0, reason: '' })
  })

  test(`${tag} 起動: run-verified.sh 経由（SHA-256 照合つき）で結果の行を出す`, async () => {
    const { bundleSha256 } = await import('../../scripts/build-workflow.mjs')
    const scripts = dirname(SCRIPT)
    const repo = makeRepo()
    const w = repo.addWorktree('w')
    const r = spawnSync(bash, [join(scripts, 'run-verified.sh'), bundleSha256(scripts, 'worktree-remove.sh'), 'worktree-remove.sh', 'remove', '--mode', 'superseded', '--path', w.path], { cwd: repo.main, encoding: 'utf8' })
    assert.equal(r.status, 0, r.stderr)
    assert.match(r.stdout.trim().split('\n').pop(), /^WORKTREE_REMOVE_RESULT \{"ok":true,"mode":"superseded","worktree":"removed"/)
    const bad = spawnSync(bash, [join(scripts, 'run-verified.sh'), '0'.repeat(64), 'worktree-remove.sh', 'remove', '--mode', 'superseded', '--path', repo.addWorktree('x').path], { cwd: repo.main, encoding: 'utf8' })
    assert.equal(bad.status, 3, 'ハッシュ不一致では実行しない')
    assert.ok(!/WORKTREE_REMOVE_RESULT/.test(bad.stdout))
  })
}
