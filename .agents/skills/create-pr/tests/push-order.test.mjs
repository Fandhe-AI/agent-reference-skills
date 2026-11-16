// push-order.test.mjs — create-pr の SKILL.md が「セキュリティチェックの後に push する」順序を保つことの静的回帰テスト。
//
// 検証する契約: リモートへの push はこのスキル自身が Step 5 で行い、Step 2 のセキュリティチェックより後・
// `gh pr create` より前に置く。前提条件で「push 済み」を要求しない（要求すると確認前の差分が公開される）。
// push の前に、同じフェンスの中でベースブランチ上・detached HEAD・ブランチ名の取得失敗を判定して exit 1 で止める
// （実際にフェンスを一時 git リポジトリで実行して確かめる）。push の拒否を force 系で上書きしない。sandbox 節は `git push` と `.git` への書き込みを明記する。
// Step 2 の番号は implement-issue-tree（scripts/implement-issue-tree.src.js・tests/pr-push-prompt.test.mjs）が
// 「create-pr SKILL.md Step 2」として参照しているため変えない。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { chmodSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const SKILL = readFileSync(join(HERE, '..', 'SKILL.md'), 'utf8')

// 見出し行から次の同レベル以上の見出しまでを返す。見つからなければテストを失敗させる。
function section(heading, level) {
  const start = SKILL.indexOf(`\n${heading}`)
  assert.ok(start >= 0, `見出し「${heading}」が無い`)
  const rest = SKILL.slice(start + 1)
  const next = rest.slice(heading.length).search(new RegExp(`\\n#{1,${level}} `))
  return next < 0 ? rest : rest.slice(0, heading.length + next)
}

// bash フェンスの中身を、SKILL.md 内の開始位置つきで返す。
const fences = [...SKILL.matchAll(/```bash\n([\s\S]*?)\n```/g)].map((m) => ({ at: m.index, body: m[1] }))
const fencesWith = (re) => fences.filter((f) => re.test(f.body))

