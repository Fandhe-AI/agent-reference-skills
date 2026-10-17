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

    def on_tool_call(tool_name, args, result, task_id, **kwargs):
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
| Bundle skills | `ctx.register_skill(name, path)` (namespaced `plugin:skill`) |
| Gate on env vars | `requires_env: [API_KEY]` in `plugin.yaml` |
| Distribute via pip | `[project.entry-points."hermes_agent.plugins"]` |
| Gateway platform | `ctx.register_platform(name, label, adapter_factory, check_fn, ...)` |
| Image / video gen backend | `ctx.register_image_gen_provider(p)` / `ctx.register_video_gen_provider(p)` |
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
| Project | `.hermes/plugins/` (requires `HERMES_ENABLE_PROJECT_PLUGINS=true`) |
| pip | `hermes_agent.plugins` entry points |
| Nix | `services.hermes-agent.extraPlugins` / `extraPythonPackages` |

Valid hooks (27): directive `pre_tool_call`, `pre_llm_call`, `pre_verify`, `pre_gateway_dispatch`; transform `transform_tool_result`, `transform_terminal_output`, `transform_llm_output`, `pre_transcription`; observer `post_tool_call`, `post_llm_call`, `pre_api_request`, `post_api_request`, `api_request_error`, `pre_auxiliary_call`, `post_auxiliary_call`, `on_stream_start`, `on_stream_delta`, `on_stream_end`, `on_interim_message`, `on_session_start`, `on_session_end`, `on_session_finalize`, `on_session_reset`, `agent_loop_stopped`, `on_skill_lifecycle`, `subagent_start`, `subagent_stop`, `pre_approval_request`, `post_approval_response`, `on_human_input_request`, `on_human_input_resolved`, `pre_command`, `kanban_task_claimed`, `kanban_task_completed`, `kanban_task_blocked`.

## Management commands

```bash
hermes plugins                          # unified interactive UI
hermes plugins list | search <term> | install <name|owner/repo> [--enable|--no-enable] [--ref <40-hex sha>]
hermes plugins update|remove|enable|disable <name>
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
- `ctx.inject_message` in gateway mode needs `session_key` or `origin` (exactly one) and `allow_gateway_injection: true`; text is conversational only (no slash commands, approvals). `ctx.call_mcp` needs a per-server `mcp_allowlist` (no wildcards), results over ~64 KB are truncated, timeout clamped to 1-600.
- Approval transports change where a prompt is shown, not whether approval is needed; select with `security.approval.transport` and `transport_fallback: deny` (default) or `builtin`.
- `plugins.isolation: host` runs user plugins in a separate per-profile process; platform adapters, approval transports, `create_client` provider profiles, streaming dashboard endpoints and monkeypatching plugins need `in_process`.
- Config-driven surfaces are not Python plugins: MCP `mcp_servers`, TTS/STT `type: command` providers, shell `hooks:`, skill taps.
- The official plugins guide example declares `on_tool_call(tool_name, params, result)`; this page follows the hook contract in the v0.22.2 hooks reference (keyword args `tool_name`, `args`, `result`, `task_id`, `duration_ms`; callbacks must accept `**kwargs`), since a callback naming a field the hook does not send fails on every call. Source: https://hermes-agent.nousresearch.com/docs/user-guide/features/hooks (pinned to v0.22.2)
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/features/plugins (pinned to v0.22.2)

## Related

- [Built-in Plugins](./built-in-plugins.md)
- [Plugin Catalog](./plugin-catalog.md)
- [Hooks](../automation/hooks.md)
- [MCP](./mcp.md)
