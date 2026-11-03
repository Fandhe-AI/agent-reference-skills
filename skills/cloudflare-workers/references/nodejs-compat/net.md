---
source: https://developers.cloudflare.com/workers/runtime-apis/nodejs/net/
---

# net

`node:net` creates direct TCP connections to servers via `net.Socket`, built on `connect` from the built-in `cloudflare:sockets` module.

## Signature / Usage

```js
import net from "node:net";

const exampleIP = "127.0.0.1";

export default {
	async fetch(req) {
		const socket = new net.Socket();
		socket.connect(4000, exampleIP, function () {
			console.log("Connected");
		});

		socket.write("Hello, Server!");
		socket.end();

		return new Response("Wrote to server", { status: 200 });
	},
};
```

## Notes

- `net.BlockList` and `net.SocketAddress` are also available.
- The `net.Server` class is not supported by Workers.
- Node.js docs: https://nodejs.org/api/net.html

## Related

- [tls](./tls.md)
- [dns](./dns.md)
- [http](./http.md)
