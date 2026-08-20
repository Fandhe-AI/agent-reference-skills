---
name: update-issue-tree
description: >
  既存の GitHub Issue ツリーを棚卸し・更新するスキル。「ツリーを棚卸しして」「イシューツリーを更新して」「トラッキング issue を整理して」で使用。
  ルートのトラッキング issue 番号を受け取り、sub_issues API でツリー全体を再帰取得 → closed 親下の残置 open issue 付け替え・孤児の再配置・新 Phase 親の新設・phase ラベル同期 →
  ルート issue 本文の Phase 別表・棚卸しセクションを再生成して更新する。
  ツリー新規作成は create-issue-tree、実装消化は implement-issue-tree を参照。
model: opus
user-invocable: true
argument-hint: "<ルートトラッキング issue 番号>"
---

# update-issue-tree

既存の Issue ツリーを棚卸しし、ルート issue 本文を最新状態に再生成する。
closed 親下に残置された open issue の付け替え・孤児の再配置・phase ラベルの同期を実施し、implement-issue-tree が post-order DFS で消化できる構造を維持する。

## 使い方

ルートのトラッキング issue 番号を引数として渡す。

```
update-issue-tree 42
```

## 前提条件

- `gh` CLI がインストールされ、認証済みであること（`gh auth status` で確認）
- 対象リポジトリへの Issue 書き込み権限があること
- 対象ツリーは**単一リポジトリ内**で完結していること。GitHub の sub-issues はリポジトリを
  跨いで紐付けられるが、本スキルは cross-repository sub-issue を**対象外**とする。
  親リポジトリへの書き込みは本スキルの前提条件（対象リポジトリへの書き込み権限）の
  外側にあり、誤ったリポジトリの同番号 issue を操作する事故（PR #314 の P0）を構造的に
  防ぐため。この契約の実装は `scripts/reassign-sub-issue.sh` の **exit 2 による
  fail-closed**（下記 Step 3 の終了コード表を参照）。exit 2 は gh/jq 不在・未認証・issue
  取得失敗（解消可能な前提不備）とも共有するため、このケースだけ stderr に
  `reason=cross-repository-parent` の安定マーカー行が追加で出る（終了コード表参照）
- 対象 issue の親が**別リポジトリ**にある場合、`scripts/reassign-sub-issue.sh` がその issue を
  処理できるのは、親リポジトリ側で親リンクが取り外され `parent_issue_url` が null（どの親にも
  紐付いていない）状態になってからである。cross-repository の親リンクの取り外しは
  **親リポジトリ側の操作**であり、そのリポジトリへの書き込み権限を持つ担当者が行う。本スキルの範囲外
- **同一リポジトリ内での親の付け替えは本スキルの中核機能であり、上記の null 要求の対象外**である。
  Step 3 は承認済みの旧親を `--old-parent` に渡して DELETE→POST を実行するため、事前に
  `parent_issue_url` を null にしておく必要はない（孤児の再配置は Step 4 が `--old-parent` 省略で扱う）

## フロー

### Step 1: ツリー全体を再帰取得する

ルート issue から sub_issues API を再帰的に呼び出し、全階層のツリー構造を取得する。  
ページネーションを考慮し、`per_page=100` で全件取得する。

```bash
ROOT_NUMBER="<ルート issue 番号>"

# ルート直下の sub-issues を取得（ページネーション対応）
fetch_sub_issues() {
  local PARENT="${1}"
  local PAGE=1
  while true; do
    RESULT=$(gh api \
      "repos/{owner}/{repo}/issues/${PARENT}/sub_issues?per_page=100&page=${PAGE}")
    echo "${RESULT}"
    COUNT=$(echo "${RESULT}" | jq 'length')
    if [ "${COUNT}" -lt 100 ]; then break; fi
    PAGE=$((PAGE + 1))
  done
}

# ルートから再帰的にツリーを構築
fetch_sub_issues "${ROOT_NUMBER}"
```

各 issue の `state`（open / closed）・ラベル・タイトルを記録してツリーマップを作成する。

### Step 2: 棚卸し対象を特定する

取得したツリーマップを分析し、以下のケースを特定する。

| ケース | 対応方針 |
|--------|---------|
| closed 親の下に open issue が残置されている | 適切な open Phase 親へ付け替え |
| どの親にも紐付いていない孤児 issue がある | 該当 Phase 親へ紐付け（Phase が不明な場合はユーザーに確認） |
| phase ラベルが親と一致しない issue がある | ラベルを同期 |
| 既存 Phase に収まらない新規タスクがある | 新 Phase 親の新設を検討 |
| 4h 超の issue が分解されていない | sub-issue に分解（create-issue-tree と同じ粒度基準） |
| 対象 issue の親が別リポジトリにある（cross-repository sub-issue） | 本スキルの対象外。棚卸し対象から除外し、Step 9 の要確認事項へ記載する |

棚卸し対象の一覧をユーザーに提示し、方針確認を取ってから変更を実行する。

**承認された対象を Step 3 / Step 4 が読む 2 つの計画配列へ落とす。** 配列は必ず宣言する
（対象 0 件でも空配列として宣言する）。未宣言のまま Step 3 / Step 4 へ進むと
`"${REASSIGN_PLAN[@]}"` が空展開され、承認済みの対象があってもエラーなく 0 件で完走して
完了報告まで進んでしまうため、両ステップの冒頭で宣言の有無を検査して fail-closed で停止する。

