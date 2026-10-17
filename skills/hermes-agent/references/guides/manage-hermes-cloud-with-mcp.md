# Manage Hermes Cloud with MCP

Connect a local Hermes Agent to the Nous Portal MCP server to list, start, stop, create, and manage Hermes Cloud instances conversationally.

## Signature / Usage

```bash
cd ~/.hermes/hermes-agent
python -c "import pm; pm.sync_venv(['mcp'], explicit=True)"   # only if MCP support is missing

hermes mcp add --url https://portal.nousresearch.com/mcp --auth oauth hermes-cloud
hermes mcp test hermes-cloud
hermes chat
```

```text
/reload-mcp
List my Hermes Cloud agents and their current status.
```

Config written to `~/.hermes/config.yaml`, with an optional read-only restriction:

```yaml
mcp_servers:
  hermes-cloud:
    url: "https://portal.nousresearch.com/mcp"
    auth: oauth
    tools:
      include: [agents]
```

## Options / Props

| Ask for | Tool call |
|---------|-----------|
| List cloud agents | `agents` (list) |
| Status | `agents` (get / status) |
| Cost | `agents` (cost_estimate) |
| Start / stop / restart | `agent` (start / stop / restart) |
| Create | `agent` (create) |
| Destroy | `agent` (destroy) |
| Update env / image | `agent` (update_env / update_image) |

## Notes

- Needs a Nous Portal account with Hermes Cloud access. No API key: OAuth with PKCE via a browser round-trip.
- On first connect Hermes discovers OAuth endpoints (RFC 9728 / 8414), registers as a client (RFC 7591 Dynamic Client Registration), opens the Portal, and stores the token under `~/.hermes/mcp-tokens/` with automatic refresh. No credentials in `config.yaml`.
- Multi-org accounts choose the org in the browser during authorization; to change it, `hermes mcp remove hermes-cloud` and re-add.
- Calls run against your org with your Portal identity; membership is re-checked on each call.
- Restricting to `include: [agents]` makes the connection read-only (the `agent` tool is mutating). Run `/reload-mcp` after config changes.
- "invalid_client" / "unknown client": `hermes mcp remove hermes-cloud`, `rm -f ~/.hermes/mcp-tokens/hermes-cloud.*`, re-add.
- Tools missing: `/reload-mcp`, then `hermes mcp test hermes-cloud`. Asked to log in again: re-run the `hermes mcp add` command.
- Remote / SSH hosts: forward the loopback OAuth callback port.

## Related

- [oauth-over-ssh](./oauth-over-ssh.md)
- [mcp-guide](./mcp-guide.md)
- [run-hermes-with-nous-portal](./run-hermes-with-nous-portal.md)
