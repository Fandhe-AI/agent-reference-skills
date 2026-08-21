// scope-guard.test.mjs — Issue #410 の回帰テスト。
//
// `npx skills add` は元来エージェント/パス制限なしに実行され、検出した各エージェント
// 向けツリー（`.claude/skills/` 等）へも書き込み得た。しかし clean ガード・プレビュー・
// リバート（Step 6 相当）・承認 `git add`（Step 7 相当）はいずれも `skills-lock.json` と
// `.agents/skills/<name>/` のみを対象としており、スコープ外への書き込みが発生すると
// (1) WIP 上書き、(2) レビュー（プレビュー）迂回、(3) 「clean と報告した後の dirty 残留」
// が起き得た。
//
// scripts/skills-lock-update.sh は 2 層で塞ぐ:
//   1. 書き込みスコープの制限（一次防御）: 固定版呼び出しへ `--agent universal` を追加
//   2. スコープ外書き込みの fail-closed 検出（多層防御）: npx 実行前後の
//      `git status --porcelain -z -uall` スナップショット差分でスコープ外変化を検出し、
//      検出時はスコープ内をリバートして停止・案内する
//
// npx の実クローン処理は行わず、preview-untracked.test.mjs と同じ方式で
// PATH 先頭に置いた npx / gh のスタブへ差し替える。シナリオは TEST_NPX_SCENARIO で
// 切り替える:
//   - 'out-of-scope-write'        : スコープ内変更に加えて .claude/skills/dummy-skill/SKILL.md
//                                   （他エージェントツリー相当）と .cursor/rules/x.md
//                                   （任意の別ツリー）を作成する
//   - 'invalid-agents'            : npx が「Invalid agents: ...」を出力して exit 0 する
//                                   （CLI バージョン更新で universal が無効化された場合の
//                                   silent no-op を再現する）
//   - 'content-overwrite-dirty'   : PR #412 レビュー指摘（P1）の回帰。実行前から M
//                                   （追跡・変更済み）だったスコープ外ファイルの内容
//                                   だけを、パス・ステータス文字を変えずに上書きする
//                                   （porcelain の記録だけでは検出できず、内容ハッシュ
//                                   比較でのみ検出できるケース）
//   - 'npx-failure-out-of-scope'  : PR #412 レビュー指摘（P1）の回帰。スコープ外へ
//                                   部分書き込みしたのち npx 自体が非ゼロ終了する
//                                   （失敗経路でも事後のスコープ外検査に到達する
//                                   ことを検証する）
//   - 'mode-change-dirty'         : PR #412 レビュー指摘（第3巡・P1）の回帰。実行前
//                                   から M だったスコープ外ファイルのパーミッション
//                                   のみを変更し内容は変えない（porcelain の記録・
//                                   内容ハッシュのいずれも前後不変に見え、モードを
//                                   含む状態シグネチャ比較でのみ検出できるケース）
//   - 'tee-failure'               : PR #412 CI 失敗指摘（P1）の回帰。npx 自体は
//                                   exit 0 で成功するが、その出力を保存する tee が
//                                   非ゼロ終了する（ディスク容量不足等）。
//                                   NPX_OUTPUT_FILE が不完全なまま「Invalid agents」
//                                   no-op 検知をすり抜けて誤って成功扱いになって
//                                   いないことを検証する。
//   - 'dir-chmod-out-of-scope'    : PR #412 レビュー指摘（P1）の回帰。スコープ外
//                                   ディレクトリの chmod のみを行う。git は
//                                   ディレクトリの mode を追跡しないため porcelain
//                                   の前後どちらにも現れず、リポジトリ全体の状態
//                                   シグネチャ（repo_state_signature）比較でのみ
//                                   検出できるケース
//   - 'dir-symlink-retarget'      : PR #412 レビュー指摘（P1）の回帰。実行前から
//                                   未追跡（??）だったディレクトリ向け symlink の
//                                   リンク先だけを付け替える（porcelain レコードは
//                                   前後とも同一の「?? パス」のままで、シグネチャ
//                                   比較でのみ検出できるケース）
//   - 'nested-content-overwrite'  : PR #412 レビュー指摘（P1）の回帰。実行前から
//                                   未追跡だったディレクトリ配下のファイル内容だけを
//                                   上書きする（porcelain レコードは前後とも同一の
//                                   「?? パス」のままで、配下ファイルの内容ハッシュを
//                                   含む全体シグネチャ比較でのみ検出できるケース）
//   - 'git-metadata-write'        : PR #412 レビュー指摘（第4巡・P1）の回帰。
//                                   .git/hooks/ へのフックファイル追加と .git/config
//                                   の書き換えを行う。`.git` を丸ごと prune すると
//                                   永続 Git メタデータの改変（フック仕込み・設定
//                                   改変）が署名から漏れるため、変動し得る領域のみの
//                                   限定 prune でこれを検出できることを検証する
//   - 'agents-dir-chmod'          : PR #412 レビュー指摘（第4巡・P1）の回帰。実行前
//                                   から存在する .agents ディレクトリ自身の chmod
//                                   のみを行う。.agents 自身を無条件 omit すると
//                                   検出できないため、「実行前に存在した場合は署名
//                                   対象」の条件付き omit でこれを検出できることを
//                                   検証する
//   - 'invalid-agents-partial-write' : PR #412 レビュー指摘（第5巡・P1）の回帰。
//                                   スコープ内 + スコープ外へ部分書き込みした後に
//                                   「Invalid agents」文言を出して exit 0 する CLI 版を
//                                   再現する（no-op 文言への依存は部分書き込みに対して
//                                   fail-open。no-op 検知分岐が直接 exit せず共通失敗
//                                   経路へ合流し、事後のスコープ外検出・スコープ内
//                                   リバートへ必ず到達することを検証する）
//   - 'post-status-failure'       : PR #412 レビュー指摘（第5巡・P1）の回帰。npx は
//                                   スコープ内書き込みに成功するが、実行後の
//                                   `git status --porcelain -z -uall`（2 回目の -uall
//                                   呼び出し）だけを git スタブで失敗させる。この経路
//                                   でもスコープ内リバートが走り非ゼロ終了することを
//                                   検証する
//   - 'symlink-scope-path'        : PR #412 レビュー指摘（第6巡・P0）の回帰。実行前から
//                                   .agents/skills/<name> がリポジトリ外を指す symlink に
//                                   なっているレイアウトを再現する（スコープ外検査は
//                                   許可先をパス文字列で走査除外するため、symlink 越しの
//                                   リポジトリ外書き込みはどの検査にも現れない。npx を
//                                   実行する前に lstat 検証で拒否することを検証する）
//   - 'git-refs-write'            : PR #412 レビュー指摘（第6巡・P0）の回帰。.git/refs
//                                   配下へ ref ファイルを追加する（.git の参照・
//                                   オブジェクト領域を prune していた旧実装では porcelain・
//                                   シグネチャのどちらにも現れず検出不能だった。prune を
//                                   index・lock のみへ縮小したことで検出できることを検証）
//   - 'ignored-residue-on-failure': Issue #413 残項目 + PR #412 Bugbot Medium の回帰。
//                                   npx がスコープ内へ .gitignore 対象ファイルを書いた後に
//                                   非ゼロ終了する。異常終了時に npx が新規作成した
//                                   ignored ファイルは残置されない一方、実行前から存在
//                                   した ignored ファイル（.DS_Store 等）は実行前
//                                   インベントリとの突き合わせで保全されることを検証
//   - 'midrun-symlink-swap'       : PR #412 レビュー指摘（第7巡・P0）の回帰。事前の
//                                   lstat 検査を通過した後、npx が実行中に許可先
//                                   ディレクトリごとリポジトリ外向き symlink へ置換して
//                                   リンク先へ書き込む（TOCTOU。実行後再検証 +
//                                   許可先要素自身の署名（prune-under）で検出し、
//                                   git clean がリンク先を削除しないことを検証する）
//   - 'first-install-symlink-agents': PR #412 レビュー指摘（第7巡・P0）の回帰。初回
//                                   インストール（実行前に .agents 不存在 = 親要素が
//                                   omit / 許可先が prune でシグネチャに現れない）で、
//                                   npx が .agents 自体をリポジトリ外向き symlink として
//                                   作成する。実行後再検証が fail-closed で拒否し、
//                                   リンク先への削除を行わないことを検証する
//   - 'preexisting-symlink-in-scope': PR #412 レビュー指摘（第12巡・P0-1）の回帰。許可先
//                                   ディレクトリ配下に実行前からリポジトリ外向き symlink が
//                                   存在するレイアウトを再現する（許可先配下は prune-under で
//                                   署名から除外されるため、npx がリンクを辿った外部書き込みは
//                                   前後比較に現れない。npx 実行前の find -type l 走査だけが
//                                   拒否できることを検証する）
//   - 'ignored-overwrite-success' : PR #412 レビュー指摘（第12巡・P0-2）の回帰。npx が
//                                   実行前から存在した ignored ファイル（.DS_Store）を
//                                   上書きして正常終了する。成功経路でバックアップとの
//                                   比較が変更を検出し、元の内容へ復元されたうえで同期
//                                   自体は完走することを検証する
//   - 'ignored-overwrite-on-failure': PR #412 レビュー指摘（第12巡・P0-2）の回帰。npx が
//                                   既存 ignored ファイルを上書きした後に非ゼロ終了する。
//                                   失敗経路（revert_in_scope）でもバックアップから復元
//                                   されることを検証する
//   - 'ignored-delete-success'    : PR #412 レビュー指摘（第12巡・P0-2）の回帰。npx が
//                                   既存 ignored ファイルを削除して正常終了する。削除も
//                                   「変化」としてバックアップから書き戻されることを検証する
//   - 'config-lock-residue'       : PR #412 codex P1 指摘の回帰。npx が永続 lock
//                                   （.git/config.lock）を残して正常終了する。
//                                   `.git/*.lock` のワイルドカード prune では署名から
//                                   漏れていたケースで、prune を .git/index.lock の
//                                   完全一致へ限定したことで検出できることを検証する
//   - 'skip-worktree-flip'        : PR #412 codex P1 指摘の回帰。npx がスコープ外の
//                                   tracked ファイルへ `git update-index --skip-worktree`
//                                   を付ける（.git/index のみが変わり、ツリー署名・
//                                   porcelain のどちらにも現れない。index の論理状態
//                                   比較（index_state_signature）でのみ検出できる）
//   - 'midrun-nested-symlink'     : PR #412 Bugbot High 指摘の回帰。事前走査（0 件）を
//                                   通過した後、npx が実行中に許可先配下へリポジトリ外
//                                   向き symlink を作成してリンク先へ書き込む（TOCTOU。
//                                   実行後の find -type l 再走査が検出し、許可先配下への
//                                   削除系操作をスキップして停止することを検証する）
//   - 'restore-parent-symlink-swap': PR #412 Bugbot Medium 指摘の回帰。既存 ignored
//                                   ファイルの中間ディレクトリを npx がリポジトリ外向き
//                                   symlink へ置換する。復元の makedirs がリンク先
//                                   （リポジトリ外）へディレクトリを作らないことを検証する
//   - 'restore-parent-dir-deleted': 非退行。npx が既存 ignored ファイルを中間ディレクトリ
//                                   ごと削除する。復元が中間ディレクトリを 1 階層ずつ
//                                   検証しながら再作成して書き戻すことを検証する
//                                   （make_parent_dirs の正常系）
//   - 'first-install'             : 非退行。実行前に .agents ツリー自体が存在しない
//                                   初回インストールで、npx が .agents/skills/<name>
//                                   を新規作成しても誤検知せず完走することを検証する
//                                   （.agents / .agents/skills は実行前に不存在だった
//                                   場合のみ omit される）
//   - 'linked-worktree'           : PR #412 codex P0 指摘の回帰。git worktree add で
//                                   作った linked worktree 内でスクリプトを実行する
//                                   （実 Git ディレクトリが状態署名の対象外になり、
//                                   npx による共有リポジトリの参照改変を検出できない
//                                   ため、npx を実行する前に worktree 検証が拒否する
//                                   ことを検証する。npx スタブは呼ばれない）
//   - 'separate-git-dir'          : PR #412 Bugbot High 指摘の回帰。.git を作業ツリー外の
//                                   実ディレクトリへ移し gitfile（gitdir: 参照）に
//                                   差し替えた構成（git clone --separate-git-dir 相当）で
//                                   実行する（git-dir と common-dir は一致するため
//                                   linked worktree 検証は通過するが、実 Git ディレクトリが
//                                   署名対象外になるため、npx を実行する前に
//                                   「作業ツリー直下の .git 実体ディレクトリ」検証が
//                                   拒否することを検証する。npx スタブは呼ばれない）
//   - 'git-dir-symlink'           : PR #412 Bugbot High 指摘の回帰。.git を作業ツリー外の
//                                   実ディレクトリへの symlink に置換した構成で実行する
//                                   （'separate-git-dir' と同じ検出不能構成。lstat 検証が
//                                   npx を実行する前に拒否することを検証する。
//                                   npx スタブは呼ばれない）
//   - 'lockfile-symlink-preexisting': PR #412 codex P0 指摘の回帰。skills-lock.json が
//                                   実行前からリポジトリ外向き symlink になっている
//                                   （symlink としてコミット済みのため clean ガードは
//                                   通過する）レイアウトを再現する。skills-lock.json は
//                                   署名の prune・porcelain フィルタの双方から除外される
//                                   ため、npx 実行前の lstat 検証だけが拒否できることを
//                                   検証する（npx スタブは呼ばれない）
//   - 'midrun-lockfile-symlink-swap': PR #412 codex P0 指摘の回帰。事前の lstat 検査を
//                                   通過した後、npx が実行中に skills-lock.json を
//                                   リポジトリ外向き symlink へ置換する（TOCTOU。実行後の
//                                   再検証（verify_lock_file_after_run）が検出し、復元が
//                                   リンク先へ書き込まず symlink を除去して regular file を
//                                   書き戻すことを検証する）
// git / jq / python3 は実物を使用する（ネットワーク不使用）。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdtempSync, writeFileSync, chmodSync, mkdirSync, rmSync, existsSync, readFileSync, statSync, lstatSync, symlinkSync, readlinkSync, renameSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const SCRIPT_PATH = join(
  dirname(fileURLToPath(import.meta.url)),
  '..', 'scripts', 'skills-lock-update.sh',
)

