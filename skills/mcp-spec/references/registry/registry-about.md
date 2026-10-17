---
source: https://modelcontextprotocol.io/registry/about
---

# MCP Registry

The MCP Registry is the official centralized metadata repository for publicly accessible MCP servers, backed by contributors such as Anthropic, GitHub, PulseMCP, and Microsoft. It hosts metadata (not artifacts) in a standardized `server.json` format.

## Signature / Usage

The registry provides: a single place to publish server metadata, namespace management through DNS verification, a REST API for MCP clients and aggregators, and standardized installation and configuration information.

```json
{
  "$schema": "https://static.modelcontextprotocol.io/schemas/2025-12-11/server.schema.json",
  "name": "io.github.username/email-integration-mcp",
  "title": "Email Integration",
  "description": "Send emails and manage email accounts",
  "version": "1.0.0",
  "packages": [
    {
      "registryType": "npm",
      "identifier": "@username/email-integration-mcp",
      "version": "1.0.0",
      "transport": {
        "type": "stdio"
      }
    }
  ]
}
```

`server.json` contains: the server's unique name (e.g. `io.github.user/server-name`), where to locate the server (npm package name, remote server URL), execution instructions (command-line args, env vars), and other discovery data (description, capabilities).

## Notes

- The MCP Registry is currently in preview. Breaking changes or data resets may occur before general availability.
- Package registries (npm, PyPI, Docker Hub) host code and binaries; the MCP Registry hosts metadata that points to those packages.
- Open-source and closed-source servers are supported if the installation method is publicly available or the server itself is publicly accessible. Private servers are **not** supported; host your own private MCP registry for those.
- The registry is intended to be consumed primarily by downstream aggregators (e.g. server marketplaces), not directly by host applications. Hosts should consume other registries via a REST API conforming to the official registry's OpenAPI spec.
- The official registry codebase is **not** designed for self-hosting; maintainers cannot provide support for forks.
- Server names use reverse DNS format (`io.github.username/server`, `com.example/server`), tied to verified GitHub accounts or domains.
- Security scanning is delegated to underlying package registries and downstream aggregators. Spam prevention: namespace authentication, character limits and regex validation, manual takedown.
- Source: tag `2026-07-28` raw, retrieved 2026-10-16 (unversioned site path).
- Distance: this skill covers the registry metadata format only; host-side server configuration (e.g. `.mcp.json`) lives in the host skills such as anthropic-claude-code-extend.

## Related

- [Package Types](./package-types.md)
- [Registry Authentication](./registry-authentication.md)
- [Registry Aggregators](./registry-aggregators.md)
- [server.json](./server-json.md)
