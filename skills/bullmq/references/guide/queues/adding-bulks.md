# BullMQ — Adding Jobs in Bulk

`addBulk` メソッドを使用して、複数のジョブをアトミックに一括追加する。すべてのジョブがキューに投入されるか、1 つも投入されないかのどちらかが保証される。

## 基本的な使い方

```typescript
import { Queue } from 'bullmq';

const queue = new Queue('paint');

const name = 'jobName';
const jobs = await queue.addBulk([
  { name, data: { paint: 'car' } },
  { name, data: { paint: 'house' } },
  { name, data: { paint: 'boat' } },
]);
```

## addBulk のパラメータ

配列の各要素は以下のプロパティを持つ:

| Name | Type | Description |
|------|------|-------------|
| `name` | `string` | ジョブ名 |
| `data` | `object` | ジョブデータ |
| `opts` | `JobsOptions` | ジョブオプション（任意） |

## 利点

- **原子性（Atomicity）**: すべてのジョブが投入されるか、1 つも投入されないかのどちらか
- **パフォーマンス**: Redis へのラウンドトリップが削減され、複数ジョブの同時追加時に効率的

## 注意点

- 一括追加はトランザクション的に動作するため、部分的な結果は発生しない
- 各ジョブに個別のオプション（`delay`, `priority` 等）を設定可能

## 関連

- [Queues](./queues.md)
- [Add Bulk API Reference](https://api.docs.bullmq.io/classes/v5.Queue.html#addbulk)
