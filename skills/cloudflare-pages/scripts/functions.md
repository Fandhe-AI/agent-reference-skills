---
source: https://developers.cloudflare.com/pages/functions/typescript/
---

# Pages Functions types

Copy-paste commands for TypeScript type generation in a `functions/` directory.

## Generate runtime and Env types

```sh
npx wrangler types --path='./functions/types.d.ts'
```

```sh
yarn wrangler types --path='./functions/types.d.ts'
```

```sh
pnpm wrangler types --path='./functions/types.d.ts'
```

Writes runtime types and an `Env` type to `functions/types.d.ts`. Reference it from `functions/tsconfig.json`:

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

If you use the `nodejs_compat` flag, install `@types/node` and add `"node"` to `types`. If the project root has its own `tsconfig.json`, exclude `functions/**/*` there to avoid conflicts.
