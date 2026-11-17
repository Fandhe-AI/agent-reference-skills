#!/usr/bin/env bash
# codex-hook.sh: ランナーが起動する Codex の PreToolUse hook（matcher ^Bash$）。
# 配布済みの agent-guard.sh を「常に subagent=true」で呼び、結果を Codex の deny 出力へ写す。
# （トップレベルのセッションでも、マージ・承認・設定変更を止めるため。方針は phase0 の 0-3）
#
# 引数（codex.mjs が hook のコマンド行へ埋める。エージェントのシェルからは変えられない）:
#   --guard <path>     agent-guard.sh の絶対パス（必須）
#   --log <path>       呼び出しごとに 1 行を追記するログ（必須）。codex.mjs が「ログの行数 >= コマンド実行数」を
#                      終了時に確かめ、満たさなければガードの欠落（hook が黙って読まれなかった等）として扱う
#   --merge-re <ERE>   与えたときだけ、コマンド全体がこの正規表現に一致する場合に素通しにする
#                      （allowMerge。merge-exec の完全一致の 1 形。正本は runner/lib/guard.mjs の MERGE_EXEC_COMMAND）
#
# 入力（stdin）: Codex の PreToolUse JSON（使うのは tool_input.command だけ）。
# 出力: deny のときだけ stdout に deny JSON を出して exit 0。allow は何も出さず exit 0。
# ログと出力にコマンド文字列は含めない（秘密情報が流れないように）。
# fail-closed: 引数不備・jq 無し・ガード無し・結果行なしはすべて deny。呼び出し側のコマンド行は
# `bash <このファイル> … || exit 2` とし、このスクリプト自体が異常終了しても止める。
#
# ログの形式と拒否の文言（runner-guard-parity.test.mjs が同じガード出力に対するログ行・文言を縛る）:
#   ログ 1 行 = `<epoch 秒>\t<コード>`。コードは allow・allow-mergeform・deny-guard-missing・deny-error・
#   deny-noresult・deny:<ガードの理由>・deny-args・deny-no-jq・deny-nocmd。
#   拒否の文言は `iit-runner: ` で始め、ガードの判定による拒否は `ガードの判定により拒否した（deny:<理由>）`。
#   理由が obfuscated・credential-read のとき、と --merge-re があるときの merge-guard だけ、文言の後ろに言い直しの手がかりを 1 文足す（deny_hint）。手がかりは書き方の言い直しだけで、止められた操作を別の綴りで迂回しないことを必ず添える。
#   文字列は JSON へそのまま埋めるため、`"` と `\` と制御文字を含めない（単一引用符で囲み、展開させない）。
#   ガードの結果行は agent-guard.sh の契約どおり `AGENT_GUARD_RESULT allow` か `AGENT_GUARD_RESULT deny[ <理由>]`
#   （理由は [a-z-]+。それ以外の形は deny-noresult。理由を JSON へそのまま埋めるため、形を絞ってから使う）。
set -uf

GUARD='' LOG='' MERGE_RE=''
while [ $# -gt 0 ]; do
  case "$1" in
    --guard) GUARD="${2:-}"; shift 2 || break ;;
    --log) LOG="${2:-}"; shift 2 || break ;;
    --merge-re) MERGE_RE="${2:-}"; shift 2 || break ;;
    *) shift ;;
  esac
done

# 理由コードごとの言い直しの手がかり（無いコードは空）。先頭の「。」は文言の続きとして付ける。
deny_hint() {
  case "$1" in
    obfuscated) printf '%s' '。手がかり: 単一引用符の文字列の末尾に $ を置かない（正規表現は全体を括弧で包み、'"'"'(…$)'"'"' の形にする）。$'"'"'…'"'"' と $IFS は使わない。止められた操作そのものを別の綴りで迂回しない。' ;;
    credential-read) printf '%s' '。手がかり: 名前に TOKEN・SECRET・PASSWORD・KEY・PAT などを含む変数（大文字小文字を問わない。pat も該当する）は、展開も表示もしない。件数などは、そうした語を含まない名前（例: hits）の変数に入れる。止められた操作そのものを別の綴りで迂回しない。' ;;
    # マージを許す段（--merge-re あり）だけ。完全一致の 1 形から外れた書き方（here-doc・bash -c で包む等）で止められたときの言い直し
    merge-guard) [ -n "$MERGE_RE" ] && printf '%s' '。手がかり: この段で通るマージは、手順 3 に示された 1 行そのものだけである。bash・here-doc・-c で包まず、変数の代入を別の呼び出しに分けず、その 1 行をそのまま 1 回で実行する。止められた操作そのものを別の綴りで迂回しない。' ;;
  esac
  return 0
}

log() { [ -n "$LOG" ] && printf '%s\t%s\n' "$(date +%s)" "$1" >> "$LOG"; return 0; }
emit_deny() {
  printf '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"%s"}}\n' "$1"
  exit 0
}

if [ -z "$LOG" ] || [ -z "$GUARD" ]; then
  # ログが書けない構成では欠落検知が成立しないため、止める。
  [ -n "$LOG" ] && log deny-args
  emit_deny 'iit-runner: hook の引数が不正なため拒否した'
fi
[ -f "$GUARD" ] || { log deny-guard-missing; emit_deny 'iit-runner: ガードが見つからないため拒否した'; }
command -v jq >/dev/null 2>&1 || { log deny-no-jq; emit_deny 'iit-runner: jq が見つからないため拒否した'; }

input=$(cat) || input=''
cmd=$(printf '%s' "$input" | jq -er '.tool_input.command | select(type == "string")' 2>/dev/null) || cmd=''
[ -n "$cmd" ] || { log deny-nocmd; emit_deny 'iit-runner: 対象を解釈できないため拒否した'; }

if [ -n "$MERGE_RE" ] && [[ "$cmd" =~ $MERGE_RE ]]; then
  log allow-mergeform
  exit 0
fi

out=$(printf '%s' "$input" | jq -c '{command: .tool_input.command, subagent: true}' | bash "$GUARD" 2>/dev/null)
rc=$?
last=$(printf '%s\n' "$out" | awk 'NF{l=$0} END{print l}')
deny_re='^AGENT_GUARD_RESULT deny( ([a-z-]+))?$'
if [ "$last" = 'AGENT_GUARD_RESULT allow' ]; then
  if [ "$rc" -eq 0 ]; then log allow; exit 0; fi
  log deny-error; emit_deny 'iit-runner: ガードが異常終了したため拒否した'
elif [[ "$last" =~ $deny_re ]]; then
  reason="${BASH_REMATCH[2]:-unknown}"
  log "deny:${reason}"
  emit_deny "iit-runner: ガードの判定により拒否した（deny:${reason}）$(deny_hint "$reason")"
else
  log deny-noresult; emit_deny 'iit-runner: ガードの結果を得られないため拒否した'
fi
