# Ops

運用・監視・キャッシュ・プロジェクト管理

## アクティビティログの確認

```sh
vercel activity
```

全アクティビティを過去 30 日分表示。

```sh
vercel activity ls --all --since 30d
```

デプロイメント種別のアクティビティを過去 7 日分表示。

```sh
vercel activity ls --type deployment --since 7d
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

```sh
vercel usage
```

期間を指定して確認。

```sh
vercel usage --from 2025-01-01 --to 2025-01-31
```

日別内訳で表示。

```sh
vercel usage --breakdown daily
```

## ファイアウォールの管理

ファイアウォール設定の概要確認。

```sh
vercel firewall overview
```

ファイアウォールルールの公開。

```sh
vercel firewall publish
```

IP ブロックの追加。

```sh
vercel firewall ip-blocks block <ip>
```

カスタムルールの一覧表示。

```sh
vercel firewall rules list
```

攻撃モードの有効化。

> **警告**: 攻撃モードを有効にすると、疑わしいトラフィックが積極的にブロックされる。正常なリクエストに影響が出る可能性がある。

```sh
vercel firewall attack-mode enable
```

## Git 接続の管理

Git プロバイダー接続の一覧。

```sh
vercel git ls
```

Git プロバイダーに接続。

```sh
vercel git connect
```

Git プロバイダーの切断。

```sh
vercel git disconnect [provider]
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
vercel webhooks get <id>
```

Webhook の削除。

> **警告**: Webhook を削除するとそのエンドポイントへのイベント配信が停止される。

```sh
vercel webhooks rm <id>
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
