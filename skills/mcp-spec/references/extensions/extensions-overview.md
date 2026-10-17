---
source: https://modelcontextprotocol.io/extensions/overview
---

# Extensions Overview

MCP extensions are optional additions to the specification that define capabilities beyond the core protocol. They may be modular (e.g., authentication), specialized (industry-specific logic), or experimental (incubated for potential core inclusion).

## Signature / Usage

Extensions are identified by an _extension identifier_ with the format `{vendor-prefix}/{extension-name}`, e.g. `io.modelcontextprotocol/oauth-client-credentials`. Clients advertise support in `_meta["io.modelcontextprotocol/clientCapabilities"]` within each request:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "get_weather",
    "arguments": {
      "location": "New York"
    },
    "_meta": {
      "io.modelcontextprotocol/protocolVersion": "2026-07-28",
      "io.modelcontextprotocol/clientCapabilities": {
        "extensions": {
          "io.modelcontextprotocol/ui": {
            "mimeTypes": ["text/html;profile=mcp-app"]
          }
        }
      },
      "io.modelcontextprotocol/clientInfo": {
        "name": "ExampleClient",
        "version": "1.0.0"
      }
    }
  }
}
```

Servers advertise extension support in the `server/discover` response:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "resultType": "complete",
    "supportedVersions": ["2026-07-28"],
    "capabilities": {
      "tools": {},
      "extensions": {
        "io.modelcontextprotocol/ui": {}
      }
    },
    "_meta": {
      "io.modelcontextprotocol/serverInfo": {
        "name": "ExampleServer",
        "version": "1.0.0"
      }
    },
    "ttlMs": 3600000,
    "cacheScope": "public"
  }
}
```

Each extension specifies the schema of its settings object; an empty object indicates no settings.

### Official extensions

| Extension | Repository | Description |
| --- | --- | --- |
| OAuth Client Credentials | `modelcontextprotocol/ext-auth` | OAuth 2.0 client credentials flow for machine-to-machine authentication. |
| Enterprise-Managed Authorization | `modelcontextprotocol/ext-auth` | Framework for enterprise environments requiring centralized access control. |
| MCP Apps | `modelcontextprotocol/ext-apps` | Allows MCP Servers to display interactive UI elements (charts, forms, video players) inline within conversations. |
| MCP Tasks | (see tasks page) | Asynchronous task execution for long-running operations, with polling, mid-flight input, and durable handles. |

## Notes

- Source: tag `2026-07-28` raw, retrieved 2026-10-16 (unversioned site path `/extensions/`).
- Official extensions use the `io.modelcontextprotocol` vendor prefix and live in repositories with the `ext-` prefix in the Model Context Protocol GitHub organization. Third-party extensions SHOULD use a reversed domain name they own as the vendor prefix (e.g., `com.example/my-extension`).
- Experimental extensions live in repositories with the `experimental-ext-` prefix, must be associated with a Working Group or Interest Group, and must clearly indicate their experimental status. Graduation to official status goes through the standard SEP process (Extensions Track).
- Official extension lifecycle: Propose (SEP, Extensions Track) -> Implement (at least one reference implementation in an official SDK) -> Review (Core Maintainers) -> Publish (PR to the extension repository) -> Adopt. Extension specifications need to use RFC 2119 language.
- SDKs can choose to implement extensions; it is not required for protocol conformance. Extensions are always disabled by default and require explicit opt-in from the developer.
- Evolution: prefer capability flags or versioning within the extension settings object; if a breaking change is unavoidable, use a new identifier (e.g., `io.modelcontextprotocol/my-extension-v2`). Breaking changes: removing or renaming fields, changing field types, altering semantics, adding new required fields.
- Graceful degradation: if one side does not support an extension, the supporting side either falls back to core protocol behavior or rejects the request with an appropriate error if the extension is mandatory.
- This skill covers the protocol and its official extensions; host-side configuration and SDK usage live in the host skills (anthropic-claude-code-extend, anthropic-api-tools-mcp, openai-agents, openai-apps-sdk).

## Related

- [Extension Client Matrix](./client-matrix.md)
- [MCP Apps](./mcp-apps.md)
- [Tasks Extension](./tasks.md)
- [Authorization Extensions](./auth-extensions.md)
