#!/usr/bin/env bash
# push-verify.sh — push の前後でリモート head を突き合わせ、「自分のコミットがリモート head として反映された」ことを
#                  判定する共通ヘルパー（source 専用）
#
# 呼び出し元: base-merge.sh（Issue #603 第 3 弾）。pr-create の push と fix の push 検証も、以降の弾で同じ部品を使う
#             （プロンプトの pushVerifyInstruction と同じ二条件をスクリプトに移したもの）。
# 役割: 「push コマンドが成功した」「push の前後で sha が変わった」は、自分のコミットが反映された根拠にならない
#       （その間に別ランや他者が同じブランチを更新すると、自分の push が拒否されても sha は変わる。PR #436）。
#       pushed になるのは次の全部を満たしたときだけである。
#         (i)  push 前のリモート head が、ローカル HEAD と違う（自分が積んだコミットが存在した = 空振り push の除外）
#         (ii) push 後のリモート head が、ローカル HEAD と一致する（自分のコミット群が反映済みの直接証明）
#         (iii) push コマンド自身が成功した
#       push 前後どちらかの ls-remote が失敗して比較できないときも push 自体は実行する（作業は detached HEAD 上にしか
#       無く、push を省くと worktree の破棄で失われるため）が、結果は unverified（pushed ではない）にする。
# 契約: push は `git push --no-follow-tags origin HEAD:refs/heads/<branch>` の 1 形だけ（refspec 固定・--force 系・--no-verify を
#       使わない）。--no-follow-tags は利用者設定 push.followTags=true のとき、push 先の履歴を指す注釈付きタグまで origin へ
#       出ていくのを止める（push するのは対象ブランチの 1 ref だけにする）。
#       結果は PV_OUTCOME に入れる:
#         pushed      二条件を満たした
#         noop        push 前のリモート head がローカル HEAD と同じ（変更なしの空振り）
#         race        push 後のリモート head がローカル HEAD と違う（並行 push 競合の可能性）
#         unverified  push 前後のどちらかを確認できない（ls-remote 失敗・HEAD を読めない）
#         push-failed push コマンドが非 0 で終わった（拒否・通信エラー・pre-push hook の失敗等）
#       関数は結果を PV_OUTCOME に入れて return 0 する（結果の解釈は呼び出し側）。ブランチ名の形式が不正なら push せず
#       return 1（PV_OUTCOME は空）。
#       source 元のシェル状態を壊さないため set -e / set -u / trap / exit は置かない。二重 source は無害。
# 互換: macOS（BSD userland・bash 3.2）と Linux（GNU・busybox）。
#
# このファイルは単体実行しない。run-verified.sh のハッシュ照合は scripts/lib/*.sh も対象に含む
# （ここを書き換えると、これを読み込む全スクリプトのハッシュが変わる）。
# 読み込み済みを示す変数でのガードは置かない: 環境から継承した変数でこのファイルの定義が飛ばされ、export -f した偽の関数が使われるのを防ぐ
#（定義だけのファイルなので毎回読み直して構わない）。

# shellcheck disable=SC2034  # PV_SHA / PV_OUTCOME は source 元のスクリプトが読む
PV_SHA=""
PV_OUTCOME=""