const SKILL_NAME = 'dummy-skill'
const SOURCE_REPO = 'Fandhe-AI/dummy-source'
// 'content-overwrite-dirty' / 'npx-failure-out-of-scope' シナリオで使う、
// 実行前から追跡・変更済み（M）にしておくスコープ外ファイルのパス。
const OUT_OF_SCOPE_FILE = '.claude/skills/other-skill/NOTES.md'

function sh(cmd, cwd, env) {
  return execFileSync('bash', ['-c', cmd], { cwd, env, encoding: 'utf8' })
}

// npx / gh スタブと、シナリオを注入した git repo 一式を用意する。
// ARGV_LOG_FILE には npx スタブが実際に受け取った引数を1行1トークンで記録し、
// --agent universal が実行経路に到達していることを静的テストとは別に検証する。
function setupRepo(scenario) {
  const repoDir = mkdtempSync(join(tmpdir(), 'sync-skills-lock-scope-test-'))
  const binDir = mkdtempSync(join(tmpdir(), 'sync-skills-lock-scope-bin-'))
  const argvLogFile = join(binDir, 'npx-argv.log')
  // 'midrun-symlink-swap' / 'first-install-symlink-agents' で symlink の指す先になる
  // リポジトリ外の実ディレクトリ（ここへの書き込み・削除の有無を検証する）。
  const externalTargetDir = join(binDir, 'external-target')

  writeFileSync(join(binDir, 'gh'), '#!/usr/bin/env bash\nexit 0\n')
  chmodSync(join(binDir, 'gh'), 0o755)

  const npxBody = `#!/usr/bin/env bash
set -euo pipefail
# 受け取った引数をそのまま1行1トークンで記録する（--agent universal 到達の検証用）
printf '%s\\n' "\$@" > "${argvLogFile}"

if [[ "\${TEST_NPX_SCENARIO:-}" == "invalid-agents" ]]; then
  # CLI バージョン更新で universal が無効な agent id になった場合の実測挙動
  # （skills@1.5.22 で確認済み: エラー表示のうえ exit 0 の no-op）。
  echo "Invalid agents: universal"
  echo "Valid agents: claude-code, cursor, ..."
  exit 0
fi

skill_dir=".agents/skills/${SKILL_NAME}"
if [[ "\${TEST_NPX_SCENARIO:-}" == "first-install-symlink-agents" ]]; then
  # 初回インストールで npx が .agents 自体をリポジトリ外向き symlink として作成する
  # ケースを再現する（以降の generic 書き込みは symlink 経由でリンク先へ落ちる）。
  mkdir -p "${externalTargetDir}/skills"
  ln -s "${externalTargetDir}" ".agents"
fi
# 'first-install' シナリオでは実行前に .agents ツリーが存在しないため、実物の
# npx skills add と同様に親ディレクトリごと作成する（既存時は no-op）。
mkdir -p "\${skill_dir}"
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

if [[ "\${TEST_NPX_SCENARIO:-}" == "out-of-scope-write" ]]; then
  # スコープ外（他エージェントツリー相当 + 任意の別ツリー）への書き込みを再現する
  mkdir -p ".claude/skills/${SKILL_NAME}"
  echo "leaked into claude tree" > ".claude/skills/${SKILL_NAME}/SKILL.md"
  mkdir -p ".cursor/rules"
  echo "leaked into cursor tree" > ".cursor/rules/x.md"
fi

if [[ "\${TEST_NPX_SCENARIO:-}" == "content-overwrite-dirty" ]]; then
  # 実行前から M（追跡・変更済み）だったスコープ外ファイルを、パス・ステータス文字は
  # 変えずに内容だけ上書きする（porcelain のレコードだけでは前後不変に見えるケース）。
  echo "npx overwrote this content" > "${OUT_OF_SCOPE_FILE}"
fi

if [[ "\${TEST_NPX_SCENARIO:-}" == "npx-failure-out-of-scope" ]]; then
  # スコープ内書き込み（上の python ブロック）に加えてスコープ外へも部分書き込み
  # したのち、npx 自体が失敗するケースを再現する。
  echo "npx overwrote this content during failure" > "${OUT_OF_SCOPE_FILE}"
  exit 1
fi

if [[ "\${TEST_NPX_SCENARIO:-}" == "mode-change-dirty" ]]; then
  # 実行前から M（追跡・変更済み）だったスコープ外ファイルの内容は変えず、
  # パーミッションのみを変更する（chmod 等での実行可能スクリプトコピーを再現）。
  chmod 755 "${OUT_OF_SCOPE_FILE}"
fi

if [[ "\${TEST_NPX_SCENARIO:-}" == "dir-chmod-out-of-scope" ]]; then
  # スコープ外ディレクトリ自身の chmod のみ（配下・内容は不変）。git は
  # ディレクトリの mode を追跡しないため porcelain には一切現れない。
  chmod 700 ".claude/skills/other-skill"
fi

if [[ "\${TEST_NPX_SCENARIO:-}" == "dir-symlink-retarget" ]]; then
  # 実行前から ?? だったディレクトリ向け symlink のリンク先だけを付け替える
  # （porcelain レコードは「?? .claude/wip-link」のまま前後不変）。
  rm ".claude/wip-link"
  ln -s "wip-target-b" ".claude/wip-link"
fi

if [[ "\${TEST_NPX_SCENARIO:-}" == "nested-content-overwrite" ]]; then
  # 実行前から未追跡だったディレクトリ配下のファイル内容だけを上書きする
  # （porcelain レコードは「?? .claude/wip-dir/notes.md」のまま前後不変）。
  echo "npx overwrote nested wip" > ".claude/wip-dir/notes.md"
fi

if [[ "\${TEST_NPX_SCENARIO:-}" == "git-metadata-write" ]]; then
  # 永続 Git メタデータへの改変（フック仕込み + 設定書き換え）を再現する。
  # .git 配下は porcelain に一切現れないため、シグネチャ比較でのみ検出できる。
  printf '#!/bin/sh\\necho pwned\\n' > ".git/hooks/post-checkout"
  chmod 755 ".git/hooks/post-checkout"
  printf '[alias]\\n\\tpwned = status\\n' >> ".git/config"
fi

if [[ "\${TEST_NPX_SCENARIO:-}" == "invalid-agents-partial-write" ]]; then
  # 部分書き込み（上のスコープ内書き込みに加えてスコープ外へも書く）の後に
  # 「Invalid agents」文言を出して exit 0 する CLI 版を再現する。文言だけを見て
  # 直接 exit すると、この残置がまったく検査・リバートされない（fail-open）。
  echo "npx overwrote this content during noop-claim" > "${OUT_OF_SCOPE_FILE}"
  echo "Invalid agents: universal"
  exit 0
fi

if [[ "\${TEST_NPX_SCENARIO:-}" == "git-refs-write" ]]; then
  # .git の参照領域への書き込み（履歴・参照の改変）を再現する。porcelain には一切
  # 現れず、refs を prune していた旧実装ではシグネチャにも現れなかったケース。
  mkdir -p ".git/refs/heads"
  printf '%s\\n' "0000000000000000000000000000000000000000" > ".git/refs/heads/injected-evil"
fi

if [[ "\${TEST_NPX_SCENARIO:-}" == "ignored-residue-on-failure" ]]; then
  # スコープ内へ .gitignore 対象ファイル（*.log）を書いた後に npx 自体が失敗する。
  # revert_in_scope が -x なしの git clean だとこのファイルだけ残置される。
  echo "npx debug output" > ".agents/skills/${SKILL_NAME}/debug.log"
  exit 1
fi

if [[ "\${TEST_NPX_SCENARIO:-}" == "midrun-symlink-swap" ]]; then
  # 事前 lstat 検査（実行前）を通過した後、実行中に許可先ディレクトリごと
  # リポジトリ外向き symlink へ置換し、リンク先へ書き込む（TOCTOU の再現）。
  rm -rf "\${skill_dir}"
  mkdir -p "${externalTargetDir}"
  ln -s "${externalTargetDir}" "\${skill_dir}"
  echo "leaked outside repo" > "\${skill_dir}/leaked.md"
fi

if [[ "\${TEST_NPX_SCENARIO:-}" == "ignored-overwrite-success" || "\${TEST_NPX_SCENARIO:-}" == "ignored-overwrite-on-failure" ]]; then
  # 実行前から存在した ignored ファイル（.DS_Store）の内容だけを上書きする。
  # 許可先配下は署名から除外されるため、シグネチャ比較には現れないケース。
  echo "npx clobbered ignored metadata" > ".agents/skills/${SKILL_NAME}/.DS_Store"
fi

if [[ "\${TEST_NPX_SCENARIO:-}" == "ignored-overwrite-on-failure" ]]; then
  exit 1
fi

if [[ "\${TEST_NPX_SCENARIO:-}" == "ignored-delete-success" ]]; then
  # 実行前から存在した ignored ファイルの削除を再現する（porcelain・シグネチャの
  # どちらにも現れず、実行前バックアップとの比較でのみ検出できる）。
  rm ".agents/skills/${SKILL_NAME}/.DS_Store"
fi

if [[ "\${TEST_NPX_SCENARIO:-}" == "ignored-restore-failure-on-success" ]]; then
  # npx 自体は成功するが、実行前から存在した ignored ファイル（.DS_Store）を
  # 同名のディレクトリへ置換する（symlink は使わない。実行後の許可先配下 symlink
  # 走査には現れず、restore_preexisting_ignored 内の os.unlink がディレクトリに
  # 対して IsADirectoryError で失敗する経路だけを単離して再現する）。
  rm ".agents/skills/${SKILL_NAME}/.DS_Store"
  mkdir -p ".agents/skills/${SKILL_NAME}/.DS_Store"
fi

if [[ "\${TEST_NPX_SCENARIO:-}" == "config-lock-residue" ]]; then
  # 永続 lock の残置を再現する（.git/*.lock のワイルドカード prune では署名から
  # 漏れていたケース。index.lock のみの完全一致 prune で検出できることを検証）。
  : > ".git/config.lock"
fi

if [[ "\${TEST_NPX_SCENARIO:-}" == "skip-worktree-flip" ]]; then
  # スコープ外の tracked ファイルへ skip-worktree ビットを立てる。.git/index のみが
  # 変わるため、index の論理状態比較（index_state_signature）でのみ検出できる。
  git update-index --skip-worktree "${OUT_OF_SCOPE_FILE}"
fi

if [[ "\${TEST_NPX_SCENARIO:-}" == "midrun-nested-symlink" ]]; then
  # 事前走査（0 件）通過後、実行中に許可先配下へ外向き symlink を作成して
  # リンク先へ書き込む（TOCTOU の再現。実行後再走査だけが検出できる）。
  mkdir -p "${externalTargetDir}"
  ln -s "${externalTargetDir}" "\${skill_dir}/evil-link"
  echo "leaked via nested link" > "\${skill_dir}/evil-link/leaked.md"
fi

if [[ "\${TEST_NPX_SCENARIO:-}" == "restore-parent-symlink-swap" ]]; then
  # 既存 ignored ファイル（meta/sub/.DS_Store）の中間ディレクトリごと削除し、
  # meta をリポジトリ外向き symlink へ置換する。復元の makedirs がリンクを辿ると
  # リンク先（リポジトリ外）に sub/ が作られてしまうケースの再現。
  rm -rf "\${skill_dir}/meta"
  mkdir -p "${externalTargetDir}"
  ln -s "${externalTargetDir}" "\${skill_dir}/meta"
fi

if [[ "\${TEST_NPX_SCENARIO:-}" == "restore-parent-dir-deleted" ]]; then
  # 既存 ignored ファイルを中間ディレクトリごと削除する（symlink なし）。復元が
  # 中間ディレクトリを再作成して書き戻す正常系の再現。
  rm -rf "\${skill_dir}/meta"
fi

if [[ "\${TEST_NPX_SCENARIO:-}" == "agents-dir-chmod" ]]; then
  # 実行前から存在する .agents ディレクトリ自身の chmod のみ（配下・内容は不変）。
  # git はディレクトリの mode を追跡しないため porcelain には現れない。
  chmod 700 ".agents"
fi

if [[ "\${TEST_NPX_SCENARIO:-}" == "midrun-lockfile-symlink-swap" ]]; then
  # 事前 lstat 検査（実行前）を通過した後、実行中に skills-lock.json をリポジトリ外
  # 向き symlink へ置換する（TOCTOU の再現。skills-lock.json は署名・porcelain の
  # 双方からパスで除外されるため、実行後の lstat 再検証だけが検出できる）。
  rm -f skills-lock.json
  ln -s "${externalTargetDir}/victim-lock.json" skills-lock.json
fi
exit 0
`
  writeFileSync(join(binDir, 'npx'), npxBody)
  chmodSync(join(binDir, 'npx'), 0o755)

  // tee スタブ。既定は `command -p tee`（ユーザー PATH に依存しない標準ユーティリティ
  // 探索）で実物 tee の絶対パスを解決してから exec する（実物と同じ動作）。
  // TEST_NPX_SCENARIO=='tee-failure' のときのみ、入力を破棄したうえで非ゼロ終了し、
  // ディスク容量不足等での tee 失敗を再現する（Issue #410 CI 失敗指摘の回帰）。
  // `exec command -p tee "$@"` は使わない: POSIX では `command` は special builtin
  // ではないため、`exec` に builtin 名をそのまま渡すと厳密な POSIX 準拠シェルは
  // それを外部実行ファイル名として PATH 探索し `exec: command: not found` で失敗する
  // （bash は非 POSIX モードでは慣習的に許容するが、CI 環境で実際に発生した回帰）。
  // `command -v` で実物 tee の絶対パスを先に文字列として解決し、その絶対パスを
  // exec することで builtin 名を exec の引数に渡す経路自体を無くす。
  const teeBody = `#!/usr/bin/env bash
if [[ "\${TEST_NPX_SCENARIO:-}" == "tee-failure" ]]; then
  cat > /dev/null
  exit 1
fi
REAL_TEE="\$(command -p -v tee)"
exec "\${REAL_TEE}" "\$@"
`
  writeFileSync(join(binDir, 'tee'), teeBody)
  chmodSync(join(binDir, 'tee'), 0o755)

  // git スタブ。既定は実物 git（テストプロセスの PATH で解決した絶対パス）へ
  // そのまま exec する。TEST_NPX_SCENARIO=='post-status-failure' のときのみ、
  // `-uall` を含む status 呼び出し（スクリプトの前後スナップショット取得は
  // この 2 回だけ）の 2 回目（= npx 実行後）を失敗させ、実行後 git status の
  // 取得失敗を再現する（PR #412 第5巡 P1 の回帰）。リバート用の
  // git checkout / git clean は実物へ素通しされるため、この経路でスコープ内
  // リバートが実際に機能するかを end-to-end で検証できる。
  const realGit = execFileSync('bash', ['-c', 'command -v git'], { encoding: 'utf8' }).trim()
  const gitCountFile = join(binDir, 'git-uall-count')
  const gitBody = `#!/usr/bin/env bash
if [[ "\${TEST_NPX_SCENARIO:-}" == "post-status-failure" ]]; then
  has_uall=0
  for a in "\$@"; do
    if [[ "\$a" == "-uall" ]]; then has_uall=1; fi
  done
  if [[ "\$has_uall" -eq 1 ]]; then
    n="\$(cat "${gitCountFile}" 2>/dev/null || echo 0)"
    n=\$((n + 1))
    printf '%s\\n' "\$n" > "${gitCountFile}"
    if [[ "\$n" -ge 2 ]]; then
      echo "fatal: simulated post-run status failure" >&2
      exit 128
    fi
  fi
fi
exec "${realGit}" "\$@"
`
  writeFileSync(join(binDir, 'git'), gitBody)
  chmodSync(join(binDir, 'git'), 0o755)

  sh('git init -q', repoDir)
  sh('git config user.email test@example.com', repoDir)
  sh('git config user.name test', repoDir)

  // 'first-install' / 'first-install-symlink-agents' 用: 実行前に .agents ツリー自体が
  // 存在しない状態を再現するため、union ストアの事前作成をスキップする（npx スタブが
  // 新規作成する）。'symlink-scope-path' も実ディレクトリの事前作成をスキップする
  // （下で symlink を作る）。
  if (
    scenario !== 'first-install' &&
    scenario !== 'first-install-symlink-agents' &&
    scenario !== 'symlink-scope-path'
  ) {
    mkdirSync(join(repoDir, '.agents', 'skills', SKILL_NAME), { recursive: true })
    writeFileSync(
      join(repoDir, '.agents', 'skills', SKILL_NAME, 'SKILL.md'),
      'original content\n',
    )
  }
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
  // 'lockfile-symlink-preexisting' 用: skills-lock.json をリポジトリ外の実ファイルへ
  // 向けた symlink に置き換える（リンク先は有効な lock JSON。source 照合・computedHash
  // 表示は symlink を辿って通過し、clean ガードも symlink としてコミットするため通過
  // する）。lstat 検証（npx 実行前）だけがこのレイアウトを拒否できる。
  // 'midrun-lockfile-symlink-swap' 用: npx スタブが置換後のリンク先にする外部実ファイル
  // （victim-lock.json）を用意し、リンク先が書き換えられないことを検証できるようにする。
  if (scenario === 'lockfile-symlink-preexisting') {
    const externalLock = join(binDir, 'external-lock.json')
    renameSync(join(repoDir, 'skills-lock.json'), externalLock)
    symlinkSync(externalLock, join(repoDir, 'skills-lock.json'))
  }
  if (scenario === 'midrun-lockfile-symlink-swap') {
    mkdirSync(externalTargetDir, { recursive: true })
    writeFileSync(join(externalTargetDir, 'victim-lock.json'), 'external victim content\n')
  }

  // 'content-overwrite-dirty' / 'npx-failure-out-of-scope' / 'mode-change-dirty' 用:
  // スコープ外ファイルを baseline content でコミットしてから、コミット後に別内容へ
  // 書き換えて「実行前から M（追跡・変更済み）だった」状態を再現する。npx スタブは
  // 同じパス・同じ M ステータスのまま内容またはパーミッションをさらに上書きする。
  if (
    scenario === 'content-overwrite-dirty' ||
    scenario === 'npx-failure-out-of-scope' ||
    scenario === 'invalid-agents-partial-write' ||
    scenario === 'mode-change-dirty'
  ) {
    const outOfScopePath = join(repoDir, ...OUT_OF_SCOPE_FILE.split('/'))
    mkdirSync(dirname(outOfScopePath), { recursive: true })
    writeFileSync(outOfScopePath, 'baseline content\n')
    sh('git add -A && git commit -q -m init', repoDir)
    writeFileSync(outOfScopePath, 'pre-existing wip edit (uncommitted)\n')
    return { repoDir, binDir, scenario, argvLogFile, externalTargetDir }
  }

  // 'dir-chmod-out-of-scope' 用: スコープ外ディレクトリを clean な追跡状態で用意する
  // （ディレクトリの chmod は porcelain に現れないため、dirty 化は不要。追跡ファイルを
  // 1つ置くことでディレクトリ自体を確実に具現化してからコミットする）。
  // 'skip-worktree-flip' も同じ形（clean な追跡ファイル）を使う: skip-worktree ビットは
  // porcelain・ツリー署名のどちらにも現れず、index の論理状態比較だけが検出できる。
  if (scenario === 'dir-chmod-out-of-scope' || scenario === 'skip-worktree-flip') {
    const outOfScopePath = join(repoDir, ...OUT_OF_SCOPE_FILE.split('/'))
    mkdirSync(dirname(outOfScopePath), { recursive: true })
    writeFileSync(outOfScopePath, 'baseline content\n')
    sh('git add -A && git commit -q -m init', repoDir)
    return { repoDir, binDir, scenario, argvLogFile, externalTargetDir }
  }

  // 'symlink-scope-path' 用: 許可先 .agents/skills/<name> をリポジトリ外
  // （binDir 配下の実ディレクトリ）へ向けた symlink として作成し、コミットして
  // per-skill clean ガードを通過する状態にする。スコープ外検査は許可先をパス文字列で
  // 走査除外するため、このレイアウトは lstat 検証（npx 実行前）だけが拒否できる。
  if (scenario === 'symlink-scope-path') {
    const externalTarget = join(binDir, 'external-skill-store')
    mkdirSync(externalTarget, { recursive: true })
    mkdirSync(join(repoDir, '.agents', 'skills'), { recursive: true })
    symlinkSync(externalTarget, join(repoDir, '.agents', 'skills', SKILL_NAME))
  }

  // 'ignored-residue-on-failure' 用: *.log / .DS_Store を ignore する .gitignore を
  // コミットに含め、npx スタブが書く debug.log がスコープ内の .gitignore 対象ファイルに
  // なるようにする。加えて「実行前から存在した ignored ファイル」（.DS_Store）を
  // 許可先配下へ置き、abort 時のリバートで巻き添え削除されない（実行前インベントリで
  // 保全される）ことを検証できるようにする（PR #412 Bugbot Medium 指摘）。
  // ignored のため per-skill clean ガード（porcelain）は通過する。
  if (
    scenario === 'ignored-residue-on-failure' ||
    scenario === 'ignored-overwrite-success' ||
    scenario === 'ignored-overwrite-on-failure' ||
    scenario === 'ignored-delete-success' ||
    scenario === 'ignored-restore-failure-on-success'
  ) {
    writeFileSync(join(repoDir, '.gitignore'), '*.log\n.DS_Store\n')
    writeFileSync(
      join(repoDir, '.agents', 'skills', SKILL_NAME, '.DS_Store'),
      'pre-existing finder metadata\n',
    )
  }

  // 'restore-parent-symlink-swap' / 'restore-parent-dir-deleted' 用: 既存 ignored
  // ファイルを中間ディレクトリ（meta/sub/）付きで許可先配下へ置く。npx スタブが
  // meta を削除（+ 外向き symlink へ置換）した後の復元経路で、makedirs 相当が
  // リポジトリ外へディレクトリを作らないこと / 正当な再作成が機能することを検証する。
  if (
    scenario === 'restore-parent-symlink-swap' ||
    scenario === 'restore-parent-dir-deleted'
  ) {
    writeFileSync(join(repoDir, '.gitignore'), '.DS_Store\n')
    mkdirSync(join(repoDir, '.agents', 'skills', SKILL_NAME, 'meta', 'sub'), { recursive: true })
    writeFileSync(
      join(repoDir, '.agents', 'skills', SKILL_NAME, 'meta', 'sub', '.DS_Store'),
      'pre-existing nested finder metadata\n',
    )
  }

  // 'preexisting-symlink-in-scope' 用: 許可先ディレクトリ配下（ルート 3 要素の lstat
  // 検証では見えない深さ）にリポジトリ外向き symlink を置いてコミットする。許可先
  // 配下は prune-under で署名から除外されるため、npx 実行前の find -type l 走査だけが
  // このレイアウトを拒否できる。
  if (scenario === 'preexisting-symlink-in-scope') {
    const externalTarget = join(binDir, 'external-skill-store')
    mkdirSync(externalTarget, { recursive: true })
    symlinkSync(externalTarget, join(repoDir, '.agents', 'skills', SKILL_NAME, 'evil-link'))
  }

  sh('git add -A && git commit -q -m init', repoDir)

  // 'dir-symlink-retarget' 用: コミット後に未追跡（??）のディレクトリ向け symlink を
  // 作り「実行前から ?? だった」状態を再現する。npx スタブはリンク先だけを
  // wip-target-b へ付け替える（porcelain レコードは前後不変）。
  if (scenario === 'dir-symlink-retarget') {
    mkdirSync(join(repoDir, '.claude', 'wip-target-a'), { recursive: true })
    mkdirSync(join(repoDir, '.claude', 'wip-target-b'), { recursive: true })
    symlinkSync('wip-target-a', join(repoDir, '.claude', 'wip-link'))
  }

  // 'nested-content-overwrite' 用: コミット後に未追跡ディレクトリ配下のファイルを
  // 作り「実行前から ?? だった」状態を再現する。npx スタブは同じパスの内容だけを
  // 上書きする（porcelain レコードは前後不変）。
  if (scenario === 'nested-content-overwrite') {
    mkdirSync(join(repoDir, '.claude', 'wip-dir'), { recursive: true })
    writeFileSync(join(repoDir, '.claude', 'wip-dir', 'notes.md'), 'pre-existing nested wip\n')
  }

  return { repoDir, binDir, scenario, argvLogFile, externalTargetDir }
}