```bash
# 承認された「closed 親下の付け替え」対象。要素は "<issue> <old-parent> <new-parent>"。
# 空白区切りの 1 行 1 件にするのは、Step 3 のループが read で分割して受け取るため。
# issue 番号は全て 10 進の正整数であり、空白・改行を含まないことを Step 1 の取得時に保証する。
REASSIGN_PLAN=(
  # "123 456 789"
)

# 承認された「孤児の再配置」対象。要素は "<orphan-issue> <phase-parent>"。
ORPHAN_PLAN=(
  # "234 789"
)
```

対象が 0 件の場合も上記のとおり**空配列として宣言する**。「対象なし（空配列）」と
「計画未設定（未宣言）」は意味が異なり、後者は Step 2 の実行漏れであって正常系ではない。

### Step 3: closed 親下の残置 open issue を付け替える

closed 親の下に残置されている open issue を、対応する open Phase 親へ移動する。
「旧親から DELETE → 新親へ POST」の 2 段操作と、その前後の冪等性判定・事後確認は
`scripts/reassign-sub-issue.sh` に集約されている（Issue #297。旧方式は SKILL.md 本文に
素の `gh api` を並べていたため、DELETE 失敗検知なしに POST へ進む等の欠陥があった）。
その呼び出し側で必要な共有処理（計画配列の存在・型検証、1 件呼び出しの終了ステータス解釈）は
`scripts/reassign-lib.sh` に切り出してあり、Step 3 / Step 4 がそれぞれ source して使う。

**各コードフェンスは独立したシェルで実行され得る**（`reassign-sub-issue.sh` の設計前提と同じ）。
そのため共有処理をどちらかのフェンス内で定義して他方が再利用する構成にはしない。Step 4 の
実行時に関数定義が継承されず `command not found` となり、孤児の再配置が一切実行されないため
（Issue #372 / PR #374 codex-review P1 第 3 ラウンド）。両 Step のフェンスは同一の前置きで
`reassign-lib.sh` を自己完結的に解決・source する。

このスキルの配置ルートは導入形態（本リポジトリのソース／`npx skills add` による
vendoring／`.claude/skills/` symlink 経由）で異なる。source 前に 3 レイアウトを順に確認し、
実在するものを採用する（implement-issue-tree の `scriptPath` 3 レイアウト・contribute-skill の
`LOCAL_SKILL_DIR` 解決と同じ考え方）。`reassign-sub-issue.sh` のパスはここでは指定しない——
ライブラリが自身の実体位置から兄弟として解決するため、どの導入形態でも対の実体が必ず組み合う。

