# Telemetry

BullMQ は Telemetry インターフェースを提供しており、OpenTelemetry 仕様をはじめとする外部テレメトリバックエンドと統合できます。大規模アプリケーションでジョブのライフサイクル全体を詳細に把握するために有用です。

## 概要

BullMQ の Telemetry インターフェースは、任意のテレメトリバックエンドとの統合を可能にする柔軟な設計です。現在は OpenTelemetry 仕様をサポートしており、これはテレメトリの新しいデファクトスタンダードです。

## 主な利点

| 利点 | 説明 |
|------|------|
| ジョブライフサイクルの可視化 | ジョブが経る各ステータスの詳細な追跡 |
| ソース追跡 | ジョブの発生元とシステム他部分との相互作用の追跡 |
| パフォーマンス分析 | 処理時間やボトルネックの特定 |
| 分散トレーシング | 複数サービスにまたがるジョブフローの追跡 |

## bullmq-otel パッケージ

OpenTelemetry 統合には `bullmq-otel` パッケージを使用します:

```typescript
import { Queue } from 'bullmq';
import { BullMQOtel } from 'bullmq-otel';

const queue = new Queue('myQueue', {
  connection: {
    host: '127.0.0.1',
    port: 6379,
  },
  telemetry: new BullMQOtel('simple-guide'),
});
```

## 注意点

- テレメトリインターフェースは将来的に他のバックエンドもサポートできる柔軟な設計です
- 現在は `bullmq-otel` パッケージで OpenTelemetry をサポートしています
- 大規模アプリケーションではトレースとメトリクスの両方を有効にすることを推奨します

## 関連

- [./getting-started.md](./getting-started.md) — セットアップ手順
- [./traces.md](./traces.md) — 分散トレースの実装
- [./metrics.md](./metrics.md) — テレメトリメトリクスの収集
- [./running-jaeger.md](./running-jaeger.md) — Jaeger によるトレース可視化
- [./running-a-simple-example.md](./running-a-simple-example.md) — サンプル実装
