# BullMQ — Removing Jobs

キューからジョブを削除する 3 つのメソッド（drain, clean, obliterate）を提供する。それぞれ削除対象と動作が異なる。

## Drain

waiting または delayed 状態のジョブを削除する。active、waiting-children、completed、failed 状態のジョブは保持される。

```typescript
import { Queue } from 'bullmq';

const queue = new Queue('paint');

// waiting ジョブのみ削除
await queue.drain();
```

delayed ジョブも含めて削除する場合:

```typescript
// delayed ジョブも削除
await queue.drain(true);
```

## Clean

特定の状態のジョブを、grace period（猶予期間）を考慮して削除する。

```typescript
import { Queue } from 'bullmq';

const queue = new Queue('paint');

const deletedJobIds = await queue.clean(
  60000, // 1分以上経過したジョブ
  1000,  // 最大 1000 件削除
  'paused',
);
```

### パラメータ

| Name | Type | Description |
|------|------|-------------|
| `grace` | `number` | 猶予期間（ミリ秒）。この時間以上経過したジョブが対象 |
| `limit` | `number` | 一度に削除するジョブの最大数 |
| `type` | `string` | 対象のジョブ状態（`completed`, `failed`, `paused`, `delayed`, `wait`） |

## Obliterate

キューとすべての関連データを完全に削除する。デフォルトでは active ジョブは保持される。

```typescript
import { Queue } from 'bullmq';

const queue = new Queue('paint');

await queue.obliterate();
```

active ジョブも含めて強制削除する場合:

```typescript
// active ジョブを含めて強制削除
await queue.obliterate({ force: true });
```

## 注意点

- 3 つのメソッドすべてが、異なるキューにまたがる親ジョブの関係を考慮する。子ジョブが他のキューに存在する場合、親ジョブは waiting-children 状態を維持する
- `drain` はキューを空にするが、キュー自体は削除しない。キューごと削除するには `obliterate` を使用する
- `clean` は grace period により、最近のジョブを保護しながら古いジョブを削除できる

## 関連

- [Queues](./queues.md)
- [Drain API Reference](https://api.docs.bullmq.io/classes/v5.Queue.html#drain)
- [Clean API Reference](https://api.docs.bullmq.io/classes/v5.Queue.html#clean)
- [Obliterate API Reference](https://api.docs.bullmq.io/classes/v5.Queue.html#obliterate)
