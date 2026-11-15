---
source: https://docs.cloud.google.com/rust/docs/configure-client
---

# Configure a client

Configure client behavior (endpoint, authentication, tracing, retries) with the `ClientBuilder` returned by the service client's `builder()` method, for example `SecretManagerService::builder()`; proxies are configured with environment variables.

## Signature / Usage

### Configure a proxy

The clients use the standard `reqwest` proxy environment variables. No proxy code is needed.

```bash
export http_proxy="http://proxy.example.com:3128"
export https_proxy="http://proxy.example.com:3128"
```

### Universe domain

`ClientBuilder::with_universe_domain` sets the default service domain for a cloud universe. The default is `googleapis.com`. It is documented only in the crate source, not in a guide.

Adapted (not in the official docs): replaced the doc-hidden placeholder `examples::Client` with the real `SecretManagerService` client used in the quickstart; the method chain is unchanged.

```rust
use google_cloud_secretmanager_v1::client::SecretManagerService;
let client = SecretManagerService::builder()
    .with_universe_domain("googleapis.com")
    .build().await?;
```

If the client universe domain does not match the one in the credentials, `build()` fails with an error whose `is_universe_domain_mismatch()` is true. Its message says: if you have not configured the universe domain explicitly, `googleapis.com` is the default; use `ClientBuilder::with_universe_domain()` to set it.

## Options / Props

`ClientBuilder<F, Cr>` methods (google-cloud-gax 1.15.0), all taking and returning the builder; finish with `.build().await?`.

| Method | Description |
|--------|-------------|
| `with_endpoint(v)` | Sets the endpoint. See `override-default-endpoint.md` |
| `with_credentials(v)` | Configures the authentication credentials (types come from the `google-cloud-auth` crate) |
| `with_universe_domain(v)` | Sets the universe domain (default `googleapis.com`) |
| `with_tracing()` | Enables observability signals (spans, logs, metrics) |
| `with_retry_policy(v)` | Which errors are retried and the attempt or time limits |
| `with_backoff_policy(v)` | Wait between retry attempts |
| `with_attempt_timeout(v)` | Per-attempt timeout used as the client default; a per-request `RequestOptions` value takes precedence |
| `with_retry_throttler(v)` | Advanced: customize the retry throttler |
| `with_polling_error_policy(v)` | Which polling errors are recoverable for long-running operations, with attempt or time limits |
| `with_polling_backoff_policy(v)` | Wait between polling attempts |
| `with_extension(v)` | Stores a custom setting keyed by type for downstream libraries or factories |

Topic pages: endpoint in `override-default-endpoint.md`, credentials in `override-default-authentication.md`, logging in `enable-logging.md`, retry policies in the `rust-calls` category.

## Notes

- Adapted from the official docs: the `with_universe_domain` doc comment uses `use examples::Client; // Placeholder for examples` (a doc-hidden type that "does not work"). Snippet taken from https://docs.rs/crate/google-cloud-gax/1.15.0/source/src/client_builder.rs; the `SecretManagerService` import is from https://docs.cloud.google.com/rust/docs/quickstart.
- The universe-domain block is a fragment of an async function returning `anyhow::Result<()>`.
- Retrying non-idempotent calls can duplicate side effects; see the retry-policy pages in the `rust-calls` category before changing `with_retry_policy`.
- Proxy troubleshooting is cross-referenced from `troubleshooting.md`.
- Applies to google-cloud-gax 1.15.0 (crates.io).
- Source: https://docs.cloud.google.com/rust/docs/configure-client (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.rs/crate/google-cloud-gax/1.15.0/source/src/client_builder.rs (retrieved 2026-11-16; google-cloud-gax 1.15.0)
- Source: https://docs.cloud.google.com/rust/docs/quickstart (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [initialize-client.md](./initialize-client.md)
- [override-default-endpoint.md](./override-default-endpoint.md)
- [override-default-authentication.md](./override-default-authentication.md)
- [enable-logging.md](./enable-logging.md)
- [troubleshooting.md](./troubleshooting.md)
