---
source: https://docs.cloud.google.com/firewall/docs/quotas
---

# Quotas and limits (Cloud NGFW)

Cloud NGFW uses quotas (default values, adjustable) and system limits (fixed unless noted). Quotas generally apply per project; usage in one project doesn't affect another.

## Signature / Usage

### Check your quota

```bash
gcloud compute project-info describe --project PROJECT_ID
```

```bash
gcloud compute regions describe example-region
```

Replace `PROJECT_ID` with your project ID and `example-region` with the region to check.

Adapted (not in the official docs): the Compute Engine commands above show only the Compute Engine quotas (firewall rules and firewall policies); quotas defined by the Network Security API (`networksecurity.googleapis.com`) are listed with Cloud Quotas:

```bash
gcloud quotas info list --service=networksecurity.googleapis.com --project=PROJECT_ID
```

## Options / Props

### Quotas

| Scope | Quota | Description |
|---|---|---|
| Per project | VPC firewall rules | VPC firewall rules in a project, regardless of network |
| Per project | Global network firewall policies | Count per project regardless of associated networks |
| Per project | Regional network firewall policies | Count per region of a project |
| Per project | Global address groups per project | Global, project-scoped address groups |
| Per project | Regional address groups per project per region | Regional, project-scoped address groups per region |
| Per organization | Unassociated hierarchical firewall policies in an organization | Policies not associated with any folder or organization; no limit on associated ones |
| Per organization | Global address groups per organization | Global, organization-scoped groups |
| Per organization | Regional address groups per organization per region | Regional, organization-scoped groups per region |
| Per network | Regional network firewall policy associations per region per VPC network | Max regional policies associated with a region of a network |
| Per network | Firewall rule attributes per region per VPC network | Rule attributes from all associated regional policies in the region |
| Per network | Firewall rule FQDNs per region per VPC network | FQDNs from all associated regional policies in the region |
| Per policy | Rule attributes per hierarchical / global network / regional network firewall policy | Sum of rule attributes from all rules in the policy |
| Per policy | Domain names (FQDNs) per hierarchical / global network / regional network firewall policy | Sum of source FQDNs of ingress rules plus destination FQDNs of egress rules |

### Limits (cannot be increased unless noted)

| Scope | Item | Limit |
|---|---|---|
| Organization | Secure tag keys (parent organization) | 1,000 |
| Organization | Secure tag values by keys with `purpose` `GCE_FIREWALL` and `purpose-data` an organization | 16384 |
| Organization | URL filtering security profiles | 40 |
| Organization | Threat prevention security profiles | 40 |
| Organization | Security profile groups with threat prevention | 40 |
| Organization | Security profile groups with URL filtering | 40 |
| Organization | Advanced malware sandbox (`WILDFIRE_ANALYSIS`) security profiles | 40 |
| Organization | Firewall endpoints per zone | 50 |
| Project | Secure tag keys (parent project) | 1,000 |
| Project | URL filtering security profiles | 40 |
| Project | Threat prevention security profiles | 40 |
| Project | Security profile groups with threat prevention | 35 |
| Project | Security profile groups with URL filtering | 35 |
| Project | Firewall endpoints per zone | 50 |
| Network | Global network firewall policies per network | 1 |
| Network | Domain names (FQDNs) per network (all policy types combined) | 1,000 |
| Network | Secure tag values by keys with `purpose` `GCE_FIREWALL` and `purpose-data` a VPC network | 16383 |
| Network | Firewall endpoints per zone per network | 1 |
| Rule | Source secure tags per ingress firewall policy rule | 256 |
| Rule | Target secure tags per firewall policy rule | 256 |
| Rule | Source network tags per ingress VPC firewall rule | 30 |
| Rule | Target network tags per VPC firewall rule | 70 |
| Rule | Source service accounts per ingress VPC firewall rule | 10 |
| Rule | Target service accounts per firewall rule | 10 |
| Rule | Source IP address ranges per firewall rule | 5,000 |
| Rule | Destination IP address ranges per firewall rule | 5,000 |
| Rule | Source address groups per ingress firewall policy rule | 10 |
| Rule | Destination address groups per egress firewall policy rule | 10 |
| Rule | Domain names (FQDNs) per firewall policy rule | 100 |
| Address group | IP addresses per address group | 1,000 |
| Firewall endpoint | Associations per organization-level endpoint | 50 |
| Firewall endpoint | Associations per project-level endpoint | 50 |
| Firewall endpoint | Per-connection throughput with TLS / without TLS | 250 Mbps / 1.25 Gbps |
| Firewall endpoint | Total traffic with TLS / without TLS | 2 Gbps / 10 Gbps |
| Security profile | Advanced malware sandbox submission rules | 100 |
| Security profile | Advanced malware sandbox inline cloud analysis rules | 100 |
| Security profile | Domains per domain filtering profile | 500 |
| Security profile | Matcher strings per URL filtering profile | 2500 |
| Security profile | Threat overrides per threat prevention profile | 100 |
| Secure tag | Values per tag key | 1,000 |
| VM network interface | Secure tag values attached | 10 |

