---
source: https://docs.cloud.google.com/iam/docs/service-accounts-custom-constraints
---

# Service account tags and custom organization policy constraints

Attach tags to service accounts (Preview) and restrict service account and key creation with custom organization policy constraints (CEL).

## Signature / Usage

### Tags

Attach a tag value (creates a tag binding):

```bash
gcloud resource-manager tags bindings create \
    --tag-value=TAGVALUE_NAME \
    --parent=RESOURCE_ID
```

List bindings (direct and inherited):

```bash
gcloud resource-manager tags bindings list \
    --parent=RESOURCE_ID
```

```text
name: tagBindings/%2F%2Fcloudresourcemanager.googleapis.com%2Fprojects%2F7890123456/tagValues/567890123456
tagValue: tagValues/567890123456
resource: //iam.googleapis.com/projects/test-project/serviceAccounts/1029384756
```

Detach a directly attached tag:

```bash
gcloud resource-manager tags bindings delete \
    --tag-value=TAGVALUE_NAME \
    --parent=RESOURCE_ID
```

`RESOURCE_ID` example: `//iam.googleapis.com/projects/test-project/serviceAccounts/1029384756` (unique ID or email, with the API domain). `TAGVALUE_NAME` example: `tagValues/567890123456`.

### Custom constraint YAML

```yaml
name: organizations/ORGANIZATION_ID/customConstraints/CONSTRAINT_NAME
resourceTypes:
- iam.googleapis.com/RESOURCE_TYPE
methodTypes:
- CREATE
- UPDATE
condition: "CONDITION"
actionType: ACTION
displayName: DISPLAY_NAME
description: DESCRIPTION
```

Set up and verify the constraint:

```bash
gcloud org-policies set-custom-constraint CONSTRAINT_PATH
gcloud org-policies list-custom-constraints --organization=ORGANIZATION_ID
```

Enforce it with a policy file:

```yaml
name: projects/PROJECT_ID/policies/CONSTRAINT_NAME
spec:
  rules:
  - enforce: true

dryRunSpec:
  rules:
  - enforce: true
```

```bash
gcloud org-policies set-policy POLICY_PATH --update-mask=dryRunSpec
gcloud org-policies set-policy POLICY_PATH --update-mask=spec
```

Example constraint and its denial message:

Adapted (not in the official docs): `resourceTypes` is a list.

```yaml
name: organizations/ORG_ID/customConstraints/custom.denyServiceAccountCreation
resourceTypes:
  - iam.googleapis.com/ServiceAccount
methodTypes:
  - CREATE
  - UPDATE
condition:
  "resource.description.contains('INVALID_DESCRIPTION')"
actionType: DENY
displayName: Do not allow service account with INVALID_DESCRIPTION to be created.
```

```text
Operation denied by custom org policy: ["customConstraints/custom.denyServiceAccountCreation": "Do not allow service account with INVALID_DESCRIPTION to be created."]
```

Common use cases (from the official table):

Adapted (not in the official docs): CEL boolean literal written as lowercase `true`.

```yaml
name: organizations/ORGANIZATION_ID/customConstraints/custom.disableServiceAccountCreation
resourceTypes:
- iam.googleapis.com/ServiceAccount
methodTypes:
- CREATE
condition: "true"
actionType: DENY
displayName: Deny all service account creation.
```

```yaml
name: organizations/ORGANIZATION_ID/customConstraints/custom.disableServiceAccountKeyCreation
resourceTypes:
- iam.googleapis.com/ServiceAccountKey
methodTypes:
- CREATE
condition: "resource.keyType == USER_MANAGED && resource.keyOrigin == GOOGLE_PROVIDED"
actionType: DENY
displayName: Deny all service account key creation.
```

```yaml
name: organizations/ORGANIZATION_ID/customConstraints/custom.disableServiceAccountKeyUpload
resourceTypes:
- iam.googleapis.com/ServiceAccountKey
methodTypes:
- CREATE
condition: "resource.keyType == USER_MANAGED && resource.keyOrigin == USER_PROVIDED"
actionType: DENY
displayName: Deny all service account key uploads.
```

## Options / Props

| Field | Constraint |
|---|---|
| `name` | Must start with `custom.`; letters and numbers only; max 70 characters excluding the `organizations/ID/customConstraints/custom` prefix |
| `resourceTypes` | Resource name, e.g. `iam.googleapis.com/ServiceAccount` or `iam.googleapis.com/ServiceAccountKey`; most resource types support up to 20 custom constraints |
| `methodTypes` | `CREATE` (console/gcloud docs state CREATE only; the YAML example also lists `UPDATE`) |
| `condition` | CEL expression, max 1,500 characters |
| `actionType` | `ALLOW` or `DENY` (gcloud docs state `ALLOW` only; examples use `DENY`) |
| `displayName` | Max 200 characters |
| `description` | Max 2,000 characters; shown as the violation error message |

Supported CEL fields: service accounts `resource.description`, `resource.displayName`, `resource.name` (`projects/PROJECT_ID/serviceAccounts/UNIQUE_ID`); service account keys `resource.keyOrigin`, `resource.keyType`, `resource.name` (`projects/PROJECT_ID/serviceAccounts/UNIQUE_ID/keys/KEY_ID`).

Required permissions to manage org policies (for example via Organization Policy Administrator): `orgpolicy.constraints.list`, `orgpolicy.policies.create`, `orgpolicy.policies.delete`, `orgpolicy.policies.list`, `orgpolicy.policies.update`, `orgpolicy.policy.get`, `orgpolicy.policy.set`.

Tag roles: `roles/resourcemanager.tagViewer`, `roles/resourcemanager.organizationViewer`, `roles/resourcemanager.tagAdmin` (create/update/delete definitions), `roles/resourcemanager.tagUser` (attach/remove on the tag value and the resource), plus `roles/iam.serviceAccountAdmin` on the service account.

## Notes

- Tags on service accounts are Preview (Pre-GA terms). Tags let you conditionally allow/deny IAM policies; changing or deleting a tag can remove access granted by conditional role bindings.
- Inherited tags cannot be detached, only overridden by attaching the same key with a different value. Delete tag bindings before deleting a tag definition.
- Policies take up to 15 minutes to take effect. Test with dry-run (`dryRunSpec`) before setting the live `spec`; the console offers Test changes (Policy Simulator).
- A conditional rule in an org policy requires at least one unconditional rule.
- `allow` actions block every case not explicitly matched by the condition; `deny` blocks the operation when the condition is true. Do not put PII or sensitive data in constraint IDs, display names, or descriptions (they appear in error messages).
- Predefined constraints (`constraints/iam.disableServiceAccountCreation`, `constraints/iam.disableServiceAccountKeyCreation`, `constraints/iam.disableServiceAccountKeyUpload`) are the simpler alternative to the custom equivalents above.
- Source: https://docs.cloud.google.com/iam/docs/service-accounts-tags
- Source: https://docs.cloud.google.com/iam/docs/service-accounts-custom-constraints
- Retrieved 2026-11-14. Content CC BY 4.0; code samples Apache 2.0.

## Related

- [service-accounts-create-manage.md](./service-accounts-create-manage.md)
- [service-accounts-impersonation-credentials.md](../service-account-concepts/service-accounts-impersonation-credentials.md)
