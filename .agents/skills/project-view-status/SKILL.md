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
- **sandbox 環境での `GIT_SSL_NO_VERIFY=1` 併用**：詳細は後述の「sandbox 環境での実行」節を参照

## sandbox 環境での実行

sandbox で本スキルを実行する場合、ネットワーク越しの GitHub 操作には `GIT_SSL_NO_VERIFY=1` の併用を検討してください。本スキルの主なリモート操作は `gh project item-list` で、「リモート書き込み」判定は **要（本スキルは read-only）** です。コマンド分類の詳細と TLS 検証無効化の注意事項は [`docs/sandbox-tls.md`](../../docs/sandbox-tls.md) を参照してください。
