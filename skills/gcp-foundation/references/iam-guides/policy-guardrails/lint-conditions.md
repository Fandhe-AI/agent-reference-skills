---
source: https://docs.cloud.google.com/iam/docs/linting-policies
---

# Linting IAM Conditions (Alpha)

The IAM linter validates condition expressions in allow-policy role bindings and reports syntax errors and likely semantic problems before you call `setIamPolicy`.

## Signature / Usage

```json
{
  "title": "1_less_than_2",
  "description": "",
  "expression": "1 <"
}
```

```bash
gcloud alpha iam policies lint-condition --condition-from-file="condition.json"
```

```yaml
lintResults:
- debugMessage: |-
    ERROR: Parse expression:1:3: mismatched input '<EOF>' expecting {'[', '{', '(', '.', '-', '!', 'true', 'false', 'null', NUM_FLOAT, NUM_INT, NUM_UINT, STRING, BYTES, IDENTIFIER}
      | 1 >
      | ...^
  fieldName: condition.expression
  level: CONDITION
  locationOffset: 3
  severity: ERROR
  validationUnitName: LintValidationUnits/ConditionCompileCheck
...
```

REST (`iamPolicies.lintPolicy`):

```text
POST https://iam.googleapis.com/v1/iamPolicies:lintPolicy
```

```json
{
  "condition": {
    condition
  }
}
```

```bash
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://iam.googleapis.com/v1/iamPolicies:lintPolicy"
```

Response contains `LintResult` objects:

```json
{
  "lint_results": {
    "level": "CONDITION",
    "validation_unit_name": "LintValidationUnits/ConditionCompileCheck",
    "severity": "ERROR",
    "field_name": "condition.expression",
    "location_offset": "2",
    "debug_message": "ERROR: Parse expression:1:2: mismatched input \'<EOF>\' ..."
  }
}
```

### Example conditions per validation unit

```json
{ "title": "Condition not compiling", "description": "", "expression": "true=false" }
```

```json
{ "title": "Condition not compiling", "description": "", "expression": "request.time < timestamp('2000-01-01T00:00:00Z')" }
```

```json
{ "title": "Time function out of range", "description": "", "expression": "request.time.getMonth() > 13" }
```

```json
{ "title": "Empty time range", "description": "", "expression": "request.time.getMonth() > 5 && request.time.getMonth() < 4" }
```

```json
{ "title": "Condition with unsupported resource service string", "description": "", "expression": "resource.service == 'resourcemanager'" }
```

```json
{ "title": "Condition with legacy resource type", "description": "", "expression": "resource.type == 'resourcemanager.projects'" }
```

## Options / Props

| Validation unit | Severity | Meaning |
|---|---|---|
| `ConditionCompileCheck` | ERROR | Invalid CEL syntax |
| `ConditionComplexityCheck` | ERROR | More than 12 logic operators |
| `DateTimeCheck` | WARNING | Timestamp comparison always true/false (bad format or in the past) |
| `DateTimeRangeCheck` | WARNING | Value out of range for the timestamp function (e.g. `getMonth` must be 0-11) |
| `DrgGetAttributeDefaultValueCheck` | ERROR | `api.getAttribute('iam.googleapis.com/modifiedGrantsByRole', V)` where `V` is not `[]` |
| `EffectiveTimeRangeCheck` | WARNING | Combined time functions produce an empty (or full) range |
| `HasOnlyListConstCheck` | ERROR | `hasOnly()` list contains non-constants |
| `HasOnlyListLengthCheck` | ERROR | `hasOnly()` list has more than 10 elements |
| `ResourceServiceLiteralCheck` | WARNING | Unsupported `resource.service` value |
| `ResourceTypeLiteralCheck` | WARNING | Unsupported (e.g. legacy) `resource.type` value |
| `RestrictedAttributesCheck` | WARNING | Restricted or unsupported attribute (e.g. `request.auth.access_levels`) |

## Notes

- Alpha, subject to Pre-GA terms. Only `google.iam.v1.Binding.condition` is linted.
- Needs `SERVICE.RESOURCE_TYPE.get`, `.getIamPolicy`, `.setIamPolicy` (e.g. `resourcemanager.projects.*`); Security Admin (`roles/iam.securityAdmin`) includes them. The IAM API must be enabled.
- In the console, open the principal's role condition and click Run Linter; errors must be fixed before saving.
- If a condition fails to compile, other units report "skipped due to absence of a required object: CheckedExpr"; fix compilation first.
- Source: https://docs.cloud.google.com/iam/docs/linting-policies
- Retrieved 2026-11-14. Content CC BY 4.0; code samples Apache 2.0.

## Related

- [custom-org-policy-iam.md](./custom-org-policy-iam.md)
