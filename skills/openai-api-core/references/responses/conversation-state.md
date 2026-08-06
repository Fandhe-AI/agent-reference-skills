# Conversation state

Manage multi-turn conversation state with the Responses API, either manually, via the Conversations API, or by chaining `previous_response_id`.

## Signature / Usage

```python
res1 = client.responses.create(
    model="gpt-5.6", input="What is the capital of France?", store=True
)

res2 = client.responses.create(
    model="gpt-5.6",
    input="And its population?",
    previous_response_id=res1.id,
    store=True,
)
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| previous_response_id | string | — | Chains a new response onto a prior response's context; all previous input tokens in the chain are still billed as input tokens |
| store | boolean | true | Whether the response is persisted server-side; required for `previous_response_id` chaining |

## Notes

- Three state-management approaches: (1) manually resupply the full message history each request, (2) use the **Conversations API** to persist a durable conversation object across sessions/devices/jobs, (3) chain responses with `previous_response_id`.
- For reasoning models, preserve every item in the response's `output` array (not just the text) when manually replaying context, since the API returns encrypted reasoning items by default.
- Context window = total tokens usable for both input and output; check the model page for per-model output token limits (e.g. `gpt-4o-2024-08-06` supports up to 16,384 output tokens within a 128k context window). Use a tokenizer to estimate usage and avoid truncated outputs.
- See [reasoning](./reasoning.md) for how `reasoning.context` (`current_turn` vs `all_turns`) interacts with conversation chaining, and [compaction](./compaction.md) for reducing context size in long-running conversations.

## Related

- [reasoning](./reasoning.md)
- [compaction](./compaction.md)
- [Migrate Chat Completions to Responses](../legacy-migration/migrate-chat-completions-to-responses.md)
