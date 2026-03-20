# Parallelism and Concurrency

BullMQ では並列性（Parallelism）と並行性（Concurrency）は異なる概念です。並列性は複数のワーカーを複数のマシンやCPUコアで実行すること、並行性は単一ワーカーが NodeJS のイベントループを活用して複数ジョブを同時処理することを指します。

## Parallelism（並列性）

並列性は、2 つ以上のタスクが完全に独立して同時に実行されることを意味します。マルチコアプロセッサや複数マシンで実現されます。CPU インテンシブなタスクでは、完全な並列実行が最高のパフォーマンスを提供します。

## Concurrency（並行性）

並行性は、利用可能な CPU を小さなスライスに分割し、複数のタスクが処理を進めることを指します。NodeJS のイベントループはこの仕組みを活用し、IO 呼び出しの非同期性を利用して大量のマイクロタスクを効率的に並行処理します。

### NodeJS イベントループ

NodeJS は単一のイベントループで動作し、IO ヘビーな処理を非同期に実行します。データベースクエリなどの IO 呼び出しは NodeJS 全体をブロックせず、他のコードの実行に切り替わります。

### BullMQ の Concurrency 設定

BullMQ ではワーカーに `concurrency` 設定を指定できます。この設定はワーカーローカルで、NodeJS のイベントループを活用します。

```typescript
import { Worker } from 'bullmq';

const worker = new Worker('myQueue', async job => {
  // IO ヘビーな処理
  await doSomeIOWork(job);
}, {
  concurrency: 100,
});
```

| ジョブタイプ | 推奨 concurrency | 理由 |
|-------------|------------------|------|
| IO ヘビー | 100〜300 | IO 待ち時間を他ジョブの処理に活用できる |
| CPU インテンシブ | 1〜5 | 並行処理のオーバーヘッドが増えるだけで効果が薄い |

## スレッドについて

NodeJS はスレッドをサポートしていますが、各スレッドは完全な V8 VM を必要とし、数十 MB のメモリを消費します。OS プロセスとほぼ同等のリソースを使用するため、BullMQ では通常、別プロセスのワーカーとして並列実行する方が効率的です。

## 最適な使い方

BullMQ で並列性と並行性を最大化するには、2 つのアプローチを組み合わせます。

### 1. ワーカーの concurrency 設定

IO ヘビーなジョブの場合、concurrency を高く設定します。

```typescript
const worker = new Worker('myQueue', processor, {
  concurrency: 200, // IO ヘビーなジョブ向け
});
```

### 2. 複数ワーカーの並列実行

複数のワーカーを異なるマシンやプロセスで実行します。各ワーカーは利用可能な CPU コアで並列に動作し、スループットはワーカー数に比例してスケールします。

```typescript
// マシン1
const worker1 = new Worker('myQueue', processor, { concurrency: 100 });

// マシン2
const worker2 = new Worker('myQueue', processor, { concurrency: 100 });
```

## 注意点

- CPU インテンシブなジョブで concurrency を高く設定すると、オーバーヘッドによりスループットが低下します
- BullMQ 自体も Redis への IO 操作を行うため、CPU インテンシブなジョブでもわずかな concurrency（2〜5）で改善が見られる場合があります
- 最適な concurrency 値は本番ワークロードでの観測によってのみ決定できます

## 関連

- [./rate-limiting.md](./rate-limiting.md)
- [./going-to-production.md](./going-to-production.md)
- [./architecture.md](./architecture.md)
