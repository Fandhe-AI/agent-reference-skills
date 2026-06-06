# Concurrency

Worker の concurrency オプションで単一プロセスが同時処理するジョブ数を制御する。

```typescript
import { Worker } from 'bullmq';

// IO ヘビーなジョブ向け: 高い concurrency で非同期 IO 待ち時間を活用する
const ioWorker = new Worker(
  'myQueue',
  async job => {
    await fetchFromDatabase(job.data.id);
    await callExternalApi(job.data.url);
  },
  {
    concurrency: 100,
  },
);

// CPU インテンシブなジョブ向け: concurrency は低く設定する
const cpuWorker = new Worker(
  'heavyQueue',
  async job => {
    performHeavyCalculation(job.data);
  },
  {
    concurrency: 2,
  },
);

// スケールアウト: 複数マシンで同じキューを並列処理する
// マシン 1
const worker1 = new Worker('myQueue', processor, { concurrency: 100 });
// マシン 2
const worker2 = new Worker('myQueue', processor, { concurrency: 100 });
```

## Notes

- `concurrency` は NodeJS のイベントループを活用するため IO ヘビーな処理に効果的
- CPU インテンシブなジョブで高い concurrency を設定するとオーバーヘッドでスループットが低下する
- 複数マシンで同じキューを処理するとスループットはワーカー数に比例してスケールする
- 最適な値は本番ワークロードの観測によって決定する
