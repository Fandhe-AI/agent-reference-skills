# BullMQ Pro Groups Getters

グループのジョブ数やジョブ一覧を取得するための API メソッド群。キューの状態監視やグループ管理に使用する。

## グループ全体のジョブ数取得

`getGroupsJobsCount()` で全グループのジョブ数を取得する。優先度付きジョブと非優先度ジョブの両方が含まれる:

```typescript
import { QueuePro } from '@taskforcesh/bullmq-pro';

const queue = new QueuePro('myQueue', { connection });

// イテレーションパラメータで取得範囲を指定
const count = await queue.getGroupsJobsCount(1000);
console.log('Total jobs across groups:', count);
```

## 特定グループのアクティブジョブ数取得

`getGroupActiveCount()` で特定グループで現在処理中のジョブ数を取得する:

```typescript
const groupId = 'myGroup';
const activeCount = await queue.getGroupActiveCount(groupId);
console.log(`Group ${groupId} active jobs:`, activeCount);
```

## グループ内のジョブ一覧取得

`getGroupJobs()` でページネーション形式でグループ内のジョブを取得する:

```typescript
const groupId = 'myGroup';
const start = 0;
const end = 100;

const jobs = await queue.getGroupJobs(groupId, start, end);
console.log(`Jobs in group ${groupId}:`, jobs.length);
```

## 注意点

- `getGroupsJobsCount()` のイテレーションパラメータは取得するグループの走査範囲を指定する
- `getGroupJobs()` はページネーション形式で、`start` と `end` で範囲を指定する
- すべてのメソッドは `QueuePro` クラスで使用する

## 関連

- [./groups.md](./groups.md) - Groups の基本的な使い方
- [./rate-limiting.md](./rate-limiting.md) - グループ単位のレート制限
- [./concurrency.md](./concurrency.md) - グループ単位の並行処理
