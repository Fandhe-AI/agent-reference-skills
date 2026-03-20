# BullMQ — Connections

BullMQ は Redis への接続に ioredis モジュールを使用する。Queue や Worker の各インスタンスに接続設定を渡す方法、共有接続の注意点、および必須の Redis 設定について説明する。

## 基本的な接続

接続オプションを指定しない場合、デフォルトで `localhost:6379` に接続する。

```typescript
import { Queue, Worker } from 'bullmq';

// 各インスタンスに個別の接続設定を渡す
const myQueue = new Queue('myqueue', {
  connection: {
    host: 'myredis.taskforce.run',
    port: 32856,
  },
});

const myWorker = new Worker('myqueue', async job => {}, {
  connection: {
    host: 'myredis.taskforce.run',
    port: 32856,
  },
});
```

## 接続の共有（Reusing Connections）

### Producer 間の共有

Queue（Producer）同士は ioredis インスタンスを共有できる。

```typescript
import { Queue } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis();

// 2つの Producer で同じ接続を再利用
const myFirstQueue = new Queue('myFirstQueue', { connection });
const mySecondQueue = new Queue('mySecondQueue', { connection });
```

### Consumer 間の共有

Worker（Consumer）間で接続を共有する場合、`maxRetriesPerRequest: null` の設定が必須。

```typescript
import { Worker } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis({ maxRetriesPerRequest: null });

// 2つの Consumer で同じ接続を再利用
const myFirstWorker = new Worker('myFirstWorker', async job => {}, {
  connection,
});
const mySecondWorker = new Worker('mySecondWorker', async job => {}, {
  connection,
});
```

## 接続オプション

| Name | Type | Description |
|------|------|-------------|
| `host` | `string` | Redis ホスト名（デフォルト: `localhost`） |
| `port` | `number` | Redis ポート番号（デフォルト: `6379`） |
| `password` | `string` | Redis 認証パスワード |
| `db` | `number` | Redis データベース番号 |
| `maxRetriesPerRequest` | `number \| null` | リクエストあたりの最大リトライ数。Worker では `null` 必須 |
| `prefix` | `string` | BullMQ キーのプレフィックス |

## Producer と Consumer の違い

- **Producer**（HTTP エンドポイントからジョブを追加する場合）: デフォルトのリトライ設定、または `maxRetriesPerRequest: 1` のように低い値を使用し、Redis 不通時に速やかに失敗させる
- **Consumer**（バックグラウンドワーカー）: 非同期で動作するため、より多くのリトライ回数を許容できる。`maxRetriesPerRequest: null` が推奨

## 注意点

- **keyPrefix を使用しないこと**: ioredis の `keyPrefix` オプションは使用禁止。BullMQ は独自のキー・プレフィックス機構（`prefix` オプション）を提供している
- **maxmemory-policy**: Redis の設定で `maxmemory-policy=noeviction` が必須。これを設定しないと、Redis がキーを自動削除し BullMQ の動作が壊れる可能性がある
- **QueueScheduler / QueueEvents**: これらはブロッキング接続を必要とするため、接続の共有ができない

## 関連

- [Introduction](./introduction.md)
- [Queues](./queues/README.md)
- [Workers](./workers/README.md)
