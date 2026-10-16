# PostgreSQL Backend

BullMQ v6 で追加された、Redis の代わりに PostgreSQL 上で `Queue` / `Worker` / `QueueEvents` / `FlowProducer` の全 API を動かせる pluggable backend。別途 Redis インスタンスを維持したくない場合や、ジョブデータをリレーショナルデータと同居させたい場合に選択できる。

## Signature / Usage

### Requirements

- **PostgreSQL 13+**（14 以降推奨）。接続時にサーバーバージョンを検証し、古い場合は `UnsupportedPostgresVersionError` を投げる（`skipVersionCheck: true` で回避可能）
- **`pg`（node-postgres）パッケージ**が optional peer dependency として必要。`npm install pg` を明示的に実行する

### Usage

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

TypeScript はバックエンド型と接続型をファクトリーから推論する（型引数を書かない場合）。

```typescript
import { Queue, Worker, createPostgresBackend } from 'bullmq';

const opts = {
  connection: 'postgres://user:password@localhost:5432/mydb',
};

const queue = new Queue('my-queue', opts, createPostgresBackend);

const worker = new Worker(
  'my-queue',
  async job => {
    // Redis バックエンドと同じようにジョブを処理する
  },
  opts,
  createPostgresBackend,
);
```

### Typed jobs and event results (v6.3.9+)

バックエンド型・接続型の型パラメーターはジョブ型パラメーターの後ろにある。ファクトリーからの推論は型引数を一切書かない場合のみ有効。`Queue<MyData, MyResult>` のように書くと残りの型パラメーターは Redis 既定に戻り、PostgreSQL のファクトリーと接続が拒否される。

```typescript
// Error: backend が RedisQueueBackend の既定になる
new Queue<MyData, MyResult>('my-queue', opts, createPostgresBackend);
```

ジョブ型を維持するには全型引数を列挙する。クラスごとにバックエンドの位置が異なる。

```typescript
import {
  JobProgress,
  Queue,
  QueueEvents,
  Worker,
  createPostgresBackend,
  PostgresConnectionOptions,
  PostgresQueueBackend,
} from 'bullmq';

const queue = new Queue<
  MyData,
  MyResult,
  string,
  MyData,
  MyResult,
  string,
  PostgresQueueBackend,
  PostgresConnectionOptions
>('my-queue', opts, createPostgresBackend);

const worker = new Worker<
  MyData,
  MyResult,
  string,
  PostgresQueueBackend,
  JobProgress,
  PostgresConnectionOptions
>('my-queue', async job => job.data.value * 2, opts, createPostgresBackend);

const events = new QueueEvents<
  MyResult,
  PostgresQueueBackend,
  PostgresConnectionOptions
>('my-queue', opts, createPostgresBackend);
```

`withBackend` はより簡潔な方法。`Queue` / `Worker` / `QueueEvents` / `QueueEventsProducer` / `FlowProducer` のコンストラクターを、バックエンド型と接続型を設定済みの状態で返し、ファクトリーを自動的に使う。ジョブの型引数だけを書けばよい。

```typescript
import { createPostgresBackend, withBackend } from 'bullmq';

const { Queue, Worker, QueueEvents } = withBackend(createPostgresBackend);

const queue = new Queue<MyData, MyResult>('my-queue', opts);
const worker = new Worker<MyData, MyResult>(
  'my-queue',
  async job => job.data.value * 2,
  opts,
);
const events = new QueueEvents<MyResult>('my-queue', opts);
```

返されるクラスは通常のクラスを継承するため `instanceof Queue` は維持される。接続オプションは必須。`withBackend` はプロセス全体の既定バックエンドを変更しない。

### Using it everywhere by default

アプリケーション全体で PostgreSQL を使う場合、プロセス全体の既定バックエンドとして 1 回登録すればインスタンスごとの引数を省略できる。

```javascript
import { setDefaultBackendFactory, createPostgresBackend, Queue } from 'bullmq';

setDefaultBackendFactory(createPostgresBackend);

// 以降に生成する全クラスが PostgreSQL バックエンドを既定にする
const queue = new Queue('my-queue', {
  connection: 'postgres://user:password@localhost:5432/mydb',
});
```

この JavaScript 例は実行時挙動のみを変える。TypeScript はプロセス全体の設定から型を推論できないため、PostgreSQL の接続型を推論させるには `withBackend(createPostgresBackend)` を使うか各コンストラクターに `createPostgresBackend` を渡す。

## Connection Options

`connection` は3種類の形式を受け付ける。

| Form | Type | Description |
|------|------|-------------|
| Connection string | `string` | `postgres://user:pass@host:5432/db` 形式 |
| Pool config object | object | `host` / `port` / `user` / `password` / `database` / `max`（プールサイズ）/ `schema`（任意のカスタムスキーマ） |
| Existing pool | `pg.Pool` | 既存の `pg.Pool` インスタンス |

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

接続時にマイグレーションは自動適用されない。デプロイ手順の 1 ステップでスキーマの初期化・更新を明示的に実行する。

