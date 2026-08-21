// restore-backup-failure-checker-lsfiles.test.mjs — Issue #422 の回帰テスト。
//
// preview-untracked.test.mjs ケース7は「checker が無いリポジトリ」で git ls-files が
// 失敗するケースを検証しており、tracked 分（skills-lock.json / SKILL.md）は
// revert_in_scope 1 の checkout でリバートされる。
//
// しかし checker があるリポジトリ（LOCAL_PATCH_GUARD=true）では、同じ git 破損が
// restore_contract_scope 内の未追跡列挙（`git ls-files --others ...`）も失敗させ、
// CONTRACT_UNTRACKED_BACKUP_FAILED=1 になる。この状態で revert_in_scope 1 を呼ぶと、
// skip_clean=1 の「clean はしないが tracked の checkout はする」という指定を無視して
// checkout ごと丸ごとスキップしてしまい、npx が加えた tracked worktree の編集
// （SKILL.md の書き換え）が残置される（checker の有無で挙動が非対称になる回帰）。
//
// このテストは checker ありのリポジトリで git ls-files を失敗させ、
// (1) tracked 分（skills-lock.json / SKILL.md）が checkout でリバートされること、
// (2) 未追跡ファイル（NEW_FILE.md）は destructive な git clean を経ずに保全されること、
// (3) checker / npx が唯一のコピーとして書き換えた内容が、checkout 前に
//     git 非依存の cp で退避先へ複製され失われないこと（Issue #418 の非再発）
// を検証する。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdtempSync, writeFileSync, chmodSync, mkdirSync, rmSync, existsSync, readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const REAL_GIT = execFileSync('/bin/bash', ['-c', 'command -v git'], { encoding: 'utf8' }).trim()

const SCRIPT_PATH = join(
  dirname(fileURLToPath(import.meta.url)),
  '..', 'scripts', 'skills-lock-update.sh',
)

const SKILL_NAME = 'dummy-skill'
const SOURCE_REPO = 'Fandhe-AI/dummy-source'
const UNIQUE_MARKER = 'UNIQUE-CONTENT-422-checker-rewrote-this'

function sh(cmd, cwd, env) {
  return execFileSync('bash', ['-c', cmd], { cwd, env, encoding: 'utf8' })
}

// preview-untracked.test.mjs の addGitLsFilesFailure と同じ判定基準（`--others` あり・
// `--ignored` なしの ls-files 呼び出しのみを失敗させる）。restore_contract_scope の
// 未追跡列挙も同じ呼び出し形のため、この 1 つのラッパーで両方の呼び出し箇所を狙い撃ちできる。
function addGitLsFilesFailure(binDir) {
  const gitWrapper = `#!/usr/bin/env bash
if [[ "\${1:-}" == "ls-files" ]]; then
  has_others=0
  has_ignored=0
  for a in "\$@"; do
    if [[ "\${a}" == "--others" ]]; then has_others=1; fi
    if [[ "\${a}" == "--ignored" ]]; then has_ignored=1; fi
  done
  if [[ "\${has_others}" -eq 1 && "\${has_ignored}" -eq 0 ]]; then
    echo "fatal: simulated git ls-files failure (index corrupt)" >&2
    exit 128
  fi
fi
exec "${REAL_GIT}" "\$@"
`
  writeFileSync(join(binDir, 'git'), gitWrapper)
  chmodSync(join(binDir, 'git'), 0o755)
}

