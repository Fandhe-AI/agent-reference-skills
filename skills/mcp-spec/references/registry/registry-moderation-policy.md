---
source: https://modelcontextprotocol.io/registry/moderation-policy
---

# Registry Moderation Policy

The official MCP Registry is permissive: it only removes illegal content, malware, spam and completely broken servers.

## Signature / Usage

Removal sets the server's `status` to `"deleted"` while its metadata stays reachable via the registry API. Illustration of the resulting field:

Adapted (not in the official docs): the policy states this in prose only; the snippet is a minimal illustration of the `status` field.

```json
{
  "name": "io.github.my-username/weather",
  "status": "deleted"
}
```

## Options / Props

| Removed | Not removed |
| --- | --- |
| Illegal content (obscene content, copyright violations, hacking tools) | Low-quality or buggy servers |
| Malware, regardless of intentions | Servers with security vulnerabilities |
| Spam (e.g. the same server submitted under different names, fixed-response servers with marketing copy, marketing-stuffed descriptions with unrelated implementation) | Servers that do the same thing as other servers |
| Non-functioning servers | Servers that provide or contain adult content |

## Notes

- Scope: the official MCP Registry at `registry.modelcontextprotocol.io`. Subregistries may have their own moderation policies.
- No moderation guarantees: consumers should assume minimal-to-no moderation and treat scraped data accordingly. The project relies on upstream package registries (NPM, PyPI, Docker) and downstream subregistries for in-depth moderation.
- In extreme cases (e.g. unlawful metadata) the server's metadata may be overwritten or erased.
- Appeals: open an issue on `https://github.com/modelcontextprotocol/registry` with the server name and why it does not meet the removal criteria.
- The policy may change in the future. The registry is in preview.
- Source: https://raw.githubusercontent.com/modelcontextprotocol/modelcontextprotocol/2026-07-28/docs/registry/moderation-policy.mdx (tag `2026-07-28`, retrieved 2026-11-14; unversioned site path `/registry/moderation-policy`).

## Related

- [Registry FAQ](./registry-faq.md)
- [MCP Registry](./registry-about.md)
