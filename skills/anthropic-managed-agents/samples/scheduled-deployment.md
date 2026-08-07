<!-- source: https://platform.claude.com/docs/en/managed-agents/scheduled-deployments / last verified: 2026-08-07 -->

# Create and Manage a Scheduled Deployment

Deploy an agent to start sessions autonomously on a cron schedule, then inspect run history and control its lifecycle.

```python
client = Anthropic()

deployment = client.beta.deployments.create(
    name="Weekly compliance scan",
    agent=agent.id,
    environment_id=environment.id,
    initial_events=[
        {
            "type": "user.message",
            "content": [{"type": "text", "text": "Run the weekly compliance scan."}],
        },
    ],
    schedule={
        "type": "cron",
        "expression": "0 20 * * 5",
        "timezone": "America/New_York",
    },
)
```

Each execution attempt generates a deployment run record; inspect failures independently of session lifecycle:

```python
for run in client.beta.deployment_runs.list(
    deployment_id=deployment.id,
    has_error=True,
):
    print(run.created_at, run.error.type, run.error.message)
```

Manage the deployment lifecycle:

```python
client.beta.deployments.pause(deployment.id)     # suppresses future triggers; running sessions continue
client.beta.deployments.unpause(deployment.id)   # resumes from next occurrence; missed triggers not backfilled
client.beta.deployments.archive(deployment.id)   # terminal; cannot be modified afterward
run = client.beta.deployments.run(deployment.id) # manual run outside the schedule, for testing
```

## Notes

- `initial_events` requires at least one `user.message` or `user.define_outcome` to start each session's work; `schedule.expression` uses standard POSIX cron (`minute hour day-of-month month day-of-week`), `schedule.timezone` an IANA identifier (e.g. `America/Los_Angeles`). Max granularity is minute-level; max 1,000 scheduled deployments per organization.
- Cron matches literal wall-clock time in the given timezone, so DST does not shift the fire time; wall-clock times that don't exist on a spring-forward day are skipped, and times occurring twice on a fall-back day fire twice. `schedule.upcoming_runs_at` reflects the exact configured schedule; actual execution applies jitter of up to 15% of the interval (min 5s, max 9min).
- If the agent is archived, the deployment auto-archives in the same operation; if deleted, the next trigger detects it and archives the deployment. If a subagent referenced by the agent is archived, the next trigger records `agent_archived_error` and auto-pauses the deployment. Other unrecoverable errors (archived environment/vault) behave the same way.
- Each lifecycle change emits a webhook event.
- Example from the Claude API (platform.claude.com) `managed-agents/scheduled-deployments` page.
