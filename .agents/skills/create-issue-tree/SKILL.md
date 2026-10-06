---
name: create-issue-tree
description: >
  Phase 分割された GitHub Issue ツリーを新規作成するスキル。「イシューツリー作って」「タスクを Phase 別に Issue 化」「Issue ツリーを起票して」で使用。
  要件・タスク一覧を受け取り、タスク分解（既定 2h 粒度・--granularity で変更可）→ Phase 分割 → ルート（トラッキング）issue → Phase 親 issue → 子 issue の階層を sub_issues API で紐付け。
  phase ラベル付与・ルート issue 本文の Phase 別表生成まで自動化。任意の phase 指定で部分起票にも対応。
  ツリーの棚卸し・更新は update-issue-tree、実装消化は implement-issue-tree を参照。
model: opus
user-invocable: true
argument-hint: "<要件テキストまたはファイルパス> [--phase <phase番号>] [--root <既存ルートissue番号>] [--milestone <milestone名>] [--granularity <時間>]"
---

# create-issue-tree

要件・タスク一覧から Phase 分割された GitHub Issue ツリーを新規作成する。
ルート（トラッキング issue）→ Phase 親 issue → issue → sub-issue の 4 階層を構築し、implement-issue-tree が post-order DFS で消化できる構造を維持する。

ルート issue 本文の運用ルール「実行順は sub-issues リスト順が正」は既定では post-order の**優先度**に留まり、並列実行時に後続 Phase が前 Phase を追い越す余地がある。Phase 完了を厳密に順序保証したい場合は implement-issue-tree 実行時に `phaseGate: true` を指定する（implement-issue-tree の SKILL.md 参照）。

## 使い方

引数としてタスク要件テキストまたはファイルパスを渡す。  
`--phase` オプションで特定 Phase のみ起票することもできる（大規模ツリーを段階的に起票する場合）。  
2 回目以降の部分起票では `--root` で既存ルート issue 番号を渡し、同じツリーに継ぎ足す
（指定しないと新しいルート issue が重複作成される）。  
`--milestone` オプションで起票する issue 全件に割り当てる GitHub Milestone を指定できる
（`--root` 指定時は省略可。既存ルートの milestone を自動継承する）。
`--granularity` オプションで 1 issue に収める実装時間の上限を指定できる。
`2h`・`4h`・`1h` のように正整数+時間単位（`h`）で指定する。優先順位は
**`--granularity` 明示 > `--root` 指定時の既存ルート issue 本文マーカー > 既定 `2h`** の順
（Step 1 で確定）。決定した値はルート issue 本文へ `<!-- granularity: Nh -->` として
永続化され、同じルートに対する `update-issue-tree` 実行時に継承される。

```
create-issue-tree "ユーザー認証機能を実装する"
create-issue-tree requirements.md
create-issue-tree requirements.md --phase 2 --root 123
create-issue-tree requirements.md --milestone "v2.0"
create-issue-tree requirements.md --granularity 4h
```

## 前提条件

- `gh` CLI がインストールされ、認証済みであること（`gh auth status` で確認）
- 対象リポジトリへの Issue 書き込み権限があること

## フロー

### Step 1: 要件を分析してタスクを分解する

入力テキストまたはファイルから要件を読み込み、以下の観点でタスクを分解する。

- **粒度基準: 1 issue は実装 `${GRANULARITY}`（既定 2h・`--granularity` で変更可）程度に収める。** 超えると判断した場合は sub-issue に再分解する

`--granularity` の値は代入前に Claude 側でも同じ正規表現（`^[1-9][0-9]*h$`）で検証し、
不一致なら**このフェンスを実行せず**ユーザーに再指定を求める（未信頼値を生成済みシェルへ
埋め込まない）。優先順位は使い方節のとおり、**`--granularity` > ルートのマーカー > 既定 2h** の順。

```bash
# --granularity で渡された時間を実際の値で代入する（実行時に Claude が置き換える）
# 例: --granularity 4h が指定された場合 → GRANULARITY_ARG="4h" / 未指定の場合は空文字
GRANULARITY_ARG="<--granularity で渡された時間（未指定なら空文字）>"
# --root で渡された Issue 番号（未指定なら空文字）。Step 2.5 で ROOT_NUMBER として
# OPEN 検証込みで正式に確定する前に、粒度継承の参照のためここでも読む
ROOT_ARG="<--root で渡された Issue 番号（未指定なら空文字）>"

if [[ -n "${GRANULARITY_ARG}" ]]; then
  GRANULARITY="${GRANULARITY_ARG}"
  GRANULARITY_SOURCE="--granularity 引数"
elif [[ -n "${ROOT_ARG}" ]]; then
  # ルート本文の取得失敗とマーカー不在は分離する。取得失敗は「粒度を既定へ倒さず中止」する
  # （gh issue view 自体の失敗を || true で握り潰すと、権限エラー・issue 不在等を
  # 「マーカーなし」と誤読して既定 2h へサイレントに倒れてしまうため）
  ROOT_BODY=$(gh issue view "${ROOT_ARG}" --json body --jq '.body') \
    || { echo "エラー: ルート issue #${ROOT_ARG} の本文を取得できません。粒度を既定へ倒さず中止します。"; exit 1; }
  # 既存ルート本文の <!-- granularity: Nh --> マーカーから継承する。マーカーが無ければ既定 2h
  # （|| true は grep のマーカー不在にのみ掛かる。gh issue view 自体の失敗は上で既に処理済み）
  ROOT_GRANULARITY=$(printf '%s\n' "${ROOT_BODY}" \
    | grep -oE '<!-- granularity: [1-9][0-9]*h -->' | head -1 | grep -oE '[1-9][0-9]*h' || true)
  if [[ -n "${ROOT_GRANULARITY}" ]]; then
    GRANULARITY="${ROOT_GRANULARITY}"
    GRANULARITY_SOURCE="ルート issue #${ROOT_ARG} のマーカー"
  else
    GRANULARITY="2h"
    GRANULARITY_SOURCE="既定値"
  fi
else
  GRANULARITY="2h"
  GRANULARITY_SOURCE="既定値"
fi

# 許可する構文は正整数 + h のみ（例: 1h / 2h / 4h）。引用符・空白・コマンド置換・0h・単位なしは
# ここで拒否する（ROOT_GRANULARITY はマーカー抽出時点で同じ正規表現を通しているが、
# GRANULARITY_ARG はユーザー入力の生値のため、代入元によらずこの検証を必ず通す）
if ! printf '%s' "${GRANULARITY}" | grep -qE '^[1-9][0-9]*h$'; then
  echo "エラー: --granularity の値 '${GRANULARITY}' は不正です（許可: 正整数+h、例 2h）。中止します。"
  exit 1
fi

# 確定値と由来を必ず出力する（既定 2h と読み替えないことをここで可視化する）
echo "粒度基準: ${GRANULARITY}（由来: ${GRANULARITY_SOURCE}）"
```

