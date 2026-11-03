---
source: https://developers.cloudflare.com/workers/runtime-apis/nodejs/https/
---

# https

`node:https` client and server APIs, implemented as a wrapper around the global `fetch` API.

## Signature / Usage

```js
import { get } from "node:https";

export default {
	async fetch() {
		const { promise, resolve, reject } = Promise.withResolvers();
		get("https://example.com", (res) => {
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

`request`:

Adapted (not in the official docs): the request `'error'` listener is registered before `req.end()`, and assertion failures inside the async callbacks reject the promise; see Notes.

```js
import { request } from "node:https";
import { strictEqual, ok } from "node:assert";

export default {
	async fetch() {
		const { promise, resolve, reject } = Promise.withResolvers();
		const req = request(
			"https://developers.cloudflare.com/robots.txt",
			{
				method: "GET",
			},
			(res) => {
				try {
					strictEqual(res.statusCode, 200);
				} catch (err) {
					reject(err);
					return;
				}
				let data = "";
				res.setEncoding("utf8");
				res.on("data", (chunk) => {
					data += chunk;
				});
				res.once("error", reject);
				res.on("end", () => {
					try {
						ok(data.includes("User-agent"));
						resolve(new Response(data));
					} catch (err) {
						reject(err);
					}
				});
			},
		);
		req.on("error", reject);
		req.end();
		return promise;
	},
};
```

`createServer`:

```js
import { createServer } from "node:https";
import { httpServerHandler } from "cloudflare:node";

const server = createServer((req, res) => {
	res.writeHead(200, { "Content-Type": "text/plain" });
	res.end("Hello from Node.js HTTPS server!");
});

server.listen(8080);
export default httpServerHandler({ port: 8080 });
```

Explicit resource management:

```js
import { createServer } from "node:https";

await using server = createServer((req, res) => {
	res.end("Hello World");
});
// Server will be automatically closed when it goes out of scope
```

`Server`:

```js
import { Server } from "node:https";
import { httpServerHandler } from "cloudflare:node";

const server = new Server((req, res) => {
	res.writeHead(200, { "Content-Type": "application/json" });
	res.end(JSON.stringify({ message: "Hello from HTTPS Server!" }));
});
server.listen(8080);
export default httpServerHandler({ port: 8080 });
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `enable_nodejs_http_modules` | compat flag | Required with `nodejs_compat` for `https.get`, `https.request`, etc. Auto-enabled for compatibility date `2025-08-15` or later. |
| `enable_nodejs_http_server_modules` | compat flag | Required with `nodejs_compat` for `https.createServer`, `https.Server` (response objects are `http.ServerResponse`; `node:https` has no `ServerResponse` export). Auto-enabled for compatibility date `2025-09-01` or later. |
| `protocol` (request) | string | Default `https:` |
| `port` (request) | number | Default `443` |
| `agent` (request) | Agent | Default `https.globalAgent` |

Manual enabling for earlier dates:

```toml
compatibility_flags = ["nodejs_compat", "enable_nodejs_http_modules", "enable_nodejs_http_server_modules"]
```

## Notes

- `get` / `request` wrap `fetch(...)` and may be used only within an exported fetch or similar handler; elsewhere they throw. Await requests (via a promise) or the fetch may be canceled when the handler returns.
- `request` accepts all options from `http.request` except the defaults above. Additionally unsupported: `ca`, `cert`, `ciphers`, `clientCertEngine` (deprecated), `crl`, `dhparam`, `ecdhCurve`, `honorCipherOrder`, `key`, `passphrase`, `pfx`, `rejectUnauthorized`, `secureOptions`, `secureProtocol`, `servername`, `sessionIdContext`, `highWaterMark`.
- `Agent` is a stub: no connection pooling or keep-alive.
- `Server`: secure request handling is provided by Cloudflare infrastructure, so most Workers should use `http.Server`. `closeAllConnections()` / `closeIdleConnections()` not implemented; only `listen()` variants with a port number or no parameters; unsupported server options `maxHeaderSize`, `insecureHTTPParser`, `keepAliveTimeout`, `connectionsCheckingInterval`; TLS options such as `ca`, `cert`, `key`, `pfx`, `rejectUnauthorized`, `secureProtocol` are unsupported. For mTLS, use the mTLS binding.
- Failing to call `close()` on an HTTPS server may leak it; call `close()` or use `await using`.
- Other differences: `Connection` headers not used; `Content-Length` handled as in `fetch`; `Expect: 100-continue`, trailing headers, `'continue'` / `'information'` / `'socket'` / `'upgrade'` events and direct `socket` access are unsupported; TLS options like `ca`, `cert`, `key`, `rejectUnauthorized` cannot be configured.
- Corrected from the official docs: the official page lists `https.ServerResponse` among the APIs gated by `enable_nodejs_http_server_modules`; Node.js `node:https` does not export `ServerResponse` (only `http` does), so the row refers to `http.ServerResponse`.
- Adapted from the official docs: in the `request` example, the official code never listens for `'error'` on the request (a network failure would throw as an unhandled `'error'` event, and `uncaughtException` is not implemented in Workers) and the `strictEqual` / `ok` assertions run inside event callbacks, where a thrown `AssertionError` cannot reach the `fetch` handler and the returned promise would never settle. The request `'error'` listener now rejects the promise before `req.end()`, and assertion failures are caught and passed to `reject`.
- Docs inconsistency: the paragraph under `request` says "Because `get` is a wrapper..." (copy of the `get` text).

## Related

- [http](./http.md)
- [tls](./tls.md)
