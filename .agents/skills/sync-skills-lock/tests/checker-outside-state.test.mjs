// checker-outside-state.test.mjs — Bugbot Medium 指摘（類型10）の回帰テスト。
//
// LOCAL_PATCH_GUARD（消費側が scripts/check-skill-local-patches.sh を持つ場合）の
// outside_state() は、契約範囲（skills-lock.json / 当該スキル / durable patch）外の
// worktree・index 状態を digest 化して checker 実行前後で比較する内部関数。
// git read-tree / git add / git write-tree / git ls-files / git hash-object のいずれかが
// 失敗しても、`$(outside_state)` を `[[ ]]` の条件式内で直接使う呼び出し元
// （verify_outside_and_checker）では非ゼロ終了が握り潰され、空文字列同士の比較に
// 落ちて「範囲外の変更なし」と誤判定し得た。
//
// このテストは outside_state() の内部で使う `git write-tree`（GIT_INDEX_FILE を
// 明示的に指定して呼ばれる。PRE_SYNC_TREE 用の素の `git write-tree` 呼び出しとは
// GIT_INDEX_FILE の有無で区別できる）だけを、指定回数目に限って失敗させる git
// ラッパーで、次の 2 経路を検証する:
//   - 1 回目（Step 4 の PRE_OUTSIDE 取得）が失敗した場合、契約範囲外の基準 digest が
//     取れないため fail-closed で停止し、npx は一度も実行されないこと
//   - 2 回目（同期前 check 直後の verify_outside_and_checker）が失敗した場合も
//     fail-closed で停止し、npx は一度も実行されないこと
//
// checker 本体は何もしない no-op（常に exit 0）を使う。テストの主眼は
// outside_state() 自身の失敗検出であり、checker のロジックは無関係のため。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdtempSync, writeFileSync, chmodSync, mkdirSync, rmSync, existsSync } from 'node:fs'
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

function sh(cmd, cwd, env) {
  return execFileSync('bash', ['-c', cmd], { cwd, env, encoding: 'utf8' })
}