以降の Step は Step 1 で出力された `GRANULARITY` の値を使う（既定 2h と読み替えない）。

- 各タスクの依存関係・実行順を把握する
- タスク数を集計し、Phase 分割の要否を判断する（目安: 10 件超で Phase 分割を検討）

分解結果をユーザーに提示し、Phase 構成・issue 数について確認を取る。  
`--phase` オプションが指定されている場合は該当 Phase のタスクのみ対象とする。

### Step 2: Phase 構成を設計する

タスク数・依存関係をもとに Phase を設計する。

- Phase は独立して開発可能な単位で分割する（例: Phase 1 基盤・Phase 2 機能・Phase 3 改善）
- 各 Phase に親 issue タイトル（Conventional Commits 形式推奨）を割り当てる
- 全体をまとめるルート（トラッキング）issue のタイトルを決定する
  - 例: `chore(global): 全 open issue の Phase 別トラッキング (YYYY-MM-DD)`

タスクが少数（Phase 分割不要）の場合はルート issue + 子 issue の 2 階層構成にする。

### Step 2.5: milestone を決定する

このツリーに割り当てる GitHub Milestone を決定する。ルート・Phase 親・子・sub-issue の
全件に同一 milestone を適用する（ツリー単位で 1 milestone）。

`--root` が指定されている場合は、ここで先に `ROOT_NUMBER` を設定し、milestone の
継承・書き込みを行う前に OPEN 状態を検証する（closed なルートの milestone を
書き換えてから中断する事故を防ぐ。Step 3 側では再代入・再検証しない）。

```bash
# --root で渡された Issue 番号を実際の値で代入する（実行時に Claude が置き換える）
# 例: --root 123 が指定された場合 → ROOT_NUMBER="123" / --root 未指定の場合 → ROOT_NUMBER=""
ROOT_NUMBER="<--root で渡された Issue 番号（未指定なら空文字）>"

# --root 指定時のみ: OPEN でなければ milestone 操作より前に中止する
# （新規ツリー作成で ROOT_NUMBER が空の場合はこの検証をスキップする）
if [[ -n "${ROOT_NUMBER}" ]]; then
  ROOT_STATE=$(gh issue view "${ROOT_NUMBER}" --json state --jq '.state')
  if [[ "${ROOT_STATE}" != "OPEN" ]]; then
    echo "エラー: ルート issue #${ROOT_NUMBER} は OPEN ではありません (state: ${ROOT_STATE})。中止します。"
    exit 1
  fi
fi
```

**milestone 非運用リポジトリのガード**: `--milestone` が明示されていない場合、リポジトリに
milestone が 1 件も存在しなければ（closed 含む）milestone 非運用リポジトリとみなし、
以降の確認をすべてスキップして `MILESTONE` は空のまま Step 3 へ進む
（milestone を使わないリポジトリの起票フローに確認を増やさない）。

```bash
MILESTONE_COUNT=$(gh api "repos/{owner}/{repo}/milestones?state=all" --jq 'length')
# MILESTONE_COUNT が 0 かつ --milestone 未指定なら、このステップの残りをスキップする
```

優先順位は **`--milestone` > `--root` からの継承 > ユーザーへの確認** の順。

- `--milestone` が指定されている場合: その値をそのまま `MILESTONE` として使用する
  （`--root` も同時指定されている場合、ルート側の milestone より `--milestone` を優先する。
  ルート側と異なる値の場合は、ルートの milestone も合わせて更新してよいかユーザーに確認する。
  更新しないと回答された場合はツリー内で milestone が混在する点を伝えたうえで続行する）
- `--milestone` 未指定かつ `--root` 指定時: 既存ルートの milestone を自動継承する
  （milestone が取得できた場合のみユーザーへの確認は不要）

  ```bash
  MILESTONE=$(gh issue view "${ROOT_NUMBER}" --json milestone --jq '.milestone.title // empty')
  ```

  `MILESTONE` が空（既存ルートに milestone が未設定）の場合は自動継承とみなさず、
  「どちらも未指定の場合」と同じユーザー確認フローへ進む（リポジトリに milestone が
  存在するのにサイレントに milestone なしで進行しない。milestone が 1 件もない場合は
  冒頭の非運用ガードが先に働くため、この確認には到達しない）。

