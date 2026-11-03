---
source: https://developers.cloudflare.com/workers-ai/models/apertus-v1.5-8b/, https://developers.cloudflare.com/workers-ai/models/deepseek-r1-distill-qwen-32b/, https://developers.cloudflare.com/workers-ai/models/deepseek-v4-flash-0731/, https://developers.cloudflare.com/workers-ai/models/deepseek-v4-pro-0813/, https://developers.cloudflare.com/workers-ai/models/deepseek-v4.1-flash-1017/, https://developers.cloudflare.com/workers-ai/models/eurollm-9b-it/, https://developers.cloudflare.com/workers-ai/models/gemma-2b-it-lora/, https://developers.cloudflare.com/workers-ai/models/gemma-4-26b-a4b-it/, https://developers.cloudflare.com/workers-ai/models/gemma-7b-it-lora/, https://developers.cloudflare.com/workers-ai/models/gemma-sea-lion-v4-27b-it/, https://developers.cloudflare.com/workers-ai/models/glm-4.7-flash/, https://developers.cloudflare.com/workers-ai/models/glm-5.2/, https://developers.cloudflare.com/workers-ai/models/glm-5.3/, https://developers.cloudflare.com/workers-ai/models/glm-5.3-flash/, https://developers.cloudflare.com/workers-ai/models/gpt-oss-120b/, https://developers.cloudflare.com/workers-ai/models/gpt-oss-20b/, https://developers.cloudflare.com/workers-ai/models/granite-4.0-h-micro/, https://developers.cloudflare.com/workers-ai/models/kimi-k2.6/, https://developers.cloudflare.com/workers-ai/models/kimi-k2.7-code/, https://developers.cloudflare.com/workers-ai/models/llama-2-7b-chat-hf-lora/, https://developers.cloudflare.com/workers-ai/models/llama-3.1-8b-instruct-fp8/, https://developers.cloudflare.com/workers-ai/models/llama-3.2-11b-vision-instruct/, https://developers.cloudflare.com/workers-ai/models/llama-3.2-1b-instruct/, https://developers.cloudflare.com/workers-ai/models/llama-3.2-3b-instruct/, https://developers.cloudflare.com/workers-ai/models/llama-3.3-70b-instruct-fp8-fast/, https://developers.cloudflare.com/workers-ai/models/llama-4-scout-17b-16e-instruct/, https://developers.cloudflare.com/workers-ai/models/llama-guard-3-8b/, https://developers.cloudflare.com/workers-ai/models/mistral-7b-instruct-v0.2-lora/, https://developers.cloudflare.com/workers-ai/models/mistral-small-3.1-24b-instruct/, https://developers.cloudflare.com/workers-ai/models/nemotron-3-120b-a12b/, https://developers.cloudflare.com/workers-ai/models/phonellm-mini-alpha-2/, https://developers.cloudflare.com/workers-ai/models/qwen2.5-coder-32b-instruct/, https://developers.cloudflare.com/workers-ai/models/qwen3-30b-a3b-fp8/, https://developers.cloudflare.com/workers-ai/models/qwen3.8-27b/, https://developers.cloudflare.com/workers-ai/models/qwq-32b/
---

# Text Generation Models

Catalog of the Workers AI "Text Generation" language models (chat, instruct, reasoning, vision-capable, and LoRA base models), run with `env.AI.run(modelId, input)`.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/workers-ai/models/llama-3.3-70b-instruct-fp8-fast/ (the same call shape applies to every model below; only the model ID changes).

```ts
export interface Env {
  AI: Ai;
}

export default {
  async fetch(request, env): Promise<Response> {

    const messages = [
      { role: "system", content: "You are a friendly assistant" },
      {
        role: "user",
        content: "What is the origin of the phrase Hello, World",
      },
    ];
    const response = await env.AI.run("@cf/meta/llama-3.3-70b-instruct-fp8-fast", { messages });

    return Response.json(response);
  },
} satisfies ExportedHandler<Env>;
```

## Options / Props

### Model catalog

Values are transcribed from each page's "Model Info" table. `—` means the page states nothing for that column. Context window is in tokens. Pricing is per million tokens ("M") exactly as stated; "cached" is the stated cached-input rate.

