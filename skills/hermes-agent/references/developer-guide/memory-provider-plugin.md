# Memory Provider Plugins

Memory provider plugins give Hermes persistent, cross-session knowledge beyond built-in MEMORY.md and USER.md by implementing the `MemoryProvider` ABC from `agent/memory_provider.py`. Single-select, config-driven, managed via `hermes plugins`.

## Signature / Usage

```python
from agent.memory_provider import MemoryProvider
from agent.secret_scope import get_secret

class MyMemoryProvider(MemoryProvider):
    @property
    def name(self) -> str:
        return "my-provider"

    def is_available(self) -> bool:
        """Check if this provider can activate. NO network calls."""
        return bool(get_secret("MY_API_KEY"))

    def initialize(self, session_id: str, **kwargs) -> None:
        """kwargs always includes hermes_home (str): active HERMES_HOME path."""
        self._api_key = get_secret("MY_API_KEY") or ""
        self._session_id = session_id

    def get_tool_schemas(self) -> list[dict]:
        return []   # required @abstractmethod — see full guide

    # ... implement remaining methods (get_config_schema, save_config, and
    # handle_tool_call if the provider exposes tools) — omitted in this partial example

def register(ctx) -> None:
    ctx.register_memory_provider(MyMemoryProvider())
```

```toml
# pyproject.toml (packaged provider)
[project.entry-points."hermes_agent.memory_providers"]
my-provider = "my_provider:register"
```

```yaml
# plugin.yaml
name: my-provider
version: 1.0.0
description: "Short description of what this provider does."
hooks:
  - on_session_end
```

Config schema and save:

```python
def get_config_schema(self):
    return [
        {"key": "api_key", "description": "My Provider API key", "secret": True,
         "required": True, "env_var": "MY_API_KEY", "url": "https://my-provider.com/keys"},
        {"key": "region", "description": "Server region", "default": "us-east",
         "choices": ["us-east", "eu-west", "ap-south"]},
    ]

def save_config(self, values: dict, hermes_home: str) -> None:
    Path(hermes_home, "my-provider.json").write_text(json.dumps(values, indent=2))
```

## Options / Props

Installation layouts (precedence order, earlier wins on name collision):

| Source | Location | Notes |
|--------|----------|-------|
| Bundled | `plugins/memory/<name>/` | Closed to new providers |
| User | `$HERMES_HOME/plugins/<name>/` | Per profile |
| Project | `./.hermes/plugins/<name>/` | Opt-in via `HERMES_ENABLE_PROJECT_PLUGINS=1` |
| Package | `hermes_agent.memory_providers` entry point | Distribution supplied by installation owner |

Required methods: `name`, `is_available()` (no network), `initialize(session_id, **kwargs)`, `get_tool_schemas()` (required abstract), `handle_tool_call(tool_name, args, **kwargs)` (if tools), `get_config_schema()`, `save_config(values, hermes_home)` (unless env-var-only).

Optional hooks:

| Method | When called | Use case |
|--------|-------------|----------|
| `system_prompt_block()` | System prompt assembly | Static provider info |
| `prefetch(query, *, session_id="")` | Before each API call | Return recalled context |
| `queue_prefetch(query, *, session_id="")` | After each turn | Pre-warm next turn |
| `sync_turn(user, assistant, *, session_id="", messages=None)` | After each completed turn | Persist conversation (non-blocking) |
| `on_session_end(messages)` | Conversation ends | Final extraction/flush |
| `on_pre_compress(messages)` | Before context compression | Save insights before discard |
| `on_memory_write(action, target, content, metadata=None)` | Built-in memory writes | Mirror to backend (`metadata["previous_content"]` for replace/remove) |
| `shutdown()` | Process exit | Clean up |
| `post_setup(hermes_home, config)` / `get_status_config()` | After wizard / `hermes memory status` | Interactive follow-up, status |

`initialize()` keyword context: `hermes_home`, `platform` (`cli`, `gui`, `acp`, `telegram`, ...), `session_title`, `session_title_source` (`derived` / `llm` / `user`), `cwd`, `gateway_session_key`, `user_id`, `user_id_alt`, `user_name`, `chat_id`, `agent_identity`, `agent_workspace`, `agent_context` (`cron`, `subagent`, or `primary`; skip automatic writes for non-primary). Accept `**kwargs`.

Config schema field keys: `key`, `description`, `secret` (with `env_var`, written to `.env`), `required`, `default`, `choices`, `url`.

## Notes

- Discovery only enumerates; nothing is imported until `memory.provider` names it. Entry-point discovery does not install packages; on PM-managed installs ship a directory provider with declared Python dependencies (`pyproject.toml`, `python_dependencies`).
- Only one external memory provider can be active; a second is rejected with a warning.
- `sync_turn()` must be non-blocking. Spawn work with `agent.memory_provider.spawn_context_thread(_sync, name=...)`, never a bare `threading.Thread` (profile isolation lives in `contextvars`). Read JSON sidecars with `utils.read_json_or_empty` and write with `utils.atomic_json_write`.
- Storage paths must use `hermes_home` / `hermes_constants.get_hermes_home()`, never a hardcoded `~/.hermes`. Do not assume `os.getcwd()` is the workspace; use `agent.runtime_cwd.resolve_agent_cwd()` if needed.
- Cloud providers should document what parts of `messages` leave the device.
- Oversized prefetch: results are returned in full by default (ceiling 10x `hooks.output_spill.max_chars`, at least 100,000 characters); opt in to spilling with `memory.prefetch_spill_enabled: true`.
- Pre-compress checkpoints (API v2): set `pre_compress_checkpoint_api_version = 2` and implement `on_pre_compress(self, messages, *, require_checkpoint=False)`; raise on failure. With `compression.checkpoint_required: true` compression fails closed (`BLOCKED_MISSING_PREREQUISITE`) unless a v2 provider completed its checkpoint. v2 providers receive only user/assistant text rows; checkpoints must be idempotent. No bundled provider advertises v2, so enabling the gate without one blocks every compression attempt.
- CLI commands: add `cli.py` with `register_cli(subparser)`; commands appear under `hermes <provider-name>` only while the provider is active. Reference: Honcho plugin `cli.py`.
- Providers may expose read-only skills with `ctx.register_skill(name, path, description)`, loaded as `<entry-point-name>:<skill>` only while active.
- Keep setup wizard schema minimal (only must-configure fields); `config_schema.py` drives the Desktop config panel.
- `$HERMES_HOME/plugins/**` survives ordinary Hermes updates including managed-venv rebuilds (excluding explicit plugin update/removal flows); sidecar wrappers with no dependency surface never join the pm dependency union.
- Testing: `MemoryManager().add_provider(p)`, `initialize_all(session_id=..., platform="cli")`, `handle_tool_call`, `sync_all`, `on_session_end`, `shutdown_all`; see `tests/agent/test_memory_provider.py`.
- Source: https://hermes-agent.nousresearch.com/docs/developer-guide/memory-provider-plugin (pinned to v0.22.2)

## Related

- [Context Engine Plugins](./context-engine-plugin.md)
- [Model Provider Plugins](./model-provider-plugin.md)
- [Build a Hermes Plugin](./plugins.md)
