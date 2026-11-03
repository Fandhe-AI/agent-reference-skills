---
source: https://developers.cloudflare.com/d1/observability/audit-logs/
---

# Audit Logs

Audit logs summarize configuration changes made to D1 databases. Available on all plans, free of charge, and always enabled. View them on the dashboard Audit Logs page.

## Signature / Usage

Example entry for database creation:

```json
{
	"action": { "info": "CreateDatabase", "result": true, "type": "create" },
	"actor": {
		"email": "<ACTOR_EMAIL>",
		"id": "b1ab1021a61b1b12612a51b128baa172",
		"ip": "1b11:a1b2:12b1:12a::11a:1b",
		"type": "user"
	},
	"id": "a123b12a-ab11-1212-ab1a-a1aa11a11abb",
	"interface": "API",
	"metadata": {},
	"newValue": "",
	"newValueJson": { "database_name": "my-db" },
	"oldValue": "",
	"oldValueJson": {},
	"owner": { "id": "211b1a74121aa32a19121a88a712aa12" },
	"resource": {
		"id": "11a21122-1a11-12bb-11ab-1aa2aa1ab12a",
		"type": "d1.database"
	},
	"when": "2024-08-09T04:53:55.752Z"
}
```

## Options / Props

Logged operations:

| Operation | Description |
| --- | --- |
| `CreateDatabase` | Creation of a new database. |
| `DeleteDatabase` | Deletion of an existing database. |
| `TimeTravel` | Restoration of a past database version. |

## Related

- [Time Travel and backups](./time-travel.md)
- [Billing](./billing.md)
