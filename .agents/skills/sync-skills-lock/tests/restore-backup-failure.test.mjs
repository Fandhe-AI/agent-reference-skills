// restore-backup-failure.test.mjs — Issue #418 の回帰テスト。
//
// restore_contract_scope は git restore --worktree で契約範囲(当該スキル・
// skills-lock.json・durable patch)を同期開始前(PRE_SYNC_TREE)へ戻す前に、checker が
// 未追跡化・新規作成したファイルを一時ディレクトリへ退避する。この退避(mkdir -p /
// mv)は `restore_contract_scope || true` という呼び出し形（bash の仕様上 `||`
// 文脈では set -e が抑止される）のため、失敗しても検査されずそのまま git restore
// --worktree へ進んでいた。checker が git rm --cached で skills-lock.json を
// 未追跡化して一意な内容へ書き換えた直後に mv が失敗すると、その唯一のコピーが
// PRE_SYNC_TREE の内容で無音に上書きされ、データが失われる。
//
// 修正後は退避失敗を検査し、index のみへ降格して worktree には触れずに非ゼロで
// 終了する(fail-closed)。このテストは mv を常に失敗させるスタブで退避失敗を強制し、
// worktree 上の一意な内容が上書きされずに残ることを検証する。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdtempSync, writeFileSync, chmodSync, mkdirSync, rmSync, readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const SCRIPT_PATH = join(
  dirname(fileURLToPath(import.meta.url)),
  '..', 'scripts', 'skills-lock-update.sh',
)

const SKILL_NAME = 'dummy-skill'
const SOURCE_REPO = 'Fandhe-AI/dummy-source'
const UNIQUE_MARKER = 'UNIQUE-CONTENT-b6f2b6e6-checker-rewrote-this'

function sh(cmd, cwd, env) {
  return execFileSync('bash', ['-c', cmd], { cwd, env, encoding: 'utf8' })
}

function setupRepo() {
  const repoDir = mkdtempSync(join(tmpdir(), 'sync-skills-lock-restore-backup-'))
  const binDir = mkdtempSync(join(tmpdir(), 'sync-skills-lock-restore-backup-bin-'))

  writeFileSync(join(binDir, 'gh'), '#!/usr/bin/env bash\nexit 0\n')
  chmodSync(join(binDir, 'gh'), 0o755)

  // npx はこのテストでは呼ばれない想定(pre-check 段階で失敗させるため)だが、
  // 呼ばれた場合に検知できるよう失敗させておく。
  writeFileSync(join(binDir, 'npx'), '#!/usr/bin/env bash\necho "npx should not run" >&2\nexit 1\n')
  chmodSync(join(binDir, 'npx'), 0o755)

  // mv を常に失敗させるスタブ。restore_contract_scope の未追跡退避ループが使う
  // 唯一の mv 呼び出し箇所を狙い撃ちして失敗させ、退避失敗を再現する。
  writeFileSync(join(binDir, 'mv'), '#!/usr/bin/env bash\necho "stub mv: forced failure" >&2\nexit 1\n')
  chmodSync(join(binDir, 'mv'), 0o755)

  sh('git init -q', repoDir)
  sh('git config user.email test@example.com', repoDir)
  sh('git config user.name test', repoDir)

  mkdirSync(join(repoDir, '.agents', 'skills', SKILL_NAME), { recursive: true })
  writeFileSync(
    join(repoDir, '.agents', 'skills', SKILL_NAME, 'SKILL.md'),
    'original content\n',
  )
  writeFileSync(
    join(repoDir, 'skills-lock.json'),
    JSON.stringify(
      {
        skills: {
          [SKILL_NAME]: {
            source: `https://github.com/${SOURCE_REPO}`,
            computedHash: 'sha256:original-hash-value',
          },
        },
      },
      null,
      2,
    ) + '\n',
  )

  // checker: check モード（無引数）で skills-lock.json を git rm --cached により
  // 未追跡化し、一意な内容へ書き換えたうえで exit 1 する(同期前検証の失敗を再現)。
  // これにより skills-lock.json は「PRE_SYNC_TREE には存在するが未追跡」という
  // データ喪失が起こり得る状態になる。
  mkdirSync(join(repoDir, 'scripts'), { recursive: true })
  writeFileSync(
    join(repoDir, 'scripts', 'check-skill-local-patches.sh'),
    [
      '#!/usr/bin/env bash',
      'if [[ "${1:-}" == "apply" ]]; then',
      '  exit 0',
      'fi',
      'git rm --cached -q -- skills-lock.json',
      `printf '%s\\n' "${UNIQUE_MARKER}" > skills-lock.json`,
      'exit 1',
      '',
    ].join('\n'),
  )
  chmodSync(join(repoDir, 'scripts', 'check-skill-local-patches.sh'), 0o755)
  sh('git add -A && git commit -q -m init', repoDir)

  const checkerHash = sh(
    'git hash-object -- scripts/check-skill-local-patches.sh',
    repoDir,
  ).trim()

  return { repoDir, binDir, checkerHash }
}

function runScript({ repoDir, binDir, checkerHash }) {
  const env = {
    ...process.env,
    PATH: `${binDir}:${process.env.PATH}`,
    CHECKER_APPROVED_HASH: checkerHash,
  }
  let stdout = ''
  let status = 0
  try {
    stdout = execFileSync('bash', [SCRIPT_PATH, SKILL_NAME, SOURCE_REPO], {
      cwd: repoDir,
      env,
      encoding: 'utf8',
    })
  } catch (err) {
    stdout = (err.stdout || '') + (err.stderr || '')
    status = err.status ?? 1
  }
  return { stdout, status }
}

test('退避(mv)失敗時、worktree の skills-lock.json は上書きされず一意な内容が' +
  '残る（データ喪失なし。Issue #418: 退避失敗を検査せず git restore --worktree で' +
  '上書きしていた欠陥の回帰）', () => {
  const ctx = setupRepo()
  try {
    const { stdout, status } = runScript(ctx)

    assert.notEqual(status, 0, 'スクリプトは非ゼロ終了する（fail-closed）')

    const worktreeContent = readFileSync(join(ctx.repoDir, 'skills-lock.json'), 'utf8')
    assert.match(
      worktreeContent,
      new RegExp(UNIQUE_MARKER),
      '退避に失敗した未追跡ファイルの一意な内容が worktree にそのまま残っている' +
        '（PRE_SYNC_TREE の内容で上書きされていない）',
    )

    assert.doesNotMatch(
      stdout,
      /契約範囲を同期開始前.*へ復元しました/,
      '退避失敗時は無条件の復元成功メッセージを出力しない',
    )
  } finally {
    rmSync(ctx.repoDir, { recursive: true, force: true })
    rmSync(ctx.binDir, { recursive: true, force: true })
  }
})