| Model ID | Provider | Context window | Properties as stated | Unit pricing |
|----------|----------|----------------|----------------------|--------------|
| `@cf/swiss-ai/apertus-v1.5-8b` | swiss-ai | 262,144 | Function calling, Vision, Zero data retention; access requires a request form (see Notes) | — |
| `@cf/deepseek-ai/deepseek-r1-distill-qwen-32b` | DeepSeek | 80,000 | Reasoning, Zero data retention | $0.497 per M input tokens, $4.881 per M output tokens |
| `@cf/deepseek-ai/deepseek-v4-flash-0731` | DeepSeek | 1,048,576 | Function calling, Reasoning (`none` `low` `high` (default) `max`), Batch, Zero data retention, Paid access required | $0.44 per M input tokens, $1.32 per M output tokens, $0.014 per M cached input tokens |
| `@cf/deepseek-ai/deepseek-v4-pro-0813` | DeepSeek | 1,048,576 | Function calling, Reasoning (`none` `low` `high` (default) `max`), Zero data retention, Paid access required | $1.32 per M input tokens, $3.96 per M output tokens, $0.044 per M cached input tokens |
| `@cf/deepseek-ai/deepseek-v4.1-flash-1017` | DeepSeek | 1,048,576 | Function calling, Reasoning (`none` `low` `high` (default) `max`), Vision, Zero data retention, Paid access required | $0.30 per M input tokens, $1.20 per M output tokens, $0.006 per M cached input tokens |
| `@cf/utter-project/eurollm-9b-it` | utter-project | 32,000 | Function calling, Zero data retention; access requires a request form (see Notes) | — |
| `@cf/google/gemma-2b-it-lora` | Google | 8,192 | LoRA, Beta, Zero data retention | — |
| `@cf/google/gemma-4-26b-a4b-it` | Google | 256,000 | Function calling, Reasoning, Vision, Batch, Zero data retention | $0.10 per M input tokens, $0.30 per M output tokens |
| `@cf/google/gemma-7b-it-lora` | Google | 3,500 | LoRA, Beta, Zero data retention | — |
| `@cf/aisingapore/gemma-sea-lion-v4-27b-it` | aisingapore | 128,000 | Zero data retention | $0.351 per M input tokens, $0.555 per M output tokens |
| `@cf/zai-org/glm-4.7-flash` | Zhipu AI | 131,072 | Function calling, Reasoning, Zero data retention | $0.0605 per M input tokens, $0.40 per M output tokens |
| `@cf/zai-org/glm-5.2` | Zhipu AI | 262,144 | Function calling, Reasoning (`none` `high` `max` (default)), Zero data retention, Paid access required | $1.40 per M input tokens, $4.40 per M output tokens, $0.26 per M cached input tokens |
| `@cf/zai-org/glm-5.3` | Zhipu AI | 1,048,576 | Function calling, Reasoning (`low` `high` `max` (default)), Zero data retention, Paid access required | $1.40 per M input tokens, $4.40 per M output tokens, $0.26 per M cached input tokens |
| `@cf/zai-org/glm-5.3-flash` | Zhipu AI | 1,048,576 | Function calling, Reasoning (`low` `high` `max` (default)), Vision, Zero data retention, Paid access required | $0.15 per M input tokens, $0.50 per M output tokens, $0.03 per M cached input tokens |
| `@cf/openai/gpt-oss-120b` | OpenAI | 128,000 | Function calling, Reasoning (`low` `medium` (default) `high`), Batch, Zero data retention | $0.35 per M input tokens, $0.75 per M output tokens |
| `@cf/openai/gpt-oss-20b` | OpenAI | 128,000 | Function calling, Reasoning (`low` `medium` (default) `high`), Batch, Zero data retention | $0.20 per M input tokens, $0.30 per M output tokens |
| `@cf/ibm-granite/granite-4.0-h-micro` | IBM | 131,000 | Function calling, Zero data retention | $0.017 per M input tokens, $0.112 per M output tokens |
| `@cf/moonshotai/kimi-k2.6` | Moonshot AI | 262,144 | Function calling, Reasoning (`none` `high` (default)), Vision, Batch, Zero data retention, Paid access required | $0.95 per M input tokens, $4.00 per M output tokens, $0.16 per M cached input tokens |
| `@cf/moonshotai/kimi-k2.7-code` | Moonshot AI | 262,144 | Function calling, Reasoning (Always on), Vision, Zero data retention, Paid access required | $0.95 per M input tokens, $4.00 per M output tokens, $0.19 per M cached input tokens |
| `@cf/meta-llama/llama-2-7b-chat-hf-lora` | Meta | 8,192 | LoRA, Beta, Zero data retention | — |
| `@cf/meta/llama-3.1-8b-instruct-fp8` | Meta | 32,000 | Zero data retention | $0.152 per M input tokens, $0.287 per M output tokens |
| `@cf/meta/llama-3.2-11b-vision-instruct` | Meta | 128,000 | Vision, LoRA, Zero data retention | $0.0485 per M input tokens, $0.676 per M output tokens |
| `@cf/meta/llama-3.2-1b-instruct` | Meta | 60,000 | Zero data retention | $0.027 per M input tokens, $0.201 per M output tokens |
| `@cf/meta/llama-3.2-3b-instruct` | Meta | 80,000 | LoRA, Zero data retention | $0.0509 per M input tokens, $0.335 per M output tokens |
| `@cf/meta/llama-3.3-70b-instruct-fp8-fast` | Meta | 24,000 | Function calling, Batch, Zero data retention | $0.293 per M input tokens, $2.253 per M output tokens |
| `@cf/meta/llama-4-scout-17b-16e-instruct` | Meta | 131,000 | Function calling, Vision, Batch, Zero data retention | $0.27 per M input tokens, $0.85 per M output tokens |
| `@cf/meta/llama-guard-3-8b` | Meta | 131,072 | LoRA, Zero data retention | $0.484 per M input tokens, $0.03 per M output tokens |
| `@cf/mistral/mistral-7b-instruct-v0.2-lora` | MistralAI | 15,000 | LoRA, Zero data retention | — |
| `@cf/mistralai/mistral-small-3.1-24b-instruct` | MistralAI | 128,000 | Function calling, Zero data retention | $0.351 per M input tokens, $0.555 per M output tokens |
| `@cf/nvidia/nemotron-3-120b-a12b` | NVIDIA | 256,000 | Function calling, Reasoning, Zero data retention | $0.50 per M input tokens, $1.50 per M output tokens |
| `@cf/daily-co/phonellm-mini-alpha-2` | daily-co | 262,140 | Function calling, Zero data retention | $0.06 per M input tokens, $0.24 per M output tokens |
| `@cf/qwen/qwen2.5-coder-32b-instruct` | Qwen | 32,768 | LoRA, Zero data retention | $0.66 per M input tokens, $1.00 per M output tokens |
| `@cf/qwen/qwen3-30b-a3b-fp8` | Qwen | 32,768 | Function calling, Reasoning, Batch, Zero data retention | $0.0509 per M input tokens, $0.335 per M output tokens |
| `@cf/qwen/qwen3.8-27b` | Qwen | 262,144 | Function calling, Reasoning (`low` `medium` `xhigh` (default)), Vision, Batch, Zero data retention | $0.45 per M input tokens, $3.20 per M output tokens, $0.05 per M cached input tokens |
| `@cf/qwen/qwq-32b` | Qwen | 24,000 | Reasoning, LoRA, Zero data retention | $0.66 per M input tokens, $1.00 per M output tokens |

