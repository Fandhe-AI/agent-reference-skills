---
source: https://docs.astral.sh/uv/concepts/authentication/certificates/
---

# TLS certificates

uv uses TLS to communicate with package indexes and other HTTPS servers. TLS certificates verify server identity.

## Signature / Usage

```toml
# uv.toml
system-certs = true
```

```console
$ SSL_CERT_FILE=/path/to/ca-bundle.pem uv pip install ruff
```

## TLS backend

uv uses `rustls` with `aws-lc-rs` as the cryptography provider. Supported X.509 certificate signature algorithms:

- ECDSA (P-256, P-384, P-521) with SHA-256, SHA-384, or SHA-512
- Ed25519
- RSA PKCS#1 v1.5 (2048-8192 bit) with SHA-256, SHA-384, or SHA-512
- RSA-PSS (2048-8192 bit) with SHA-256, SHA-384, or SHA-512

## System certificates

By default, uv uses bundled Mozilla root certificates. To use the platform's native certificate store (e.g., a corporate trust root), pass `--system-certs`, set `UV_SYSTEM_CERTS` to `true`, or set `system-certs = true` in `uv.toml`. Verification is then performed by `rustls-platform-verifier`, which delegates to the operating system's verifier.

## Custom certificates

| Variable | Description |
|----------|-------------|
| `SSL_CERT_FILE` | Path to a PEM-encoded certificate bundle (e.g., `certs.pem`, `ca-bundle.crt`) |
| `SSL_CERT_DIR` | One or more directories containing PEM-encoded certificate files |
| `SSL_CLIENT_CERT` | For client certificate authentication (mTLS): path to a PEM file containing the certificate followed by the private key |

Multiple entries are supported, separated by a platform-specific delimiter (`:` on Unix, `;` on Windows). For a single `uv pip` invocation, pass `--cert` with the path to a PEM-encoded bundle; it replaces uv's default certificate source for that invocation.

## Insecure hosts

To trust a self-signed certificate or otherwise disable certificate verification for dedicated hosts, use the `allow-insecure-host` option. For local verification or disposable environments only; do not keep it as a permanent setting.

```toml
[tool.uv]
allow-insecure-host = ["localhost:8080"]
```

It expects a hostname (e.g., `localhost`) or hostname-port pair (e.g., `localhost:8080`), and applies only to HTTPS connections.

## Notes

- Certificates are usually `.pem`, `.crt`, or `.cer`, but uv attempts to read a certificate from any regular file in `SSL_CERT_DIR`. Files that cannot be parsed as PEM are ignored. Symlinks are resolved and dangling symlinks ignored. DER-encoded files are not supported.
- When set to non-empty values, `SSL_CERT_FILE` / `SSL_CERT_DIR` override the default certificate source entirely: only the provided certificates are trusted. If a configured file or directory does not exist or contains no valid certificates, no default certificates are trusted.
- Use `allow-insecure-host` with caution and only in trusted environments; it removes certificate verification.

## Related

- [Authentication](./authentication.md)
- [HTTP credentials](./http-credentials.md)
