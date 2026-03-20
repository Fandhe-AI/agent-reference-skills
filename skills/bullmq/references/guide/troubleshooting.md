# Troubleshooting

BullMQ を使用する際によく遭遇するエラーとその解決策をまとめています。ロックの消失、環境変数の問題など、一般的なトラブルシューティング情報を提供します。

## Missing Locks エラー

### エラーメッセージ

```
Missing lock for job 1234. moveToFinished.
```

### 原因

ワーカーがジョブを処理する際、そのジョブの「所有権」を示すロックキーが必要です。このロックが削除されると、ワーカーがジョブを完了または失敗状態に移動しようとした際にこのエラーが発生します。

### ロックが削除される主な原因

| 原因 | Description | 対策 |
|------|-------------|------|
| CPU 過負荷 | ワーカーが CPU を消費しすぎて 30 秒以内にロックを更新できない | concurrency の調整、ジョブの分割 |
| Redis 接続断 | ワーカーが Redis との通信を失い、ロックを更新できない | 接続の安定化、retryStrategy の設定 |
| ジョブの強制削除 | BullMQ の API でジョブまたはキュー全体が削除された | 処理中のジョブの削除を避ける |
| maxmemory-policy | Redis が `noeviction` 以外のポリシーで、期限付きキーを先に削除 | `noeviction` に設定する |

### 対処法

```typescript
// ロックの有効期限を延長する
const worker = new Worker('myQueue', async job => {
  // 長時間処理の場合、lockDuration を延長
}, {
  lockDuration: 60000, // 60秒（デフォルトは30秒）
  lockRenewTime: 15000, // 15秒ごとにロックを更新
});
```

## 環境変数の未定義・無効値エラー

### エラーメッセージ

```
ERR Error running script ... Lua redis() command arguments must be strings or integers
```

### 原因

環境変数が以下の状態で BullMQ メソッドに渡された場合に発生します:

- 未定義（`undefined`）
- 空文字列（`""`）
- 文字列・整数以外の値（オブジェクトや配列など）

### ベストプラクティス

#### 1. 環境変数の早期バリデーション

```typescript
const queueName = process.env.QUEUE_NAME;
if (!queueName) {
  throw new Error('QUEUE_NAME is not defined or is empty.');
}

const queue = new Queue(queueName, { connection });
```

#### 2. TypeScript の strictNullChecks を有効化

```json
{
  "compilerOptions": {
    "strictNullChecks": true
  }
}
```

`string | undefined` として型付けされた環境変数を、適切なチェックなしで使用するとコンパイル時エラーになります。

#### 3. デフォルト値の設定

```typescript
const queueName = process.env.QUEUE_NAME ?? 'defaultQueue';
```

## その他の一般的な問題

### Redis 接続エラー

```typescript
// 接続オプションの確認
const connection = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  maxRetriesPerRequest: null, // Worker では必須
};
```

### ストールジョブ

ジョブがストールする主な原因と対策:

| 原因 | 対策 |
|------|------|
| ワーカーの突然のクラッシュ | グレースフルシャットダウンの実装 |
| 処理時間がロック有効期限を超過 | `lockDuration` の延長 |
| Redis 接続の不安定 | 接続設定の最適化 |

```typescript
// ストール検出の設定
const worker = new Worker('myQueue', processor, {
  stalledInterval: 30000, // 30秒ごとにストールチェック（デフォルト）
  maxStalledCount: 1, // 最大ストール回数（デフォルト）
});
```

## 注意点

- `maxmemory-policy` が `noeviction` に設定されているか必ず確認する
- Worker の `maxRetriesPerRequest` は必ず `null` に設定する
- 環境変数は BullMQ に渡す前に必ずバリデーションする
- CPU インテンシブなジョブでは `lockDuration` を十分長く設定する
- error イベントハンドラを必ず設定して「unhandled errors」を防ぐ

## 関連

- [./going-to-production.md](./going-to-production.md)
- [./architecture.md](./architecture.md)
- [./retrying-failing-jobs.md](./retrying-failing-jobs.md)
