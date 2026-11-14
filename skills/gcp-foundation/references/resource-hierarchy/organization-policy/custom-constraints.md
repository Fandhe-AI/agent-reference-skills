---
source: https://docs.cloud.google.com/resource-manager/docs/organization-policy/creating-managing-custom-constraints
---

# Custom Constraints and Custom Organization Policies

Define your own constraints (YAML + CEL condition) on supported service resources, set them up at the organization, then enforce them with organization policies.

## Signature / Usage

Constraint file format:

```yaml
name: organizations/ORGANIZATION_ID/customConstraints/CONSTRAINT_NAME
resourceTypes: RESOURCE_NAME
methodTypes:
  - CREATE
condition: "CONDITION"
actionType: ACTION
displayName: DISPLAY_NAME
description: DESCRIPTION
```

Example constraint:

```yaml
name: organizations/1234567890123/customConstraints/custom.disableGkeAutoUpgrade
resourceTypes: container.googleapis.com/NodePool
methodTypes:
  - CREATE
  - UPDATE
condition: "resource.management.autoUpgrade == false"
actionType: ALLOW
displayName: Disable GKE auto upgrade
description: Only allow GKE NodePool resource to be created or updated if
AutoUpgrade is not enabled where this custom constraint is enforced.
```

Set up, verify, update, delete:

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

```bash
gcloud org-policies delete-custom-constraint custom.CONSTRAINT_NAME \
  --organization=ORGANIZATION_ID
```

Output:

```text
Deleted custom constraint [organizations/123456789/customConstraints/custom.disableGkeAutoUpgrade]
```

Enforce (boolean policy referencing the constraint; dry-run first):

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
```

```bash
gcloud org-policies set-policy POLICY_PATH --update-mask=spec
```

### CEL conditions

Sample resource shape for field types:

```json
{
  "integerValue": 1,
  "stringValue": "A text string",
  "booleanValue": true,
  "nestedValue": {
    "nestedStringValue": "Another text string"
  },
  "listValue": ["foo", "bar"],
  "mapValue": {
    "costCenter": "123"
  }
}
```

Integer:

```text
resource.integerValue == 1
resource.integerValue > 5
resource.integerValue < 10
```

String:

```text
resource.stringValue == "abc"
// stringValue is exactly "abc".

resource.stringValue.matches("dev$")
// stringValue matches a regular expression, which specifies the string ends
// with the word "dev".

resource.stringValue.startsWith("startValue")
// stringValue starts with "startValue".

resource.stringValue.endsWith("endValue")
// stringValue ends with "endValue".

resource.stringValue.contains("fooBar")
// stringValue contains "fooBar".

resource.nestedValue.nestedStringValue == "foo"
// nestedValue contains the object nestedStringValue, which has a value of "foo".
```

List:

```text
resource.listValue.size() >= 1 && resource.listValue[0] == "bar"
// listValue has size greater than or equal to one, and the first element is "bar".

resource.listValue.exists(value, value == "foo")
// listValue has at least one element that is exactly "foo".

resource.listValue.all(value, value.contains("foo"))
// listValue is a list of values that are all exactly "foo".
```

Map:

```text
has(resource.mapValue.foo) && resource.mapValue.foo == "bar"
// mapValue contains the key "foo", and that key has the value "bar".
```

Invalid (type mismatch) constraint, rejected at set-up:

```yaml
name: organizations/1234567890123/customConstraints/custom.badConfig
resourceTypes: dataproc.googleapis.com/Cluster
methodTypes:
  - CREATE
  - UPDATE
condition: "resource.config.masterConfig.numInstances == 'mismatch'"
actionType: ALLOW
displayName: Number of instances is a string
description: Demonstrate that type mismatches cause an error.
```

```text
ERROR: (gcloud.org-policies.set-custom-constraint) INVALID_ARGUMENT: Custom constraint condition [resource.config.masterConfig.numInstances == "mismatch"] is invalid. Error: ERROR: <input>:1:15: found no matching overload for '_==_' applied to '(int, string)' (candidates: (%A0, %A0))
 | resource.config.masterConfig.numInstances == "mismatch"
 | ..........................................^.
```

## Options / Props

Constraint fields and limits:

| Field | Description |
|-------|-------------|
| `name` | `organizations/ORG_ID/customConstraints/custom.NAME`. Letters and numbers only; up to 70 characters excluding the `custom.` prefix. Cannot be reused after deletion |
| `resourceTypes` | Fully qualified REST resource, e.g. `container.googleapis.com/NodePool`. Most resource types support up to 20 custom constraints. Cannot be changed after creation |
| `methodTypes` | `CREATE` or `CREATE` + `UPDATE`. Not all services support both; unsupported combos (e.g. `UPDATE` on Compute Engine images) cannot be saved. With `UPDATE`, changes to a violating resource are blocked unless the change resolves the violation |
| `condition` | CEL expression against the resource, up to 1000 characters. Enclose the full expression in double quotes. Enforced when it evaluates to `true`; combine with `&&` / `\|\|` |
| `actionType` | `ALLOW`: operation permitted only if condition is true (every other case blocked). `DENY`: operation blocked if condition is true |
| `displayName` | Up to 200 characters; may appear in error messages, so no PII |
| `description` | Up to 2000 characters; used as the violation error message, so say how to resolve; no PII |

Required roles on the organization: `roles/orgpolicy.policyAdmin`; to enable APIs, `roles/serviceusage.serviceUsageConsumer`.

## Notes

- Evaluation order: custom constraints are checked first; if any custom policy denies, the request is rejected, then predefined policies are checked. Policies take up to 15 minutes to take effect.
- Updating an enforced custom constraint takes effect immediately. Display name, description, methods, condition, and action are editable; constraint ID and resource type are not.
- Deleting a custom constraint leaves existing policies in place but ignored.
- Querying a list index or map key that does not exist returns `BAD_CONDITION` and blocks all creation of that resource wherever the policy is enforced. Guard with `size()`, `has()`, `all()`, `exists()`, e.g. `has(map.key) && map.key == "value"`.
- Cross-service effect: an error message for a custom policy violation can surface in a different service (for example a Dataproc action blocked by a Compute Engine custom constraint).
- Tags on organization, folder, or project resources are supported by custom constraints (per-service support varies). Mandatory tags can be enforced with a custom constraint (Preview).
- Test with Policy Simulator and dry-run (30-day look-ahead of violations) before enforcing. Sample constraints: custom organization policy library on GitHub (GoogleCloudPlatform/professional-services).
- Source: https://docs.cloud.google.com/resource-manager/docs/organization-policy/creating-managing-custom-constraints
- Retrieved 2026-11-14. Content is CC BY 4.0; code examples are Apache 2.0.

## Related

- [custom-constraint-supported-services.md](./custom-constraint-supported-services.md)
- [dry-run-policy.md](./dry-run-policy.md)
- [overview.md](./overview.md)
