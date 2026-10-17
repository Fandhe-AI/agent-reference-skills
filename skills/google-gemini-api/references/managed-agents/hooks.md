---
source: https://ai.google.dev/gemini-api/docs/agent-hooks
---

# Hooks (managed agents)

Hooks run custom scripts or external HTTP requests right before or after the agent executes code or modifies files inside its remote sandbox. Use them for safety and access guardrails, data pipeline transformations after file changes, and enterprise audit telemetry after tool execution.

## Signature / Usage

Provide `.agents/hooks.json` plus handler scripts through `environment.sources`:

```python
import json
from google import genai

client = genai.Client()

hooks_config = {
    "security-gate": {
        "pre_tool_execution": [
            {
                "matcher": "code_execution",
                "hooks": [
                    {
                        "type": "command",
                        "command": "python3 /.agents/hooks-scripts/gate.py",
                        "timeout": 10,
                    }
                ],
            }
        ]
    }
}

gate_script = """#!/usr/bin/env python3
import sys, json
data = json.load(sys.stdin)
cmd = str(data.get("tool_call", {}).get("args", {}))
if "rm -rf" in cmd:
    print(json.dumps({"decision": "deny", "reason": "Destructive command blocked by security gate."}))
else:
    print(json.dumps({"decision": "allow"}))
"""

interaction = client.interactions.create(
    agent="antigravity-preview-09-2026",
    input="Run `rm -rf /tmp/forbidden` using code_execution.",
    tools=[{"type": "code_execution"}],
    environment={
        "type": "remote",
        "sources": [
            {
                "type": "inline",
                "target": ".agents/hooks.json",
                "content": json.dumps(hooks_config, indent=2),
            },
            {
                "type": "inline",
                "target": ".agents/hooks-scripts/gate.py",
                "content": gate_script,
            },
        ],
    },
)
print(interaction.output_text)
```

`pre_tool_execution` input payload (`stdin`) and decisions (`stdout`):

```json
{
  "tool_call": {
    "name": "code_execution",
    "args": {
      "code": "rm -rf /tmp/forbidden",
      "language": "bash"
    }
  },
  "environment_id": "env_xyz789"
}
```

```json
{
  "decision": "deny",
  "reason": "Destructive command blocked by security gate."
}
```

`hooks.json` schema (groups with independent `enabled`):

```json
{
  "security-gate": {
    "enabled": true,
    "pre_tool_execution": [
      {
        "matcher": "code_execution",
        "hooks": [
          {
            "type": "command",
            "command": "python3 /.agents/hooks-scripts/gate.py",
            "timeout": 10
          }
        ]
      }
    ]
  },
  "auto-format": {
    "post_tool_execution": [
      {
        "matcher": "*",
        "hooks": [
          {
            "type": "command",
            "command": "python3 /.agents/hooks-scripts/auto_lint.py",
            "timeout": 15
          }
        ]
      }
    ]
  }
}
```

HTTP hook (audit telemetry), with a header injected on the wire through the network allowlist:

```python
hooks_config = {
    "audit-logging": {
        "post_tool_execution": [
            {
                "matcher": "view_file|write_to_file|replace_file_content",
                "hooks": [
                    {
                        "type": "http",
                        "url": "https://telemetry.example.com/api/v1/agent-events",
                        "timeout": 10,
                    }
                ],
            }
        ]
    }
}
# environment={"type": "remote", "sources": [...hooks.json inline...],
#   "network": {"allowlist": [{"domain": "telemetry.example.com", "transform": {"Authorization": "Bearer ..."}}, {"domain": "*"}]}}
```

## Options / Props

Lifecycle events:

| Event | When it fires | What it does |
|-------|---------------|--------------|
| `pre_tool_execution` | Right before a tool runs | Can approve (`allow`) or block (`deny`). When blocked, the model sees your rejection reason and adapts |
| `post_tool_execution` | Right after a tool finishes | Follow-up tasks (formatting, tests, telemetry). Cannot block or undo. Returned decision values are ignored; output `{}` |

Rule group fields:

| Field | Type | Description |
|-------|------|-------------|
| `enabled` | boolean | Optional. `false` disables the group (`true` by default) |
| `matcher` | string | RE2 regular expression matching tool names inside the container |
| `hooks` | array | Ordered list of handlers (`command` or `http`), run sequentially |

Command hook:

| Field | Type | Description |
|-------|------|-------------|
| `type` | string | Must be `"command"` |
| `command` | string | Command line to run inside the sandbox |
| `timeout` | integer | Timeout in seconds. Default: `30` |

HTTP hook:

| Field | Type | Description |
|-------|------|-------------|
| `type` | string | Must be `"http"` |
| `url` | string | External HTTPS endpoint to POST the event payload to |
| `headers` | object | Optional non-sensitive custom headers. For authentication use a credential on the network allowlist |
| `timeout` | integer | Timeout in seconds. Default: `30` |

Matchable built-in tools: `code_execution`, `view_file`, `write_to_file`, `replace_file_content`, `list_dir`, `delete_file`. Common matchers: `"code_execution"`, `"write_to_file"`, `"view_file|write_to_file"`, `".*_file"` (does not cover `replace_file_content` and `list_dir`), `".*"` / `"*"` / `""` (catch-all). Shell globs such as `*_file` are invalid regex and fail to match.

## Notes

- Configuration is discovered from `.agents/hooks.json` or `/.agents/hooks.json` inside the sandbox; provide it via a repository mount, Cloud Storage (`gcs`) source, or inline sources.
- Unrecognized JSON, plain text, or anything other than `{"decision": "deny"}` is treated as `allow`. Script crashes (non-zero exit), non-2xx HTTP responses, and timeouts are also treated as `allow`, so a broken hook never deadlocks the agent. The agent pauses synchronously while hooks run.
- A `post_tool_execution` payload includes an `"error"` field only when stderr output or a filesystem failure occurred.
- HTTP hooks run inside the sandbox network: target endpoints must be on `network.allowlist`; loopback (`127.0.0.1`, `localhost`) is blocked. Store secrets as a credential and reference it by ID from the allowlist rather than writing them into `hooks.json`.
- Limitations: hooks intercept only built-in sandbox tools. They do not fire for custom function calling (`function`) or external MCP (`mcp_server`) tools handled outside the container. Agents with write or shell access can modify `.agents/hooks.json` in writable workspaces; for tamper resistance mount configuration from read-only repositories.
- Multi-turn recovery: after a deny, continue with `previous_interaction_id` and `environment=<environment_id>`; the agent reads the denial reason and recovers.
- The original page's Java and Go examples use `read_file` / `write_file` matchers where the Python / JavaScript / REST examples use `view_file` / `write_to_file`; the tool names listed under Matcher syntax are the authoritative ones.
- The `rm -rf /tmp/forbidden` string in the examples is the official page's deliberately destructive test payload: it is sent to the agent's disposable remote sandbox and is expected to be blocked by the `deny` hook; never run it locally.
- API surface: managed agents via the Interactions API; Public Preview.
- Distinct from other skills: these are agent-loop lifecycle hooks of Gemini managed agents (sandbox-side). Claude Code hooks are in anthropic-claude-code-extend, git hooks in lefthook, React form hooks in react-hook-form, Fastify lifecycle hooks in fastify.
- Docs fetched 2026-10-16.

## Related

- [Environments in managed agents](./environments.md)
- [Credentials in managed agents](./credentials.md)
- [Antigravity agent](./antigravity-agent.md)