No page in this task group carries a deprecation flag. Models marked Beta on their page are the LoRA base models `@cf/google/gemma-2b-it-lora`, `@cf/google/gemma-7b-it-lora`, and `@cf/meta-llama/llama-2-7b-chat-hf-lora`.

### Common input parameters

Parameters shared by the catalog models are on [text-generation-parameters.md](./text-generation-parameters.md). Decision-style models (`@cf/cloudflare/clef`, `@cf/cloudflare/clef-flash`, `@cf/cloudflare/clef-omni`, `@cf/cloudflare/clairic`) are also listed as Text Generation on the Workers AI site but use a different request shape; see [decision-models.md](./decision-models.md).

## Notes

- Eight models have a "Paid access required" callout: `@cf/deepseek-ai/deepseek-v4-flash-0731`, `@cf/deepseek-ai/deepseek-v4-pro-0813`, `@cf/deepseek-ai/deepseek-v4.1-flash-1017`, `@cf/zai-org/glm-5.2`, `@cf/zai-org/glm-5.3`, `@cf/zai-org/glm-5.3-flash`, `@cf/moonshotai/kimi-k2.6`, and `@cf/moonshotai/kimi-k2.7-code`. The callout says they are not available through standard Workers Free billing; use the Workers Paid plan or prepaid AI Gateway credits (https://developers.cloudflare.com/ai-gateway/features/unified-billing/, https://developers.cloudflare.com/workers/platform/pricing/#workers).
- `@cf/swiss-ai/apertus-v1.5-8b` and `@cf/utter-project/eurollm-9b-it` state "For access, please fill out this form: https://forms.gle/kgvmkr6ucHN3xNuH6". Neither page has a Parameters section.
- The following pages contain a Batch input/output schema section although their Info table has no Batch row: `@cf/aisingapore/gemma-sea-lion-v4-27b-it`, `@cf/deepseek-ai/deepseek-v4-pro-0813`, `@cf/deepseek-ai/deepseek-v4.1-flash-1017`, `@cf/zai-org/glm-5.2`, `@cf/zai-org/glm-5.3`, `@cf/zai-org/glm-5.3-flash`, `@cf/moonshotai/kimi-k2.7-code`. The table above follows the Info table; the Batch column is folded into "Properties as stated".
- Every page repeats that Workers AI also exposes OpenAI-compatible `/v1/chat/completions` and `/v1/embeddings` endpoints; see [openai-compatibility.md](../workers-ai/openai-compatibility.md).
- `@cf/nvidia/nemotron-3-120b-a12b` does not select reasoning modes from the top-level `reasoning_effort` field; the page says to pass `enable_thinking`, `low_effort`, and `force_nonempty_content` through `chat_template_kwargs` (details in [text-generation-parameters.md](./text-generation-parameters.md)).
- LoRA-capable models accept a `lora` input naming the adapter; the three `-lora` entries are described on their pages as base models that Cloudflare dedicates for inference with LoRA adapters.

## Related

- [text-generation-parameters.md](./text-generation-parameters.md)
- [decision-models.md](./decision-models.md)
- [image-to-text.md](./image-to-text.md)
- [text-embeddings.md](./text-embeddings.md)
