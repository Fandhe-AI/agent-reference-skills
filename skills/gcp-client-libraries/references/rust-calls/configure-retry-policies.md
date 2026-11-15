---
source: https://docs.cloud.google.com/rust/docs/configure-retry-policies
---

# Configure retry policies (Rust)

The Cloud Client Libraries for Rust can automatically retry operations that fail due to transient errors. Set a default retry policy on the client builder with `with_retry_policy`, bound it with attempt and time limits, or override it for a single request.

## Signature / Usage

### Dependencies

```bash
cargo add google-cloud-secretmanager-v1 google-cloud-gax anyhow
```

### Default retry policy on a client

`Aip194Strict` implements the guidelines in [AIP-194](https://google.aip.dev/194) for retrying Google API requests. It retries transient errors only for requests that are idempotent or known not to have reached the service. Retried requests consume API quota and can incur billed charges.

```rust
use google_cloud_gax::paginator::ItemPaginator as _;
use google_cloud_gax::retry_policy::Aip194Strict;
use google_cloud_secretmanager_v1::client::SecretManagerService;

pub async fn sample(project_id: &str) -> anyhow::Result<()> {
    let client = SecretManagerService::builder()
        .with_retry_policy(Aip194Strict)
        .build()
        .await?;

    let mut list = client
        .list_secrets()
        .set_parent(format!("projects/{project_id}"))
        .by_item();
    while let Some(secret) = list.next().await {
        let secret = secret?;
        println!("  secret={}", secret.name);
    }

    Ok(())
}
```

### Default retry policy with limits

By default, `Aip194Strict` doesn't bound the number of attempts or total time spent retrying. Bring the `RetryPolicyExt` trait into scope and decorate the policy with `with_attempt_limit` and `with_time_limit`.

```rust
use google_cloud_gax::paginator::ItemPaginator as _;
use google_cloud_gax::retry_policy::Aip194Strict;
use google_cloud_gax::retry_policy::RetryPolicyExt;
use google_cloud_secretmanager_v1::client::SecretManagerService;
use std::time::Duration;

pub async fn sample(project_id: &str) -> anyhow::Result<()> {
    let client = SecretManagerService::builder()
        .with_retry_policy(
            Aip194Strict
                .with_attempt_limit(5)
                .with_time_limit(Duration::from_secs(15)),
        )
        .build()
        .await?;

    let mut list = client
        .list_secrets()
        .set_parent(format!("projects/{project_id}"))
        .by_item();
    while let Some(secret) = list.next().await {
        let secret = secret?;
        println!("  secret={}", secret.name);
    }

    Ok(())
}
```

### Override the retry policy for a single request

Override only when you know that retrying a specific operation is safe for your application. For example, deleting a secret can succeed at most once, even though the client library treats delete operations as non-idempotent by default. Bring `RequestOptionsBuilder`, `RetryPolicyExt` and `AlwaysRetry` into scope, then call `with_retry_policy` on the request builder.

```rust
use google_cloud_gax::options::RequestOptionsBuilder;
use google_cloud_gax::retry_policy::AlwaysRetry;
use google_cloud_gax::retry_policy::RetryPolicyExt;
use google_cloud_secretmanager_v1::client::SecretManagerService;
use std::time::Duration;

pub async fn sample(
    client: &SecretManagerService,
    project_id: &str,
    secret_id: &str,
) -> anyhow::Result<()> {
    client
        .delete_secret()
        .set_name(format!("projects/{project_id}/secrets/{secret_id}"))
        .with_retry_policy(
            AlwaysRetry
                .with_attempt_limit(5)
                .with_time_limit(Duration::from_secs(15)),
        )
        .send()
        .await?;

    Ok(())
}
```

## Options / Props

Items in `google_cloud_gax::retry_policy` (google-cloud-gax 1.15.0).

| Name | Kind | Description (from the crate docs) |
| --- | --- | --- |
| `RetryPolicy` | trait | Determines how errors are handled in the retry loop. |
| `Aip194Strict` | struct | Strictly follows AIP-194. Server-side retry decisions are based only on the status code, and the only retryable status code is `UNAVAILABLE`. Must be decorated to limit attempts or duration. |
| `AlwaysRetry` | struct | Retries all errors. May be useful if the service guarantees idempotency, maybe through the use of request ids. Must be decorated to limit attempts or duration. |
| `NeverRetry` | struct | Never retries. Useful when the client already has a retry policy and you want to avoid retrying a particular method. |
| `RetryPolicyExt::with_time_limit(Duration)` | method | Limits total elapsed time in the retry loop, including time in backoff. Returns `LimitedElapsedTime`. |
| `RetryPolicyExt::with_attempt_limit(u32)` | method | Limits the number of attempts. `on_error()` is not called before the initial attempt, so a limit of 0 or 1 means no retry attempts. Returns `LimitedAttemptCount`. |
| `RetryPolicyExt::continue_on_too_many_requests()` | method | Also retries HTTP 429 and `ResourceExhausted`. The latter is ambiguous (rate limit vs quota exceeded); consult the service documentation first. |
| `RetryPolicyExt::continue_on_client_timeout()` | method | Also retries client-side timeouts for idempotent requests. A timeout may occur after the service received the request. |
| `ClientBuilder::with_retry_policy` / `RequestOptionsBuilder::with_retry_policy` | method | Set the policy for all requests of a client, or for one request. |

## Notes

- Idempotency: retrying non-idempotent calls can duplicate side effects. The source overrides `delete_secret` only "when you know that retrying a specific operation is safe for your application", noting that "deleting a secret can succeed at most once, even though the client library treats delete operations as non-idempotent by default". `AlwaysRetry` retries all errors (crate docs: "may be useful if the service guarantees idempotency, maybe through the use of request ids"), so always bound it as shown.
- Distinct from `polling_error_policy::Aip194Strict`: this page covers `retry_policy::Aip194Strict` (trait `RetryPolicy`, extension trait `RetryPolicyExt`, setter `with_retry_policy`), which governs retries of the RPC itself, including the request that starts a long-running operation. The wait loop of an LRO is governed by `polling_error_policy::Aip194Strict` (see `configure-polling-policies.md`).
- The crate docs describe the client libraries as retrying when the RPC fails with a transient error and is idempotent, or failed before an RPC was started.
- Applies to google-cloud-gax 1.15.0 (crates.io; `rust_version` 1.91.0).
- Source: https://docs.cloud.google.com/rust/docs/configure-retry-policies (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.rs/crate/google-cloud-gax/1.15.0/source/src/retry_policy.rs (retrieved 2026-11-16; pinned at google-cloud-gax 1.15.0)
- Source: https://docs.rs/crate/google-cloud-gax/1.15.0/source/src/options.rs (retrieved 2026-11-16; pinned at google-cloud-gax 1.15.0)
- Source: https://docs.rs/crate/google-cloud-gax/1.15.0/source/src/client_builder.rs (retrieved 2026-11-16; pinned at google-cloud-gax 1.15.0)
- Code blocks above are the twin's "complete code" samples; the step-by-step fragments that duplicate them are omitted.

## Related

- [configure-polling-policies.md](./configure-polling-policies.md)
- [error-handling.md](./error-handling.md)
- [long-running-operations.md](./long-running-operations.md)
