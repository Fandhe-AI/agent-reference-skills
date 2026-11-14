# Cron Scheduling

Schedule recurring agent tasks and deliver results to a messaging channel.

```bash
# Create a scheduled job interactively
hermes cron create

# List all scheduled jobs
hermes cron list

# Pause / resume a job
hermes cron pause <job-id>
hermes cron resume <job-id>

# Trigger a job immediately (runs at next scheduler cycle)
hermes cron run <job-id>

# Stop the job's current in-flight run (the schedule is untouched)
hermes cron cancel <job-id>

# Remove a job
hermes cron remove <job-id>

# Check scheduler status
hermes cron status
```

```bash
# Set a home channel for cron result delivery (inside a messaging session)
/sethome
```

```yaml
# ~/.hermes/config.yaml — notification verbosity for background/cron tasks
display:
  background_process_notifications: all   # all | result | error | off
```

## Notes

- Cron jobs run via the gateway process; `hermes gateway` must be running (or installed as a service) for scheduled tasks to execute.
- Results are delivered to the channel designated with `/sethome`; without a home channel they are logged locally.
- The `hermes cron create` wizard accepts a natural-language schedule (e.g. "every day at 8am") and an optional `--skill` flag to attach a skill to the job.
- Use `hermes cron tick` to run one scheduler pass and exit (for a system crontab or other external scheduler). The gateway must be running: agent jobs execute inside the gateway, and a tick never starts one. With no gateway up, agent jobs are skipped with a logged reason and fire on the next tick after `hermes gateway start`; `no_agent` script jobs still run from a bare tick.
- `hermes cron cancel <job-id>` (v0.23) stops only the current run: script jobs get the process tree terminated, agent jobs are interrupted at their next checkpoint, and the job stays enabled. `hermes cron remove` also cancels a run in flight. A manual `hermes cron run` is an extra fire and does not spend the `repeat` count.
- The agent-side tool is `cronjob_manage` (single tool with `action="create" | "list" | "update" | "pause" | "resume" | "run" | "remove"`); the toolset name is `cronjob`. Agents launched by the scheduler cannot use `cronjob_manage` by default.
- For a watchdog that needs no LLM, see `cron-script-only.md`.
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/features/cron (pinned to v0.23.1)
