#!/usr/bin/env bash
# implement-issue-tree の merge-guard hook（PreToolUse / matcher: Bash）。
#
# この hook は subagent（monitor 等）のマージ系コマンドを deny する **best-effort の攻撃面
# 削減**であり、**承認境界ではない**。当初は host 発行の grant（expectedCommand 完全一致）に
# よる allow 経路を持たせて「未承認マージを許可しない証明可能な境界」を主張していたが、
# 同一トラストドメイン（hook と subagent が同じ FS・env・gh 認証を共有し、agent 単位の
# 権限分離がない）では偽造不能な認可を hook 側で検証できないことが判明したため、allow 経路を
# 全撤去した（grant 偽造 P0: monitor は Bash を持ち通常のファイル作成も hook を通るため、
# gh pr view で HEAD を取得 → 任意 nonce で grant-<pr>.json を自作 → その expectedCommand を
# 実行できる。hook は grant の真正性・署名を検証できない。この基盤には hook 専用の秘密注入
# 経路がなく（settings.json の env はセッション全体=subagent Bash 含めて共有）、hook が
# 検証でき subagent が読めない鍵を持てないため、MAC/署名による偽造防止は実装不能）。
#
# したがって本 hook は subagent からのマージ系コマンドを**無条件 deny**する（例外なし）。
# 間接実行（eval・base64 復元・変数間接呼び出し・コマンド置換 $(...)）や未知のスペリングは
# 文字列照合では防げない。**実際にマージを止めるのは、この Workflow が『自動マージを行わない』
# 方針そのもの（autoMerge を無条件 fail-closed 化し新規マージ経路を開かない）と、サーバ側の
# branch protection（人間がマージする前提の運用推奨）である**（rust-ai-library PR #441 /
# agent-cli-skills PR #182 codex P0）。この hook は多層防御の一層（best-effort deny）にすぎない。
#
# 呼び出し元の前提（契約）:
#   - .claude/settings.json の hooks.PreToolUse（matcher: "Bash"）に登録されて実行される。
#     stdin に hook JSON（agent_id / tool_input.command 等）を受け取る。導入は任意。
#   - agent_id は subagent 実行時のみ存在する。main スレッド（agent_id なし）は人間の監督下の
#     対話コンテキストであり、本 hook の制限対象外（何も出力せず許可）。
#   - deny 応答の permissionDecisionReason にはマーカー文字列
#     「implement-issue-tree-merge-guard」を含める（多層防御のログ識別用。allow 経路・canary は
#     撤去したため必須ではないが、ログ突き合わせのために残す）。
#
# 判定ポリシー（allow 経路なし。deny 専用）:
#   - subagent（agent_id あり）からのマージ系スペリングは無条件 deny:
#       gh pr merge（あらゆる形）/ REST merge（pulls/<n>/merge・repos/<o>/<r>/merges）/
#       GraphQL merge（mergePullRequest / enablePullRequestAutoMerge / mergeBranch）/
#       gh pr review --approve / gh alias / gh extension
#   - jq 不在・stdin パース失敗等の異常時 → deny（fail-closed）。ただし stdin に文字列
#     "agent_id" が現れない入力（main スレッド）は jq 不在でも許可する
#     （jq 不在環境で main スレッドをロックアウトしないための入口判定）
#   - 上記以外のコマンド（gh pr comment "@cursor review"・読み取り系等）→ 許可（出力なし exit 0）
#
# サブコマンド判定はトークン化 + 語順部分列一致で行う（Fandhe-AI/actions PR #66 codex P0）:
#   従来は `gh[[:space:]]+pr[[:space:]]*merge` のように「gh」「pr」「merge」の**隣接**を要求する
#   正規表現だったため、`gh -R owner/repo pr merge` / `gh --repo owner/repo pr merge` のように
#   サブコマンド前へ gh のグローバルオプション（-R/--repo・--hostname 等）を挟む正規の CLI 構文で
#   容易に迂回できた（同様に `gh[[:space:]]+api` も `gh --repo o/r api ...` で迂回できていた）。
#   個別のフラグ名を列挙して読み飛ばす方式（ブラックリスト）は、gh が新設する未知のグローバル
#   オプションに追従できず再発するため採用せず、代わりに以下の方式でフラグの語彙に依存せず
#   汎用的に扱う:
#     1. 正規化済みコマンド全体（`norm`）から、空白区切りの各トークンのうち `-` で始まるもの
#        （フラグ。値の有無を問わず）をすべて除去したトークン列（`all_nf`）を作る。値トークン
#        （`-R owner/repo` の `owner/repo` 側）は孤立して残るが、判定は**隣接ではなく語順の
#        部分列一致**（後述）で行うため、孤立した値トークンが偶然すり抜けの原因にはならない
#        （値トークンがたまたま "pr" や "merge" と完全一致しない限り無害。あえて「フラグと
#        その次の値トークン」をまとめて削る方式は採らない — その方式では
#        `gh --version pr merge` のような引数なしフラグの直後に来た本物のサブコマンド語まで
#        値と誤認して削ってしまい、`gh` → `pr` → `merge` の並びを見逃す fail-open 方向の
#        誤りになるため）。
#     2. `all_nf` に「gh」→「pr」→「merge」（または「gh」→「api」等）が**この順序で**
#        （連続でなくてよい）現れるかを判定する。順序判定のため、値トークンの混入は誤検知
#        （over-deny）方向にのみ働き、見逃し（under-deny）方向には働かない。
#   `gh pr review --approve` の `--approve` 自体はフラグなのでフラグ除去後には残らない。
#   そのため「gh」→「pr」→「review」の順序判定はフラグ除去後トークン列（`all_nf`）で行い、
#   `--approve` の有無は正規化済みコマンド全体（フラグ除去前の `norm`）に対して判定する。
#
#   コマンド区切り（; & | && ||）によるセグメント分割は**採用しない**（PR #195 で一度導入し、
#   2 ラウンドの codex-review でいずれも P0 の回帰を出したため撤回した）:
#     - 単一の `|` で分割すると、`printf '...mergePullRequest...' | gh api graphql --input -`
#       のように mutation 名（前段）と `gh api`（後段）が別セグメントに分かれ、REST/GraphQL
#       merge 照合が両方とも不成立になり見逃す（前段の出力を後段が読む単一パイプラインを
#       人為的に切断してしまうため）。
#     - `norm` はクォート文字を既に除去済み（後述の正規化参照）のため、`;`・`&` はシェルの
#       制御演算子だけでなく、元は引用符内にあった**リテラル文字**（GraphQL クエリの文字列
#       引数中の `;` 等）も無条件に区切りとして拾ってしまう。攻撃者が正規の文字列値へ区切り
#       文字を紛れ込ませれば、`gh api` と危険な mutation 名を任意に別セグメントへ分断でき、
#       クォート状態を追跡しない限りこの迂回は原理的に防げない。
#   両 P0 とも「セグメント分割によって判定対象の文字列が分断され、本来同一コマンドとして
#   見るべき情報が失われる」ことが原因であり、fail-closed の hook にとって情報を削ることは
#   常に迂回面を広げる。よってセグメント分割をやめ、正規化済みコマンド全体を単位として
#   判定する（`gh pr view 1 && git merge main` のような無関係な複合コマンドも過検知で deny
#   されうるが、これは意図した over-deny — 1 回の Bash 呼び出しに複数コマンドを `&&`/`;` で
#   連結せず、個別の Bash 呼び出しに分ければ回避できる。fail-closed の設計思想上、この
#   over-deny は under-deny より常に安全な方向）。
#
#   メタ文字空白化 → トークン単位 basename 正規化という合成順序（PR #195 codex P0
#   第3〜6ラウンド / Bugbot High の集約対応）:
#   `contains_subsequence` は空白区切りトークンと "gh"・"merge" 等の完全一致のみを見るため、
#   過去ラウンドで次の迂回クラスが見つかった:
#     - パス修飾起動（第3ラウンド）: `/usr/bin/gh pr merge`・`./gh pr merge` は "gh" トークンに
#       一致しない
#     - メタ文字の空白なし後置（第4〜5ラウンド）: `gh pr merge;echo` はトークンが `merge;echo`
#       となり "merge" に一致しない
#     - 合成順序の不備（第6ラウンド）: 旧実装は basename 正規化（sed）をメタ文字空白化より
#       **前**の段で行っていたため、`/usr/bin/gh&&true pr merge` のようにパス修飾 gh の直後へ
#       空白なしでメタ文字が続く形は「gh の直後が空白または末尾」の境界条件を満たせず
#       正規化されず、後段のトークン判定でも `/usr/bin/gh` のまますり抜けた
#     - 貪欲削除による証拠消失（Bugbot High）: 旧 sed の `[^[:space:]]*/gh` は同一トークン内の
#       非空白プレフィックス全体を削除して "gh" に置き換えるため、
#       `query={mergePullRequest(...)};/x/gh` のような glued トークンでは deny 証拠
#       （mergePullRequest / pulls/<n>/merge 等）ごと正規化で消え、証拠グレップが不成立に
#       なり許可へ倒れた
#   根本原因はいずれも「トークン境界が確定する前に文字列置換で basename を触る」設計に
#   あったため、正規化パイプラインを次の合成順序へ再設計した:
#     1. シェルメタ文字（; & | < > ( ) { } `（バッククォート）・$ と改行）を無条件に空白へ
#        置換してトークン境界を確定させる（over-deny 設計。`merge;echo` は `merge` `echo` の
#        2トークンに分かれ "merge" として検出される）
#     2. 空白区切りの**各トークン単位**で、トークン全体が `*/gh`（非空白プレフィックス + /gh）
#        に一致する場合のみトークンを "gh" へ置き換える（部分削除はしないため、同一トークン内の
#        他の文字列が消えることはない。`gh-helper`・`ghcr.io/foo` のような "/gh" で終わらない
#        トークンは対象外）
#   さらに deny 証拠の部分文字列照合（pulls/<n>/merge・mergePullRequest 等）は、メタ文字を
#   保持した `norm` とメタ文字分割済みの `tokenized` の**両方**に対して行い、どちらかで
#   成立すれば deny する（片方の正規化で証拠が変形しても他方で検出する over-deny 合成）。
#
#   スコープ外として扱う難読化（best-effort の残存ギャップ。issue #197 で追跡）:
#   ブレース展開（`m{erge,}`・`m{e,}rge`・`m{e,{}}rge` 等）と glob 展開（`[m]erge`・`me?ge`・
#   `m*ge` 等）は、実行時にのみ語が復元されるため文字列照合では確実に追えない。これらを raw
#   段階で構文検知して deny する案は PR #195 で試みたが、ブレース展開の成立条件（行内に
#   未クォートの `,`/`..`）や glob の文字クラスが、この Workflow の monitor/worktree agent 自身が
#   多用する `gh api graphql -f query='...{...,...}...'`（GraphQL の引数リスト・入力オブジェクト）
#   や `--jq '{a, b}'`（jq object 構築）と構文上区別できず、クォート状態を追跡しない検知は
#   **このスキル自身の正当な読み取りコマンドを大量に誤 deny してスキルを機能不全にする**ことが
#   判明した（クォート追跡は PR #195 の別ラウンドで P0 回帰を出したため採らない）。したがって
#   ブレース展開・glob 展開による難読化は、既に文字列照合では防げないと明記している間接実行
#   （eval・base64 復元・変数間接呼び出し・コマンド置換 $(...)）と同じ残存リスククラスとして
#   受容する。実強制は「自動マージを行わない」方針とサーバ側 branch protection が担う。
#
#   この設計が安全な理由（クォート状態を追跡しない over-deny が under-deny を生まないことの
#   根拠）: 本 hook はコマンド区切り（; & | 等）によるセグメント分割を行わず（前述のとおり
#   PR #195 の2ラウンドでいずれも P0 の回帰を出したため撤回済み）、正規化済みコマンド全体を
#   1 単位としてトークンの語順部分列一致で判定する。`tokenized` は `norm` に対して
#   (a) トークン区切りを増やす置換（メタ文字→空白）、(b) トークン全体一致時のみの "gh" への
#   置換、のみを行う。(a) は判定対象のトークン列を細分化する方向、(b) は検知語（gh 等）への
#   一致を増やす方向にしか働かない。これらの変換は証拠の部分文字列を変形しうるが、証拠照合は
#   変換を受けない `norm` にも常に並行して行うため、deny 判定が減る方向には働かない。GraphQL
#   クエリの文字列引数中のリテラルや
#   `echo 'gh pr merge のことです'` のような説明文が偶然語順を構成する場合も deny されるが、
#   これは意図した over-deny であり best-effort として許容する（誤 deny の実害は subagent が
#   コマンドを言い換えて再実行する手間のみ）。
#
# set -f はトークン走査（`for tok in $s`）でのパス名展開を無効化する（cwd のファイル名が
# トークン列へ混入する非決定性を排除。本スクリプトは glob を一切必要としない）。
set -uf

