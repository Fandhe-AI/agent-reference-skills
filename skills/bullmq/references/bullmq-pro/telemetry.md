# BullMQ Pro Telemetry

BullMQ Pro は OpenTelemetry を活用したテレメトリ機能をサポートする。オープンソース版と同じ統合方式で、Pro 固有の機能（Groups、Batches）の監視も可能。

## Queue の設定

`QueuePro` にテレメトリプロバイダーを設定する:

```typescript
import { QueuePro } from '@taskforcesh/bullmq-pro';
import { BullMQOtel } from 'bullmq-otel';

const queue = new QueuePro('myProQueue', {
  connection,
  telemetry: new BullMQOtel('guide'),
});
```

## ジョブの追加（グループ付き）

テレメトリが有効な Queue にグループ付きジョブを追加する:

```typescript
await queue.add(
  'myJob',
  { data: 'myData' },
  {
    attempts: 2,
    backoff: 1000,
    group: {
      id: 'myGroupId',
    },
  },
);
```

## Worker の設定

Worker にもテレメトリインスタンスを渡す:

```typescript
import { WorkerPro } from '@taskforcesh/bullmq-pro';
import { BullMQOtel } from 'bullmq-otel';

const worker = new WorkerPro(
  'myProQueue',
  async (job) => {
    console.log('processing job', job.id);
  },
  {
    name: 'myWorker',
    connection,
    telemetry: new BullMQOtel('guide'),
    concurrency: 10,
    batch: { size: 10 },
  },
);
```

## 注意点

- `bullmq-otel` パッケージを別途インストールする必要がある
- テレメトリは Queue と Worker の両方に設定することを推奨
- Pro 固有機能（Groups、Batches）のスパンも自動的に収集される
- OpenTelemetry の詳細な統合方法については公式ブログの包括的なチュートリアルを参照

## 関連

- [./install.md](./install.md) - インストール方法
- [./batches.md](./batches.md) - バッチ処理
- [./groups/README.md](./groups/README.md) - Groups 機能
