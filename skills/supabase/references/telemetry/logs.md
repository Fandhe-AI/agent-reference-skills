# ログ確認

## 概要

Supabase はプロジェクトの各サービスのログをダッシュボードで確認できる。ログは BigQuery ベースの Logflare に保存される。

## ログの種類

### API ログ

Kong API ゲートウェイのリクエストログ。

- リクエスト URL、メソッド、ステータスコード
- レスポンスタイム
- リクエスト元 IP
- User-Agent

### Auth ログ

GoTrue（認証サーバー）のログ。

- サインアップ / サインイン イベント
- パスワードリセット
- OAuth ログイン
- MFA イベント
- エラー（無効な認証情報等）

### Database ログ

PostgreSQL のログ。

- スロークエリ
- エラー（構文エラー、制約違反等）
- 接続 / 切断
- DDL 文（CREATE, ALTER 等）

### Storage ログ

ストレージサービスのログ。

- ファイルアップロード / ダウンロード
- バケット操作
- アクセス拒否

### Edge Function ログ

Edge Functions の実行ログ。

- console.log() の出力
- エラーとスタックトレース
- 実行時間
- メモリ使用量

## ダッシュボードでのフィルタリング

### ログエクスプローラー

ダッシュボードの **Logs → Logs Explorer** で各サービスのログを確認できる。

### フィルタリングオプション

- **時間範囲**: 過去1時間、24時間、7日間、カスタム範囲
- **サービス**: API, Auth, Database, Storage, Edge Functions
- **重要度**: INFO, WARN, ERROR
- **テキスト検索**: ログメッセージのフリーテキスト検索

### プリセットクエリ

ダッシュボードには以下のプリセットクエリが用意されている:

- 最近のエラー
- スロークエリ
- 認証エラー
- 5xx レスポンス
- リクエスト数のトレンド

## SQL ベースの高度なフィルタリング

ログエクスプローラーでは SQL を使用して高度なクエリが可能。

### API ログのクエリ

```sql
-- 5xx エラーの一覧
SELECT
  timestamp,
  event_message,
  metadata ->> 'method' AS method,
  metadata ->> 'path' AS path,
  metadata ->> 'status' AS status
FROM edge_logs
WHERE metadata ->> 'status' LIKE '5%'
ORDER BY timestamp DESC
LIMIT 100;

-- パスごとのリクエスト数
SELECT
  metadata ->> 'path' AS path,
  count(*) AS request_count,
  avg((metadata ->> 'response_time')::float) AS avg_response_time
FROM edge_logs
WHERE timestamp > now() - interval '1 hour'
GROUP BY path
ORDER BY request_count DESC
LIMIT 20;

-- レスポンスタイムが遅いリクエスト
SELECT
  timestamp,
  metadata ->> 'method' AS method,
  metadata ->> 'path' AS path,
  metadata ->> 'response_time' AS response_time_ms
FROM edge_logs
WHERE (metadata ->> 'response_time')::float > 1000
ORDER BY (metadata ->> 'response_time')::float DESC
LIMIT 50;
```

### Auth ログのクエリ

```sql
-- 認証エラーの一覧
SELECT
  timestamp,
  event_message,
  metadata
FROM auth_logs
WHERE event_message LIKE '%error%'
  OR event_message LIKE '%failed%'
ORDER BY timestamp DESC
LIMIT 100;

-- サインアップの統計
SELECT
  date_trunc('hour', timestamp) AS hour,
  count(*) AS signups
FROM auth_logs
WHERE event_message LIKE '%signup%'
  AND timestamp > now() - interval '24 hours'
GROUP BY hour
ORDER BY hour;
```

### Database ログのクエリ

```sql
-- スロークエリの一覧
SELECT
  timestamp,
  event_message
FROM postgres_logs
WHERE event_message LIKE '%duration%'
  AND (regexp_match(event_message, 'duration: ([0-9.]+)'))[1]::float > 1000
ORDER BY timestamp DESC
LIMIT 50;

-- エラーログ
SELECT
  timestamp,
  event_message
FROM postgres_logs
WHERE event_message LIKE '%ERROR%'
ORDER BY timestamp DESC
LIMIT 100;
```

### Edge Function ログのクエリ

```sql
-- 関数ごとのエラー数
SELECT
  metadata ->> 'function_id' AS function_name,
  count(*) AS error_count
FROM function_logs
WHERE metadata ->> 'level' = 'error'
  AND timestamp > now() - interval '24 hours'
GROUP BY function_name
ORDER BY error_count DESC;

-- 特定の関数のログ
SELECT
  timestamp,
  event_message,
  metadata ->> 'level' AS level
FROM function_logs
WHERE metadata ->> 'function_id' = 'hello-world'
ORDER BY timestamp DESC
LIMIT 100;
```

## ログの保持期間

| プラン | 保持期間 |
|--------|---------|
| Free | 1日 |
| Pro | 7日 |
| Team | 28日 |
| Enterprise | カスタム |

## ベストプラクティス

- 定期的にエラーログを確認する
- スロークエリを特定して最適化する
- 認証エラーを監視してセキュリティインシデントを検知する
- ログドレインを設定して長期保存する（保持期間を超えるログが必要な場合）
- アラートを設定して異常を早期検知する

## 関連

- [ログドレイン](./log-drains.md) — 外部サービスへのログ転送
- [メトリクス](./metrics.md) — Prometheus / Grafana 連携
- [Edge Functions デバッグ](../functions/debugging.md) — 関数ログ