- どちらも未指定の場合、または `--root` 指定時に継承すべき milestone が空だった場合:
  milestone を割り当てるかユーザーに確認する。
  割り当てる場合はオープン中の milestone 一覧を提示して選ばせるか、新規 milestone 名の
  入力を受け付けて `MILESTONE` に設定する。割り当てないと回答されたら `MILESTONE` は
  空のまま Step 3 以降へ進む（issue は milestone なしで作成される）。

  ```bash
  gh api "repos/{owner}/{repo}/milestones" --jq '.[] | select(.state=="open") | .title'
  ```

  ユーザーが一覧にない新規 milestone 名を入力した場合、`gh issue create --milestone` は
  既存の milestone 名しか受け付けないため、使用前に milestone 自体を作成する。
  同名の closed milestone が既に存在すると作成が 422（already_exists）で失敗するため、
  その場合は reopen するか別名にするかをユーザーに確認する。

  ```bash
  gh api --method POST "repos/{owner}/{repo}/milestones" -f "title=${MILESTONE}"
  ```

  `--root` 指定時に継承すべき milestone が空でこのフローに合流した場合、決定した
  `MILESTONE` を既存ルート issue にも反映する（子だけ milestone が付き、ルートが
  未設定のまま残る不整合を防ぐ）。

  ```bash
  if [[ -n "${ROOT_NUMBER}" && -n "${MILESTONE}" ]]; then
    gh issue edit "${ROOT_NUMBER}" --milestone "${MILESTONE}"
  fi
  ```

### Step 3: ルート（トラッキング）issue を作成する

ルート issue はツリー全体の進捗を管理するトラッキング issue として作成する。**ルート issue 自体には phase ラベルは付与しない**（Phase 親以下の issue にのみ付与する）。

**`--root` 指定時は新規作成をスキップする。** `--phase` での 2 回目以降の部分起票で
ルート issue を重複作成しないため、Step 2.5 で設定・OPEN 検証済みの `ROOT_NUMBER` を
そのまま再利用する（ここで再代入・再検証しない）。

`--root` 未指定の場合のみ、以下でルート issue を新規作成する。
表のプレースホルダー行は Step 6 の `--root` 経路が追記位置として読む。文言を変えるときは
Step 6 の awk とテスト (n) を合わせて直す。

```bash
# MILESTONE が空でなければ --milestone を付与する（Step 2.5 で決定済み）
ROOT_ARGS=(--title "chore: 全 open issue の Phase 別トラッキング ($(date +%Y-%m-%d))")
if [[ -n "${MILESTONE}" ]]; then
  ROOT_ARGS+=(--milestone "${MILESTONE}")
fi

# gh issue create は issue URL を stdout に出力する（--json 非対応）。URL 末尾から番号を抽出する
ROOT_URL=$(gh issue create "${ROOT_ARGS[@]}" \
  --body "$(printf '<!-- granularity: %s -->\n' "${GRANULARITY}"; cat <<'EOF'
## 概要

全 open issue を Phase 別に 1 ツリーへ整理する。各 Phase 親 issue を sub-issues として紐付け。

## Phase 別実装計画

| Phase | 親 issue | 直下 | 総 open 件数 |
|-------|----------|------|-------------|
| (作成後に更新) | | | |

## 運用

- 新規 issue は起票時に Phase 親へ紐付ける
- 実行順は sub-issues リスト順が正
- closed 親の下に open issue を残置しない
- implement-issue-tree が post-order DFS で消化可能な構造を維持する
EOF
)")
ROOT_NUMBER=$(printf '%s' "${ROOT_URL}" | grep -oE '[0-9]+$')
echo "ルート issue: ${ROOT_NUMBER}"
```

### Step 4: Phase 親 issue を作成して紐付ける

Phase ごとに親 issue を作成し、sub_issues API でルートへ紐付ける。
以下のスニペットは `PHASE` 変数で Phase 番号を切り替える。`--phase` 指定時はその番号を、
全 Phase 起票時は処理中の Phase 番号を設定する（タイトル・ラベルとも `PHASE` に追従させる）。

```bash
# 処理対象の Phase 番号（--phase 指定時はその番号、全 Phase 起票時はループ中の番号）
PHASE=1

# phase ラベルが存在しないリポジトリでは issue 作成が失敗するため、必ず事前作成する
# （作成済みの場合は失敗を無視して続行する）
gh label create "phase:${PHASE}" --color "0075ca" 2>/dev/null || true

# --root 再実行時の重複防止: ルート直下に同じ Phase の open な親が既にあれば再利用する
# closed な親は再利用しない（closed 親の下に open issue を残置しない運用ルールと整合させる）。
# phase ラベルだけでは同ラベルの一般 issue がルート直下に混在した場合に誤マッチするため、
# Phase 親のタイトル規約（feat(phase-N): 接頭辞）でも絞り込む。
# 直下が 100 件を超える場合に備えてページングで全件走査する
PHASE_NUMBER=""
PAGE=1
while true; do
  RESULT=$(gh api \
    "repos/{owner}/{repo}/issues/${ROOT_NUMBER}/sub_issues?per_page=100&page=${PAGE}")
  PHASE_NUMBER=$(echo "${RESULT}" | jq -r \
    "[.[] | select(.state == \"open\"
      and (.title | startswith(\"feat(phase-${PHASE}):\"))
      and any(.labels[]?; .name == \"phase:${PHASE}\"))][0].number // empty")
  COUNT=$(echo "${RESULT}" | jq 'length')
  if [[ -n "${PHASE_NUMBER}" || "${COUNT}" -lt 100 ]]; then break; fi
  PAGE=$((PAGE + 1))
done
[[ -n "${PHASE_NUMBER}" ]] && echo "既存の Phase 親 issue を再利用: #${PHASE_NUMBER}"

# 再利用する Phase 親が milestone 未設定の場合はここで揃える（milestone 導入前に
# 作られたツリーへの追記で、新規の子だけに milestone が付く不整合を防ぐ。冪等）
if [[ -n "${PHASE_NUMBER}" && -n "${MILESTONE}" ]]; then
  gh issue edit "${PHASE_NUMBER}" --milestone "${MILESTONE}"
fi
```

タイトル規約が `feat(phase-N):` と異なるツリーでは上記の自動判定に頼らず、候補をユーザーに
提示して再利用すべき Phase 親を確認する。

