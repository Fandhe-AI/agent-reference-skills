---
source: https://docs.cloud.google.com/certificate-manager/docs/core-components
---

# Core components of Certificate Manager

Core resources of Certificate Manager: certificates (Google-managed and self-managed), domain authorizations, certificate maps and map entries, trust configs (trust stores, trust anchors, intermediate certificates, allowlist), and certificate issuance configurations.

## Signature / Usage

### Trust config YAML (trust anchors, intermediate CAs, allowlist)

```yaml
name: "TRUST_CONFIG_ID"
trustStores:
- trustAnchors:
  - pemCertificate: "CERTIFICATE_PEM_PAYLOAD"
  intermediateCas:
  - pemCertificate: "INTER_CERT_PEM_PAYLOAD"
allowlistedCertificates:
- pemCertificate: "ALLOWLISTED_CERT1"
- pemCertificate: "ALLOWLISTED_CERT2"
```

## Options / Props

### Supported key types

| Key type | Self-managed | Publicly trusted Google-managed | Privately trusted Google-managed |
|---|---|---|---|
| RSA-2048 | Yes | Yes | Yes |
| RSA-3072 | Yes | No | No |
| RSA-4096 | Yes | No | No |
| ECDSA P-256 | Yes | No | Yes |
| ECDSA P-384 | Yes | No | No |

### Limits and defaults

| Item | Value |
|---|---|
| Certificates per certificate map entry | Maximum 4 |
| Trust stores per trust config resource | A single trust store |
| Intermediate CA certificates per trust store | Up to 100 (size governed by the trust config size calculation in quotas) |
| Default validity, public Google-managed (scope `EDGE_CACHE`) | 30 days |
| Default validity, public Google-managed (other scopes) | 45 or 90 days depending on the issuing CA (Public CA is moving from 90 to 45 days; existing 90-day certificates stay valid until next renewal; Let's Encrypt CA: 90 days) |

## Notes

- Google-managed certificates: new issuance or renewal uses a freshly generated private key. By default Public CA issues them; if Public CA refuses (or a CAA record prohibits it), Certificate Manager falls back to Let's Encrypt CA. The default validity can't be changed. RSA only; using Google-managed certificates as mTLS client certificates isn't supported.
- Regional Google-managed certificates support only DNS authorization and obtain certificates from Public CA.
- Self-managed certificate: the `Certificate` resource must include the leaf certificate followed by all intermediate certificates (single PEM file or text block). No domain authorization is needed.
- Domain authorization: load balancer authorization or DNS authorization; see [domain-authorization.md](./domain-authorization.md).
- Certificate map: references map entries that assign certificates to hostnames; reusable across target proxies. Supported by global external Application Load Balancer and global external proxy Network Load Balancer. Unmatched hostnames get the primary certificate (first listed for a target proxy). An entry can hold, for example, an ECDSA and an RSA certificate for the same name; the type is negotiated during the handshake.
- Trust config: used for frontend mTLS, backend mTLS (Application Load Balancers), and Cloud NGFW TLS inspection (privately signed backend certificates). A trust config holds a single trust store, which holds one or more trust anchors (root certificates) and optionally intermediate certificates.
- Allowlisted certificates (`allowlistedCertificates`) let clients authenticate with self-signed, expired, or invalid certificates; no trust store is needed. They are treated as valid when parseable, the client proves private-key possession, and the SAN constraints are met. Supported for frontend mTLS and Cloud NGFW TLS inspection, not for backend mTLS. Treat allowlisting as a deliberate trust exception.
- Certificate issuance configuration: lets Certificate Manager use a Certificate Authority Service CA pool to issue Google-managed certificates, with issuance / expiration parameters and key algorithm.
- RSA-3072 and RSA-4096 key types incur charges per TLS connection; prices are not copied here, see https://docs.cloud.google.com/vpc/network-pricing.
- Source inconsistency: the source's Trust configs section says a trust store encapsulates "one or more trust anchors", while its Trust stores section says "a single trust anchor". A trust config holds a single trust store; `trustStores[].trustAnchors[]` in the Certificate Manager API is a list, and [trust-configs.md](./trust-configs.md) shows multiple anchors.
- Snippet taken from https://docs.cloud.google.com/certificate-manager/docs/trust-configs
- Source: https://docs.cloud.google.com/certificate-manager/docs/core-components (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [certificate-selection-logic.md](./certificate-selection-logic.md)
- [domain-authorization.md](./domain-authorization.md)
- [trust-configs.md](./trust-configs.md)