```bash
# reassign-lib.sh を 3 レイアウトから解決して source する。
# **この前置きは Step 3 / Step 4 の両フェンスが同一の内容で持つ。** 手順書のコードフェンスは
# ブロックごとに独立シェルで実行され得るため、片方のフェンスで定義した関数・変数がもう一方へ
# 継承される保証がない（Issue #372 / PR #374 codex-review P1）。
REASSIGN_LIB=""
for CANDIDATE in \
  "skills/update-issue-tree/scripts/reassign-lib.sh" \
  ".agents/skills/update-issue-tree/scripts/reassign-lib.sh" \
  ".claude/skills/update-issue-tree/scripts/reassign-lib.sh"; do
  # 存在確認は -f のみで行う（-x にすると、npx skills add 等の vendoring で
  # 実行ビットが落ちたファイルを「存在しない」と誤検知し、3 レイアウトいずれにも
  # 見つからないという誤ったエラーメッセージになる）
  if [[ -f "${CANDIDATE}" ]]; then
    REASSIGN_LIB="${CANDIDATE}"
    break
  fi
done
if [[ -z "${REASSIGN_LIB}" ]]; then
  echo "エラー: reassign-lib.sh が見つからない（3 レイアウトいずれにも存在しない）" >&2
  exit 1
fi
# ライブラリは対の reassign-sub-issue.sh の存在まで確認したうえで、reassign_one /
# require_plan_array と REASSIGN_SCRIPT を定義する。欠落していれば非ゼロを返すので中断する。
# このフェンスで set -euo pipefail を使ってはならない（理由は reassign-lib.sh 冒頭のコメント参照。
# set -e があると reassign_one 内の `status=$?` 退避に到達せず、Issue #335 の欠陥が再発する）
source "${REASSIGN_LIB}" || exit 1

# 計画配列の存在・型ガード（fail-closed）。詳細は reassign-lib.sh の require_plan_array を参照
require_plan_array REASSIGN_PLAN || exit 1

# 呼び出し側ループ。契約の主体はここにある——「(b) 恒久的な対象外は次の 1 件へ進み、
# (a) 解消可能な前提不備は原因解消まで中断する」を実際に実現するのはこのループである。
# ISSUE_NUMBER / OLD_PARENT / NEW_PARENT は Step 2 で構築した REASSIGN_PLAN から供給する。
SKIPPED=()
NEEDS_REVIEW=()
for ENTRY in "${REASSIGN_PLAN[@]}"; do
  # ENTRY は "<issue> <old-parent> <new-parent>" 形式。
  # zsh は未クォートの展開を単語分割しないため、read で明示的に分割する
  IFS=' ' read -r ISSUE_NUMBER OLD_PARENT NEW_PARENT <<< "${ENTRY}"
  # `if reassign_one ...; then ... fi` の形にしてはならない。条件が偽で else が無い場合、
  # `fi` の直後の $? は 0 になり（実測済み）、失敗が「成功」として読まれて
  # (a)/(b)/(c) の判定も中断もすべて素通りする。`|| status=$?` で明示的に退避する。
  status=0
  reassign_one --issue "${ISSUE_NUMBER}" \
               --old-parent "${OLD_PARENT}" \
               --new-parent "${NEW_PARENT}" || status=$?
  if (( status == 0 )); then
    continue
  fi
  if (( status == 9 )); then
    # (b) cross-repository 親。棚卸し対象から除外して次へ（Step 9 の要確認事項へ記載）
    SKIPPED+=("${ISSUE_NUMBER}")
    continue
  fi
  if (( status == 10 )); then
    # (c) 補償復旧が成功し旧親へ復帰済み（本来の付け替えは未達）。fatal にせず要確認事項へ
    # 記録して次の 1 件へ進む。exit 10 を中断扱いにすると残りの REASSIGN_PLAN が未処理のまま
    # 中断し、Step 4 の孤児処理・Step 9 の報告経路自体がスキップされてしまう
    NEEDS_REVIEW+=("#${ISSUE_NUMBER}: exit=10 restored — 旧親 #${OLD_PARENT} へ復帰済み。新親 #${NEW_PARENT} への付け替えは未達")
    continue
  fi
  if (( status == 11 )); then
    # (c) DELETE 後、第三者が別親を設定済みのため補償せず見送り。同一コマンドでの再実行禁止を
    # 記録に残したうえで、fatal にせず次の 1 件へ進む
    NEEDS_REVIEW+=("#${ISSUE_NUMBER}: exit=11 third-party-parent — 旧親 #${OLD_PARENT} から DELETE 済み、第三者が別親を設定済み。同じコマンドで再実行禁止。stderr の実測親を確認しユーザー承認のうえ再実行すること")
    continue
  fi
  # (a) それ以外（exit 1-8。9・10・11 を除く）は握り潰さず中断する。原因を解消してから再実行する
  echo "エラー: #${ISSUE_NUMBER} の付け替えが exit ${status} で失敗した。中断する" >&2
  exit "${status}"
done
if (( ${#SKIPPED[@]} > 0 )); then
  echo "対象外（cross-repository 親）: ${SKIPPED[*]}" >&2
fi
if (( ${#NEEDS_REVIEW[@]} > 0 )); then
  echo "要確認事項（Step 9 のレポートへ転記すること）:" >&2
  printf '  %s\n' "${NEEDS_REVIEW[@]}" >&2
fi
```

`reassign_one` は**1 件分の呼び出し**であり、非ゼロ終了は**当該 1 件の失敗**として
関数の返り値へ伝播する。判定に必要な stderr は関数内で捕捉したうえで必ず再出力するため、
診断情報は失われない。呼び出し側ループは Step 9 の要確認事項へ記録したうえで、次の 3 通りに
振り分ける。**(a) 解消可能な前提不備**（exit 2 のうち `gh`/`jq` 不在・未認証・issue 取得失敗等。
9・10・11 を除く exit 1〜8 全般）は原因解消まで中断する。**(b) 恒久的な対象外**
（cross-repository 親。exit 9）は要確認事項へ記載して棚卸し対象から除外し、次の 1 件の
呼び出しへ進む。**(c) 部分的に変更済みだが処理は継続してよいもの**（exit 10 = DELETE 後の
補償復旧が成功し旧親へ復帰済み・exit 11 = DELETE 後に第三者が別親を設定済みで補償を見送り）は
要確認事項へ記録したうえで、fatal にせず次の 1 件へ進む。exit 10 / 11 を即 `exit` で中断すると
残りの `REASSIGN_PLAN` が未処理のまま止まり、Step 4 の孤児処理・Step 9 の報告経路自体が
スキップされる欠陥になるため、この 2 コードはループを止めない（終了コード表を参照）。
(a)/(b) の判定は stderr に `reason=cross-repository-parent` が出ているかで機械的に行う
（無ければ (a)）。(c) は返り値がそのまま 10 / 11 であるため、判定に stderr のマーカーは不要。

**(c) だけを継続対象にする理由（exit 3/4/5/7/8 は継続しない）**: 終了コード表を見ると
exit 3・4・5・7・8 も「呼び出し側の扱い」欄に「要確認事項へ記載」と書かれており、一見
(c) と同じに見える。しかし止める・止めないの分岐点は「要確認事項へ記載するか」ではなく
**当該 1 件の終端状態が実測で確定しているか**である。exit 10 / 11 は補償復旧ルーチンが
実状態を再取得した末に「旧親配下」「第三者親配下」という**確定した終端状態**へ着地しており、
次の 1 件へ進んでも新たな破壊は生じない。対して exit 3（DELETE 失敗）・4（POST 失敗）・
5（事後確認不一致）・7（POST 時点のレース）・8（補償も失敗し状態不明/孤児）は、無変更・
孤児化・状態不明のいずれかであり、原因（`gh` 認証切れ・API 障害・レース条件）が
**後続の全件に共通して波及する可能性が高い**ため、1 件で切り上げて原因究明を優先する。
この境界線は Cursor Bugbot 指摘への対応として exit 10 / 11 に限定して導入したものであり、
3/4/5/7/8 へ安易に拡張しない。

