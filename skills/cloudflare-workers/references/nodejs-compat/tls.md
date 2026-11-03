---
source: https://developers.cloudflare.com/workers/runtime-apis/nodejs/tls/
---

# tls

`node:tls` creates secure connections to external services using TLS.

## Signature / Usage

```js
import { connect } from "node:tls";

// ... in a request handler ...
const connectionOptions = { key: env.KEY, cert: env.CERT };
const socket = connect(url, connectionOptions, () => {
	if (socket.authorized) {
		console.log("Connection authorized");
	}
});

socket.on("data", (data) => {
	console.log(data);
});

socket.on("end", () => {
	console.log("server ends connection");
});
```

## Options / Props

Available APIs:

| Name | Type | Description |
|------|------|-------------|
| `connect` | function | Create a TLS connection. |
| `TLSSocket` | class | TLS socket class. |
| `checkServerIdentity` | function | Verify server identity. |
| `createSecureContext` | function | Create a secure context. |

## Notes

- All other APIs, including `tls.Server` and `tls.createServer`, are not supported and throw a `Not implemented` error when called.
- Status: partially supported.
- Node.js docs: https://nodejs.org/api/tls.html

## Related

- [net](./net.md)
- [https](./https.md)
