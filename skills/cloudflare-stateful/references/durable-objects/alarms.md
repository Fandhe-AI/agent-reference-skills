---
source: https://developers.cloudflare.com/durable-objects/api/alarms/
---

# Alarms

Alarms schedule a Durable Object to be woken up at a future time, at which point its `alarm()` handler is called. Alarms are set through the Storage API and follow the same rules as other storage operations.

## Signature / Usage

```js
import { DurableObject } from "cloudflare:workers";

export class AgentServer extends DurableObject {
  // Schedule a one-time or recurring event
  async scheduleEvent(id, runAt, repeatMs = null) {
    await this.ctx.storage.put(`event:${id}`, { id, runAt, repeatMs });
    const currentAlarm = await this.ctx.storage.getAlarm();
    if (!currentAlarm || runAt < currentAlarm) {
      await this.ctx.storage.setAlarm(runAt);
    }
  }

  async alarm() {
    const now = Date.now();
    const events = await this.ctx.storage.list({ prefix: "event:" });
    let nextAlarm = null;

    for (const [key, event] of events) {
      if (event.runAt <= now) {
        await this.processEvent(event);
        if (event.repeatMs) {
          event.runAt = now + event.repeatMs;
          await this.ctx.storage.put(key, event);
        } else {
          await this.ctx.storage.delete(key);
        }
      }
      // Track the next event time
      if (event.runAt > now && (!nextAlarm || event.runAt < nextAlarm)) {
        nextAlarm = event.runAt;
      }
    }

    if (nextAlarm) await this.ctx.storage.setAlarm(nextAlarm);
  }

  async processEvent(event) {
    // Your event handling logic here
  }
}
```

Adapted (not in the official docs): the official example never returns a `Response` from `fetch()` and does not await `setAlarm`; both are fixed. See Notes.

```js
import { DurableObject } from "cloudflare:workers";

export default {
	async fetch(request, env) {
		return await env.ALARM_EXAMPLE.getByName("foo").fetch(request);
	},
};

const SECONDS = 1000;

export class AlarmExample extends DurableObject {
	constructor(ctx, env) {
		super(ctx, env);
		this.storage = ctx.storage;
	}
	async fetch(request) {
		// If there is no alarm currently set, set one for 10 seconds from now
		let currentAlarm = await this.storage.getAlarm();
		if (currentAlarm == null) {
			await this.storage.setAlarm(Date.now() + 10 * SECONDS);
		}
		return new Response("Alarm scheduled");
	}
	async alarm() {
		// The alarm handler will be invoked whenever an alarm fires.
		// You can use this to do work, read from the Storage API, make HTTP calls
		// and set future alarms to run using this.storage.setAlarm() from within this handler.
	}
}
```

Adapted (not in the official docs): the official snippet logs with a double-quoted string, so `${...}` is never interpolated; backticks are used. See Notes.

```js
class MyDurableObject extends DurableObject {
	async alarm(alarmInfo) {
		if (alarmInfo?.retryCount != 0) {
			console.log(
				`This alarm event has been attempted ${alarmInfo?.retryCount} times before.`,
			);
		}
	}
}
```

## Options / Props

### Storage methods (`ctx.storage`)

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `getAlarm()` | `number \| null` | — | Currently set alarm time in ms since the UNIX epoch, or `null`. If called while an `alarm()` is running, returns `null` unless `setAlarm` has been called since the handler started. |
| `setAlarm(scheduledTimeMs)` | `number` → `void` | — | Sets the alarm time (ms since epoch). Overrides an existing alarm. |
| `deleteAlarm()` | `void` | — | Unsets the alarm. Inside `alarm()` it may prevent retries on a best-effort basis, not guaranteed. |

### Handler

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `alarm(alarmInfo)` | `(Object) => void \| Promise<void>` | — | Called when the alarm time is reached. Only one `alarm()` runs at a time per object instance. Can be `async`. |
| `alarmInfo.retryCount` | `number` | — | Times this alarm event has been retried. |
| `alarmInfo.isRetry` | `boolean` | — | `true` if this alarm event is a retry. |

## Notes

- Each Durable Object can have one alarm at a time. Alarms have at-least-once execution, retried on uncaught exceptions with exponential backoff starting at a 2 second delay, up to 6 retries; this only applies to the most recent `setAlarm()` call.
- To retry indefinitely, catch exceptions in `alarm()` and schedule a new alarm before returning; otherwise a long outage can exhaust the retries and the alarm will not re-run until the next `setAlarm`.
- If you call `setAlarm` in the constructor, first check whether an alarm is already set: after inactivity the constructor runs before the `alarm()` handler and could interfere with the pending alarm.
- If an unexpected error terminates the object, `alarm()` may be re-instantiated on another machine and run from the beginning after a short delay.
- Alarms vs Cron Triggers: alarms are scheduled programmatically from within an object and each object can have one; a Worker can have up to three Cron Triggers, configured through the dashboard or API. Cron Triggers are documented in cloudflare-workers.
- Corrected from the official docs: `fetch()` in the example returned nothing (a `Response` is required) and `setAlarm` was not awaited; the retry-log message used a double-quoted string so `${alarmInfo?.retryCount}` was printed literally.

## Related

- [DurableObjectState](./state.md)
- [SQLite-backed storage API](./sqlite-storage-api.md)
- [Durable Object base class](./base-class.md)
- [Durable Object ID](./id.md)
