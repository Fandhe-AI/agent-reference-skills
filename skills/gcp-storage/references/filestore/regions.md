---
source: https://docs.cloud.google.com/filestore/docs/regions
---

# Filestore regions and zones

Filestore instances live in zones within regions. In the Filestore API, locations map to zones (zones for Basic and Zonal tiers; Regional and Enterprise instances use a region). Create instances close to clients (same region) to reduce latency and avoid cross-region networking charges.

## Signature / Usage

Set the default zone (or region for the regional / enterprise tier) used as `--location` (snippet from the creating-instances page):

```bash
gcloud config set filestore/zone zone
gcloud config set filestore/region region
```

## Options / Props

| Geography | Region name (description) and zones |
|---|---|
| Africa | `africa-south1` (Johannesburg): a, b, c |
| Asia | `asia-east1` (Taiwan), `asia-east2` (Hong Kong), `asia-northeast1` (Tokyo), `asia-northeast2` (Osaka), `asia-northeast3` (Seoul), `asia-southeast1` (Singapore), `asia-southeast3` (Bangkok): a, b, c |
| Australia | `australia-southeast1` (Sydney), `australia-southeast2` (Melbourne): a, b, c |
| Europe | `europe-central2` (Warsaw), `europe-north1` (Finland), `europe-north2` (Stockholm), `europe-southwest1` (Madrid), `europe-west2` (London), `europe-west3` (Frankfurt), `europe-west4` (Netherlands), `europe-west6` (Zurich), `europe-west8` (Milan), `europe-west9` (Paris), `europe-west10` (Berlin), `europe-west12` (Turin): a, b, c; `europe-west1` (Belgium): b, c, d |
| India | `asia-south1` (Mumbai), `asia-south2` (Delhi): a, b, c |
| Indonesia | `asia-southeast2` (Jakarta): a, b, c |
| Middle East | `me-central1` (Doha), `me-central2` (Dammam), `me-west1` (Tel Aviv): a, b, c |
| North America | `northamerica-northeast1` (Montreal), `northamerica-northeast2` (Toronto), `northamerica-south1` (Mexico), `us-east4` (Northern Virginia), `us-east5` (Columbus), `us-south1` (Dallas), `us-west1` (Oregon), `us-west2` (Los Angeles), `us-west3` (Salt Lake City), `us-west4` (Las Vegas): a, b, c; `us-central1` (Iowa): a, b, c, f; `us-east1` (South Carolina): b, c, d |
| South America | `southamerica-east1` (Sao Paulo), `southamerica-west1` (Santiago): a, b, c |

## Notes

- Zone names are the region name plus the zone letter (for example `us-central1-a`).
- Pick one of the `asia-east1` zones (for example `asia-east1-a`) when clients are in Asia; mount shares on clients in the same region for best performance.
- Snippet taken from https://docs.cloud.google.com/filestore/docs/creating-instances.
- Source: https://docs.cloud.google.com/filestore/docs/regions (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [creating-instances.md](./creating-instances.md)
- [service-tiers.md](./service-tiers.md)
