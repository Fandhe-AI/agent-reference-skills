---
source: https://docs.cloud.google.com/certificate-authority-service/docs/ca-service-concepts
---

# Certificate Authority Service concepts

Key resources and ideas in CA Service: CA pools, CAs, certificates, CRLs, certificate templates, CA signing keys in Cloud KMS, Cloud Storage artifact buckets, CA tiers (DevOps and Enterprise) and policy controls.

## Signature / Usage

### Create a pool in a chosen tier

The tier is chosen per CA pool (`devops` or `enterprise`; `enterprise` is the default).

```bash
gcloud privateca pools create POOL_NAME --location=LOCATION --tier=TIER_NAME
```

## Options / Props

### Resources

| Resource | Description |
|---|---|
| CA pool | Primary resource and container for CAs and certificates. IAM conditions, issuance policies and other configuration are set on the pool. Issuance goes through the pool, which distributes request load across its CAs. |
| Certificate authority (CA) | An individual CA that signs certificates. Root CAs have a self-signed certificate. A subordinate CA is signed by another CA created in CA Service or by an external CA (CA Service then generates a CSR for the external CA to sign; activate the CA by uploading the signed PEM-encoded chain with the Google Cloud CLI or console). |
| Certificate | A signed X.509 certificate issued by a CA. |
| Certificate revocation list (CRL) | Serial numbers of revoked certificates. A CRL is a cloud resource nested under a CA and can also be published in PEM or DER to a publicly accessible Cloud Storage bucket URL. |
| Certificate template | Top-level resource for a distinct issuance scenario. Certificates inherit preconfigured X.509 extensions (key usage, path length restrictions); defines which extensions to keep or ignore from a request and identity constraints. Can be used with one or more CA pools. |

### CA tiers

| Tier | Behavior |
|---|---|
| DevOps | Higher issuance throughput for high-volume scenarios. Certificates are not tracked in the CA database and can't be revoked. Supports only Google-owned and Google-managed encryption keys, not customer-managed Cloud KMS keys. |
| Enterprise | Lower throughput; supports tracking and revoking certificates, so better suited to long-lived certificates. Supports customer-managed Cloud KMS signing keys and Google-owned and Google-managed keys. |

### Policy controls

| Type | Description |
|---|---|
| Coarse-grained | Issuance policies on the CA pool define which certificate types its CAs may issue (for example only client TLS extended key usage, no CA certificates). |
| Fine-grained | Certificate templates, combined with IAM conditions, give different policy controls to different users on the same pool. |

## Notes

- CA signing keys: CA Service uses Cloud KMS to generate, store and use CA signing keys; a Cloud KMS key version signs certificates and CRLs. You can supply your own Cloud KMS key or name an algorithm and let CA Service create the key; keys created by CA Service are always hardware-backed. Cloud KMS keys can be software or hardware backed.
- Ways to enforce policy: a baseline for the whole pool, reusable parameterized templates, fine-grained IAM bindings with conditions, and identity reflection for workload certificate provisioning.
- Certificates issued by DevOps-tier CAs can't be revoked; choose the Enterprise tier when revocation is needed.
- Artifacts (CA certificates, CRLs) are published to a Cloud Storage bucket in the same location as the CA; the bucket can be Google-managed or customer-managed.
- Snippet taken from https://docs.cloud.google.com/certificate-authority-service/docs/creating-ca-pool
- Source: https://docs.cloud.google.com/certificate-authority-service/docs/ca-service-concepts (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [ca-service-overview.md](./ca-service-overview.md)
- [creating-ca-pool.md](./creating-ca-pool.md)
- [creating-root-ca.md](./creating-root-ca.md)
