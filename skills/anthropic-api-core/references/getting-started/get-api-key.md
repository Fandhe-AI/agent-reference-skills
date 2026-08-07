<!-- source: https://platform.claude.com/docs/en/get-api-key / last verified: 2026-08-07 -->

# Get your Claude API key

Find, create, and manage your API keys for the Claude API in the Claude Console.

## Signature / Usage

```bash
export ANTHROPIC_API_KEY="sk-ant-api03-..."
```

Create a key: Claude Console → Settings → API keys → **Create key** → name it (optionally scope to a workspace and set an expiration) → copy and store the key (starts with `sk-ant-`, shown only once).

## Notes

- Client SDKs read `ANTHROPIC_API_KEY` automatically; direct HTTP requests send the key in the `x-api-key` header.
- If the **Create key** button is disabled, you lack permission in that workspace; ask an org admin.
- Lost keys cannot be viewed again — create a new one instead.
- The Admin API (separate Admin API key) can list/retrieve API keys programmatically but never returns a key's secret value, only a partially redacted hint, and cannot recover a lost key.

## Related

- [get-started](./get-started.md)
