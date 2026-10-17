---
source: https://modelcontextprotocol.io/registry/package-types
---

# Package Types

The MCP Registry supports several package types, each with its own ownership verification method.

## Signature / Usage

```json
{
  "$schema": "https://static.modelcontextprotocol.io/schemas/2025-12-11/server.schema.json",
  "name": "io.github.username/image-processor-mcp",
  "title": "Image Processor",
  "description": "Process and transform images with various filters",
  "version": "1.0.0",
  "packages": [
    {
      "registryType": "mcpb",
      "identifier": "https://github.com/username/image-processor-mcp/releases/download/v1.0.0/image-processor.mcpb",
      "fileSha256": "fe333e598595000ae021bd27117db32ec69af6987f507ba7a63c90638ff633ce",
      "transport": {
        "type": "stdio"
      }
    }
  ]
}
```

## Options / Props

| registryType | Supported registry | `identifier` | Ownership verification |
| --- | --- | --- | --- |
| `npm` | npm public registry (`https://registry.npmjs.org`) only | package name, e.g. `@username/email-integration-mcp` | `mcpName` in `package.json` **MUST** match the `server.json` name |
| `pypi` | official PyPI (`https://pypi.org`) only | package name, e.g. `database-query-mcp` | `mcp-name: $SERVER_NAME` string in the package README (may be in a comment); **MUST** match |
| `nuget` | official NuGet (`https://api.nuget.org/v3/index.json`) only | e.g. `Username.AzureDevOpsMcp` | `mcp-name: $SERVER_NAME` string in the package README (may be in a comment); **MUST** match |
| `oci` | Docker Hub (`docker.io`), GitHub Container Registry (`ghcr.io`), Google Artifact Registry (`*.pkg.dev`), Azure Container Registry (`*.azurecr.io`), Microsoft Container Registry (`mcr.microsoft.com`) | `registry/namespace/repository:tag` (tag can also be a digest), e.g. `docker.io/user/app:1.0.0` | `io.modelcontextprotocol.server.name` annotation **MUST** match |
| `mcpb` | MCPB artifacts hosted via GitHub or GitLab releases | artifact URL | URL **MUST** contain the string "mcp"; `fileSha256` **MUST** be present |

Ownership verification snippets:

```json
{
  "name": "@username/email-integration-mcp",
  "version": "1.0.0",
  "mcpName": "io.github.username/email-integration-mcp"
}
```

```markdown
<!-- mcp-name: io.github.username/database-query-mcp -->
```

```dockerfile
LABEL io.modelcontextprotocol.server.name="io.github.username/kubernetes-manager-mcp"
```

```bash
openssl dgst -sha256 image-processor.mcpb
```

## Notes

- The MCPB package URL (`identifier`) **MUST** contain the string "mcp", either as part of the `.mcpb` file extension or in the repository name.
- The registry does not validate `fileSha256`; MCP clients **do** validate the hash before installation. Downstream registries may add their own validation.
- Distance: the `mcpb` package type here is registry metadata only; Windows MCPB host integration (MCP host / ODR) is covered in windows-ai.
- Source: tag `2026-07-28` raw, retrieved 2026-10-16 (unversioned site path). Preview status: breaking changes or data resets may occur.

## Related

- [server.json](./server-json.md)
- [MCP Registry](./registry-about.md)