```typescript
import { Pool } from 'pg';
import { runMigrations } from 'bullmq';

const pool = new Pool({
  connectionString: 'postgres://localhost:5432/mydb',
});
const client = await pool.connect();
try {
  await runMigrations(client);
} finally {
  client.release();
  await pool.end();
}
```

- **冪等**: 再実行しても何も起きない
- **並行実行に安全**: トランザクションスコープの advisory lock（スキーマ単位の名前空間）が同時起動を直列化し、多数のワーカー/インスタンスが同時に起動しても 1 回だけマイグレーションされる

スキーマの互換性は BullMQ のメジャーバージョン単位。migration ledger がスキーマの要求する最小クライアントメジャーを記録し、それより古いクライアントは `SchemaVersionMismatchError` で失敗する。最初のマイグレーション分割は同一メジャー内の例外で、今後のスキーマ移行は破壊的変更として新しい BullMQ メジャーを要する。スキーマのダウングレードは非サポート。

## How it works

PostgreSQL バックエンドは BullMQ のプリミティブを PostgreSQL の機能に対応づける。

- ジョブとその状態はスキーマ内の通常のテーブルに置かれる。状態遷移はトランザクション内の SQL 関数として実行され、Redis の Lua スクリプトと同じ原子性を保証する
- ブロッキングの wait-for-job（Redis の `BZPOPMIN`）は `LISTEN` / `NOTIFY` で実装される。プロデューサーがチャンネルへ `NOTIFY` し、各ワーカーは専用の `LISTEN` 接続で起こされる（またはタイムアウト）まで待機する
- 各バックエンドは短命な通常クエリ用の `pg.Pool` と、長寿命の専用 `LISTEN` 接続 1 本を使う
- `pg.Pool` のサイズ（`max`）は 1 バックエンドが同時実行できるクエリ数を制限する。専用 `LISTEN` 接続は別枠でプール枠を消費しない。サーバーの `max_connections` は同時に動かすワーカー・キュー・QueueEvents の数に合わせてサイジングする

## Performance Characteristics

- 低レイテンシーネットワークでは単一操作のレイテンシーは Redis と同等
- PostgreSQL の耐久性のあるトランザクション書き込み（WAL・MVCC・デフォルト fsync）により、処理スループットは Redis の約 1.5〜2 倍遅い
- `addBulk` やフローなどのバルク操作はバッチ単位でコストが償却されるため Redis 性能に近づく

### Indicative numbers

Apple Silicon ラップトップ（M シリーズ、約 12 コア）上でローカルの PostgreSQL、何もしない軽量ジョブ、既定（durable）設定で計測した目安値。桁感を示すだけで、実際のペイロードやプロセッサーでは変わる。Redis 列は同一マシンでの参考値であり正式なベンチマークではない。

| Operation | PostgreSQL | Redis (same machine) |
| --- | --- | --- |
| `add()`, one at a time | ~7,000 jobs/s | ~7,500 jobs/s |
| `add()`, concurrently (`Promise.all`) | ~15,000 jobs/s | ~38,000 jobs/s |
| `addBulk()`, batched + concurrent | ~45,000 jobs/s | ~52,000 jobs/s |
| Processing, 1 worker (concurrency 1) | ~2,300 jobs/s | ~6,000 jobs/s |
| Processing, concurrency 8–32 | ~11,000 jobs/s | ~18,000 jobs/s |

- 逐次 `add()` とバッチ `addBulk()` は Redis に近い（durable 書き込みがラウンドトリップまたはバッチ単位で償却される）
- 並列 add や高 concurrency の処理では Redis のインメモリモデルが優位になり、処理では PostgreSQL は約 1.5〜2 倍の差になる

## Optimization Tips

- PostgreSQL と worker を同一ホスト/同一アベイラビリティゾーンに配置しネットワークレイテンシーを最小化する
- `max`（プールサイズ）と PostgreSQL の `max_connections` を concurrency に合わせてサイジングする
- 耐久性要件が許容できるなら `synchronous_commit = off` または `local` を検討し、永続性とスループットをトレードオフする
- `removeOnComplete` / `removeOnFail` を活用しテーブルの肥大化を防ぐ

## Notes

- Migration (v6.0 → v6.1): automatic migrations on first connect were removed; call `runMigrations` explicitly from a deployment step (see Migrations)
- 完全な API パリティを持つ（queues・workers・flows・job schedulers・rate limiting・prioritization・delayed jobs・deduplication・metrics・events）。Redis 固有機能（raw client アクセス・Redis Cluster 設定）は対象外で、代わりに PostgreSQL 側の `max_connections` をチューニングする
- `getBackend()` は現在設定されているバックエンドを返す。Redis 専用の escape hatch（raw Redis `client`、`redisVersion` など）は Redis バックエンドのときだけ存在する
- 既存プールを渡した場合、`schema` オプションは効かない。`search_path` を接続側で自前設定する必要がある
- 自前で `IQueueBackend` を実装する場合の破壊的変更については [Migrate from v5 to v6](../migrations/migrate-from-v5-to-v6.md) を参照

## Related

- [Connections](../connections.md)
- [Migrate from v5 to v6](../migrations/migrate-from-v5-to-v6.md)
- [Architecture](../architecture.md)