**引数**

| 引数 | 必須 | 意味 |
|------|------|------|
| `--issue` | 必須 | 付け替え対象の issue 番号 |
| `--new-parent` | 必須 | 付け替え先の issue 番号。DELETE の前に新親を GET し、存在すること・`--issue` 自身でないこと（自己参照）・対象 issue と同一リポジトリにあることを検証する。いずれかを満たさない場合は**DELETE を 1 件も撃たずに** exit 1（自己参照）/ exit 2（存在しない・別リポジトリ）で無変更終端する |
| `--old-parent` | 任意 | 現在の親。Step 2 でユーザーが承認した旧親を渡す。実測した現在の親と食い違う場合は**何も変更せず exit 6 で停止**する（承認外の親子関係を壊さないため）。省略時は「孤児である」ことを承認した意味になり、実測で親が居れば同じく exit 6 で停止する |
| `--repo` | 任意 | `owner/name`。**対象 issue（`--issue`）の所在**であり、親（`--old-parent` / `--new-parent`）の所在ではない。省略時は cwd の git remote から解決。`--repo` は対象 issue の GET だけでなく DELETE / POST を含む全 API パスを切り替えるため、親が別リポジトリにあるからといって親リポジトリの値を入れてはならない（入れると親リポジトリ側の同番号 issue を誤操作する。PR #314 の P0） |

**終了コードと `result=` 行**

stdout 最終行が `result=<state> issue=<n> new_parent=<n> old_parent=<n|->` の形式で
機械可読な内訳を返す。**非ゼロ終了は 1 件も握り潰さず、Step 9 の完了レポートの
「要確認事項」へ必ず記載する。**

| 終了コード | `state` | 意味 | 呼び出し側の扱い | 変更の有無 |
|-----------|---------|------|----------------|-----------|
| 0 | `reassigned` | DELETE→POST を実施 | 「付け替え」件数へ計上 | 変更あり（成功） |
| 0 | `already-attached` | 既に新親配下（no-op） | 件数へ計上しない | 無変更（no-op） |
| 0 | `posted-only` | 旧親配下になく POST のみ | 「孤児の再配置」件数へ計上（Step 4 と同一スクリプト） | 変更あり（POST のみ） |
| 1 | — | 引数・使い方エラー（**`--new-parent` の自己参照を含む**） | 実行者の誤り。修正して再実行 | **無変更**（API 未実行） |
| 2 | — | 前提不備。2 類型が混在し、**stderr のマーカー行で機械的に判定する**: `reason=cross-repository-parent` が出ていれば (b)、無ければ (a)。(a) 解消して再実行できるもの（`gh`/`jq` 不在・未認証・issue 取得失敗・**新親が存在しない**・**新親が Pull Request**・**新親が別リポジトリ**）と、(b) **恒久的に対象外**の cross-repository 親（同一コマンドの再実行では解決しない。親リポジトリ側で親リンクが外れるまで本スキルでは処理できない） | (a) は原因を解消して再実行。(b) は要確認事項へ記載し、棚卸し対象から除外する（Step 2 参照） | **無変更**（DELETE / POST 未実行） |
| 3 | — | DELETE 失敗。**POST は実行していない** | 要確認事項へ記載。旧親配下のまま | **無変更**（DELETE 失敗・旧親配下のまま） |
| 4 | — | POST 失敗（**孤児経路のみ**。DELETE を伴わないため無変更） | 要確認事項へ記載 | **無変更**（DELETE 未実行） |
| 5 | — | 事後確認で新親配下に見つからない（別リポジトリの親配下にある場合を含む） | 要確認事項へ記載。手動で実状態を確認 | 変更あり（DELETE / POST は実行済み・実状態の手動確認が必要） |
| 6 | — | **承認された旧親と実測が食い違う。何も変更していない** | 要確認事項へ記載。**同じコマンドで再実行してはならない。** stderr が示す実測の親をユーザーへ提示して承認を得たうえで、`--old-parent` にその値を入れて再実行する | **無変更** |
| 7 | — | POST 時点で別の親が付いていたレース。**DELETE 未実行のため無変更** | 要確認事項へ記載。実測し直して承認を取り直したうえで再実行する | **無変更**（DELETE 未実行） |
| 8 | — | DELETE 後の POST 失敗に対する補償復旧を試みたが**孤児のまま／状態不明／第三者の親配下で終端**（補償 POST 自体の失敗・復旧用の再取得失敗・補償後の検証不一致・反映遅延の再確認不一致のいずれか。`reason=compensation-post-failed`（実測でも孤児）/ `reason=compensation-post-failed-third-party-parent`（補償 POST 失敗中に第三者が別の親を設定済みと実測）/ `reason=recovery-state-unknown`（再取得・反映遅延再確認のいずれかが失敗、または不一致）で内訳を判別） | 要確認事項へ記載。**無変更ではない。** 実状態を確認し必要なら手で紐付け直す。同一コマンドの再実行では回復しない | **部分変更**（旧親から外れ、新親にも付いていない。第三者配下の場合を除く） |
| 10 | `restored` | DELETE 後の POST 失敗に対する補償復旧が**成功**し、実測で旧親配下へ復帰した（本来の目的だった新親への付け替えは未達） | 要確認事項へ記載（本来の付け替えが未達のため）。件数へは計上しない | **変更あり**（旧親へ復帰。新親への付け替えは不成立） |
| 11 | — | DELETE 後の POST 失敗を受けて再取得したところ、**第三者が別の親を設定済み**だったため補償せず見送った（`reason=third-party-parent`） | 要確認事項へ記載。**同じコマンドで再実行してはならない。** stderr が示す実測の親をユーザーへ提示して承認を得たうえで再実行する | **変更あり**（旧親からは既に DELETE 済み。**「補償 POST を撃たず fail-closed で停止」は新親への POST 側の話であり、DELETE は exit 11 に到達する時点で既に成立している。** 実測では第三者が設定した別親配下にある） |

