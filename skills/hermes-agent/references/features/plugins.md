# Plugins

Hermes plugin system for adding custom tools, hooks, slash commands and integrations without modifying core code. Drop a directory with `plugin.yaml` and Python code into `~/.hermes/plugins/`.

## Signature / Usage

```text
~/.hermes/plugins/hello-world/
├── plugin.yaml      # manifest
└── __init__.py      # register(ctx)
```

```yaml
# plugin.yaml
name: hello-world
version: "1.0"
description: A minimal example plugin
provides_tools:
  - hello_world
provides_hooks:
  - post_tool_call
```

```python
import json

def register(ctx):
    schema = {
        "name": "hello_world",
        "description": "Returns a friendly greeting for the given name.",
        "parameters": {
            "type": "object",
            "properties": {"name": {"type": "string", "description": "Name to greet"}},
            "required": ["name"],
        },
    }

    def handle_hello(params, **kwargs):
        del kwargs
        name = params.get("name", "World")
        return json.dumps({"success": True, "greeting": f"Hello, {name}!"})

    ctx.register_tool(name="hello_world", toolset="hello_world", schema=schema, handler=handle_hello)

    def on_tool_call(tool_name, args, result, **kwargs):
        print(f"[hello-world] tool called: {tool_name}")

    ctx.register_hook("post_tool_call", on_tool_call)
```

## What plugins can do (`ctx.*`)

