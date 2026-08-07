<!-- source: https://platform.claude.com/docs/en/api/beta-headers / last verified: 2026-08-07 -->

# Beta headers

Access experimental features and new model capabilities before general availability via the `anthropic-beta` header (or the SDKs' `betas` parameter).

## Signature / Usage

```bash
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "anthropic-beta: files-api-2025-04-14" \
  -H "content-type: application/json" \
  -d '{"model": "claude-opus-5", "max_tokens": 1024, "messages": [{"role":"user","content":"Hello, Claude"}]}'
```

```python
client = Anthropic()
response = client.beta.messages.create(
    model="claude-opus-5",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Hello, Claude"}],
    betas=["files-api-2025-04-14"],
)
```

Multiple beta features: comma-separate in the header (`anthropic-beta: feature1,feature2,feature3`), or pass a list to `betas=[...]` in the SDKs.

## Options / Props

**Endpoint-specific beta headers** (required on every request to these endpoints):

| Endpoints | Beta header |
|---|---|
| `/v1/agents`, `/v1/sessions`, `/v1/environments` | `managed-agents-2026-04-01` |
| `/v1/tunnels` | `mcp-tunnels-2026-06-22` |
| `/v1/memory_stores` and sub-resources | `agent-memory-2026-07-22` |

`agent-memory-2026-07-22` and `managed-agents-2026-04-01` cannot both be sent to memory-store endpoints — the memory-specific header replaces the managed-agents one; sending both returns 400.

## Notes

- SDKs expose a `beta` namespace that sends the header for you automatically; add endpoint-specific headers yourself only for raw HTTP requests.
- Beta feature names follow `feature-name-YYYY-MM-DD`; use the exact documented name.
- Invalid/inaccessible beta name → 400 `invalid_request_error`.
- Beta features may have breaking changes, be deprecated/removed, have different rate limits/pricing, or be region-restricted.

## Related

- [overview](./overview.md)
- [errors](./errors.md)
- [beta](./beta.md)
