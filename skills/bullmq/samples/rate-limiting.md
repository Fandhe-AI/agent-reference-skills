# Rate Limiting

Worker の limiter オプションでジョブの処理速度をグローバルに制限する。

```typescript
import { Worker } from 'bullmq';

// 静的レート制限: 1秒あたり最大 10 ジョブ
const worker = new Worker('painter', async job => paintCar(job), {
  limiter: {
    max: 10,
    duration: 1000,
  },
});

// 動的レート制限: 外部 API の 429 応答に対応する
const worker2 = new Worker(
  'apiQueue',
  async () => {
    const [isRateLimited, duration] = await doExternalCall();
    if (isRateLimited) {
      await worker2.rateLimit(duration);
      // 失敗ではなくレート制限として処理するために専用エラーを throw
      throw Worker.RateLimitError();
    }
  },
  {
    connection,
    limiter: {
      max: 1,
      duration: 500,
    },
  },
);
```

## Notes

- `limiter` はグローバルに適用され、複数 Worker が同じキューを処理している場合も合計で制限される
- レート制限に達したジョブは failed にならず wait 状態に留まる
- 動的レート制限では `Worker.RateLimitError()` を throw し忘れると失敗として処理される
- 動的レート制限使用時は `limiter.max` の指定が必須