`PHASE_NUMBER` が空（既存の Phase 親がない）場合のみ、以下で新規作成してルートへ紐付ける。

```bash
# MILESTONE が空でなければ --milestone を付与する（Step 2.5 で決定済み）
PHASE_ARGS=(--title "feat(phase-${PHASE}): Phase ${PHASE} 基盤整備" --label "phase:${PHASE}")
if [[ -n "${MILESTONE}" ]]; then
  PHASE_ARGS+=(--milestone "${MILESTONE}")
fi

# Phase 親 issue を作成（URL 末尾から番号を抽出）
PHASE_URL=$(gh issue create "${PHASE_ARGS[@]}" \
  --body "$(cat <<'EOF'
## 概要

この Phase の実装タスクをまとめる親 issue。

## タスク一覧

| Issue | タイトル | 分解 |
|-------|---------|------|
| (子 issue 作成後に更新) | | |
EOF
)")
PHASE_NUMBER=$(printf '%s' "${PHASE_URL}" | grep -oE '[0-9]+$')

# ルートへ紐付け。sub_issue_id は issue 番号ではなく database id を渡す（GitHub sub-issues API 仕様）
PHASE_ID=$(gh api "repos/{owner}/{repo}/issues/${PHASE_NUMBER}" --jq '.id')
gh api \
  --method POST \
  "repos/{owner}/{repo}/issues/${ROOT_NUMBER}/sub_issues" \
  -F "sub_issue_id=${PHASE_ID}"
```

### Step 5: 子 issue・sub-issue を作成して紐付ける

各タスクを issue として作成し、Phase 親へ紐付ける。粒度基準（既定 2h・`--granularity`）超のタスクはさらに sub-issue に分解する。

```bash
# MILESTONE が空でなければ --milestone を付与する（Step 2.5 で決定済み）
CHILD_ARGS=(--title "feat: タスク名" --label "phase:${PHASE}")
if [[ -n "${MILESTONE}" ]]; then
  CHILD_ARGS+=(--milestone "${MILESTONE}")
fi

# 子 issue を作成（URL 末尾から番号を抽出）。PHASE は Step 4 で設定した番号を引き継ぐ
CHILD_URL=$(gh issue create "${CHILD_ARGS[@]}" \
  --body "$(cat <<'EOF'
## 概要

...

## 受け入れ条件

- [ ] 条件1
- [ ] 条件2
EOF
)")
CHILD_NUMBER=$(printf '%s' "${CHILD_URL}" | grep -oE '[0-9]+$')

# Phase 親へ紐付け（sub_issue_id は database id）
CHILD_ID=$(gh api "repos/{owner}/{repo}/issues/${CHILD_NUMBER}" --jq '.id')
gh api \
  --method POST \
  "repos/{owner}/{repo}/issues/${PHASE_NUMBER}/sub_issues" \
  -F "sub_issue_id=${CHILD_ID}"

# 粒度基準（既定 2h・--granularity）超の場合は sub-issue を作成して子 issue へ紐付け（同じく MILESTONE を付与）
SUB_ARGS=(--title "feat: サブタスク名" --label "phase:${PHASE}")
if [[ -n "${MILESTONE}" ]]; then
  SUB_ARGS+=(--milestone "${MILESTONE}")
fi
SUB_URL=$(gh issue create "${SUB_ARGS[@]}" --body "...")
SUB_NUMBER=$(printf '%s' "${SUB_URL}" | grep -oE '[0-9]+$')

SUB_ID=$(gh api "repos/{owner}/{repo}/issues/${SUB_NUMBER}" --jq '.id')
gh api \
  --method POST \
  "repos/{owner}/{repo}/issues/${CHILD_NUMBER}/sub_issues" \
  -F "sub_issue_id=${SUB_ID}"
```

issue 数が多い場合（50 件超が目安）は `per_page=100` パラメータを使用し、ページネーションで全件確認する。

```bash
# ページネーション例（全 sub-issues を取得）
PAGE=1
while true; do
  RESULT=$(gh api \
    "repos/{owner}/{repo}/issues/${PHASE_NUMBER}/sub_issues?per_page=100&page=${PAGE}")
  COUNT=$(echo "${RESULT}" | jq 'length')
  echo "${RESULT}"
  if [ "${COUNT}" -lt 100 ]; then break; fi
  PAGE=$((PAGE + 1))
done
```

### Step 6: ルート issue 本文を Phase 別表で更新する

全 issue の作成が完了したら、ルート issue 本文の Phase 別表を実際の issue 番号・件数で更新する。

**`--root` での部分起票では本文を全置換しない。** 既存ルートの本文には先行 Phase の表が
含まれるため、現在の本文を取得し、今回起票した Phase の行・セクションのみを追記・更新した
本文で `gh issue edit` する。以下の全置換テンプレートは新規作成（`--root` 未指定）時のみ使う。
Step 3 の雛形のままのルート（Step 6 到達前に中断した起票の再実行）でも、表のプレースホルダー行
`| (作成後に更新) |` を今回の Phase 行へ置き換えて完走する。

