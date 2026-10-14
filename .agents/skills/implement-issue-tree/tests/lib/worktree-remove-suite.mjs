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
import { chmodSync, existsSync, mkdirSync, renameSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
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
    assert.deepEqual([sup(repo, stray).result.worktree, sup(repo, stray).result.ok], ['not-registered', true])
    // --path つきの --branch は登録の無い実体を保持する（#649。ブランチを消す根拠にしない）
    const withBranch = dis(repo, stray, ['--branch', 'none-such', '--base', 'main'])
    assert.deepEqual([withBranch.result.worktree, withBranch.result.ok], ['retained-unregistered', false])
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
      assert.deepEqual([r.result.worktree, r.result.dirty], ['retained-broken', -1], mode)
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

  // --expect-branch: --branch と同じ位置・同じ判定で HEAD を照合するだけで、ブランチは消さない（規約外のブランチ名上の worktree の discard 用）
  test(`${tag} --expect-branch: HEAD が一致すれば worktree だけ消えてブランチは残る。detached・別ブランチ・汚れは保持する`, () => {
    const repo = makeRepo()
    // 規約外の名前（worktree-wf_…）の worktree。一致 → removed・branch は none（消さない）・ブランチは残る
    const a = repo.addWorktree('a', { branch: 'worktree-wf_ab12' })
    const asha = repo.head(a.path)
    const r1 = dis(repo, a.path, ['--expect-branch', 'worktree-wf_ab12'])
    assert.deepEqual(r1.result, { ok: true, mode: 'discard', worktree: 'removed', branch: 'none', branchSha: '', dirty: 0, unlocked: false, retained: false })
    assert.ok(!existsSync(a.path))
    assert.ok(repo.branches().includes('worktree-wf_ab12'), 'ブランチは消さない')
    assert.equal(repo.git(repo.main, 'rev-parse', 'worktree-wf_ab12'), asha)

    // detached: 申告されたブランチ名が実在しても、HEAD がブランチ上に無いので保持する
    const b = repo.addWorktree('b', { branch: 'worktree-wf_cd34' })
    repo.git(b.path, 'checkout', '-q', '--detach')
    const r2 = dis(repo, b.path, ['--expect-branch', 'worktree-wf_cd34'])
    assert.deepEqual([r2.result.ok, r2.result.worktree, r2.result.branch, r2.result.retained], [false, 'retained-branch-mismatch', 'none', true])
    assert.ok(existsSync(b.path))

    // 申告されたブランチとは別のブランチにいる worktree: 保持する
    const c = repo.addWorktree('c', { branch: 'worktree-wf_ef56' })
    const r3 = dis(repo, c.path, ['--expect-branch', 'worktree-wf_other'])
    assert.deepEqual([r3.result.ok, r3.result.worktree, r3.result.retained], [false, 'retained-branch-mismatch', true])
    assert.ok(existsSync(c.path) && repo.branches().includes('worktree-wf_ef56'))

    // 一致していても汚れていれば保持する（--force は使わない）
    repo.write(c.path, 'u.txt', 'u\n')
    const r4 = dis(repo, c.path, ['--expect-branch', 'worktree-wf_ef56'])
    assert.deepEqual([r4.result.ok, r4.result.worktree], [false, 'retained-dirty'])
    assert.ok(existsSync(c.path))

    // --expect-branch なしの discard は従来どおり HEAD を照合せず消える（detached でも）
    assert.equal(dis(repo, b.path).result.worktree, 'removed')
  })

  test(`${tag} --expect-branch: base と同名でも照合だけなので拒否しない（ブランチは消さない）。実体の無い worktree は読めないので従来どおり消える`, () => {
    const repo = makeRepo()
    const a = repo.addWorktree('a')
    // a は main ではない別ブランチ上: 'main' を申告しても HEAD が違うので保持する（usage エラーにならない）
    const r1 = dis(repo, a.path, ['--expect-branch', 'main'])
    assert.equal(r1.status, 0, r1.stderr)
    assert.deepEqual([r1.result.worktree, r1.result.branch], ['retained-branch-mismatch', 'none'])
    // 実体の無い worktree（dead）
    const d = repo.addWorktree('d')
    rmSync(d.path, { recursive: true })
    const r2 = dis(repo, d.path, ['--expect-branch', d.branch])
    assert.deepEqual([r2.result.worktree, r2.result.ok, r2.result.branch], ['removed', true, 'none'])
    assert.ok(repo.branches().includes(d.branch))
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

  test(`${tag} --head: コミットが無い（unborn）worktree は PR の head と一致し得ないので retained-head-mismatch（恒久の保持。毎ラン再試行させない）で保持する`, () => {
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
      ['remove', '--mode', 'superseded', '--path', w.path, '--expect-branch', 'feat/x'],
      ['remove', '--mode', 'discard', '--expect-branch', 'feat/x'],
      ['remove', '--mode', 'discard', '--path', w.path, '--expect-branch'],
      ['remove', '--mode', 'discard', '--path', w.path, '--expect-branch', ''],
      ['remove', '--mode', 'discard', '--path', w.path, '--expect-branch', '-D'],
      ['remove', '--mode', 'discard', '--path', w.path, '--expect-branch', 'a..b'],
      ['remove', '--mode', 'discard', '--path', w.path, '--expect-branch', 'a b'],
      ['remove', '--mode', 'discard', '--path', w.path, '--expect-branch', 'feat/x', '--branch', 'feat/x'],
      ['sweep', '--file', '_/issue-trees/1.json', '--expect-branch', 'feat/x'],
      ['sweep', '--file', '_/issue-trees/1.json', '--head', 'a'.repeat(40)],
      ['remove', '--mode', 'superseded', '--path', w.path, '--require-missing'],
      ['remove', '--mode', 'discard', '--require-missing'],
      ['remove', '--mode', 'discard', '--branch', 'feat/x', '--require-missing'],
      ['remove', '--mode', 'discard', '--path', w.path, '--branch', 'feat/x', '--require-missing'],
      ['remove', '--mode', 'discard', '--path', w.path, '--head', 'a'.repeat(40), '--require-missing'],
      ['remove', '--mode', 'discard', '--path', w.path, '--expect-branch', 'feat/x', '--require-missing'],
      ['remove', '--mode', 'discard', '--path', w.path, '--require-missing', 'x'],
      ['sweep', '--file', '_/issue-trees/1.json', '--require-missing'],
      ['check-absent', '--path', w.path, '--require-missing'],
      ['remove', '--mode', 'superseded', '--path'],
      ['remove', '--mode', 'superseded', '--path', w.path, '--unknown', 'x'],
      ['check-absent'],
      ['check-absent', '--path'],
      ['check-absent', '--path', 'relative/wt'],
      ['check-absent', '--path', '/tmp/a;b'],
      ['check-absent', '--path', '/tmp/../x'],
      ['check-absent', '--path', w.path, '--mode', 'discard'],
      ['check-absent', '--path', w.path, '--branch', 'feat/x'],
      ['check-absent', '--path', w.path, '--base', 'main'],
      ['check-absent', '--path', w.path, '--head', 'a'.repeat(40)],
      ['check-absent', '--path', w.path, '--expect-branch', 'feat/x'],
      ['check-absent', '--path', w.path, '--file', '_/issue-trees/1.json'],
      ['check-absent', '--path', w.path, '--unknown', 'x'],
      ['check-absent', '--path', w.path, '--repo-root'],
      ['check-absent', '--path', w.path, '--repo-root', 'relative'],
      ['check-absent', '--path', w.path, '--repo-root', ''],
      ['remove', '--mode', 'superseded', '--path', w.path, '--repo-root', '/tmp/x'],
      ['sweep'],
      ['sweep', '--file', '_/issue-trees/1.json', '--path', w.path],
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

  // ---- check-absent（Issue #637）: 削除を一切しない不在専用の確認 ----
  // 実行の前後で、登録の一覧・.git/worktrees の中身・全 ref・各パスの有無が同じであること（何も削除・prune・unlock・変更しない）を確かめる
  const snap = (repo, paths) => ({
    list: repo.git(repo.main, 'worktree', 'list', '--porcelain'),
    admin: spawnSync('ls', ['-A', join(repo.main, '.git', 'worktrees')], { encoding: 'utf8' }).stdout,
    refs: repo.git(repo.main, 'for-each-ref', '--format=%(refname) %(objectname)'),
    exists: paths.map((p) => existsSync(p)),
  })
  const ca = (repo, path, extra = ['--repo-root', repo.main]) => run(repo, ['check-absent', '--path', path, ...extra])
  const caWord = (repo, path, paths = [path], extra) => {
    const before = snap(repo, paths)
    const r = ca(repo, path, extra)
    assert.equal(r.status, 0, r.stderr)
    assert.deepEqual(snap(repo, paths), before, '何も削除・変更されない')
    assert.equal(r.result.mode, 'check-absent')
    assert.deepEqual([r.result.branch, r.result.branchSha, r.result.dirty, r.result.unlocked], ['none', '', 0, false])
    return r.result
  }

  test(`${tag} check-absent: 登録が無くパスも無い → absent（ok・retained=false）。何も変わらない`, () => {
    const repo = makeRepo()
    const p = join(repo.root, 'wts', 'never')
    assert.deepEqual(caWord(repo, p), { ok: true, mode: 'check-absent', worktree: 'absent', branch: 'none', branchSha: '', dirty: 0, unlocked: false, retained: false })
    // 祖先ごと無いパスも absent
    assert.equal(caWord(repo, join(repo.root, 'no', 'such', 'dir', 'wt')).worktree, 'absent')
    // git worktree remove で正規に消した後も absent
    const a = repo.addWorktree('a')
    repo.git(repo.main, 'worktree', 'remove', a.path)
    const r = caWord(repo, a.path)
    assert.deepEqual([r.ok, r.worktree, r.retained], [true, 'absent', false])
    assert.ok(repo.branches().includes(a.branch), 'ブランチも触らない')
  })

  test(`${tag} check-absent: 登録だけ残り実体が無い（rm で手消し）→ lock なし・ブランチ上は prunable（不在扱い）。登録は prune されず残る`, () => {
    const repo = makeRepo()
    const a = repo.addWorktree('a')
    rmSync(a.path, { recursive: true })
    const r = caWord(repo, a.path)
    assert.deepEqual([r.ok, r.worktree, r.retained], [true, 'prunable', false])
    assert.ok(repo.worktrees().includes(a.path), '登録が残る（このモードは prune しない）')
    assert.ok(repo.branches().includes(a.branch))
    // 続けて remove を走らせれば従来どおり prune されるが、check-absent 自体は何もしなかった
  })

  test(`${tag} check-absent: 登録だけ残り detached は prunable-detached、lock ありは prunable-locked（どちらも不在扱いにしない・保全）`, () => {
    const repo = makeRepo()
    const d = repo.addWorktree('d')
    repo.write(d.path, 'q.txt', 'q\n')
    repo.git(d.path, 'add', 'q.txt')
    repo.git(d.path, 'checkout', '-q', '--detach')
    repo.git(d.path, 'commit', '-q', '-m', 'unpushed')
    const sha = repo.head(d.path)
    rmSync(d.path, { recursive: true })
    const rd = caWord(repo, d.path)
    assert.deepEqual([rd.ok, rd.worktree, rd.retained], [false, 'prunable-detached', true])
    assert.equal(repo.git(repo.main, 'cat-file', '-t', sha), 'commit', '未 push のコミットが残る')
    const l = repo.addWorktree('l')
    repo.git(repo.main, 'worktree', 'lock', '--reason', 'portable', l.path)
    rmSync(l.path, { recursive: true })
    const rl = caWord(repo, l.path)
    assert.deepEqual([rl.ok, rl.worktree, rl.retained], [false, 'prunable-locked', true])
  })

  test(`${tag} check-absent: 実体がある（clean・detached で未 push・汚れ・lock）→ present。何も消さない`, () => {
    const repo = makeRepo()
    const clean = repo.addWorktree('clean')
    const det = repo.addWorktree('det')
    repo.git(det.path, 'checkout', '-q', '--detach')
    repo.write(det.path, 'n.txt', 'n\n')
    repo.git(det.path, 'add', 'n.txt')
    repo.git(det.path, 'commit', '-q', '-m', 'unpushed')
    const detSha = repo.head(det.path)
    const dirty = repo.addWorktree('dirty')
    repo.write(dirty.path, 'u.txt', 'u\n')
    const locked = repo.addWorktree('locked')
    repo.git(repo.main, 'worktree', 'lock', '--reason', lockReason(process.pid), locked.path)
    const all = [clean.path, det.path, dirty.path, locked.path]
    for (const w of all) {
      const r = caWord(repo, w, all)
      assert.deepEqual([r.ok, r.worktree, r.retained], [false, 'present', true], w)
    }
    assert.equal(repo.head(det.path), detSha)
    assert.ok(all.every((w) => existsSync(w)))
  })

  test(`${tag} check-absent: 未登録だがディレクトリだけある・ファイルやシンボリックリンクがある → unregistered-present。メイン worktree → main。何も消さない`, () => {
    const repo = makeRepo()
    const stray = join(repo.root, 'stray')
    mkdirSync(stray)
    writeFileSync(join(stray, 'keep.txt'), 'k\n')
    const file = join(repo.root, 'afile')
    writeFileSync(file, 'x\n')
    const link = join(repo.root, 'alink')
    symlinkSync(join(repo.root, 'no-target'), link) // 壊れたシンボリックリンクも「ある」
    for (const p of [stray, file, link]) {
      const r = ca(repo, p)
      assert.deepEqual([r.result.ok, r.result.worktree, r.result.retained], [false, 'unregistered-present', true], p)
    }
    assert.ok(existsSync(join(stray, 'keep.txt')))
    assert.equal(ca(repo, repo.main).result.worktree, 'main')
    // メイン worktree の中のパス（未登録・存在しない）は absent だが、メイン自身は main
    assert.equal(ca(repo, join(repo.main, 'sub-never')).result.worktree, 'absent')
  })

  test(`${tag} check-absent: 祖先がシンボリックリンク経由でも、実体のパスで登録された prunable を absent と誤読しない`, () => {
    const repo = makeRepo()
    const a = repo.addWorktree('a')
    const alias = join(repo.root, 'alias')
    symlinkSync(join(repo.root, 'wts'), alias)
    rmSync(a.path, { recursive: true })
    const r = ca(repo, join(alias, 'a'))
    assert.equal(r.result.worktree, 'prunable', '字面が alias/a でも登録（wts/a）と突き合わせる')
    // 登録の無い名前は alias 経由でも absent
    assert.equal(ca(repo, join(alias, 'other')).result.worktree, 'absent')
  })

  test(`${tag} check-absent: git worktree list が失敗する（git のリポジトリの外）→ unknown。absent に倒さない`, () => {
    const repo = makeRepo()
    const outside = join(repo.root, 'outside')
    mkdirSync(outside)
    const r = run(repo, ['check-absent', '--path', join(repo.root, 'wts', 'z'), '--repo-root', repo.main], { cwd: outside })
    assert.equal(r.status, 0, r.stderr)
    assert.deepEqual([r.result.ok, r.result.worktree, r.result.retained], [false, 'unknown', true])
  })

  test(`${tag} check-absent: カレントが対象の中にあっても読み取りだけで結果を返す（cwd として扱わない）`, () => {
    const repo = makeRepo()
    const a = repo.addWorktree('a')
    const before = snap(repo, [a.path])
    const r = run(repo, ['check-absent', '--path', a.path, '--repo-root', repo.main], { cwd: a.path })
    assert.equal(r.result.worktree, 'present')
    assert.deepEqual(snap(repo, [a.path]), before)
  })

  // ---- 同値な別表記のパス・大小違い・HEAD 0000…・リポジトリ照合・prune のスキップ（Issue #637 の独立レビュー・Issue #641） ----
  // 登録の種類ごとに、実体を消した登録を作る。word は plain な表記での語
  const KINDS = {
    prunable: { word: 'prunable', make: (repo, name) => { const a = repo.addWorktree(name); rmSync(a.path, { recursive: true }); return a } },
    'prunable-detached': {
      word: 'prunable-detached',
      make: (repo, name) => {
        const a = repo.addWorktree(name)
        repo.write(a.path, 'q.txt', 'q\n')
        repo.git(a.path, 'add', 'q.txt')
        repo.git(a.path, 'checkout', '-q', '--detach')
        repo.git(a.path, 'commit', '-q', '-m', 'unique')
        a.sha = repo.head(a.path)
        rmSync(a.path, { recursive: true })
        return a
      },
    },
    'prunable-locked': {
      word: 'prunable-locked',
      make: (repo, name) => {
        const a = repo.addWorktree(name)
        repo.git(repo.main, 'worktree', 'lock', '--reason', 'portable', a.path)
        rmSync(a.path, { recursive: true })
        return a
      },
    },
  }
  for (const [kind, spec] of Object.entries(KINDS)) {
    test(`${tag} check-absent ${kind}: 末尾 / ・末尾 /. ・// ・途中の /./ の別表記でも同じ語（absent に倒れない）`, () => {
      const repo = makeRepo()
      const a = spec.make(repo, 'p3')
      const dir = join(repo.root, 'wts')
      for (const form of [`${a.path}/`, `${a.path}/.`, `${a.path}//`, `${dir}//p3`, `${dir}/./p3`, `${dir}/./p3/./`, `${dir}//./p3/.`]) {
        const r = caWord(repo, form, [a.path])
        assert.equal(r.worktree, spec.word, form)
        assert.equal(r.retained, kind !== 'prunable', form)
      }
    })
    test(`${tag} check-absent ${kind}: 大小だけ違うパス（本体・祖先）は登録ありと見なして保全（absent / prunable を返さない）`, () => {
      const repo = makeRepo()
      const a = spec.make(repo, 'p3')
      const dir = join(repo.root, 'wts')
      for (const form of [join(dir, 'P3'), join(repo.root, 'WTS', 'p3'), join(repo.root, 'WTS', 'P3'), `${join(dir, 'P3')}/`]) {
        const r = caWord(repo, form, [a.path])
        assert.ok(!['absent', 'prunable'].includes(r.worktree), `${form}: ${r.worktree}`)
        assert.equal(r.ok, false, form)
        assert.equal(r.retained, true, form)
      }
      // 大小だけでなく名前が違えば登録なし
      assert.equal(caWord(repo, join(dir, 'p4'), [a.path]).worktree, 'absent')
      assert.equal(caWord(repo, join(repo.root, 'WTS', 'p4'), [a.path]).worktree, 'absent')
    })
  }

  test(`${tag} check-absent: 末尾 / の present・main は従来どおり`, () => {
    const repo = makeRepo()
    const a = repo.addWorktree('a')
    assert.equal(ca(repo, `${a.path}/`).result.worktree, 'present')
    assert.equal(ca(repo, `${a.path}/.`).result.worktree, 'present')
    assert.equal(ca(repo, `${repo.main}/`).result.worktree, 'main')
    assert.equal(ca(repo, `${repo.main}/.`).result.worktree, 'main')
  })

  test(`${tag} check-absent: ブランチ ref を update-ref -d で消した登録（HEAD 0000…）は prunable ではなく prunable-detached（保全）`, () => {
    const repo = makeRepo()
    const a = repo.addWorktree('z')
    repo.write(a.path, 'q.txt', 'q\n')
    repo.git(a.path, 'add', 'q.txt')
    repo.git(a.path, 'commit', '-q', '-m', 'only-on-branch')
    repo.git(repo.main, 'update-ref', '-d', `refs/heads/${a.branch}`)
    rmSync(a.path, { recursive: true })
    assert.match(repo.git(repo.main, 'worktree', 'list', '--porcelain'), /HEAD 0{40,64}/)
    const r = caWord(repo, a.path)
    assert.deepEqual([r.ok, r.worktree, r.retained], [false, 'prunable-detached', true])
  })

  test(`${tag} check-absent: 別の git リポジトリの中で実行されても absent に倒さない（--repo-root と照合して違えば unknown）`, () => {
    const repo = makeRepo()
    const other = makeRepo()
    const a = KINDS['prunable-detached'].make(repo, 'p3')
    const r = run(repo, ['check-absent', '--path', a.path, '--repo-root', repo.main], { cwd: other.main })
    assert.deepEqual([r.result.ok, r.result.worktree, r.result.retained], [false, 'unknown', true])
    // 同じリポジトリのカレント（別の worktree の中を含む）なら判定できる
    const w = repo.addWorktree('w')
    const r2 = run(repo, ['check-absent', '--path', a.path, '--repo-root', repo.main], { cwd: w.path })
    assert.equal(r2.result.worktree, 'prunable-detached')
    // --repo-root が無いときは、パスの最寄りの実在する祖先から求める。リポジトリの外の祖先しか無ければ求められず unknown（保全側）
    const r3 = run(repo, ['check-absent', '--path', a.path], { cwd: repo.main })
    assert.equal(r3.result.worktree, 'unknown')
    // メイン worktree の中に置いた worktree は祖先から求められる
    const inner = repo.addWorktree('inner', { dir: join(repo.main, '.claude', 'worktrees', 'inner') })
    rmSync(inner.path, { recursive: true })
    assert.equal(run(repo, ['check-absent', '--path', inner.path], { cwd: repo.main }).result.worktree, 'prunable')
    assert.equal(run(repo, ['check-absent', '--path', inner.path], { cwd: other.main }).result.worktree, 'unknown')
    // --repo-root がリポジトリでない・違うリポジトリのとき
    assert.equal(run(repo, ['check-absent', '--path', a.path, '--repo-root', other.main], { cwd: repo.main }).result.worktree, 'unknown')
    assert.equal(run(repo, ['check-absent', '--path', a.path, '--repo-root', join(repo.root, 'nope')], { cwd: repo.main }).result.worktree, 'unknown')
  })

  // 固有コミットを持つ detached の登録（実体は消えている）が、無関係な掃除の全体 prune で消えない
  const reachable = (repo, sha) => !repo.git(repo.main, 'fsck', '--unreachable', '--no-reflogs').includes(sha)
  const PRUNE_CASES = [
    ['remove superseded（消せる別の worktree）', (repo, o) => run(repo, ['remove', '--mode', 'superseded', '--path', o.path]), 'removed'],
    ['remove superseded（未登録のパス）', (repo) => run(repo, ['remove', '--mode', 'superseded', '--path', join(repo.root, 'wts', 'nope')]), 'not-registered'],
    ['remove discard（消せる別の worktree）', (repo, o) => run(repo, ['remove', '--mode', 'discard', '--path', o.path]), 'removed'],
    ['remove discard（未登録のパス）', (repo) => run(repo, ['remove', '--mode', 'discard', '--path', join(repo.root, 'wts', 'nope')]), 'not-registered'],
  ]
  for (const [name, exec, word] of PRUNE_CASES) {
    test(`${tag} prune スキップ: ${name} でも、prunable-detached の登録は残りコミットが到達可能`, () => {
      const repo = makeRepo()
      const d = KINDS['prunable-detached'].make(repo, 'keepme')
      const o = repo.addWorktree('other')
      assert.equal(reachable(repo, d.sha), true)
      const r = exec(repo, o)
      assert.equal(r.status, 0, r.stderr)
      assert.equal(r.result.worktree, word)
      assert.ok(repo.worktrees().includes(d.path), '登録が残る')
      assert.equal(ca(repo, d.path).result.worktree, 'prunable-detached')
      assert.equal(reachable(repo, d.sha), true, 'コミットが到達不能になっていない')
      if (word === 'removed') assert.ok(r.result.pruneSkipped >= 1, `スキップを結果に出す: ${JSON.stringify(r.result)}`)
    })
  }
  test(`${tag} prune スキップ: sweep でも prunable-detached と HEAD 0000… の登録は残る`, () => {
    const repo = makeRepo()
    const d = KINDS['prunable-detached'].make(repo, 'keepme')
    const z = repo.addWorktree('zero')
    repo.write(z.path, 'q.txt', 'q\n')
    repo.git(z.path, 'add', 'q.txt')
    repo.git(z.path, 'commit', '-q', '-m', 'zero')
    const zsha = repo.head(z.path)
    repo.git(repo.main, 'update-ref', '-d', `refs/heads/${z.branch}`)
    rmSync(z.path, { recursive: true })
    const o = repo.addWorktree('other')
    const s = sweep(repo, [o.path], {})
    assert.equal(s.status, 0, s.stderr)
    assert.deepEqual(s.result.removed, [o.path])
    assert.ok(s.result.pruneSkipped >= 2, JSON.stringify(s.result))
    assert.ok(repo.worktrees().includes(d.path) && repo.worktrees().includes(z.path))
    assert.equal(reachable(repo, d.sha), true)
    // HEAD 0000… の登録のコミットは reflog だけが参照を持つ（--no-reflogs の fsck では常に未到達）。登録の管理ディレクトリごと reflog が残る
    assert.ok(existsSync(join(repo.main, '.git', 'worktrees', 'zero', 'logs', 'HEAD')))
    assert.equal(repo.git(repo.main, 'cat-file', '-t', zsha), 'commit')
  })
  test(`${tag} prune スキップ: 危険な登録が無ければ従来どおり片づく（ブランチ上の実体なし登録は prune され、pruneSkipped を出さない）`, () => {
    const repo = makeRepo()
    const dead = repo.addWorktree('dead')
    rmSync(dead.path, { recursive: true })
    const o = repo.addWorktree('other')
    const r = run(repo, ['remove', '--mode', 'superseded', '--path', o.path])
    assert.equal(r.result.worktree, 'removed')
    assert.equal('pruneSkipped' in r.result, false)
    assert.ok(!repo.worktrees().includes(dead.path), '実体の無いブランチ上の登録は prune される')
    assert.ok(!repo.worktrees().includes(o.path))
    // 実体の無い登録そのものを superseded で指しても従来どおり登録が片づく
    const dead2 = repo.addWorktree('dead2')
    rmSync(dead2.path, { recursive: true })
    run(repo, ['remove', '--mode', 'superseded', '--path', dead2.path])
    assert.ok(!repo.worktrees().includes(dead2.path))
  })

  test(`${tag} prune スキップ: 何も消さなかった remove（未登録・メイン・保持）は全体の prune を呼ばない（実体の無いブランチ上の登録も触らない）`, () => {
    const repo = makeRepo()
    const dead = repo.addWorktree('dead')
    rmSync(dead.path, { recursive: true })
    const dirty = repo.addWorktree('dirty')
    repo.write(dirty.path, 'u.txt', 'u\n')
    for (const args of [
      ['remove', '--mode', 'superseded', '--path', join(repo.root, 'wts', 'nope')],
      ['remove', '--mode', 'discard', '--path', repo.main],
      ['remove', '--mode', 'discard', '--path', dirty.path],
    ]) {
      const r = run(repo, args)
      assert.ok(['not-registered', 'main', 'retained-dirty'].includes(r.result.worktree), JSON.stringify(r.result))
      assert.ok(repo.worktrees().includes(dead.path), `prune されない: ${args.join(' ')}`)
    }
  })


  // ---- 実体の無い登録の扱い（Issue #637 の再レビュー）: 登録 1 件ずつの照合と削除。全体の prune に頼らない ----
  const deadBranchHolder = (repo, name) => { const a = repo.addWorktree(name); rmSync(a.path, { recursive: true }); return a }
  const mkDetachedGone = (repo, name) => KINDS['prunable-detached'].make(repo, name)

  test(`${tag} 形 A: ブランチだけの discard。実体の無い登録がブランチを持ち、別に危険な（detached の）実体なし登録があっても、その登録だけを消してブランチを消す`, () => {
    const repo = makeRepo()
    const d = mkDetachedGone(repo, 'risk')
    const h = deadBranchHolder(repo, 'holder')
    const r = run(repo, ['remove', '--mode', 'discard', '--branch', h.branch, '--base', 'main'])
    assert.equal(r.status, 0, r.stderr)
    // --path が無いので worktree は skipped のまま。後始末の結果は holder に出る
    assert.deepEqual([r.result.ok, r.result.worktree, r.result.branch, r.result.holder], [true, 'skipped', 'deleted', 'removed'], JSON.stringify(r.result))
    assert.ok(!repo.branches().includes(h.branch))
    assert.ok(!repo.worktrees().includes(h.path), '対象に結び付いた登録は消える')
    assert.ok(repo.worktrees().includes(d.path), '無関係な危険な登録は残る')
    assert.equal(reachable(repo, d.sha), true)
  })
  test(`${tag} 形 A: 持ち主が lock・detached（HEAD 0000…）のときは登録を消さず、ブランチも消さない（keep 系・保持の語）`, () => {
    const repo = makeRepo()
    const l = deadBranchHolder(repo, 'lk')
    repo.git(repo.main, 'worktree', 'lock', '--reason', 'portable', l.path)
    const r = run(repo, ['remove', '--mode', 'discard', '--branch', l.branch, '--base', 'main'])
    // --path が無いので worktree は skipped のまま（後始末の保持は holder に出る）
    assert.deepEqual([r.result.ok, r.result.worktree, r.result.branch, r.result.holder], [false, 'skipped', 'keep', 'retained-locked'], JSON.stringify(r.result))
    assert.ok(repo.worktrees().includes(l.path) && repo.branches().includes(l.branch))
    const z = repo.addWorktree('zz')
    repo.write(z.path, 'q.txt', 'q\n')
    repo.git(z.path, 'add', 'q.txt')
    repo.git(z.path, 'commit', '-q', '-m', 'only-on-branch')
    repo.git(repo.main, 'update-ref', '-d', `refs/heads/${z.branch}`)
    rmSync(z.path, { recursive: true })
    // HEAD 0000… の登録はブランチ ref が無いのでブランチの削除対象にもならないが、登録は消さない
    const r2 = run(repo, ['remove', '--mode', 'discard', '--branch', z.branch, '--base', 'main'])
    assert.ok(repo.worktrees().includes(z.path), JSON.stringify(r2.result))
  })
  // ---- 同期 PR の Bugbot 指摘 AL: ブランチを掴む実体の無い登録の後始末が、並行して登録が消えた（not-registered）ときの扱い ----
  // 呼び出しの順は、1: 一覧（ブランチを持つ登録を探す）→ 2: remove_one の中の一覧 → 3: （not-registered のときだけ）読み直し。
  // 2 回目の直前に実際に登録を prune して『後始末の時点で登録が既に無い』を作り、3 回目の一覧を差し替えて読み直しの分岐を検査する
  const raceGit = (repo, name, third, afterPrune = '') => {
    const shim = join(repo.root, name)
    mkdirSync(shim)
    const real = spawnSync('sh', ['-c', 'command -v git'], { encoding: 'utf8' }).stdout.trim()
    const counter = join(repo.root, `${name}.count`)
    const body = [
      '#!/bin/sh',
      'if [ "$1" = worktree ] && [ "$2" = list ]; then',
      `  n=$(cat '${counter}' 2>/dev/null || echo 0); n=$((n + 1)); echo "$n" > '${counter}'`,
      `  if [ "$n" = 2 ]; then ${real} worktree prune; ${afterPrune} fi`,
      `  if [ "$n" = 3 ]; then ${third}`,
      '  fi',
      'fi',
      `exec ${real} "$@"`,
    ].join('\n')
    writeFileSync(join(shim, 'git'), `${body}\n`, { mode: 0o755 })
    return { PATH: `${shim}:${process.env.PATH}` }
  }
  test(`${tag} AL: 後始末の時点で登録が既に消えていた（not-registered）。読み直してブランチを掴む登録が無ければ、ブランチを消して ok`, () => {
    const repo = makeRepo()
    const h = deadBranchHolder(repo, 'racegone')
    const env = raceGit(repo, 'shim-race-gone', ':')
    const r = run(repo, ['remove', '--mode', 'discard', '--branch', h.branch, '--base', 'main'], { env })
    assert.equal(r.status, 0, r.stderr)
    assert.deepEqual([r.result.ok, r.result.branch, r.result.holder, r.result.retained], [true, 'deleted', 'not-registered', false], JSON.stringify(r.result))
    assert.ok(!repo.branches().includes(h.branch))
    assert.ok(!repo.worktrees().includes(h.path))
  })
  test(`${tag} AL: not-registered でも、読み直した一覧にまだブランチを掴む登録があれば消さない（keep）。一覧を読み直せないときも消さない`, () => {
    const repo = makeRepo()
    const h = deadBranchHolder(repo, 'raceheld')
    // 3 回目の一覧に、そのブランチを持つ（メイン以外の）登録を足す
    const still = `${join(repo.root, 'ghost-wt')}`
    const env = raceGit(repo, 'shim-race-held', `${spawnSync('sh', ['-c', 'command -v git'], { encoding: 'utf8' }).stdout.trim()} worktree list --porcelain; printf '\\nworktree ${still}\\nHEAD ${'0'.repeat(40)}\\nbranch refs/heads/${h.branch}\\n'; exit 0;`)
    const r = run(repo, ['remove', '--mode', 'discard', '--branch', h.branch, '--base', 'main'], { env })
    assert.deepEqual([r.result.ok, r.result.branch, r.result.holder], [false, 'keep', 'not-registered'], JSON.stringify(r.result))
    assert.ok(repo.branches().includes(h.branch), 'ブランチは消えない')
    const repo2 = makeRepo()
    const h2 = deadBranchHolder(repo2, 'raceunread')
    const env2 = raceGit(repo2, 'shim-race-unread', 'echo boom >&2; exit 1;')
    const r2 = run(repo2, ['remove', '--mode', 'discard', '--branch', h2.branch, '--base', 'main'], { env: env2 })
    assert.deepEqual([r2.result.ok, r2.result.branch, r2.result.holder], [false, 'keep', 'not-registered'], JSON.stringify(r2.result))
    assert.ok(repo2.branches().includes(h2.branch), '読み直せないときもブランチは消えない')
  })
  test(`${tag} AL: 保持の語（lock 中の持ち主）は従来どおりブランチを消さない。読み直しに頼らない`, () => {
    const repo = makeRepo()
    const l = deadBranchHolder(repo, 'raceheldlock')
    repo.git(repo.main, 'worktree', 'lock', '--reason', 'portable', l.path)
    const r = run(repo, ['remove', '--mode', 'discard', '--branch', l.branch, '--base', 'main'])
    assert.deepEqual([r.result.ok, r.result.branch, r.result.holder], [false, 'keep', 'retained-locked'], JSON.stringify(r.result))
    assert.ok(repo.branches().includes(l.branch))
  })
  // ---- 同期 PR の Bugbot 指摘 AO: 後始末で、確認と削除の間に holder のパスへ登録の無い実体が現れた（TOCTOU）ときはブランチを残す ----
  test(`${tag} AO: 後始末の remove_one の時点で holder のパスに登録の無い実体が現れていたら、holder は retained-unregistered・ブランチは keep・実体は残る`, () => {
    const repo = makeRepo()
    const h = deadBranchHolder(repo, 'aoreal')
    const env = raceGit(repo, 'shim-ao-real', ':', `mkdir '${h.path}'; echo keepme > '${h.path}/work.txt';`)
    const r = run(repo, ['remove', '--mode', 'discard', '--branch', h.branch, '--base', 'main'], { env })
    assert.deepEqual([r.result.ok, r.result.branch, r.result.holder], [false, 'keep', 'retained-unregistered'], JSON.stringify(r.result))
    assert.ok(repo.branches().includes(h.branch), 'ブランチは消えない')
    assert.ok(existsSync(join(h.path, 'work.txt')), '実体は消えない')
  })
  test(`${tag} AO: 登録の読み直しのあとに holder のパスへ実体が現れていたら（not-registered）、登録が無くてもブランチを消さない`, () => {
    const repo = makeRepo()
    const h = deadBranchHolder(repo, 'aolate')
    const env = raceGit(repo, 'shim-ao-late', `mkdir '${h.path}'; echo keepme > '${h.path}/work.txt'; `)
    const r = run(repo, ['remove', '--mode', 'discard', '--branch', h.branch, '--base', 'main'], { env })
    assert.deepEqual([r.result.ok, r.result.branch, r.result.holder], [false, 'keep', 'not-registered'], JSON.stringify(r.result))
    assert.ok(repo.branches().includes(h.branch), 'ブランチは消えない')
    assert.ok(existsSync(join(h.path, 'work.txt')), '実体は消えない')
  })
  // ---- 同期 PR の Bugbot 指摘 J〜M・P ----
  // ---- 同期 PR の Bugbot 指摘 AP: 後始末の remove_one を実体の有無に結びつける（確認と削除の間に登録済みの worktree が作り直された TOCTOU）----
  test(`${tag} AP: 後始末の remove_one の時点で holder のパスに登録済みの（clean な）worktree が作り直されていたら、holder は retained-present・ブランチは keep・実体は消えない`, () => {
    const repo = makeRepo()
    const h = deadBranchHolder(repo, 'apreal')
    // 2 回目の一覧（remove_one の中）の直前に prune し、同じパス・同じブランチで worktree を作り直す
    const env = raceGit(repo, 'shim-ap-real', ':', `git worktree add '${h.path}' '${h.branch}' >/dev/null 2>&1;`)
    const r = run(repo, ['remove', '--mode', 'discard', '--branch', h.branch, '--base', 'main'], { env })
    assert.deepEqual([r.result.ok, r.result.branch, r.result.holder], [false, 'keep', 'retained-present'], JSON.stringify(r.result))
    assert.ok(repo.branches().includes(h.branch), 'ブランチは消えない')
    assert.ok(existsSync(join(h.path, '.git')), '作り直された worktree は消えない')
    assert.ok(repo.worktrees().includes(h.path), '登録も残る')
  })
  test(`${tag} AW: holder の lock は pid が死んだ agent の形でも外さない（retained-locked を holder に出し、ブランチは keep・lock は残る）`, () => {
    const repo = makeRepo()
    const h = deadBranchHolder(repo, 'apdeadlock')
    repo.git(repo.main, 'worktree', 'lock', '--reason', lockReason(deadPid()), h.path)
    const r = run(repo, ['remove', '--mode', 'discard', '--branch', h.branch, '--base', 'main'])
    assert.deepEqual([r.result.ok, r.result.branch, r.result.holder, r.result.unlocked], [false, 'keep', 'retained-locked', false], JSON.stringify(r.result))
    assert.ok(repo.branches().includes(h.branch), 'ブランチは消えない')
    assert.ok(repo.worktrees().includes(h.path), '登録は残る')
    assert.ok(repo.git(repo.main, 'worktree', 'list', '--porcelain').includes('locked'), 'lock は残る')
  })
  // ---- 同期 PR の Bugbot 指摘 AR→AW: 結びつけ（--require-missing・--branch の後始末）の経路では unlock を一切しない（順序の入れ替えではなく構造で窓を閉じる）----
  test(`${tag} AW: 後始末の経路で git worktree unlock は一度も呼ばれない（呼び出しの前半で読んだ lock に基づく unlock が、作り直された worktree の lock を外す窓が無い）`, () => {
    const repo = makeRepo()
    const h = deadBranchHolder(repo, 'arrace')
    repo.git(repo.main, 'worktree', 'lock', '--reason', lockReason(deadPid()), h.path)
    const shim = join(repo.root, 'shim-aw')
    const log = join(repo.root, 'unlock.log')
    mkdirSync(shim)
    const real = spawnSync('sh', ['-c', 'command -v git'], { encoding: 'utf8' }).stdout.trim()
    const body = [
      '#!/bin/sh',
      'if [ "$1" = worktree ] && [ "$2" = unlock ]; then',
      `  echo unlock >> '${log}'`,
      'fi',
      `exec ${real} "$@"`,
    ].join('\n')
    writeFileSync(join(shim, 'git'), `${body}\n`, { mode: 0o755 })
    const r = run(repo, ['remove', '--mode', 'discard', '--branch', h.branch, '--base', 'main'], { env: { PATH: `${shim}:${process.env.PATH}` } })
    assert.deepEqual([r.result.holder, r.result.unlocked], ['retained-locked', false], JSON.stringify(r.result))
    assert.ok(!existsSync(log), 'unlock は呼ばれない')
    assert.ok(repo.branches().includes(h.branch))
  })
  // 対照: 結びつけの無い呼び出し（superseded・結びつけ無しの discard）は従来どおり、pid が死んだ agent の lock を外して消す
  test(`${tag} AW: 結びつけの無い discard --path は、pid が死んだ agent の lock を従来どおり外して消す`, () => {
    const repo = makeRepo()
    const w = repo.addWorktree('awctl')
    repo.git(repo.main, 'worktree', 'lock', '--reason', lockReason(deadPid()), w.path)
    const r = run(repo, ['remove', '--mode', 'discard', '--path', w.path])
    assert.deepEqual([r.result.worktree, r.result.unlocked], ['removed', true], JSON.stringify(r.result))
  })

  // ---- 同期 PR の Bugbot 指摘 AS: 有無を観測できない登録（親を検索できない）があるとき、全体の prune は登録を落とすのでスキップする ----
  test(`${tag} AS: 親を検索できず有無を観測できない登録があるとき、remove --path の prune はスキップ（pruneSkipped）。権限を戻せば登録が残っている`, { skip: typeof process.getuid === 'function' && process.getuid() === 0 }, () => {
    const repo = makeRepo()
    const holder = join(repo.root, 'holder-as')
    mkdirSync(holder)
    const wt = join(holder, 'wt')
    repo.git(repo.main, 'worktree', 'add', '-q', '-b', 'b-as', wt)
    const a = repo.addWorktree('as-a')
    chmodSync(holder, 0o000)
    let r
    try {
      r = sup(repo, a.path)
    } finally {
      chmodSync(holder, 0o700)
    }
    assert.deepEqual([r.result.worktree, r.result.pruneSkipped], ['removed', 1], JSON.stringify(r.result))
    assert.ok(repo.worktrees().includes(wt), '観測できない登録は prune で落とさない')
    assert.ok(existsSync(join(wt, '.git')) && repo.branches().includes('b-as'))
    // 対照: 権限を戻せば観測できる（実体あり）ので prune はスキップされない
    const b = repo.addWorktree('as-b')
    assert.ok(!('pruneSkipped' in sup(repo, b.path).result))
  })
  test(`${tag} AS: sweep も、有無を観測できない登録があれば prune をスキップする（候補は消え、登録は残る）`, { skip: typeof process.getuid === 'function' && process.getuid() === 0 }, () => {
    const repo = makeRepo()
    const holder = join(repo.root, 'holder-as2')
    mkdirSync(holder)
    const wt = join(holder, 'wt')
    repo.git(repo.main, 'worktree', 'add', '-q', '-b', 'b-as2', wt)
    const a = repo.addWorktree('as2-a')
    chmodSync(holder, 0o000)
    let s
    try {
      s = sweep(repo, [a.path], {})
    } finally {
      chmodSync(holder, 0o700)
    }
    assert.deepEqual([s.result.removed, s.result.pruneSkipped], [[a.path], 1], JSON.stringify(s.result))
    assert.ok(repo.worktrees().includes(wt), '観測できない登録は prune で落とさない')
  })

  // ---- 同期 PR の Bugbot 指摘 AT: detached かつ有無を観測できない登録は、risk と unobservable の両方に当たっても 1 件と数える ----
  test(`${tag} AT: detached で有無を観測できない登録 1 件のとき pruneSkipped は 1（remove・sweep とも。二重に数えない）`, { skip: typeof process.getuid === 'function' && process.getuid() === 0 }, () => {
    const repo = makeRepo()
    const holder = join(repo.root, 'holder-at')
    mkdirSync(holder)
    const wt = join(holder, 'wt')
    repo.git(repo.main, 'worktree', 'add', '-q', '--detach', wt)
    const a = repo.addWorktree('at-a')
    const c = repo.addWorktree('at-c')
    chmodSync(holder, 0o000)
    let r, s
    try {
      r = sup(repo, a.path)
      s = sweep(repo, [c.path], {})
    } finally {
      chmodSync(holder, 0o700)
    }
    assert.deepEqual([r.result.worktree, r.result.pruneSkipped], ['removed', 1], JSON.stringify(r.result))
    assert.deepEqual([s.result.removed, s.result.pruneSkipped], [[c.path], 1], JSON.stringify(s.result))
    assert.ok(repo.worktrees().includes(wt), '登録は prune で落とさない')
  })

  // J: --path の結果は、ブランチを持つ登録の後始末で上書きしない（後始末の結果は holder とブランチの判断にだけ使う）
  test(`${tag} J: --path で消し終えたあと、ブランチを持つ別の登録が lock で保持されても、worktree は removed のまま。holder に保持の語・ブランチは keep・ok は false`, () => {
    const repo = makeRepo()
    const l = deadBranchHolder(repo, 'jlk')
    repo.git(repo.main, 'worktree', 'lock', '--reason', 'portable', l.path)
    // 同じブランチを実体のある別の worktree にも持たせる（-f）
    const live = join(repo.root, 'wts', 'jlive')
    repo.git(repo.main, 'worktree', 'add', '-q', '-f', live, l.branch)
    const r = run(repo, ['remove', '--mode', 'discard', '--path', live, '--branch', l.branch, '--base', 'main'])
    assert.equal(r.status, 0, r.stderr)
    assert.deepEqual(
      [r.result.worktree, r.result.holder, r.result.branch, r.result.ok, r.result.retained],
      ['removed', 'retained-locked', 'keep', false, false],
      JSON.stringify(r.result),
    )
    assert.ok(!existsSync(live))
    assert.ok(repo.worktrees().includes(l.path) && repo.branches().includes(l.branch), '保持した登録とブランチは残る')
  })
  test(`${tag} J: --path で消し終え、ブランチを持つ別の登録も消せたら ok・holder removed・ブランチ deleted。後始末の汚れ・unlock が --path の結果を上書きしない`, () => {
    const repo = makeRepo()
    const h = deadBranchHolder(repo, 'jh')
    const live = join(repo.root, 'wts', 'jlive2')
    repo.git(repo.main, 'worktree', 'add', '-q', '-f', live, h.branch)
    const r = run(repo, ['remove', '--mode', 'discard', '--path', live, '--branch', h.branch, '--base', 'main'])
    assert.deepEqual(
      [r.result.worktree, r.result.holder, r.result.branch, r.result.ok, r.result.retained, r.result.dirty],
      ['removed', 'removed', 'deleted', true, false, 0],
      JSON.stringify(r.result),
    )
    assert.ok(!repo.branches().includes(h.branch))
  })
  test(`${tag} J: 後始末をしなかったときは holder を出さない（従来の形のまま）`, () => {
    const repo = makeRepo()
    const a = repo.addWorktree('jn')
    const r = dis(repo, a.path, ['--branch', a.branch, '--base', 'main'])
    assert.ok(!('holder' in r.result), JSON.stringify(r.result))
  })

  // K: prune するのは実際に何かを消したときだけ（ブランチだけの discard で、無関係な実体の無い登録を prune しない）
  test(`${tag} K: ブランチだけの discard（登録の後始末も無い）は全体の prune を呼ばない。無関係な実体の無い登録が残る`, () => {
    const repo = makeRepo()
    const bystander = deadBranchHolder(repo, 'kby')
    repo.git(repo.main, 'branch', 'plain-branch')
    const r = run(repo, ['remove', '--mode', 'discard', '--branch', 'plain-branch', '--base', 'main'])
    assert.deepEqual([r.result.worktree, r.result.branch, r.result.ok], ['skipped', 'deleted', true], JSON.stringify(r.result))
    assert.ok(repo.worktrees().includes(bystander.path), '何も消していないので prune されない')
  })

  // L: sweep の保持照合は、remove_one の登録との照合（wr_loose_real）と同じ正規化で行う
  test(`${tag} L: sweep は、シンボリックリンク経由の綴りで記録された実体の無い worktree を、実体のパスの候補として消さない（逆向き・大小違いも保持）`, () => {
    const repo = makeRepo()
    const link = linkRoot(repo)
    const a = deadBranchHolder(repo, 'la')
    const via = join(link, 'la')
    const r1 = sweep(repo, [a.path], { 1: { status: 'failed', worktree: via } })
    assert.deepEqual([r1.result.removed, r1.result.retained], [[], 1], JSON.stringify(r1.result))
    assert.ok(repo.worktrees().includes(a.path), '登録は消えない')
    const r2 = sweep(repo, [via], { 1: { status: 'blocked', worktree: a.path } })
    assert.deepEqual([r2.result.removed, r2.result.retained], [[], 1], JSON.stringify(r2.result))
    assert.ok(repo.worktrees().includes(a.path))
    const r3 = sweep(repo, [a.path], { 1: { status: 'monitoring', worktree: join(repo.root, 'WTS', 'LA') } })
    assert.deepEqual([r3.result.removed, r3.result.retained], [[], 1], JSON.stringify(r3.result))
    assert.ok(repo.worktrees().includes(a.path))
    // 保持対象でなければ従来どおり消える
    const r4 = sweep(repo, [via], { 1: { status: 'merged', worktree: via } })
    assert.deepEqual(r4.result.removed, [via], JSON.stringify(r4.result))
  })

  // M: ref を読めなかった理由の見分けは、git が『ref が無い』（終了コード 1）と言ったときだけ unborn
  test(`${tag} M: show-ref が一過性に失敗（終了コード 1 以外）したときは unborn にせず retained-unobservable。本物の unborn は retained-head-mismatch のまま`, () => {
    const repo = makeRepo()
    const dir = join(repo.root, 'wts', 'morph')
    mkdirSync(join(dir, '..'), { recursive: true })
    repo.git(repo.main, 'worktree', 'add', '-q', '--orphan', '-b', 'morph-b', dir)
    const head = repo.git(repo.main, 'rev-parse', 'HEAD')
    const env = failingGit(repo, 'shim-showref', 'case "$*" in *show-ref*) echo boom >&2; exit 128 ;; esac')
    const r = run(repo, ['remove', '--mode', 'discard', '--path', dir, '--head', head], { env })
    assert.deepEqual([r.result.worktree, r.result.retained], ['retained-unobservable', true], JSON.stringify(r.result))
    assert.ok(existsSync(dir))
    assert.equal(dis(repo, dir, ['--head', head]).result.worktree, 'retained-head-mismatch')
  })
  test(`${tag} M: HEAD が refs/heads の外を指す unborn も、フル名で照合して retained-head-mismatch（短縮名の取り違えで ref を見誤らない）`, () => {
    const repo = makeRepo()
    const dir = join(repo.root, 'wts', 'mout')
    mkdirSync(join(dir, '..'), { recursive: true })
    repo.git(repo.main, 'worktree', 'add', '-q', '--orphan', '-b', 'mout-b', dir)
    repo.git(dir, 'symbolic-ref', 'HEAD', 'refs/remotes/origin/zzz')
    const head = repo.git(repo.main, 'rev-parse', 'HEAD')
    const r = dis(repo, dir, ['--head', head])
    assert.deepEqual([r.result.worktree, r.result.retained], ['retained-head-mismatch', true], JSON.stringify(r.result))
  })

  // P: 登録は無いが実体のパスがある。--head / --expect-branch を結びつけた discard は『もう無い』と言わず保持する
  test(`${tag} P: 登録されていないが実体のあるパスは、discard の --head / --expect-branch つきでは retained-unregistered（ok false・retained true）。実体は残る`, () => {
    const repo = makeRepo()
    const stray = join(repo.root, 'stray-p')
    mkdirSync(stray)
    writeFileSync(join(stray, 'x'), 'x\n')
    const head = repo.git(repo.main, 'rev-parse', 'HEAD')
    for (const extra of [['--head', head], ['--expect-branch', 'feat/1-x'], ['--head', head, '--expect-branch', 'feat/1-x']]) {
      const r = dis(repo, stray, extra)
      assert.deepEqual([r.result.worktree, r.result.ok, r.result.retained], ['retained-unregistered', false, true], `${extra.join(' ')}: ${JSON.stringify(r.result)}`)
    }
    assert.ok(existsSync(join(stray, 'x')))
    // 実体も無ければ従来どおり not-registered（ok）。結びつけの無い呼び出し・superseded も従来どおり
    const gone = dis(repo, join(repo.root, 'nope-p'), ['--head', head])
    assert.deepEqual([gone.result.worktree, gone.result.ok], ['not-registered', true])
    assert.equal(dis(repo, stray).result.worktree, 'not-registered')
    assert.equal(sup(repo, stray).result.worktree, 'not-registered')
  })

  // #649（Bugbot 指摘 AQ）: --path と --branch を与えた discard でも、登録の無い実体のパスはブランチを消さない根拠にする。
  // 登録だけが失われた実体（.git ファイルは残り管理ディレクトリが無い）を作る: 退避 → prune → 戻す
  const orphanDir = (repo, name) => {
    const a = repo.addWorktree(name)
    const aside = `${a.path}.aside`
    renameSync(a.path, aside)
    repo.git(repo.main, 'worktree', 'prune')
    renameSync(aside, a.path)
    return a
  }
  test(`${tag} #649: --path P --branch X で P が登録の無い実体なら retained-unregistered・ブランチは keep・ok は false。実体は残る`, () => {
    const repo = makeRepo()
    const a = orphanDir(repo, 'unr649')
    assert.ok(!repo.worktrees().includes(a.path), '登録は無い')
    const r = dis(repo, a.path, ['--branch', a.branch, '--base', 'main'])
    assert.deepEqual([r.result.ok, r.result.worktree, r.result.branch, r.result.retained], [false, 'retained-unregistered', 'keep', true], JSON.stringify(r.result))
    assert.ok(repo.branches().includes(a.branch), 'ブランチは消えない')
    assert.ok(existsSync(a.path), '実体は消えない')
  })
  test(`${tag} #649: 1 回目で保持したあとの 2 回目の --path P --branch X でも、実体がある限りブランチを消さない。実体が無くなれば消す`, () => {
    const repo = makeRepo()
    const a = orphanDir(repo, 'unr649b')
    for (let n = 1; n <= 2; n++) {
      const r = dis(repo, a.path, ['--branch', a.branch, '--base', 'main'])
      assert.deepEqual([r.result.ok, r.result.worktree, r.result.branch], [false, 'retained-unregistered', 'keep'], `${n} 回目: ${JSON.stringify(r.result)}`)
      assert.ok(repo.branches().includes(a.branch), `${n} 回目: ブランチは消えない`)
    }
    rmSync(a.path, { recursive: true })
    const last = dis(repo, a.path, ['--branch', a.branch, '--base', 'main'])
    assert.deepEqual([last.result.ok, last.result.worktree, last.result.branch], [true, 'not-registered', 'deleted'], JSON.stringify(last.result))
  })

  test(`${tag} 形 A: 実体のある別の worktree がブランチを持つなら消さない（登録を勝手に消さず、従来どおり branch failed）`, () => {
    const repo = makeRepo()
    const live = repo.addWorktree('live')
    const r = run(repo, ['remove', '--mode', 'discard', '--branch', live.branch, '--base', 'main'])
    assert.equal(r.result.ok, false)
    assert.ok(existsSync(live.path) && repo.worktrees().includes(live.path) && repo.branches().includes(live.branch))
  })

  const linkRoot = (repo) => {
    mkdirSync(join(repo.root, 'wts'), { recursive: true })
    const link = join(repo.root, 'link')
    symlinkSync(join(repo.root, 'wts'), link)
    return link
  }
  test(`${tag} 形 B: シンボリックリンク経由の綴りで指した実体の無い登録も、実体のパスで照合して消す（not-registered にしない）。ブランチも消える`, () => {
    const repo = makeRepo()
    const link = linkRoot(repo)
    for (const mode of ['superseded', 'discard']) {
      const a = repo.addWorktree(`s-${mode}`)
      rmSync(a.path, { recursive: true })
      const via = join(link, `s-${mode}`)
      const r = mode === 'superseded' ? sup(repo, via) : dis(repo, via, ['--branch', a.branch, '--base', 'main'])
      assert.equal(r.status, 0, r.stderr)
      assert.equal(r.result.worktree, 'removed', `${mode}: ${JSON.stringify(r.result)}`)
      assert.ok(!repo.worktrees().includes(a.path), mode)
      if (mode === 'discard') assert.deepEqual([r.result.ok, r.result.branch], [true, 'deleted'])
    }
  })
  test(`${tag} 形 B: 大小だけ違う綴りは remove では一致させない（not-registered・何も消さない）`, () => {
    const repo = makeRepo()
    const a = deadBranchHolder(repo, 'cs')
    const r = sup(repo, join(repo.root, 'WTS', 'cs'))
    assert.equal(r.result.worktree, 'not-registered')
    assert.ok(repo.worktrees().includes(a.path))
  })
  test(`${tag} 末尾 / ・/. 付きの不在パス: remove でも sweep でも登録と照合できる（正規化を外すと not-registered になる）`, () => {
    const repo = makeRepo()
    const a = deadBranchHolder(repo, 'tr')
    const r = sup(repo, `${a.path}/`)
    assert.equal(r.result.worktree, 'removed', JSON.stringify(r.result))
    assert.ok(!repo.worktrees().includes(a.path))
    const b = deadBranchHolder(repo, 'tr2')
    const s = sweep(repo, [`${b.path}/.`], {})
    assert.deepEqual(s.result.removed, [`${b.path}/.`], JSON.stringify(s.result))
    assert.ok(!repo.worktrees().includes(b.path))
    // 状態が保持を求める実体の無い worktree は、末尾 / 付きの綴りの候補でも保持と照合される（消さない）
    const c = deadBranchHolder(repo, 'tr3')
    const held = sweep(repo, [`${c.path}/`], { 1: { status: 'failed', worktree: c.path } })
    assert.deepEqual([held.result.removed, held.result.retained], [[], 1], JSON.stringify(held.result))
    assert.ok(repo.worktrees().includes(c.path))
  })

  // 実体の無い detached・HEAD 0000… の登録は、登録がコミットの唯一の参照かもしれないので remove も消さない（retained-detached）
  test(`${tag} 実体の無い detached・HEAD 0000… の登録を superseded / discard / sweep が指しても消さない（retained-detached・コミットは到達可能のまま）`, () => {
    const repo = makeRepo()
    const d = mkDetachedGone(repo, 'dd')
    for (const r of [sup(repo, d.path), dis(repo, d.path), dis(repo, d.path, ['--head', d.sha])]) {
      assert.deepEqual([r.result.ok === true && r.result.mode === 'superseded', r.result.worktree, r.result.retained], [r.result.mode === 'superseded', 'retained-detached', true], JSON.stringify(r.result))
    }
    const s = sweep(repo, [d.path], {})
    assert.deepEqual([s.result.removed, s.result.retained], [[], 1], JSON.stringify(s.result))
    assert.ok(repo.worktrees().includes(d.path))
    assert.equal(reachable(repo, d.sha), true)
    const z = repo.addWorktree('zr')
    repo.write(z.path, 'q.txt', 'q\n')
    repo.git(z.path, 'add', 'q.txt')
    repo.git(z.path, 'commit', '-q', '-m', 'zero')
    repo.git(repo.main, 'update-ref', '-d', `refs/heads/${z.branch}`)
    rmSync(z.path, { recursive: true })
    assert.equal(sup(repo, z.path).result.worktree, 'retained-detached')
    assert.ok(repo.worktrees().includes(z.path))
    // ブランチ上の実体なし登録は従来どおり消える
    const b = deadBranchHolder(repo, 'onbr')
    assert.equal(sup(repo, b.path).result.worktree, 'removed')
  })

  // sweep の prune: 何も消さず・失敗もしなかったとき（候補が未登録・保持）は全体の prune を呼ばない
  test(`${tag} sweep: 実体の無い候補が消えたときだけ prune する。未登録の候補だけなら、実体の無い別の登録に触れない`, () => {
    const repo = makeRepo()
    const bystander = deadBranchHolder(repo, 'bystander')
    const s = sweep(repo, [join(repo.root, 'wts', 'nope')], {})
    assert.deepEqual([s.result.removed, s.result.skipped], [[], 1], JSON.stringify(s.result))
    assert.ok(repo.worktrees().includes(bystander.path), '何も消していないので prune しない')
    const dead = deadBranchHolder(repo, 'candidate')
    const s2 = sweep(repo, [dead.path], {})
    assert.deepEqual(s2.result.removed, [dead.path], JSON.stringify(s2.result))
    assert.ok(!repo.worktrees().includes(dead.path))
    assert.ok(!repo.worktrees().includes(bystander.path), '消えたときは全体の prune が走り、実体の無いブランチ上の登録も片づく')
  })

  // U（Bugbot 指摘）: Recover の prunable（登録だけ残る旧パス）の片づけは、--branch なしの discard の 1 回。ブランチ ref は残し、
  // 実体の無いブランチ上の登録だけを消す。detached・HEAD 0000…・lock ありの登録は保持する（ホストはどの結果でも planning へ進める）
  test(`${tag} U: --branch なしの discard で、実体の無いブランチ上の登録だけが消え、ブランチ ref は残る。detached・lock ありの登録は保持される`, () => {
    const repo = makeRepo()
    const dead = deadBranchHolder(repo, 'u-dead')
    const r = dis(repo, dead.path)
    assert.deepEqual([r.result.ok, r.result.worktree, r.result.branch, r.result.retained], [true, 'removed', 'none', false], JSON.stringify(r.result))
    assert.ok(!repo.worktrees().includes(dead.path), '登録は消える')
    assert.ok(repo.branches().includes(dead.branch), 'ブランチ ref は残す')

    const det = mkDetachedGone(repo, 'u-det')
    assert.equal(dis(repo, det.path).result.worktree, 'retained-detached')
    assert.ok(repo.worktrees().includes(det.path))

    const locked = KINDS['prunable-locked'].make(repo, 'u-lock')
    assert.equal(dis(repo, locked.path).result.worktree, 'retained-locked')
    assert.ok(repo.worktrees().includes(locked.path))
  })

  // T（Bugbot 指摘）: sweep は何も消せなかった（候補の削除が失敗）ときも全体の prune を呼ばない。remove 側（K）と揃える。
  // 失敗した git worktree remove は prune で片づく半端な登録を残さない（実測: 削除に失敗しても登録は git 自身が先に消すか、残っても gitdir が実在するので prune の対象外）ため、
  // 失敗を理由に prune すると、候補と無関係な実体の無い登録だけが巻き添えで消える
  test(`${tag} sweep: 候補の削除が失敗しただけ（removed が空）なら全体の prune を呼ばない。実体の無い別の登録に触れない`, () => {
    const repo = makeRepo()
    const bystander = deadBranchHolder(repo, 'bystander-failed')
    const cand = repo.addWorktree('cand-failed')
    const env = failingGit(repo, 'shim-remove', 'for a in "$@"; do\n  if [ "$a" = remove ]; then echo boom >&2; exit 1; fi\ndone')
    const s = sweep(repo, [cand.path], {}, { env })
    assert.deepEqual([s.result.removed, s.result.failed], [[], 1], JSON.stringify(s.result))
    assert.ok(existsSync(cand.path), '失敗したので候補は残る')
    assert.ok(repo.worktrees().includes(bystander.path), '何も消していないので prune しない')
  })

  // ---- 観測の失敗は保持の語 retained-unobservable（retained-dirty / retained-head-mismatch と区別する） ----
  const failingGit = (repo, name, cond) => {
    const shim = join(repo.root, name)
    mkdirSync(shim)
    const real = spawnSync('sh', ['-c', 'command -v git'], { encoding: 'utf8' }).stdout.trim()
    writeFileSync(join(shim, 'git'), `#!/bin/sh\n${cond}\nexec ${real} "$@"\n`, { mode: 0o755 })
    return { PATH: `${shim}:${process.env.PATH}` }
  }
  test(`${tag} git status が失敗: superseded も discard も retained-unobservable で何も消さない（retained-dirty にしない）`, () => {
    const repo = makeRepo()
    const env = failingGit(repo, 'shim-status', 'for a in "$@"; do\n  if [ "$a" = status ]; then echo boom >&2; exit 1; fi\ndone')
    const a = repo.addWorktree('a')
    for (const mode of ['superseded', 'discard']) {
      const r = run(repo, ['remove', '--mode', mode, '--path', a.path, ...(mode === 'discard' ? ['--branch', a.branch, '--base', 'main'] : [])], { env })
      assert.deepEqual([r.result.worktree, r.result.retained, r.result.dirty], ['retained-unobservable', true, -1], mode)
      assert.ok(existsSync(a.path))
      assert.ok(repo.branches().includes(a.branch))
    }
    const s = sweep(repo, [a.path], {}, { env })
    assert.deepEqual([s.result.removed, s.result.retained], [[], 1])
    assert.ok(existsSync(a.path))
  })
  test(`${tag} HEAD を読めない（--head 指定時の rev-parse が失敗）: retained-unobservable で何も消さない。sha が違うときは従来どおり retained-head-mismatch`, () => {
    const repo = makeRepo()
    const env = failingGit(repo, 'shim-head', 'case "$*" in *"verify"*"HEAD^{commit}"*) exit 1 ;; esac')
    const a = repo.addWorktree('a')
    const sha = repo.head(a.path)
    const r = run(repo, ['remove', '--mode', 'discard', '--path', a.path, '--branch', a.branch, '--base', 'main', '--head', sha], { env })
    assert.deepEqual([r.result.ok, r.result.worktree, r.result.retained, r.result.branch], [false, 'retained-unobservable', true, 'keep'])
    assert.ok(existsSync(a.path) && repo.branches().includes(a.branch))
    assert.equal(dis(repo, a.path, ['--head', 'f'.repeat(40)]).result.worktree, 'retained-head-mismatch')
    assert.equal(dis(repo, a.path, ['--head', sha]).result.worktree, 'removed')
  })

  // ---- sweep ----
  const stateJson = (items) => JSON.stringify({ items })
  const sweep = (repo, candidates, items, { raw, env } = {}) => {
    const file = '_/issue-trees/1.json'
    mkdirSync(join(repo.main, '_', 'issue-trees'), { recursive: true })
    if (items !== null) writeFileSync(join(repo.main, file), raw ?? stateJson(items))
    return run(repo, ['sweep', '--file', file], { input: typeof candidates === 'string' ? candidates : JSON.stringify(candidates), env })
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

  // ---- --require-missing（Bugbot 指摘 X）: check-absent が prunable と言ったあとにパスへ worktree が作り直されても消さない ----
  const req = (repo, path) => run(repo, ['remove', '--mode', 'discard', '--path', path, '--require-missing'])
  test(`${tag} X: --require-missing は実体の無い登録（lock なし・ブランチ上）だけを消す。ブランチの ref は残る`, () => {
    const repo = makeRepo()
    const a = repo.addWorktree('a')
    rmSync(a.path, { recursive: true })
    assert.equal(caWord(repo, a.path).worktree, 'prunable')
    const r = req(repo, a.path)
    assert.equal(r.status, 0, r.stderr)
    assert.deepEqual([r.result.ok, r.result.worktree, r.result.retained], [true, 'removed', false], JSON.stringify(r.result))
    assert.ok(!repo.worktrees().includes(a.path))
    assert.ok(repo.branches().includes(a.branch), 'ブランチは消さない')
    // 登録も実体も無ければ従来どおり not-registered（ok）
    assert.deepEqual([req(repo, a.path).result.worktree, req(repo, a.path).result.ok], ['not-registered', true])
  })
  test(`${tag} X: check-absent のあとに同じパスへ clean な worktree が作り直されたら、消さずに retained-present（実体もブランチも残る）`, () => {
    const repo = makeRepo()
    const a = repo.addWorktree('a')
    rmSync(a.path, { recursive: true })
    repo.git(repo.main, 'worktree', 'prune')
    assert.equal(caWord(repo, a.path).worktree, 'absent')
    repo.git(repo.main, 'worktree', 'add', '-q', a.path, a.branch)
    const r = req(repo, a.path)
    assert.deepEqual([r.result.ok, r.result.worktree, r.result.retained], [false, 'retained-present', true], JSON.stringify(r.result))
    assert.ok(existsSync(a.path) && repo.worktrees().includes(a.path) && repo.branches().includes(a.branch))
    // 対照: フラグが無い discard はその clean な worktree を消してしまう（TOCTOU の再現。X の元の挙動）
    assert.equal(dis(repo, a.path).result.worktree, 'removed')
  })
  test(`${tag} X: 作り直されたのが detached で固有のコミットを持つ worktree でも消さない（retained-present）。コミットも残る`, () => {
    const repo = makeRepo()
    const a = repo.addWorktree('a')
    rmSync(a.path, { recursive: true })
    assert.equal(caWord(repo, a.path).worktree, 'prunable')
    repo.git(repo.main, 'worktree', 'prune')
    repo.git(repo.main, 'worktree', 'add', '-q', '--detach', a.path)
    repo.write(a.path, 'q.txt', 'q\n')
    repo.git(a.path, 'add', 'q.txt')
    repo.git(a.path, 'commit', '-q', '-m', 'unpushed')
    const sha = repo.head(a.path)
    const r = req(repo, a.path)
    assert.deepEqual([r.result.worktree, r.result.retained], ['retained-present', true], JSON.stringify(r.result))
    assert.ok(existsSync(a.path))
    assert.equal(repo.git(repo.main, 'cat-file', '-t', sha), 'commit')
  })
  // 親ディレクトリを検索できないとき stat は失敗するだけで、実体が無いとは言えない（AC）。root は権限が効かないので省略
  test(`${tag} AC: --require-missing は実体の有無を確かめられない（親を検索・読み取りできない）とき、何も消さず retained-unobservable。登録も実体も残る`, { skip: typeof process.getuid === 'function' && process.getuid() === 0 }, () => {
    const repo = makeRepo()
    const holder = join(repo.root, 'holder')
    mkdirSync(holder)
    const wt = join(holder, 'wt')
    repo.git(repo.main, 'worktree', 'add', '-q', '-b', 'b-ac', wt)
    for (const mode of [0o000, 0o600]) {
      chmodSync(holder, mode)
      try {
        const r = req(repo, wt)
        assert.deepEqual([r.result.ok, r.result.worktree, r.result.retained], [false, 'retained-unobservable', true], `mode ${mode.toString(8)}: ${JSON.stringify(r.result)}`)
      } finally {
        chmodSync(holder, 0o700)
      }
      assert.ok(existsSync(wt) && repo.worktrees().includes(wt), `mode ${mode.toString(8)}: 登録も実体も残る`)
      assert.ok(repo.branches().includes('b-ac'))
    }
    // 対照: 権限を戻せば実体が確認できて retained-present（clean な worktree を消さない）
    assert.equal(req(repo, wt).result.worktree, 'retained-present')
  })
  // 登録の無いパスでも、親を検索・読み取りできないと stat が失敗して『実体が無い』ように見える（AF）。not-registered は『もう無い』の意味でホストが追跡を外すので、
  // discard の保護つき（--head / --expect-branch / --require-missing）はもちろん、保護なしと superseded も retained-unobservable で返す。root は権限が効かないので省略
  test(`${tag} AF: 登録の無いパスの有無を確かめられない（親を検索・読み取りできない）とき not-registered にせず retained-unobservable。実体は残り、権限を戻せば従来の語`, { skip: typeof process.getuid === 'function' && process.getuid() === 0 }, () => {
    const repo = makeRepo()
    const holder = join(repo.root, 'holder-af')
    mkdirSync(holder)
    const stray = join(holder, 'stray')
    mkdirSync(stray)
    writeFileSync(join(stray, 'x'), 'x\n')
    const sha = repo.git(repo.main, 'rev-parse', 'HEAD')
    const variants = [
      ['discard --head', ['remove', '--mode', 'discard', '--path', stray, '--head', sha]],
      ['discard --expect-branch', ['remove', '--mode', 'discard', '--path', stray, '--expect-branch', 'feat/x']],
      ['discard --require-missing', ['remove', '--mode', 'discard', '--path', stray, '--require-missing']],
      ['discard 保護なし', ['remove', '--mode', 'discard', '--path', stray]],
      ['superseded', ['remove', '--mode', 'superseded', '--path', stray]],
    ]
    for (const mode of [0o000, 0o600]) {
      chmodSync(holder, mode)
      try {
        for (const [name, args] of variants) {
          const r = run(repo, args)
          assert.deepEqual([r.result.ok, r.result.worktree, r.result.retained], [name === 'superseded', 'retained-unobservable', true], `mode ${mode.toString(8)} ${name}: ${JSON.stringify(r.result)}`)
        }
      } finally {
        chmodSync(holder, 0o700)
      }
      assert.ok(existsSync(join(stray, 'x')), `mode ${mode.toString(8)}: 実体は残る`)
    }
    // 対照: 権限を戻せば、保護つきは retained-unregistered・superseded は従来どおり not-registered
    assert.equal(run(repo, variants[0][1]).result.worktree, 'retained-unregistered')
    assert.equal(run(repo, variants[4][1]).result.worktree, 'not-registered')
    // 対照: 親が読めて本当に無いパスは従来どおり not-registered（unobservable にしない）
    assert.equal(run(repo, ['remove', '--mode', 'superseded', '--path', join(holder, 'gone')]).result.worktree, 'not-registered')
  })
  test(`${tag} X: 登録が無いのに実体のあるパス（ファイル・シンボリックリンクを含む）は retained-unregistered。実体の無い detached・lock ありの登録は retained-detached・retained-locked（unlock もしない）`, () => {
    const repo = makeRepo()
    const stray = join(repo.root, 'stray-x')
    mkdirSync(stray)
    writeFileSync(join(stray, 'x'), 'x\n')
    assert.deepEqual([req(repo, stray).result.worktree, req(repo, stray).result.retained], ['retained-unregistered', true])
    const file = join(repo.root, 'file-x')
    writeFileSync(file, 'x\n')
    assert.equal(req(repo, file).result.worktree, 'retained-unregistered')
    const link = join(repo.root, 'link-x')
    symlinkSync(join(repo.root, 'nowhere'), link)
    assert.equal(req(repo, link).result.worktree, 'retained-unregistered', 'ぶら下がったシンボリックリンクも実体として扱う')
    assert.ok(existsSync(join(stray, 'x')) && existsSync(file))
    const d = repo.addWorktree('d')
    repo.git(d.path, 'checkout', '-q', '--detach')
    rmSync(d.path, { recursive: true })
    assert.deepEqual([req(repo, d.path).result.worktree, repo.worktrees().includes(d.path)], ['retained-detached', true])
    const l = repo.addWorktree('l')
    repo.git(repo.main, 'worktree', 'lock', '--reason', 'portable', l.path)
    rmSync(l.path, { recursive: true })
    assert.deepEqual([req(repo, l.path).result.worktree, repo.worktrees().includes(l.path), repo.git(repo.main, 'worktree', 'list', '--porcelain').includes('locked')], ['retained-locked', true, true])
    // 死んだ pid の agent lock でも、--require-missing は外さない（フラグ無しなら外して消す）
    const k = repo.addWorktree('k')
    repo.git(repo.main, 'worktree', 'lock', '--reason', `claude agent x (pid ${deadPid()})`, k.path)
    rmSync(k.path, { recursive: true })
    assert.equal(req(repo, k.path).result.worktree, 'retained-locked')
    assert.equal(dis(repo, k.path).result.worktree, 'removed')
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
