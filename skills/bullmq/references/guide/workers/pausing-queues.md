# BullMQ — Pausing Queues

キューの一時停止と再開をサポートする機能。グローバル一時停止（Queue レベル）とローカル一時停止（Worker レベル）の 2 種類がある。

## グローバル一時停止

キュー全体を一時停止する。すべての Worker が新しいジョブの取得を停止する。

```typescript
await myQueue.pause();
```

一時停止を解除する:

```typescript
await myQueue.resume();
```

## ローカル一時停止

特定の Worker インスタンスのみを一時停止する。

```typescript
await myWorker.pause();
```

上記の呼び出しは、Worker が現在処理中のすべてのジョブが完了（または失敗）するまで待機する。

処理中のジョブを待たずに即座に一時停止する場合:

```typescript
await myWorker.pause(true);
```

一時停止を解除する:

```typescript
myWorker.resume();
```

## 動作の詳細

| 種類 | 対象 | 処理中のジョブ | 新しいジョブ |
|------|------|----------------|-------------|
| グローバル一時停止 | 全 Worker | 完了まで処理を継続 | 取得しない |
| ローカル一時停止 | 該当 Worker のみ | 完了まで処理を継続（`true` で即時停止） | 取得しない |

## 注意点

- グローバル一時停止は Queue インスタンスの `pause()` メソッドを使用し、ローカル一時停止は Worker インスタンスの `pause()` メソッドを使用する
- 一時停止中の Worker はアイドル状態となり、再開されるまで新しいジョブを処理しない
- 処理中のジョブが完了するまで待機するデフォルトの動作は、graceful shutdown と同様の考え方に基づく

## 関連

- [Graceful Shutdown](./graceful-shutdown.md)
- [Workers](./workers.md)
- [Pause Queue API Reference](https://api.docs.bullmq.io/classes/v5.Queue.html#pause)
- [Pause Worker API Reference](https://api.docs.bullmq.io/classes/v5.Worker.html#pause)