```bash
# --root 指定時: 既存本文を取得し、今回の Phase 分をマージしてから編集する
CURRENT_BODY=$(gh issue view "${ROOT_NUMBER}" --json body --jq '.body') \
  || { echo "エラー: ルート issue #${ROOT_NUMBER} の本文を取得できません。中止します。"; exit 1; }

# <!-- granularity: Nh --> マーカーは常に Step 1 で確定した GRANULARITY で先頭へ 1 行だけ
# 書き直す（明示・未指定を問わず常に反映する。GRANULARITY 自体が Step 1 の優先順位
# 「明示 > 既存マーカー > 既定 2h」を既に反映済みのため、ここで条件分岐しない）。
# 既存本文に旧マーカー行があれば重複させないため、先に取り除いてから先頭へ再出力する。
CURRENT_BODY=$(printf '%s\n' "${CURRENT_BODY}" | grep -vE '^<!-- granularity: [1-9][0-9]*h -->$')
NEW_BODY="$(printf '<!-- granularity: %s -->\n' "${GRANULARITY}"; printf '%s\n' "${CURRENT_BODY}")"

# 今回の Phase 行（PHASE_ROW）と「### Phase N: ...」セクション（PHASE_SECTION）を実ツリー
# （sub_issues API）から生成する。#<phaseN_number>・N 等は手書きで埋めない。
# 前提: PHASE（Step 4 で確定した Phase 番号 N）と PHASE_NUMBER（その Phase 親 issue 番号）を
# このフェンスの前に設定しておく（コードフェンスは独立シェルで実行され得る）。
: "${PHASE:?PHASE 未設定}" "${PHASE_NUMBER:?PHASE_NUMBER 未設定}"

# 指定 issue の sub-issues 全件（JSON 配列）をページングで取得する。失敗時は非ゼロ
list_subs() {
  local n="$1" page=1 res all='[]'
  while true; do
    res=$(gh api "repos/{owner}/{repo}/issues/${n}/sub_issues?per_page=100&page=${page}") || return 1
    all=$({ printf '%s' "${all}"; printf '%s' "${res}"; } | jq -s '.[0] + .[1]') || return 1
    [ "$(printf '%s' "${res}" | jq 'length')" -lt 100 ] && break
    page=$((page + 1))
  done
  printf '%s' "${all}"
}

# 指定 issue の全子孫のうち open な issue 件数を再帰で数えて stdout へ出す。Step 5 は sub-issue への
# 追加分解を許すため、直下だけでなく 3 階層目より深い open issue も総件数に含める。
# 失敗時は非ゼロ。depth は循環・異常な深さへの安全弁（超過は失敗扱い）
count_open_desc() {
  local n="$1" depth="${2:-0}" subs open c cnum
  [ "${depth}" -le 20 ] || return 1
  subs=$(list_subs "${n}") || return 1
  open=$(printf '%s' "${subs}" | jq '[.[] | select(.state == "open")] | length') || return 1
  for cnum in $(printf '%s' "${subs}" | jq -r '.[].number'); do
    c=$(count_open_desc "${cnum}" $((depth + 1))) || return 1
    open=$((open + c))
  done
  printf '%s' "${open}"
}

# issue タイトルは非信頼データ。表を壊す | と改行だけ無害化する（バックスラッシュ二重化が先）
CELL='gsub("[\r\n]+"; " ") | gsub("\\\\"; "\\\\") | gsub("\\|"; "\\|")'

PTITLE=$(gh issue view "${PHASE_NUMBER}" --json title --jq ".title | ${CELL}") \
  || { echo "エラー: Phase 親 #${PHASE_NUMBER} を取得できません。中止します。"; exit 1; }
CHILDREN=$(list_subs "${PHASE_NUMBER}") \
  || { echo "エラー: Phase 親 #${PHASE_NUMBER} の sub-issues を取得できません。中止します。"; exit 1; }
CHILDREN=$(printf '%s' "${CHILDREN}" | jq '[.[] | select(.state == "open")]')
DIRECT=$(printf '%s' "${CHILDREN}" | jq 'length')
TOTAL=${DIRECT}

PHASE_SECTION="### Phase ${PHASE}: ${PTITLE}"$'\n\n'"| Issue | タイトル | 分解 |"$'\n'"|-------|---------|------|"
for j in $(seq 0 $((DIRECT - 1))); do
  [ "${DIRECT}" -ge 1 ] || break
  CNUM=$(printf '%s' "${CHILDREN}" | jq -r --argjson j "${j}" '.[$j].number')
  CTITLE=$(printf '%s' "${CHILDREN}" | jq -r --argjson j "${j}" ".[\$j].title | ${CELL}")
  GRAND_OPEN=$(count_open_desc "${CNUM}") \
    || { echo "エラー: #${CNUM} の子孫を取得できません。中止します。"; exit 1; }
  TOTAL=$((TOTAL + GRAND_OPEN))
  if [ "${GRAND_OPEN}" -ge 1 ]; then DECOMP='sub-issue あり'; else DECOMP='-'; fi
  PHASE_SECTION+=$'\n'"| #${CNUM} | ${CTITLE} | ${DECOMP} |"
done
PHASE_ROW="| Phase ${PHASE} | #${PHASE_NUMBER} ${PTITLE} | ${DIRECT} | ${TOTAL} |"

# Phase N が既存本文にあれば、その行とセクションを置き換える（再利用した Phase 親の件数更新）。
# 無ければ表の最終行（'| Phase N |' 行）の直後へ行を挿入し、セクションは既存 Phase セクションと同じ位置
# （'## 運用' の直前）へ挿入する（'## 運用' が無い本文のみ末尾へ追加する）。
# 実在の Phase 行が 1 つも無い Step 3 雛形のままの本文では、'| (作成後に更新) |' 行の位置へ今回の Phase 行を
# 置き換えて挿入する。このプレースホルダー行は実在行の有無によらず出力しない。
# 追記位置がどちらも無い、または行を出力できなかった場合は awk が exit 3 で中止する（fail-closed）。
# セクションは全子 issue の行を含み環境変数・引数の長さ上限を超え得るため、一時ファイル経由で渡す。
# 行（1 行）は ENVIRON で渡し、いずれもシェル構文・awk 構文として再評価させない
# trap を mktemp より先に登録する（mktemp 失敗時も作成済みファイルを削除するため）
SEC_FILE=''
trap 'rm -f "${SEC_FILE}"' EXIT
SEC_FILE=$(mktemp) && printf '%s\n' "${PHASE_SECTION}" > "${SEC_FILE}" \
  || { echo "エラー: Phase セクションの一時ファイルを作成できません。中止します。"; exit 1; }
NEW_BODY=$(printf '%s\n' "${NEW_BODY}" | PH="${PHASE}" ROW="${PHASE_ROW}" SECF="${SEC_FILE}" awk '
  BEGIN {
    sec = ""; n = 0
    while ((rc = (getline sl < ENVIRON["SECF"])) > 0) { sec = (n++ ? sec "\n" : "") sl }
    if (rc < 0) exit 4
  }
  {
    L[NR] = $0
    if ($0 ~ /^[|] Phase [0-9]+ [|]/) last = NR
    else if ($0 ~ /^[|] [(]作成後に更新[)] [|][ |]*$/) { T[NR] = 1; if (!tmpl) tmpl = NR }
  }
  END {
    ph = ENVIRON["PH"]; row_re = "^[|] Phase " ph " [|]"; sec_re = "^### Phase " ph ":"
    row_done = 0; sec_done = 0; skip = 0; has_sec = 0
    for (k = 1; k <= NR; k++) if (L[k] ~ sec_re) has_sec = 1
    if (last == 0 && tmpl == 0) exit 3
    for (i = 1; i <= NR; i++) {
      line = L[i]
      if (skip) { if (line ~ /^(#|##|###) /) { skip = 0; print "" } else continue }
      if (i in T) { if (last == 0 && i == tmpl && !row_done) { print ENVIRON["ROW"]; row_done = 1 }; continue }
      if (line ~ row_re) { if (!row_done) { print ENVIRON["ROW"]; row_done = 1 }; continue }
      if (line ~ sec_re) { if (!sec_done) { print sec; sec_done = 1 }; skip = 1; continue }
      if (line ~ /^## 運用/ && !sec_done && !has_sec) { print sec; print ""; sec_done = 1 }
      print line
      if (i == last && !row_done) { print ENVIRON["ROW"]; row_done = 1 }
    }
    if (!sec_done) { print ""; print sec }
    # 唯一のプレースホルダー行が置換対象セクション内にあると skip 分岐で読み飛ばされ、行を出力しないまま終わる
    if (!row_done) exit 3
  }') \
  || { echo "エラー: 本文の Phase 別表に追記位置（'| Phase N |' 行または '| (作成後に更新) |' 行）がないか、Phase 行を出力できませんでした。中止します。"; exit 1; }

# 検査は追記を全て終えた最終本文（NEW_BODY）に対し、gh issue edit の直前で行う（fail-closed）。
# 追記前に検査すると、追記部分に残ったプレースホルダーが検査を素通りする。
# grep の終了コードは 0=ヒット / 1=なし / 2 以上=失敗。2 以上は「残りなし」へ倒さず中止する
rc=0; printf '%s\n' "${NEW_BODY}" | grep -qE '<phase[0-9]*_number>|\(作成後に更新\)|#N([^0-9A-Za-z]|$)|^\|.*\|[[:space:]]*N[[:space:]]*(\||$)' || rc=$?
[ "${rc}" -eq 1 ] \
  || { echo "エラー: 本文にプレースホルダーが残っている、または検査に失敗した（grep exit ${rc}）。ルート本文は更新しません。"; exit 1; }

# 検査を通った NEW_BODY を、検査直後に（本文を変更せず）そのまま gh issue edit へ渡す。
# 本文は stdin 経由で渡し、一時ファイルを作らない
printf '%s\n' "${NEW_BODY}" | gh issue edit "${ROOT_NUMBER}" --body-file - \
  || { echo "エラー: ルート issue #${ROOT_NUMBER} の本文更新に失敗しました。"; exit 1; }
```

