# Reasoning models

Reasoning models (e.g. GPT-5.6) use internal reasoning tokens before producing a response, improving planning, tool use, and multi-step tasks. Work best via the Responses API.

## Signature / Usage

```python
response = client.responses.create(
    model="gpt-5.6",
    reasoning={"effort": "low"},
    input=[{"role": "user", "content": prompt}],
)
print(response.output_text)
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| reasoning.effort | `none` \| `minimal` \| `low` \| `medium` \| `high` \| `xhigh` \| `max` | model-dependent (`gpt-5.5` defaults to `medium`) | How much the model thinks before responding; supported values are model-dependent |
| reasoning.mode | `standard` \| `pro` | `standard` | GPT-5.6 only; `pro` does more model work for harder tasks (higher latency/cost), independent of `effort` |
| reasoning.context | `auto` \| `current_turn` \| `all_turns` | `auto` (→ model default) | Whether reasoning items from earlier turns are rendered into the next sample; GPT-5.6 defaults to `all_turns`, earlier models to `current_turn` |
| reasoning.summary | `auto` \| `concise` \| `detailed` | — | Opt in to a summary of the model's reasoning in the `reasoning` output item's `summary` array |
| max_output_tokens | integer | — | Caps total generated tokens (reasoning + visible + formatting); insufficient budget yields `status: incomplete` with `incomplete_details.reason: max_output_tokens` |
| phase (per assistant message item) | `commentary` \| `final_answer` | — | GPT-5.5/5.4 only; marks intermediate updates vs the completed answer to avoid early stopping |

## Notes

- Reasoning tokens are billed as output tokens and occupy context window space, but are not returned as raw text (only optional summaries). OpenAI recommends reserving ≥25,000 tokens for reasoning + output when starting out.
- When function calling with a reasoning model, pass back all reasoning items since the last `user` message (via `previous_response_id`, or by replaying all `output` items) so the model can continue reasoning efficiently.
- In stateless mode (`store: false` or ZDR orgs), reasoning items include `encrypted_content` by default — replay them to preserve reasoning continuity without server-side storage.
- `reasoning.context: all_turns` only has an effect when the request can see earlier response items (`previous_response_id`, a Conversation, or manually replayed history); on the first request `current_turn` and `all_turns` behave the same.
- Organization verification may be required before using reasoning summaries with the latest models.

## Related

- [reasoning-best-practices](./reasoning-best-practices.md)
- [conversation-state](./conversation-state.md)
