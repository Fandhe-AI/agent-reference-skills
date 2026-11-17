---
source: https://docs.cloud.google.com/network-security-integration/docs/quotas
---

# Quotas and limits (Network Security Integration)

Quotas have default values and can typically be adjusted; system limits are fixed. Quotas generally apply per project. Monitor usage with the metric `serviceruntime.googleapis.com/quota/allocation/usage` on the `Consumer Quota` resource type (filter labels `service`, `quota_metric`).

## Signature / Usage

### Check quotas

```bash
gcloud compute project-info describe --project PROJECT_ID
```

Adapted (not in the official docs): the Compute Engine commands above show only the Compute Engine quotas (firewall rules and firewall policies); quotas defined by the Network Security API (`networksecurity.googleapis.com`) are listed with Cloud Quotas:

```bash
gcloud quotas info list --service=networksecurity.googleapis.com --project=PROJECT_ID
```

## Options / Props

### Quotas per project

| Quota | Default | Description |
|-------|---------|-------------|
| Global network firewall policies | — (not stated in the source) | Number per project regardless of associated VPC networks. Shared between Cloud NGFW and Network Security Integration. |
| Mirroring deployments per zone per project | 5 | |
| Intercept deployments per zone per project | 5 | |
| Mirroring deployment groups per project | 20 | |
| Intercept deployment groups per project | 20 | |
| Mirroring endpoint groups per project | 5 | Endpoint groups of type `broker` |
| Custom mirroring security profiles per project | 40 | |
| Custom intercept security profiles per project | 40 | |
| Security profile groups with custom mirroring per project | 40 | |
| Security profile groups with custom intercept per project | 40 | |

### Quotas per organization and per firewall policy

| Scope | Quota | Description |
|-------|-------|-------------|
| Organization | Unassociated hierarchical firewall policies | Policies not associated with any folder or organization resource; no limit on associated ones. Shared between Cloud NGFW and NSI. Change by filing a support case. |
| Hierarchical firewall policy | Rule attributes per policy | Sum of rule attributes of all rules; shared by firewall policy rules and mirroring rules. |
| Global network firewall policy | Rule attributes per policy | Same, shared by firewall policy rules and mirroring rules. |

Example: an ingress allow rule (one source range, one protocol, one port range) plus an ingress mirroring rule (one destination range, one protocol, one port range) count as 6 rule attributes.

### Quotas per deployment group / endpoint group

| Quota | Default |
|-------|---------|
| Mirroring endpoint groups per mirroring deployment group | 10 |
| Intercept endpoint groups per intercept deployment group | 10 |
| Mirroring deployment groups per mirroring endpoint group (`broker`) | 5 |
| Security profile groups per mirroring endpoint group | 40 |
| Security profile groups per intercept endpoint group | 40 |
| Intercept endpoint group associations per endpoint group | 30 |

### Limits (cannot be increased unless noted)

| Scope | Item | Limit |
|-------|------|-------|
| Organization | Custom mirroring security profiles | 40 |
| Organization | Custom intercept security profiles | 40 |
| Organization | Security profile groups with custom mirroring | 40 |
| Organization | Security profile groups with custom intercept | 40 |
| Network | Global network firewall policies per VPC network | 1 |
| Rule | Source IP address ranges per firewall rule (VPC firewall rule, firewall policy rule or mirroring rule; IPv4 only or IPv6 only) | 5,000 |
| Rule | Destination IP address ranges per firewall rule (same) | 5,000 |
| Deployment group | Mirroring deployment and endpoint group association pairs per mirroring deployment group | 1,000 |
| Deployment group | Intercept deployment and intercept endpoint group association pairs per intercept deployment group | 1,000 |
| Endpoint group | Mirroring endpoints per `broker` mirroring endpoint group per zone | 1 |

### Roles to manage quotas

| Task | Required role |
|------|---------------|
| Check quotas | Project Owner (`roles/owner`), Editor (`roles/editor`) or Quota Viewer (`roles/servicemanagement.quotaViewer`) |
| Modify / request quota | Owner, Editor, Quota Administrator (`roles/servicemanagement.quotaAdmin`), or a custom role with `serviceusage.quotas.update` |

## Notes

- Exceeding a quota with `gcloud` prints a `quota exceeded` error and exits with code `1`; an API request returns `413 Request Entity Too Large`.
- Quotas don't guarantee resource availability.
- The source also shows the Console steps for checking quota.
- Clarified from the official docs: the source checks quotas only with `gcloud compute project-info describe` / `gcloud compute regions describe`, which describe Compute Engine project and region quotas (such as firewall rules and network firewall policies). Mirroring and intercept deployment, endpoint group and security profile quotas defined by `networksecurity.googleapis.com` are not part of that output, so the page adds `gcloud quotas info list --service=networksecurity.googleapis.com` (gcloud 593.0.0 help: `--service` is "Name of the service in which the quota is defined"), adapted from https://docs.cloud.google.com/sdk/gcloud/reference/quotas/info/list.
- Source: https://docs.cloud.google.com/network-security-integration/docs/quotas (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [nsi-overview.md](./nsi-overview.md)
- [security-profiles-overview.md](./security-profiles-overview.md)
- [ids-quotas.md](./ids-quotas.md)
