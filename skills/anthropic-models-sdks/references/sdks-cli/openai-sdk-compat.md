<!-- source: https://platform.claude.com/docs/en/cli-sdks-libraries/libraries/openai-sdk / last verified: 2026-08-07 -->

# OpenAI SDK compatibility

A compatibility layer that lets you use the OpenAI SDK to test the Claude API by changing the base URL, API key, and model name.

## Signature / Usage

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("ANTHROPIC_API_KEY"),
    base_url="https://api.anthropic.com/v1/",
)

response = client.chat.completions.create(
    model="claude-opus-5",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Who are you?"},
    ],
)
print(response.choices[0].message.content)
```

```typescript
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "ANTHROPIC_API_KEY",
  baseURL: "https://api.anthropic.com/v1/"
});

const response = await openai.chat.completions.create({
  messages: [{ role: "user", content: "Who are you?" }],
  model: "claude-opus-5"
});
```

Thinking support via `extra_body`:

```python
response = client.chat.completions.create(
    model="claude-sonnet-4-6",
    messages=[{"role": "user", "content": "Who are you?"}],
    extra_body={"thinking": {"type": "enabled", "budget_tokens": 2000}},
)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `strict` (tools/functions) | bool | Ignored — schema conformance not guaranteed; use native Structured Outputs instead |
| `response_format` | object | Ignored |
| `n` | int | Must be exactly `1` |
| `temperature` | float | 0–1 inclusive; values above 1 are capped at 1 |
| `logprobs`, `metadata`, `prediction`, `presence_penalty`, `frequency_penalty`, `seed`, `service_tier`, `audio`, `logit_bias`, `store`, `user`, `modalities`, `top_logprobs`, `reasoning_effort` | — | Ignored |
| `model`, `max_tokens`, `max_completion_tokens`, `stream`, `stream_options`, `top_p`, `parallel_tool_calls`, `stop` | — | Fully supported |

## Notes

- Primarily intended for testing and comparing model capabilities, not a long-term production solution. For full feature access (PDF processing, citations, thinking, prompt caching) use the native Claude API.
- System/developer messages across a conversation are hoisted and concatenated with `\n` into a single initial system message, since Anthropic supports only one.
- Audio input is not supported and is stripped; prompt caching is not supported (it is supported in the native Anthropic SDKs).
- Response `choices[]` always has length 1; `usage.completion_tokens_details`/`prompt_tokens_details`, `logprobs`, `service_tier`, `system_fingerprint` are always empty.
- Rate limits follow Anthropic's standard `/v1/messages` limits.
- This is a compatibility layer for testing against the OpenAI SDK surface. For OpenAI's own product documentation, see openai-api-core.

## Related

- [CLI, SDKs, and libraries](./overview.md)
- [Python SDK](./sdk-python.md)
- [TypeScript SDK](./sdk-typescript.md)
