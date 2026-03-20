# BullMQ Pro Sandboxes for Groups

サンドボックスプロセッサでグループ処理を使用する機能。サンドボックス内のジョブオブジェクトから `gid` プロパティでグループ ID にアクセスできる。

## 実装例

```typescript
import { SandboxedJobPro } from '@taskforcesh/bullmq-pro';

module.exports = function (job: SandboxedJobPro) {
  // グループ ID にアクセス
  const groupId = job.gid;
  console.log('Processing job for group:', groupId);

  // job.opts.group からもグループ情報にアクセス可能
  console.log('Group options:', job.opts.group);
  console.log('Group ID:', job.opts.group.id);

  // gid と opts.group.id は同じ値
  // job.gid === job.opts.group.id
};
```

## プロパティ

サンドボックスプロセッサ内で利用可能なグループ関連プロパティ:

- `job.gid` - グループ ID（文字列）
- `job.opts.group` - グループオプションオブジェクト
- `job.opts.group.id` - グループ ID（`job.gid` と同値）

## 注意点

- **サンドボックスプロセッサで対応している Pro 機能は Groups のみ**。Observables やその他の Pro 機能はサンドボックス環境では利用不可
- `SandboxedJobPro` 型を使用すること（通常の `SandboxedJob` ではなく）
- `gid` は常に文字列型として提供される

## 関連

- [./groups.md](./groups.md) - Groups の基本
- [./concurrency.md](./concurrency.md) - グループ単位の並行処理
