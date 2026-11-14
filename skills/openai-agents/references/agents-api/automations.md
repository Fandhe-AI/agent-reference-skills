# Scheduled automations (Agents API)

Scheduled automations kick off Agents API sessions on a cron schedule (or once at a future time); an agent can also be given the `automations` tool to schedule tasks in the course of its work. An automation is a saved schedule: each run creates an invocation, a record of the attempt to send the task to its target session.

## Signature / Usage

Start a new session every day at 10 AM (include `OpenAI-Beta: agents=v1` when calling with cURL; the SDKs add it):

```python
from openai import OpenAI

client = OpenAI()
automation = client.beta.agents.automations.create(
    type="periodic",
    name="Daily suggestions",
    expression="0 10 * * *",
    timezone="America/New_York",
    target={
        "type": "new_session",
        "agent_id": "agt_123",
        "environment": {"type": "openai_hosted"},
        "input": [
            {
                "role": "user",
                "content": [
                    {
                        "type": "input_text",
                        "text": (
                            "Review my calendar, tasks, and recent messages for today. "
                            "Suggest the most useful actions I could take today, "
                            "with a short reason for each."
                        ),
                    }
                ],
            }
        ],
    },
)
print(automation.to_json())
```

Continue an existing session every two hours:

```python
automation = client.beta.agents.automations.create(
    type="periodic",
    name="Check restaurant reservations",
    expression="0 */2 * * *",
    timezone="America/New_York",
    target={
        "type": "existing_session",
        "session_id": "sess_123",
        "instructions": (
            "Check restaurant availability for our dinner plans. "
            "Compare with earlier checks and report newly available tables."
        ),
    },
)
```

One-time check (`run_at` is a future Unix timestamp in seconds):

```python
automation = client.beta.agents.automations.create(
    type="once",
    name="Check restaurant reply",
    run_at=1798794000,
    target={
        "type": "existing_session",
        "session_id": "sess_123",
        "instructions": (
            "Check whether the restaurant replied about our booking. "
            "Summarize any changes to the dinner plans."
        ),
    },
)
```

Let the agent schedule follow-ups with the `automations` tool:

```python
session = client.beta.agents.sessions.create(
    agent={
        "model": "gpt-6-astra",
        "instructions": (
            "Use automations to schedule tasks requested by the user. "
            "Delegate each scheduled task to a subagent and ask for a concise result. "
            "Keep the goal, schedule, and useful summaries in the main session. "
            "Adjust or stop schedules when the user asks."
        ),
        "multi_agent": {"enabled": True},
        "tools": [{"type": "automations"}],
    },
    environment={"type": "openai_hosted"},
    input=(
        "Every day at 10 AM in America/New_York, review the goals we discuss here "
        "and suggest the next actions I could take."
    ),
)
print(session.id)
```

List invocations and change a schedule:

```python
invocations = client.beta.agents.automations.invocations.list(automation_id="auto_123")
for invocation in invocations:
    print(invocation.id, invocation.status, invocation.session_id)

automation = client.beta.agents.automations.update(
    automation_id="auto_123",
    expression="0 11 * * *",
)
```

## Options / Props

| Target | Use it for | Required configuration |
|--------|-----------|------------------------|
| `new_session` | Independent work, such as a monthly spending review | An agent (`target.agent_id`, or inline `target.agent`; supply exactly one), an environment, and initial messages in `target.input` |
| `existing_session` | Follow-up work that needs the session's previous findings | A session ID and reminder text in `target.instructions` |

| Schedule type | Timing fields | Example |
|---------------|---------------|---------|
| `periodic` | `expression` and `timezone` | Every day at 10 AM in `America/New_York` |
| `once` | `run_at` | One check at a future time as a Unix timestamp in seconds |

| Cron expression | Schedule |
|-----------------|----------|
| `0 10 * * *` | Every day at 10 AM |
| `0 */2 * * *` | Every two hours |
| `0 9 1 * *` | First day of each month at 9 AM |
| `0 9 * * MON-FRI` | Monday through Friday at 9 AM |

| Invocation field | What to check |
|------------------|---------------|
| `status` | Starts as `queued`; becomes `completed` when delivery succeeds |
| `session_id` | Session to follow after delivery; can be `null` before a session is available |
| `source.type` | `manual` for a manual invocation or `automation` for a scheduled run |
| `scheduled_at` | Intended scheduled time, or `null` for a manual invocation |

