---
source: https://developers.cloudflare.com/workers/configuration/compatibility-flags/
---

# Compatibility flags

Compatibility flags enable or disable specific runtime changes. Many have a default-enable date, so setting a `compatibility_date` enables every such flag up to and including that date. Flags can also be set explicitly to test upcoming changes or to hold back a change.

## Signature / Usage

```jsonc
{
	// Opt into backwards-incompatible changes through September 14, 2021.
	"compatibility_date": "2021-09-14",
	// Also opt into an upcoming fix to the FormData API.
	"compatibility_flags": [
		"formdata_parser_supports_files"
	]
}
```

```toml
compatibility_date = "2021-09-14"
compatibility_flags = [ "formdata_parser_supports_files" ]
```

Configuration file keys: see the cloudflare-wrangler skill.

## Notes

- Flags are set in the Wrangler configuration file, the Workers settings in the dashboard, or via the Workers Script API / Workers Versions API (`metadata` field of the request body).
- `compatibility_flags` can also disable changes that became default in the past (use the "Flag to disable" name).
- The full flag history (newest first) is split across three pages by area: Node.js flags, web platform flags, and platform/product flags (see Related).

### Node.js compatibility flag

- `nodejs_compat` also enables `nodejs_compat_v2` for compatibility dates from `2024-09-23` through `2026-08-03`. v2 bundles additional polyfills and globals, which increases bundle size.
- For dates through `2024-09-22`, add `nodejs_compat_v2` alongside `nodejs_compat` to turn on v2. For dates from `2024-09-23` through `2026-08-03`, add `no_nodejs_compat_v2` alongside `nodejs_compat` to use v1 only.
- For dates of `2026-08-04` or later, Workers and Pages projects enable both `nodejs_compat` and `nodejs_compat_v2` by default; the flags are not used for these dates. Wrangler, Miniflare, the Cloudflare Vite plugin, and the Workers Vitest plugin ignore these redundant flags. Existing projects need not remove them; omit them from new configurations.
- If the date is before `2026-08-04`, add `nodejs_compat` to opt in:

```jsonc
{
	"compatibility_flags": [
		"nodejs_compat"
	]
}
```

```toml
compatibility_flags = [ "nodejs_compat" ]
```

- To turn Node.js compatibility off completely for a date of `2026-08-04` or later, remove `nodejs_compat` and `nodejs_compat_v2` if present, then add both of the following:

```jsonc
{
	"compatibility_flags": [
		"no_nodejs_compat",
		"no_nodejs_compat_v2"
	]
}
```

```toml
compatibility_flags = [ "no_nodejs_compat", "no_nodejs_compat_v2" ]
```

- To enable only the Node.js `AsyncLocalStorage` API, use `nodejs_als`:

```jsonc
{
	"compatibility_flags": [
		"nodejs_als"
	]
}
```

```toml
compatibility_flags = [ "nodejs_als" ]
```

### Experimental flags

These flags can be enabled via `compatibility_flags` but are not scheduled to become default on any particular date. The source page lists two: `queue_consumer_no_wait_for_wait_until` and `html_rewriter_treats_esi_include_as_void_tag` (both also appear in the flag history; see the platform and web platform pages).

### Source inconsistencies

- `queue_consumer_no_wait_for_wait_until` and `html_rewriter_treats_esi_include_as_void_tag` appear twice on the source page (flag history and "Experimental flags").
- A few entries are out of newest-first order on the source page (for example `request_cf_overrides_cache_rules`, default `2025-04-02`, and `queue_expose_error_codes`, default `2026-03-12`). The group pages here keep one row per flag and note dates exactly as written.

## Related

- [Node.js flags](./compatibility-flags-nodejs.md)
- [Web platform flags](./compatibility-flags-web-platform.md)
- [Platform and product flags](./compatibility-flags-platform.md)
- [Compatibility dates](./compatibility-dates.md)
- [Node.js compatibility](../nodejs-compat/README.md)
