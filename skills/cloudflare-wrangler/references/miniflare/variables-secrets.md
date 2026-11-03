---
source: https://developers.cloudflare.com/workers/testing/miniflare/core/variables-secrets/
---

# Variables and Secrets (Miniflare)

Bind variables, secrets, and text/data blobs into a Miniflare Worker environment.

## Signature / Usage

```js
const mf = new Miniflare({
	bindings: {
		KEY1: "value1",
		KEY2: "value2",
	},
});
```

Text and data blobs are read from files and bound as `string`s and `ArrayBuffer`s respectively:

```js
const mf = new Miniflare({
	textBlobBindings: { TEXT: "text.txt" },
	dataBlobBindings: { DATA: "data.bin" },
});
```

## Notes

- Injecting arbitrary globals is not supported by workerd. With a service Worker, bindings are injected as globals, but they must be JSON-serializable.

## Related

- [get-started.md](./get-started.md)
- [writing-tests.md](./writing-tests.md)
- [../local-development/environment-variables.md](../local-development/environment-variables.md)
