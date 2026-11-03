---
source: https://developers.cloudflare.com/workers/framework-guides/web-apps/react-router/
---

# React Router (formerly Remix)

Full-stack React Router v8 on Workers via the Cloudflare Vite plugin.

## Signature / Usage

```sh
npm create cloudflare@latest -- my-react-router-app --framework=react-router
```

Generated configuration for an existing project (`wrangler deploy` autoconfig): `main` `build/server/index.js`, `assets.directory` `build/client`, `compatibility_flags` `nodejs_compat`, `observability.enabled` true.

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

- SPA mode and prerendering are not currently supported with the Cloudflare Vite plugin. For an SPA, start from the React template ([react-vite.md](./react-vite.md)) and use React Router as a library.
- Because you own the Worker entry file, you can add extra exports such as Durable Objects and Workflows there.
- React Router APIs: see the react-router skill.
- Vite config: see the vite skill; the Cloudflare Vite plugin itself is covered by cloudflare-wrangler.

## Related

- [overview.md](./overview.md)
- [react-vite.md](./react-vite.md)
