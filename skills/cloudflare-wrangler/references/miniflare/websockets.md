---
source: https://developers.cloudflare.com/workers/testing/miniflare/core/web-sockets/
---

# WebSockets (Miniflare)

Miniflare always upgrades WebSocket connections; the Worker must respond with a `101 Switching Protocols` response including a `webSocket`.

## Signature / Usage

An echo WebSocket server:

```js
export default {
	fetch(request) {
		const [client, server] = Object.values(new WebSocketPair());

		server.accept();
		server.addEventListener("message", (event) => {
			server.send(event.data);
		});

		return new Response(null, {
			status: 101,
			webSocket: client,
		});
	},
};
```

With `dispatchFetch`, handle the socket via `Response#webSocket` (worker stored in `echo.mjs`):

```js
import { Miniflare } from "miniflare";

const mf = new Miniflare({
	modules: true,
	scriptPath: "echo.mjs",
});

const res = await mf.dispatchFetch("https://example.com", {
	headers: {
		Upgrade: "websocket",
	},
});
const webSocket = res.webSocket;
webSocket.accept();
webSocket.addEventListener("message", (event) => {
	console.log(event.data);
});

webSocket.send("Hello!"); // Above listener logs "Hello!"
```

## Notes

- References: https://developers.cloudflare.com/workers/runtime-apis/websockets and https://developers.cloudflare.com/workers/examples/websockets/

## Related

- [fetch-events.md](./fetch-events.md)
- [get-started.md](./get-started.md)
