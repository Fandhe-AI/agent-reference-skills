# Migration to Newer Versions

BullMQ のバージョンアップ戦略。CHANGELOG を確認し、段階的にアップグレードすることを推奨する。

## Upgrade Types

| Upgrade Type | Version | Risk | Strategy |
|---|---|---|---|
| Bugfix | micro (x.x.Z) | Low | 全インスタンスをそのまま更新するだけ。コード変更不要 |
| Feature | minor (x.Y.x) | Medium | BullMQ を先に更新してから新機能を使うコードをデプロイ。後方互換性を確認すること |
| API breaking | major (X.x.x) | High | TypeScript コンパイルとユニットテストで検出可能 |
| Data-structure breaking | major (X.x.x) | Highest | ロールバックが困難な場合がある |

## Data-Structure Breaking Changes

2種類ある:

- **Additive**: 新しいデータ構造が追加される。比較的対処しやすい
- **Destructive**: 既存のデータ構造が変更される。最も複雑で、ロールバックが困難になる可能性がある

## Migration Strategies

### Pause / Upgrade / Unpause

```typescript
// 1. キューを一時停止
await queue.pause();

// 2. 処理中のジョブの完了を待つ
await worker.close();

// 3. 全インスタンスをアップグレード

// 4. 新しいワーカーを起動
const newWorker = new Worker('myQueue', processor);

// 5. キューを再開
await queue.resume();
```

### New Queues

新しいキュー（別の Redis インスタンスまたはバージョン固有の名前）を作成し、古いキューと並行運用する。

```typescript
// 旧キュー（処理完了まで維持）
const oldQueue = new Queue('myQueue-v1');
const oldWorker = new Worker('myQueue-v1', processor);

// 新キュー（新しいジョブはこちらに追加）
const newQueue = new Queue('myQueue-v2');
const newWorker = new Worker('myQueue-v2', newProcessor);
```

## Notes

- アップグレード前に必ず CHANGELOG を確認すること
- 大きなバージョンジャンプは避け、段階的にアップグレードすること
- データ構造の破壊的変更がある場合、ロールバック計画を事前に立てること

## Related

- [./bull-to-bullmq.md](./bull-to-bullmq.md)
- [../architecture.md](../architecture.md)
- [../going-to-production.md](../going-to-production.md)
