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

棚卸し対象の一覧をユーザーに提示し、方針確認を取ってから変更を実行する。

### Step 3: closed 親下の残置 open issue を付け替える

closed 親の下に残置されている open issue を、対応する open Phase 親へ移動する。

```bash
# sub_issue_id は issue 番号ではなく database id を渡す（GitHub sub-issues API 仕様）
ISSUE_ID=$(gh api "repos/{owner}/{repo}/issues/${ISSUE_NUMBER}" --jq '.id')

# 既存の親から外す（sub_issues API の DELETE）
gh api \
  --method DELETE \
  "repos/{owner}/{repo}/issues/${OLD_PARENT}/sub_issues" \
  -F "sub_issue_id=${ISSUE_ID}"

# 新しい親へ紐付ける
gh api \
  --method POST \
  "repos/{owner}/{repo}/issues/${NEW_PARENT}/sub_issues" \
  -F "sub_issue_id=${ISSUE_ID}"
```

### Step 4: 孤児 issue を再配置する

どの親にも紐付いていない孤児 issue を適切な Phase 親へ紐付ける。  
Phase が不明な issue はタイトル・本文を読んで判断し、判断できない場合はユーザーに確認する。

```bash
# sub_issue_id は database id を渡す（issue 番号ではない）
ORPHAN_ID=$(gh api "repos/{owner}/{repo}/issues/${ORPHAN_NUMBER}" --jq '.id')
gh api \
  --method POST \
  "repos/{owner}/{repo}/issues/${PHASE_NUMBER}/sub_issues" \
  -F "sub_issue_id=${ORPHAN_ID}"
```

### Step 5: 必要に応じて新 Phase 親を新設する

既存 Phase に収まらない新規タスクが多い場合、新 Phase 親 issue を作成してルートへ紐付ける。

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

## 検証

- ルート issue 本文の Phase 別表が更新されていることを確認する
- closed Phase 親の下に open issue が残置されていないことを確認する

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

## 注意事項

- **棚卸し前に変更内容をユーザーに提示して確認を取る**（Step 2 参照）
- ページネーション: sub-issues が 100 件を超える場合は `per_page=100&page=N` でページングして全件取得する
- シェルコマンドの変数は必ず `"${var}"` でクォートする（コマンドインジェクション対策）
- `--no-verify` は絶対に使用しない
- **`gh issue create` は `--json` 非対応**。issue URL を stdout に出力するため、`| grep -oE '[0-9]+$'` で末尾の番号を抽出する
- **sub_issues API（POST / DELETE）の `sub_issue_id` は issue 番号ではなく database id**（GitHub 仕様）。`gh api "repos/{owner}/{repo}/issues/<number>" --jq '.id'` で id を取得してから渡す。番号をそのまま渡すと誤った issue を操作する／404 になる
- 孤児 issue の Phase が判断できない場合は推測せずにユーザーへ確認する
- sub_issues の DELETE API で付け替えを行う際、操作対象の issue 番号を必ず確認してから実行する
- ツリー更新後は implement-issue-tree が post-order DFS で正しく消化できる構造になっているか確認する