**スクリプト自身は 0〜8・10・11 を返す（9 は使わない）。** `reassign-lib.sh` の
`reassign_one` ラッパは、これに加えて **9 = 恒久的に対象外（cross-repository 親）** を返す
（Issue #372）。9 はスクリプトの終了コードではなく、ラッパが stderr の
`reason=cross-repository-parent` マーカーを判定して合成する値であり、呼び出し側ループが
「棚卸し対象から除外して次の 1 件へ進む」のシグナルとして使う。マーカーの判定には
スクリプトの stderr が必要なため、ラッパは stderr をファイルへ捕捉したうえで**必ず再出力する**
（診断情報は握り潰さない）。10・11 はラッパの「その他はスクリプトの終了コードをそのまま返す」
契約により無加工で透過するため、`reassign-lib.sh` 側の変更は不要。

**DELETE 後の POST 失敗時の補償復旧の契約（Issue #352）**: #333 の事前検証は「事前に判定できる
拒否条件」を DELETE 前に潰すが、DELETE と POST の間のレース・一時的な 5xx は事前判定できない
残余として残る。旧方式（exit 4 / exit 8 で即終端）はこの残余を報告のみで放置し、対象 issue を
孤児のまま滞留させていた。新方式は POST 失敗を検知した時点で**対象 issue の実状態を再取得**
してから分岐する（実測を先に確定させてから動くのは #333 の 3.3 節と同じ処理順序）:
- 実測の親が新親 → POST は偽陰性だった。通常の成功終端（`exit 0` / `result=reassigned`）と同じ扱い
- 実測で孤児 → 1 回の読み取りだけでは DELETE/POST の反映遅延による過渡状態を見ている
  可能性を排除できないため、補償 POST という書き込みを行う前に短い間隔を空けて再取得し、
  2 回連続で親なしが観測できて初めて安定した孤児として確定する（cursor[bot] Medium 指摘
  「Orphan restore skips stability check」）。安定確認できれば、承認済み操作の逆操作
  （旧親へ戻す）は承認範囲内のため補償 POST を撃つ。成功なら事後確認を取り直し
  `exit 10` / `result=restored`。補償 POST 自体が失敗する多重障害、または再取得・事後確認・
  安定確認が失敗する状態不明ケースは書き込まずに `exit 8` で終端する
- 実測で第三者が別の親（別リポジトリを含む）を設定済み → **補償 POST を撃たず** `exit 11` で
  fail-closed 停止する。第三者が確定させた親子関係を上書きしない

**事前検証と事後報告の契約（AC5）**: 事前に判定できる拒否条件（新親の不存在・自己参照・
別リポジトリ）は DELETE を撃たずに exit 1 / 2 で無変更終端する。一方、**事前に判定できない
拒否条件（事前 GET と DELETE / POST の間に第三者が状態を動かすレース、循環参照、新親が
sub-issue を受け付けない状態など）は従来どおり exit 4 / exit 7 / exit 8 として事後に報告する**
契約であり、事前検証はこれを置き換えない。DELETE 後の POST 失敗（孤児化しうる部分変更）
だけは exit での即報告ではなく、上記の補償復旧ルーチンを経由してから exit 8 / 10 / 11 の
いずれかへ着地する（#352）。

**GET 回数（AC3）**: 新親の事前検証により、経路ごとの GET 回数が変わる。

| 経路 | 変更前 | 変更後 |
|------|-------|-------|
| 正常な付け替え（reassigned） | 2 | 3 |
| 孤児の再配置（posted-only） | 2 | 3 |
| already-attached（no-op） | 1 | 1（据え置き） |
| 承認不一致（exit 6） | 1 | 1（据え置き） |

追加は最大 1 回の GET で、`update-issue-tree` の 1 ラン当たりの呼び出し回数は数十件規模。
認証済み REST の 5,000 req/h に対して無視できる。対して防ぐのは**不可逆な孤児化**であり、
割に合う。孤児経路（DELETE を伴わず孤児化リスク自体は無い経路）にも検証を通しているのは、
「事前に判定できる拒否条件は必ず無変更で終端する」契約を経路によらず統一する意図的な判断
であり、「新親が存在しない場合の終了コードが exit 4 → exit 2 へ変わる」ことを含む。

### Step 4: 孤児 issue を再配置する

どの親にも紐付いていない孤児 issue を適切な Phase 親へ紐付ける。
`--old-parent` を省略して同じスクリプトを呼ぶ（DELETE を飛ばして POST のみ実行される）。
Phase が不明な issue はタイトル・本文を読んで判断し、判断できない場合はユーザーに確認する。

