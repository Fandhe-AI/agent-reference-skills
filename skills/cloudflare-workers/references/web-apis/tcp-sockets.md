---
source: https://developers.cloudflare.com/workers/runtime-apis/tcp-sockets/
---

# TCP sockets

The Workers runtime provides the `connect()` API for creating outbound TCP connections from Workers. It returns a socket with readable and writable streams, imported from `cloudflare:sockets`.

## Signature / Usage

```typescript
import { connect } from 'cloudflare:sockets';

export default {
  async fetch(req): Promise<Response> {
    const gopherAddr = { hostname: "gopher.floodgap.com", port: 70 };
    const url = new URL(req.url);

    try {
      const socket = connect(gopherAddr);

      const writer = socket.writable.getWriter()
      const encoder = new TextEncoder();
      const encoded = encoder.encode(url.pathname + "\r\n");
      await writer.write(encoded);
      await writer.close();

      return new Response(socket.readable, { headers: { "Content-Type": "text/plain" } });
    } catch (error) {
      return new Response("Socket connection failed: " + error, { status: 500 });
    }
  }
} satisfies ExportedHandler;
```

`connect(address: SocketAddress | string, options?: optional SocketOptions)` : `Socket`

## Options / Props

### `SocketAddress`

| Name | Type | Description |
|------|------|-------------|
| `hostname` | string | The hostname to connect to. Example: `cloudflare.com`. |
| `port` | number | The port number to connect to. Example: `5432`. |

### `SocketOptions`

| Name | Type | Description |
|------|------|-------------|
| `secureTransport` | "off" \| "on" \| "starttls" (default `off`) | Whether to use TLS. `off`: no TLS. `on`: TLS. `starttls`: no TLS initially, upgradable by calling `startTls()`. |
| `allowHalfOpen` | boolean (default `false`) | When `false`, the writable side automatically closes on EOF; when `true`, it remains open on EOF. Similar to the Node.js `net` module option. |

### `SocketInfo`

| Name | Type | Description |
|------|------|-------------|
| `remoteAddress` | string \| null | Address of the remote peer. May not always be set. |
| `localAddress` | string \| null | Address of the local network endpoint. May not always be set. |

### `Socket`

| Name | Type | Description |
|------|------|-------------|
| `readable` | ReadableStream | Readable side of the TCP socket. |
| `writable` | WritableStream | Writable side; only accepts chunks of `Uint8Array` or its views. |
| `opened` | `Promise<SocketInfo>` | Resolved when the connection is established; rejected on error. |
| `closed` | `Promise<void>` | Resolved when the socket is closed; rejected on error. |
| `close()` | `Promise<void>` | Closes the TCP socket. Both streams are forcibly closed. |
| `startTls()` | Socket | Upgrades an insecure socket to TLS, returning a new `Socket`. Requires `secureTransport: "starttls"` on the initial `connect()`. |

StartTLS example:

Adapted (not in the official docs): `connect()` calls moved from module top level into a `fetch` handler; see Notes.

```typescript
import { connect } from "cloudflare:sockets"

export default {
  async fetch(request): Promise<Response> {
    const address = {
      hostname: "example-postgres-db.com",
      port: 5432
    };
    const socket = connect(address, { secureTransport: "starttls" });
    const secureSocket = socket.startTls();
    // ... use secureSocket.readable / secureSocket.writable
    return new Response("ok");
  }
} satisfies ExportedHandler;
```

Closing a connection:

Adapted (not in the official docs): duplicate `const reader` redeclaration removed and the code moved from module top level into a `fetch` handler; see Notes.

```typescript
import { connect } from "cloudflare:sockets"

export default {
  async fetch(request): Promise<Response> {
    const socket = connect({ hostname: "my-url.com", port: 70 });
    const reader = socket.readable.getReader();
    socket.close();

    // After close() is called, you can no longer read from the readable side of the socket
    try {
      socket.readable.getReader(); // This fails
    } catch (e) {
      return new Response("readable side is no longer usable: " + e, { status: 500 });
    }
    return new Response("unreachable");
  }
} satisfies ExportedHandler;
```

## Notes

- Adapted from the official docs: the official "Closing a connection" snippet redeclares `const reader` on the failing line, which is a syntax error before `close()` is ever reached; the redeclaration was dropped so only the failing call remains.
- Adapted from the official docs: the official StartTLS and "Closing a connection" snippets call `connect()` at module top level, which conflicts with the rule below that sockets must be created inside a handler; both were wrapped in a `fetch` handler (the surrounding handler and return values are not in the official snippets).
- For PostgreSQL, use Hyperdrive (https://developers.cloudflare.com/hyperdrive/), which provides `connect()` with built-in connection pooling and query caching.
- Outbound TCP connections are sourced from a prefix that is not part of the published Cloudflare IP ranges. Outbound sockets to Cloudflare IP ranges are blocked.
- `startTls()` can only be called if `secureTransport` is `starttls`; once called, the initial socket is closed and existing readers/writers no longer work (create new ones from the returned socket). Call it only once per socket.
- Wrap socket creation, reads and writes in `try...catch` to handle errors.
- TCP sockets cannot be created in global scope and shared across requests; always create them within a handler (`fetch()`, `scheduled()`, `queue()`) or `alarm()`.
- Each open socket counts towards the maximum simultaneous open connections limit.
- In a Durable Object, an open socket keeps the object in memory and incurs duration charges for up to 15 minutes per connection; after that the socket keeps operating but standard eviction rules resume.
- Outbound connections on port `25` (SMTP) are blocked by default; use Cloudflare Email Workers.
- A Worker can receive an inbound TCP connection forwarded from another Worker over a service binding by exporting a `connect()` handler.
- Troubleshooting: `proxy request failed, cannot connect to the specified address` (disallowed address such as Cloudflare IPs, `localhost`, private network IPs; use `fetch` for HTTP on port 80/443); `TCP Loop detected` (Worker connecting back to itself; unsupported); `Connections to port 25 are prohibited`.

## Related

- [Streams](./streams.md)
- [Fetch](./fetch.md)
- [Encoding](./encoding.md)
