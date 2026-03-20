# BullMQ — Queues

Queue は処理待ちジョブのリストを管理する軽量クラスである。ジョブはメッセージブローカー用の小さなメッセージから、長時間実行されるタスクまで柔軟に扱える。

## キューの作成

```typescript
import { Queue } from 'bullmq';

const queue = new Queue('Cars');
```

Queue をインスタンス化すると、BullMQ は小さな「meta-key」を upsert する。既存のキューがあればそのまま引き継ぎ、ジョブの追加を続行できる。

## ジョブの追加

`add` メソッドでジョブをキューに追加する。

```typescript
await queue.add('paint', { color: 'red' });
```

上記のコードは `paint` という名前のジョブを `{ color: 'red' }` のペイロードでキューに追加する。ジョブは Redis のリストに保存され、Worker が接続するまで待機する。

## ジョブオプション

オプションオブジェクトを指定することで、ジョブの動作を大幅に変更できる。

### 遅延ジョブ

```typescript
await queue.add('paint', { color: 'blue' }, { delay: 5000 });
```

ジョブは少なくとも 5 秒待ってから処理される。

### 主要なオプション

| Name | Type | Description |
|------|------|-------------|
| `delay` | `number` | ジョブの処理を遅延させるミリ秒数 |
| `priority` | `number` | ジョブの優先度（小さい値ほど高優先度） |
| `lifo` | `boolean` | `true` で LIFO（後入れ先出し）動作 |
| `removeOnComplete` | `boolean \| number \| KeepJobs` | 完了時の自動削除設定 |
| `removeOnFail` | `boolean \| number \| KeepJobs` | 失敗時の自動削除設定 |
| `attempts` | `number` | 最大リトライ回数 |
| `backoff` | `BackoffOptions` | リトライ間のバックオフ設定 |
| `jobId` | `string` | カスタムジョブ ID（冪等性の確保に使用） |
| `repeat` | `RepeatOptions` | 繰り返し実行の設定 |

## 注意点

- BullMQ 2.0 以前では、遅延ジョブの動作に `QueueScheduler` が必要だった。2.0 以降では不要
- Worker がジョブ追加時に稼働していなくても、接続した時点で自動的に処理が開始される
- ジョブデータはシリアライズ可能である必要がある

## 関連

- [Connections](../connections.md)
- [Auto-removal of jobs](./auto-removal-of-jobs.md)
- [Adding jobs in bulk](./adding-bulks.md)
- [Queue API Reference](https://api.docs.bullmq.io/classes/v5.Queue.html)