### Rule attribute count

| Attribute | Rule type | Count |
|---|---|---|
| IP protocol name | VPC firewall rules and firewall policy rules | 1 per protocol |
| Destination port | Both | 1 per port or port range |
| Source or destination IP ranges | Both | 1 per range |
| Source secure tags | Ingress firewall policy rules | 1 per tag |
| Source network tags | Ingress VPC firewall rules | 1 per tag |
| Source service accounts | Ingress VPC firewall rules | 1 per service account |
| Source or destination Google Threat Intelligence lists | Firewall policy rules | 1 per list |
| Source or destination country / region codes | Firewall policy rules | 1 per code |
| Source or destination FQDN objects | Firewall policy rules | 64 per FQDN object |
| Source or destination address groups | Firewall policy rules | Sum of capacities of each group |
| Source or destination network contexts | Firewall policy rules | 1 per context; for the VPC networks context, the number of source VPC networks specified |

### Required roles

| Task | Roles |
|---|---|
| Check quotas for a project | Project Owner (`roles/owner`), Editor (`roles/editor`) or Quota Viewer (`roles/servicemanagement.quotaViewer`) |
| Modify or request quota | Owner, Editor, Quota Administrator (`roles/servicemanagement.quotaAdmin`) or a custom role with `serviceusage.quotas.update` |

## Notes

- Quotas: To monitor, use the metric `serviceruntime.googleapis.com/quota/allocation/usage` on the `Consumer Quota` resource type with `service` / `quota_metric` label filters.
- Quotas: Organization-level quotas are changed by filing a Support case; others through a quota adjustment request.
- Rule attribute count: Only these attributes count, for firewall policy rules and VPC firewall rules.
- Rule attribute count: Examples: ingress allow from `10.100.0.1/32`, `tcp`, `5000-6000` = 3 (one source range, one protocol, one port range). Ingress deny from `10.0.0.0/8, 192.168.0.0/16` to `100.64.0.7/32` with `tcp` and `udp` on `53-53` and `5353-5353` = 11 (four protocol-port combinations at two attributes each, plus 2 source and 1 destination ranges). Egress deny with three combinations (`tcp:80-80`, `tcp:443-443`, `udp:4000-5000`), one source and two destination ranges = 9. Ingress allow with `VPC_NETWORKS` context and three networks, one source range, source FQDN `example.com`, `tcp` and `5000-6000` = 70 (3 + 1 + 64 + 1 + 1); target secure tags aren't counted.
- A `gcloud` command that exceeds a quota prints `quota exceeded` and exits with code `1`; an API request returns HTTP `413 Request Entity Too Large`.
- Quotas don't guarantee resource availability; zonal or regional resources can be depleted.
- Describe a firewall policy to read its rule attribute count. The source also shows Console steps for checking quotas.
- Clarified from the official docs: the source checks quotas only with `gcloud compute project-info describe` / `gcloud compute regions describe`, which describe Compute Engine project and region quotas (such as firewall rules and network firewall policies). Security profile, security profile group and firewall endpoint quotas defined by `networksecurity.googleapis.com` are not part of that output, so the page adds `gcloud quotas info list --service=networksecurity.googleapis.com` (gcloud 593.0.0 help: `--service` is "Name of the service in which the quota is defined"), adapted from https://docs.cloud.google.com/sdk/gcloud/reference/quotas/info/list.
- Source: https://docs.cloud.google.com/firewall/docs/quotas (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [about-firewalls.md](./about-firewalls.md)
- [tags-firewalls-overview.md](./tags-firewalls-overview.md)
- [address-groups-firewall-policies.md](./address-groups-firewall-policies.md)
- [about-firewall-endpoints.md](./about-firewall-endpoints.md)
