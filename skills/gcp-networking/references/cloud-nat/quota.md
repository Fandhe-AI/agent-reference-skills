---
source: https://docs.cloud.google.com/nat/quota
---

# Quotas and limits (Cloud NAT)

Cloud NAT quotas (adjustable, mostly via Cloud Router quotas) and fixed system limits. Quotas and limits apply per project, network, region or other resource; NAT IP addresses cannot be shared between gateways.

## Signature / Usage

### Check quota

```bash
gcloud compute project-info describe --project PROJECT_ID
```

```bash
gcloud compute regions describe example-region
```

## Options / Props

### Limits

| Item | Limit | Notes |
|---|---|---|
| NAT gateways | 50 per Cloud Router | Up to 5 Cloud Routers per region per network, so up to 250 gateways per region per VPC network |
| NAT IP addresses per gateway | 300 manual; 2,500 auto-allocated | Also bounded by VPC per-project static and in-use IP quotas |
| Subnet ranges | 50 per gateway | Applies to a custom subnet range list; a subnet can have a primary and secondary ranges; does not apply when NAT covers all subnets |
| NAT rules | 150 per gateway; 2,500 per Cloud Router | API returns an error when exceeded |
| Active IP addresses per NAT rule | 300 | |
| Private NAT subnets | 50 per gateway | Subnets with purpose `PRIVATE_NAT` |
| Characters in CEL expressions per rule | 2,048 | |
| Characters in CEL expressions per Cloud Router | 500,000 | |

### Maximum NAT connections per VM (aggregate across protocols and NICs)

| vCPUs | Maximum NAT connections per VM |
|---|---|
| 7 or fewer | 65,535 |
| 8 to 15 | 65,535 or 98,302 (98,302 only if all connections are NAT44) |
| 16 or more | 65,535 or 131,070 (131,070 only if all connections are NAT44) |

### Roles

| Task | Required role |
|---|---|
| Check quotas | `roles/owner`, `roles/editor`, or `roles/servicemanagement.quotaViewer` |
| Modify / request quota | `roles/owner`, `roles/editor`, `roles/servicemanagement.quotaAdmin`, or a custom role with `serviceusage.quotas.update` |

## Notes

- Quotas for Cloud NAT are listed on the Cloud Router quotas page: https://docs.cloud.google.com/network-connectivity/docs/router/quotas.
- Exceeding a quota with gcloud prints `quota exceeded` and exits with code `1`; an API request returns `413 Request Entity Too Large`.
- Quotas do not guarantee resource availability (for example a region can run out of external IPs).
- Cloud NAT is not available for legacy networks and has no application-level gateway (ALG) support (FTP, SIP payload addresses are not rewritten).
- Servers needing UDP port randomization among 64,000 ports (e.g. legacy DNS servers) should use an external IP address instead of Cloud NAT.
- NAT mappings are checked every 30 seconds for expiration and configuration change; a 5-second idle timeout may take up to 30 seconds (15 on average) to take effect. Connection tracking entries persist about as long as the NAT timeout.
- The Console path is omitted. Quota requests: https://docs.cloud.google.com/docs/quotas/help/request_increase.
- Source: https://docs.cloud.google.com/nat/quota (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [ports-and-addresses.md](./ports-and-addresses.md)
- [nat-rules-overview.md](./nat-rules-overview.md)
- [overview.md](./overview.md)
