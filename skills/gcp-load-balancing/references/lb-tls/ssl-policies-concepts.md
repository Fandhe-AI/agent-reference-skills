---
source: https://docs.cloud.google.com/load-balancing/docs/ssl-policies-concepts
---

# SSL policies overview

An SSL policy defines the TLS features (protocol versions, cipher suites) that a load balancer supports during a TLS handshake. It is associated with a target HTTPS proxy or target SSL proxy and affects only client-to-load-balancer connections, not load-balancer-to-backend connections. SSL here covers SSL and TLS over TCP; HTTP/3 uses QUIC, which uses TLS 1.3 exclusively.

## Signature / Usage

Example of listing SSL policies (snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/ssl-policies/list); create and update are in the `gcp-compute` skill, and the how-to is at https://docs.cloud.google.com/load-balancing/docs/use-ssl-policies.

```bash
gcloud compute ssl-policies list --global
```

## Options / Props

### Scope support

| Scope | Load balancers |
|---|---|
| Global SSL policy | Global external Application Load Balancer; Classic Application Load Balancer; Cross-region internal Application Load Balancer; Global external proxy Network Load Balancer; Classic proxy Network Load Balancer |
| Regional SSL policy | Regional external Application Load Balancer; Regional internal Application Load Balancer |

### Policy settings

| Setting | Values / behavior |
|---|---|
| Profile | `COMPATIBLE` (broadest client set, including earlier TLS), `MODERN` (wide set of ciphers), `RESTRICTED` (reduced set, stricter compliance), `FIPS_202205` (intended to meet FIPS 140-3), `CUSTOM` (choose cipher suites for TLS 1.2 and earlier; at least one cipher suite required; no effect on TLS 1.3) |
| Minimum TLS version | `FIPS_202205` requires 1.2. Minimum 1.3 requires the `RESTRICTED` profile |
| Post-quantum key exchange | `ENABLED` or `DEFAULT`: use `X25519MLKEM768` with clients that advertise it. `DEFERRED`: disallow it until October 2027 |
| No policy attached | Behaves as `COMPATIBLE` with minimum TLS 1.0 |

### TLS 1.3 cipher suites

| Profile | Suites |
|---|---|
| All profiles except `FIPS_202205` | `TLS_AES_128_GCM_SHA256`, `TLS_AES_256_GCM_SHA384`, `TLS_CHACHA20_POLY1305_SHA256` |
| `FIPS_202205` | `TLS_AES_128_GCM_SHA256`, `TLS_AES_256_GCM_SHA384` |

### Cipher suites for TLS 1.2 and earlier

| IANA | Suite | COMPATIBLE | MODERN | RESTRICTED | FIPS_202205 |
|---|---|---|---|---|---|
| `0xCCA9` | `TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256` | Yes | Yes | Yes | No |
| `0xCCA8` | `TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256` | Yes | Yes | Yes | No |
| `0xC02B` | `TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256` | Yes | Yes | Yes | Yes |
| `0xC02F` | `TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256` | Yes | Yes | Yes | Yes |
| `0xC02C` | `TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384` | Yes | Yes | Yes | Yes |
| `0xC030` | `TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384` | Yes | Yes | Yes | Yes |
| `0xC009` | `TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA` | Yes | Yes | No | No |
| `0xC013` | `TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA` | Yes | Yes | No | No |
| `0xC00A` | `TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA` | Yes | Yes | No | No |
| `0xC014` | `TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA` | Yes | Yes | No | No |
| `0x009C` | `TLS_RSA_WITH_AES_128_GCM_SHA256` | Yes | No | No | No |
| `0x009D` | `TLS_RSA_WITH_AES_256_GCM_SHA384` | Yes | No | No | No |
| `0x002F` | `TLS_RSA_WITH_AES_128_CBC_SHA` | Yes | No | No | No |
| `0x0035` | `TLS_RSA_WITH_AES_256_CBC_SHA` | Yes | No | No | No |
| `0x000A` | `TLS_RSA_WITH_3DES_EDE_CBC_SHA` | Yes | No | No | No |

## Notes

- `FIPS_202205` restrictions: TLS 1.2 or 1.3 only; TLS 1.2 suites limited to the four `ECDHE ... AES_*_GCM` rows above; key exchange only `secp256r1` and `secp384r1` (plus `X25519MLKEM768` if post-quantum key exchange is enabled); certificate signatures `rsa_pkcs1_sha256`, `rsa_pkcs1_sha384`, `rsa_pkcs1_sha512` (RSA) or `ecdsa_secp256r1_sha256`, `ecdsa_secp384r1_sha384` (ECDSA).
- Associating a policy is optional. Each target proxy can have at most one SSL policy; one policy can serve several target proxies of the same scope. Changes to a policy don't alter or interrupt existing connections.
- A profile can restrict TLS versions indirectly: `RESTRICTED` has no TLS 1.0/1.1 suites, so those versions are effectively disabled even if the minimum version is 1.0 or 1.1. SSL 3.0 or earlier is not supported.
- Post-quantum key exchange (`X25519MLKEM768`, hybrid classical/post-quantum) has been enabled by default since October 2026 on all load balancers that support SSL policies; it is enabled always after October 2027. It applies only to frontend TLS connections, works with any profile and minimum version, and needs a client that supports TLS 1.3 and `X25519MLKEM768`.
- Cross-project SSL policy referencing (Preview, subject to Pre-GA Offerings Terms): a central policy in an administrative project can be referenced from target proxies in service projects. Global policies: global external Application Load Balancer, cross-region internal Application Load Balancer, global external proxy Network Load Balancer. Regional policies: regional external and regional internal Application Load Balancers.
- Google Cloud uses IANA cipher suite names exclusively. `openssl ciphers -stdname` maps OpenSSL names to IANA names. Some Microsoft names carry an elliptic-curve suffix such as `P256`; the curve isn't part of the suite and isn't configurable (supported: `P-256`, `P-384`, `X25519`).
- Limitations: disabling too many versions or ciphers (especially in `CUSTOM`) can lock out older clients or all clients. A `CUSTOM` profile must enable ciphers compatible with the certificate signature type (ECDSA or RSA); predefined profiles work with both.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/ssl-policies/list (gcloud 593.0.0 help). The source page has no code samples.
- Google Cloud Load Balancing, not Cloudflare (`cloudflare-workers`, `cloudflare-pages`) or Vercel (`vercel`).
- Source: https://docs.cloud.google.com/load-balancing/docs/ssl-policies-concepts (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [ssl-certificates.md](./ssl-certificates.md)
- [encryption-to-the-backends.md](./encryption-to-the-backends.md)
- [mtls.md](./mtls.md)
