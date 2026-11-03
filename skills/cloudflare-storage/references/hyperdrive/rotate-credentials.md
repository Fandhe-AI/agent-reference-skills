---
source: https://developers.cloudflare.com/hyperdrive/configuration/rotate-credentials/
---

# Rotating database credentials

Rotate credentials by creating a new Hyperdrive configuration or by updating the existing one.

## Signature / Usage

New configuration:

```sh
# wrangler v3.11 and above required
npx wrangler hyperdrive create my-updated-hyperdrive --connection-string="<YOUR_CONNECTION_STRING>"
```

Update in place:

```sh
# wrangler v3.11 and above required
npx wrangler hyperdrive update <HYPERDRIVE_CONFIG_ID> --origin-host <YOUR_ORIGIN_HOST> --origin-password <YOUR_ORIGIN_PASSWORD> --origin-user <YOUR_ORIGIN_USERNAME> --database <YOUR_DATABASE> --origin-port <YOUR_ORIGIN_PORT>
```

Set the new ID in the Worker:

```jsonc
{
	// required for database drivers to function
	"compatibility_flags": [
		"nodejs_compat"
	],
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"hyperdrive": [
		{
			"binding": "HYPERDRIVE",
			"id": "<your-hyperdrive-id-here>"
		}
	]
}
```

## Notes

- A new configuration lets you migrate gradually (redeploy or use gradual deployments) and roll back easily.
- Updating an existing configuration does not purge Hyperdrive's cache and does not tear down the existing pool; new connections use the new information. To drain the pool immediately, restart the connection pool (see [connection-pooling](./connection-pooling.md)).
- Gradual deployments: see the cloudflare-workers skill.

## Related

- [Wrangler commands](./wrangler-commands.md)
- [Connection pooling](./connection-pooling.md)
