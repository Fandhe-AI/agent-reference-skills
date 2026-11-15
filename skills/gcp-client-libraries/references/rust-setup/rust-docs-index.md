---
source: https://docs.cloud.google.com/rust/docs
---

# Rust on Google Cloud: documentation index

Landing page of the Rust documentation on docs.cloud.google.com. It links to the quickstarts, the client library reference and the Rust code samples. The Cloud Client Libraries for Rust are the `google-cloud-*` crates.

## Signature / Usage

### Documentation entry points

| Resource | URL |
|----------|-----|
| Product documentation | `https://docs.cloud.google.com/rust/docs/overview` |
| Get started with Rust | `https://docs.cloud.google.com/rust/docs/quickstart` |
| Set up Rust on Cloud Shell | `https://docs.cloud.google.com/rust/docs/quickstart-cloudshell` |
| Client libraries reference | `https://docs.cloud.google.com/rust/docs/reference` |
| Rust samples (GitHub) | `https://github.com/googleapis/google-cloud-rust/tree/release-20261111/guide/samples/src/` |
| All Rust code samples | `https://docs.cloud.google.com/docs/samples?language=rust` |

### Add a client library

```bash
cargo add google-cloud-secretmanager-v1
```

## Notes

- Snippet taken from https://docs.cloud.google.com/rust/docs/quickstart (the landing page itself has no code).
- This is the Google Cloud client library for Rust (`google-cloud-*` crates), distinct from the `google-genai` Gemini SDK (the `google-gemini-api` skill).
- The landing page also lists the Cloud Storage tutorial (`quickstart-storage`). It is product-specific and not part of this skill; see `gcp-storage`.
- Use `rust/docs/<page>` URLs.
- The landing page links the samples on `main`; pinned here to tag `release-20261111`.
- Source: https://docs.cloud.google.com/rust/docs (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [quickstart.md](./quickstart.md)
- [quickstart-cloudshell.md](./quickstart-cloudshell.md)
- [introduction.md](./introduction.md)
