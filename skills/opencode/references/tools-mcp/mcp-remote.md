---
source: https://opencode.ai/docs/mcp-servers/#remote
---

# MCP servers: Remote

A remote server uses the MCP Streamable HTTP transport and requires an absolute URL.

## Signature / Usage

```sh
opencode mcp add context7 --url https://mcp.context7.com/mcp
```

Pass request headers with repeated `--header` flags. Quote `{env:NAME}` references so the shell writes them literally:

```sh
opencode mcp add context7 --url https://mcp.context7.com/mcp --header 'CONTEXT7_API_KEY={env:CONTEXT7_API_KEY}'
```

Use configuration for other options. Store secrets in environment variables rather than in the file:

```jsonc title="opencode.jsonc"
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "servers": {
      "context7": {
        "type": "remote",
        "url": "https://mcp.context7.com/mcp",
        "oauth": false,
        "headers": {
          "CONTEXT7_API_KEY": "{env:CONTEXT7_API_KEY}",
        },
      },
    },
  },
}
```

Use `oauth: false` only when the server exclusively uses an API key or another header credential:

```jsonc
{
  "type": "remote",
  "url": "https://mcp.example.com/mcp",
  "oauth": false,
  "headers": { "Authorization": "Bearer {env:MCP_API_KEY}" },
}
```

## Options / Props

| Field | Required | Description |
| --- | --- | --- |
| `type` | Yes | Must be `"remote"`. |
| `url` | Yes | Absolute Streamable HTTP endpoint. |
| `headers` | No | String HTTP headers sent to the endpoint. |
| `oauth` | No | OAuth settings, or `false` to disable OAuth. |
| `disabled` | No | Prevents connection when `true`. Defaults to `false`. |
| `codemode` | No | Set to `false` to expose tools directly instead of through Code Mode. Defaults to `true`. |
| `timeout` | No | Per-server timeout overrides. |
| `protocol` | No | `legacy` (default), `auto`, or `2026-07-28`. See Protocol version. |
| `pool` | No | Share one connection across directories. Defaults to `false`. See Shared connections. |

## Notes

- Keep secrets in environment variables (`{env:NAME}`), not in committed config.
- Protocol spec is `mcp-spec`; Claude Code and Codex MCP setup are in other skills.

## Related

- [mcp-overview.md](./mcp-overview.md)
- [mcp-oauth.md](./mcp-oauth.md)
- [mcp-local.md](./mcp-local.md)
