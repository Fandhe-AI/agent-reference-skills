---
source: https://developers.cloudflare.com/workers/static-assets/migration-guides/vercel-to-workers/nextjs/
---

# Migrate Next.js from Vercel (vinext)

Move a Next.js application from Vercel to Cloudflare Workers with vinext, which reimplements the Next.js API on Vite and deploys to Workers. Your `app/`, `pages/`, `next.config.*`, and `public/` directories stay the same, and `next dev` and `next build` keep working after the migration.

## Signature / Usage

Check that your application is compatible with vinext:

```sh
npx vinext check
```

Initialize vinext with the cache and image options your application needs. All three options are required when you run `vinext init` without an interactive terminal:

```sh
npx vinext init --platform=cloudflare --name <YOUR_WORKER_NAME> --cdn-cache=none --data-cache=none --image-optimization=none
```

Read bindings in Server Components, Route Handlers, and Server Actions after declaring them in `cloudflare.config.ts`:

```ts
import { env } from "cloudflare:workers";
```

Start the development server, build, run the built Worker locally, then log in and deploy:

```sh
npm run dev:vinext
npm run build:vinext
npm run start:vinext
npx cf auth login
npx @vinext/cloudflare deploy
```

## Options / Props

| Your application uses | Option |
| --- | --- |
| ISR, `revalidatePath`, `revalidateTag`, or `"use cache"` | `--cdn-cache=response-store --response-store-mode=self-contained` |
| `next/image` with raster or remote images | `--image-optimization=cloudflare-images` |

| Feature | Behavior on vinext |
| --- | --- |
| ISR, `revalidatePath`, and `revalidateTag` | Supported. Choose a persistent cache when you run `vinext init`. The default cache is in memory. |
| `next/font/google` | Supported. Fonts are downloaded at build time and served from your Worker. |
| `next/image` | Without an optimizer, `next/image` renders the original file URL, and `/_next/image` returns `400`. |
| `runtime` and `preferredRegion` route options | Ignored. Every route runs on Workers. |
| `vercel.json` | Not read. Move its rules into `next.config`. |
| `@vercel/kv`, `@vercel/blob`, `@vercel/postgres` | Not supported. Use Workers KV, R2, and Hyperdrive or D1. |

## Notes

- vinext aims to support Next.js 14 and later; Partial Prerendering support is in progress. vinext uses `cloudflare.config.ts` instead of a Wrangler configuration file and deploys with the `cf` CLI; the Worker name is `worker.name` in that file.
- Run `vinext init` directly instead of `wrangler setup`: automatic project configuration with Wrangler configures OpenNext, not vinext ([../framework-guides/automatic-configuration.md](../framework-guides/automatic-configuration.md)).
- Workers Response Store caches both rendered responses and data, so keep `--data-cache=none` when you use it. In self-contained mode, your application Worker owns the R2 bucket and Durable Object that the cache uses; to run the cache in a separate Worker use `--response-store-mode=service-binding` and deploy the cache Worker with the `deploy:response-store` script first.
- `vinext init` adds dependencies, `vite.config.ts`, `cloudflare.config.ts`, and the `dev:vinext`, `build:vinext`, `start:vinext`, and `deploy:vinext` scripts, and can upgrade `react` and `react-dom`. You do not need `nodejs_compat` in `compatibilityFlags`; if init adds it you can remove it.
- Add `.cloudflare/types` to the `include` array in `tsconfig.json` and add `.cloudflare/**`, `.vinext/**`, and `dist/**` to your ESLint ignores.
- Troubleshooting: `vinext init` exits with `vinext init needs Cloudflare cache and image choices` without a terminal (pass `--cdn-cache`, `--data-cache`, `--image-optimization`); pass `--name` or edit `worker.name` if the Worker has the wrong name; set `CLOUDFLARE_ACCOUNT_ID` or `accountId` in `cloudflare.config.ts` if deploy prompts for an account.
- The official page also provides a prompt for a coding agent and mentions the `migrate-to-vinext` agent skill (`npx skills add cloudflare/vinext`); see the source. Shared steps: [migrate-from-vercel.md](./migrate-from-vercel.md).
- Source: https://developers.cloudflare.com/workers/static-assets/migration-guides/vercel-to-workers/nextjs/ (cloudflare-docs production 34d908a, fetched 2026-11-14)

## Related

- [migrate-from-vercel.md](./migrate-from-vercel.md)
- [../framework-guides/nextjs-vinext.md](../framework-guides/nextjs-vinext.md)
