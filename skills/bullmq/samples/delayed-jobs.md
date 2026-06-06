# Delayed Jobs

ジョブの処理を指定時間後まで遅らせる設定。

```typescript
import { Job, Queue } from 'bullmq';

const myQueue = new Queue('Paint');

// 5秒後に処理されるジョブ
await myQueue.add('house', { color: 'white' }, { delay: 5000 });

// 特定日時にスケジュール
const targetTime = new Date('2035-03-07T10:30:00');
const delay = Number(targetTime) - Date.now();
await myQueue.add('scheduled-task', { color: 'blue' }, { delay });

// 遅延時間の変更
const job = await Job.create(myQueue, 'test', { foo: 'bar' }, { delay: 2000 });
await job.changeDelay(4000); // delayed 状態の間のみ変更可能
```

## Notes

- `delay` はミリ秒単位で指定する
- 遅延ジョブは delayed set に入り、時刻到達後に通常の wait キューに移動する
- 指定時刻ちょうどに処理される保証はなく、Worker の可用性に依存する
- `changeDelay()` は delayed 状態のジョブにのみ有効（他の状態ではエラー）
