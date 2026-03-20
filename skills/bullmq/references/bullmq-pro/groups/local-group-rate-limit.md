# BullMQ Pro Local Group Rate Limit

グループごとに個別のレート制限を設定する機能。ユーザーの課金プランやクォータに応じて、異なるレート制限を適用する場合に使用する。

## 概要

異なるグループに異なるレート制限を設定できる。デフォルトのレート制限は Worker で設定し、特定のグループには `setGroupRateLimit()` で個別の制限を上書きする。

## 実装例

```typescript
import { QueuePro, WorkerPro } from '@taskforcesh/bullmq-pro';

const queue = new QueuePro('myQueue', { connection });

// 特定グループにローカルレート制限を設定
const groupId = 'my group';
const maxJobsPerDuration = 100;
const duration = 1000; // ミリ秒

await queue.setGroupRateLimit(groupId, maxJobsPerDuration, duration);

// Worker にデフォルトのレート制限を設定
const worker = new WorkerPro(
  'myQueue',
  async () => {
    // ジョブ処理
  },
  {
    group: {
      limit: {
        // デフォルトのレート制限設定
        max: 1000,
        duration: 1000,
      },
    },
    connection,
  },
);
```

この例では「my group」グループに1秒あたり最大100ジョブのレート制限を設定している。他のグループにはデフォルトの1秒あたり1000ジョブが適用される。

## 注意点

- **Worker インスタンスにデフォルトのレート制限（`group.limit`）を必ず設定すること**。これがないとローカルレート制限が機能しない
- `setGroupRateLimit()` は特定グループのデフォルト設定を上書きする
- ローカルレート制限が設定されていないグループにはデフォルトのレート制限が適用される
- API リファレンス: `QueuePro.setGroupRateLimit()`

## 関連

- [./rate-limiting.md](./rate-limiting.md) - グループレート制限の基本
- [./local-group-concurrency.md](./local-group-concurrency.md) - ローカルグループ並行処理
- [./groups.md](./groups.md) - Groups の基本
