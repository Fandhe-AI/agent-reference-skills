---
source: https://docs.cloud.google.com/resource-manager/docs/organization-policy/using-constraints
---

# Using Constraints (Create and Manage Organization Policies)

How to view, create, update, reset, and delete organization policies with the console, gcloud (`gcloud org-policies`), and REST for list, boolean, and managed constraints.

## Signature / Usage

### Required role and delegation

Grant `roles/orgpolicy.policyAdmin` (Organization Policy Administrator) on the organization. To delegate, add an IAM condition to the binding:

```json
"bindings": [
  {
    "role": "roles/orgpolicy.policyAdmin",
    "members": [
      "PRINCIPAL_1",
      "PRINCIPAL_2"
    ],
    "condition": {
      "title": "TITLE",
      "description": "DESCRIPTION",
      "expression": "resource.matchTag('TAG_KEY', 'TAG_VALUE')"
    }
  }
]
```

`TAG_KEY` is the namespaced tag key name (for example `123456789012/environment`); `TAG_VALUE` is the tag value short name (for example `development`). The role is only granted on resources with that tag attached.

### Console

Go to IAM & Admin > Organization policies, pick the project, folder, or organization, select a constraint, click **Manage policy**, choose **Override parent's policy**, then:

- Boolean rule: **Add a rule**, set Enforcement on/off, **Set policy**.
- List rule: choose **Merge with parent** (merge and evaluate together) or **Replace** (override inherited completely), **Add a rule**, choose allow all / deny all / custom list (Policy type accepted or denied, then custom values), **Set policy**.
- Remove a configured policy: **Manage policy**, then **Inherit parent's policy** (default for resources) or **Google-managed default**.

### List rules with gcloud

Get the policy applied directly to the resource (use `--folder=` or `--project=` instead of `--organization=` as needed):

```bash
gcloud org-policies describe \
  CONSTRAINT_NAME --organization=ORGANIZATION_ID
```

Example output:

```yaml
name: projects/841166443394/policies/gcp.resourceLocations
spec:
  etag: BwW5P5cEOGs=
  inheritFromParent: true
  rules:
  - condition:
      expression: resource.matchTagId("tagKeys/1111", "tagValues/2222")
    values:
      allowedValues:
      - in:us-east1-locations
  - condition:
      expression: resource.matchTag("123/env", "prod")
    values:
      allowedValues:
      - in:us-west1-locations
  - values:
      deniedValues:
      - in:asia-south1-locations
  updateTime: '2021-01-19T12:00:51.095Z'
```

If no policy is set the command returns:

```text
ERROR: (gcloud.org-policies.describe) NOT_FOUND: Requested entity was not found.
```

Set the policy (overwrites any policy attached to the resource). Create `/tmp/policy.yaml`:

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

View the effective policy (inheritance included):

```bash
gcloud org-policies describe \
  CONSTRAINT_NAME --effective \
  --organization=ORGANIZATION_ID
```

Hierarchy subtree (`under:`) enforcement:

```yaml
name: organizations/ORGANIZATION_ID/policies/CONSTRAINT_NAME
spec:
  rules:
  - values:
      deniedValues:
      - under:folders/VALUE_A
```

`under:organizations/VALUE_X` and `under:projects/VALUE_Y` are also valid.

Merge with the parent (`inheritFromParent: true`) on a project:

```yaml
name: projects/PROJECT_ID/policies/CONSTRAINT_NAME
spec:
  inheritFromParent: true
  rules:
  - values:
      deniedValues:
      - VALUE_B
      - VALUE_C
```

Effective result when the parent denies `VALUE_A`:

```yaml
name: projects/PROJECT_ID/policies/CONSTRAINT_NAME
spec:
  rules:
  - values:
      deniedValues:
        - VALUE_A
        - VALUE_B
        - VALUE_C
```

Restore the constraint's default behavior:

```bash
gcloud org-policies reset CONSTRAINT_NAME \
    --project=PROJECT_ID
```

Effective policy afterwards (default allows all values):

```yaml
name: projects/PROJECT_ID/policies/CONSTRAINT_NAME
spec:
  rules:
  - allowAll: true
```

