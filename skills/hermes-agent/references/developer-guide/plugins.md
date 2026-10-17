# Build a Hermes Plugin

Step-by-step guide to building a Hermes plugin with tools, hooks, slash commands, data files and bundled skills. A native plugin is a directory with `plugin.yaml` plus `__init__.py` exposing `register(ctx)`.

## Signature / Usage

```bash
mkdir -p ~/.hermes/plugins/calculator
cd ~/.hermes/plugins/calculator
```

```yaml
# plugin.yaml
name: calculator
version: 1.0.0
description: Math calculator — evaluate expressions and convert units
provides_tools:
  - calculate
  - unit_convert
provides_hooks:
  - post_tool_call
```

```python
# __init__.py
from . import schemas, tools

def _on_post_tool_call(tool_name, args, result, task_id, **kwargs):
    """Hook: runs after every tool call (not just ours)."""

def register(ctx):
    ctx.register_tool(name="calculate",    toolset="calculator",
                      schema=schemas.CALCULATE,    handler=tools.calculate)
    ctx.register_tool(name="unit_convert", toolset="calculator",
                      schema=schemas.UNIT_CONVERT, handler=tools.unit_convert)
    ctx.register_hook("post_tool_call", _on_post_tool_call)
```

Tool schema (what the LLM reads) and handler rules:

```python
CALCULATE = {
    "name": "calculate",
    "description": "Evaluate a mathematical expression and return the result. ...",
    "parameters": {
        "type": "object",
        "properties": {"expression": {"type": "string", "description": "Math expression to evaluate"}},
        "required": ["expression"],
    },
}

def calculate(args: dict, **kwargs) -> str:
    # 1. receive args  2. do the work  3. return a JSON string ALWAYS  4. accept **kwargs
    return json.dumps({"result": 42})
```

Validate and test:

```bash
hermes plugins doctor . --ci          # same discovery / manifest / register(ctx) path Hermes uses
hermes plugins validate /path/to/your-plugin --install-deps   # catalog CI check
HERMES_PLUGINS_DEBUG=1 hermes plugins list                    # verbose discovery logs
```

## Options / Props

Pluggable interface map (which guide to read):

| To add | Read |
|--------|------|
| Tools, hooks, slash commands, skills, CLI subcommands | This page |
| Native desktop app extension | [desktop-plugin-sdk.md](./desktop-plugin-sdk.md) |
| LLM / inference backend | [model-provider-plugin.md](./model-provider-plugin.md) |
| Gateway channel | [adding-platform-adapters.md](./adding-platform-adapters.md) |
| Memory backend | [memory-provider-plugin.md](./memory-provider-plugin.md) |
| Context-compression engine | [context-engine-plugin.md](./context-engine-plugin.md) |
| Image / video generation backend | [image-gen-provider-plugin.md](./image-gen-provider-plugin.md) / [video-gen-provider-plugin.md](./video-gen-provider-plugin.md) |
| Web search / extract backend | [web-search-provider-plugin.md](./web-search-provider-plugin.md) |
| Cloud browser backend | [browser-provider-plugin.md](./browser-provider-plugin.md) |
| Secret-manager backend | [secret-source-plugin.md](./secret-source-plugin.md) |
| Computer-use driver | `ctx.register_computer_use_provider()` (below) |
| TTS backend | config-driven, `tts.providers.<name>.type: command` |
| STT backend | set `HERMES_LOCAL_STT_COMMAND` to an argv-tokenized template |
| External tools via MCP | `mcp_servers.<name>` in `config.yaml` |
| Gateway event hooks | `~/.hermes/hooks/<name>/HOOK.yaml` + `handler.py` |
| Shell hooks | `hooks:` in `config.yaml` |
| Extra skill sources | `hermes skills tap add <repo>` |
| A first-class core inference provider (not a plugin) | [adding-providers.md](./adding-providers.md) |

Manifest v2 fields (all optional; no `manifest_version` = v1, supported forever; unknown fields ignored with a warning):

| Field | Type | Meaning |
|-------|------|---------|
| `manifest_version` | int | Manifest file-format version. Absent = 1. Current max: 2 |
| `api_version` | int | Runtime plugin API generation targeted; separate axis from `manifest_version` |
| `requires_plugins` | list | `- id: other-plugin` with optional `version_range: ">=1.0,<2"`. Advisory: missing dependency only warns; probe with `ctx.has_plugin()`. Load order honors edges (B's `register()` before A's) |
| `python_dependencies` | list of str | Python requirements; install requests consent, enabling admits through PM. Pin upper bounds |
| `python_runtime` | str | `external` — plugin manages its own interpreter/venv (sidecar) |
| `config_schema` | mapping | Keys under `plugins.entries.<id>.settings`; types `str`, `int`, `float`, `bool`, `list`, `dict`, `secret`; drives the Desktop settings form (`choices`, `env`, `label`, `description`, `default`, `required`) |
| `license` / `homepage` / `tags` | str / str / list | Metadata |
| `provides_locales` | list | Language pack ids or `{id, endonym, rtl}`; loads `locales/<id>[.tui\|.desktop].yaml` |
| `requires_auth` | list of str | Providers whose sign-in is used through Hermes (today: `openai-codex`) |
| `requires_env` | list | Env var names or `{name, description, url, secret}`; plugin disabled if missing; prompted at install |
| `capabilities` | list | Privileged surfaces requested: `tools.override`, `llm.provider_override`, `llm.model_override`, `llm.agent_id_override`, `llm.profile_override`, `llm.task_override` |

