---
source: https://developers.cloudflare.com/workers/languages/typescript/
---

# TypeScript

TypeScript is a first-class language on Cloudflare Workers. All Workers APIs are fully typed, and type definitions are generated from workerd, the open-source Workers runtime. This page also covers the JavaScript and language-overview pages (see Notes).

## Signature / Usage

Generate types that match the Worker's configuration (compatibility date, compatibility flags, bindings, module rules):

```
npx wrangler types
```

This writes `worker-configuration.d.ts` by default, containing `Env` types for the bindings and runtime types for the compatibility date and flags. Add it to `tsconfig.json`:

```json
{
	"compilerOptions": {
		"types": ["./worker-configuration.d.ts"]
	}
}
```

If you use the `nodejs_compat` compatibility flag, also install `@types/node` and add it:

```json
{
	"compilerOptions": {
		"types": ["./worker-configuration.d.ts", "node"]
	}
}
```

Run `wrangler types` before any task that relies on TypeScript:

```json
{
	"scripts": {
		"dev": "existing-dev-command",
		"build": "existing-build-command",
		"generate-types": "wrangler types",
		"type-check": "wrangler types && tsc"
	}
}
```

CI (committed types file, verify with `--check`):

```yaml
- run: npx wrangler types --check
- run: npm run build
- run: npm test
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `--include-env=false` | flag | Skip generating `Env` types (default generates them). |
| `--check` | flag | Compares the generated file's recorded environment/configuration hash and runtime header with the current Wrangler configuration and runtime inputs. Does not compare or validate the generated file body. Fails the CI job when the recorded inputs are out of date. |
| `--experimental-include-runtime` | flag | Needed only for Wrangler greater than `3.66.0` but below `4.0.0`; runtime types were output to `.wrangler/types/runtime.d.ts` by default during the experimental release. |

## Notes

- Generated types depend on: compatibility date, compatibility flags, bindings in the Wrangler configuration file, and `rules` (module rules) in that file. Example: `AsyncLocalStorage` is only allowed with `compatibility_flags = ["nodejs_als"]`, and the types reflect this.
- `worker-configuration.d.ts` is generated and overwritten on every `wrangler types` run; do not edit it. Define custom environment types in source-owned TypeScript and use declaration merging with the public `Cloudflare.Env` interface. Committing the file to git is allowed.
- Run `wrangler types` after any change to the config file.
- `@cloudflare/workers-types` version 5 and later exposes only the latest runtime types. Dated entrypoints such as `@cloudflare/workers-types/2022-11-30` are removed. Import from `@cloudflare/workers-types` for latest stable types, or `@cloudflare/workers-types/experimental` for APIs behind experimental compatibility flags. To match a specific compatibility date and flags, use `wrangler types`. Install with `npm install -D @cloudflare/workers-types`.
- Migrating from `@cloudflare/workers-types` to `wrangler types`: (1) uninstall the package (`npm uninstall @cloudflare/workers-types`); (2) run `npx wrangler types`; (3) put the generated file (or your custom path) in `compilerOptions.types`; (4) optionally add `@types/node` for `nodejs_compat`; (5) update scripts and CI so `wrangler types` runs first. Then remove imports from `@cloudflare/workers-types` in Worker code.
- There are no plans to stop publishing `@cloudflare/workers-types`; it remains the recommended way to type libraries and shared packages in the Workers environment.
- Flag details for `wrangler types`: see the cloudflare-wrangler skill.
- TypeScript language/tsc itself: see the typescript skill.
- JavaScript page (`https://developers.cloudflare.com/workers/languages/javascript/`): the Workers platform is designed to be JavaScript standards compliant (ECMAScript, TC39) and web-interoperable. Wherever possible it uses web platform APIs so code can be reused across client and server and across WinterCG JavaScript runtimes. It has no code of its own; resources listed there: Getting Started guide, Quickstarts, workers-types repo, web standard APIs, Tutorials, JavaScript Examples.
- Languages overview page (`https://developers.cloudflare.com/workers/languages/`): Workers is polyglot with first-class support for JavaScript, TypeScript, Python Workers, and Rust. Workers also supports WebAssembly (Wasm), a binary format many languages compile to, so Workers can be written in other languages including C, C++, Kotlin, Go and more.

## Related

- [rust.md](./rust.md)
- [python.md](./python.md)
