# BullMQ — Stalled Jobs

ジョブが active 状態のとき、ワーカーはキューに対して処理中であることを継続的に通知する必要があります。この仕組みにより、クラッシュや無限ループに陥ったワーカーがジョブを永続的に active 状態に保持することを防ぎます。

## 概要

ワーカーが処理中のジョブについてキューに通知できなくなった場合、そのジョブは waiting リストまたは failed セットに移動されます。これを「ジョブが stalled した」と呼び、キューは `stalled` イベントを発行します。

> **Note:** `stalled` は状態ではなく、ジョブが自動的に active から waiting に移動された際に発行されるイベントです。

## Stalled の検出と設定

| Name | Type | Description |
|------|------|-------------|
| `maxStalledCount` | `number` | ジョブが stalled と判定される最大回数。デフォルト: `1` |
| `stalledInterval` | `number` | stalled チェックの間隔（ミリ秒）。デフォルト: `30000`（30秒） |

ジョブが `maxStalledCount` を超えて stalled した場合、"_job stalled more than allowable limit_" エラーで永続的に失敗します。

## Stalled ジョブの防止策

### 1. イベントループのブロックを避ける

デフォルトの stalled チェック間隔は 30 秒です。CPU 操作がこの値を超えないようにすれば、stalled ジョブは発生しません。

### 2. サンドボックス化されたプロセッサを使用

ワーカーが別の Node.js プロセスを spawn し、メインプロセスとは独立して実行します。

```typescript
// main.ts
import { Worker } from 'bullmq';

const worker = new Worker('Paint', painter);
```

```typescript
// painter.ts
export default (job) => {
  // Paint something
};
```

## 注意点

- stalled は「状態」ではなく「イベント」である。ジョブは active から waiting に自動的に移動される
- `maxStalledCount` のデフォルトは 1。stalled ジョブはまれな事象であるべきだが、必要に応じて増やせる
- Node.js のイベントループを長時間ブロックする CPU バウンドな処理は stalled の主な原因
- サンドボックスプロセッサの使用により、メインプロセスのイベントループへの影響を排除できる
- BullMQ 2.0 以降、`QueueScheduler` は不要

## 関連

- [Jobs](./jobs.md)
- [Retrying Jobs](./retrying-jobs.md)
- [Removing Jobs](./removing-jobs.md)
