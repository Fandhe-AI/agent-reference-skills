---
source: https://developers.cloudflare.com/workers/local-development/local-explorer/
---

# Local Explorer

Browser-based interface at `/cdn-cgi/local/explorer` on the local dev server for viewing/editing local binding data, testing Cron Triggers, and viewing traces and logs.

## Signature / Usage

Start a dev session, then append `/cdn-cgi/local/explorer` to the printed URL (e.g. `http://localhost:8787/cdn-cgi/local/explorer` for Wrangler, `http://localhost:5173/cdn-cgi/local/explorer` for Vite):

```sh
npx wrangler dev
```

Also works with `cf dev` (in a project configured with `cloudflare.config.ts`) and `npx vite`. Bindings are detected automatically from `cloudflare.config.ts` or the Wrangler configuration.

Retrieve the API's OpenAPI spec:

```sh
curl http://localhost:8787/cdn-cgi/local/explorer/api
```

## Options / Props

Supported bindings:

| Binding | View | Edit |
| --- | --- | --- |
| KV | Browse keys, view values and metadata | Create, update, and delete key-value pairs |
| R2 | List objects, view metadata | Upload and delete objects |
| D1 | Browse tables and rows, run SQL queries | Insert, update, and delete rows through SQL |
| Durable Objects (SQLite storage) | Browse SQLite tables and rows, run SQL queries | Insert, update, and delete rows through SQL |
| Workflows | List instances, view status and step history | Trigger new runs, retry failed instances |
| Email sending (`send_email`) | List sent emails, view content and headers | View only |
| Flagship | List feature flags, test flag evaluations | Create, update, and delete flags, edit targeting rules and rollouts |

Supported Worker triggers:

| Trigger | View | Test |
| --- | --- | --- |
| Email Routing | List received emails, view content, headers, and handler outcomes | Send test emails, resend or edit and resend captured emails |
| Cron Triggers | View configured cron schedules and invocation results | Invoke the `scheduled()` handler with configured or ad hoc cron expressions and a chosen scheduled time |

Quartz-like options in the ad hoc expression builder:

| Option | Behavior |
| --- | --- |
| `L` | Select the last day or last named weekday |
| `W` | Select the nearest weekday |
| `LW` | Select the last weekday of the month |
| `#` | Select an occurrence of a named weekday |

## Test Cron Triggers

Sends one-off invocations to the `scheduled()` handler (configured Cron Triggers or ad hoc expressions). Requires Wrangler 4.139.0+ or Cloudflare Vite plugin 1.60.0+.

1. Select the Worker, then **Cron Triggers** > **Configured Crons**.
2. Under **Scheduled time**, select *Now*, or **Add preset** with a UTC date/time or epoch milliseconds.
3. Select **Trigger** next to a cron expression.
4. Review the outcome, `noRetry()` status, dispatched expression, and scheduled time.
5. Optionally use **Cron Triggers** > **Ad-Hoc Triggers** > **Add trigger**.

API: `POST /cdn-cgi/local/explorer/api/local/scheduled?worker=<WORKER_NAME>` (exact Worker; required cron expression, optional scheduled time).

## Observability

Traces and logs from every Worker invocation are captured automatically with `cf dev`, `wrangler dev`, or the Vite plugin, with no code changes. **Logs** captures all `console.*` output, filterable by level (error, warn, info, log, debug) or text. **Traces** shows each invocation and every binding operation with timing, status, and errors, including operations through remote bindings. Query traces/logs via `POST /cdn-cgi/local/explorer/api/local/observability/query` (SQL).

When it detects an AI agent, the dev server prints a hint with the API endpoint:

```txt
This dev session is running in an AI agent.

The Local Explorer API is available at
http://localhost:8787/cdn-cgi/local/explorer/api

...

Debug with traces:
POST /cdn-cgi/local/explorer/api/local/observability/query -- query traces and logs with SQL
```

## Notes

- Requires Wrangler 4.118.0+ or Cloudflare Vite plugin 1.50.0+ (for `cf dev`, these apply to the dev server it starts).
- D1 and SQLite-backed Durable Objects get a SQL Studio (visual table browser with inline editing plus SQL editor).
- Ad hoc triggers and scheduled time presets are stored in your browser, scoped to the local project and Worker; they do not change `cloudflare.config.ts`, Wrangler configuration, or deployed Cron Triggers.
- Each invocation is a one-off test; local development does not run Cron Triggers automatically.
- Full invocation logs are available in the dev session owning the Worker, which must have **Observability** turned on.
- The builder supports minute, hour, day-of-month, month intervals, and daily, selected-weekday, monthly schedules (five-field UTC). Step values start at the field minimum; day steps start on day 1; dates 29-31 do not run in months lacking them. The exact expression shown in the row is always dispatched.

## Related

- [Local development](./overview.md)
- [Adding local data](./local-data.md)
