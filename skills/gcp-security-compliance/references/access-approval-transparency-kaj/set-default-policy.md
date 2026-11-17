---
source: https://docs.cloud.google.com/assured-workloads/key-access-justifications/docs/set-default-policy
---

# Set default Key Access Justifications policy

Set a default Key Access Justifications policy on an organization, folder, or project. It is applied automatically to new Cloud KMS keys created in that resource unless a KAJ policy is set on the key at creation; it is not applied to existing keys. Only for Cloud KMS keys in folders enrolled in the Japan Regions control package in Assured Workloads.

## Signature / Usage

### Set the default policy (gcloud, beta)

On an organization:

Adapted (not in the official docs): `\` line continuations added (the source's lines would run as separate commands) and the source's example reasons `CUSTOMER_INITIATED_ACCESS,GOOGLE_INITIATED_SYSTEM_OPERATION` written as the lower-case choices listed in the gcloud 593.0.0 help.

```bash
gcloud beta kms kaj-config update \
    --organization=ORGANIZATION_NUMBER \
    --allowed-access-reasons="customer-initiated-access,google-initiated-system-operation"
```

On a folder:

Adapted (not in the official docs): `\` line continuations added and the example reasons written as the lower-case choices listed in the gcloud 593.0.0 help (same fix as above).

```bash
gcloud beta kms kaj-config update \
    --folder=FOLDER_ID \
    --allowed-access-reasons="customer-initiated-access,google-initiated-system-operation"
```

On a project:

Adapted (not in the official docs): `\` line continuations added and the example reasons written as the lower-case choices listed in the gcloud 593.0.0 help (same fix as above).

```bash
gcloud beta kms kaj-config update \
    --project=PROJECT_ID \
    --allowed-access-reasons="customer-initiated-access,google-initiated-system-operation"
```

### Set the default policy (REST, project)

The organization and folder forms use `organizations/ORGANIZATION_ID` and `folders/FOLDER_ID` in both the URL and `name`.

Adapted (not in the official docs): the source's `POLICY` placeholder is replaced by the source's own example object so the `--data` JSON is valid.

```bash
curl "https://cloudkms.googleapis.com/v1/projects/PROJECT_ID/kajPolicyConfig?updateMask=defaultKeyAccessJustificationPolicy" \
  --request "PATCH" \
  --header "authorization: Bearer TOKEN" \
  --header "content-type: application/json" \
  --data '{"name": "projects/PROJECT_ID/kajPolicyConfig", "defaultKeyAccessJustificationPolicy": {"allowedAccessReasons": ["CUSTOMER_INITIATED_ACCESS", "GOOGLE_INITIATED_SYSTEM_OPERATION"]}}'
```

### View the default policy

```bash
gcloud beta kms kaj-config describe --organization=ORGANIZATION_NUMBER
```

```bash
gcloud beta kms kaj-config describe --folder=FOLDER_ID
```

```bash
gcloud beta kms kaj-config describe --project=PROJECT_ID
```

Output example:

```yaml
defaultKeyAccessJustificationPolicy:
  defaultPolicyAvailable: true
  allowedAccessReasons:
  - CUSTOMER_INITIATED_ACCESS
  - GOOGLE_INITIATED_SYSTEM_OPERATION
name: projects/PROJECT_ID/kajPolicyConfig
```

Adapted (not in the official docs): the source's REST GET calls carry no credentials; the `authorization` header is added.

```bash
curl "https://cloudkms.googleapis.com/v1/projects/PROJECT_ID/kajPolicyConfig" \
  --header "authorization: Bearer TOKEN"
```

### View the effective default policy on a project

```bash
gcloud beta kms kaj-config show-effective-config --project=PROJECT_ID
```

```yaml
effectiveKajPolicy:
  defaultKeyAccessJustificationPolicy:
    defaultPolicyAvailable: true
    allowedAccessReasons:
    - CUSTOMER_INITIATED_ACCESS
    - GOOGLE_INITIATED_SYSTEM_OPERATION
  name: folders/FOLDER_ID/kajPolicyConfig
```

Adapted (not in the official docs): the credentials header is added to the source's call.

```bash
curl "https://cloudkms.googleapis.com/v1/projects/PROJECT_ID:showEffectiveKeyAccessJustificationsPolicyConfig" \
  --header "authorization: Bearer TOKEN"
