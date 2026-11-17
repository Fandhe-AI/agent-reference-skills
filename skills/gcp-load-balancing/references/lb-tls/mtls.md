---
source: https://docs.cloud.google.com/load-balancing/docs/mtls
---

# Mutual TLS overview

Frontend mutual TLS (mTLS) lets an Application Load Balancer authenticate clients by their certificates. It is configured on the target HTTPS proxy of all Application Load Balancers: global external, classic, regional external, regional internal and cross-region internal.

## Signature / Usage

### Setup order

1. Create a trust config (trust anchor plus optional intermediate certificates).
2. Link the trust config to a Client Authentication (`ServerTLSPolicy`) resource that defines the client validation mode.
3. Attach the `ServerTLSPolicy` to the target HTTPS proxy.
4. Optional: pass mTLS information to backends with custom headers.

Step-by-step guides: https://docs.cloud.google.com/load-balancing/docs/https/setting-up-mtls-ccm (user-provided certificates) and https://docs.cloud.google.com/load-balancing/docs/https/setting-up-mtls-ca-ccm (private CA).

### Decode a Base64 header value on the backend

```text
echo BASE_64_ENCODED_STRING | base64 -d
```

```python
import base64
encoded_string=BASE_64_ENCODED_STRING
decoded_string=base64.b64decode(encoded_string).decode()
print(decoded_string) # Note that a newline character (\n) is added to the end of the string.
```

## Options / Props

### Client validation modes (`ServerTlsPolicy.mtlsPolicy.clientValidationMode`)

| Mode | Behavior |
|---|---|
| `ALLOW_INVALID_OR_MISSING_CLIENT_CERT` | Allows the connection and forwards all requests to the backend even if the certificate is invalid or missing |
| `REJECT_INVALID` | Terminates the connection if no certificate is provided or validation fails |
| `ALLOW_VALIDATION_RELAXATIONS` | Requires a certificate and validates the chain, but applies the relaxations listed in `clientValidationRelaxations` (at least one required; all selected apply together) |

#### Relaxations

| Value | Effect |
|---|---|
| `ALLOW_MISSING_EKU` | Allows the certificate to omit the Extended Key Usage extension. An EKU present without `clientAuth` (OID `1.3.6.1.5.5.7.3.2`) is still rejected |
| `ALLOW_SHA1_HASHING` | Allows chains signed with legacy SHA-1 digests |
| `ALLOW_EXPIRED_LEAF_CERTIFICATE` | Validates an expired leaf as if the time were `notAfter` minus one second; leaf only; certificates not yet valid are still rejected |

### Certificate requirements

| Certificate | Requirements |
|---|---|
| All | RSA or ECDSA; hash SHA-256 or stronger (SHA-1 only with `ALLOW_SHA1_HASHING`; MD4/MD5 never) |
| Client (leaf) | Basic Constraints must not contain `CA=true`; EKU must contain `clientAuth` (skipped with `ALLOW_MISSING_EKU`) and must not contain `codeSigning`, `timeStamping` or `OCSPSigning`; not expired (skipped with `ALLOW_EXPIRED_LEAF_CERTIFICATE`); not self-signed |
| Root and intermediate | Basic Constraints `CA=true`; Key Usage `keyCertSign`; EKU should contain `clientAuth`; not expired |

### Resources

| Resource | Role |
|---|---|
| Trust config | One trust store (trust anchor plus optional intermediates); optional `allowlistedCertificates` for self-signed, expired or otherwise invalid certificates (always valid if parseable, private key possession is proven and SAN constraints are met; no trust store needed) |
| Trust store | Trust anchor and intermediate CA certificates used to build the chain of trust |
| Client Authentication (`ServerTLSPolicy`) | Client validation mode and trust config; attached to the target HTTPS proxy |

### Custom mTLS headers (modes `ALLOW_INVALID_OR_MISSING_CLIENT_CERT`)

| Situation | `client_cert_error` |
|---|---|
| Chain too long (more than 10 intermediates) | `client_cert_chain_exceeded_limit` |
| Invalid RSA key size (RSA 2048 to 4096) | `client_cert_invalid_rsa_key_size` |
| Unsupported elliptic curve (valid: P-256, P-384) | `client_cert_unsupported_elliptic_curve_key` |
| Non-RSA, non-ECDSA algorithm | `client_cert_unsupported_key_algorithm` |
| PKI has more than ten intermediates sharing Subject and SPKI | `client_cert_pki_too_large` |
| Intermediate with more than 10 name constraints | `client_cert_chain_max_name_constraints_exceeded` |
| EKU lacks `clientAuth` | `client_cert_chain_invalid_eku` |
| Validation time limit exceeded | `client_cert_validation_timed_out` |
| Depth (10 including root and client) or iteration (100) limit reached | `client_cert_validation_search_limit_exceeded` |
| No `TrustConfig` set up | `client_cert_validation_not_performed` |
| No client certificate | `client_cert_not_provided` (`client_cert_present: false`, fingerprint empty) |
| Fails validation against the `TrustConfig` | `client_cert_validation_failed` |

### Logged errors (`REJECT_INVALID` and `ALLOW_VALIDATION_RELAXATIONS`)

