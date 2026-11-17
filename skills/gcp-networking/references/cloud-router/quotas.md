---
source: https://docs.cloud.google.com/network-connectivity/docs/router/quotas
---

# Quotas and limits (Cloud Router)

Cloud Router quotas have default values and can typically be adjusted; system limits are fixed. Quotas generally apply per Google Cloud project. When you exceed a quota the task fails: `gcloud` prints a `quota exceeded` error and exits with code `1`, and an API request returns HTTP `413 Request Entity Too Large`.

## Signature / Usage

### Check quotas

```bash
gcloud compute project-info describe --project PROJECT_ID
```

### Check used quota in a region

```bash
gcloud compute regions describe example-region
```

## Options / Props

### Quotas

The table covers important per-project quotas; the numeric values are on the Google Cloud console Quotas page (`https://console.cloud.google.com/iam-admin/quotas?service=compute.googleapis.com`).

| Item | Notes |
|---|---|
| Cloud Routers per project (`compute.googleapis.com/routers`) | Regardless of quota, each network is limited to five Cloud Routers per region. |
| Unique Cloud Router dynamic route prefixes from own region per region per VPC network (`cloud_router_prefixes_from_own_region_per_region_per_vpc_network`) | Maximum number of assured unique destination prefixes for learned routes applied to subnets in a region by all Cloud Routers in the same region (the "from-own-region" quota). IPv4 and IPv6 both count; BGP-received and custom learned routes both count; routes are grouped by unique destination (same destination with different or identical next hops counts once). |
| Unique Cloud Router dynamic route prefixes from other regions per region per VPC network (`cloud_router_prefixes_from_other_regions_per_region_per_vpc_network`) | Applies only to VPC networks in global dynamic routing mode. Maximum assured unique destinations for learned routes applied to subnets in a region by Cloud Routers from different regions (the "from-other-regions" quota). Counting as above. |

In global dynamic routing mode you can reach one of the two prefix quotas without reaching the other. If either is exceeded you may see intermittent connectivity issues when routes are dropped.

### Limits (cannot be increased unless stated)

| Item | Limit |
|---|---|
| Cloud Routers per combination of VPC network and region | 5 (needs sufficient project quota) |
| BGP peers per Cloud Router in a VPC network and region | 128 (Cloud VPN tunnel using dynamic routing, VLAN attachment for Dedicated / Partner / Cross-Cloud Interconnect, or Router appliance within Network Connectivity Center) |
| Prefixes accepted from a single BGP peer | 5,000; if a peer advertises more, Cloud Router resets the BGP session |
| Size of all policy resources of a Cloud Router | 35kB (35,000 bytes) |
| Terms of all applied BGP route policies within a single BGP peer or direction | 1,000 (combined, not split across resources) |
| Subnet route advertisements per BGP session | No restriction (determined by VPC network quotas and limits) |
| Custom advertised routes per BGP session | 200 (if identical for all sessions on a router, the total number of unique IPv4 and IPv6 custom advertised routes for the router) |
| Single match expression literal in a BGP route policy, across `destination` and `community` matches | 100 match elements (for example `destination.inAnyRange([prefix(...), prefix(..)]) && communities.matchesEvery(['0:0', '1:1'])` has four, `destination == ... \|\| destination == ...` has two) |
| Action elements in an action operation that accepts a list (`asPath.prependSequence`, `communities.add`, `communities.remove`, `communities.replaceAll`) | 10 |
| Named sets per Cloud Router | 500 (count toward the policy resource size limit) |
| Elements per named set | 1000 |
| `list-bgp-routes` queries per minute on a single Cloud Router | 1500 (from `compute.googleapis.com/list_requests_per_region`) |
| BGP route policies per Cloud Router | 500 |
| Custom learned routes per BGP session | 10 |
| Unique IP prefixes configurable as custom learned routes per region in a VPC network (same ranges may be reused on multiple peers) | 10 |

There is no limit on the size of a single match or action expression, the number of actions in a term, terms in a single policy, or number of policies (other than those above).

### Deterministic route dropping

Applied independently per region to the from-own-region list and the from-other-regions list: sort by subnet mask length (shortest first), then IPv4 before IPv6, then lexicographically (for example `10.0.0.0/8` before `10.2.1.0/24` before `10.99.1.0/24`); the first 250 entries are preserved and the rest discarded. With equal mask lengths IPv6 prefixes are discarded before IPv4. If learned prefixes stay constant, the same set of routes is programmed consistently, including across Cloud Router task restarts.

Worked example (global mode, `us-east1` / `us-west1` / `us-central1`): `us-west1` learns 251 unique destinations, so 250 are selected and one is dropped; a third region `us-central1` learning 10 destinations has 500 unique destinations from the other two regions, so 250 of the 500 are selected and 250 are dropped from its from-other-regions list, while its from-own-region quota still accepts its own 10.

To avoid dropping, monitor from-own-region and from-other-regions prefix usage with Cloud Monitoring or Cloud Logging and summarize routes (for example `10.10.0.0/24` to `10.10.3.0/24` as `10.10.0.0/22`). If summarization isn't possible, contact your Google Cloud Sales team.

### Required roles

| Task | Required role |
|---|---|
| Check quotas for a project | Owner (`roles/owner`), Editor (`roles/editor`) or Quota Viewer (`roles/servicemanagement.quotaViewer`) |
| Modify or request additional quota | Owner (`roles/owner`), Editor (`roles/editor`), Quota Administrator (`roles/servicemanagement.quotaAdmin`) or a custom role with the `serviceusage.quotas.update` permission |

## Notes

- During route dropping you lose connectivity for the dropped prefixes. A BGP peer exceeding 5,000 prefixes resets the session, which can also break connectivity.
- Quotas don't guarantee resource availability; a resource can still be unavailable in a region or zone.
- The page says the dropping process "preserves the first 250 entries" and its example uses 250 per region; the quota values themselves are on the console Quotas page and aren't listed in the table.
- To adjust most quotas use the console (https://docs.cloud.google.com/docs/quotas/help/request_increase). Console steps for checking quotas are omitted; see the source page.
- Source: https://docs.cloud.google.com/network-connectivity/docs/router/quotas (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [learned-routes.md](./learned-routes.md)
- [advertised-routes.md](./advertised-routes.md)
- [bgp-route-policy-reference.md](./bgp-route-policy-reference.md)
- [overview.md](./overview.md)
