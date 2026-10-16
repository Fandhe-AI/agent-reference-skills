# Cron Internals

The cron subsystem provides scheduled task execution: one-shot delays and recurring cron-expression jobs with skill injection and cross-platform delivery.

## Signature / Usage

Job record in `~/.hermes/cron/jobs.json` (atomic write via temp file + rename):

```json
{
  "id": "a1b2c3d4e5f6",
  "name": "Daily briefing",
  "prompt": "Summarize today's AI news and funding rounds",
  "schedule": {
    "kind": "cron",
    "expr": "0 9 * * *",
    "display": "0 9 * * *"
  },
  "skills": ["ai-funding-daily-report"],
  "deliver": "telegram:-1001234567890",
  "repeat": {
    "times": null,
    "completed": 42
  },
  "state": "scheduled",
  "enabled": true,
  "next_run_at": "2025-01-16T09:00:00Z",
  "last_run_at": "2025-01-15T09:00:00Z",
  "last_status": "ok",
  "created_at": "2025-01-01T00:00:00Z",
  "model": null,
  "provider": null,
  "script": null
}
```

CLI:

```bash
hermes cron list                    # Show all jobs
hermes cron create                  # Interactive job creation (alias: add)
hermes cron edit <job_id>           # Edit job configuration
hermes cron pause <job_id>          # Pause a running job
hermes cron resume <job_id>         # Resume a paused job
hermes cron run <job_id>            # Trigger immediate execution
hermes cron remove <job_id>         # Delete a job
```

## Options / Props

Schedule formats:

| Format | Example | Behavior |
|--------|---------|----------|
| Relative delay | `30m`, `2h`, `1d` | One-shot after the duration |
| Interval | `every 2h`, `every 30m` | Recurring |
| Cron expression | `0 9 * * *` | Standard 5-field cron |
| ISO timestamp | `2025-01-15T09:00:00` | One-shot at the exact time |

`last_status` literals (written only by `cron.jobs.mark_job_run`): `ok`, `error` (`last_error`), `delivery_failed` (`last_delivery_error`), `blocked_config` (`last_error`). Job states: `scheduled`, `paused`, `completed`, `running`.

Chronos config (`cron.provider: chronos`): `cron.chronos.portal_url`, `cron.chronos.callback_url`, `cron.chronos.expected_audience`, `cron.chronos.nas_jwks_url`.

Delivery targets: `origin`, `local` (saves to `~/.hermes/cron/output/`), `telegram[:<chat_id>[:<thread_id>]|:@username]`, `discord[:#channel|:<channel_id>[:<thread_id>]]`, `slack[:#channel|:<channel_id>[:<thread_ts>]]`, `matrix`, `feishu`, `whatsapp`, `signal`, `sms`, `email`, `weixin`, `mattermost`, `homeassistant`, `dingtalk`, `wecom`, `bluebubbles`, `qqbot`, `bot-chat[:<profile>]`. A bare platform name delivers to its home channel; `platform:<target>` is resolved at fire time.

## Notes

- Tick cycle (default every 60 s): acquire scheduler lock, load jobs, filter due (`next_run <= now` and `state == "scheduled"`), run each in a fresh `AIAgent` session with attached skills injected, deliver, update `run_count` / `next_run`, write back, release lock. The model-facing tool is `cronjob_manage` with `create`, `list`, `update`, `pause`, `resume`, `run`, `remove`. Older jobs with a single `skill` field are normalized to `skills: [skill]`.
- Missed-occurrence contract: at-most-once per occurrence with every occurrence accounted for. `tick()` advances `next_run_at` before dispatch and stamps a provisional `pending_slot`; a lost slot is restored once; an occurrence already `completed` in the executions ledger never re-fires; late within grace (half the period clamped to 120 s - 2 h) fires late (`last_dispatch.kind = late`); past grace the backlog collapses to one `catch_up` run, or is skipped with a log when `cron.catch_up_missed: false`. Paused jobs never fire; `resume_job` keeps a past stored `next_run_at` as the due instant.
- Fire-claim lease: `fire_claim = {at, by}` refreshed by a heartbeat every 60 s (lease 300 s).
- Gateway integration: the trigger is a pluggable `CronScheduler` resolved by `resolve_cron_scheduler()` (`cron/scheduler_provider.py`) from `cron.provider`; empty = built-in `InProcessCronScheduler`; a missing or unavailable provider falls back to the built-in. Execution and delivery remain in `scheduler.run_job()` / `scheduler._deliver_result()`. In CLI mode, jobs only fire during `hermes cron` commands or active CLI sessions.
- Chronos arms one managed one-shot per job at its next fire time; Nous calls back `POST /api/cron/fire` with a short-lived JWT.
- Fresh session isolation: no conversation history, persistent memory (MEMORY.md / USER.md) still loads, prompt must be self-contained, and the `cronjob` toolset is disabled (recursion guard).
- Script-backed jobs: a Python `script` runs before each turn and its stdout is injected into the prompt. Timeout chain: `_SCRIPT_TIMEOUT` module override, `HERMES_CRON_SCRIPT_TIMEOUT`, `cron.script_timeout_seconds`, default 3600 s. Agent jobs use an inactivity budget `HERMES_CRON_TIMEOUT` (default 600 s idle, `0` = unlimited). Timeouts use `agent.deadline.kill_process_tree`.
- Provider recovery: `run_job()` passes `fallback_providers` (or legacy `fallback_model`) and the credential pool (`load_pool(provider)`) into `AIAgent`; pinned jobs (own `provider` / `model` / `base_url`) get no fallback chain.
- Response wrapping: `cron.wrap_response: true` adds header/footer; a `[SILENT]` prefix suppresses delivery. Cron deliveries are not mirrored into gateway session history. `bot-chat` is a machine-local pseudo-platform with durable receipts; `cron.bot_chat_delivery_timeout_seconds` (default 600) bounds the legacy subprocess lane.
- Locking: cross-process file locks (`fcntl.flock` / `msvcrt.locking`); if the lock is unavailable `tick()` returns 0. A stale-code gateway yields its tick (`CronTickYielded`) and `hermes cron status` reports it.

## Related

- [Gateway Internals](./gateway-internals.md)
- [Agent Loop](./agent-loop.md)
- [Provider Runtime](./provider-runtime.md)
