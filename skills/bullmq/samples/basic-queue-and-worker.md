# Basic Queue and Worker

Queue にジョブを追加し、Worker で処理する最小構成。

```typescript
import { Queue, Worker } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis({ maxRetriesPerRequest: null });

// Queue: ジョブを追加する
const myQueue = new Queue('foo', { connection });

await myQueue.add('myJobName', { foo: 'bar' });
await myQueue.add('myJobName', { qux: 'baz' });

// Worker: ジョブを処理する
const worker = new Worker(
  'foo',
  async job => {
    console.log(job.name, job.data);
  },
  { connection },
);

worker.on('completed', job => {
  console.log(`${job.id} has completed!`);
});

worker.on('failed', (job, err) => {
  console.log(`${job.id} has failed with ${err.message}`);
});
```

## Notes

- `IORedis` の `maxRetriesPerRequest: null` は BullMQ が要求する必須設定
- `Queue` と `Worker` は同じキュー名を指定することで接続される
- Worker がジョブ追加時に稼働していなくても、起動後に自動でキューを消化する
- `connection` オプションを省略すると `localhost:6379` がデフォルトで使用される
