# BullMQ — Job Data

すべてのジョブはカスタムデータを持つことができます。データはジョブの `data` 属性に格納され、ジョブ追加時に第2引数として渡します。

## 基本的な使い方

```typescript
import { Queue } from 'bullmq';

const myQueue = new Queue('paint');

const job = await myQueue.add('wall', { color: 'red' });

job.data; // { color: 'red' }
```

## データの更新

ジョブ追加後にデータを変更する場合は `updateData` メソッドを使用します。

```typescript
const job = await Job.create(queue, 'wall', { color: 'red' });

await job.updateData({
  color: 'blue',
});

job.data; // { color: 'blue' }
```

## 注意点

- ジョブデータは JSON シリアライズ可能なオブジェクトである必要がある
- データサイズが大きいと Redis のメモリ使用量に影響するため、必要最小限のデータを格納すること
- 大きなペイロード（ファイル内容など）は外部ストレージに保存し、ジョブデータには参照（URL や ID）のみを含めるのがベストプラクティス
- `updateData` メソッドでジョブデータを完全に置き換えることが可能

## 関連

- [Jobs](./jobs.md)
- [FIFO](./fifo.md)
- [Getters](./getters.md)