**このフェンスは Step 3 の実行結果に依存せず単体で実行できる。** フェンスは独立シェルで
実行され得るため、Step 3 が定義した関数・変数を継承しない前提で書く（Issue #372 /
PR #374 codex-review P1 第 3 ラウンド）。前置きは Step 3 と同一である。

```bash
# reassign-lib.sh を 3 レイアウトから解決して source する。
# **この前置きは Step 3 / Step 4 の両フェンスが同一の内容で持つ。** 手順書のコードフェンスは
# ブロックごとに独立シェルで実行され得るため、片方のフェンスで定義した関数・変数がもう一方へ
# 継承される保証がない（Issue #372 / PR #374 codex-review P1）。
REASSIGN_LIB=""
for CANDIDATE in \
  "skills/update-issue-tree/scripts/reassign-lib.sh" \
  ".agents/skills/update-issue-tree/scripts/reassign-lib.sh" \
  ".claude/skills/update-issue-tree/scripts/reassign-lib.sh"; do
  # 存在確認は -f のみで行う（-x にすると、npx skills add 等の vendoring で
  # 実行ビットが落ちたファイルを「存在しない」と誤検知し、3 レイアウトいずれにも
  # 見つからないという誤ったエラーメッセージになる）
  if [[ -f "${CANDIDATE}" ]]; then
    REASSIGN_LIB="${CANDIDATE}"
    break
  fi
done
if [[ -z "${REASSIGN_LIB}" ]]; then
  echo "エラー: reassign-lib.sh が見つからない（3 レイアウトいずれにも存在しない）" >&2
  exit 1
fi
# ライブラリは対の reassign-sub-issue.sh の存在まで確認したうえで、reassign_one /
# require_plan_array と REASSIGN_SCRIPT を定義する。欠落していれば非ゼロを返すので中断する。
# このフェンスで set -euo pipefail を使ってはならない（理由は reassign-lib.sh 冒頭のコメント参照。
# set -e があると reassign_one 内の `status=$?` 退避に到達せず、Issue #335 の欠陥が再発する）
source "${REASSIGN_LIB}" || exit 1

# Step 3 と同じガードを同じ関数で行う（非対称を作らない）
require_plan_array ORPHAN_PLAN || exit 1

SKIPPED_ORPHANS=()
NEEDS_REVIEW_ORPHANS=()
for ENTRY in "${ORPHAN_PLAN[@]}"; do
  # ENTRY は "<orphan-issue> <phase-parent>" 形式
  IFS=' ' read -r ORPHAN_NUMBER PHASE_NUMBER <<< "${ENTRY}"
  # Step 3 と同じ理由で `if ...; then ... fi` は使わない（`fi` 直後の $? は 0 になる）
  status=0
  reassign_one --issue "${ORPHAN_NUMBER}" --new-parent "${PHASE_NUMBER}" || status=$?
  if (( status == 0 )); then
    continue
  fi
  if (( status == 9 )); then
    SKIPPED_ORPHANS+=("${ORPHAN_NUMBER}")
    continue
  fi
  if (( status == 10 )); then
    # Step 3 と同じ (c) 扱い。孤児経路は --old-parent を渡さないため通常は起こり得ないが、
    # ループ構造を Step 3 と非対称にしないため同じ分岐を持つ
    NEEDS_REVIEW_ORPHANS+=("#${ORPHAN_NUMBER}: exit=10 restored — 補償復旧が発生。Phase 親 #${PHASE_NUMBER} への紐付けは未達。実状態を確認すること")
    continue
  fi
  if (( status == 11 )); then
    NEEDS_REVIEW_ORPHANS+=("#${ORPHAN_NUMBER}: exit=11 third-party-parent — 第三者が別親を設定済み。同じコマンドで再実行禁止。stderr の実測親を確認しユーザー承認のうえ再実行すること")
    continue
  fi
  echo "エラー: #${ORPHAN_NUMBER} の再配置が exit ${status} で失敗した。中断する" >&2
  exit "${status}"
done
if (( ${#SKIPPED_ORPHANS[@]} > 0 )); then
  echo "対象外（cross-repository 親）: ${SKIPPED_ORPHANS[*]}" >&2
fi
if (( ${#NEEDS_REVIEW_ORPHANS[@]} > 0 )); then
  echo "要確認事項（Step 9 のレポートへ転記すること）:" >&2
  printf '  %s\n' "${NEEDS_REVIEW_ORPHANS[@]}" >&2
fi
```

Step 3 と同一の関数・同一のループ構造であり、終了コードの扱いも同じ
（(a) 解消可能な前提不備のみ原因解消まで中断、(b) 恒久的な対象外（exit 9）は要確認事項へ記載して
次の 1 件へ進む、(c) 部分的に変更済みだが継続してよいもの（exit 10 / 11）も要確認事項へ記録して
fatal にせず次の 1 件へ進む。(b) の判定は関数が捕捉した stderr の
`reason=cross-repository-parent` マーカーで機械的に行い、返り値 9 として呼び出し側へ伝える。
終了コード表を参照）。

### Step 5: 必要に応じて新 Phase 親を新設する

