---
source: https://developers.cloudflare.com/containers/configuration/scaling-and-routing/
---

# Scaling and routing

Containers scale manually: get an instance by unique ID, then start it. Use `getRandom` to spread load over a fixed number of stateless instances. Uses `Container` class helpers.

## Signature / Usage

Adapted (not in the official docs): the page's `getRandom` snippet had TypeScript annotations in a JavaScript fence and did not export the class; both fixed. See Notes.

```js
import { Container, getRandom } from "@cloudflare/containers";

const INSTANCE_COUNT = 3;

export class Backend extends Container {
	defaultPort = 8080;
	sleepAfter = "2h";
}

export default {
	async fetch(request, env) {
		const containerInstance = await getRandom(env.BACKEND, INSTANCE_COUNT);
		return containerInstance.fetch(request);
	},
};
```

Adapted (not in the official docs): explicit-ID scaling, wrapped in an async handler (the source ran `await` at module top level with `env` undefined), with the unresolved `idOne`/`idTwo` replaced by fixed literal names. Never take these names from unauthenticated request input.

```js
import { getContainer } from "@cloudflare/containers";

export default {
	async fetch(request, env) {
		// get and start two container instances
		const containerOne = getContainer(env.MY_CONTAINER, "instance-one");
		await containerOne.startAndWaitForPorts();

		const containerTwo = getContainer(env.MY_CONTAINER, "instance-two");
		await containerTwo.startAndWaitForPorts();

		return new Response("Started two container instances");
	},
};
```

## Notes

- Getting a container does not start it. Each instance runs until its `sleepAfter` elapses or it is stopped manually.
- Explicit IDs suit a per-user backend, a short-lived code sandbox for AI-generated code, or a batch job.
- `getRandom` requires a fixed instance count and picks randomly regardless of location; use it only for stateless instances.
- Corrected from the official docs: the explicit-ID snippet called `startAndWaitForPorts()` without `await` on top-level lines and used undefined `idOne` / `idTwo`; the `getRandom` snippet annotated types (`Request`, `Env`) inside a JavaScript fence and declared `class Backend` without `export`, which the Durable Object binding needs. The explicit-ID code is wrapped in an async `fetch` handler (the source placed `await` and `env` at module top level, where neither is valid in a Worker).
- Instance IDs derived from request input must be authenticated and validated before use.

## Related

- [Container class](./container-class.md)
- [Placement](./placement.md)