`--root` 未指定（新規作成）の場合は以下で全体を更新する。

```bash
# 本文のプレースホルダー（#<phaseN_number>・N 等）を手書きで埋めない。実ツリー（sub_issues API）
# から表を生成し、プレースホルダーが残った本文では gh issue edit しない（fail-closed）。
# 前提: コードフェンスは独立シェルで実行され得るため、ROOT_NUMBER（ルート issue 番号）と
# GRANULARITY（Step 1 で確定した粒度。例: 2h）をこのフェンスの前に設定しておく。
: "${ROOT_NUMBER:?ROOT_NUMBER 未設定}" "${GRANULARITY:?GRANULARITY 未設定}"

# 指定 issue の sub-issues 全件（JSON 配列）をページングで取得する。失敗時は非ゼロ。
list_subs() {
  local n="$1" page=1 res all='[]'
  while true; do
    res=$(gh api "repos/{owner}/{repo}/issues/${n}/sub_issues?per_page=100&page=${page}") || return 1
    # 本文を含む全 JSON を --argjson の引数に載せると ARG_MAX / MAX_ARG_STRLEN を超え得るため、
    # printf（組み込み）経由の stdin で jq へ渡す
    all=$({ printf '%s' "${all}"; printf '%s' "${res}"; } | jq -s '.[0] + .[1]') || return 1
    [ "$(printf '%s' "${res}" | jq 'length')" -lt 100 ] && break
    page=$((page + 1))
  done
  printf '%s' "${all}"
}

# 指定 issue の全子孫のうち open な issue 件数を再帰で数えて stdout へ出す。Step 5 は sub-issue への
# 追加分解を許すため、直下だけでなく 3 階層目より深い open issue も総件数に含める。
# 失敗時は非ゼロ。depth は循環・異常な深さへの安全弁（超過は失敗扱い）
count_open_desc() {
  local n="$1" depth="${2:-0}" subs open c cnum
  [ "${depth}" -le 20 ] || return 1
  subs=$(list_subs "${n}") || return 1
  open=$(printf '%s' "${subs}" | jq '[.[] | select(.state == "open")] | length') || return 1
  for cnum in $(printf '%s' "${subs}" | jq -r '.[].number'); do
    c=$(count_open_desc "${cnum}" $((depth + 1))) || return 1
    open=$((open + c))
  done
  printf '%s' "${open}"
}

# trap を mktemp より先に登録する（2 回目以降の mktemp 失敗でも作成済みファイルを削除するため）
BODY_FILE=''; SUMMARY_FILE=''; DETAIL_FILE=''
trap 'rm -f "${BODY_FILE}" "${SUMMARY_FILE}" "${DETAIL_FILE}"' EXIT
BODY_FILE=$(mktemp) && SUMMARY_FILE=$(mktemp) && DETAIL_FILE=$(mktemp) \
  || { echo "エラー: 一時ファイルを作成できません。中止します。"; exit 1; }

# issue タイトルは非信頼データ。表を壊す | と改行だけ無害化し、シェル展開には載せない。
# 先にバックスラッシュを \\ へ二重化してから | を \| にする（順序が逆だと a\|b が a\\|b となり | が列区切り化する）
CELL='gsub("[\r\n]+"; " ") | gsub("\\\\"; "\\\\") | gsub("\\|"; "\\|")'

PHASES=$(list_subs "${ROOT_NUMBER}") \
  || { echo "エラー: ルート #${ROOT_NUMBER} の sub-issues を取得できません。中止します。"; exit 1; }
PHASE_COUNT=$(printf '%s' "${PHASES}" | jq 'length')
[ "${PHASE_COUNT}" -ge 1 ] \
  || { echo "エラー: ルート #${ROOT_NUMBER} 直下に Phase 親がありません。中止します。"; exit 1; }

for i in $(seq 0 $((PHASE_COUNT - 1))); do
  PNUM=$(printf '%s' "${PHASES}" | jq -r --argjson i "${i}" '.[$i].number')
  PTITLE=$(printf '%s' "${PHASES}" | jq -r --argjson i "${i}" ".[\$i].title | ${CELL}")
  # Phase 番号は位置（i + 1）で採番しない。--phase 2 等の部分起票では最初の親が Phase 2 になるため、
  # Step 4 で付与した phase:N ラベルから取得する（無ければ title の feat(phase-N): から取得）。
  # どちらからも決められなければ誤記録せず中止する（fail-closed）
  PNO=$(printf '%s' "${PHASES}" | jq -r --argjson i "${i}" '.[$i] as $p
    | ([$p.labels[]?.name | select(test("^phase:[0-9]+$")) | sub("^phase:"; "")][0]
       // ($p.title | capture("^feat\\(phase-(?<n>[0-9]+)\\):").n) // empty)') \
    || PNO=''
  [[ "${PNO}" =~ ^[0-9]+$ ]] \
    || { echo "エラー: Phase 親 #${PNUM} の Phase 番号（phase:N ラベル / タイトル）を決定できません。中止します。"; exit 1; }
  CHILDREN=$(list_subs "${PNUM}") \
    || { echo "エラー: Phase 親 #${PNUM} の sub-issues を取得できません。中止します。"; exit 1; }
  CHILDREN=$(printf '%s' "${CHILDREN}" | jq '[.[] | select(.state == "open")]')
  DIRECT=$(printf '%s' "${CHILDREN}" | jq 'length')
  TOTAL=${DIRECT}

  {
    printf '\n### Phase %s: %s\n\n' "${PNO}" "${PTITLE}"
    printf '| Issue | タイトル | 分解 |\n|-------|---------|------|\n'
  } >> "${DETAIL_FILE}"

  for j in $(seq 0 $((DIRECT - 1))); do
    [ "${DIRECT}" -ge 1 ] || break
    CNUM=$(printf '%s' "${CHILDREN}" | jq -r --argjson j "${j}" '.[$j].number')
    CTITLE=$(printf '%s' "${CHILDREN}" | jq -r --argjson j "${j}" ".[\$j].title | ${CELL}")
    GRAND_OPEN=$(count_open_desc "${CNUM}") \
      || { echo "エラー: #${CNUM} の子孫を取得できません。中止します。"; exit 1; }
    TOTAL=$((TOTAL + GRAND_OPEN))
    if [ "${GRAND_OPEN}" -ge 1 ]; then DECOMP='sub-issue あり'; else DECOMP='-'; fi
    printf '| #%s | %s | %s |\n' "${CNUM}" "${CTITLE}" "${DECOMP}" >> "${DETAIL_FILE}"
  done

  printf '| Phase %s | #%s %s | %s | %s |\n' "${PNO}" "${PNUM}" "${PTITLE}" "${DIRECT}" "${TOTAL}" >> "${SUMMARY_FILE}"
done

{
  printf '<!-- granularity: %s -->\n' "${GRANULARITY}"
  cat <<'EOF'
## 概要

全 open issue を Phase 別に 1 ツリーへ整理する。各 Phase 親 issue を sub-issues として紐付け。

## Phase 別実装計画

| Phase | 親 issue | 直下 | 総 open 件数 |
|-------|----------|------|-------------|
EOF
  cat "${SUMMARY_FILE}"
  cat "${DETAIL_FILE}"
  cat <<'EOF'

## 運用

- 新規 issue は起票時に Phase 親へ紐付ける
- 実行順は sub-issues リスト順が正
- closed 親の下に open issue を残置しない
- implement-issue-tree が post-order DFS で消化可能な構造を維持する
EOF
} > "${BODY_FILE}"

# プレースホルダー検査（fail-closed）。grep の終了コードは 0=ヒット / 1=なし / 2 以上=失敗。
# 2 以上は「残りなし」へ倒さず検査失敗として中止する
rc=0; grep -qE '<phase[0-9]*_number>|\(作成後に更新\)|#N([^0-9A-Za-z]|$)|^\|.*\|[[:space:]]*N[[:space:]]*(\||$)' "${BODY_FILE}" || rc=$?
[ "${rc}" -eq 1 ] \
  || { echo "エラー: 本文にプレースホルダーが残っている、または検査に失敗した（grep exit ${rc}）。ルート本文は更新しません。"; exit 1; }
rc=0; ROWS=$(grep -cE '^\| Phase [0-9]+ \| #[0-9]+ ' "${BODY_FILE}") || rc=$?
{ [ "${rc}" -le 1 ] && [ "${ROWS}" -eq "${PHASE_COUNT}" ]; } \
  || { echo "エラー: Phase 行数（${ROWS:-?}）が Phase 親数（${PHASE_COUNT}）と一致しません。ルート本文は更新しません。"; exit 1; }

gh issue edit "${ROOT_NUMBER}" --body-file "${BODY_FILE}"
```

