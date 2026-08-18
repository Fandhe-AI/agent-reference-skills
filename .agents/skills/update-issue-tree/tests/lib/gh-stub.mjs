// gh-stub.mjs — reassign-sub-issue.sh の決定的回帰テスト用に、実 API を叩かずに `gh` を
// 差し替えるスタブを生成する。テストは実行ログ（$GH_CALL_LOG）に対して直接アサートすることで、
// 「DELETE が失敗したら POST が 1 件も呼ばれない」等の呼び出し順序・回数の契約を検証する。
//
// ルーティングはパスベース（Issue #333）。スクリプトは必ず対象 issue の GET を最初に撃つため、
// スタブが最初に受けた api GET のパスを「対象 issue のパス」として一時ファイルへ記録し、以降
// 同じパスの GET は従来どおり「1 回目=事前確認・2 回目以降=事後確認」として応答する。記録済み
// パスと一致しない GET は新親の事前検証（DELETE 前に撃たれる新設の GET。Issue #333 Step 2）と
// みなし、newParentGetFail / newParentRepo で応答する。
// 記録は失敗分岐の**前**に行う。記録がスタブの応答内容から独立していることで、「1 回目の GET
// のパス = 対象 issue のパス」という不変条件が fixture の組み合わせによらず保たれる。
// 記録を失敗分岐の後ろへ動かすと、対象 issue の GET を失敗させる fixture では対象パスが
// 記録されないまま次の GET が来た場合にそれが対象パスとして記録され、ルーティングが崩れる。
// 現在のスクリプトでは対象 issue の GET 失敗時に exit 2 で終了するため、その組み合わせは
// 実際には到達しない。ここで守っているのは「将来スクリプトが対象 GET の失敗から回復して
// 続行するようになっても、スタブ側のルーティング前提が壊れない」という耐性であり、
// 特定の fixture 組み合わせを想定した記述ではない

