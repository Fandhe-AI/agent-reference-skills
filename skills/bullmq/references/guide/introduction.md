# BullMQ — Introduction

BullMQ は 4 つのコアクラスを中心に構築されたジョブキューライブラリである。Queue でジョブを登録し、Worker で処理し、QueueEvents でイベントを監視し、FlowProducer で親子関係のあるワークフローを構築する。

## コアクラス

### Queue

キューを表現するクラス。ジョブの追加、一時停止、クリーニング、データ取得など基本的な操作を提供する。

```typescript
import { Queue } from 'bullmq';

const myQueue = new Queue('Paint');

await myQueue.add('cars', { color: 'blue' });
```

### Worker

キューからジョブを取り出して処理するインスタンス。複数の Worker を異なる Node.js プロセスやマシンで同時に実行でき、ジョブを completed または failed としてマークする。

```typescript
import { Worker } from 'bullmq';

const worker = new Worker('Paint', async job => {
  // process job
  console.log(job.data);
});
```

### QueueEvents

キューに関連するイベントの監視とハンドリングを可能にするクラス。ジョブの完了、失敗、進捗などのイベントをリッスンできる。

```typescript
import { QueueEvents } from 'bullmq';

const queueEvents = new QueueEvents('Paint');

queueEvents.on('completed', ({ jobId }) => {
  console.log(`Job ${jobId} completed`);
});
```

### FlowProducer

複雑なジョブワークフローのオーケストレーションを実現するクラス。親子関係のあるジョブの依存関係を定義できる。

```typescript
import { FlowProducer } from 'bullmq';

const flowProducer = new FlowProducer();

const flow = await flowProducer.add({
  name: 'renovate-interior',
  queueName: 'renovate',
  children: [
    { name: 'paint', data: { place: 'ceiling' }, queueName: 'steps' },
    { name: 'paint', data: { place: 'walls' }, queueName: 'steps' },
  ],
});
```

## ジョブのライフサイクル

ジョブはユーザーが定義したデータ構造であり、キューに保存される。基本的な流れは以下の通り:

1. **追加**: `Queue.add()` でジョブをキューに投入
2. **待機**: Redis 内のリストでワーカーを待つ（waiting 状態）
3. **処理**: Worker がジョブを取得し処理する（active 状態）
4. **完了/失敗**: 処理結果に応じて completed または failed に遷移

Worker がジョブ追加時に稼働していなくても、接続された時点でキュー内のジョブを自動的に処理する。

## Notes

- BullMQ supports distributed processing, so scalable architectures spanning several machines can be built.
- Job data is stored in the datastore, so it must be serializable.
- Queue, Worker and QueueEvents can each use their own independent Redis connection.
- In the v6.7.6 guide, Queue is also used to create [job schedulers](./job-schedulers/README.md) (repeatable jobs from a cron expression or a fixed interval), QueueEvents listens from any process to the [events](./events/README.md) of all workers of a queue, and FlowProducer adds [flows](./flows/README.md) (trees of jobs with parent-child dependencies).
- There are two backends, Redis and PostgreSQL. The classes are datastore agnostic and delegate every operation to a backend. Redis: 6.2 or newer and compatible servers such as Valkey and Dragonfly, with ioredis, node-redis, Bun's Redis client or Valkey GLIDE (see [Connections](./connections.md)); PostgreSQL: 13 or newer (see [PostgreSQL backend](./postgresql-backend/postgresql-backend.md)). Unless stated otherwise the guide applies to both; differences are listed in the feature parity section of the PostgreSQL backend.
- The experimental [Relay](./relay/README.md) (process-to-process real-time messaging, available in the v6.4.0 docs) lets the processes of a system exchange messages through the datastore used by the queues.
- The guide uses the TypeScript package (Node.js and Bun). BullMQ is also available for Python, Elixir, .NET, Rust and PHP (see the languages category); all SDKs share the same data model, so producers and workers written in different languages can work together on the same queues.
- Source: https://github.com/taskforcesh/bullmq/blob/v6.7.6/docs/gitbook/guide/introduction.md (tag v6.7.6, fetched 2026-11-14).

## Related

- [Connections](./connections.md)
- [Queues](./queues/README.md)
- [Workers](./workers/README.md)