Delete a policy (a resource without a policy inherits its parent's; deleting at the org falls back to the constraint default):

```bash
gcloud org-policies delete \
  CONSTRAINT_NAME \
  --organization=ORGANIZATION_ID
```

Output:

```text
Deleted policy
[organizations/ORGANIZATION_ID/policies/CONSTRAINT_NAME].
{}
```

Use `--project=PROJECT_ID` (or `--folder=`) to target other resources.

### Boolean rules with gcloud

Enforce on an organization:

```yaml
name: organizations/ORGANIZATION_ID/policies/CONSTRAINT_NAME
spec:
  rules:
  - enforce: true
```

```bash
gcloud org-policies set-policy /tmp/policy.yaml
```

Override on a project (disable enforcement for the project and everything below it):

```yaml
name: projects/PROJECT_ID/policies/CONSTRAINT_NAME
spec:
  rules:
  - enforce: false
```

### Managed constraints

List and describe managed and custom constraints:

```bash
gcloud org-policies list-custom-constraints \
  --organization=ORGANIZATION_ID
```

```bash
gcloud org-policies describe-custom-constraint CONSTRAINT_NAME \
    --organization=ORGANIZATION_ID
```

For example `CONSTRAINT_NAME` = `iam.managed.disableServiceAccountKeyUpload`. REST list:

```text
GET https://orgpolicy.googleapis.com/v2/{parent=organizations/ORGANIZATION_ID}/customConstraints
```

Policy YAML with parameters and optional dry-run spec (omit `parameters` if unsupported):

```yaml
name: RESOURCE_TYPE/RESOURCE_ID/policies/CONSTRAINT_NAME
spec:
rules:
    - enforce: ENFORCEMENT_STATE
      parameters:
        LIST_PARAMETER:
           - LIST_VALUE_1
           - LIST_VALUE_2
        BOOLEAN_PARAMETER: BOOLEAN_VALUE

dryRunSpec:
  rules:
  - enforce: ENFORCEMENT_STATE
    parameters:
      LIST_PARAMETER:
         - LIST_VALUE_1
         - LIST_VALUE_2
      BOOLEAN_PARAMETER: BOOLEAN_VALUE
```

`RESOURCE_TYPE` is `organizations`, `folders`, or `projects`; `RESOURCE_ID` is the org ID, folder ID, project ID, or project number; `ENFORCEMENT_STATE` is `true` or `false`; `BOOLEAN_VALUE` is `True` or `False`.

Set dry-run first, then simulate, then enforce:

```bash
gcloud org-policies set-policy POLICY_PATH \
  --update-mask=dryRunSpec
```

```bash
gcloud policy-intelligence simulate orgpolicy \
  --organization=ORGANIZATION_ID \
  --policies=POLICY_PATH
```

```bash
gcloud org-policies set-policy POLICY_PATH \
  --update-mask=spec
```

REST create (`organizations.policies.create`):

```text
POST https://orgpolicy.googleapis.com/v2/{parent=organizations/ORGANIZATION_ID}/policies
```

```json
{
  "name": "RESOURCE_TYPE/RESOURCE_ID/policies/CONSTRAINT_NAME",
  "spec": {
    "rules": [
      {
        "enforce": ["ENFORCEMENT_STATE"],
        "parameters": {
          "LIST_PARAMETER": [
            "LIST_VALUE_1",
            "LIST_VALUE_2"
          ],
          BOOLEAN_PARAMETER: BOOLEAN_VALUE
        }
      }
    ]
  }
  "dryRunSpec": {
    "rules": [
      {
        "enforce": ["ENFORCEMENT_STATE"],
        "parameters": {
          "LIST_PARAMETER": [
            "LIST_VALUE_1",
            "LIST_VALUE_2"
          ],
          BOOLEAN_PARAMETER: BOOLEAN_VALUE
        }
      }
    ]
  }
}
```

## Notes

- Changes can take up to 15 minutes to be fully enforced.
- Limits: managed constraints cannot have more than 100 individual parameter values; legacy list rules cannot have more than 500 individual allowed or denied values; list-rule policies cannot exceed 32 KB. Larger requests fail with an error.
- Most enforcement is not retroactive; an existing violating state is flagged but not stopped.
- If a conditional (tag) rule is added, at least one unconditional rule must also exist or the policy cannot be saved.
- `set-policy` overwrites any policy attached to the resource; run `describe` first. The `/tmp/policy.yaml` path is illustrative; use a private working directory on shared machines.
- The official REST sample is not valid JSON as written (missing comma before `dryRunSpec`, unquoted `BOOLEAN_PARAMETER`); treat it as a template.
- The constraints used in official examples are generic placeholders, not real constraints.
- Source: https://docs.cloud.google.com/resource-manager/docs/organization-policy/using-constraints
- Source: https://docs.cloud.google.com/resource-manager/docs/organization-policy/creating-managing-policies
- Retrieved 2026-11-14. Content is CC BY 4.0; code examples are Apache 2.0.

## Related

- [overview.md](./overview.md)
- [dry-run-policy.md](./dry-run-policy.md)
- [tags-condition.md](./tags-condition.md)
- gcp-cli (gcloud in general)