// cwdOverride は 'linked-worktree' シナリオ専用: メイン worktree（repoDir）ではなく
// git worktree add で作った作業ツリーからスクリプトを実行するために使う。
function runScript({ repoDir, binDir, scenario }, cwdOverride) {
  const env = {
    ...process.env,
    PATH: `${binDir}:${process.env.PATH}`,
    TEST_NPX_SCENARIO: scenario,
  }
  return execFileSync('bash', [SCRIPT_PATH, SKILL_NAME, SOURCE_REPO], {
    cwd: cwdOverride ?? repoDir,
    env,
    encoding: 'utf8',
  })
}

test('ケース1: npx が --agent universal を実際に受け取る（argv 記録による実行経路検証）', () => {
  const ctx = setupRepo('edit-only-for-argv-check')
  try {
    runScript(ctx)
    const argv = readFileSync(ctx.argvLogFile, 'utf8').split('\n').filter(Boolean)
    assert.ok(
      argv.includes('--agent') && argv.includes('universal'),
      `--agent universal が npx へ渡されていない: ${JSON.stringify(argv)}`,
    )
  } finally {
    rmSync(ctx.repoDir, { recursive: true, force: true })
    rmSync(ctx.binDir, { recursive: true, force: true })
  }
})

test('ケース2: スコープ外書き込みを検出すると非ゼロ終了し、スコープ内はリバートされ、' +
  'スコープ外は削除されずに残る', () => {
  const ctx = setupRepo('out-of-scope-write')
  try {
    assert.throws(
      () => runScript(ctx),
      (err) => {
        assert.notEqual(err.status, 0, '非ゼロ終了すること（fail-closed）')
        const combined = `${err.stdout ?? ''}${err.stderr ?? ''}`
        assert.match(combined, /スコープ外/, 'スコープ外検出のエラーメッセージが出ること')
        assert.match(combined, /\.claude\/skills/, '検出パスが列挙されること（.claude 側）')
        assert.match(combined, /\.cursor\/rules/, '検出パスが列挙されること（.cursor 側）')
        return true
      },
    )

    // スコープ内（skills-lock.json / .agents/skills/<name>/）はリバートされ clean
    const lockDiff = sh(`git status --porcelain -- skills-lock.json`, ctx.repoDir).trim()
    assert.equal(lockDiff, '', 'skills-lock.json はリバートされ clean であること')
    const treeDiff = sh(
      `git status --porcelain -- ".agents/skills/${SKILL_NAME}/"`,
      ctx.repoDir,
    ).trim()
    assert.equal(treeDiff, '', '.agents/skills/<name>/ はリバートされ clean であること')

    // スコープ外は自動リバートせず、内容を確認できる状態のまま残す
    assert.ok(
      existsSync(join(ctx.repoDir, '.claude', 'skills', SKILL_NAME, 'SKILL.md')),
      'スコープ外ファイル（.claude 側）は削除されず残存すること',
    )
    assert.ok(
      existsSync(join(ctx.repoDir, '.cursor', 'rules', 'x.md')),
      'スコープ外ファイル（.cursor 側）は削除されず残存すること',
    )
  } finally {
    rmSync(ctx.repoDir, { recursive: true, force: true })
    rmSync(ctx.binDir, { recursive: true, force: true })
  }
})

