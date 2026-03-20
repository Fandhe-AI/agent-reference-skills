# Flows

BullMQ は親子関係を持つジョブ（フロー）をサポートしており、`FlowProducer` クラスを使用して任意の深さのツリー構造でジョブを作成・管理できます。親ジョブはすべての子ジョブが正常に完了するまで処理されません。

## FlowJob インターフェース

```typescript
interface FlowJobBase<T> {
  name: string;
  queueName: string;
  data?: any;
  prefix?: string;
  opts?: Omit<T, 'debounce' | 'deduplication' | 'repeat'>;
  children?: FlowChildJob[];
}

type FlowChildJob = FlowJobBase<
  Omit<JobsOptions, 'debounce' | 'deduplication' | 'parent' | 'repeat'>
>;

type FlowJob = FlowJobBase<JobsOptions>;
```

## 基本的なフロー追加

```typescript
import { FlowProducer } from 'bullmq';

const flowProducer = new FlowProducer();

const flow = await flowProducer.add({
  name: 'renovate-interior',
  queueName: 'renovate',
  children: [
    { name: 'paint', data: { place: 'ceiling' }, queueName: 'steps' },
    { name: 'paint', data: { place: 'walls' }, queueName: 'steps' },
    { name: 'fix', data: { place: 'floor' }, queueName: 'steps' },
  ],
});
```

上記のコードは4つのジョブをアトミックに追加します。"steps" キューの3つのジョブが完了すると、"renovate" キューの親ジョブが通常のジョブとして処理されます。

## 子ジョブの結果を取得（getChildrenValues）

子ジョブの Worker が値を返す場合:

```typescript
import { Worker } from 'bullmq';

const stepsWorker = new Worker('steps', async job => {
  await performStep(job.data);

  if (job.name === 'paint') {
    return 2500;
  } else if (job.name === 'fix') {
    return 1750;
  }
});
```

親 Worker で `getChildrenValues` メソッドを使って子ジョブの結果を集約できます:

```typescript
import { Worker } from 'bullmq';

const renovateWorker = new Worker('renovate', async job => {
  const childrenValues = await job.getChildrenValues();

  const totalCosts = Object.values(childrenValues).reduce(
    (prev, cur) => prev + cur,
    0,
  );

  await sendInvoice(totalCosts);
});
```

## 直列実行（深いツリー構造）

ジョブを直列に実行するには、深いネスト構造を使用します:

```typescript
import { FlowProducer } from 'bullmq';
const flowProducer = new FlowProducer();

const queueName = 'assembly-line';
const chain = await flowProducer.add({
  name: 'car',
  data: { step: 'engine' },
  queueName,
  children: [
    {
      name: 'car',
      data: { step: 'wheels' },
      queueName,
      children: [{ name: 'car', data: { step: 'chassis' }, queueName }],
    },
  ],
});
```

処理順序: `chassis` → `wheels` → `engine`

## Getters

### getDependencies

ジョブの直接の依存関係（子ジョブ）を取得します:

```typescript
const dependencies = await job.getDependencies();
```

特定の種類の子ジョブをページネーション付きで取得:

```typescript
const { processed, nextProcessedCursor } = await job.getDependencies({
  processed: { count: 5, cursor: 0 },
});

const { unprocessed, nextUnprocessedCursor } = await job.getDependencies({
  unprocessed: { count: 5, cursor: 0 },
});

const { failed, nextFailedCursor } = await job.getDependencies({
  failed: { count: 5, cursor: 0 },
});

const { ignored, nextIgnoredCursor } = await job.getDependencies({
  ignored: { count: 5, cursor: 0 },
});
```

### getDependenciesCount

子ジョブの種類別カウントを取得:

```typescript
const { failed, ignored, processed, unprocessed } =
  await job.getDependenciesCount();
```

特定の種類のみ取得:

```typescript
const { failed } = await job.getDependenciesCount({ failed: true });

const { ignored, processed } = await job.getDependenciesCount({
  ignored: true,
  processed: true,
});
```

### getChildrenValues

子ジョブが返した値をすべて取得:

```typescript
const values = await job.getChildrenValues();
```

### parentKey プロパティ

`Job` クラスに `parentKey` プロパティがあり、親ジョブの完全修飾キーを保持します。

### waiting-children ステート

親ジョブは子ジョブの完了待ちの間 `waiting-children` ステートになります:

```typescript
const state = await job.getState();
// state will be "waiting-children"
```

## キューオプションの指定

フロー追加時に `queueOptions` を使ってキューごとのオプションを指定できます:

```typescript
import { FlowProducer } from 'bullmq';
const flowProducer = new FlowProducer();

const queueName = 'assembly-line';
const chain = await flowProducer.add(
  {
    name: 'car',
    data: { step: 'engine' },
    queueName,
    children: [
      {
        name: 'car',
        data: { step: 'wheels' },
        queueName,
      },
    ],
  },
  {
    queuesOptions: {
      [queueName]: {
        defaultJobOptions: {
          removeOnComplete: true,
        },
      },
    },
  },
);
```

## ジョブの削除

フロー内のジョブ削除に関する重要なルール:

| ルール | 説明 |
|--------|------|
| 親ジョブの削除 | すべての子ジョブも削除される |
| 子ジョブの削除 | 親の依存関係から削除され、最後の子だった場合は親が completed になる |
| 親兼子ジョブの削除 | 上記の両方のルールが適用される |
| ロック中のジョブ | いずれかのジョブがロック中の場合、どのジョブも削除されず例外がスローされる |

```typescript
await job.remove();
// or
await queue.remove(job.id);
```

## 注意点

- フローは `FlowProducer` クラスを使って追加する必要があります
- 親キューと子キューは同じキューである必要はありません
- `jobId` オプションにコロン `:` を含めないでください（セパレータとして扱われます）
- キューオプションは第2引数で指定してください（インスタンスのコンテキストで定義されるため）

## 関連

- [./adding-bulks.md](./adding-bulks.md) — 複数フローの一括追加
- [./get-flow-tree.md](./get-flow-tree.md) — フローツリーの取得
- [./fail-parent.md](./fail-parent.md) — 子失敗時の親への影響
- [./continue-parent.md](./continue-parent.md) — 親の継続処理
- [./remove-dependency.md](./remove-dependency.md) — 依存関係の削除
- [./ignore-dependency.md](./ignore-dependency.md) — 依存関係の無視
- [./remove-child-dependency.md](./remove-child-dependency.md) — 子依存関係の削除
