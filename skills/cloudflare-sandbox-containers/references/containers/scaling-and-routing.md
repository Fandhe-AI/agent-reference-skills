---
source: https://developers.cloudflare.com/containers/configuration/scaling-and-routing/
---

# Scaling and routing

Containers scale manually: address a Durable Object by name with `getByName()` and it starts its own container instance. Choose a name at random from a fixed pool to spread load over stateless instances.

## Signature / Usage

Adapted (not in the official docs): `nameOne` / `nameTwo` replaced by fixed literal names and the snippet wrapped in an async `fetch` handler (the source runs `await` and uses `env` / `request` at top level). Never take these names from unauthenticated request input.

```ts
export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		// Get two Durable Objects. Each one starts its own container instance.
		const containerOne = env.MY_CONTAINER.getByName("instance-one");
		const containerTwo = env.MY_CONTAINER.getByName("instance-two");

		// The Durable Object starts its container when it handles a request.
		return containerOne.fetch(request);
	},
} satisfies ExportedHandler<Env>;
```

Route across a fixed pool of instances:

```ts
const INSTANCE_COUNT = 3;

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const index = Math.floor(Math.random() * INSTANCE_COUNT);
		return env.BACKEND.getByName(`instance-${index}`).fetch(request);
	},
} satisfies ExportedHandler<Env>;
```

## Notes

- Each container instance belongs to one Durable Object. Getting a Durable Object with [`getByName()`](https://developers.cloudflare.com/durable-objects/api/namespace/#getbyname) does not start its container; the container starts when the Durable Object calls `ctx.container.start()`.
- Each instance runs until the Durable Object stops it, or until the inactivity timeout set with `setInactivityTimeout()` elapses. Without a timeout, Cloudflare stops the container shortly after the Durable Object becomes inactive.
- Explicit names suit a per-user backend, a short-lived code sandbox for AI-generated code, or a batch job.
- Random selection from a fixed pool means you set a fixed number of instances and each request goes to a random instance regardless of location. Use it only for stateless instances.
- For the Durable Object that starts the container, waits for its port and forwards the request, refer to the official [Stateless instances](https://developers.cloudflare.com/containers/examples/stateless/) example.
- Instance names derived from request input must be authenticated and validated before use.
- Adapted from the official docs: the explicit-name snippet is wrapped in a handler and uses fixed names (see above); the pool example's JavaScript twin is omitted because the TypeScript fence is equivalent.
- Migration: the deprecated `Container` class from `@cloudflare/containers` mapped `getRandom(binding, count)` to `` binding.getByName(`instance-${Math.floor(Math.random() * count)}`) ``; keep the `instance-` prefix to reach the same Durable Objects. See api-comparison.md.
- Source: https://developers.cloudflare.com/containers/configuration/scaling-and-routing/ (cloudflare-docs production 34d908a, fetched 2026-11-14).

## Related

- [Durable Object Container API](./durable-object-container.md)
- [API comparison](./api-comparison.md)
- [Placement](./placement.md)
