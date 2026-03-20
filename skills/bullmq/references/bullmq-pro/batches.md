# BullMQ Pro Batches

WorkerPro でジョブをバッチ処理する機能。複数のジョブを一度にまとめて処理することで、効率的なバルク操作が可能になる。

## 基本設定

`batch` オプションに `size` プロパティを渡してバッチ処理を有効にする:

```typescript
import { WorkerPro } from '@taskforcesh/bullmq-pro';

const worker = new WorkerPro('myQueue', async (job) => {
  const batch = job.getBatch();
  // batch 内のジョブを処理
  for (const batchedJob of batch) {
    await processJob(batchedJob);
  }
}, {
  batch: {
    size: 10,  // 一度に最大10ジョブを処理
  },
  connection,
});
```

## 高度なオプション

### minSize と timeout

バッチ処理のタイミングを制御する追加パラメータ:

```typescript
const worker = new WorkerPro('myQueue', processFn, {
  batch: {
    size: 50,
    minSize: 10,     // 最低10ジョブ集まるまで待機
    timeout: 5000,   // 最大5秒待機してから処理開始
  },
  connection,
});
```

- **minSize** - 処理開始前に最低限必要なジョブ数
- **timeout** - minSize に達しない場合の最大待機時間（ミリ秒）。タイマー満了時に利用可能なジョブを処理する

## ジョブの個別失敗処理

デフォルトでは例外がスローされるとバッチ内の全ジョブが失敗する。`setAsFailed` メソッドで個別にジョブを失敗させることが可能:

```typescript
const worker = new WorkerPro('myQueue', async (job) => {
  const batch = job.getBatch();
  for (const batchedJob of batch) {
    try {
      await processJob(batchedJob);
    } catch (err) {
      batchedJob.setAsFailed(err);
    }
  }
}, {
  batch: { size: 10 },
  connection,
});
```

## イベント管理

バッチジョブは内部的にダミージョブでラップされる。Worker レベルのイベントリスナーはバッチコンテナのイベントを受信する:

```typescript
worker.on('completed', async (job) => {
  const batch = job.getBatch();
  // batch 内の個別ジョブにアクセス
});
```

個別ジョブのイベント監視には `QueueEventsPro` を使用する。

## 注意点

- バッチサイズは通常 10〜50 が推奨。大きなバッチはサイズに比例したオーバーヘッドが発生する
- **minSize と timeout は Groups と互換性がない**
- 以下の機能はバッチ処理で未サポート:
  - 動的レート制限
  - 手動ジョブ処理
  - 動的ジョブ遅延

## 関連

- [./groups/README.md](./groups/README.md) - Groups 機能
- [./observables/README.md](./observables/README.md) - Observables 機能
