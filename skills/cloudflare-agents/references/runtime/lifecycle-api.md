---
source: https://developers.cloudflare.com/agents/runtime/lifecycle/api-reference/
---

# Lifecycle API

Reference for every export of `agents/lifecycle` (stable): `Lifecycle`, capability hooks, services, job and context types, and connection types.

## Signature / Usage

A capability that accepts its own WebSockets:

```ts
import {
	LifecycleCapability,
	type CapabilityWebSocketUpgradeContext,
	type WSMessage,
} from "agents/lifecycle";

const TAG = "echo";

export class EchoSockets extends LifecycleCapability {
	constructor() {
		super("echo-sockets");
	}

	onWebSocketUpgrade({
		request,
	}: CapabilityWebSocketUpgradeContext): Response | undefined {
		if (!new URL(request.url).pathname.endsWith("/echo")) return;
		const { 0: client, 1: server } = new WebSocketPair();
		server.serializeAttachment({ owner: TAG });
		this.lifecycle.sockets.accept(server, [TAG]);
		return new Response(null, { status: 101, webSocket: client });
	}

	onWebSocketMessage(ws: WebSocket, message: WSMessage): boolean {
		if (!this.#owns(ws)) return false;
		ws.send(message);
		return true;
	}

	onWebSocketClose(ws: WebSocket, code: number, reason: string): boolean {
		if (!this.#owns(ws)) return false;
		ws.close(code, reason);
		return true;
	}

	get connectionCount(): number {
		return this.lifecycle.sockets.get(TAG).length;
	}

	#owns(ws: WebSocket): boolean {
		const attachment = ws.deserializeAttachment() as { owner?: string } | null;
		return attachment?.owner === TAG;
	}
}
```

## Options / Props

Exports:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `Lifecycle` | Class | — | Installs on a Durable Object; runs startup, routing, jobs, and the alarm. |
| `LifecycleOptions` | Type | — | Options for `Lifecycle.install()` / `new Lifecycle()`. |
| `LifecycleObject` | Interface | — | A Durable Object with a `lifecycle` field and host hooks. |
| `LifecycleCapability` | Abstract class | — | Base class for capabilities that use Lifecycle services. |
| `DurableObjectCapability` | Interface | — | The hooks the Lifecycle calls on a capability. |
| `LifecycleServices` | Type | — | Services available as `this.lifecycle` in a `LifecycleCapability`. |
| `LifecycleStatus` | Type | — | `"zero"`, `"starting"`, or `"started"`. |
| `LifecycleSockets` | Type | — | Hibernatable WebSocket access for a capability. |
| `LifecycleEvents`, `LifecycleEvent` | Type | — | Best-effort event publishing; one published event. |
| `LifecycleRoutes`, `LifecycleRouteAddress`, `LifecycleRouteContext` | Type | — | Message routing between Lifecycles; address; argument of `onRoute()`. |
| `LifecycleHostContextScope` | Type | — | Connection and request passed to `runInHostContext()`. |
| `CapabilityStartContext`, `CapabilityRequestContext`, `CapabilityWebSocketUpgradeContext` | Type | — | Arguments of `onStart()`, `onRequest()`, `onWebSocketUpgrade()`. |
| `LifecycleJobs`, `LifecycleJob`, `LifecycleJobPushOptions`, `LifecycleJobContext`, `LifecycleJobOutcome` | Type | — | Job queue types (see Jobs and alarms). |
| `MemoryLimitContext` | Type | — | Argument of `onMemoryLimit()` / `onAlarmMemoryLimit()`. |
| `getCurrentAgent`, `CurrentAgentContext` | Function, Type | — | Reads the current object, request, connection. |
| `Connection`, `ConnectionContext`, `ConnectionState`, `ConnectionSetStateFn`, `WSMessage` | Type | — | Connection types. |

`Lifecycle<Env, Props>` members:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `Lifecycle.install(host, options?)` | static | — | Constructs and calls `installHandlers()`. |
| `new Lifecycle(host, options?)` | constructor | — | Constructs without installing handlers. |
| `installHandlers()` | method | — | Installs `fetch`, `alarm`, `webSocketMessage`, `webSocketClose`, `webSocketError` unless the host defines them. Throws if called twice. |
| `use(capability)` | `this` | — | Installs a capability. Throws after startup, on duplicate ID, or second catch-all for the same hook. |
| `start(props?)` | `Promise<void>` | — | Starts capabilities and the host. Call it in RPC methods. |
| `isStarted()` | `boolean` | — | True after every capability and host `onStart()` finished. |
| `name` | `string` | — | From `ctx.id.name`; throws when the object has no name. |
| `jobs` | `LifecycleJobs` | — | The host's view of the job queue. |
| ``sql`...` `` | `T[]` | — | Query with bound parameters. |
| `rearmAlarm()` | `Promise<void>` | — | Set the alarm from the job queue. |
| `trackAlarmWork(promise)` | `boolean` | — | Keeps handed-off work in the alarm's memory-limit protection; `false` outside an alarm. |
| `dispose()` | `Promise<void>` | — | Calls each capability's `dispose()` in reverse order. |
| `disableAlarms()` | `Promise<void>` | — | Deletes the alarm and stops re-setting it. |

