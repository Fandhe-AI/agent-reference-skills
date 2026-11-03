---
source: https://developers.cloudflare.com/sandbox/previews/
---

# Preview a web application

Open a web server that runs in a sandbox from a browser. The server has no public port, so your Worker forwards requests to it through `getTcpPort()`. Here `/previews/<NAME>/` maps to the sandbox named `<NAME>`.

## Signature / Usage

The server command (runs as the main process inside the disposable sandbox container, never on the host; it must listen on `0.0.0.0`):

```ts
const port = 8080;

const server = `
const { createServer } = require("node:http");

process.on("SIGTERM", () => process.exit(0));

createServer((request, response) => {
	response.setHeader("Content-Type", "application/json");
	response.end(
		JSON.stringify({ path: request.url, uptime: Math.round(process.uptime()) }),
	);
}).listen(8080, "0.0.0.0");
`;
```

Durable Object (fragments of `MyContainer`; `const INACTIVITY_TIMEOUT_MS = 5 * 60 * 1000;` and a constructor that re-applies the timeout when the container is already running):

```ts
export class MyContainer extends DurableObject<Env> {
	// ...

	// Skip the check after the first response
	private ready = false;

	private async startServer(): Promise<Container> {
		const container = this.ctx.container;

		if (!container) {
			throw new Error("No container is configured");
		}

		if (!container.running) {
			container.start({
				image: "cloudflare/debian-trixie",
				entrypoint: ["node", "--eval", server],
				enableInternet: false,
			});
			await container.setInactivityTimeout(INACTIVITY_TIMEOUT_MS);
			this.ready = false;
		}

		// `start()` returns before the server listens. Send `GET /` until any
		// HTTP response arrives, for up to 30 seconds
		const deadline = Date.now() + 30_000;

		while (!this.ready && Date.now() < deadline) {
			try {
				const response = await container
					.getTcpPort(port)
					.fetch("http://container/", { signal: AbortSignal.timeout(1_000) });
				await response.body?.cancel();
				this.ready = true;
			} catch {
				await scheduler.wait(500);
			}
		}

		return container;
	}

	async fetch(request: Request): Promise<Response> {
		const container = await this.startServer();

		if (!this.ready) {
			return new Response("The preview did not start", { status: 503 });
		}

		// Forward each request once, because a retry could send a `POST` twice
		try {
			return await container.getTcpPort(port).fetch(request);
		} catch {
			// Check the server again on the next request
			this.ready = false;
			return new Response("The preview is not responding", { status: 502 });
		}
	}

	async stop(): Promise<void> {
		if (this.ctx.container?.running) {
			await this.ctx.container.destroy();
		}

		this.ready = false;
	}
}
```

Adapted (not in the official docs): the forwarded request drops the visitor's `Cookie` and `Authorization` headers so credentials never reach code in the sandbox; see Notes.

