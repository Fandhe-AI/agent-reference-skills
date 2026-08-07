# Assistants to Responses Migration

The Assistants API is deprecated (announced August 26, 2025) with a sunset date of **August 26, 2026**; new and existing integrations should move to the Responses API and Conversations API.

## Signature / Usage

```python
# Assistants-era concepts map onto Responses/Conversations primitives.
# See the mapping table below for the concept-to-concept translation.
```

## Options / Props

| Legacy (Assistants API) | New (Responses API) | Benefit |
|--------------------------|----------------------|---------|
| Assistants | Prompts | Prompts hold configuration (model, tools, instructions) and are easier to version and update |
| Threads | Conversations | Store diverse Item types beyond plain messages |
| Runs | Responses | Simpler input/output model with explicit tool management (no polling) |
| Run steps | Items | Generalized objects supporting messages, tool calls, and outputs |

## Notes

- The Responses API eliminates asynchronous run polling: instead of repeatedly checking run status, send input Items and receive output Items directly in a single call.
- Migration is not automated: identify existing Assistants, recreate their instruction/tool configuration as named Prompts in the dashboard, and store the Prompt IDs in version control.
- For Threads, the recommended approach is to route new conversations through the Conversations API going forward and backfill/convert legacy thread messages into conversation Items only as needed (rather than a bulk one-shot migration).
- Responses/Conversations unlock capabilities unavailable to Assistants: deep research, MCP (Model Context Protocol) support, and computer use.
- Responses API already has Assistant-like and Thread-like objects; see also the general [Migrate Chat Completions to Responses](./migrate-chat-completions-to-responses.md) guide for the underlying Item/streaming/function-calling model shared by both migrations.

## Related

- [Migrate Chat Completions to Responses](./migrate-chat-completions-to-responses.md)
- [Responses API vs. Chat Completions API](./responses-vs-chat-completions.md)
- [Deprecations](./deprecations.md)
