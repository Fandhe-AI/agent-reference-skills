---
source: https://docs.cloud.google.com/memorystore/docs/valkey/security-overview
---

# Memorystore for Valkey security overview

Security model of a Memorystore for Valkey instance: private-only access through Private Service Connect, IAM for management, in-transit and persistence encryption, and VPC Service Controls. This page also merges "Use VPC Service Controls".

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/memorystore/docs/valkey/manage-in-transit-encryption

Adapted (not in the official docs): added `--location=REGION_ID`; without it gcloud fails with "Error parsing [instance]" (the source shows only the instance ID).

```bash
gcloud memorystore instances get-certificate-authority INSTANCE_ID \
--location=REGION_ID
```

### Protect instances with VPC Service Controls

1. Create a service perimeter.
2. Add the Memorystore for Valkey API to the perimeter.

## Options / Props

| Topic | Statement |
|-------|-----------|
| Access | Instance is not publicly accessible; only clients that reach the configured PSC endpoint |
| Management | Secured by IAM role-based access control |
| Network encryption | All network data is encrypted in transit at the network level (Google Cloud default VM-to-VM protection) |
| In-memory data | Not encrypted by Memorystore for Valkey |
| Replication | Diskless; no disk use during replication unless persistence is enabled |
| Persistence | Data encrypted by default; CMEK in Cloud KMS available for your own keys |
| VPC Service Controls | Requests from clients outside the perimeter need the proper access level rules; changes take on the order of minutes |

## Notes

- Corrected from the official docs: `gcloud memorystore instances get-certificate-authority INSTANCE_ID` (no `--location`). Replace INSTANCE_ID with the instance ID and REGION_ID with the region where the instance is located.
- Do not expose the instance to the internet or to untrusted clients that can reach its TCP port or UNIX socket. Mediate untrusted access with a layer that implements ACLs, validates user input and decides which operations to run.
- With Shared VPC plus VPC Service Controls, the host project (network) and the service project (instance) must be inside the same perimeter; separating them can cause instance failure as well as blocked requests.
- Valkey's own view of security: https://valkey.io/topics/security/. Product-specific VPC-SC limitations: https://docs.cloud.google.com/vpc-service-controls/docs/supported-products#table_memorystore_for_valkey
- Managed Valkey on Google Cloud; distinct from Upstash Redis (`upstash`) and Cloudflare Workers KV (`cloudflare-storage`).
- Source: https://docs.cloud.google.com/memorystore/docs/valkey/security-overview (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/memorystore/docs/valkey/use-vpc-service-controls (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [access-control.md](./access-control.md)
- [about-in-transit-encryption.md](./about-in-transit-encryption.md)
- [about-cmek.md](./about-cmek.md)
- [networking.md](./networking.md)
