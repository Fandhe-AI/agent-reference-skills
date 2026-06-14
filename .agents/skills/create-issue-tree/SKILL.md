---
name: create-issue-tree
description: >
  Phase 分割された GitHub Issue ツリーを新規作成するスキル。「イシューツリー作って」「タスクを Phase 別に Issue 化」「Issue ツリーを起票して」で使用。
  要件・タスク一覧を受け取り、タスク分解（4h 粒度）→ Phase 分割 → ルート（トラッキング）issue → Phase 親 issue → 子 issue の階層を sub_issues API で紐付け。
  phase ラベル付与・ルート issue 本文の Phase 別表生成まで自動化。任意の phase 指定で部分起票にも対応。
  ツリーの棚卸し・更新は update-issue-tree、実装消化は implement-issue-tree を参照。
model: opus
user-invocable: true
argument-hint: "<要件テキストまたはファイルパス> [--phase <phase番号>] [--root <既存ルートissue番号>]"
---

# create-issue-tree

要件・タスク一覧から Phase 分割された GitHub Issue ツリーを新規作成する。
ルート（トラッキング issue）→ Phase 親 issue → issue → sub-issue の 4 階層を構築し、implement-issue-tree が post-order DFS で消化できる構造を維持する。

## 使い方

引数としてタスク要件テキストまたはファイルパスを渡す。  
`--phase` オプションで特定 Phase のみ起票することもできる（大規模ツリーを段階的に起票する場合）。  
2 回目以降の部分起票では `--root` で既存ルート issue 番号を渡し、同じツリーに継ぎ足す
（指定しないと新しいルート issue が重複作成される）。

```
create-issue-tree "ユーザー認証機能を実装する"
create-issue-tree requirements.md
create-issue-tree requirements.md --phase 2 --root 123
```

## 前提条件

- `gh` CLI がインストールされ、認証済みであること（`gh auth status` で確認）
- 対象リポジトリへの Issue 書き込み権限があること

## フロー

### Step 1: 要件を分析してタスクを分解する

入力テキストまたはファイルから要件を読み込み、以下の観点でタスクを分解する。

- **粒度基準: 1 issue は実装 4h 程度に収める。** 4h を超えると判断した場合は sub-issue に再分解する
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

### Step 3: ルート（トラッキング）issue を作成する

ルート issue はツリー全体の進捗を管理するトラッキング issue として作成する。**ルート issue 自体には phase ラベルは付与しない**（Phase 親以下の issue にのみ付与する）。

**`--root` 指定時は新規作成をスキップする。** `--phase` での 2 回目以降の部分起票で
ルート issue を重複作成しないため、既存ルートの番号を `ROOT_NUMBER` に設定して再利用する。

```bash
# --root 指定時: 既存ルートを再利用する（OPEN でなければ中止する）
ROOT_NUMBER=123  # --root で渡された番号
ROOT_STATE=$(gh issue view "${ROOT_NUMBER}" --json state --jq '.state')
if [[ "${ROOT_STATE}" != "OPEN" ]]; then
  echo "エラー: ルート issue #${ROOT_NUMBER} は OPEN ではありません (state: ${ROOT_STATE})。中止します。"
  exit 1
fi
```

`--root` 未指定の場合のみ、以下でルート issue を新規作成する。

```bash
# gh issue create は issue URL を stdout に出力する（--json 非対応）。URL 末尾から番号を抽出する
ROOT_URL=$(gh issue create \
  --title "chore: 全 open issue の Phase 別トラッキング ($(date +%Y-%m-%d))" \
  --body "$(cat <<'EOF'
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
```

タイトル規約が `feat(phase-N):` と異なるツリーでは上記の自動判定に頼らず、候補をユーザーに
提示して再利用すべき Phase 親を確認する。

`PHASE_NUMBER` が空（既存の Phase 親がない）場合のみ、以下で新規作成してルートへ紐付ける。

```bash
# Phase 親 issue を作成（URL 末尾から番号を抽出）
PHASE_URL=$(gh issue create \
  --title "feat(phase-${PHASE}): Phase ${PHASE} 基盤整備" \
  --label "phase:${PHASE}" \
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

各タスクを issue として作成し、Phase 親へ紐付ける。4h 超のタスクはさらに sub-issue に分解する。

```bash
# 子 issue を作成（URL 末尾から番号を抽出）。PHASE は Step 4 で設定した番号を引き継ぐ
CHILD_URL=$(gh issue create \
  --title "feat: タスク名" \
  --label "phase:${PHASE}" \
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

# 4h 超の場合は sub-issue を作成して子 issue へ紐付け
SUB_URL=$(gh issue create \
  --title "feat: サブタスク名" \
  --label "phase:${PHASE}" \
  --body "...")
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

```bash
# --root 指定時: 既存本文を取得し、今回の Phase 分をマージしてから編集する
CURRENT_BODY=$(gh issue view "${ROOT_NUMBER}" --json body --jq '.body')
# CURRENT_BODY の「Phase 別実装計画」表へ今回の Phase 行を追記し、
# 「### Phase N」セクションを追加した本文を組み立てて gh issue edit --body に渡す。
# 既存ツリーの棚卸しを伴う場合は update-issue-tree への委譲でもよい
```

`--root` 未指定（新規作成）の場合は以下で全体を更新する。

```bash
gh issue edit "${ROOT_NUMBER}" --body "$(cat <<'EOF'
## 概要

全 open issue を Phase 別に 1 ツリーへ整理する。各 Phase 親 issue を sub-issues として紐付け。

## Phase 別実装計画

| Phase | 親 issue | 直下 | 総 open 件数 |
|-------|----------|------|-------------|
| Phase 1 | #<phase1_number> タイトル | N | N |
| Phase 2 | #<phase2_number> タイトル | N | N |

### Phase 1: 基盤整備

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

## 注意事項

- **1 issue は 4h 程度に収める。** 4h を超えると判断した場合は sub-issue に分解する
- issue タイトルは Conventional Commits 形式を推奨（`feat:`・`fix:`・`chore:` 等）
- `--phase` 指定で部分起票した場合、別 Phase の追加起票では **必ず `--root <既存ルートissue番号>` を渡す**（Step 3 の新規作成をスキップして既存ツリーへ継ぎ足し、Step 6 も全置換せず既存本文へ差分追記する）。起票後は update-issue-tree に同じルート issue 番号を渡して棚卸しする
- ページネーション: sub-issues が 100 件を超える場合は `per_page=100&page=N` でページングして全件取得する
- シェルコマンドの変数は必ず `"${var}"` でクォートする（コマンドインジェクション対策）
- `--no-verify` は絶対に使用しない
- **`gh issue create` は `--json` 非対応**。issue URL を stdout に出力するため、`| grep -oE '[0-9]+$'` で末尾の番号を抽出して変数に保持する
- **sub_issues API の `sub_issue_id` は issue 番号ではなく database id**（GitHub 仕様）。`gh api "repos/{owner}/{repo}/issues/<number>" --jq '.id'` で id を取得してから POST する。番号をそのまま渡すと誤った issue を紐付ける／404 になる
- phase ラベルは Step 4 冒頭の `gh label create "phase:${PHASE}" --color "0075ca"` で issue 作成より前に必ず作成する（作成済みリポジトリでは no-op）
