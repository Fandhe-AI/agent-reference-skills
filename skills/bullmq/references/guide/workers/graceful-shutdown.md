# BullMQ — Graceful Shutdown

Worker の安全な停止をサポートする機能。stalled ジョブを最小化するために、処理中のジョブが完了するまで待機してから停止する。

## 基本的な使い方

```typescript
await worker.close();
```

`close()` を呼び出すと、Worker は以下の動作をする:

1. Worker を「closing」状態としてマークし、新しいジョブの取得を停止する
2. 現在処理中のすべてのジョブが完了（または失敗）するまで待機する

## Notes

- シャットダウンの挙動とタイムアウトは SDK ごとに異なる（v6.7.6）。TypeScript / Python / .NET は組み込みタイムアウトなしでアクティブジョブの完了を待つ。Rust の `close(30_000)` は最大 30 秒待ち、期限を過ぎると未完了の処理を中断する。Elixir は既定で最大 30 秒待ち、`timeout: milliseconds` で期限を変更、`force: true` で待機をスキップできる。TypeScript では `close()` 自体はタイムアウトしないため、ジョブが適切な時間内に完了するよう設計する必要がある
- シャットダウンがアクティブジョブの完了前に終わった場合（`close()` が失敗・未完了を含む）、ジョブは他の Worker によって stalled として回復され得る（stalled チェックが設定されている場合）
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

## Related

- [Stalled Jobs](./stalled-jobs.md)
- [Workers](./workers.md)