test('ケース3: 「Invalid agents」で exit 0 の no-op を検出し、非ゼロ終了する', () => {
  const ctx = setupRepo('invalid-agents')
  try {
    assert.throws(
      () => runScript(ctx),
      (err) => {
        assert.notEqual(err.status, 0, '非ゼロ終了すること（silent no-op を許容しない）')
        const combined = `${err.stdout ?? ''}${err.stderr ?? ''}`
        assert.match(
          combined,
          /Invalid agents/,
          'no-op を検出したエラーメッセージが出ること',
        )
        return true
      },
    )

    // no-op のため何も更新されておらず、skills-lock.json も変化していないはず
    const lockDiff = sh(`git status --porcelain -- skills-lock.json`, ctx.repoDir).trim()
    assert.equal(lockDiff, '', 'no-op のため skills-lock.json は変化していないこと')
  } finally {
    rmSync(ctx.repoDir, { recursive: true, force: true })
    rmSync(ctx.binDir, { recursive: true, force: true })
  }
})

test('ケース4: スコープ内のみの書き込みでは誤検出せず、従来どおり完走する（非退行）', () => {
  const ctx = setupRepo('edit-only')
  try {
    const out = runScript(ctx)
    assert.doesNotMatch(out, /スコープ外/, 'スコープ内のみの変更を誤検出しないこと')
    assert.match(out, /updated upstream content/, 'tracked diff は従来どおり表示されること')
  } finally {
    rmSync(ctx.repoDir, { recursive: true, force: true })
    rmSync(ctx.binDir, { recursive: true, force: true })
  }
})

test('ケース5: 実行前から dirty だったスコープ外ファイルの内容だけの上書きを、' +
  '内容ハッシュ比較で検出する（PR #412 P1 の回帰）', () => {
  const ctx = setupRepo('content-overwrite-dirty')
  try {
    assert.throws(
      () => runScript(ctx),
      (err) => {
        assert.notEqual(err.status, 0, '非ゼロ終了すること（fail-closed）')
        const combined = `${err.stdout ?? ''}${err.stderr ?? ''}`
        assert.match(combined, /スコープ外/, 'スコープ外検出のエラーメッセージが出ること')
        assert.match(
          combined,
          /other-skill\/NOTES\.md/,
          '内容だけ上書きされたスコープ外ファイルのパスが列挙されること' +
            '（ステータス文字列・パスは前後で不変のため、これは内容ハッシュ比較でのみ検出できる）',
        )
        return true
      },
    )

    // スコープ内（skills-lock.json / .agents/skills/<name>/）はリバートされ clean
    const lockDiff = sh(`git status --porcelain -- skills-lock.json`, ctx.repoDir).trim()
    assert.equal(lockDiff, '', 'skills-lock.json はリバートされ clean であること')
    const treeDiff = sh(
      `git status --porcelain -- ".agents/skills/${SKILL_NAME}/"`,
      ctx.repoDir,
    ).trim()
    assert.equal(treeDiff, '', '.agents/skills/<name>/ はリバートされ clean であること')
  } finally {
    rmSync(ctx.repoDir, { recursive: true, force: true })
    rmSync(ctx.binDir, { recursive: true, force: true })
  }
})

test('ケース7: 実行前から dirty だったスコープ外ファイルのパーミッションのみの変更を、' +
  '状態シグネチャ比較で検出する（PR #412 第3巡 P1 の回帰）', () => {
  const ctx = setupRepo('mode-change-dirty')
  const outOfScopePath = join(ctx.repoDir, ...OUT_OF_SCOPE_FILE.split('/'))
  try {
    assert.throws(
      () => runScript(ctx),
      (err) => {
        assert.notEqual(err.status, 0, '非ゼロ終了すること（fail-closed）')
        const combined = `${err.stdout ?? ''}${err.stderr ?? ''}`
        assert.match(combined, /スコープ外/, 'スコープ外検出のエラーメッセージが出ること')
        assert.match(
          combined,
          /other-skill\/NOTES\.md/,
          'パーミッションのみ変更されたスコープ外ファイルのパスが列挙されること' +
            '（ステータス文字列・パス・内容は前後で不変のため、これは状態シグネチャ' +
            '（モード込み）比較でのみ検出できる）',
        )
        return true
      },
    )

    // スコープ内（skills-lock.json / .agents/skills/<name>/）はリバートされ clean
    const lockDiff = sh(`git status --porcelain -- skills-lock.json`, ctx.repoDir).trim()
    assert.equal(lockDiff, '', 'skills-lock.json はリバートされ clean であること')
    const treeDiff = sh(
      `git status --porcelain -- ".agents/skills/${SKILL_NAME}/"`,
      ctx.repoDir,
    ).trim()
    assert.equal(treeDiff, '', '.agents/skills/<name>/ はリバートされ clean であること')

    // スコープ外ファイルは自動リバートせず、変更後のパーミッション（755）のまま残す
    const mode = statSync(outOfScopePath).mode & 0o777
    assert.equal(mode, 0o755, 'パーミッション変更が自動リバートされず残存すること')
  } finally {
    rmSync(ctx.repoDir, { recursive: true, force: true })
    rmSync(ctx.binDir, { recursive: true, force: true })
  }
})

test('ケース6: npx が非ゼロ終了しても事後のスコープ外検査へ到達する' +
  '（PR #412 P1 の回帰。failure 経路でも fail-closed）', () => {
  const ctx = setupRepo('npx-failure-out-of-scope')
  try {
    assert.throws(
      () => runScript(ctx),
      (err) => {
        assert.notEqual(err.status, 0, '非ゼロ終了すること（fail-closed）')
        const combined = `${err.stdout ?? ''}${err.stderr ?? ''}`
        assert.match(combined, /実行が失敗しました/, 'npx 失敗の警告が出ること')
        assert.match(
          combined,
          /スコープ外へも書き込んだ可能性/,
          'npx 失敗経路でも事後のスコープ外検査が実行され、残置が報告されること',
        )
        assert.match(
          combined,
          /other-skill\/NOTES\.md/,
          '失敗経路での残置パスが列挙されること',
        )
        return true
      },
    )

    // 失敗経路でもスコープ内（skills-lock.json / .agents/skills/<name>/）は
    // 即座にリバートされ clean であること
    const lockDiff = sh(`git status --porcelain -- skills-lock.json`, ctx.repoDir).trim()
    assert.equal(lockDiff, '', 'skills-lock.json はリバートされ clean であること')
    const treeDiff = sh(
      `git status --porcelain -- ".agents/skills/${SKILL_NAME}/"`,
      ctx.repoDir,
    ).trim()
    assert.equal(treeDiff, '', '.agents/skills/<name>/ はリバートされ clean であること')
  } finally {
    rmSync(ctx.repoDir, { recursive: true, force: true })
    rmSync(ctx.binDir, { recursive: true, force: true })
  }
})

test('ケース8: npx が成功しても tee が失敗した場合、fail-closed で失敗扱いになる' +
  '（PR #412 CI 失敗指摘の P1 回帰。PIPESTATUS[1] 未確認による誤成功の防止）', () => {
  const ctx = setupRepo('tee-failure')
  try {
    assert.throws(
      () => runScript(ctx),
      (err) => {
        assert.notEqual(err.status, 0, '非ゼロ終了すること（fail-closed）')
        const combined = `${err.stdout ?? ''}${err.stderr ?? ''}`
        assert.match(
          combined,
          /tee が失敗しました/,
          'tee 失敗を検知したエラーメッセージが出ること',
        )
        assert.match(
          combined,
          /実行が失敗しました/,
          'npx 自体は exit 0 でも、tee 失敗により NPX_STATUS が失敗へ強制されること',
        )
        assert.doesNotMatch(
          combined,
          /Invalid agents を認識せず/,
          '不完全な NPX_OUTPUT_FILE を前提にした no-op 判定を経由しないこと',
        )
        return true
      },
    )

    // tee 失敗経路でもスコープ内（skills-lock.json / .agents/skills/<name>/）は
    // 即座にリバートされ clean であること（npx 自体は scope-in へ書き込み済みのため、
    // リバートされずに残ると「tee は失敗したのに部分的に成功扱いのまま」になる）
    const lockDiff2 = sh(`git status --porcelain -- skills-lock.json`, ctx.repoDir).trim()
    assert.equal(lockDiff2, '', 'skills-lock.json はリバートされ clean であること')
    const treeDiff2 = sh(
      `git status --porcelain -- ".agents/skills/${SKILL_NAME}/"`,
      ctx.repoDir,
    ).trim()
    assert.equal(treeDiff2, '', '.agents/skills/<name>/ はリバートされ clean であること')
  } finally {
    rmSync(ctx.repoDir, { recursive: true, force: true })
    rmSync(ctx.binDir, { recursive: true, force: true })
  }
})

test('ケース9: スコープ外ディレクトリ自身の chmod を全体シグネチャ比較で検出する' +
  '（PR #412 P1 の回帰。porcelain にはディレクトリの mode 変更が一切現れない）', () => {
  const ctx = setupRepo('dir-chmod-out-of-scope')
  const outOfScopeDir = join(ctx.repoDir, '.claude', 'skills', 'other-skill')
  try {
    assert.throws(
      () => runScript(ctx),
      (err) => {
        assert.notEqual(err.status, 0, '非ゼロ終了すること（fail-closed）')
        const combined = `${err.stdout ?? ''}${err.stderr ?? ''}`
        assert.match(combined, /スコープ外/, 'スコープ外検出のエラーメッセージが出ること')
        assert.match(
          combined,
          /状態シグネチャ/,
          'git status に現れない変化がシグネチャ不一致として検出された旨の案内が出ること' +
            '（ディレクトリの chmod は porcelain の前後どちらにも現れないため、' +
            'status 由来のパス集合をハッシュする方式では原理的に検出できない）',
        )
        return true
      },
    )

    // スコープ内（skills-lock.json / .agents/skills/<name>/）はリバートされ clean
    const lockDiff = sh(`git status --porcelain -- skills-lock.json`, ctx.repoDir).trim()
    assert.equal(lockDiff, '', 'skills-lock.json はリバートされ clean であること')
    const treeDiff = sh(
      `git status --porcelain -- ".agents/skills/${SKILL_NAME}/"`,
      ctx.repoDir,
    ).trim()
    assert.equal(treeDiff, '', '.agents/skills/<name>/ はリバートされ clean であること')

    // スコープ外は自動リバートせず、変更後の mode（700）のまま残す
    const mode = statSync(outOfScopeDir).mode & 0o777
    assert.equal(mode, 0o700, 'ディレクトリの chmod が自動リバートされず残存すること')
  } finally {
    rmSync(ctx.repoDir, { recursive: true, force: true })
    rmSync(ctx.binDir, { recursive: true, force: true })
  }
})

