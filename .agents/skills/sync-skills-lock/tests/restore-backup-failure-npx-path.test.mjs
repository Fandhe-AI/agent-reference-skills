// restore-backup-failure-npx-path.test.mjs — Issue #418 の回帰テスト（npx 失敗パス）。
//
// restore-backup-failure.test.mjs は「同期前 check（pre-check）が失敗する経路」だけを
// 検証していた。この経路は restore_contract_scope || true の直後に exit 1 するだけで
// revert_in_scope を一切呼ばない。しかし本来の主要な失敗経路（npx 自体が非ゼロ終了する
// 経路）は、restore_contract_scope || true の直後に必ず revert_in_scope を呼ぶ。
//
// restore_contract_scope は未追跡ファイルの退避（mkdir -p / mv）に失敗すると
// backup_failed=1 とし、worktree には触れず index のみ PRE_SYNC_TREE へ戻す
// （--staged のみ）。ここまでは worktree の一意な内容を守れている。しかし
// revert_in_scope が無条件に `git checkout -- <契約パス>` を実行すると、その
// git checkout はいま index のみ復元済みの内容（PRE_SYNC_TREE）を worktree へ
// 書き戻してしまい、restore_contract_scope が守ろうとした一意な内容を上書きする
// （Bugbot 指摘: Index restore enables later overwrite）。
//
// このテストは npx 自体が契約範囲内（skills-lock.json）を書き換えたうえで失敗する
// ケースを再現し、revert_in_scope 到達後も worktree の一意な内容が残ることを検証する。
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
const UNIQUE_MARKER = 'UNIQUE-CONTENT-9d1a3f9e-npx-rewrote-this'

function sh(cmd, cwd, env) {
  return execFileSync('bash', ['-c', cmd], { cwd, env, encoding: 'utf8' })
}

function setupRepo() {
  const repoDir = mkdtempSync(join(tmpdir(), 'sync-skills-lock-restore-backup-npx-'))
  const binDir = mkdtempSync(join(tmpdir(), 'sync-skills-lock-restore-backup-npx-bin-'))

  writeFileSync(join(binDir, 'gh'), '#!/usr/bin/env bash\nexit 0\n')
  chmodSync(join(binDir, 'gh'), 0o755)

  // npx: 契約範囲内(skills-lock.json)を git rm --cached で未追跡化・一意な内容へ
  // 書き換えたうえで非ゼロ終了する(部分書き込み後の失敗を再現)。checker は無関係
  // (check モードは exit 0 のみ)であり、npx 自体がこの状態を作る点が
  // restore-backup-failure.test.mjs（checker が作る）との違い。
  writeFileSync(
    join(binDir, 'npx'),
    [
      '#!/usr/bin/env bash',
      'git rm --cached -q -- skills-lock.json',
      `printf '%s\\n' "${UNIQUE_MARKER}" > skills-lock.json`,
      'echo "stub npx: forced failure after partial write" >&2',
      'exit 1',
      '',
    ].join('\n'),
  )
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

  // checker: check モード（無引数）・apply モードいずれも exit 0（何も変更しない）。
  // pre-check を通過させ、npx 実行フェーズまで到達させるための最小実装。
  mkdirSync(join(repoDir, 'scripts'), { recursive: true })
  writeFileSync(
    join(repoDir, 'scripts', 'check-skill-local-patches.sh'),
    ['#!/usr/bin/env bash', 'exit 0', ''].join('\n'),
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

test('npx 失敗パス(revert_in_scope 到達)でも、退避(mv)失敗時は worktree の' +
  'skills-lock.json が上書きされず一意な内容が残る（Bugbot 指摘の回帰: ' +
  'restore_contract_scope の index 復元を revert_in_scope の git checkout が' +
  '上書きしないこと）', () => {
  const ctx = setupRepo()
  try {
    const { stdout, status } = runScript(ctx)

    assert.notEqual(status, 0, 'スクリプトは非ゼロ終了する（fail-closed）')

    const worktreeContent = readFileSync(join(ctx.repoDir, 'skills-lock.json'), 'utf8')
    assert.match(
      worktreeContent,
      new RegExp(UNIQUE_MARKER),
      '退避に失敗した未追跡ファイルの一意な内容が、revert_in_scope の checkout を' +
        '経由しても worktree にそのまま残っている（index 復元が checkout 経由で' +
        'worktree へ書き戻されていない）',
    )

    assert.match(
      stdout,
      /checkout・git clean は行いません/,
      'revert_in_scope が退避失敗を検知して checkout をスキップした旨の警告を出す',
    )

    assert.doesNotMatch(
      stdout,
      /契約範囲を同期開始前.*へ復元しました/,
      '退避失敗時は無条件の復元成功メッセージを出力しない',
    )

    assert.doesNotMatch(
      stdout,
      /スコープ内（skills-lock\.json \/ \.agents\/skills\/[^）]+）の変更はリバートしました/,
      '退避失敗で checkout・git clean をスキップしたにもかかわらず「リバートしました」と' +
        '無条件表示しない（Issue #418 再発の回帰。実際には未退避の worktree 変更が残る）',
    )
  } finally {
    rmSync(ctx.repoDir, { recursive: true, force: true })
    rmSync(ctx.binDir, { recursive: true, force: true })
  }
})
