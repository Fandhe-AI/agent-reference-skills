# Kanban Tutorial

A walkthrough of the four use-cases the Hermes Kanban system was designed for, with the dashboard open. Assumes you know what a task, run, assignee and dispatcher are (see the Kanban overview).

## Signature / Usage

```bash
hermes kanban init           # optional; first `hermes kanban <anything>` auto-inits
hermes dashboard             # opens http://127.0.0.1:9119 in your browser
# click Kanban in the left nav
```

Workers the dispatcher spawns drive the board through the `kanban_*` toolset: `kanban_show`, `kanban_list`, `kanban_complete`, `kanban_request_review`, `kanban_request_changes`, `kanban_block`, `kanban_heartbeat`, `kanban_comment`, `kanban_attach`, `kanban_attach_url`, `kanban_attachments`, `kanban_create`, `kanban_link`, `kanban_unblock`. Dashboard, CLI and worker tools all route through the same per-board SQLite DB (`~/.hermes/kanban.db` for the default board, `~/.hermes/kanban/boards/<slug>/kanban.db` for others).

## Story 1: dependent tasks (parent to child)

```bash
SCHEMA=$(hermes kanban create "Design auth schema" \
    --assignee backend-dev --tenant auth-project --priority 2 \
    --body "Design the user/session/token schema for the auth module." \
    --json | jq -r .id)

API=$(hermes kanban create "Implement auth API endpoints" \
    --assignee backend-dev --tenant auth-project --priority 2 \
    --parent $SCHEMA \
    --body "POST /register, POST /login, POST /refresh, POST /logout." \
    --json | jq -r .id)
```

Only the parentless task starts `ready`; children stay in `todo` until parents complete. Worker loop (tool calls, not commands you run):

```python
kanban_show()   # task_id defaults to $HERMES_KANBAN_TASK
kanban_heartbeat(note="schema drafted, writing migrations now")
kanban_complete(
    summary="users(id, email, pw_hash), sessions(id, user_id, jti, expires_at)",
    metadata={"changed_files": ["migrations/001_users.sql"], "decisions": ["bcrypt for hashing"]},
)
```

Inspect with `hermes kanban show <id>` and `hermes kanban runs <id>`.

## Story 2: fleet farming

Create many independent tasks per assignee (translator, transcriber, copywriter) and run `hermes gateway start`; the embedded dispatcher picks up all profiles' tasks from the same `kanban.db`.

## Story 3: role pipeline with retry

Two review models:

- Pre-created downstream card: the implementation card has a dedicated reviewer child; the engineer must call `kanban_complete` so the child leaves `todo`. Never block the implementation parent merely to ask for review.
- Same-card review lifecycle:

```python
kanban_request_review(summary="implemented reset flow; candidate is ready for review",
                      metadata={"changed_files": ["auth/reset.py"], "tests_run": 8},
                      reviewer="reviewer")
# reviewer:
kanban_request_changes(reason="Add password-strength validation and make reset tokens single-use.")
# engineer re-requests review, then reviewer:
kanban_complete(summary="review passed; acceptance criteria verified")
```

Run history records `review_requested`, `changes_requested`, `review_requested`, `completed`. `kanban_block` is reserved for a real external escalation. Do not combine the two review models.

## Story 4: circuit breaker and crash recovery

```bash
hermes kanban create "Deploy to staging (missing creds)" \
    --assignee deploy-bot --tenant ops \
    --max-retries 3
```

Spawn failures are `spawn_failed` (retryable); after `--max-retries` (default `kanban.failure_limit`, 2) the task goes `blocked` with outcome `gave_up`. Crashed workers (dead PID detected by `kill(pid, 0)`) release the claim, the task returns to `ready`, and the retry sees the earlier run in its context.

## Follow-up on a done card

Do not reopen a done card. Create a remediation card with the done card as parent:

```bash
hermes kanban create "Fix CI: test_backoff_jitter flakes on 3.11" \
    --assignee backend-dev \
    --parent t_impl \
    --workspace worktree --branch wt/ci-fix-backoff \
    --body "CI run #4812 failed after t_impl completed."
```

Because the parent is `done`, the child is created straight into `ready` and inherits the parent's summary and metadata; put fresh evidence (CI log) and acceptance criteria in the new card's body.

## Notes

- Source: https://hermes-agent.nousresearch.com/docs/user-guide/features/kanban-tutorial (pinned to v0.22.2)
- Board columns: Triage, Todo, Ready, In progress, Blocked, Done. Triage tasks are auto-decomposed by default (`auxiliary.kanban_decomposer`, roster-aware; parent task kept alive so `kanban.orchestrator_profile` or the default profile judges completion). Orchestration Auto/Manual pill; in Manual mode use Decompose (`hermes kanban decompose <id>` / `/kanban decompose <id>`). Specify (`auxiliary.triage_specifier`) rewrites a single task into a spec and promotes it to `todo`. Dashboard has filters, a `Lanes by profile` toggle and a `Nudge dispatcher` button (one dispatch tick now; default tick 60s).
- Structured handoff: `kanban_show()` returns `worker_context` with prior attempts (outcome, summary, error, metadata) and each parent's most recent completed run summary and metadata. `hermes kanban complete a b c --summary X` (bulk with a shared summary) is refused; `kanban_complete` is single-task only.
- Worker tool-call blocks are what the worker's model emits, not commands for you to run.
- Useful follow-ups: `hermes kanban watch --kinds completed,gave_up,timed_out`, `hermes kanban notify-subscribe <task> --platform telegram --chat-id <id>`, `hermes kanban --help`.

## Related

- [Kanban Multi-Agent](./kanban.md)
- [Kanban worker lanes](./kanban-worker-lanes.md)
