# Retrying Failing Jobs

BullMQ は失敗したジョブの自動リトライ機能を提供します。`attempts` オプションと組み込みまたはカスタムのバックオフ戦略を使用して、柔軟なリトライ動作を設定できます。

## ジョブが失敗する条件

BullMQ では以下の場合にジョブが失敗と見なされます:

- Worker のプロセッサ関数が例外を throw した場合
- ジョブがストール状態になり、最大ストールカウントに達した場合

## リトライの有効化

自動リトライを有効にするには `attempts` オプションに 1 より大きい値を設定します。バックオフ関数を指定しない場合、失敗後すぐにリトライされます。

```typescript
import { Queue } from 'bullmq';

const myQueue = new Queue('foo');

await myQueue.add(
  'test-retry',
  { foo: 'bar' },
  {
    attempts: 3,
  },
);
```

| Name | Type | Description |
|------|------|-------------|
| `attempts` | `number` | 最大試行回数（初回を含む） |
| `backoff.type` | `string` | バックオフ戦略（`'fixed'`, `'exponential'`, `'custom'`） |
| `backoff.delay` | `number` | バックオフの基本遅延時間（ミリ秒） |
| `backoff.jitter` | `number` | ジッター率（0〜1）。ランダムな遅延を追加 |

## 組み込みバックオフ戦略

### Fixed（固定遅延）

毎回同じ遅延時間でリトライします。

```typescript
await myQueue.add(
  'test-retry',
  { foo: 'bar' },
  {
    attempts: 3,
    backoff: {
      type: 'fixed',
      delay: 1000,
    },
  },
);
```

ジッター付きの例（遅延が 500ms〜1000ms のランダム範囲になる）:

```typescript
await myQueue.add(
  'test-retry',
  { foo: 'bar' },
  {
    attempts: 8,
    backoff: {
      type: 'fixed',
      delay: 1000,
      jitter: 0.5,
    },
  },
);
```

### Exponential（指数バックオフ）

`2^(attempts - 1) * delay` ミリ秒の遅延でリトライします。例えば delay=3000ms の場合、7 回目は `2^6 * 3000` = 約 3.2 分後にリトライします。

```typescript
await myQueue.add(
  'test-retry',
  { foo: 'bar' },
  {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 1000,
    },
  },
);
```

### キューのデフォルト設定

`defaultJobOptions` でキュー全体のデフォルトリトライ設定を指定できます。

```typescript
const myQueue = new Queue('foo', {
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 1000,
    },
  },
});

await myQueue.add('test-retry', { foo: 'bar' });
```

## カスタムバックオフ戦略

Worker の `settings.backoffStrategy` でカスタム戦略を定義できます。

```typescript
import { Worker } from 'bullmq';

const worker = new Worker('foo', async job => doSomeProcessing(), {
  settings: {
    backoffStrategy: (attemptsMade: number) => {
      return attemptsMade * 1000;
    },
  },
});
```

カスタム戦略を使用するジョブの追加:

```typescript
await myQueue.add(
  'test-retry',
  { foo: 'bar' },
  {
    attempts: 3,
    backoff: {
      type: 'custom',
    },
  },
);
```

### 複数のカスタム戦略

`type` パラメータで複数のカスタム戦略を切り替えできます。

```typescript
const worker = new Worker('foo', async job => doSomeProcessing(), {
  settings: {
    backoffStrategy: (
      attemptsMade: number,
      type: string,
      err: Error,
      job: Job,
    ) => {
      switch (type) {
        case 'custom1': {
          return attemptsMade * 1000;
        }
        case 'custom2': {
          return attemptsMade * 2000;
        }
        default: {
          throw new Error('invalid type');
        }
      }
    },
  },
});
```

## 注意点

- プロセッサで throw される例外は必ず `Error` オブジェクトである必要があります
- `backoffStrategy` が `0` を返すと、ジョブは待機リストの末尾（priority 0）または prioritized 状態（priority > 0）に移動します
- `backoffStrategy` が `-1` を返すと、ジョブはリトライされず failed 状態に移動します
- リトライされるジョブは wait 状態に戻る際に priority が尊重されます
- ジッター率は 0〜1 の間で指定します（0 = ランダムなし、1 = 最大ランダム）

## 関連

- [./returning-job-data.md](./returning-job-data.md)
- [./troubleshooting.md](./troubleshooting.md)
- [./going-to-production.md](./going-to-production.md)
