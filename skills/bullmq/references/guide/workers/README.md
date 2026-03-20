# BullMQ — Workers

ジョブの処理、並行処理、イベントリスニング、停止制御に関するガイド。

| Name | Description | Path |
|------|-------------|------|
| Workers | Worker クラスの基本、プロセッサ関数、イベント | [./workers.md](./workers.md) |
| Auto-removal of jobs | Worker オプションによる完了・失敗ジョブの自動削除 | [./auto-removal-of-jobs.md](./auto-removal-of-jobs.md) |
| Concurrency | ワーカー単位の並行処理数設定 | [./concurrency.md](./concurrency.md) |
| Graceful Shutdown | ワーカーの安全な停止方法 | [./graceful-shutdown.md](./graceful-shutdown.md) |
| Cancelling Jobs | 実行中ジョブのキャンセル（AbortSignal） | [./cancelling-jobs.md](./cancelling-jobs.md) |
| Stalled Jobs | 停滞ジョブの検出と復旧 | [./stalled-jobs.md](./stalled-jobs.md) |
| Sandboxed Processors | 別スレッドでのジョブ処理（サンドボックス） | [./sandboxed-processors.md](./sandboxed-processors.md) |
| Pausing Queues | キューの一時停止と再開 | [./pausing-queues.md](./pausing-queues.md) |
