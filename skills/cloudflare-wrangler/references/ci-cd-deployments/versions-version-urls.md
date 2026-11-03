---
source: https://developers.cloudflare.com/workers/versions-and-deployments/version-urls/
---

# Version URLs

Version URLs (previously called preview URLs) give access to an uploaded Worker version before deploying it, using that version's existing configuration and resources.

## Signature / Usage

```sh
npx wrangler versions upload
```

```sh
npx wrangler versions upload --preview-alias staging
```

Enable or disable in the Wrangler config (the field is still named `preview_urls`):

```jsonc
{
  "preview_urls": true
}
```

```toml
preview_urls = true
```

## Options / Props

URL formats:

| Kind | Format |
| --- | --- |
| Version URL | `<version-prefix>-<worker-name>.<subdomain>.workers.dev` |
| Aliased Version URL | `<alias>-<worker-name>.<subdomain>.workers.dev` |

Alias limits:

| Rule | Detail |
| --- | --- |
| When | Only at version upload |
| Characters | Lowercase letters, numbers, dashes; must begin with a lowercase letter |
| Length | Alias + dash + Worker name must not exceed 63 characters |
| Retention | Only the 1000 most recently deployed aliases are kept |

## Notes

- Created whenever a version is created (`wrangler deploy`, `wrangler versions upload`, dashboard saves). If enabled, the URL is public. Find them in **Deployments** or in `versions upload` output.
- Default follows `workers_dev`: enabled if `workers_dev` is on, otherwise off; disabling stops routing to Version URLs and aliases. Dashboard: **Settings** > **Domains & Routes** > **Version URLs**. If `preview_urls` is omitted, Wrangler leaves the existing setting unchanged.
- Protect with Cloudflare Access (one Worker or the whole account).
- Not generated for Workers that implement Durable Objects (including Containers and Sandbox) or for Workers for Platforms user Workers; subdomain must be `workers.dev`; logs not available via Workers Logs, `wrangler tail`, or Logpush.
- For branch or PR testing use Previews instead; to test with your zone's performance/security settings use version overrides.

## Related

- [previews-compare-workflows.md](./previews-compare-workflows.md)
- [versions-version-overrides.md](./versions-version-overrides.md)
- [versions-overview.md](./versions-overview.md)
