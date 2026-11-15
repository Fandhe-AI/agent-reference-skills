---
source: https://docs.cloud.google.com/run/docs/triggering/websockets
---

# Use WebSockets

WebSockets are supported on Cloud Run with no extra configuration, but a WebSocket stream is a long-running HTTP request and is subject to the service's request timeout. Plan for client reconnects and for synchronizing data between instances.

## Signature / Usage

### Deploy the sample whiteboard service

```bash
git clone https://github.com/socketio/socket.io.git
```

```bash
cd socket.io/examples/whiteboard/
```

```bash
gcloud run deploy whiteboard --allow-unauthenticated --source=.
```

Open the service URL in two browser tabs; drawing in one propagates to the other because both connect to the same instance.

## Options / Props

| Topic | Guidance |
|---|---|
| Request timeout | Default 5 minutes, currently up to 60 minutes; raise it to the longest time you want a stream to stay open, for example 60 minutes. Clients are disconnected when it expires even if your server enforces no timeout |
| Reconnects | Clients must reconnect on timeout or server disconnect (for example `reconnecting-websocket`, or Socket.IO "disconnect" events) |
| Session affinity | Best-effort only; new connections can still reach other instances |
| HTTP/2 end-to-end | Do not enable |
| Concurrency | Up to 1,000 concurrent connections per container; raise the maximum concurrency above the default if the service can handle the load |
| Billing | An instance with any open WebSocket connection is active, so CPU is allocated and it is billed as instance-based billing |
| Cloud Load Balancing | WebSockets are also supported behind it |

## Notes

- Synchronizing data between instances: instances are stateless and autoscaled, so use an external store. A database such as Cloud SQL works by polling, but with request-based billing (the default) instances have no CPU when they are not handling any requests (a container with a connected client keeps CPU). Message queues work better because instances pull messages over connections they initiate: Redis Pub/Sub (Memorystore, for example Socket.IO redis adapter) or Firestore real-time updates. Each instance `SUBSCRIBE`s to a Redis channel and `PUBLISH`es client messages to it.
- The source says instances "do not have CPU" when the container is not handling any requests, without naming the billing setting; with instance-based billing CPU is allocated for the whole instance lifecycle (https://docs.cloud.google.com/run/docs/configuring/billing-settings).
- Example: with maximum concurrency 1,000, more than 1,000 chatroom users are served by different instances that do not see each other's messages without synchronization.
- Makes the service publicly accessible (`--allow-unauthenticated` in the sample command); use only for intentionally public content.
- The sample command deploys from source and clones a third-party repository; try it on a disposable project or service.
- Full chat tutorial: https://docs.cloud.google.com/run/docs/tutorials/websockets
- Cloud Run / Cloud Run functions are Google Cloud's serverless containers/functions, distinct from Cloudflare Workers (`cloudflare-workers`), Vercel Functions (`vercel`), and HTTP frameworks (`hono`, `fastify`) that run only inside the container.
- Source: https://docs.cloud.google.com/run/docs/triggering/websockets (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [https-request.md](./https-request.md)
- [grpc.md](./grpc.md)
- Request timeout: https://docs.cloud.google.com/run/docs/configuring/request-timeout
- Session affinity: https://docs.cloud.google.com/run/docs/configuring/session-affinity