# ブランチ名の形式。ホストの isValidBranchName（先頭は英数字、使える文字は英数字・. _ / -、".." を含まない）より厳しくてよい:
# `refs/` 始まりは拒否する（refs/heads/x が通ると push 先が refs/heads/refs/heads/x になる）。HEAD は拒否する（ref 名として曖昧）。
# 最後に git の ref 名規則（末尾の / や .lock・// など）を check-ref-format で確かめる。
pv_valid_branch() {
  case "$1" in
    '' | *..* | [!A-Za-z0-9]* | *[!A-Za-z0-9._/-]* | refs/* | HEAD) return 1 ;;
  esac
  [ "${#1}" -le 200 ] || return 1
  git check-ref-format "refs/heads/$1" >/dev/null 2>&1
}

# 40 桁小文字 16 進か。
pv_is_sha() {
  case "$1" in
    '' | *[!0-9a-f]*) return 1 ;;
  esac
  [ "${#1}" -eq 40 ]
}

# origin の refs/heads/$1 の sha を PV_SHA に入れる（ブランチが無ければ空・return 0）。ls-remote の失敗や sha の形式
# 不正は return 1（PV_SHA は空）。部分一致（refs/heads/x/refs/heads/$1 のような別の ref）は採らず、完全一致の行だけを使う。
pv_remote_sha() {
  local out line sha ref
  PV_SHA=""
  pv_valid_branch "$1" || return 1
  out=$(git ls-remote origin "refs/heads/$1" 2>/dev/null) || return 1
  while IFS= read -r line; do
    [ -n "${line}" ] || continue
    sha=${line%%[[:space:]]*}
    ref=${line#*[[:space:]]}
    if [ "${ref}" = "refs/heads/$1" ]; then
      pv_is_sha "${sha}" || { PV_SHA=""; return 1; }
      PV_SHA=${sha}
    fi
  done <<EOF
${out}
EOF
  return 0
}

# push コマンドそのもの（この 1 行が lib 全体で唯一の git push。静的ガードが綴りを固定する）。呼び出し元 pv_push_verified の
# ローカル変数 branch と rc を動的スコープで読み書きするため、単独では呼ばない。標準エラーの扱いは呼び出し側がリダイレクトで決める
pv_git_push() {
  git push --no-follow-tags origin "HEAD:refs/heads/${branch}" >/dev/null || rc=$?
}

# HEAD を refs/heads/$1 へ push し、二条件で反映を確認して PV_OUTCOME に結果を入れる。
pv_push_verified() {
  local branch=$1 local_head before="" before_ok=0 after="" after_ok=0 rc=0 errf
  PV_OUTCOME=""
  pv_valid_branch "${branch}" || return 1
  local_head=$(git rev-parse HEAD 2>/dev/null) || local_head=""
  if ! pv_is_sha "${local_head}"; then
    PV_OUTCOME=unverified
    return 0
  fi
  if pv_remote_sha "${branch}"; then
    before=${PV_SHA}
    before_ok=1
  fi
  # push の標準出力は捨てる（呼び出し元の標準出力は結果の 1 行だけにするため）。標準エラー（hook の出力）は残す
  # 標準エラーは一時ファイルへ受け、リモートの URL を含み得る行（"To <url>"・"failed to push some refs to '<url>'"・:// を含む行）を
  # 除いて出す（URL はトークンを含み得る。hook の出力など、それ以外の行は診断のために残す）。
  # 一時ファイルを作れないときは標準エラーを捨てる（出力が減るだけで push の結果は変わらない）
  errf=$(mktemp "${TMPDIR:-/tmp}/push-verify-err.XXXXXX" 2>/dev/null) || errf=""
  if [ -n "${errf}" ]; then
    pv_git_push 2>"${errf}"
    grep -vE '^To |failed to push some refs to|://' "${errf}" >&2 || true
    rm -f "${errf}"
  else
    pv_git_push 2>/dev/null
  fi
  if [ "${rc}" -ne 0 ]; then
    PV_OUTCOME=push-failed
    return 0
  fi
  if pv_remote_sha "${branch}"; then
    after=${PV_SHA}
    after_ok=1
  fi
  if [ "${before_ok}" -eq 0 ] || [ "${after_ok}" -eq 0 ]; then
    PV_OUTCOME=unverified
  elif [ "${before}" = "${local_head}" ]; then
    PV_OUTCOME=noop
  elif [ "${after}" = "${local_head}" ]; then
    PV_OUTCOME=pushed
  else
    PV_OUTCOME=race
  fi
  return 0
}
