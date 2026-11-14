# BullMQ — Rust

BullMQ は Rust クレートとして提供されており、フル async/await サポートを持つ。

## Signature / Usage

```bash
cargo add bullmq-official --rename bullmq
```

```toml
[dependencies]
bullmq = { version = "1.2", package = "bullmq-official" }
```

Requirements: Rust 1.85+, Tokio runtime, Redis 6.2+ (or a compatible server such as Valkey or Dragonfly)

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

- Install: the crate is published as `bullmq-official` and imported in code as `bullmq` (`use bullmq::{Queue, Worker};`); the `bullmq`, `bullmq-rust` and `bullmq-rs` names on crates.io belong to unrelated third-party crates (official page, v6.7.6). A previous version of this page showed `bullmq = "0.1"` / `cargo add bullmq`, which would install an unrelated crate.
- It uses the same Lua scripts and Redis data structures as the Node.js, Python, Elixir, .NET and PHP SDKs, so the SDKs are fully interoperable (also on Redis Cluster, as long as they use the same prefix).
- Source: https://github.com/taskforcesh/bullmq/blob/v6.7.6/docs/gitbook/rust/introduction.md (tag v6.7.6, fetched 2026-11-14)
- 並行数は `worker.set_concurrency(n)` でランタイムに変更可能
- イベントは EventEmitter ではなく `mpsc::UnboundedReceiver<WorkerEvent>` で受け取る
- エラーハンドリングは例外ではなく `Result<T, Error>` 型で行う
- Tokio マルチスレッドランタイムにより、Node.js と異なり全 CPU コアを活用できる

### Redis Cluster

To connect to a Redis Cluster, set `cluster_nodes` to one or more seed node URLs; the rest of the topology is discovered automatically. In cluster mode `url`, `host`, `port` and `db` are ignored, while `username`, `password`, `tls` and `tls_certs` apply to every node. BullMQ's Lua scripts access several keys of a queue at once, so all of them must live in the same hash slot: as with the Node.js and Python versions, use a hash tag in the prefix (or in the queue name). Flows spanning several queues require the hash tag in the shared prefix.

```rust
use bullmq::{Queue, QueueOptions, Worker, WorkerOptions};
use bullmq::options::RedisConnectionOptions;

let conn = RedisConnectionOptions::new().cluster_nodes([
    "redis://10.0.0.1:7000",
    "redis://10.0.0.2:7000",
    "redis://10.0.0.3:7000",
]);

let queue = Queue::with_options("my-queue", QueueOptions {
    connection: conn.clone(),
    prefix: "{bull}".to_string(),
    ..Default::default()
}).await?;

let worker = Worker::with_options("my-queue", processor, WorkerOptions {
    connection: conn,
    prefix: "{bull}".to_string(),
    ..Default::default()
}).await?;
```

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
