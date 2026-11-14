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
| Delegation strategy (pick a profile or a named model per subagent) | Delegation Provider Plugins (`delegation-provider-plugin` page) — `ctx.register_delegation_provider()` |
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
| `config_keys` | list | Dotted paths in Hermes' own config sections your code reads (e.g. `memory.retaindb`); each path covers itself and everything below it, so `hermes config get/set` recognizes those keys (only while the plugin is active). At least two segments deep; paths Hermes already defines are ignored. Settings for your plugin alone belong in `config_schema`. Portable `plugin.json` packages put it under `extensions."com.nousresearch.hermes".config_keys` |
| `requires_auth` | list of str | Providers whose sign-in is used through Hermes (today: `openai-codex`) |
| `oauth` | list of mappings | OAuth clients the plugin uses through Hermes: `id`, `authorize_url`, `token_url`, `scopes`, `client_id_env`, optional `client_secret_env`, `hosts`, optional `authorize_params`. Signed in with `hermes auth add <plugin>:<id>`, used through `credentialed_provider_request` |
| `requires_env` | list | Env var names or `{name, description, url, secret}`; plugin disabled if missing; prompted at install |
| `capabilities` | list | Privileged surfaces requested: `tools.override`, `llm.provider_override`, `llm.model_override`, `llm.agent_id_override`, `llm.profile_override`, `llm.task_override`, `llm.side_question` (ask the session's own agent after a turn, see Plugin LLM Access), `gateway.platform_actions` |

Hooks (all callbacks should accept `**kwargs`):

| Hook | Fires when | Callback arguments | Returns |
|------|-----------|--------------------|---------|
| `pre_tool_call` | Before any tool executes | `tool_name, args, task_id` | optional `{"action": "block", "message": ...}` (veto) / `{"action": "approve", "message": ..., "rule_key": ...}` (escalate to the human-approval gate) / `{"action": "modify", "args": {...}}` (shallow-merged into the tool arguments); a valid `block` wins over `approve` |
| `post_tool_call` | After any tool returns | `tool_name, args, result, task_id, duration_ms` | ignored |
| `pre_llm_call` | Once per turn before the tool loop | `session_id, user_message, conversation_history, is_first_turn, model, platform` | context injection (`{"context": str}` or str), or `{"action": "block", "message": ...}` to veto the turn before it reaches the model |
| `post_llm_call` | Once per successful turn after the loop | `session_id, user_message, assistant_response, conversation_history, model, platform` | ignored |
| `pre_api_request` / `post_api_request` / `api_request_error` | Around each raw provider API request | model, provider, base_url, api_mode, usage, request/response (sanitized) etc. | ignored |
| `pre_auxiliary_call` / `post_auxiliary_call` | Around each auxiliary LLM call attempt | `aux_task` plus API request fields | ignored |
| `on_session_start` | New session (first turn) | `session_id, model, platform` | ignored |
| `on_session_end` | End of every `run_conversation` + CLI exit | `session_id, completed, interrupted, model, platform` | ignored |
| `on_session_finalize` | Session teardown | `session_id, platform` | ignored |
| `on_session_reset` | Gateway `/new`, `/reset` | `session_id, platform` | ignored |
| `on_session_delete` | A session delete or deliberate archive commits (every surface, sweeps, prune) | `session_id: str, reason: str, profile: str \| None`, optional `deleted_ids: list[str]`, `sessions_dir: str` | ignored |
| `post_compaction` | A compaction committed (any path: auto, `/compress`, gateway, Codex, micro, prune) | `session_id: str, old_session_id: str, kind: str, reason: str, before_tokens: int \| None, after_tokens: int \| None, messages_removed: int \| None` | ignored |
| `post_curator_run` | A curator pass wrote its report directory | `run_dir: str, run_json_path: str, report_md_path: str, dry_run: bool` | ignored |
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
| `register_hook(name, fn, hold_stream=False)` | Subscribe to lifecycle events; `hold_stream=True` on `transform_llm_output` holds streaming so the user sees only your rewritten final reply |
| `register_middleware(kind, fn)` | Rewrite/wrap requests and executions |
| `register_command(name, handler, description="", args_hint="")` | In-session slash command (CLI and gateway); handler gets raw args string plus any calling-session keywords it declares (`session_id`, `session_key`, `platform`, `source`), may be async; built-in names are rejected |
| `ask_choice(question, choices)` | From a sync slash-command handler: ask the invoking user to pick one option; blocks, returns the picked `value` or `None` (cancel, non-choice text, `agent.clarify_timeout`, or nothing can ask: hook, cron, async handler) |
| `register_session_env(names, resolver)` | Per-session env vars for local terminal commands; `resolver(session_id)` returns `{name: str \| None}` for the declared names on each spawn |
| `register_rpc(name, handler)` / `emit_to_session(session_id, event, payload=None)` | Serve `plugin.<plugin_id>.<name>` JSON-RPC methods to your own frontend and push `plugin.<plugin_id>.<event>` frames to one session's viewers |
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

- Adapted from the official docs: the `ask_choice` example registers `delegate-mode` instead of the official `delegation`, because `/delegation` is a built-in command and plugins cannot register built-in names.
- Adapted from the official docs: the calling-session context example registers `callerinfo` instead of the official `whoami`, because `/whoami` is a built-in command and plugins cannot register built-in names.
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
- `pre_tool_call` return contract (block / approve / modify, precedence) is documented in full at https://hermes-agent.nousresearch.com/docs/user-guide/features/hooks#pre_tool_call.
- Portable packages: skills are named `<plugin-name>:<skill>` (e.g. `blender:blender`), the same form as a native plugin's; if two loaded plugins would register the same qualified name, the second one's skill is skipped with a warning naming both. The data directory keeps a name derived from the plugin key (`plugin-data/agent-plugin-<slug>-<hash>`). To pass a user's variable to a stdio MCP server declare `"NAME": "${NAME}"` in `mcp.json` env (value from the user's shell or profile `.env`; unset or empty means the entry is dropped, the server never sees a literal `${NAME}`). With `trust: "untrusted"`, every non-`readOnlyHint: true` call asks first (Once, Session or Always, per tool) and fails closed where nobody can answer. A same-name `config.yaml` server replaces the package's entry including trust but keeps the package's declared costs and spend limit unless it sets its own. An unknown server-entry key (one a newer release added) is ignored with a warning and the package still installs; releases before this rule reject the package, so declare a new key together with a catalog `requires_hermes` floor (a `plugin.json` package has no `requires_hermes` field; the catalog entry's is its only floor). An explicit per-server MCP call budget above the shared concurrent-batch deadline becomes a sequential barrier in the outer tool executor.
- A `pyproject.toml` that installs nothing (`dependencies = []`, no `[build-system]`, extras or dependency groups) counts as no declaration: no dependency question and the dependency environment is left as is. The generated PM workspace is solved only for the installing interpreter's platform, so a dependency with no wheels for another platform does not block the plugin.
- Tool handler kwargs: Hermes also injects `conversation_id`. Key per-conversation state on `conversation_id` (the id of the conversation's first session; unchanged by a rotating compression `compression.in_place: false`, which replaces `session_id`); `/new` and `/branch` start a new conversation; a delegated subagent's calls carry its own `session_id` and its delegator's `conversation_id`; both are empty when the call has no session (e.g. a tool call from inside an `execute_code` script).
- `pre_llm_call` return contract (v0.23.1): besides context injection, `{"action": "block", "message": "..."}` vetoes the turn before any inference request: the message is shown and saved as the assistant reply, the turn makes zero model calls, and the result carries `turn_exit_reason: "blocked_by_plugin_pre_llm_call"`. The first block wins; a block without a message is ignored. The blocked prompt is stored as `[Message withheld: a pre_llm_call policy hook blocked it.]` (what later turns, compaction summaries, `session_search`, external memory providers and the background memory review see; the original is kept only as display metadata). A callback that raises or runs past `plugins.hook_callback_timeout` (30 s default) is skipped and the turn proceeds, so a policy hook should catch its own errors and return a block when it cannot decide.
- Overriding a built-in tool: the v0.23.1 example overrides `web_search` (toolset `plugin_my_search`, `override=True`); v0.22.2 used `browser_navigate`.
- Slash command handlers run in the gateway process that owns the session, also for the classic `hermes chat` CLI: return the text to show (`print()` goes to the gateway's stdout), take the working directory from `agent.runtime_cwd.resolve_agent_cwd()` not `os.getcwd()`, read session identity with `from gateway.session_context import get_session_env` (`HERMES_SESSION_PLATFORM`, `HERMES_SESSION_CHAT_ID`, ...) not `os.environ`, and for "who asked this turn" read `HERMES_SESSION_ACTOR_ID` / `HERMES_SESSION_ACTOR_NAME` (empty when the turn has no single actor; `HERMES_SESSION_USER_ID` is the session route and is empty in a shared chat such as Telegram observe mode). `source` is transport identity, not an authorization grant: authorize from stable ids and fail closed on `source=None`. Handler exceptions propagate; Hermes never retries with fewer arguments.
- Plugin RPC (`ctx.register_rpc`, `ctx.emit_to_session`): names are forced into `plugin.<plugin_id>.<name>` (a plugin id not matching `[a-z0-9_-]{1,64}`, such as a category plugin `image_gen/x`, raises `ValueError`); the handler runs off the gateway loop in the owning profile's scope (may be `async def`), must return JSON-encodable data, and an exception answers error `4001` reason `plugin_rpc_failed`; the call holds its client's request lane, so start long work in a thread and report through `emit_to_session`. Session events go only to that session's viewers (a reconnecting client replays them); returns `True` when a live viewer took the frame. `hermes_cli.plugin_events.emit_plugin_session_event(plugin_id, session_id, event, payload)` is the same call for code without `ctx`. Under `plugins.isolation: host` the emit calls are forwarded to the gateway process and the helper returns `False` when `plugin_id` is not that plugin's own. Works on a gateway that owns sessions (the shared `hermes gateway run` gateway); elsewhere `-32601` / `False`. Detect via `plugin-rpc-v1` in `runtime.describe`'s `capabilities`. A plugin method has the same gate as a plugin slash command (`session:control` capability and per-session authorization) and nothing per method: validate params and expose no more than the plugin's own data.
- Portable `plugin.json` `config_schema` is declared under `extensions."com.nousresearch.hermes".config_schema`; a secret whose `env` names a variable the package's `mcp.json` passes through reaches the MCP server right away (Hermes reconnects the plugin's servers whose resolved launch inputs changed after a save). Every save broadcasts `plugin.<id>.settings.changed` (payload `{ written: [...keys] }`; a secret-only save sends an empty list); read values from `plugin_api.py` with `load_config_readonly()` from `hermes_cli.config`.
- Source: https://hermes-agent.nousresearch.com/docs/developer-guide/plugins (pinned to v0.23.1; served from `developer-guide/plugins/index.md`)

### Use your own OAuth client (new since v0.22.2)

A plugin calling a third-party API with the user's own OAuth client (e.g. a Google Cloud "Desktop app" client) does not run the consent flow or store/refresh the token; declare the client and Hermes owns the grant:

```yaml
name: gemini-voice
requires_env:
  - name: GEMINI_VOICE_CLIENT_ID
  - name: GEMINI_VOICE_CLIENT_SECRET
    secret: true
oauth:
  - id: google
    authorize_url: https://accounts.google.com/o/oauth2/v2/auth
    token_url: https://oauth2.googleapis.com/token
    scopes:
      - https://www.googleapis.com/auth/calendar.events.owned
      - https://www.googleapis.com/auth/documents
    client_id_env: GEMINI_VOICE_CLIENT_ID
    client_secret_env: GEMINI_VOICE_CLIENT_SECRET  # optional: a public PKCE client has none
    hosts: [www.googleapis.com, docs.googleapis.com]
    authorize_params: {access_type: offline, prompt: consent}  # Google issues a refresh token only with these
```

The user signs in once from a terminal with `hermes auth add gemini-voice:google` (plugin key, a colon, the entry's `id`): PKCE with a loopback redirect on `127.0.0.1`. `hermes auth status|refresh|logout gemini-voice:google` show, refresh and remove the grant; it lives in the active profile's `auth.json` and is refreshed on use once less than two minutes remain; a sign-in is never started under the gateway or cron.

```python
from hermes_cli.auth_constants import AuthError
from hermes_cli.plugin_provider_requests import ProviderNotSignedIn, credentialed_provider_request

def create_document(title: str) -> dict:
    try:
        resp = credentialed_provider_request(
            "google", "POST", "https://docs.googleapis.com/v1/documents", json={"title": title}, timeout=20)
    except ProviderNotSignedIn as exc:
        return {"ok": False, "error": str(exc)}  # names `hermes auth add gemini-voice:google`
    except AuthError as exc:
        return {"ok": False, "error": f"{exc.code}: {exc}"}
    return {"ok": resp.status < 300, "status": resp.status, "body": resp.json()}
```

Rules: `authorize_url`, `token_url` and every `hosts` entry are `https` only (no loopback exception); the bearer goes only to `https://<host>` (port 443) for the entry's `hosts`, matched exactly, else `PermissionError` before a request; `client_id_env` / `client_secret_env` name the plugin's own variables (a variable Hermes itself uses is refused); the grant is stored under the calling plugin's key and follows the declaration (a changed token URL, hosts, scopes or client variables gives `ProviderNotSignedIn` until re-sign-in; a catalog re-pin changing the authorize/token host, hosts or scopes asks before updating). `AuthError` codes: `oauth_client_id_missing`, `oauth_client_secret_missing`, `invalid_client`, `unauthorized_client`, `invalid_scope`, `oauth_refresh_failed`; a revoked grant (`invalid_grant`) is retired. `hermes auth add` refuses to run from the gateway, cron or an agent session; `hermes plugins remove` drops the grants; `hermes auth logout <plugin>:<id>` still works after the plugin is gone. Consent and visibility, not a sandbox.

### MCP tool costs, spend limit and timeout in portable packages (new since v0.22.2)

```json
{
  "extensions": {
    "com.nousresearch.hermes": {
      "servers": {
        "renders": {
          "trust": "untrusted",
          "costs": {
            "create_image": 20,
            "animate": { "credits": [5, 20], "note": "per animation" }
          },
          "spend_limit": 100,
          "cost_unit": "credits"
        }
      }
    }
  }
}
```

Keys of `costs` are MCP tool names as the server lists them; a cost is a non-negative number, a `[min, max]` range, or an object with `credits` and a short `note`. `spend_limit` is optional (`0` or absent = no limit), `cost_unit` defaults to `credits`; a call that would take the chat past `spend_limit` asks first even for a trusted server. They map to native `tool_costs`, `spend_limit`, `cost_unit`. A long-running server can declare a Hermes-specific tool-call `timeout` (seconds, positive finite number within the platform's thread-wait limit) under `servers.<name>.timeout`; it extends the wait budget, not the cancellation or permission policy.

### Rewrite the reply before the user sees it: `hold_stream=True`

```python
def register(ctx):
    ctx.register_hook("transform_llm_output", redact, hold_stream=True)
```

Every session in the profile that loads the plugin then stops streaming its replies (typing/thinking indicator, then only your rewritten final); commentary between tool calls is dropped for those turns; if the hook raises or times out the user gets a short "reply withheld" notice instead of the original. Leave the flag off for cosmetic transforms.

### Per-session environment variables: `ctx.register_session_env`

```python
def pane_env(session_id):
    pane = find_pane_showing(session_id)  # your plugin's own lookup
    if pane is None:
        return {}  # the commands keep the gateway's own values
    return {"MY_PANE": pane.id, "MY_PANE_SOCKET": pane.socket or None}

def register(ctx):
    ctx.register_session_env(["MY_PANE", "MY_PANE_SOCKET"], pane_env)
```

`resolver(session_id)` runs each time Hermes starts a local process for a session (foreground/background `terminal` command, `terminal()` from `execute_code`, other subprocesses that get `HERMES_SESSION_*`). Return declared names mapped to strings; `None` removes the name; omitted names keep the gateway's value; undeclared names are ignored. Declared names are never saved in the shared shell snapshot. One plugin per name per profile (`ValueError` naming the other plugin otherwise). Names must be valid env var names; `HERMES_*` refused; credential names the subprocess scrub removes are removed from your values. A raising resolver is logged and contributes nothing; keep it fast. Local terminal backend only (Docker, SSH, Modal and other sandboxes do not receive them).

### Asking the user to pick: `ctx.ask_choice`

Adapted (not in the official docs): the official example registers `delegation`, a built-in command name; it is renamed `delegate-mode` (including the usage string).

```python
_MODES = [
    {"value": "default", "label": "Default", "description": "delegation.model / parent model"},
    {"value": "model_map", "label": "Model routes", "description": "per-task model map"},
    {"value": "profile_routes", "label": "Profiles", "description": "delegate to other profiles"},
]

def register(ctx):
    def delegation(raw_args: str) -> str:
        mode = raw_args.strip() or ctx.ask_choice("Delegation mode", _MODES)
        if mode not in {m["value"] for m in _MODES}:
            return "Usage: /delegate-mode default|model_map|profile_routes"
        ctx.set_config("mode", mode)
        return f"Delegation mode: {mode}"

    ctx.register_command("delegate-mode", delegation, description="Switch the delegation mode",
                         args_hint="[mode]")
```

Telegram, Discord and Slack show a card with one button per choice (plus "Other"); other messaging platforms a numbered list; classic CLI, Ink TUI and Desktop the clarify picker. A choice is a string or `{"value", "label", "description"}`; a typed value or label also picks it. Returns `None` on cancel, non-choice text, clarify timeout, or when nothing can ask.

### Calling-session context for slash commands

Adapted (not in the official docs): the official example registers `whoami`, which is already a built-in slash command and so would be rejected; the command is renamed `callerinfo` here.

```python
def _handle_callerinfo(raw_args: str, *, session_id: str = "", platform: str = "", source=None) -> str:
    user = source.user_id if source is not None else "local user"
    return f"{user} on {platform}, session {session_id or '(none yet)'}"

def register(ctx):
    ctx.register_command("callerinfo", handler=_handle_callerinfo, description="Show the calling session")
```

Keywords `session_id` (empty when the chat has no session yet), `session_key` (routing key), `platform` (`telegram`, `discord`, ..., `local`, `cli`, `tui`, `desktop`) and `source` (the adapter-derived `gateway.session.SessionSource` when the gateway dispatched the command, else `None`) are passed only if the handler declares them (or `**kwargs`); a handler declaring none keeps the one-argument call.

### Plugin RPC example (frontend to Python half)

```python
def register(ctx):
    def pane_state(params, *, session_id, **kwargs):
        # session_id is the session the call named (None for a sessionless call), already authorized.
        state = load_state(session_id)
        ctx.emit_to_session(session_id, "pane.changed", {"rows": len(state)})
        return {"rows": state}

    ctx.register_rpc("pane.state", pane_state)
```

```json
{"jsonrpc": "2.0", "id": 7, "method": "plugin.my-plugin.pane.state", "params": {"session_id": "local-…", "page": 2}}
```

### Read the skill catalog (public helpers)

| Import | What it gives you |
|---|---|
| `tools.skills_tool.find_all_skills(*, skip_disabled=False)` | Loadable skills as `{"name", "description", "category"}` dicts (the cached, first-wins, platform/environment-gated walk `skills_list` uses); `name` is what `skill_view()` accepts |
| `tools.skills_tool.sort_skills(skills)` | The one listing order (category, then name) |
| `tools.skills_tool.skill_search_dirs()` | `(roots, active_dir)`: `(tier, dir)` roots in precedence order and the live profile's skills dir |
| `tools.skills_tool.skill_lookup_path_error(name)` | Error string if `name` is absolute or contains `..`, else `None`; check before any lookup |
| `tools.skills_tool.locate_skill(name, local_category_name, roots)` | `(error_json, skill_dir, skill_md)` for one name over `roots` (tier precedence, same-tier collision refusal, project-skill quarantine gate); pass `None` for `local_category_name` unless you need an extra relative path |
| `tools.skills_sync.dir_hash(directory)` | The package hash the bundled-skill sync stores |
| `tools.skill_usage.read_skill_name(skill_md, fallback)` | The frontmatter `name:` of a `SKILL.md`, else `fallback` |

```python
from tools.skills_tool import find_all_skills, locate_skill, skill_lookup_path_error, skill_search_dirs, sort_skills

def list_skills():
    return sort_skills(find_all_skills())

def open_skill(name):
    if err := skill_lookup_path_error(name):
        return err
    roots, _active = skill_search_dirs()
    error, _skill_dir, skill_md = locate_skill(name, None, roots)
    return error or skill_md.read_text(encoding="utf-8-sig", errors="replace")
```

Plugin-registered skills (`ctx.register_skill`) are not on disk under these roots; `find_all_skills()` returns the on-disk catalog only.

## Related

- [Application declarations](./plugins-application-declarations.md)
- [Submitting to the Plugin Catalog](./plugins-catalog-submission.md)
- [Plugin LLM Access](./plugin-llm-access.md)
- [Observer Hooks](./observer-hooks.md)
