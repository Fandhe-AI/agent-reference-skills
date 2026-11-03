---
source: https://developers.cloudflare.com/pages/functions/typescript/
---

# TypeScript

Author Functions as `.ts` files in `/functions`; generate runtime and `Env` types with `wrangler types`.

## Signature / Usage

```sh
npx wrangler types --path='./functions/types.d.ts'
```

`functions/tsconfig.json`:

```json
{
	"compilerOptions": {
		"target": "esnext",
		"module": "esnext",
		"lib": ["esnext"],
		"types": ["./types.d.ts"]
	}
}
```

Type a Function with `PagesFunction<Env>`:

```ts
interface Env {
	KV: KVNamespace;
}

export const onRequest: PagesFunction<Env> = async (context) => {
	const value = await context.env.KV.get("example");
	return new Response(value);
};
```

## Notes

- Cloudflare recommends Workers (with static assets) for new projects — see the cloudflare-workers skill (static-assets, including migrate-from-pages).
- The `Env` type should come from `wrangler types` (top of `types.d.ts`), or be defined manually.
- If a root `tsconfig.json` exists, exclude `/functions` to avoid conflicts:

```json
{
	"include": ["src/**/*"],
	"exclude": ["functions/**/*"],
	"compilerOptions": {}
}
```

- With `nodejs_compat`, install `@types/node` and add `"node"` to `types`:

```json
{
	"compilerOptions": {
		"target": "esnext",
		"module": "esnext",
		"lib": ["esnext"],
		"types": ["./types.d.ts", "node"]
	}
}
```

- Migrating from `@cloudflare/workers-types`: https://developers.cloudflare.com/workers/languages/typescript/#migrating

## Related

- [event-context.md](./event-context.md)
- [wrangler-configuration.md](./wrangler-configuration.md)
