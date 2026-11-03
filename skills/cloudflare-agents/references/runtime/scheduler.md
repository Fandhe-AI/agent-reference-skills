---
source: https://developers.cloudflare.com/agents/runtime/capabilities/scheduler/
---

# Scheduler

`Scheduler` from `agents/schedules` runs registered callbacks after a delay, at a date, from a cron expression, or at a fixed interval. Schedules are Lifecycle jobs, so they survive eviction and share the object's alarm.

## Signature / Usage

Adapted (not in the official docs): `onRequest()` creates a schedule, so it now requires a caller check; `isAuthorizedCaller()` is a placeholder that rejects everyone until you implement verification; see Notes.

```ts
import { DurableObject } from "cloudflare:workers";
import { getCurrentAgent, Lifecycle } from "agents/lifecycle";
import { Scheduler, type Schedule } from "agents/schedules";

type Reminder = { message: string };

// Placeholder: rejects every request until you implement verification.
function isAuthorizedCaller(request: Request): boolean {
	return false;
}

export class ReminderAgent extends DurableObject<Env> {
	readonly scheduler = new Scheduler({
		callbacks: {
			sendReminder: (payload: Reminder, schedule: Schedule<Reminder>) => {
				const { agent } = getCurrentAgent<ReminderAgent>();
				console.log(
					`${agent?.lifecycle.name}: reminder ${schedule.id}: ${payload.message}`,
				);
			},
		},
	});
	readonly lifecycle = Lifecycle.install(this).use(this.scheduler);

	async onStart(): Promise<void> {
		// Cron schedules are idempotent, so this adds one row, not one per wake.
		await this.scheduler.set("0 8 * * 1-5", "sendReminder", {
			message: "Good morning",
		});
	}

	async onRequest(request: Request): Promise<Response> {
		if (!isAuthorizedCaller(request)) {
			return new Response("Unauthorized", { status: 401 });
		}
		const schedule = await this.scheduler.set(300, "sendReminder", {
			message: "Five minutes have passed",
		});
		return Response.json(schedule, { status: 201 });
	}
}
```

Manage schedules (as an RPC method that starts the Lifecycle itself):

```ts
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";
import { Scheduler } from "agents/schedules";

type Reminder = { message: string };

export class ReminderAgent extends DurableObject<Env> {
	readonly scheduler = new Scheduler({
		callbacks: {
			sendReminder: (payload: Reminder) => console.log(payload.message),
		},
		retry: { maxAttempts: 5, baseDelayMs: 500, maxDelayMs: 10_000 },
		onError: (error) => console.error("Reminder failed", error),
	});
	readonly lifecycle = Lifecycle.install(this).use(this.scheduler);

	// An RPC method, so it starts the Lifecycle itself.
	async resetReminders(): Promise<number> {
		await this.lifecycle.start();
		const crons = await this.scheduler.list({ type: "cron" });
		for (const schedule of crons) {
			await this.scheduler.cancel(schedule.id);
		}
		await this.scheduler.set(
			60,
			"sendReminder",
			{ message: "Reminders reset" },
			{ idempotent: true, retry: { maxAttempts: 1 } },
		);
		return crons.length;
	}
}
```

Interval and natural-language parsing:

```ts
await this.scheduler.every(30, "sendReminder", { message: "Every 30 seconds" });
```

```ts
import { getSchedulePrompt, scheduleSchema } from "agents/schedules/parser";
import { generateObject, type LanguageModel } from "ai";

declare const model: LanguageModel;

export async function parseRequest(input: string) {
	const { object } = await generateObject({
		model,
		schema: scheduleSchema,
		system: getSchedulePrompt({ date: new Date() }),
		prompt: input,
	});
	return object; // { description, when: { type: "delayed", delayInSeconds } | ... }
}
```

## Options / Props

`new Scheduler(options)`:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `callbacks` | `(payload, schedule) => unknown` map | — | Named callbacks. |
| `retry` | `{ maxAttempts, baseDelayMs, maxDelayMs }` | `3`, `100`, `3000` | Default retry policy for callbacks. |
| `hungScheduleTimeoutSeconds` | number | `30` | Seconds before a running interval schedule counts as abandoned. |
| `onError` | `(error) => void` | — | Observes a callback's failure after its last retry. |

`set(when, callback, payload?, options?)` — type of `when` picks the mode:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `number` | `delayed` | — | `set(60, "sendReminder", payload)` runs in 60 seconds. |
| `Date` | `scheduled` | — | `set(new Date("2026-12-25T09:00:00Z"), ...)`. |
| `string` | `cron` | — | `set("0 8 * * 1-5", ...)` runs at 08:00 UTC on weekdays. |

`every(intervalSeconds, callback, payload?, options?)` creates an `interval` schedule (first run after `intervalSeconds`; skipped if the previous run is still going).

Per-schedule options (fourth argument):

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `retry` | object | scheduler's policy | Overrides the retry policy for this schedule. |
| `idempotent` | boolean | `true` for cron and interval; `false` for delayed and dated | Returns an existing schedule with the same callback, timing, and payload instead of adding a row. |

Management:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `get(id)` | method | — | One schedule, or `undefined`. |
| `list(criteria?)` | method | — | Filtered by `id`, `type`, or `timeRange: { start?, end? }`. |
| `cancel(id)` | method | — | Removes a schedule; `true` if one was removed. |

A returned `Schedule` has `id`, `callback`, `payload`, `type`, and next run `time` (Unix seconds); plus `delayInSeconds`, `cron`, or `intervalSeconds` depending on type.

## Notes

- A schedule stores the callback's name, not the function. Register every callback unconditionally in the field initializer so schedules created before an eviction find their callback. `set()` / `every()` check the callback name and payload type. Callbacks run in the object's invocation context.
- A one-time schedule is deleted after it runs; cron/interval schedules move to their next time. A throwing callback retries with exponential backoff up to `maxAttempts`, then `onError` runs; recurring schedules continue.
- If the object is evicted while a callback runs, the alarm wakes it and the callback runs again; make external effects idempotent.
- Limits: cron has minute precision; interval has second precision; callbacks run one at a time with every other job, so keep them short; payloads must be JSON-serializable.
- `agents/schedules/parser` output `when.type` is `scheduled` (with `date`), `delayed` (`delayInSeconds`), `cron`, or `no-schedule`. The older `agents/schedule` path works but is deprecated.
- Events `schedule:create`, `schedule:execute`, `schedule:retry`, `schedule:error`, `schedule:cancel` go to the `agents:schedule` diagnostics channel.
- Adapted from the official docs: the `onRequest()` above originally created a new schedule per request with no caller check; it now calls a fail-closed `isAuthorizedCaller()` placeholder. Also authenticate in the Worker.
- On the `Agent` class use `this.schedule()`, `this.scheduleEvery()`, `this.getSchedule()`, `this.listSchedules()`, `this.cancelSchedule()`. Cloudflare Workers Cron Triggers are separate (cloudflare-workers).

## Related

- [Jobs and alarms](./job-queue.md)
- [Lifecycle](./lifecycle.md)
- [Diagnostics channels](./diagnostics-channels.md)
