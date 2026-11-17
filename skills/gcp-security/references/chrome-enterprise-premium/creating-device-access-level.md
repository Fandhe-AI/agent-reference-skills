---
source: https://docs.cloud.google.com/endpoint-verification/docs/creating-device-access-level
---

# Create device-based access levels

Create basic or custom Access Context Manager access levels from the device attributes collected by Endpoint Verification. Creating access levels by using device attributes is available in the paid subscription of Chrome Enterprise Premium.

## Signature / Usage

### Custom access level condition (CEL)

The condition must resolve to a single boolean value. This expression allows access only from encrypted devices.

```text
device.encryption_status == DeviceEncryptionStatus.ENCRYPTED
```

### Basic access level file (gcloud)

Adapted (not in the official docs): a colon is added after `allowedEncryptionStatuses` and the list is indented under it; the source YAML is not valid.

```yaml
- devicePolicy:
    allowedEncryptionStatuses:
      - ENCRYPTED
```

### Custom access level file (gcloud)

```yaml
expression: "device.encryption_status == DeviceEncryptionStatus.ENCRYPTED && device.is_admin_approved_device"
```

### Create the access level (gcloud)

Adapted (not in the official docs): a space is added before the line-continuation backslash after the file name (the source has `FILE_NAME.yaml\`, which joins the next flag onto the file name).

```bash
gcloud access-context-manager levels create ACCESS_LEVEL_NAME \
--title=TITLE \
--basic-level-spec=FILE_NAME.yaml \
--policy=POLICY_NAME
```

Adapted (not in the official docs): the same space is added before the backslash after `FILE_NAME.yaml`.

```bash
gcloud access-context-manager levels create ACCESS_LEVEL_NAME \
--title=TITLE \
--custom-level-spec=FILE_NAME.yaml \
--policy=POLICY_NAME
```

### Create the access level (REST)

`POST https://accesscontextmanager.googleapis.com/v1/accessPolicies/POLICY_ID/accessLevels`

Adapted (not in the official docs): the basic request body is valid JSON (quoted values, no trailing commas or extra braces) and uses the `devicePolicy` condition from the source's sample response in place of the `CONDITION` placeholder.

```json
{
  "name": "accessPolicies/POLICY_ID/accessLevels/LEVEL_ID",
  "title": "TITLE",
  "description": "DESCRIPTION",
  "basic": {
    "conditions": [
      {
        "devicePolicy": {
          "allowedEncryptionStatuses": ["ENCRYPTED"]
        }
      }
    ]
  }
}
```

Adapted (not in the official docs): the custom request body is valid JSON and puts the CEL expression in `custom.expr.expression`, as the source's sample response and the Discovery `CustomLevel` schema show (the source nests `expr` under a `conditions` list).

```json
{
  "name": "accessPolicies/POLICY_ID/accessLevels/LEVEL_ID",
  "title": "TITLE",
  "description": "DESCRIPTION",
  "custom": {
    "expr": {
      "expression": "CEL_EXPRESSION"
    }
  }
}
```

Adapted (not in the official docs): the URL uses the plain path `v1/accessPolicies/POLICY_ID/accessLevels` instead of the URL template `v1/{parent=accessPolicies/POLICY_ID}/accessLevels`.

```bash
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://accesscontextmanager.googleapis.com/v1/accessPolicies/POLICY_ID/accessLevels"
```

## Options / Props

### Required roles (one of)

| Role | ID |
|---|---|
| Access Context Manager Admin | `roles/accesscontextmanager.policyAdmin` |
| Access Context Manager Editor | `roles/accesscontextmanager.policyEditor` |

### Placeholders

| Name | Meaning |
|---|---|
| `ACCESS_LEVEL_NAME` | Unique name, format `accessPolicies/POLICY_ID/accessLevels/LEVEL_ID` |
| `LEVEL_ID` | At most 50 characters, starts with a letter, only numbers, letters and underscores |
| `TITLE` | Human-readable, unique within the policy; in the console at most 50 characters, starts with a letter, only numbers, letters, underscores and spaces |
| `FILE_NAME` | YAML file: device policy attributes (basic) or `expression: "CEL_EXPRESSION"` (custom) |
| `POLICY_NAME` / `POLICY_ID` | Your organization's access policy |

## Notes

- Prerequisites: deploy Endpoint Verification; upgrade to the paid subscription of Chrome Enterprise Premium.
- Expected gcloud output: `Create request issued for: NAME`, `Waiting for operation [...] to complete...done.`, `Created level NAME.`
- Corrected from the official docs: the basic-level YAML `allowedEncryptionStatuses` (no colon).
- Corrected from the official docs: the gcloud lines `--basic-level-spec=FILE_NAME.yaml\` and `--custom-level-spec=FILE_NAME.yaml\` (no space before the backslash).
- Corrected from the official docs: the basic request body `"name": ACCESS_LEVEL_NAME,` ... `],` `}` `},` `}` (unquoted values, trailing commas, extra closing braces).
- Corrected from the official docs: the custom request body `"custom": { "conditions": [ { "expr": { CEL_EXPRESSION } } ] }`.
- Corrected from the official docs: the URL `https://accesscontextmanager.googleapis.com/v1/{parent=accessPolicies/POLICY_ID}/accessLevels`.
- Attribute names for custom CEL: https://docs.cloud.google.com/endpoint-verification/docs/device-information. Device policy YAML attributes: https://docs.cloud.google.com/access-context-manager/docs/access-level-attributes#device-policy.
- The source also shows Console steps, PowerShell `Invoke-WebRequest`, and sample JSON responses. Full flag list: https://docs.cloud.google.com/sdk/gcloud/reference/access-context-manager/levels/create.
- Source: https://docs.cloud.google.com/endpoint-verification/docs/creating-device-access-level (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [endpoint-verification-overview.md](./endpoint-verification-overview.md)
- [endpoint-verification-quickstart.md](./endpoint-verification-quickstart.md)
- [access-protection.md](./access-protection.md)
