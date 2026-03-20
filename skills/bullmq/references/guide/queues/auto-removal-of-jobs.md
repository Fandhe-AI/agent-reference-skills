# BullMQ — Auto-removal of Jobs (Queue Options)

本番環境で Redis ストレージの肥大化を防ぐために、完了・失敗ジョブを自動削除する 3 つの戦略を提供する。ジョブ追加時のオプションとして `removeOnComplete` / `removeOnFail` を指定する。

## 戦略 1: 全件削除

完了・失敗したジョブを即座にすべて削除する。

```typescript
await myQueue.add(
  'test',
  { foo: 'bar' },
  { removeOnComplete: true, removeOnFail: true },
);
```

## 戦略 2: 件数ベースの保持

指定した件数を上限として保持する。

```typescript
await myQueue.add(
  'test',
  { foo: 'bar' },
  { removeOnComplete: 1000, removeOnFail: 5000 },
);
```

## 戦略 3: 時間ベースの保持

`KeepJobs` オブジェクトで経過時間と件数の両方を指定する。

```typescript
await myQueue.add(
  'test',
  { foo: 'bar' },
  {
    removeOnComplete: {
      age: 3600, // 最大 1 時間保持
      count: 1000, // 最大 1000 件保持
    },
    removeOnFail: {
      age: 24 * 3600, // 最大 24 時間保持
    },
  },
);
```

## オプション

| Name | Type | Description |
|------|------|-------------|
| `removeOnComplete` | `boolean \| number \| KeepJobs` | 完了ジョブの自動削除設定 |
| `removeOnFail` | `boolean \| number \| KeepJobs` | 失敗ジョブの自動削除設定 |

### KeepJobs オブジェクト

| Name | Type | Description |
|------|------|-------------|
| `age` | `number` | ジョブの保持期間（秒） |
| `count` | `number` | 保持するジョブの最大件数 |

## 注意点

- 自動削除は **遅延実行（lazy）** で動作する。新しいジョブが完了または失敗しない限り、削除は実行されない
- ユニーク jobId による冪等性を利用している場合、削除されたジョブは重複検出の対象外となる。自動削除と冪等性戦略の相互作用に注意が必要

## 関連

- [Workers — Auto-removal of jobs](../workers/auto-removal-of-jobs.md)
- [Queues](./queues.md)
