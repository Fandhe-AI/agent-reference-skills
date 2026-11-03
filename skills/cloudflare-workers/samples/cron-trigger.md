---
source: https://developers.cloudflare.com/workers/examples/cron-trigger/
---

# Setting Cron Triggers

Handle a Cron Trigger with the `scheduled` handler.

```ts
interface Env {}
export default {
	async scheduled(
		controller: ScheduledController,
		env: Env,
		ctx: ExecutionContext,
	) {
		console.log("cron processed");
	},
};
```

## Notes

- The schedule itself is declared in the Wrangler configuration (`triggers.crons`), not in code; see `../references/handlers-context/scheduled.md`.
- Combine with a `fetch` handler in the same default export when the Worker also serves HTTP.
