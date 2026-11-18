---
source: https://docs.cloud.google.com/kms/docs/control-key-destruction
---

# Control key version destruction

Two organization policy constraints set key version destruction policy across an organization: `constraints/cloudkms.minimumDestroyScheduledDuration` sets a minimum length for the scheduled for destruction duration of new keys, and `constraints/cloudkms.disableBeforeDestroy` requires a key version to be disabled before it can be scheduled for destruction.

## Signature / Usage

Required resources: an organization (and optionally a folder or project). Required role: Organization policy administrator (`roles/orgpolicy.policyAdmin`) on the organization.

### Require a minimum scheduled for destruction duration

1. Get the policy applied directly to the organization (use `--folder` or `--project` for those resources).

```bash
gcloud org-policies describe \
  constraints/cloudkms.minimumDestroyScheduledDuration \
  --organization=ORGANIZATION_ID
```

Example output:

```yaml
name: organizations/ORGANIZATION_ID/policies/cloudkms.minimumDestroyScheduledDuration
spec:
  etag: COTP+KYGELiCmsoB
  inheritFromParent: true
  rules:
  - values:
      allowedValues:
      - in:7d
  updateTime: '2023-08-17T14:00:04.424051Z'
```

If no policy is set, `describe` returns `NOT_FOUND`.

2. Write `/tmp/policy.yaml` (`MINIMUM_DURATION` is one of `7d`, `15d`, `30d`, `60d`, `90d`, `120d`), then set it. `set-policy` overwrites any policy attached to the resource.

```yaml
name: organizations/ORGANIZATION_ID/policies/cloudkms.minimumDestroyScheduledDuration
spec:
  rules:
  - values:
      allowedValues:
      - in:MINIMUM_DURATION
```

```bash
gcloud org-policies set-policy /tmp/policy.yaml
```

3. View the effective policy (with inheritance).

```bash
gcloud org-policies describe \
  constraints/cloudkms.minimumDestroyScheduledDuration --effective \
  --organization=ORGANIZATION_ID
```

```yaml
name: organizations/ORGANIZATION_ID/policies/cloudkms.minimumDestroyScheduledDuration
spec:
  rules:
    - values:
        allowedValues:
        - 30d
        - 15d
        - 90d
        - 60d
        - 7d
        - 120d
```

### Require keys to be disabled before destruction

1. Get the current policy.

```bash
gcloud org-policies describe \
  constraints/cloudkms.disableBeforeDestroy \
  --organization=ORGANIZATION_ID
```

```yaml
name: organizations/ORGANIZATION_ID/policies/cloudkms.disableBeforeDestroy
spec:
  etag: CPvY+KYGENDwgxA=
  rules:
  - enforce: true
  updateTime: '2023-08-17T14:19:39.033618Z'
```

2. Write `/tmp/policy.yaml`, then set it (overwrites any existing policy on the resource).

```yaml
name: organizations/ORGANIZATION_ID/policies/cloudkms.disableBeforeDestroy
spec:
  rules:
  - enforce: true
```

```bash
gcloud org-policies set-policy /tmp/policy.yaml
```

3. View the effective policy.

```bash
gcloud org-policies describe \
  constraints/cloudkms.disableBeforeDestroy --effective \
  --organization=ORGANIZATION_ID
```

Adapted (not in the official docs): the source example output names the policy `cloudkms.minimumDestroyScheduledDuration`; it is corrected to `cloudkms.disableBeforeDestroy`.

```yaml
name: organizations/ORGANIZATION_ID/policies/cloudkms.disableBeforeDestroy
spec:
  rules:
  - enforce: true
```

## Options / Props

| Constraint | Display name | Effect |
|------------|--------------|--------|
| `constraints/cloudkms.minimumDestroyScheduledDuration` | Minimum destroy scheduled duration per key | Minimum scheduled for destruction duration for new keys; allowed values `7d`, `15d`, `30d`, `60d`, `90d`, `120d` |
| `constraints/cloudkms.disableBeforeDestroy` | Restrict key destruction to disabled keys | Key must be in the disabled state before it can be scheduled for destruction |

| Required permission (`roles/orgpolicy.policyAdmin`) |
|-----|
| `orgpolicy.constraints.list` |
| `orgpolicy.policies.create` |
| `orgpolicy.policies.delete` |
| `orgpolicy.policies.list` |
| `orgpolicy.policies.update` |
| `orgpolicy.policy.get` |
| `orgpolicy.policy.set` |

## Notes

- Corrected from the official docs: the effective-policy example output for `cloudkms.disableBeforeDestroy` originally showed `name: organizations/ORGANIZATION_ID/policies/cloudkms.minimumDestroyScheduledDuration`.
- When different values are set for the minimum duration at different hierarchy levels, the lowest value is applied. To use different values per folder or project, set the highest value at the organization level and override with a lower value only for less sensitive folders or projects.
- The minimum-duration constraint applies to new keys and, as a minimum, cannot ensure keys are created with low durations. Use higher values where unwanted destruction is more harmful (production data under retention requirements) and lower values for development or testing or for timely crypto-shredding.
- Multi-step destruction: combine `disableBeforeDestroy` with IAM so that no user has both `cloudkms.cryptoKeyVersions.update` and `cloudkms.cryptoKeyVersions.destroy`; this requires custom roles.
- `set-policy` overwrites the policy attached to the resource. Organization-wide policy changes affect all inheriting children and are disruptive for existing key-destruction workflows; try on a test folder or project first.
- Source: https://docs.cloud.google.com/kms/docs/control-key-destruction (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [destroy-restore.md](./destroy-restore.md)
- Key states: https://docs.cloud.google.com/kms/docs/key-states
- Organization policy is covered by the `gcp-foundation` skill.
