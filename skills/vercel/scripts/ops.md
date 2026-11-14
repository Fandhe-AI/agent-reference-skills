# Ops

運用・監視・キャッシュ・プロジェクト管理

## アクティビティログの確認

```sh
vercel activity
```

全アクティビティを過去 30 日分表示。

```sh
vercel activity --all --since 30d
```

デプロイメント種別のアクティビティを過去 7 日分表示。

```sh
vercel activity --type deployment --since 7d
```

## アラートの確認

```sh
vercel alerts
```

全アラートを表示。

```sh
vercel alerts --all
```

特定プロジェクトのアラートを表示。

```sh
vercel alerts --project [project-name]
```

## キャッシュの管理

CDN キャッシュと Data キャッシュをすべてパージ。

> **警告**: キャッシュパージはグローバルに即時反映される。大量トラフィック時はオリジンへの負荷が増加する。

```sh
vercel cache purge
```

CDN キャッシュのみパージ。

```sh
vercel cache purge --type cdn
```

Data キャッシュのみパージ。

```sh
vercel cache purge --type data
```

タグ指定でキャッシュを無効化。

```sh
vercel cache invalidate --tag foo
```

タグ指定でキャッシュを強制削除。

> **警告**: `dangerously-delete` は取り消しできない破壊的操作。

```sh
vercel cache dangerously-delete --tag foo
```

## 使用量・コストの確認

`vercel billing usage`（Vercel CLI 65.11.0 以降。旧名 `vercel usage` は動作するが非推奨警告が出る）。詳細は [billing.md](./billing.md)。

```sh
vercel billing usage
```

期間を指定して確認（`--since` は `YYYY-MM-DD`・ISO 8601・相対期間（例: `7d`）、`--until` の指定には `--since` が必要）。

```sh
vercel billing usage --since 2025-01-01 --until 2025-01-31
```

過去 7 日間を確認。

```sh
vercel billing usage --since 7d
```

日別内訳で表示（`daily` / `weekly` / `monthly`）。

```sh
vercel billing usage --breakdown daily
```

プロジェクトまたはリージョン別に集計（`project` / `region`。`--breakdown` とは併用不可）。

```sh
vercel billing usage --group-by project
```

JSON 形式で出力（旧 `--format json` は非推奨）。

```sh
vercel billing usage --json
```

`--from` / `--to` は引き続き動作するが非推奨警告が出る。新規には `--since` / `--until` を使う。

## ファイアウォールの管理

ファイアウォール設定の概要確認。

```sh
vercel firewall overview
```

下書きのファイアウォール変更を本番へ公開。ターミナルでは確認プロンプトが出る。スクリプトではプロジェクト名を `--confirm-name` に渡す（名前が一致しなければ何も公開されない）。

```sh
vercel firewall publish
```

```sh
vercel firewall publish --confirm-name my-app
```

IP ブロックの追加（下書きとして保存され、`vercel firewall publish` で公開するまで反映されない）。

```sh
vercel firewall ip-blocks block <ip>
```

カスタムルールの一覧表示。

```sh
vercel firewall rules list
```

攻撃モードの有効化（公開操作なしで即時反映。`--duration` は `1h`（デフォルト）/ `6h` / `24h`）。

> **警告**: 攻撃モードを有効にすると、訪問者にセキュリティチャレンジが課される（既知の正規ボットは通過）。正常なリクエストに影響が出る可能性がある。

```sh
vercel firewall attack-mode enable --duration 24h --yes
```

## Git 接続の管理

Git プロバイダーに接続。

```sh
vercel git connect
```

Git プロバイダーの切断。

```sh
vercel git disconnect
```

## デプロイメントの二分探索（障害調査）

```sh
vercel bisect
```

正常・異常なデプロイメントを指定して二分探索。

```sh
vercel bisect --good [deployment-url] --bad [deployment-url]
```

## Webhook の管理

Webhook 一覧の表示。

```sh
vercel webhooks list
```

Webhook の作成。

```sh
vercel webhooks create <url> --event <event>
```

Webhook の詳細確認。

```sh
vercel webhooks inspect <id>
```

Webhook の削除（確認プロンプトを省略するには `--yes`）。

> **警告**: Webhook を削除するとそのエンドポイントへのイベント配信が停止される。

```sh
vercel webhooks delete <id>
```

## テレメトリの管理

テレメトリ収集の状態確認。

```sh
vercel telemetry status
```

テレメトリを有効化。

```sh
vercel telemetry enable
```

テレメトリを無効化。

```sh
vercel telemetry disable
```
