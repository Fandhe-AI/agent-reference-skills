---
source: https://docs.cloud.google.com/rust/docs/post-quantum-cryptography
---

# Post-quantum cryptography

To protect against "Store Now, Decrypt Later" attacks, Google Cloud is implementing Post-Quantum Cryptography (PQC). The client libraries use a hybrid key exchange combining ML-KEM-768 with classical X25519 for TLS 1.3 connections.

## Signature / Usage

### Rust SDK support

No configuration or code changes are needed with standard client library releases published on or after January 28, 2026. The TLS engine (`rustls` with the default `aws-lc-rs` provider) negotiates post-quantum key exchange automatically with supported Google Cloud services.

If you override the provider (for example with `ring`), post-quantum key exchange is disabled unless the chosen provider supports it.

```toml
[dependencies]
google-cloud-storage = { version = "1" }
```

## Notes

- Snippet taken from https://docs.cloud.google.com/rust/docs/switch-rustls-crypto-provider (the default-provider dependency; the PQC page itself has no code).
- More on Google Cloud's approach: `https://cloud.google.com/security/resources/post-quantum-cryptography`.
- Source: https://docs.cloud.google.com/rust/docs/post-quantum-cryptography (retrieved 2026-11-16; CC BY 4.0)

## Related

- [switch-rustls-crypto-provider.md](./switch-rustls-crypto-provider.md)
