# BullMQ — Global Rate Limit

キュー全体でジョブの処理頻度を制限する機能。指定した時間枠内に処理できるジョブ数の上限を設定する。

## レート制限の設定

```typescript
import { Queue } from 'bullmq';

// 1秒あたり1ジョブ
await queue.setGlobalRateLimit(1, 1000);
```

## レート制限の取得

```typescript
const { max, duration } = await queue.getGlobalRateLimit();
```

## TTL の確認

```typescript
const ttl = await queue.getRateLimitTtl();
```

## レート制限の削除

```typescript
await queue.removeGlobalRateLimit();
```

## API

| Name | Type | Description |
|------|------|-------------|
| `setGlobalRateLimit(max, duration)` | `Promise<void>` | グローバルレート制限を設定。`max` は最大ジョブ数、`duration` はミリ秒単位の時間枠 |
| `getGlobalRateLimit()` | `Promise<{ max: number, duration: number }>` | 現在のレート制限設定を取得 |
| `getRateLimitTtl()` | `Promise<number>` | 現在のレート制限の残り時間（TTL）を取得 |
| `removeGlobalRateLimit()` | `Promise<void>` | レート制限を削除 |

## 注意点

- Worker レベルのレート制限はグローバル設定を上書きしない。グローバル設定が常に優先される
- `duration` はミリ秒単位で指定する

## 関連

- [Global Concurrency](./global-concurrency.md)
- [Rate Limiting](../rate-limiting.md)
- [Meta](./meta.md)
