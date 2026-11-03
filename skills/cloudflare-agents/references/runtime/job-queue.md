---
source: https://developers.cloudflare.com/agents/runtime/lifecycle/job-queue/
---

# Jobs and alarms

The Lifecycle owns the Durable Object's single alarm and sets it from a durable job queue (the `cf_agents_jobs` SQLite table). `Scheduler` and `PiHarness` store future work as jobs.

## Signature / Usage

```ts
import { DurableObject } from "cloudflare:workers";
import {
	Lifecycle,
	type LifecycleJobContext,
	type LifecycleJobOutcome,
} from "agents/lifecycle";

export class CleanupAgent extends DurableObject<Env> {
	readonly lifecycle = Lifecycle.install(this);

	onStart(): void {
		this.ctx.storage.sql.exec(
			"CREATE TABLE IF NOT EXISTS sessions (id TEXT PRIMARY KEY, expires_at INTEGER NOT NULL)",
		);
	}

	async onRequest(): Promise<Response> {
		await this.lifecycle.jobs.push({
			id: "cleanup",
			fn: "deleteExpired",
			time: Date.now() + 60_000,
			retry: { maxAttempts: 5 },
		});
		return new Response("Cleanup scheduled", { status: 202 });
	}

	onJob({ job }: LifecycleJobContext): LifecycleJobOutcome {
		if (job.fn !== "deleteExpired") return;
		this.ctx.storage.sql.exec(
			"DELETE FROM sessions WHERE expires_at < ?",
			Date.now(),
		);
	}
}
```

Long work with a heartbeat:

```ts
import { DurableObject } from "cloudflare:workers";
import {
	Lifecycle,
	type LifecycleJobContext,
	type LifecycleJobOutcome,
} from "agents/lifecycle";

const HEARTBEAT_MS = 30_000;

export class ImportAgent extends DurableObject<Env> {
	readonly lifecycle = Lifecycle.install(this);
	#running: Promise<void> | undefined;

	async startImport(): Promise<void> {
		await this.lifecycle.start();
		await this.ctx.storage.put("import:pending", true);
		await this.lifecycle.jobs.push({
			id: "import",
			fn: "import",
			time: Date.now(),
			recoveryLoop: true,
		});
	}

	async onJob({ job }: LifecycleJobContext): Promise<LifecycleJobOutcome> {
		if (job.fn !== "import") return;
		if (!(await this.ctx.storage.get("import:pending"))) return;

		// Start the loop if this wake has none, for example after an eviction.
		this.#running ??= this.#runImport().finally(() => {
			this.#running = undefined;
		});
		this.lifecycle.trackAlarmWork(this.#running);
		return { rescheduleAt: Date.now() + HEARTBEAT_MS };
	}

	async #runImport(): Promise<void> {
		// Resume from the last checkpoint in storage, then clear the flag.
		await this.ctx.storage.delete("import:pending");
	}
}
```

Memory-limit hook:

```ts
import { DurableObject } from "cloudflare:workers";
import { Lifecycle, type MemoryLimitContext } from "agents/lifecycle";

export class MyAgent extends DurableObject<Env> {
	readonly lifecycle = Lifecycle.install(this, {
		maxAlarmMemoryLimitStrikes: 5,
	});

	async onAlarmMemoryLimit({
		sealed,
		executing,
	}: MemoryLimitContext): Promise<void> {
		if (sealed && executing) {
			await this.ctx.storage.put(`failed:${executing.id}`, Date.now());
		}
	}
}
```

## Options / Props

`lifecycle.jobs.push()` options (resolves to the stored `LifecycleJob`):

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `fn` | `string` | — | Required. Function name your `onJob()` dispatches on. |
| `time` | `number` | — | Required. Due time in Unix milliseconds. A past time runs at the next alarm. |
| `payload` | `unknown` | — | JSON-serializable value passed as `job.payload`. |
| `id` | `string` | generated | Stable job ID. Pushing an existing ID replaces that job. |
| `retry` | `RetryOptions` | — | Retry policy for failed runs. |
| `singleflight` | `boolean` | — | Skip the job while a previous run is still in progress. |
| `hungTimeoutSeconds` | `number` | `30` | Seconds before an in-progress single-flight run counts as hung, and before a slow run logs a warning. |
| `exclusive` | `boolean` | — | While pending, set the alarm for this job alone. The `Agent` class uses this for deferred destruction. |
| `recoveryLoop` | `boolean` | — | Marks the job as part of a recovery loop that could exhaust memory. |

`LifecycleJobs` methods:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `push(options)` | `Promise<LifecycleJob>` | — | Push or replace one job. |
| `cancel(id)` | `Promise<boolean>` | — | Delete one job; `false` when no job matched. |
| `reschedule(id, time)` | `Promise<boolean>` | — | Change due time; `false` when no job matched. |
| `get(id)` | `LifecycleJob \| undefined` | — | Read one job. |
| `list()` | `LifecycleJob[]` | — | The owner's jobs, ordered by due time. |
| `rearm()` | `Promise<void>` | — | Set the alarm again from the queue without changing it. |

