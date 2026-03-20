# BullMQ Pro Max Group Size

グループ内のジョブ数を制限する機能。`maxSize` オプションでグループの最大サイズを設定し、超過した場合は例外をスローする。

## 実装例

```typescript
import { QueuePro, GroupMaxSizeExceededError } from '@taskforcesh/bullmq-pro';

const queue = new QueuePro('myQueue', { connection });
const groupId = 'my group';

try {
  await queue.add('paint', { foo: 'bar' }, {
    group: {
      id: groupId,
      maxSize: 7, // グループ内最大7ジョブ
    },
  });
} catch (err) {
  if (err instanceof GroupMaxSizeExceededError) {
    console.log(`Job discarded for group ${groupId}`);
  } else {
    throw err;
  }
}
```

## 動作

- グループが `maxSize` に達すると、新しいジョブの追加時に `GroupMaxSizeExceededError` がスローされる
- エラーをキャッチして適切にハンドリングすることで、ジョブの破棄やリトライロジックを実装できる

## 注意点

- `maxSize` オプションは `addBulk` メソッドでは使用できない（個別のジョブ追加のみ対応）
- 超過分のジョブを破棄しても問題ない場合に使用する
- `maxSize` はジョブ追加時に毎回指定する必要がある

## 関連

- [./groups.md](./groups.md) - Groups の基本
- [./concurrency.md](./concurrency.md) - グループ単位の並行処理
- [./rate-limiting.md](./rate-limiting.md) - グループ単位のレート制限