Hooks (all callbacks should accept `**kwargs`):

| Hook | Fires when | Callback arguments | Returns |
|------|-----------|--------------------|---------|
| `pre_tool_call` | Before any tool executes | `tool_name, args, task_id` | optional `{"action": "block"\|"approve", "message": ...}` |
| `post_tool_call` | After any tool returns | `tool_name, args, result, task_id, duration_ms` | ignored |
| `pre_llm_call` | Once per turn before the tool loop | `session_id, user_message, conversation_history, is_first_turn, model, platform` | context injection (`{"context": str}` or str) |
| `post_llm_call` | Once per successful turn after the loop | `session_id, user_message, assistant_response, conversation_history, model, platform` | ignored |
| `pre_api_request` / `post_api_request` / `api_request_error` | Around each raw provider API request | model, provider, base_url, api_mode, usage, request/response (sanitized) etc. | ignored |
| `pre_auxiliary_call` / `post_auxiliary_call` | Around each auxiliary LLM call attempt | `aux_task` plus API request fields | ignored |
| `on_session_start` | New session (first turn) | `session_id, model, platform` | ignored |
| `on_session_end` | End of every `run_conversation` + CLI exit | `session_id, completed, interrupted, model, platform` | ignored |
| `on_session_finalize` | Session teardown | `session_id, platform` | ignored |
| `on_session_reset` | Gateway `/new`, `/reset` | `session_id, platform` | ignored |
| `gateway_platform_event` | Platform-native event normalized at gateway | `platform, event_type, payload` | ignored |
| `kanban_task_claimed` / `kanban_task_completed` / `kanban_task_blocked` | Kanban transitions (after DB commit) | `task_id, board, assignee, run_id, profile_name` (+ `summary` / `reason`) | ignored |

Middleware kinds (`ctx.register_middleware(kind, fn)`, canonical list `VALID_MIDDLEWARE` in `hermes_cli/middleware.py`):

| Kind | Receives | Return contract |
|------|----------|-----------------|
| `tool_request` | `tool_name, args, original_args, ...` | `{"args": {...}}` replaces effective args; `None` = unchanged |
| `llm_request` | `request, original_request, ...` | `{"request": {...}}` replaces provider kwargs |
| `tool_execution` | payload plus `next_call` | wrap execution; call `next_call(payload)` exactly once |
| `llm_execution` | payload plus `next_call` | same, wrapping the provider call |

`ctx` methods mentioned in the guide:

| Method | Purpose |
|--------|---------|
| `register_tool(name, toolset, schema, handler, check_fn=None, override=False)` | Add a tool (`override=True` needs operator grant to replace a built-in) |
| `register_hook(name, fn)` | Subscribe to lifecycle events |
| `register_middleware(kind, fn)` | Rewrite/wrap requests and executions |
| `register_command(name, handler, description="", args_hint="")` | In-session slash command (CLI and gateway); handler gets raw args string, may be async; built-in names are rejected |
| `register_cli_command(name, help, setup_fn, handler_fn)` | `hermes <name>` subcommand tree (argparse) |
| `dispatch_tool(name, args, *, parent_agent=None) -> str` | Call any tool with parent-agent context (approvals, credentials) wired up |
| `register_skill(name, path)` | Bundle a read-only skill; loaded as `skill_view("plugin:skill")` |
| `get_config(key, default=)` / `set_config(key, value)` | Plugin-relative settings under `plugins.entries.<id>.settings` |
| `state.get(key, default=)` / `state.set(key, value)` | Profile-scoped plugin runtime state (10 MiB limit) |
| `has_capability(id)` / `has_plugin(id)` | Probe consent / dependencies |
| `profile_name` | Active profile name |
| `current_cron_execution()` | `CronExecution` (`job_id, job_name, execution_id, source, scheduled_instant, started_at, profile`) or `None` |
| `register_locale(...)` / `register_locale_dir(path)` | Language packs |
| `register_automation_blueprint(key, *, title, description, schedule_template, prompt_template, category="general", slots=(), deliver_default="origin", skills=(), tags=())` | Add a blueprint (key namespaced `<plugin>:<key>`) |
| `register_slack_action_handler(action_id, callback)` | Slack Block Kit actions (`(ack, body, action)`) |
| `register_platform_handler(platform, factory)` | Factory `(native, adapter)` invoked at platform connect; `register_telegram_handler` is an alias for telegram |
| `register_platform(...)` / `register_memory_provider(...)` / `register_context_engine(...)` / `register_image_gen_provider(...)` / `register_computer_use_provider(...)` | Specialized plugin types |

