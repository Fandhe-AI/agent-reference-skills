# BullMQ Pro Groups

1つのキュー内でジョブをグループに分配し、ラウンドロビン方式で公平に処理する機能。特定のユーザーやテナントがキューリソースを独占することを防ぐ。

## 概要

Groups は単一のキュー内に「仮想キュー」を作成する。例えば動画トランスコーディングサービスで多数のユーザーが1つのキューを共有する場合、1人のユーザーが大量のジョブを投入しても、グループ機能によりラウンドロビン方式で公平に処理される。

## 主な特徴

- **仮想キュー** - ユーザーごとの仮想キューとして機能し、予測可能なジョブ処理を実現
- **リソース効率** - 空のグループは Redis のリソースを消費しない
- **並列処理** - 複数 Worker や concurrency 設定時、グループ間でジョブが並列処理される
- **優先度** - グループに属さないジョブは、グループ内のジョブより優先される
- **スケーラビリティ** - Worker 数はキューの負荷に応じてスケール可能

## ジョブの追加

`group` プロパティで `id` を指定してジョブをグループに追加する:

```typescript
import { QueuePro } from '@taskforcesh/bullmq-pro';

const queue = new QueuePro('myQueue', { connection });

// グループ1にジョブを追加
const job1 = await queue.add(
  'test',
  { foo: 'bar1' },
  {
    group: {
      id: 1,
    },
  },
);

// グループ2にジョブを追加
const job2 = await queue.add(
  'test',
  { foo: 'bar2' },
  {
    group: {
      id: 2,
    },
  },
);
```

## グループジョブの処理

`WorkerPro` でジョブを処理する。`job.opts.group` でグループ情報にアクセス可能:

```typescript
import { WorkerPro } from '@taskforcesh/bullmq-pro';

const worker = new WorkerPro('myQueue', async (job) => {
  // 通常のジョブ処理
  console.log('Processing job', job.id);

  // グループ固有のロジック
  await doSomethingSpecialForMyGroup(job.opts.group);
}, { connection });
```

## 注意点

- グループ ID は数値または文字列を使用可能
- グループ数に実質的な上限はない
- グループに属さないジョブはグループジョブより優先して処理される
- 空のグループは自動的にクリーンアップされ、Redis リソースを消費しない

## 関連

- [./getters.md](./getters.md) - グループ情報の取得
- [./rate-limiting.md](./rate-limiting.md) - グループ単位のレート制限
- [./concurrency.md](./concurrency.md) - グループ単位の並行処理
- [./pausing-groups.md](./pausing-groups.md) - グループの一時停止
- [./prioritized.md](./prioritized.md) - グループ内の優先度設定
