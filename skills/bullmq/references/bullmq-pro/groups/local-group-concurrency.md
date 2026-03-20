# BullMQ Pro Local Group Concurrency

個々のグループに固有の並行処理数を設定する機能。グループごとに異なる concurrency 値を持たせることができる。

## concurrency の設定

`setGroupConcurrency()` メソッドで特定のグループに concurrency 値を割り当てる:

```typescript
import { QueuePro } from '@taskforcesh/bullmq-pro';

const queue = new QueuePro('myQueue', { connection });

const groupId = 'my group';
await queue.setGroupConcurrency(groupId, 4);
```

## concurrency の取得

`getGroupConcurrency()` で特定グループの concurrency 設定を取得する:

```typescript
const concurrency = await queue.getGroupConcurrency(groupId);
console.log(`Group concurrency: ${concurrency}`);
```

## Worker の設定

Worker インスタンスレベルでもグループ concurrency を設定する必要がある。これはデフォルト値として機能する:

```typescript
import { WorkerPro } from '@taskforcesh/bullmq-pro';

const worker = new WorkerPro('myQueue', processFn, {
  group: {
    concurrency: 2, // デフォルトの並行処理数
  },
  concurrency: 100,
  connection,
});
```

## 注意点

- **Worker インスタンスレベルでグループ concurrency を必ず設定すること**。これが機能の前提条件であり、ローカル concurrency が未設定のグループのデフォルト値にもなる
- ローカル concurrency の値は Redis に保存されるため、不要になった場合は手動でクリーンアップが必要
- API リファレンス: `QueuePro.setGroupConcurrency()`, `QueuePro.getGroupConcurrency()`

## 関連

- [./concurrency.md](./concurrency.md) - グループ並行処理の基本
- [./local-group-rate-limit.md](./local-group-rate-limit.md) - ローカルグループレート制限
- [./groups.md](./groups.md) - Groups の基本
