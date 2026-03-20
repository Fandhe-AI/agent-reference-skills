# BullMQ — Workers

Worker はキューからジョブを取得して処理するインスタンスである。処理が成功すると completed 状態、例外が発生すると failed 状態に遷移する。複数の Worker を異なるプロセスやマシンで実行可能。

## 基本的な Worker

```typescript
import { Worker, Job } from 'bullmq';

const worker = new Worker(queueName, async (job: Job) => {
  // ジョブの進捗を報告（任意）
  await job.updateProgress(42);

  // オブジェクトで進捗を報告（任意）
  await job.updateProgress({ foo: 'bar' });

  // ジョブを処理
  return 'some value';
});
```

## キャンセル対応の Worker

```typescript
const worker = new Worker(
  queueName,
  async (job: Job, token?: string, signal?: AbortSignal) => {
    // signal でキャンセルを検出可能
    return 'some value';
  },
);
```

## 自動起動の制御（autorun）

デフォルトではプロセッサは即座に起動する。`autorun: false` で遅延起動が可能。

```typescript
import { Worker, Job } from 'bullmq';

const worker = new Worker(
  queueName,
  async (job: Job) => {
    await job.updateProgress(42);
    await job.updateProgress({ foo: 'bar' });
    return 'some value';
  },
  { autorun: false },
);

// 手動で起動
worker.run();
```

## イベントリスナー

### ローカルイベント

```typescript
worker.on('completed', (job: Job, returnvalue: any) => {
  // 完了時の処理
});

worker.on('progress', (job: Job, progress: number | object) => {
  // 進捗更新時の処理
});

worker.on('failed', (job: Job | undefined, error: Error, prev: string) => {
  // 失敗時の処理
});

worker.on('error', err => {
  // エラーハンドラ（必ず設定すること）
  console.error(err);
});
```

### グローバルイベント（QueueEvents）

```typescript
import { QueueEvents } from 'bullmq';

const queueEvents = new QueueEvents('Paint');

queueEvents.on('completed', ({ jobId, returnvalue }) => {
  // 任意の Worker でジョブが完了した時に呼ばれる
});

queueEvents.on('failed', ({ jobId, failedReason }) => {
  // 任意の Worker でジョブが失敗した時に呼ばれる
});

queueEvents.on('progress', ({ jobId, data }) => {
  // 進捗イベントを受信
});
```

## TypeScript ジェネリクス

データ型と戻り値の型を指定可能。

```typescript
const worker = new Worker<MyData, MyReturn>(queueName, async (job: Job) => {});
```

## 主要オプション

| Name | Type | Description |
|------|------|-------------|
| `concurrency` | `number` | 並行処理数（デフォルト: 1） |
| `autorun` | `boolean` | 自動起動（デフォルト: `true`） |
| `connection` | `ConnectionOptions` | Redis 接続設定 |
| `removeOnComplete` | `KeepJobs` | 完了ジョブの自動削除 |
| `removeOnFail` | `KeepJobs` | 失敗ジョブの自動削除 |
| `stalledInterval` | `number` | stalled チェックの間隔（ミリ秒） |
| `maxStalledCount` | `number` | stalled 許容回数 |
| `lockDuration` | `number` | ジョブロックの有効期間（ミリ秒） |
| `useWorkerThreads` | `boolean` | Worker Threads を使用するか |

## 注意点

- `error` イベントリスナーを必ず設定すること。設定しないと、未処理の例外がジョブの処理を停止させる可能性がある
- プロセッサ関数の戻り値は `returnvalue` プロパティや `completed` イベントで取得可能
- 進捗は `job.updateProgress()` で数値またはオブジェクトとして報告でき、Worker イベントまたは QueueEvents で受信可能

## 関連

- [Connections](../connections.md)
- [Concurrency](./concurrency.md)
- [Stalled Jobs](./stalled-jobs.md)
- [Sandboxed Processors](./sandboxed-processors.md)
