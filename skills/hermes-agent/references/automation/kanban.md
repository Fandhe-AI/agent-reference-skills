# Kanban Multi-Agent

Hermes Kanban is a durable, SQLite-backed task board shared across all Hermes profiles (`~/.hermes/kanban.db`). Every task is a row, every handoff is a row anyone can read and write, and every worker is a full OS process with its own profile identity. Agents drive the board through a dedicated `kanban_*` toolset; humans and scripts use `hermes kanban ...`, `/kanban ...` or the dashboard. Both surfaces route through the same `kanban_db` layer.

## Signature / Usage

```bash
hermes kanban init                       # create the board
hermes gateway start                     # hosts the embedded dispatcher
hermes kanban create "research AI funding landscape" --assignee researcher
hermes kanban watch                      # live events
hermes kanban list
hermes kanban stats
```

Worker turn (tool calls, not CLI):

```text
kanban_show()
kanban_heartbeat(note="halfway through — 4 of 8 files transformed")
kanban_complete(
    summary="migrated limiter.py to token-bucket; added 14 tests, all pass",
    metadata={"changed_files": ["limiter.py", "tests/test_limiter.py"], "tests_run": 14},
)
```

## Options / Props

Worker / orchestrator tools:

| Tool | Purpose | Required params |
|------|---------|-----------------|
| `kanban_show` | Read the current task (defaults to `HERMES_KANBAN_TASK`) incl. `worker_context` | — |
| `kanban_list` | List task summaries (filters: assignee, status, tenant, archived, limit) | — |
| `kanban_complete` | Finish with structured handoff | `summary` and/or `result` |
| `kanban_request_review` | Same-card review; task moves to `review` (not a block) | `summary` |
| `kanban_request_changes` | Reviewer verdict; routes back to original implementer | `reason` |
| `kanban_block` | Stop work: `kind=dependency` (waits in `todo`), `needs_input` / `capability` / `transient` (human) | `reason` |
| `kanban_heartbeat` | Liveness signal | — |
| `kanban_comment` | Append a note to the task thread | `task_id`, `body` |
| `kanban_attach` / `kanban_attach_url` / `kanban_attachments` | Attach (25 MB cap) / list files | file bytes+name / `url` / — |
| `kanban_create` | (Orchestrators) create child tasks; accepts `parents`, `skills`, `goal_mode`, `completion_contract` | `title`, `assignee` |
| `kanban_link` | (Orchestrators) add parent-to-child edge | `parent_id`, `child_id` |
| `kanban_unblock` | (Orchestrators) restore a blocked task to `review` / `ready` / `todo` | `task_id` |

CLI reference:

```text
hermes kanban create "<title>" [--body ...] [--assignee <profile>] [--parent <id>]... [--tenant <name>]
    [--workspace scratch|worktree|worktree:<path>|dir:<path>] [--branch <name>] [--priority N] [--triage]
    [--idempotency-key KEY] [--max-runtime 30m|2h|1d|<seconds>] [--max-retries N] [--goal] [--goal-max-turns N]
    [--skill <name>]... [--model M --provider P] [--scheduled-at ISO8601] [--completion-contract OWNER/REPO] [--json]
hermes kanban list | show | assign | reassign | edit | promote | schedule | diagnostics | link | unlink | claim | comment
hermes kanban complete | block | unblock | archive <id>...
hermes kanban request-review | request-changes | reopen-review
hermes kanban tail | watch | heartbeat | runs | assignees | dispatch | stats | log | context | specify | decompose | gc | swarm
hermes kanban set-model <id> <model> [--provider P]    # "none" clears
hermes kanban notify-subscribe | notify-list | notify-unsubscribe
hermes kanban boards list | create | switch | show | rename | rm [--delete]
```

`kanban:` config keys (`~/.hermes/config.yaml`):

