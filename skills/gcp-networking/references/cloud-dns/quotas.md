---
source: https://docs.cloud.google.com/dns/quotas
---

# Quotas and limits (Cloud DNS)

Cloud DNS quotas have default values you can usually adjust; system limits are fixed. Quotas generally apply per Google Cloud project and are shared across all applications and IP addresses in the project. Prices are not covered here.

## Signature / Usage

### Check the quota and limits of a project

Replace `PROJECT_ID` with your own project ID.

```bash
gcloud dns project-info describe PROJECT_ID
```

Example output shape (limits are tracked internally as quotas, so the output labels them quotas; `my-project` is an example project):

```text
id: my-project,
kind: "dns#project",
number: "123456789012",
quota:
    kind: dns#quota,
    managedZones: 10000,
    resourceRecordsPerRrset: 10000,
    rrsetAdditionsPerChange: 3000,
    rrsetDeletionsPerChange: 3000,
    rrsetsPerManagedZone: 10000,
    totalRrdataSizePerChange: 100000,
    labelSets: 1000
```

`totalRrdataSizePerChange` is measured in bytes and is the combined total of additions and deletions for a change.

## Options / Props

### Quotas (per project; view and request changes on the Quotas page)

| Item | Description |
|---|---|
| Read limit for a minute for a region | Max Cloud DNS API requests an IAM user can make in one minute (API calls only; no quota on DNS query processing) |
| DNSSEC keys per managed zone | Max DNSSEC keys per managed zone |
| Managed zones per project | Max managed zones in the project |
| Managed zones per VPC network | Max managed zones attached to a VPC network |
| Policy resources per project | Max DNS server policies per project |
| Networks per response policy | Max VPC networks per response policy |
| Internet health checked routing policies per project | Max internet health checked routing policies per project |
| Items per routing policy | Max items per routing policy |
| GKE clusters per managed zone | Max GKE clusters to which a privately scoped zone can be attached |
| GKE clusters per policy | Max GKE clusters per policy |
| Managed zones per GKE cluster | Max managed zones attached to a GKE cluster |
| Resource record additions per change | Max `ResourceRecordSets` added per `ChangesCreateRequest` |
| Resource record deletions per change | Max `ResourceRecordSets` deleted per `ChangesCreateRequest` |
| Resource record sets per managed zone | Max `ResourceRecordSets` per zone |
| Resource records per resource record set | Max `ResourceRecords` per `ResourceRecordSet`; each `NS` delegation can have up to eight name servers |
| Response policies per project | Max response policies per project |
| Response policy rule write limit for a minute for a region | Max response policy rules written per minute per region |
| Response policy rules per batch action | Max response policy management actions per batch per minute |
| Response policy rules per policy | Max response policy rules per policy |
| Target name servers per forwarding policy | Max target name servers per forwarding policy |
| Target name servers per managed zone | Max target name servers per managed forwarding zone |
| Total size of resource record set data (bytes) per change | Max total `rrdata` size in one `ChangesCreateRequest` |
| VPC networks per managed zone | Max VPC networks to which a privately scoped zone can be attached |
| VPC networks per policy | Max VPC networks per server policy |
| Write limit for a minute for a region | Max DNS writes per region per minute (create, modify, or delete a record) |

### Resource limits (contact Cloud Customer Care to request an update)

| Item | Limit |
|---|---|
| Peering zones per network | 1,000 |
| Name servers per delegation | 8 |
| Additions per change | 1,000 |
| Deletions per change | 1,000 |
| Resource record data size per change | 100,000 bytes |
| Number of label combinations | 1,000 |
| Rules per response policy | 10,000 |
| Items per routing policy | 100 |
| Managed zones bound to a VPC network | 10,000 |
| Largest DNS response (UDP) | 1,440 bytes |
| Largest DNS response (TCP) | 65,533 bytes |

### Limits that cannot be increased

| Item | Limit |
|---|---|
| Max query rate per VPC network per zone | 100,000 queries in a ten-second period in a Google Cloud zone, for example `us-central1-a` |
| Response policies per VPC network | 1 |
| Labels per managed zone | 64 labels and 128 bytes per key or value |
| Forwarding targets in a forwarding zone | 50 |
| Forwarding targets in an alternative name server | 50 |
| Outbound Endpoints per project per region (Preview) | 10 |
| Outbound Endpoints attached to a forwarding zone or DNS server policy (Preview) | 100 |

### Name server shards (public zones)

| Name server shards (public zones) |
|---|
| Every public managed zone is assigned to one of five name server shards (the letter before the number, for example `ns-cloud-e1` to `ns-cloud-e4` is shard E). |
| A new zone cannot be placed on a shard that already has a zone with the same DNS name, a subdomain of it, or a parent domain of it. So: at most five zones with the exact same DNS name, and at most five levels of subdomains for any parent domain. Limits apply across all projects and users. |
| Before Cloud DNS creates a zone on the last available shard, you must verify domain ownership with a `TXT` record. |
| Avoid the limit by creating parent domain zones before subdomain zones. If child zones already block all shards: find each subdomain's shard from its name servers, pick the shard X with the fewest or least important zones, export those zones and change delegations to another DNS service, delete the shard X subdomain zones after the original delegation TTLs expire, create the parent zone (it lands on shard X), then restore the subdomain zones (subdomains before sub-subdomains) with updated delegations. |
| Google Domains registrations use shards too; a domain with identical or subdomain zones on all shards cannot be registered with Google Domains until one is freed. |

### Permissions

| Task | Required role |
|---|---|
| Check quotas for a project | Project Owner (`roles/owner`), Editor (`roles/editor`), or Quota Viewer (`roles/servicemanagement.quotaViewer`) |
| Modify quotas, request additional quota | Owner, Editor, Quota Administrator (`roles/servicemanagement.quotaAdmin`), or a custom role with `serviceusage.quotas.update` |

## Notes

- Exceeding a quota with gcloud prints a `quota exceeded` error and exits with code `1`; an API request returns HTTP `413 Request Entity Too Large`.
- Most quota changes are requested in the console (Quotas page, Edit quotas); requests take 24 to 48 hours. Quotas do not guarantee resource availability.
- Deleting zones to free a shard is destructive and breaks resolution if delegations are not updated first; try the procedure on a disposable zone first.
- API usage per day is governed per project; all requests count, including gcloud and console.
- Console steps for checking and requesting quota are omitted; see the source page.
- Source inconsistency: the Resource limits table on the page (https://docs.cloud.google.com/dns/quotas) states Additions per change 1,000 and Deletions per change 1,000, while the example `gcloud dns project-info describe` output on the same page shows `rrsetAdditionsPerChange: 3000` and `rrsetDeletionsPerChange: 3000`. Both are kept exactly as written; check your own project's values with the command above.
- Google Cloud DNS, not Cloudflare DNS.
- Source: https://docs.cloud.google.com/dns/quotas (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [zones-overview.md](./zones-overview.md)
- [routing-policies-overview.md](./routing-policies-overview.md)
