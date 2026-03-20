# Dragonfly

Dragonfly は Redis のドロップインリプレースメントとして機能し、BullMQ のデータ構造に対してパフォーマンスとメモリ効率の向上を提供します。マルチコア CPU の活用が可能です。

## キュー名の設定

Dragonfly で BullMQ を最適に使用するには、キュー名に中括弧構文（`{myqueue}`）を使用します。これにより、各キューに専用のスレッドが割り当てられます。

```typescript
import { Queue, Worker } from 'bullmq';

// 推奨: 中括弧でキュー名を囲む
const queue = new Queue('{myqueue}', {
  connection: { host: 'dragonfly-host', port: 6379 },
});

const worker = new Worker('{myqueue}', async job => {
  // ジョブ処理
}, {
  connection: { host: 'dragonfly-host', port: 6379 },
});
```

## マルチコア活用

複数キューを管理するシステムでは、異なる CPU コアを各キューに割り当ててパフォーマンスを大幅に向上できます。

```typescript
// 単一キューでもマルチコアの恩恵を受けるため、
// 複数の名前付きキューに分割する
const queue1 = new Queue('{myqueue-1}', { connection });
const queue2 = new Queue('{myqueue-2}', { connection });

// ジョブを分散して追加
const queues = [queue1, queue2];
const targetQueue = queues[jobIndex % queues.length];
await targetQueue.add('job', data);
```

| 設定 | 説明 |
|------|------|
| `{queueName}` | 単一キューに専用スレッドを割り当て |
| `{queueName-1}`, `{queueName-2}` | キュー分割によるマルチコア活用 |

## 注意点

- 優先度（priority）やレート制限（rate-limiting）は、ジョブが複数キューにまたがる場合、一貫性のない動作をする可能性がある
- キュー分割がユースケースに適しているかは、要件に応じて判断すること
- 詳細なセットアップ手順と最適化フラグについては [公式統合ガイド](https://www.dragonflydb.io/docs/integrations/bullmq) を参照

## 関連

- [./redis-compatibility.md](./redis-compatibility.md)
- [../going-to-production.md](../going-to-production.md)
- [../parallelism-and-concurrency.md](../parallelism-and-concurrency.md)
