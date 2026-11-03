---
source: https://developers.cloudflare.com/agents/runtime/lifecycle/get-current-agent/
---

# getCurrentAgent()

Returns the Durable Object handling the current invocation, with its request or WebSocket connection. For shared code without access to `this` (tools, logging helpers, library functions).

## Signature / Usage

```ts
import { DurableObject } from "cloudflare:workers";
import { getCurrentAgent, Lifecycle } from "agents/lifecycle";

function requestOrigin(): string | undefined {
	const { request } = getCurrentAgent();
	return request ? new URL(request.url).origin : undefined;
}

export class MyAgent extends DurableObject<Env> {
	readonly lifecycle = Lifecycle.install(this);

	onRequest(): Response {
		return Response.json({ origin: requestOrigin() });
	}

	greeting(): string {
		return "hello";
	}
}

export function greet(): string | undefined {
	const { agent } = getCurrentAgent<MyAgent>();
	return agent?.greeting();
}
```

## Options / Props

Return value `CurrentAgentContext<Host>`:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `agent` | `Host \| undefined` | — | The Durable Object handling the invocation. |
| `connection` | `Connection \| undefined` | — | The WebSocket connection, inside `WebSockets` capability handlers. |
| `request` | `Request \| undefined` | — | The HTTP request, inside `onRequest()` or a connect handler. |
| `email` | `unknown` | — | The email, inside the `Agent` class email handler. |

Context availability:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `onStart()`, `onAlarm()`, `onJob()`, `onAlarmMemoryLimit()` | invocation | — | agent: yes; connection: no; request: no. |
| `onRequest()` | invocation | — | agent: yes; connection: no; request: yes. |
| `WebSockets` `onConnect` | invocation | — | agent: yes; connection: yes; request: yes. |
| `WebSockets` `onMessage`, `onClose`, `onError` | invocation | — | agent: yes; connection: yes; request: no. |
| `Scheduler` callbacks | invocation | — | agent: yes; connection: no; request: no. |
| Capability hooks (e.g. a capability's `onJob()`) | invocation | — | all no. |
| Native RPC methods | invocation | — | all no. |

## Notes

- Every value is `undefined` outside an invocation that the Lifecycle started; check `agent` before use. Without a type parameter, `agent` is a `LifecycleObject`; inside your own class prefer `this`.
- `Scheduler` callbacks run from the alarm in a fresh invocation and do not see the request or connection that created the schedule.
- Capability hooks run with the context cleared; a capability that calls user code wraps the call in `this.lifecycle.runInHostContext()` (optionally passing a connection or request as the second argument).
- The context only follows the call tree of an invocation the Lifecycle started. Native Durable Object RPC methods, service bindings, Worker Loader child isolates, and other entry points holding a reference to the object get `undefined` values.
- `getCurrentAgent()` from `agents` is the same function typed for the `Agent` class, which also wraps your class's own methods (so it works inside them, including over RPC; restored context has `connection`, `request`, `email` unset), sets `email` in `onEmail()`, and `connection` in `onConnect()` / `onMessage()`.

## Related

- [Lifecycle](./lifecycle.md)
- [Lifecycle API](./lifecycle-api.md)
- [Build a capability](./build-a-capability.md)
