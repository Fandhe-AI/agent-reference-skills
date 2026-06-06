# BullMQ — Rust

BullMQ は Rust クレートとして提供されており、フル async/await サポートを持つ。

## Signature / Usage

```toml
[dependencies]
bullmq = "0.1"
```

```bash
cargo add bullmq
```

Requirements: Rust 1.85+, Tokio runtime, Redis 6.2+

## キューへのジョブ追加

```rust
use bullmq::{Queue, QueueOptions};

#[tokio::main]
async fn main() -> bullmq::Result<()> {
    let queue = Queue::new("my-queue", QueueOptions::default()).await?;

    queue.add("my-job", serde_json::json!({
        "foo": "bar"
    }), None).await?;

    Ok(())
}
```

## ワーカーによるジョブ処理

```rust
use bullmq::{Worker, WorkerOptions, Job};
use bullmq::worker::{ProcessorFn, CancellationToken};
use std::sync::Arc;

#[tokio::main]
async fn main() -> bullmq::Result<()> {
    let processor: ProcessorFn = Arc::new(|job: Job, _token: CancellationToken| {
        Box::pin(async move {
            println!("Processing job: {} - {}", job.id(), job.name());
            Ok(serde_json::json!({"processed": true}))
        })
    });

    let worker = Worker::new("my-queue", processor, WorkerOptions::default()).await?;

    tokio::signal::ctrl_c().await.unwrap();
    worker.close(5000).await?;
    Ok(())
}
```

## Options

| Name | Type | Description |
|------|------|-------------|
| `concurrency` | `usize` | 並行処理数（デフォルト: 1） |
| `connection` | `RedisConnectionOptions` | Redis 接続設定 |
| `attempts` | `Option<u32>` | ジョブの最大試行回数 |
| `backoff` | `Option<BackoffStrategy>` | バックオフ戦略（`Exponential(ms)` 等） |

## Notes

- Node.js / Python 版と同じ Lua スクリプトおよび Redis データ構造を使用するため、言語間で完全に互換性がある
- 並行数は `worker.set_concurrency(n)` でランタイムに変更可能
- イベントは EventEmitter ではなく `mpsc::UnboundedReceiver<WorkerEvent>` で受け取る
- エラーハンドリングは例外ではなく `Result<T, Error>` 型で行う
- Tokio マルチスレッドランタイムにより、Node.js と異なり全 CPU コアを活用できる

## Node.js との主な違い

| Aspect | Node.js | Rust |
|--------|---------|------|
| Runtime | Event loop (single-threaded) | Tokio (multi-threaded async) |
| Processor | `async function` | `Arc<dyn Fn(Job, CancellationToken) -> Pin<Box<...>>>` |
| Events | EventEmitter | `mpsc::UnboundedReceiver<WorkerEvent>` |
| Error handling | Exceptions | `Result<T, Error>` |
| Cancellation | AbortSignal | `CancellationToken` |
| Concurrency | Cooperative (single core) | True parallelism across all CPU cores |

## Related

- [./python.md](./python.md)
- [./elixir.md](./elixir.md)
- [./php.md](./php.md)
