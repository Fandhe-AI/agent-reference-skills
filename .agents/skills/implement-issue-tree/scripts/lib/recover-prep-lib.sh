#!/usr/bin/env bash
# recover-prep-lib.sh — recover-prep.sh の判断だけを持つ純関数（source 専用）
#
# 呼び出し元: recover-prep.sh（Issue #603 第 9 弾）。対象ブランチの解決、WIP コミットの要否と結果の分類、base との差分の三値判定を、
#             git を呼ぶ本体から切り出したもの。切り出した理由は、テストが 1 回の bash 起動でこれらの関数へ表の全ケースを渡せるように
#             するため（lib/pr-push-lib.sh・lib/worktree-remove-lib.sh と同じ）。
# 契約: どの関数も exit せず、git・gh・ネットワークを呼ばない。結果は RP_* 変数・標準出力・return 値で返す。source 元のシェル状態を壊さないため
#       set -e / set -u / trap / exit は置かない。二重 source は無害。
#       入力の形式検証（wr_valid_branch など）と status の行数（wr_count_status）は lib/worktree-remove-lib.sh のものを使う（recover-prep.sh が両方を source する）。
# 互換: macOS（BSD userland・bash 3.2）と Linux（GNU・busybox）。paste・bc・mapfile・連想配列・GNU 専用フラグを使わない。
#
# このファイルは単体実行しない。run-verified.sh のハッシュ照合は scripts/lib/*.sh も対象に含む。
# 読み込み済みを示す変数でのガードは置かない（環境から継承した変数で定義が飛ばされ、偽の関数が使われるのを防ぐ）。

# shellcheck disable=SC2034  # RP_* は source 元のスクリプトが読む
RP_RESOLVED=0
RP_REASON=""
RP_BRANCH=""
RP_SOURCE="none"
RP_WT_MISSING=0
RP_NESTED=0
RP_UNMERGED=0

# 対象ブランチの解決。引数:
#   $1 given    旧 worktree のパスが与えられたか（0 / 1。0 は branch だけの残骸）
#   $2 wtstate  旧 worktree の状態: missing（パスが存在しない = dead worktree）/ main（メイン worktree）/ unregistered（git worktree list に無い）/
#               mismatch（パスはあるが、git がその worktree 自身を指さない = .git の破損や別の repo）/ live（登録済みで実体も一致）
#   $3 head     live の worktree の HEAD が指すブランチ名。ブランチを指さない（detached）・読めないときは空
#   $4 state    状態ファイルに記録されていたブランチ名（空 = 記録なし）
#   $5 base     base ブランチ名
# 結果: RP_RESOLVED（1 = 対象を確定できた、0 = 確定できず保全が必要）/ RP_REASON（RP_RESOLVED=0 の理由の語。1 のときは空）/
#       RP_BRANCH（対象ブランチ。確定したが対象が無い〔dead worktree で記録も無い〕ときは空）/ RP_SOURCE（worktree / state / none）/
#       RP_WT_MISSING（1 = dead worktree）。
# 規則:
#   - branch だけの残骸は記録されたブランチを使う（食い違う実体が無い）。
#   - dead worktree は記録されたブランチを使う（無ければ対象なし = 継続不能）。取り残すデータが無い。
#   - どちらも、解決したブランチが base と同名なら確定しない（live と対称。base を継続・破棄の対象にしない）。
#   - live は worktree の HEAD を使う。state のブランチは参考値で、食い違えば HEAD を優先する（WIP が積まれるのは HEAD 側）。
#     HEAD がブランチを指さない・形が不正・base と同名なら確定しない（base に WIP を積むと discard で消せず、continue は壊れる）。
#   - main・unregistered・mismatch は確定しない（メインや無関係な repo に WIP を積まない。実体があるのに git が見ていない領域は
#     データが残っている可能性があるため dead 扱いにしない）。
rp_resolve() {
  RP_RESOLVED=0
  RP_REASON=""
  RP_BRANCH=""
  RP_SOURCE="none"
  RP_WT_MISSING=0
  if [ "$1" != 1 ]; then
    if [ -z "$4" ]; then
      RP_REASON=no-target
    elif [ -n "$5" ] && [ "$4" = "$5" ]; then
      RP_REASON=base-branch
    else
      RP_RESOLVED=1
      RP_BRANCH=$4
      RP_SOURCE=state
    fi
    return 0
  fi
  case "$2" in
    missing)
      if [ -n "$4" ] && [ -n "$5" ] && [ "$4" = "$5" ]; then
        RP_REASON=base-branch
      else
        RP_RESOLVED=1
        RP_WT_MISSING=1
        if [ -n "$4" ]; then
          RP_BRANCH=$4
          RP_SOURCE=state
        fi
      fi
      ;;
    main) RP_REASON=main-worktree ;;
    unregistered) RP_REASON=not-registered ;;
    mismatch) RP_REASON=toplevel-mismatch ;;
    live)
      if [ -z "$3" ]; then
        RP_REASON=detached
      elif [ -n "$5" ] && [ "$3" = "$5" ]; then
        RP_REASON=base-branch
      else
        RP_RESOLVED=1
        RP_BRANCH=$3
        RP_SOURCE=worktree
      fi
      ;;
    *) RP_REASON=unknown-state ;;
  esac
  return 0
}