| Capability | API |
|-----------|-----|
| Add tools | `ctx.register_tool(name=, toolset=, schema=, handler=)` |
| Add hooks | `ctx.register_hook("post_tool_call", cb)` |
| Slash commands | `ctx.register_command(name, handler, description)` |
| Dispatch tools | `ctx.dispatch_tool(name, args)` |
| CLI commands | `ctx.register_cli_command(name, help, setup_fn, handler_fn)` |
| Inject messages | `ctx.inject_message(content, role="user", *, session_key=None, origin=None) -> bool` |
| Post and edit a status message | `handle = ctx.post_message(text)`, then `handle.edit(text)` (async: `await ctx.apost_message(text)` / `await handle.aedit(text)`) |
| Working dir / client of the calling session | `ctx.session_cwd()`, `ctx.session_surface()` (`"cli"`, `"tui"`, `"desktop"`, `"acp"` or the messaging platform) |
| Bundle skills | `ctx.register_skill(name, path)` (namespaced `plugin:skill`) |
| Gate on env vars | `requires_env: [API_KEY]` in `plugin.yaml` |
| Distribute via pip | `[project.entry-points."hermes_agent.plugins"]` |
| Gateway platform | `ctx.register_platform(name, label, adapter_factory, check_fn, ...)` |
| Image / video gen backend | `ctx.register_image_gen_provider(p)` / `ctx.register_video_gen_provider(p)` |
| Delegation strategy | `ctx.register_delegation_provider(provider)` (routes each `delegate_task` subagent; selected by `delegation.backend`; lives in `plugins/delegation/<name>/`, `default` = today's routing) |
| Context engine | `ctx.register_context_engine(engine)` |
| Terminal backend | `ctx.register_terminal_environment_provider(p)` |
| Computer-use driver | `ctx.register_computer_use_provider(p)` (select via `computer_use.backend`) |
| Approval prompts | `ctx.register_approval_transport(name, present_fn)` |
| TTS / STT backend | `ctx.register_tts_provider()` / `ctx.register_transcription_provider()` |
| Host-owned LLM call | `ctx.llm.complete(...)` / `ctx.llm.complete_structured(...)` |
| MCP tool call | `ctx.call_mcp(server, tool, arguments=None, timeout=30) -> dict` |
| Platform actions | `await ctx.platform_actions.add_reaction(...)` / `set_thread_title(...)` (Telegram, Discord; capability-gated) |
| Memory backend / model provider | Subclass `MemoryProvider` in `plugins/memory/<name>/`; `register_provider(ProviderProfile(...))` in `plugins/model-providers/<name>/` (separate loaders) |

## Options / Props

```yaml
plugins:
  enabled: [my-tool-plugin, disk-cleanup]
  disabled: [noisy-plugin]        # deny-list, always wins
  clone_timeout_seconds: 300      # clamped to 3600
  hook_callback_timeout: 30       # 0 disables; clamped to 600; timed-out pre_tool_call fails closed
  load_timeout_seconds: 10        # 0 disables; clamped to 600
  scan_on_install: true
  isolation: in_process           # or: host
  host:
    launcher: []
  entries:
    my-plugin:
      allow_gateway_injection: true
      mcp_allowlist: ["knowledge_rag", "github"]
```

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `plugins.enabled` | list | — | Allow-list of plugin names to load |
| `plugins.disabled` | list | — | Deny-list, always wins |
| `plugins.clone_timeout_seconds` | number | `300` | Clamped to 3600 |
| `plugins.hook_callback_timeout` | number | `30` | `0` disables; clamped to 600; timed-out `pre_tool_call` fails closed |
| `plugins.load_timeout_seconds` | number | `10` | `0` disables; clamped to 600 |
| `plugins.scan_on_install` | boolean | `true` | — |
| `plugins.isolation` | string | `in_process` | `in_process` or `host` |
| `plugins.host.launcher` | list | `[]` | — |
| `plugins.entries.<name>.allow_gateway_injection` | boolean | — | Required for `ctx.inject_message` in gateway mode |
| `plugins.entries.<name>.mcp_allowlist` | list | — | Per-server allow-list for `ctx.call_mcp` (no wildcards) |

Plugin sources:

| Source | Path |
|--------|------|
| Bundled | `<repo>/plugins/` |
| User | `~/.hermes/plugins/` |
| Project | `.hermes/plugins/` (not loaded by the gateway that runs sessions; see Notes) |
| pip | `hermes_agent.plugins` entry points |
| Nix | `services.hermes-agent.extraPlugins` / `extraPythonPackages` |

Valid hooks: directive `pre_tool_call`, `pre_llm_call`, `pre_verify`, `pre_gateway_dispatch`; transform `transform_tool_result`, `transform_terminal_output`, `transform_llm_output`, `pre_transcription`; observer `post_tool_call`, `post_llm_call`, `pre_api_request`, `post_api_request`, `api_request_error`, `pre_auxiliary_call`, `post_auxiliary_call`, `on_stream_start`, `on_stream_delta`, `on_stream_end`, `on_interim_message`, `on_session_start`, `on_session_end`, `on_session_finalize`, `on_session_reset`, `post_compaction`, `post_curator_run`, `on_session_delete`, `agent_loop_stopped`, `on_skill_lifecycle`, `subagent_start`, `subagent_stop`, `pre_approval_request`, `post_approval_response`, `on_human_input_request`, `on_human_input_resolved`, `pre_command`, `kanban_task_claimed`, `kanban_task_completed`, `kanban_task_blocked`.

## Management commands

```bash
hermes plugins                          # unified interactive UI
hermes plugins list | search <term> | install <name|owner/repo> [--enable|--no-enable] [--ref <40-hex sha>]
hermes plugins update|remove|enable|disable <name>
hermes plugins update <name> --force   # accept a caution scan verdict on a Git update without the question
hermes plugins update [--yes]          # no name: list every updatable plugin, "Update all N? [Y/n]"; --yes required without a terminal
hermes plugins auto-update [on|off]    # same switch as plugins.auto_apply (chat: /plugins auto-update; /plugins update)
hermes plugins capabilities [name] | check-updates | adopt <name> | trust-update-url <name>
hermes plugins validate <dir> | show <name>
hermes plugins pack show|install|export ./hermes-pack.yaml
```

## Notes

- Opt-in: general plugins and user-installed backends are disabled until listed in `plugins.enabled`. Not gated: bundled platform plugins, bundled backends, memory providers (`memory.provider`), context engines (`context.engine`), model providers. Gateway event hooks under `~/.hermes/hooks/<name>/` are not plugins and are not gated by `plugins.enabled`.
- States: enabled, disabled (explicit off), not enabled. Existing user plugins were grandfathered into `plugins.enabled` at config schema v21+; bundled standalone plugins were not.
- Later sources override earlier ones on name collision, except memory providers where the bundled provider wins.
- `schema["description"]` is what the model sees; `ctx.register_tool(description=...)` is separate `ToolEntry` metadata.
- Install pinning: `--ref` needs a full 40-character commit SHA; pinned plugins are not moved by `update`. Private repos use `GITHUB_TOKEN` / `GH_TOKEN`, `gh` login, or git credential helper after an anonymous attempt fails.
- Capabilities (`plugin.yaml` `capabilities:` e.g. `tools.override`, `llm.model_override`) are a consent and audit layer, not a sandbox; non-interactive installs do not grant them. Legacy `allow_*` keys are deprecated.
- Install scan verdicts: safe, caution (confirm or `--force`), dangerous (blocked, `--force` does not override).
- `ctx.inject_message` in gateway mode takes at most one of `session_key` / `origin` (neither = key-less routing, see below) and needs `allow_gateway_injection: true`; text is conversational only (no slash commands, approvals). `ctx.call_mcp` needs a per-server `mcp_allowlist` (no wildcards), results over ~64 KB are truncated, timeout clamped to 1-600.
- Approval transports change where a prompt is shown, not whether approval is needed; select with `security.approval.transport` and `transport_fallback: deny` (default) or `builtin`.
- `plugins.isolation: host` runs user plugins in a separate per-profile process; platform adapters, approval transports, `create_client` provider profiles, streaming dashboard endpoints and monkeypatching plugins need `in_process`.
- Config-driven surfaces are not Python plugins: MCP `mcp_servers`, TTS/STT `type: command` providers, shell `hooks:`, skill taps.
- The v0.22.2 plugins guide example declared `on_tool_call(tool_name, params, result)`; v0.23.1 corrects it to `on_tool_call(tool_name, args, result, **kwargs)`, now used verbatim above. The hook contract (keyword args `tool_name`, `args`, `result`, `task_id`, `duration_ms`; callbacks must accept `**kwargs`) is in the hooks reference: https://hermes-agent.nousresearch.com/docs/user-guide/features/hooks
- Slash command handlers (`ctx.register_command`) run in the gateway process that owns the session, including commands typed in classic `hermes chat`. Return the text instead of `print()`; read the working directory with `agent.runtime_cwd.resolve_agent_cwd()` (not `os.getcwd()`); declare `session_id`, `session_key`, `platform` or `source` as handler keywords to receive the calling session (one-argument handlers still work; the same values are bound as `HERMES_SESSION_*`, read via `gateway.session_context.get_session_env`). Ctrl+C in the classic CLI stops the wait, not the handler.
- Plugin code inside the gateway: hooks, tools and injected turns of every chat and local session (CLI, TUI, Desktop) run in the one gateway process. `os.getcwd()` is the gateway's own directory (use `ctx.session_cwd()`, pass as `cwd=` to subprocesses; ingress hooks such as `pre_gateway_dispatch` get the profile's terminal cwd or `""`); `ctx.session_surface()` returns `"cli"` / `"tui"` / `"desktop"` / `"acp"` / the platform / `""` outside a session; `hermes_cli.plugin_session.session_client()` returns the client's self-declared `{"name", "version"}` or `None` (a label, never an authentication); `print()` goes to `gateway-stdio.log` and `input()` gets end-of-file, so use `logging`.
- `ctx.post_message(text) -> PluginMessage` posts one message into the conversation the calling code is bound to and `PluginMessage.edit(text) -> dict` updates it (no per-platform code; text clamped to the platform limit, plain text). Never raises: inspect `handle.ok` / `handle.message_id` / `handle.error`; error codes `no_conversation`, `gateway_unavailable`, `adapter_unavailable`, `send_failed`, `edit_failed`, `on_event_loop`, `timeout` (30 s; operation continues, `handle.pending`). Platforms without edit support send a new message (`fallback: True`). Not available under `plugins.isolation: host`. From async code on the gateway loop use `ctx.apost_message` / `handle.aedit`.
- Project-local plugins: the gateway never loads `./.hermes/plugins/`; `HERMES_ENABLE_PROJECT_PLUGINS=true` has no effect on sessions (a CLI/TUI session started with it set in a folder containing such plugins shows a warning and logs it to `gateway.log`). Install as a user plugin (`~/.hermes/plugins/` or `hermes plugins install`) and run `hermes plugins enable <name>`.
- `hermes plugins update` with no name lists catalog installs (re-pinned to the reviewed catalog commit) and tracked Git installs (pulled), names every skipped plugin and why (pinned, held with `--ref`, needs fixing, status unknown, pip distribution), asks once in a terminal, and continues past individual failures (exit 1 if any failed); without a terminal it updates nothing unless `--yes` (consent prompts then fail closed). `--force` accepts a caution scan verdict on a Git update; a dangerous verdict still disables the plugin until reviewed. `plugins.auto_apply: true` (CLI `hermes plugins auto-update [on|off]`, `/plugins auto-update`, Desktop and dashboard switch; per profile) lets the gateway's scheduled check (`plugins.auto_update_check_hours`, default 24; on demand `hermes plugins check-updates`) apply catalog re-pins and tracked Git pulls, but an unattended update never accepts a widened catalog pin or Git update, new capabilities, or a caution verdict on a Git update (a catalog re-pin accepts caution). `--ref` installs at a commit other than the catalog pin are skipped by every Update all.
- `llm.side_question` capability has no legacy key: open only when declared and granted. A catalog re-pin that adds a new or changed OAuth client (`oauth:`) also needs `y/N` confirmation.
- `plugins.isolation: host` additionally refuses terminal backends (e.g. the `singularity` plugin) and websocket dashboard endpoints; every non-startup profile on a multi-profile gateway runs its dashboard plugins in its own host (websocket routes refused with HTTP 501, unanswered requests get HTTP 504 after 60 s). Secret sources and `@` context references are also bridged to the host.
- `ctx.inject_message` without `session_key` / `origin` (when the plugin runs in the gateway): the call's own local session if known; otherwise the single classic-CLI (`hermes chat`) session of the plugin's profile with a viewer attached; otherwise refused (`False`). Mid-turn injection now queues as the next turn instead of interrupting. A `session_key` must belong to the plugin's own profile. An `origin` whose chat has no admitted human message yet is refused. Prefer passing `session_key`; key-less injection may be retired.
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/features/plugins (pinned to v0.23.1)

### Migration (v0.22 -> v0.23)

- `HERMES_ENABLE_PROJECT_PLUGINS=true` no longer makes project plugins load in sessions (see Notes).
- `ctx.inject_message` in the CLI no longer interrupts a running turn (queued as the next turn); the "gateway mode requires `session_key` or `origin`" rule is relaxed to the key-less routing above, and `False` is now returned when both are given, or neither is given and no chat is chosen.
- `plugins.auto_apply` now documents unattended updates for catalog re-pins as well as Git pulls, and `hermes plugins update` with no name is an "Update all".

## Related

- [Built-in Plugins](./built-in-plugins.md)
- [Plugin Catalog](./plugin-catalog.md)
- [Hooks](../automation/hooks.md)
- [MCP](./mcp.md)