`LifecycleJob` fields (`onJob()` receives it as `context.job`; `context.attempt` starts at 1):

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | — | Job ID; stays the same across reschedules. |
| `capability` | `string` | — | Owning capability ID, or `"host"`. |
| `fn` | `string` | — | Function name. |
| `time` | `number` | — | Due time in Unix milliseconds. |
| `payload` | `unknown` | — | Payload after a JSON round trip. |
| `retry` | `RetryOptions \| undefined` | — | Retry policy given at push time. |
| `singleflight` | `boolean` | — | Whether the job skips while a previous run is in progress. |
| `exclusive` | `boolean` | — | Whether the alarm is set for this job alone while pending. |
| `recoveryLoop` | `boolean` | — | Whether the memory-limit breaker governs the job. |
| `createdAt` | `number` | — | Creation time in Unix seconds. |

`onJob()` return value (`LifecycleJobOutcome`):

| Name | Type | Default | Description |
|------|------|---------|-------------|
| nothing | — | — | Job completes and is deleted. |
| `{ rescheduleAt: time }` | object | — | Job stays in the queue until `time`. |
| `"yield"` | string | — | Job stays due; the object wakes again immediately. |

`RetryOptions`:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `maxAttempts` | — | `3` | Attempts, including the first. |
| `baseDelayMs` | — | `100` | Base delay for the backoff. |
| `maxDelayMs` | — | `3000` | Maximum delay between attempts. |

`MemoryLimitContext`:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `sealed` | `boolean` | — | Whether this reset reached the limit and deleted the recovery jobs. |
| `nextTime` | `number \| undefined` | — | When the delayed jobs run again, for a reset below the limit. |
| `executing` | `LifecycleJob \| undefined` | — | The job that was running, if the reset happened during a job. |
| `purgedRecoveryLoopJobs` | `ReadonlyArray<LifecycleJob> \| undefined` | — | The `recoveryLoop` jobs deleted when this reset sealed. |

Diagnostics events on the `agents:lifecycle` channel (best-effort):

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `job:backlog_warning` | event | — | One owner has 10 or more due jobs in a single alarm. |
| `job:slow_dispatch` | event | — | One `onJob()` runs longer than `hungTimeoutSeconds`. |
| `alarm:memory_limit_reset` | event | — | An alarm ends in a memory-limit reset. |

## Notes

- A job is durable once `push()` resolves. Give a job a stable `id` when pushing more than once so a new push replaces the pending job. Job IDs share one table; each owner can only read, replace, or cancel its own jobs, and pushing an ID another owner uses throws.
- If code pushes or reschedules the same job ID while it runs, the newer change wins and the in-progress run's return value is discarded.
- When `onJob()` throws, the Lifecycle retries in the same alarm with exponential backoff up to `retry.maxAttempts`. After the last attempt, a capability's `onJobError(context, error)` decides (its return works like an `onJob()` outcome; without it the job completes). A host job completes (host has no `onJobError()`), so derive host jobs from durable state and push them again. Platform failures (deploy replaces the isolate, memory limit) do not use up attempts. A job whose owner is gone or lacks `onJob()` is logged and deleted.
- Alarm sequence: set a fallback alarm (next job time, at least 30 seconds out) while the queue holds jobs; run startup if cold; set a backup alarm 30 seconds out if any job is due; run every due job in due-time order, one at a time; run host `onAlarm()`; set the alarm for the next due job.
- Jobs run one at a time; a slow `onJob()` delays every other job. Use the heartbeat pattern (`trackAlarmWork()` + `{ rescheduleAt }`) for long work; `trackAlarmWork()` returns `true` during an alarm and `false` (tracking nothing) otherwise.
- Memory-limit protection: consecutive memory-limit resets are counted (a clean alarm resets the count). Below the limit, the running job and every pending `recoveryLoop` job are delayed 30 seconds per reset so far, up to five minutes. On the reset reaching the limit (default three), it seals: deletes the running job and every `recoveryLoop` job. Then each capability's `onMemoryLimit()` and the host's `onAlarmMemoryLimit()` run. Keep their writes small.
- `lifecycle.rearmAlarm()` sets the alarm from the queue on demand; `lifecycle.disableAlarms()` turns it off for good.
- On the `Agent` class, `schedule()` and `scheduleEvery()` push jobs through its `Scheduler`, and a deferred `destroy()` pushes an `exclusive` job; set `maxAlarmMemoryLimitStrikes` through its static `options`. Raw Durable Object alarms: cloudflare-stateful.

## Related

- [Lifecycle](./lifecycle.md)
- [Scheduler](./scheduler.md)
- [Build a capability](./build-a-capability.md)
- [Diagnostics channels](./diagnostics-channels.md)
