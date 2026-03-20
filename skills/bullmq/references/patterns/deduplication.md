# Deduplication

ジョブの重複排除パターン。ジョブがアクティブになるまで、または Job Scheduler と組み合わせて重複を防止する方法を提供する。

## ジョブがアクティブになるまでの重複排除

ジョブが active 状態に遷移したタイミングで `removeDeduplicationKey` を呼び出し、以降の同一ジョブの追加を許可する。

```typescript
import { Job, Queue, Worker } from 'bullmq';

const myQueue = new Queue('Paint');

const worker = new Worker('Paint', async (job: Job) => {
  await job.removeDeduplicationKey();
  console.log('Do something with job');
  return 'some value';
});

myQueue.add('house', { color: 'white' }, { deduplication: { id: 'house' } });
```

> 上記の例は Simple Mode を使用しているが、Throttle Mode や Debounce Mode とも組み合わせ可能。

## Job Scheduler との組み合わせ

Job Scheduler で生成されるジョブの重複排除を行うことで、リソースを節約し不要な処理を回避できる。

`JobSchedulerTemplateOptions` には deduplication オプションがないため（スケジューラのジョブ生成プロセスと干渉するため）、ワーカー内で別途 deduplication 付きジョブを追加する方法で対応する。

```typescript
import { Queue, Worker } from 'bullmq';

const myQueue = new Queue('Paint');

const worker = new Worker(
  'Paint',
  async job => {
    if (job.name === 'paint-trigger') {
      // 90秒間の重複排除付きジョブを追加
      await myQueue.add(
        'house',
        { color: 'white' },
        { deduplication: { id: 'customValue', ttl: 90000 } },
      );
    }
  },
  { connection },
);

await myQueue.upsertJobScheduler('repeat', {
  pattern: '* * * * *', // 毎分実行
  template: {
    name: 'paint-trigger',
    data: {},
  },
});
```

## 注意点

- `removeDeduplicationKey` を呼ばないと、同じ deduplication ID のジョブは追加されない
- Job Scheduler の `JobSchedulerTemplateOptions` に直接 deduplication を設定することはできない
- `ttl` を指定すると、指定時間経過後に自動的に deduplication キーが削除される

## 関連

- [Add Job API Reference](https://api.docs.bullmq.io/classes/v5.Queue.html#add)
- [Remove Deduplication Key API Reference](https://api.docs.bullmq.io/classes/v5.Job.html#removededuplicationkey)
- [Upsert Job Scheduler API Reference](https://api.docs.bullmq.io/classes/v5.Queue.html#upsertJobScheduler)
