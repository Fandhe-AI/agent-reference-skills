---
source: https://opencode.ai/docs/cli/acp/
---

# ACP Client (Zed)

Run OpenCode as an Agent Client Protocol agent from an editor such as Zed.

```json title="~/.config/zed/settings.json"
{
  "agent_servers": {
    "OpenCode": {
      "command": "opencode",
      "args": ["acp"]
    }
  }
}
```

Sign in from a terminal before starting the client:

```bash
opencode auth login
```

Debug a failing client connection:

```bash
opencode --print-logs acp
```

## Notes

- Other ACP clients use the same command and `acp` argument; field names differ. If a graphical client cannot find `opencode`, set `command` to the output of `which opencode`.
- `opencode acp` waits on stdin, so it looks stuck when run directly in a terminal.
- With `--print-logs`, logs go to stderr; stdout carries only ACP messages.
