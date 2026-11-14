---
source: https://modelcontextprotocol.io/registry/faq
---

# Registry FAQ

Answers on registry terminology, unpublishing, metadata updates, custom metadata and abuse reporting for the official MCP Registry.

## Signature / Usage

Custom publisher metadata is preserved when it sits under `_meta.io.modelcontextprotocol.registry/publisher-provided` in `server.json`.

Adapted (not in the official docs): the FAQ describes this key in prose only; the snippet below is a minimal illustration of its placement and the field values are placeholders.

```json
{
  "name": "io.github.my-username/weather",
  "version": "1.0.1",
  "_meta": {
    "io.modelcontextprotocol.registry/publisher-provided": {
      "buildInfo": "example"
    }
  }
}
```

## Options / Props

| Term | Meaning |
| --- | --- |
| "MCP Registry API" | An API that implements the OpenAPI spec defined by the MCP Registry |
| "Official MCP Registry API" | The REST API served at `https://registry.modelcontextprotocol.io`, a superset of the MCP Registry API (OpenAPI spec at `https://registry.modelcontextprotocol.io/openapi.yaml`) |
| "MCP registry" | A third-party service that provides an MCP Registry API |
| "Official MCP Registry" / "The MCP Registry" | The service that lives at `https://registry.modelcontextprotocol.io` |

## Notes

- Deleting / unpublishing a server: currently not possible (open discussion at `https://github.com/modelcontextprotocol/registry/issues/104` at the time of writing).
- Updating metadata: submit a new `server.json` with a unique version string. Published version metadata is immutable (similar to npm).
- Custom metadata under `_meta.io.modelcontextprotocol.registry/publisher-provided` has a 4KB size limit (4096 bytes of JSON); publishing fails if exceeded.
- Reporting a spam or malicious server: report it as abuse to the underlying package registry (NPM, PyPI, DockerHub, etc.), and raise a GitHub issue on the registry repository with a title beginning `Abuse report: `.
- Reporting a security vulnerability in the registry itself: follow the MCP community `SECURITY.md` (`https://github.com/modelcontextprotocol/.github/blob/main/SECURITY.md`).
- The registry is in preview; breaking changes or data resets may occur before general availability.
- Source: https://raw.githubusercontent.com/modelcontextprotocol/modelcontextprotocol/2026-07-28/docs/registry/faq.mdx (tag `2026-07-28`, retrieved 2026-11-14; unversioned site path `/registry/faq`).

## Related

- [MCP Registry](./registry-about.md)
- [Registry Versioning](./registry-versioning.md)
- [Moderation Policy](./registry-moderation-policy.md)
