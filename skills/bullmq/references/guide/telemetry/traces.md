# Traces

BullMQ は OpenTelemetry を通じた包括的な分散トレーシングをサポートしています。ジョブのフロー追跡、ボトルネックの特定、分散サービス間のデバッグに活用できます。

## トレースの有効化

```typescript
import { Queue, Worker } from 'bullmq';
import { BullMQOtel } from 'bullmq-otel';

const telemetry = new BullMQOtel({
  tracerName: 'my-app',
  version: '1.0.0',
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
```

## Span Kinds

| Span Kind | Description |
|-----------|-------------|
| `PRODUCER` | キューにジョブを追加する操作 |
| `CONSUMER` | キューからジョブを処理する操作 |
| `INTERNAL` | 一時停止、再開、キュー状態管理などの内部操作 |

## Queue クラスのトレース

| Operation | Span Name | Span Kind | Description |
|-----------|-----------|-----------|-------------|
| `add` | `{queueName}.add` | PRODUCER | 単一ジョブの追加 |
| `addBulk` | `{queueName}.addBulk` | PRODUCER | 複数ジョブの一括追加 |
| `pause` | `{queueName}.pause` | INTERNAL | キューの一時停止 |
| `resume` | `{queueName}.resume` | INTERNAL | キューの再開 |
| `close` | `{queueName}.close` | INTERNAL | キュー接続のクローズ |
| `rateLimit` | `{queueName}.rateLimit` | INTERNAL | レートリミットの設定 |
| `removeRepeatable` | `{queueName}.removeRepeatable` | INTERNAL | リピータブルジョブの削除（オプション指定） |
| `removeRepeatableByKey` | `{queueName}.removeRepeatableByKey` | INTERNAL | リピータブルジョブの削除（キー指定） |
| `removeDebounceKey` | `{queueName}.removeDebounceKey` | INTERNAL | デバウンスキーの削除 |
| `removeDeduplicationKey` | `{queueName}.removeDeduplicationKey` | INTERNAL | 重複排除キーの削除 |
| `remove` | `{queueName}.remove` | INTERNAL | ジョブの削除 |
| `updateJobProgress` | `{queueName}.updateJobProgress` | INTERNAL | ジョブ進捗の更新 |
| `drain` | `{queueName}.drain` | INTERNAL | キューのドレイン |
| `clean` | `{queueName}.clean` | INTERNAL | ジョブのクリーン |
| `obliterate` | `{queueName}.obliterate` | INTERNAL | キュー全データの消去 |
| `retryJobs` | `{queueName}.retryJobs` | PRODUCER | 失敗ジョブのリトライ |
| `promoteJobs` | `{queueName}.promoteJobs` | INTERNAL | 遅延ジョブのプロモート |
| `trimEvents` | `{queueName}.trimEvents` | INTERNAL | イベントのトリミング |

## Worker クラスのトレース

| Operation | Span Name | Span Kind | Description |
|-----------|-----------|-----------|-------------|
| `getNextJob` | `{queueName}.getNextJob` | INTERNAL | 次のジョブの取得 |
| `rateLimit` | `{queueName}.rateLimit` | INTERNAL | Worker レートリミット |
| `processJob` | `{queueName}.{jobName}` | CONSUMER | ジョブの処理（メインスパン） |
| `pause` | `{queueName}.pause` | INTERNAL | Worker の一時停止 |
| `resume` | `{queueName}.resume` | INTERNAL | Worker の再開 |
| `close` | `{queueName}.close` | INTERNAL | Worker のクローズ |
| `startStalledCheckTimer` | `{queueName}.startStalledCheckTimer` | INTERNAL | stalled ジョブチェックタイマーの開始 |
| `moveStalledJobsToWait` | `{queueName}.moveStalledJobsToWait` | INTERNAL | stalled ジョブの waiting 状態への移動 |
| `extendLocks` | `{queueName}.extendLocks` | INTERNAL | アクティブジョブのロック延長 |

## Job クラスのトレース

| Operation | Span Name | Span Kind | Description |
|-----------|-----------|-----------|-------------|
| `moveToCompleted` | `{queueName}.complete` | INTERNAL | ジョブの正常完了 |
| `moveToFailed` | `{queueName}.{state}` | INTERNAL | ジョブの失敗処理（state: fail, delay, retry） |

## JobScheduler クラスのトレース

| Operation | Span Name | Span Kind | Description |
|-----------|-----------|-----------|-------------|
| `add` | `{queueName}.upsertJobScheduler` | PRODUCER | ジョブスケジューラの upsert |

## FlowProducer クラスのトレース

| Operation | Span Name | Span Kind | Description |
|-----------|-----------|-----------|-------------|
| `add` | `{queueName}.addFlow` | PRODUCER | フロー（ジョブツリー）の追加 |
| `addBulk` | `addBulkFlows` | PRODUCER | 複数フローの一括追加 |
| `addNode` | `{queueName}.addNode` | PRODUCER | フロー内ノードの追加（内部） |

## トレース属性

### 共通属性

| Attribute | Key | Description |
|-----------|-----|-------------|
| Queue Name | `bullmq.queue.name` | キュー名 |
| Queue Operation | `bullmq.queue.operation` | 操作の種類 |

### Job 属性

