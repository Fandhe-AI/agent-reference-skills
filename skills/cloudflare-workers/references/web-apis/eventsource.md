---
source: https://developers.cloudflare.com/workers/runtime-apis/eventsource/
---

# EventSource

`EventSource` is a server-sent event API that allows a server to push events to a client over HTTP in a text-based format.

## Signature / Usage

```js
let eventSource = new EventSource(url, options);
```

By default `EventSource` uses the global `fetch()`. To use a different fetch implementation provided by a Cloudflare Workers binding, pass the `fetcher` option:

```js
export default {
  async fetch(req, env) {
    let eventSource = new EventSource(url, { fetcher: env.MYFETCHER });
    // ...
  }
};
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `url` | USVString | The URL to which to connect. |
| `options` | EventSourceInit | An optional dictionary containing any optional settings. `fetcher` is a Cloudflare Workers specific extension. |
| `eventSource.url` | USVString (read-only) | The URL of the event source. |
| `eventSource.readyState` | USVString (read-only) | The state of the connection. |
| `eventSource.withCredentials` | Boolean (read-only) | Whether the object was instantiated with cross-origin (CORS) credentials set. |
| `eventSource.close()` | method | Closes the connection. |
| `eventSource.onopen` | handler | Called when a connection is opened. |
| `eventSource.onmessage` | handler | Called when a message is received. |
| `eventSource.onerror` | handler | Called when an error occurs. |
| `EventSource.from(readableStream)` | EventSource | Class method; Cloudflare Workers specific extension that creates an `EventSource` from an existing `ReadableStream`. Such an instance does not initiate a new connection but attaches to the provided stream. |

Events: `message` (message received), `open` (connection opened), `error` (error occurred).

## Related

- [Fetch](./fetch.md)
- [Streams](./streams.md)
- [WebSockets](./websockets.md)