| Key | Default | Description |
|-----|---------|-------------|
| `dispatch_in_gateway` | true | Run the dispatcher inside the gateway (env `HERMES_KANBAN_DISPATCH_IN_GATEWAY`) |
| `dispatch_interval_seconds` | 60 | Tick interval |
| `review_dispatch` | true | Spawn assigned profile with bundled `sdlc-review` skill; false for human-only review boards |
| `dispatch_profiles` | unset | Per-home claim allowlist (fail-closed when present but empty/null) |
| `failure_limit` | 2 | Consecutive spawn failures before auto-block (`gave_up`) |
| `max_in_progress` / `max_in_progress_per_profile` | unlimited | Concurrency caps |
| `auto_decompose` / `auto_decompose_per_tick` | true / 3 | Auto-run decomposer on Triage tasks |
| `orchestrator_profile` / `default_assignee` | "" | Root-task owner after fan-out / fallback assignee |
| `auto_subscribe_on_create` | true | Resume originating agent on terminal events |
| `notify_in_gateway` | true | Poll and deliver subscriptions from this gateway |
| `done_sub_retention_days` | 30 | GC for stale subscriptions (0 disables) |
| `auto_promote_children` | true | Promote decomposer children with no blockers to `ready` |
| `default_workdir` | unset | Board-level default workspace dir |
| `dispatch_stale_timeout_seconds` | 14400 (4 h) | Reclaim runs without a heartbeat in the last hour |
| `reconcile_orphans` | true | Requeue `running` cards with broken claim bookkeeping |

## Notes

