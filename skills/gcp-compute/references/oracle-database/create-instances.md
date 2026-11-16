---
source: https://docs.cloud.google.com/oracle/database/docs/create-instances
---

# Create an Exadata Infrastructure instance

Creates an Exadata Infrastructure instance in Google Cloud (Console, gcloud, API or client libraries). The instance must exist before you can create an Exadata VM Cluster.

## Signature / Usage

Replace `INSTANCE_ID` (permanent identifier), `REGION_ID` (permanent region), `DISPLAY_NAME`, `COMPUTE_COUNT` (database servers, 2 to 32) and `STORAGE_COUNT` (storage servers, 3 to 64).

Adapted (not in the official docs): added the missing `\` line continuations so the flags belong to one command.

```bash
gcloud oracle-database cloud-exadata-infrastructures create INSTANCE_ID \
    --location=REGION_ID \
    --display-name=DISPLAY_NAME \
    --properties-shape="Exadata.X9M" \
    --properties-compute-count=COMPUTE_COUNT \
    --properties-storage-count=STORAGE_COUNT
```

## Options / Props

| Setting | Detail |
|---------|--------|
| Role required | `cloudExadataInfrastructureAdmin` |
| Infrastructure ID | Permanent; cannot be changed once set |
| Display name | Must be unique within the Google Cloud project |
| Region and GCP Oracle zone | Permanent; create in the same region and zone as the ODB Network |
| Exadata Infrastructure model | Listed by availability in the selected region and zone |
| Database server type / Storage server type | Applicable only to `X11M` |
| Database servers | Minimum 2, maximum 32 |
| Storage servers | Minimum 3, maximum 64 |
| Maintenance method | Rolling (servers updated one at a time, no downtime) or Non-rolling (servers updated in parallel, full system shutdown); optional custom action |
| Maintenance schedule | No preference, or choose month, week, weekday and start time |
| Maintenance contacts | Up to 10 unique contacts, added one at a time |

## Notes

- Corrected from the official docs: the source command block lists the flags on separate lines without `\` continuations (`gcloud oracle-database cloud-exadata-infrastructures create INSTANCE_ID` / `--location=REGION_ID` / ...); continuations added, matching the example in the gcloud 593.0.0 help for this command. Source: https://docs.cloud.google.com/sdk/gcloud/reference/oracle-database/cloud-exadata-infrastructures/create
- The gcloud example uses shape `Exadata.X9M`; the Console offers the models available in the selected region and zone. `--gcp-oracle-zone` is an optional flag in the gcloud help.
- Prerequisites: set up gcloud CLI and enable the API, active marketplace order, and the role above. After creation you can configure Exascale Storage (https://docs.cloud.google.com/oracle/database/docs/create-exadata-storage-vaults and https://docs.cloud.google.com/oracle/database/docs/configure-exascale-storage).
- For available regions and configurations, see https://docs.cloud.google.com/oracle/database/docs/regions-and-zones; the source's gcloud text links to "Available configurations" (https://docs.cloud.google.com/oracle/database/docs/available-configurations) for region lists.
- The source also shows Console steps and client-library samples (C#, Go, Java, Node.js, PHP, Python, Ruby), omitted here. The Node.js sample documents the ID rule `^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$` (maximum 63 characters, starts with a letter, ends with a letter or number).
- Exadata Infrastructure managed through Google Cloud is distinct from Cloud SQL / AlloyDB (`gcp-databases-relational`). Deleting an instance is destructive; try lifecycle operations on a disposable resource first.
- Source: https://docs.cloud.google.com/oracle/database/docs/create-instances (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-odb-network.md](./create-odb-network.md)
- [iam-overview.md](./iam-overview.md)
- [regions-and-zones.md](./regions-and-zones.md)
- [create-databases.md](./create-databases.md)
