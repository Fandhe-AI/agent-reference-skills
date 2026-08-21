// checker-run-verify.test.mjs — codex P1（PR #416）の回帰テスト。
//
// LOCAL_PATCH_GUARD の checker は CHECKER_EXEC（承認済み blob を取り出した一時
// ファイル）に対して bash で複数回実行される（同期前 check → apply → 最終検証）。
// apply は checker 自身のコードを実行するため、CHECKER_EXEC 自身（$0 で参照できる）を
// 自己書換えできる。従来は起動時に1度だけ取り出したファイルを再検証せず使い回して
// いたため、apply が自己書換えした内容がそのまま次（最終検証）の bash 実行に渡って
// いた（verify-then-execute が隣接していない TOCTOU）。
//
// このテストの checker は apply 実行時に自身のファイル（$0 = CHECKER_EXEC）を
// 「常に exit 42 する」内容へ自己書換えする。修正後の run_checker は各実行の直前に
// 必ずハッシュを承認済み blob（CHECKER_APPROVED_HASH）と照合し、不一致なら無条件で
// 書き直してから実行するため、最終検証は自己書換え後も常に「元の（exit 0 の）
// 承認済み内容」が実行され、exit 42 の改ざん後コードは一度も実行されない。
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
  const repoDir = mkdtempSync(join(tmpdir(), 'sync-skills-lock-checker-verify-'))
  const binDir = mkdtempSync(join(tmpdir(), 'sync-skills-lock-checker-verify-bin-'))

  writeFileSync(join(binDir, 'gh'), '#!/usr/bin/env bash\nexit 0\n')
  chmodSync(join(binDir, 'gh'), 0o755)

  // npx スタブ: 標準的な成功パターン。
  const npxBody = `#!/usr/bin/env bash
set -euo pipefail
skill_dir=".agents/skills/${SKILL_NAME}"
echo "updated upstream content" > "\${skill_dir}/SKILL.md"
python3 - <<'PYEOF'
import json
with open('skills-lock.json') as f:
    lock = json.load(f)
lock['skills']['${SKILL_NAME}']['computedHash'] = 'sha256:updated-hash-value'
with open('skills-lock.json', 'w') as f:
    json.dump(lock, f, indent=2)
    f.write('\\n')
PYEOF
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

  // checker: check モード（無引数）は常に exit 0。apply モードでは自分自身（$0 =
  // 実行中の一時ファイル CHECKER_EXEC）を「常に exit 42 する」内容へ書き換えたうえで
  // exit 0 する（apply 自体は成功として扱われるが、次に実行される一時ファイルの中身が
  // 改ざんされている状態を再現する）。
  mkdirSync(join(repoDir, 'scripts'), { recursive: true })
  writeFileSync(
    join(repoDir, 'scripts', 'check-skill-local-patches.sh'),
    [
      '#!/usr/bin/env bash',
      'if [[ "${1:-}" == "apply" ]]; then',
      '  cat > "$0" <<\'EVIL\'',
      '#!/usr/bin/env bash',
      'exit 42',
      'EVIL',
      '  exit 0',
      'fi',
      'exit 0',
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
  return execFileSync('bash', [SCRIPT_PATH, SKILL_NAME, SOURCE_REPO], {
    cwd: repoDir,
    env,
    encoding: 'utf8',
  })
}

test('ケース1: apply が CHECKER_EXEC 自身（$0）を自己書換えしても、最終検証は' +
  '改ざん後コードを実行せず、承認済み blob から再検証・再取得した元の内容を実行する' +
  '（codex P1 指摘: run_checker が各実行の直前に毎回ハッシュを再検証する）', () => {
  const ctx = setupRepo()
  try {
    const out = runScript(ctx)
    // 改ざん後コード（exit 42）が実行されていれば「再適用後の最終検証に失敗しました」
    // で fail-closed 終了するはずだが、run_checker の再検証により元の(exit 0 の)
    // 承認済み内容が実行されるため、同期は完走する。
    assert.doesNotMatch(
      out,
      /再適用後の最終検証に失敗しました/,
      '改ざんされた一時ファイルの内容（exit 42）が実行されていないこと',
    )
    assert.match(out, /更新完了/, '同期が完走すること（改ざんが無害化されていること）')
  } finally {
    rmSync(ctx.repoDir, { recursive: true, force: true })
    rmSync(ctx.binDir, { recursive: true, force: true })
  }
})

// ケース2 専用: ハッシュ不一致による再生成が起きた直後に、置換前（apply が自己書換え
// した）旧 CHECKER_EXEC が既に削除されているかどうかを、実行中の checker 自身に
// チェックさせて結果ファイルへ書き出させる。apply モードで自身のパス（$0 = 旧
// CHECKER_EXEC）を marker ファイルへ記録してから自己書換えし、最終検証（再生成後の
// 新 CHECKER_EXEC で実行される、改ざんされていない信頼済みコード）で marker の
// パスがまだディスク上に残っているかを判定する。
function setupLeakCheckRepo() {
  const repoDir = mkdtempSync(join(tmpdir(), 'sync-skills-lock-checker-leak-'))
  const binDir = mkdtempSync(join(tmpdir(), 'sync-skills-lock-checker-leak-bin-'))
  const markerFile = join(binDir, 'old-checker-exec-path.marker')
  const resultFile = join(binDir, 'leak-check-result.txt')

  writeFileSync(join(binDir, 'gh'), '#!/usr/bin/env bash\nexit 0\n')
  chmodSync(join(binDir, 'gh'), 0o755)

  const npxBody = `#!/usr/bin/env bash
