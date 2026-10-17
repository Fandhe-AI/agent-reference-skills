# Context Engine Plugins

Context engine plugins replace the built-in `ContextCompressor` with an alternative strategy for managing conversation context (for example a lossless knowledge-DAG engine). They implement the `ContextEngine` ABC in `agent/context_engine.py`. Only one engine is active at a time.

## Signature / Usage

```yaml
# config.yaml
context:
  engine: "compressor"    # default built-in
  engine: "lcm"           # activates a plugin engine named "lcm"
```

```python
from agent.context_engine import ContextEngine

class LCMEngine(ContextEngine):

    @property
    def name(self) -> str:
        """Short identifier, e.g. 'lcm'. Must match config.yaml value."""
        return "lcm"

    def update_from_response(self, usage: dict) -> None:
        """Called after every LLM call; update last_prompt_tokens, last_completion_tokens, last_total_tokens."""

    def should_compress(self, prompt_tokens: int = None) -> bool:
        """Return True if compaction should fire this turn."""

    def compress(self, messages: list, current_tokens: int = None,
                 focus_topic: str = None) -> list:
        """Return a new (possibly shorter) valid OpenAI-format message list."""

def register(ctx):
    ctx.register_context_engine(LCMEngine(context_length=200000))
```

```
plugins/context_engine/lcm/
├── __init__.py      # exports the ContextEngine subclass
├── plugin.yaml      # metadata (name, description, version)
└── ...
```

## Options / Props

Attributes the engine must maintain: `last_prompt_tokens`, `last_completion_tokens`, `last_total_tokens`, `threshold_tokens`, `context_length`, `compression_count`.

Optional methods:

| Method | Default | Override when |
|--------|---------|---------------|
| `on_session_start(session_id, **kwargs)` | No-op | Load persisted state |
| `on_session_end(session_id, messages)` | No-op | Flush state, close connections |
| `on_session_reset()` | Resets token counters | Per-session state to clear |
| `update_model(model, context_length, ...)` | Updates context_length + threshold | Recalculate budgets on model switch |
| `get_tool_schemas()` | `[]` | Engine provides agent-callable tools |
| `handle_tool_call(name, args, **kwargs)` | Error JSON | Implement tool handlers |
| `should_compress_preflight(messages)` | `False` | Cheap pre-API-call estimate |
| `get_status()` | Standard token/threshold dict | Custom metrics |
| `select_context(request_messages, *, conversation_messages, incoming_message, budget_tokens)` | `None` (no-op) | Replace which context enters this request (retrieval, routing) |
| `on_turn_complete(messages, usage=None, **kwargs)` | No-op | Observe/ingest finished turn |
| `clone_for_agent()` | `copy.deepcopy(self)` | Engine holds uncopyable state (locks, DB connections) |

Lifecycle: instantiate, `on_session_start()`, `update_from_response()` after each API call, `should_compress()` each turn, `compress()` when true, `on_session_end()` at session boundary; `on_session_reset()` on `/new` or `/reset`.

## Notes

- Plugin engines are never auto-activated; set `context.engine` to the plugin name (via `hermes plugins` > Provider Plugins > Context Engine or `config.yaml`). Directory install: `plugins/context_engine/<name>/` (bundled) or `$HERMES_HOME/plugins/<name>/`; no `plugins.enabled` entry needed; bundled names win on collision. A general plugin may also call `ctx.register_context_engine(engine)`; only one engine can be registered.
- Hermes calls `engine.clone_for_agent()` at every agent init (parent, subagents, gateway sessions). If the clone raises, the agent falls back to the built-in compressor.
- `select_context()` and `on_turn_complete()` are no-op, fail-open hooks: exceptions or invalid returns (`None`, `[]`, non-list, non-dict items) leave the request unmodified. `select_context()` is request-only and runs before prompt cache-control and sanitizers; return stable selections when nothing changed to preserve prompt-cache reuse. `on_turn_complete()` coverage is best-effort (abnormal early exits skip it).
- For post-turn observation only, implement a memory provider (`sync_turn()`) instead of a context engine.
- `message_uid` (32-hex) identifies a logical message across copies, compaction generations, rewrites and branches; merges keep the first constituent's uid and record the rest in `_absorbed_message_uids`; tool calls carry `_tool_call_uids` / `_tool_call_uid`. These fields are persistence-only (never sent to providers, ignored by the token estimator). A uid may be missing on legacy rows or the current turn's user message during preflight compression; never assume per-row uniqueness.
- The `compression` config block is specific to the built-in compressor, except `compression.model_thresholds` which is part of the engine contract (assigned to `engine.model_thresholds` before the first `update_model()`; reuse `agent.context_compressor.resolve_model_threshold`).
- Thread safety: when `compression.context_timeout_seconds > 0` (default), the whole compression pass runs on a pooled daemon thread with a host timeout; the message list is a private deep snapshot, work after a timeout is discarded, and different sessions can run concurrently.
- Tests: see `tests/agent/test_context_engine.py` for the ABC contract suite.
- Source: https://hermes-agent.nousresearch.com/docs/developer-guide/context-engine-plugin (pinned to v0.22.2)

## Related

- [Memory Provider Plugins](./memory-provider-plugin.md)
- [Build a Hermes Plugin](./plugins.md)
