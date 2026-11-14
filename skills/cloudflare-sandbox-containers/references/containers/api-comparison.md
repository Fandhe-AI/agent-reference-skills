---
source: https://developers.cloudflare.com/containers/api/, https://developers.cloudflare.com/containers/guides/migrate-to-durable-object-container-api/
---

# Migrate from the Container class to the Durable Object Container API

A Durable Object controls its container through `ctx.container`. The `@cloudflare/containers` package and its `Container` class are deprecated; this page maps each `Container` helper to the Durable Object Container API and lists the migration steps.

## Signature / Usage

Starting structure of the Durable Object Container API (TypeScript, from the previous version of the official API page, cloudflare-docs `d0995b9`):

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

The deprecated class-field style it replaces (see container-class.md):

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
| `start()`, `stop()`, `destroy()` | Container class | — | Replace with `start()`, `signal()` and `destroy()` on `ctx.container`. |
| `defaultPort`, `fetch()`, `containerFetch()` | Container class | — | Replace with `getTcpPort(port).fetch()` and your own request routing. |
| `startAndWaitForPorts()`, `waitForPort()` | Container class | — | Replace with a readiness check with `getTcpPort()` in application code. |
| Concurrent start handling | Container class | — | Use one shared startup promise in the Durable Object. |
| `envVars`, `entrypoint` | Container class | — | Replace with the `env` and `entrypoint` options of `start()`. |
| `sleepAfter`, `onActivityExpired()` | Container class | — | Replace with `setInactivityTimeout()`. |
| `onStart()`, `onStop()`, `onError()` | Container class | — | Replace with application code around `start()` and `monitor()`. |
| `schedule()` | Container class | — | Replace with Durable Object alarms. |
| `enableInternet` | Container class | — | Replace with the `enableInternet` option of `start()`. The `Container` class allows Internet access by default. `start()` does not. Pass `enableInternet: true` to keep the old behavior. |
| `outbound`, `outboundByHost`, `allowedHosts`, `deniedHosts`, `interceptHttps` | Container class | — | Replace with `interceptOutboundHttp()`, `interceptAllOutboundHttp()` and `interceptOutboundHttps()` with a `WorkerEntrypoint` (see outbound-traffic.md). |
| `getContainer(binding, name)` | Container class | — | Replace with `binding.getByName(name)`. Without a name, `getContainer(binding)` used the name `cf-singleton-container`. |
| `getRandom(binding, count)` | Container class | — | Replace with ``binding.getByName(`instance-${Math.floor(Math.random() * count)}`)``. Keep the `instance-` prefix to reach the same Durable Objects (see scaling-and-routing.md). |

## Notes

- Migration (Container class to direct API): the implementation can change without replacing the Durable Object. Keep the Worker name, exported class name, binding, container image and existing migration tags unchanged; changing the TypeScript base class does not require a new Durable Object migration. Keep the same image in the `containers` section of your Wrangler configuration unless you intend to change the container application itself.
- Steps: (1) change the class to extend `DurableObject` from `cloudflare:workers`, keeping the exported class name; (2) replace `start()` with `ctx.container.start()` (pass `enableInternet: true` if the container needs Internet access) and `stop()` with `signal()` or `destroy()`; do not assume `start()` waits for a port to become ready; (3) replace `defaultPort`, `containerFetch()` and automatic `fetch()` routing with `getTcpPort(port).fetch()` and your own routing, checking port readiness before forwarding; (4) replace `sleepAfter` with `setInactivityTimeout()`, and lifecycle hooks and `schedule()` with application code, `monitor()` and alarms; (5) replace outbound properties and handlers with intercepts that you register each time the container starts; (6) replace `getContainer()` and `getRandom()` with `getByName()` using the same names, so requests reach the existing Durable Objects and their storage; (7) test startup, concurrent requests, readiness, idle shutdown, alarm delivery, storage continuity and recovery after a container restart. A container can be temporarily unavailable after `signal()` or `destroy()`: retry allocation before checking port readiness. Then remove the `ContainerProxy` export and any other imports of `@cloudflare/containers`, and remove the package from your dependencies.
- The `Container` class does not support the `durable_object` scheduling policy; the policy's own migration is in scheduling-policy.md.
- The official API overview page now lists only the Durable Object Container API; the former Container class reference page was removed on 2026-11-09. The comparison table of the earlier API overview page (direct API versus class) is superseded by the helper mapping above.
- Source: https://developers.cloudflare.com/containers/guides/migrate-to-durable-object-container-api/ and https://developers.cloudflare.com/containers/api/ (cloudflare-docs production `34d908a`, fetched 2026-11-14).

## Related

- [Durable Object Container API](./durable-object-container.md)
- [Container class (deprecated)](./container-class.md)
- [Scheduling policy](./scheduling-policy.md)
- [Execute commands](./execute-commands.md)
