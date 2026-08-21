// restore-help-order.test.mjs — Issue #418 のフォローアップ回帰テスト。
//
// restore_help() はユーザー却下時の復元手順を stdout へ印字する案内文だが、従来は
// `git restore --staged --worktree` を先に案内し、未追跡ファイルの退避は「残る場合は
// 削除前に確認」という後段の注意書きに留まっていた。この順序で operator が実行すると、
// checker が git rm --cached で未追跡化・書き換えた skills-lock.json 等の「唯一の
// コピー」が退避されないまま snapshot の内容で無音に上書きされる — Issue #418 が修正
// した欠陥そのものが案内文経由で再現する。
//
// このテストは restore_help の関数本体をスクリプトから抽出して単体実行し、印字された
// 案内が SKILL.md の却下フェンスと同じ retreat-first(退避 → 復元 → 検証)の順序で
// あることを検証する。スクリプト全体を却下分岐まで走らせる必要はなく、案内文の順序
// 退行だけを軽量に検出する。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const SCRIPT_PATH = join(
  dirname(fileURLToPath(import.meta.url)),
  '..', 'scripts', 'skills-lock-update.sh',
)

// スクリプト本文から restore_help() の定義行〜対応する閉じ括弧行までを抽出する。
// 関数本体は echo のみで構成される前提(定義位置のインデント 2 で閉じる)。
function extractRestoreHelp() {
  const source = readFileSync(SCRIPT_PATH, 'utf8')
  const match = source.match(/^ {2}restore_help\(\) \{\n[\s\S]*?\n {2}\}/m)
  assert.ok(match, 'restore_help() の定義がスクリプトから抽出できること')
  return match[0]
}

test('restore_help は退避を worktree 復元より先に案内する(retreat-first)', () => {
  const fn = extractRestoreHelp()
  // 案内文が参照する変数を与えて関数を単体実行し、実際の印字内容で順序を判定する
  const out = execFileSync('bash', ['-c', `${fn}\nrestore_help`], {
    encoding: 'utf8',
    env: { ...process.env, SKILL_NAME: 'dummy-skill', PRE_SYNC_TREE: 'deadbeef' },
  })

  const lines = out.split('\n')
  const indexOfLine = (pattern, label) => {
    const i = lines.findIndex((l) => l.includes(pattern))
    assert.ok(i >= 0, `案内に「${label}」の行が含まれること: ${pattern}`)
    return i
  }

  // 退避手順(mktemp -d の退避先作成・未追跡列挙・mv による退避)が最初の
  // git restore --staged --worktree より前に印字されること
  const backupDirLine = indexOfLine('mktemp -d', '退避先ディレクトリ作成')
  const listLine = indexOfLine('git ls-files -z --others', '未追跡ファイル列挙')
  const mvLine = indexOfLine('mv -- ', 'mv による退避')
  const firstRestoreLine = indexOfLine(
    'git restore --staged --worktree',
    'index + worktree 復元',
  )
  assert.ok(
    backupDirLine < firstRestoreLine,
    '退避先ディレクトリ作成が worktree 復元より先に印字されること',
  )
  assert.ok(
    listLine < firstRestoreLine,
    '未追跡ファイル列挙が worktree 復元より先に印字されること',
  )
  assert.ok(
    mvLine < firstRestoreLine,
    'mv による退避が worktree 復元より先に印字されること',
  )

  // 退避失敗時に復元へ進まない fail-closed の案内が退避手順に含まれること
  assert.ok(out.includes('fail-closed'), '退避失敗時の fail-closed が案内されること')
  assert.ok(
    out.includes('退避失敗'),
    'mv 失敗時に中断する分岐(退避失敗)が案内に含まれること',
  )

  // 復元後検証(snapshot 基準の diff)が復元より後に案内されること
  const verifyLine = indexOfLine('git diff --cached deadbeef', '復元後検証')
  assert.ok(
    firstRestoreLine < verifyLine,
    '復元後検証が worktree 復元より後に印字されること',
  )
})
