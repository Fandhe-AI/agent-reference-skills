---
source: https://developers.cloudflare.com/agents/agent-class/schedule-tasks/
---

# Schedule tasks (schedule / scheduleEvery / keepAliveWhile)

Schedule delayed, dated, cron and interval callbacks with `this.schedule()`. A callback name is the name of a method on your Agent. Schedules live in SQLite and run from the job queue, so they survive restarts and evictions.

## Signature / Usage

```ts
import { Agent } from "agents";

export class ReminderAgent extends Agent<Env> {
	async onStart() {
		// Recurring schedules are idempotent, so this adds one row however often the Agent starts.
		await this.schedule("0 8 * * *", "dailyDigest");
	}

	async remindLater(message: string) {
		await this.schedule(30, "sendReminder", { message }); // in 30 seconds
		await this.schedule(new Date("2026-12-01T09:00:00Z"), "sendReminder", {
			message,
		});
		await this.scheduleEvery(300, "checkInbox"); // every 5 minutes
	}

	async sendReminder(payload: { message: string }) {
		console.log(payload.message);
	}

	async dailyDigest() {}

	async checkInbox() {}
}
```

Keep alive during long work:

```ts
import { Agent } from "agents";

export class ReportAgent extends Agent<Env> {
	async buildReport() {
		return this.keepAliveWhile(async () => {
			// Long work that must not be interrupted by idle eviction.
			return "done";
		});
	}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `schedule(when, callback, payload?, options?)` | method | — | Equivalent to `scheduler.set()`. `when` is delay in seconds, a `Date`, or a cron string |
| `scheduleEvery(intervalSeconds, callback, payload?, options?)` | method | — | Equivalent to `scheduler.every()` |
| `getScheduleById(id)` | method | — | Equivalent to `scheduler.get()` |
| `listSchedules(criteria?)` | method | — | Equivalent to `scheduler.list()` |
| `cancelSchedule(id)` | method | — | Equivalent to `scheduler.cancel()` |
| `keepAlive()` | method | — | Returns a disposer; always call it |
| `keepAliveWhile(fn)` | method | — | Holds a heartbeat while `fn` runs, releases when it settles |

## Notes

- `callback` must name a method on the Agent. `getSchedule()` and `getSchedules()` are deprecated synchronous versions of `getScheduleById()` and `listSchedules()` (and throw inside sub-agents).
- An idle DO is evicted after about 70 to 140 seconds without requests, messages or alarms; in-flight work then stops. A heartbeat only prevents idle eviction: a deploy or crash still stops work, so schedule a job or use a Workflow for work that must finish.
- `AIChatAgent` keeps itself alive while it streams; scheduled callbacks and Workflows do not need `keepAlive`.
- Options, retries, limits and natural-language parsing: scheduler.md (https://developers.cloudflare.com/agents/runtime/capabilities/scheduler/). DO alarm mechanics are in the cloudflare-stateful skill.

## Related

- [Queue tasks](./queue-tasks.md)
- [Retries](./retries.md)
- [Durable execution](./durable-execution.md)
- [Run Workflows](./run-workflows.md)