## Notes

- `register()` runs exactly once at startup; if it crashes the plugin is disabled and Hermes continues. Handlers must never raise and must always return a JSON string.
- Plugins are opt-in: `hermes plugins enable <name>`. Layout: `~/.hermes/plugins/<name>/plugin.yaml` (flat) or one category level; deeper is ignored. Portable packages use root `plugin.json`.
- `provides_tools` does not gate loading of user-installed plugins, but it drives `hermes plugins validate` ("declared tools" check), catalog listing and dashboard auth hints.
- Capabilities are consent + audit, not a sandbox. Probe with `ctx.has_capability("tools.override")` and degrade gracefully. Pip-distributed plugins declare them in the `hermes_agent.plugin_capabilities` entry-point group (`"<plugin-id>.<capability-id>"`).
- Portable Agent Plugins v1 packages (`plugin.json`, `skills/*/SKILL.md`, root `mcp.json`) install via `hermes plugins install owner/repository --no-enable`; they are disabled until enabled, run with full trust, and Hermes supports an explicit subset (stdio and Streamable HTTP MCP; legacy `sse` skipped). A `extensions."com.nousresearch.hermes".servers.<name>.trust: "untrusted"` entry gates write-capable MCP calls.
- Compatibility contract: documented `PluginContext` methods are not removed or renamed; hook payloads grow as keyword fields (use `**kwargs`); unknown manifest fields are ignored. Deprecations need a replacement, a once-per-process warning, and at least two minor releases of support. Replacing/wrapping core internals (`AIAgent.<method> = ...`, `setattr` on Hermes modules, `sys.modules`) is unsupported and rejected by catalog validation (`no core override`).
- Sep 2026 module decomposition: old internal import paths were removed after 2026-09-14; a plugin importing them fails with `ImportError`. Use `ctx` and documented ABCs instead of internals.
- Codex sign-in: do not read or refresh `~/.codex/auth.json`. Declare `requires_auth: [openai-codex]` and call `credentialed_provider_request(provider, method, url, *, json=None, headers=None, timeout=30.0)` from `hermes_cli.plugin_provider_requests`; token goes only to `https://chatgpt.com` and `https://api.openai.com`, redirects are never followed, undeclared callers get `PermissionError`, no sign-in raises `ProviderNotSignedIn`.
- Secrets: read declared `requires_env` / `config_schema` secrets with `agent.secret_scope.get_secret(NAME)`; never read `.env` or `auth.json` directly. `secret` config fields never touch `config.yaml`.
- Durable state: never write into the plugin directory (`hermes plugins update` / `remove` delete it). Use `plugins.plugin_storage.plugin_data_dir(name)` / `plugin_db(name)` (`<hermes home>/plugin-data/<name>/`).
- `pre_llm_call` injection appends to the current turn's user message (not the system prompt, to preserve prompt cache); per-hook context is capped at 10,000 characters by default and spilled to `$HERMES_HOME/hook_outputs/<session_id>/`. Multiple plugins' contexts are joined with blank lines in alphabetical plugin order.
- Middleware: `next_call` is single-use; a raising callback is logged and skipped; payloads carry `middleware_schema_version` (`hermes.middleware.v1`).
- Overriding a built-in tool needs `override=True` plus operator grant `plugins.entries.<id>.allow_tool_override: true` (or the `tools.override` capability consent); otherwise `PluginToolOverrideError`.
- Dependency security: Hermes's 3-day `exclude-newer` release-age check covers only Hermes's own dependencies; plugin authors should use upper bounds and their own release quarantine.
- Lazy installs: `from pm import ensure_import` takes a `pyproject.toml` extra name (e.g. `"bedrock"`); the old `LAZY_DEPS` / `FeatureUnavailable` no longer exist. Use `plugins.plugin_utils.lazy_singleton` / `SingletonSlot` for thread-safe lazy singletons.
- Mid-run loading: gateway slash commands, hooks and platform callbacks activate immediately; `tools` and `prompt` sections apply from the next session; `mcp_servers` connect on `mcp.reload` or next session. There is no un-wire.
- Third-party-product plugins ship as standalone repos, not into the core tree. Nix/NixOS is no longer explicitly supported (best-effort). Distribute via pip with the entry-point group `hermes_agent.plugins`.
- Source: developer-guide/plugins (v0.22.2 snapshot).

## Related

- [Application declarations](./plugins-application-declarations.md)
- [Submitting to the Plugin Catalog](./plugins-catalog-submission.md)
- [Plugin LLM Access](./plugin-llm-access.md)
- [Observer Hooks](./observer-hooks.md)
