---
source: https://developers.cloudflare.com/workers/testing/miniflare/core/modules/
---

# Modules (Miniflare)

Enable the modules Worker format and configure module resolution rules.

## Signature / Usage

```js
const mf = new Miniflare({
	modules: true,
});
```

```js
export default {
	async fetch(request, env, ctx) {
		// - `request` is the incoming `Request` instance
		// - `env` contains bindings, KV namespaces, Durable Objects, etc
		// - `ctx` contains `waitUntil` and `passThroughOnException` methods
		return new Response("Hello Miniflare!");
	},
	async scheduled(controller, env, ctx) {
		// - `controller` contains `scheduledTime` and `cron` properties
		// - `env` contains bindings, KV namespaces, Durable Objects, etc
		// - `ctx` contains the `waitUntil` method
		console.log("Doing something scheduled...");
	},
};
```

### Module rules

Module rules support types `ESModule`, `CommonJS`, `Text`, `Data` and `CompiledWasm`:

```js
const mf = new Miniflare({
	modulesRules: [
		{ type: "ESModule", include: ["**/*.js"], fallthrough: true },
		{ type: "Text", include: ["**/*.txt"] },
	],
});
```

Default rules, appended to the end of your list (override by matching the same globs):

```js
[
	{ type: "ESModule", include: ["**/*.mjs"] },
	{ type: "CommonJS", include: ["**/*.js", "**/*.cjs"] },
];
```

## Options / Props

`modulesRules` entries (fields as used in the official examples):

| Name | Type | Default | Description |
|------|------|---------|-------------|
| type | — | — | Module type: `ESModule`, `CommonJS`, `Text`, `Data` or `CompiledWasm` |
| include | — | — | Glob patterns the rule matches |
| fallthrough | — | — | Used in the official example on the `ESModule` rule; not described in the page text |

## Notes

- String scripts via `script` work with the modules format but cannot import other modules; use `scriptPath` for that.
- Reference: https://developers.cloudflare.com/workers/reference/migrate-to-module-workers/

## Related

- [get-started.md](./get-started.md)
- [writing-tests.md](./writing-tests.md)
