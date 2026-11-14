# BullMQ — Relay

| Name | Description | Path |
|------|-------------|------|
| Relay (overview) | Relay の概要（experimental）。トピックによるプロセス間リアルタイムメッセージング、Queue / QueueEvents / Redis pub/sub との比較。 | [overview.md](./overview.md) |
| Getting started | Relay の作成（Redis / PostgreSQL）、subscribe / publish、close、namespace、エラー処理。 | [getting-started.md](./getting-started.md) |
| Topics and patterns | トピックの規則とワイルドカード（`*` / `>`）、値のエンコード、設計指針。 | [topics-and-patterns.md](./topics-and-patterns.md) |
| Publishing and subscribing | ペイロード、配信対象・順序・保証、リスナー、遅いサブスクライバー。 | [messages.md](./messages.md) |
| Retained messages | トピックの最終値を保持して新規サブスクライバーへ即時配信。 | [retained-messages.md](./retained-messages.md) |
| Nodes and failures | lease / heartbeat、障害時の挙動、recovered / swept、graceful shutdown。 | [nodes-and-failures.md](./nodes-and-failures.md) |
| Backends | Redis / PostgreSQL バックエンド、キー構造、Redis Cluster、カスタムバックエンド。 | [backends.md](./backends.md) |
| Reference | `Relay` のオプション・メソッド・getter・イベント・エラーコード。 | [reference.md](./reference.md) |
| Relay compared to Kafka | Kafka との比較と使い分け。 | [relay-vs-kafka.md](./relay-vs-kafka.md) |
| Example: Live job progress | ジョブ進捗を retained message で API サーバーへ SSE 配信。 | [example-live-job-progress.md](./example-live-job-progress.md) |
| Example: Real-time notifications | WebSocket サーバー向けのリアルタイム通知。 | [example-realtime-notifications.md](./example-realtime-notifications.md) |
| Example: Cache invalidation | インメモリキャッシュの一斉無効化。 | [example-cache-invalidation.md](./example-cache-invalidation.md) |
| Example: Live configuration | フィーチャーフラグ等のライブ設定配信。 | [example-live-configuration.md](./example-live-configuration.md) |
| Example: Controlling workers | ワーカーの concurrency / pause を実行時に制御。 | [example-controlling-workers.md](./example-controlling-workers.md) |
| Example: Cancelling jobs on other workers | 他プロセスのワーカーで実行中のジョブをキャンセル。 | [example-cancelling-jobs-on-other-workers.md](./example-cancelling-jobs-on-other-workers.md) |
