---
source: https://docs.cloud.google.com/run/docs/locations
---

# Cloud Run locations

Each Cloud Run resource lives in a region, and customer data is stored in the selected region. Serve multi-region traffic with external HTTP(S) Load Balancing.

## Signature / Usage

Deploy to a region other than the `run/region` gcloud property (command from https://docs.cloud.google.com/run/docs/deploying):

```bash
gcloud run deploy SERVICE --region REGION
```

## Options / Props

### Tier 1 pricing regions

`asia-east1` (Taiwan), `asia-northeast1` (Tokyo), `asia-northeast2` (Osaka), `asia-south1` (Mumbai), `asia-southeast3` (Bangkok), `europe-north1` (Finland)*, `europe-north2` (Stockholm)*, `europe-southwest1` (Madrid)*, `europe-west1` (Belgium)*, `europe-west4` (Netherlands)*, `europe-west8` (Milan)*, `europe-west9` (Paris)*, `me-west1` (Tel Aviv), `northamerica-south1` (Mexico), `us-central1` (Iowa)*, `us-east1` (South Carolina), `us-east4` (Northern Virginia), `us-east5` (Columbus), `us-south1` (Dallas)*, `us-west1` (Oregon)*.

### Tier 2 pricing regions

`africa-south1` (Johannesburg), `asia-east2` (Hong Kong), `asia-northeast3` (Seoul), `asia-southeast1` (Singapore), `asia-southeast2` (Jakarta), `asia-south2` (Delhi), `australia-southeast1` (Sydney), `australia-southeast2` (Melbourne), `europe-central2` (Warsaw)*, `europe-west10` (Berlin), `europe-west12` (Turin)*, `europe-west2` (London)*, `europe-west3` (Frankfurt), `europe-west6` (Zurich)*, `me-central1` (Doha), `me-central2` (Dammam), `northamerica-northeast1` (Montreal)*, `northamerica-northeast2` (Toronto)*, `southamerica-east1` (Sao Paulo)*, `southamerica-west1` (Santiago)*, `us-west2` (Los Angeles), `us-west3` (Salt Lake City), `us-west4` (Las Vegas).

`*` = marked "Low CO2" in the source.

### GPU regions

| GPU | Regions |
|---|---|
| NVIDIA RTX PRO 6000 Blackwell | `asia-southeast1`, `asia-south2`, `europe-west4`, `us-central1` |
| L4 | `asia-southeast1`, `asia-south1` (invitation only; contact your Google Account team), `europe-west1`, `europe-west4`, `us-central1` (extra scaling may need a quota increase request), `us-east4` (extra scaling may need a quota increase request) |

### Other location facts

| Feature | Regions |
|---|---|
| Domain mappings | `asia-east1`, `asia-northeast1`, `asia-southeast1`, `europe-north1`, `europe-west1`, `europe-west4`, `us-central1`, `us-east1`, `us-east4`, `us-west1` (other regions: use the other custom-domain options) |
| Serverless VPC Access connectors | Not supported in `asia-southeast3` |
| Cloud Run instances | Any supported region except `europe-west1`, `us-central1`, `us-east1` |

## Notes

- Choose a region by latency, availability, and nearness to other Google Cloud products your service uses.
- Source: https://docs.cloud.google.com/run/docs/locations (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- The source page has no code block; the snippet is taken from https://docs.cloud.google.com/run/docs/deploying.

## Related

- [quotas.md](./quotas.md)
- [resource-model.md](./resource-model.md)
