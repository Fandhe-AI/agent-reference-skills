# AWS ElastiCache

AWS ElastiCache を BullMQ で使用するための設定ガイドです。標準のキャッシュノード構成（サーバーレス版ではない）を使用し、適切なパラメータグループの設定が必要です。

## 前提条件

| 項目 | Description |
|------|-------------|
| 構成タイプ | 標準キャッシュノード構成（サーバーレス版は非対応） |
| サーバーレス非対応の理由 | サーバーレス版は互換性のない `maxmemory-policy` を使用する |
| VPC アクセス | クラスターは AWS 外部からアクセスできない |

## セキュリティグループの設定

ElastiCache インスタンスと BullMQ を実行するサービス間の通信を許可するセキュリティグループを作成します。

| 設定項目 | 値 |
|---------|-----|
| タイプ | カスタム TCP |
| ポート範囲 | 6379 |
| ソース | BullMQ サービスのセキュリティグループまたは CIDR |

## maxmemory-policy の設定

最も重要な設定は `maxmemory-policy` を `noeviction` にすることです。デフォルトのパラメータグループは直接変更できないため、カスタムパラメータグループを作成する必要があります。

### 手順

1. **カスタムパラメータグループを作成**する（ファミリーは `redis7` 推奨）
2. **パラメータ値を編集**して `maxmemory-policy` を探す
3. **値を `noeviction` に変更**する
4. **ElastiCache クラスターに適用**する（Modify 機能を使用）

## 接続設定

```typescript
import { Queue, Worker } from 'bullmq';

const connection = {
  host: 'your-elasticache-endpoint.cache.amazonaws.com',
  port: 6379,
  // TLS が必要な場合
  tls: {},
};

const queue = new Queue('myQueue', { connection });

const worker = new Worker('myQueue', async job => {
  // ジョブ処理
}, { connection });
```

### クラスターモードの場合

```typescript
import { Cluster } from 'ioredis';
import { Queue, Worker } from 'bullmq';

const connection = new Cluster(
  [
    {
      host: 'your-elasticache-cluster-endpoint.cache.amazonaws.com',
      port: 6379,
    },
  ],
  {
    tls: {},
  },
);

const queue = new Queue('{myqueue}', { connection });
const worker = new Worker('{myqueue}', processor, { connection });
```

## 注意点

- **サーバーレス版は使用しないこと** -- 互換性のない maxmemory-policy が使用される
- `maxmemory-policy` は必ず `noeviction` に設定する。これが BullMQ の正常動作に不可欠
- デフォルトのパラメータグループは変更不可のため、カスタムパラメータグループの作成が必須
- クラスターモードを使用する場合は、キュー名にハッシュタグ（`{}`）を使用する
- ElastiCache はクラスター外からアクセスできないため、開発環境からのテストには VPN やポートフォワーディングが必要

## 関連

- [./aws-memorydb.md](./aws-memorydb.md)
- [../redis-compatibility/redis-compatibility.md](../redis-compatibility/redis-compatibility.md)
- [../going-to-production.md](../going-to-production.md)
