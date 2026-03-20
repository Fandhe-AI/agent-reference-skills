# BullMQ — Retrying Jobs

`retry` メソッドは、completed または failed 状態のジョブを手動で再処理するための機能です。自動リトライメカニズムとは異なり、明示的な手動介入で使用します。

## 基本的な使い方

```typescript
import { Queue, Job } from 'bullmq';

const queue = new Queue('paint');

// 失敗したジョブをリトライ
const job = await queue.getJob('job-id');
await job.retry('failed');
```

## リトライオプション

| Name | Type | Description |
|------|------|-------------|
| `resetAttemptsMade` | `boolean` | ジョブのリトライ許容回数をリセットする |
| `resetAttemptsStarted` | `boolean` | active 状態への遷移カウンターをリセットする |

## 主なユースケース

- 外部の一時的な障害が解消された後の手動介入
- 同一データで完了したジョブを再処理
- システム障害後のワークフロー復旧

## エラーコード

| コード | Description |
|--------|-------------|
| `-1` | ジョブが存在しない |
| `-3` | ジョブが期待される状態にない |

## 注意点

- `retry` は `completed` または `failed` 状態のジョブにのみ使用可能
- リトライ実行時、ジョブは waiting キューに戻され、失敗理由や処理タイムスタンプなどの関連プロパティがクリアされる
- `attemptsMade` をリセットせずにリトライし、既にリトライ回数を使い切っている場合、ジョブは再処理時に即座に失敗する
- TypeScript、Python、Elixir の各実装で利用可能

## 関連

- [Stalled](./stalled.md)
- [Removing Jobs](./removing-jobs.md)
- [Jobs](./jobs.md)
