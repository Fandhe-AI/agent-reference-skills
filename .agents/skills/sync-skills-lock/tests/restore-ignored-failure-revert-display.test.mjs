// restore-ignored-failure-revert-display.test.mjs — codex P1 指摘（PR #420・3 巡目）の回帰テスト。
//
// revert_in_scope の REVERT_IN_SCOPE_SKIPPED は「checkout / clean / 復元のいずれかを
// スキップ（完全実行できなかった）した経路を一元的に表す」契約だが、
// restore_preexisting_ignored が失敗する経路（IGNORED_BACKUP_KEEP=1 と警告出力のみ）で
// このフラグを立てないと、npx 失敗分岐の呼び出し元が既存 ignored ファイル未復元のまま
// 「スコープ内（...）の変更はリバートしました」と虚偽表示する。
//
// このテストは、実行前から存在した ignored ファイル（.DS_Store）を npx スタブが
// 上書きしたうえで許可先ディレクトリを読み取り専用化（chmod 555）して非ゼロ終了する
// ケースを再現する。restore_preexisting_ignored は復元のための os.unlink が EACCES で
// 失敗して非ゼロ終了し、修正前のコードでは「リバートしました」が表示されてしまう
// （このテストが RED になる）。修正後は完了を意味する文言を出さず、復元失敗の
// エラーと手動復旧の案内（一部未復元）だけが出る。
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

function sh(cmd, cwd, env) {
  return execFileSync('bash', ['-c', cmd], { cwd, env, encoding: 'utf8' })
}

function setupRepo() {
  const repoDir = mkdtempSync(join(tmpdir(), 'sync-skills-lock-restore-ignored-fail-'))
  const binDir = mkdtempSync(join(tmpdir(), 'sync-skills-lock-restore-ignored-fail-bin-'))

  writeFileSync(join(binDir, 'gh'), '#!/usr/bin/env bash\nexit 0\n')
  chmodSync(join(binDir, 'gh'), 0o755)

  // npx: 実行前から存在した ignored ファイル（.DS_Store）を上書きしたうえで、
  // 許可先ディレクトリを読み取り専用化して非ゼロ終了する。読み取り専用化により
  // restore_preexisting_ignored の復元（os.unlink → copyfile）が EACCES で失敗し、
  // 「既存 ignored が未復元のまま revert_in_scope が終わる」状態を決定的に再現する。
  writeFileSync(
    join(binDir, 'npx'),
    [
      '#!/usr/bin/env bash',
      `printf '%s\\n' "npx-overwrote-ignored" > ".agents/skills/${SKILL_NAME}/.DS_Store"`,
      `chmod 555 ".agents/skills/${SKILL_NAME}"`,
      'echo "stub npx: forced failure after ignored overwrite" >&2',
      'exit 1',
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
  // .DS_Store を ignored 化し、実行前から存在する既存 ignored ファイルとして置く
  // （restore_preexisting_ignored のバックアップ・比較・復元の対象になる）。
  writeFileSync(join(repoDir, '.gitignore'), '.DS_Store\n')
  writeFileSync(
    join(repoDir, '.agents', 'skills', SKILL_NAME, '.DS_Store'),
    'preexisting ignored content\n',
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
  sh('git add -A && git commit -q -m init', repoDir)

  return { repoDir, binDir }
}

function runScript({ repoDir, binDir }) {
  const env = {
    ...process.env,
    PATH: `${binDir}:${process.env.PATH}`,
  }
  let output = ''
  let status = 0
  try {
    output = execFileSync('bash', [SCRIPT_PATH, SKILL_NAME, SOURCE_REPO], {
      cwd: repoDir,
      env,
      encoding: 'utf8',
    })
  } catch (err) {
    output = (err.stdout || '') + (err.stderr || '')
    status = err.status ?? 1
  }
  return { output, status }
}

test('npx 失敗パスで既存 ignored ファイルの復元が失敗した場合、' +
  '「リバートしました」と虚偽表示せず、復元失敗のエラーと一部未復元の案内を出す' +
  '（codex P1 指摘・PR #420 の回帰: REVERT_IN_SCOPE_SKIPPED を復元失敗経路でも立てる）', () => {
  const ctx = setupRepo()
  try {
    const { output, status } = runScript(ctx)

    assert.notEqual(status, 0, 'スクリプトは非ゼロ終了する（fail-closed）')

    assert.match(
      output,
      /実行前から存在した ignored ファイルの復元に失敗しました/,
      'restore_preexisting_ignored の失敗がエラーとして報告される（テスト前提の成立確認）',
    )

    assert.doesNotMatch(
      output,
      /スコープ内（skills-lock\.json \/ \.agents\/skills\/[^）]+）の変更はリバートしました/,
      '既存 ignored が未復元のまま「変更はリバートしました」と完了を意味する表示をしない' +
        '（codex P1 指摘の回帰。実際にはバックアップからの復元が失敗している）',
    )

    assert.match(
      output,
      /一部未復元で、手動復旧が必要です/,
      '復元失敗時は REVERT_IN_SCOPE_SKIPPED 経由で「一部未復元・手動復旧」の案内を出す',
    )

    // 復元が実際に失敗していること（上書きされた内容が残置）を実体でも確認する。
    const ignoredContent = readFileSync(
      join(ctx.repoDir, '.agents', 'skills', SKILL_NAME, '.DS_Store'),
      'utf8',
    )
    assert.match(
      ignoredContent,
      /npx-overwrote-ignored/,
      '既存 ignored ファイルは未復元のまま（表示と実体が一致していることの確認）',
    )
    // 復元失敗時はスクリプトが保全した ignored バックアップ dir（mktemp -d）が
    // OS の tmpdir に残る。テストでは手動復旧の素材は不要のため、案内メッセージから
    // パスを拾って掃除する（実行ごとの残骸蓄積の防止。テスト対象の検証とは無関係）。
    const backupDirMatch = output.match(/バックアップは (\S+) に相対パス構造で残っています/)
    if (backupDirMatch && backupDirMatch[1].startsWith(tmpdir().replace(/\/$/, ''))) {
      rmSync(backupDirMatch[1], { recursive: true, force: true })
    }
  } finally {
    // npx スタブが読み取り専用化した許可先を戻してから削除する。
    chmodSync(join(ctx.repoDir, '.agents', 'skills', SKILL_NAME), 0o755)
    rmSync(ctx.repoDir, { recursive: true, force: true })
    rmSync(ctx.binDir, { recursive: true, force: true })
  }
})
