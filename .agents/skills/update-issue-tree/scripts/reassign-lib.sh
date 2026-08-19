#!/usr/bin/env bash
# reassign-lib.sh — SKILL.md の呼び出し側ループが共有するヘルパー関数群
#
# 呼び出し元: skills/update-issue-tree/SKILL.md Step 3（closed 親下の残置 open issue の付け替え）・
#            Step 4（孤児 issue の再配置）。両 Step のコードフェンスがそれぞれ source する。
#
# 背景（Issue #372 / PR #374 codex-review P1 第 3 ラウンド）:
#   これらの関数は当初 Step 3 のコードフェンス内で定義し、Step 4 のフェンスが再利用する構成だった。
#   しかし手順書のコードフェンスは**ブロックごとに独立シェルで実行され得る**（reassign-sub-issue.sh
#   の設計前提と同じ）。その前提の下では Step 4 の実行時に関数定義が継承されず、最初の
#   require_plan_array が command not found となって孤児の再配置が一切実行されない。
#   フェンス間の暗黙の依存を消すため、共有部分をこのファイルへ切り出し、両 Step が自己完結的に
#   source する構成へ変更した。
#
# reassign-sub-issue.sh との役割分担:
#   reassign-sub-issue.sh … issue 1 件の付け替えを実行する単体実行スクリプト（DELETE→POST を集約）
#   reassign-lib.sh       … その呼び出し側（計画配列の検証・1 件呼び出しの終了ステータス解釈）
#   両者は必ず同一ディレクトリに同居する。本ファイルは自身の位置から兄弟スクリプトを解決するため、
#   導入形態（本リポジトリのソース／vendoring／symlink 経由）によらず対の実体が組み合う。
#
# **このファイルで set -euo pipefail を使ってはならない。** set -e があると reassign_one 内で
# 失敗した bash 起動の時点でシェルが即終了し、直後の `status=$?` 退避に到達しない。
# 「非ゼロ終了を握り潰さない」ために入れたつもりの設定が、まさにその見落としを再発させる
# （Issue #335 で修正した欠陥と同型）。呼び出し側フェンスでも同様に使わない。

# 自身の実体があるディレクトリを絶対パスで解決する。
# `${BASH_SOURCE[0]%/*}` を使ってはならない——`source reassign-lib.sh` のようにスラッシュを
# 含まない形で source された場合、パターンが一致せずファイル名がそのまま残って不正なディレクトリになる。
# 絶対パス化することで、source 後に呼び出し側が cd しても解決済みのパスが壊れない。
REASSIGN_LIB_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd) || return 1
REASSIGN_SCRIPT="${REASSIGN_LIB_DIR}/reassign-sub-issue.sh"

if [[ ! -f "${REASSIGN_SCRIPT}" ]]; then
  echo "エラー: ${REASSIGN_SCRIPT} が存在しない（reassign-lib.sh と対のスクリプトが欠落している）" >&2
  return 1
fi
if [[ ! -x "${REASSIGN_SCRIPT}" ]]; then
  echo "警告: ${REASSIGN_SCRIPT} に実行権限がない（vendoring で実行ビットが失われた可能性）。bash 経由で実行する" >&2
fi

# 1 件分の呼び出しを関数に閉じ込める。Step 3（付け替え）と Step 4（孤児の再配置）が同じ関数を
# 使うことで、呼び出し方だけでなく stderr の扱い・終了ステータスの意味づけまで対称になる
# （Issue #335 / #372）。
#
# 返り値の契約:
#   0       … 成功（result= 行の state を読んで件数へ計上する）
#   9       … 恒久的に対象外（cross-repository 親）。呼び出し側は要確認事項へ記録して次の 1 件へ進む
#   その他   … スクリプトの終了コードをそのまま返す（1〜8・10・11。SKILL.md の終了コード表を参照。
#             10・11 は Issue #352 の補償復旧で新設。加工なしで透過するためこのラッパの変更は不要）
#
# 9 を使う理由: スクリプト自身は 0〜8・10・11 しか返さないため衝突しない。exit 2 は
# (a) 解消可能な前提不備と (b) 恒久的な対象外が混在しており、終了コード単独では区別できない。
# 判定は stderr の `reason=cross-repository-parent` マーカー行で機械的に行うが、
# **stderr を捕捉していなければ呼び出し側はこの判定を実行できない**。そのためファイルへ
# 捕捉し、判定した後に必ず再出力する（診断情報を握り潰さない）。
reassign_one() {
  local err status
  err=$(mktemp) || return 2
  # 実行ビットの有無に関わらず bash 経由で起動する（上記の理由により、
  # 直接実行 "${REASSIGN_SCRIPT}" に依存すると Permission denied になり得るため）
  bash "${REASSIGN_SCRIPT}" "$@" 2>"${err}"
  # echo を最後のコマンドにすると終了ステータスが常に 0 になり、実行基盤が
  # 「最終ステータス」で成否を判定した場合に非ゼロ終了を見落とす。
  # 直後に $? を退避してから出力する（Issue #335）。
  status=$?
  # 捕捉した stderr は必ず再出力する（判定のために捕捉しただけであり、隠さない）
  cat "${err}" >&2
  echo "exit=${status}"
  if (( status == 2 )) && grep -qF 'reason=cross-repository-parent' "${err}"; then
    rm -f "${err}"
    return 9
  fi
  rm -f "${err}"
  return "${status}"
}

# 計画配列の存在と型を検証する（fail-closed）。Step 3 / Step 4 の両方が呼ぶ。
#
# 2 段階で検査する:
#   1. 宣言されているか — bash では未定義配列の "${ARR[@]}" が空へ展開されるため、
#      Step 2 を実行し忘れてもループが 0 回で回り、承認済みの対象があってもエラーなく
#      完走して完了報告まで進む。declare -p は宣言済みなら空配列でも成功するため、
#      「対象なし（空配列）」と「計画未設定（未宣言）」を正しく区別できる
#   2. 添字配列か — declare -p は同名の**スカラー変数**が宣言済みでも成功する。
#      その場合 "${ARR[@]}" はスカラー値 1 個へ展開され、計画として構築していない値が
#      1 件の付け替え指示として実行されてしまう（実測: REASSIGN_PLAN="123 1 2" は
#      ガードを通過し、ループが 1 回まわる）。属性が添字配列（declare -a）であることまで
#      確認する。連想配列（declare -A）はループが添字順を前提にするため受け付けない
require_plan_array() {
  local name="$1" attrs
  if ! declare -p "${name}" >/dev/null 2>&1; then
    echo "エラー: ${name} が未宣言（Step 2 の計画が構築されていない）。" >&2
    echo "対象 0 件と区別できないため停止する。対象が無い場合も ${name}=() と明示すること" >&2
    return 1
  fi
  # declare -p の 2 番目のフィールドが属性（例: -a / -ar / -- / -A）。
  # 添字配列は小文字 a、連想配列は大文字 A で区別される
  attrs=$(declare -p "${name}" | awk '{print $2}')
  case "${attrs}" in
    -*a*) return 0 ;;
    *)
      echo "エラー: ${name} が添字配列ではない（属性: ${attrs}）。" >&2
      echo "スカラーや連想配列を計画として実行しないため停止する。${name}=( ... ) で宣言すること" >&2
      return 1
      ;;
  esac
}
