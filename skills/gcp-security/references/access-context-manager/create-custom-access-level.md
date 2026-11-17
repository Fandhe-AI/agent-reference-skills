---
source: https://docs.cloud.google.com/access-context-manager/docs/create-custom-access-level
---

# Creating a custom access level

Custom access levels use boolean expressions in a subset of Common Expression Language (CEL) over request attributes such as originating network project, IP address, identity, and device data from third-party security services. Create one with the console (Advanced Mode), `gcloud`, REST, or RPC. An access policy must already exist.

## Signature / Usage

### gcloud

```bash
gcloud access-context-manager levels create LEVEL_NAME \
--title=TITLE \
--custom-level-spec=FILE \
--description=DESCRIPTION \
--policy=POLICY_NAME
```

`FILE` is a YAML file with a single key-value pair, `expression: "CEL_EXPRESSION"`, where the value is a string resolving to a single boolean.

```yaml
expression: "device.encryption_status == DeviceEncryptionStatus.ENCRYPTED && (origin.region_code in ['US'] || device.is_admin_approved_device)"
```

```bash
gcloud access-context-manager levels create Custom_Trust \
    --custom-level-spec=customspec.yaml \
    --description="Custom access level for corp." \
    --title="Custom Trust Level" \
    --policy=1521580097614100
```

### REST

Call `accessPolicies.accessLevels.create`. The request body has this shape:

Adapted (not in the official docs): the schema sketch is tagged `text` instead of `json`, because `string` placeholders are not valid JSON.

```text
{
  "name": string,
  "title": string,
  "description": string,
  "custom": {
    "expr": {
      "expression": string,
      "title": string,
      "description": string
    }
  }
}
```

```json
{
  "name": "example_custom_level",
  "title": "Example custom level",
  "description": "An example custom access level.",
  "custom":  {
    "expr": {
      "expression": "device.is_corp_owned == true || (device.os_type != OsType.OS_UNSPECIFIED && device.is_admin_approved_device == true)",
      "title": "Check for known devices",
      "description": "Permits requests from corp-owned devices and admin-approved devices with a known OS."
    }
  }
}
```

### Example expressions

Allow requests originating from specific projects and their tenant projects:

```text
originatesFromProjects(origin, ["projects/123456789"])
```

Restrict a workload identity to networks of the project that owns it (no project numbers needed, so the level is reusable across projects):

```text
request.auth.matchesNetworkProject(origin)
```

## Options / Props

### `AccessLevel` fields (RPC)

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Required. `accessPolicies/policy_id/accessLevels/short_name`; `short_name` begins with a letter and has only letters, numbers and underscores |
| `title` | string | Human-readable label; access levels must have unique names |
| `description` | string | Description |
| `custom` | string (see Notes) | CEL expressions; the complete expression must resolve to a boolean |

### Limits

| Item | Rule |
|------|------|
| `LEVEL_NAME` | Begins with a letter; letters, numbers, underscores; maximum 50 characters |
| Console title | At most 50 characters, starts with a letter; numbers, letters, underscores and spaces |
| `expression` in `custom-level-spec` | Must be a string |
| `title` / `description` in `expr` | Optional |

## Notes

- Using device attributes in custom access level expressions requires a paid subscription (Chrome Enterprise Premium).
- After creation, manage a custom level the same way as a basic access level.
- Project-based restrictions help secure workload identities: service accounts, Workload Identity Federation identities, managed workload identities and agent identities.
- Source inconsistency: the RPC field table lists `custom` as type string, while the REST request body puts an object with `expr` under `custom`.
- Corrected from the official docs: the request-body schema sketch (`"name": string,` and so on) is in a `json` block.
- The source also shows Console steps (Advanced Mode) and refers to the custom access level specification for CEL details.
- Source: https://docs.cloud.google.com/access-context-manager/docs/create-custom-access-level (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-basic-access-level.md](./create-basic-access-level.md)
- [access-level-attributes.md](./access-level-attributes.md)
- [overview.md](./overview.md)
