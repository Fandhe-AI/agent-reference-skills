---
source: https://opencode.ai/docs/console/models/#endpoints
---

# Model endpoints

You can also access the models directly through the following API endpoints. Free-tier chat models require OpenCode; use paid models or [Go](./go-overview.md) from other clients.

Each model is listed with its native API, but every text model also works through the other APIs, which Console translates. See [Base URLs](https://opencode.ai/docs/console/harnesses/#base-urls) for the full set.

## Signature / Usage

These AI SDK packages are for applications calling the endpoints directly. To select a [model](https://opencode.ai/docs/models/) in OpenCode, use the format `opencode/<model-id>`:

```jsonc title="opencode.jsonc"
{
  "$schema": "https://opencode.ai/config.json",
  "model": "opencode/gpt-6.1-sol",
}
```

### Model list

Fetch the full list of available models and their metadata from the models endpoint:

```bash
curl https://opencode.ai/inference/v1/models
```

## Options / Props

| Model | Model ID | Endpoint | AI SDK Package |
| --- | --- | --- | --- |
| GPT 6 Astra | gpt-6-astra | `https://opencode.ai/inference/openai/v1/responses` | `@ai-sdk/openai` |
| GPT 6 Sol | gpt-6-sol | `https://opencode.ai/inference/openai/v1/responses` | `@ai-sdk/openai` |
| GPT 6.1 Sol | gpt-6.1-sol | `https://opencode.ai/inference/openai/v1/responses` | `@ai-sdk/openai` |
| GPT 6 Luna | gpt-6-luna | `https://opencode.ai/inference/openai/v1/responses` | `@ai-sdk/openai` |
| GPT 5.6 Sol | gpt-5.6-sol | `https://opencode.ai/inference/openai/v1/responses` | `@ai-sdk/openai` |
| GPT 5.6 Terra | gpt-5.6-terra | `https://opencode.ai/inference/openai/v1/responses` | `@ai-sdk/openai` |
| GPT 5.6 Luna | gpt-5.6-luna | `https://opencode.ai/inference/openai/v1/responses` | `@ai-sdk/openai` |
| GPT 5.5 | gpt-5.5 | `https://opencode.ai/inference/openai/v1/responses` | `@ai-sdk/openai` |
| GPT 5.5 Pro | gpt-5.5-pro | `https://opencode.ai/inference/openai/v1/responses` | `@ai-sdk/openai` |
| GPT 5.4 | gpt-5.4 | `https://opencode.ai/inference/openai/v1/responses` | `@ai-sdk/openai` |
| GPT 5.4 Pro | gpt-5.4-pro | `https://opencode.ai/inference/openai/v1/responses` | `@ai-sdk/openai` |
| GPT 5.4 Mini | gpt-5.4-mini | `https://opencode.ai/inference/openai/v1/responses` | `@ai-sdk/openai` |
| GPT 5.4 Nano | gpt-5.4-nano | `https://opencode.ai/inference/openai/v1/responses` | `@ai-sdk/openai` |
| GPT 5.3 Codex | gpt-5.3-codex | `https://opencode.ai/inference/openai/v1/responses` | `@ai-sdk/openai` |
| GPT 5.3 Codex Spark | gpt-5.3-codex-spark | `https://opencode.ai/inference/openai/v1/responses` | `@ai-sdk/openai` |
| GPT 5.2 | gpt-5.2 | `https://opencode.ai/inference/openai/v1/responses` | `@ai-sdk/openai` |
| GPT 5.2 Codex | gpt-5.2-codex | `https://opencode.ai/inference/openai/v1/responses` | `@ai-sdk/openai` |
| GPT 5.1 | gpt-5.1 | `https://opencode.ai/inference/openai/v1/responses` | `@ai-sdk/openai` |
| GPT 5.1 Codex | gpt-5.1-codex | `https://opencode.ai/inference/openai/v1/responses` | `@ai-sdk/openai` |
| GPT 5.1 Codex Max | gpt-5.1-codex-max | `https://opencode.ai/inference/openai/v1/responses` | `@ai-sdk/openai` |
| GPT 5.1 Codex Mini | gpt-5.1-codex-mini | `https://opencode.ai/inference/openai/v1/responses` | `@ai-sdk/openai` |
| GPT 5 | gpt-5 | `https://opencode.ai/inference/openai/v1/responses` | `@ai-sdk/openai` |
| GPT 5 Codex | gpt-5-codex | `https://opencode.ai/inference/openai/v1/responses` | `@ai-sdk/openai` |
| GPT 5 Nano | gpt-5-nano | `https://opencode.ai/inference/openai/v1/responses` | `@ai-sdk/openai` |
| Claude Fable 5.2 | claude-fable-5-2 | `https://opencode.ai/inference/anthropic/v1/messages` | `@ai-sdk/anthropic` |
| Claude Fable 5.1 | claude-fable-5-1 | `https://opencode.ai/inference/anthropic/v1/messages` | `@ai-sdk/anthropic` |
| Claude Fable 5 | claude-fable-5 | `https://opencode.ai/inference/anthropic/v1/messages` | `@ai-sdk/anthropic` |
| Claude Opus 5.5 | claude-opus-5-5 | `https://opencode.ai/inference/anthropic/v1/messages` | `@ai-sdk/anthropic` |
| Claude Opus 5 | claude-opus-5 | `https://opencode.ai/inference/anthropic/v1/messages` | `@ai-sdk/anthropic` |
| Claude Opus 4.8 | claude-opus-4-8 | `https://opencode.ai/inference/anthropic/v1/messages` | `@ai-sdk/anthropic` |
| Claude Opus 4.7 | claude-opus-4-7 | `https://opencode.ai/inference/anthropic/v1/messages` | `@ai-sdk/anthropic` |
| Claude Opus 4.6 | claude-opus-4-6 | `https://opencode.ai/inference/anthropic/v1/messages` | `@ai-sdk/anthropic` |
| Claude Opus 4.5 | claude-opus-4-5 | `https://opencode.ai/inference/anthropic/v1/messages` | `@ai-sdk/anthropic` |
| Claude Sonnet 5.5 | claude-sonnet-5-5 | `https://opencode.ai/inference/anthropic/v1/messages` | `@ai-sdk/anthropic` |
| Claude Sonnet 5 | claude-sonnet-5 | `https://opencode.ai/inference/anthropic/v1/messages` | `@ai-sdk/anthropic` |
| Claude Sonnet 4.6 | claude-sonnet-4-6 | `https://opencode.ai/inference/anthropic/v1/messages` | `@ai-sdk/anthropic` |
| Claude Sonnet 4.5 | claude-sonnet-4-5 | `https://opencode.ai/inference/anthropic/v1/messages` | `@ai-sdk/anthropic` |
| Claude Haiku 5.5 | claude-haiku-5-5 | `https://opencode.ai/inference/anthropic/v1/messages` | `@ai-sdk/anthropic` |
| Claude Haiku 4.5 | claude-haiku-4-5 | `https://opencode.ai/inference/anthropic/v1/messages` | `@ai-sdk/anthropic` |
| Gemini 4 Carbon | gemini-4-carbon | `https://opencode.ai/inference/google/v1beta/models/gemini-4-carbon` | `@ai-sdk/google` |
| Gemini 4 Argon | gemini-4-argon | `https://opencode.ai/inference/google/v1beta/models/gemini-4-argon` | `@ai-sdk/google` |
| Gemini 4 Hydrogen | gemini-4-hydrogen | `https://opencode.ai/inference/google/v1beta/models/gemini-4-hydrogen` | `@ai-sdk/google` |
| Gemini 3.8 Flash | gemini-3.8-flash | `https://opencode.ai/inference/google/v1beta/models/gemini-3.8-flash` | `@ai-sdk/google` |
| Gemini 3.7 Flash | gemini-3.7-flash | `https://opencode.ai/inference/google/v1beta/models/gemini-3.7-flash` | `@ai-sdk/google` |
| Gemini 3.6 Flash | gemini-3.6-flash | `https://opencode.ai/inference/google/v1beta/models/gemini-3.6-flash` | `@ai-sdk/google` |
| Gemini 3.5 Flash | gemini-3.5-flash | `https://opencode.ai/inference/google/v1beta/models/gemini-3.5-flash` | `@ai-sdk/google` |
| Gemini 3.5 Flash Lite | gemini-3.5-flash-lite | `https://opencode.ai/inference/google/v1beta/models/gemini-3.5-flash-lite` | `@ai-sdk/google` |
| Gemini 3.1 Pro | gemini-3.1-pro | `https://opencode.ai/inference/google/v1beta/models/gemini-3.1-pro` | `@ai-sdk/google` |
| Gemini 3 Flash | gemini-3-flash | `https://opencode.ai/inference/google/v1beta/models/gemini-3-flash` | `@ai-sdk/google` |
| Grok 4.7 | grok-4.7 | `https://opencode.ai/inference/openai/v1/responses` | `@ai-sdk/openai` |
| Grok 4.6 | grok-4.6 | `https://opencode.ai/inference/openai/v1/responses` | `@ai-sdk/openai` |
| Grok 4.5 | grok-4.5 | `https://opencode.ai/inference/openai/v1/responses` | `@ai-sdk/openai` |
| Grok Build 0.1 | grok-build-0.1 | `https://opencode.ai/inference/openai/v1/responses` | `@ai-sdk/openai` |
| Muse Ember 1.0 | muse-ember-1.0 | `https://opencode.ai/inference/openai/v1/responses` | `@ai-sdk/openai` |
| Muse Wonder 1.0 | muse-wonder-1.0 | `https://opencode.ai/inference/openai/v1/responses` | `@ai-sdk/openai` |
| Muse Spark 1.3 | muse-spark-1.3 | `https://opencode.ai/inference/openai/v1/responses` | `@ai-sdk/openai` |
| Muse Spark 1.2 | muse-spark-1.2 | `https://opencode.ai/inference/openai/v1/responses` | `@ai-sdk/openai` |
| Qwen3.8 Max | qwen3.8-max | `https://opencode.ai/inference/openai/v1/chat/completions` | `@ai-sdk/openai-compatible` |
| Qwen3.8 Flash | qwen3.8-flash | `https://opencode.ai/inference/anthropic/v1/messages` | `@ai-sdk/anthropic` |
| Qwen3.6 Plus | qwen3.6-plus | `https://opencode.ai/inference/anthropic/v1/messages` | `@ai-sdk/anthropic` |
| Qwen3.5 Plus | qwen3.5-plus | `https://opencode.ai/inference/anthropic/v1/messages` | `@ai-sdk/anthropic` |
| DeepSeek V4.1 Flash | deepseek-v4.1-flash | `https://opencode.ai/inference/openai/v1/chat/completions` | `@ai-sdk/openai-compatible` |
| DeepSeek V4 Pro | deepseek-v4-pro | `https://opencode.ai/inference/openai/v1/chat/completions` | `@ai-sdk/openai-compatible` |
| MiniMax M3 | minimax-m3 | `https://opencode.ai/inference/openai/v1/chat/completions` | `@ai-sdk/openai-compatible` |
| MiniMax M2.7 | minimax-m2.7 | `https://opencode.ai/inference/openai/v1/chat/completions` | `@ai-sdk/openai-compatible` |
| MiniMax M2.5 | minimax-m2.5 | `https://opencode.ai/inference/openai/v1/chat/completions` | `@ai-sdk/openai-compatible` |
| GLM 5.3 Flash | glm-5.3-flash | `https://opencode.ai/inference/openai/v1/chat/completions` | `@ai-sdk/openai-compatible` |
| GLM 5.3 | glm-5.3 | `https://opencode.ai/inference/openai/v1/chat/completions` | `@ai-sdk/openai-compatible` |
| GLM 5.2 | glm-5.2 | `https://opencode.ai/inference/openai/v1/chat/completions` | `@ai-sdk/openai-compatible` |
| GLM 5.1 | glm-5.1 | `https://opencode.ai/inference/openai/v1/chat/completions` | `@ai-sdk/openai-compatible` |
| GLM 5 | glm-5 | `https://opencode.ai/inference/openai/v1/chat/completions` | `@ai-sdk/openai-compatible` |
| Kimi K2.5 | kimi-k2.5 | `https://opencode.ai/inference/openai/v1/chat/completions` | `@ai-sdk/openai-compatible` |
| Kimi K2.6 | kimi-k2.6 | `https://opencode.ai/inference/openai/v1/chat/completions` | `@ai-sdk/openai-compatible` |
| Kimi K2.7 Code | kimi-k2.7-code | `https://opencode.ai/inference/openai/v1/chat/completions` | `@ai-sdk/openai-compatible` |
| Kimi K3 | kimi-k3 | `https://opencode.ai/inference/openai/v1/chat/completions` | `@ai-sdk/openai-compatible` |
| Mistral Large 4 | mistral-large-4 | `https://opencode.ai/inference/openai/v1/chat/completions` | `@ai-sdk/openai-compatible` |
| GPT 6 Luna Decision | gpt-6-luna-decision | `https://opencode.ai/inference/systemone/v1/systemone` | - |
| Gemini Decision 1 | gemini-decision-1 | `https://opencode.ai/inference/systemone/v1/systemone` | - |
| Jev 1.13 | jev-1.13 | `https://opencode.ai/inference/systemone/v1/systemone` | - |
| Jev 1.13 Free | jev-1.13-free | `https://opencode.ai/inference/systemone/v1/systemone` | - |
| Big Pickle | big-pickle | `https://opencode.ai/inference/openai/v1/chat/completions` | `@ai-sdk/openai-compatible` |
| Iceman Free | iceman-free | `https://opencode.ai/inference/openai/v1/chat/completions` | `@ai-sdk/openai-compatible` |
| Inkling 2 Small Free | inkling-2-small-free | `https://opencode.ai/inference/openai/v1/chat/completions` | `@ai-sdk/openai-compatible` |
| GLM-5.3-Flash Free | glm-5.3-flash-free | `https://opencode.ai/inference/openai/v1/chat/completions` | `@ai-sdk/openai-compatible` |
| DeepSeek V4.1 Flash Free | deepseek-v4.1-flash-free | `https://opencode.ai/inference/openai/v1/chat/completions` | `@ai-sdk/openai-compatible` |
| MiniMax M3.1 Flash Free | minimax-m3.1-flash-free | `https://opencode.ai/inference/openai/v1/chat/completions` | `@ai-sdk/openai-compatible` |
| Beam Free | beam-free | `https://opencode.ai/inference/openai/v1/chat/completions` | `@ai-sdk/openai-compatible` |
| Flint 40B Free | flint-40b-free | `https://opencode.ai/inference/openai/v1/chat/completions` | `@ai-sdk/openai-compatible` |
| LongCat 2.5 Free | longcat-2.5-free | `https://opencode.ai/inference/openai/v1/chat/completions` | `@ai-sdk/openai-compatible` |
| MiMo-V2.6-Flash Free | mimo-v2.6-flash-free | `https://opencode.ai/inference/openai/v1/chat/completions` | `@ai-sdk/openai-compatible` |
| Nemotron 3 Ultra Free | nemotron-3-ultra-free | `https://opencode.ai/inference/openai/v1/chat/completions` | `@ai-sdk/openai-compatible` |
| Nemotron 3.5 Lightning Free | nemotron-3.5-lightning-free | `https://opencode.ai/inference/openai/v1/chat/completions` | `@ai-sdk/openai-compatible` |
| Nemotron 3.5 Super VL Free | nemotron-3.5-super-vl-free | `https://opencode.ai/inference/openai/v1/chat/completions` | `@ai-sdk/openai-compatible` |

## Notes

- Free-tier chat models require OpenCode; other clients get HTTP `403` for them (see harnesses).
- The model list above includes models that also appear in the deprecated table on the pricing page with past deprecation dates (for example GPT 5.2 Codex, GPT 5 Codex, MiniMax M2.5, GLM 5, Kimi K2.5); the source lists both. See [Model pricing](./models-pricing.md).
- The underlying provider APIs are covered by openai-api-core, anthropic-api-core and google-gemini-api; Console is only the gateway.

## Related

- [System One models](./models-system-one.md)
- [Model pricing](./models-pricing.md)
- [Go endpoints](./go-endpoints.md)
- [Inference API](../api/inference.md)
