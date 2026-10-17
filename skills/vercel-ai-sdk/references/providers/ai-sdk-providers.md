---
source: https://ai-sdk.dev/providers/ai-sdk-providers
---

# AI SDK Providers

The AI SDK comes with several first-party providers for interacting with different language models, plus community providers built on the Language Model Specification. Not all providers support all AI SDK features.

## Signature / Usage

```ts
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

const { text } = await generateText({
  model: openai('gpt-6-astra'),
  prompt: 'Invent a new holiday and describe its traditions.',
});
```

### Provider support

Excerpt of the official capability table (Image Input / Object Generation / Tool Usage / Tool Streaming). Model IDs are copied as written; the table is not exhaustive.

| Provider | Model | Image Input | Object Generation | Tool Usage | Tool Streaming |
| --- | --- | --- | --- | --- | --- |
| OpenAI | `gpt-6-astra` | yes | yes | yes | yes |
| OpenAI | `gpt-5.5` | yes | yes | yes | yes |
| OpenAI | `gpt-4o` | yes | yes | yes | yes |
| Anthropic | `claude-opus-5-5` | yes | yes | yes | yes |
| Anthropic | `claude-sonnet-5-5` | yes | yes | yes | yes |
| Anthropic | `claude-haiku-5-5` | yes | yes | yes | yes |
| Google | `gemini-3.8-flash` | yes | yes | yes | yes |
| Google | `gemini-2.5-pro` | yes | yes | yes | yes |
| Google Vertex | `gemini-3.8-flash` | yes | yes | yes | yes |
| Mistral | `mistral-large-latest` | no | yes | yes | yes |
| Cohere | `command-a-03-2025` | no | yes | yes | yes |
| DeepSeek | `deepseek-v4-pro` | no | yes | yes | yes |
| Groq | `llama-3.3-70b-versatile` | no | yes | yes | yes |
| Together AI | `meta-llama/Meta-Llama-3.3-70B-Instruct-Turbo` | no | no | no | no |
| Fireworks | `accounts/fireworks/models/deepseek-v3` | no | yes | yes | no |
| DeepInfra | `meta-llama/Llama-4-Scout-17B-16E-Instruct` | yes | no | no | no |

The full page also lists xAI Grok, Moonshot AI, Alibaba, Cerebras, Hugging Face, and Baseten rows.

## Notes

- First-party provider pages listed in the site's provider cards but not covered by this skill's references: xAI, Azure, Groq, Mistral, Google Vertex, Cohere, DeepSeek, and others (only AI Gateway, OpenAI, Anthropic, Google, Amazon Bedrock and OpenAI-compatible are recorded here).
- Community providers are created with the Language Model Specification (see `custom-providers` in the community section of the official site).
- Provider packages here are AI SDK adapters; the underlying provider APIs are covered by openai-api-core, anthropic-api-core and other provider-specific skills.

## Related

- [AI Gateway](./ai-gateway.md)
- [OpenAI](./openai.md)
- [Anthropic](./anthropic.md)
- [Google](./google.md)
- [Amazon Bedrock](./amazon-bedrock.md)
- [OpenAI Compatible Providers](./openai-compatible-providers.md)
