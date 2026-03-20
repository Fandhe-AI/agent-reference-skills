# Getting Started

BullMQ のテレメトリをセットアップするためのガイドです。OpenTelemetry と Jaeger を使用してローカルでテレメトリを収集・可視化する方法を説明します。

## bullmq-otel パッケージのインストール

```bash
npm add --save bullmq-otel
```

`bullmq-otel` は BullMQ のテレメトリインターフェースの OpenTelemetry 実装を提供します。

## Queue への適用

```typescript
import { Queue } from 'bullmq';
import { BullMQOtel } from 'bullmq-otel';

const queue = new Queue('myQueue', {
  connection: {
    host: '127.0.0.1',
    port: 6379,
  },
  telemetry: new BullMQOtel('simple-guide'),
});
```

## Worker への適用

```typescript
import { Worker } from 'bullmq';
import { BullMQOtel } from 'bullmq-otel';

const worker = new Worker(
  'myQueue',
  async (job) => {
    return 'some value';
  },
  {
    name: 'myWorker',
    connection: {
      host: '127.0.0.1',
      port: 6379,
    },
    telemetry: new BullMQOtel('simple-guide'),
  }
);
```

## セットアップ手順まとめ

| Step | Description |
|------|-------------|
| 1 | `bullmq-otel` パッケージをインストール |
| 2 | `BullMQOtel` インスタンスを作成 |
| 3 | Queue と Worker の `telemetry` オプションに渡す |

これだけでトレースとスパンの生成が開始されます。

## 注意点

- Queue と Worker の両方に同じ `BullMQOtel` インスタンスまたは同じ設定を適用してください
- テレメトリの可視化には Jaeger などの OpenTelemetry 互換 UI が必要です
- 本番環境では OTLP エクスポーターの設定が別途必要です

## 関連

- [./telemetry.md](./telemetry.md) — テレメトリの概要
- [./traces.md](./traces.md) — 分散トレースの詳細
- [./metrics.md](./metrics.md) — メトリクスの収集
- [./running-jaeger.md](./running-jaeger.md) — Jaeger の起動方法
- [./running-a-simple-example.md](./running-a-simple-example.md) — サンプル実装
