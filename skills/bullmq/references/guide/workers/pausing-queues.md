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

The call above (TypeScript and Python) waits for all the jobs currently being processed by this worker to complete (or fail). Rust and Elixir pause calls return immediately while active jobs continue running; Rust has no `force` option, and Elixir's `force` option currently has no effect.

In TypeScript and Python, to return immediately while current jobs continue running:

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

## Notes

- Global pause uses the `pause()` method of the Queue instance; local pause uses the `pause()` method of the Worker instance.
- A paused worker is idle and does not process new jobs until it is resumed.
- The default behavior of waiting for in-flight jobs (TypeScript and Python) follows the same idea as graceful shutdown.
- Source: https://github.com/taskforcesh/bullmq/blob/v6.7.6/docs/gitbook/guide/workers/pausing-queues.md and https://github.com/taskforcesh/bullmq/blob/v6.7.6/docs/gitbook/guide/workers/graceful-shutdown.md (tag v6.7.6, fetched 2026-11-14).

## Related

- [Graceful Shutdown](./graceful-shutdown.md)
- [Workers](./workers.md)
- [Pause Queue API Reference](https://api.docs.bullmq.io/classes/v5.Queue.html#pause)
- [Pause Worker API Reference](https://api.docs.bullmq.io/classes/v5.Worker.html#pause)
