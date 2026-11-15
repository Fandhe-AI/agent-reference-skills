---
source: https://docs.cloud.google.com/rust/docs/enable-logging
---

# Enable logging

The Rust client libraries use Tokio's `tracing` crate for scoped, structured, async-aware diagnostics. Initialize a `tracing` subscriber in your application and enable tracing on the client with `.with_tracing()` to log requests and responses.

## Signature / Usage

### Dependencies

```bash
cargo add google-cloud-secretmanager-v1 google-cloud-gax
cargo add tracing tracing-subscriber
```

### Initialize a subscriber and a client with tracing

```rust
use google_cloud_gax::paginator::ItemPaginator;
use google_cloud_secretmanager_v1::client::SecretManagerService;
use tracing_subscriber;
```

```rust
tracing_subscriber::fmt::init();
```

```rust
let client = SecretManagerService::builder()
    .with_tracing()
    .build()
    .await?;
```

### Send a request

```rust
let mut items = client
    .list_secrets()
    .set_parent(format!("projects/{project_id}"))
    .by_item();
println!("listing all secrets in project {project_id}");
while let Some(secret) = items.next().await.transpose()? {
    println!("  {secret:?}");
}
println!("DONE");
```

### Expected output

```text
2025-11-03T14:17:31.759452Z  INFO list_secrets{self=SecretManagerService ...
```

The line includes the request (`req=ListSecretsRequest { parent: "projects/... }`) and the response (`return=Ok(Response { parts: ..., body: ListSecretsResponse { ...`).

## Notes

- Warning from the source: these logs are for debugging. They include full request and response messages, which may contain sensitive information. Consider security and privacy before enabling them in production.
- The blocks are fragments of an async function `sample(project_id: &str) -> anyhow::Result<()>`; the signature block is omitted.
- The default subscriber from `tracing_subscriber::fmt::init()` is configured dynamically with the `RUST_LOG` environment variable.
- `.with_tracing()` is the `ClientBuilder` method of google-cloud-gax 1.15.0. For traces, logs and metrics export see `observability.md`. For gRPC transport debugging see `troubleshooting.md`.
- Source inconsistency: the twin's expected output (dated 2025-11-03) shows the request and response on an `INFO` line, but the google-cloud-gax 1.15.0 `with_tracing` doc says full request/response bodies are in `DEBUG` spans with target `<crate>::tracing` (for example `google_cloud_secretmanager_v1::tracing`). Raise `RUST_LOG` for that target to see them; see `observability.md`.
- Source: https://docs.cloud.google.com/rust/docs/enable-logging (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.rs/crate/google-cloud-gax/1.15.0/source/src/client_builder.rs (retrieved 2026-11-16; google-cloud-gax 1.15.0)

## Related

- [observability.md](./observability.md)
- [troubleshooting.md](./troubleshooting.md)
- [configure-client.md](./configure-client.md)
