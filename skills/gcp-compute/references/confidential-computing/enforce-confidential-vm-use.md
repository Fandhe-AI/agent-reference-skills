---
source: https://docs.cloud.google.com/confidential-computing/confidential-vm/docs/enforce-confidential-vm-use
---

# Enforce Confidential VM use

Use the organization policy constraint `constraints/compute.restrictNonConfidentialComputing` so that all VM instances created in your organization (or project) are Confidential VM instances.

## Signature / Usage

### Enable the constraint

```bash
gcloud resource-manager org-policies deny \
    constraints/compute.restrictNonConfidentialComputing compute.googleapis.com \
    --organization=ORGANIZATION_ID
```

To apply at the project level, use `--project=PROJECT_ID` instead of `--organization=ORGANIZATION_ID`.

Find the organization ID:

```bash
gcloud organizations describe ORGANIZATION_NAME --format="value(name.segment(1))"
```

### Disable the constraint

```bash
gcloud resource-manager org-policies delete \
    constraints/compute.restrictNonConfidentialComputing \
    --organization=ORGANIZATION_ID
```

## Options / Props

| Item | Value |
|------|-------|
| Required role | Organization Policy Administrator (`roles/orgpolicy.policyAdmin`) on the organization |
| Permissions | `orgpolicy.constraints.list`, `orgpolicy.policies.create`, `orgpolicy.policies.delete`, `orgpolicy.policies.list`, `orgpolicy.policies.update`, `orgpolicy.policy.get`, `orgpolicy.policy.set` |
| Constraint | `constraints/compute.restrictNonConfidentialComputing` (console name: Restrict Non-Confidential Computing) |
| Console policy | Policy type Deny, custom value `compute.googleapis.com`; enforcement Merge with parent or Replace |

## Notes

- Source: https://docs.cloud.google.com/confidential-computing/confidential-vm/docs/enforce-confidential-vm-use (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- The `org-policies delete` command removes the constraint policy and so allows non-confidential VMs again; it affects the whole organization. Try it on a disposable project (with `--project=PROJECT_ID`) first.
- Policies can take a moment to propagate. To verify, open Create instance in the console and check the Confidential VM service section.
- Alternatively set policies with a policy file via `gcloud resource-manager org-policies set-policy`. The source also shows the Console steps.
- Organization policy in general is in `gcp-foundation`.

## Related

- [create-a-confidential-vm-instance.md](./create-a-confidential-vm-instance.md)
- [confidential-vm-overview.md](./confidential-vm-overview.md)
