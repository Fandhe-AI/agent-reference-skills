<!-- source: https://platform.claude.com/docs/en/build-with-claude/mid-conversation-effort-example / last verified: 2026-08-07 -->

# Build an orchestration mode (mid-conversation effort example)

Worked example: a session-level "orchestration mode" switch that grants standing consent for multiagent fan-out, combining a high effort level (`xhigh`), mid-conversation system messages, and standing consent worded into a tool description.

## Signature / Usage

```python
MODEL = "claude-opus-5"
EFFORT = "xhigh"

MODE_ENTER = (
    "Orchestration mode is on: optimize for the most exhaustive, correct answer rather than "
    "the fastest one. Use the Workflow tool on every substantive task..."
)
MODE_EXIT = "Orchestration mode is off. The Workflow tool's standard opt-in rule applies again."

# Each subagent runs its own agent loop at output_config={"effort": EFFORT}
with client.messages.stream(
    model=MODEL, max_tokens=64000, system=subagent_system,
    output_config={"effort": EFFORT}, tools=[BASH_TOOL, REPORT_TOOL],
    messages=messages, timeout=600,
) as stream:
    response = stream.get_final_message()
```

## Notes

- Three pieces make up the mode: (1) requests run at a documented effort value like `xhigh`; (2) mid-conversation system messages (`MODE_ENTER`/`MODE_REFRESH`/`MODE_EXIT`) maintain state without affecting cached prefixes; (3) the orchestration tool's own description grants standing consent while the mode is active, reverting to per-request opt-in when off.
- The full example implements: a `Workflow` tool for fan-out, a `bash` tool handler, a content-addressed journal (SHA-256 of prompt) for idempotent/resumable subagent runs, and a two-wave pattern (parallel subagents, then a second wave that adversarially verifies the first wave's findings).
- Key properties: resumable (journal cache), parallel (bounded by `MAX_CONCURRENT`), verified (adversarial second wave), isolated (one failed subagent becomes an error string, doesn't crash the run), token-aware (`MAX_TOTAL_SUBTASKS` caps work per call).

## Related

- [effort.md](./effort.md)
- [thinking-tool-workflows.md](./thinking-tool-workflows.md)
