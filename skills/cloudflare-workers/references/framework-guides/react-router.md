---
source: https://developers.cloudflare.com/workers/framework-guides/web-apps/react-router/
---

# React Router (formerly Remix)

Full-stack React Router v8 on Workers via the Cloudflare Vite plugin.

## Signature / Usage

```sh
npm create cloudflare@latest -- my-react-router-app --framework=react-router
```

Generated configuration for an existing project (`wrangler deploy` autoconfig): `main` `build/server/index.js`, `assets.directory` `build/client`, `observability.enabled` true.

Project layout: `app/routes/`, `app/entry.server.ts`, `app/root.tsx`, `app/routes.ts`, `workers/app.ts`, `react-router.config.ts` (`ssr: true`), `vite.config.ts` (React Router and Cloudflare plugins in `plugins`), `wrangler.jsonc` (`main` is `./workers/app.ts`, whose default export `fetch` handler delegates to React Router).

Bindings are available in `context.cloudflare` in loader / action:

```ts
export function loader({ context }: Route.LoaderArgs) {
	return { message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE };
}

export default function Home({ loaderData }: Route.ComponentProps) {
	return <Welcome message={loaderData.message} />;
}
```

Entry file `workers/app.ts` wiring (shown in the official Workflows example):

```ts
const requestHandler = createRequestHandler(
	() => import("virtual:react-router/server-build"),
	import.meta.env.MODE
);

export default {
	async fetch(request, env, ctx) {
		return requestHandler(request, {
			cloudflare: { env, ctx },
		});
	},
} satisfies ExportedHandler<CloudflareEnvironment>;
```

Dev and deploy: `npm run dev`, `npm run deploy`.

## Notes

- SPA mode is not currently supported with the Cloudflare Vite plugin. Prerendering is supported in React Router v8; on React Router v7, prerendering requires version 7.13.1 or later with the `future.unstable_previewServerPrerendering` flag. For an SPA, start from the React template ([react-vite.md](./react-vite.md)) and use React Router as a library.
- Because you own the Worker entry file, you can add extra exports such as Durable Objects and Workflows there.
- React Router APIs: see the react-router skill.
- Vite config: see the vite skill; the Cloudflare Vite plugin itself is covered by cloudflare-wrangler.

- Node.js compatibility: for compatibility dates before `2026-08-04`, automatic configuration also adds the `nodejs_compat` compatibility flag; the generated configuration for newer dates omits it (the official framework guide tables no longer list `compatibility_flags`).
- For Remix 3 applications see [remix.md](./remix.md); for Remix v2 applications use this React Router guide. To move an existing Remix or React Router project from Vercel see [migrate-from-vercel-react-router.md](../static-assets/migrate-from-vercel-react-router.md).
- Source: https://developers.cloudflare.com/workers/framework-guides/web-apps/react-router/ (cloudflare-docs production 34d908a, fetched 2026-11-14)

## Related

- [overview.md](./overview.md)
- [react-vite.md](./react-vite.md)
