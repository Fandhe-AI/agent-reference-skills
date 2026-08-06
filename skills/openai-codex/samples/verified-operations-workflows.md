# Run verified operations

Run repeatable workflows and verify the result.

```text
I need to run this workflow:

Goal: [what should happen]
Inputs: [CSV, Google Sheet, list, ticket, or file path]
Approval or policy source: [Slack thread, doc, ticket, or none]
Runner: [script, API, CLI, skill, or manual app workflow]
Verification artifact: [result CSV, log, dashboard, screenshot, or other proof]

Please:
- inspect the inputs and ask only for missing required fields
- normalize dates, amounts, owners, and IDs before running the workflow
- run a dry run first when the workflow supports it
- run only the approved scope
- record one success or failure row per item
- retry transient failures once without restarting successful rows
- summarize totals, failures, retries, and verification artifacts

Pause before irreversible actions or scope changes.
```

## Notes

- Source: OpenAI Codex use-case (learn.chatgpt.com). `suggestedEffort: medium`
- Best for: operations tasks with structured inputs, explicit approval, and an auditable result, such as access updates, invite batches, or quota changes
- Related: Plugins (https://learn.chatgpt.com/codex/plugins), Scheduled tasks (https://learn.chatgpt.com/codex/automations), Agent skills (https://learn.chatgpt.com/codex/build-skills)
