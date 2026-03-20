# レポート

## 概要

Supabase ダッシュボードでは、プロジェクトのパフォーマンス、使用量、ヘルスに関する各種レポートを確認できる。

## ダッシュボードレポート

### アクセス方法

ダッシュボードの **Reports** セクションから各種レポートにアクセスできる。

### API レポート

API リクエストに関するレポート。

- **リクエスト数**: 時間帯ごとのリクエスト数のトレンド
- **レスポンスタイム**: 平均、p95、p99 のレスポンスタイム
- **ステータスコード分布**: 2xx, 3xx, 4xx, 5xx の割合
- **人気エンドポイント**: リクエスト数が多いエンドポイントのランキング
- **エラー率**: 時間帯ごとのエラー率のトレンド

### Database レポート

データベースのパフォーマンスとヘルスに関するレポート。

- **アクティブ接続数**: 時間帯ごとの接続数推移
- **データベースサイズ**: テーブルごとのサイズ
- **キャッシュヒット率**: バッファキャッシュのヒット率
- **スロークエリ**: 実行時間が長いクエリの一覧
- **インデックス使用率**: インデックスの利用状況

```sql
-- キャッシュヒット率の確認
SELECT
  sum(heap_blks_read) AS heap_read,
  sum(heap_blks_hit) AS heap_hit,
  sum(heap_blks_hit) / (sum(heap_blks_hit) + sum(heap_blks_read))::float AS ratio
FROM pg_statio_user_tables;

-- テーブルサイズの確認
SELECT
  schemaname,
  relname AS table_name,
  pg_size_pretty(pg_total_relation_size(relid)) AS total_size
FROM pg_catalog.pg_statio_user_tables
ORDER BY pg_total_relation_size(relid) DESC;
```

### Auth レポート

認証に関するレポート。

- **MAU（月間アクティブユーザー）**: ユニークユーザー数の推移
- **サインアップ数**: 新規登録数のトレンド
- **ログイン方法**: Email, OAuth, Phone 等の利用割合
- **認証エラー**: エラー数とエラー種別

### Storage レポート

ストレージに関するレポート。

- **ストレージ使用量**: 合計サイズと推移
- **バケットごとの使用量**: 各バケットのサイズ
- **帯域幅**: アップロード/ダウンロードの帯域幅
- **リクエスト数**: ストレージ操作のリクエスト数

### Edge Functions レポート

Edge Functions に関するレポート。

- **呼び出し数**: 関数ごとの呼び出し数
- **実行時間**: 平均実行時間と分布
- **エラー率**: 関数ごとのエラー率
- **リソース使用量**: CPU / メモリ使用量

## 使用量レポート

### アクセス方法

**Organization Settings → Billing → Usage** から確認。

### 確認できる項目

| 項目 | 説明 |
|------|------|
| Database Size | データベースのディスク使用量 |
| Bandwidth | データ転送量 |
| Storage | ファイルストレージ使用量 |
| Auth MAU | 月間アクティブユーザー数 |
| Edge Function Invocations | Edge Functions の呼び出し回数 |
| Edge Function Execution Time | Edge Functions の合計実行時間 |
| Realtime Concurrent Connections | リアルタイム同時接続のピーク |
| Realtime Messages | リアルタイムメッセージ数 |

### 使用量アラート

使用量が設定した閾値に達した際にメール通知を受け取れる。

1. **Organization Settings → Billing → Usage Alerts** に移動
2. 閾値を設定
3. 通知先メールアドレスを確認

## パフォーマンスレポート

### Database Performance

ダッシュボードの **Database → Performance** で確認。

- **クエリパフォーマンス**: pg_stat_statements に基づくクエリ統計
  - 最も実行回数が多いクエリ
  - 最も時間がかかるクエリ
  - 最もデータを返すクエリ

- **テーブル統計**: pg_stat_user_tables に基づく統計
  - シーケンシャルスキャン数
  - インデックススキャン数
  - 挿入/更新/削除の件数

- **インデックス統計**: pg_stat_user_indexes に基づく統計
  - インデックスのスキャン回数
  - 未使用のインデックス

```sql
-- 最もコストの高いクエリ TOP 10
SELECT
  query,
  calls,
  round(total_exec_time::numeric, 2) AS total_time_ms,
  round(mean_exec_time::numeric, 2) AS mean_time_ms,
  rows
FROM pg_stat_statements
ORDER BY total_exec_time DESC
LIMIT 10;
```

### リソース使用量

- **CPU 使用率**: 時間帯ごとの CPU 使用率
- **メモリ使用率**: 時間帯ごとのメモリ使用率
- **ディスク I/O**: 読み取り/書き込みの IOPS
- **ネットワーク**: 受信/送信のトラフィック

## レポートのエクスポート

- ダッシュボードのレポートは CSV としてエクスポート可能な場合がある
- SQL ベースのレポートは `psql` の `\copy` コマンドでエクスポート
- API 経由でメトリクスを取得して独自のレポートを作成可能

## ベストプラクティス

- 週次でパフォーマンスレポートを確認する
- 使用量レポートでコストを管理する
- スロークエリを定期的に確認して最適化する
- キャッシュヒット率が 99% 以上を維持する（低い場合はコンピュートサイズの増加を検討）
- 未使用のインデックスを削除してストレージと書き込みパフォーマンスを改善する

## 関連

- [ログ](./logs.md) — ログ確認・フィルタリング
- [メトリクス](./metrics.md) — メトリクス監視
- [パフォーマンス](../platform/performance.md) — パフォーマンス最適化
