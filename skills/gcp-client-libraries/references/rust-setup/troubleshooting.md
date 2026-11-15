---
source: https://github.com/googleapis/google-cloud-rust/blob/release-20261111/guide/src/troubleshooting.md
---

# Troubleshoot the Rust client libraries

Start with debug logging. For gRPC issues, raise the `tonic` and `h2` log filters on the `tracing` subscriber; for proxy issues, see the client configuration page.

## Signature / Usage

### Trace gRPC issues

Clients that use gRPC use `tonic` as the transport. Initialize a `tracing_subscriber` first (the `tracing` crate requires it), then include `tonic=debug` or `h2=debug` in `RUST_LOG` to dump details of the gRPC and HTTP/2 layers.

```sh
RUST_LOG=debug,tonic=debug,h2=debug cargo run --example your_program
```

### Diagnose proxy issues

See `configure-client.md` (section "Configure a proxy"): the clients use the standard `reqwest` proxy environment variables.

### Report a problem

- With a Google support contract: create an issue in the support console (`https://cloud.google.com/support/`) for a timely response.
- Otherwise: file an issue at `https://github.com/googleapis/google-cloud-rust`. Maintainers may move it to another repository and notify you by the email on your GitHub account.

## Notes

- The `debug` level in the example dumps a lot of output and, with request/response logging enabled, may include sensitive data; see the warning in `enable-logging.md`.
- Source: https://github.com/googleapis/google-cloud-rust/blob/release-20261111/guide/src/troubleshooting.md (retrieved 2026-11-16; pinned at tag release-20261111; Apache-2.0)

## Related

- [enable-logging.md](./enable-logging.md)
- [configure-client.md](./configure-client.md)
- [observability.md](./observability.md)
