# BullMQ — Manage Job Schedulers

Job Scheduler のライフサイクル管理は、効率的なバックグラウンドタスクの維持に不可欠です。`upsertJobScheduler` に加えて、`removeJobScheduler` と `getJobSchedulers` メソッドでスケジューラの削除と一覧取得が行えます。

## removeJobScheduler（スケジューラの削除）

不要になったスケジューラや、非アクティブ/廃止されたスケジューラを削除してリソースを最適化します。

```typescript
import { Queue } from 'bullmq';

const queue = new Queue('Paint');

// スケジューラ 'scheduler-123' を削除
const result = await queue.removeJobScheduler('scheduler-123');
console.log(
  result ? 'Scheduler removed successfully' : 'Missing Job Scheduler',
);
```

| 戻り値 | Description |
|--------|-------------|
| `true` | 指定 ID の Job Scheduler が存在し、削除された |
| `false` | 指定 ID の Job Scheduler が存在しなかった |

## getJobSchedulers（スケジューラ一覧の取得）

指定した範囲内のすべてのスケジューラ設定を取得します。モニタリングやダッシュボードでの使用に最適です。

```typescript
// 最初の10件のスケジューラを次回実行時刻の昇順で取得
const schedulers = await queue.getJobSchedulers(0, 9, true);
console.log('Current job schedulers:', schedulers);
```

### getJobSchedulers パラメータ

| Name | Type | Description |
|------|------|-------------|
| `start` | `number` | 取得開始位置 |
| `end` | `number` | 取得終了位置 |
| `asc` | `boolean` | `true` で次回実行時刻の昇順 |

## getJobScheduler（個別スケジューラの取得）

ID を指定して特定のスケジューラの設定を取得します。

```typescript
const scheduler = await queue.getJobScheduler('test');
console.log('Current job scheduler:', scheduler);
```

## 注意点

- `removeJobScheduler` はスケジューラが存在しない場合 `false` を返す（エラーにはならない）
- `getJobSchedulers` はページネーションに対応しており、大量のスケジューラがある場合でも効率的に取得可能
- スケジューラの更新には `upsertJobScheduler` を使用する（同じ ID で呼び出すと既存設定が上書きされる）
- スケジューラのレポートやダッシュボード生成には `getJobSchedulers` が有用

## 関連

- [Job Schedulers](./job-schedulers.md)
- [Repeat Strategies](./repeat-strategies.md)
- [Repeat Options](./repeat-options.md)