function setupRepo() {
  const repoDir = mkdtempSync(join(tmpdir(), 'sync-skills-lock-restore-checker-lsfiles-'))
  const binDir = mkdtempSync(join(tmpdir(), 'sync-skills-lock-restore-checker-lsfiles-bin-'))

  writeFileSync(join(binDir, 'gh'), '#!/usr/bin/env bash\nexit 0\n')
  chmodSync(join(binDir, 'gh'), 0o755)

  // npx: exit 0 のまま (a) skills-lock.json の computedHash 書き換え、
  // (b) 既存 tracked ファイル（SKILL.md）を一意な内容へ上書き、(c) 未追跡の新規ファイルを作成する。
  const npxBody = `#!/usr/bin/env bash
set -euo pipefail
skill_dir=".agents/skills/${SKILL_NAME}"
printf '%s\\n' "${UNIQUE_MARKER}" > "\${skill_dir}/SKILL.md"
python3 - <<'PYEOF'
import json
with open('skills-lock.json') as f:
    lock = json.load(f)
lock['skills']['${SKILL_NAME}']['computedHash'] = 'sha256:updated-hash-value'
with open('skills-lock.json', 'w') as f:
    json.dump(lock, f, indent=2)
    f.write('\\n')
PYEOF
echo "brand new upstream file" > "\${skill_dir}/NEW_FILE.md"
exit 0
`
  writeFileSync(join(binDir, 'npx'), npxBody)
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

  // checker: check / apply とも exit 0（何も変更しない）。LOCAL_PATCH_GUARD を
  // 有効化するためだけに存在する最小実装。
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

test('checker 経路で git ls-files が失敗しても、tracked 分（skills-lock.json / SKILL.md）は' +
  'checkout でリバートされ、未追跡ファイルは destructive な git clean を経ずに保全される' +
  '（Issue #422: checker の有無で revert 挙動が非対称になる回帰の是正）', () => {
  const ctx = setupRepo()
  addGitLsFilesFailure(ctx.binDir)
  const newFile = join(ctx.repoDir, '.agents', 'skills', SKILL_NAME, 'NEW_FILE.md')
  try {
    const { stdout, status } = runScript(ctx)

    assert.notEqual(status, 0, 'スクリプトは非ゼロ終了する（fail-closed）')

    // tracked 分は checkout でリバートされ、npx が書き換えた一意な内容は残らない
    const skillMdContent = readFileSync(
      join(ctx.repoDir, '.agents', 'skills', SKILL_NAME, 'SKILL.md'),
      'utf8',
    )
    assert.equal(
      skillMdContent,
      'original content\n',
      'SKILL.md は tracked のため checkout でリバートされ、npx が上書きした内容は残らないこと' +
        '（checker が無い経路と同じ挙動になること）',
    )

    const lockDiff = sh('git status --porcelain -- skills-lock.json', ctx.repoDir).trim()
    assert.equal(lockDiff, '', 'skills-lock.json も tracked のためリバートされ clean であること')

    // 未追跡ファイルは destructive cleanup（git clean -fd）を経由しないため削除されず残る
    assert.ok(
      existsSync(newFile),
      '未追跡ファイル（NEW_FILE.md）は git clean -fd を実行しないため削除されず残ること',
    )
    assert.equal(
      readFileSync(newFile, 'utf8'),
      'brand new upstream file\n',
      '残された未追跡ファイルの内容が変化していないこと',
    )

    // checkout 前に worktree の現状（npx が書き換えた一意な内容）が git 非依存の cp で
    // 退避されており、Issue #418 と同じデータ喪失が再発していないことを確認する。
    // 出力中の退避先ディレクトリパスを抽出し、そこに一意なマーカーが残っていることを検証する。
    const backupDirMatch = stdout.match(/checkout 前の worktree 内容を (\S+) へ複製してから/)
    assert.ok(backupDirMatch, `出力に退避先ディレクトリのパスが含まれること: ${stdout}`)
    const backupSkillMd = join(backupDirMatch[1], '.agents', 'skills', SKILL_NAME, 'SKILL.md')
    assert.ok(
      existsSync(backupSkillMd),
      `checkout 前の worktree 内容が退避先 ${backupSkillMd} へ複製されていること`,
    )
    assert.match(
      readFileSync(backupSkillMd, 'utf8'),
      new RegExp(UNIQUE_MARKER),
      'checkout で上書きされる前の一意な内容（npx が書き換えた SKILL.md）が退避先に保全されていること' +
        '（Issue #418 の非再発確認）',
    )
  } finally {
    rmSync(ctx.repoDir, { recursive: true, force: true })
    rmSync(ctx.binDir, { recursive: true, force: true })
  }
})
