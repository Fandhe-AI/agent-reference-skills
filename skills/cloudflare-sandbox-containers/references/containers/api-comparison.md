---
source: https://developers.cloudflare.com/containers/api/, https://developers.cloudflare.com/containers/guides/migrate-to-durable-object-container-api/
---

# Choose an API and migrate from the Container class

Two APIs address the same container runtime: the Durable Object Container API (`ctx.container`, recommended for new applications) and the `Container` class from `@cloudflare/containers` (documented for existing applications).

## Signature / Usage

Starting structure of each API:

```ts
import { DurableObject } from "cloudflare:workers";

interface Env {}

export class MyContainer extends DurableObject<Env> {
	fetch(): Response {
		const container = this.ctx.container;
		if (!container) {
			return new Response("No container is configured", { status: 500 });
		}
		if (container.running) {
			return new Response("Container is running");
		}
		container.start();
		return new Response("Container is starting", { status: 202 });
	}
}
```

```ts
import { Container } from "@cloudflare/containers";

export class MyContainer extends Container {
	defaultPort = 8080;
	sleepAfter = "10m";
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Start and stop | — | — | Direct API: `start()`, `signal()`, `destroy()`. Container class: `start()`, `stop()`, `destroy()`. |
| Send and proxy traffic | — | — | Direct API: `getTcpPort(port).fetch()` and `.connect()`. Container class: `fetch()` and `containerFetch()`. |
| Execute another process | — | — | Direct API: `exec()`. Container class: `ctx.container.exec()`. |
| Check port readiness | — | — | Direct API: `getTcpPort()` in application code. Container class: `startAndWaitForPorts()` and `waitForPort()`. |
| Handle concurrent starts | — | — | Direct API: coordinate calls to `start()` yourself. Container class: handled by `start()` and `startAndWaitForPorts()`. |
| Run lifecycle hooks | — | — | Direct API: `monitor()` and application code. Container class: `onStart()`, `onStop()`, `onError()`, `onActivityExpired()`. |
| Stop inactive containers | — | — | Direct API: `setInactivityTimeout()`. Container class: `sleepAfter` and `onActivityExpired()`. |
| Schedule callbacks | — | — | Direct API: Durable Object `ctx.storage.setAlarm()`. Container class: `schedule()`. |

## Notes

- Starting a container with the direct API does not mean its ports are ready; use `getTcpPort()` after checking port readiness. The direct API also supports latency-sensitive workloads and applications needing a smaller storage footprint.
- Migration (Container class to direct API): the implementation can change without replacing the Durable Object. Keep the Worker name, exported class name, binding, image and existing migration tags; changing the base class needs no new Durable Object migration. Keep the same `containers` image unless you intend to change the application.
- Steps: (1) extend `DurableObject` from `cloudflare:workers`, keeping the class name; (2) replace `start()` with `ctx.container.start()` and `stop()` with `signal()` or `destroy()` (start does not wait for a port); (3) replace `defaultPort`, `containerFetch()` and automatic `fetch()` routing with `getTcpPort(port).fetch()` plus your own routing, checking readiness first; (4) replace `sleepAfter` with `setInactivityTimeout()`, and hooks and `schedule()` with application code, `monitor()` and alarms; (5) test startup, concurrent requests, readiness, idle shutdown, alarm delivery, storage continuity and restart recovery. A container can be briefly unavailable after `stop()` or `destroy()`: retry allocation before checking port readiness. Remove `@cloudflare/containers` only if nothing else imports it.
- The `Container` class does not support the `durable_object` scheduling policy.
- The first snippet is TypeScript from the official page; the second shows the class-field style (see container-class.md).

## Related

- [Durable Object Container API](./durable-object-container.md)
- [Container class](./container-class.md)
- [Scheduling policy](./scheduling-policy.md)
- [Execute commands](./execute-commands.md)
