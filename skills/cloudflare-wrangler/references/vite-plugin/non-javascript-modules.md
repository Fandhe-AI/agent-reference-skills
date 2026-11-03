---
source: https://developers.cloudflare.com/workers/vite-plugin/reference/non-javascript-modules/
---

# Non-JavaScript modules

Besides TypeScript and JavaScript, these module types are automatically configured to be importable in Worker code.

## Signature / Usage

```js
import text from "./example.txt";
```

Wasm import:

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

| Module extension | Imported type |
| --- | --- |
| `.txt` | `string` |
| `.html` | `string` |
| `.sql` | `string` |
| `.bin` | `ArrayBuffer` |
| `.wasm`, `.wasm?module` | `WebAssembly.Module` |

## Notes

- Cloudflare Workers does not support `WebAssembly.instantiateStreaming()`.

## Related

- [static-assets.md](./static-assets.md)
