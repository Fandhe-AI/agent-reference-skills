---
source: https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/attached/generic/how-to/setup-custom-constraints
---

# Set up custom constraints for attached clusters

Use Organization Policy custom constraints to create granular guardrails on GKE attached clusters (`gkemulticloud.googleapis.com/AttachedCluster`). Policies can run in dry-run mode to test without affecting production. Organization policies and custom constraints are free.

## Signature / Usage

### 1. Define the constraint

Adapted (not in the official docs): `condition: \"CONDITION\"` (backslash-escaped quotes) written as `condition: "CONDITION"`, valid YAML.

```yaml
name: organizations/ORGANIZATION_ID/customConstraints/CONSTRAINT_NAME
resourceTypes:
- gkemulticloud.googleapis.com/AttachedCluster
methodTypes:
- CREATE
condition: "CONDITION"
actionType: ACTION
displayName: DISPLAY_NAME
description: DESCRIPTION
```

### 2. Register and verify it

```bash
gcloud org-policies set-custom-constraint PATH_TO_FILE
```

```bash
gcloud org-policies list-custom-constraints --organization=ORGANIZATION_ID
```

```yaml
CUSTOM_CONSTRAINT: custom.allowClusterCreateIfAnnotationPresent
ACTION_TYPE: ALLOW
METHOD_TYPES: CREATE
RESOURCE_TYPES: gkemulticloud.googleapis.com/AttachedCluster
DISPLAY_NAME: Allow new clusters only when certain annotations are set.
```

### 3. Enforce it with an organization policy

```yaml
name: RESOURCE_HIERARCHY/policies/POLICY_NAME
spec:
  rules:
  - enforce: true
```

```bash
gcloud org-policies set-policy PATH_TO_POLICY
```

```bash
gcloud org-policies list --RESOURCE_FLAG=RESOURCE_ID
```

### 4. Test it

Registering a cluster in a restricted project fails with `CUSTOM_ORG_POLICY_VIOLATION`:

```bash
gcloud container attached clusters register CLUSTER_NAME \
  --location=GOOGLE_CLOUD_REGION \
  --fleet-project=PROJECT_NUMBER \
  --platform-version=PLATFORM_VERSION \
  --distribution=generic \
  --issuer-url=ISSUER_URL \
  --context=KUBECONFIG_CONTEXT \
  --kubeconfig=KUBECONFIG_PATH
```

## Options / Props

| Field | Rule |
| --- | --- |
| `CONSTRAINT_NAME` | Must start with `custom.`; only letters and numbers; max 70 characters not counting the prefix (for example `organizations/123456789/customConstraints/custom`); example `custom.allowClusterCreateIfAnnotationPresent` |
| `CONDITION` | CEL expression over the AttachedCluster resource; max 1,500 characters; example `"key" in resource.annotations && resource.annotations.key == "created-by"` |
| `ACTION` | `ALLOW` or `DENY` |
| `DISPLAY_NAME` | Max 200 characters |
| `DESCRIPTION` | Error message shown on violation; max 2,000 characters |
| `RESOURCE_HIERARCHY` | Scope, for example `projects/PROJECT_ID` or `organizations/ORGANIZATION_ID` |
| `RESOURCE_FLAG`, `RESOURCE_ID` | Flag naming the resource where the policy is enforced, and its ID (for example `--project` with the project ID, or `--organization` with the organization ID) |
| Required role | Organization Policy Administrator (`roles/orgpolicy.policyAdmin`) on the organization |

## Notes

- Corrected from the official docs: the source shows `condition: \"CONDITION\"`.
- Constraints can only be enforced on `CREATE` or `UPDATE` methods of attached cluster resources and do not apply automatically to existing resources; use a dry-run organization policy to find resources to update.
- Policies are inherited by descendants of the resource they are enforced on.
- The source notes that specific gcloud commands may vary with your configuration. Constraint fields come from the AttachedCluster API resource spec, excluding output-only fields.
- Source: https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/attached/generic/how-to/setup-custom-constraints (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [attach-cluster-generic.md](./attach-cluster-generic.md)