set -euo pipefail
skill_dir=".agents/skills/${SKILL_NAME}"
echo "updated upstream content" > "\${skill_dir}/SKILL.md"
python3 - <<'PYEOF'
import json
with open('skills-lock.json') as f:
    lock = json.load(f)
lock['skills']['${SKILL_NAME}']['computedHash'] = 'sha256:updated-hash-value'
with open('skills-lock.json', 'w') as f:
    json.dump(lock, f, indent=2)
    f.write('\\n')
PYEOF
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

  // 信頼済みコード（committed blob。同期前 check と再生成後の最終検証の両方で
  // 実行される）: apply モードでは自身のパス（$0）を marker ファイルへ記録してから
  // 自己書換えする。check モード（無引数）では、marker ファイルが存在する場合に
  // 限り「marker が指す旧パスがまだディスク上に残っているか」を判定して結果ファイルへ
  // 書き出す（marker がまだ無い最初の pre-check 呼び出しでは何もしない）。
  mkdirSync(join(repoDir, 'scripts'), { recursive: true })
  writeFileSync(
    join(repoDir, 'scripts', 'check-skill-local-patches.sh'),
    [
      '#!/usr/bin/env bash',
      'if [[ "${1:-}" == "apply" ]]; then',
      `  printf '%s' "$0" > "${markerFile}"`,
      '  cat > "$0" <<\'EVIL\'',
      '#!/usr/bin/env bash',
      'exit 42',
      'EVIL',
      '  exit 0',
      'fi',
      `if [[ -f "${markerFile}" ]]; then`,
      `  old_path="$(cat "${markerFile}")"`,
      '  if [[ -e "${old_path}" ]]; then',
      `    echo "STALE_PRESENT" > "${resultFile}"`,
      '  else',
      `    echo "STALE_ABSENT" > "${resultFile}"`,
      '  fi',
      'fi',
      'exit 0',
      '',
    ].join('\n'),
  )
  chmodSync(join(repoDir, 'scripts', 'check-skill-local-patches.sh'), 0o755)
  sh('git add -A && git commit -q -m init', repoDir)

  const checkerHash = sh(
    'git hash-object -- scripts/check-skill-local-patches.sh',
    repoDir,
  ).trim()

  return { repoDir, binDir, checkerHash, resultFile }
}

test('ケース2: ハッシュ不一致による CHECKER_EXEC の再生成時、置換前（apply が' +
  '自己書換えした）旧一時ファイルが再生成の時点で既に削除されている（Bugbot Medium / ' +
  'codex P2 指摘: 再代入するだけだと EXIT trap は最後に代入された CHECKER_EXEC しか' +
  '回収できず、途中で作られた旧一時ファイルが /tmp に残る）', () => {
  const ctx = setupLeakCheckRepo()
  try {
    const out = runScript(ctx)
    assert.match(out, /更新完了/, '同期が完走すること（前提条件）')
    const result = readFileSync(ctx.resultFile, 'utf8').trim()
    assert.equal(
      result,
      'STALE_ABSENT',
      '再生成（最終検証）の時点で、apply が自己書換えした旧 CHECKER_EXEC が' +
        '既に削除されていること（再代入前に rm -f されていること）',
    )
  } finally {
    rmSync(ctx.repoDir, { recursive: true, force: true })
    rmSync(ctx.binDir, { recursive: true, force: true })
  }
})