# deny 応答を出力して終了する。reason は本スクリプト内の固定文言のみを渡す契約
# （外部入力を埋め込むと JSON 破壊・reason 経由の注入面になるため禁止）。
deny() {
  printf '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"implement-issue-tree-merge-guard: %s"}}\n' "$1"
  exit 0
}

input=$(cat) || deny "stdin の読み取りに失敗したため deny（fail-closed）"

# main スレッドの入力（agent_id フィールドを含まない hook JSON）は jq の有無より前に許可する。
# jq 不在の環境で main スレッドの全 Bash コマンドをロックアウトしないための入口判定であり、
# 文字列 "agent_id" を含む入力はすべて後段の厳密判定（jq パース）へ回す（subagent の判定を
# この簡易照合で許可側へ倒すことはない）。
case "$input" in
  *'"agent_id"'*) : ;;
  *) exit 0 ;;
esac

# jq 不在は subagent 判定が不能のため fail-closed（許可へ倒すと hook が形骸化する）
command -v jq >/dev/null 2>&1 || deny "jq が見つからないため deny（fail-closed）。jq を導入すること"

# agent_id 判定より前のパース失敗も deny でよい（不正な hook 入力を許可へ倒さない）
agent_id=$(printf '%s' "$input" | jq -r '.agent_id // empty' 2>/dev/null) \
  || deny "hook 入力 JSON のパースに失敗したため deny（fail-closed）"

