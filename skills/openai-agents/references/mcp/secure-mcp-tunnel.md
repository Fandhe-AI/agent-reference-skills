# Secure MCP Tunnel

Connect private or on-prem MCP servers to supported OpenAI products with an outbound-only tunnel, without exposing them to the public internet.

## Signature / Usage

```bash
export CONTROL_PLANE_API_KEY="sk-..."

tunnel-client init \
  --sample sample_mcp_stdio_local \
  --profile local-stdio \
  --tunnel-id tunnel_0123456789abcdef0123456789abcdef \
  --mcp-command "python /path/to/server.py"

tunnel-client doctor --profile local-stdio --explain
tunnel-client run --profile local-stdio
```

For HTTP servers, use `--mcp-server-url https://mcp.internal.example.com/mcp` instead of `--mcp-command`.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `tunnel_id` | string | Tunnel endpoint identifier, created in Platform tunnel settings. |
| `CONTROL_PLANE_API_KEY` | env var | Runtime API key used for control-plane authentication. |
| `--profile` | flag | Named local profile grouping the tunnel-client configuration. |
| `--mcp-command` | flag | Launches a local MCP server over stdio for tunneling. |
| `--mcp-server-url` | flag | Points to a local HTTP MCP server instead of a stdio command. |

## Notes

- Run `tunnel-client` inside the network that can already reach the MCP server; it opens an outbound HTTPS path to OpenAI, so the server itself is never publicly exposed.
- The client polls for work, forwards JSON-RPC requests locally, and returns responses; the MCP server address stays private and is only used from inside the environment where `tunnel-client` runs.
- Supported products: ChatGPT (developer mode), Codex, Responses API, and other OpenAI surfaces that support MCP connectors.
- Permissions are tunnel-scoped: Read + Manage (create/edit tunnels) and Read + Use (run `tunnel-client` or select tunnels).
- Enterprise networking features such as outbound proxies and mTLS are supported.
- Outbound destination: the host running `tunnel-client` needs outbound HTTPS to `api.openai.com:443` (default; paths under `/v1/tunnel/*`), or `mtls.api.openai.com:443` when control-plane mTLS is configured, plus reachability to the private MCP server.
- Tunnel metadata changes are recorded in the API Platform Audit logs as `tunnel.created`, `tunnel.updated`, and `tunnel.deleted`.
- Advanced: allowlisted HTTP callouts. `tunnel-client` includes an embedded MCP server, Harpoon, that exposes configured HTTP targets by label and lets callers invoke them through the tunnel with bounded request/response limits. It is not a general-purpose proxy: callers cannot choose arbitrary hosts, and requests are limited to the targets and methods the customer configured.

## Related

- [MCP and Connectors](./mcp-and-connectors.md)
