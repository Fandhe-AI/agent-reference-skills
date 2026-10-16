<!-- source: https://platform.claude.com/docs/en/managed-agents/budgets / last verified: 2026-10-17 -->

# Set and Change a Session Budget

Cap a session's spend at creation, then raise or remove the cap after the session goes idle with `budget_reached` so the paused work resumes.

Set a budget at session creation (`amount` is a whole number of US cents as a string; `"125"` is $1.25):

```python
session = client.beta.sessions.create(
    agent=agent.id,
    environment_id=environment.id,
    budget={
        "type": "limit",
        "max_list_cost": {"amount": "125", "currency": "USD"},
    },
)
print(session.id, session.budget.max_list_cost.amount)  # sesn_01... 125
```

Raise (or lower) the cap after `budget_reached`:

```python
updated_session = client.beta.sessions.update(
    session.id,
    budget={
        "type": "limit",
        "max_list_cost": {"amount": "500", "currency": "USD"},
    },
)
print(updated_session.budget.max_list_cost.amount)  # 500
```

Remove the cap entirely:

```python
unbudgeted_session = client.beta.sessions.update(session.id, budget=None)
print(unbudgeted_session.budget)  # None
```

## Notes

- A budget can only be attached at session creation; adding one to a session without a budget is rejected with 400. Removing a budget is one-way: that session cannot be given a new one, so change the cap instead if you want to keep one.
- At the cap the session goes idle with `stop_reason` `budget_reached` (not terminated). While paused it accepts only `user.tool_confirmation`, `user.tool_result`, `user.custom_tool_result`, and `user.interrupt`; a `user.message` returns 400 until the budget is changed or removed. An accepted update resumes the paused work automatically.
- The new `max_list_cost` must be strictly greater than the consumed list cost, else 400. The session usually pauses a fraction past the old cap, so base the new value on `usage.list_cost` (set it a cent or more above), not on the old `max_list_cost`.
- Workflow runs paused by the budget resume on update (`workflow_run.status_running`), but a run an interrupt also paused stays paused: send a `user.message` asking the agent to continue its runs.
- Example from the Claude API (platform.claude.com) `managed-agents/budgets` page.
