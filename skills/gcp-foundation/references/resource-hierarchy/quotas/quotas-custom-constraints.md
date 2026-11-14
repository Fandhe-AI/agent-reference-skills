---
source: https://docs.cloud.google.com/docs/quotas/custom-constraints
---

# Custom Organization Policy Constraints for Cloud Quotas

Use Organization Policy custom constraints (Preview) on `cloudquotas.googleapis.com/QuotaPreference` to block or bound quota changes.

## Signature / Usage

Constraint that denies quota changes for one quota ID (`quota-constraint.yaml`):

```yaml
name: organizations/ORGANIZATION_ID/customConstraints/custom.restrictCPUsPerProjectRegion
resourceTypes:
  - cloudquotas.googleapis.com/QuotaPreference
methodTypes:
  - CREATE
  - UPDATE
condition: "resource.service == 'compute.googleapis.com' && resource.quotaId == 'CPUS-per-project-region'"
actionType: DENY
displayName: Restrict quota update for compute CPUS-per-project-region
description: Deny quota change for the 'CPUS-per-project-region' quota ID of 'compute.googleapis.com' service.
```

```bash
gcloud org-policies set-custom-constraint quota-constraint.yaml
```

```bash
gcloud org-policies list-custom-constraints --organization=ORGANIZATION_ID
```

```text
CUSTOM_CONSTRAINT                    ACTION_TYPE  METHOD_TYPES   RESOURCE_TYPES                              DISPLAY_NAME
custom.restrictCPUsPerProjectRegion  DENY         CREATE,UPDATE  cloudquotas.googleapis.com/QuotaPreference  Restrict quota update for compute CPUS-per-project-region
```

Policy (`quota-policy.yaml`) and apply:

```yaml
name: projects/PROJECT_ID/policies/custom.restrictCPUsPerProjectRegion
spec:
  rules:
  - enforce: true
```

```bash
gcloud org-policies set-policy quota-policy.yaml
```

```bash
gcloud org-policies list --project=PROJECT_ID
```

```text
CONSTRAINT                           LIST_POLICY  BOOLEAN_POLICY  ETAG
custom.restrictCPUsPerProjectRegion  -            SET             CNXIq78GEODKiK4D-
```

Test (denied after about two minutes):

```bash
gcloud quotas preferences create \
    --service=compute.googleapis.com \
    --quota-id=CPUS-per-project-region \
    --preferred-value=30 \
    --project=PROJECT_ID
```

```text
Operation denied by org policy on resource 'projects/PROJECT_ID/locations/global': ["customConstraints/custom.restrictCPUsPerProjectRegion": "Deny quota change for the 'CPUS-per-project-region' quota ID of 'compute.googleapis.com' service."]
```

Clean up the example:

```bash
gcloud org-policies delete custom.restrictCPUsPerProjectRegion --project=PROJECT_ID
```

```bash
gcloud org-policies delete-custom-constraint custom.restrictCPUsPerProjectRegion \
  --organization=ORGANIZATION_ID
```

Cap the quota value instead of denying (ALLOW only when the condition holds):

```yaml
name: organizations/ORGANIZATION_ID/customConstraints/custom.restrictCPUsPerProjectRegionQuotaLimit
resourceTypes:
- cloudquotas.googleapis.com/QuotaPreference
methodTypes:
- CREATE
- UPDATE
condition: |-
  resource.service == 'compute.googleapis.com' &&
  resource.quotaId == 'CPUS-per-project-region' &&
  resource.quotaConfig.preferredValue <= 25
actionType: ALLOW
displayName: Restrict quota update for compute CPUS-per-project-region
description: Restrict quota change for the 'CPUS-per-project-region' quota ID of 'compute.googleapis.com' service.
```

## Options / Props

Fields usable in conditions for `cloudquotas.googleapis.com/QuotaPreference`:

| Field |
|-------|
| `resource.dimensions` |
| `resource.name` |
| `resource.quotaConfig.preferredValue` |
| `resource.quotaId` |
| `resource.service` |

Condition length up to 1,500 characters for this service.

## Notes

- Preview feature. Requires Organization Policy Administrator (`roles/orgpolicy.policyAdmin`) on the organization. Most resource types support up to 20 custom constraints; see `../organization-policy/custom-constraints.md` for the general constraint format.
- Enforcement only covers operations that create or update `QuotaPreference` resources. Quota changes made through the Service Usage API or the Google Cloud console do not create `QuotaPreference` resources and are not blocked; to restrict those use an IAM deny policy on `serviceusage.quota.update`.
- Source: https://docs.cloud.google.com/docs/quotas/custom-constraints
- Retrieved 2026-11-14. Content is CC BY 4.0; code examples are Apache 2.0.

## Related

- [../organization-policy/custom-constraints.md](../organization-policy/custom-constraints.md)
- [view-manage-quotas.md](./view-manage-quotas.md)
