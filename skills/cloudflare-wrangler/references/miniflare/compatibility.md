---
source: https://developers.cloudflare.com/workers/testing/miniflare/core/compatibility/
---

# Compatibility Dates (Miniflare)

Miniflare uses compatibility dates and flags to opt into backwards-incompatible runtime changes.

## Signature / Usage

```js
const mf = new Miniflare({
	compatibilityDate: "2021-11-12",
});
```

```js
const mf = new Miniflare({
	compatibilityFlags: [
		"formdata_parser_supports_files",
		"durable_object_fetch_allows_relative_url",
	],
});
```

## Notes

- If no date is set, it defaults to some time far in the past.
- Reference: https://developers.cloudflare.com/workers/configuration/compatibility-dates

## Related

- [get-started.md](./get-started.md)
- [modules.md](./modules.md)
