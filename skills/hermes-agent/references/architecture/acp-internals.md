# ACP Internals

The ACP adapter wraps Hermes' synchronous `AIAgent` in an async JSON-RPC stdio server (Agent Communication Protocol) for editor integration.

## Signature / Usage

Boot flow:

```text
hermes acp / hermes-acp / python -m acp_adapter
  -> acp_adapter.entry.main()
  -> parse --version / --check / --setup before server startup
  -> load ~/.hermes/.env
  -> configure stderr logging
  -> construct HermesACPAgent
  -> acp.run_agent(agent, use_unstable_protocol=True)
```

Session lifecycle:

```text
new_session(cwd)
  -> create SessionState
  -> create AIAgent(platform="acp", enabled_toolsets=<_get_platform_tools(config, "acp"), as on the
                   gateway: platform_toolsets.acp (default hermes-acp) plus the resolver's extras
                   such as plugin toolsets, with its admitted MCP servers keyed mcp-<server>>,
                   disabled_toolsets=<agent.disabled_toolsets>)
  -> bind task_id/session_id to cwd override

prompt(..., session_id)
  -> extract text from ACP content blocks
  -> reset cancel event
  -> install callbacks + approval bridge
  -> run AIAgent in ThreadPoolExecutor
  -> update session history
  -> emit final agent message chunk
```

## Options / Props

Key files: `acp_adapter/entry.py`, `server.py`, `session.py`, `events.py`, `permissions.py`, `tools.py`, `auth.py`.

| Component | Role |
|-----------|------|
| `HermesACPAgent` (`server.py`) | Implements the ACP agent protocol: initialize/authenticate, new/load/resume/fork/list/cancel session, prompt execution, model switching, callback wiring |
| `SessionManager` (`session.py`) | Thread-safe live sessions (`session_id`, `agent`, `cwd`, `model`, `history`, `cancel_event`); create / get / remove / fork / list / cleanup / cwd updates |
| Event bridge (`events.py`) | Converts `tool_progress_callback` and `step_callback` into ACP `session_update` events via `asyncio.run_coroutine_threadsafe(...)` |
| Permission bridge (`permissions.py`) | `allow_once` -> `once`, `allow_always` -> `always`, reject options -> `deny`; timeouts and bridge failures deny |
| Tool rendering (`tools.py`) | `patch` / `write_file` -> diffs, `terminal` -> command text, `read_file` / `search_files` -> text previews, large results truncated |

## Notes

- Stdout is reserved for ACP JSON-RPC; logs go to stderr.
- `thinking_callback` is `None` in the ACP bridge; reasoning is forwarded through `step_callback`. Every ACP tool call reaches a terminal status; calls still open at turn end are marked `failed`.
- A turn ending in terminal failure is closed with a Hermes-authored assistant row so the transcript never ends on an open `user` row (context-overflow failures are exempt).
- `cancel(session_id)` sets the cancel event, calls `agent.interrupt()` and returns `stop_reason="cancelled"`. `fork_session()` deep-copies history into a new session with its own ID and cwd.
- Auth: no own store; reuses `acp_adapter/auth.py` and `hermes_cli/runtime_provider.py`, and always advertises the terminal setup auth method `hermes-setup` (args `--setup`).
- The editor cwd is bound to the ACP session ID through task-scoped terminal/file overrides.
- Tool IDs are tracked FIFO per tool name so parallel/repeated same-name calls complete correctly.
- The approval callback is installed on the terminal tool during a prompt and restored afterward.
- Limitations: sessions persist to the shared `~/.hermes/state.db` and appear in `session_search`; non-text prompt blocks are ignored; editor UX varies by client. Related: `toolsets.py` (`hermes-acp`), `hermes_cli/main.py` (`hermes acp`), `pyproject.toml` (`[acp]` extra, `hermes-acp` script).

## Related

- [Agent Loop](./agent-loop.md)
- [Provider Runtime](./provider-runtime.md)
- [Gateway Internals](./gateway-internals.md)
- [Tools Runtime](./tools-runtime.md)
