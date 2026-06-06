# Job Scheduler (Cron)

cron 式または固定間隔でジョブを定期実行するスケジューラの設定。

```typescript
import { Queue, Worker } from 'bullmq';

const queue = new Queue('Paint');

// 固定間隔: 1秒ごとにジョブを生成
await queue.upsertJobScheduler('every-second', { every: 1000 });

// cron 式: 毎日 3:15（午前）にジョブを生成
await queue.upsertJobScheduler(
  'daily-report',
  { pattern: '0 15 3 * * *' },
  {
    name: 'generate-report',
    data: { type: 'daily' },
    opts: {
      attempts: 3,
      backoff: { type: 'exponential', delay: 1000 },
      removeOnFail: 1000,
    },
  },
);

const worker = new Worker('Paint', async job => {
  console.log(`Scheduled job: ${job.name}`, job.data);
});
```

## Notes

- `upsertJobScheduler` は同じ ID で再呼び出しすると設定を更新する（重複なし）
- スケジューラは常に 1 つの delayed ジョブを維持し、前のジョブ処理開始後に次を生成する
- キューが混雑している場合は指定間隔より低頻度になることがある
- Job Scheduler が生成するジョブにはカスタムジョブ ID を指定できない
