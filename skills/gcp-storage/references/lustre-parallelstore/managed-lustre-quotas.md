---
source: https://docs.cloud.google.com/managed-lustre/docs/quotas
---

# Managed Lustre quotas and limits

Managed Lustre has adjustable quotas (default values, increases can be requested) and fixed system limits. Throughput and capacity quotas are pooled per region per VPC network but specified at the zonal level.

## Signature / Usage

Request a quota increase with a Cloud Quotas preference. Create a separate request for capacity and for throughput:

```bash
gcloud beta quotas preferences create \
  --project=PROJECT_NUMBER \
  --quota-id=QUOTA_ID \
  --preferred-value=PREFERRED_VALUE \
  --service=lustre.googleapis.com \
  --dimensions=zone=ZONE,network_name=projects/VPC_PROJECT_ID/global/networks/NETWORK_NAME \
  --email=EMAIL \
  --justification="JUSTIFICATION"
```

Look up the project number:

```bash
PROJECT=$(gcloud info --format='value(config.project)')
gcloud projects describe ${PROJECT} --format="value(projectNumber)"
```

## Options / Props

### System limits

| System limit | Value |
|---|---|
| Minimum capacity per instance | Dynamic: 472,000 GiB; 125 MBps/TiB: 72,000 GiB; 250 MBps/TiB: 36,000 GiB; 500 MBps/TiB: 18,000 GiB; 1000 MBps/TiB: 9,000 GiB |
| Maximum capacity per instance | Dynamic: 84,016,000 GiB (80.1 PiB); 125 MBps/TiB: 20,448,000 GiB (19.5 PiB); 250 MBps/TiB: 40,032,000 GiB (38.2 PiB); 500 MBps/TiB: 20,016,000 GiB (19.1 PiB); 1000 MBps/TiB: 10,008,000 GiB (9.5 PiB) |
| Maximum file size | 0.5 PiB |
| Maximum instances per project | 20 |
| Maximum client connections per instance (Compute Engine instances and GKE nodes) | 20,000 |
| Maximum Cloud Storage mirrors per instance | 1 |

### Quotas

| Item | Quota ID | Description |
|---|---|---|
| Read limit per minute | `RequestsPerMinute` | Max API requests an IAM user can make to the Managed Lustre API per minute (API calls only) |
| Lustre throughput capacity (GBps) per zone per VPC | `Throughput` | Throughput for instances (numbered tiers) |
| Lustre storage capacity (GiB) per zone per VPC | `Capacity` | Storage capacity for instances (numbered tiers) |
| Storage capacity (GiB) for Dynamic tier per zone per VPC | `DynamicTierCapacity` | Capacity for the Dynamic tier |

Units for `--preferred-value`: `RequestsPerMinute` requests per user per minute; `Throughput` GBps; `Capacity` GiB; `DynamicTierCapacity` GiB. `--quota-id` is case-sensitive.

## Notes

- Numbered tiers share throughput and capacity quotas across all numbered tiers; the Dynamic tier uses only `DynamicTierCapacity`.
- All zones in a region share one quota pool; an instance in `us-central1-a` reduces capacity available in `us-central1-b` and `-c`. The per-zone value shown in the Console does not reflect consumption by other zones.
- Legacy per-performance-tier quotas were replaced by the shared quotas and may show as Unlimited; this does not mean unlimited instances, and increase requests are not available for them.
- If requesting quota for a zone and VPC where no instance exists, use the gcloud command (the Console table will not list the combination). Requests without the zone and VPC fail. Requests are reviewed and confirmed by email.
- The source also shows Console steps and an interactive quota calculator (iframe).
- Source: https://docs.cloud.google.com/managed-lustre/docs/quotas (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [managed-lustre-create-instance.md](./managed-lustre-create-instance.md)
- [managed-lustre-overview.md](./managed-lustre-overview.md)
