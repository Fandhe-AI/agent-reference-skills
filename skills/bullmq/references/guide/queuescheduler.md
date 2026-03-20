# QueueScheduler

`QueueScheduler` は BullMQ v2.0 で廃止されたヘルパークラスです。v2.0 以前では、遅延ジョブの管理とストールジョブの検出を担当していました。v2.0 以降はこれらの機能がワーカーに内蔵されています。

## 旧バージョンでの役割

`QueueScheduler` は以下の 2 つの機能を提供していました:

| 機能 | Description |
|------|-------------|
| 遅延ジョブの管理 | 適切なタイミングで遅延ジョブを待機キューに移動する |
| ストールジョブの検出 | ワーカーのクラッシュや障害でアクティブのまま残ったジョブを検出し、再配置または失敗にする |

## v2.0 以前の使用例

```typescript
import { QueueScheduler, Worker } from 'bullmq';

// キューごとに1つのスケジューラが必要だった
const scheduler = new QueueScheduler('myQueue', {
  connection: { host: 'localhost', port: 6379 },
});

const worker = new Worker('myQueue', async job => {
  // ジョブ処理
}, {
  connection: { host: 'localhost', port: 6379 },
});
```

## アーキテクチャ上の理由

`QueueScheduler` が別クラスとして設計された理由は、多数のワーカーインスタンスを並列処理のために実行しつつ、スケジューラはキューごとに 1〜2 インスタンスのみ運用するためです。これにより、Bull 3.x の「ワーカー内にスケジューラ機能を内蔵する」アプローチと比べてリソース配分が最適化されていました。

## デプロイに関する考慮事項

冗長性のために複数のスケジューラインスタンスを実行可能でしたが、各インスタンスがブックキーピング処理を行うため、Redis の CPU および IO 使用量が増加する点に注意が必要でした。

## v2.0 への移行パス

v2.0 以降では `QueueScheduler` を削除し、Worker のみで運用します。

```typescript
// v2.0 以降: QueueScheduler は不要
import { Worker } from 'bullmq';

const worker = new Worker('myQueue', async job => {
  // ジョブ処理
}, {
  connection: { host: 'localhost', port: 6379 },
});

// 遅延ジョブ、ストール検出、レート制限は Worker が自動的に処理
```

### 移行チェックリスト

1. `QueueScheduler` のインポートと初期化コードを削除する
2. `QueueScheduler` 関連のエラーハンドリングコードを削除する
3. Worker が正常に遅延ジョブとストール検出を処理していることを確認する

## 注意点

- v2.0 以前では、`QueueScheduler` が起動していないと遅延ジョブ、バックオフ付きリトライ、レート制限が機能しなかった
- v2.0 以降では `QueueScheduler` を使用するとエラーや非推奨警告が出る可能性がある
- 移行時は段階的に行い、まず全インスタンスを v2.0 にアップグレードしてからコードを変更する

## 関連

- [./migrations.md](./migrations.md)
- [./architecture.md](./architecture.md)
- [./rate-limiting.md](./rate-limiting.md)
