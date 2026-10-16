# Kanban worker lanes

A worker lane is a class of process the kanban dispatcher can route tasks to: an identity (the assignee string), a spawn mechanism, and a lifecycle-termination contract. Audience: operators choosing lanes, and plugin/integration authors adding a new lane shape.

## Signature / Usage

```text
Hermes Kanban  =  canonical task lifecycle + audit trail
Worker lane    =  implementation executor for one assigned card
Reviewer       =  human or human-proxy that gates "done"
GitHub PR      =  upstreamable artifact (optional, for code lanes)
```

Lifecycle: `ready` -> `running` -> `review` / `blocked` / `done` / `archived`. Workers never own that truth; they act through the `kanban_*` tools (or the API for external workers).

A lane must provide:

1. **Assignee string**: matches a Hermes profile name, or a registered non-spawnable identifier (plugin lane). Unresolvable assignees stay `ready` with a `skipped_nonspawnable` event.
2. **Spawn mechanism**: for profile lanes the dispatcher's `_default_spawn` runs `hermes -p <assignee> chat -q <prompt>` in the task's pinned workspace. Plugin lanes supply their own `spawn_fn(task, workspace, board)` returning an optional pid.
3. **Lifecycle terminator**: exactly one of `kanban_complete(summary=..., metadata=...)`, `kanban_request_review(summary=..., metadata=..., reviewer=...)`, `kanban_block(reason=...)`, or process exit without a tool call (reaped as `crashed` / `gave_up` / `timed_out`).

## Options / Props

Env vars set for a spawned Hermes profile worker:

| Variable | Carries |
|----------|---------|
| `HERMES_KANBAN_TASK` | task id |
| `HERMES_KANBAN_DB` | absolute path to the per-board SQLite file |
| `HERMES_KANBAN_BOARD` | board slug |
| `HERMES_KANBAN_WORKSPACES_ROOT` | root of the board's workspace tree |
| `HERMES_KANBAN_WORKSPACE` | absolute path to this task's workspace |
| `HERMES_KANBAN_RUN_ID` | current run id (lifecycle gate) |
| `HERMES_KANBAN_CLAIM_LOCK` | claim lock string (`<host>:<pid>:<uuid>`) |
| `HERMES_PROFILE` | worker's own profile name (comment attribution) |
| `HERMES_TENANT` | tenant namespace, if any |

## Notes

- The kernel enforces exactly one terminator per run; a worker that calls none and exits normally is treated as crashed.
- Review models: same-card review via `kanban_request_review` (status `review`; dispatcher loads bundled `sdlc-review` skill unless `kanban.review_dispatch` is disabled; reviewer approves with `kanban_complete`, returns rework with `kanban_request_changes`, or escalates with `kanban_block`); a pre-created downstream review/QA/release card (complete the implementation phase; do not also request same-card review and never sticky-block the parent with `review-required:`); human-only boards with `kanban.review_dispatch: false`. Do not put secrets or raw PII in `summary` / `metadata`; run rows are durable.
- Descendant processes (shells, execution kernels, cron deliveries, hooks, language servers, stdio MCP servers) carry a non-owner fence: CLI/tool mutations are rejected even if a script strips the inherited task ID. `unblock` stays orchestrator-only. Integration authors should spawn with `agent.delegation_context.delegated_child_subprocess_env`. This is cooperative scoping, not OS confinement.
- Logs: `<board-root>/logs/<task_id>.log`; `task_runs` rows hold `log_path`, exit code, summary, metadata; `task_events` rows record transitions (`promoted`, `claimed`, `heartbeat`, `completed`, `blocked`, `review_requested`, `changes_requested`, `review_reopened`, `gave_up`, `crashed`, `timed_out`, `reclaimed`, `claim_extended`). `hermes kanban tail <task_id>` follows live; `hermes kanban runs <task_id>` lists attempts.
- Lane shapes: Hermes profile lane (default) and orchestrator profile lane (toolset includes `kanban`, excludes `terminal` / `file` / `code` / `web`; decomposes via `kanban_create` + `kanban_link`). An external CLI worker lane (Codex / Claude Code / OpenCode CLI) is not yet a paved path.
- Dispatcher failure handling: stale claim TTL (`DEFAULT_CLAIM_TTL_SECONDS`, 15 min default; live workers get the claim extended, only dead PIDs are reclaimed), crashed-worker detection with `consecutive_failures` breaker, `expected_run_id` run-level retry guard, `task.max_runtime_seconds` hard cap, stranded-task detection (`kanban.stranded_threshold_seconds`, default 30 min; warning, error at 2x, critical at 6x, in `hermes kanban diagnostics`), `running_with_open_parents` warning, `review_dependency_deadlock` error.

## Related

- [Kanban Multi-Agent](./kanban.md)
- [Kanban Tutorial](./kanban-tutorial.md)
- [Kanban Multi-Gateway Deployment](./kanban-multi-gateway.md)
