# Code Execution

The `execute_code` tool lets the agent write Python scripts that call Hermes tools programmatically (programmatic tool calling), collapsing multi-step workflows into one LLM turn. The script runs in a child process on the agent host and talks to Hermes over a Unix domain socket RPC; only its `print()` output returns to the LLM.

## Signature / Usage

```python
from hermes_tools import web_search, web_extract

results = web_search("Python 3.13 features", limit=5)
for r in results["data"]["web"]:
    content = web_extract([r["url"]])
    # ... filter and process ...
print(summary)
```

Tools available inside scripts: `web_search`, `web_extract`, `read_file`, `write_file`, `search_files`, `patch`, `terminal` (foreground only; no `background` / `pty`). Scripts cannot call `execute_code` recursively, `delegate_task`, or MCP tools. The agent passes `reset: true` to discard the kernel state.

## Options / Props

```yaml
# ~/.hermes/config.yaml
code_execution:
  mode: project      # project (default) | strict
  timeout: 300       # Max seconds per script
  max_tool_calls: 50 # Max tool calls per execution
  kernel_idle_timeout: 1800
  max_session_kernels: 4
```

| Mode | Working directory | Python interpreter |
|------|-------------------|--------------------|
| `project` (default) | Session's working directory (same as `terminal()`) | Active `VIRTUAL_ENV` / `CONDA_PREFIX` python, falling back to Hermes's own |
| `strict` | Isolated temp staging directory | `sys.executable` (Hermes's own) |

| Resource | Limit |
|----------|-------|
| Timeout | 300s; SIGTERM, then SIGKILL after 5s grace |
| Stdout | 50 KB (head-and-tail inline; full text saved to `~/.hermes/cache/exec/`) |
| Stderr | 10 KB (included on non-zero exit) |
| Tool calls | 50 per execution |

## Notes

- Source: https://hermes-agent.nousresearch.com/docs/user-guide/features/code-execution (pinned to v0.22.2)
- Use it for 3+ tool calls with processing logic between them, bulk filtering, loops. Use `terminal` for simple shell commands, builds, test suites, interactive/background processes.
- Persistent session kernel (local backend): variables, imports and loaded data persist between calls for the same session, mode, interpreter, working directory and tool set. A timeout or interrupt kills the kernel; idle timeout and `max_session_kernels` eviction also end it. Subagents get their own kernel (disposed when the subagent finishes). The kernel environment is frozen at spawn, so use `reset: true` to pick up new passthrough variables. `code_execution.kernel_mode` is no longer a separate switch. Remote backends (Docker, SSH, Modal) use a remote session kernel, falling back to standalone scripts when it cannot spawn.
- Security: child env is scrubbed (names containing `KEY`, `TOKEN`, `SECRET`, `PASSWORD`, `CREDENTIAL`, `PASSWD`, `AUTH` excluded). Only `HERMES_HOME`, `HERMES_PROFILE`, `HERMES_CONFIG`, `HERMES_ENV` (plus RPC vars, `TZ`, `HOME`) pass by exact name; the former broad `HERMES_*` prefix passthrough was removed. Opt back in via `terminal.env_passthrough` or a skill's `required_environment_variables`. Debug log: `execute_code: dropped N non-allowlisted HERMES_* var(s)`.
- Skills declaring `required_environment_variables` get them passed through to `execute_code` and `terminal` children after loading.
- Result always includes `status` (success / error / timeout / interrupted), `output`, `tool_calls_made`, `duration_seconds`. Timeout message: `Script timed out after 300s and was killed.`; user interruption: `[execution interrupted — user sent a new message]`.
- Platforms: Linux, macOS (Unix socket) and Windows (loopback TCP fallback). Remote backends use file-based RPC and require Python 3 inside the backend.

## Related

- [Delegation](./delegation.md)
- [Cron Jobs](./cron.md)
