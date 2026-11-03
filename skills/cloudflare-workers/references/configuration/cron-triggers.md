---
source: https://developers.cloudflare.com/workers/configuration/cron-triggers/
---

# Cron Triggers

Cron Triggers map a cron expression to a Worker's `scheduled()` handler so the Worker runs on a schedule. Cron Triggers execute on UTC time and run on underutilized machines.

## Signature / Usage

```jsonc
{
	"triggers": {
		// Schedule cron triggers:
		// - At every 3rd minute
		// - At 15:00 (UTC) on first day of the month
		// - At 23:59 (UTC) on the last weekday of the month
		"crons": [
			"*/3 * * * *",
			"0 15 1 * *",
			"59 23 LW * *"
		]
	}
}
```

```toml
[triggers]
crons = [ "*/3 * * * *", "0 15 1 * *", "59 23 LW * *" ]
```

Handler:

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

Python Workers:

Adapted (not in the official docs): the class-style handler takes only `(self, controller)`; bindings and context come from `self.env` / `self.ctx`; see Notes.

```python
from workers import WorkerEntrypoint

class Default(WorkerEntrypoint):
    async def scheduled(self, controller):
        # Bindings: self.env, execution context: self.ctx
        print("cron processed")
```

Configuration file keys: see the cloudflare-wrangler skill.

## Options / Props

Supported cron expression fields (five fields, Quartz-like extensions):

| Field | Values | Characters |
| --- | --- | --- |
| Minute | 0-59 | `*` `,` `-` `/` |
| Hours | 0-23 | `*` `,` `-` `/` |
| Days of Month | 1-31 | `*` `,` `-` `/` `L` `W` |
| Months | 1-12, case-insensitive 3-letter abbreviations ("JAN", "aug", etc.) | `*` `,` `-` `/` |
| Weekdays | 1-7, case-insensitive 3-letter abbreviations ("MON", "fri", etc.) | `*` `,` `-` `/` `L` `#` |

Common intervals:

| Expression | Meaning |
| --- | --- |
| `* * * * *` | At every minute |
| `*/30 * * * *` | At every 30th minute |
| `45 * * * *` | On the 45th minute of every hour |
| `0 17 * * sun` or `0 17 * * 1` | 17:00 (UTC) on Sunday |
| `10 7 * * mon-fri` or `10 7 * * 2-6` | 07:10 (UTC) on weekdays |
| `0 15 1 * *` | 15:00 (UTC) on first day of the month |
| `0 18 * * 6L` or `0 18 * * friL` | 18:00 (UTC) on the last Friday of the month |
| `59 23 LW * *` | 23:59 (UTC) on the last weekday of the month |

## Notes

- Corrected from the official docs: the official Python example declares `scheduled(self, controller, env, ctx)` and says all four parameters are required; class-style Python handlers take no `env` / `ctx` parameters (like `fetch(self, request)` and `queue(self, batch)`), so the signature is `scheduled(self, controller)` and bindings / context are read from `self.env` / `self.ctx`.
- Weekdays go 1 = Sunday to 7 = Saturday (unlike cron systems where 0 = Sunday, 6 = Saturday). Prefer three-letter abbreviations (for example `SUN`) to avoid ambiguity.
- Adding, updating, or deleting a Cron Trigger can take several minutes (up to 15 minutes) to propagate globally.
- Cron Triggers are also available in Workflows via `schedules` on the Workflow binding; use a Wrangler release that supports Workflow schedules.
- Config via `cloudflare.config.ts`: add `triggers.scheduled({ schedule: "0 * * * *" })` entries to `worker.triggers` (imports `defineConfig` and `triggers` from `cf/config`); `cf dev` tests locally and `cf deploy` deploys the schedule.
- With Wrangler, manage Cron Triggers exclusively through the Wrangler configuration file. Per-environment triggers go under the environment: `{ "env": { "dev": { "triggers": { "crons": [ "0 * * * *" ] } } } }` (TOML: `[env.dev.triggers]` with `crons = [ "0 * * * *" ]`).
- Deploying with Wrangler replaces all previous Cron Triggers with those in `triggers`. An empty `crons` array removes all Cron Triggers; if `triggers` or `crons` is undefined, deployed Cron Triggers are left in place.
- Dashboard: Worker > Settings > Triggers > Cron Triggers to add; Triggers > three-dot menu > Delete to remove.
- Local testing with `cf dev`, `wrangler dev`, or the Cloudflare Vite plugin (Local Explorer needs Wrangler 4.139.0 or later, or Cloudflare Vite plugin 1.60.0 or later). Local development never runs Cron Triggers automatically; each invocation is a one-off test.
- Local HTTP endpoints (port is the one printed by the dev server; Vite defaults to 5173):

```sh
curl "http://localhost:8787/cdn-cgi/local/scheduled"
curl "http://localhost:8787/cdn-cgi/local/scheduled?format=json"
curl "http://localhost:8787/cdn-cgi/local/scheduled?cron=*+*+*+*+*"
curl "http://localhost:8787/cdn-cgi/local/scheduled?cron=*+*+*+*+*&time=1745856238000"
```

- `?format=json` returns `{"outcome": "ok", "noRetry": false}`; `noRetry` is `true` when the handler calls `controller.noRetry()`. `cron` simulates a cron pattern; `time` overrides `controller.scheduledTime`.
- Local Explorer API: `POST /cdn-cgi/local/explorer/api/local/scheduled?worker=<WORKER_NAME>` with JSON body `cron` (required, non-empty) and optional `scheduled_time` (epoch ms, default now). Worker names come from `GET /cdn-cgi/local/explorer/api/local/workers`. A successful API response does not mean the handler succeeded; check `result.outcome`.

```sh
curl -X POST \
  "http://localhost:8787/cdn-cgi/local/explorer/api/local/scheduled?worker=my-worker" \
  -H "Content-Type: application/json" \
  --data '{"cron":"0 * * * *","scheduled_time":1745856238000}'
```

- Cron Events (dashboard: Worker > Settings > Trigger Events > View events) keeps the 100 most recent invocations; events can take up to 30 minutes to appear after creating or renaming a Worker. Workers Logs records longer-retention invocation logs. The GraphQL Analytics API gives programmatic access.
- Green Compute (account-level, Workers & Pages > Account details > Compute Setting) restricts Cron Triggers to data centers powered purely by renewable energy.
- The maximum number of Cron Triggers per account is in the Workers limits (account plan limits).

## Related

- [scheduled handler](../handlers-context/scheduled.md)
- [Handlers and context](../handlers-context/README.md)