```

## Options / Props

### Required role and permissions

| Item | Value |
|---|---|
| Role | Key Access Justifications Policy Config Admin (`roles/cloudkms.keyAccessJustificationsPolicyConfigAdmin`) on the organization, folder, or project that contains the key |
| Permissions | `cloudkms.keyAccessJustificationsConfig.getKeyAccessJustificationsPolicyConfig`, `cloudkms.keyAccessJustificationsConfig.updateKeyAccessJustificationsPolicyConfig`, `cloudkms.keyAccessJustificationsConfig.showEffectiveKeyAccessJustificationsPolicyConfig` |

### REST methods

| Scope | Set | Get |
|---|---|---|
| Organization | `organizations.updateKajPolicyConfig` (PATCH) | `organizations.getKajPolicyConfig` |
| Folder | `folders.updateKajPolicyConfig` (PATCH) | `folders.getKajPolicyConfig` |
| Project | `projects.updateKajPolicyConfig` (PATCH) | `projects.getKajPolicyConfig`; effective policy: `projects.showEffectiveKeyAccessJustificationsPolicyConfig` |

### gcloud `kms kaj-config update` flags (beta, help 593.0.0)

| Flag | Description |
|---|---|
| `--folder` / `--organization` / `--project` | Exactly one is required: the parent of the KajPolicyConfig. |
| `--allowed-access-reasons` | Allowed reasons (cannot be empty if set): `customer-authorized-workflow-servicing`, `customer-initiated-access`, `customer-initiated-support`, `google-initiated-review`, `google-initiated-service`, `google-initiated-system-operation`, `google-response-to-production-alert`, `modified-customer-initiated-access`, `modified-google-initiated-system-operation`, `reason-not-expected`, `reason-unspecified`, `third-party-data-request`. |
| `--reset-kaj-policy-config` | Resets to empty, which allows all access reasons. At most one of this and `--allowed-access-reasons`. |

## Notes

- `gcloud kms kaj-config` exists only in the `beta` and `alpha` tracks in gcloud 593.0.0; the update command does not display the updated resource by default (add `--format=yaml`). An empty config is an "allow-all" policy.
- `describe` on a project returns only a policy set on that project, not one inherited from a parent folder or organization; use the effective-config command for the policy applied to new keys. Projects inherit the default from the nearest parent folder or organization. In the console, the effective default policy is shown while creating a key and you choose whether to inherit it.
- Console: **Key management** > **KMS Controls** > **Key Access Justifications (KAJ)** > **Edit** > **Set Key Access Justifications policy** > **Allow specific reason codes**. Customer-initiated access and Google-initiated system operation are essential for normal functioning. **Deny all reason codes** makes keys unusable.
- The default policy is restrictive for new keys: a policy that omits essential reasons breaks key use. Try it on a disposable folder or project first.
- Corrected from the official docs: the gcloud commands were written as `gcloud beta kms kaj-config update` followed by `--organization=ORGANIZATION_NUMBER` and `--allowed-access-reasons="ALLOWED_ACCESS_REASONS"` on separate lines without `\`, with example values `CUSTOMER_INITIATED_ACCESS,GOOGLE_INITIATED_SYSTEM_OPERATION`; the gcloud 593.0.0 help says `ALLOWED_ACCESS_REASONS must be one of` the lower-case choices listed in the flags table above, and gcloud rejects the upper-case values (`CUSTOMER_INITIATED_ACCESS must be one of [customer-authorized-workflow-servicing, customer-initiated-access, ...]`).
- Adapted from the official docs: the REST PATCH used `"defaultKeyAccessJustificationPolicy": POLICY` (not valid JSON until replaced); the REST GET calls were `curl "https://cloudkms.googleapis.com/v1/projects/PROJECT_ID/kajPolicyConfig"` and `curl "https://cloudkms.googleapis.com/v1/projects/PROJECT_ID:showEffectiveKeyAccessJustificationsPolicyConfig"` with no credentials; the `authorization: Bearer TOKEN` header is taken from the source's own PATCH call.
- The REST bearer token `TOKEN` is an OAuth access token; do not print or paste it into shared logs. The source's REST response samples (not reproduced) omit a comma after `name` and show `project/PROJECT_ID` in the project example, so they are not valid JSON as written; the YAML outputs above are the source's gcloud outputs.
- Source inconsistency: the source's text names the update methods `organizations.updateKeyAccessJustificationsPolicyConfig`, `folders.updateKeyAccessJustificationsPolicyConfig` and `projects.updateKeyAccessJustificationsPolicyConfig`; its own reference links and the Cloud KMS v1 Discovery document name them `updateKajPolicyConfig` (PATCH on `.../kajPolicyConfig`), as in the table above.
- Source inconsistency: the output samples show `defaultPolicyAvailable` inside `defaultKeyAccessJustificationPolicy`; the Cloud KMS v1 Discovery document defines `defaultPolicyAvailable` as an output-only field of `KeyAccessJustificationsPolicyConfig` itself, next to `name`. The outputs are kept as the source shows them.
- `--reset-kaj-policy-config` (and an empty config) is an "allow-all" policy: it allows every access reason for new keys. Use it only when that is intended.
- Source: https://docs.cloud.google.com/assured-workloads/key-access-justifications/docs/set-default-policy (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [configure-kaj.md](./configure-kaj.md)
- [key-access-justifications-overview.md](./key-access-justifications-overview.md)
