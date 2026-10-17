# Gateway Session Lifecycle

`SessionSource`, `SessionEntry`, `SessionStore`, session-key rules, multi-user isolation, restart recovery, message queuing and the agent cache in the gateway (`gateway/session.py`, `gateway/run.py`).

## Signature / Usage

```python
SessionStore(sessions_dir: Path, config: GatewayConfig, has_active_processes_fn=None)
```

```python
def is_shared_multi_user_session(source, *, group_sessions_per_user, thread_sessions_per_user):
    if source.chat_type == "dm":
        return False  # DMs are always private
    if source.thread_id:
        return not thread_sessions_per_user  # Threads: shared unless per-user
    return not group_sessions_per_user       # Groups: isolated unless shared
```

Session key (this page's documented form; see Notes for the namespace variant in Gateway Internals):

```text
agent:main:{platform}:{chat_type}[:{chat_id}][:{thread_id}][:{participant_id}]
```

## Options / Props

SessionStore methods:

| Method | Description |
|---|---|
| `get_or_create_session(source, force_new=False)` | Core entry point; evaluates suspension and restart recovery state |
| `update_session(session_key, last_prompt_tokens=None)` | Bump `updated_at`, record `last_prompt_tokens` |
| `reset_session(session_key, display_name=None)` | Explicit reset (`/new`, `/reset`); sets `is_fresh_reset=True` |
| `switch_session(session_key, target_session_id, *, expected_session_id=None)` | Switch to an existing session (`/resume`); compare-and-swap with `expected_session_id` |
| `suspend_session(session_key)` | Mark `suspended=True` (from `/stop`) |
| `mark_resume_pending(session_key, reason)` | Mark `resume_pending=True`; will not override `suspended` |
| `clear_resume_pending(session_key)` | Clear after a successful resumed turn |
| `recover_interrupted_turns(max_age_seconds)` | Crash recovery: promote durable active-turn markers to `resume_pending` |
| `prune_old_entries(max_age_days)` | Drop old entries; skips suspended and active-process sessions |
| `list_sessions(active_minutes=None)` | All sessions sorted by `updated_at` desc |
| `lookup_by_session_id(session_id)` | Find the active entry for a session ID |
| `append_to_transcript` / `rewrite_transcript` / `load_transcript` | SQLite transcript operations |
| `rewind_session(session_id, n=1)` | Soft-delete back `n` user turns |

Main `SessionSource` fields: `platform`, `chat_id`, `chat_name`, `chat_type` (`dm` / `group` / `channel` / `thread`, default `dm`), `user_id`, `user_name`, `thread_id`, `chat_topic`, `user_id_alt`, `chat_id_alt`, `is_bot`, `guild_id`, `parent_chat_id`, `message_id`, `role_authorized`.

`SessionEntry` state flags:

| Flag | Default | Description |
|---|---|---|
| `was_auto_reset` | `False` | Set when explicit suspension causes a replacement session |
| `is_fresh_reset` | `False` | Set by `/new` or `/reset` |
| `suspended` | `False` | Hard force-wipe (`/stop` or stuck-loop escalation after 3+ restart failures) |
| `resume_pending` | `False` | Soft recovery: preserve `session_id`, cleared after the next successful turn |
| `resume_reason` | `None` | `restart_timeout`, `shutdown_timeout`, `restart_interrupted` |

Config keys:

| Config Key | Type | Default | Description |
|---|---|---|---|
| `group_sessions_per_user` | bool | `true` | Isolate group/channel sessions per user |
| `thread_sessions_per_user` | bool | `false` | Isolate thread sessions per user |
| `session_store_max_age_days` | int | `0` | Prune sessions older than N days (0 = disabled) |
| `agent.gateway_auto_continue_freshness` | int | `3600` | Seconds for resume freshness window |
| `agent.gateway_timeout` | int | `1800` | Agent turn timeout |
| `agent.agent_cache.max_size` | int | `128` | LRU cap on cached AIAgents |
| `agent.agent_cache.idle_ttl_secs` | int | `3600` | Evict agents idle this long |
| `agent.agent_cache.memory_high_mb` | int/str | `auto` | Anon-RSS budget above which LRU transcripts are shed |
| `agent.agent_cache.max_evictions_per_pass` | int | `16` | Cap on sessions shed per pressure pass |
| `agent.agent_cache.protect_recent` | int | `8` | MRU sessions the pressure pass never touches |

## Notes

- Source: https://hermes-agent.nousresearch.com/docs/developer-guide/gateway-session-lifecycle (pinned to v0.22.2)
- `get_or_create_session()` priority: `suspended=True` -> new `session_id`; `resume_pending=True` -> keep existing; otherwise return existing and bump `updated_at`.
- `session_id` format: `YYYYMMDD_HHMMSS_<8hex>`. `sessions.json` maps `session_key` -> entry metadata; SQLite (`SessionDB`) is the canonical transcript store.
- Key rules: DMs always include `chat_id` when present; group sessions append `participant_id` (`user_id_alt` or `user_id`) when `group_sessions_per_user`; threads are shared by default. WhatsApp identifiers are canonicalized (`canonical_whatsapp_identifier()`).
- Explicit conversation boundaries only: inactivity and wall-clock time never rotate a conversation; legacy idle/daily reset settings are ignored. `/new`, `/reset`, suspension and crash recovery are the boundaries.
- Restart recovery: a `.clean_shutdown` marker skips recovery; otherwise `_recover_unclean_sessions()` acts only on durable active-turn markers (persisted but unledgered replies go to the delivery ledger; unreplied turns become `resume_pending` once). `_suspend_stuck_loop_sessions()` counts restarts in `{HERMES_HOME}/restart_counts.json` and suspends after 3+.
- Queuing: `adapter._pending_messages` is a single next-up slot per session; `_queued_events` is the FIFO overflow for `/queue` (one full agent turn per invocation). `/new` and `/reset` clear queues; `/stop` drops the single-slot follow-up; internal wakes survive these commands.
- `SessionContext` is injected via `build_session_context_prompt` (`## Current Session Context`), with optional PII redaction (user IDs -> `user_<12hex>`); Discord and non-`pii_safe` plugin platforms are excluded.
- Agent cache: LRU `OrderedDict` keyed by `session_key`; `_sweep_agent_cache_under_pressure()` sheds LRU agents over `memory_high_mb`, never mid-turn agents, `protect_recent` sessions, or sessions whose transcript has not reached disk.
- The gateway key namespace is `main` for the default profile and `<profile>` under multiplexing (see Gateway Internals); the `agent:main:...` examples here are the default-profile form.
- FTS tables are derived indexes that can be detached and rebuilt; see State DB Recovery.

## Related

- [Gateway Internals](./gateway-internals.md)
- [Session Storage](./session-storage.md)
- [State DB Recovery](./state-db-recovery.md)
