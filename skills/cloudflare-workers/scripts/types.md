---
source: https://developers.cloudflare.com/workers/languages/typescript/
---

# Types

Generate and install TypeScript types for Workers. Pinned to cloudflare-docs production SHA `d0995b9`, fetched 2026-11-03.

Full Wrangler command set: see the cloudflare-wrangler skill.

## Generate types matching the Worker configuration

```sh
npx wrangler types
```

Writes `worker-configuration.d.ts` by default (`Env` types plus runtime types for the configured compatibility date and flags). The file is overwritten on every run; do not edit it by hand. Re-run after any config change. Other managers: `yarn wrangler types` / `pnpm wrangler types`.

## Generate runtime types without Env types

```sh
npx wrangler types --include-env=false
```

## Check generated types in CI

```sh
npx wrangler types --check
```

Fails when the recorded config hash or runtime header is out of date; it does not validate the file body.

## Install the published workers-types package

```sh
npm install -D @cloudflare/workers-types
```

Version 5 and later exposes only the latest runtime types (dated entrypoints such as `@cloudflare/workers-types/2022-11-30` are removed); use `@cloudflare/workers-types/experimental` for experimental flags. Still recommended for libraries and shared packages.

## Migrate from workers-types to wrangler types

```sh
npm uninstall @cloudflare/workers-types
```

```sh
npx wrangler types
```

Then set `"types": ["./worker-configuration.d.ts"]` in `tsconfig.json` `compilerOptions`.

## Install Node.js types (nodejs_compat)

```sh
npm i @types/node
```

Needed when the `nodejs_compat` compatibility flag is used; add `"node"` to `compilerOptions.types`.

## Run type generation before type-checking

```json
{
	"scripts": {
		"generate-types": "wrangler types",
		"type-check": "wrangler types && tsc"
	}
}
```

## Notes

- Wrangler between `3.66.0` and `4.0.0` needs `--experimental-include-runtime`; runtime types then go to `.wrangler/types/runtime.d.ts`.
