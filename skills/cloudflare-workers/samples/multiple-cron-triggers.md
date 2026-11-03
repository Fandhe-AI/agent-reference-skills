---
source: https://developers.cloudflare.com/workers/examples/multiple-cron-triggers/
---

# Multiple Cron Triggers

Run different work for each of several cron schedules by switching on `controller.cron`.

Adapted (not in the official docs): placeholder `updateAPI*` functions are defined so the Worker runs as written; see Notes.

```ts
interface Env {}

// Placeholders: replace with your own work.
async function updateAPI(): Promise<void> {}
async function updateAPI2(): Promise<void> {}
async function updateAPI3(): Promise<void> {}

export default {
	async scheduled(
		controller: ScheduledController,
		env: Env,
		ctx: ExecutionContext,
	) {
		// Write code for updating your API
		switch (controller.cron) {
			case "*/3 * * * *":
				// Every three minutes
				await updateAPI();
				break;
			case "*/10 * * * *":
				// Every ten minutes
				await updateAPI2();
				break;
			case "*/45 * * * *":
				// Every forty-five minutes
				await updateAPI3();
				break;
		}
		console.log("cron processed");
	},
};
```

## Notes

- Adapted from the official docs: `updateAPI`, `updateAPI2`, `updateAPI3` are undefined in the official sample; empty stubs are added here so it compiles and runs. Replace them with real work.
- `*/45 * * * *` fires at minutes 0 and 45 of each hour (not every 45 minutes continuously).
- The `case` strings must match the cron expressions registered for the Worker exactly.
- The official JS variant names the first parameter `event` and reads `event.cron`; the handler argument is the same `ScheduledController` object.
