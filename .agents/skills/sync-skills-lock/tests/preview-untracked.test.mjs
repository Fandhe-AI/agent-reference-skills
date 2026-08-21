// preview-untracked.test.mjs — Issue #381 対応の決定的回帰テスト。
//
// skills-lock-update.sh の承認プレビュー（更新完了後の「変更内容:」表示）が、
// `git diff` だけでは表示されない未追跡ファイルの存在・内容まで見せることを検証する。
//
// npx の実クローン処理は行わず、PATH 先頭に置いた npx / gh のスタブへ差し替える。
// スタブの挙動は TEST_NPX_SCENARIO で切り替える:
//   - 'new-file'     : skills-lock.json を更新し、.agents/skills/<skill>/ 配下に
//                      新規（未追跡）ファイルを作成する（upstream にファイルが増えたケースの再現）
//   - 'edit-only'    : skills-lock.json と既存の追跡ファイルのみ変更し、新規ファイルは作らない
//                      （既存動作の非退行確認）
//   - 'newline-file' : ファイル名に改行を含む未追跡ファイルを作成する
//                      （git ls-files の改行区切り出力で分割される回帰の再現）
//   - 'empty-file'   : 中身が空（0 byte）の未追跡ファイルを作成する
//                      （git diff --no-index が差分を出さず名前も分からなくなる回帰の再現）
//   - 'binary-file'  : NUL バイトを含むバイナリの未追跡ファイルを作成する
//                      （git diff --no-index が "Binary files ... differ" しか出さず、
//                        内容未確認のまま git add で取り込まれてしまう回帰の再現）
//   - 'new-subdir'   : upstream が新規サブディレクトリごとファイルを追加するケースを再現する
//                      （git ls-files はファイルパスを個々に返すが、git clean -fdn は親
//                        ディレクトリをまとめて1行で報告するため、SKILL.md 手動回帰確認の
//                        照合手順が行単位の完全一致では機能しないことを検証する）
//   - 'ls-files-fail': `.agents/skills/<skill>/` を git のワークツリー外へ差し替え、
//                      git ls-files がエラー終了するケースを再現する（プロセス置換の終了コードが
//                      検査されず fail-open になる回帰の再現。テストは非ゼロ終了と
//                      「新規（未追跡）ファイル: なし」が出力されないことの両方を検証する）
// git / jq / python3 は実物を使用する（ネットワーク不使用）。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdtempSync, writeFileSync, chmodSync, mkdirSync, rmSync, existsSync, readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

// git ls-files を意図的に失敗させる回帰確認（'ls-files-fail' シナリオ）で、実 git へ
// 委譲するために使う絶対パス。PATH の先頭を書き換えた後に `git` で解決すると自己参照に
// なるため、テスト起動時（PATH 上書き前）に一度だけ解決する。
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

