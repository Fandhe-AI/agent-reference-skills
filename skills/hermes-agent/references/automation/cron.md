# Cron Jobs

Schedule tasks to run automatically with natural language or cron expressions. Hermes exposes cron management through a single `cronjob_manage` tool (agent-facing call shape `cronjob(action=...)`) instead of separate schedule/list/remove tools. The gateway daemon ticks the scheduler every 60 seconds and runs due jobs in fresh isolated agent sessions.

## Signature / Usage

```bash
# In chat
/cron add "every 1h" "Summarize new feed items" --skill blogwatcher

# Standalone CLI
hermes cron create "every 2h" "Check server status"
hermes cron create "every 1h" "Use both skills and combine the result" \
  --skill blogwatcher \
  --skill maps \
  --name "Skill combo"
```

```python
cronjob(action="create", ...)
cronjob(action="list")
cronjob(action="update", job_id="...")
cronjob(action="pause", job_id="...")
cronjob(action="resume", job_id="...")
cronjob(action="run", job_id="...")
cronjob(action="remove", job_id="...")
```

## Schedule formats

| Kind | Examples |
|------|----------|
| Relative delay (one-shot) | `in 30m`, `in 2h`, `in 1d` |
| Interval (recurring) | `30m`, `every 30m`, `every 2h`, `every 1d`, `every hour` |
| Natural day/time (recurring) | `every monday 9am`, `weekdays at 9am`, `weekends at 10am`, `daily at 7am`, `monday, wednesday at 9am` |
| Cron expression | `0 9 * * *`, `0 9 * * MON-FRI`, `0 */6 * * *` |
| ISO timestamp (one-shot) | `2026-03-15T09:00:00` |

Times accept `9am`, `9:30pm`, `14:00`, bare 24-hour hours (`at 7`), `noon`, `midnight`. Natural day/time forms compile to cron expressions and require `croniter` (installed by default).

| Schedule type | Default repeat |
|---------------|----------------|
| One-shot (`in 30m`, timestamp) | 1 (runs once) |
| Interval / cron expression | forever |

Override with `repeat=5` on `cronjob(action="create", ...)`.

## CLI / chat commands

```bash
hermes cron list
hermes cron pause <job_id_or_name>
hermes cron resume <job_id_or_name>
hermes cron run <job_id_or_name>
hermes cron remove <job_id_or_name>
hermes cron edit <job_id_or_name> [...flags]
hermes cron status
hermes cron tick
hermes cron runs [job-id] --limit 20      # alias: history
hermes cron incidents                     # filter: --state detected|alerted|resolved|closed; ack <id>
hermes cron doctor                        # read-only fleet health check; exits 1 while any finding stands
hermes pause [--reason ...]               # global emergency stop (hermes resume lifts it)
```

Chat equivalents: `/cron list | pause | resume | run | remove | edit <job_id> ...`.

Edit flags: `--schedule`, `--prompt`, `--skill` (repeated replaces list), `--add-skill`, `--remove-skill`, `--clear-skills`, `--pin` / `--unpin`, `--provider` / `--model`, `--reasoning-effort`, `--workdir`, `--continuity` / `--no-continuity`. Create-only: `--paused [--paused-reason ...]`, `--no-agent --script <file>`, `--deliver <target>`, `--name`, `--interpreter`.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `prompt` | string | Task instruction. Must be self-contained: cron runs in a fresh session. |
| `schedule` | string | One of the schedule formats above. |
| `name` | string | Job name; all mutating verbs accept the name (case-insensitive) in place of the hex ID. Exact ID wins; ambiguous names are refused with candidate IDs. |
| `skill` / `skills` | string / list | Skills loaded in order before the prompt. `update` with `skills=[]` removes all. |
| `deliver` | string | Delivery target (see below). Default `origin` on messaging platforms, `local` on CLI. |
| `repeat` | int | Run-count limit. |
| `workdir` | string | Absolute existing directory. Injects `AGENTS.md` / `CLAUDE.md` / `.cursorrules` into the system prompt and sets the cwd of `terminal`, `read_file`, `write_file`, `patch`, `search_files`, `execute_code`. Empty string clears it. |
| `enabled_toolsets` | list | Per-job toolsets (e.g. `["web", "file"]`); wins over the `cron` platform config from `hermes tools`. |
| `script` | string | Pre-run script (must resolve inside `$HERMES_HOME/scripts/`). |
| `no_agent` | bool | Script-only job: stdout delivered verbatim, no LLM. |
| `context_from` | string / list | Job ID(s)/name(s) whose most recent completed output is prepended to the prompt. |
| `continuity` | bool | Inject the job's own previous output into each run (stored as reserved `self` entry in `context_from`). |
| `attach_to_session` | bool | Make delivery continuable (reply into the delivered brief); overrides `cron.mirror_delivery` for this job. |
| `pinned` | bool | Lock the current main model onto the job (agent may set only when the user asks). |
| `paused` / `paused_reason` | bool / string | Create paused (canary). |

## Delivery targets

| Option | Description |
|--------|-------------|
| `origin` | Back to where the job was created |
| `local` | Save only to `~/.hermes/cron/output/` |
| `telegram`, `discord`, `slack`, `whatsapp`, `signal`, `matrix`, `mattermost`, `email`, `sms`, `homeassistant`, `dingtalk`, `feishu`, `wecom`, `weixin`, `bluebubbles`, `qqbot` | Platform home channel |
| `telegram:123456`, `telegram:-100123:17585`, `discord:#engineering` | Specific chat / topic (`chat_id:thread_id`) / channel |
| `bot-chat`, `bot-chat:<profile>` | Deliver into a profile's Bot Chat session as a real message (same machine only; never included in `all`) |
| `all` | Every connected home channel, resolved at fire time |
| `telegram,discord`, `origin,all` | Comma-separated fan-out (de-duplicated by platform, chat_id, thread_id) |

