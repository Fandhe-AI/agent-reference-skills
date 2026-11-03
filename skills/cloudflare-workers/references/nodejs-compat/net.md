---
source: https://developers.cloudflare.com/workers/runtime-apis/nodejs/net/
---

# net

`node:net` creates direct TCP connections to servers via `net.Socket`, built on `connect` from the built-in `cloudflare:sockets` module.

## Signature / Usage

Adapted (not in the official docs): the socket write/end is awaited before returning the Response so the work is not cut off when the handler finishes; see Notes.

```js
import net from "node:net";

const exampleIP = "127.0.0.1";

export default {
	async fetch(req) {
		const socket = new net.Socket();
		await new Promise((resolve, reject) => {
			socket.once("error", reject);
			socket.connect(4000, exampleIP, function () {
				console.log("Connected");
			});

			socket.write("Hello, Server!");
			socket.end(() => resolve());
		});

		return new Response("Wrote to server", { status: 200 });
	},
};
```

## Notes

- Adapted from the official docs: the official example returns the `Response` without waiting for the socket write/end to finish; the work is now awaited (via a Promise resolved in the `end` callback) so it is not abandoned when the handler returns.
- `net.BlockList` and `net.SocketAddress` are also available.
- The `net.Server` class is not supported by Workers.
- Node.js docs: https://nodejs.org/api/net.html

## Related

- [tls](./tls.md)
- [dns](./dns.md)
- [http](./http.md)
