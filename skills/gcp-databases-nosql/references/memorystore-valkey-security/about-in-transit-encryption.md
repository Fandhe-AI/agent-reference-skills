---
source: https://docs.cloud.google.com/memorystore/docs/valkey/about-in-transit-encryption
---

# About in-transit encryption

In-transit encryption encrypts all Valkey traffic between clients and Memorystore for Valkey with TLS. When enabled, clients not configured for TLS are blocked.

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/memorystore/docs/valkey/manage-in-transit-encryption

Adapted (not in the official docs): added `--location=REGION_ID`; without it gcloud fails with "Error parsing [instance]" (the source shows only the instance ID).

```bash
gcloud memorystore instances get-certificate-authority INSTANCE_ID \
--location=REGION_ID
```

### Prerequisites

1. A Valkey client that supports TLS, or a third-party TLS sidecar.
2. CA certificates installed on the client machine that accesses the instance.

## Options / Props

| CA mode | Description |
|---------|-------------|
| Per-instance CA | Each instance gets its own CA infrastructure; download and install its CA certificates on every client |
| Shared CA | Managed, regionalized CA; one certificate bundle per region valid for all instances in that region configured to use it |
| Customer-managed CA | Your own CA pool on Certificate Authority Service; clients trusting that CA need no extra downloads; supports on-demand certificate rotation |

| Topic | Detail |
|-------|--------|
| TLS versions | 1.2 and later |
| Server certificate rotation | weekly for all CA modes; applies to new connections only, existing connections stay alive |
| Replicas | replicated data is encrypted fully at the network level per Google Cloud standards |

### Performance guidelines

- Reduce client connections; reuse long-running connections instead of short-lived ones.
- Increase instance size and client host CPU.
- Reduce payload size.

## Notes

- Corrected from the official docs: `gcloud memorystore instances get-certificate-authority INSTANCE_ID` (no `--location`). Replace INSTANCE_ID with the instance ID and REGION_ID with the region where the instance is located.
- Encrypting and decrypting adds processing overhead and each extra connection costs resources; benchmark against an instance without in-transit encryption to measure latency.
- Use cases: protect sensitive cached data, compliance (HIPAA, PCI DSS), IAM authentication (TLS is required to avoid exposing tokens), and protection against person-in-the-middle attacks.
- You are responsible for ensuring the client can use TLS.
- Managed Valkey on Google Cloud; distinct from Upstash Redis (`upstash`).
- Source: https://docs.cloud.google.com/memorystore/docs/valkey/about-in-transit-encryption (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [manage-in-transit-encryption.md](./manage-in-transit-encryption.md)
- [about-iam-auth.md](./about-iam-auth.md)
- [manage-basic-auth.md](./manage-basic-auth.md)
