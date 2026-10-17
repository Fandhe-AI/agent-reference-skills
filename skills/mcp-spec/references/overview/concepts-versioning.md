---
source: https://modelcontextprotocol.io/docs/2026-07-28/learn/versioning
---

# Versioning (concepts)

Version identifiers (`YYYY-MM-DD`), revision states (Draft / Current / Final), feature states, and per-request version negotiation.

## Signature / Usage

Every request declares its protocol version in `_meta`:

```json
{
  "_meta": {
    "io.modelcontextprotocol/protocolVersion": "2026-07-28"
  }
}
```

On Streamable HTTP the same value is also carried in the `MCP-Protocol-Version` header.

## Options / Props

| Revision state | Meaning |
|----------------|---------|
| Draft | In-progress specifications, not yet ready for consumption |
| Current | The current protocol version, ready for use; may continue to receive backwards compatible changes |
| Final | Past, complete specifications that will not be changed |

## Notes

- Version strings use `YYYY-MM-DD`, indicating the last date backwards incompatible changes were made. The version is not incremented for backwards compatible changes.
- Features may be marked Deprecated under the feature lifecycle policy; they remain at least twelve months (at least ninety days under the expedited-removal exception) before becoming eligible for removal, after which they may be Removed in a future revision.
- Each request declares its version and the server accepts or rejects it independently. If unsupported, the server responds with `UnsupportedProtocolVersionError` listing supported versions; the client retries with a mutually supported version or surfaces an error. Clients and servers MAY support multiple versions simultaneously.
- Clients can call the mandatory `server/discover` RPC for supported versions, capabilities and identity in one request; calling it is optional.
- Replaced in 2026-07-28: version negotiation via `initialize` (handshake-based revisions `2025-11-25` and earlier) is replaced by per-request negotiation.
- Source inconsistency: this page (tag `2026-07-28`) still states "The **current** protocol version is **2025-11-25**". The specification pages in the same tag describe 2026-07-28; the statement is reproduced as published.

## Related

- [Feature Lifecycle](./feature-lifecycle.md)
- [Key Changes (2026-07-28)](./key-changes.md)
- [Deprecated Features](./deprecated-features.md)
