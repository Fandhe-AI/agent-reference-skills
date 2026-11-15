---
source: https://docs.cloud.google.com/rust/docs/configure-polling-policies
---

# Configure polling policies (Rust)

Two policies control the LRO polling loop in the Cloud Client Libraries for Rust: the polling backoff policy (how long to wait before polling an in-progress LRO) and the polling error policy (which polling errors are transient and which are unrecoverable). Each can be set independently on the client builder or on an individual request.

## Signature / Usage

### Dependencies

```bash
cargo add google-cloud-storage google-cloud-lro google-cloud-gax anyhow
```

### Polling frequency for all requests on a client

Configure exponential polling backoff on the client builder. It applies to every LRO started by the client unless overridden on a request. The library waits 250 ms after the first poll and 500 ms after the second; the delay then doubles to 1 s, 2 s, 4 s and 8 s before capping at 10 s for all subsequent polls.

```rust
pub async fn client_backoff(bucket: &str, folder: &str, dest: &str) -> Result<()> {
    use google_cloud_gax::exponential_backoff::ExponentialBackoffBuilder;
    use google_cloud_lro::Poller;
    use std::time::Duration;

    let client = StorageControl::builder()
        .with_polling_backoff_policy(
            ExponentialBackoffBuilder::new()
                .with_initial_delay(Duration::from_millis(250))
                .with_maximum_delay(Duration::from_secs(10))
                .build()?,
        )
        .build()
        .await?;

    let response = client
        .rename_folder()
        .set_name(format!("projects/_/buckets/{bucket}/folders/{folder}"))
        .set_destination_folder_id(dest)
        .poller()
        .until_done()
        .await?;

    println!("LRO completed, response={response:?}");

    Ok(())
}
```

For a single request, bring `RequestOptionsBuilder` into scope and call `with_polling_backoff_policy` on the request builder (for example `client.rename_folder().with_polling_backoff_policy(...)`). It overrides any client-level polling backoff policy.

### Polling error policy for all requests on a client

Pass a type that implements `PollingErrorPolicy`, such as `polling_error_policy::Aip194Strict`. It governs errors only during the LRO wait loop. To handle transient errors when sending the initial request that starts the LRO, also configure a standard retry policy (`retry_policy::Aip194Strict`) on the client.

```rust
pub async fn client_errors(bucket: &str, folder: &str, dest: &str) -> Result<()> {
    use google_cloud_gax::polling_error_policy::Aip194Strict;
    use google_cloud_gax::polling_error_policy::PollingErrorPolicyExt;
    use google_cloud_gax::retry_policy;
    use google_cloud_gax::retry_policy::RetryPolicyExt;
    use std::time::Duration;
    use google_cloud_lro::Poller;

    let builder = StorageControl::builder().with_polling_error_policy(
        Aip194Strict
            .with_attempt_limit(100)
            .with_time_limit(Duration::from_secs(300)),
    );

    let client = builder
        .with_retry_policy(
            retry_policy::Aip194Strict
                .with_attempt_limit(100)
                .with_time_limit(Duration::from_secs(300)),
        )
        .build()
        .await?;

    let response = client
        .rename_folder()
        .set_name(format!("projects/_/buckets/{bucket}/folders/{folder}"))
        .set_destination_folder_id(dest)
        .poller()
        .until_done()
        .await?;

    println!("LRO completed, response={response:?}");

    Ok(())
}
```

### Polling error policy for a specific request

Bring `RequestOptionsBuilder` into scope (`use google_cloud_gax::options::RequestOptionsBuilder;`) and call `with_polling_error_policy` on the request builder (for example `client.rename_folder().with_polling_error_policy(...)`), passing the same `Aip194Strict.with_attempt_limit(100).with_time_limit(Duration::from_secs(300))` value as in `client_errors`. The source's `rpc_errors` sample keeps the client-level `retry_policy::Aip194Strict` with the same limits for the initial request.

## Options / Props

