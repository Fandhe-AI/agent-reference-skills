# BullMQ — Sandboxed Processors

サンドボックスプロセッサは、メインの Node.js スレッドとは別のプロセスでジョブを実行する仕組みである。CPU 集約型の処理がイベントループをブロックし、stalled ジョブを引き起こすことを防止する。

## プロセッサファイルの作成

プロセッサを別ファイルとして定義する。

```typescript
import { SandboxedJob } from 'bullmq';

module.exports = async (job: SandboxedJob) => {
  // ジョブを処理
};
```

## Worker でプロセッサファイルを指定

ファイルパスを Worker コンストラクタに渡す。

```typescript
import { Worker } from 'bullmq';

const processorFile = path.join(__dirname, 'my_procesor.js');
worker = new Worker(queueName, processorFile);
```

## URL による指定

Windows OS との互換性を高めるため、URL インスタンスでの指定も可能。

```typescript
import { pathToFileURL } from 'url';

const processorUrl = pathToFileURL(__dirname + '/my_procesor.js');
worker = new Worker(queueName, processorUrl);
```

## Worker Threads の使用

BullMQ v3.13.0 以降、デフォルトの spawn プロセスの代わりに Node.js の Worker Threads を使用可能。spawn プロセスよりもリソース効率が良い。

```typescript
import { Worker } from 'bullmq';

const processorFile = path.join(__dirname, 'my_procesor.js');
worker = new Worker(queueName, processorFile, { useWorkerThreads: true });
```

## オプション

| Name | Type | Description |
|------|------|-------------|
| `useWorkerThreads` | `boolean` | Worker Threads を使用するか（デフォルト: `false`、spawn プロセスを使用） |

## 注意点

- サンドボックスプロセッサは別プロセス（または Worker Thread）で実行されるため、メインスレッドのイベントループをブロックしない
- Worker Threads は spawn プロセスよりもリソース効率が良いが、Node ランタイムの複製は必要
- `SandboxedJob` 型はメインスレッドの `Job` 型とは異なり、一部の機能（例: `job.queue` へのアクセス）が制限される

## 関連

- [Stalled Jobs](./stalled-jobs.md)
- [Concurrency](./concurrency.md)
- [Workers](./workers.md)
