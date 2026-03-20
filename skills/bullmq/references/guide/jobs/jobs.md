# Jobs

キューは異なる種類のジョブを保持でき、それぞれの種類によって処理方法やタイミングが異なる。同一キュー内で FIFO、LIFO、遅延、優先度付きなど異なるタイプのジョブを混在させることが可能。

## 基本的な使い方

```typescript
import { Queue } from 'bullmq';

const queue = new Queue('my-queue');

// 基本的なジョブの追加
await queue.add('job-name', { foo: 'bar' });

// オプション付きジョブの追加
await queue.add('job-name', { foo: 'bar' }, {
  delay: 5000,         // 5秒遅延
  priority: 1,         // 優先度
  attempts: 3,         // リトライ回数
  backoff: {
    type: 'exponential',
    delay: 1000,
  },
});
```

## 主なジョブオプション

| Name | Type | Description |
|------|------|-------------|
| `delay` | `number` | ジョブの実行を遅延させるミリ秒数 |
| `priority` | `number` | 優先度（小さい値ほど優先） |
| `lifo` | `boolean` | LIFO 順序で処理するか |
| `attempts` | `number` | 失敗時のリトライ回数 |
| `backoff` | `object` | リトライ時のバックオフ設定 |
| `removeOnComplete` | `boolean \| number \| KeepJobs` | 完了時の自動削除設定 |
| `removeOnFail` | `boolean \| number \| KeepJobs` | 失敗時の自動削除設定 |
| `jobId` | `string` | カスタムジョブ ID |
| `timestamp` | `number` | ジョブのタイムスタンプ |
| `parent` | `object` | 親ジョブの指定（Flow で使用） |

## 注意点

- 同一キューで異なる種類のジョブを自由に混在可能
- ジョブデータは JSON シリアライズ可能である必要がある
- ジョブ名はワーカー内で処理を分岐する際に利用できる

## 関連

- [FIFO](./fifo.md)
- [LIFO](./lifo.md)
- [Delayed](./delayed.md)
- [Prioritized](./prioritized.md)
- [Queues](../queues/queues.md)
- [Workers](../workers/workers.md)
