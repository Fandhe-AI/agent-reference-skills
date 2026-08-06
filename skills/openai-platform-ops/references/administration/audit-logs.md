# Audit Logs

Retrieve recent user actions and configuration changes for the organization (invitations, key creation, role changes, project settings, and more) via the Administration API.

## Signature / Usage

```python
audit_logs = client.admin.organization.audit_logs.list(limit=10)

for audit_log in audit_logs.data:
    print(audit_log.id)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| limit | integer | Maximum number of audit log entries to return |

## Notes

- Requires an Admin API key.
- Full endpoint reference (Audit Logs subresource): [Administration API reference](https://developers.openai.com/api/reference/administration/overview).

## Related

- [Admin API Keys](./admin-api-keys.md)
- [Usage and Costs API](./usage-and-costs-api.md)
