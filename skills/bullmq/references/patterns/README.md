# Patterns

| Name | Description | Path |
|------|-------------|------|
| Adding Jobs in Bulk across Different Queues | 異なるキューへのジョブをアトミックに一括追加。全件追加か全件不追加かを保証し、Redis ラウンドトリップも削減 | [adding-bulks.md](./adding-bulks.md) |
| Deduplication | ジョブの重複排除。アクティブになるまで、または Job Scheduler と組み合わせて重複を防止 | [deduplication.md](./deduplication.md) |
| Failing Fast when Redis is Down | Redis ダウン時に即座にエラーを返す。`enableOfflineQueue: false` で再接続待ちを回避 | [failing-fast-when-redis-is-down.md](./failing-fast-when-redis-is-down.md) |
| Flows | 複数アクションを順次実行。失敗したアクションだけを再実行し、残りは継続 | [flows.md](./flows.md) |
| Idempotent Jobs | 冪等なジョブ設計。初回成功でもリトライ成功でも、システムの最終状態が同じになる | [idempotent-jobs.md](./idempotent-jobs.md) |
| Manual Retrying | 処理中のジョブを即座に wait 状態に戻してリトライ。`moveToWait` と `WaitingError` で実装 | [manual-retrying.md](./manual-retrying.md) |
| Manually Fetching Jobs | Worker にプロセッサを渡さず、`getNextJob` でジョブを1つずつ取得して処理 | [manually-fetching-jobs.md](./manually-fetching-jobs.md) |
| Named Processor | ジョブ名に基づいて処理ロジックを分岐。1 ワーカー内で switch により複数のジョブタイプを処理 | [named-processor.md](./named-processor.md) |
| Process Step Jobs | プロセッサをステップに分割し、各ステップの完了状態を保存。障害時は途中のステップから再開 | [process-step-jobs.md](./process-step-jobs.md) |
| Redis Cluster | Redis Cluster で BullMQ を使用。ハッシュタグで関連キーを同一ハッシュスロットに配置 | [redis-cluster.md](./redis-cluster.md) |
| Stop Retrying Jobs | 回復不可能なエラーでリトライを停止。`UnrecoverableError` で `attempts` に関係なく即 failed | [stop-retrying-jobs.md](./stop-retrying-jobs.md) |
| Throttle Jobs | 頻発するイベントのスロットリング。同一の `jobId` を指定して重複ジョブの追加を防止 | [throttle-jobs.md](./throttle-jobs.md) |
| Timeout for Sandboxed Processors | サンドボックスプロセッサの TTL 実装。ソフトキルとハードキルの 2 段階タイムアウトを提供 | [timeout-for-sandboxed-processors.md](./timeout-for-sandboxed-processors.md) |
| Timeout Jobs | ジョブのタイムアウトを `AbortController` と `setTimeout` で実装（専用機構は無い） | [timeout-jobs.md](./timeout-jobs.md) |
