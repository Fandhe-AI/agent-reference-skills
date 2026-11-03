---
source: https://developers.cloudflare.com/durable-objects/concepts/durable-object-lifecycle/
---

# Lifecycle of a Durable Object

How a Durable Object is instantiated, becomes active, goes idle, hibernates, and is evicted, plus shutdown behavior and working without shutdown hooks.

## Signature / Usage

```js
const stub = env.MY_DURABLE_OBJECT.getByName("foo");
// Now the request is sent to the remote Durable Object.
const rpcResponse = await stub.sayHello();
```

Adapted (not in the official docs): the official example uses `forEach(async ...)`, which does not wait for items or keep order; a `for...of` loop is used.

```js
// Good: Write progress as you go
async processData(data) {
  for (const [index, item] of data.entries()) {
    await this.processItem(item);
    // Save progress frequently
    await this.ctx.storage.put("lastProcessedIndex", index);
  }
}
```

## Options / Props

### Lifecycle states

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Active, in-memory | state | — | Running in memory and handling requests. Incurs duration charges. |
| Idle, in-memory non-hibernateable | state | — | Waiting for events but not meeting hibernation criteria. Incurs duration charges. |
| Idle, in-memory hibernateable | state | — | Meets hibernation criteria; the runtime decides when to hibernate (currently after 10 seconds of inactivity). |
| Hibernated | state | — | Removed from memory; hibernated WebSocket connections stay connected. |
| Inactive | state | — | Completely removed from the host process; may need a cold start. Initial state of every object. |

## Notes

- Creating a stub does not send a request; the lifecycle begins when a method is invoked on the stub.
- The first request or event (like an alarm) from the non-running state runs the class `constructor()`, then the invoked function. A request while hibernated runs the constructor again.
- Hibernation requires all of: no `setTimeout`/`setInterval` callbacks pending; no unfinished I/O or promise passed to `ctx.waitUntil()` and no open outbound connection; no use of the Standard WebSocket API; no request/event still being processed. After 10 seconds with all conditions met the object hibernates and its in-memory state is discarded.
- In the idle non-hibernateable state, after 70-140 seconds of inactivity the object is evicted and becomes inactive.
- Pending operations prevent eviction (service binding requests, object RPC calls, outbound `fetch()`, `ctx.container.monitor()`, `ctx.waitUntil()` promises, pending timers, TCP sockets, outbound WebSockets), each until it completes or for up to 15 minutes from its start. Windows of operations started together do not combine, and a later operation can extend the time in memory. During that time duration charges accrue.
- An active profiling session prevents eviction but not hibernation.
- Shutdown can result from `immediate` code updates or a `deferred` update reaching `max_delay`, inactivity, runtime updates, or hosting decisions. After shutdown the object restarts and new requests go to the new instance. In-flight HTTP/RPC requests may finish if they do not access storage; a request that accesses storage is stopped immediately with an error to preserve global uniqueness. During runtime updates in-flight requests have up to 30 seconds. WebSocket connections are terminated automatically. Other invocations (email, cron) are treated like HTTP requests.
- Deploying a new Worker version is not delayed by a code update strategy; the strategy controls when each active object adopts the new version. See the code-updates page.
- No shutdown hooks are provided because they could not be guaranteed. Write state incrementally.
- Corrected from the official docs: the "write progress as you go" example used `forEach(async ...)`.

## Related

- [What are Durable Objects?](./what-are-durable-objects.md)
- [Code updates](./code-updates.md)
- [Pricing](./pricing.md)
- [In-memory state](./in-memory-state.md)
- [WebSockets](./websockets.md)