### Step 7: 作成結果を報告する

```
## create-issue-tree 完了レポート

### ルート issue
- #N: タイトル

### Phase 別作成サマリー
| Phase | 親 issue | 起票数 |
|-------|----------|-------|
| Phase 1 | #N | N 件 |

### 作成した issue 一覧
- #N: タイトル（Phase 1 / 親: #M）
...

### 次のアクション
- 実装消化: implement-issue-tree スキルに ルート issue 番号を渡す
- ツリー更新: update-issue-tree スキルでトラッキング issue を棚卸しする
```

## 検証

- ルート issue の sub-issues に各 Phase 親 issue が列挙されていることを確認する
- 各 Phase 親 issue の sub-issues に子 issue が列挙されていることを確認する
- `gh issue view "${ROOT_NUMBER}"` でルート issue 本文の Phase 別表が正しく生成されていることを確認する
- `gh issue view "${ROOT_NUMBER}" --json body --jq .body` に `<phaseN_number>`・`#N`・`(作成後に更新)`・素の `N` セルが残っていないことを確認する（残っていれば Step 6 を再実行する）
- `MILESTONE` を割り当てた場合、`gh issue view <N> --json milestone --jq '.milestone.title'`
  でルート・Phase 親・子いずれも `${MILESTONE}` と一致することを確認する

