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

## ランタイムでの変更

Worker の `groupConcurrency` プロパティで、Worker を作り直さずにグループ concurrency を実行時に更新できる。

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

新しい値は [ローカル group concurrency](./local-group-concurrency.md) を持たないすべてのグループのデフォルトになる。`setGroupConcurrency` でローカル値を設定したグループは自身の値を使い続ける。

複数プロセスで Worker が動く場合は、例えば Redis Pub/Sub チャンネルで新しい値を publish し、各プロセスがローカルの Worker を更新できる:

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

任意のプロセスから publish する:

```typescript
await publisher.publish(channel, String(nextConcurrency));
```

## 注意点

- `groupConcurrency` は整数かつ 0 より大きい値でなければエラーになる。`group.concurrency` オプション付きで作成した Worker でのみ変更できる（なしで作成した Worker はグループごとのアクティブジョブを追跡しないため、設定するとエラー）
- 値を上げると、旧上限に達していたグループは、アクティブジョブが 1 つ終了した時点で新しい値を採用する。値を下げても実行中のジョブには影響せず、以降に開始するジョブに新しい上限が適用される
- `groupConcurrency` は Worker インスタンスのプロパティで Redis には保存されない。稼働中の全 Worker を更新する必要があり、後から起動する Worker はコンストラクタオプションの値を使う。Pub/Sub メッセージは保存されないため、切断中や後から起動したプロセスは更新を取り逃がし得る。最新値はアプリ設定や Redis キーに保持し、Worker の起動・再接続時に適用する。Pub/Sub の subscriber には専用の Redis 接続を使う
- API リファレンス: https://api.bullmq.pro/classes/v7.WorkerPro.html#groupconcurrency
- Source: https://github.com/taskforcesh/bullmq/blob/v6.7.6/docs/gitbook/bullmq-pro/groups/concurrency.md (tag v6.7.6、取得日 2026-11-14)
- グループ concurrency はレート制限とは独立して動作する
- レート制限を設定していても、グループ concurrency を設定しないとグループ内で無制限に並列実行される
- Worker 全体の `concurrency` とグループの `concurrency` は別の概念
- ローカルグループ並行処理で個別のグループに異なる値を設定する場合は [local-group-concurrency.md](./local-group-concurrency.md) を参照

## 関連

- [./local-group-concurrency.md](./local-group-concurrency.md) - ローカルグループ並行処理
- [./rate-limiting.md](./rate-limiting.md) - グループ単位のレート制限
- [./groups.md](./groups.md) - Groups の基本
