---
name: create-issue
description: GitHub Issue を親子構造 (sub-issues) で作成する。`gh issue create` で親・子 Issue を生成し、`gh api .../sub_issues` で親子関係を紐付ける。タイトルは Conventional Commits 形式 (`feat:`, `fix:` 等) を推奨。「Issue 作って」「タスクを分解して Issue 化」などで使用。
model: sonnet
---

# create-issue

GitHub Issue を親子構造で作成します。

## 前提条件

- `gh` CLI がインストールされ、認証済みであること
- `gh auth status` で確認できる

## フロー

### Step 1: タスク内容を分析する

ユーザーの説明から以下を抽出:
- 機能・修正の概要
- 背景・モチベーション
- 受け入れ条件
- 個別タスクへの分解

### Step 2: 親 Issue を作成する

```bash
gh issue create \
  --title "feat: 機能名" \
  --body "$(cat <<'EOF'
## 概要
...

## 背景
...

## 受け入れ条件
- [ ] 条件1
- [ ] 条件2

## 関連
- Figma: ...
- 関連 Issue: #...
EOF
)"
```

タイトルは Conventional Commits 形式: `feat:`, `fix:`, `chore:` 等。

### Step 3: 子 Issue を作成する

各個別タスクを子 Issue として作成:

```bash
gh issue create \
  --title "feat: タスク名" \
  --body "..."
```

### Step 4: Sub-issues として紐付ける

`gh api` を使用して子 Issue を親の sub-issues に追加する。GitHub sub-issues API は **issue 番号ではなく database id** を要求するため、先に `gh api` で database id を取得してから渡す:

```bash
# 子 Issue の database id を取得する（issue 番号 {child_number} から変換）
child_id=$(gh api "repos/{owner}/{repo}/issues/{child_number}" --jq '.id')

# database id を sub_issue_id に渡して紐付ける
gh api \
  --method POST \
  "repos/{owner}/{repo}/issues/{parent_number}/sub_issues" \
  -F "sub_issue_id=${child_id}"
```

### Step 5: Issue URL を返す

作成した親 Issue と子 Issue の URL を一覧表示する。

## 検証

Issue 作成後、以下で確認する。

```bash
# 親 Issue の内容と sub-issues の紐付けを確認
gh issue view <親Issue番号>

# sub-issues が正しく紐付いているか確認
gh api "repos/{owner}/{repo}/issues/<親Issue番号>/sub_issues" --jq '.[].number'
```

- 親 Issue に全子 Issue が列挙されていること
- 各 Issue のタイトルが Conventional Commits 形式になっていること

## よくある失敗

| 問題 | 回避策 |
|------|--------|
| `sub_issue_id` に issue 番号を渡す | `gh api .../issues/<number>` の `.id`（database id）を取得して渡す |
| 子 Issue が独立して完了できない粒度になっている | 受け入れ条件を見直し、単一の関心事に絞って再分解する |
| 認証エラーで `gh api` が失敗する | `gh auth status` で認証状態を確認し、`gh auth login` で再認証する |

## 注意事項

- Issue タイトルは Conventional Commits 形式を推奨
- 子 Issue は独立して完了できる粒度にする
- ラベル・マイルストーンが必要な場合はユーザーに確認する

## sandbox 環境での実行

このスキルは sandbox 環境では実行できない。ネットワークアクセス・ファイルシステムへの書き込みが必要なため、通常の Claude Code セッションで実行すること。
