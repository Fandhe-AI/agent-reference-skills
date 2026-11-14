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
| `on_profile_created(profile_name, hermes_home)` | A profile selecting your provider was created (a clone carries `memory.provider`), from the CLI, dashboard or Desktop | Per-profile state: a peer, a host entry |
| `on_profile_renamed(old_name, new_name, hermes_home)` | That profile was renamed (`hermes_home` is the new directory) | Re-key state stored under the old name |
| `post_setup(hermes_home, config)` / `get_status_config()` | After wizard / `hermes memory status` | Interactive follow-up, status |

`initialize()` keyword context: `hermes_home`, `platform` (`cli`, `gui`, `acp`, `telegram`, ...), `session_title`, `session_title_source` (`derived` / `llm` / `user`), `cwd`, `gateway_session_key`, `user_id`, `user_id_alt`, `user_name`, `chat_id`, `agent_identity`, `resumed` (`True` when an earlier turn of this session id ran: `--resume`, a gateway chat after a restart, a reopened Desktop/TUI session, a `/branch` child with copied history; `False` for a new session id such as a subagent, cron run or fresh chat; a mid-process `/resume` arrives through `on_session_switch()`), `message_count` (messages already stored for this session id; on TUI/Desktop it can include the prompt being submitted, so a fresh chat may report `1` with `resumed` `False`), `agent_workspace`, `agent_context` (`cron`, `subagent`, or `primary`; skip automatic writes for non-primary). Accept `**kwargs`; read optional keys with `kwargs.get(...)` because older Hermes omits `resumed` / `message_count`.

`on_turn_start(turn_number, message, **kwargs)` receives `model` (the turn's primary model id; `""` when unset, a preset name under mixture-of-agents), the author (`author_id`, `author_name`, `author_is_bot`) and `previous_message` (the text of the person's last message before this turn from the transcript Hermes holds; `""` on a first turn or when that message was image-only; known runtime rows such as continue nudges, task-list snapshots, background-process notices, compaction summaries and mid-turn `/steer` messages are skipped, a gateway timestamp prefix is removed, and it is secret-scrubbed like `message`; best-effort; older Hermes omits it). Declare only the keywords you need; the manager passes a provider only the ones its signature accepts.

Config schema field keys: `key`, `description`, `secret` (with `env_var`, written to `.env`), `required`, `default`, `choices`, `url`.

## Notes

- Discovery only enumerates; nothing is imported until `memory.provider` names it. Entry-point discovery does not install packages; on PM-managed installs ship a directory provider with declared Python dependencies (`pyproject.toml`, `python_dependencies`).
- Only one external memory provider can be active; a second is rejected with a warning.
- `sync_turn()` must be non-blocking. Spawn work with `agent.memory_provider.spawn_context_thread(_sync, name=...)`, never a bare `threading.Thread` (profile isolation lives in `contextvars`). Read JSON sidecars with `utils.read_json_or_empty` and write with `utils.atomic_json_write`.
- Storage paths must use the `hermes_home` kwarg from `initialize()` (v0.23.1 example binds `Path(kwargs["hermes_home"]) / "my-provider"` on the instance; v0.22.2 showed `hermes_constants.get_hermes_home()`), never a hardcoded `~/.hermes`. Do not assume `os.getcwd()` is the workspace; use `agent.runtime_cwd.resolve_agent_cwd()` if needed.
- Cloud providers should document what parts of `messages` leave the device.
- Oversized prefetch: results are returned in full by default (ceiling 10x `hooks.output_spill.max_chars`, at least 100,000 characters); opt in to spilling with `memory.prefetch_spill_enabled: true`.
- Pre-compress checkpoints (API v2): set `pre_compress_checkpoint_api_version = 2` and implement `on_pre_compress(self, messages, *, require_checkpoint=False)`; raise on failure. With `compression.checkpoint_required: true` compression fails closed (`BLOCKED_MISSING_PREREQUISITE`) unless a v2 provider completed its checkpoint. v2 providers receive only user/assistant text rows; checkpoints must be idempotent. No bundled provider advertises v2, so enabling the gate without one blocks every compression attempt.
- CLI commands: add `cli.py` with `register_cli(subparser)`; commands appear under `hermes <provider-name>` only while the provider is active. Reference: Honcho plugin `cli.py`.
- Providers may expose read-only skills with `ctx.register_skill(name, path, description)`, loaded as `<entry-point-name>:<skill>` only while active.
- Keep setup wizard schema minimal (only must-configure fields); `config_schema.py` drives the Desktop config panel.
- `$HERMES_HOME/plugins/**` survives ordinary Hermes updates including managed-venv rebuilds (excluding explicit plugin update/removal flows); sidecar wrappers with no dependency surface never join the pm dependency union.
- Testing: `MemoryManager().add_provider(p)`, `initialize_all(session_id=..., platform="cli")`, `handle_tool_call`, `sync_all`, `on_session_end`, `shutdown_all`; see `tests/agent/test_memory_provider.py`.
- The two profile hooks (`on_profile_created` / `on_profile_renamed`) run on an uninitialized instance with that profile's home and its own secrets bound (its `.env` plus configured secret sources; a missing key reads as unset, the caller's environment is never used). An exception (`SystemExit` included) is logged and never fails the create or rename. They run inside the create/rename request on every surface, so do network work on a background thread; under `plugins.isolation: host`, a plugin host started only for the hook is stopped when it returns.
- Checkpoint gate coverage (v0.23.1): the gate binds every compaction authority the host runs; the proactive tool-result prune (`compression.proactive_prune_tokens`, off by default) is suppressed at its call site; a plugin context engine's `compress()` is covered (the host calls `on_pre_compress()` before it). Not covered: a plugin context engine that removes or rewrites host-transcript messages outside `compress()` (e.g. from `on_turn_complete()`); the host cannot checkpoint that path and does not refuse such an engine yet.
- Forks under an armed gate: delegated subagents, the curator pass, the batch runner and the Feishu comment responder run a second agent that stays provider-less with the gate off; with `checkpoint_required` armed such a fork loads the configured provider, initialized with `agent_context="subagent"` (`platform`, plus `parent_session_id` where there is a parent, tells the shapes apart); the detached review and `/btw` forks persist nothing and are exempt. One `initialize()` per fork; fork transcripts reach the archive through `on_pre_compress()`. For `agent_context="subagent"` the host keeps off `prefetch()` / `queue_prefetch()`, `sync_turn()`, `on_turn_start()`, `on_session_end()` and `on_delegation()`, while `initialize()`, `on_session_switch()` and `on_pre_compress()` still run, so a checkpoint provider must save on `on_pre_compress()` regardless of how it scopes non-primary writes. The fork's prompt stays as with `skip_memory=True` (no MEMORY.md/USER.md) unless the fork requests the `memory` toolset.
- Source: https://hermes-agent.nousresearch.com/docs/developer-guide/memory-provider-plugin (pinned to v0.23.1)

