# BullMQ Pro Groups Concurrency

グループ単位で同時処理数を制限する機能。デフォルトではグループごとの並列実行に制限はないが、`concurrency` オプションで制御できる。

## 設定例

```typescript
import { WorkerPro } from '@taskforcesh/bullmq-pro';

const worker = new WorkerPro('myQueue', processFn, {
  group: {
    concurrency: 3, // グループあたり最大3ジョブを並列処理
  },
  concurrency: 100, // Worker 全体の並行処理数
  connection,
});
```

この設定では、任意のグループに対して同時に3ジョブまでしか処理されない。Worker 全体の concurrency が100でも、各グループは最大3ジョブに制限される。

## グローバルスコープ

グループの concurrency 設定はアプリケーション全体でグローバルに適用される。Worker インスタンスの数や個々の concurrency 設定に関わらず、**1つのグループに対して同時に処理されるジョブ数は設定値を超えない**。

例えば `concurrency: 3` を設定した場合:
- Worker が1台でも10台でも、あるグループのジョブは最大3つまでしか同時実行されない
- 異なるグループのジョブは制限なく並列実行可能

## 注意点

- グループ concurrency はレート制限とは独立して動作する
- レート制限を設定していても、グループ concurrency を設定しないとグループ内で無制限に並列実行される
- Worker 全体の `concurrency` とグループの `concurrency` は別の概念
- ローカルグループ並行処理で個別のグループに異なる値を設定する場合は [local-group-concurrency.md](./local-group-concurrency.md) を参照

## 関連

- [./local-group-concurrency.md](./local-group-concurrency.md) - ローカルグループ並行処理
- [./rate-limiting.md](./rate-limiting.md) - グループ単位のレート制限
- [./groups.md](./groups.md) - Groups の基本
