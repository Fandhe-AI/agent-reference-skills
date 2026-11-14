---
source: https://docs.cloud.google.com/resource-manager/docs/organization-policy/dry-run-policy
---

# Organization Policy: Restrict Service Usage with a Dry Run

Preview an organization policy in dry-run mode, read the audit logs, then enforce it with `gcloud org-policies`.

## Signature / Usage

Requires `roles/orgpolicy.policyAdmin` on the organization and billing enabled on the project.

### Inspect the current policy

```bash
gcloud org-policies describe gcp.restrictServiceUsage \
  --project=PROJECT_ID
```

```yaml
  name: projects/123456789012/policies/gcp.restrictServiceUsage
  spec:
    etag: CJy93KEGEKCJw/QB
    rules:
    - values:
        allowedValues:
        - compute.googleapis.com
  updateTime: '2023-04-12T21:11:56.512804Z'
```

### Write a dry-run version

Copy it to a file, remove `etag` and `updateTime`, rename `spec` to `dryRunSpec`, then edit:

```yaml
  name: projects/123456789012/policies/gcp.restrictServiceUsage
  dryRunSpec:
    rules:
    - values:
        allowedValues:
        - compute.googleapis.com
        - appengine.googleapis.com
```

```bash
gcloud org-policies set-policy POLICY_PATH \
  --update-mask=dryRunSpec
```

### Find would-be denials in the audit log

```text
protoPayload.metadata.dryRunResult = "DENIED" AND \
protoPayload.metadata.liveResult = "ALLOWED"
```

### Enforce after reviewing

```bash
gcloud org-policies set-policy POLICY_PATH \
  --update-mask=spec
```

Hierarchy-wide denylist of services:

```yaml
name: organizations/ORGANIZATION_ID/policies/gcp.restrictServiceUsage
spec:
  rules:
  - values:
      deniedValues:
      - file.googleapis.com
      - bigquery.googleapis.com
      - storage.googleapis.com
```

### Restore the default or delete

```bash
gcloud org-policies reset CONSTRAINT_NAME \
    --project=PROJECT_ID
```

```bash
gcloud org-policies delete CONSTRAINT_NAME \
  --RESOURCE_TYPE=RESOURCE_ID
```

## Options / Props

| `--update-mask` | Effect |
|---|---|
| `spec` | Live policy only |
| `dryRunSpec` | Dry-run policy only |
| `*` | Both |

| Live | Dry-run | Audit log generated |
|---|---|---|
| Allow | Allow | No |
| Allow | Deny | Dry-run log only |
| Deny | Allow | Live and dry-run log |
| Deny | Deny | Live and dry-run log |

## Notes

- Omitting `--update-mask` on an existing policy is an error; `set-policy` overwrites whatever is attached, so run `describe` first.
- Only some constraints support dry run (`gcp.restrictServiceUsage`, custom and managed constraints, some Assured Workloads constraints).
- Changes can take up to 15 minutes to be fully enforced; most enforcement is not retroactive.
- Denials of `gcp.restrictServiceUsage` are logged under billable Policy Denied audit logs. Roll out gradually (for example by tag) and try it in a disposable project first.
- Source: https://docs.cloud.google.com/resource-manager/docs/organization-policy/dry-run-policy (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/resource-manager/docs/organization-policy/using-constraints (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/resource-manager/docs/organization-policy/restricting-resources (retrieved 2026-11-14)

## Related

- [dry-run-policy.md](../references/resource-hierarchy/organization-policy/dry-run-policy.md)
- [using-constraints.md](../references/resource-hierarchy/organization-policy/using-constraints.md)
- [resource-service-usage.md](../references/resource-hierarchy/organization-policy/resource-service-usage.md)