### Provider-owned storage (`storage=STORAGE_PROVIDER`)

`config_schema.py` defaults to `storage=STORAGE_FLAT_JSON`: core reads and writes `$HERMES_HOME/<name>/config.json` for the panel. A provider whose config has its own layout declares `storage=STORAGE_PROVIDER` and implements two methods; core never opens the file:

```python
def read_config_fields(self, hermes_home: str) -> dict:
    # Stored natives by field key (absent = unset), plus what a blank field resolves to.
    return {"values": {"workspace": "ws1"}, "placeholders": {"aiPeer": "hermes_coder"}}

def write_config_fields(self, values: dict, hermes_home: str) -> None:
    # Only submitted keys; None clears one. Non-blank secrets arrive here too; core saves them to
    # .env under env_key only after this returns. Raise ValueError (a subclass such as
    # json.JSONDecodeError counts) to refuse the save (shown as a 400), e.g. when your file does not parse.
    ...
```

Declaring `storage=STORAGE_PROVIDER` without `write_config_fields` makes a save return 501; a provider that fails to load returns 503; an unknown `storage` value shows no panel and refuses saves.

### Multiplexed gateways

One gateway process can serve several profiles at once, with turns running concurrently on different threads. Each agent gets its own `MemoryManager` and provider instance, initialized for one profile. Profile-scoped storage should bind from `initialize()`:

```python
# CORRECT — profile-scoped, bound on the instance
def initialize(self, session_id, **kwargs):
    self._data_dir = Path(kwargs["hermes_home"]) / "my-provider"

# WRONG — shared across all profiles
data_dir = Path("~/.hermes/my-provider").expanduser()
```

- Return a new instance per load: `register(ctx)` should construct the provider (`ctx.register_memory_provider(MyProvider())`), not hand back a module-level singleton. The manager refuses to initialize an instance another profile's manager already bound and logs `memory_provider_instance_shared`.
- Derive every store, path, client, bank and tenant from the `hermes_home` keyword (and secrets read through `get_secret()` during `initialize`), kept on `self`; keep nothing profile-specific at module or class level and never rebind per call.
- The manager runs tool calls and every lifecycle hook only from the profile the instance was initialized for; on a multiplexed gateway a caller that names no profile is refused and logged as `memory_caller_profile_unresolved` in the profile's `errors.log` (`hermes logs errors`) and `gateway.log`. Background hooks run under the owning profile's `HERMES_HOME`. `handle_tool_call(..., **kwargs)` also receives `hermes_home`, `agent_identity` and `caller_gsk` (they name the profile the instance is already bound to; assert on them, do not rebind from them). Hermes cannot verify a provider's internals: a process-wide binding still mixes profiles' memories.

## Related

- [Context Engine Plugins](./context-engine-plugin.md)
- [Model Provider Plugins](./model-provider-plugin.md)
- [Build a Hermes Plugin](./plugins.md)
