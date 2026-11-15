---
source: https://docs.cloud.google.com/workstations/docs/quotas
---

# Quotas and limits, and supported locations

Cloud Workstations quotas (adjustable) and system limits (fixed), plus the regions that Cloud Workstations supports.

## Signature / Usage

Region IDs copied from the locations page (the quotas page has no code block):

```text
asia-east1 asia-east2 asia-northeast1 asia-northeast3 asia-south1 asia-southeast1
australia-southeast1 australia-southeast2
europe-central2 europe-north1 europe-north2 europe-southwest1 europe-west1 europe-west2
europe-west3 europe-west4 europe-west6 europe-west8 europe-west9 europe-west12
me-central2 me-west1 northamerica-northeast1 southamerica-east1 southamerica-west1
us-central1 us-east1 us-east4 us-east5 us-west1 us-west4
```

## Options / Props

### Allocation quotas (per region per project; released with the resource; do not reset over time)

| Resource | Default |
|----------|---------|
| Workstation clusters | 3 |
| Workstation configurations | 100 |
| Workstations | 9000 |

### Rate quotas (per project)

| Request type | Default |
|--------------|---------|
| Read requests (QPS) | 180 |
| Write requests (QPS) | 60 |

### System limits (cannot be changed)

| Limit | Value |
|-------|-------|
| Concurrently running workstations per workstation cluster | 3000 |

### Regions

| Region | Location |
|--------|----------|
| `asia-east1` | Changhua County, Taiwan |
| `asia-east2` | Hong Kong |
| `asia-northeast1` | Tokyo, Japan |
| `asia-northeast3` | Seoul, South Korea |
| `asia-south1` | Mumbai, India |
| `asia-southeast1` | Jurong West, Singapore |
| `australia-southeast1` | Sydney, Australia |
| `australia-southeast2` | Melbourne, Australia |
| `europe-central2` | Warsaw, Poland |
| `europe-north1` | Hamina, Finland |
| `europe-north2` | Stockholm, Sweden |
| `europe-southwest1` | Madrid, Spain |
| `europe-west1` | St. Ghislain, Belgium |
| `europe-west2` | London, United Kingdom |
| `europe-west3` | Frankfurt, Germany |
| `europe-west4` | Eemshaven, Netherlands |
| `europe-west6` | Zurich, Switzerland |
| `europe-west8` | Milan, Italy |
| `europe-west9` | Paris, France |
| `europe-west12` | Turin, Italy |
| `me-central2` | Dammam, Saudi Arabia |
| `me-west1` | Tel Aviv, Israel |
| `northamerica-northeast1` | Montréal, Québec |
| `southamerica-east1` | Osasco, São Paulo, Brazil |
| `southamerica-west1` | Santiago, Chile |
| `us-central1` | Council Bluffs, Iowa |
| `us-east1` | Moncks Corner, South Carolina |
| `us-east4` | Ashburn, Virginia |
| `us-east5` | Columbus, Ohio |
| `us-west1` | The Dalles, Oregon |
| `us-west4` | Las Vegas, Nevada |

## Notes

- Quotas have default values and can usually be adjusted (Console: https://docs.cloud.google.com/docs/quotas/help/request_increase); system limits are fixed. When a quota is exceeded the task fails. Quotas apply per project.
- Workstation VMs also need CPU quota, Persistent Disk quota, and external IP address quota if VMs have external IPs.
- VPC IP addresses needed per configuration: 1 per concurrently running workstation expected, plus the **Quick start pool size** if Quick start workstations is enabled, plus 1 for the connection between the Cloud Workstations controller and your VPC.
- To restrict the number of workstations per configuration, see https://docs.cloud.google.com/workstations/docs/limit-workstations-per-developer. Machine types: https://docs.cloud.google.com/workstations/docs/available-machine-types.
- Merged: the `locations` page is combined here with the `quotas` page.
- Source: https://docs.cloud.google.com/workstations/docs/quotas (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/workstations/docs/locations (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-configuration.md](./create-configuration.md)
- [access-control.md](./access-control.md)