The agent's final response is delivered automatically; the agent does not send messages itself. `[SILENT]` as the whole response suppresses delivery of a successful run (output still saved locally). `[CRON_FAILURE]` alone on the first line declares the run failed. Output is wrapped with a "Cronjob Response" header/footer unless `cron.wrap_response: false`.

## Config keys (`~/.hermes/config.yaml`, `cron:`)

| Key | Default | Description |
|-----|---------|-------------|
| `model` / `model_provider` | unset | Cron-fleet default for unpinned jobs. Resolution: per-job pin, then `cron.model`, then main agent model. |
| `preflight` | true | Pre-dispatch validation (provider key, skills, delivery targets, MCP servers). Failure sets `last_status: blocked_config`, alerts once, makes no LLM call. |
| `allow_agent_scheduling` | false | Let scheduled agents use `cronjob_manage`. |
| `require_restart_safe_scope` | false | Under systemd, fail closed when `systemd-run --user --scope` cannot be created. |
| `failure_nudge_threshold` | 3 | Consecutive failures before a review nudge; 0 disables. |
| `retry_unreachable` | true | Automatic re-runs at 5, 15, 30 minutes after a transient network/DNS failure before any model call. |
| `failure_repeat_alert_hours` | 6 | Reminder cooldown for the same failing error signature; 0 = alert every failing run. |
| `catch_up_missed` | true | Fire once for a slot missed during a gateway gap. |
| `misfire_grace_minutes` | 10 | Hosted-scheduler catch-up grace; 0 disables. |
| `wrap_response` | true | Header/footer around delivered output. |
| `delivery.notify` | true | Notification flag on cron deliveries. |
| `mirror_delivery` | false | Make cron deliveries continuable (thread-preferred; Slack `slack.cron_continuable_surface: in_channel` for flat). |
| `script_timeout_seconds` | 3600 | Pre-run script timeout (env `HERMES_CRON_SCRIPT_TIMEOUT` wins). |
| `cleanup_timeout_seconds` | 10 | Post-run cleanup bound; 0 = legacy unbounded. |
| `media_send_timeout_seconds` | 300 | Per-attachment upload bound (env `HERMES_CRON_MEDIA_SEND_TIMEOUT`). |
| `bot_chat_delivery_timeout_seconds` | 600 | Bot Chat delivery bound. |
| `standalone_send_timeout_seconds` | 60 | Standalone sender bound. |
| `max_parallel_jobs` | unset | Limit total cron concurrency. |

## Notes

- Source: https://hermes-agent.nousresearch.com/docs/user-guide/features/cron (pinned to v0.22.2)
- Cron-run sessions cannot create more cron jobs unless `cron.allow_agent_scheduling: true`; then `deliver: origin` is resolved at create time to the creating job's concrete target.
- Each run model: per-job pin, `cron.model`, main model at fire time. Per-job reasoning effort (`none` ... `ultra`) via `--reasoning-effort`; not exposed on the agent tool. A pinned job never falls back to `fallback_providers`; credential-pool rotation applies to all jobs.
- No-agent example: `hermes cron create "every 5m" --no-agent --script memory-watchdog.sh --deliver telegram --name "memory-watchdog"`. Empty stdout = silent tick; non-zero exit or timeout = error alert; `{"wakeAgent": false}` on the last stdout line skips the agent (default `true`). `.sh`/`.bash` run under bash, others under the current Python interpreter; subprocess env is sanitized. Credentials go through `terminal.env_passthrough` (Hermes-managed provider credentials cannot be declared).
- `cronjob(action="run")` is asynchronous (returns a handle; result re-enters the conversation); an optional `prompt` adds one-shot `## Run Context`. CLI `hermes cron run`, `hermes -z`, cron child sessions and Kanban workers run synchronously.
- Storage: `~/.hermes/cron/jobs.json`, outputs `~/.hermes/cron/output/{job_id}/{timestamp}.md`, execution ledger `~/.hermes/cron/executions.db` (states `claimed` / `running` / `completed` / `failed` / `unknown`; unknown attempts are never rerun). Not an exactly-once guarantee. Manage jobs via tool / CLI / `/cron`, not by editing `jobs.json`. Lock file `~/.hermes/cron/.tick.lock`.
- `last_status: delivery_failed` is distinct from `ok` and does not count toward `failure_streak`; adapters without positive send evidence are recorded as `last_delivery_unverified`.
- Quota hold: when a subscription provider reports a closed usage window with a retry-after hint, the job is parked (`quota_hold_until`) with one alert.
- Under systemd each due job runs in an external worker (`python -m cron.scheduler`) in a transient user scope; without a user session it degrades to no cgroup isolation. Kanban workers always require the scope.
- Cron store not writable (ENOSPC / EROFS / EACCES): due jobs are skipped, not double-fired later; surfaced by `hermes cron status`, `hermes doctor`, home-channel notices, and metrics `hermes.cron.store.writable` / `hermes.cron.store.skipped_runs`.
- Prompts are scanned for prompt-injection and credential-exfiltration patterns at create/update time.
- Event-triggered cron (webhook route with `cron_job` set) is documented on the webhooks messaging page.

## Related

- [Delegation](./delegation.md)
- [Kanban](./kanban.md)
- [Heartbeat](./heartbeat.md)
- [Loops](./loops.md)
