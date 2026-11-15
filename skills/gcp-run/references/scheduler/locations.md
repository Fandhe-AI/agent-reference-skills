---
source: https://docs.cloud.google.com/scheduler/docs/locations
---

# Cloud Scheduler locations

Regions where Cloud Scheduler jobs can run. Pick a location that colocates the job with its target to optimize network performance and meet data residency needs.

## Signature / Usage

```bash
gcloud scheduler jobs create http JOB \
    --location=LOCATION \
    --schedule=SCHEDULE \
    --uri=URI
```

Snippet taken from https://docs.cloud.google.com/scheduler/docs/creating; `LOCATION` is one of the region names below. App Engine target jobs must use the App Engine app's region.

## Options / Props

| Area | Regions |
|---|---|
| Americas | `northamerica-northeast1` (Montréal), `northamerica-northeast2` (Toronto), `southamerica-east1` (Osasco, São Paulo), `us-central1` (Council Bluffs, Iowa), `us-east1` (Moncks Corner, South Carolina), `us-east4` (Ashburn, Virginia), `us-south1` (Dallas), `us-west1` (The Dalles, Oregon), `us-west2` (Los Angeles), `us-west3` (Salt Lake City), `us-west4` (Las Vegas) |
| Europe | `europe-central2` (Warsaw), `europe-west1` (St. Ghislain, Belgium), `europe-west2` (London), `europe-west3` (Frankfurt), `europe-west4` (Eemshaven, Netherlands), `europe-west6` (Zurich), `europe-west8` (Milan), `europe-west9` (Paris), `europe-west12` (Turin) |
| Asia Pacific | `asia-east1` (Changhua County, Taiwan), `asia-east2` (Hong Kong), `asia-northeast1` (Tokyo), `asia-northeast2` (Osaka), `asia-northeast3` (Seoul), `asia-south1` (Mumbai), `asia-south2` (Delhi), `asia-southeast1` (Jurong West, Singapore), `asia-southeast2` (Jakarta), `asia-southeast3` (Bangkok), `australia-southeast1` (Sydney) |
| Middle East | `me-central1` (Doha), `me-central2` (Dammam, Saudi Arabia; see Dammam region access), `me-west1` (Tel Aviv) |

## Notes

- The source marks the following with a "Low CO2" label: `northamerica-northeast1`, `northamerica-northeast2`, `southamerica-east1`, `us-central1`, `us-south1`, `us-west1`, `europe-central2`, `europe-west1`, `europe-west2`, `europe-west4`, `europe-west6`, `europe-west8`, `europe-west9`, `europe-west12`.
- A Cloud Scheduler region for Cloud Run job triggers need not match the Cloud Run job's region.
- Source: https://docs.cloud.google.com/scheduler/docs/locations (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [creating.md](./creating.md)
