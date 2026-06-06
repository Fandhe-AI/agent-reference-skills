# Inngest Client

Core configuration object for an Inngest application. Used to create functions and send events.

## Signature / Usage

```ts
import { Inngest } from "inngest";

const inngest = new Inngest({
  id: "my-application",
});
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `id` | `string` | **Required.** Unique hyphenated slug identifying the application. |
| `eventKey` | `string` | Authentication key for sending events. Prefer `INNGEST_EVENT_KEY` env var. |
| `baseUrl` | `string` | Custom URL for event transmission. Overrides default Inngest Cloud endpoint. |
| `env` | `string` | Environment name used for Branch Environments. |
| `isDev` | `boolean` | Force dev mode (`true`) or cloud mode (`false`). Defaults to auto-detect. |
| `logger` | `Logger` | Custom logger with `info`, `warn`, `error`, `debug` methods. |
| `internalLogger` | `Logger` | Controls internal SDK logging separately from application logs. |
| `middleware` | `Middleware[]` | Stack of middleware applied to all functions on this client. |
| `fetch` | `typeof fetch` | Override the default fetch implementation (useful for edge runtimes). |
| `signingKey` | `string` | Signing key for request verification. Prefer `INNGEST_SIGNING_KEY` env var. |
| `signingKeyFallback` | `string` | Fallback signing key used during key rotation (v3.18.0+). |

## Notes

- Instantiate the client in a single shared file (e.g. `inngest/client.ts`) and import it throughout your codebase.
- In **Cloud Mode** (default), signature verification is enabled and the client communicates with Inngest Cloud.
- In **Dev Mode**, signature verification is disabled and the client targets `http://localhost:8288`.
- For projects requiring both Node.js middleware and edge-compatible builds, maintain separate client instances.
- Prefer environment variables (`INNGEST_EVENT_KEY`, `INNGEST_SIGNING_KEY`) over hardcoding credentials in client options.

## Related

- [serve()](./serve.md)
- [createFunction()](./create-function.md)
- [inngest.send()](./send-event.md)
- [Middleware](./middleware.md)
- [Environment Variables](./environment-variables.md)