test('Step 2 の見出しはセキュリティチェックのまま番号を変えない', () => {
  assert.match(SKILL, /\n### Step 2: セキュリティチェック（必須）\n/)
})

test('git push は Step 2 より後・gh pr create より前の Step 5 に 1 回だけある', () => {
  const step2 = SKILL.indexOf('\n### Step 2:')
  const step5 = SKILL.indexOf('\n### Step 5:')
  const pushes = fencesWith(/(^|\n)\s*git push\b/)
  const creates = fencesWith(/(^|\n)\s*gh pr create\b/)
  assert.equal(pushes.length, 1, 'git push のフェンスはちょうど 1 つ')
  assert.equal(creates.length, 1, 'gh pr create のフェンスはちょうど 1 つ')
  const push = pushes[0]
  assert.match(push.body, /^git push -u origin HEAD$/m)
  assert.ok(step2 >= 0 && step5 > step2, 'Step 2 と Step 5 の見出しがこの順にある')
  assert.ok(push.at > step2, 'git push は Step 2 より後')
  assert.ok(push.at > step5, 'git push は Step 5 の中')
  assert.ok(push.at < creates[0].at, 'git push は gh pr create より前')
})

test('Step 5 は Step 2 で HIGH / MEDIUM が無いと確かめた後にだけ push し、拒否されても force しない', () => {
  const step5 = section('### Step 5:', 3)
  assert.match(step5, /Step 2 のセキュリティチェックで HIGH \/ MEDIUM が無いと確かめた後にだけ/)
  assert.match(step5, /`--force`・`--force-with-lease` を含む force 系の push で上書きしない/)
  assert.match(step5, /拒否の内容を報告して止める/)
  for (const f of fences) assert.doesNotMatch(f.body, /--force/, 'フェンスに force 系の push が無い')
})

test('前提条件に「push 済み」の要求が無い', () => {
  const pre = section('## 前提条件', 2)
  assert.doesNotMatch(pre, /push\s*済み/)
  assert.doesNotMatch(pre, /push\s*し(て|ておく)[^\n]*こと/)
})

test('sandbox 節は git push と .git への書き込みを明記し、「.git へ書き込まない」とは書かない', () => {
  const sb = section('## sandbox 環境での実行', 2)
  assert.match(sb, /`git push`/)
  assert.match(sb, /`git push -u origin HEAD` はネットワークを使ううえ、`\.git` にも書き込む/)
  assert.match(sb, /報告して止める/)
  assert.doesNotMatch(sb, /`\.git`・`\.agents`・`\.codex` へ書き込まない/)
})

test('よくある失敗に「セキュリティチェックの前に push する」がある', () => {
  const mistakes = section('## よくある失敗', 2)
  assert.match(mistakes, /先に `git push` してから Step 2 のセキュリティチェックを行い/)
})

// ---- ベースブランチ上では push しない（フェンスの動的検証）----

const pushFence = fencesWith(/(^|\n)\s*git push\b/)[0].body

test('フェンスはベースブランチの判定を git push より前に持ち、1 ブロックで完結する', () => {
  const at = (re) => pushFence.search(re)
  const push = at(/^git push -u origin HEAD$/m)
  assert.ok(push >= 0)
  for (const re of [/gh repo view --json defaultBranchRef --jq \.defaultBranchRef\.name/, /git symbolic-ref --quiet --short HEAD/, /\[ "\$\{branch\}" = "\$\{base\}" \]/]) {
    assert.ok(at(re) >= 0 && at(re) < push, `${re} が git push より前にある`)
  }
  assert.match(pushFence, /exit 1/)
  assert.doesNotMatch(pushFence, /\[\[/, '[ ] で書く（zsh / bash 共通）')
})

// テストの git とフェンスが共通で使う、呼び出し元から隔離した環境。git hook の中など GIT_DIR・GIT_WORK_TREE・
// GIT_INDEX_FILE が設定された状態で流しても、一時リポジトリ以外（呼び出し元のリポジトリ）へ config・commit・push が
// 作用しないよう GIT_ で始まる変数をすべて外し、system / global の config（commit.gpgsign 等）も読ませない。
// HOME も一時ディレクトリにして、シェルの起動ファイル（BASH_ENV・ENV・ZDOTDIR 経由を含む）を読ませない。
function isolatedEnv(root) {
  const home = join(root, 'home')
  mkdirSync(home, { recursive: true })
  const globalConfig = join(home, 'gitconfig')
  writeFileSync(globalConfig, '')
  const env = {}
  for (const [k, v] of Object.entries(process.env)) {
    if (k.startsWith('GIT_') || k === 'BASH_ENV' || k === 'ENV' || k === 'ZDOTDIR') continue
    env[k] = v
  }
  return {
    ...env,
    HOME: home,
    XDG_CONFIG_HOME: join(home, '.config'),
    GIT_CONFIG_NOSYSTEM: '1',
    GIT_CONFIG_GLOBAL: globalConfig,
    GIT_AUTHOR_NAME: 't',
    GIT_AUTHOR_EMAIL: 't@example.invalid',
    GIT_COMMITTER_NAME: 't',
    GIT_COMMITTER_EMAIL: 't@example.invalid',
    GH_HOST: 'gh.invalid',
  }
}

function gitWith(env, cwd, ...args) {
  const r = spawnSync('git', args, { cwd, env, encoding: 'utf8' })
  assert.equal(r.status, 0, `git ${args.join(' ')}: ${r.stderr}`)
  return r.stdout.trim()
}

// bare の origin と作業リポジトリ（main に 1 コミット push 済み・ローカルの main にはさらに未 push の 1 コミット）を作る。
function sandbox() {
  const root = mkdtempSync(join(tmpdir(), 'create-pr-push-'))
  const env = isolatedEnv(root)
  const git = (cwd, ...args) => gitWith(env, cwd, ...args)
  const origin = join(root, 'origin.git')
  const work = join(root, 'work')
  const bin = join(root, 'bin')
  mkdirSync(bin)
  mkdirSync(work)
  git(root, 'init', '--bare', '-b', 'main', origin)
  git(work, 'init', '-b', 'main')
  git(work, 'remote', 'add', 'origin', origin)
  writeFileSync(join(work, 'a'), '1')
  git(work, 'add', 'a')
  git(work, 'commit', '-m', 'init')
  git(work, 'push', '-u', 'origin', 'main')
  writeFileSync(join(work, 'a'), '2')
  git(work, 'commit', '-am', 'unreviewed')
  // 偽 gh: repo view は FAKE_BASE（既定 main）を返す。FAKE_GH_FAIL があれば失敗する。
  const gh = join(bin, 'gh')
  writeFileSync(gh, '#!/bin/sh\n[ -n "$FAKE_GH_FAIL" ] && { echo "gh: boom" >&2; exit 1; }\nprintf \'%s\\n\' "${FAKE_BASE-main}"\n')
  chmodSync(gh, 0o755)
  return { root, origin, work, bin, env, git }
}

const remoteRefs = (sb, repo = sb.origin) => sb.git(repo, 'for-each-ref', '--format=%(refname) %(objectname)')

function runFence(shell, sb, extra = {}) {
  return spawnSync(shell, ['-c', pushFence], {
    cwd: sb.work,
    encoding: 'utf8',
    env: { ...sb.env, PATH: `${sb.bin}:${sb.env.PATH}`, ...extra },
  })
}

const SHELLS = ['bash', 'zsh'].filter((sh) => spawnSync(sh, ['-c', ':']).status === 0)

for (const shell of SHELLS) {
  test(`[${shell}] ベースブランチ上では push せず exit 1 で止まる`, () => {
    const sb = sandbox()
    try {
      const before = remoteRefs(sb)
      const r = runFence(shell, sb)
      assert.equal(r.status, 1, r.stderr)
      assert.match(r.stderr, /ベースブランチ（main）そのもの/)
      assert.equal(remoteRefs(sb), before, 'origin は変わらない')
    } finally {
      rmSync(sb.root, { recursive: true, force: true })
    }
  })

  test(`[${shell}] feature ブランチでは push される`, () => {
    const sb = sandbox()
    try {
      sb.git(sb.work, 'checkout', '-b', 'feat/1-x')
      const r = runFence(shell, sb)
      assert.equal(r.status, 0, r.stderr)
      const head = sb.git(sb.work, 'rev-parse', 'HEAD')
      assert.match(remoteRefs(sb), new RegExp(`refs/heads/feat/1-x ${head}`))
    } finally {
      rmSync(sb.root, { recursive: true, force: true })
    }
  })

  test(`[${shell}] リポジトリの規約のベースが main でなければ main 上でも push できる（main 決め打ちではない）`, () => {
    const sb = sandbox()
    try {
      const r = runFence(shell, sb, { FAKE_BASE: 'develop' })
      assert.equal(r.status, 0, r.stderr)
    } finally {
      rmSync(sb.root, { recursive: true, force: true })
    }
  })

  test(`[${shell}] ベース上の判定は大文字小文字を含め完全一致で、別名のブランチは止めない`, () => {
    const sb = sandbox()
    try {
      sb.git(sb.work, 'checkout', '-b', 'main-fix')
      assert.equal(runFence(shell, sb).status, 0)
    } finally {
      rmSync(sb.root, { recursive: true, force: true })
    }
  })

  test(`[${shell}] detached HEAD では push せず exit 1 で止まる`, () => {
    const sb = sandbox()
    try {
      sb.git(sb.work, 'checkout', '--detach')
      const before = remoteRefs(sb)
      const r = runFence(shell, sb)
      assert.equal(r.status, 1, r.stderr)
      assert.equal(remoteRefs(sb), before)
    } finally {
      rmSync(sb.root, { recursive: true, force: true })
    }
  })

  test(`[${shell}] ベースブランチ名を取得できない（gh 失敗・空出力）ときは push せず exit 1 で止まる（fail-closed）`, () => {
    const sb = sandbox()
    try {
      sb.git(sb.work, 'checkout', '-b', 'feat/2-y')
      const before = remoteRefs(sb)
      for (const env of [{ FAKE_GH_FAIL: '1' }, { FAKE_BASE: '' }]) {
        const r = runFence(shell, sb, env)
        assert.equal(r.status, 1, r.stderr)
        assert.equal(remoteRefs(sb), before, 'origin は変わらない')
      }
    } finally {
      rmSync(sb.root, { recursive: true, force: true })
    }
  })
}

// ---- 呼び出し元の git 環境からの隔離 ----

// 呼び出し元が指す（はずの）リポジトリ。feature ブランチ上で自前の origin を持つので、隔離が効かなければ
// フェンスはここのブランチを dummy の origin へ push し、upstream の設定を config へ書き込む。
function dummyRepo() {
  const root = mkdtempSync(join(tmpdir(), 'create-pr-push-dummy-'))
  const env = isolatedEnv(root)
  const git = (cwd, ...args) => gitWith(env, cwd, ...args)
  const origin = join(root, 'origin.git')
  const work = join(root, 'work')
  mkdirSync(work)
  git(root, 'init', '--bare', '-b', 'main', origin)
  git(work, 'init', '-b', 'feat/9-dummy')
  git(work, 'remote', 'add', 'origin', origin)
  writeFileSync(join(work, 'd'), 'x')
  git(work, 'add', 'd')
  git(work, 'commit', '-m', 'dummy')
  const snapshot = () => ({
    refs: git(work, 'for-each-ref', '--format=%(refname) %(objectname)'),
    originRefs: git(origin, 'for-each-ref', '--format=%(refname) %(objectname)'),
    config: readFileSync(join(work, '.git', 'config'), 'utf8'),
    head: readFileSync(join(work, '.git', 'HEAD'), 'utf8'),
    index: readFileSync(join(work, '.git', 'index')).toString('base64'),
  })
  return { root, work, snapshot }
}

const OUTER_GIT_VARS = ['GIT_DIR', 'GIT_WORK_TREE', 'GIT_INDEX_FILE']

for (const shell of SHELLS) {
  test(`[${shell}] 呼び出し元の GIT_DIR・GIT_WORK_TREE・GIT_INDEX_FILE が別リポジトリを指していても、テストの git とフェンスはそこへ作用しない`, () => {
    const dummy = dummyRepo()
    const saved = Object.fromEntries(OUTER_GIT_VARS.map((k) => [k, process.env[k]]))
    let sb
    try {
      const before = dummy.snapshot()
      process.env.GIT_DIR = join(dummy.work, '.git')
      process.env.GIT_WORK_TREE = dummy.work
      process.env.GIT_INDEX_FILE = join(dummy.work, '.git', 'index')
      sb = sandbox()
      sb.git(sb.work, 'checkout', '-b', 'feat/3-z')
      const r = runFence(shell, sb)
      assert.equal(r.status, 0, r.stderr)
      const head = sb.git(sb.work, 'rev-parse', 'HEAD')
      assert.match(remoteRefs(sb), new RegExp(`refs/heads/feat/3-z ${head}`), '一時リポジトリの origin へ push される')
      for (const k of OUTER_GIT_VARS) delete process.env[k]
      assert.deepEqual(dummy.snapshot(), before, '呼び出し元のリポジトリは refs・config・HEAD・index とも変わらない')
    } finally {
      for (const [k, v] of Object.entries(saved)) {
        if (v === undefined) delete process.env[k]
        else process.env[k] = v
      }
      if (sb) rmSync(sb.root, { recursive: true, force: true })
      rmSync(dummy.root, { recursive: true, force: true })
    }
  })
}
