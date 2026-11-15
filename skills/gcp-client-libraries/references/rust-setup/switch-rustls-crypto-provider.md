---
source: https://docs.cloud.google.com/rust/docs/switch-rustls-crypto-provider
---

# Switch the rustls crypto provider

The Rust client libraries secure traffic with `rustls`. By default they enable the `aws-lc-rs` provider, which is based on BoringSSL and is the only Rust crypto provider that is FIPS certified. To use another provider (for example `ring`), disable default features and install your own.

## Signature / Usage

The twin uses `google-cloud-storage` as the example crate; the process applies to other client libraries.

### Default provider

```toml
[dependencies]
google-cloud-storage = { version = "1" }
```

### Default provider with other default features disabled

Some applications disable all default features. This alone disables the default provider too:

```toml
[dependencies]
google-cloud-storage = { version = "1", default-features = false }
```

To keep the default provider, enable only the default provider feature:

```toml
[dependencies]
google-cloud-storage = { version = "1", default-features = false, features = ["default-rustls-provider"] }
```

### Use your own provider (`ring`)

You must use the same version of `rustls` as `google-cloud-storage`.

```toml
[dependencies]
google-cloud-storage = { version = "1", default-features = false }
rustls               = { version = "0.23", features = ["ring"] }
```

Install the provider in `main()`:

```rust
use rustls::crypto::{CryptoProvider, ring::default_provider};

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // Install a default crypto provider.
    CryptoProvider::install_default(default_provider())
        .map_err(|_| anyhow::anyhow!("default crypto provider already installed"))?;
    // ... ... ...
    Ok(())
}
```

## Notes

- Consult the rustls documentation (`https://docs.rs/rustls`) for additional providers.
- `google-cloud-auth` 1.19.0 also defines a `default-rustls-provider` feature, part of its `default` features, which enables `rustls/aws_lc_rs` (Cargo.toml).
- Overriding the provider disables post-quantum key exchange unless the provider supports it; see `post-quantum-cryptography.md`.
- The rustls version in the twin (`0.23`) is the version it shows; always match the version your client crate uses.
- Source: https://docs.cloud.google.com/rust/docs/switch-rustls-crypto-provider (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.rs/crate/google-cloud-auth/1.19.0/source/Cargo.toml (retrieved 2026-11-16; google-cloud-auth 1.19.0)

## Related

- [post-quantum-cryptography.md](./post-quantum-cryptography.md)
- [configure-client.md](./configure-client.md)
