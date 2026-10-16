# Tools Runtime

Hermes tools are self-registering functions grouped into toolsets and executed through a central registry and dispatch system.

## Signature / Usage

```python
registry.register(
    name="terminal",               # Unique tool name (used in API schemas)
    toolset="terminal",            # Toolset this tool belongs to
    schema={...},                  # Model-facing schema (description, parameters)
    handler=handle_terminal,       # The function that executes when the tool is called
    check_fn=check_terminal,       # Optional: returns True/False for availability
    requires_env=["SOME_VAR"],     # Optional: env vars needed (for UI display)
    is_async=False,                # Whether the handler is an async coroutine
    description="Run commands",    # Optional ToolEntry registry metadata
    emoji="💻",                    # Emoji for spinner/progress display
)
```

Primary files: `tools/registry.py`, `model_tools.py`, `toolsets.py`, `tools/terminal_tool.py`, `tools/environments/*`.

Dispatch flow:

```
Model response with tool_call
    ↓
agent loop (`agent/conversation_loop.py`, via `run_agent.py`'s `AIAgent` facade)
    ↓
model_tools.handle_function_call(name, args, task_id, user_task)
    ↓
[Agent-loop tools?] → handled directly by agent loop (todo, memory, session_search, delegate_task)
    ↓
[Plugin pre-hook] → invoke_hook("pre_tool_call", ...)
    ↓
registry.dispatch(name, args, **kwargs)
    ↓
Look up ToolEntry by name
    ↓
[Async handler?] → bridge via _run_async()
[Sync handler?]  → call directly
    ↓
Return result string (or JSON error)
    ↓
[Plugin post-hook] → invoke_hook("post_tool_call", ...)
```

## Options / Props

`model_tools.get_tool_definitions(enabled_toolsets, disabled_toolsets, quiet_mode)` filtering:

| Case | Behavior |
|------|----------|
| `enabled_toolsets` given | Only tools from those toolsets (resolved via `resolve_toolset()`) |
| `disabled_toolsets` given | All toolsets minus the disabled ones |
| Neither | All known toolsets |

After resolution, `registry.get_definitions()` applies `check_fn` filtering; `execute_code` and `browser_navigate` schemas are then patched to reference only tools that passed filtering.

Terminal backends: local, docker, ssh, singularity, modal, daytona, vercel_sandbox. Also per-task cwd overrides, background process management, PTY mode, approval callbacks.

## Notes

- Discovery: `discover_builtin_tools()` scans `tools/*.py` with AST parsing for top-level `registry.register()` calls (skipping `__init__.py`, `registry.py`, `mcp_tool.py`) and imports them. MCP tools (`discover_mcp_tools()`) and plugin tools (`hermes_cli.plugins.discover_plugins()`) are discovered afterwards.
- A registration shadowing a tool from a different toolset is rejected unless `override=True`; plugin overrides of built-ins also need `plugins.entries.<plugin_id>.allow_tool_override: true`.
- `schema["description"]` is the authoritative model-facing description; `description=` only populates `ToolEntry.description`.
- `check_fn` results are cached per call; exceptions count as unavailable. Toolsets resolve from explicit lists, platform presets (`hermes-cli`, `hermes-telegram`, ...), dynamic MCP toolsets and special sets like `hermes-acp`. Legacy `*_tools` names map via `_LEGACY_TOOLSET_MAP`.
- Errors: `registry.dispatch()` returns `{"error": "Tool execution failed: ExceptionType: message"}`; `handle_function_call()` adds a second wrapper `{"error": "Error executing tool_name: message"}`.
- Agent-loop tools (`todo_list`, `memory`, `session_search`, `delegate_task`) are intercepted before registry dispatch; their registry handlers return a stub error.
- Async bridging via `_run_async()`: persistent loop on CLI, disposable thread with `asyncio.run()` on gateway, per-thread persistent loops in worker threads.
- Dangerous-command approval (`tools/approval.py`): `DANGEROUS_PATTERNS` list of `(regex, description)`, `detect_dangerous_command(command)`, CLI interactive prompt, gateway async callback, optional smart approval via auxiliary LLM, per-session approvals, permanent allowlist in `config.yaml` `command_allowlist`.
- Process results: `tools/process_registry_checkpoint.py` owns running-process checkpoints; `tools/process_registry_results.py` writes one atomic, redacted receipt per process under the profile's `logs/process-results/`; reads require the commissioning durable session.

## Related

- [Agent Loop](./agent-loop.md)
- [ACP Internals](./acp-internals.md)