既存 Phase に収まらない新規タスクが多い場合、新 Phase 親 issue を作成してルートへ紐付ける。
（この POST は `reassign-sub-issue.sh` を使わない。たった今作成した、親を持たないことが
自明な issue への単発 POST であり、DELETE パス・冪等性判定の対象外のため）

```bash
# phase ラベルが存在しないリポジトリでは issue 作成が失敗するため、必ず事前作成する
# （作成済みの場合は失敗を無視して続行する）
gh label create "phase:N" --color "0075ca" 2>/dev/null || true

# gh issue create は URL を出力する（--json 非対応）。URL 末尾から番号を抽出する
NEW_PHASE_URL=$(gh issue create \
  --title "feat(phase-N): Phase N タイトル" \
  --label "phase:N" \
  --body "$(cat <<'EOF'
## 概要

Phase N の実装タスクをまとめる親 issue。

## タスク一覧

| Issue | タイトル | 分解 |
|-------|---------|------|
EOF
)")
NEW_PHASE_NUMBER=$(printf '%s' "${NEW_PHASE_URL}" | grep -oE '[0-9]+$')

# ルートへ紐付け。sub_issue_id は issue 番号ではなく database id を渡す（GitHub sub-issues API 仕様）
NEW_PHASE_ID=$(gh api "repos/{owner}/{repo}/issues/${NEW_PHASE_NUMBER}" --jq '.id')
gh api \
  --method POST \
  "repos/{owner}/{repo}/issues/${ROOT_NUMBER}/sub_issues" \
  -F "sub_issue_id=${NEW_PHASE_ID}"
```

### Step 6: phase ラベルを同期する

各 issue の phase ラベルが親 Phase と一致しているか確認し、不一致のラベルを修正する。

```bash
# ラベルを追加
gh issue edit "${ISSUE_NUMBER}" --add-label "phase:1"

# 古いラベルを削除
gh issue edit "${ISSUE_NUMBER}" --remove-label "phase:0"
```

### Step 7: 4h 超の issue を sub-issue に分解する

棚卸し中に 4h 超と判断した issue は、create-issue-tree と同じ粒度基準で sub-issue に分解する。
（この POST も `reassign-sub-issue.sh` を使わない。理由は Step 5 と同じ: 新規作成した
親なし issue への単発 POST）

```bash
# phase ラベルが存在しない場合に備えて事前作成する（作成済みなら no-op）
gh label create "phase:N" --color "0075ca" 2>/dev/null || true

# sub-issue を作成（URL 末尾から番号を抽出）
SUB_URL=$(gh issue create \
  --title "feat: サブタスク名" \
  --label "phase:N" \
  --body "...")
SUB_NUMBER=$(printf '%s' "${SUB_URL}" | grep -oE '[0-9]+$')

# 親 issue へ紐付け（sub_issue_id は database id）
SUB_ID=$(gh api "repos/{owner}/{repo}/issues/${SUB_NUMBER}" --jq '.id')
gh api \
  --method POST \
  "repos/{owner}/{repo}/issues/${ISSUE_NUMBER}/sub_issues" \
  -F "sub_issue_id=${SUB_ID}"
```

### Step 8: ルート issue 本文を再生成して更新する

棚卸し後の最新ツリー状態を反映したルート issue 本文を生成し、`gh issue edit` で更新する。

```bash
gh issue edit "${ROOT_NUMBER}" --body "$(cat <<'EOF'
## 概要

全 open issue を Phase 別に 1 ツリーへ整理。各 Phase 親 issue を sub-issues として紐付け。

## 棚卸しで実施した整理（YYYY-MM-DD）

- closed 親下の残置 issue の付け替え: N 件
- 孤児の再配置: N 件
- phase ラベル同期: N 件
- 新 Phase 親の新設: N 件

## Phase 別実装計画

| Phase | 親 issue | 直下 | 総 open 件数 |
|-------|----------|------|-------------|
| Phase 1 | #<phase1_number> タイトル | N | N |
| Phase 2 | #<phase2_number> タイトル | N | N |

### Phase 1: タイトル

| Issue | タイトル | 分解 |
|-------|---------|------|
| #N | タイトル | - |
| #N | タイトル | sub-issue あり |

## 運用

- 新規 issue は起票時に Phase 親へ紐付ける
- 実行順は sub-issues リスト順が正
- closed 親の下に open issue を残置しない
- implement-issue-tree が post-order DFS で消化可能な構造を維持する
EOF
)"
```

### Step 9: 棚卸し結果を報告する

```
## update-issue-tree 完了レポート

### 対象ルート issue
- #N: タイトル

### 棚卸し実施内容
| 操作 | 件数 |
|------|------|
| closed 親下の残置 issue 付け替え | N 件 |
| 孤児 issue の再配置 | N 件 |
| phase ラベル同期 | N 件 |
| 新 Phase 親の新設 | N 件 |
| 4h 超 issue の sub-issue 分解 | N 件 |

### 現在の Phase 別サマリー
| Phase | 親 issue | open 件数 |
|-------|----------|----------|
| Phase 1 | #N | N 件 |

### 要確認事項（自動配置できなかった issue）
- #N: タイトル — 確認理由
```

