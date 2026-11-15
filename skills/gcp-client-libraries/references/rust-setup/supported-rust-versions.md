---
source: https://docs.cloud.google.com/rust/docs/supported-rust-versions
---

# Supported Rust versions (MSRV)

The Cloud Client Libraries for Rust periodically raise their MSRV (Minimum Supported Rust Version) to the oldest Rust version released within the last year. A new release supports every Rust version released in the prior year.

## Signature / Usage

### MSRV declared by a crate

```toml
rust-version = "1.91.0"
```

## Notes

- Snippet taken from https://docs.rs/crate/google-cloud-auth/1.19.0/source/Cargo.toml (`rust-version` of google-cloud-auth 1.19.0).
- Policy: when a library drops compatibility with an earlier Rust version, it increments a minor version (see Semantic Versioning).
- The twin's worked example (a library released on 2026-08-01 supports Rust releases since 2025-08-01, "which is Rust 1.88") is a dated illustration. The pinned crates declare `rust_version` 1.91.0 (for example google-cloud-gax 1.15.0, google-cloud-auth 1.19.0). Use the crate's value, not 1.88.
- Recommended version for new development: the current Rust release, so the runtime stays within supported releases and receives security patches.
- Keep production current: `rustup update` updates Rust, `cargo update` updates dependencies.
- Current MSRV is listed in the google-cloud-rust README (`https://github.com/googleapis/google-cloud-rust/blob/release-20261111/README.md#minimum-supported-rust-version-msrv`); at the pins it is 1.91.0.
- Source: https://docs.cloud.google.com/rust/docs/supported-rust-versions (retrieved 2026-11-16; CC BY 4.0)
- Source: https://docs.rs/crate/google-cloud-auth/1.19.0/source/Cargo.toml (retrieved 2026-11-16; google-cloud-auth 1.19.0)

## Related

- [quickstart.md](./quickstart.md)
- [overview.md](./overview.md)
