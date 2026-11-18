---
source: https://docs.cloud.google.com/vpc-service-controls/quotas
---

# Quotas and limits

Quotas and system limits for VPC Service Controls. They are subject to change. Quota enforcement for VPC Service Controls and Access Context Manager is integrated with Cloud Quotas. Utilization is the sum across enforced and dry-run modes (for example 5 resources enforced plus 7 in dry run count as 12), and every individual entry counts once with no deduplication (a project in one regular perimeter and five bridge perimeters counts as six). Service perimeter limits are calculated differently, as described below.

## Signature / Usage

View quotas in the Google Cloud console on the **VPC Service Controls** page (select the access policy, click **View Quota**) or in **IAM & Admin** > **Quotas & System Limits** (select the organization, filter by service name `accesscontextmanager.googleapis.com`). You can also query quota metrics with the Cloud Quotas API.

Create a scoped access policy (example from the gcloud help); scoped policies count against the folder and project-scoped access policy limit below:

```bash
gcloud access-context-manager policies create \
    --organization=organizations/123 --scopes=folders/345 \
    --title="My Folder Policy"
```

### Requesting an increase

Most limits are fixed platform constraints. Only the **Protected resources** quota per access policy can be increased:

1. Check usage in the console and confirm the access policy is close to the 40,000 resource limit.
2. Create a case with Google Cloud Support. Requesting through the **Quotas & System Limits** page does not open a case automatically.
3. Provide a clear business justification (for example projected resource growth, specific architecture requirements); a detailed justification is required.

Requests generally take 2 to 3 weeks and need manual review and approval by Google Cloud Support and engineering teams.

## Options / Props

### Service perimeter limits (per perimeter, separately for dry-run and enforced configurations)

| Type | Limit | Notes |
|------|-------|-------|
| Attributes | 6,000 | Total attributes in the ingress and egress rules: references to projects, VPC networks, access levels, method selectors, identities, and roles, plus wildcard `*` in methods, services, and project attributes. |
| Private Service Connect endpoints | 500 | Total endpoints specified across all ingress and egress rules in a single perimeter. |

### Fields counted as attributes

| Rule block | Fields |
|------------|--------|
| `ingressFrom` | `sources`, `identities` |
| `ingressTo` | `resources`, `methodSelectors`, `roles` |
| `egressFrom` | `sources`, `identities` |
| `egressTo` | `resources`, `methodSelectors`, `externalResources`, `roles` |

### Access policy limits (cumulative across all perimeters in an access policy)

| Type | Limit | Notes |
|------|-------|-------|
| Service perimeters | 10,000 | Service perimeter bridges count towards this limit. |
| Protected resources | 40,000 | Projects only referenced in ingress and egress policies do not count. Add protected resources in batches of 10,000 or fewer to prevent timeouts, and wait 30 seconds before the next policy modification. |
| Identity groups | 1,000 | Count of identity groups configured in ingress and egress rules. |
| Agent identities | 1,000 | Count of agent identities configured in ingress and egress rules. |
| Deleted identities (Preview) | 500 | Deleted identities configured in the access policy. |
| Workload Identity Federation for GKE (Preview) | 1,000 | Maximum principals across ingress and egress rules. |
| VPC networks | 500 | VPC networks referenced in enforced mode, dry-run mode, and ingress rules. |
| Total character length of all rule titles | 240,000 | Combined length of all ingress and egress rule titles, whitespace included. Rules without a title do not count. |

### Access level limits (cumulative across all access levels in an access policy)

| Type | Limit |
|------|-------|
| VPC networks (referenced in access levels) | 500 |

### Organization limits (across all access policies in an organization)

| Type | Limit |
|------|-------|
| Organization-level access policy | 1 |
| Folder and project-scoped access policies | 50 |

## Notes

- Source: https://docs.cloud.google.com/vpc-service-controls/quotas (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/access-context-manager/policies/create (gcloud 593.0.0 help).
- Attribute counting: each entry in the listed fields counts. Two identities in `egressFrom.identities` count as two. A project mentioned in two rules counts as two. The enforced and dry-run configurations are counted separately (3,500 enforced and 3,000 dry-run attributes are within the limit).
- The scoped-policy console quota page shows usage for service perimeters, protected resources, access levels, and total ingress and egress attributes.
- Access Context Manager has its own quotas and limits, which also apply because VPC Service Controls uses the Access Context Manager APIs.
- Console steps for viewing quotas are summarized above; see the source page for the full steps.

## Related

- [ingress-egress-rules.md](./ingress-egress-rules.md)
- [supported-identities.md](./supported-identities.md)
- [service-perimeters.md](./service-perimeters.md)
