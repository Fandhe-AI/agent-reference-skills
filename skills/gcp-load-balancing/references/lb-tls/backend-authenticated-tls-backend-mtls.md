---
source: https://docs.cloud.google.com/load-balancing/docs/backend-authenticated-tls-backend-mtls
---

# Backend authenticated TLS and backend mTLS overview

By default the load balancer accepts any certificate presented by backends inside Google Cloud and does no validation. With backend authenticated TLS the load balancer verifies backend identity; with backend mTLS it also proves its own identity using a client certificate. This is configured on the backend service of global external, regional external, regional internal and cross-region internal Application Load Balancers, and is independent of frontend mTLS.

## Signature / Usage

Example of creating a backend authentication config (snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/network-security/backend-authentication-configs/create). The full flags are in the `gcp-networking` skill (`network-security`); the how-to guides are https://docs.cloud.google.com/load-balancing/docs/backend-authenticated-tls-setup and https://docs.cloud.google.com/load-balancing/docs/backend-mtls-setup.

```bash
gcloud network-security backend-authentication-configs create \
    backend-authentication-config \
    --trust-config=projects/my-project/locations/global/\
trustConfigs/my-trust-config --location=global
```

### Configuration order (private PKI)

1. Create a trust config (trust anchor and intermediates).
2. For backend mTLS, create the client certificate (Certificate Manager resource with scope `client-auth`) before the authentication config; it cannot be attached afterward.
3. Create a backend authentication config referencing the trust config (and the client certificate for backend mTLS).
4. Attach it to the backend service through `tlsSettings`.

## Options / Props

### Backend authentication config fields

| Field | Meaning |
|---|---|
| `trustConfig` | Trust config used to validate the backend server certificate; not required when public roots are used |
| `wellKnownRoots` | `PUBLIC_ROOTS` to also trust certificates from public CAs (a Google-managed root set that can change over time) |
| `clientCertificate` | Client certificate for backend mTLS; may be empty for authentication only |

### Backend service `tlsSettings`

| Field | Meaning |
|---|---|
| `authenticationConfig` | Backend authentication config |
| `sni` | SNI hostname sent in `ClientHello`; backend certificate must have a matching SAN |
| `subjectAltNames` | Accepted SANs (maximum 5); when set, the SNI hostname is ignored for SAN verification |

### Certificate requirements

| Certificate | Requirements |
|---|---|
| All | RSA or ECDSA; SHA-256 or stronger (MD4, MD5, SHA-1 not supported) |
| Backend leaf (server) | Basic Constraints without `CA=true`; EKU contains `serverAuth` and not `codeSigning`, `timeStamping`, `OCSPSigning`; not expired |
| Load balancer client leaf | Certificate Manager certificate, scope `client-auth`; no `CA=true`; EKU contains `clientAuth`, not the three disallowed purposes; not expired; public PKI managed certificates unsupported |
| Trust config root and intermediate | `CA=true`; Key Usage `keyCertSign`; EKU contains `serverAuth`; not expired |

### Quotas and limits

| Limit | Value |
|---|---|
| Trust store | 200 trust anchors and intermediates combined; intermediates at most 100; at most three intermediates share Subject and SPKI |
| Chain | Depth 10 including root and leaf; at most 100 intermediates evaluated |
| Backend chain | At most 16 KB and 10 certificates |
| Root name constraints | At most 10 |
| `tlsSettings.subjectAltNames[]` | At most 5 |
| Client certificate keys | RSA 2048 to 4096 bits; ECDSA P-256 or P-384 |

## Notes

- Logged errors (connection terminated, HTTP 502 to client): `server_cert_chain_exceeded_limit`, `server_cert_invalid_rsa_key_size`, `server_cert_unsupported_elliptic_curve_key`, `server_cert_unsupported_key_algorithm`, `server_cert_pki_too_large`, `server_cert_chain_max_name_constraints_exceeded`, `server_cert_chain_invalid_eku`, `server_cert_validation_timed_out`, `server_cert_validation_search_limit_exceeded`, `server_cert_validation_not_performed`, `server_cert_not_provided`, `ssl_certificate_verification_failed`, `server_cert_validation_unavailable`, `server_cert_validation_internal_error`, `server_cert_trust_config_not_found`, `server_cert_exceeded_size_limit` (payload larger than 16 KB).
- Not supported on classic Application Load Balancers, global internet NEG backends or App Engine backends. Health checks support neither TLS authentication nor mTLS; use TCP health checks or an endpoint that does not require client authentication.
- A client certificate cannot be sent without backend authenticated TLS first. Backend authenticated TLS works with `HTTPS` or `HTTP2` backend service protocols. No certificate revocation checks.
- Validation steps: proof of private key possession (failure ends the handshake, no log), chain of trust (subject/issuer and SKID/AKID match), then connection. On validation failure the load balancer returns HTTP `502`, logs the reason, and retries the backend connection on later requests. A backend refusing the client certificate also produces `502` with a generic logged reason.
- `PUBLIC_ROOTS` risks backend certificates becoming invalid when the root set changes; prefer a well-established CA that uses intermediate cross-signing.
- The load balancer does not pass the client's frontend SNI to the backend; backends can read it from a custom request header.
- Managed workload identity creates the trust config, managed identity certificate and backend authentication config automatically (see https://docs.cloud.google.com/load-balancing/docs/managed-workload-identities-load-balancers-overview).
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/network-security/backend-authentication-configs/create (gcloud 593.0.0 help). The source page has no code samples.
- Google Cloud Load Balancing, not Cloudflare (`cloudflare-workers`, `cloudflare-pages`) or Vercel (`vercel`).
- Source inconsistency: the source says "more than ten intermediate certificates that share the same Subject and Subject Public Key Info" for `server_cert_pki_too_large`, but the trust store limits say "No more than three intermediate certificates can share the" same Subject and Subject Public Key info. Both numbers are kept as written.
- Source: https://docs.cloud.google.com/load-balancing/docs/backend-authenticated-tls-backend-mtls (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [mtls.md](./mtls.md)
- [encryption-to-the-backends.md](./encryption-to-the-backends.md)
- [ssl-certificates.md](./ssl-certificates.md)
