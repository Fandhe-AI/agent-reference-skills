# BullMQ Pro Observable Cancelation

Observable ジョブに TTL（Time to Live）を設定し、処理時間が長すぎるジョブを自動的にキャンセルする機能。

## 概要

BullMQ Pro では TTL 値を設定することで、ジョブの最大処理時間を定義できる。処理時間が TTL を超えた場合、Observable が自動的にキャンセル（unsubscribe）される。

## グローバル TTL 設定

すべてのジョブに統一的な TTL を設定する:

```typescript
import { WorkerPro } from '@taskforcesh/bullmq-pro';

const worker = new WorkerPro(queueName, processor, {
  ttl: 100, // 全ジョブに100msのTTL
  connection,
});
```

## ジョブ名ごとの TTL 設定

ジョブ名に応じて異なる TTL を設定する:

```typescript
import { WorkerPro } from '@taskforcesh/bullmq-pro';

const worker = new WorkerPro(queueName, processor, {
  ttl: {
    test1: 100,  // test1 ジョブは100ms
    test2: 200,  // test2 ジョブは200ms
  },
  connection,
});
```

## 注意点

- TTL はミリ秒単位で指定する
- TTL を超えた場合、Observable の `unsubscribe` 関数が呼ばれるため、リソースのクリーンアップが可能
- グローバル TTL とジョブ名ごとの TTL は排他的（どちらか一方を指定）
- TTL は Observable を返すプロセッサでのみ有効

## 関連

- [./observables.md](./observables.md) - Observable の基本的な使い方
- [../groups/README.md](../groups/README.md) - Groups 機能