| Operation | Effect |
|-----------|--------|
| `POST /v1/agents/automations` | Create (saved with status `active`; does not run immediately) |
| `GET /v1/agents/automations/{automation_id}` | Retrieve |
| `GET /v1/agents/automations` | List project automations; add `session_id=sess_123` to find those targeting an existing session |
| `POST /v1/agents/automations/{automation_id}` | Update; omitted fields stay unchanged |
| `POST /v1/agents/automations/{automation_id}/pause` | Holds pending scheduled deliveries; manual invocation remains available |
| `POST /v1/agents/automations/{automation_id}/resume` | Reactivates the saved schedule |
| `DELETE /v1/agents/automations/{automation_id}` | Prevents future scheduled and manual invocations |
| `POST /v1/agents/automations/{automation_id}/invocations` | Manual invocation, no request body; does not change the schedule or consume a one-time run; works while paused |
| `GET /v1/agents/automations/{automation_id}/invocations[/{invocation_id}]` | List or retrieve delivery history |

## Notes

- Flow: define the work (when, and new vs existing session); each run creates an invocation (a busy target session makes the task wait); the agent works with the session's tools and context, so follow session events to track progress. Delivery to the session does not mean the agent finished the work. Your application displays output and sends any user notifications.
- Both schedule types work with either target. A periodic automation's first occurrence is the next matching time. Put initial messages inside `target.input`, not at the top level; include at least one message with nonempty text or an image URL. Create the saved agent beforehand (reuse an agent across sessions, see configuration).
- Recurring timing: five-field cron with a named time zone (`UTC` or an IANA zone). Do not include `run_at` in a periodic automation; do not include `expression` or `timezone` in a `once` automation. Cron follows clock times in the zone (`0 */3 * * *` runs at midnight, 3 AM, 6 AM, ...). The API adds a small randomized delay to recurring runs; the task can wait longer if the target session is busy.
- `once` `run_at` must be an integer Unix timestamp in seconds in the future. A completed one-time schedule has no more scheduled runs (it can still be invoked manually); it cannot be paused or resumed. If a paused one-time automation's time passes, set a new future `run_at` before resuming.
- Existing-session delivery: each invocation delivers the saved instructions as an automation notification (separate from a new user message) using the session's current agent configuration and saved state. A busy session delays delivery; a scheduled run does not interrupt the active turn or supply a missing tool result or approval, so your application must still handle required actions.
- Completed delivery: for a new session it means the session accepted its initial input; for an existing session it means the session accepted the notification and the request to start work.
- `automations` tool: absent by default. It lets the agent create, list, get, update, pause, resume, and delete its own automations, targeting the current session; one-time or periodic only, and it cannot start a new session or manage another session's automations. Only automations created by the agent in the current session are accessible; your application can manage them through the API. `created_by` is recorded by the API; do not send it in a create request. Removing the tool does not delete saved schedules.
- Keep repeated work out of the main context: enable multi-agent orchestration with `agent.multi_agent.enabled: true` and instruct the main agent to delegate each scheduled task to a subagent and retain a short result. The `automations` tool manages schedules only; keep the other tools and data access the task needs.
- App-driven follow-ups: create schedules from application events (for example a `once` automation with `run_at` 48 hours ahead, repeated after each follow-up). Use one-time schedules for fixed intervals; a cron day-of-month expression does not represent a repeating 48-hour interval across month boundaries. Delete a pending follow-up when onboarding completes or the user opts out.
- Updating: a supplied `target` replaces the whole target, so include all its required fields and keep its type; an agent-created automation must keep its creator session as the target. Updates apply to future invocations; a queued invocation keeps the target and input saved when it was created. Pausing or deleting does not stop work already accepted by a session or delete the session; cancel the active turn to stop current work.
- Source: https://developers.openai.com/api/docs/guides/agents-api/sessions/automations (fetched 2026-11-14).

## Related

- [Run and Continue Sessions](./sessions.md)
- [Events and Items](./session-events.md)
- [Manage Sessions](./manage-sessions.md)
- [Configuring Agents](./configuration.md)
- [Multi-agent (Agents API)](./multi-agent.md)
- [OpenAI-hosted Sandboxes](./openai-hosted-sandboxes.md)
