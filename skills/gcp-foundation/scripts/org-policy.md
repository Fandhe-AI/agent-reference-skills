---
source: https://docs.cloud.google.com/sdk/gcloud/reference/org-policies
---

# Organization Policy

Copy-paste gcloud commands for viewing, setting, dry-running and deleting organization policies and custom constraints.

## Signature / Usage

### View a policy

Get the policy applied directly to a resource (use `--folder=` or `--project=` instead of `--organization=` as needed):

```bash
gcloud org-policies describe \
  CONSTRAINT_NAME --organization=ORGANIZATION_ID
```

View the effective policy, with inheritance included:

```bash
gcloud org-policies describe \
  CONSTRAINT_NAME --effective \
  --organization=ORGANIZATION_ID
```

Check the security baseline policies of an organization:

```bash
gcloud resource-manager org-policies list --organization=ORGANIZATION_ID
```

### Set a policy from a YAML file

Create `/tmp/policy.yaml`:

```yaml
name: organizations/ORGANIZATION_ID/policies/CONSTRAINT_NAME
spec:
  rules:
  - values:
      deniedValues:
      - VALUE_A
```

```bash
gcloud org-policies set-policy /tmp/policy.yaml
```

`set-policy` overwrites any policy attached to the resource.

### Enforce a boolean constraint

```yaml
name: organizations/ORGANIZATION_ID/policies/CONSTRAINT_NAME
spec:
  rules:
  - enforce: true
```

```bash
gcloud org-policies set-policy /tmp/policy.yaml
```

### Dry run, simulate, then enforce

Set only the dry-run part first:

```bash
gcloud org-policies set-policy POLICY_PATH \
  --update-mask=dryRunSpec
```

Simulate the change:

```bash
gcloud policy-intelligence simulate orgpolicy \
  --organization=ORGANIZATION_ID \
  --policies=POLICY_PATH
```

Then apply the live part:

```bash
gcloud org-policies set-policy POLICY_PATH \
  --update-mask=spec
```

### Create a dry-run policy from a live policy

```bash
gcloud org-policies describe gcp.restrictServiceUsage \
  --project=PROJECT_ID
```

Copy the output to a file, remove `etag` and `updateTime`, rename `spec` to `dryRunSpec`, edit it, and apply:

```bash
gcloud org-policies set-policy POLICY_PATH \
  --update-mask=dryRunSpec
```

### Custom constraints

```bash
gcloud org-policies set-custom-constraint CONSTRAINT_PATH
```

```bash
gcloud org-policies list-custom-constraints --organization=ORGANIZATION_ID
```

```bash
gcloud org-policies describe-custom-constraint CONSTRAINT_NAME \
  --organization=ORGANIZATION_ID \
  --format=FORMAT > PATH
```

Edit the exported file and re-run `set-custom-constraint` to update (it overwrites; there is no versioning).

### Reset a policy to the constraint default

```bash
gcloud org-policies reset CONSTRAINT_NAME \
    --project=PROJECT_ID
```

### Delete a policy

```bash
gcloud org-policies delete \
  CONSTRAINT_NAME \
  --organization=ORGANIZATION_ID
```

```bash
gcloud org-policies delete CONSTRAINT_NAME \
  --RESOURCE_TYPE=RESOURCE_ID
```

`RESOURCE_TYPE` is `organizations`, `folders`, or `projects`; this deletes both the live and the dry-run policy.

### Delete a custom constraint

```bash
gcloud org-policies delete-custom-constraint custom.CONSTRAINT_NAME \
  --organization=ORGANIZATION_ID
```

## Options / Props

| Flag | Command | Meaning |
| --- | --- | --- |
| `--organization` / `--folder` / `--project` | `describe`, `delete`, `reset`, `list-custom-constraints` | Resource the policy is attached to |
| `--effective` | `describe` | Show the effective policy including inheritance |
| `--update-mask` | `set-policy` | `spec` (live only), `dryRunSpec` (dry-run only), or `*` (both) |
| `--policies` | `policy-intelligence simulate orgpolicy` | Policy file to simulate |
| `--format` | `describe-custom-constraint` | Output format, redirected to a file for editing |

## Notes

- Warning: use a disposable organization, folder or project when trying `delete`, `reset`, `delete-custom-constraint` and `set-policy`; always pass the exact resource flag and never omit the target.
- Omitting `--update-mask` on an existing policy that has a dry-run part is an error; pass it explicitly.
- A resource without a policy inherits its parent policy; deleting the policy at the organization falls back to the constraint default.
- `gcloud org-policies describe` returns `NOT_FOUND` when no policy is set on that resource.
- Source: https://docs.cloud.google.com/resource-manager/docs/organization-policy/using-constraints (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/resource-manager/docs/organization-policy/dry-run-policy (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/resource-manager/docs/organization-policy/creating-managing-custom-constraints (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/resource-manager/docs/creating-managing-organization (retrieved 2026-11-14)

## Related

- [using-constraints.md](../references/resource-hierarchy/organization-policy/using-constraints.md)
- [dry-run-policy.md](../references/resource-hierarchy/organization-policy/dry-run-policy.md)
- [custom-constraints.md](../references/resource-hierarchy/organization-policy/custom-constraints.md)
- [constraints-reference.md](../references/resource-hierarchy/organization-policy/constraints-reference.md)
- [organization-resource.md](../references/resource-hierarchy/organization-admin/organization-resource.md)
