# BullMQ — Graceful Shutdown

Worker の安全な停止をサポートする機能。stalled ジョブを最小化するために、処理中のジョブが完了するまで待機してから停止する。

## 基本的な使い方

```typescript
await worker.close();
```

`close()` を呼び出すと、Worker は以下の動作をする:

1. Worker を「closing」状態としてマークし、新しいジョブの取得を停止する
2. 現在処理中のすべてのジョブが完了（または失敗）するまで待機する

## 注意点

- `close()` 自体はタイムアウトしない。ジョブが適切な時間内に完了するよう設計する必要がある
- `close()` が失敗した場合、または完了できなかった場合、保留中のジョブは stalled としてマークされ、他の Worker によって再処理される（適切な stalled オプションが設定されている場合）
- 「ungraceful shutdown」（プロセスの強制終了など）が発生しても、BullMQ の stalled メカニズムにより新しい Worker がジョブを引き継いで処理を継続できる
- BullMQ 2.0 以前では、stalled ジョブの検出に `QueueScheduler` が必要だった。2.0 以降では不要

## シャットダウンのベストプラクティス

```typescript
// SIGTERM シグナルでの graceful shutdown
process.on('SIGTERM', async () => {
  console.log('Received SIGTERM, shutting down gracefully...');
  await worker.close();
  process.exit(0);
});
```

## 関連

- [Stalled Jobs](./stalled-jobs.md)
- [Workers](./workers.md)