test('ケース10: 実行前から未追跡だったディレクトリ向け symlink のリンク先変更を' +
  '全体シグネチャ比較で検出する（PR #412 P1 の回帰）', () => {
  const ctx = setupRepo('dir-symlink-retarget')
  const linkPath = join(ctx.repoDir, '.claude', 'wip-link')
  try {
    assert.throws(
      () => runScript(ctx),
      (err) => {
        assert.notEqual(err.status, 0, '非ゼロ終了すること（fail-closed）')
        const combined = `${err.stdout ?? ''}${err.stderr ?? ''}`
        assert.match(
          combined,
          /スコープ外/,
          'スコープ外検出のエラーメッセージが出ること' +
            '（porcelain レコードは「?? .claude/wip-link」のまま前後不変のため、' +
            'これはリンク先文字列を含むシグネチャ比較でのみ検出できる）',
        )
        return true
      },
    )

    // スコープ内（skills-lock.json / .agents/skills/<name>/）はリバートされ clean
    const lockDiff = sh(`git status --porcelain -- skills-lock.json`, ctx.repoDir).trim()
    assert.equal(lockDiff, '', 'skills-lock.json はリバートされ clean であること')
    const treeDiff = sh(
      `git status --porcelain -- ".agents/skills/${SKILL_NAME}/"`,
      ctx.repoDir,
    ).trim()
    assert.equal(treeDiff, '', '.agents/skills/<name>/ はリバートされ clean であること')

    // スコープ外の symlink は自動リバートせず、付け替え後のリンク先のまま残す
    assert.equal(
      readlinkSync(linkPath),
      'wip-target-b',
      'symlink のリンク先変更が自動リバートされず残存すること',
    )
  } finally {
    rmSync(ctx.repoDir, { recursive: true, force: true })
    rmSync(ctx.binDir, { recursive: true, force: true })
  }
})

test('ケース11: 実行前から未追跡だったディレクトリ配下のファイル内容だけの上書きを' +
  '全体シグネチャ比較で検出する（PR #412 P1 の回帰）', () => {
  const ctx = setupRepo('nested-content-overwrite')
  try {
    assert.throws(
      () => runScript(ctx),
      (err) => {
        assert.notEqual(err.status, 0, '非ゼロ終了すること（fail-closed）')
        const combined = `${err.stdout ?? ''}${err.stderr ?? ''}`
        assert.match(combined, /スコープ外/, 'スコープ外検出のエラーメッセージが出ること')
        assert.match(
          combined,
          /wip-dir\/notes\.md/,
          '内容だけ上書きされた未追跡ファイルのパスが列挙されること' +
            '（porcelain レコードは「?? .claude/wip-dir/notes.md」のまま前後不変のため、' +
            '検出自体は配下ファイルの内容ハッシュを含むシグネチャ比較が担う）',
        )
        return true
      },
    )

    // スコープ内（skills-lock.json / .agents/skills/<name>/）はリバートされ clean
    const lockDiff = sh(`git status --porcelain -- skills-lock.json`, ctx.repoDir).trim()
    assert.equal(lockDiff, '', 'skills-lock.json はリバートされ clean であること')
    const treeDiff = sh(
      `git status --porcelain -- ".agents/skills/${SKILL_NAME}/"`,
      ctx.repoDir,
    ).trim()
    assert.equal(treeDiff, '', '.agents/skills/<name>/ はリバートされ clean であること')

    // スコープ外は自動リバートせず、上書き後の内容のまま残す
    assert.equal(
      readFileSync(join(ctx.repoDir, '.claude', 'wip-dir', 'notes.md'), 'utf8'),
      'npx overwrote nested wip\n',
      '上書きされた内容が自動リバートされず残存すること（確認用に保全される）',
    )
  } finally {
    rmSync(ctx.repoDir, { recursive: true, force: true })
    rmSync(ctx.binDir, { recursive: true, force: true })
  }
})

test('ケース12: .git/hooks/ へのフック追加と .git/config の書き換えを全体シグネチャ比較で' +
  '検出する（PR #412 第4巡 P1 の回帰。.git 丸ごと prune では署名から漏れる）', () => {
  const ctx = setupRepo('git-metadata-write')
  const hookPath = join(ctx.repoDir, '.git', 'hooks', 'post-checkout')
  try {
    assert.throws(
      () => runScript(ctx),
      (err) => {
        assert.notEqual(err.status, 0, '非ゼロ終了すること（fail-closed）')
        const combined = `${err.stdout ?? ''}${err.stderr ?? ''}`
        assert.match(combined, /スコープ外/, 'スコープ外検出のエラーメッセージが出ること')
        assert.match(
          combined,
          /状態シグネチャ/,
          '.git 配下は porcelain に一切現れないため、シグネチャ不一致として検出された旨の' +
            '案内が出ること（config・hooks が署名対象に含まれていることの検証）',
        )
        return true
      },
    )

    // スコープ内（skills-lock.json / .agents/skills/<name>/）はリバートされ clean
    const lockDiff = sh(`git status --porcelain -- skills-lock.json`, ctx.repoDir).trim()
    assert.equal(lockDiff, '', 'skills-lock.json はリバートされ clean であること')
    const treeDiff = sh(
      `git status --porcelain -- ".agents/skills/${SKILL_NAME}/"`,
      ctx.repoDir,
    ).trim()
    assert.equal(treeDiff, '', '.agents/skills/<name>/ はリバートされ clean であること')

    // 改変された Git メタデータは自動リバートせず、確認できる状態のまま残す
    assert.ok(existsSync(hookPath), '追加されたフックファイルは削除されず残存すること')
    assert.match(
      readFileSync(join(ctx.repoDir, '.git', 'config'), 'utf8'),
      /pwned/,
      '.git/config の書き換えが自動リバートされず残存すること（確認用に保全される）',
    )
  } finally {
    rmSync(ctx.repoDir, { recursive: true, force: true })
    rmSync(ctx.binDir, { recursive: true, force: true })
  }
})

test('ケース13: 実行前から存在する .agents ディレクトリ自身の chmod を全体シグネチャ比較で' +
  '検出する（PR #412 第4巡 P1 の回帰。無条件 omit では検出できない）', () => {
  const ctx = setupRepo('agents-dir-chmod')
  const agentsDir = join(ctx.repoDir, '.agents')
  try {
    assert.throws(
      () => runScript(ctx),
      (err) => {
        assert.notEqual(err.status, 0, '非ゼロ終了すること（fail-closed）')
        const combined = `${err.stdout ?? ''}${err.stderr ?? ''}`
        assert.match(combined, /スコープ外/, 'スコープ外検出のエラーメッセージが出ること')
        assert.match(
          combined,
          /状態シグネチャ/,
          'ディレクトリの chmod は porcelain に現れないため、シグネチャ不一致として' +
            '検出された旨の案内が出ること（既存 .agents が署名対象であることの検証）',
        )
        return true
      },
    )

    // スコープ内（skills-lock.json / .agents/skills/<name>/）はリバートされ clean
    const lockDiff = sh(`git status --porcelain -- skills-lock.json`, ctx.repoDir).trim()
    assert.equal(lockDiff, '', 'skills-lock.json はリバートされ clean であること')
    const treeDiff = sh(
      `git status --porcelain -- ".agents/skills/${SKILL_NAME}/"`,
      ctx.repoDir,
    ).trim()
    assert.equal(treeDiff, '', '.agents/skills/<name>/ はリバートされ clean であること')

    // スコープ外の chmod は自動リバートせず、変更後の mode（700）のまま残す
    const mode = statSync(agentsDir).mode & 0o777
    assert.equal(mode, 0o700, '.agents の chmod が自動リバートされず残存すること')
  } finally {
    rmSync(ctx.repoDir, { recursive: true, force: true })
    rmSync(ctx.binDir, { recursive: true, force: true })
  }
})

test('ケース15: 部分書き込み後に「Invalid agents」文言を出す npx でも、no-op 検知が' +
  '事後検査・リバートを迂回しない（PR #412 第5巡 P1 の回帰）', () => {
  const ctx = setupRepo('invalid-agents-partial-write')
  try {
    assert.throws(
      () => runScript(ctx),
      (err) => {
        assert.notEqual(err.status, 0, '非ゼロ終了すること（fail-closed）')
        const combined = `${err.stdout ?? ''}${err.stderr ?? ''}`
        assert.match(combined, /Invalid agents/, 'no-op 検知のエラーメッセージ自体は出ること')
        assert.match(
          combined,
          /スコープ外/,
          'no-op 文言があっても事後のスコープ外検査へ到達し、残置が報告されること' +
            '（no-op 文言だけを信じて直接 exit すると、この検出が丸ごと迂回される）',
        )
        assert.match(
          combined,
          /other-skill\/NOTES\.md/,
          '部分書き込みされたスコープ外パスが列挙されること',
        )
        return true
      },
    )

    // no-op 文言つき部分書き込みでも、スコープ内は共通失敗経路でリバートされ clean
    const lockDiff = sh(`git status --porcelain -- skills-lock.json`, ctx.repoDir).trim()
    assert.equal(lockDiff, '', 'skills-lock.json はリバートされ clean であること')
    const treeDiff = sh(
      `git status --porcelain -- ".agents/skills/${SKILL_NAME}/"`,
      ctx.repoDir,
    ).trim()
    assert.equal(treeDiff, '', '.agents/skills/<name>/ はリバートされ clean であること')

    // スコープ外は自動リバートせず、確認用に上書き後の内容のまま残す
    assert.equal(
      readFileSync(join(ctx.repoDir, ...OUT_OF_SCOPE_FILE.split('/')), 'utf8'),
      'npx overwrote this content during noop-claim\n',
      'スコープ外の残置は削除されず確認可能な状態で残ること',
    )
  } finally {
    rmSync(ctx.repoDir, { recursive: true, force: true })
    rmSync(ctx.binDir, { recursive: true, force: true })
  }
})

test('ケース16: npx 成功後の git status 取得失敗でもスコープ内リバートが走り、' +
  '非ゼロ終了する（PR #412 第5巡 P1 の回帰。生成済み変更の残置防止）', () => {
  const ctx = setupRepo('post-status-failure')
  try {
    assert.throws(
      () => runScript(ctx),
      (err) => {
        assert.notEqual(err.status, 0, '非ゼロ終了すること（fail-closed）')
        const combined = `${err.stdout ?? ''}${err.stderr ?? ''}`
        assert.match(
          combined,
          /実行後の git status 取得に失敗/,
          'status 取得失敗のエラーメッセージが出ること',
        )
        assert.match(
          combined,
          /リバートしました/,
          'status 取得失敗経路でもスコープ内リバートの実施が案内されること',
        )
        return true
      },
    )

    // status 取得失敗経路でも、npx が書き込み済みのスコープ内は残置されず clean
    // （検証側は実物 git を直接使う。スタブは runScript の PATH にのみ入る）
    const lockDiff = sh(`git status --porcelain -- skills-lock.json`, ctx.repoDir).trim()
    assert.equal(lockDiff, '', 'skills-lock.json はリバートされ clean であること')
    const treeDiff = sh(
      `git status --porcelain -- ".agents/skills/${SKILL_NAME}/"`,
      ctx.repoDir,
    ).trim()
    assert.equal(treeDiff, '', '.agents/skills/<name>/ はリバートされ clean であること')
  } finally {
    rmSync(ctx.repoDir, { recursive: true, force: true })
    rmSync(ctx.binDir, { recursive: true, force: true })
  }
})

test('ケース14: 初回インストール（実行前に .agents 不存在）で npx が親ディレクトリを' +
  '新規作成しても誤検知せず完走する（条件付き omit の非退行）', () => {
  const ctx = setupRepo('first-install')
  try {
    const out = runScript(ctx)
    assert.doesNotMatch(
      out,
      /スコープ外/,
      '実行前に不存在だった .agents / .agents/skills の新規作成を誤検知しないこと',
    )
    assert.ok(
      existsSync(join(ctx.repoDir, '.agents', 'skills', SKILL_NAME, 'SKILL.md')),
      'npx が新規作成した union ストアのファイルが残ること',
    )
  } finally {
    rmSync(ctx.repoDir, { recursive: true, force: true })
    rmSync(ctx.binDir, { recursive: true, force: true })
  }
})

test('ケース17: .agents/skills/<name> がリポジトリ外向き symlink の場合、npx を実行する前に' +
  '拒否して非ゼロ終了する（PR #412 第6巡 P0 の回帰）', () => {
  const ctx = setupRepo('symlink-scope-path')
  try {
    assert.throws(
      () => runScript(ctx),
      (err) => {
        assert.notEqual(err.status, 0, '非ゼロ終了すること（fail-closed）')
        const combined = `${err.stdout ?? ''}${err.stderr ?? ''}`
        assert.match(
          combined,
          /シンボリックリンク/,
          '許可先経路が symlink である旨のエラーメッセージが出ること',
        )
        return true
      },
    )

    // npx が実行されていないこと（実行されると argv ログが必ず書かれる）。
    // symlink 越しの書き込みはスコープ外検査に現れないため、実行前拒否だけが防御になる。
    assert.equal(
      existsSync(ctx.argvLogFile),
      false,
      'npx が一度も実行されていないこと（lstat 検証が npx より前に走る）',
    )

    // symlink 自体は削除・置換されず、確認できる状態のまま残ること
    assert.equal(
      readlinkSync(join(ctx.repoDir, '.agents', 'skills', SKILL_NAME)),
      join(ctx.binDir, 'external-skill-store'),
      'symlink は自動で置き換えられず残存すること（対処は人間の判断に委ねる）',
    )
  } finally {
    rmSync(ctx.repoDir, { recursive: true, force: true })
    rmSync(ctx.binDir, { recursive: true, force: true })
  }
})

