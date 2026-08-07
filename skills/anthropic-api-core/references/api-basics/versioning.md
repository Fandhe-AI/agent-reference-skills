<!-- source: https://platform.claude.com/docs/en/api/versioning / last verified: 2026-08-07 -->

# Versions

Every API request must send an `anthropic-version` header (e.g. `anthropic-version: 2023-06-01`); client SDKs set this automatically.

## Signature / Usage

```
anthropic-version: 2023-06-01
```

## Options / Props

| Version | Notes |
|---|---|
| `2023-06-01` | New incremental SSE streaming format (deltas, not cumulative text); all events are named SSE events; removed `data: [DONE]`; removed legacy `exception`/`truncated` response values |
| `2023-01-01` | Initial release |

## Notes

- Within a given version, Anthropic preserves existing input and output parameters.
- Anthropic may still add optional inputs, add output values, change error conditions, or add new enum-like output variants (e.g. streaming event types) without a version bump — following documented usage will not break.
- Previous versions are deprecated and may be unavailable for new users; use the latest version whenever possible.

## Related

- [overview](./overview.md)
- [errors](./errors.md)
