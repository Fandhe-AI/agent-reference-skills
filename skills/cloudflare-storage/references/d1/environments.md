---
source: https://developers.cloudflare.com/d1/configuration/environments/
---

# Environments

Specify different D1 databases for different Wrangler environments (for example staging and production) under `env.<name>.d1_databases`.

## Signature / Usage

```jsonc
{
	"env": {
		// This is a staging environment
		"staging": {
			"d1_databases": [
				{
					"binding": "<BINDING_NAME_1>",
					"database_name": "<DATABASE_NAME_1>",
					"database_id": "<UUID1>"
				}
			]
		},
		// This is a production environment
		"production": {
			"d1_databases": [
				{
					"binding": "<BINDING_NAME_2>",
					"database_name": "<DATABASE_NAME_2>",
					"database_id": "<UUID2>"
				}
			]
		}
	}
}
```

TOML equivalent:

```toml
[[env.staging.d1_databases]]
binding = "<BINDING_NAME_1>"
database_name = "<DATABASE_NAME_1>"
database_id = "<UUID1>"

[[env.production.d1_databases]]
binding = "<BINDING_NAME_2>"
database_name = "<DATABASE_NAME_2>"
database_id = "<UUID2>"
```

## Notes

- `[[env.production.d1_databases]]` creates an object `production` under `env` with a `d1_databases` array (one object per D1 binding when you have more than one database); each `<key> = <value>` line below it is a property of an object in that array.
- In the example, `staging` uses `DATABASE_NAME_1` and `production` uses `DATABASE_NAME_2`.
- Wrangler environments in general are covered by the cloudflare-wrangler skill.

## Related

- [Getting started](./get-started.md)
- [Data location](./data-location.md)
- [Migrations](./migrations.md)
