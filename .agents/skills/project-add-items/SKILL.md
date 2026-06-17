---
name: project-add-items
description: Markdown チェックリスト・YAML タスクリスト・要件定義書などからプロジェクトアイテムを一括作成する。タイトル・本文・Priority・Size をパースして `gh project item-create` + `item-edit` でフィールド設定。「要件書からアイテム作って」「タスクをプロジェクトに追加」「ロードマップを取り込んで」などで使用。
model: sonnet
---

# project-add-items

要件定義書・タスクリスト・ロードマップなどのソースからプロジェクトアイテムを一括作成します。

## 前提条件

- 対象の GitHub Project が存在すること
- `gh` CLI がインストールされ、認証済みであること（`project` スコープ付き）

## フロー

### Step 1: ソースを特定する

ユーザーからアイテムのソースを取得:
- ファイルパス（Markdown、YAML 等）
- URL（GitHub Issue 一覧、Wiki ページ等）
- インラインテキスト（ユーザーが直接入力）

### Step 2: ソースを解析してアイテムを抽出する

ソース形式に応じて解析し、以下の情報を抽出:
- タイトル
- 本文・説明
- 優先度（High / Medium / Low）
- サイズ（XS / S / M / L / XL）
- カテゴリ（セクション見出し等から）

**対応ソース形式の例:**

Markdown チェックリスト:
```markdown
## 認証機能
- [ ] ソーシャルログイン実装 (Priority: High, Size: L)
- [ ] パスワードリセット (Priority: Medium, Size: M)

## ダッシュボード
- [ ] 利用統計グラフ (Priority: Low, Size: S)
```

YAML タスクリスト:
```yaml
tasks:
  - title: "ソーシャルログイン実装"
    priority: High
    size: L
    description: "OAuth2 を使用した Google/GitHub ログイン"
```

### Step 3: フィールドメタデータを取得する

```bash
# プロジェクト ID を取得
gh project view <number> --owner <owner> --format json -q '.id'

# フィールド ID とオプション ID を取得
gh project field-list <number> --owner <owner> --format json
```

`jq` でフィールド名→フィールド ID、オプション名→オプション ID を解決する。

### Step 4: アイテムを一括作成する

抽出した各アイテムに対して:

```bash
gh project item-create <number> \
  --owner <owner> \
  --title "<タイトル>" \
  --body "<本文>" \
  --format json
```

出力からアイテム ID を取得する。

### Step 5: フィールド値を設定する

各アイテムに対してフィールド値を設定:

```bash
# Priority を設定
gh project item-edit \
  --id <item-id> \
  --field-id <priority-field-id> \
  --project-id <project-id> \
  --single-select-option-id <option-id>

# Size を設定
gh project item-edit \
  --id <item-id> \
  --field-id <size-field-id> \
  --project-id <project-id> \
  --single-select-option-id <option-id>

# Status を設定（デフォルト: Todo）
gh project item-edit \
  --id <item-id> \
  --field-id <status-field-id> \
  --project-id <project-id> \
  --single-select-option-id <todo-option-id>
```

### Step 6: 作成結果を一覧表示する

作成されたアイテムの一覧を表示:

| # | タイトル | Priority | Size | Status |
|---|---------|----------|------|--------|
| 1 | ソーシャルログイン実装 | High | L | Todo |
| 2 | パスワードリセット | Medium | M | Todo |

## 注意事項

- 大量のアイテム（20件以上）を作成する場合は、ユーザーに確認してからバッチ実行する
- ソースの形式が不明な場合はユーザーに確認する
- フィールド値がプロジェクトのオプションに一致しない場合はスキップして警告する
- GitHub API レート制限に注意し、必要に応じてバッチサイズを調整する
- sandbox 環境では実行できない（後述の「sandbox 環境での実行」節を参照）

## 検証

Step 6 完了後、以下で作成済みアイテムを確認する:

```bash
gh project item-list <number> --owner <owner> --format json --limit 999
```

作成したタイトルが一覧に含まれ、Priority / Size / Status が期待値と一致すれば完了。

## sandbox 環境での実行

このスキルは sandbox 環境では実行できない。ネットワークアクセス・ファイルシステムへの書き込みが必要なため、通常の Claude Code セッションで実行すること。
