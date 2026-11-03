---
source: https://developers.cloudflare.com/ai-gateway/reference/audit-logs/
---

# Audit logs

Account audit logs record gateway configuration changes (create, delete, update). Free on all plans and enabled by default.

## Signature / Usage

Example entry for a gateway creation (the `<ACTOR_EMAIL>` placeholder is from the source):

```json
{
 "action": {
     "info": "gateway created",
     "result": true,
     "type": "create"
 },
 "actor": {
     "email": "<ACTOR_EMAIL>",
     "id": "3f7b730e625b975bc1231234cfbec091",
     "ip": "fe32:43ed:12b5:526::1d2:13",
     "type": "user"
 },
 "id": "5eaeb6be-1234-406a-87ab-1971adc1234c",
 "interface": "UI",
 "metadata": {},
 "newValue": "",
 "newValueJson": {
     "cache_invalidate_on_update": false,
     "cache_ttl": 0,
     "collect_logs": true,
     "id": "test",
     "rate_limiting_interval": 0,
     "rate_limiting_limit": 0,
     "rate_limiting_technique": "fixed"
 },
 "oldValue": "",
 "oldValueJson": {},
 "owner": {
     "id": "1234d848c0b9e484dfc37ec392b5fa8a"
 },
 "resource": {
     "id": "89303df8-1234-4cfa-a0f8-0bd848e831ca",
     "type": "ai_gateway.gateway"
 },
 "when": "2024-07-17T14:06:11.425Z"
}
```

## Options / Props

| Operation | Description |
|-----------|-------------|
| gateway created | Creation of a new gateway |
| gateway deleted | Deletion of an existing gateway |
| gateway updated | Edit of an existing gateway |

## Notes

- View in the dashboard under **Audit logs**. Resource type is `ai_gateway.gateway`.
- Details of audit-log access: https://developers.cloudflare.com/fundamentals/account/account-security/review-audit-logs/.

## Related

- [configuration-manage-gateway.md](./configuration-manage-gateway.md)
- [observability-logging.md](./observability-logging.md)
