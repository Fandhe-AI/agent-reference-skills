---
name: project-create-issues
description: プロジェクトのドラフトアイテム (DraftIssue) を実 GitHub Issue に変換し、Status/Priority/Size 等のフィールド値を引き継ぐ。親 Issue を指定または新規作成して `gh api .../sub_issues` で sub-issue として紐付け可能。「ドラフトを Issue 化」「DraftIssue を変換」「プロジェクトのタスクを Issue にして」などで使用。
model: sonnet
---

# project-create-issues

プロジェクト内のドラフトアイテムを GitHub Issue に変換し、親子関係（sub-issues）を設定します。

## 前提条件

- 対象の GitHub Project にドラフトアイテムが存在すること
- `gh` CLI がインストールされ、認証済みであること（`project` スコープ付き）

## フロー

### Step 1: ドラフトアイテムを取得する

```bash
gh project item-list <number> \
  --owner <owner> \
  --format json \
  --limit 999
```

JSON 出力からタイプが `DraftIssue` のアイテムをフィルタする。

### Step 2: 変換対象をユーザーに確認する

ドラフトアイテムの一覧を表示し、変換対象を確認:
- 全件変換
- 特定のアイテムのみ選択

### Step 3: 親 Issue を決定する

ユーザーに以下を確認:
- 既存の親 Issue 番号を指定する
- 新規に親 Issue を作成する
- 親 Issue なし（個別 Issue のみ作成）

新規作成の場合:

```bash
gh issue create \
  --title "feat: プロジェクト名" \
  --body "$(cat <<'EOF'
## 概要
プロジェクトのトラッキング Issue。

## サブタスク
（sub-issues として自動追加されます）
EOF
)"
```

### Step 4: ドラフトのフィールド値を保存する

変換前に各ドラフトアイテムのフィールド値を取得・保存する:

```bash
gh project item-list <number> \
  --owner <owner> \
  --format json \
  --limit 999
```

各アイテムの Status, Priority, Size 等のフィールド値を記録しておく。

### Step 5: Issue を作成してプロジェクトに追加する

各ドラフトアイテムに対して:

```bash
# 1. Issue を作成
gh issue create \
  --title "<ドラフトのタイトル>" \
  --body "<ドラフトの本文>" \
  --repo <owner>/<repo>

# 2. 作成した Issue をプロジェクトに追加
gh project item-add <number> \
  --owner <owner> \
  --url <issue-url> \
  --format json

# 3. 新しいアイテムにフィールド値をコピー
gh project item-edit \
  --id <new-item-id> \
  --field-id <field-id> \
  --project-id <project-id> \
  --single-select-option-id <option-id>

# 4. 元のドラフトアイテムを削除
gh project item-delete <number> \
  --owner <owner> \
  --id <draft-item-id>
```

Issue タイトルは Conventional Commits 形式を推奨: `feat:`, `fix:`, `chore:` 等。

### Step 6: Sub-issue として紐付ける

親 Issue が指定されている場合、各子 Issue を sub-issue として紐付ける:

```bash
gh api \
  --method POST \
  repos/{owner}/{repo}/issues/{parent_number}/sub_issues \
  -f sub_issue_id={child_node_id}
```

> **Note:** `sub_issue_id` には Issue のノード ID が必要。`gh issue view <number> --json id -q '.id'` で取得する。

### Step 7: 結果を報告する

作成された Issue の一覧を表示:

| # | Issue | タイトル | Priority | Size | Sub-issue |
|---|-------|---------|----------|------|-----------|
| 1 | #42   | feat: ソーシャルログイン | High | L | #40 の子 |
| 2 | #43   | feat: パスワードリセット | Medium | M | #40 の子 |

## 注意事項

- Issue タイトルは Conventional Commits 形式を推奨
- ドラフト→Issue 変換時にフィールド値が失われるため、Step 4 で事前に保存しておく
- ラベル・アサイニー・マイルストーンが必要な場合はユーザーに確認する
- 大量のドラフト変換時は GitHub API レート制限に注意する
- **sandbox 環境での `GIT_SSL_NO_VERIFY=1` 併用**：詳細は後述の「sandbox 環境での実行」節を参照

## sandbox 環境での実行

sandbox で本スキルを実行する場合、ネットワーク越しの GitHub 操作には `GIT_SSL_NO_VERIFY=1` の併用を検討してください。本スキルの主なリモート操作は `gh issue create` / `gh project item-add` で、「リモート書き込み」判定は **要（本スキルは主に API 経由）** です。コマンド分類の詳細と TLS 検証無効化の注意事項は [`docs/sandbox-tls.md`](../../docs/sandbox-tls.md) を参照してください。
