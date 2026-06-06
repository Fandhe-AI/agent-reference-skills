# Graceful Shutdown

SIGTERM シグナルを受け取ったときに処理中のジョブを完了させてから Worker を安全に停止する。

```typescript
import { Worker } from 'bullmq';

const worker = new Worker('myQueue', async job => {
  await longRunningProcess(job.data);
});

// SIGTERM での graceful shutdown
process.on('SIGTERM', async () => {
  console.log('Received SIGTERM, shutting down gracefully...');

  // 新しいジョブの取得を停止し、処理中のジョブが完了するまで待機する
  await worker.close();

  process.exit(0);
});

// SIGINT (Ctrl+C) にも対応する場合
process.on('SIGINT', async () => {
  await worker.close();
  process.exit(0);
});
```

## Notes

- `worker.close()` は新しいジョブの取得を停止し、現在処理中のジョブが完了するまでブロックする
- `close()` 自体はタイムアウトしないため、ジョブが適切な時間内に完了するよう設計する必要がある
- 強制終了が発生した場合でも stalled メカニズムにより別の Worker がジョブを引き継ぐ
- BullMQ 2.0 以降、stalled ジョブの検出に `QueueScheduler` は不要
