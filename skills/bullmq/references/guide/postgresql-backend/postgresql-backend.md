# PostgreSQL Backend

BullMQ v6 で追加された、Redis の代わりに PostgreSQL 上で `Queue` / `Worker` / `QueueEvents` / `FlowProducer` の全 API を動かせる pluggable backend。別途 Redis インスタンスを維持したくない場合や、ジョブデータをリレーショナルデータと同居させたい場合に選択できる。

## Requirements

- **PostgreSQL 13+**（14 以降推奨）。接続時にサーバーバージョンを検証し、古い場合は `UnsupportedPostgresVersionError` を投げる（`skipVersionCheck: true` で回避可能）
- **`pg`（node-postgres）パッケージ**が optional peer dependency として必要。`npm install pg` を明示的に実行する

## Signature / Usage

`createPostgresBackend` を各クラスのコンストラクタ最終引数として渡す。

```typescript
import { Queue, createPostgresBackend } from 'bullmq';

const queue = new Queue('my-queue', opts, createPostgresBackend);
```

| Class | Constructor |
|---|---|
| `Queue` | `new Queue(name, opts, createPostgresBackend)` |
| `Worker` | `new Worker(name, processor, opts, createPostgresBackend)` |
| `QueueEvents` | `new QueueEvents(name, opts, createPostgresBackend)` |
| `FlowProducer` | `new FlowProducer(opts, createPostgresBackend)` |

アプリケーション全体のデフォルトバックエンドとして設定することもできる。

```typescript
import { setDefaultBackendFactory, createPostgresBackend } from 'bullmq';

setDefaultBackendFactory(createPostgresBackend);
// 以降に生成する全クラスが PostgreSQL を使用する
```

## Connection Options

`connection` は3種類の形式を受け付ける。

```typescript
// 1. 接続文字列
{ connection: 'postgres://user:pass@localhost:5432/mydb' }

// 2. プールの設定オブジェクト
{
  connection: {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'mydb',
    max: 10,           // プールサイズ
    schema: 'bullmq',  // 任意のカスタムスキーマ
  }
}

// 3. 既存の pg.Pool インスタンス
import { Pool } from 'pg';
const pool = new Pool({ connectionString: 'postgres://…' });
({ connection: pool });
```

BullMQ がプールを生成した場合はそのライフサイクルを管理するが、既存プールを渡した場合は呼び出し側が close する責任を持つ。

## Schema

BullMQ のオブジェクトは単一の PostgreSQL スキーマ（既定値: `bullmq`）にまとめて配置され、アプリケーションデータと分離される。

```typescript
{
  connection: {
    connectionString: 'postgres://...',
    schema: 'jobs',
  }
}
```

## Migrations

マイグレーションは最初の `waitUntilReady()` 呼び出し時に自動実行される。

- **冪等**: 何度実行しても影響がない
- **並行実行に安全**: トランザクションスコープの advisory lock によりレースコンディションを防ぐ

手動でのマイグレーション操作は不要。スキーマのダウングレードは非サポートで、新しいコードがマイグレーションした DB に古い BullMQ バージョンが接続すると `SchemaVersionMismatchError` を投げる。

## Performance Characteristics

- 低レイテンシーネットワークでは単一操作のレイテンシーは Redis と同等
- PostgreSQL の耐久性のあるトランザクション書き込み（WAL・MVCC・デフォルト fsync）により、処理スループットは Redis の約 1.5〜2 倍遅い
- `addBulk` やフローなどのバルク操作はバッチ単位でコストが償却されるため Redis 性能に近づく

## Optimization Tips

- PostgreSQL と worker を同一ホスト/同一アベイラビリティゾーンに配置しネットワークレイテンシーを最小化する
- `max`（プールサイズ）と PostgreSQL の `max_connections` を concurrency に合わせてサイジングする
- 耐久性要件が許容できるなら `synchronous_commit = off` または `local` を検討し、永続性とスループットをトレードオフする
- `removeOnComplete` / `removeOnFail` を活用しテーブルの肥大化を防ぐ

## Notes

- 完全な API パリティを持つ（queues・workers・flows・job schedulers・rate limiting・prioritization・delayed jobs・deduplication・events）。Redis 固有機能（raw client アクセス・Redis Cluster 設定）は対象外で、代わりに PostgreSQL 側の `max_connections` をチューニングする
- 既存プールを渡した場合、`schema` オプションは効かない。`search_path` を接続側で自前設定する必要がある
- 自前で `IQueueBackend` を実装する場合の破壊的変更については [Migrate from v5 to v6](../migrations/migrate-from-v5-to-v6.md) を参照

## Related

- [Connections](../connections.md)
- [Migrate from v5 to v6](../migrations/migrate-from-v5-to-v6.md)
- [Architecture](../architecture.md)
