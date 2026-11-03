---
source: https://developers.cloudflare.com/workers/examples/multiple-cron-triggers/
---

# Multiple Cron Triggers

Run different work for each of several cron schedules by switching on `controller.cron`.

```ts
interface Env {}
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

- `updateAPI`, `updateAPI2`, `updateAPI3` are placeholders in the official sample; define them yourself.
- The `case` strings must match the cron expressions registered for the Worker exactly.
- The official JS variant names the first parameter `event` and reads `event.cron`; the handler argument is the same `ScheduledController` object.
