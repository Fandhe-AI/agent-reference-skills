---
source: https://opencode.ai/docs/console/go/#endpoints
---

# OpenCode Go endpoints

You can also access Go models through the following API endpoints. Each model is listed with its native API, but every text model also works through the other APIs, which Console translates. See [Base URLs](https://opencode.ai/docs/console/harnesses/#base-urls) for the full set.

## Signature / Usage

These AI SDK packages are for applications calling Go directly. To use Go in OpenCode, connect with `/connect` and set the [model](https://opencode.ai/docs/models/) using the format `opencode-go/<model-id>`:

```jsonc title="opencode.jsonc"
{
  "$schema": "https://opencode.ai/config.json",
  "model": "opencode-go/kimi-k3",
}
```

### Models

Fetch the full list of available models and their metadata from the models endpoint:

```bash
curl https://opencode.ai/inference/go/v1/models
```

## Options / Props

| Model | Model ID | Endpoint | AI SDK Package |
| --- | --- | --- | --- |
| Grok 4.7 | grok-4.7 | `https://opencode.ai/inference/go/openai/v1/responses` | `@ai-sdk/openai` |
| GPT 6 Luna | gpt-6-luna | `https://opencode.ai/inference/go/openai/v1/responses` | `@ai-sdk/openai` |
| GPT 5.6 Luna | gpt-5.6-luna | `https://opencode.ai/inference/go/openai/v1/responses` | `@ai-sdk/openai` |
| Claude Haiku 5.5 | claude-haiku-5-5 | `https://opencode.ai/inference/go/anthropic/v1/messages` | `@ai-sdk/anthropic` |
| Gemini 4 Argon | gemini-4-argon | `https://opencode.ai/inference/go/google/v1beta/models/gemini-4-argon` | `@ai-sdk/google` |
| GLM-5.3-Flash | glm-5.3-flash | `https://opencode.ai/inference/go/openai/v1/chat/completions` | `@ai-sdk/openai-compatible` |
| GLM-5.3 | glm-5.3 | `https://opencode.ai/inference/go/openai/v1/chat/completions` | `@ai-sdk/openai-compatible` |
| GLM-5.2 | glm-5.2 | `https://opencode.ai/inference/go/openai/v1/chat/completions` | `@ai-sdk/openai-compatible` |
| Kimi K3.1 Pro | kimi-k3.1-pro | `https://opencode.ai/inference/go/openai/v1/chat/completions` | `@ai-sdk/openai-compatible` |
| Kimi K3 | kimi-k3 | `https://opencode.ai/inference/go/openai/v1/chat/completions` | `@ai-sdk/openai-compatible` |
| Kimi K2.7 Code | kimi-k2.7-code | `https://opencode.ai/inference/go/openai/v1/chat/completions` | `@ai-sdk/openai-compatible` |
| LongCat-2.0 | longcat-2.0 | `https://opencode.ai/inference/go/openai/v1/chat/completions` | `@ai-sdk/openai-compatible` |
| DeepSeek V4.1 Flash | deepseek-v4.1-flash | `https://opencode.ai/inference/go/openai/v1/chat/completions` | `@ai-sdk/openai-compatible` |
| DeepSeek V4 Pro | deepseek-v4-pro | `https://opencode.ai/inference/go/openai/v1/chat/completions` | `@ai-sdk/openai-compatible` |
| MiMo-V2.6-Flash | mimo-v2.6-flash | `https://opencode.ai/inference/go/openai/v1/chat/completions` | `@ai-sdk/openai-compatible` |
| MiMo-V2.6-Pro | mimo-v2.6-pro | `https://opencode.ai/inference/go/openai/v1/chat/completions` | `@ai-sdk/openai-compatible` |
| MiMo-V2.5 | mimo-v2.5 | `https://opencode.ai/inference/go/openai/v1/chat/completions` | `@ai-sdk/openai-compatible` |
| MiMo-V2.5-Pro | mimo-v2.5-pro | `https://opencode.ai/inference/go/openai/v1/chat/completions` | `@ai-sdk/openai-compatible` |
| MiniMax M3.1 Flash | minimax-m3.1-flash | `https://opencode.ai/inference/go/openai/v1/chat/completions` | `@ai-sdk/openai-compatible` |
| MiniMax M3 | minimax-m3 | `https://opencode.ai/inference/go/anthropic/v1/messages` | `@ai-sdk/anthropic` |
| Muse Spark 1.3 Contributor | muse-spark-1.3-contributor | `https://opencode.ai/inference/go/openai/v1/responses` | `@ai-sdk/openai` |
| Muse Spark 1.2 Contributor | muse-spark-1.2-contributor | `https://opencode.ai/inference/go/openai/v1/responses` | `@ai-sdk/openai` |
| Qwen3.8 Max | qwen3.8-max | `https://opencode.ai/inference/go/anthropic/v1/messages` | `@ai-sdk/anthropic` |
| Qwen3.8 Flash | qwen3.8-flash | `https://opencode.ai/inference/go/anthropic/v1/messages` | `@ai-sdk/anthropic` |
| Qwen3.7 Plus | qwen3.7-plus | `https://opencode.ai/inference/go/anthropic/v1/messages` | `@ai-sdk/anthropic` |
| Hy4 | hy4 | `https://opencode.ai/inference/go/openai/v1/chat/completions` | `@ai-sdk/openai-compatible` |
| Hy4 preview | hy4-preview | `https://opencode.ai/inference/go/openai/v1/chat/completions` | `@ai-sdk/openai-compatible` |
| Hy3 | hy3 | `https://opencode.ai/inference/go/openai/v1/chat/completions` | `@ai-sdk/openai-compatible` |
| Step 5 Preview | step-5-preview | `https://opencode.ai/inference/go/openai/v1/chat/completions` | `@ai-sdk/openai-compatible` |
| Beam Free | beam-free | `https://opencode.ai/inference/go/openai/v1/chat/completions` | `@ai-sdk/openai-compatible` |
| Iceman Contributor Free | iceman-contributor-free | `https://opencode.ai/inference/go/openai/v1/chat/completions` | `@ai-sdk/openai-compatible` |
| LongCat 2.5 Free | longcat-2.5-free | `https://opencode.ai/inference/go/openai/v1/chat/completions` | `@ai-sdk/openai-compatible` |

## Notes

- OpenCode Go is a Console subscription name, not the Go programming language (go-echo covers the Go web framework).
- Go endpoints live under `/inference/go/...`; pay-as-you-go endpoints are under `/inference/...` (see [Model endpoints](./models-endpoints.md)).

## Related

- [OpenCode Go](./go-overview.md)
- [Go usage limits](./go-usage-limits.md)
- [Model endpoints](./models-endpoints.md)
- [Inference API](../api/inference.md)