| Name | Kind | Description |
| --- | --- | --- |
| `with_polling_backoff_policy` | builder method | Takes `PollingBackoffPolicy` (via `PollingBackoffPolicyArg`). On `ClientBuilder` or `RequestOptionsBuilder`. |
| `with_polling_error_policy` | builder method | Takes `PollingErrorPolicy` (via `PollingErrorPolicyArg`). On `ClientBuilder` or `RequestOptionsBuilder`. |
| `ExponentialBackoffBuilder::new()` | builder | Defaults: initial delay 1 s, maximum delay 60 s, scaling 2.0. |
| `with_initial_delay` / `with_maximum_delay` / `with_scaling` | builder methods | Change the exponential backoff parameters. `build()` returns an error if scaling < 1.0, initial delay is zero, or maximum delay < initial delay. `clamp()` instead clamps scaling to [1.0, 32.0], maximum delay to [1 s, 1 day] and initial delay to [1 ms, maximum]. |
| `polling_error_policy::Aip194Strict` | struct | Strictly follows AIP-194 using the status code. Must be decorated to limit attempts or duration. Per the twin, retries transient I/O and `UNAVAILABLE` polling errors. |
| `polling_error_policy::AlwaysContinue` | struct | Continues regardless of the error. Must be decorated to limit attempts or duration. |
| `PollingErrorPolicyExt::with_attempt_limit(u32)` | method | Limits poll attempts; `on_error()` is called only after a polling attempt, so 0 or 1 means no polling after the LRO starts. |
| `PollingErrorPolicyExt::with_time_limit(Duration)` | method | Limits total time in the polling loop, including backoff. |

## Notes

- Two different `Aip194Strict` types exist. `retry_policy::Aip194Strict` (trait `RetryPolicy`, extension `RetryPolicyExt`, setter `with_retry_policy`) governs retrying of RPCs, including the request that starts the LRO, and is idempotency-aware as described in `configure-retry-policies.md`. `polling_error_policy::Aip194Strict` (trait `PollingErrorPolicy`, extension `PollingErrorPolicyExt`, setter `with_polling_error_policy`) governs errors only during the LRO wait loop. Import them from separate modules: the samples `use google_cloud_gax::polling_error_policy::Aip194Strict;` and refer to the retry one by its module path after `use google_cloud_gax::retry_policy;` (`retry_policy::Aip194Strict`). Configure both.
- With `Aip194Strict` plus `with_attempt_limit(100)` and `with_time_limit(Duration::from_secs(300))`, polling stops after 100 attempts or 300 s, whichever comes first.
- Prerequisites in the source: a Cloud Storage bucket with hierarchical namespace enabled, a source folder to rename, and an IAM role with permission to manage folders, such as Storage Admin (`roles/storage.admin`). Product-specific usage belongs to `gcp-storage`.
- Fragments: the blocks use `Result` and `StorageControl` without declaring them (the source omits them). `StorageControl` is `google_cloud_storage::client::StorageControl` (see the declarations in `long-running-operations.md`). `Result` must accept the `ExponentialBackoffBuilder::build()` error, for example `anyhow::Result`; the source's `cargo add` includes `anyhow`, but the alias itself is not shown.
- Applies to google-cloud-gax 1.15.0 and google-cloud-lro 1.12.0 (`rust_version` 1.91.0).
- Source: https://docs.cloud.google.com/rust/docs/configure-polling-policies (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.rs/crate/google-cloud-gax/1.15.0/source/src/polling_error_policy.rs (retrieved 2026-11-16; pinned at google-cloud-gax 1.15.0)
- Source: https://docs.rs/crate/google-cloud-gax/1.15.0/source/src/exponential_backoff.rs (retrieved 2026-11-16; pinned at google-cloud-gax 1.15.0)
- Source: https://docs.rs/crate/google-cloud-gax/1.15.0/source/src/options.rs (retrieved 2026-11-16; pinned at google-cloud-gax 1.15.0)
- Source: https://docs.rs/crate/google-cloud-gax/1.15.0/source/src/client_builder.rs (retrieved 2026-11-16; pinned at google-cloud-gax 1.15.0)
- Source: https://docs.rs/crate/google-cloud-gax/1.15.0/source/src/polling_backoff_policy.rs (retrieved 2026-11-16; pinned at google-cloud-gax 1.15.0)
- The twin's `rpc_backoff` and `rpc_errors` samples are described in prose rather than repeated.

## Related

- [configure-retry-policies.md](./configure-retry-policies.md)
- [long-running-operations.md](./long-running-operations.md)
- [error-handling.md](./error-handling.md)
