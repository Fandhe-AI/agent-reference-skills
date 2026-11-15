---
source: https://docs.cloud.google.com/tasks/docs/locations
---

# Cloud Tasks locations

Regions where Cloud Tasks queues can run. The region is the `LOCATION` in queue names and commands.

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/tasks/docs/creating-queues:

```bash
gcloud tasks queues create QUEUE_ID \
    --location=LOCATION
```

## Options / Props

| Area | Regions |
| --- | --- |
| Americas | `northamerica-northeast1` (Montreal), `northamerica-northeast2` (Toronto), `southamerica-east1` (Sao Paulo), `us-central1` (Iowa), `us-east1` (South Carolina), `us-east4` (Virginia), `us-south1` (Dallas), `us-west1` (Oregon), `us-west2` (Los Angeles), `us-west3` (Salt Lake City), `us-west4` (Las Vegas) |
| Europe | `europe-central2` (Warsaw), `europe-west1` (Belgium), `europe-west2` (London), `europe-west3` (Frankfurt), `europe-west6` (Zurich) |
| Asia Pacific | `asia-east1` (Taiwan), `asia-east2` (Hong Kong), `asia-northeast1` (Tokyo), `asia-northeast2` (Osaka), `asia-northeast3` (Seoul), `asia-south1` (Mumbai), `asia-south2` (Delhi), `asia-southeast1` (Singapore), `asia-southeast2` (Jakarta), `australia-southeast1` (Sydney) |
| Middle East | `me-central1` (Doha), `me-central2` (Dammam, see https://docs.cloud.google.com/docs/dammam-region-access) |

## Notes

- Low CO2 regions per the source: `northamerica-northeast1`, `northamerica-northeast2`, `southamerica-east1`, `us-central1`, `us-south1`, `us-west1`, `europe-central2`, `europe-west1`, `europe-west2`, `europe-west6`.
- HTTP/S targets work in all supported regions; App Engine targets require the queue in the project's App Engine region.
- Source: https://docs.cloud.google.com/tasks/docs/locations (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/tasks/docs/creating-queues (retrieved 2026-11-15)

## Related

- [creating-queues.md](./creating-queues.md)
- [dual-overview.md](./dual-overview.md)
