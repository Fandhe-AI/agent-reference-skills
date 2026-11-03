---
source: https://developers.cloudflare.com/workers/examples/websockets/
---

# Using the WebSockets API

Accept a WebSocket upgrade with `WebSocketPair` and listen for messages on the server side.

```js
async function handleRequest(request) {
  const upgradeHeader = request.headers.get('Upgrade');
  if (!upgradeHeader || upgradeHeader !== 'websocket') {
    return new Response('Expected Upgrade: websocket', { status: 426 });
  }

  const webSocketPair = new WebSocketPair();
  const [client, server] = Object.values(webSocketPair);

  server.accept();
  server.addEventListener('message', event => {
    console.log(event.data);
  });

  return new Response(null, {
    status: 101,
    webSocket: client,
  });
}
```

## Notes

- `handleRequest` is the official snippet's function; call it from `fetch(request)` in your default export.
- Return the `client` end in a `101` response and call `accept()` on the `server` end to start receiving events.
- For coordination across multiple connections (chat rooms, game matches), the official docs recommend Durable Objects: https://developers.cloudflare.com/durable-objects/
- API details are in `../references/web-apis/websockets.md`.
