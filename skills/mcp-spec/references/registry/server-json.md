---
source: https://modelcontextprotocol.io/registry/quickstart
---

# server.json

Publishing flow for the MCP Registry using the `mcp-publisher` CLI: add verification info to the package, publish the package, create `server.json`, authenticate, publish.

## Signature / Usage

`mcp-publisher init` generates a `server.json` template:

```json
{
  "$schema": "https://static.modelcontextprotocol.io/schemas/2025-12-11/server.schema.json",
  "name": "io.github.my-username/weather",
  "description": "An MCP server for weather information.",
  "repository": {
    "url": "https://github.com/my-username/mcp-weather-server",
    "source": "github"
  },
  "version": "1.0.0",
  "packages": [
    {
      "registryType": "npm",
      "identifier": "@my-username/mcp-weather-server",
      "version": "1.0.0",
      "transport": {
        "type": "stdio"
      },
      "environmentVariables": [
        {
          "description": "Your API key for the service",
          "isRequired": true,
          "format": "string",
          "isSecret": true,
          "name": "YOUR_API_KEY"
        }
      ]
    }
  ]
}
```

Publish steps (from the quickstart):

```bash
mcp-publisher init
mcp-publisher login github
mcp-publisher publish
curl "https://registry.modelcontextprotocol.io/v0.1/servers?search=io.github.my-username/weather"
```

`mcp-publisher` commands: `init` (create a server.json template), `login` (authenticate with the registry), `logout` (clear saved authentication), `publish` (publish server.json to the registry).

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `$schema` | string | `https://static.modelcontextprotocol.io/schemas/2025-12-11/server.schema.json` in the quickstart |
| `name` | string | Server name in the registry; **must** match `mcpName` in `package.json` for npm |
| `description` | string | Server description |
| `repository` | object | `url` and `source` (e.g. `github`) |
| `version` | string | Server version |
| `packages` | array | Items with `registryType`, `identifier`, `version`, `transport`, optional `environmentVariables` (`description`, `isRequired`, `format`, `isSecret`, `name`) |

## Notes

- The registry hosts only metadata; publish the package (e.g. to npm) first.
- For npm, add `mcpName` to `package.json` (e.g. `"mcpName": "io.github.my-username/weather"`). With GitHub authentication, `mcpName` **must** start with `io.github.my-username/`.
- The `name` property in `server.json` **must** match the `mcpName` property in `package.json`.
- Troubleshooting: "Registry validation failed for package" means required validation info is missing (e.g. `mcpName`); "Invalid or expired Registry JWT token" means re-run `mcp-publisher login github`; "You do not have permission to publish this server" means the authentication method does not match the server name namespace.
- Installing `mcp-publisher` via the documented `curl ... | tar xz ... && sudo mv` downloads a release binary; review before running. `brew install mcp-publisher` is also documented.
- The field list above is limited to the fields shown in the quickstart examples; the full schema is the `server.schema.json` linked from the registry docs and is not reproduced in the source pages.
- Source: tag `2026-07-28` raw, retrieved 2026-10-16 (unversioned site path). Preview status: breaking changes or data resets may occur.

## Related

- [MCP Registry](./registry-about.md)
- [Package Types](./package-types.md)
- [Registry Authentication](./registry-authentication.md)
- [Remote Servers](./remote-servers.md)
- [Registry Versioning](./registry-versioning.md)
