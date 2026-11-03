---
source: https://developers.cloudflare.com/containers/get-started/
---

# Get started

Deploy a Worker that routes requests to one or more containers, each running a small Go web server. This guide uses the `Container` class; you can also manage containers directly through `ctx.container` (see api-comparison.md).

## Signature / Usage

Prerequisite: Docker (or a compatible tool such as Colima) running locally during `wrangler deploy`. `docker info` succeeds when it is running.

```
npm create cloudflare@latest -- --template=cloudflare/templates/containers-template
```

Redeploy after code changes:

```
npx wrangler deploy
```

Check status:

```
npx wrangler containers list
npx wrangler containers images list
```

Wrangler configuration of the template:

```jsonc
{
	"containers": [
		{
			"max_instances": 10,
			"class_name": "MyContainer",
			"image": "./Dockerfile",
		},
	],
	"durable_objects": {
		"bindings": [
			{
				"name": "MY_CONTAINER",
				"class_name": "MyContainer",
			},
		],
	},
	"exports": {
		"MyContainer": {
			"type": "durable-object",
			"storage": "sqlite",
		},
	},
}
```

Adapted (not in the official docs): the official snippet is labelled JavaScript but uses TypeScript `override` and a type annotation; plain JavaScript version, with the `Container` import.

```js
import { Container } from "@cloudflare/containers";

export class MyContainer extends Container {
	defaultPort = 8080;
	sleepAfter = "10s";
	envVars = {
		MESSAGE: "I was passed in via the container class!",
	};

	onStart() {
		console.log("Container successfully started");
	}

	onStop() {
		console.log("Container successfully shut down");
	}

	onError(error) {
		console.log("Container error:", error);
	}
}
```

Routing in the Worker's `fetch` handler. Adapted (not in the official docs): the official fragment names an instance from the raw request path (any caller can create unlimited instances), uses undefined `pathname` and a missing `getRandom` import; this version imports `getRandom`, derives `pathname`, and only accepts two fixed instance paths; see Notes.

```js
import { getRandom } from "@cloudflare/containers";

// Fixed allow-list of instance names: never name instances from unvalidated input.
const ALLOWED_PATHS = new Set(["/container/1", "/container/2"]);

export default {
	async fetch(request, env) {
		const { pathname } = new URL(request.url);

		if (ALLOWED_PATHS.has(pathname)) {
			const container = env.MY_CONTAINER.getByName(pathname);
			return await container.fetch(request);
		}

		if (pathname.startsWith("/lb")) {
			const container = await getRandom(env.MY_CONTAINER, 3);
			return await container.fetch(request);
		}

		return new Response("Not found", { status: 404 });
	},
};
```

Container image (Go) reading the class `envVars` and an auto-generated variable:

```go
func handler(w http.ResponseWriter, r *http.Request) {
	message := os.Getenv("MESSAGE")
	instanceId := os.Getenv("CLOUDFLARE_DEPLOYMENT_ID")

	fmt.Fprintf(w, "Hi, I'm a container and this is my message: %s, and my instance ID is: %s", message, instanceId)
}
```

## Notes

- On deploy Wrangler uploads the Worker, builds and pushes the image with Docker, and updates instances. The first build and push take longest; later deploys reuse cached layers. Wait several minutes after the first deploy: the Worker URL may respond while containers are still provisioning and calls can error.
- Try the deployed Worker at `https://hello-containers.<YOUR_WORKERS_SUBDOMAIN>.workers.dev`: `/container/1` and `/container/2` route to specific containers (each path maps to a unique container; the first request to a new path is slower because a container boots), and `/lb` load-balances across three random containers.
- Config: `image` may be a Dockerfile, a directory containing a Dockerfile, or a fully qualified reference such as `registry.cloudflare.com/<YOUR_ACCOUNT_ID>/<IMAGE>:<TAG>`; `class_name` must be a Durable Object class name; `max_instances` caps simultaneously running instances; `exports` declares the class with SQLite storage (the legacy `migrations` array may remain but cannot be combined with `exports`).
- The image must run on `linux/amd64`. `defaultPort` also blocks requests until the container listens on that port.
- Use `getRandom` for stateless interchangeable containers; request specific instances for stateful services, short-lived jobs, fine-grained lifecycle control, or chained container calls.
- Adapted from the official docs: the official routing names an instance from the whole request path (`getByName(pathname)`), so any caller could create arbitrary numbers of instances; the snippet uses a fixed allow-list (`/container/1`, `/container/2`) instead. Authenticate callers before deriving instance names from request input, and note `/lb` is still unauthenticated and can start up to three containers.
- The dashboard under Workers & Pages > Containers shows status, health, metrics and logs.

## Related

- [Overview](./overview.md)
- [Container class](./container-class.md)
- [Wrangler configuration](./wrangler-configuration.md)
- [Deploy](./deploy.md)
- [FAQ](./faq.md)
