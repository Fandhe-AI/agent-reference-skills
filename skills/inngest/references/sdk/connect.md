# connect()

Establishes a persistent outbound WebSocket connection from your workers to Inngest. An alternative to `serve()` for long-running server environments.

## Signature / Usage

```ts
import { Inngest } from "inngest";
import { connect } from "inngest/connect";

const inngest = new Inngest({ id: "my-app" });

const connection = await connect({
  apps: [{ client: inngest, functions: [myFunction] }],
});
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `apps` | `Array<{ client: Inngest; functions: InngestFunction[] }>` | **Required.** One or more app definitions, each with a client and functions array. |
| `maxWorkerConcurrency` | `number` | Maximum concurrent steps executed by this worker instance. |
| `appVersion` | `string` | App version tag (e.g. git SHA) to support rolling deployments. |

### Connection states

| State | Description |
|-------|-------------|
| `CONNECTING` | Establishing WebSocket gateway connection. |
| `ACTIVE` | Ready; receiving heartbeats and executing functions. |
| `RECONNECTING` | Auto-reconnecting after a disconnection. |
| `CLOSING` | Graceful shutdown initiated. |
| `CLOSED` | Connection terminated. |

## Notes

- Requires TypeScript SDK **3.34.1+**.
- Not compatible with serverless platforms (AWS Lambda, Vercel Functions). Use `serve()` for those.
- Ideal for container runtimes (Kubernetes, ECS, Render, Fly.io).
- Steps execute over the open WebSocket; if the connection drops, the SDK falls back to the HTTP API.
- The SDK automatically handles `SIGTERM`/`SIGINT` for graceful shutdown.
- Free plan: 3 concurrent worker connections; paid plans: 20; maximum 10 apps per connection.
- Set `INNGEST_DEV=1` to connect to the local dev server without credentials.

## Related

- [serve()](./serve.md)
- [Inngest Client](./inngest-client.md)
- [Environment Variables](./environment-variables.md)
