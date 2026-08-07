<!-- source: https://platform.claude.com/docs/en/managed-agents/scheduled-deployments / last verified: 2026-08-07 -->

# Scheduled deployments

A scheduled deployment lets an agent start sessions autonomously on a predictable cadence. Deployments are created and managed with the Deployments API, part of the Claude API.

## Signature / Usage

```python
deployment = client.beta.deployments.create(
    name="Weekly compliance scan",
    agent=agent.id,
    environment_id=environment.id,
    initial_events=[
        {"type": "user.message", "content": [{"type": "text", "text": "Run the weekly compliance scan."}]},
    ],
    schedule={
        "type": "cron",
        "expression": "0 20 * * 5",
        "timezone": "America/New_York",
    },
)
```

## Options / Props

| Field | Description |
|-------|-------------|
| Session configuration | Requires agent + environment configuration; optionally files, GitHub, memory stores, vaults. |
| `initial_events` | Required, at least one `user.message` or `user.define_outcome` that starts each session's work. |
| `schedule.expression` | Standard POSIX cron (`minute hour day-of-month month day-of-week`); generate/validate in Console. |
| `schedule.timezone` | IANA timezone identifier, for example `America/Los_Angeles`. |

Max granularity is minute-level. A maximum of **1,000 scheduled deployments** is supported per organization.

### Cron and timezone semantics

- DST: cron schedules use literal wall-clock matching, so `"0 20 * * *"` in `America/New_York` fires at 8PM local time regardless of EST/EDT.
- Wall-clock times that don't exist on a spring-forward day are not triggered; times that occur twice on a fall-back day fire twice. Schedule outside the 1–3 AM local window (or use UTC) when missed/duplicate executions are unacceptable.
- The response's `schedule.upcoming_runs_at` reflects the exact configured schedule; actual execution applies jitter of up to 15% of the interval (min 5s, max 9min) to distribute load.

## Deployment runs

Each execution attempt generates a **deployment run** record, independent of session lifecycle. A successful run's `session_id` links to the created session; failures carry an `error.type` (for example `environment_archived_error`, `agent_archived_error`, `session_rate_limited_error`).

```python
for run in client.beta.deployment_runs.list(deployment_id=deployment.id, has_error=True):
    print(run.created_at, run.error.type, run.error.message)
```

### Failure behavior

- Session-creation rate limits record a `session_rate_limited_error` run immediately with no retry; the schedule tries again next occurrence.
- If the agent is archived, the deployment is auto-archived in the same operation (no run recorded); if the agent is deleted, the next trigger detects it and archives the deployment.
- If a subagent referenced by the agent is archived, the next trigger records `agent_archived_error` and auto-pauses the deployment.
- Other unrecoverable errors (archived environment/vault) record a failed run and auto-pause the deployment; `paused_reason.error.type` mirrors the run's `error.type`.

## Managing deployment lifecycle

```python
client.beta.deployments.pause(deployment.id)     # suppresses future triggers; running sessions continue
client.beta.deployments.unpause(deployment.id)   # resumes from next occurrence; missed triggers not backfilled
client.beta.deployments.archive(deployment.id)   # terminal; cannot be modified afterward
client.beta.deployments.run(deployment.id)       # manual run outside the schedule, for testing
```

Each lifecycle change emits a webhook event (see webhooks.md, Deployment / Deployment run events tabs).

## Notes

- All Managed Agents API requests require the `managed-agents-2026-04-01` beta header.

## Related

- [Subscribe to webhooks](./webhooks.md)
- [Session Event Stream](./events-and-streaming.md)
- [Define your agent](../getting-started/agent-setup.md)