「closed 親下の残置 issue 付け替え」「孤児 issue の再配置」の件数は、Step 3 / Step 4 で
`reassign-sub-issue.sh` を呼んだ回数分の `result=` 行（`reassigned` / `posted-only`）から集計する。
**すべての非ゼロ終了**（exit 1〜8・10・11。今後コードが増えた場合も含む）は 1 件も件数へ含めず、
必ず「要確認事項」へ理由付きで記載する。とくに exit 8 は**部分変更が残っている**ため、
報告を漏らすと壊れたツリーが放置される。exit 10（補償復旧成功）・exit 11（第三者が別親を設定済み）
も本来の付け替えは未達のため件数へは計上せず要確認事項へ記載する。**exit 9・10・11 は Step 3 /
Step 4 のループ自体が fatal 扱いせず継続する**ため（終了コード表・上記ループを参照）、
これらは計画配列の残り全件を処理し終えたうえで Step 9 に到達する。Step 3 / Step 4 が stderr へ
出力する `SKIPPED` / `NEEDS_REVIEW`（および `SKIPPED_ORPHANS` / `NEEDS_REVIEW_ORPHANS`）の内容を
そのままこの節へ転記する。

## 検証

- ルート issue 本文の Phase 別表が更新されていることを確認する
- closed Phase 親の下に open issue が残置されていないことを確認する。**ただし exit 10
  （補償復旧成功）で要確認事項へ記録された issue は、承認範囲内の逆操作として旧親（closed）
  配下へ意図的に復帰しているため、この確認の例外として扱う。** 単独では「残置」に見えるので、
  Step 9 の要確認事項の記録と突き合わせて exit 10 由来であることを確認する
- Step 3 / Step 4 で呼んだ `reassign-sub-issue.sh` の各回について、`echo "exit=${status}"`
  の値と `result=` 行を確認する。非ゼロ終了があれば Step 9 の要確認事項へ反映されているか確認する。
  加えて、**exit 1〜8（9・10・11 を除く）**の fatal 系はコードブロック自体の終了ステータスが
  非ゼロで返ること（`echo` を最後のコマンドにして握り潰していないこと）を確認する。
  **exit 9・10・11**は fatal ではなくループ継続の契約であるため、コードブロックはそのまま
  正常終了（終了ステータス 0）で最後の `SKIPPED*` / `NEEDS_REVIEW*` echo まで到達すること、
  かつ `REASSIGN_PLAN` / `ORPHAN_PLAN` の残り全件が処理されていることを確認する

```bash
# 全 sub-issues の state を確認
gh api "repos/{owner}/{repo}/issues/${ROOT_NUMBER}/sub_issues" \
  --jq '.[] | {number: .number, state: .state, title: .title}'

# Phase 親の sub-issues も確認
gh api "repos/{owner}/{repo}/issues/${PHASE_NUMBER}/sub_issues" \
  --jq '.[] | {number: .number, state: .state}'

# phase ラベルの同期確認（各 Phase 親直下で確認）
gh api "repos/{owner}/{repo}/issues/${PHASE_NUMBER}/sub_issues" \
  --jq '.[] | {number: .number, labels: [.labels[].name]}'
```

## よくある失敗

| 問題 | 回避策 |
|------|--------|
| 付け替えの DELETE が 404 になり、続く POST が 422 で失敗する | 削除のパスだけ単数形 `sub_issue`。複数形 `sub_issues` は 404 になり、旧親から外れないまま POST するため `Sub issue may only have one parent` で必ず失敗する（`reassign-sub-issue.sh` は DELETE 失敗時に POST へ進まないため、この連鎖失敗自体は起きない。手動で `gh api` を直接叩く場合の注意として記載を残す） |

## 注意事項

- **棚卸し前に変更内容をユーザーに提示して確認を取る**（Step 2 参照）
- ページネーション: sub-issues が 100 件を超える場合は `per_page=100&page=N` でページングして全件取得する（Step 1 のツリー全体取得に適用。`reassign-sub-issue.sh` は対象 issue の `parent_issue_url` を直接参照するため、付け替え判定自体にはページネーションが不要）
- シェルコマンドの変数は必ず `"${var}"` でクォートする（コマンドインジェクション対策）
- `--no-verify` は絶対に使用しない
- **`gh issue create` は `--json` 非対応**。issue URL を stdout に出力するため、`| grep -oE '[0-9]+$'` で末尾の番号を抽出する
- **sub_issues API（POST / DELETE）の `sub_issue_id` は issue 番号ではなく database id**（GitHub 仕様）。`gh api "repos/{owner}/{repo}/issues/<number>" --jq '.id'` で id を取得してから渡す。番号をそのまま渡すと誤った issue を操作する／404 になる（`reassign-sub-issue.sh` はこれを内部で解決するため、Step 3/4 で手動取得する必要はない）
- 孤児 issue の Phase が判断できない場合は推測せずにユーザーへ確認する
- sub_issues の DELETE API（付け替え時に旧親から外す操作）はパスが単数形 `sub_issue` である点に注意し、操作対象の issue 番号を必ず確認してから実行する
- ツリー更新後は implement-issue-tree が post-order DFS で正しく消化できる構造になっているか確認する
- Step 3 / Step 4 の付け替え処理は `scripts/reassign-sub-issue.sh` を使う。SKILL.md 本文へ素の `gh api` DELETE/POST を書き戻さない（状態変数の受け渡しがコードフェンス境界で壊れるクラスの欠陥に戻るため。詳細は `scripts/reassign-sub-issue.sh` 冒頭コメントと Issue #297 を参照）
