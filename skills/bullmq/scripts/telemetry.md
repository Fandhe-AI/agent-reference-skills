# telemetry

OpenTelemetry と Jaeger を使った BullMQ のトレース・メトリクス観測コマンド。

## Jaeger の起動（Docker Compose）

`docker-compose.yaml` を以下の内容で作成してから実行する:

```yaml
services:
  jaeger:
    image: jaegertracing/all-in-one:latest
    container_name: BullMQ_with_opentelemetry_jaeger
    ports:
      - '4318:4318'
      - '16686:16686'
```

```sh
docker-compose up
```

起動後、`http://localhost:16686` で Jaeger UI にアクセスできる。

## Producer の実行（tsx）

```sh
tsx --import producer.inst.otlp.ts producer.ts
```

## Consumer の実行（tsx）

```sh
tsx --import consumer.inst.otlp.ts consumer.ts
```

## Producer の実行（Node.js / JavaScript）

```sh
node --import producer.inst.otlp.js producer.js
```

## Consumer の実行（Node.js / JavaScript）

```sh
node --import consumer.inst.otlp.js consumer.js
```

## Prometheus メトリクスエンドポイントの確認

```sh
curl http://localhost:3000/metrics
```

メトリクスサーバーが起動している場合、プレーンテキスト形式でメトリクスが返る。
