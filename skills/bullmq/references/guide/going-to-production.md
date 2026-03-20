# Going to Production

BullMQ ベースのアプリケーションを本番環境にデプロイする際の重要な考慮事項とベストプラクティスをまとめています。Redis の永続化設定、メモリポリシー、エラーハンドリング、グレースフルシャットダウンなど、堅牢な運用に不可欠な設定を網羅します。

## Redis 永続化（Persistence）

BullMQ は Redis ベースのため、永続化を手動で設定する必要があります。多くのホスティングソリューションではデフォルトで永続化が無効です。

**推奨設定**: AOF（Append Only File）を有効にする。通常、1 秒ごとの書き込みで十分です。

```
# redis.conf
appendonly yes
appendfsync everysec
```

## Max Memory Policy

Redis をキャッシュとして使用する場合、メモリ上限に達するとキーが削除されますが、BullMQ ではキーの任意削除は許容されません。

**必須設定**: `maxmemory-policy` を `noeviction` に設定する。これが BullMQ の正常動作を保証する唯一の設定です。

```
# redis.conf
maxmemory-policy noeviction
```

## 自動再接続

本番環境では Redis との接続が切断される可能性があります。IORedis の以下のオプションを適切に設定することが重要です。

| Option | Queue での推奨値 | Worker での推奨値 | Description |
|--------|-----------------|------------------|-------------|
| `retryStrategy` | カスタム | カスタム | リトライ間隔の計算関数 |
| `maxRetriesPerRequest` | デフォルト | `null` | リクエストあたりの最大リトライ回数 |
| `enableOfflineQueue` | `false` | `true`（デフォルト） | オフラインキューの有効化 |

### retryStrategy

BullMQ のデフォルトでは指数バックオフ（最小 1 秒、最大 20 秒）を使用します。

```typescript
retryStrategy: function (times: number) {
  return Math.max(Math.min(Math.exp(times), 20000), 1000);
}
```

### maxRetriesPerRequest

Worker では必ず `null` に設定します。デフォルトでそう設定されますが、既存の IORedis インスタンスを渡す場合は注意が必要です。

### enableOfflineQueue

`Queue` では `false` にしてフェイルファストを実現し、`Worker` ではデフォルト（`true`）のままにして再接続まで待機させます。

## エラーログ

接続問題のデバッグと「unhandled errors」防止のため、error イベントハンドラを設定します。

```typescript
worker.on('error', (err) => {
  logger.error(err, 'Worker error');
});

queue.on('error', (err) => {
  logger.error(err, 'Queue error');
});
```

## グレースフルシャットダウン

サーバー再起動時にストールジョブを最小限にするため、`SIGINT` と `SIGTERM` シグナルをハンドリングします。

```typescript
const gracefulShutdown = async (signal: string) => {
  console.log(`Received ${signal}, closing server...`);
  await worker.close();
  // その他の非同期クリーンアップ
  process.exit(0);
};

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
```

| Signal | 説明 |
|--------|------|
| `SIGINT` | ターミナルで Ctrl+C が押された場合 |
| `SIGTERM` | Kubernetes、PM2 などのオーケストレーションツールからの終了要求 |

## ジョブの自動削除

デフォルトでは完了・失敗したジョブは永遠に保持されます。適切な自動削除を設定してください。

```typescript
const queue = new Queue('myQueue', {
  defaultJobOptions: {
    removeOnComplete: {
      count: 100, // 最新100件の完了ジョブを保持
    },
    removeOnFail: {
      count: 5000, // 最新5000件の失敗ジョブを保持
    },
  },
});
```

## データの保護

ジョブの data フィールドは平文で Redis に保存されます。

- **推奨**: 機密データをジョブに含めない
- **やむを得ない場合**: キューに追加する前にデータを暗号化する

## 未処理の例外とリジェクション

NodeJS はデフォルトで未処理の例外でクラッシュします。以下のハンドラを設定してください。

```typescript
process.on('uncaughtException', function (err) {
  logger.error(err, 'Uncaught exception');
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error({ promise, reason }, 'Unhandled Rejection at: Promise');
});
```

## 注意点

- AOF 永続化はパフォーマンスに影響するため、ベンチマークで許容範囲を確認すること
- `maxmemory-policy` が `noeviction` 以外だと、ロックキーが期限前に削除される可能性がある
- Worker の `maxRetriesPerRequest` を `null` 以外にすると、Redis コマンドの例外でワーカーが壊れる
- グレースフルシャットダウンでもジョブの処理時間がグレース期間を超える場合、ストールは避けられない
- セキュリティは軽視せず、データ漏洩やビジネスへの経済的損害のリスクを真剣に考慮すること

## 関連

- [./architecture.md](./architecture.md)
- [./troubleshooting.md](./troubleshooting.md)
- [./rate-limiting.md](./rate-limiting.md)
- [./redis-compatibility/redis-compatibility.md](./redis-compatibility/redis-compatibility.md)
- [./redis-hosting/aws-memorydb.md](./redis-hosting/aws-memorydb.md)
