# BullMQ — Concurrency

BullMQ で並行処理を実現する 2 つの方法: Worker のローカル concurrency 設定と、複数 Worker インスタンスの運用。

## ローカル Concurrency

Worker オプションの `concurrency` で、1 つの Worker インスタンスが同時に処理するジョブ数を設定する。

```typescript
import { Worker, Job } from 'bullmq';

const worker = new Worker(
  queueName,
  async (job: Job) => {
    // Do something with job
    return 'some value';
  },
  { concurrency: 50 },
);
```

実行中に concurrency 値を動的に変更することも可能。

```typescript
worker.concurrency = 5;
```

## 複数 Worker の運用

もう 1 つの方法は、複数の Worker インスタンスを起動すること。これは BullMQ の推奨アプローチであり、並行処理に加えて高可用性も確保できる。

異なるマシンで実行される Worker フリートを構成し、ジョブを予測可能かつ堅牢に並列処理できる。

```typescript
// machine-1.ts
const worker1 = new Worker(queueName, processor, { concurrency: 10 });

// machine-2.ts
const worker2 = new Worker(queueName, processor, { concurrency: 10 });
```

## 注意点

- ローカル concurrency は Worker が非同期操作（データベース呼び出し、HTTP リクエスト等）を行う場合にのみ効果がある。これは Node.js がネイティブに並行処理をサポートする方法による
- CPU 集約型の処理には [Sandboxed Processors](./sandboxed-processors.md) を使用すること
- グローバルに最大 1 ジョブのみの並行処理を実現するには [Global Concurrency](../queues/global-concurrency.md) を参照
- 各 Worker で高い concurrency 値を設定しつつ、複数 Worker を運用することは推奨されるプラクティスである

## 関連

- [Global Concurrency](../queues/global-concurrency.md)
- [Sandboxed Processors](./sandboxed-processors.md)
- [Workers](./workers.md)