| Attribute | Key | Description |
|-----------|-----|-------------|
| Job Name | `bullmq.job.name` | ジョブ名 |
| Job ID | `bullmq.job.id` | ジョブの一意識別子 |
| Job Key | `bullmq.job.key` | ジョブの Redis キー |
| Job IDs | `bullmq.job.ids` | 複数ジョブ ID（バルク操作） |
| Job Options | `bullmq.job.options` | シリアライズされたジョブオプション |
| Job Progress | `bullmq.job.progress` | 現在のジョブ進捗値 |
| Job Type | `bullmq.job.type` | ジョブの種類/状態 |
| Job Attempts Made | `bullmq.job.attempts.made` | 試行回数 |
| Job Result | `bullmq.job.result` | ジョブが返した結果 |
| Job Failed Reason | `bullmq.job.failed.reason` | 失敗理由 |
| Job Attempt Finished | `bullmq.job.attempt_finished_timestamp` | 処理試行の終了時刻 |
| Job Finished Timestamp | `bullmq.job.finished.timestamp` | 処理試行の終了時刻（非推奨） |
| Job Processed Timestamp | `bullmq.job.processed.timestamp` | ジョブ処理時刻 |
| Deduplication Key | `bullmq.job.deduplication.key` | 重複排除キー |

### バルク操作属性

| Attribute | Key | Description |
|-----------|-----|-------------|
| Bulk Count | `bullmq.job.bulk.count` | バルク操作のジョブ数 |
| Bulk Names | `bullmq.job.bulk.names` | カンマ区切りのジョブ名 |

### Worker 属性

| Attribute | Key | Description |
|-----------|-----|-------------|
| Worker Name | `bullmq.worker.name` | Worker 名 |
| Worker ID | `bullmq.worker.id` | Worker の一意識別子 |
| Worker Options | `bullmq.worker.options` | シリアライズされた Worker オプション |
| Worker Rate Limit | `bullmq.worker.rate.limit` | レートリミット期間 |
| Do Not Wait Active | `bullmq.worker.do.not.wait.active` | アクティブジョブ待機の有無 |
| Force Close | `bullmq.worker.force.close` | 強制クローズの有無 |
| Stalled Jobs | `bullmq.worker.stalled.jobs` | 検出された stalled ジョブ数 |
| Failed Jobs | `bullmq.worker.failed.jobs` | 失敗した stalled ジョブ数 |
| Jobs to Extend Locks | `bullmq.worker.jobs.to.extend.locks` | ロック延長が必要なジョブ |

### キュー操作属性

| Attribute | Key | Description |
|-----------|-----|-------------|
| Drain Delay | `bullmq.queue.drain.delay` | ドレイン遅延の有無 |
| Grace Period | `bullmq.queue.grace` | クリーン操作の猶予期間 |
| Clean Limit | `bullmq.queue.clean.limit` | クリーンする最大ジョブ数 |
| Rate Limit | `bullmq.queue.rate.limit` | レートリミット設定 |
| Queue Options | `bullmq.queue.options` | シリアライズされたキューオプション |
| Event Max Length | `bullmq.queue.event.max.length` | イベントストリームの最大長 |

### Flow 属性

| Attribute | Key | Description |
|-----------|-----|-------------|
| Flow Name | `bullmq.flow.name` | フロー名 |

### Scheduler 属性

| Attribute | Key | Description |
|-----------|-----|-------------|
| Job Scheduler ID | `bullmq.job.scheduler.id` | ジョブスケジューラの ID |

## コンテキスト伝播

BullMQ はジョブの追加・処理時にトレースコンテキストを自動伝播します:

1. **Producer 側**: ジョブ追加時にトレースコンテキストがキャプチャされジョブデータに保存
2. **Consumer 側**: ジョブ処理時にトレースコンテキストが抽出されトレースが継続

### コンテキスト伝播の制御

```typescript
// トレースコンテキストを含める（デフォルト動作）
await queue.add('job', data);

// 明示的にコンテキストを含める
await queue.add('job', data, {
  telemetry: { omitContext: false },
});

// トレースコンテキストを省略（処理時に新しいトレースを開始）
await queue.add('job', data, {
  telemetry: { omitContext: true },
});

// カスタムメタデータを提供
await queue.add('job', data, {
  telemetry: { metadata: customContextData },
});
```

## トレースのエクスポート

```typescript
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { trace } from '@opentelemetry/api';

const traceExporter = new OTLPTraceExporter({
  url: 'http://localhost:4318/v1/traces',
});

const provider = new NodeTracerProvider();
provider.addSpanProcessor(new SimpleSpanProcessor(traceExporter));
provider.register();
```

## トレース可視化の例

```
├─ myQueue.add (PRODUCER)
│  └─ myQueue.myJob (CONSUMER)
│     └─ myQueue.complete (INTERNAL)
```

フローの親子関係:

```
├─ myQueue.addFlow (PRODUCER)
│  ├─ childQueue.addNode (PRODUCER)
│  │  └─ childQueue.childJob (CONSUMER)
│  │     └─ childQueue.complete (INTERNAL)
│  └─ parentQueue.addNode (PRODUCER)
│     └─ parentQueue.parentJob (CONSUMER)
│        └─ parentQueue.complete (INTERNAL)
```

## 注意点

- BullMQ はジョブ追加・処理時にトレースコンテキストを自動的に伝播します
- `telemetry.omitContext: true` で新しいトレースとして処理を開始できます
- トレースエクスポーターは BullMQ インスタンス作成前に設定してください

## 関連

- [./telemetry.md](./telemetry.md) — テレメトリの概要
- [./metrics.md](./metrics.md) — テレメトリメトリクスの収集
- [./getting-started.md](./getting-started.md) — セットアップ手順
- [./running-jaeger.md](./running-jaeger.md) — Jaeger の起動方法