# main スレッド（agent_id 空値）は制限対象外。何も出力せず許可する
[ -z "$agent_id" ] && exit 0

cmd=$(printf '%s' "$input" | jq -r '.tool_input.command // empty' 2>/dev/null) \
  || deny "tool_input.command の取得に失敗したため deny（fail-closed）"

# command が空（Bash 以外のツール・空コマンド）は照合対象がないため許可
[ -z "$cmd" ] && exit 0

# --- deny 最前段: デコード用プリミティブの存在検知（raw コマンドに対して）----------------
# ANSI-C クォート（$'\x67\x68' 等）と IFS 由来展開（$IFS / ${IFS} / ${IFS%?} 等）は、
# 文字削除ベースの正規化では意味的にデコードできない（16/8/Unicode エスケープの復元・
# パラメータ展開の評価はシェルの実行時にしか起きない）。正当な gh コマンドはこれらを
# 使わない前提のため、構文の存在自体を raw 段階で検知して deny する（過検知は fail-closed
# 方向で安全）。これは既知の直接実行難読化を減らす best-effort であり、間接実行
# （eval・base64 復元・変数間接呼び出し・コマンド置換 $(...) 等）は文字列照合では原理的に
# 防げない。本 hook は完全なサンドボックスではない（実強制は「自動マージを行わない」方針と
# サーバ側 branch protection が担う。ファイル冒頭コメント・SKILL.md 参照）。
if printf '%s' "$cmd" | grep -qE "[$]'"; then
  deny "ANSI-C クォート構文（\$'...'）を含むコマンドは deny（デコードで難読化されたマージ経路を防ぐ best-effort。fail-closed）"
