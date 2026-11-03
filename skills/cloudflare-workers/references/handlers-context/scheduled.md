---
source: https://developers.cloudflare.com/workers/runtime-apis/handlers/scheduled/
---

# Scheduled Handler

When a Worker is invoked via a Cron Trigger, the `scheduled()` handler handles the invocation.

## Signature / Usage

```ts
interface Env {}
export default {
	async scheduled(
		controller: ScheduledController,
		env: Env,
		ctx: ExecutionContext,
	) {
		await doSomeTaskOnASchedule();
	},
};
```

Handle multiple cron triggers (each trigger invokes the same `scheduled()` handler; use `controller.cron` to distinguish):

```jsonc
{
	"triggers": {
		"crons": ["*/5 * * * *", "0 0 * * *"],
	},
}
```

```js
export default {
	async scheduled(controller, env, ctx) {
		switch (controller.cron) {
			case "*/5 * * * *":
				await fetch("https://example.com/api/sync");
				break;
			case "0 0 * * *":
				await env.MY_KV.put("last-cleanup", new Date().toISOString());
				break;
		}
	},
};
```

Python:

Adapted (not in the official docs): handler signature is `scheduled(self, controller)` with bindings on `self.env` / `self.ctx`; see Notes.

```python
from workers import WorkerEntrypoint

class Default(WorkerEntrypoint):
    async def scheduled(self, controller):
        # controller.cron contains the cron pattern that triggered this event
        # controller.scheduledTime contains the scheduled time in ms since epoch
        print(f"Cron triggered: {controller.cron}")
        # Bindings and context are on self.env / self.ctx, not handler arguments
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `controller.cron` | string | The value of the Cron Trigger that started the `ScheduledEvent`. |
| `controller.type` | string | The type of controller. This will always return `"scheduled"`. |
| `controller.scheduledTime` | number | The time the `ScheduledEvent` was scheduled to be executed in milliseconds since January 1, 1970, UTC. It can be parsed as `new Date(controller.scheduledTime)`. |
| `env` | object | An object containing the bindings associated with your Worker using ES modules format, such as KV namespaces and Durable Objects. |
| `ctx` | object | The context associated with your Worker using ES modules format. Currently, this object just contains the `waitUntil` function. |
| `ctx.waitUntil(promise)` | void | Register asynchronous tasks (for example, logging, analytics to third-party services, streaming and caching) that should settle before the invocation completes. The first `ctx.waitUntil` to fail will be observed and recorded as the status in the Cron Trigger Past Events table. Otherwise, it will be reported as a success. |

## Notes

- Corrected from the official docs: the official Python examples write `async def scheduled(self, controller, env, ctx)`. In a Python `WorkerEntrypoint` the handler takes only `self` and `controller`; bindings and context are read from `self.env` and `self.ctx` (the same pattern the Python Workers pages use for `fetch`, for example `self.env.API_HOST`). The `env, ctx` arguments belong to the JavaScript/TypeScript signature.
- The value of `controller.cron` is the exact cron expression string from your configuration. It must match character-for-character, including spacing.
- The runtime waits for the promise returned by the `scheduled()` handler to resolve (up to the 15-minute duration limit). You do not need `waitUntil()` for the runtime to wait for a single asynchronous task. `waitUntil()` is most useful when you need to run multiple concurrent tasks, or when you want the outcome of a specific promise to be recorded as the Cron Trigger invocation status.
- Local testing: use Local Explorer (https://developers.cloudflare.com/workers/local-development/local-explorer/#test-cron-triggers) with `cf dev`, `wrangler dev`, or the Cloudflare Vite plugin. For scripted tests, send an HTTP request to `/cdn-cgi/local/scheduled` on the port printed by the dev server; pass `?format=json` for the structured result:

  ```sh
  curl "http://localhost:8787/cdn-cgi/local/scheduled?format=json"
  ```

  To target an exact Worker, use `POST /cdn-cgi/local/explorer/api/local/scheduled?worker=<WORKER_NAME>`.
- Cron trigger configuration keys (`triggers.crons`) belong to the cloudflare-wrangler skill.

## Related

- [Context (ctx)](./context.md)
- [Handlers overview](./handlers-overview.md)
