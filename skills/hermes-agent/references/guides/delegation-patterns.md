# Delegation Patterns

When and how to use subagent delegation (`delegate_task`) for parallel research, code review, and multi-file work.

## Signature / Usage

```python
delegate_task(tasks=[
    {
        "goal": "Research WebAssembly outside the browser in 2025",
        "context": "Focus on: runtimes (Wasmtime, Wasmer), cloud/edge use cases, WASI progress"
    },
    {
        "goal": "Research RISC-V server chip adoption",
        "context": "Focus on: server chips shipping, cloud providers adopting, software ecosystem"
    }
])

delegate_task(
    goal="Review src/auth/ for security issues and fix any found",
    context="""Project at /home/user/webapp. Python 3.11, Flask, PyJWT, bcrypt.
    Test command: pytest tests/auth/ -v"""
)
```

Gather then analyze: use `execute_code` for mechanical gathering (many sequential tool calls), then `delegate_task` for the reasoning-heavy step.

Tuning:

```yaml
delegation:
  max_concurrent_children: 30
  max_spawn_depth: 2
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `delegation.max_concurrent_children` | int (default 10, >=1) | Parallel batch size per `delegate_task` call |
| `delegation.max_spawn_depth` | int (default 1, >=1) | How many delegation levels can spawn further |
| `delegation.max_iterations` | int (default 250) | Iteration cap per subagent |
| `delegation.orchestrator_enabled` | bool | `false` disables orchestrator subagents globally |

## Notes

- Delegate: reasoning-heavy subtasks, context-flooding tasks, parallel independent work, fresh-context review. Do not delegate: single tool calls, mechanical logic (use `execute_code`), tasks needing user interaction (`clarify`), quick edits, or durable work (use `cronjob_manage` or `terminal(background=True, notify_on_complete=True)`).
- Subagents know nothing about the conversation: pass file paths, errors, structure, and constraints in `goal` / `context`.
- Subagents inherit the parent's enabled toolsets; `delegate_task` has no model-facing `toolsets` parameter. Child-blocked tools: `clarify`, `memory`, `send_message`; children keep `execute_code`.
- Leaf subagents cannot call `delegate_task`, `clarify`, `memory`, or `execute_code`. Orchestrator subagents (`role="orchestrator"`) keep `delegate_task` only when `max_spawn_depth` > 1.
- Each subagent has its own terminal session and working directory; avoid two subagents editing the same file.
- Top-level delegation is asynchronous but process-local: session closure, `/stop`, `/new`, or restart can cancel in-progress work.
- Failed subagents are reported as `⚠️ Subagent failed — "your goal": <reason>`.
- Verify subagent summaries yourself.
- Source: https://hermes-agent.nousresearch.com/docs/guides/delegation-patterns (pinned to v0.22.2)

## Related

- [daily-briefing-bot](./daily-briefing-bot.md)
- [automate-with-cron](./automate-with-cron.md)
