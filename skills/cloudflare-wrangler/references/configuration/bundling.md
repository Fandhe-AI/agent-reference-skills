---
source: https://developers.cloudflare.com/workers/wrangler/bundling/
---

# Bundling

By default Wrangler bundles Worker code with esbuild, with built-in support for npm modules from `package.json`. To review exactly what is uploaded, run `npx wrangler deploy --dry-run --outdir dist`.

## Signature / Usage

```js
import text from "./example.txt";
```

```ts
import wasm from "./example.wasm";

// Instantiate Wasm modules in the module scope
const instance = await WebAssembly.instantiate(wasm);

export default {
	fetch() {
		const result = instance.exports.exported_func();

		return new Response(result);
	},
};
```

## Options / Props

Default non-JavaScript module types:

| Module extension | Imported type |
|------------------|---------------|
| `.txt` | `string` |
| `.html` | `string` |
| `.sql` | `string` |
| `.bin` | `ArrayBuffer` |
| `.wasm`, `.wasm?module` | `WebAssembly.Module` |

`process.env.NODE_ENV` is statically replaced at build time:

| Context | Value |
|---------|-------|
| `wrangler dev` | `"development"` |
| `wrangler deploy` or `wrangler build` | `"production"` |

```bash
NODE_ENV=staging npx wrangler dev
```

## Notes

- esbuild version: Wrangler periodically updates it; since esbuild is pre-1.0.0, this may include breaking changes to bundling, possibly in a Wrangler minor version.
- Runtime module loading: for compatibility dates on or after November 17, 2026, JavaScript Workers use the new module registry by default. With earlier dates, add `new_module_registry` to opt in; use `legacy_module_registry` to opt out with a later date. The new registry supports `import.meta.url`, `import.meta.main`, `import.meta.resolve()`, URL-based resolution and validated import attributes. Your bundler may transform these expressions; use unbundled deployments or additional modules to preserve the module graph.
- Customize the file-type table via `rules` ([bundling-rules.md](./bundling-rules.md)). Cloudflare Workers does not support `WebAssembly.instantiateStreaming()`.
- `find_additional_modules` enables lazy loading of large or dynamically imported files: a large `await import("./large-dep.mjs")` matching a rule is loaded only when imported; variable-based dynamic imports (``await import(`./lang/${language}.mjs`)``) fail at runtime unless a rule matches all candidate files, e.g. `{ "type": "EsModule", "globs": ["./lang/**/*.mjs"], "fallthrough": true }`. Partial bundling is supported when a source file matches a rule (treated as external).
- `process.env.NODE_ENV` is replaced at build time, so development-only code can be removed from the production bundle. Override with the `NODE_ENV` environment variable.
- Conditional exports: Wrangler respects the conditional `exports` field in `package.json` and tries the `workerd` key.
- Disable bundling: `npx wrangler deploy --no-bundle`. Not recommended in most scenarios; minification and polyfill injection will not be available.
- Generated configuration redirects: see [generated-config.md](./generated-config.md).

## Related

- [bundling-rules.md](./bundling-rules.md)
- [custom-builds.md](./custom-builds.md)
- [module-aliasing.md](./module-aliasing.md)
- [generated-config.md](./generated-config.md)
