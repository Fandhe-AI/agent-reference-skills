# BullMQ Pro Prioritized Intra-Groups

グループ内でジョブに優先度を割り当てる機能。`group` オプションと `priority` オプションを同時に指定することで有効になる。

## 優先度付きジョブの追加

```typescript
import { QueuePro } from '@taskforcesh/bullmq-pro';

const queue = new QueuePro('myQueue', { connection });

await queue.add(
  'paint',
  { foo: 'bar' },
  {
    group: {
      id: 'groupId',
      priority: 10,
    },
  },
);
```

## 優先度の範囲

- 優先度は **0 から 2097151** の範囲で指定する
- **数値が大きいほど優先度が低い**（Unix プロセスと同じ方式）
- 優先度を明示的に指定しないジョブはデフォルトで最高優先度（0）が割り当てられる

## 優先度ごとのジョブ数取得

`getCountsPerPriorityForGroup()` でグループ内の優先度別ジョブ数を取得する:

```typescript
const counts = await queue.getCountsPerPriorityForGroup('groupId', [1, 0]);
/*
{
  '1': 11,
  '0': 10
}
*/
```

この例ではグループ「groupId」内の優先度1のジョブが11個、優先度0のジョブが10個あることを示している。

## 注意点

- 優先度は `group` オプション内に指定する（トップレベルの `priority` とは異なる）
- 優先度0が最高優先度
- 数値が大きいほど後回しにされる
- グループに属さないジョブの優先度とは独立して動作する

## 関連

- [./groups.md](./groups.md) - Groups の基本
- [./concurrency.md](./concurrency.md) - グループ単位の並行処理
- [./rate-limiting.md](./rate-limiting.md) - グループ単位のレート制限