fi
if printf '%s' "$cmd" | grep -qE '[$]\{?IFS'; then
  deny "IFS 由来の展開（\$IFS / \${IFS} / \${IFS%?} 等）を含むコマンドは deny（トークン分割難読化を防ぐ best-effort。fail-closed）"
fi

# --- 正規化 第1段（norm）: 文字レベルの難読化（クォート分割・行継続・IFS 直書き）を潰す ---
# subagent からのマージ系コマンドはすべて deny（allow 経路なし）。以下の順で正規化する:
#   (1) バックスラッシュ + 改行の行継続を除去
#   (2) 改行 → 空白
#   (3) ${IFS} / $IFS（波括弧あり/なし）を空白へ置換（gh${IFS}pr${IFS}merge のトークン分割難読化を潰す）
#   (4) シングル/ダブルクォート文字の除去（g''h → gh 等のクォート分割難読化を潰す）
#   (5) 残存する単独バックスラッシュを全除去（g\h pr merge / gh a\lias 等の直接実行形を潰す）
#   (6) 連続空白の圧縮
# norm ではトークン境界を変更する置換（メタ文字空白化・basename 正規化）を**行わない**。
# 証拠の部分文字列照合（pulls/<n>/merge 等）の照合対象を変形させないためであり、トークン
# 境界に依存する正規化はすべて第2段（tokenized）で行う（合成順序の設計根拠はファイル冒頭の
# コメント参照）。${IFS} 展開や ANSI-C クォート（$'...'）の「意味的デコード」は文字削除では
# 追えないため、それらは本正規化ではなく前段の「デコード用プリミティブの存在検知 deny」で
# raw 段階で弾いている。これらにより既知の直接実行形は塞ぐが、間接実行（eval・base64 復元・
# 変数間接呼び出し・コマンド置換 $(...) 等）までは文字列照合では防げない（残存リスク。
# ファイル冒頭コメント・SKILL.md 参照。実強制は「自動マージを行わない」方針とサーバ側
# branch protection が担う）。
norm=$(printf '%s\n' "$cmd" \
  | awk '{ if (sub(/\\$/, "")) printf "%s", $0; else print }' \
  | tr '\n' ' ' \
  | sed -e 's/[$]{IFS}/ /g' -e 's/[$]IFS/ /g' \
  | tr -d "'\"" \
  | tr -d "\\\\" \
  | tr -s '[:space:]' ' ')

