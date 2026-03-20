# Rate Limiting

BullMQ はワーカーレベルのレート制限機能を提供し、`limiter` オプション（`max` と `duration`）を使用してジョブの処理速度を制御できます。レート制限はグローバルに適用され、複数ワーカーが同一キューを処理する場合でも全体で制限が守られます。

## 基本的なレート制限

Worker に `limiter` オプションを設定することで、一定期間内に処理するジョブ数を制限できます。

```typescript
import { Worker } from 'bullmq';

const worker = new Worker('painter', async job => paintCar(job), {
  limiter: {
    max: 10,
    duration: 1000,
  },
});
```

| Name | Type | Description |
|------|------|-------------|
| `max` | `number` | `duration` 期間内に処理可能な最大ジョブ数 |
| `duration` | `number` | レート制限の期間（ミリ秒） |

## レート制限の動作

レート制限に達したジョブは **wait** 状態に留まります。レート制限はグローバルに適用されるため、例えば上記設定で 10 個のワーカーが同一キューを処理していても、1 秒あたり合計 10 ジョブまでしか処理されません。

## 手動レート制限

API から `429 Too Many Requests` が返された場合など、動的にレート制限を適用したい場合は `worker.rateLimit()` メソッドを使用します。

```typescript
import { Worker } from 'bullmq';

const worker = new Worker(
  'myQueue',
  async () => {
    const [isRateLimited, duration] = await doExternalCall();
    if (isRateLimited) {
      await worker.rateLimit(duration);
      // Worker.RateLimitError() を throw することで、
      // 失敗ではなくレート制限として処理される
      throw Worker.RateLimitError();
    }
  },
  {
    connection,
    limiter: {
      max: 1,
      duration: 500,
    },
  },
);
```

## レート制限 TTL の取得

キューがレート制限中かどうかを確認するには `getRateLimitTtl` メソッドを使用します。

```typescript
import { Queue } from 'bullmq';

const queue = new Queue('myQueue', { connection });
const maxJobs = 100;

const ttl = await queue.getRateLimitTtl(maxJobs);

if (ttl > 0) {
  console.log('Queue is rate limited');
}
```

## レート制限キーの削除

レート制限を即座に解除したい場合は `removeRateLimitKey` メソッドを使用します。

```typescript
import { Queue } from 'bullmq';

const queue = new Queue('myQueue', { connection });

await queue.removeRateLimitKey();
```

レート制限キーを削除すると、ワーカーは即座にジョブの処理を再開でき、レート制限カウンターはゼロにリセットされます。

## グループキー（v3.0 未満のみ）

BullMQ 3.0 以前では、グループキーを使用してグループ単位のレート制限が可能でした。例えば、顧客ごとにレート制限を設定できます。

```typescript
import { Queue, Worker } from 'bullmq';

const queue = new Queue('painter', {
  limiter: {
    groupKey: 'customerId',
  },
});

const worker = new Worker('painter', async job => paintCar(job), {
  limiter: {
    max: 10,
    duration: 1000,
    groupKey: 'customerId',
  },
});

// customerId の値に基づいてレート制限される
await queue.add('rate limited paint', { customerId: 'my-customer-id' });
```

## 注意点

- BullMQ 2.0 以降では `QueueScheduler` は不要です
- BullMQ 3.0 以降ではグループキーによるレート制限は削除されました
- 手動レート制限を使用する場合、`limiter` オプションの `max` は必須です（レート制限バリデーションの判定に使用されます）
- `Worker.RateLimitError()` を throw し忘れると、ジョブが失敗として処理されます

## 関連

- [./parallelism-and-concurrency.md](./parallelism-and-concurrency.md)
- [./going-to-production.md](./going-to-production.md)
- [./troubleshooting.md](./troubleshooting.md)
