# BullMQ — Stalled Jobs

Worker がジョブを処理中にロック更新に失敗すると、そのジョブは「stalled（停滞）」とマークされる。BullMQ はジョブロックメカニズムにより、Worker の健全性を監視し、停滞ジョブを自動的に復旧する。

## ジョブロックメカニズム

ジョブが Worker に到達すると、BullMQ はそのジョブにロックを設定する。Worker は定期的にロックを更新し、まだ処理中であることを通知する必要がある。

## Stalled が発生するケース

CPU 集約型の処理でイベントループがブロックされると、Worker がロック更新の通知を送信できなくなる。この場合、ジョブは stalled としてマークされる。

stalled になったジョブは:
- **waiting 状態に戻る**: 他の Worker によって再処理される
- **failed 状態に移行**: `maxStalledCount` を超えた場合

## 設定オプション

| Name | Type | Description |
|------|------|-------------|
| `stalledInterval` | `number` | ロック更新通知の間隔（ミリ秒）。通常は変更不要 |
| `maxStalledCount` | `number` | stalled の最大許容回数。この回数を超えると failed に移行 |
| `lockDuration` | `number` | ジョブロックの有効期間（ミリ秒） |

## 注意点

- Node.js のシングルスレッドイベントループアーキテクチャにより、CPU 集約型の処理はロック更新を妨げる可能性がある
- プロセッサ関数は **Node.js のイベントループに頻繁に制御を返す** よう設計する必要がある
- CPU 集約型の処理には [Sandboxed Processors](./sandboxed-processors.md) の使用が推奨される
- `stalledInterval` は通常デフォルト値のまま使用すべきであり、変更は慎重に行うこと
- BullMQ 2.0 以前では stalled ジョブの検出に `QueueScheduler` が必要だった。2.0 以降では Worker 自体が stalled チェックを実行する

## 関連

- [Sandboxed Processors](./sandboxed-processors.md)
- [Graceful Shutdown](./graceful-shutdown.md)
- [Workers](./workers.md)
