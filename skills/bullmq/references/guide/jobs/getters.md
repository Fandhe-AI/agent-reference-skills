# BullMQ — Getters

ジョブはライフサイクルの中でさまざまなステータスを経由します。BullMQ は各ステータスからジョブ情報を取得するためのメソッドを提供しています。

## Job Counts（ジョブ数の取得）

指定したステータスのジョブ数を取得します。

```typescript
import { Queue } from 'bullmq';

const myQueue = new Queue('Paint');

const counts = await myQueue.getJobCounts('wait', 'completed', 'failed');
// { wait: number, completed: number, failed: number }
```

## 利用可能なステータス

| Status | Description |
|--------|-------------|
| `completed` | 完了したジョブ |
| `failed` | 失敗したジョブ |
| `delayed` | 遅延中のジョブ |
| `active` | 処理中のジョブ |
| `wait` | 待機中のジョブ |
| `waiting-children` | 子ジョブの完了を待っているジョブ |
| `prioritized` | 優先度付きジョブ |
| `paused` | 一時停止中のジョブ |
| `repeat` | 繰り返しジョブ |

## Get Jobs（ジョブの取得）

ページネーション形式でジョブを取得します。

```typescript
// 最も古い100件の completed ジョブを取得
const completed = await myQueue.getJobs(['completed'], 0, 100, true);
```

### getJobs パラメータ

| Name | Type | Description |
|------|------|-------------|
| `types` | `string[]` | 取得するジョブのステータス配列 |
| `start` | `number` | 取得開始位置（0始まり） |
| `end` | `number` | 取得終了位置 |
| `asc` | `boolean` | `true` で古い順、`false` で新しい順 |

## 注意点

- `getJobCounts` は複数のステータスを同時に指定できる
- `getJobs` はページネーションに対応しており、大量のジョブがある場合でも効率的に取得可能
- Repeatable Job の設定情報は `getJobs()` には表示されない。`getRepeatableJobs()` を使用すること

## 関連

- [Jobs](./jobs.md)
- [Prioritized](./prioritized.md)
- [Removing Jobs](./removing-jobs.md)
