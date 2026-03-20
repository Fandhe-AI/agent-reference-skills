# Metrics (Telemetry)

BullMQ は OpenTelemetry を通じたメトリクス収集もサポートしています。ジョブの完了/失敗カウントや処理時間などの定量データを収集し、オブザーバビリティバックエンドにエクスポートできます。

## メトリクスの有効化

```typescript
import { Queue } from 'bullmq';
import { BullMQOtel } from 'bullmq-otel';

const telemetry = new BullMQOtel({
  tracerName: 'my-app',
  meterName: 'my-app',
  version: '1.0.0',
  enableMetrics: true,
});

const queue = new Queue('myQueue', {
  connection: { host: '127.0.0.1', port: 6379 },
  telemetry,
});
```

```typescript
import { Worker } from 'bullmq';
import { BullMQOtel } from 'bullmq-otel';

const telemetry = new BullMQOtel({
  tracerName: 'my-app',
  meterName: 'my-app',
  version: '1.0.0',
  enableMetrics: true,
});

const worker = new Worker(
  'myQueue',
  async job => {
    return 'some value';
  },
  {
    connection: { host: '127.0.0.1', port: 6379 },
    telemetry,
  },
);
```

## カウンター

| Metric Name | Description |
|-------------|-------------|
| `bullmq.jobs.completed` | 正常に完了したジョブ数 |
| `bullmq.jobs.failed` | 全リトライ後に失敗したジョブ数 |
| `bullmq.jobs.delayed` | delayed 状態に移行したジョブ数（リトライ遅延含む） |
| `bullmq.jobs.retried` | 即座にリトライされたジョブ数 |
| `bullmq.jobs.waiting` | waiting 状態に戻されたジョブ数 |
| `bullmq.jobs.waiting_children` | waiting-children 状態に移行したジョブ数 |

## ヒストグラム

| Metric Name | Description | Unit |
|-------------|-------------|------|
| `bullmq.job.duration` | ジョブの処理時間 | milliseconds |

## ゲージ

| Metric Name | Description | Unit |
|-------------|-------------|------|
| `bullmq.queue.jobs` | 状態別のキュー内ジョブ数 | `{jobs}` |

ゲージは `recordJobCountsMetric()` 呼び出し時に記録されます。`bullmq.queue.jobs.state` 属性で状態（waiting, active, completed, failed, delayed, prioritized, paused, waiting-children）を識別します。

## メトリクス属性

### 共通属性（全メトリクス）

| Attribute | Description |
|-----------|-------------|
| `bullmq.queue.name` | キュー名 |

### Job メトリクス属性（カウンター・ヒストグラム）

| Attribute | Description |
|-----------|-------------|
| `bullmq.job.name` | ジョブ名 |
| `bullmq.job.status` | ジョブの状態 |

### ゲージ属性（`bullmq.queue.jobs` のみ）

| Attribute | Description |
|-----------|-------------|
| `bullmq.queue.jobs.state` | ジョブ状態（waiting, active, completed, failed 等） |

## BullMQOtel 設定オプション

```typescript
interface BullMQOtelOptions {
  tracerName?: string;    // トレーサー名（デフォルト: 'bullmq'）
  meterName?: string;     // メーター名（デフォルト: 'bullmq'）
  version?: string;       // バージョン文字列
  enableMetrics?: boolean; // メトリクス収集の有効化（デフォルト: false）
}
```

## カスタムメトリクスオプション

Worker や Queue に渡す前に、カスタムオプションでメトリクスを事前設定できます:

```typescript
import { BullMQOtel } from 'bullmq-otel';
import { Queue, Worker } from 'bullmq';

const telemetry = new BullMQOtel({
  tracerName: 'my-app',
  meterName: 'my-app',
  version: '1.0.0',
  enableMetrics: true,
});

// カスタムオプションでカウンターを事前設定
telemetry.meter.createCounter('bullmq.jobs.completed', {
  description: 'Custom description for completed jobs',
  unit: '1',
});

// カスタムオプションでヒストグラムを事前設定
telemetry.meter.createHistogram('bullmq.job.duration', {
  description: 'Custom job processing duration',
  unit: 's',
});

// カスタムオプションでゲージを事前設定
telemetry.meter.createGauge('bullmq.queue.jobs', {
  description: 'Current number of jobs in the queue by state',
  unit: '{jobs}',
});

const queue = new Queue('myQueue', {
  connection: { host: '127.0.0.1', port: 6379 },
  telemetry,
});

const worker = new Worker(
  'myQueue',
  async job => {
    return 'some value';
  },
  {
    connection: { host: '127.0.0.1', port: 6379 },
    telemetry,
  },
);

// ゲージメトリクスを記録
const jobCounts = await queue.recordJobCountsMetric();
```

`BullMQOTelMeter` は名前でメトリクスをキャッシュし、BullMQ が同名で内部的に作成する場合はキャッシュ済みインスタンスが返されます。

## 後方互換性

```typescript
// 旧スタイル（トレースのみ）
const telemetry = new BullMQOtel('my-app', '1.0.0');

// 新スタイル（トレース + メトリクス）
const telemetry = new BullMQOtel({
  tracerName: 'my-app',
  version: '1.0.0',
  enableMetrics: true,
});
```

## メトリクスのエクスポート

```typescript
import {
  MeterProvider,
  PeriodicExportingMetricReader,
} from '@opentelemetry/sdk-metrics';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
import { metrics } from '@opentelemetry/api';

const metricExporter = new OTLPMetricExporter({
  url: 'http://localhost:4318/v1/metrics',
});

const meterProvider = new MeterProvider({
  readers: [
    new PeriodicExportingMetricReader({
      exporter: metricExporter,
      exportIntervalMillis: 10000,
    }),
  ],
});

metrics.setGlobalMeterProvider(meterProvider);

const telemetry = new BullMQOtel({
  tracerName: 'my-app',
  enableMetrics: true,
});
```

## 注意点

- メトリクス収集は `enableMetrics: true` で明示的に有効にする必要があります（デフォルト: false）
- MeterProvider は BullMQ インスタンス作成前にセットアップしてください
- カスタムメトリクスオプションを使用すると、BullMQ のデフォルトオプションは無視されます

## 関連

- [./telemetry.md](./telemetry.md) — テレメトリの概要
- [./traces.md](./traces.md) — 分散トレースの実装
- [./getting-started.md](./getting-started.md) — セットアップ手順
- [../metrics/metrics.md](../metrics/metrics.md) — BullMQ 組み込みメトリクス