// git write-tree のうち GIT_INDEX_FILE が設定されている呼び出し（= outside_state()
// 内部からの呼び出しのみ。PRE_SYNC_TREE 用の素の `git write-tree` は GIT_INDEX_FILE を
// 設定しないため対象外）を数え、`failAtCall` 回目のみ失敗させる git ラッパーを用意する。
function setupRepo({ failAtCall }) {
  const repoDir = mkdtempSync(join(tmpdir(), 'sync-skills-lock-outside-state-'))
  const binDir = mkdtempSync(join(tmpdir(), 'sync-skills-lock-outside-state-bin-'))
  const callCountFile = join(binDir, 'write-tree-call-count')
  const argvLogFile = join(binDir, 'npx-argv.log')

  writeFileSync(join(binDir, 'gh'), '#!/usr/bin/env bash\nexit 0\n')
  chmodSync(join(binDir, 'gh'), 0o755)

  // npx スタブ: 標準的な成功パターン（skills-lock.json の computedHash 更新 + tracked
  // ファイルの上書き）。outside_state() の失敗経路はいずれも npx より前で停止する設計の
  // ため、このスタブが実行されること自体が回帰（fail-open）の証拠になる。
  const npxBody = `#!/usr/bin/env bash
set -euo pipefail
printf '%s\\n' "\$@" > "${argvLogFile}"
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

  // no-op checker（check モード・apply モードいずれも常に exit 0）。outside_state() 自体の
  // 検証が主眼のため、checker のロジックは意図的に何もしない。
  writeFileSync(join(binDir, 'checker-source.sh'), '#!/usr/bin/env bash\nexit 0\n')

  const gitWrapper = `#!/usr/bin/env bash
if [[ "\${1:-}" == "write-tree" && -n "\${GIT_INDEX_FILE:-}" ]]; then
  count=0
  [[ -f "${callCountFile}" ]] && count="\$(cat "${callCountFile}")"
  count=\$((count + 1))
  echo "\${count}" > "${callCountFile}"
  if [[ "\${count}" == "${failAtCall}" ]]; then
    echo "fatal: simulated outside_state write-tree failure (call \${count})" >&2
    exit 1
  fi
fi
exec "${REAL_GIT}" "\$@"
`
  writeFileSync(join(binDir, 'git'), gitWrapper)
  chmodSync(join(binDir, 'git'), 0o755)

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
  mkdirSync(join(repoDir, 'scripts'), { recursive: true })
  sh(`cp "${join(binDir, 'checker-source.sh')}" "${join(repoDir, 'scripts', 'check-skill-local-patches.sh')}"`)
  chmodSync(join(repoDir, 'scripts', 'check-skill-local-patches.sh'), 0o755)
  sh('git add -A && git commit -q -m init', repoDir)

  const checkerHash = sh(
    'git hash-object -- scripts/check-skill-local-patches.sh',
    repoDir,
  ).trim()

  return { repoDir, binDir, argvLogFile, checkerHash }
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

test('ケース1: outside_state() の 1 回目の呼び出し（Step 4 の PRE_OUTSIDE 取得）が' +
  '失敗すると、範囲外書き込みの検出ができないため npx を実行せず fail-closed で' +
  '停止する（Bugbot Medium 指摘: 従来は素の代入文の暗黙の errexit 伝播に依存しており、' +
  '明示的な失敗検出ではなかった）', () => {
  const ctx = setupRepo({ failAtCall: 1 })
  try {
    assert.throws(
      () => runScript(ctx),
      (err) => {
        assert.notEqual(err.status, 0, '非ゼロ終了すること（fail-closed）')
        const combined = `${err.stdout ?? ''}${err.stderr ?? ''}`
        assert.match(
          combined,
          /契約範囲外の基準 digest（PRE_OUTSIDE）の取得に失敗しました/,
          '専用のエラーメッセージで停止すること',
        )
        return true
      },
    )
    assert.equal(
      existsSync(ctx.argvLogFile),
      false,
      'npx が一度も実行されていないこと（PRE_OUTSIDE 取得が npx より前に走る）',
    )
  } finally {
    rmSync(ctx.repoDir, { recursive: true, force: true })
    rmSync(ctx.binDir, { recursive: true, force: true })
  }
})

test('ケース2: outside_state() の 2 回目の呼び出し（同期前 check 直後の' +
  'verify_outside_and_checker）が失敗すると、戻り値を明示的に検査して fail-closed で' +
  '停止する（「変化なしと確認できない」を「変化なし」と誤判定しない）', () => {
  const ctx = setupRepo({ failAtCall: 2 })
  try {
    assert.throws(
      () => runScript(ctx),
      (err) => {
        assert.notEqual(err.status, 0, '非ゼロ終了すること（fail-closed）')
        const combined = `${err.stdout ?? ''}${err.stderr ?? ''}`
        assert.match(
          combined,
          /契約範囲外の digest 取得に失敗しました/,
          '専用のエラーメッセージで停止すること',
        )
        assert.match(
          combined,
          /npx は実行していません/,
          'npx 未実行の旨が案内されること',
        )
        return true
      },
    )
    assert.equal(
      existsSync(ctx.argvLogFile),
      false,
      'npx が一度も実行されていないこと（verify_outside_and_checker が npx より前に走る）',
    )
  } finally {
    rmSync(ctx.repoDir, { recursive: true, force: true })
    rmSync(ctx.binDir, { recursive: true, force: true })
  }
})

test('ケース3（非退行）: outside_state() が失敗しない通常経路では、checker 検証を' +
  '通過して npx が実行される', () => {
  const ctx = setupRepo({ failAtCall: 0 })
  try {
    const out = runScript(ctx)
    assert.match(out, /更新完了|変更内容/, '同期が完走すること')
    assert.equal(
      existsSync(ctx.argvLogFile),
      true,
      'npx が実行されていること（誤検知で止まっていないこと）',
    )
  } finally {
    rmSync(ctx.repoDir, { recursive: true, force: true })
    rmSync(ctx.binDir, { recursive: true, force: true })
  }
})
