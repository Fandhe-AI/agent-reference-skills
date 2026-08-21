// restore-backup-failure-status-path.test.mjs — Issue #418 の回帰テスト（status 取得失敗パス）。
//
// restore-backup-failure-npx-path.test.mjs は「npx 自体が非ゼロ終了する経路」の
// 呼び出し元（NPX_STATUS 分岐）を検証している。しかし revert_in_scope を呼ぶ
// 失敗経路はもう 1 つある: npx は成功したが、実行後スナップショット取得の
// `git -c status.renames=false status --porcelain -z -uall` が失敗する経路
// （SNAP_AFTER 分岐）。この経路も restore_contract_scope || true → revert_in_scope
// の直後に「スコープ内…の変更はリバートしました」を表示しており、退避
// （mkdir -p / mv）失敗で revert_in_scope が checkout・git clean を保全のため
// スキップした場合（CONTRACT_UNTRACKED_BACKUP_FAILED=1）でも無条件に完了表示して
// いた（codex P1 指摘）。実際には未退避の worktree 変更が残っているため、利用者が
// 復旧不要と誤認する。
//
// このテストは以下のスタブで status 取得失敗パスを再現する:
// - npx: 契約範囲内(skills-lock.json)を git rm --cached で未追跡化・一意な内容へ
//   書き換えたうえで marker ファイルを作成して exit 0（成功）する
// - git: marker ファイルが存在する間、引数に `status` サブコマンドを含む呼び出し
//   のみ失敗させる（marker は npx が最後に作るため、実行前スナップショット等の
//   事前 status 呼び出しには影響しない）。それ以外は実 git へ委譲する
// - mv: 常に失敗（restore_contract_scope の未追跡退避を失敗させる）
//
// 検証内容: 保全スキップの警告が表示されること・「リバートしました」の完了表示が
// 出ないこと・未退避の一意な内容が worktree に残ること。
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
const UNIQUE_MARKER = 'UNIQUE-CONTENT-4c7b21aa-npx-rewrote-this'

function sh(cmd, cwd, env) {
  return execFileSync('bash', ['-c', cmd], { cwd, env, encoding: 'utf8' })
}

function setupRepo() {
  const repoDir = mkdtempSync(join(tmpdir(), 'sync-skills-lock-restore-backup-status-'))
  const binDir = mkdtempSync(join(tmpdir(), 'sync-skills-lock-restore-backup-status-bin-'))
  // npx 成功「後」からのみ git status を失敗させるための状態ファイル。
  // 実行前スナップショット（SNAP_BEFORE）等の事前 status 呼び出しは通す必要がある
  const markerPath = join(binDir, 'npx-completed.marker')
  // 生成時点の PATH（binDir 追加前）で実体の git を解決してラッパーへ埋め込む。
  // ラッパー内で PATH 検索すると自分自身へ再帰するため
  const realGit = sh('command -v git', tmpdir(), process.env).trim()

  writeFileSync(join(binDir, 'gh'), '#!/usr/bin/env bash\nexit 0\n')
  chmodSync(join(binDir, 'gh'), 0o755)

  // npx: 契約範囲内を書き換えたうえで marker を作成して成功終了する。
  // 「npx は成功したが直後の git status が失敗する」を再現するため exit 0 が要点
  // （restore-backup-failure-npx-path.test.mjs の exit 1 との違い）。
  writeFileSync(
    join(binDir, 'npx'),
    [
      '#!/usr/bin/env bash',
      'git rm --cached -q -- skills-lock.json',
      `printf '%s\\n' "${UNIQUE_MARKER}" > skills-lock.json`,
      `: > "${markerPath}"`,
      'echo "stub npx: success with partial write"',
      'exit 0',
      '',
    ].join('\n'),
  )
  chmodSync(join(binDir, 'npx'), 0o755)

  // git ラッパー: marker 存在時のみ `status` サブコマンドを失敗させる。
  // `-c status.renames=false` のようなオプション値は引数完全一致（== "status"）に
  // 該当しないため誤爆しない。それ以外はすべて実体へ委譲する
  writeFileSync(
    join(binDir, 'git'),
    [
      '#!/usr/bin/env bash',
      `if [[ -e "${markerPath}" ]]; then`,
      '  for arg in "$@"; do',
      '    if [[ "${arg}" == "status" ]]; then',
      '      echo "stub git: forced status failure after npx" >&2',
      '      exit 1',
      '    fi',
      '  done',
      'fi',
      `exec "${realGit}" "$@"`,
      '',
    ].join('\n'),
  )
  chmodSync(join(binDir, 'git'), 0o755)

  // mv を常に失敗させ、restore_contract_scope の未追跡退避を失敗させる
  // （CONTRACT_UNTRACKED_BACKUP_FAILED=1 → revert_in_scope の保全スキップへ到達）
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
  // pre-check を通過させ、npx 実行フェーズまで到達させるための最小実装
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

test('status 取得失敗パス(revert_in_scope 到達)でも、退避(mv)失敗時は' +
  '「リバートしました」と無条件表示せず、未退避の worktree 内容が残る' +
  '（codex P1 指摘の回帰: SNAP_AFTER 分岐の無条件完了表示）', () => {
  const ctx = setupRepo()
  try {
    const { stdout, status } = runScript(ctx)

    assert.notEqual(status, 0, 'スクリプトは非ゼロ終了する（fail-closed）')

    assert.match(
      stdout,
      /npx 実行後の git status 取得に失敗しました/,
      'npx 成功後の status 取得失敗（SNAP_AFTER 分岐）に到達している' +
        '（npx 失敗分岐ではなくこの経路を検証していることの確認）',
    )

    const worktreeContent = readFileSync(join(ctx.repoDir, 'skills-lock.json'), 'utf8')
    assert.match(
      worktreeContent,
      new RegExp(UNIQUE_MARKER),
      '退避に失敗した未追跡ファイルの一意な内容が worktree にそのまま残っている' +
        '（revert_in_scope の checkout で index が worktree へ書き戻されていない）',
    )

    assert.match(
      stdout,
      /checkout・git clean は行いません/,
      'revert_in_scope が退避失敗を検知して checkout をスキップし、' +
        '手動復旧が必要な旨の残留警告を出す',
    )

    assert.doesNotMatch(
      stdout,
      /スコープ内（skills-lock\.json \/ \.agents\/skills\/[^）]+）の変更はリバートしました/,
      '退避失敗で checkout・git clean をスキップしたにもかかわらず「リバートしました」と' +
        '無条件表示しない（codex P1 指摘の回帰。実際には未退避の worktree 変更が残る）',
    )
  } finally {
    rmSync(ctx.repoDir, { recursive: true, force: true })
    rmSync(ctx.binDir, { recursive: true, force: true })
  }
})
