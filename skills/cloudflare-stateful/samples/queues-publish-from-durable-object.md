---
source: https://developers.cloudflare.com/queues/examples/use-queues-with-durable-objects/
---

# Publish to a Queue from a Durable Object

Route a request to a per-user Durable Object that publishes a message to a queue using its own `env` binding.

## Signature / Usage

Wrangler configuration (producer binding, Durable Object binding, migration):

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "my-worker",
	"queues": {
		"producers": [
			{
				"queue": "my-queue",
				"binding": "YOUR_QUEUE"
			}
		]
	},
	"durable_objects": {
		"bindings": [
			{
				"name": "YOUR_DO_CLASS",
				"class_name": "YourDurableObject"
			}
		]
	},
	"migrations": [
		{
			"tag": "v1",
			"new_sqlite_classes": [
				"YourDurableObject"
			]
		}
	]
}
```

Worker and Durable Object:

Adapted (not in the official docs): the official Worker takes the user ID from a `userId` query parameter and uses it as the Durable Object name. Here the name comes from a placeholder `authenticate()` that fails closed (returns `null`, so every request gets 401 until you implement it). See Notes.

```ts
import { DurableObject } from "cloudflare:workers";

interface Env {
  YOUR_QUEUE: Queue;
  YOUR_DO_CLASS: DurableObjectNamespace<YourDurableObject>;
}

// Placeholder: verify the caller (session cookie, JWT, mTLS, ...) and return a
// stable user ID, or null when the request is not authenticated.
async function authenticate(req: Request, env: Env): Promise<string | null> {
  return null;
}

export default {
  async fetch(req, env, ctx): Promise<Response> {
    // Each Durable Object is mapped to the authenticated user's ID, never to
    // a value the client chooses (query parameter, header, or body).
    const userId = await authenticate(req, env);

    if (userId) {
      // Get a stub that allows you to call that Durable Object
      const durableObjectStub = env.YOUR_DO_CLASS.getByName(userId);

      // Pass the request to that Durable Object and await the response
      // This invokes the constructor once on your Durable Object class (defined further down)
      // on the first initialization, and the fetch method on each request.
      // We pass the original Request to the Durable Object's fetch method
      const response = await durableObjectStub.fetch(req);

      // This would return "wrote to queue", but you could return any response.
      return response;
    }
    return new Response("Unauthorized", { status: 401 });
  },
} satisfies ExportedHandler<Env>;

export class YourDurableObject extends DurableObject<Env> {
  async fetch(req: Request): Promise<Response> {
    // Error handling elided for brevity.
    // Publish to your queue
    await this.env.YOUR_QUEUE.send({
      id: this.ctx.id.toString(), // Write the ID of the Durable Object to your queue
      // Write any other properties to your queue
    });

    return new Response("wrote to queue");
  }
}
```

## Notes

- Extending `DurableObject` exposes bindings on `this.env` and state on `this.ctx`.
- Adapted from the official docs: the official Worker reads the object name from an unauthenticated `userId` query parameter, so any caller could publish on behalf of any user. The name now comes from `authenticate()`, a placeholder that returns `null` (401) until you wire it to your session or token verification.
- Create the queue before deploying so the producer binding resolves.

## Related

- [Producer API](../references/queues/producer-api.md)
- [Base class](../references/durable-objects/base-class.md)
- [Create stubs and send requests](../references/durable-objects/create-stubs-and-send-requests.md)
