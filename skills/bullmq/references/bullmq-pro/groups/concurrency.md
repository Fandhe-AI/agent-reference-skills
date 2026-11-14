# BullMQ Pro Groups Concurrency

グループ単位で同時処理数を制限する機能。デフォルトではグループごとの並列実行に制限はないが、`concurrency` オプションで制御できる。

## 設定例

```typescript
import { WorkerPro } from '@taskforcesh/bullmq-pro';

const worker = new WorkerPro('myQueue', processFn, {
  group: {
    concurrency: 3, // グループあたり最大3ジョブを並列処理
  },
  concurrency: 100, // Worker 全体の並行処理数
  connection,
});
```

この設定では、任意のグループに対して同時に3ジョブまでしか処理されない。Worker 全体の concurrency が100でも、各グループは最大3ジョブに制限される。

## グローバルスコープ

グループの concurrency 設定はアプリケーション全体でグローバルに適用される。Worker インスタンスの数や個々の concurrency 設定に関わらず、**1つのグループに対して同時に処理されるジョブ数は設定値を超えない**。

例えば `concurrency: 3` を設定した場合:
- Worker が1台でも10台でも、あるグループのジョブは最大3つまでしか同時実行されない
- 異なるグループのジョブは制限なく並列実行可能

## Notes

- The `groupConcurrency` value must be an integer greater than 0, otherwise an error is thrown. It can only be changed on workers created with the `group.concurrency` option (workers created without it do not track active jobs per group, so setting it throws an error).
- When raising the value, a group that has already reached the old limit picks up the new value as soon as one of its active jobs finishes. When lowering it, jobs that are already running are not affected; the new limit applies to jobs started afterwards.
- `groupConcurrency` is a property of the worker instance and is not stored in Redis: you need to update every running worker, and workers started later use the value passed in their constructor options. Pub/Sub messages are not stored, so a process that is disconnected or starts later can miss an update; keep the latest value in your application configuration or in a Redis key and apply it when workers start or reconnect. Use a dedicated Redis connection for the subscriber.
- API reference: https://api.bullmq.pro/classes/v7.WorkerPro.html#groupconcurrency
- Source: https://github.com/taskforcesh/bullmq/blob/v6.7.6/docs/gitbook/bullmq-pro/groups/concurrency.md (tag v6.7.6, fetched 2026-11-14).
- Group concurrency works independently of rate limiting.
- Setting a rate limit without a group concurrency still allows unlimited parallel processing within a group.
- The worker-level `concurrency` and the group `concurrency` are different concepts.
- To give individual groups different values, see [local-group-concurrency.md](./local-group-concurrency.md).

### Changing the group concurrency at runtime

The group concurrency of a worker can be updated at runtime with the `groupConcurrency` property, without having to recreate the worker:

```typescript
import { QueuePro, WorkerPro } from '@taskforcesh/bullmq-pro';

const worker = new WorkerPro('myQueue', processFn, {
  group: {
    concurrency: 3,
  },
  connection,
});

const queue = new QueuePro('myQueue', { connection });

// Local concurrency for a specific group, not affected by the change below.
await queue.setGroupConcurrency('vip', 10);

// Applies to every group that does not have a local concurrency.
worker.groupConcurrency = 5;
```

The new value acts as the default for all groups that do not have a [local group concurrency](./local-group-concurrency.md). Groups with a local concurrency set via `setGroupConcurrency` keep using their own value.

If your workers run in several processes, you can, for example, publish the new value on a Redis Pub/Sub channel and have every process update its local workers:

```typescript
import IORedis from 'ioredis';
import { WorkerPro } from '@taskforcesh/bullmq-pro';

const channel = 'myQueue:group-concurrency';
const subscriber = new IORedis(redisOptions);
const workers: WorkerPro[] = []; // Add your WorkerPro instances here.

subscriber.on('message', (receivedChannel, message) => {
  if (receivedChannel !== channel) {
    return;
  }

  const concurrency = Number(message);
  if (Number.isInteger(concurrency) && concurrency > 0) {
    for (const worker of workers) {
      worker.groupConcurrency = concurrency;
    }
  }
});
await subscriber.subscribe(channel);
```

And then, from any process:

```typescript
await publisher.publish(channel, String(nextConcurrency));
```

## Related

- [./local-group-concurrency.md](./local-group-concurrency.md) - ローカルグループ並行処理
- [./rate-limiting.md](./rate-limiting.md) - グループ単位のレート制限
- [./groups.md](./groups.md) - Groups の基本
