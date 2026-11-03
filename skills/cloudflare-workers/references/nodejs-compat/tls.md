---
source: https://developers.cloudflare.com/workers/runtime-apis/nodejs/tls/
---

# tls

`node:tls` creates secure connections to external services using TLS.

## Signature / Usage

Adapted (not in the official docs): the official `connect(url, ...)` call is replaced by an explicit port and host, and an `'error'` listener is added; see Notes.

```js
import { connect } from "node:tls";

// ... in a request handler ...
const connectionOptions = { key: env.KEY, cert: env.CERT };
const socket = connect(443, "example.com", connectionOptions, () => {
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

socket.on("error", (err) => {
	console.error(err);
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
- Corrected from the official docs: the official example calls `connect(url, connectionOptions, ...)` with an undefined `url`; `tls.connect` takes `(port[, host][, options][, callback])` or `(options[, callback])` (a lone string is a socket path), so the call now passes an explicit port and host.
- Adapted from the official docs: an `'error'` listener was added to the example socket; an `'error'` event with no listener is thrown, and `uncaughtException` is not implemented in Workers.
- Adapted from the official docs: with compatibility flag `throw_on_not_implemented_tls_options` (default as of compatibility date 2026-06-16, requires `nodejs_compat`; `no_throw_on_not_implemented_tls_options` disables), unsupported TLS options (for example `checkServerIdentity`) passed to `tls.connect()` or `new TLSSocket()` throw `ERR_OPTION_NOT_IMPLEMENTED`; on earlier dates they are silently ignored.
- Node.js docs: https://nodejs.org/api/tls.html

## Related

- [net](./net.md)
- [https](./https.md)
