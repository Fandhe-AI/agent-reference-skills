# Schedules

Create recurring tasks (shell commands or agent prompts) that run on a cron schedule inside a box, via `box.schedule` (also available on `ephemeralBox.schedule`).

## Signature / Usage

```typescript
const cmdSchedule = await box.schedule.exec({
  cron: "* * * * *",
  command: ["bash", "-c", "date >> /workspace/home/cron.log"],
  webhookUrl: "https://example.com/hook", // optional
  folder: "/workspace/home",              // optional, defaults to box.cwd
})

const agentSchedule = await box.schedule.agent({
  cron: "0 9 * * *",
  prompt: "Run the test suite and fix any failures",
  model: "anthropic/claude-sonnet-4-6", // optional, overrides box's model
  timeout: 300_000,
  options: { maxBudgetUsd: 1.0 },
})

const schedules = await box.schedule.list()
await box.schedule.pause(schedules[0].id)
await box.schedule.resume(schedules[0].id)
await box.schedule.delete(schedules[0].id)
```

```python
cmd_schedule = box.schedule.exec(
    cron="* * * * *",
    command=["bash", "-c", "date >> /workspace/home/cron.log"],
)

agent_schedule = box.schedule.agent(
    cron="0 9 * * *",
    prompt="Run the test suite and fix any failures",
    timeout=300_000,
    options={"max_budget_usd": 1.0},
)

schedules = box.schedule.list()
box.schedule.pause(schedules[0].id)
box.schedule.resume(schedules[0].id)
box.schedule.delete(schedules[0].id)
```

## Options / Props

| Parameter | Required | Description |
|-----------|----------|-------------|
| `cron` | Yes | 5-field cron expression (UTC) |
| `command` (exec) | Yes | `string[]` — the shell command to run |
| `prompt` (agent) | Yes | The prompt sent to the agent (requires an agent configured on the box) |
| `folder` | No | Working directory; defaults to `box.cwd` |
| `model` (agent) | No | Overrides the box's default model for this schedule |
| `options` (agent) | No | Provider-specific agent options (`maxBudgetUsd`, `effort`, `systemPrompt`, `maxTurns`, ...) |
| `timeout` | No | Kill the run after this many milliseconds |
| `webhookUrl` / `webhookHeaders` | No | Notify a URL when the scheduled run completes |

`Schedule` object fields: `id`, `box_id`, `type` (`"exec" \| "prompt"`), `cron`, `command`/`prompt`, `folder`, `model`, `agent_options`, `timeout`, `status` (`"active" \| "paused" \| "deleted"`), `webhook_url`, `webhook_headers`, `last_run_at`, `last_run_status`, `last_run_id`, `total_runs`, `total_failures`, `created_at`, `updated_at`.

## Notes

- `list()` returns all non-deleted schedules; `get(id)`, `pause(id)`, `resume(id)`, `delete(id)` operate on a single schedule
- Standard 5-field cron syntax in UTC, e.g. `0 9 * * 1-5` for weekday mornings at 9 AM

## Related

- [Agent](./agent.md)
- [Quickstart](./quickstart.md)