// gh / npx を差し替えるスタブ bin ディレクトリと、npx シナリオを注入した git repo 一式を用意する。
// clean ガード（porcelain チェック）を通す必要があるため、初期状態は必ず commit 済みにする。
function setupRepo(scenario) {
  const repoDir = mkdtempSync(join(tmpdir(), 'sync-skills-lock-test-'))
  const binDir = mkdtempSync(join(tmpdir(), 'sync-skills-lock-bin-'))

  // gh スタブ: auth status のみ成功させる（他サブコマンドはこのスクリプトから呼ばれない）
  writeFileSync(join(binDir, 'gh'), '#!/usr/bin/env bash\nexit 0\n')
  chmodSync(join(binDir, 'gh'), 0o755)

  // npx スタブ: 実際の `npx skills add` の代わりに、シナリオに応じて
  // skills-lock.json の computedHash 更新・install ツリーの変更を模擬する。
  const npxBody = `#!/usr/bin/env bash
set -euo pipefail
skill_dir=".agents/skills/${SKILL_NAME}"
# 既存の追跡ファイルを変更（tracked diff の対象）
echo "updated upstream content" > "\${skill_dir}/SKILL.md"
# skills-lock.json の computedHash を書き換える
python3 - <<'PYEOF'
import json
with open('skills-lock.json') as f:
    lock = json.load(f)
lock['skills']['${SKILL_NAME}']['computedHash'] = 'sha256:updated-hash-value'
with open('skills-lock.json', 'w') as f:
    json.dump(lock, f, indent=2)
    f.write('\\n')
PYEOF
if [[ "\${TEST_NPX_SCENARIO:-}" == "new-file" ]]; then
  # upstream にファイルが増えたケース: npx 実行前は clean だったため、これは必ず未追跡になる
  echo "brand new upstream file" > "\${skill_dir}/NEW_FILE.md"
fi
if [[ "\${TEST_NPX_SCENARIO:-}" == "newline-file" ]]; then
  # 改行を含むファイル名の未追跡ファイル（-z / NUL 区切り処理の回帰確認用）
  printf 'newline file content\\n' > "\${skill_dir}/weird"\$'\\n'"name.md"
fi
if [[ "\${TEST_NPX_SCENARIO:-}" == "empty-file" ]]; then
  # 中身が空（0 byte）の未追跡ファイル（git diff --no-index が差分を出さないケースの確認用）
  : > "\${skill_dir}/EMPTY_FILE.md"
fi
if [[ "\${TEST_NPX_SCENARIO:-}" == "binary-file" ]]; then
  # NUL バイトを含むバイナリファイル（git diff --no-index が内容を出さないケースの確認用）
  printf 'binary\\x00marker\\x00content' > "\${skill_dir}/IMAGE.bin"
fi
if [[ "\${TEST_NPX_SCENARIO:-}" == "new-subdir" ]]; then
  # upstream が新規サブディレクトリごとファイルを追加するケース
  # （git clean -fdn は個々のファイルではなく親ディレクトリをまとめて1行で報告する）
  mkdir -p "\${skill_dir}/references"
  echo "brand new upstream reference doc" > "\${skill_dir}/references/new.md"
fi
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
  sh('git add -A && git commit -q -m init', repoDir)

  return { repoDir, binDir, scenario }
}

// 'ls-files-fail' 回帰確認専用: `git ls-files --others ...`（未追跡ファイル列挙）のみを
// 失敗させ、他の git 呼び出し（Step 4 の clean チェック・Step 5 の tracked diff 等）は
// 実 git へ委譲する `git` ラッパーを PATH 先頭の binDir へ追加する。
// pathspec 一致等の粗い偽装ではなく `--others` の有無で判定することで、スクリプトが
// 未追跡ファイル列挙にだけ `git ls-files` を使っている実装を維持したまま、
// 意図した呼び出し箇所だけを的確に失敗させる。`--ignored` を伴う呼び出し
// （npx 実行前の既存 ignored 列挙・リバート時の新規 ignored 選別）は未追跡
// プレビューとは別経路のため、失敗対象から除外して実 git へ委譲する。
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

function runScript({ repoDir, binDir, scenario }) {
  const env = {
    ...process.env,
    PATH: `${binDir}:${process.env.PATH}`,
    TEST_NPX_SCENARIO: scenario,
  }
  return execFileSync('bash', [SCRIPT_PATH, SKILL_NAME, SOURCE_REPO], {
    cwd: repoDir,
    env,
    encoding: 'utf8',
  })
}

function cleanDryRunList(repoDir) {
  const out = sh(
    `git clean -fdn -- ".agents/skills/${SKILL_NAME}/"`,
    repoDir,
  )
  // `Would remove <path>` 形式の行からパスのみを取り出す
  return out
    .trim()
    .split('\n')
    .filter(Boolean)
    .map((line) => line.replace(/^Would remove /, '').trim())
    .sort()
}

test('ケース1: upstream にファイルが増えた場合、プレビューが新規未追跡ファイルの内容を表示する', () => {
  const ctx = setupRepo('new-file')
  try {
    const out = runScript(ctx)

    assert.match(out, /新規（未追跡）ファイル/, '未追跡ファイルの見出しが出力されること')
    assert.match(out, /NEW_FILE\.md/, '新規ファイル名が出力に含まれること')
    assert.match(
      out,
      /brand new upstream file/,
      '新規ファイルの内容（diff --no-index の出力）が表示されること',
    )

    // プレビューの未追跡集合と git clean -fdn（拒否経路の対象集合）が一致することを確認する
    assert.deepEqual(
      cleanDryRunList(ctx.repoDir),
      [`.agents/skills/${SKILL_NAME}/NEW_FILE.md`],
    )

    // tracked diff も従来どおり表示されること（非退行）
    assert.match(out, /SKILL\.md/, 'tracked ファイルの diff も表示されること')
  } finally {
    rmSync(ctx.repoDir, { recursive: true, force: true })
    rmSync(ctx.binDir, { recursive: true, force: true })
  }
})

test('ケース2: 追跡ファイルの変更のみの場合、「新規（未追跡）ファイル: なし」と表示される（既存動作の非退行）', () => {
  const ctx = setupRepo('edit-only')
  try {
    const out = runScript(ctx)

    assert.match(out, /新規（未追跡）ファイル: なし/)
    // tracked diff（SKILL.md の変更）は従来どおり表示される
    assert.match(out, /updated upstream content/)

    // 未追跡ファイルが無いため、拒否経路（git clean -fdn）の対象も空になる
    assert.deepEqual(cleanDryRunList(ctx.repoDir), [])
  } finally {
    rmSync(ctx.repoDir, { recursive: true, force: true })
    rmSync(ctx.binDir, { recursive: true, force: true })
  }
})

test('ケース3: ファイル名に改行を含む未追跡ファイルでも、内容が省略されずに表示される（-z / NUL 区切りの回帰確認）', () => {
  const ctx = setupRepo('newline-file')
  try {
    const out = runScript(ctx)

    assert.match(out, /新規（未追跡）ファイル/, '未追跡ファイルの見出しが出力されること')
    assert.match(
      out,
      /newline file content/,
      '改行を含むファイル名の未追跡ファイルでも内容の diff が表示されること（改行区切り処理だと' +
        '存在しないパスへ分割され || true で握り潰されるため表示されない）',
    )

    // tracked diff も従来どおり表示されること（非退行）
    assert.match(out, /SKILL\.md/, 'tracked ファイルの diff も表示されること')
  } finally {
    rmSync(ctx.repoDir, { recursive: true, force: true })
    rmSync(ctx.binDir, { recursive: true, force: true })
  }
})

test('ケース4: 中身が空の新規ファイルでも、ファイル名がプレビューに明示される', () => {
  const ctx = setupRepo('empty-file')
  try {
    const out = runScript(ctx)

    assert.match(out, /新規（未追跡）ファイル/, '未追跡ファイルの見出しが出力されること')
    assert.match(
      out,
      /EMPTY_FILE\.md/,
      '空ファイルでも git diff --no-index の見出しだけに頼らずファイル名が明示されること',
    )

    // プレビューの未追跡集合と git clean -fdn（拒否経路の対象集合）が一致することを確認する
    assert.deepEqual(
      cleanDryRunList(ctx.repoDir),
      [`.agents/skills/${SKILL_NAME}/EMPTY_FILE.md`],
    )
  } finally {
    rmSync(ctx.repoDir, { recursive: true, force: true })
    rmSync(ctx.binDir, { recursive: true, force: true })
  }
})

test('ケース5: バイナリの未追跡ファイルは種別・サイズ・ハッシュが明示され、内容未確認のまま通過しない', () => {
  const ctx = setupRepo('binary-file')
  try {
    const out = runScript(ctx)

    assert.match(out, /新規（未追跡）ファイル/, '未追跡ファイルの見出しが出力されること')
    assert.match(out, /IMAGE\.bin/, 'バイナリファイル名が出力に含まれること')
    assert.match(
      out,
      // object format は repository 設定依存（既定 sha1: 40 桁 / 拡張 sha256: 64 桁）で
      // 出力桁数が変わるため、アルゴリズム名・桁数を固定せず表記の形だけを検証する。
      /バイナリファイル（内容は表示されません）: type=.+ size=\d+bytes git-blob-hash\([a-z0-9]+\)=[0-9a-f]{40,64}/,
      'git diff --no-index の "Binary files ... differ" だけに頼らず、種別・サイズ・' +
        'git blob ハッシュが明示されること',
    )
    assert.doesNotMatch(
      out,
      /Binary files .* differ/,
      '内容未確認のまま "Binary files ... differ" だけが出て終わらないこと',
    )

    // プレビューの未追跡集合と git clean -fdn（拒否経路の対象集合）が一致することを確認する
    assert.deepEqual(
      cleanDryRunList(ctx.repoDir),
      [`.agents/skills/${SKILL_NAME}/IMAGE.bin`],
    )
  } finally {
    rmSync(ctx.repoDir, { recursive: true, force: true })
    rmSync(ctx.binDir, { recursive: true, force: true })
  }
})

test('ケース6: upstream が新規サブディレクトリごとファイルを追加した場合、プレビューはファイルの' +
  'フルパスを列挙し、git clean -fdn とは粒度が一致しない（前方一致でのみ照合できる）', () => {
  const ctx = setupRepo('new-subdir')
  try {
    const out = runScript(ctx)

    assert.match(out, /新規（未追跡）ファイル/, '未追跡ファイルの見出しが出力されること')
    // プレビューは git ls-files ベースのため、ディレクトリではなく個々のファイルの
    // フルパスをそのまま列挙する（SKILL.md の手動回帰確認手順3が要求する挙動）
    assert.match(
      out,
      /references\/new\.md/,
      'サブディレクトリ配下のファイルもフルパスで一覧に出ること',
    )
    assert.match(out, /brand new upstream reference doc/, 'ファイル内容の diff も表示されること')

    // git clean -fdn は新規ディレクトリを個々のファイルではなく親ディレクトリ1行で
    // 報告する。行単位の完全一致ではプレビューと照合できないことを実測で示す
    // （SKILL.md 手順3が「一致」ではなく「前方一致」を要求する根拠）。
    const cleanList = cleanDryRunList(ctx.repoDir)
    assert.deepEqual(cleanList, [`.agents/skills/${SKILL_NAME}/references/`])
    assert.notDeepEqual(cleanList, [`.agents/skills/${SKILL_NAME}/references/new.md`])
    // 前方一致では照合できる
    assert.ok(
      cleanList.some((dir) => `.agents/skills/${SKILL_NAME}/references/new.md`.startsWith(dir)),
      'プレビューのファイルパスは git clean -fdn の報告した親ディレクトリで始まること',
    )
  } finally {
    rmSync(ctx.repoDir, { recursive: true, force: true })
    rmSync(ctx.binDir, { recursive: true, force: true })
  }
})

test('ケース7: git ls-files が失敗した場合、fail-open で「なし」と誤表示せずスクリプトが' +
  '非ゼロ終了し、tracked 分（skills-lock.json / SKILL.md）はリバートされるが、' +
  '未追跡ファイル（NEW_FILE.md）は destructive な git clean -fd を経ずに保全される' +
  '（codex P0 指摘の再修正: git ls-files が失敗している以上「何が npx の新規作成物か」' +
  'を安全に確定できないため、この状態で git clean -fd を実行すると checker / npx が' +
  '作成した唯一のコピーであり得る未追跡ファイルをバックアップなしで削除しデータ喪失に' +
  'なり得る。列挙が壊れている経路では削除系操作を一切行わず、tracked のみの非破壊的な' +
  '復元 + 手動復旧の案内に留める）', () => {
  const ctx = setupRepo('new-file')
  addGitLsFilesFailure(ctx.binDir)
  const newFile = join(ctx.repoDir, '.agents', 'skills', SKILL_NAME, 'NEW_FILE.md')
  try {
    assert.throws(
      () => runScript(ctx),
      (err) => {
        assert.notEqual(err.status, 0, '非ゼロ終了すること（fail-closed）')
        const combined = `${err.stdout ?? ''}${err.stderr ?? ''}`
        assert.match(
          combined,
          /git ls-files が失敗し/,
          '専用のエラーメッセージで停止すること',
        )
        assert.doesNotMatch(
          combined,
          /新規（未追跡）ファイル: なし/,
          '実際には未追跡ファイルが存在するのに「なし」と誤表示しないこと' +
            '（process substitution の終了コードが検査されない fail-open 回帰の再現）',
        )
        assert.match(
          combined,
          /git clean は実行していません/,
          '未追跡集合を安全に列挙できなかったため destructive cleanup をスキップした旨が' +
            '案内されること',
        )
        assert.match(
          combined,
          /git status --porcelain/,
          '手動確認手順（git status --porcelain 等）が案内されること',
        )
        return true
      },
    )

    // 未追跡ファイル（NEW_FILE.md。npx が新規作成したもの）は git clean -fd を経由しない
    // ため削除されず、内容もそのまま残ること（データ喪失防止が本修正の主眼）。
    assert.ok(
      existsSync(newFile),
      'git ls-files 失敗時は git clean -fd を実行しないため、未追跡ファイルが削除されず' +
        '残ること（destructive cleanup のスキップ）',
    )
    assert.equal(
      readFileSync(newFile, 'utf8'),
      'brand new upstream file\n',
      '残された未追跡ファイルの内容が変化していないこと',
    )

    // tracked 分（skills-lock.json の computedHash 更新・SKILL.md の上書き）は
    // git checkout --（tracked のみが対象で未追跡には触れない）でリバートされること。
    const lockDiff = sh('git status --porcelain -- skills-lock.json', ctx.repoDir).trim()
    assert.equal(lockDiff, '', 'skills-lock.json は tracked のためリバートされ clean であること')
    const skillMdDiff = sh(
      `git status --porcelain -- ".agents/skills/${SKILL_NAME}/SKILL.md"`,
      ctx.repoDir,
    ).trim()
    assert.equal(
      skillMdDiff,
      '',
      'SKILL.md は tracked のためリバートされ clean であること',
    )

    // ディレクトリ全体としては、削除されず残った未追跡の NEW_FILE.md 分だけ非 clean
    // であること（destructive cleanup をスキップした結果として正しい状態）。
    const treeStatus = sh(
      `git status --porcelain -- ".agents/skills/${SKILL_NAME}/"`,
      ctx.repoDir,
    ).trim()
    assert.equal(
      treeStatus,
      `?? .agents/skills/${SKILL_NAME}/NEW_FILE.md`,
      '未追跡の NEW_FILE.md のみが残り、他は clean であること',
    )
  } finally {
    rmSync(ctx.repoDir, { recursive: true, force: true })
    rmSync(ctx.binDir, { recursive: true, force: true })
  }
})
