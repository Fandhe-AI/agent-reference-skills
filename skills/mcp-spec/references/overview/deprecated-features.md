---
source: https://modelcontextprotocol.io/specification/2026-07-28/deprecated
---

# Deprecated Features

Registry of specification features currently in the Deprecated state under the feature lifecycle and deprecation policy (SEP-2596).

## Signature / Usage

| Feature | Deprecation SEP | Deprecated in | Migration path | Earliest removal |
|---------|-----------------|---------------|----------------|------------------|
| Roots | SEP-2577 | `2026-07-28` | Pass directories or files via tool parameters, resource URIs, or server configuration | First revision released on or after 2027-07-28 |
| Sampling | SEP-2577 | `2026-07-28` | Integrate directly with LLM provider APIs | First revision released on or after 2027-07-28 |
| Logging | SEP-2577 | `2026-07-28` | Log to `stderr` for stdio transports; use OpenTelemetry for observability | First revision released on or after 2027-07-28 |
| Dynamic Client Registration | PR #2858 | `2026-07-28` | Client ID Metadata Documents | First revision released on or after 2027-07-28 |
| `includeContext: "thisServer"` / `"allServers"` (Sampling) | SEP-2596 | `2025-11-25` | Omit the field or use `"none"` | Follows Sampling (SEP-2577) |
| HTTP+SSE transport | SEP-2596 | `2025-03-26` | Streamable HTTP | Three months after SEP-2596 reaches Final |

```json
{ "includeContext": "none" }
```

(The migration value for deprecated `includeContext` settings, per the table.)

## Notes

- A Deprecated feature remains part of the specification but is scheduled for removal: new implementations **SHOULD NOT** adopt it, and existing implementations **SHOULD** migrate before the feature's earliest removal.
- Earliest removal marks when a feature becomes eligible for removal; the actual removal is a Core Maintainer decision taken during release preparation and may happen later.
- The registry is a derived view kept consistent with the per-feature deprecation notices and changelog entries, which are the normative records.
- HTTP+SSE and the `includeContext` values were already described as deprecated before the lifecycle policy existed; SEP-2596 reclassifies them under its transition provisions.
- Removed: "No features have been removed under this policy yet."
- Deprecated in 2026-07-28 (earliest removal: first revision on or after 2027-07-28): Roots, Sampling, Logging, Dynamic Client Registration.

## Related

- [Feature Lifecycle](./feature-lifecycle.md)
- [Key Changes (2026-07-28)](./key-changes.md)
