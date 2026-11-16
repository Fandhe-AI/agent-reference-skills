---
source: https://docs.cloud.google.com/oracle/database/docs/regions-and-zones
---

# Oracle Database@Google Cloud regions and zones

Lists which Google Cloud regions and GCP Oracle zones support each Oracle Database@Google Cloud service, and which resources are regional or zonal. The Oracle Database@Google Cloud zones are called GCP Oracle zones.

## Signature / Usage

The page itself has no code. The block below is the `odb-networks create` command from the create-odb-network page (an ODB Network is a zonal resource; the region and GCP Oracle zone are set with `--location` and `--gcp-oracle-zone`).

```bash
gcloud oracle-database odb-networks create ODB_NETWORK_ID \
    --project=PROJECT_ID \
    --location=REGION \
    --network=projects/PROJECT_ID/global/networks/VPC_NETWORK \
    --gcp-oracle-zone=GCP_ORACLE_ZONE \
    --psc-interface-config-network-attachment=projects/PROJECT_ID/regions/REGION/networkAttachments/NETWORK_ATTACHMENT_ID
```

## Options / Props

### Regional and zonal resources

| Scope | Resources |
|-------|-----------|
| Regional | Autonomous AI Databases |
| Zonal | Exadata Infrastructures, Exadata VM Clusters, Exascale VM Clusters and Exascale Storage Vaults, ODB Networks and ODB Subnets, DB systems, Goldengate deployments |

### Available regions and zones per service

Zone names are written as in the source (suffix `-a-r1` and similar). A dash means the service is not listed in that region. Autonomous AI Database is listed by region only (no zones).

| Region | Location | Exadata Database Service | Exascale Infrastructure | Base Database Service | Autonomous AI Database | Goldengate |
|--------|----------|--------------------------|-------------------------|-----------------------|------------------------|------------|
| `asia-northeast1` | Tokyo, Japan | `asia-northeast1-a-r1` | `asia-northeast1-a-r1` | `asia-northeast1-a-r1` | yes | `asia-northeast1-a-r1` |
| `asia-northeast2` | Osaka, Japan | `asia-northeast2-a-r1` | `asia-northeast2-a-r1` | `asia-northeast2-a-r1` | yes | `asia-northeast2-a-r1` |
| `australia-southeast1` | Sydney, Australia | `australia-southeast1-b-r1` | - | - | yes | `australia-southeast1-b-r1` |
| `australia-southeast2` | Melbourne, Australia | `australia-southeast2-a-r2`, `australia-southeast2-b-r1` | `australia-southeast2-a-r2` | `australia-southeast2-a-r2` | yes | `australia-southeast2-a-r2`, `australia-southeast2-b-r1` |
| `asia-south1` | Mumbai, India | `asia-south1-b-r1` | `asia-south1-b-r1` | `asia-south1-b-r1` | yes | `asia-south1-b-r1` |
| `asia-south2` | Delhi, India | `asia-south2-b-r1` | `asia-south2-b-r1` | `asia-south2-b-r1` | yes | `asia-south2-b-r1` |
| `northamerica-northeast1` | Montréal, Québec, Canada | `northamerica-northeast1-a-r1` | `northamerica-northeast1-a-r1` | `northamerica-northeast1-a-r1` | yes | `northamerica-northeast1-a-r1` |
| `northamerica-northeast2` | Toronto, Ontario, Canada | `northamerica-northeast2-a-r2` | - | - | yes | `northamerica-northeast2-a-r2` |
| `northamerica-south1` | Querétaro, Mexico | `northamerica-south1-b-r1` | - | - | - | - |
| `us-central1` | Iowa | `us-central1-a-r1` | `us-central1-a-r1` | `us-central1-a-r1` | yes | `us-central1-a-r1` |
| `us-east4` | Northern Virginia | `us-east4-a-r2`, `us-east4-b-r1` | `us-east4-a-r2`, `us-east4-b-r1` | `us-east4-a-r2`, `us-east4-b-r1` | yes | `us-east4-a-r2`, `us-east4-b-r1` |
| `us-west3` | Salt Lake City | `us-west3-a-r1` | `us-west3-a-r1` | `us-west3-a-r1` | yes | `us-west3-a-r1` |
| `southamerica-east1` | São Paulo, Brazil, South America | `southamerica-east1-a-r1` | `southamerica-east1-a-r1` | `southamerica-east1-a-r1` | yes | `southamerica-east1-a-r1` |
| `europe-west2` | London, England (Low CO2 marker in the source) | `europe-west2-a-r1`, `europe-west2-c-r2` | `europe-west2-a-r1`, `europe-west2-c-r2` | `europe-west2-a-r1`, `europe-west2-c-r2` | yes | `europe-west2-a-r1`, `europe-west2-c-r2` |
| `europe-west3` | Frankfurt, Germany | `europe-west3-a-r2`, `europe-west3-b-r1` | `europe-west3-a-r2`, `europe-west3-b-r1` | `europe-west3-a-r2`, `europe-west3-b-r1` | yes | `europe-west3-a-r2`, `europe-west3-b-r1` |
| `europe-west8` | Milan, Italy | `europe-west8-b-r1`, `europe-west8-a-r1` | `europe-west8-b-r1`, `europe-west8-a-r1` | `europe-west8-b-r1`, `europe-west8-a-r1` | yes | `europe-west8-b-r1`, `europe-west8-a-r1` |
| `europe-west12` | Turin, Italy | `europe-west12-a-r1` | - | - | - | - |

## Notes

- The source gives five separate tables (Exadata Database Service, Exadata Database Service on Exascale Infrastructure, Base Database Service, Autonomous AI Database Service, Goldengate); they are merged here into one matrix and every cell was cross-checked against them. Autonomous AI Database is listed by region only.
- All resources, regional or zonal, must be uniquely named across the project.
- Create the ODB Network and other zonal resources (Exadata Infrastructure, Exadata VM Clusters, DB system) in the same region and zone for optimal performance and seamless communication.
- The Exascale Infrastructure and Base Database Service columns are identical in the source. Exadata Database Service and Goldengate differ only in that Goldengate has no `northamerica-south1` or `europe-west12`.
- Snippet taken from https://docs.cloud.google.com/oracle/database/docs/create-odb-network (the page has no code of its own).
- Source: https://docs.cloud.google.com/oracle/database/docs/regions-and-zones (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/oracle/database/docs/create-odb-network (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-odb-network.md](./create-odb-network.md)
- [create-instances.md](./create-instances.md)
- [create-databases.md](./create-databases.md)
- [overview.md](./overview.md)
