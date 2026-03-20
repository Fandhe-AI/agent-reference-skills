# メトリクス

## 概要

Supabase はプロジェクトのメトリクスを Prometheus エンドポイントで公開する。Grafana 等の監視ツールと連携して可視化・アラートが可能。

## Prometheus エンドポイント

### アクセス方法

```
https://<project-ref>.supabase.co/customer/v1/privileged/metrics
```

### 認証

Service Role Key をベアラートークンとして使用する。

```bash
curl -H "Authorization: Bearer ${SERVICE_ROLE_KEY}" \
  "https://<project-ref>.supabase.co/customer/v1/privileged/metrics"
```

### 提供されるメトリクス

| カテゴリ | メトリクス | 説明 |
|---------|----------|------|
| CPU | `cpu_usage` | CPU 使用率 |
| メモリ | `ram_usage` | メモリ使用量 |
| ディスク | `disk_usage_bytes` | ディスク使用量 |
| ディスク | `disk_io_*` | ディスク I/O |
| ネットワーク | `network_*` | ネットワークトラフィック |
| データベース | `pg_stat_activity_count` | アクティブ接続数 |
| データベース | `pg_database_size_bytes` | データベースサイズ |
| HTTP | `http_request_duration_*` | リクエストレイテンシ |
| HTTP | `http_requests_total` | リクエスト数 |

## Grafana Cloud 連携

### セットアップ手順

1. **Grafana Cloud アカウント**を作成（無料プランあり）
2. **Prometheus データソース**を追加

```yaml
# Grafana のプロビジョニング設定
apiVersion: 1
datasources:
  - name: Supabase
    type: prometheus
    access: proxy
    url: https://<project-ref>.supabase.co/customer/v1/privileged/metrics
    jsonData:
      httpMethod: GET
      httpHeaderName1: Authorization
    secureJsonData:
      httpHeaderValue1: "Bearer ${SERVICE_ROLE_KEY}"
```

3. **ダッシュボード**を作成またはインポート

### 推奨ダッシュボードパネル

- CPU 使用率（時系列グラフ）
- メモリ使用率（時系列グラフ）
- ディスク使用量（ゲージ）
- アクティブ接続数（時系列グラフ）
- リクエスト数/秒（時系列グラフ）
- レスポンスタイム（ヒストグラム）
- エラー率（時系列グラフ）

## Self-Hosted Grafana 連携

### Prometheus の設定

```yaml
# prometheus.yml
scrape_configs:
  - job_name: 'supabase'
    scheme: https
    metrics_path: /customer/v1/privileged/metrics
    bearer_token: '<service-role-key>'
    static_configs:
      - targets:
          - '<project-ref>.supabase.co'
    scrape_interval: 30s
    scrape_timeout: 10s
```

### Docker Compose での構成

```yaml
prometheus:
  image: prom/prometheus:latest
  volumes:
    - ./prometheus.yml:/etc/prometheus/prometheus.yml
  ports:
    - "9090:9090"

grafana:
  image: grafana/grafana:latest
  ports:
    - "3001:3000"
  environment:
    GF_SECURITY_ADMIN_PASSWORD: admin
  volumes:
    - grafana-data:/var/lib/grafana
```

### Grafana でのデータソース追加

1. Grafana にログイン
2. **Configuration → Data Sources → Add data source**
3. **Prometheus** を選択
4. URL に `http://prometheus:9090` を入力
5. **Save & Test**

## ベンダー非依存メトリクス

### OpenTelemetry

Supabase のメトリクスは OpenTelemetry 形式でもエクスポート可能。

### 対応する監視サービス

- **Datadog**: Prometheus インテグレーション経由
- **New Relic**: Prometheus Remote Write 経由
- **AWS CloudWatch**: Prometheus エクスポーター経由
- **PagerDuty**: Grafana アラート連携

## アラート設定

### Grafana でのアラート

```yaml
# アラートルールの例
groups:
  - name: supabase-alerts
    rules:
      - alert: HighCPUUsage
        expr: cpu_usage > 80
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "CPU usage is above 80%"

      - alert: HighMemoryUsage
        expr: ram_usage > 85
        for: 5m
        labels:
          severity: warning

      - alert: DiskSpaceLow
        expr: disk_usage_bytes / disk_total_bytes > 0.9
        for: 10m
        labels:
          severity: critical

      - alert: HighConnectionCount
        expr: pg_stat_activity_count > 100
        for: 5m
        labels:
          severity: warning
```

### 通知チャネル

- メール
- Slack
- PagerDuty
- Webhook

## ベストプラクティス

- メトリクスのスクレイプ間隔は 30 秒〜1 分に設定する
- 重要なメトリクスにアラートを設定する
- ベースラインを確立して異常検知に活用する
- ダッシュボードはチーム全員がアクセスできるようにする
- メトリクスの保持期間を適切に設定する（Prometheus のデフォルトは 15 日間）

## 関連

- [ログ](./logs.md) — ログ確認・フィルタリング
- [パフォーマンス](../platform/performance.md) — パフォーマンス最適化
