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
cronjob(action="cancel", job_id="...")
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
hermes cron cancel <job_id_or_name> [--reason "..."]   # stop the current run, schedule untouched
hermes cron remove <job_id_or_name>
hermes cron edit <job_id_or_name> [...flags]
hermes cron status
hermes cron tick                          # needs a running gateway for agent jobs
hermes cron runs [job-id] --limit 20      # alias: history
hermes cron incidents                     # filter: --state detected|alerted|resolved|closed; ack <id>
hermes cron doctor                        # read-only fleet health check; exits 1 while any finding stands
hermes pause [--reason ...]               # global emergency stop (hermes resume lifts it)
```

Chat equivalents: `/cron list | pause | resume | run | remove | edit <job_id> ...`.

Per-job timezone and catch-up (new in v0.23):

```bash
hermes cron create "0 9 * * 1-5" --timezone Asia/Hong_Kong "HK market open brief"
hermes cron create "0 9 * * 1-5" --timezone America/New_York "US market open brief"
hermes cron edit market-open --grace-minutes 0    # never catch up: skip a missed occurrence
hermes cron edit market-open --grace-minutes 180  # run up to 3h late
hermes cron create "0 7 * * 1-5" "Morning brief" --catch-up off   # a stale brief is useless: skip
hermes cron edit <job> --catch-up on                                # always run once on return
```

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
| `bot_chat_delivery_timeout_seconds` | removed in v0.23 | Retired: Bot Chat deliveries are admitted to the target profile's running gateway and tracked by receipt; config migration v51 removes the key |
| `standalone_send_timeout_seconds` | 60 | Standalone sender bound. |
| `max_parallel_jobs` | unset | Limit total cron concurrency. |

## Notes

- Source: https://hermes-agent.nousresearch.com/docs/user-guide/features/cron (pinned to v0.23.1)
- Per-job timezone (v0.23): `--timezone <IANA zone>` pins the cron expression to that zone's wall clock (stays at 09:00 across that zone's DST changes); omit it (or `--timezone ""` on edit) to inherit the profile `timezone:`. An offset-less one-shot timestamp is read in the job's zone; one with its own offset is already an instant. Changing the zone recomputes `next_run_at` at once. No effect on `interval` jobs.
- Catch-up (v0.23): a missed cron occurrence runs late only inside a window of half the job's period, clamped to 2 minutes-2 hours; `--grace-minutes` (0-1440; `0` never catches up; `""` restores the computed window) overrides it per job and only applies to cron expressions. `--catch-up on|off` (agent tool `catch_up: true|false`; Desktop editor "Missed runs") overrides `cron.catch_up_missed` per job, beats `--grace-minutes`, and makes a one-shot fire once late instead of being dropped after its 120-second grace. Every passed-over slot is booked as a `missed ×N` row in the execution ledger (visible in `hermes cron runs <job>` and run history).
- `hermes cron cancel <job>` (v0.23) stops only the current run; the job stays enabled and its next fire is unchanged. Script jobs get the whole process tree terminated (`SIGTERM` to the process group, then `SIGKILL` after a grace period); agent jobs have the turn interrupted at its next checkpoint. It is a request recorded against the run's execution id; the run books a `cancelled` row with its reason, sends no failure notice and does not count toward the failure streak. Also `POST /api/cron/jobs/{id}/cancel`, the agent's `cronjob_manage` action `cancel`, and **Stop** in the Desktop job header. Removing a job cancels its live run ("job removed while running"). Cancelling an idle job is a no-op; a cancel cannot roll back side effects.
- `hermes cron run` (v0.23) is an extra fire: the scheduled run still happens and the `repeat` count is not spent; it exits nonzero for a known synchronous execution failure (background dispatch is not a terminal verdict). `hermes cron tick` runs one scheduler pass and exits but never starts a gateway: with none running, agent jobs are skipped with a logged reason (in `hermes cron list`) without advancing or penalising their schedule, and fire on the next tick after `hermes gateway start`; `no_agent` script jobs still run from a bare tick.
- Admission recovery (v0.23): agent-backed runs keep their fire identity until output and a durable delivery handoff are recorded; the scheduler reconciles unfinished receipts each tick (also after an owner restart), hands a known terminal result to the delivery queue without re-running the agent, and leaves delivery interrupted after a send claim `unknown` (not retried). An interrupted execution or an unfindable prepared fire stays paused for operator review; paused jobs are never auto-resumed.
- Bot Chat delivery (v0.23): admitted to the target profile's running gateway; a profile with no Bot Chat gets one on first delivery. If that gateway is not running the run is recorded `delivery_failed` (output stays in `hermes cron runs`, not redelivered) and cron never starts its own Bot Chat turn. For agent jobs the run settles to `ok` once the gateway hands the send to the bot (accepted, not answered; `last_delivery_queued` keeps the receipt) and a refused hand-off settles to `delivery_failed`; script-only (`no_agent`) deliveries stay `delivery_queued`. The `cron/bot_chat_pending` file lane and `hermes chat -c "Bot Chat"` fallback of v0.22 are gone.
- Script jobs (v0.23): `script` is always a file, never a command line; `--script "echo hi"` is refused at creation (write it to `~/.hermes/scripts/hi.sh` and pass `hi.sh`).
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

### Migration (v0.22 -> v0.23): Bot Chat delivery timeout removed

- `cron.bot_chat_delivery_timeout_seconds` (v0.22 default 600) is retired; there is no cron-side turn left to time out. Config migration v51 removes the key with a one-time note. See the Bot Chat delivery note above and the Updating page's gateway-owned session runtime section for legacy `cron/bot_chat_pending/*.json` records.

## Related

- [Delegation](./delegation.md)
- [Kanban](./kanban.md)
- [Heartbeat](./heartbeat.md)
- [Loops](./loops.md)
