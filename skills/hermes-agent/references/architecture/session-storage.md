# Session Storage

Hermes Agent persists session metadata, full message history and model configuration in a SQLite database (`state.db`, WAL mode) shared by CLI and gateway sessions. Source: `hermes_state.py` facade plus `hermes_state_*.py` siblings.

## Signature / Usage

```python
from hermes_state import SessionDB

db = SessionDB()                           # Default: ~/.hermes/state.db
db = SessionDB(db_path=Path("~/.hermes/cache/scratch/test.db").expanduser())  # Custom path

db.create_session(
    session_id="sess_abc123",
    source="cli",
    model="anthropic/claude-sonnet-4.6",
    user_id="user_1",
    parent_session_id=None,  # or previous session ID for lineage
)
db.end_session("sess_abc123", end_reason="user_exit")
db.reopen_session("sess_abc123")

msg_id = db.append_message(
    session_id="sess_abc123",
    role="assistant",
    content="Here's the answer...",
    tool_calls=[{"id": "call_1", "function": {"name": "terminal", "arguments": "{}"}}],
    token_count=150,
    finish_reason="stop",
    reasoning="Let me think about this...",
)

messages = db.get_messages("sess_abc123")                    # raw with metadata
conversation = db.get_messages_as_conversation("sess_abc123")  # OpenAI format for replay
```

Other operations: `set_session_title`, `resolve_session_by_title`, `get_next_title_in_lineage` (returns e.g. `"Fix Docker Build #2"`), `search_messages`, `export_session`, `export_all`, `prune_sessions(older_than_days=..., source=...)`, `clear_messages`, `delete_session`.

## Options / Props

Tables in `state.db`:

| Table | Purpose |
|-------|---------|
| `sessions` | Session metadata, token counts, billing |
| `messages` | Full message history per session |
| `session_model_usage` | Per-model/per-task usage attribution |
| `messages_fts` | FTS5 (content + tool_name + tool_calls) |
| `messages_fts_trigram` | FTS5 trigram tokenizer (CJK / substring) |
| `messages_fts_cjk` | FTS5 `cjk_unicode61` tokenizer |
| `state_meta` | Key/value metadata |
| `gateway_routing` | Gateway routing metadata |
| `compression_locks` | Cross-process compression locking |
| `async_delegations` | Async delegation bookkeeping |
| `delivery_obligations` | Gateway outbox (lazily created) |
| `schema_version` | Single-row migration state (current version 31) |

FTS5 query syntax for `search_messages()`:

| Syntax | Example | Meaning |
|--------|---------|---------|
| Keywords | `docker deployment` | Both terms (implicit AND) |
| Quoted phrase | `"exact phrase"` | Exact phrase |
| Boolean OR | `docker OR kubernetes` | Either term |
| Boolean NOT | `python NOT java` | Exclude term |
| Prefix | `deploy*` | Prefix match |

Filters: `source_filter=["cli"]`, `exclude_sources=["telegram", "discord"]`, `role_filter=["user"]`.

Write-contention constants:

```
_WRITE_PATIENCE_S, _TRANSCRIPT_WRITE_PATIENCE_S, _ACTIVITY_WRITE_PATIENCE_S = 20.0, 60.0, 0.5
_WRITE_RETRY_MIN_S, _WRITE_RETRY_MAX_S = 0.020, 0.150
_WRITE_RETRY_SLOW_MIN_S, _WRITE_RETRY_SLOW_MAX_S = 0.250, 1.000
_CHECKPOINT_EVERY_N_WRITES = 50
```

## Notes

- Path: `get_hermes_home() / "state.db"` (context override, then `HERMES_HOME`, then `~/.hermes` / `%LOCALAPPDATA%/hermes`). Named profiles use `<root>/profiles/<name>/state.db`. Subprocess spawners must pass `HERMES_HOME` explicitly; changing `HOME` does not select a profile. Use `display_hermes_home()` only for user-facing text.
- Test isolation guard raises before tests open a production `state.db`; `HERMES_STATE_DB_GUARD_BYPASS=1` / `@pytest.mark.live_system_guard_bypass` are test-only escape hatches.
- In-place compaction archives old rows `active=0` and inserts retained context `active=1`; do not delete archive rows as duplicates.
- Session lineage via `parent_session_id` chains (compression splits); recursive CTEs query ancestors/descendants. Batch runner and RL trajectories are not stored here.
- `sessions.user_id` stores the platform sender id, or `<provider>:<user id>` (e.g. `basic:alice`) for authenticated `hermes serve`; empty for anonymous loopback, `subagent`, `cron`, `kanban`.
- `messages` stores `tool_calls` and reasoning detail fields as JSON strings; `api_content` is a byte-fidelity sidecar for prompt-cache-stable replay; `message_uid` is a durable per-message id; `absorbed_message_uids`, `tool_call_uids`, `tool_call_uid` track merges and per-occurrence tool-call ids. Timestamps are Unix epoch floats.
- Migrations: simple column additions are declarative (`_reconcile_columns()`); version-gated chain handles data/FTS changes (e.g. v10 trigram table, v23 FTS redesign, v29/v30 trigram scope reduction, v31 message uids).
- Write contention: 1 s SQLite timeout, time-budgeted retry with jitter, `BEGIN IMMEDIATE`, PASSIVE WAL checkpoint every 50 writes. Exhausted budget ends the turn with `session_persistence_failed:locked`; check `~/.hermes/logs/errors.log` for the lock-owner line. Lock detection is by SQLite result code.
- Gateway exception-path inputs get an owner marker in `display_metadata`; this is failure-writer arbitration, not exactly-once delivery.
- `hermes sessions recover` copies the row-bearing tables (FTS and `schema_version` regenerated).

## Related

- [State DB Recovery](./state-db-recovery.md)
- [Gateway Session Lifecycle](./gateway-session-lifecycle.md)
- [Prompt Assembly](./prompt-assembly.md)
