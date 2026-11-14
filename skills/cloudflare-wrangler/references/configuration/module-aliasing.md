---
source: https://developers.cloudflare.com/workers/wrangler/configuration/#module-aliasing
---

# Module Aliasing (`alias`)

Replace all imports of a particular package with a module of your choice via the `alias` field.

## Signature / Usage

```jsonc
{
	"alias": {
		"foo": "./replacement-module-filepath",
	},
}
```

```toml
[alias]
foo = "./replacement-module-filepath"
```

```js
// replacement-module-filepath.js
export const bar = "baz";
```

```js
import { bar } from "foo";

console.log(bar); // returns "baz"
```

Aliasing `node-fetch` to the runtime `fetch()`:

```jsonc
{
	"alias": {
		"node-fetch": "./fetch-polyfill",
	},
}
```

```js
// ./fetch-polyfill
export default fetch;
```

Aliasing a Node.js API (`fs`):

```jsonc
{
	"alias": {
		"fs": "./fs-polyfill",
	},
}
```

```js
// ./fs-polyfill
export function readFile() {
	// ...
}
```

## Notes

- Any `import` or `require()` of the aliased module points to your replacement.
- With the Cloudflare Vite plugin or the Workers Vitest integration, `alias` is replaced by Vite's `resolve.alias`.
- Bundling issues: before aliasing a dependency that fails to resolve, verify the package is correctly installed (direct or transitive). Options: an alternative Worker-compatible implementation; a no-op module (empty file); or a runtime-error module (a single top-level `throw`) if the module must never be used (e.g. security vulnerabilities).
- `node-fetch` does not work on Workers because it relies on unsupported Node.js `http`/`https` APIs, and is unnecessary since `fetch()` is built in. Node.js API support is documented by cloudflare-workers.
- Source: https://developers.cloudflare.com/workers/wrangler/configuration/ (cloudflare-docs production `34d908a`, fetched 2026-11-14)

## Related

- [bundling.md](./bundling.md)
- [bundling-rules.md](./bundling-rules.md)
