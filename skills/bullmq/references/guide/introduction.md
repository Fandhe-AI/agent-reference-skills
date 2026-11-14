# BullMQ — Introduction

BullMQ は 4 つのコアクラスを中心に構築されたジョブキューライブラリである。Queue でジョブを登録し、Worker で処理し、QueueEvents でイベントを監視し、FlowProducer で親子関係のあるワークフローを構築する。

## コアクラス

### Queue

キューを表現するクラス。ジョブの追加、一時停止、クリーニング、データ取得など基本的な操作を提供する。

```typescript
import { Queue } from 'bullmq';

const myQueue = new Queue('Paint');

await myQueue.add('cars', { color: 'blue' });
```

### Worker

キューからジョブを取り出して処理するインスタンス。複数の Worker を異なる Node.js プロセスやマシンで同時に実行でき、ジョブを completed または failed としてマークする。

```typescript
import { Worker } from 'bullmq';

const worker = new Worker('Paint', async job => {
  // process job
  console.log(job.data);
});
```

### QueueEvents

キューに関連するイベントの監視とハンドリングを可能にするクラス。ジョブの完了、失敗、進捗などのイベントをリッスンできる。

```typescript
import { QueueEvents } from 'bullmq';

const queueEvents = new QueueEvents('Paint');

queueEvents.on('completed', ({ jobId }) => {
  console.log(`Job ${jobId} completed`);
});
```

### FlowProducer

複雑なジョブワークフローのオーケストレーションを実現するクラス。親子関係のあるジョブの依存関係を定義できる。

```typescript
import { FlowProducer } from 'bullmq';

const flowProducer = new FlowProducer();

const flow = await flowProducer.add({
  name: 'renovate-interior',
  queueName: 'renovate',
  children: [
    { name: 'paint', data: { place: 'ceiling' }, queueName: 'steps' },
    { name: 'paint', data: { place: 'walls' }, queueName: 'steps' },
  ],
});
```

## ジョブのライフサイクル

ジョブはユーザーが定義したデータ構造であり、キューに保存される。基本的な流れは以下の通り:

1. **追加**: `Queue.add()` でジョブをキューに投入
2. **待機**: Redis 内のリストでワーカーを待つ（waiting 状態）
3. **処理**: Worker がジョブを取得し処理する（active 状態）
4. **完了/失敗**: 処理結果に応じて completed または failed に遷移

Worker がジョブ追加時に稼働していなくても、接続された時点でキュー内のジョブを自動的に処理する。

## 注意点

- BullMQ は分散処理をサポートしており、複数マシンにまたがるスケーラブルなアーキテクチャを構築可能
- ジョブデータは Redis に保存されるため、シリアライズ可能なデータである必要がある
- Queue, Worker, QueueEvents はそれぞれ独立した Redis 接続を使用できる
- v6.7.6 の公式ガイドでは Queue は job scheduler（cron 式または固定間隔の繰り返しジョブ）の作成にも使われ、QueueEvents は任意のプロセスから全ワーカーの[イベント](./events/README.md)を購読し、FlowProducer は親子依存のあるジョブツリー（[flows](./flows/README.md)）を追加する
- Redis と PostgreSQL の 2 つのバックエンドがある。クラスはデータストア非依存で、各操作を backend に委譲する。Redis は Redis 6.2 以上と Valkey / Dragonfly 等の互換サーバー（ioredis / node-redis / Bun の Redis クライアント / Valkey GLIDE）、PostgreSQL は 13 以上。特記がない限りガイドは両方に適用され、差異は PostgreSQL backend の feature parity 節に記載される
- 6.4.0 で追加された experimental の Relay（プロセス間リアルタイムメッセージング）は [relay/](./relay/README.md) を参照
- 公式ガイドは TypeScript パッケージ（Node.js / Bun）を使う。Python / Elixir / .NET / Rust / PHP の SDK も同じデータモデルを共有し、同じキュー上で言語をまたいで協調できる（[languages](../languages/README.md)）
- Source: https://github.com/taskforcesh/bullmq/blob/v6.7.6/docs/gitbook/guide/introduction.md (tag v6.7.6、取得日 2026-11-14)

## 関連

- [Connections](./connections.md)
- [Queues](./queues/README.md)
- [Workers](./workers/README.md)
