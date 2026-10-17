---
source: https://ai-sdk.dev/docs/foundations/providers-and-models
---

# Providers and Models

AI SDK Core offers a standardized approach to interacting with LLMs through a language model specification (`packages/provider/src/language-model/v3` in `vercel/ai`) that abstracts differences between providers, so you can switch providers while using the same API.

## Signature / Usage

First-party providers (package names as listed on the page):

```text
@ai-sdk/xai  @ai-sdk/openai  @ai-sdk/azure  @ai-sdk/anthropic  @ai-sdk/amazon-bedrock
@ai-sdk/google  @ai-sdk/google-vertex  @ai-sdk/mistral  @ai-sdk/togetherai  @ai-sdk/cohere
@ai-sdk/fireworks  @ai-sdk/deepinfra  @ai-sdk/deepseek  @ai-sdk/cerebras  @ai-sdk/groq
@ai-sdk/perplexity  @ai-sdk/elevenlabs  @ai-sdk/hume  @ai-sdk/revai  @ai-sdk/deepgram
@ai-sdk/gladia  @ai-sdk/assemblyai  @ai-sdk/baseten
```

OpenAI-compatible APIs use the OpenAI Compatible provider (examples: LM Studio, Heroku).

## Options / Props

Capabilities of popular models (excerpt; Check = supported, Cross = not supported):

| Provider | Model | Image Input | Object Generation | Tool Usage | Tool Streaming |
| --- | --- | --- | --- | --- | --- |
| xAI Grok | `grok-4.7` | Check | Check | Check | Check |
| xAI Grok | `grok-4` | Cross | Check | Check | Check |
| OpenAI | `gpt-6-astra` | Check | Check | Check | Check |
| OpenAI | `gpt-5.6` | Check | Check | Check | Check |
| OpenAI | `gpt-5` | Check | Check | Check | Check |
| Anthropic | `claude-opus-5-5` | Check | Check | Check | Check |
| Anthropic | `claude-sonnet-5-5` | Check | Check | Check | Check |
| Anthropic | `claude-opus-4-0` | Check | Check | Check | Check |
| Google | `gemini-3.8-flash` | Check | Check | Check | Check |
| Google | `gemini-2.5-pro` | Check | Check | Check | Check |
| Mistral | `pixtral-large-latest` | Check | Check | Check | Check |
| Mistral | `mistral-large-latest` | Cross | Check | Check | Check |
| DeepSeek | `deepseek-v4-flash` | Cross | Check | Check | Check |
| Cerebras | `gpt-oss-120b` | Cross | Check | Check | Check |
| Cerebras | `gemma-4-31b` | Check | Check | Check | Check |
| Groq | `meta-llama/llama-4-scout-17b-16e-instruct` | Check | Check | Check | Check |
| Groq | `llama-3.3-70b-versatile` | Cross | Check | Check | Check |

## Notes

- The table above is an excerpt of the model list on the official page; the full table (xAI, OpenAI, Anthropic, Google, Mistral, DeepSeek, Cerebras, Groq rows) is on the source page and is not exhaustive. Model IDs are transcribed as published and not normalized.
- Self-hosted models: Ollama provider (community), LM Studio (OpenAI-compatible), Baseten, Browser AI; any self-hosted provider supporting the OpenAI specification works with the OpenAI Compatible Provider.
- Community providers listed on the page include Ollama (`ollama-ai-provider`), OpenRouter (`@openrouter/ai-sdk-provider`), Cloudflare Workers AI (`workers-ai-provider`), Portkey, Mem0, Letta, Claude Code Provider (`ai-sdk-provider-claude-code`), Codex CLI Provider (`ai-sdk-provider-codex-cli`), Gemini CLI, OpenCode, A2A, ACP, MCP Sampling and others; see the source page for the full list.
- The language model specification is published as an open-source package and can be used to create custom providers.

## Related

- [Choosing a Provider](./choosing-a-provider.md)
- [Provider Options](./provider-options.md)
- [Overview](./overview.md)
