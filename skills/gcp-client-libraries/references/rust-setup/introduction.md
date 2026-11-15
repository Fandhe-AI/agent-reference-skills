---
source: https://github.com/googleapis/google-cloud-rust/blob/release-20261111/guide/src/introduction.md
---

# Rust client libraries guide: introduction

Introduction to the Google Cloud Client Libraries for Rust user guide: a collection of Rust crates to interact with Google Cloud services, presented as a series of small tutorials.

## Signature / Usage

### Add a client library crate

```bash
cargo add google-cloud-secretmanager-v1
```

### What the guide assumes

- Audience: Rust developers familiar with the language, the ecosystem and the toolchain.
- Most guides do not assume prior use of any Google service or client library; they point to service-specific tutorials to initialize projects and services.
- The guides are starting points, not per-service tutorials or application design guides. Service documentation is at `https://cloud.google.com`; for application design see the Cloud Architecture Center (`https://cloud.google.com/architecture`).
- Most Google Cloud services follow the AIPs (`https://google.aip.dev`), so functions to delete or list resources almost always have the same interface across services.

### Reporting bugs

Report bugs about the libraries or their documentation at `https://github.com/googleapis/google-cloud-rust/issues`.

## Notes

- Snippet taken from https://docs.cloud.google.com/rust/docs/quickstart (the introduction has no code).
- Licensing: the client library source and documentation are released under the Apache License, Version 2.0.
- This is the Google Cloud client library for Rust (`google-cloud-*` crates), distinct from the `google-genai` Gemini SDK (the `google-gemini-api` skill).
- Source: https://github.com/googleapis/google-cloud-rust/blob/release-20261111/guide/src/introduction.md (retrieved 2026-11-16; pinned at tag release-20261111; Apache-2.0)

## Related

- [rust-docs-index.md](./rust-docs-index.md)
- [overview.md](./overview.md)
- [troubleshooting.md](./troubleshooting.md)