# トークン列（空白区切り）の各トークンについて、トークン全体が「非空白プレフィックス + /gh」
# に一致する場合のみ "gh" へ置き換える（パス修飾起動の basename 正規化。部分削除はしない —
# 旧 sed 実装の貪欲プレフィックス削除が同一トークン内の deny 証拠まで消した Bugbot High の
# 再発防止。ファイル冒頭コメント参照）。メタ文字空白化の**後**に呼ぶ契約（`/usr/bin/gh&&true`
# のような glued トークンを先に `/usr/bin/gh` と `true` に分離してから basename を見る）。
normalize_gh_tokens() {
  local s="$1" tok out=""
  for tok in $s; do
    case "$tok" in
      */gh) tok="gh" ;;
    esac
    out="$out $tok"
  done
  printf '%s' "$out"
}

# --- 正規化 第2段（tokenized）: トークン境界の確定 → トークン単位 basename 正規化 ---------
# 合成順序が本質（ファイル冒頭コメント「メタ文字空白化 → トークン単位 basename 正規化という
# 合成順序」参照）:
#   (1) シェルメタ文字（; & | < > ( ) { } `（バッククォート）・$）を無条件に空白へ置換し、
#       制御演算子が空白なしで連結された形（`merge;echo`・`merge&&true`・`/usr/bin/gh&&true`
#       等）をトークン境界として分離する（over-deny 設計）
#   (2) 連続空白の圧縮
#   (3) トークン単位の basename 正規化（normalize_gh_tokens。トークン全体が */gh の場合のみ）
tokenized=$(printf '%s' "$norm" \
  | sed -e 's/[;&|<>(){}`$]/ /g' \
  | tr -s '[:space:]' ' ')
tokenized=$(normalize_gh_tokens "$tokenized")

