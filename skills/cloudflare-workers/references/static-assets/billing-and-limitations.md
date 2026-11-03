---
source: https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/
---

# Billing and Limitations

How requests to a Worker with static assets are billed, plus limits and troubleshooting.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/workers/static-assets/binding/#run_worker_first (relevant to the free-tier 429 note below).

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "my-worker",
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"main": "src/index.ts",
	"upload_source_maps": true,
	// The following configuration unconditionally invokes the Worker script at
	// `src/index.ts`, which can programmatically fetch assets via the ASSETS binding
	"assets": {
		"directory": "./public/",
		"binding": "ASSETS",
		"run_worker_first": true,
	},
}
```

## Notes

- Requests are billed depending on whether they match a static asset or invoke the Worker script.
- Requests to static assets are free and unlimited. Requests to the Worker script (for example SSR) are billed per Workers pricing. There is no additional cost for storing assets.
- Free tier: with `run_worker_first`, requests matching the patterns always invoke the Worker. If you exceed free tier request limits, those requests receive a `429 (Too Many Requests)` instead of falling back to assets. Negative patterns (beginning with `!/`) continue to serve assets since the Worker is not invoked.
- Limits: see https://developers.cloudflare.com/workers/platform/limits/#static-assets.
- Troubleshooting: `assets.bucket is a required field` means Wrangler must be updated to at least `3.78.10`; `bucket` is not a required field.

## Related

- [Configuration and Bindings](./binding.md)
- [Routing: Worker script](./routing-worker-script.md)
