---
source: https://developers.cloudflare.com/workers/configuration/
---

# Configuration overview

Worker configuration defines project settings, bindings, and deployment options. Use `cloudflare.config.ts` (programmatic configuration, open beta) for typed configuration, or a Wrangler configuration file with Wrangler and supported build tools.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/workers/configuration/compatibility-dates/#via-wrangler.

```jsonc
{
	// Opt into backwards-incompatible changes through April 5, 2022.
	"compatibility_date": "2022-04-05"
}
```

Configuration file keys: see the cloudflare-wrangler skill.

## Notes

- Sections under Workers configuration: programmatic configuration (`cloudflare.config.ts`), bindings, Cloudflare Access, compatibility dates, compatibility flags, Cron Triggers, environment variables, integrations, multipart upload metadata, Page Rules, placement, routes and domains, secrets, Workers Sites.
- Environment variables and secrets are covered in the bindings-rpc category; bindings in general are also in bindings-rpc.
- Programmatic configuration reference: https://developers.cloudflare.com/cf/projects/cloudflare-config/ (not part of this category).

## Related

- [Compatibility dates](./compatibility-dates.md)
- [Compatibility flags](./compatibility-flags.md)
- [Cron Triggers](./cron-triggers.md)
- [Routes and domains](./routing-overview.md)
- [Placement](./placement.md)
- [Cloudflare Access](./cloudflare-access.md)
- [Integrations](./integrations.md)
- [Multipart upload metadata](./multipart-upload-metadata.md)
- [Page Rules](./workers-with-page-rules.md)
- [Workers Sites (legacy)](./workers-sites.md)
- [Bindings, secrets and environment variables](../bindings-rpc/README.md)
