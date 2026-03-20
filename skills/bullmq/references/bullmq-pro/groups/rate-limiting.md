# BullMQ Pro Groups Rate Limiting

グループ単位で独立したレート制限を適用する機能。各グループが時間単位あたりの最大ジョブ数を超えると、そのグループのみが制限される。

## 静的レート制限設定

Worker インスタンスでグループのレート制限を設定する:

```typescript
import { WorkerPro } from '@taskforcesh/bullmq-pro';

const worker = new WorkerPro('myQueue', processFn, {
  group: {
    limit: {
      max: 100,       // グループあたり最大100ジョブ
      duration: 1000,  // 1秒あたり
    },
  },
  connection,
});
```

- **max** - 時間枠内でグループあたりに許可される最大ジョブ数
- **duration** - 時間枠（ミリ秒）

## 手動レート制限

外部 API のレスポンスなど動的な条件に基づいてレート制限を適用する:

```typescript
import { WorkerPro, Worker } from '@taskforcesh/bullmq-pro';

const worker = new WorkerPro(
  'myQueue',
  async (job) => {
    const groupId = job.opts.group.id;
    const [isRateLimited, duration] = await doExternalCall(groupId);
    if (isRateLimited) {
      await worker.rateLimitGroup(job, duration);
      throw Worker.RateLimitError();
    }
  },
  { connection },
);
```

## レート制限状態の確認

`getGroupRateLimitTtl()` でグループが現在レート制限中かどうかを確認する:

```typescript
import { QueuePro } from '@taskforcesh/bullmq-pro';

const queue = new QueuePro('myQueue', { connection });
const groupId = '0';
const maxJobs = 100;

const ttl = await queue.getGroupRateLimitTtl(groupId, maxJobs);

if (ttl > 0) {
  console.log('Group is rate limited, remaining TTL:', ttl);
}
```

TTL が正の値の場合、そのグループは現在レート制限中。

## 注意点

- `rateLimitGroup()` 呼び出し後、ジョブはアクティブ状態ではなくなるため、必ず `Worker.RateLimitError()` をスローすること
- レート制限はグループごとに独立して適用される
- 他のグループのジョブ処理には影響しない
- ローカルグループレート制限との併用については [local-group-rate-limit.md](./local-group-rate-limit.md) を参照

## 関連

- [./local-group-rate-limit.md](./local-group-rate-limit.md) - ローカルグループレート制限
- [./concurrency.md](./concurrency.md) - グループ単位の並行処理
- [./groups.md](./groups.md) - Groups の基本
