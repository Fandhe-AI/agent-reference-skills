# Bull to BullMQ

Bull と BullMQ は大きく異なるため、後方互換性は保証されない。段階的な移行戦略を推奨する。

## Migration Strategy

安全な移行手順:

1. BullMQ 専用の新しいキューを作成する（別の名前またはカスタム prefix を使用）
2. Bull と BullMQ のワーカーを並行して実行する
3. 新しいジョブの送信先を BullMQ キューに切り替える
4. レガシーの Bull キューが完全にドレインされるまで監視する
5. Bull キューが空になったら廃止する

## Configuration Options

2つの設定でキューを分離できる:

- **Worker Prefix Option** — ワーカーレベルでのカスタム prefix
- **Queue Prefix Option** — キューレベルでのカスタム prefix

```typescript
import { Queue as BullMQQueue, Worker as BullMQWorker } from 'bullmq';

// BullMQ キュー（カスタム prefix で Bull と分離）
const bullmqQueue = new BullMQQueue('myQueue', {
  prefix: 'bullmq',
  connection: { host: 'localhost', port: 6379 },
});

const bullmqWorker = new BullMQWorker('myQueue', async job => {
  // 新しいプロセッサロジック
}, {
  prefix: 'bullmq',
  connection: { host: 'localhost', port: 6379 },
});
```

## Notes

- Taskforce.sh などのダッシュボードで移行の進捗を監視し、旧キューが完全にドレインされたことを確認してから廃止すること
- Bull と BullMQ を完全に分離して並行運用することで、ロールバックリスクを最小化できる

## Related

- [./migration-to-newer-versions.md](./migration-to-newer-versions.md)
- [../architecture.md](../architecture.md)
