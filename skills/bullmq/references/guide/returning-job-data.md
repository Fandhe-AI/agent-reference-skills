# Returning Job Data

BullMQ では Worker のプロセッサ関数から値を返すことができ、その戻り値は `job.returnvalue` プロパティからアクセス可能です。`QueueEvents` の `completed` イベントでも取得できます。

## プロセッサからの値の返却

プロセッサ関数の戻り値は自動的にジョブの `returnvalue` として保存されます。

```typescript
import { Queue, Worker } from 'bullmq';

const myWorker = new Worker('AsyncProc', async job => {
  const result = await doSomeAsyncProcessing();
  return result;
});
```

## 完了イベントでの取得

`QueueEvents` を使用して `completed` イベントで戻り値を取得できます。

```typescript
import { QueueEvents } from 'bullmq';

const queueEvents = new QueueEvents('AsyncProc');

queueEvents.on('completed', ({ returnvalue }) => {
  console.log(returnvalue);
});
```

## Results Queue パターン

堅牢な結果処理のために、専用の「results」キューを使用するパターンがあります。

```typescript
import { Queue, Worker } from 'bullmq';

// メイン処理キュー
const mainWorker = new Worker('mainQueue', async job => {
  const result = await processJob(job);

  // 結果を専用キューに送信
  const resultsQueue = new Queue('resultsQueue');
  await resultsQueue.add('result', { jobId: job.id, result });

  return result;
});

// 結果処理キュー
const resultsWorker = new Worker('resultsQueue', async job => {
  // データベースに保存など
  await saveToDatabase(job.data.result);
});
```

このパターンはマイクロサービスアーキテクチャで特に有効です。結果を処理するサービスがダウンしていても、復旧後に結果キューのジョブが自動的に処理されます。

## 注意点

- 処理結果をストレージに保存する場合は、`completed` イベントではなくプロセッサ関数内で行う方が堅牢です。プロセッサ内であれば、ジョブが完了した時点でデータ保存も保証されます
- `completed` イベントでのデータ保存は失敗する可能性があり、その場合でもジョブは完了状態になるためエラーが検出されません
- 戻り値は Redis に保存されるため、大きなデータを返すとメモリ消費が増加します

## 関連

- [./retrying-failing-jobs.md](./retrying-failing-jobs.md)
- [./architecture.md](./architecture.md)
