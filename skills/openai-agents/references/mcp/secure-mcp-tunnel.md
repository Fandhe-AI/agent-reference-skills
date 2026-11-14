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

Connect from the Responses API by passing `tunnel_id` in the MCP tool definition (do not pass the OpenAI-hosted tunnel endpoint as `server_url`):

```bash
curl https://api.openai.com/v1/responses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "gpt-6-astra",
    "input": "Use the private MCP server to answer my request.",
    "tools": [
      {
        "type": "mcp",
        "server_label": "private_mcp",
        "tunnel_id": "tunnel_0123456789abcdef0123456789abcdef"
      }
    ]
  }'
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `tunnel_id` | string | Tunnel endpoint identifier, created in Platform tunnel settings. |
| `CONTROL_PLANE_API_KEY` | env var | Runtime API key used for control-plane authentication. |
| `--profile` | flag | Named local profile grouping the tunnel-client configuration. |
| `--mcp-command` | flag | Launches a local MCP server over stdio for tunneling. |
| `--mcp-server-url` | flag | Points to a local HTTP MCP server instead of a stdio command. |

## Notes

- Source: https://developers.openai.com/api/docs/guides/secure-mcp-tunnels (fetched 2026-11-14).
- Scope: supports private MCP connections, including custom MCP server testing; it does not support public plugin submission or distribution (public plugins need a stable, publicly reachable HTTPS MCP endpoint, e.g. a public HTTPS proxy).
- Prerequisites: a `tunnel_id` from Platform tunnel settings, a runtime API key for `tunnel-client`, and an MCP server reachable over stdio or HTTP from inside your network. Download the latest release from openai/tunnel-client (keep runbooks on the latest-release URL); start with `tunnel-client help quickstart`. Keep `tunnel-client run` healthy: app discovery and tool calls depend on it. It exposes `/healthz`, `/readyz`, `/metrics`, and a loopback-only (by default) admin UI at `/ui`; raw HTTP logging is off by default and support exports are redacted.
- A tunnel can be associated with one or more Platform organizations or ChatGPT workspaces; use the same `tunnel_id` for `tunnel-client`. A tunnel associated only with a personal Platform organization does not automatically appear in an Enterprise/Edu workspace; if automatic linking fails contact your OpenAI account team for a reviewed manual association override.
- Default limits: 1,000 tunnels per ChatGPT workspace and per Platform organization; 600 MCP requests per minute (10/s sustained) per tunnel ID + calling application ID (more `tunnel-client` processes do not multiply it); 10 MiB (10,485,760 bytes) per serialized request or response envelope; 120 seconds absolute request deadline including queue time; 1,000 pending queued requests per tunnel. These are service protections, not throughput or latency guarantees.
- ChatGPT: in ChatGPT Plugins use Add custom MCP server with Connection set to Tunnel; the tunnel must be associated with the target workspace and the creator needs Tunnels Read + Use.
- Troubleshooting: "Tunnels access required" means missing organization-level permission (Read to view, Read + Manage to create/edit/delete, Use to run the client or select a tunnel; allow up to 30 minutes for role propagation). If discovery or calls fail, confirm `tunnel-client run` is running and re-run `tunnel-client doctor --profile <name> --explain`; if the client is disconnected, requests fail until it reconnects.
- OAuth: discovery can travel through the tunnel, but the authorization server itself is not tunneled; it must be reachable from the public internet and the `tunnel-client` host.
- Security: supports outbound proxies, custom CA bundles, control-plane client certificates, and MCP-side mTLS. Tunnel transport requests are not emitted as ChatGPT Compliance Platform app events; normal app-level compliance logging still applies.
- Common deployments: Kubernetes sidecar, dedicated Kubernetes deployment, or a VM / systemd service in the same trust boundary as the MCP server.
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
