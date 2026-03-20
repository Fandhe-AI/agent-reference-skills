# Metrics

BullMQ はシンプルなメトリクス収集機能を提供しており、Worker が1分間隔で処理したジョブ数（completed / failed）を Redis のリストに保存します。2週間分のデータでもキューあたり約120KB の RAM しか消費しません。

## メトリクスの有効化

Worker の設定で `metrics` オプションを指定します:

```typescript
import { Worker, MetricsTime } from 'bullmq';

const myWorker = new Worker('Paint', {
  connection,
  metrics: {
    maxDataPoints: MetricsTime.ONE_WEEK * 2,
  },
});
```

| Name | Type | Description |
|------|------|-------------|
| maxDataPoints | number | 保持するデータポイントの最大数。`MetricsTime` 定数を使用 |

## メトリクスの取得

`Queue` クラスの `getMetrics` メソッドで completed または failed のメトリクスを取得します:

```typescript
import { Queue } from 'bullmq';
const myQueue = new Queue('Paint', {
  connection,
});

const metrics = await queue.getMetrics('completed', 0, MetricsTime.ONE_WEEK * 2);
```

## レスポンス構造

```typescript
{
  data: number[];      // 各位置が1分間の完了（または失敗）ジョブ数
  count: number;
  meta: {
    count: number;     // キュー開始以降の合計数
    prevTS: number;    // 内部使用
    prevCount: number; // 内部使用
  };
}
```

| Field | Description |
|-------|-------------|
| data | 1分間隔のジョブ数の配列 |
| meta.count | キュー開始以降の合計 completed/failed ジョブ数 |
| meta.prevTS | 内部使用（メトリクスシステム） |
| meta.prevCount | 内部使用（メトリクスシステム） |

`getMetrics` は `start` と `end` 引数（デフォルト: `0` と `-1`）も受け取り、ページネーションを実装できます。

## 注意点

- すべての Worker で同じ `metrics` 設定を使用して一貫性のあるメトリクスを取得してください
- メトリクスは1分間隔で集約されます
- 最大データポイント数に達すると古いデータは自動的に破棄されます
- `MetricsTime.ONE_WEEK * 2`（2週間）を推奨します（約120KB/キュー）

## 関連

- [./prometheus.md](./prometheus.md) — Prometheus によるメトリクス連携
