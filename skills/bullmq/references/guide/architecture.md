# Architecture

BullMQ は Redis 上にジョブキュー機能を実装しており、明確に定義されたライフサイクルステート管理システムを持っています。ジョブは追加時に初期状態に入り、処理を経て完了または失敗状態に遷移します。

## ジョブのライフサイクル

ジョブが `Queue.add()` で追加されると、以下のいずれかの初期状態に入ります。

| State | Description |
|-------|-------------|
| `wait` | 処理前の標準待機リスト |
| `prioritized` | 優先度順に並べられたジョブ（0 が最高優先度、Unix `nice` 規約に従う） |
| `delayed` | 将来の処理のためにスケジュールされたジョブ。時間が来ると `wait` または `prioritized` に移動 |

### 処理フロー

```
add() → wait/prioritized/delayed
                ↓
             active（処理中）
                ↓
       completed / failed
```

## ステート遷移

```typescript
// ジョブの追加（wait 状態へ）
const queue = new Queue('myQueue');
await queue.add('myJob', { data: 'value' });

// 遅延ジョブの追加（delayed 状態へ）
await queue.add('delayedJob', { data: 'value' }, {
  delay: 5000, // 5秒後に wait に移動
});

// 優先度付きジョブの追加（prioritized 状態へ）
await queue.add('priorityJob', { data: 'value' }, {
  priority: 1, // 高優先度
});
```

| State | Description |
|-------|-------------|
| `active` | ワーカーが処理中の状態。ロックが取得される |
| `completed` | 処理が正常に完了した状態 |
| `failed` | プロセッサが例外を throw した、またはストールした状態 |
| `waiting-children` | 子ジョブの完了を待っている親ジョブの状態（FlowProducer 使用時） |

## FlowProducer パターン

FlowProducer を使用すると、親子関係を持つジョブフローを作成できます。親ジョブは `waiting-children` 状態に入り、すべての子ジョブが完了すると `wait` 状態に移動して処理されます。

```typescript
import { FlowProducer } from 'bullmq';

const flowProducer = new FlowProducer();

await flowProducer.add({
  name: 'parentJob',
  queueName: 'parentQueue',
  data: {},
  children: [
    {
      name: 'childJob1',
      queueName: 'childQueue',
      data: { step: 1 },
    },
    {
      name: 'childJob2',
      queueName: 'childQueue',
      data: { step: 2 },
    },
  ],
});
```

## 完全なライフサイクル図

```
                    ┌───────────┐
                    │  delayed   │
                    └─────┬─────┘
                          │ (時間経過)
                          ▼
add() ──→ ┌───────────────────────────┐
          │  wait / prioritized        │
          └─────────────┬─────────────┘
                        │
                        ▼
                  ┌───────────┐
                  │   active   │
                  └─────┬─────┘
                        │
              ┌─────────┴─────────┐
              ▼                   ▼
        ┌───────────┐      ┌───────────┐
        │ completed  │      │  failed   │
        └───────────┘      └───────────┘

FlowProducer:
add() ──→ waiting-children ──→ wait ──→ active ──→ completed/failed
```

## 注意点

- Redis はすべてのジョブデータとステート管理のバックエンドとして使用されます
- アクティブなジョブにはロックが設定され、他のワーカーが同じジョブを処理することを防ぎます
- ロックの有効期限はデフォルトで 30 秒で、ワーカーが定期的に更新します
- `maxmemory-policy` は必ず `noeviction` に設定する必要があります

## 関連

- [./going-to-production.md](./going-to-production.md)
- [./parallelism-and-concurrency.md](./parallelism-and-concurrency.md)
- [./troubleshooting.md](./troubleshooting.md)
