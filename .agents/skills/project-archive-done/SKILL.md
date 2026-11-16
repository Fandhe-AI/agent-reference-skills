---
name: project-archive-done
description: Status が Done のプロジェクトアイテムを `gh project item-archive` で一括アーカイブする。Auto-archive ビルトインワークフローの設定状況も確認・案内 (有効なら手動実行は基本不要)。「完了アイテムをアーカイブ」「Done を整理」「ボード掃除」などで使用。
model: haiku
user-invocable: true
---

# project-archive-done

プロジェクト内の完了済み（Done）アイテムをアーカイブし、ボードを整理します。ビルトインの Auto-archive が設定済みの場合はその状況も確認します。

## 前提条件

- 対象の GitHub Project に完了アイテムが存在すること
- `gh` CLI がインストールされ、認証済みであること（`project` スコープ付き）

## フロー

### Step 1: Auto-archive の状況を確認する

ビルトインの Auto-archive ワークフローが有効な場合は自動でアーカイブされる。設定状況をユーザーに確認する。起動時の指示に指定があればそれに従い、足りなければ聞く。非対話で得られなければ書き込まずに報告して止める。

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

一括アーカイブの前に確認し、明示的な返答を待つ。「Done を全部アーカイブして」等、このスキルを起動する依頼そのものは、この確認の承認にならない。起動時の指示にこの確認を省くことの明示（例: 「確認なしで進めてよい」）が含まれている場合に限り、確認を省いて続行してよい。承認が無く対話もできない環境（非対話実行）では、実行せずに対象（件数・タイトル等）と確認事項を報告して止める。

### Step 6: アーカイブを実行する

Step 5 で承認を得たら、アーカイブを実行する。

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
推奨: Auto-archive を有効にすると、Done から N 日経過したアイテムが自動でアーカイブされます。
設定: <workflows URL>
```

## 検証

Step 7 完了後、以下でアーカイブ結果を確認する:

```bash
gh project item-list <number> --owner <owner> --format json --limit 999
```

Status が "Done" のアイテムが一覧から消えていれば完了。アーカイブ済みアイテムは削除されておらず、元に戻せる（`gh project item-archive --undo`）。

## 注意事項

- アーカイブ前にユーザーの確認を得る（Step 5 の確認を参照）
- アーカイブは元に戻せる（`gh project item-archive --undo`）
- アーカイブされたアイテムはプロジェクトビューから非表示になるが、削除はされない
- Auto-archive ビルトインワークフローとの併用で手動実行の頻度を減らせる
- 特定の条件（日付範囲、ラベル等）でフィルタしてアーカイブすることも可能

## sandbox 環境での実行

このスキルはネットワーク越しの GitHub 操作（`gh project item-archive`）を必須とする。該当コマンドはコマンド単位で sandbox 無効にして実行する。ネットワーク遮断を解除できない環境では実行できない。`.git`・`.agents`・`.codex` へ書く手順は無い。`codex exec` では昇格要求が出ないため、ネットワークを使えずコマンドを実行できなかったときは、書き込みをせず、できなかった旨を報告して止める。