# `git status --porcelain=v2 -z -uall --ignore-submodules=none` を 1 レコード 1 行にした出力（recover-prep.sh の observe が作る。パスは引用されない）から、未マージ行（`u `）の数を RP_UNMERGED に、独立した入れ子の
# git リポジトリ（未追跡の行 `? <パス>/` のように末尾が / のもの。中身は親の WIP コミットに入らず、ポインタだけが記録される）の数を
# RP_NESTED に入れる。入力は here-string で渡す。read -r なので末尾が \ のパスでも次の行と連結しない（-r を外すと連結して壊れる。here-string か here-document かは関係しない）
rp_scan_status() {
  local line u=0 n=0
  while IFS= read -r line; do
    case "${line}" in
      'u '*) u=$((u + 1)) ;;
      '? '*/) n=$((n + 1)) ;;
    esac
  done <<<"$1"
  RP_UNMERGED=${u}
  RP_NESTED=${n}
}

# WIP コミットの要否。$1 = 汚れの行数（-1 = 確認できなかった）、$2 = 未マージ行の数、$3 = 入れ子の git リポジトリの数、
# $4 = マージ・cherry-pick・revert・rebase の途中か（0 / 1。省略は 0）。標準出力:
#   none        汚れが無い（コミットは作らない）
#   commit      コミットする
#   unmerged    未マージのエントリがある（コンフリクトの途中。add -A がマーカー入りの内容を確定させてしまうので触らない）
#   in-progress マージ・cherry-pick・revert・rebase の途中（add -A は未解決の途中状態を確定させる。触らない）
#   nested-repo 入れ子の git リポジトリがある（add -A は中身ではなくポインタだけを記録し、worktree を消すと中身が失われる。触らない）
#   unverified  汚れを確認できなかった
rp_wip_plan() {
  if [ "$1" -lt 0 ]; then
    echo unverified
  elif [ "$1" -eq 0 ]; then
    echo none
  elif [ "$2" -gt 0 ]; then
    echo unmerged
  elif [ "${4:-0}" != 0 ]; then
    echo in-progress
  elif [ "$3" -gt 0 ]; then
    echo nested-repo
  else
    echo commit
  fi
}

# コミットを試みたあとの結果の分類。$1 = add -A と commit をあわせた終了コード、$2 = コミット後の汚れの行数（-1 = 確認できなかった）、
# $3 = そのうち submodule 由来の行数、$4 = コミットの実体（made = HEAD が進み、前の HEAD との差分が空でない / それ以外 = 進んでいない・
# 差分が空・確認できなかった。省略は made）。標準出力:
#   committed      コミットが成功し、同じ観測でもう汚れが無い（退避完了）
#   commit-failed  add か commit が失敗した（フックの拒否を含む。--no-verify で回避しない）
#   empty-commit   終了コードは成功だが、HEAD が進んでいない・進んだが差分が空（フックが commit のあとで変更を捨てた〔reset --hard など〕）。
#                  汚れが無くても退避できていない
#   unverified     コミット後の汚れを確認できなかった
#   submodule      コミット後も submodule 内の未コミットの変更が残る（親のコミットには入らない）。コミットできるものが無く commit が
#                  失敗した場合〔残る汚れが全部 submodule 由来〕もここに入れる
#   residual-dirty コミット後も汚れが残る（フックがファイルを書き換えた・グローバルの除外に載った未追跡ファイルなど。add -A は
#                  利用者の除外設定に従うが、汚れの観測は従わない）
# コミットの終了コードだけで退避完了とせず、コミット後の観測が空であることを要件にする
rp_wip_after() {
  if [ "$1" != 0 ]; then
    if [ "$2" -gt 0 ] && [ "$2" -eq "$3" ]; then
      echo submodule
    else
      echo commit-failed
    fi
  elif [ "${4:-made}" != made ]; then
    echo empty-commit
  elif [ "$2" -lt 0 ]; then
    echo unverified
  elif [ "$2" -eq 0 ]; then
    echo committed
  elif [ "$3" -gt 0 ]; then
    echo submodule
  else
    echo residual-dirty
  fi
}

# WIP の結果の語のうち、退避が完了している（取り残す未コミット変更が無い）もの。$1 = 語。ホストの wipCommitted になる。
# skipped は退避の対象が無い（dead worktree・branch だけの残骸）
rp_wip_ok() {
  case "$1" in
    none | committed | skipped) return 0 ;;
  esac
  return 1
}

# base との差分の三値判定。$1 = base を取得できたか（0 / 1）、$2 = ブランチが実在するか（0 / 1）、$3 = `git diff --quiet <base>...<branch>` の終了コード。
# 標準出力: empty（差分が空）/ nonempty / unknown（取得に失敗した・ブランチが無い・diff を実行できなかった）。
# 取得に失敗した状態を empty に倒さない（empty は discard の根拠になる）
rp_diff_state() {
  if [ "$1" != 1 ] || [ "$2" != 1 ]; then
    echo unknown
  elif [ "$3" = 0 ]; then
    echo empty
  elif [ "$3" = 1 ]; then
    echo nonempty
  else
    echo unknown
  fi
}

# 40 桁の 16 進（小文字）か。$1 = 値
rp_is_sha() {
  case "$1" in
    *[!0-9a-f]*) return 1 ;;
  esac
  [ "${#1}" -eq 40 ]
}
