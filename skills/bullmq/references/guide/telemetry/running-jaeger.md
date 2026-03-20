# Running Jaeger

Jaeger を Docker Compose で起動し、BullMQ のテレメトリデータを可視化する手順です。トレースのエクスポート先（ポート4318）と UI（ポート16686）の2つのポートを公開します。

## Docker Compose 設定

```yaml
services:
  jaeger:
    image: jaegertracing/all-in-one:latest
    container_name: BullMQ_with_opentelemetry_jaeger
    ports:
      - '4318:4318'
      - '16686:16686'
```

| Port | Description |
|------|-------------|
| 4318 | OTLP トレースエクスポートエンドポイント |
| 16686 | Jaeger UI |

## 起動

```bash
docker-compose up
```

数秒でイメージが起動します。ブラウザで `http://localhost:16686` にアクセスして UI を確認できます。

## 注意点

- Docker がインストールされている必要があります
- 初回起動時はまだトレースがないため、空のダッシュボードが表示されます
- Producer と Consumer のサービスを起動すると、Jaeger UI でトレースが表示されるようになります

## 関連

- [./telemetry.md](./telemetry.md) — テレメトリの概要
- [./getting-started.md](./getting-started.md) — セットアップ手順
- [./running-a-simple-example.md](./running-a-simple-example.md) — サンプル実装
- [./traces.md](./traces.md) — 分散トレースの詳細
