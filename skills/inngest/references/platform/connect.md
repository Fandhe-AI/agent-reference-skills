# Connect (Workers)

Persistent outbound WebSocket connections from worker processes to Inngest, enabling horizontal scaling without inbound HTTP routing — optimized for containers (Kubernetes, ECS).

## Signature / Usage

```ts
import { connect } from "inngest/connect";
import { inngest } from "./inngest/client";
import { myFunction } from "./inngest/functions";

const connection = await connect({
  apps: [{ client: inngest, functions: [myFunction] }],
});
```

## Options / Props

| Option | Type | Description |
|--------|------|-------------|
| `apps` | `Array<{ client, functions }>` | Apps and their functions to expose via this connection |
| `appVersion` | `string` | Deployed app version identifier (git SHA, Docker tag); supports rolling deployments |
| `instanceId` | `string` | Unique worker instance ID (defaults to container hostname) |
| `maxWorkerConcurrency` | `number` | Maximum concurrent steps per worker instance |
| `gatewayUrl` | `string` | Custom WebSocket gateway URL (for self-hosted Inngest) |

## Notes

- **Public beta** — API may change
- Minimum SDK versions: TypeScript 3.34.1+, Go 0.11.2+, Python 0.5.0+ (`pip install inngest[connect]`)
- Runtime requirements for TypeScript: Node 22.4.0+, Deno 1.4+, or Bun 1.1+; serverless platforms are not supported
- Connection limits by plan: Free = 3 concurrent connections; Paid = 20 concurrent connections; max 10 apps per connection
- Connection lifecycle states: CONNECTING → ACTIVE → RECONNECTING → CLOSING → CLOSED
- Automatically reconnects on disconnection; listens for SIGTERM/SIGINT for graceful shutdown (existing steps complete before termination)
- First connected worker syncs function configurations automatically (unlike `serve`, no manual sync needed)
- Rolling deployments: Inngest routes functions to all compatible connected workers regardless of version, preventing traffic concentration
- Kubernetes health check: expose an HTTP endpoint returning 200 when `connection.state === ACTIVE`; configure `readinessProbe` for orchestration
- Self-hosted Inngest: ensure port 8289 (Connect gateway) is accessible; set `gatewayUrl` if the default is not reachable
- Observability: Inngest Cloud dashboard shows per-worker metrics (instance ID, connection status, heartbeat, app version)

## Related

- [Self-Hosting](./self-hosting.md)
- [Signing Keys](./signing-keys.md)
- [Event Keys](./event-keys.md)
