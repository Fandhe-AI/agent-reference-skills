// scope-compromised-revert-display.test.mjs — PR #420 codex P1 指摘の回帰テスト。
//
// restore-backup-failure-npx-path.test.mjs は CONTRACT_UNTRACKED_BACKUP_FAILED=1 の
// スキップ経路のみを検証していた。しかし revert_in_scope は SCOPE_PATH_COMPROMISED != 0
// の場合にも .agents/skills/${SKILL_NAME}/ への checkout・git clean を行わず return する。
// この経路では CONTRACT_UNTRACKED_BACKUP_FAILED が 0 のままのため、npx 失敗分岐の
// 完了表示が個別の原因フラグ（CONTRACT_UNTRACKED_BACKUP_FAILED）だけを見ていると、
// worktree に変更を残した状態で「スコープ内…の変更はリバートしました」と表示され、
// 復旧不要との誤認を招く（前回修正の変種）。
//
// 修正後は revert_in_scope が「復元を完全実行したか」を専用フラグ
// REVERT_IN_SCOPE_SKIPPED で一元通知し、完了表示はそのフラグのみで分岐する。
// このテストは npx スタブが許可先配下へ symlink を作成するケース（実行後 symlink
// 走査が SCOPE_PATH_COMPROMISED=1 に倒す）を再現し、「リバートしました」が表示されず
// 残留・手動復旧の警告のみが出ることを検証する。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdtempSync, writeFileSync, chmodSync, mkdirSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const SCRIPT_PATH = join(
  dirname(fileURLToPath(import.meta.url)),
  '..', 'scripts', 'skills-lock-update.sh',
)

const SKILL_NAME = 'dummy-skill'
const SOURCE_REPO = 'Fandhe-AI/dummy-source'

function sh(cmd, cwd, env) {
  return execFileSync('bash', ['-c', cmd], { cwd, env, encoding: 'utf8' })
}

function setupRepo() {
  const repoDir = mkdtempSync(join(tmpdir(), 'sync-skills-lock-scope-compromised-'))
  const binDir = mkdtempSync(join(tmpdir(), 'sync-skills-lock-scope-compromised-bin-'))

  writeFileSync(join(binDir, 'gh'), '#!/usr/bin/env bash\nexit 0\n')
  chmodSync(join(binDir, 'gh'), 0o755)

  // npx: 許可先配下へ外向き symlink を作成して exit 0 する。実行後の配下 symlink
  // 走査（TOCTOU 対策）が検出して SCOPE_PATH_COMPROMISED=1・NPX_STATUS=1 に倒し、
  // npx 失敗分岐 → revert_in_scope（checkout・clean スキップ）へ合流する。
  // CONTRACT_UNTRACKED_BACKUP_FAILED は 0 のまま（mv は成功する）という点が
  // restore-backup-failure-npx-path.test.mjs との違いであり、本指摘の核心。
  writeFileSync(
    join(binDir, 'npx'),
    [
      '#!/usr/bin/env bash',
      `ln -s /nonexistent-outside-target ".agents/skills/${SKILL_NAME}/evil-link"`,
      'exit 0',
      '',
    ].join('\n'),
  )
  chmodSync(join(binDir, 'npx'), 0o755)

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

  // checker: check モード・apply モードいずれも exit 0（何も変更しない）。
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

test('SCOPE_PATH_COMPROMISED 経路（npx が許可先配下へ symlink を作成）では、' +
  '完了表示に「リバートしました」を出さず残留・手動復旧の警告のみを出す' +
  '（codex P1 指摘の回帰: 個別の原因フラグではなく REVERT_IN_SCOPE_SKIPPED で分岐）', () => {
  const ctx = setupRepo()
  try {
    const { stdout, status } = runScript(ctx)

    assert.notEqual(status, 0, 'スクリプトは非ゼロ終了する（fail-closed）')

    assert.match(
      stdout,
      /symlink/,
      '許可先配下への symlink 作成が検出・報告される',
    )

    assert.match(
      stdout,
      /checkout・git clean・ignored 削除・既存 ignored の復元は行いません/,
      'revert_in_scope が SCOPE_PATH_COMPROMISED を検知して削除系操作を' +
        'スキップした旨の警告を出す',
    )

    assert.doesNotMatch(
      stdout,
      /スコープ内（skills-lock\.json \/ \.agents\/skills\/[^）]+）の変更はリバートしました/,
      'SCOPE_PATH_COMPROMISED で checkout・git clean をスキップしたにもかかわらず' +
        '「リバートしました」と表示しない（CONTRACT_UNTRACKED_BACKUP_FAILED が 0 の' +
        'ままでも完了表示が抑止されること = 前回修正の変種の回帰）',
    )

    assert.match(
      stdout,
      /一部未復元/,
      'スキップ時は完了表示の代わりに一部未復元・手動復旧が必要である旨を案内する',
    )
  } finally {
    rmSync(ctx.repoDir, { recursive: true, force: true })
    rmSync(ctx.binDir, { recursive: true, force: true })
  }
})
