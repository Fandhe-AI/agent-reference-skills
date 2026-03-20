# Migrations

BullMQ のバージョンアップ戦略と、Bull から BullMQ への移行方法をまとめています。破壊的変更への対応方法や、安全な移行パターンを解説します。

---

## バージョンアップの種類

| アップグレードタイプ | バージョン番号 | リスク | 対応方法 |
|---------------------|--------------|--------|---------|
| バグフィックス | マイクロバージョン（x.x.Z） | 低 | 全インスタンスを更新するだけ |
| 機能追加 | マイナーバージョン（x.Y.x） | 中 | まず BullMQ を更新、次に新機能を使うコードをデプロイ |
| 破壊的変更（API） | メジャーバージョン（X.x.x） | 高 | TypeScript コンパイルとユニットテストで検出可能 |
| 破壊的変更（データ構造） | メジャーバージョン（X.x.x） | 最高 | ロールバックが困難な場合がある |

## データ構造の破壊的変更

データ構造の破壊的変更には 2 種類あります:

- **追加的変更**: 新しいデータ構造が追加される。比較的対処しやすい
- **破壊的変更**: 既存のデータ構造が変更される。最も複雑で、ロールバックが困難になる可能性がある

## アップグレード戦略

### 1. Pause/Upgrade/Unpause

```typescript
// 1. キューを一時停止
await queue.pause();

// 2. 処理中のジョブの完了を待つ
await worker.close();

// 3. 全インスタンスをアップグレード

// 4. 新しいワーカーを起動
const newWorker = new Worker('myQueue', processor);

// 5. キューを再開
await queue.resume();
```

### 2. 新しいキューアプローチ

新しいキュー（別の Redis インスタンスまたはバージョン固有の名前）を作成し、古いキューと並行運用する方法です。

```typescript
// 旧キュー（処理完了まで維持）
const oldQueue = new Queue('myQueue-v1');
const oldWorker = new Worker('myQueue-v1', processor);

// 新キュー（新しいジョブはこちらに追加）
const newQueue = new Queue('myQueue-v2');
const newWorker = new Worker('myQueue-v2', newProcessor);
```

---

## Bull から BullMQ への移行

Bull と BullMQ は大きく異なるため、後方互換性は保証されません。安全な移行のためには並行運用が推奨されます。

### 移行手順

1. **BullMQ 用の新しいキューを作成する**（別の名前またはカスタム prefix を使用）
2. **Bull と BullMQ のワーカーを同時に実行する**
3. **新しいジョブの送信先を BullMQ キューに切り替える**
4. **既存の Bull キューのジョブが自然に完了するのを待つ**
5. **Bull キューが空になったら削除する**

### prefix を使用した並行運用

```typescript
import { Queue as BullMQQueue, Worker as BullMQWorker } from 'bullmq';

// BullMQ キュー（カスタム prefix で Bull と分離）
const bullmqQueue = new BullMQQueue('myQueue', {
  prefix: 'bullmq',
  connection: { host: 'localhost', port: 6379 },
});

const bullmqWorker = new BullMQWorker('myQueue', async job => {
  // 新しいプロセッサロジック
}, {
  prefix: 'bullmq',
  connection: { host: 'localhost', port: 6379 },
});
```

### 主な違い（Bull vs BullMQ）

| 機能 | Bull | BullMQ |
|------|------|--------|
| QueueScheduler | 不要 | v2.0 で廃止（機能は内蔵） |
| FlowProducer | なし | あり（親子ジョブのフロー） |
| グループレート制限 | あり | v3.0 で削除 |
| TypeScript サポート | 部分的 | 完全 |
| Redis Streams | 未使用 | 使用 |

## 注意点

- アップグレード前に必ず CHANGELOG を確認すること
- 大きなバージョンジャンプは避け、段階的にアップグレードすること
- データ構造の破壊的変更がある場合、ロールバック計画を事前に立てること
- Bull から BullMQ への移行時は、ダッシュボード（taskforce.sh など）でキューの状態を監視し、レガシーキューが完全にドレインされたことを確認してから削除すること

## 関連

- [./architecture.md](./architecture.md)
- [./queuescheduler.md](./queuescheduler.md)
- [./going-to-production.md](./going-to-production.md)
