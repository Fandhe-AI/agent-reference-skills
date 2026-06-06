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
- Use `hermes cron tick` to manually execute all due jobs once for debugging.
