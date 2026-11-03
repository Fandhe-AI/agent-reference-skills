---
source: https://developers.cloudflare.com/workers/wrangler/configuration/#source-of-truth
---

# Source of Truth

Treat the Wrangler configuration file as the source of truth for Worker configuration and avoid making dashboard changes when using Wrangler.

## Signature / Usage

```jsonc
{
	"keep_vars": true,
}
```

```toml
keep_vars = true
```

## Notes

- If you must change a Worker in the dashboard, the dashboard generates a TOML snippet to copy into your configuration file.
- Dashboard changes to environment variables are overridden by Wrangler on the next deploy. Add `keep_vars = true` to disable this.
- Dashboard route changes are overridden by routes in the configuration file on the next deploy. To manage routes only via the dashboard, remove any `route` and `routes` keys and add `workers_dev = false`.
- Wrangler will not delete secrets unless you run `wrangler secret delete <key>`.
- `keep_vars` is a top-level only key.

## Related

- [top-level-keys.md](./top-level-keys.md)
- [routes.md](./routes.md)
- [deprecations.md](./deprecations.md)
