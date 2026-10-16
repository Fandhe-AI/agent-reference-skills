# Delegation

The `delegate_task` tool spawns child AIAgent instances with isolated context, inherited tool access and their own terminal sessions. Each child gets a fresh conversation; only its final summary enters the parent's context. Top-level calls run in the background automatically: Hermes returns a handle immediately and posts the result back as a new message. Orchestrator subagents wait for their own workers.

## Signature / Usage

```python
# Single task
delegate_task(
    goal="Debug why tests fail",
    context="Error: assertion in test_foo.py line 42"
)

# Parallel batch (up to 10 concurrent by default)
delegate_task(tasks=[
    {"goal": "Research topic A", "context": "Focus on recent primary sources"},
    {"goal": "Research topic B", "context": "Compare the leading explanations"},
    {"goal": "Fix the build", "context": "Project root: /home/user/project"}
])
```

Control actions (synchronous, scoped to the caller's own spawn tree, never consume the spawn cap):

```json
{"action": "list"}
{"action": "steer", "subagent_id": "sa-0-1a2b3c4d", "message": "focus on pricing instead"}
{"action": "stop",  "subagent_id": "sa-0-1a2b3c4d"}
```

## Options / Props

Per-task fields: `goal`, `context`, `images` (up to 8 local paths / `http(s)` / `data:image/...` URLs), `output_schema` (JSON Schema the final answer must validate against), `group` (only when `delegation.independent_completions` is on), `role` (`leaf` default | `orchestrator`), `background`.

`delegate_task` has no model-facing `toolsets` or per-task model parameter; children inherit the parent's enabled toolsets.

`delegation:` keys in `~/.hermes/config.yaml`:

| Key | Default | Description |
|-----|---------|-------------|
| `max_iterations` | 250 | Tool-calling turns per child (`exit_reason: max_iterations`, `truncated: true` on exhaustion) |
| `max_concurrent_children` | 10 | Parallel children per batch (env `DELEGATION_MAX_CONCURRENT_CHILDREN`; floor 1, no ceiling); larger batches return a tool error |
| `independent_completions` | false | Results land per completion unit / group instead of one message per call (start a new session after changing) |
| `worktree_isolation` | false | Per-child git worktree `<repo>/.worktrees/subagent-<id>` on branch `hermes-subagent/subagent-<id>` |
| `max_spawn_depth` | 1 | Tree depth (1 = flat; `role="orchestrator"` is a no-op at default) |
| `orchestrator_enabled` | true | `false` forces every child to leaf |
| `oneshot_max_children` | 2 | Total children for `hermes chat -q` / `--oneshot` (0 = unlimited) |
| `model` / `provider` | inherit parent | Child model / provider |
| `base_url` / `api_key` / `api_mode` | | Direct endpoint (`api_mode`: `chat_completions`, `codex_responses`, `anthropic_messages`; auto-detected from URL) |
| `request_overrides` | | Per-child API kwargs; `extra_body` deep-merged one level; works on all resolution branches |
| `child_timeout_seconds` | 0 | Opt-in inactivity cap (floor 30s); 0 or negative = none |
| `surface_child_process_notifications` | false | Show child background-process notifications in the parent chat |
| `compression_threshold_tokens` | 0 (off) | Absolute cap on a child's compaction trigger (at least 16000 to enable) |

Related: `auxiliary.review.{provider,model}` pins the `/review` model.

```yaml
delegation:
  model: "google/gemini-flash-2.0"
  provider: "openrouter"
```

## Notes

- Subagents know nothing: pass everything needed in `goal` / `context`. If the parent has a workspace, the child's system prompt embeds project context files (`.hermes.md` > AGENTS.md chain > CLAUDE.md > `.cursorrules`; SOUL.md excluded).
- `output_schema`: child gets one bounded correction turn on validation failure; result gains `schema_valid` and, on failure, `schema_errors` / `schema_note` while keeping `status: completed` with the raw text in `summary`.
- Blocked for leaf subagents: `delegate_task`, `clarify`, `memory`, `send_message`, `cronjob`. Orchestrators keep `delegate_task`. Both roles keep `execute_code`.
- Resolution order for children: `delegation.base_url`, then `delegation.provider`, else parent provider and credential pool; `delegation.model` applies in all cases. A pinned child never falls back to the global fallback chain.
- Background process lifetime: a child's background processes die when it finishes; use `process_manage(action="wait" | "kill" | "handoff", ...)` (handoff up to 3 per child) before returning. Unread results are attached as `unread_completions`; still-running ones named in `orphaned_processes`.
- Timeouts: no wall-clock cap by default; a stale-progress monitor (450s idle, 1200s inside a tool) interrupts frozen children and returns `status: "timeout"` with metadata (`timeout_seconds`, `timed_out_after_seconds`, `last_event_age`, `timeout_phase`). Background delegations also get a 120s grace and a terminal `stalled` event (`stalled_after_quiet_seconds`, `stall_threshold_seconds`, `stall_phase`, `stall_grace_seconds`). A `[delegation budget warning]` is steered at ~80% of an idle window. Zero-call timeouts write `~/.hermes/logs/subagent-timeout-<session>-<timestamp>.log`.
- Durability: completion events are stored in `state.db` before delivery; a process restart does not resume a running child (recorded `unknown`). `/stop` or closing/resetting the owning session interrupts background children (`status="interrupted"`, partial output kept). Use `cronjob` or `terminal(background=True, notify_on_complete=True)` for durable work. Gateways acknowledge completion only after adapter admission; crash/restart delivery is at least once.
- Failures are surfaced in CLI, gateway chat (even with `tool_progress` off) and the tool result (`status: "failed"` plus `error`).
- Steering: `steer` is queued, not delivered; undelivered text surfaces as `pending_steer` or `missed_steer`. Gateway RPC `subagent.steer` / `subagent.interrupt` accept only the exact spawning UI session.
- Live transcripts: `<hermes_home>/cache/delegation/live/<delegation_id>/task-<n>.log` plus `manifest.json`, pruned after 7 days (`tail -f` works).
- Worktree isolation is git-only and local-terminal-only; otherwise silently degrades. Result gains `worktree` (`path`, `branch`, `commits`, `dirty`, `pruned`, `inspection_failed`); empty clean worktrees are pruned.
- `/review [extra instructions]` spawns a full-privilege background reviewer over the last 10 user/assistant messages; distinct from `/refine` (reviews conversation to update memory and skills). `/agents` (alias `/tasks`) lists background delegations; TUI overlay and classic CLI monitor via Ctrl+T / F6 with steer and stop controls.
- Worker cost strategy: keep the parent on a frontier model and pin `delegation.model` to an inexpensive one; the pin is global, so use kanban's per-task model override for quality-sensitive subtasks.

## Related

- [Code Execution](./code-execution.md)
- [Kanban Multi-Agent](./kanban.md)
- [Cron Jobs](./cron.md)