test('ケース18: .git/refs 配下への ref ファイル追加を全体シグネチャ比較で検出する' +
  '（PR #412 第6巡 P0 の回帰。refs を prune していた旧実装では検出不能）', () => {
  const ctx = setupRepo('git-refs-write')
  const injectedRef = join(ctx.repoDir, '.git', 'refs', 'heads', 'injected-evil')
  try {
    assert.throws(
      () => runScript(ctx),
      (err) => {
        assert.notEqual(err.status, 0, '非ゼロ終了すること（fail-closed）')
        const combined = `${err.stdout ?? ''}${err.stderr ?? ''}`
        assert.match(combined, /スコープ外/, 'スコープ外検出のエラーメッセージが出ること')
        assert.match(
          combined,
          /状態シグネチャ/,
          '.git 配下は porcelain に一切現れないため、シグネチャ不一致として検出された旨の' +
            '案内が出ること（refs が署名対象に含まれていることの検証）',
        )
        return true
      },
    )

    // スコープ内（skills-lock.json / .agents/skills/<name>/）はリバートされ clean
    const lockDiff = sh(`git status --porcelain -- skills-lock.json`, ctx.repoDir).trim()
    assert.equal(lockDiff, '', 'skills-lock.json はリバートされ clean であること')
    const treeDiff = sh(
      `git status --porcelain -- ".agents/skills/${SKILL_NAME}/"`,
      ctx.repoDir,
    ).trim()
    assert.equal(treeDiff, '', '.agents/skills/<name>/ はリバートされ clean であること')

    // 追加された ref ファイルは自動リバートせず、確認できる状態のまま残す
    assert.ok(existsSync(injectedRef), '追加された ref ファイルは削除されず残存すること')
  } finally {
    rmSync(ctx.repoDir, { recursive: true, force: true })
    rmSync(ctx.binDir, { recursive: true, force: true })
  }
})

test('ケース19: npx 異常終了時、npx 新規作成の .gitignore 対象ファイルは残置されず、' +
  '実行前から存在した ignored ファイルは保全される（Issue #413 + Bugbot Medium の回帰）', () => {
  const ctx = setupRepo('ignored-residue-on-failure')
  const ignoredResidue = join(ctx.repoDir, '.agents', 'skills', SKILL_NAME, 'debug.log')
  try {
    assert.throws(
      () => runScript(ctx),
      (err) => {
        assert.notEqual(err.status, 0, '非ゼロ終了すること（fail-closed）')
        const combined = `${err.stdout ?? ''}${err.stderr ?? ''}`
        assert.match(combined, /実行が失敗しました/, 'npx 失敗の警告が出ること')
        return true
      },
    )

    // 素の git clean -fd だと .gitignore 対象の debug.log だけがリバートをすり抜けて
    // 残る（npx 新規作成分はインベントリ突き合わせの個別削除が担う）
    assert.equal(
      existsSync(ignoredResidue),
      false,
      'npx が新規作成した .gitignore 対象ファイルがリバートで削除されていること',
    )

    // 実行前から存在した ignored ファイルは実行前インベントリで保全される
    // （git clean -fdx だとここで巻き添え削除される。PR #412 Bugbot Medium 指摘）
    assert.equal(
      readFileSync(join(ctx.repoDir, '.agents', 'skills', SKILL_NAME, '.DS_Store'), 'utf8'),
      'pre-existing finder metadata\n',
      '実行前から存在した ignored ファイル（.DS_Store）が abort 時に保全されること',
    )

    // スコープ内（skills-lock.json / .agents/skills/<name>/）はリバートされ clean
    const lockDiff = sh(`git status --porcelain -- skills-lock.json`, ctx.repoDir).trim()
    assert.equal(lockDiff, '', 'skills-lock.json はリバートされ clean であること')
    const treeDiff = sh(
      `git status --porcelain -- ".agents/skills/${SKILL_NAME}/"`,
      ctx.repoDir,
    ).trim()
    assert.equal(treeDiff, '', '.agents/skills/<name>/ はリバートされ clean であること')
  } finally {
    rmSync(ctx.repoDir, { recursive: true, force: true })
    rmSync(ctx.binDir, { recursive: true, force: true })
  }
})

test('ケース20: npx が実行中に許可先を外向き symlink へ置換した場合、実行後再検証が拒否し、' +
  'git clean がリンク先を削除しない（PR #412 第7巡 P0 の回帰。TOCTOU）', () => {
  const ctx = setupRepo('midrun-symlink-swap')
  const skillDirPath = join(ctx.repoDir, '.agents', 'skills', SKILL_NAME)
  try {
    assert.throws(
      () => runScript(ctx),
      (err) => {
        assert.notEqual(err.status, 0, '非ゼロ終了すること（fail-closed）')
        const combined = `${err.stdout ?? ''}${err.stderr ?? ''}`
        assert.match(
          combined,
          /実行後の再検証で .* がシンボリックリンクになっています/,
          '実行後再検証が symlink 置換を検出したエラーメッセージが出ること' +
            '（事前 lstat 検査は開始時点しか見ないため、この経路の防御は実行後再検証が担う）',
        )
        assert.match(
          combined,
          /手動確認/,
          'リポジトリ外書き込みの可能性の手動確認が案内されること',
        )
        assert.match(
          combined,
          /ignored 削除・既存 ignored の復元は行いません/,
          'symlink 検出時は許可先配下への削除系操作をスキップした旨が案内されること',
        )
        return true
      },
    )

    // リンク先（リポジトリ外）へ書かれたファイルが git clean 等で削除されていないこと
    // （symlink 越しの外部削除の防止。残置内容は人間の手動確認に委ねる）
    assert.equal(
      readFileSync(join(ctx.externalTargetDir, 'leaked.md'), 'utf8'),
      'leaked outside repo\n',
      'symlink のリンク先（リポジトリ外）のファイルが削除・変更されず残ること',
    )

    // 置換された symlink 自体も自動で除去されず、確認できる状態のまま残ること
    assert.equal(
      readlinkSync(skillDirPath),
      ctx.externalTargetDir,
      '許可先を置換した symlink が自動除去されず残存すること（対処は人間の判断に委ねる）',
    )

    // skills-lock.json は checkout でリバートされ clean であること
    const lockDiff = sh(`git status --porcelain -- skills-lock.json`, ctx.repoDir).trim()
    assert.equal(lockDiff, '', 'skills-lock.json はリバートされ clean であること')
  } finally {
    rmSync(ctx.repoDir, { recursive: true, force: true })
    rmSync(ctx.binDir, { recursive: true, force: true })
  }
})

test('ケース21: 初回インストールで npx が .agents 自体を外向き symlink として作成した場合、' +
  '実行後再検証が拒否する（PR #412 第7巡 P0 の回帰。omit/prune はシグネチャに現れない経路）', () => {
  const ctx = setupRepo('first-install-symlink-agents')
  try {
    assert.throws(
      () => runScript(ctx),
      (err) => {
        assert.notEqual(err.status, 0, '非ゼロ終了すること（fail-closed）')
        const combined = `${err.stdout ?? ''}${err.stderr ?? ''}`
        assert.match(
          combined,
          /実行後の再検証で \.agents がシンボリックリンクになっています/,
          '実行後再検証が .agents の symlink 作成を検出したエラーメッセージが出ること' +
            '（初回インストールでは .agents が omit・許可先が prune のためシグネチャに' +
            '現れず、実行後再検証だけが防御になる）',
        )
        return true
      },
    )

    // リンク先（リポジトリ外）へ symlink 経由で書かれたファイルが削除されていないこと
    assert.ok(
      existsSync(join(ctx.externalTargetDir, 'skills', SKILL_NAME, 'SKILL.md')),
      'symlink 経由でリンク先に書かれたファイルが削除されず残ること（手動確認に委ねる）',
    )

    // .agents の symlink 自体も自動で除去されず残ること
    assert.equal(
      readlinkSync(join(ctx.repoDir, '.agents')),
      ctx.externalTargetDir,
      'npx が作成した .agents symlink が自動除去されず残存すること',
    )

    // skills-lock.json は checkout でリバートされ clean であること
    const lockDiff = sh(`git status --porcelain -- skills-lock.json`, ctx.repoDir).trim()
    assert.equal(lockDiff, '', 'skills-lock.json はリバートされ clean であること')
  } finally {
    rmSync(ctx.repoDir, { recursive: true, force: true })
    rmSync(ctx.binDir, { recursive: true, force: true })
  }
})

test('ケース22: 許可先配下に実行前から symlink がある場合、npx を実行する前に拒否して' +
  '非ゼロ終了する（PR #412 第12巡 P0-1 の回帰）', () => {
  const ctx = setupRepo('preexisting-symlink-in-scope')
  const linkPath = join(ctx.repoDir, '.agents', 'skills', SKILL_NAME, 'evil-link')
  try {
    assert.throws(
      () => runScript(ctx),
      (err) => {
        assert.notEqual(err.status, 0, '非ゼロ終了すること（fail-closed）')
        const combined = `${err.stdout ?? ''}${err.stderr ?? ''}`
        assert.match(
          combined,
          /配下に既存のシンボリックリンク/,
          '許可先配下の symlink を検出したエラーメッセージが出ること',
        )
        assert.match(
          combined,
          /evil-link/,
          '検出された symlink のパスが列挙されること',
        )
        return true
      },
    )

    // npx が実行されていないこと（実行されると argv ログが必ず書かれる）。
    // 配下の symlink 越しの書き込みはどの前後比較にも現れないため、実行前拒否だけが
    // 防御になる。
    assert.equal(
      existsSync(ctx.argvLogFile),
      false,
      'npx が一度も実行されていないこと（find -type l 走査が npx より前に走る）',
    )

    // symlink 自体は削除・置換されず、確認できる状態のまま残ること
    assert.equal(
      readlinkSync(linkPath),
      join(ctx.binDir, 'external-skill-store'),
      'symlink は自動で置き換えられず残存すること（対処は人間の判断に委ねる）',
    )
  } finally {
    rmSync(ctx.repoDir, { recursive: true, force: true })
    rmSync(ctx.binDir, { recursive: true, force: true })
  }
})

test('ケース23: npx が既存 ignored ファイルを上書きして正常終了した場合、成功経路で' +
  'バックアップから復元されて同期は完走する（PR #412 第12巡 P0-2 の回帰）', () => {
  const ctx = setupRepo('ignored-overwrite-success')
  const dsStore = join(ctx.repoDir, '.agents', 'skills', SKILL_NAME, '.DS_Store')
  try {
    const out = runScript(ctx)
    assert.match(out, /更新完了/, '復元は警告扱いで、同期自体は完走すること')

    // 上書きされた既存 ignored ファイルが実行前バックアップの内容へ戻っていること
    // （許可先配下は署名から除外されるため、シグネチャ比較ではこの上書きを検出できず、
    // バックアップとの直接比較だけが検出・復元の手段になる）
    assert.equal(
      readFileSync(dsStore, 'utf8'),
      'pre-existing finder metadata\n',
      'npx に上書きされた既存 ignored ファイルがバックアップから復元されること',
    )

    // スコープ内の正当な同期結果（SKILL.md の更新）は復元に巻き込まれず残ること
    assert.equal(
      readFileSync(join(ctx.repoDir, '.agents', 'skills', SKILL_NAME, 'SKILL.md'), 'utf8'),
      'updated upstream content\n',
      '同期本体の書き込みは復元の影響を受けないこと',
    )
  } finally {
    rmSync(ctx.repoDir, { recursive: true, force: true })
    rmSync(ctx.binDir, { recursive: true, force: true })
  }
})

test('ケース24: npx が既存 ignored ファイルを上書きした後に失敗した場合、失敗経路の' +
  'リバートでもバックアップから復元される（PR #412 第12巡 P0-2 の回帰）', () => {
  const ctx = setupRepo('ignored-overwrite-on-failure')
  const dsStore = join(ctx.repoDir, '.agents', 'skills', SKILL_NAME, '.DS_Store')
  try {
    assert.throws(
      () => runScript(ctx),
      (err) => {
        assert.notEqual(err.status, 0, '非ゼロ終了すること（fail-closed）')
        const combined = `${err.stdout ?? ''}${err.stderr ?? ''}`
        assert.match(combined, /実行が失敗しました/, 'npx 失敗の警告が出ること')
        return true
      },
    )

    // 失敗経路（revert_in_scope）でも既存 ignored ファイルが復元されること
    // （checkout / git clean / 新規 ignored 削除はいずれも既存 ignored に触れないため、
    // バックアップからの復元だけが破壊された内容を戻せる）
    assert.equal(
      readFileSync(dsStore, 'utf8'),
      'pre-existing finder metadata\n',
      '失敗経路でも既存 ignored ファイルがバックアップから復元されること',
    )

    // スコープ内（skills-lock.json / .agents/skills/<name>/）はリバートされ clean
    const lockDiff = sh(`git status --porcelain -- skills-lock.json`, ctx.repoDir).trim()
    assert.equal(lockDiff, '', 'skills-lock.json はリバートされ clean であること')
    const treeDiff = sh(
      `git status --porcelain -- ".agents/skills/${SKILL_NAME}/"`,
      ctx.repoDir,
    ).trim()
    assert.equal(treeDiff, '', '.agents/skills/<name>/ はリバートされ clean であること')
  } finally {
    rmSync(ctx.repoDir, { recursive: true, force: true })
    rmSync(ctx.binDir, { recursive: true, force: true })
  }
})

