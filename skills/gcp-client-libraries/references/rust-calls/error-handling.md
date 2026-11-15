---
source: https://docs.cloud.google.com/rust/docs/error-handling
---

# Error handling (Rust)

The Rust client libraries return `google_cloud_gax::error::Error`. You can branch on service status codes (for example create a missing resource on `Code::NotFound`), examine rich error details (`StatusDetails`, such as `BadRequest` field violations or `QuotaFailure`), and resolve client-side HTTP binding errors caused by missing or malformed request fields.

## Signature / Usage

### Dependencies

```bash
cargo add google-cloud-secretmanager-v1 google-cloud-gax crc32c google-cloud-language-v2
```

### Branch on a service status code

Attempt the update; if the error is a service error with `Code::NotFound`, create the missing secret and try again. Retry policies already handle many other failures such as dropped connections.

```rust
use google_cloud_gax::error::Error;
use google_cloud_gax::error::rpc::Code;
use google_cloud_secretmanager_v1::client::SecretManagerService;
use google_cloud_secretmanager_v1::model::SecretVersion;

pub async fn sample(
    project_id: &str,
    secret_id: &str,
    data: Vec<u8>,
) -> anyhow::Result<SecretVersion> {
    let client = SecretManagerService::builder().build().await?;

    match update_attempt(&client, project_id, secret_id, data.clone()).await {
        Ok(version) => {
            println!("new version is {}", version.name);
            Ok(version)
        }
        Err(e) => {
            if let Some(status) = e.downcast_ref::<Error>().and_then(|e| e.status()) {
                if status.code == Code::NotFound {
                    let _ = create_secret(&client, project_id, secret_id).await?;
                    let version = update_attempt(&client, project_id, secret_id, data).await?;
                    println!("new version is {}", version.name);
                    return Ok(version);
                }
            }
            Err(e)
        }
    }
}
```

### Examine error details

Only errors returned by the service carry details; they are formatted by `std::fmt::Display` and exposed as a `StatusDetails` enum. Other variants, such as `QuotaFailure`, might be useful at runtime to throttle an application. This sample intentionally sends a bad request (no document content) to the Cloud Natural Language API.

```rust
use google_cloud_gax::error::rpc::StatusDetails;
use google_cloud_language_v2::client::LanguageService;
use google_cloud_language_v2::model::Document;
use google_cloud_language_v2::model::document::Type;

pub async fn sample() -> anyhow::Result<()> {
    let client = LanguageService::builder().build().await?;

    let result = client
        .analyze_sentiment()
        .set_document(
            Document::new()
                // Missing document contents
                // .set_content("Hello World!")
                .set_type(Type::PlainText),
        )
        .send()
        .await;

    let err = result.expect_err("the request should have failed");
    println!("\nrequest failed with error {err:#?}");

    if let Some(status) = err.status() {
        println!(
            "  status.code={}, status.message={}",
            status.code, status.message,
        );
        for detail in status.details.iter() {
            match detail {
                StatusDetails::BadRequest(bad) => {
                    for f in bad.field_violations.iter() {
                        println!(
                            "  the request field {} has a problem: \"{}\"",
                            f.field, f.description
                        );
                    }
                }
                _ => {
                    println!("  additional error details: {detail:?}");
                }
            }
        }
    }

    Ok(())
}
```

### Resolve binding errors

When a request is sent over HTTP, some RPCs map to several URIs and the request content selects one. A binding error is returned only if no URI works, typically because a field is missing or has an invalid format. For example, omitting the required `name` of `get_secret` produces:

> Error: cannot find a matching binding to send the request: at least one of the conditions must be met: (1) field `name` needs to be set and match the template: 'projects/\*/secrets/\*' OR (2) field `name` needs to be set and match the template: 'projects/\*/locations/\*/secrets/\*'

Fix it by setting the field to match one of the templates: `.set_name("projects/my-project/secrets/my-secret")` (first) or `.set_name("projects/my-project/locations/us-central1/secrets/my-secret")` (second).

### Inspect a binding error programmatically

The type is `google_cloud_gax::error::binding::BindingError`.

```rust
let secret = client
    .get_secret()
    //.set_name("projects/my-project/secrets/my-secret")
    .send()
    .await;

let e = secret.unwrap_err();
assert!(e.is_binding(), "{e:?}");
assert!(e.source().is_some(), "{e:?}");
let _ = e
    .source()
    .and_then(|e| e.downcast_ref::<BindingError>())
    .expect("should be a BindingError");
```

## Options / Props

### Template wildcards

| Wildcard | Meaning | Examples |
| --- | --- | --- |
| `*` | Non-empty string without `/`, like regex `[^/]+`. | `projects/*` matches `projects/p`; does not match `projects/`, `projects/p/` or `projects/p/locations/l`. `*` does not match `""` or `string/with/slashes`. |
| `**` | Any string, including empty or containing `/`, like regex `.*`. When a template ends in `/**`, the initial slash is optional. | `**` matches `""`; `projects/*/**` matches `projects/p`, `projects/p/locations` and `projects/p/locations/l`, but not `locations/l` or `projects//locations/l`. |

### `google_cloud_gax::error::Error` predicates and accessors

Public (google-cloud-gax 1.15.0): `status()`, `http_status_code()`, `http_headers()`, `http_payload()`, `is_timeout()`, `is_exhausted()`, `is_serialization()`, `is_deserialization()`; constructors `Error::service(Status)`, `Error::timeout`, `Error::exhausted`.

Hidden from rustdoc and documented in `core_error.rs` as "Not part of the public API, subject to change without notice": `is_binding()`, `is_authentication()`, `is_io()`, `is_connect()`, `is_transport()`, `Error::binding`. The binding-error sample above uses `is_binding()` as the official docs do.

## Notes

- Retry loops and idempotency: the source's `create_secret` helper (not reproduced here) sets `AlwaysRetry` with an attempt limit of 5 and a time limit of 60 s on a create call. Retrying non-idempotent calls can duplicate side effects; use request ids where the API supports them and see `configure-retry-policies.md`.
- Fragments: the first block calls the helpers `update_attempt` (adds a secret version with a CRC32C checksum) and `create_secret`, which are not reproduced; the binding-inspection block assumes a `client` and needs `BindingError` and `std::error::Error` in scope.
- Source inconsistency: the twin's "Expected output" for examine-details shows `status.status=Some("INVALID_ARGUMENT")`, which the sample code never prints; it is omitted here.
- The samples also need `anyhow` (not in the source's `cargo add`).
- `Status` has public fields `code`, `message` and `details` (`Vec<StatusDetails>`).
- Applies to google-cloud-gax 1.15.0 (`rust_version` 1.91.0).
- Source: https://docs.cloud.google.com/rust/docs/error-handling (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.rs/crate/google-cloud-gax/1.15.0/source/src/error/core_error.rs (retrieved 2026-11-16; pinned at google-cloud-gax 1.15.0)
- Source: https://docs.rs/crate/google-cloud-gax/1.15.0/source/src/error/rpc.rs (retrieved 2026-11-16; pinned at google-cloud-gax 1.15.0)
- Source: https://docs.rs/crate/google-cloud-gax/1.15.0/source/src/error/binding.rs (retrieved 2026-11-16; pinned at google-cloud-gax 1.15.0)

## Related

- [configure-retry-policies.md](./configure-retry-policies.md)
- [configure-polling-policies.md](./configure-polling-policies.md)
- [working-with-enums.md](./working-with-enums.md)
