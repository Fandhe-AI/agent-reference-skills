---
name: project-create-issues
description: プロジェクトのドラフトアイテム (DraftIssue) を実 GitHub Issue に変換し、Status/Priority/Size 等のフィールド値を引き継ぐ。親 Issue を指定または新規作成して `gh api .../sub_issues` で sub-issue として紐付け可能。「ドラフトを Issue 化」「DraftIssue を変換」「プロジェクトのタスクを Issue にして」などで使用。
model: sonnet
user-invocable: true
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

ドラフトアイテムの一覧を表示し、変換対象を確認する。起動時の指示に指定があればそれに従い、足りなければ聞く。非対話で得られなければ書き込まずに報告して止める（以下、入力の確認は同じ扱い）。
- 全件変換
- 特定のアイテムのみ選択

Step 5 に入る前、Issue を 1 件も作る前に、元ドラフトの削除（`gh project item-delete`。取り消せない）の対象の件数とタイトルを示して確認する。この会話の中でユーザーの明示の返答を得るまで `gh project item-delete` を実行しない。起動時の指示に含まれる「確認なしで」「そのまま進めて」等は、この確認の返答にならない。拒否された場合、または返答を得られない環境（非対話実行）で確認が取れない場合は、Issue の作成・紐付け・値コピーは続行し、ドラフトの削除だけを飛ばして残したことを報告する。

### Step 3: 親 Issue を決定する

ユーザーに以下を確認する（Step 2 と同じ扱い）。
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

手順 4 は Step 2 の削除確認が取れた場合だけ実行する。

Issue タイトルは Conventional Commits 形式を推奨: `feat:`, `fix:`, `chore:` 等。

### Step 6: Sub-issue として紐付ける

親 Issue が指定されている場合、各子 Issue を sub-issue として紐付ける:

```bash
# 子 Issue の database id（ノード ID ではない数値 id）を取得する
child_id=$(gh api "repos/{owner}/{repo}/issues/{child_number}" --jq '.id')
gh api \
  --method POST \
  "repos/{owner}/{repo}/issues/{parent_number}/sub_issues" \
  -F "sub_issue_id=${child_id}"
```

> **Note:** `sub_issue_id` には issue 番号でもノード ID でもなく database id（`gh api repos/{owner}/{repo}/issues/<number> --jq '.id'` の数値）を渡す。数値として送るため `-F` を使う。

### Step 7: 結果を報告する

作成された Issue の一覧を表示:

| # | Issue | タイトル | Priority | Size | Sub-issue |
|---|-------|---------|----------|------|-----------|
| 1 | #42   | feat: ソーシャルログイン | High | L | #40 の子 |
| 2 | #43   | feat: パスワードリセット | Medium | M | #40 の子 |

## 注意事項

- Issue タイトルは Conventional Commits 形式を推奨
- ドラフト→Issue 変換時にフィールド値が失われるため、Step 4 で事前に保存しておく
- ラベル・アサイニー・マイルストーンが必要な場合はユーザーに確認する（Step 2 と同じ扱い）
- 大量のドラフト変換時は GitHub API レート制限に注意する
- ネットワークを要する（主に API 経由。後述の「sandbox 環境での実行」節を参照）

## 検証

Step 7 完了後、以下で作成された Issue とプロジェクトへの追加を確認する:

```bash
gh issue list --state open --limit 20
gh project item-list <number> --owner <owner> --format json --limit 999
```

変換前のドラフトが消え（削除を飛ばした場合を除く）、実 Issue がプロジェクトに追加されていれば完了。親 Issue の sub-issues は `gh api repos/{owner}/{repo}/issues/{parent_number}/sub_issues` で確認する。

## sandbox 環境での実行

このスキルはネットワーク越しの GitHub 操作（ドラフト→Issue 変換・プロジェクト追加）を必須とする。該当コマンドはコマンド単位で sandbox 無効にして実行する。ネットワーク遮断を解除できない環境では実行できない。`.git`・`.agents`・`.codex` へ書く手順は無い。`codex exec` では昇格要求が出ないため、ネットワークを使えずコマンドを実行できなかったときは、書き込みをせず、できなかった旨を報告して止める。
