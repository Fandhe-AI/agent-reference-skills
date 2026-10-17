---
source: https://modelcontextprotocol.io/registry/remote-servers
---

# Remote Servers

Remote MCP servers are published via the `remotes` property in `server.json`.

## Signature / Usage

```json
{
  "$schema": "https://static.modelcontextprotocol.io/schemas/2025-12-11/server.schema.json",
  "name": "com.example/acme-analytics",
  "title": "ACME Analytics",
  "description": "Real-time business intelligence and reporting platform",
  "version": "2.0.0",
  "remotes": [
    {
      "type": "streamable-http",
      "url": "https://analytics.example.com/mcp"
    }
  ]
}
```

## Options / Props

`remotes` entry properties shown in the source:

| Name | Type | Description |
| --- | --- | --- |
| `type` | `"streamable-http"` \| `"sse"` | Transport type |
| `url` | string | Endpoint URL; may contain `{curly_braces}` template variables |
| `variables` | object | URL template variables, each with `description`, `isRequired`, and optionally `default`, `choices`, `isSecret` |
| `headers` | array | HTTP headers clients are instructed to send; items have `name`, `description`, `isRequired`, `isSecret` |

URL template variables:

```json
{
  "type": "streamable-http",
  "url": "https://api.example.com/{region}/mcp",
  "variables": {
    "region": {
      "description": "Deployment region",
      "isRequired": true,
      "choices": ["us-east-1", "eu-west-1", "ap-southeast-1"],
      "default": "us-east-1"
    }
  }
}
```

HTTP headers:

```json
{
  "type": "streamable-http",
  "url": "https://analytics.example.com/mcp",
  "headers": [
    {
      "name": "X-API-Key",
      "description": "API key for authentication",
      "isRequired": true,
      "isSecret": true
    }
  ]
}
```

## Notes

- A remote server **MUST** be publicly accessible at its specified URL.
- Remote servers should use the Streamable HTTP transport. The SSE transport is deprecated, so publish an `"sse"` remote only to support existing clients. A server can support both transports at different URLs.
- `remotes` can coexist with `packages` in `server.json` so host applications can choose the installation method.
- Source: tag `2026-07-28` raw, retrieved 2026-10-16 (unversioned site path). Preview status: breaking changes or data resets may occur.

## Related

- [server.json](./server-json.md)
- [Package Types](./package-types.md)
- [Registry Versioning](./registry-versioning.md)
