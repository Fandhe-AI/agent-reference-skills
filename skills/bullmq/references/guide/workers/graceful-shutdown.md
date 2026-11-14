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

- Shutdown behavior and timeout depend on the SDK (v6.7.6 official page). TypeScript, Python, and .NET wait for active jobs to finish without a built-in timeout; in TypeScript, `close()` does not time out by itself, so make sure your jobs finish in a timely manner. Rust's `close(30_000)` waits for up to 30 seconds and aborts unfinished processing when the deadline expires. Elixir waits up to 30 seconds by default; pass `timeout: milliseconds` to choose another deadline, or `force: true` to skip waiting.
- If shutdown ends before active jobs finish (including when `close()` fails or cannot complete), the jobs can be recovered as stalled by other workers (when stalled-job checking is configured).
- Even after an ungraceful shutdown (for example a forced process kill), BullMQ's stalled mechanism lets a new worker take over the jobs and continue.
- Before BullMQ 2.0, a `QueueScheduler` was required to detect stalled jobs; it is not needed since 2.0.

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
