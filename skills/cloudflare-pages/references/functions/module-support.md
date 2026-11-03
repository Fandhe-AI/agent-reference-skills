---
source: https://developers.cloudflare.com/pages/functions/module-support/
---

# Module support

Import ES Modules, WebAssembly, text and binary files inside Pages Functions.

## Signature / Usage

ES Module (`src/greeting.ts`) and a Function importing it:

```ts
export function greeting(name: string): string {
  return `Hello ${name}!`;
}
```

```js
import { greeting } from "../src/greeting.ts";

export async function onRequest(context) {
	return new Response(`${greeting("Pages Functions")}`);
}
```

WebAssembly module:

```js
import addModule from "add.wasm";

export async function onRequest() {
	const addInstance = await WebAssembly.instantiate(addModule);
	return new Response(
		`The meaning of life is ${addInstance.exports.add(20, 1)}`,
	);
}
```

Text module (imports `../index.html` as a string):

```js
import html from "../index.html";

export async function onRequest() {
	return new Response(html, {
		headers: { "Content-Type": "text/html" },
	});
}
```

Binary module (imports as an `ArrayBuffer`):

```js
import data from "../my-data.bin";

export async function onRequest() {
	return new Response(data, {
		headers: { "Content-Type": "application/octet-stream" },
	});
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| ES Modules | standard | — | `import` / `export`; recommended module system. |
| WebAssembly | `.wasm` import | — | Imported as a module and instantiated with `WebAssembly.instantiate`. |
| Text modules | non-standard | — | Import files such as HTML as a `String`. |
| Binary modules | non-standard | — | Import binary data such as images as an `ArrayBuffer`. |

## Notes

- Cloudflare recommends Workers (with static assets) for new projects — see the cloudflare-workers skill (static-assets, including migrate-from-pages).
- The official page labels the first `greeting` snippet as JavaScript although it contains a TypeScript annotation; it is shown here as TypeScript.
- Wasm intro: https://developers.cloudflare.com/workers/runtime-apis/webassembly/

## Related

- [get-started.md](./get-started.md)
- [typescript.md](./typescript.md)
