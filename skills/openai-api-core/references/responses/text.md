# Text generation

Generate text from a prompt using the Responses API — the recommended entry point for model requests (code, JSON, prose, etc.).

## Signature / Usage

```python
from openai import OpenAI

client = OpenAI()

response = client.responses.create(
    model="gpt-5.6",
    input="Write a one-sentence bedtime story about a unicorn.",
)

print(response.output_text)
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| model | string | — | Model ID to use, e.g. `gpt-5.6` |
| input | string \| array | — | Prompt string, or an array of input message/Items |
| instructions | string | — | High-level instructions (tone, goals); takes priority over `input`, applies only to the current request (not carried by `previous_response_id`) |
| reasoning.effort | string | model-dependent | Reasoning depth hint (see reasoning guide) |

## Notes

- The `output` array often contains more than a single message item — it can include reasoning items, tool calls, etc. Do not assume the text is at `output[0].content[0].text`; use the SDK's `output_text` convenience property instead.
- For structured JSON output, use [Structured Outputs](https://developers.openai.com/api/docs/guides/structured-outputs) (out of scope here — see the structured-streaming category).
- Message roles: `developer` (highest priority, application-level), `user` (end-user, lower priority), `assistant` (model-generated). Think of `developer` as a function definition and `user` as its arguments.
- Reusable prompt objects (`v1/prompts`) are being deprecated; prefer keeping prompt builders as code near the feature they support.
- Reasoning models (e.g. `gpt-5.6`) perform better via the Responses API than Chat Completions.

## Related

- [conversation-state](./conversation-state.md)
- [reasoning](./reasoning.md)
- [Migrate Chat Completions to Responses](../legacy-migration/migrate-chat-completions-to-responses.md)
