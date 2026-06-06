# samples

| Name | Description | Path |
|------|-------------|------|
| Basic Queue and Worker | Queue にジョブを追加し、Worker で処理する最小構成。 | [basic-queue-and-worker.md](./basic-queue-and-worker.md) |
| Bulk Add | 複数ジョブをアトミックに一括追加し、Redis へのラウンドトリップを削減する。 | [bulk-add.md](./bulk-add.md) |
| Concurrency | Worker の concurrency オプションで単一プロセスが同時処理するジョブ数を制御する。 | [concurrency.md](./concurrency.md) |
| Delayed Jobs | ジョブの処理を指定時間後まで遅らせる設定。 | [delayed-jobs.md](./delayed-jobs.md) |
| Flow Producer | FlowProducer で親子関係を持つジョブを定義し、子が全て完了したら親を実行するワークフロー。 | [flow-producer.md](./flow-producer.md) |
| Graceful Shutdown | SIGTERM シグナルを受け取ったときに処理中のジョブを完了させてから Worker を安全に停止する。 | [graceful-shutdown.md](./graceful-shutdown.md) |
| Job Scheduler (Cron) | cron 式または固定間隔でジョブを定期実行するスケジューラの設定。 | [job-scheduler-cron.md](./job-scheduler-cron.md) |
| Priority Jobs | priority オプションで処理順序を制御し、重要なジョブを優先して処理する。 | [priority-jobs.md](./priority-jobs.md) |
| Queue Events | QueueEvents で全 Worker のイベントを一元監視し、ジョブの完了・失敗・進捗を追跡する。 | [queue-events.md](./queue-events.md) |
| Rate Limiting | Worker の limiter オプションでジョブの処理速度をグローバルに制限する。 | [rate-limiting.md](./rate-limiting.md) |
| Retry with Backoff | 失敗したジョブを指数バックオフで自動リトライする設定。 | [retry-with-backoff.md](./retry-with-backoff.md) |
| Step Jobs | ジョブの処理をステップに分割し、障害時に途中のステップから再開できるパターン。 | [step-jobs.md](./step-jobs.md) |
