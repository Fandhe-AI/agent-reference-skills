---
source: https://opencode.ai/docs/cli/acp/
---

# ACP

Start the Agent Client Protocol server with `opencode acp` and integrate it with editors.

## Signature / Usage

### Start the ACP server

Starts an Agent Client Protocol server over stdin and stdout for editor integrations. It runs until the client closes the connection.

```bash
opencode acp
```

### Zed configuration

```json
{
  "agent_servers": {
    "OpenCode": {
      "command": "opencode",
      "args": ["acp"]
    }
  }
}
```

### Authenticate

Sign in from a terminal before you start the ACP client:

```bash
opencode auth login
```

### Debug logs

```bash
opencode --print-logs acp
```

## Notes

- Zed settings path in the official page: `~/.config/zed/settings.json`.
- `opencode acp` waits for ACP messages on stdin, so it looks stuck when you run it directly in a terminal. Start it from an ACP client instead.
- If a graphical client can't find `opencode`, set `command` to the absolute path that `which opencode` prints.
- With `--print-logs`, ACP and private server logs go to stderr; stdout carries only ACP messages.
- `opencode acp` starts a private OpenCode server and does not connect to the shared background service.

## Related

- cli.md
- auth.md
- https://opencode.ai/docs/cli/acp/
