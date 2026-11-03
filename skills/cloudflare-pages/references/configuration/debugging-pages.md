---
source: https://developers.cloudflare.com/pages/configuration/debugging-pages/
---

# Debugging Pages

Troubleshoot Pages build errors, custom domain differences and domain verification problems.

## Signature / Usage

Open the build log: **Workers & Pages** > Pages project > **Deployments** > **View details** > **Build log**. Check whether another Cloudflare product is blocking HTTP validation of a custom domain:

```sh
curl -s -o /dev/null -D - https://example.com/.well-known/acme-challenge/randomstring
```

Check CAA records on the apex:

```sh
dig CAA example.com
```

A valid `.gitmodules` entry needs both `path` and `url`:

```ini
[submodule "example"]
	path = example/path
	url = git://github.com/example/repo.git
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Initializing build environment | build log step | — | Errors usually come from a broken Git integration; uninstall and re-authorize the app. GitLab needs the **Maintainer** role or above. |
| Cloning git repository | build log step | — | Check Git LFS usage and that every `.gitmodules` entry has `path` and `url`. |
| Building application | build log step | — | Review build command, output folder, environment variables; avoid emojis or special characters in commit messages. |
| Deploying to Cloudflare's global network | build log step | — | Check Pages Functions configuration, then the Cloudflare Status site. |

## Notes

- Cloudflare's Pages landing page says "Start new projects with Workers" (Workers + static assets supports most Pages use cases); see the cloudflare-workers skill (static-assets/migrate-from-pages).
- Custom domain behaves differently from `pages.dev`: if proxied (orange cloud), zone settings such as caching apply. Remove a Page Rule with **Cache Everything** (Pages handles its own cache). If errors appear only on the custom domain, set its DNS record to **DNS Only** (grey cloud) to test.
- Domain stuck in **Verifying**: Pages uses HTTP validation, so Access, redirects, Workers, WAF custom rules or Client-Side Security rules in front of `/.well-known/acme-challenge/*` block it (the source sample shows a `302` to Cloudflare Access; disable Access until verified). Missing CAA records are likely with Universal SSL disabled or an external provider; add the six CAA records listed in the Custom domains page. A zone hold also blocks adding the domain; release it temporarily.
- If the domain still verifies after 15 minutes, contact support or Discord.
- A `404` on the root `pages.dev` URL usually means a missing `index.html`.
- Sample `dig` and `curl` outputs in the source are illustrative and omitted here.

## Related

- [Custom domains](./custom-domains.md)
- [Git integration troubleshooting](./git-integration-troubleshooting.md)
- [Build configuration](./build-configuration.md)
