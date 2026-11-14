---
source: https://developers.cloudflare.com/workers/static-assets/migration-guides/vercel-to-workers/
---

# Migrate from Vercel to Workers

Move an application from Vercel to Cloudflare Workers. Workers runs your framework's server code and serves its static assets from a single Worker. Each framework has its own guide (see Related); this page holds the steps that apply to every framework.

## Signature / Usage

Restore long-lived caching for hashed assets by adding a `_headers` file to your static directory (adjust the path to match your framework's asset directory):

```txt
/assets/*
  Cache-Control: public, max-age=31536000, immutable
```

Copy production environment variables from Vercel to Worker secrets:

```sh
vercel env pull .env.production.local --environment=production
```

```sh
npx wrangler secret bulk .env.production.local
```

Turn on Workers Cache to replace `s-maxage` edge caching (requires Wrangler 4.69.0 or later):

```jsonc
{
	"cache": {
		"enabled": true,
	},
}
```

Return to a previous version of your Worker:

```sh
npx wrangler rollback
```

## Options / Props

Choose your framework:

| Framework | Page | What changes |
| --- | --- | --- |
| Astro | [migrate-from-vercel-astro.md](./migrate-from-vercel-astro.md) | `@astrojs/vercel` is replaced by `@astrojs/cloudflare` |
| Next.js | [migrate-from-vercel-nextjs.md](./migrate-from-vercel-nextjs.md) | vinext runs your Next.js app on Vite and Workers |
| Nuxt | [migrate-from-vercel-nuxt.md](./migrate-from-vercel-nuxt.md) | The Nitro `vercel` preset is replaced by `cloudflare_module` |
| Remix and React Router | [migrate-from-vercel-react-router.md](./migrate-from-vercel-react-router.md) | `@vercel/remix` is replaced by the Cloudflare Vite plugin |
| SvelteKit | [migrate-from-vercel-sveltekit.md](./migrate-from-vercel-sveltekit.md) | `adapter-vercel` is replaced by `adapter-cloudflare` |
| TanStack Start | [migrate-from-vercel-tanstack-start.md](./migrate-from-vercel-tanstack-start.md) | The Nitro Vite plugin is replaced by the Cloudflare Vite plugin |
| Static site or single-page app | [migrate-from-vercel-static-site.md](./migrate-from-vercel-static-site.md) | A Wrangler configuration file points to your build output |

Vercel features and their Cloudflare equivalents:

| Vercel feature | Cloudflare equivalent |
| --- | --- |
| Analytics and Speed Insights | Web Analytics |
| Blob | R2 |
| Cron Jobs | Cron Triggers with a `scheduled()` handler |
| Edge Config | Workers KV |
| Environment variables | Environment variables and secrets |
| Functions, Edge Functions, Middleware | One Worker, built by your framework adapter |
| Git integration and preview URLs | Workers Builds and preview URLs |
| Image Optimization | Images binding or image transformations |
| ISR and `s-maxage` caching | Prerendering, or your framework's Cloudflare cache integration |
| KV and Upstash Redis | Workers KV, or keep Upstash and connect over HTTP |
| Postgres | Keep your database and connect with Hyperdrive, or use D1 |
| Queues | Queues |
| `vercel.json` headers and redirects | Framework configuration, or `_headers` and `_redirects` for static assets |

## Notes

- Before you begin (every framework): install dependencies before you run any migration tool, because automatic project configuration cannot detect your framework without `node_modules`. If you use pnpm 10 or later, allow the `esbuild` and `workerd` build scripts (`pnpm approve-builds --all`, or `allowBuilds` in `pnpm-workspace.yaml`), otherwise installs fail with `ERR_PNPM_IGNORED_BUILDS`. Set the Worker `name` explicitly (migration tools default to the `name` field in `package.json`). Use a compatibility date of `2026-08-04` or later: Node.js compatibility is on by default for these dates, so new configurations do not need `nodejs_compat`. Add `.wrangler/` and `.dev.vars*` to `.gitignore`. If your account has access to more than one Cloudflare account, set `CLOUDFLARE_ACCOUNT_ID` before you deploy.
- Vercel-specific URLs, such as `/_vercel/image` and `/_vercel/insights`, return `404` after you migrate. Update any references to them.
- Environment variables: Vercel does not return the values of sensitive environment variables, so add those to the file manually. Delete `.env.production.local` after the upload. Store non-secret values in `vars` in your Wrangler configuration file and local development secrets in `.dev.vars`. Public build-time variables such as `NEXT_PUBLIC_*`, `VITE_*`, and `PUBLIC_*` must exist when your project builds; with Workers Builds, add them as build variables.
- Hashed assets: Vercel serves hashed build assets with a one-year immutable cache; Workers serves static assets with `max-age=0, must-revalidate` by default. SvelteKit and Nuxt generate a `_headers` file for you. Cloudflare applies every `_headers` rule that matches a path; to replace a header value from a less specific rule, add `! Header-Name` before the new value ([headers.md](./headers.md)).
- ISR and edge caching: on Workers, Workers Cache caches your Worker's responses based on the `Cache-Control` headers they return. It does not serve stale responses that include `s-maxage`, even if they also set `stale-while-revalidate`. When caching is on, all requests to your Worker are billed at the standard request rate, including static asset requests. You can also prerender pages that do not change between deploys, use your framework's Cloudflare cache integration, or use the Cache API.
- Custom domain: Workers Custom Domains only support domains configured as zones on your account. To move a domain without downtime: deploy and test on `workers.dev` while Vercel keeps serving production; lower the DNS TTL; add the domain to Cloudflare as a zone, confirm imported DNS records match your Vercel records, then update nameservers at your registrar; add a custom domain to your Worker (it replaces the existing Vercel DNS record for that hostname and issues a certificate); confirm traffic reaches your Worker, then remove the domain from your Vercel project. Delete the Vercel app after the custom domain sends requests to Workers.
- Troubleshooting: SSR applications usually need the Workers Paid plan, because the Free plan allows 10 ms of CPU time per request. Native Node.js modules such as `sharp` and `canvas` do not run on Workers, and runtime file system writes fail. On a `workers.dev` URL, Cloudflare serves a managed `robots.txt` file if your application does not provide one.
- Superseded wording: the 2026-11-03 snapshot of this guide was a static-site walkthrough (Wrangler configuration with `assets.directory`); that content now lives in [migrate-from-vercel-static-site.md](./migrate-from-vercel-static-site.md).
- Source: https://developers.cloudflare.com/workers/static-assets/migration-guides/vercel-to-workers/ (cloudflare-docs production 34d908a, fetched 2026-11-14)

## Related

- [migrate-from-vercel-static-site.md](./migrate-from-vercel-static-site.md)
- [migrate-from-pages.md](./migrate-from-pages.md)
- [migrate-from-netlify.md](./migrate-from-netlify.md)
- [headers.md](./headers.md)
