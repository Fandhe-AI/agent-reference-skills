---
name: project-archive-done
description: Status が Done のプロジェクトアイテムを `gh project item-archive` で一括アーカイブする。Auto-archive ビルトインワークフローの設定状況も確認・案内 (有効なら手動実行は基本不要)。「完了アイテムをアーカイブ」「Done を整理」「ボード掃除」などで使用。
model: haiku
---

# project-archive-done

プロジェクト内の完了済み（Done）アイテムをアーカイブし、ボードを整理します。ビルトインの Auto-archive が設定済みの場合はその状況も確認します。

## 前提条件

- 対象の GitHub Project に完了アイテムが存在すること
- `gh` CLI がインストールされ、認証済みであること（`project` スコープ付き）

## フロー

### Step 1: Auto-archive の状況を確認する

ビルトインの Auto-archive ワークフローが有効な場合は自動でアーカイブされる。設定状況をユーザーに確認する。

設定 URL: `https://github.com/orgs/<owner>/projects/<number>/workflows`
（個人プロジェクトの場合: `https://github.com/users/<owner>/projects/<number>/workflows`）

- **Auto-archive が有効** → 基本的にスキルの実行は不要。即時アーカイブしたい場合のみ続行
- **Auto-archive が無効** → このスキルで手動アーカイブを実行。必要に応じて Auto-archive の有効化も案内

### Step 2: プロジェクトアイテムを取得する

```bash
gh project item-list <number> \
  --owner <owner> \
  --format json \
  --limit 999
```

### Step 3: フィールドメタデータを取得する

```bash
gh project field-list <number> \
  --owner <owner> \
  --format json
```

Status フィールドの ID と "Done" オプションの ID を特定する。

### Step 4: 完了アイテムをフィルタする

Step 2 の結果から、Status が "Done" のアイテムを抽出する。

`--query` が使える場合:

```bash
gh project item-list <number> \
  --owner <owner> \
  --query "status:Done" \
  --format json
```

### Step 5: ユーザーに確認する

アーカイブ対象を表示:

```
以下の N 件の完了アイテムをアーカイブします:
- #42: feat: ソーシャルログイン（Done）
- #43: fix: バリデーションエラー（Done）
- #44: docs: API ドキュメント更新（Done）

実行しますか？
```

### Step 6: アーカイブを実行する

各アイテムをアーカイブ:

```bash
gh project item-archive <number> \
  --owner <owner> \
  --id <item-id>
```

### Step 7: 結果を報告する

```
## アーカイブ結果

- アーカイブ済み: N 件
- 残りアクティブアイテム: M 件
- ボード上の完了アイテム: 0 件
```

Auto-archive が無効の場合は有効化を推奨:
```
💡 Auto-archive を有効にすると、Done から N 日経過したアイテムが自動でアーカイブされます。
設定: <workflows URL>
```

## 注意事項

- アーカイブ前に必ずユーザーの確認を得る
- アーカイブは元に戻せる（`gh project item-archive --undo`）
- アーカイブされたアイテムはプロジェクトビューから非表示になるが、削除はされない
- Auto-archive ビルトインワークフローとの併用で手動実行の頻度を減らせる
- 特定の条件（日付範囲、ラベル等）でフィルタしてアーカイブすることも可能
- **sandbox 環境での `GIT_SSL_NO_VERIFY=1` 併用**：詳細は後述の「sandbox 環境での実行」節を参照

## sandbox 環境での実行

sandbox で本スキルを実行する場合、ネットワーク越しの GitHub 操作には `GIT_SSL_NO_VERIFY=1` の併用を検討してください。本スキルの主なリモート操作は `gh project item-archive` で、「リモート書き込み」判定は **要（本スキルは主に API 経由）** です。コマンド分類の詳細と TLS 検証無効化の注意事項は [`docs/sandbox-tls.md`](../../docs/sandbox-tls.md) を参照してください。
