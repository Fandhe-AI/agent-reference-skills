---
source: https://docs.cloud.google.com/parallelstore/docs/create-instance
---

# Create a Parallelstore instance

A Parallelstore instance is a hosted file storage server offering very high IOPS and low latency through direct, parallel access to storage media.

## Signature / Usage

### Create (REST)

Request template from the source (field types are placeholders, not a runnable JSON body):

```text
POST https://parallelstore.googleapis.com/v1beta/projects/PROJECT_ID/locations/ZONE/instances?instanceId=INSTANCE_NAME
Authorization: Bearer AUTH_TOKEN
{
  "capacityGib": string,
  "network": string,
  "fileStripeLevel": enum (FileStripeLevel),
  "directoryStripeLevel": enum (DirectoryStripeLevel)
}
```

The completed creation operation lists `accessPoints` (for example `172.21.95.2`, `172.21.95.4`, `172.21.95.5`) and `state: ACTIVE`; keep them for client configuration.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `INSTANCE_NAME` | string | Lowercase letters, numbers, hyphens; starts with a letter; 1-63 chars; ends with number or letter; unique within project and location |
| `capacityGib` | int | 12000 to 100000 GiB, in multiples of 4000 (12 TiB to 100 TiB) |
| `ZONE` | zone | A supported zone; same zone as clients for best performance |
| `network` | string | VPC network name (same network as clients) |
| `fileStripeLevel` | enum | `FILE_STRIPE_LEVEL_MIN`, `FILE_STRIPE_LEVEL_BALANCED`, `FILE_STRIPE_LEVEL_MAX` |
| `directoryStripeLevel` | enum | `DIRECTORY_STRIPE_LEVEL_MIN`, `DIRECTORY_STRIPE_LEVEL_BALANCED`, `DIRECTORY_STRIPE_LEVEL_MAX` |

## Notes

- gcloud 593.0.0 has no `parallelstore` command group; the source's `gcloud beta parallelstore instances create` and `gcloud beta parallelstore operations describe` commands do not run with this version and were omitted — use the Console or the Parallelstore REST API (https://docs.cloud.google.com/parallelstore/docs/reference/rest/v1beta/projects.locations.instances#Instance). The source's gcloud flags were `--capacity-gib`, `--location`, `--network`, `--directory-stripe-level` (`directory-stripe-level-balanced` / `-max` / `-min`) and `--file-stripe-level` (`file-stripe-level-balanced` / `-max` / `-min`).
- The REST block is the source's request template (field types such as `string` and `enum (FileStripeLevel)` stand in for values), not a pasteable request. The API supports more optional fields; see the `Instance` resource reference linked above.
- Required role: Parallelstore Admin (`roles/parallelstore.admin`). Creation takes 5-10 minutes.
- The source says capacity "can range from 12TiB to 100TiB, in multiples of 4"; the API field is in GiB (multiples of 4000).
- The Console flow also lets you choose an automatically allocated or custom IP range; the source also shows Console steps.
- Striping details: https://docs.cloud.google.com/parallelstore/docs/performance. Capacity troubleshooting (ENOSPC): https://docs.cloud.google.com/parallelstore/docs/troubleshooting#troubleshooting-enospc.
- Availability is by invitation only (see the overview page).
- Source: https://docs.cloud.google.com/parallelstore/docs/create-instance (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [parallelstore-overview.md](./parallelstore-overview.md)
- [parallelstore-connect-from-compute-engine.md](./parallelstore-connect-from-compute-engine.md)
