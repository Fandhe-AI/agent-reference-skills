# Running a Simple Example

BullMQ テレメトリの完全なサンプル実装です。Producer と Consumer を作成し、OpenTelemetry SDK を使用して Jaeger にトレースをエクスポートします。ジョブの失敗・リトライの流れもトレースで可視化できます。

## Producer の作成

バルクでジョブを追加する Producer です。スパンのリンクを確認するために `addBulk` を使用します:

```typescript
// producer.ts
import { Queue } from 'bullmq';
import { BullMQOtel } from 'bullmq-otel';

const queue = new Queue('myQueue', {
  connection: {
    host: '127.0.0.1',
    port: 6379,
  },
  telemetry: new BullMQOtel('simple-guide'),
});

const jobsBulk = Array.from({ length: 5 }, (_, i) => i);

(async () => {
  for (let i = 0; i < 10; i++) {
    await queue.addBulk(
      jobsBulk.map((j) => ({
        name: `myJob ${j}`,
        data: { i: j },
        opts: { attempts: 2, backoff: 1000 },
      }))
    );
  }
})();
```

## Consumer の作成

concurrency 10 で並行処理し、初回は意図的に失敗させてリトライのスパンを生成します:

```typescript
// consumer.ts
import { Worker } from 'bullmq';
import { BullMQOtel } from 'bullmq-otel';

(async () => {
  const worker = new Worker(
    'myQueue',
    async (job) => {
      console.log('processing job', job.id, job.attemptsMade);
      await new Promise(async (res) => {
        setTimeout(() => res({}), 200);
      });

      if (job.attemptsMade < 1) {
        throw new Error('This was an error');
      }

      return 'my result value';
    },
    {
      name: 'myWorker',
      connection: {
        host: '127.0.0.1',
        port: 6379,
      },
      telemetry: new BullMQOtel('simple-guide'),
      concurrency: 10,
    }
  );
})();
```

## インストルメンテーションファイルの作成

OpenTelemetry SDK の OTLP エクスポーターをセットアップします:

```bash
npm install @opentelemetry/exporter-trace-otlp-proto \
  @opentelemetry/exporter-metrics-otlp-proto
```

### Producer 用インストルメンテーション

```typescript
// producer.inst.otlp.ts
import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-proto';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';

const sdk = new NodeSDK({
  serviceName: 'producer',
  traceExporter: new OTLPTraceExporter({
    url: 'http://127.0.0.1:4318/v1/traces'
  }),
  metricReader: new PeriodicExportingMetricReader({
    exporter: new OTLPMetricExporter({
      url: 'http://127.0.0.1:4318/v1/metrics'
    }),
  }),
});

sdk.start();
```

### Consumer 用インストルメンテーション

```typescript
// consumer.inst.otlp.ts
import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-proto';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';

const sdk = new NodeSDK({
  serviceName: 'consumer',
  traceExporter: new OTLPTraceExporter({
    url: 'http://127.0.0.1:4318/v1/traces'
  }),
  metricReader: new PeriodicExportingMetricReader({
    exporter: new OTLPMetricExporter({
      url: 'http://127.0.0.1:4318/v1/metrics'
    }),
  }),
});

sdk.start();
```

両サービスの設定はほぼ同一で、`serviceName` のみ異なります。

## サービスの起動

OpenTelemetry インストルメンテーションを先に実行するため `--import` フラグを使用します:

```bash
tsx --import producer.inst.otlp.ts producer.ts
tsx --import consumer.inst.otlp.ts consumer.ts
```

Node.js ランタイムの場合:

```bash
node --import producer.inst.otlp.js producer.js
node --import consumer.inst.otlp.js consumer.js
```

## Jaeger での確認

サービス起動後、Jaeger UI (`http://localhost:16686`) で以下を確認できます:

| 確認項目 | 説明 |
|----------|------|
| サービス一覧 | producer と consumer の2つのサービスが表示される |
| Producer トレース | addBulk スパンがルートとなり、Consumer スパンがリンクされる |
| 並行処理 | concurrency 設定により複数のジョブが同時に処理されるスパンが確認できる |
| 失敗とリトライ | delay スパンの後に再度 process スパンが生成される |
| スパン詳細 | ジョブのタグ（属性）とイベントログ（失敗メッセージ等）が確認できる |

## トレースの構造

Producer の `addBulk` スパンがルートとなり、5つのジョブが追加されます。Consumer 側では concurrency が5以上なので全ジョブが同時に処理されます。初回失敗後、backoff delay を経てリトライされ、最終的に完了します:

```
├─ myQueue.addBulk (PRODUCER)
│  ├─ myQueue.myJob 0 (CONSUMER) - fail → delay → process → complete
│  ├─ myQueue.myJob 1 (CONSUMER) - fail → delay → process → complete
│  ├─ myQueue.myJob 2 (CONSUMER) - fail → delay → process → complete
│  ├─ myQueue.myJob 3 (CONSUMER) - fail → delay → process → complete
│  └─ myQueue.myJob 4 (CONSUMER) - fail → delay → process → complete
```

## 注意点

- OpenTelemetry インストルメンテーションは必ずアプリケーションコードより先にロードしてください（`--import` フラグを使用）
- Jaeger が起動している必要があります（ポート4318で待ち受け）
- tsx または Node.js ランタイムどちらでも使用できます

## 関連

- [./running-jaeger.md](./running-jaeger.md) — Jaeger の起動方法
- [./getting-started.md](./getting-started.md) — セットアップ手順
- [./traces.md](./traces.md) — 分散トレースの詳細
- [./metrics.md](./metrics.md) — テレメトリメトリクスの収集
