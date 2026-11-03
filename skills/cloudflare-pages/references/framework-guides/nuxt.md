---
source: https://developers.cloudflare.com/pages/framework-guides/deploy-a-nuxt-site/
---

# Nuxt

Create a Nuxt app with C3 (Direct Upload first deploy) or deploy an existing project through Git integration; access bindings through `context.cloudflare.env` in server routes.

## Signature / Usage

```
npm create cloudflare@latest -- my-nuxt-app --framework=nuxt --platform=pages
```

C3 creates the project with `nuxi`, installs the necessary adapters and the Wrangler CLI, and can deploy an initial version via Direct Upload. Redeploy from the project directory with:

```sh
npm run deploy
```

Bindings: projects created via C3 include `nitro-cloudflare-dev`, a `nitro` module for local development (powered by `getPlatformProxy`, which emulates bindings from the Wrangler configuration file):

```typescript
export default defineNuxtConfig({
	modules: ["nitro-cloudflare-dev"],
});
```

Access a binding in a Nuxt server route (Server Routes and Middleware):

```typescript
export default defineEventHandler(({ context }) => {
	const MY_KV = context.cloudflare.env.MY_KV;

	return {
		// ...
	};
});
```

TypeScript typing (`env.d.ts` in the project root; generate runtime types with `wrangler types` first):

```ts
declare module "h3" {
	interface H3EventContext {
		cf: CfProperties;
		cloudflare: {
			request: Request;
			env: {
				MY_KV: KVNamespace;
			};
			context: ExecutionContext;
		};
	}
}
```

## Options / Props

Git integration build settings:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Production branch | — | — | `main` |
| Build command | — | — | `npm run build` |
| Build directory | — | — | `dist` |
| Project name | — | GitHub repository name | Optional; becomes the `*.pages.dev` subdomain and need not match the repository |

## Notes

- For new projects Cloudflare recommends Workers; see cloudflare-workers framework-guides.
- The initial C3 deployment is a Direct Upload deployment. Git integration cannot be added to an existing Pages application; create a new Pages application to use it.
- Wrangler configuration is used mainly for local development. Bindings declared there are not available remotely unless created as remote bindings (https://developers.cloudflare.com/workers/local-development/#remote-bindings).
- To use bindings in a deployed application, configure them in the Cloudflare dashboard ([bindings.md](../functions/bindings.md)).
- Nuxt and Nitro APIs themselves are out of scope for this skill.

## Related

- [overview.md](./overview.md)
- [vue.md](./vue.md)
