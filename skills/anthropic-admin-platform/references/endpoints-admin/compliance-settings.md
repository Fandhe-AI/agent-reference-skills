<!-- source: https://platform.claude.com/docs/en/api/organization/compliance_settings / last verified: 2026-10-17 -->

# Compliance Settings Admin API

Get and update the organization's Compliance Settings, a singleton resource (exactly one per organization, addressed without an identifier). `state` reflects whether the Compliance API is enabled.

## Signature / Usage

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v1/organizations/compliance_settings` | Get Compliance Settings |
| POST | `/v1/organizations/compliance_settings` | Update Compliance Settings |

```bash
curl https://api.anthropic.com/v1/organizations/compliance_settings \
    -H 'Content-Type: application/json' \
    -H 'anthropic-version: 2023-06-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY" \
    -d '{
          "state": {
            "type": "enabled"
          }
        }'
```

Response (200):

```json
{
  "state": {
    "type": "enabled"
  },
  "type": "compliance_settings"
}
```

## Options / Props

### Headers

| Name | Type | Description |
|------|------|-------------|
| anthropic-version | optional string | Claude API version |

### Body Parameters (Update)

| Name | Type | Description |
|------|------|-------------|
| state | `{ type: "enabled" }` or `{ type: "disabled" }` | Desired state. Accepts the string shorthand `"enabled"` / `"disabled"` in place of the object form; the response always returns the canonical object form |

### OrganizationComplianceSettings object

| Name | Type | Description |
|------|------|-------------|
| type | `"compliance_settings"` | Object type |
| state | `ComplianceSettingsState` | `{ type: "enabled" }` or `{ type: "disabled" }`: whether the Compliance API is enabled for this organization |

## Notes

- `GET`: an organization with a parent organization reads the state inherited from the parent's configuration.
- Setting `state` to `enabled` turns on the Compliance API and begins capturing organization activity events. Setting it to `disabled` turns both off.
- A request that sets `state` to its current value succeeds and leaves the resource unchanged.
- A `disabled` request stays in effect until a later `enabled` request or the organization's next provisioning action that enables Access Transparency (which also enables the Compliance API); such provisioning, including re-runs, re-enables it even after a `disabled` request. Automated provisioning never disables compliance settings.

## Related

- [organizations.md](./organizations.md)
