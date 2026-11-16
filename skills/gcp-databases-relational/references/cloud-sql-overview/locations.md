---
source: https://docs.cloud.google.com/sql/docs/postgres/locations
---

# Cloud SQL locations (regions, multi-regions, zones)

You choose a region when creating the instance, and the location can't be changed afterward. Multi-regional locations are used only for backups. Pick the same region as Compute Engine and other services to reduce latency and increase availability.

## Signature / Usage

A zone is a sub-location of a region: `us-central1-a` is a zone within the `us-central1` region. Snippet taken from https://docs.cloud.google.com/sql/docs/postgres/create-instance (the region is set with `--region` at creation):

```bash
  gcloud sql instances create myinstance \
  --database-version=POSTGRES_16 \
  --tier=db-perf-optimized-N-4 \
  --edition=ENTERPRISE_PLUS \
  --region=us-central1
```

## Options / Props

### Regions

| Area | Regions |
|------|---------|
| Africa | `africa-south1` Johannesburg |
| Asia | `asia-east1` Taiwan, `asia-east2` Hong Kong, `asia-northeast1` Tokyo, `asia-northeast2` Osaka, `asia-northeast3` Seoul, `asia-south1` Mumbai, `asia-south2` Delhi, `asia-southeast1` Singapore, `asia-southeast2` Jakarta, `asia-southeast3` Bangkok |
| Australia | `australia-southeast1` Sydney, `australia-southeast2` Melbourne |
| Europe | `europe-central2` Warsaw, `europe-north1` Finland, `europe-southwest1` Madrid, `europe-west1` Belgium, `europe-west2` London, `europe-west3` Frankfurt, `europe-west4` Netherlands, `europe-west6` Zürich, `europe-west8` Milan, `europe-west9` Paris, `europe-west10` Berlin, `europe-west12` Turin |
| Middle East | `me-central1` Doha, `me-central2` Dammam, `me-west1` Tel Aviv |
| North America | `northamerica-northeast1` Montréal, `northamerica-northeast2` Toronto, `northamerica-south1` Mexico, `us-central1` Iowa, `us-south1` Dallas, `us-east1` South Carolina, `us-east4` Northern Virginia, `us-east5` Columbus, `us-west1` Oregon, `us-west2` Los Angeles, `us-west3` Salt Lake City, `us-west4` Las Vegas |
| South America | `southamerica-east1` São Paulo, `southamerica-west1` Santiago |

Low CO2 regions marked in the source: `europe-north1`, `europe-southwest1`, `europe-west1`, `europe-west2`, `europe-west4`, `europe-west6`, `europe-west9`, `northamerica-northeast1`, `northamerica-northeast2`, `us-central1`, `us-south1`, `us-west1`, `southamerica-east1`, `southamerica-west1`.

### Multi-regional backup locations

| Name | Description |
|------|-------------|
| `asia` | Data centers in Asia, excluding Hong Kong and Indonesia |
| `eu` | Data centers within European Union member states (backup data in `eu` is not stored in `europe-west2` London or `europe-west6` Zürich) |
| `us` | Data centers in the United States |

## Notes

- Cloud SQL is available in all Google Cloud regions and in upcoming regional launches at launch time.
- An organization policy may restrict resource locations; disallowed locations are unavailable in the Console **Location** menu.
- A zone is independent of other zones in its region. A zone can be added at creation and modified by editing the instance. **Any** lets the system assign a zone. For synchronous cross-zone replication configure high availability.
- Source: https://docs.cloud.google.com/sql/docs/postgres/locations (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sql/docs/postgres/create-instance (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [availability.md](./availability.md)
- [machine-series-overview.md](./machine-series-overview.md)
