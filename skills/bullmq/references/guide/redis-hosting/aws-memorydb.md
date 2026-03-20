# AWS MemoryDB

AWS MemoryDB は Redis 7 互換のマネージドデータベースサービスで、BullMQ と完全に互換性があります。クラスターモードでの運用が必須であり、VPC 内からのみアクセス可能です。

## 考慮事項

| 項目 | Description |
|------|-------------|
| クラスターモード | MemoryDB はクラスターモードでのみ動作する。ハッシュタグの使用が必要 |
| VPC アクセス | MemoryDB は AWS VPC 内からのみアクセス可能。外部からはアクセスできない |
| ハッシュタグ | キューが特定のクラスターノードに紐づくように、キュー名にハッシュタグを使用する |

## 接続設定

IORedis の Cluster インスタンスを使用して接続します。

```typescript
import { Cluster } from 'ioredis';
import { Queue, Worker, Job } from 'bullmq';

const connection = new Cluster(
  [
    {
      host: 'clustercfg.xxx.amazonaws.com',
      port: 6379,
    },
  ],
  {
    tls: {},
  },
);

// Queue の作成
const queue = new Queue('{myqueue}', { connection });

// Worker の作成
const worker = new Worker(
  '{myqueue}',
  async (job: Job) => {
    // ジョブ処理
  },
  { connection },
);

// シャットダウン時は接続とワーカーの両方を閉じる
await worker.close();
await connection.quit();
```

## ハッシュタグの使用

Redis Cluster ではキーのハッシュスロットに基づいてデータが分散されます。BullMQ が正常に動作するには、同一キューの全キーが同じノードに配置される必要があります。

```typescript
// キュー名を中括弧で囲むことでハッシュタグとして機能する
const queue = new Queue('{myqueue}', { connection });
const worker = new Worker('{myqueue}', processor, { connection });
```

## 注意点

- MemoryDB はクラスターモード専用のため、シングルノード構成はサポートされない
- TLS 接続が必須（`tls: {}` オプション）
- VPC 外からのアクセスが必要な場合は、VPN やポートフォワーディングの設定が必要
- シャットダウン時は Worker と Redis 接続の両方を適切に閉じること
- ハッシュタグ（`{}`）を使わないとキーが異なるノードに分散し、BullMQ が正常に動作しない

## 関連

- [./aws-elasticache.md](./aws-elasticache.md)
- [../redis-compatibility/redis-compatibility.md](../redis-compatibility/redis-compatibility.md)
- [../going-to-production.md](../going-to-production.md)
