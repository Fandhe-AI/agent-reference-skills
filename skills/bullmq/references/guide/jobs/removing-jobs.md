# BullMQ — Removing Jobs

不正なデータを持つジョブの削除など、キューからジョブを手動で削除する必要がある場合に使用します。

## 基本的な使い方

```typescript
import { Queue } from 'bullmq';

const queue = new Queue('paint');

const job = await queue.add('wall', { color: 1 });

await job.remove();
```

## 親ジョブがある場合

子ジョブを削除する際、親ジョブへの影響は2つのケースがあります。

| ケース | 親の状態 | 動作 |
|--------|----------|------|
| 保留中の依存関係なし | waiting に移動 | 親ジョブの処理が試行される |
| 保留中の依存関係あり | waiting-children のまま | 親ジョブは他の子の完了を待つ |

> **Note:** 削除時に子ジョブが **completed** 状態だった場合、処理済みの値は親の processed hset に保持されます。

## 保留中の依存関係がある場合

保留中のすべての子孫ジョブを先に削除しようと試みます。

> **Warning:** 子ジョブのいずれかがロックされている場合、削除プロセスは停止します。

## 注意点

- ロックされたジョブ（active 状態）は削除できない。削除を試みるとエラーがスローされる
- 親ジョブとの依存関係がある場合、子ジョブの削除は親の状態に影響する
- 子孫ジョブにロックされているものがある場合、削除処理全体が中断される

## 関連

- [Jobs](./jobs.md)
- [Stalled](./stalled.md)
- [Getters](./getters.md)