import { mkdtempSync, writeFileSync, chmodSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

// シェルの単一引用符リテラル内に安全に埋め込むためのエスケープ（ ' → '\'' ）
function shQuote(value) {
  return `'${String(value).replace(/'/g, `'\\''`)}'`
}

/**
 * @param {object} fixture
 * @param {boolean} [fixture.authFail] gh auth status を失敗させる
 * @param {boolean} [fixture.getFail] 事前 GET（1 回目）を失敗させる
 * @param {boolean} [fixture.verifyGetFail] 事後 GET（2 回目）を失敗させる
 * @param {string} [fixture.issueId] GET が返す database id
 * @param {string} [fixture.parentBefore] 事前 GET が返す現在の親 issue 番号（'' = 親なし）
 * @param {string} [fixture.parentAfter] 事後 GET が返す親 issue 番号（未指定なら parentBefore を継続）
 * @param {string} [fixture.parentRepo] 事前 GET が返す親の owner/repo（既定 'o/r' = 対象 issue と同一）
 * @param {string} [fixture.parentRepoAfter] 事後 GET が返す親の owner/repo（未指定なら parentRepo を継続）
 * @param {number} [fixture.deleteExit] DELETE の終了コード
 * @param {string} [fixture.deleteBody] DELETE 失敗時に stderr へ出す本文
 * @param {number} [fixture.postExit] POST の終了コード
 * @param {string} [fixture.postBody] POST 失敗時に stderr へ出す本文（"only have one parent" 判定に使う）
 * @param {boolean} [fixture.newParentGetFail] 新親 GET を非ゼロ終了させる（存在しない番号の再現）
 * @param {string} [fixture.newParentRepo] 新親の repository_url の owner/repo（既定 'o/r' = 対象 issue と同一。'other/repo' で転送済み issue を再現）
 * @param {boolean} [fixture.newParentIsPullRequest] 新親 GET のレスポンスへ `.pull_request` を含める（issues API が PR も返す仕様の再現）
 */
export function createGhStub(fixture = {}) {
  const f = {
    authFail: false,
    getFail: false,
    verifyGetFail: false,
    issueId: '999',
    parentBefore: '',
    parentAfter: undefined,
    // 親が属するリポジトリ。既定は対象 issue と同一（repository_url の o/r と一致）。
    // 'other/repo' 等を渡すと cross-repository sub-issue を再現できる
    parentRepo: 'o/r',
    parentRepoAfter: undefined,
    deleteExit: 0,
    deleteBody: '',
    postExit: 0,
    postBody: '',
    newParentGetFail: false,
    newParentRepo: 'o/r',
    // issues API は PR も返す（issue と PR は番号空間を共有する）。true にすると
    // 新親 GET のレスポンスへ `.pull_request` を含め、--new-parent に PR 番号を
    // 渡したケースを再現する
    newParentIsPullRequest: false,
    ...fixture,
  }
  if (f.parentAfter === undefined) f.parentAfter = f.parentBefore
  if (f.parentRepoAfter === undefined) f.parentRepoAfter = f.parentRepo

  const dir = mkdtempSync(join(tmpdir(), 'reassign-gh-stub-'))
  const ghPath = join(dir, 'gh')
  const logPath = join(dir, 'calls.log')
  const getCountPath = join(dir, 'get_count')
  const targetPathPath = join(dir, 'target_path')
  writeFileSync(getCountPath, '0')
  writeFileSync(targetPathPath, '')

  const authBranch = f.authFail ? 'exit 1' : 'exit 0'
  const getFailBranch = f.getFail ? "echo 'stub: get failed' >&2; exit 1" : ':'
  const verifyGetFailBranch = f.verifyGetFail ? "echo 'stub: verify get failed' >&2; exit 1" : ':'
  const newParentGetFailBranch = f.newParentGetFail
    ? "echo 'stub: new parent get failed' >&2; exit 1"
    : ':'

  const script = `#!/usr/bin/env bash
# 生成スタブ。実 gh の代わりに PATH の先頭へ差し込んで使う（テスト専用・実行ビット付き）
set -u
echo "$*" >> ${shQuote(logPath)}
cmd="\${1:-}"

if [[ "\${cmd}" == "auth" ]]; then
  ${authBranch}
fi

if [[ "\${cmd}" != "api" ]]; then
  exit 0
fi
shift

method="GET"
path=""
while [[ $# -gt 0 ]]; do
  case "\${1:-}" in
    --method) method="$2"; shift 2 ;;
    -F) shift 2 ;;
    *) path="$1"; shift ;;
  esac
done

if [[ "\${path}" == *"/sub_issue" && "\${method}" == "DELETE" ]]; then
  printf '%s' ${shQuote(f.deleteBody)} >&2
  exit ${f.deleteExit}
fi

if [[ "\${path}" == *"/sub_issues" && "\${method}" == "POST" ]]; then
  printf '%s' ${shQuote(f.postBody)} >&2
  exit ${f.postExit}
fi

# 対象 issue のパスをまだ記録していなければ、この GET が対象 issue の GET（スクリプトは
# 必ず対象 issue の GET を最初に撃つ）。失敗分岐より前に記録することで、getFail 時にも
# 対象パスが確定した状態で exit する
target_path=$(cat ${shQuote(targetPathPath)})
if [[ -z "\${target_path}" ]]; then
  printf '%s' "\${path}" > ${shQuote(targetPathPath)}
  target_path="\${path}"
fi

if [[ "\${path}" != "\${target_path}" ]]; then
  # 記録済みの対象パスと一致しない GET = 新親の事前検証（Issue #333 Step 2）
  ${newParentGetFailBranch}
  printf '{"repository_url": "https://api.github.com/repos/%s"%s}\\n' ${shQuote(f.newParentRepo)} ${shQuote(f.newParentIsPullRequest ? ', "pull_request": {"url": "https://api.github.com/repos/o/r/pulls/77"}' : '')}
  exit 0
fi

# 対象 issue の GET（1 回目=事前確認・2 回目以降=事後確認）
count=$(cat ${shQuote(getCountPath)})
count=$((count + 1))
echo "\${count}" > ${shQuote(getCountPath)}

if [[ "\${count}" -eq 1 ]]; then
  ${getFailBranch}
  parent=${shQuote(f.parentBefore)}
  prepo=${shQuote(f.parentRepo)}
else
  ${verifyGetFailBranch}
  parent=${shQuote(f.parentAfter)}
  prepo=${shQuote(f.parentRepoAfter)}
fi

if [[ -n "\${parent}" ]]; then
  printf '{"id": ${f.issueId}, "repository_url": "https://api.github.com/repos/o/r", "parent_issue_url": "https://api.github.com/repos/%s/issues/%s"}\\n' "\${prepo}" "\${parent}"
else
  printf '{"id": ${f.issueId}, "repository_url": "https://api.github.com/repos/o/r", "parent_issue_url": null}\\n'
fi
`

  writeFileSync(ghPath, script)
  chmodSync(ghPath, 0o755)

  return {
    dir,
    ghPath,
    logPath,
    env: { PATH: `${dir}:${process.env.PATH ?? ''}` },
  }
}