# deny 証拠の部分文字列照合。メタ文字を保持した norm とトークン分割済みの tokenized の両方を
# 照合し、どちらかで成立すれば真（片方の正規化で証拠が変形しても他方で検出する over-deny 合成。
# 例: `merges;echo` の glued 境界は tokenized 側で、`pulls/$PR/merge` の `$` 混じり URL は
# norm 側で検出される）。
evidence() {
  printf '%s' "$norm" | grep -qE "$1" && return 0
  printf '%s' "$tokenized" | grep -qE "$1"
}

# フラグトークン（`-` で始まるすべてのトークン）を除去したトークン列を返す。
# 値トークンは孤立して残る（ファイル冒頭の設計注記のとおり、これは語順部分列判定と
# 組み合わせる前提で安全側）。
strip_flags() {
  local s="$1" tok out=""
  for tok in $s; do
    case "$tok" in
      -*) : ;;
      *) out="$out $tok" ;;
    esac
  done
  printf '%s' "$out"
}

# $1 に渡したトークン列（空白区切り、word-splitting 前提）の中に、$2 以降で指定した語が
# **この順序で**（連続でなくてよい）出現するかを判定する。
contains_subsequence() {
  local tokens="$1"; shift
  local -a want=("$@")
  local idx=0 tok
  for tok in $tokens; do
    if [ "$tok" = "${want[$idx]}" ]; then
      idx=$((idx + 1))
      [ "$idx" -eq "${#want[@]}" ] && return 0
    fi
  done
  return 1
}

# フラグ除去後のトークン列（メタ文字区切り済みの tokenized が対象。セグメント分割は行わない —
# 理由はファイル冒頭のコメント参照）。
all_nf=$(strip_flags "$tokenized")

# gh pr merge（あらゆる形。グローバルオプションの挟み込みで迂回不可）
if contains_subsequence "$all_nf" gh pr merge; then
  deny "subagent からの gh pr merge は禁止（この基盤では自動マージを行わない。マージは GitHub 上で人間が行う）"
fi

# gh api 経由のマージ（グローバルオプションの挟み込みで迂回不可）
if contains_subsequence "$all_nf" gh api; then
  # REST merge: PUT repos/<owner>/<repo>/pulls/<n>/merge
  if evidence 'pulls/[^[:space:]]*/merge'; then
    deny "subagent からの REST merge（gh api pulls/<n>/merge）は禁止"
  fi
  # REST ブランチマージ: POST repos/<owner>/<repo>/merges
  if evidence '/merges([[:space:]?]|$)'; then
    deny "subagent からの REST ブランチマージ（gh api repos/<o>/<r>/merges）は禁止"
  fi
  # GraphQL merge / auto-merge 有効化 / ref 直接マージ mutation。
  # mergeBranch は PR を経由せず head ref を base へ直接マージできる迂回経路として塞ぐ。
  if evidence 'mergePullRequest|enablePullRequestAutoMerge|mergeBranch'; then
    deny "subagent からの GraphQL merge 系 mutation（mergePullRequest / enablePullRequestAutoMerge / mergeBranch）は禁止"
  fi
fi

# レビュー承認（外部レビューゲートの自作自演を防ぐ）。--approve はフラグなので
# strip_flags 後には残らない。tokenized（フラグ除去前・メタ文字区切り済み）に対して判定する
# ことで、`--approve;echo` のようにメタ文字が空白なしで後置された形の境界判定漏れも防ぐ。
if contains_subsequence "$all_nf" gh pr review \
  && printf '%s' "$tokenized" | grep -qE '(^|[[:space:]])--approve([[:space:]]|$|=)'; then
  deny "subagent からの gh pr review --approve は禁止"
fi

# 別名・拡張経由の迂回封じ: gh alias（set / import 等すべて）・gh extension（install 等）
if contains_subsequence "$all_nf" gh alias; then
  deny "subagent からの gh alias は禁止（別名経由のマージ迂回を防ぐ）"
fi
if contains_subsequence "$all_nf" gh extension \
  || contains_subsequence "$all_nf" gh extensions; then
  deny "subagent からの gh extension は禁止（拡張経由のマージ迂回を防ぐ）"
fi

# マージ系以外のコマンド（gh pr comment による催促・読み取り系等）は許可
exit 0