| Status | Request | Logged error |
|---|---|---|
| Signature mismatch during handshake | Terminate SSL handshake | None |
| Service unable to perform chain validation | Terminate connection | `client_cert_validation_unavailable` |
| Internal error validating chain | Terminate connection | `client_cert_validation_internal_error` |
| Matching `TrustConfig` not found | Terminate connection | `client_cert_trust_config_not_found` |
| Certificate payload with intermediates larger than 16 KB | Terminate connection | `client_cert_exceeded_size_limit` |

### Limits

| Limit | Value |
|---|---|
| Trust store | At most 200 trust anchors and intermediates combined (intermediates at most 100); 500 allowlisted certificates; at most three intermediates sharing Subject and SPKI |
| Chain depth | 10 including root and client; at most 100 intermediate evaluations |
| Client chain | At most 16 KB and 10 certificates |
| Keys | RSA 2048 to 4096 bits; ECDSA P-256 or P-384 |
| Root name constraints | At most 10 |
| Client certificate presentation | Non-configurable 10 second timeout in the Layer 1 GFEs (possibly shorter under peak load) |
| Revocation | No revocation checks on client certificates |

## Notes

- Custom mTLS headers (modes `ALLOW_INVALID_OR_MISSING_CLIENT_CERT`): In these cases `client_cert_present: true` (except no certificate), `client_cert_chain_verified: false` and `client_cert_sha256_fingerprint` carries the certificate hash. On success: `client_cert_present: true`, `client_cert_chain_verified: true`, empty `client_cert_error`, plus `client_cert_sha256_fingerprint`, `client_cert_serial_number`, `client_cert_valid_not_before`, `client_cert_valid_not_after`, `client_cert_uri_sans`, `client_cert_dnsname_sans`, `client_cert_issuer_dn`, `client_cert_subject_dn`, `client_cert_leaf`, `client_cert_chain`.
- Logged errors (`REJECT_INVALID` and `ALLOW_VALIDATION_RELAXATIONS`): The same `client_cert_*` error values as above are logged to Cloud Logging when the connection is terminated. Additional logged errors for closed connections:
- Proof of possession of the private key is always checked; if it fails, the handshake ends even in `ALLOW_INVALID_OR_MISSING_CLIENT_CERT`. No error is logged for global external Application Load Balancers; regional external and internal ones log a TLS error in `proxyStatus`.
- Chain checks also cover subject/issuer match, SKID/AKID match and SAN versus parent `NameConstraints`. Self-signed client certificates always fail (unless allowlisted).
- `ALLOW_VALIDATION_RELAXATIONS` is for temporary migration only and is more secure than `ALLOW_INVALID_OR_MISSING_CLIENT_CERT`. `ALLOW_MISSING_EKU` is risky with a root CA that issues for several purposes; use a dedicated private CA. `ALLOW_SHA1_HASHING` and `ALLOW_EXPIRED_LEAF_CERTIFICATE` are insecure; use them only temporarily.
- With `ALLOW_INVALID_OR_MISSING_CLIENT_CERT` the backend receives unauthenticated requests and must make its own authorization decision from the headers. For cross-region internal, regional external and regional internal Application Load Balancers, optional logging fields also show the failure reason.
- Custom header variables can also be set on URL maps. Multiple trust anchors can be uploaded for migration between PKIs without downtime. The header table in the source also lists the mode column for each row.
- Backend mTLS (load balancer to backends) is a separate feature: see `backend-authenticated-tls-backend-mtls.md`.
- Google Cloud Load Balancing, not Cloudflare (`cloudflare-workers`, `cloudflare-pages`) or Vercel (`vercel`). Certificate Manager (trust configs) is covered in the planned `gcp-security` skill.
- Source inconsistency: the source says "more than ten intermediate certificates that share the same Subject and Subject Public Key Info" for `client_cert_pki_too_large` and the quotas page (https://docs.cloud.google.com/load-balancing/docs/quotas, retrieved 2026-11-17) lists "Intermediate certificates that share the same Subject and Subject Public Key information | Limit: 10", but the limits section says "All intermediate certificates must not have more than three certificates that share the same Subject and Subject Public Key info" (the trust store section also says "No more than three" on the backend authenticated TLS page). Both numbers are kept as written.
- Source inconsistency: the error table says "The client certificate chain is too long (more than 10 intermediate certificates included with the client certificate)", while the limits section says "The maximum depth for a certificate chain is ten, including the root and client certificates" and "The accepted certificate chain received from the client is limited to up to 16 KB and 10 certificates". Both are kept as written.
- REST field path: the client validation mode and relaxations are fields of the `mtlsPolicy` object of a `ServerTlsPolicy` (`mtlsPolicy.clientValidationMode`, `mtlsPolicy.clientValidationRelaxations`, `mtlsPolicy.clientValidationTrustConfig`; Network Security API v1 Discovery document, retrieved 2026-11-14). The prose name "ServerTLSPolicy" refers to the same resource. The full schema is in the `gcp-networking` skill.
- Source: https://docs.cloud.google.com/load-balancing/docs/mtls (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [backend-authenticated-tls-backend-mtls.md](./backend-authenticated-tls-backend-mtls.md)
- [ssl-certificates.md](./ssl-certificates.md)
- [ssl-policies-concepts.md](./ssl-policies-concepts.md)