test('ケース25: npx が既存 ignored ファイルを削除した場合もバックアップから書き戻される' +
  '（PR #412 第12巡 P0-2 の回帰。削除も「変化」として復元対象）', () => {
  const ctx = setupRepo('ignored-delete-success')
  const dsStore = join(ctx.repoDir, '.agents', 'skills', SKILL_NAME, '.DS_Store')
  try {
    const out = runScript(ctx)
    assert.match(out, /更新完了/, '復元は警告扱いで、同期自体は完走すること')

    // 削除された既存 ignored ファイルがバックアップから書き戻されていること
    assert.ok(
      existsSync(dsStore),
      '削除された既存 ignored ファイルがバックアップから書き戻されること',
    )
    assert.equal(
      readFileSync(dsStore, 'utf8'),
      'pre-existing finder metadata\n',
      '書き戻された内容が実行前バックアップと一致すること',
    )
  } finally {
    rmSync(ctx.repoDir, { recursive: true, force: true })
    rmSync(ctx.binDir, { recursive: true, force: true })
  }
})

test('ケース24b: npx 成功後に既存 ignored ファイルの復元自体が失敗した場合、' +
  'スコープ内（skills-lock.json / .agents/skills/<name>/）もリバートされる' +
  '（Bugbot Medium 指摘: revert_in_scope を呼ばずに exit 1 するだけだと、npx 成功分の' +
  '書き込みが worktree に残置され、次回実行時の実行前 clean ガードに引っかかって' +
  'skip され続ける）', () => {
  const ctx = setupRepo('ignored-restore-failure-on-success')
  try {
    assert.throws(
      () => runScript(ctx),
      (err) => {
        assert.notEqual(err.status, 0, '非ゼロ終了すること（fail-closed）')
        const combined = `${err.stdout ?? ''}${err.stderr ?? ''}`
        assert.match(
          combined,
          /実行前から存在した ignored ファイルの復元に失敗しました/,
          'restore_preexisting_ignored の失敗メッセージが出ること',
        )
        return true
      },
    )

    // npx 自体は成功しているため、revert_in_scope を呼ばないまま exit 1 すると
    // skills-lock.json / .agents/skills/<name>/SKILL.md の更新が worktree に残る。
    // 修正後はスコープ内がリバートされ clean であること。
    const lockDiff = sh('git status --porcelain -- skills-lock.json', ctx.repoDir).trim()
    assert.equal(lockDiff, '', 'skills-lock.json はリバートされ clean であること')
    const treeDiff = sh(
      `git status --porcelain -- ".agents/skills/${SKILL_NAME}/"`,
      ctx.repoDir,
    ).trim()
    assert.equal(treeDiff, '', '.agents/skills/<name>/ はリバートされ clean であること')
  } finally {
    rmSync(ctx.repoDir, { recursive: true, force: true })
    rmSync(ctx.binDir, { recursive: true, force: true })
  }
})

test('ケース26: npx が永続 lock（.git/config.lock）を残した場合、シグネチャ比較で検出する' +
  '（PR #412 codex P1 の回帰。.git/*.lock のワイルドカード prune では検出不能だった）', () => {
  const ctx = setupRepo('config-lock-residue')
  const configLock = join(ctx.repoDir, '.git', 'config.lock')
  try {
    assert.throws(
      () => runScript(ctx),
      (err) => {
        assert.notEqual(err.status, 0, '非ゼロ終了すること（fail-closed）')
        const combined = `${err.stdout ?? ''}${err.stderr ?? ''}`
        assert.match(combined, /スコープ外/, 'スコープ外検出のエラーメッセージが出ること')
        assert.match(
          combined,
          /状態シグネチャ/,
          '.git 配下は porcelain に現れないため、シグネチャ不一致として検出された旨の' +
            '案内が出ること（永続 lock が署名対象に含まれていることの検証）',
        )
        return true
      },
    )

    // スコープ内（skills-lock.json / .agents/skills/<name>/）はリバートされ clean
    const lockDiff = sh(`git status --porcelain -- skills-lock.json`, ctx.repoDir).trim()
    assert.equal(lockDiff, '', 'skills-lock.json はリバートされ clean であること')
    const treeDiff = sh(
      `git status --porcelain -- ".agents/skills/${SKILL_NAME}/"`,
      ctx.repoDir,
    ).trim()
    assert.equal(treeDiff, '', '.agents/skills/<name>/ はリバートされ clean であること')

    // 残置された lock は自動削除せず、確認できる状態のまま残す
    assert.ok(existsSync(configLock), '.git/config.lock は削除されず残存すること')
  } finally {
    rmSync(ctx.repoDir, { recursive: true, force: true })
    rmSync(ctx.binDir, { recursive: true, force: true })
  }
})

test('ケース27: npx が tracked ファイルへ skip-worktree ビットを立てた場合、index の' +
  '論理状態比較で検出する（PR #412 codex P1 の回帰。.git/index の prune の背後に隠れる）', () => {
  const ctx = setupRepo('skip-worktree-flip')
  try {
    assert.throws(
      () => runScript(ctx),
      (err) => {
        assert.notEqual(err.status, 0, '非ゼロ終了すること（fail-closed）')
        const combined = `${err.stdout ?? ''}${err.stderr ?? ''}`
        assert.match(
          combined,
          /スコープ外/,
          'スコープ外検出のエラーメッセージが出ること' +
            '（skip-worktree は .git/index のみを変え、ツリー署名・porcelain の' +
            'どちらにも現れないため、index の論理状態比較だけが検出できる）',
        )
        return true
      },
    )

    // skip-worktree ビットが実際に立っていること（検出対象が実在した証拠。
    // スコープ外の状態は自動リバートされないため、ビットは残存する）
    const tag = sh(`git ls-files -v -- "${OUT_OF_SCOPE_FILE}"`, ctx.repoDir).trim()
    assert.match(tag, /^S /, 'skip-worktree ビット（タグ S）が立ったまま残存すること')

    // スコープ内（skills-lock.json / .agents/skills/<name>/）はリバートされ clean
    const lockDiff = sh(`git status --porcelain -- skills-lock.json`, ctx.repoDir).trim()
    assert.equal(lockDiff, '', 'skills-lock.json はリバートされ clean であること')
    const treeDiff = sh(
      `git status --porcelain -- ".agents/skills/${SKILL_NAME}/"`,
      ctx.repoDir,
    ).trim()
    assert.equal(treeDiff, '', '.agents/skills/<name>/ はリバートされ clean であること')
  } finally {
    rmSync(ctx.repoDir, { recursive: true, force: true })
    rmSync(ctx.binDir, { recursive: true, force: true })
  }
})

test('ケース28: npx が実行中に許可先配下へ外向き symlink を作成した場合、実行後の再走査が' +
  '検出して許可先配下への削除系操作をスキップする（PR #412 Bugbot High の回帰。TOCTOU）', () => {
  const ctx = setupRepo('midrun-nested-symlink')
  const nestedLink = join(ctx.repoDir, '.agents', 'skills', SKILL_NAME, 'evil-link')
  try {
    assert.throws(
      () => runScript(ctx),
      (err) => {
        assert.notEqual(err.status, 0, '非ゼロ終了すること（fail-closed）')
        const combined = `${err.stdout ?? ''}${err.stderr ?? ''}`
        assert.match(
          combined,
          /実行中に許可先.*配下へシンボリックリンクを作成しました/,
          '実行後の find -type l 再走査が実行中作成の symlink を検出すること' +
            '（事前走査は 0 件を保証済みのため、事後に見つかる symlink は npx の作成物）',
        )
        assert.match(
          combined,
          /evil-link/,
          '検出された symlink のパスが列挙されること',
        )
        assert.match(
          combined,
          /ignored 削除・既存 ignored の復元は行いません/,
          '許可先配下への削除系操作をスキップした旨が案内されること',
        )
        assert.match(
          combined,
          /バックアップは .* に相対パス構造で残っています/,
          'バックアップ dir の保全と所在が案内されること',
        )
        return true
      },
    )

    // リンク先（リポジトリ外）へ書かれたファイルが削除・変更されていないこと
    assert.equal(
      readFileSync(join(ctx.externalTargetDir, 'leaked.md'), 'utf8'),
      'leaked via nested link\n',
      'symlink のリンク先（リポジトリ外）のファイルが削除・変更されず残ること',
    )

    // symlink 自体も自動除去されず、確認できる状態のまま残ること
    assert.equal(
      readlinkSync(nestedLink),
      ctx.externalTargetDir,
      '実行中に作成された symlink が自動除去されず残存すること（対処は人間の判断に委ねる）',
    )

    // skills-lock.json は checkout でリバートされ clean であること
    const lockDiff = sh(`git status --porcelain -- skills-lock.json`, ctx.repoDir).trim()
    assert.equal(lockDiff, '', 'skills-lock.json はリバートされ clean であること')
  } finally {
    rmSync(ctx.repoDir, { recursive: true, force: true })
    rmSync(ctx.binDir, { recursive: true, force: true })
  }
})

test('ケース29: 復元先の中間ディレクトリが外向き symlink へ置換された場合、リポジトリ外に' +
  'ディレクトリが作られない（PR #412 Bugbot Medium の回帰）', () => {
  const ctx = setupRepo('restore-parent-symlink-swap')
  try {
    assert.throws(
      () => runScript(ctx),
      (err) => {
        assert.notEqual(err.status, 0, '非ゼロ終了すること（fail-closed）')
        const combined = `${err.stdout ?? ''}${err.stderr ?? ''}`
        assert.match(
          combined,
          /実行中に許可先.*配下へシンボリックリンクを作成しました/,
          '中間ディレクトリの symlink 置換が実行後の再走査で検出されること',
        )
        return true
      },
    )

    // 旧実装では復元の os.makedirs が symlink を辿り、リンク先（リポジトリ外）に
    // sub/ を作ってしまっていた。保全経路（復元スキップ）+ make_parent_dirs の
    // 事前検証の双方により、リポジトリ外にはディレクトリもファイルも作られない。
    assert.equal(
      existsSync(join(ctx.externalTargetDir, 'sub')),
      false,
      'リンク先（リポジトリ外）に中間ディレクトリが作成されないこと',
    )
    assert.equal(
      existsSync(join(ctx.externalTargetDir, 'sub', '.DS_Store')),
      false,
      'リンク先（リポジトリ外）に復元ファイルが書き込まれないこと',
    )
  } finally {
    rmSync(ctx.repoDir, { recursive: true, force: true })
    rmSync(ctx.binDir, { recursive: true, force: true })
  }
})

test('ケース30: npx が既存 ignored ファイルを中間ディレクトリごと削除した場合、復元が' +
  '中間ディレクトリを再作成して書き戻す（make_parent_dirs の正常系・非退行）', () => {
  const ctx = setupRepo('restore-parent-dir-deleted')
  const nestedDsStore = join(
    ctx.repoDir, '.agents', 'skills', SKILL_NAME, 'meta', 'sub', '.DS_Store',
  )
  try {
    const out = runScript(ctx)
    assert.match(out, /更新完了/, '復元は警告扱いで、同期自体は完走すること')

    // 削除された中間ディレクトリごと再作成され、内容がバックアップと一致すること
    // （1 階層ずつの lstat 付き os.mkdir が正当な復元を妨げないことの検証）
    assert.ok(
      existsSync(nestedDsStore),
      '中間ディレクトリごと削除された既存 ignored ファイルが書き戻されること',
    )
    assert.equal(
      readFileSync(nestedDsStore, 'utf8'),
      'pre-existing nested finder metadata\n',
      '書き戻された内容が実行前バックアップと一致すること',
    )
  } finally {
    rmSync(ctx.repoDir, { recursive: true, force: true })
    rmSync(ctx.binDir, { recursive: true, force: true })
  }
})

