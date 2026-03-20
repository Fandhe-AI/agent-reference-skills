# BullMQ — Auto-removal of Jobs (Worker Options)

Worker オプションとして `removeOnComplete` / `removeOnFail` を設定することで、処理済みジョブの自動削除を Worker 側で制御する。Queue のジョブオプションと同様の 3 つの戦略が使える。

## 戦略 1: 全件削除

```typescript
const myWorker = new Worker(
  'myQueueName',
  async job => {
    // do some work
  },
  {
    connection,
    removeOnFail: { count: 0 },
  },
);
```

## 戦略 2: 件数ベースの保持

```typescript
const myWorker = new Worker(
  'myQueueName',
  async job => {
    // do some work
  },
  {
    connection,
    removeOnComplete: { count: 1000 },
    removeOnFail: { count: 5000 },
  },
);
```

推奨: 完了ジョブは少量、失敗ジョブはより多くの件数を保持する。

## 戦略 3: 時間ベースの保持

```typescript
const myWorker = new Worker(
  'myQueueName',
  async job => {
    // do some work
  },
  {
    connection,
    removeOnComplete: {
      age: 3600,    // 最大 1 時間保持
      count: 1000,  // 最大 1000 件保持
      limit: 100,   // 1 回のクリーンアップで最大 100 件削除
    },
    removeOnFail: {
      age: 24 * 3600, // 最大 24 時間保持
      limit: 50,      // 1 回のクリーンアップで最大 50 件削除
    },
  },
);
```

## KeepJobs オプション

| Name | Type | Description |
|------|------|-------------|
| `age` | `number` | ジョブの保持期間（秒） |
| `count` | `number` | 保持するジョブの最大件数 |
| `limit` | `number` | 1 回のクリーンアップイテレーションで削除するジョブの最大数 |

## 注意点

- 自動削除は **遅延実行（lazy）** で動作する。新しいジョブが完了または失敗しない限り、削除は実行されない
- `limit` パラメータはクリーンアップのパフォーマンスを制御し、大量のジョブを一度に削除することによる Redis 負荷を軽減する

## 関連

- [Queues — Auto-removal of jobs](../queues/auto-removal-of-jobs.md)
- [Workers](./workers.md)
