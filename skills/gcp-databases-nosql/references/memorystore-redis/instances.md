---
source: https://docs.cloud.google.com/memorystore/docs/redis/instances
---

# Redis instances

A Memorystore for Redis instance is an in-memory Redis data store. This page explains the key settings and attributes of an instance: ID, service tier, capacity tier, network and region.

## Signature / Usage

```bash
gcloud redis instances create INSTANCE_ID --size=SIZE --region=REGION_ID
```

## Options / Props

| Attribute | Description |
|---|---|
| Instance ID | Chosen when you create the instance |
| Service tier | Basic or Standard; Standard provides a highly available instance with automatic failover |
| Size | 1-300 GB; places the instance in one of five capacity tiers, which determine maximum network performance and price |
| Network | VPC networks only; legacy networks are not supported |

### Regions

Redis instances are available in these regions (as listed on this page): Belgium (`europe-west1`), Dammam (`me-central2`), Delhi (`asia-south2`), Doha (`me-central1`), Finland (`europe-north1`), Frankfurt (`europe-west3`), Hong Kong (`asia-east2`), Iowa (`us-central1`), Jakarta (`asia-southeast2`), Las Vegas (`us-west4`), London (`europe-west2`), Los Angeles (`us-west2`), Madrid (`europe-southwest1`), Melbourne (`australia-southeast2`), Milan (`europe-west8`), Montréal (`northamerica-northeast1`), Mumbai (`asia-south1`), Netherlands (`europe-west4`), Northern Virginia (`us-east4`), Oregon (`us-west1`), Osaka (`asia-northeast2`), Paris (`europe-west9`), Salt Lake City (`us-west3`), Santiago (`southamerica-west1`), São Paulo (`southamerica-east1`), Seoul (`asia-northeast3`), Singapore (`asia-southeast1`), South Carolina (`us-east1`), Sydney (`australia-southeast1`), Taiwan (`asia-east1`), Tel Aviv (`me-west1`), Tokyo (`asia-northeast1`), Toronto (`northamerica-northeast2`), Turin (`europe-west12`), Warsaw (`europe-central2`), Zurich (`europe-west6`).

## Notes

- Source inconsistency: this page lists 36 regions, while the regions page lists more (for example `africa-south1`, `asia-southeast3`, `europe-north2`, `europe-west10`, `northamerica-south1`, `us-east5`, `us-south1`). See regions.md.
- Region and zone have pricing, performance and networking implications.
- Managed Valkey / Redis / Memcached on Google Cloud; distinct from Upstash Redis (`upstash`) and Cloudflare Workers KV (`cloudflare-storage`).
- Snippet taken from https://docs.cloud.google.com/memorystore/docs/redis/create-manage-instances
- Source: https://docs.cloud.google.com/memorystore/docs/redis/instances (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-manage-instances.md](./create-manage-instances.md)
- [redis-tiers.md](./redis-tiers.md)
- [regions.md](./regions.md)
- [networking.md](./networking.md)
