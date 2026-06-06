# Patterns

| Name | Description | Path |
|------|-------------|------|
| Adding Jobs in Bulk across Different Queues | 異なるキューに対してジョブをアトミックに一括追加するパターン。すべてのジョブが追加されるか、ま… | [adding-bulks.md](./adding-bulks.md) |
| Deduplication | ジョブの重複排除パターン。ジョブがアクティブになるまで、または Job Scheduler と組み合わせて重複… | [deduplication.md](./deduplication.md) |
| Failing Fast when Redis is Down | Redis がダウンしている場合に即座にエラーを返すパターン。`enableOfflineQueue: false` を設定して、… | [failing-fast-when-redis-is-down.md](./failing-fast-when-redis-is-down.md) |
| Flows | 複数のアクションを順次実行するフローパターン。失敗時に最初からやり直すのではなく、失敗したアクシ… | [flows.md](./flows.md) |
| Idempotent Jobs | 冪等なジョブの設計パターン。ジョブが初回で成功しても、失敗後のリトライで成功しても、システムの… | [idempotent-jobs.md](./idempotent-jobs.md) |
| Manual Retrying | 処理中のジョブを即座に wait 状態に戻してリトライするパターン。`moveToWait` メソッドと `Waiting… | [manual-retrying.md](./manual-retrying.md) |
| Manually Fetching Jobs | ジョブを手動で取得・処理するパターン。Worker にプロセッサ関数を渡さず、`getNextJob` でジョブを… | [manually-fetching-jobs.md](./manually-fetching-jobs.md) |
| Named Processor | ジョブ名に基づいて異なる処理ロジックを実行するパターン。switch 文を使って1つのワーカー内で複数… | [named-processor.md](./named-processor.md) |
| Process Step Jobs | プロセッサ関数をステップに分割し、各ステップの完了状態を保存しながら処理を進めるパターン。障害… | [process-step-jobs.md](./process-step-jobs.md) |
| Redis Cluster | Redis Cluster 環境で BullMQ を使用するパターン。ハッシュタグを使って関連するキーが同じハッシュ… | [redis-cluster.md](./redis-cluster.md) |
| Stop Retrying Jobs | 回復不可能なエラーが発生した場合にリトライを停止するパターン。`UnrecoverableError` をスローするこ… | [stop-retrying-jobs.md](./stop-retrying-jobs.md) |
| Throttle Jobs | 頻繁に発生するイベントに対してジョブのスロットリングを行うパターン。同一の `jobId` を指定すること… | [throttle-jobs.md](./throttle-jobs.md) |
| Timeout for Sandboxed Processors | サンドボックスプロセッサ（各ジョブが別プロセスで実行される）での TTL（Time-To-Live）メカニズム… | [timeout-for-sandboxed-processors.md](./timeout-for-sandboxed-processors.md) |
| Timeout Jobs | ジョブにタイムアウトを実装するパターン。BullMQ にはタイムアウト専用のメカニズムはないが、`AbortC… | [timeout-jobs.md](./timeout-jobs.md) |
