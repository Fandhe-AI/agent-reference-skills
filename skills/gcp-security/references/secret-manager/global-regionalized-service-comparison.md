---
source: https://docs.cloud.google.com/secret-manager/regional-secrets/global-regionalized-service-comparison
---

# Compare global and regional service

The global service is the default: standard API endpoint, secret data replicated across multiple regions and accessible from any region. The regional service stores data solely in specific locations or data residency zones (DRZs), accessible only from within that region, through a regional endpoint associated with the DRZ.

## Signature / Usage

A global-service secret with user-managed replication restricted to one region:

```bash
gcloud secrets create my-secret --data-file=/tmp/secret \
    --replication-policy=user-managed --locations=us-central1
```

## Options / Props

| Feature | Global service | Regional service |
|---|---|---|
| Data residency | User managed replication to specific regions or automatic replication without any restriction. | Data is stored in a single location. Complete data residency zone (DRZ) compliance with data at-rest, in-use, and in-transit. |
| Endpoints | Single, global endpoint | Regional endpoints |
| Cross-region access | Possible with both user managed replication and automatic replication. | Not possible. Secret data is tightly restricted to your region of choice and doesn't flow outside its boundaries. |
| Use cases | General secret management: data doesn't have to be stored in a specific region; you are only concerned with availability and latency, not regulatory requirements. | Strict data residency requirements: data must be stored in a specific region; you want to restrict movement of sensitive data within that boundary. |

## Notes

- Choose the regional service if your organization must adhere to data residency regulations; choose global if you need high availability and access from anywhere through multi-region replication. Not all organizations or all data are subject to DRZ regulations.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/secrets/create (gcloud 593.0.0 help). Regional secrets use the `--location=LOCATION` flag of the same command.
- Source: https://docs.cloud.google.com/secret-manager/regional-secrets/global-regionalized-service-comparison (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [overview-rs.md](./overview-rs.md)
- [choosing-replication.md](./choosing-replication.md)
- [locations.md](./locations.md)
