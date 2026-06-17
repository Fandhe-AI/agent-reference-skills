---
name: project-view-status
description: プロジェクトの進捗をステータス別・優先度別・サイズ別に集計してレポートを生成する。完了率と未完了の優先度内訳を表形式で出力する読み取り専用スキル。「進捗を見せて」「プロジェクトレポート」「完了率は？」「ステータス別の件数」などで使用。
model: haiku
---

# project-view-status

プロジェクトの進捗状況をステータス別・優先度別に集計し、レポートを生成します。

## 前提条件

- 対象の GitHub Project が存在すること
- `gh` CLI がインストールされ、認証済みであること（`project` スコープ付き）

## フロー

### Step 1: プロジェクト情報を取得する

```bash
gh project view <number> --owner <owner> --format json
```

プロジェクトのタイトル・説明・URL を取得する。

### Step 2: 全アイテムを取得する

```bash
gh project item-list <number> \
  --owner <owner> \
  --limit 999 \
  --format json
```

### Step 3: フィールド定義を取得する

```bash
gh project field-list <number> \
  --owner <owner> \
  --format json
```

Status, Priority, Size フィールドの定義とオプション値を取得する。

### Step 4: ステータス別・優先度別に集計する

JSON データを処理して以下を集計:
- ステータス別アイテム数（Todo / In Progress / In Review / Done）
- 優先度別アイテム数（High / Medium / Low）
- ステータス × 優先度のクロス集計
- 完了率（Done / 全件）

### Step 5: レポートを生成する

以下の形式でレポートを出力:

```markdown
## プロジェクト進捗レポート: <タイトル>

**更新日時:** YYYY-MM-DD HH:MM

### 全体進捗
- 総アイテム数: N 件
- 完了率: XX% (N/M)
- 進行中: N 件
- レビュー中: N 件
- 未着手: N 件

### ステータス別

| ステータス | 件数 | 割合 |
|-----------|------|------|
| Done | N | XX% |
| In Review | N | XX% |
| In Progress | N | XX% |
| Todo | N | XX% |

### 優先度別（未完了のみ）

| 優先度 | 件数 | In Progress | Todo |
|--------|------|------------|------|
| High | N | N | N |
| Medium | N | N | N |
| Low | N | N | N |

### サイズ別（未完了のみ）

| サイズ | 件数 |
|--------|------|
| XL | N |
| L | N |
| M | N |
| S | N |
| XS | N |
```

## 注意事項

- `--limit 999` でページネーション切り捨てを防ぐ
- 読み取り専用の操作のため、プロジェクトに変更を加えない
- フィールドが存在しない場合は該当セクションをスキップする
- アイテムが 0 件の場合はその旨を報告する
- sandbox 環境では実行できない（後述の「sandbox 環境での実行」節を参照）

## 検証

Step 5 のレポート出力に以下が含まれていれば完了:
- 総アイテム数・完了率が表示されている
- ステータス別・優先度別の件数が集計されている

プロジェクトに変更は加わらない（読み取り専用）。

## sandbox 環境での実行

このスキルは sandbox 環境では実行できない。ネットワークアクセス・ファイルシステムへの書き込みが必要なため、通常の Claude Code セッションで実行すること。
