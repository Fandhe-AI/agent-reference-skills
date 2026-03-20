# BullMQ Pro Pausing Groups

グループをグローバルに一時停止・再開する機能。一時停止されたグループのジョブは Worker によって取得されなくなる。

## グループの一時停止

`pauseGroup()` メソッドでグループを一時停止する:

```typescript
import { QueuePro } from '@taskforcesh/bullmq-pro';

const queue = new QueuePro('myQueue', { connection });

await queue.pauseGroup('groupId');
```

- 一時停止されたグループのジョブは Worker に配信されない
- 現在処理中のジョブは完了するまで実行される（その後 Worker はアイドル状態になる）
- グループが既に一時停止中の場合は `false` を返す
- 存在しないグループでも一時停止リストに追加される（エフェメラルグループに対応）

## グループの再開

`resumeGroup()` メソッドでグループを再開する:

```typescript
await queue.resumeGroup('groupId');
```

- グループが存在しないか既に再開済みの場合は `false` を返す
- 再開後、通常のジョブ処理が復帰する

## 使用例

```typescript
import { QueuePro } from '@taskforcesh/bullmq-pro';

const queue = new QueuePro('myQueue', { connection });

// メンテナンスのためグループを一時停止
await queue.pauseGroup('user-123');

// メンテナンス完了後に再開
await queue.resumeGroup('user-123');
```

## 注意点

- 一時停止はグローバルに適用され、すべての Worker に影響する
- 処理中のジョブは中断されず、完了まで実行される
- 存在しないグループを一時停止しても安全（後でグループが作成されたときに一時停止状態が適用される）

## 関連

- [./groups.md](./groups.md) - Groups の基本
- [./rate-limiting.md](./rate-limiting.md) - グループ単位のレート制限
- [./concurrency.md](./concurrency.md) - グループ単位の並行処理
