// path-state-dirnames.test.mjs — PR #412 P1 の回帰テスト（dirnames 自身の
// mode 変更・ディレクトリ向け symlink の変更を状態シグネチャが見逃す件）。
//
// scripts/skills-lock-update.sh の path_state() は、ディレクトリ・gitlink を
// os.walk() で再帰走査して signature を作るが、`filenames` のみを集約対象にして
// `dirnames` 自身（配下ディレクトリの mode・ディレクトリ向け symlink のリンク先/
// mode）を含めていなかった。この場合:
//   - 配下ディレクトリの chmod（パーミッション変更）
//   - ディレクトリを指す symlink のリンク先変更・mode 変更
// のいずれも porcelain 記録・状態シグネチャの両方が前後不変に見え、fail-closed
// 検出をすり抜け得た（scope-guard.test.mjs のケース9〜11 が実運用経路（スクリプト
// 全体 + npx スタブ）で同クラスを検証し、このテストは path_state() 単体の
// シグネチャ性質を直接検証する）。
//
// scope-guard.test.mjs のように git status / npx スタブ経由で再現するには
// gitlink（submodule）の構築が必要で高コストなため、ここでは path_state() 関数
// 定義をスクリプトから抽出し、bash 標準入力へ流し込んで直接呼び出すことで、
// シグネチャが配下ディレクトリの mode・symlink 変更を反映することを検証する。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdtempSync, writeFileSync, mkdirSync, rmSync, chmodSync, symlinkSync, unlinkSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readFileSync } from 'node:fs'

const SCRIPT_PATH = join(
  dirname(fileURLToPath(import.meta.url)),
  '..', 'scripts', 'skills-lock-update.sh',
)

// スクリプト本体から `path_state() { ... }` の関数定義ブロックだけを抽出する。
// python3 ヒアドキュメント内にも `{` `}` を含む行があるため、開始行から
// 直後の `PYEOF` に続く最初の `}` 行までを機械的に切り出す（構文上、関数の
// 閉じ括弧は "PYEOF\n}" という並びで必ず現れる。SCRIPT の実装に依存する
// 抽出だが、version-pin.test.mjs と同様スクリプト側の変更を追随的に検知する
// ドリフト検知テストとして機能させる）。
function extractPathStateFunction(scriptContent) {
  const startIdx = scriptContent.indexOf('path_state() {')
  assert.notEqual(startIdx, -1, 'path_state() の定義が見つからない')
  const endMarker = "PYEOF\n}"
  const endIdx = scriptContent.indexOf(endMarker, startIdx)
  assert.notEqual(endIdx, -1, 'path_state() の終端（PYEOF の閉じ括弧）が見つからない')
  return scriptContent.slice(startIdx, endIdx + endMarker.length)
}

function callPathState(fnDef, targetPath) {
  const script = `${fnDef}\npath_state "$1"\n`
  return execFileSync('bash', ['-c', script, 'bash', targetPath], { encoding: 'utf8' }).trim()
}

test('path_state: 配下ディレクトリの chmod をシグネチャに反映する（PR #412 P1 の回帰）', () => {
  const fnDef = extractPathStateFunction(readFileSync(SCRIPT_PATH, 'utf8'))
  const root = mkdtempSync(join(tmpdir(), 'path-state-dir-mode-'))
  try {
    const subdir = join(root, 'subdir')
    mkdirSync(subdir)
    writeFileSync(join(subdir, 'file.txt'), 'unchanged content\n')

    const before = callPathState(fnDef, root)
    chmodSync(subdir, 0o700)
    const after = callPathState(fnDef, root)

    assert.notEqual(
      before,
      after,
      '配下ディレクトリの mode 変更（内容・ファイル一覧は不変）がシグネチャへ反映されるべき',
    )
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test('path_state: ディレクトリ向け symlink のリンク先変更をシグネチャに反映する（PR #412 P1 の回帰）', () => {
  const fnDef = extractPathStateFunction(readFileSync(SCRIPT_PATH, 'utf8'))
  const root = mkdtempSync(join(tmpdir(), 'path-state-dir-symlink-'))
  try {
    const targetA = join(root, 'target-a')
    const targetB = join(root, 'target-b')
    mkdirSync(targetA)
    mkdirSync(targetB)
    writeFileSync(join(targetA, 'a.txt'), 'a\n')
    writeFileSync(join(targetB, 'b.txt'), 'b\n')

    const linkPath = join(root, 'link-to-dir')
    symlinkSync('target-a', linkPath)

    const before = callPathState(fnDef, root)
    unlinkSync(linkPath)
    symlinkSync('target-b', linkPath)
    const after = callPathState(fnDef, root)

    assert.notEqual(
      before,
      after,
      'ディレクトリを指す symlink のリンク先変更がシグネチャへ反映されるべき' +
        '（followlinks=False で symlink 自身の中身までは辿らないため、リンク先文字列' +
        '・mode 自体を dirnames として記録する必要がある）',
    )
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test('path_state: ディレクトリ向け symlink 配下（リンク先の中身）は二重に取り込まない（非退行）', () => {
  const fnDef = extractPathStateFunction(readFileSync(SCRIPT_PATH, 'utf8'))
  const root = mkdtempSync(join(tmpdir(), 'path-state-dir-symlink-nofollow-'))
  try {
    const targetA = join(root, 'target-a')
    mkdirSync(targetA)
    writeFileSync(join(targetA, 'a.txt'), 'a\n')
    symlinkSync('target-a', join(root, 'link-to-dir'))

    const before = callPathState(fnDef, root)
    // symlink が指す先の中身だけを変更しても、target-a 側の filenames 走査で
    // 検出されるべきであり（symlink 経由の二重降下ではなく実体側の直接検出）、
    // これは既存の filenames 集約が担う（回帰していないことの確認）。
    writeFileSync(join(targetA, 'a.txt'), 'changed\n')
    const after = callPathState(fnDef, root)

    assert.notEqual(before, after, 'symlink の実体側ファイル内容変更は引き続き検出されるべき')
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})