test('ケース31: linked worktree（git worktree add）での実行は npx を呼ぶ前に拒否して' +
  '非ゼロ終了する（PR #412 codex P0 の回帰）', () => {
  const ctx = setupRepo('linked-worktree')
  const worktreeDir = join(ctx.binDir, 'linked-wt')
  try {
    // メイン worktree の HEAD から linked worktree を作る。skills-lock.json /
    // .agents ツリーはコミット済みのため checkout に含まれ、clean ガード・
    // 許可先経路の lstat 検証はいずれも通過し得る状態になる（worktree 検証
    // だけが拒否できるレイアウト）。
    sh(`git worktree add -q "${worktreeDir}" HEAD`, ctx.repoDir)
    assert.throws(
      () => runScript(ctx, worktreeDir),
      (err) => {
        assert.notEqual(err.status, 0, '非ゼロ終了すること（fail-closed）')
        const combined = `${err.stdout ?? ''}${err.stderr ?? ''}`
        assert.match(
          combined,
          /linked worktree/,
          'linked worktree を拒否した旨のエラーメッセージが出ること',
        )
        assert.match(
          combined,
          /メイン worktree で実行し直して/,
          '復旧手順（メイン worktree での再実行）が案内されること',
        )
        return true
      },
    )

    // npx が実行されていないこと（実行されると argv ログが必ず書かれる）。
    // linked worktree では実 Git ディレクトリ（共有側の refs 等）が状態署名の
    // 対象外になり、npx による改変が前後比較に現れないため、実行前拒否だけが
    // 防御になる。
    assert.equal(
      existsSync(ctx.argvLogFile),
      false,
      'npx が一度も実行されていないこと（worktree 検証が npx より前に走る）',
    )
  } finally {
    rmSync(ctx.repoDir, { recursive: true, force: true })
    rmSync(ctx.binDir, { recursive: true, force: true })
  }
})

test('ケース32: separate-git-dir（.git が gitfile）での実行は npx を呼ぶ前に拒否して' +
  '非ゼロ終了する（PR #412 Bugbot High の回帰）', () => {
  const ctx = setupRepo('separate-git-dir')
  try {
    // git clone --separate-git-dir 相当の構成を再現する: .git 実体を作業ツリー外
    // （binDir 配下）へ移し、gitdir 参照の gitfile に差し替える。git-dir と
    // common-dir はどちらも外部ディレクトリを指して一致するため linked worktree
    // 検証は通過し、「作業ツリー直下の .git 実体ディレクトリ」検証だけが拒否できる。
    const externalGitDir = join(ctx.binDir, 'external-git-store')
    renameSync(join(ctx.repoDir, '.git'), externalGitDir)
    writeFileSync(join(ctx.repoDir, '.git'), `gitdir: ${externalGitDir}\n`)
    assert.throws(
      () => runScript(ctx),
      (err) => {
        assert.notEqual(err.status, 0, '非ゼロ終了すること（fail-closed）')
        const combined = `${err.stdout ?? ''}${err.stderr ?? ''}`
        assert.match(
          combined,
          /作業ツリー直下の \.git 実体ディレクトリであることを確認できません/,
          '実 Git ディレクトリの所在検証で拒否した旨のエラーメッセージが出ること',
        )
        assert.match(
          combined,
          /通常構成のメイン worktree で実行し直して/,
          '復旧手順（通常構成での再実行）が案内されること',
        )
        return true
      },
    )

    // npx が実行されていないこと（実行されると argv ログが必ず書かれる）。
    // 外部 Git ディレクトリは状態署名の走査対象に入らないため、実行前拒否だけが
    // 防御になる。
    assert.equal(
      existsSync(ctx.argvLogFile),
      false,
      'npx が一度も実行されていないこと（所在検証が npx より前に走る）',
    )
  } finally {
    rmSync(ctx.repoDir, { recursive: true, force: true })
    rmSync(ctx.binDir, { recursive: true, force: true })
  }
})

test('ケース33: .git が実体ディレクトリへの symlink の構成での実行は npx を呼ぶ前に' +
  '拒否して非ゼロ終了する（PR #412 Bugbot High の回帰）', () => {
  const ctx = setupRepo('git-dir-symlink')
  try {
    // .git 実体を作業ツリー外へ移し、.git をそこへの symlink に置換する。
    // git は symlink 経由でも動作し git-dir と common-dir は一致するため、
    // lstat 検証（symlink 拒否）だけがこのレイアウトを npx 実行前に拒否できる。
    const externalGitDir = join(ctx.binDir, 'external-git-store')
    renameSync(join(ctx.repoDir, '.git'), externalGitDir)
    symlinkSync(externalGitDir, join(ctx.repoDir, '.git'))
    assert.throws(
      () => runScript(ctx),
      (err) => {
        assert.notEqual(err.status, 0, '非ゼロ終了すること（fail-closed）')
        const combined = `${err.stdout ?? ''}${err.stderr ?? ''}`
        assert.match(
          combined,
          /作業ツリー直下の \.git 実体ディレクトリであることを確認できません/,
          '実 Git ディレクトリの所在検証で拒否した旨のエラーメッセージが出ること',
        )
        assert.match(
          combined,
          /通常構成のメイン worktree で実行し直して/,
          '復旧手順（通常構成での再実行）が案内されること',
        )
        return true
      },
    )

    assert.equal(
      existsSync(ctx.argvLogFile),
      false,
      'npx が一度も実行されていないこと（所在検証が npx より前に走る）',
    )
  } finally {
    rmSync(ctx.repoDir, { recursive: true, force: true })
    rmSync(ctx.binDir, { recursive: true, force: true })
  }
})

test('ケース33b: 作業ツリールート以外のサブディレクトリから実行すると npx を呼ぶ前に' +
  '拒否して非ゼロ終了する（Bugbot Medium 指摘: GIT_DIR が <toplevel>/.git であることは' +
  '確認するが、cwd が toplevel であることは確認していなかったため、repo_state_signature の' +
  '走査起点（cwd）から .git が外れて npx による改変を検出できなくなっていた）', () => {
  const ctx = setupRepo('edit-only')
  const subDir = join(ctx.repoDir, '.agents')
  try {
    assert.throws(
      () => runScript(ctx, subDir),
      (err) => {
        assert.notEqual(err.status, 0, '非ゼロ終了すること（fail-closed）')
        const combined = `${err.stdout ?? ''}${err.stderr ?? ''}`
        assert.match(
          combined,
          /カレントディレクトリ.*が作業ツリールート.*と一致しません/,
          'カレントディレクトリが作業ツリールートでない旨のエラーメッセージが出ること',
        )
        assert.match(
          combined,
          /作業ツリールートで実行し直して/,
          '復旧手順（作業ツリールートでの再実行）が案内されること',
        )
        return true
      },
    )

    // npx が実行されていないこと（実行されると argv ログが必ず書かれる）。
    // cwd 検証は許可先経路の lstat 検証より前、npx 実行前に走る。
    assert.equal(
      existsSync(ctx.argvLogFile),
      false,
      'npx が一度も実行されていないこと（cwd 検証が npx より前に走る）',
    )
  } finally {
    rmSync(ctx.repoDir, { recursive: true, force: true })
    rmSync(ctx.binDir, { recursive: true, force: true })
  }
})

test('ケース34: skills-lock.json が実行前から外向き symlink の場合は npx を呼ぶ前に' +
  '拒否して非ゼロ終了する（PR #412 codex P0 の回帰）', () => {
  const ctx = setupRepo('lockfile-symlink-preexisting')
  const externalLock = join(ctx.binDir, 'external-lock.json')
  try {
    const externalBefore = readFileSync(externalLock, 'utf8')
    assert.throws(
      () => runScript(ctx),
      (err) => {
        assert.notEqual(err.status, 0, '非ゼロ終了すること（fail-closed）')
        const combined = `${err.stdout ?? ''}${err.stderr ?? ''}`
        assert.match(
          combined,
          /skills-lock\.json がシンボリックリンクです/,
          'skills-lock.json の lstat 検証で拒否した旨のエラーメッセージが出ること',
        )
        assert.match(
          combined,
          /実体ファイルへ置き換えてから再実行して/,
          '復旧手順（実体ファイルへの置き換え）が案内されること',
        )
        return true
      },
    )

    // npx が実行されていないこと（実行されると argv ログが必ず書かれる）。
    // skills-lock.json は署名の prune・porcelain フィルタの双方から除外されるため、
    // symlink 越しのリンク先書き込みはどの検査にも現れず、実行前拒否だけが防御になる。
    assert.equal(
      existsSync(ctx.argvLogFile),
      false,
      'npx が一度も実行されていないこと（lstat 検証が npx より前に走る）',
    )

    // リンク先（リポジトリ外）の実ファイルが変更されていないこと
    assert.equal(
      readFileSync(externalLock, 'utf8'),
      externalBefore,
      'リンク先（リポジトリ外）のファイルが変更されないこと',
    )
  } finally {
    rmSync(ctx.repoDir, { recursive: true, force: true })
    rmSync(ctx.binDir, { recursive: true, force: true })
  }
})

test('ケース35: npx が実行中に skills-lock.json を外向き symlink へ置換した場合、実行後の' +
  '再検証が検出し、リンク先へ書き込まずに regular file を復元する' +
  '（PR #412 codex P0 の回帰。TOCTOU）', () => {
  const ctx = setupRepo('midrun-lockfile-symlink-swap')
  const victimLock = join(ctx.externalTargetDir, 'victim-lock.json')
  const lockPath = join(ctx.repoDir, 'skills-lock.json')
  try {
    assert.throws(
      () => runScript(ctx),
      (err) => {
        assert.notEqual(err.status, 0, '非ゼロ終了すること（fail-closed）')
        const combined = `${err.stdout ?? ''}${err.stderr ?? ''}`
        assert.match(
          combined,
          /skills-lock\.json がシンボリックリンクになっています/,
          '実行後の再検証（verify_lock_file_after_run）が実行中の置換を検出すること',
        )
        return true
      },
    )

    // リンク先（リポジトリ外）の実ファイルが書き換え・削除されていないこと
    // （素の git checkout はリンク先へ書き込み得るため、rm → checkout の順で復元する）
    assert.equal(
      readFileSync(victimLock, 'utf8'),
      'external victim content\n',
      'symlink のリンク先（リポジトリ外）のファイルが書き換え・削除されないこと',
    )

    // skills-lock.json は symlink が除去され、index の内容が regular file として
    // 書き戻されていること
    assert.equal(
      lstatSync(lockPath).isSymbolicLink(),
      false,
      'skills-lock.json の symlink が除去され regular file へ復元されること',
    )
    const lockDiff = sh(`git status --porcelain -- skills-lock.json`, ctx.repoDir).trim()
    assert.equal(lockDiff, '', 'skills-lock.json はリバートされ clean であること')

    // 許可先（.agents/skills/<name>/）もリバートされ clean であること
    const treeDiff = sh(
      `git status --porcelain -- ".agents/skills/${SKILL_NAME}/"`,
      ctx.repoDir,
    ).trim()
    assert.equal(treeDiff, '', '.agents/skills/<name>/ はリバートされ clean であること')
  } finally {
    rmSync(ctx.repoDir, { recursive: true, force: true })
    rmSync(ctx.binDir, { recursive: true, force: true })
  }
})

test('ケース36: python3 が PATH に無い場合は npx を呼ぶ前に拒否して非ゼロ終了する' +
  '（PR #412 codex P1 の回帰）', () => {
  const ctx = setupRepo('missing-python3')
  // python3 だけが欠けた PATH を組む: スクリプトが python3 チェックへ到達するまでに
  // 必要な実コマンド（bash: スタブ群の shebang `/usr/bin/env bash` が PATH から解決 /
  // jq: skills-lock.json の source 照合）のみを symlink した専用 dir を用意し、
  // PATH をスタブ dir + この dir に限定する（既存 PATH を含めると実 python3 が
  // 解決されてしまい、不在ケースを再現できない）。
  const restrictedBin = mkdtempSync(join(tmpdir(), 'sync-skills-lock-nopy-bin-'))
  try {
    for (const cmd of ['bash', 'jq']) {
      const real = execFileSync('bash', ['-c', `command -v ${cmd}`], { encoding: 'utf8' }).trim()
      symlinkSync(real, join(restrictedBin, cmd))
    }
    const env = {
      ...process.env,
      PATH: `${ctx.binDir}:${restrictedBin}`,
      TEST_NPX_SCENARIO: ctx.scenario,
    }
    assert.throws(
      () => execFileSync('bash', [SCRIPT_PATH, SKILL_NAME, SOURCE_REPO], {
        cwd: ctx.repoDir,
        env,
        encoding: 'utf8',
      }),
      (err) => {
        assert.notEqual(err.status, 0, '非ゼロ終了すること（fail-closed）')
        const combined = `${err.stdout ?? ''}${err.stderr ?? ''}`
        assert.match(
          combined,
          /python3 が見つかりません/,
          'python3 不在を明示したエラーメッセージが出ること',
        )
        assert.match(
          combined,
          /導入してから再実行して/,
          '復旧手順（python3 の導入）が案内されること',
        )
        return true
      },
    )

    // npx が実行されていないこと（実行されると argv ログが必ず書かれる）。
    // python3 不在のまま npx が走ると、実行後の状態署名・復元処理が途中で
    // command-not-found になり、スコープ外検査が中途半端なまま停止するため、
    // 実行前拒否だけが防御になる。
    assert.equal(
      existsSync(ctx.argvLogFile),
      false,
      'npx が一度も実行されていないこと（python3 チェックが npx より前に走る）',
    )
  } finally {
    rmSync(ctx.repoDir, { recursive: true, force: true })
    rmSync(ctx.binDir, { recursive: true, force: true })
    rmSync(restrictedBin, { recursive: true, force: true })
  }
})