- Source: https://hermes-agent.nousresearch.com/docs/user-guide/features/kanban (pinned to v0.22.2)
- Core model: Board (own DB, workspaces, logs; `default` board DB at `~/.hermes/kanban.db`, others `~/.hermes/kanban/boards/<slug>/kanban.db`; slug lowercase alphanumerics/hyphens/underscores, 1-64 chars). Task status: `triage | todo | ready | running | blocked | review | done | archived`. Links promote `todo` to `ready` when all parents are `done`. Tenant is a soft namespace; boards are the hard isolation boundary. Board resolution: `--board`, then `HERMES_KANBAN_BOARD`, then `~/.hermes/kanban/current`, then `default`. Cross-board links are not allowed.
- Workspaces: `scratch` (default, deleted on completion; files declared via `artifacts=[...]` are copied to durable attachment storage first), `dir:<absolute path>` (relative paths rejected), `worktree[:<path>]` (git worktree under `.worktrees/<id>/`); the last two are preserved.
- Dispatcher: reclaims stale claims and dead-PID workers, reaps workers that outlived their finished run (`terminal_worker_reaped`), promotes ready tasks, claims and spawns profiles; one dispatcher sweeps all boards. Workers are launched in a transient systemd scope (`systemd-run --user --scope`); gateway-under-systemd makes the scope mandatory, an unreachable bus is an infrastructure failure that does not advance `consecutive_failures` (`sudo loginctl enable-linger <user>`). `hermes kanban daemon` is deprecated (`--force`); do not run both against one `kanban.db`. Shared `kanban.db` across homes: set `dispatch_profiles` per home and avoid assigning to `default`.
- Worker exit contract: a clean exit while still `running` is a `protocol_violation` (bounded retries, `_PROTOCOL_VIOLATION_FAILURE_LIMIT` default 3, then auto-block); exit `75` (EX_TEMPFAIL) records `rate_limited` and requeues without counting a failure; exit `78` (EX_CONFIG) is a terminal provider error that blocks immediately (`gave_up` with `terminal_provider: true`). Up to two synthetic stop-nudges are injected (`HERMES_KANBAN_STOP_NUDGE=0` disables). Workers get a checkpoint notice near 90% of their iteration budget (`agent.budget_warning_ratio`). Heartbeat at least hourly for long work.
- Unblock lands in `review`, `ready` or `todo`; same-reason re-block `BLOCK_RECURRENCE_LIMIT` times (default 2) routes to `triage` (`block_loop_detected`). Do not `kanban_link` a support card under the parent it is meant to unblock (deadlock; use free-text mention).
- PR completion contracts: `--completion-contract OWNER/REPO` (or exact PR URL; `local-only` default) with `metadata.published_pr` on completion; required checks are verified via the assignee profile's own `gh` login (GitHub Enterprise not covered).
- Live-claim guard: completing a `running` card with a live claim needs the worker itself or `hermes kanban complete <id> --force`. Bulk `complete a b c --summary X` is refused. Completing with unsatisfied parents is refused (`unsatisfied parent dependencies`).
- Follow-up work on a done card: create a new child card with `--parent <done-id>` (created straight into `ready`; parent summary and metadata appear under `## Parent task results`), not a reopened card.
- Orchestrators decide shared design choices once and copy them into every sibling card body; collision hotspots use a `hotspot:` comment convention; colliding branches go to a neutral reconciler card with both as parents.
- Triage: default Auto decomposer uses `auxiliary.kanban_decomposer` plus profile descriptions (`hermes profile describe`, `auxiliary.profile_describer`); Manual mode via `kanban.auto_decompose: false`; `specify` uses `auxiliary.triage_specifier`.
- Per-task extras: `--skill` (skills must be installed on assignee), `--model` / `--provider` override, `--goal` (Ralph-style judge loop inside the card's worker session; budget exhaustion or an unachievable verdict blocks the card; shares the engine with `/goal` but not state), `--scheduled-at`, `--idempotency-key` for retried automation, `--max-retries`.
- Respawn guard reasons: `blocker_auth`, `recent_success`, `active_pr`, `rate_limit_cooldown`, `infrastructure_cooldown` (cooldown `HERMES_KANBAN_RATE_LIMIT_COOLDOWN_SECONDS` default 300). Diagnose with `hermes kanban dispatch --dry-run`.
- Notifications: gateway `/kanban create` auto-subscribes the origin chat; delivery modes `notify` (default), `notify+wake`, `wake`; waking events: `completed`, `blocked`, `gave_up`, `crashed`, `timed_out`, `review_requested`, `block_loop_detected`. Delivery is profile-owned in multi-gateway setups. Desktop app raises toasts while its event socket is connected.
- Events: lifecycle (`created`, `promoted`, `claimed`, `completed`, `blocked`, `dependency_wait`, `block_loop_detected`, `unblocked`, `archived`), edits (`assigned`, `edited`, `reprioritized`, `status`), worker telemetry (`spawned`, `worker_registered`, `heartbeat`, `reclaimed`, `crashed`, `timed_out`, `stale`, `reconciled`, `respawn_guarded`, `spawn_failed`, `skipped_nonspawnable`, `protocol_violation`, `gave_up`). Runs: one `task_runs` row per attempt with `outcome`, `summary`, `metadata`; downstream children read parents' latest completed run.
- Dashboard: bundled plugin, REST under `/api/plugins/kanban/` (unauthenticated by design on localhost; WebSocket needs the session token). Do not bind `--host 0.0.0.0` on shared hosts. Single-host by design; no multi-host boards. Swarm topology: `hermes kanban swarm "<goal>" --workers a,b,c --verifier v --synthesizer s`.
- `delegate_task` vs Kanban: delegate_task is an RPC-style fork → join with anonymous children (top-level calls return a handle immediately and the result is posted back as a new message; orchestrator subagents wait for their workers in-turn); Kanban is a durable queue with named profiles, retries, human-in-the-loop and an audit trail. They coexist.
- The original Kanban comparison table says "Parent blocks until child returns"; this page follows the asynchronous behavior stated on the Delegation page.
- Enable orchestration tools in a chat profile with `hermes -p <profile> tools enable kanban [--platform telegram]`; dispatcher-spawned workers receive task-scoped tools automatically.

## Related

- [Kanban Tutorial](./kanban-tutorial.md)
- [Kanban worker lanes](./kanban-worker-lanes.md)
- [Kanban Multi-Gateway Deployment](./kanban-multi-gateway.md)
- [Delegation](./delegation.md)
- [Persistent Goals](./goals.md)
