---
source: https://developers.cloudflare.com/workers/runtime-apis/web-standards/
---

# Web standards

Standardized APIs for use by Workers running on Cloudflare's global network: JavaScript standards (V8) and Worker Global Scope APIs.

## Signature / Usage

```js
addEventListener("unhandledrejection", (event) => {
	console.log(event.promise); // The promise that was rejected.
	console.log(event.reason); // The value or Error with which the promise was rejected.
});

addEventListener("rejectionhandled", (event) => {
	console.log(event.promise); // The promise that was rejected.
	console.log(event.reason); // The value or Error with which the promise was rejected.
});
```

## Options / Props

| API | Description |
|-----|-------------|
| `atob()` / `btoa()` | Decode a base-64 string / create a base-64 encoded ASCII string from binary data. |
| `setInterval()` / `clearInterval()` | Schedule / cancel repeated execution. |
| `setTimeout()` / `clearTimeout()` | Schedule / cancel delayed execution. |
| `scheduler.wait()` | Promise that resolves after a given number of milliseconds; `await`-able alternative to `setTimeout()`. |
| `performance.timeOrigin` | Workers uses the UNIX epoch as time origin, so it always returns `0`. |
| `performance.now()` | `DOMHighResTimeStamp` of ms since `performance.timeOrigin`. Precision is intentionally reduced: returns the time of the last I/O and does not advance during code execution, so it always equals `Date.now()`. |
| `EventTarget` / `Event` | Publish and subscribe to events. |
| `AbortController` / `AbortSignal` | Common model for canceling asynchronous operations. |
| `fetch()` | Starts fetching a resource from the network. |
| `TextEncoder` / `TextDecoder`, `TextEncoderStream` / `TextDecoderStream` | UTF-8 encoding/decoding (Encoding API). |
| `URL` | Supports HTTP and HTTPS schemes. Default behavior differs from the URL Spec; a spec-compliant implementation is enabled with the `url_standard` compatibility flag. |
| `CompressionStream` / `DecompressionStream` | deflate, deflate-raw and gzip. |
| `URLPattern` | Match URLs using a pattern syntax. |
| `Intl` | Format dates, times, numbers per locale. |
| `navigator.userAgent` | With the `global_navigator` compatibility flag, value `'Cloudflare-Workers'`. |
| `navigator.sendBeacon(url[, data])` | With the `global_navigator` flag, sends an HTTP `POST` with a small amount of data, best-effort. |
| `unhandledrejection` / `rejectionhandled` events | Emitted on the global scope for unhandled / late-handled promise rejections. |
| Web File System Access API | With the `enable_web_file_system` compatibility flag; read/write files in the same in-memory virtual file system as `node:fs`, without requiring Node.js compatibility. |

## Notes

- The runtime is built on V8 and updated at least weekly to at least the V8 version of Chrome stable; all standard built-in objects supported by Chrome stable are supported, with exceptions.
- Not allowed for security reasons: `eval()`, `new Function`, `WebAssembly.compile`, `WebAssembly.compileStreaming`, `WebAssembly.instantiate` with a buffer parameter, `WebAssembly.instantiateStreaming`.
- `Date.now()` returns the time of the last I/O; it does not advance during code execution.
- Timers and the Fetch API are only available inside the Request Context.

`navigator.sendBeacon` replaces:

```js
const promise = fetch("https://example.com", {
	method: "POST",
	body: "hello world",
});
ctx.waitUntil(promise);
```

with:

```js
navigator.sendBeacon("https://example.com", "hello world");
```

Web File System Access API example:

```js
const root = await navigator.storage.getDirectory();

export default {
	async fetch(request) {
		const fileHandle = await root.getFileHandle("hello.txt", { create: true });
		const writable = await fileHandle.createWritable();
		await writable.write("Hello, world!");
		await writable.close();

		const file = await fileHandle.getFile();
		const contents = await file.text();

		return new Response(contents, { status: 200 });
	},
};
```

## Related

- [Encoding](./encoding.md)
- [Performance and timers](./performance.md)
- [Scheduler](./scheduler.md)
- [Fetch](./fetch.md)
- [WebAssembly (Wasm)](./webassembly.md)
