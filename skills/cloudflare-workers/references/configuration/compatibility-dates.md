---
source: https://developers.cloudflare.com/workers/configuration/compatibility-dates/
---

# Compatibility dates

The `compatibility_date` opts a Worker into runtime behavior changes (bug fixes and spec-compliance changes) up to and including that date. Compatibility flags with a default-enable date are turned on automatically for any `compatibility_date` on or after that date.

## Signature / Usage

```jsonc
{
	// Opt into backwards-incompatible changes through April 5, 2022.
	"compatibility_date": "2022-04-05"
}
```

```toml
compatibility_date = "2022-04-05"
```

Configuration file keys: see the cloudflare-wrangler skill.

## Notes

- Cloudflare updates the Workers runtime globally; updates must never break an already deployed Worker. Backwards-incompatible fixes are opt-in via the compatibility date and flags, so existing Workers keep seeing the old behavior.
- When starting a project, set `compatibility_date` to the current date. Update it occasionally; when updating, read the compatibility flags page to see what changed and test the Worker. The new date takes effect on the next `npx wrangler deploy`.
- Updating is optional: the runtime supports old compatibility dates forever. If Cloudflare must make a change that breaks live Workers, it will contact affected developers.
- Reasons to stay current: some new features are only available to Workers with a current date; and, apart from the compatibility flags page, the docs may describe only the current `compatibility_date` and omit historical behavior.
- Dashboard: a Worker created in the dashboard gets the current date automatically; it can be updated in the Worker's settings.
- API: set it in the `metadata` field of the request body of the Workers Script API or Workers Versions API. If not specified on upload via the API, it defaults to the oldest compatibility date, before any flags took effect (`2021-11-02`). Setting the current date is highly recommended when creating new Workers via the API.

## Related

- [Compatibility flags](./compatibility-flags.md)
- [Multipart upload metadata](./multipart-upload-metadata.md)
