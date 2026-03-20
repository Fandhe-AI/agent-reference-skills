# BullMQ — Global Concurrency

キュー全体で並行処理されるジョブ数の上限を設定する機能。すべての Worker インスタンスを横断して、同時に処理されるジョブ数を制御する。

## グローバル並行数の設定

```typescript
import { Queue } from 'bullmq';

await queue.setGlobalConcurrency(4);
```

## グローバル並行数の取得

```typescript
const globalConcurrency = await queue.getGlobalConcurrency();
```

## グローバル並行数の削除

```typescript
await queue.removeGlobalConcurrency();
```

## API

| Name | Type | Description |
|------|------|-------------|
| `setGlobalConcurrency(concurrency)` | `Promise<void>` | グローバル並行数を設定 |
| `getGlobalConcurrency()` | `Promise<number>` | 現在のグローバル並行数を取得 |
| `removeGlobalConcurrency()` | `Promise<void>` | グローバル並行数の制限を削除 |

## 注意点

- Worker レベルの `concurrency` オプションはグローバル設定を上書きしない。個別 Worker の最大並行数として機能するが、グローバル上限を超えることはない
- グローバル並行数は全 Worker インスタンスの合計に適用される

## 関連

- [Workers — Concurrency](../workers/concurrency.md)
- [Global Rate Limit](./global-rate-limit.md)
- [Meta](./meta.md)