`LifecycleOptions`:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `maxAlarmMemoryLimitStrikes` | `number` | `3` | Consecutive memory-limit resets before the breaker deletes recovery jobs. |

`LifecycleObject` host hooks: `onStart(props?)`, `onRequest(request)`, `onAlarm()`, `onJob(context)`, `onAlarmMemoryLimit(context)`. It is the default type parameter of `getCurrentAgent()`.

`DurableObjectCapability<Props>` hooks (all optional, run outside the host context):

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `claims` | `"selective" \| "catch-all"` | `"selective"` | How the capability claims traffic. |
| `onStart(context)` | `void` | — | Create tables or restore state; registration order, before host `onStart()`. `context.props` holds startup props. |
| `onRequest(context)` | `Response \| undefined` | — | Handle an HTTP request, or pass with `undefined`. |
| `onWebSocketUpgrade(context)` | `Response \| undefined` | — | Claim an upgrade; the capability then owns the socket. |
| `onWebSocketMessage(ws, message)` | `boolean \| void` | — | Handle a message on a hibernated socket; return `true` to consume. |
| `onWebSocketClose(ws, code, reason, wasClean)` | `boolean \| void` | — | As above, for close. |
| `onWebSocketError(ws, error)` | `boolean \| void` | — | As above, for error. |
| `onJob(context)` | `LifecycleJobOutcome \| void` | — | Run one due job the capability pushed. Keep it short. |
| `onJobError(context, error)` | `LifecycleJobOutcome \| void` | — | After a job fails its last retry; returning nothing completes it. |
| `onMemoryLimit(context)` | `void` | — | Policy after a memory-limit reset; runs before the host's `onAlarmMemoryLimit()`. |
| `onRoute(context)` | `unknown` | — | Handle a message routed to this capability's ID; return goes to the sender. |
| `dispose()` | `void` | — | Release live resources on explicit teardown. Not run on eviction. |

`LifecycleCapability` and `LifecycleServices`:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `constructor(id)` | protected | — | Stable capability ID; throws on empty ID. |
| `capabilityId` | `string` | — | The ID passed to the constructor. |
| `lifecycle` | `LifecycleServices` | — | Protected; throws if the capability is not installed. (`lifecycleServices` is the same or `undefined` before installation.) |
| `name`, `className` | `string` | — | Object name; host class name as exported from the Worker. |
| `storage` | `DurableObjectStorage` | — | The object's storage, including `storage.sql`. |
| `sockets` | `LifecycleSockets` | — | `accept(ws, tags)` accepts a server WebSocket for hibernation; `get(tag?)` returns hibernated sockets (including other capabilities', so filter by your own tag). |
| `ready()`, `status()` | functions | — | Resolve once startup finished (rejects if startup fails); `"zero"` / `"starting"` / `"started"`. |
| `jobs`, `trackAlarmWork(promise)` | — | — | The capability's job queue view; alarm-work tracking. |
| `runInHostContext(fn, scope?)` | `Promise<unknown>` | — | Runs user code in the host context so `getCurrentAgent()` works. |
| `events` | `LifecycleEvents` | — | `emit(type, payload)`; `source` and `type` must be non-empty. |
| `routes` | `LifecycleRoutes` | — | `source`, `toRoot(payload)`, `to(target, payload)`. |

Connection types: `Connection<TState>` (a `WebSocket` with `id`, `uri`, read-only `state`, `setState()`, `tags`; first tag is always the connection ID), `ConnectionContext` (`{ request }`), `ConnectionState<T>` (immutable or `null`, stored in the hibernation attachment), `ConnectionSetStateFn<T>` (`(prevState) => T`), `WSMessage` (`string | ArrayBuffer | ArrayBufferView`).

## Notes

- Dispatch: `onStart()` on every capability in registration order; `onRequest()` / `onWebSocketUpgrade()` in registration order with the catch-all last (first `Response` wins); socket message/close/error offered in order until one returns `true` (unconsumed events are ignored); `onJob()` / `onJobError()` only to the pushing capability; `onRoute()` only to the capability whose ID the message names; `onMemoryLimit()` and `dispose()` run on all (a failure does not stop the next; `dispose()` in reverse order).
- Events emitted before startup finishes are held. On a plain Durable Object, each event is published to an `agents:*` diagnostics channel chosen by the `type` prefix (unknown prefixes go to `agents:lifecycle`) with `agent`, `name`, and `timestamp` added.
- Routing between Lifecycles needs a host-provided transport (the `Agent` class provides one for sub-agents). On a plain Durable Object `source` is `undefined`, `toRoot()` delivers to the capability's own `onRoute()`, and `to()` throws.
- A capability owning its sockets must recognize them via the hibernation attachment and return `true` only for its own; `WebSockets` is an upgrade catch-all, so `EchoSockets` is offered each upgrade first whatever the install order. For most clients use the `WebSockets` capability.

## Related

- [Lifecycle](./lifecycle.md)
- [Jobs and alarms](./job-queue.md)
- [Build a capability](./build-a-capability.md)
- [WebSockets](./websockets.md)
