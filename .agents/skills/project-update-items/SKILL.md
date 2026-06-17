---
name: project-update-items
description: プロジェクトアイテムのフィールド値 (Status/Priority/Size 他) をクエリフィルタやアイテム指定で絞り込んで一括更新する。SINGLE_SELECT/TEXT/NUMBER/DATE のフィールドタイプに対応。「Status を In Progress に変更」「優先度を一括更新」「Todo を全部 In Progress に」などで使用。
model: haiku
---

# project-update-items

プロジェクトアイテムのフィールド値を一括で更新します。ステータス変更、優先度変更、サイズ設定などに対応します。

## 前提条件

- 対象の GitHub Project にアイテムが存在すること
- `gh` CLI がインストールされ、認証済みであること（`project` スコープ付き）

## フロー

### Step 1: 更新対象と更新内容を確認する

ユーザーから以下を確認:
- **対象の指定方法:**
  - クエリフィルタ（例: `status:Todo`, `label:bug`, `assignee:@me`）
  - アイテム番号の直接指定
  - 全件
- **更新するフィールド:** Status, Priority, Size, またはカスタムフィールド
- **新しい値:** 例: Status → "In Progress", Priority → "High"

### Step 2: フィールドメタデータを取得する

```bash
# プロジェクト ID を取得
gh project view <number> --owner <owner> --format json -q '.id'

# フィールド ID とオプション ID を取得
gh project field-list <number> --owner <owner> --format json
```

`jq` で対象フィールドの ID と、更新先の値に対応するオプション ID を解決する。

### Step 3: 対象アイテムを検索する

```bash
gh project item-list <number> \
  --owner <owner> \
  --format json \
  --limit 999
```

ユーザー指定の条件でアイテムをフィルタする。`--query` パラメータが使える場合はそちらを優先:

```bash
gh project item-list <number> \
  --owner <owner> \
  --query "status:Todo" \
  --format json
```

### Step 4: ユーザーに更新内容を確認する

更新対象と変更内容を一覧表示:

```
以下の N 件のアイテムを更新します:
- #1: ソーシャルログイン — Status: Todo → In Progress
- #2: パスワードリセット — Status: Todo → In Progress

実行しますか？
```

### Step 5: フィールド値を一括更新する

各アイテムに対してフィールド値を更新:

```bash
gh project item-edit \
  --id <item-id> \
  --field-id <field-id> \
  --project-id <project-id> \
  --single-select-option-id <option-id>
```

フィールドタイプに応じて適切なフラグを使用:
- SINGLE_SELECT: `--single-select-option-id`
- TEXT: `--text`
- NUMBER: `--number`
- DATE: `--date`（YYYY-MM-DD 形式）

### Step 6: 更新結果を報告する

更新されたアイテムの一覧を表示:

| # | タイトル | フィールド | 旧値 | 新値 |
|---|---------|----------|------|------|
| 1 | ソーシャルログイン | Status | Todo | In Progress |
| 2 | パスワードリセット | Status | Todo | In Progress |

## 注意事項

- バッチ更新前に必ずユーザーの確認を得る
- オプション値がプロジェクトのフィールド定義に存在しない場合はエラーを報告する
- 複数フィールドを同時に更新する場合は、フィールドごとに `item-edit` を実行する
- GitHub API レート制限に注意し、大量更新時はバッチサイズを調整する
- sandbox 環境では実行できない（後述の「sandbox 環境での実行」節を参照）

## 検証

Step 6 完了後、以下で更新内容を確認する:

```bash
gh project item-list <number> --owner <owner> --format json --limit 999
```

対象アイテムのフィールド値が新しい値に変わっていれば完了。

## sandbox 環境での実行

このスキルは sandbox 環境では実行できない。ネットワークアクセス・ファイルシステムへの書き込みが必要なため、通常の Claude Code セッションで実行すること。