```bash
# sub-issues は 1 ページ最大 100 件。100 件超のツリーは Step 5 のページネーション
# ループで全件確認する（以下は per_page=100 で先頭ページのみ。件数が 100 未満なら全件）

# ルート直下の sub-issues を確認
gh api "repos/{owner}/{repo}/issues/${ROOT_NUMBER}/sub_issues?per_page=100" --jq '.[].number'

# Phase 親直下の sub-issues を確認
gh api "repos/{owner}/{repo}/issues/${PHASE_NUMBER}/sub_issues?per_page=100" --jq '.[].number'

# phase ラベルの同期確認（Phase 親・子 issue にラベルが付いているか確認）
gh api "repos/{owner}/{repo}/issues/${PHASE_NUMBER}/sub_issues?per_page=100" \
  --jq '.[] | {number: .number, labels: [.labels[].name]}'
```

## よくある失敗

| 問題 | 回避策 |
|------|--------|
| `--root` を指定せず 2 回目の部分起票でルート issue が重複作成される | 2 回目以降は必ず `--root <既存ルートissue番号>` を渡す |
| `sub_issue_id` に issue 番号をそのまま渡す | `gh api .../issues/<number> --jq '.id'` で database id を取得してから POST する |
| phase ラベルが存在しないリポジトリで issue 作成が失敗する | Step 4 冒頭の `gh label create "phase:${PHASE}"` を必ず先に実行する |
| `--root` 追記時に既存ルートの milestone が未設定なのに気づかず milestone なしで起票してしまう | リポジトリに milestone が存在する場合、Step 2.5 は継承結果が空ならユーザー確認フローへ自動的に合流する（確認で milestone を選ぶとルート issue にも反映される）。milestone が 1 件もない非運用リポジトリでは非運用ガードによる milestone なし起票が正常動作 |
| closed 親の下に open issue が残置される | Phase 親を close する前に全子 issue の close を確認する |
| Step 6 の例をプレースホルダーのまま実行してルート本文が雛形で上書きされる | 実ツリーから表を生成する Step 6 のブロックを使う。検査ガードに引っかかったら本文を送らず中止される |
| Step 6 到達前に中断し、雛形のままのルートが残った | `--root <ルート番号>` を付けて再実行する。プレースホルダー行は今回の Phase 行へ置き換わる |
| `--granularity` に `2 h`・`2`・`0h` 等を渡して中断される | 正整数+h 形式（`^[1-9][0-9]*h$`。例: `2h`・`4h`）で指定する |

## 注意事項

- **1 issue は粒度基準（既定 2h・`--granularity` で変更可）程度に収める。** 超えると判断した場合は sub-issue に分解する
- issue タイトルは Conventional Commits 形式を推奨（`feat:`・`fix:`・`chore:` 等）
- `--phase` 指定で部分起票した場合、別 Phase の追加起票では **必ず `--root <既存ルートissue番号>` を渡す**（Step 3 の新規作成をスキップして既存ツリーへ継ぎ足し、Step 6 も全置換せず既存本文へ差分追記する）。起票後は update-issue-tree に同じルート issue 番号を渡して棚卸しする
- ページネーション: sub-issues が 100 件を超える場合は `per_page=100&page=N` でページングして全件取得する
- シェルコマンドの変数は必ず `"${var}"` でクォートする（コマンドインジェクション対策）
- **`gh issue create` は `--json` 非対応**。issue URL を stdout に出力するため、`| grep -oE '[0-9]+$'` で末尾の番号を抽出して変数に保持する
- **sub_issues API の `sub_issue_id` は issue 番号ではなく database id**（GitHub 仕様）。`gh api "repos/{owner}/{repo}/issues/<number>" --jq '.id'` で id を取得してから POST する。番号をそのまま渡すと誤った issue を紐付ける／404 になる
- phase ラベルは Step 4 冒頭の `gh label create "phase:${PHASE}" --color "0075ca"` で issue 作成より前に必ず作成する（作成済みリポジトリでは no-op）
