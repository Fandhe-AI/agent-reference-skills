---
source: https://developers.cloudflare.com/workers/local-development/
---

# Remote Bindings in Local Development

Run the Worker locally but connect selected bindings to real resources, per environment.

```jsonc
{
	"name": "my-worker",
	// Set this to today's date
	"compatibility_date": "2026-11-03",

	"env": {
		"production": {
			"r2_buckets": [
				{
					"bucket_name": "screenshots-bucket",
					"binding": "screenshots_bucket",
				},
			],
		},
		"staging": {
			"r2_buckets": [
				{
					"bucket_name": "preview-screenshots-bucket",
					"binding": "screenshots_bucket",
					"remote": true,
				},
			],
		},
	},
}
```

```sh
npx wrangler dev -e staging
CLOUDFLARE_ENV=staging vite dev
```

## Notes

- Worker code still runs locally; only bindings with `remote: true` hit deployed resources. `wrangler dev --local` disables all remote bindings.
- Writes affect real data and incur billing; use a staging resource as above.
- Not supported remotely: Durable Objects, Workflows, `vars`, secrets, Static Assets, Version Metadata, Hyperdrive, Rate Limiting (an error is raised). Workers AI has no local simulation.
- Populate local (non-remote) resources with `--local`, for example `npx wrangler d1 execute <DATABASE_NAME> --file=./schema.sql --local`; data lives in `.wrangler/state`.
- See [../references/local-development/README.md](../references/local-development/README.md).
