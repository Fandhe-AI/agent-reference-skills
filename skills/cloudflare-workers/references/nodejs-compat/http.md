---
source: https://developers.cloudflare.com/workers/runtime-apis/nodejs/http/
---

# http

`node:http` client and server APIs, implemented as a wrapper around the global `fetch` API.

## Signature / Usage

```js
import { createServer } from "node:http";
import { httpServerHandler } from "cloudflare:node";

const server = createServer((req, res) => {
	res.writeHead(200, { "Content-Type": "text/plain" });
	res.end("Hello from Node.js HTTP server!");
});

server.listen(8080);
export default httpServerHandler({ port: 8080 });
```

Client-side `get`:

```js
import { get } from "node:http";

export default {
	async fetch() {
		const { promise, resolve, reject } = Promise.withResolvers();
		get("http://example.org", (res) => {
			let data = "";
			res.setEncoding("utf8");
			res.on("data", (chunk) => {
				data += chunk;
			});
			res.on("end", () => {
				resolve(new Response(data));
			});
			res.on("error", reject);
		}).on("error", reject);
		return promise;
	},
};
```

`request` (the official example imports and calls `get` with an options object):

```js
import { get } from "node:http";

export default {
	async fetch() {
		const { promise, resolve, reject } = Promise.withResolvers();
		get(
			{
				method: "GET",
				protocol: "http:",
				hostname: "example.org",
				path: "/",
			},
			(res) => {
				let data = "";
				res.setEncoding("utf8");
				res.on("data", (chunk) => {
					data += chunk;
				});
				res.on("end", () => {
					resolve(new Response(data));
				});
				res.on("error", reject);
			},
		)
			.on("error", reject)
			.end();
		return promise;
	},
};
```

`httpServerHandler` accepts a server directly or a port:

Adapted (not in the official docs): the two alternative `export default` examples of the official block are split into separate snippets; see Notes.

```js
import http from "node:http";
import { httpServerHandler } from "cloudflare:node";

const server = http.createServer((req, res) => {
	res.end("hello world");
});

// Pass server directly (simplified) - automatically calls listen() if needed
export default httpServerHandler(server);
```

Adapted (not in the official docs): second of the two split alternative snippets; see Notes.

```js
import http from "node:http";
import { httpServerHandler } from "cloudflare:node";

const server = http.createServer((req, res) => {
	res.end("hello world");
});

// Or use port-based routing for multiple servers
server.listen(8080);
export default httpServerHandler({ port: 8080 });
```

`handleAsNodeRequest` for direct control:

```js
import { createServer } from "node:http";
import { handleAsNodeRequest } from "cloudflare:node";

const server = createServer((req, res) => {
	res.writeHead(200, { "Content-Type": "text/plain" });
	res.end("Hello from Node.js HTTP server!");
});

server.listen(8080);

export default {
	fetch(request) {
		return handleAsNodeRequest(8080, request);
	},
};
```

`IncomingMessage.cloudflare`:

```js
import { createServer } from "node:http";
import { httpServerHandler } from "cloudflare:node";

const server = createServer((req, res) => {
	console.log(req.cloudflare.cf.country);
	console.log(req.cloudflare.cf.ray);
	res.write("Hello, World!");
	res.end();
});

server.listen(8080);

export default httpServerHandler({ port: 8080 });
```

## Options / Props

Compatibility flags:

| Name | Type | Description |
|------|------|-------------|
| `enable_nodejs_http_modules` | compat flag | Required (with `nodejs_compat`) for client-side methods (`http.get`, `http.request`, etc.). Automatically enabled for compatibility date `2025-08-15` or later when `nodejs_compat` is enabled. |
| `enable_nodejs_http_server_modules` | compat flag | Required (with `nodejs_compat`) for server-side methods (`http.createServer`, `http.Server`, `http.ServerResponse`). Automatically enabled for compatibility date `2025-09-01` or later when `nodejs_compat` is enabled. |

For earlier dates, enable manually (both flags shown):

```jsonc
{
	"compatibility_flags": [
		"nodejs_compat",
		"enable_nodejs_http_modules",
		"enable_nodejs_http_server_modules"
	]
}
```

```toml
compatibility_flags = [
  "nodejs_compat",
  "enable_nodejs_http_modules",
  "enable_nodejs_http_server_modules"
]
```

Unsupported `request` / `get` options: `maxHeaderSize`, `insecureHTTPParser`, `createConnection`, `lookup`, `socketPath`.

Unsupported `Server` options: `maxHeaderSize`, `insecureHTTPParser`, `keepAliveTimeout`, `connectionsCheckingInterval`.

## Notes

- `get` and `request` wrap `fetch(...)` and may be used only within an exported fetch or similar handler; elsewhere they throw. They are subject to the same limits as `fetch`, and requests must be awaited (for example, via a promise) or the fetch may be canceled when the handler returns.
- `request` returns a Node.js `stream.Writable`. `OutgoingMessage` extends `Writable`; `ClientRequest` and `ServerResponse` extend `OutgoingMessage`. `IncomingMessage` extends `Readable`.
- `IncomingMessage.cloudflare.cf` contains the Cloudflare-specific request properties.
- `IncomingMessage` differences: trailer headers not supported; `socket` does not extend `net.Socket` and only has `encrypted`, `remoteFamily`, `remoteAddress`, `remotePort`, `localAddress`, `localPort` and `destroy()`. `remoteAddress` is `127.0.0.1` when run locally; `remotePort` is a random port between 2^15 and 2^16; `localAddress` is the request `host` header if present, otherwise `127.0.0.1`; `localPort` is the port assigned to the server instance; `req.socket.destroy()` falls through to `req.destroy()`.
- `Agent` is a stub: no connection pooling or keep-alive.
- With `httpServerHandler`, the port in `server.listen()` is a routing key rather than a network port; multiple servers can coexist using different ports. Port `0` (or `null` / `undefined`) assigns a random port number.
- `Server`: `closeAllConnections()` and `closeIdleConnections()` are not implemented; only `listen()` variants with a port number or no parameters are supported (`listen()`, `listen(0, callback)`, `listen(callback)`).
- `ServerResponse` unsupported: `assignSocket()` / `detachSocket()`, trailer headers, `writeContinue()` / `writeEarlyHints()`, 1xx responses in general.
- Other differences: `Connection` headers are not used; `Content-Length` is handled as in `fetch` (set automatically when a body is provided, manual values ignored); `Expect: 100-continue`, trailing headers, the `'continue'`, `'information'`, `'socket'` and `'upgrade'` events, and direct `socket` access are unsupported.
- Failing to call `close()` on an HTTP server may keep it alive until the worker is destroyed; call `close()` or use explicit resource management when creating multiple servers or needing lifecycle control (such as in tests).
- Docs inconsistency: the `request` example uses `get`.
- Corrected from the official docs: the `httpServerHandler` example on the official page has two `export default` statements (and a duplicate `const server`) in a single block; they are alternatives, so they are split into two separate snippets here.

## Related

- [https](./https.md)
- [net](./net.md)
- [streams](./streams.md)
- [Compatibility flags (configuration category)](../configuration/README.md)