```ts
function forward(
	sandbox: DurableObjectStub<MyContainer>,
	request: Request,
	path: string | undefined,
): Promise<Response> | Response {
	const url = new URL(request.url);

	if (!path) {
		url.pathname += "/";
		return Response.redirect(url.toString(), 308);
	}

	// Prefix the host, so that a path such as //example.com/ stays a path.
	const target = new URL(`http://container${path}${url.search}`);
	const forwarded = new Request(target, request);
	forwarded.headers.delete("Cookie");
	forwarded.headers.delete("Authorization");
	return sandbox.fetch(forwarded);
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);
		const preview = /^\/previews\/([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)(\/.*)?$/.exec(url.pathname);

		if (!preview) {
			return new Response("Not found", { status: 404 });
		}

		// Authenticate the caller before they reach a preview.
		const sandbox = env.MY_CONTAINER.getByName(preview[1]);
		return forward(sandbox, request, preview[2]);
	},
} satisfies ExportedHandler<Env>;
```

Keep WebSocket connections open (bridge both ends so the Durable Object stays active), and call it in the Durable Object `fetch()`:

```ts
function bridge(response: Response): Response {
	const upstream = response.webSocket!;
	const [client, server] = Object.values(new WebSocketPair());

	// Receive binary messages as `ArrayBuffer` instead of `Blob`
	upstream.binaryType = "arraybuffer";
	server.binaryType = "arraybuffer";
	upstream.accept();
	server.accept();

	// A listener that throws drops the connection, so these never throw.
	const relay = (from: WebSocket, to: WebSocket) => {
		from.addEventListener("message", (event) => {
			try {
				to.send(event.data);
			} catch {
				from.close(1011, "The other side closed");
			}
		});
		from.addEventListener("close", (event) => {
			// 1005 and 1006 report a missing or abnormal close and cannot be sent.
			const code =
				event.code === 1005 || event.code === 1006 ? 1000 : event.code;
			try {
				to.close(code, event.reason);
			} catch {}
		});
	};

	relay(server, upstream);
	relay(upstream, server);

	// Pass on the subprotocol that the server chose. A browser closes a
	// connection that requested one and receives none.
	const headers = new Headers();
	const protocol = response.headers.get("Sec-WebSocket-Protocol");
	if (protocol) {
		headers.set("Sec-WebSocket-Protocol", protocol);
	}

	return new Response(null, { status: 101, webSocket: client, headers });
}
```

```ts
try {
	const response = await container.getTcpPort(port).fetch(request);
	return response.webSocket ? bridge(response) : response;
} catch {
```

Share a preview with a link (token is the permission) and stop a preview:

```ts
export class MyContainer extends DurableObject<Env> {
	// ...

	async share(ttl: number): Promise<string> {
		const token = crypto.randomUUID();
		await this.ctx.storage.put(`share:${token}`, Date.now() + ttl);
		return token;
	}

	async isShared(token: string): Promise<boolean> {
		const key = `share:${token}`;
		const expires = await this.ctx.storage.get<number>(key);

		if (expires !== undefined && expires <= Date.now()) {
			await this.ctx.storage.delete(key);
			return false;
		}

		return expires !== undefined;
	}
}
```

```ts
const share = /^\/shares\/([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)$/.exec(url.pathname);

if (share && request.method === "POST") {
	const sandbox = env.MY_CONTAINER.getByName(share[1]);
	const token = await sandbox.share(60 * 60 * 1000);
	return Response.json({ url: `${url.origin}/shared/${share[1]}/${token}/` });
}

const shared = /^\/shared\/([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)\/([^/]+)(\/.*)?$/.exec(url.pathname);

if (shared) {
	const sandbox = env.MY_CONTAINER.getByName(shared[1]);

	if (!(await sandbox.isShared(shared[2]))) {
		return new Response("Not found", { status: 404 });
	}

	return forward(sandbox, request, shared[3]);
}
```

```ts
if (!preview[2] && request.method === "DELETE") {
	await sandbox.stop();
	return new Response(null, { status: 204 });
}
```

## Notes

- Adapted from the official docs: the two `headers.delete()` lines in `forward()` were added; the official `forward()` passes every visitor header (including cookies) to the sandbox server, which is untrusted code. On the application hostname a preview can also use the visitor's cookies, so serve previews from a separate domain (see the serve-previews-on-their-own-hostnames page).
- The server must listen on `0.0.0.0`: `getTcpPort()` cannot reach `127.0.0.1`-only servers. As the main process, if it exits the instance stops and its files end; use the run-a-server-in-the-background pattern when files matter. After deploy, `python3 -m http.server` exits on startup because it looks up the container hostname (see Local development in the `containers` category of this skill).
- The server receives paths without the `/previews/<NAME>` prefix; root-absolute links leave the preview, so use relative links or per-preview hostnames. The name regex accepts DNS-label names only; an encoded `/` does not match.
- WebSocket traffic that merely passes through the Durable Object does not keep the sandbox running; with `bridge()` (both ends accepted) the sandbox stays running while any page has a connection open.
- Hot reloading: development servers such as Vite check the `Host` header (add the preview hostname to `server.allowedHosts`, for example `[".example-previews.com"]`; under a path prefix requests arrive with `Host: container`) and build absolute asset/reload URLs from their base path, so use per-preview hostnames. Vite config: `server: { host: "0.0.0.0", port: 8080, allowedHosts: [".example-previews.com"] }`.
- Sharing: authenticate the `POST /shares/<name>` route (preview code runs on the same hostname and could call it with the visitor's cookies; serve it from another hostname or require a credential the browser cannot send). Anyone with the link can open the preview until expiry; each token belongs to one preview name; revoke early by deleting the `share:<token>` key from Durable Object storage. Test: `curl .../previews/ada/hello` returns `{ "path": "/hello", "uptime": 0 }`; `DELETE /previews/ada` returns `204`.
- `getTcpPort()` is documented in the `containers` category of this skill; the Durable Objects WebSocket API in the cloudflare-stateful skill.

## Related

- [Serve previews on their own hostnames](./serve-previews-on-their-own-hostnames.md)
- [Run a server in the background](./run-a-server-in-the-background.md)
- [Sandbox lifetime](./sandbox-lifetime.md)
- [Sandbox security](./sandbox-security.md)
