---
source: https://developers.cloudflare.com/workers-ai/platform/pricing/
---

# Pricing

Workers AI is billed in Neurons at $0.011 per 1,000 Neurons, with 10,000 free Neurons per day; per-model rates are shown in tokens and in Neurons.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/workers-ai/features/batch-api/rest-api/ (token usage as reported in a response):

```json
"usage": { "prompt_tokens": 12, "completion_tokens": 0, "total_tokens": 12 }
```

## Options / Props

### Plans

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| Workers Free | plan | — | 10,000 Neurons per day free allocation. N/A: upgrade to Workers Paid. |
| Workers Paid | plan | — | 10,000 Neurons per day free allocation; $0.011 / 1,000 Neurons above it. |

### LLM model pricing

Columns: Name = model; Type = price in tokens; Description = price in Neurons (as listed).

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| @cf/meta/llama-3.2-1b-instruct | $0.027 per M input tokens / $0.201 per M output tokens | — | 2457 neurons per M input tokens / 18252 neurons per M output tokens |
| @cf/meta/llama-3.2-3b-instruct | $0.051 per M input tokens / $0.335 per M output tokens | — | 4625 neurons per M input tokens / 30475 neurons per M output tokens |
| @cf/meta/llama-3.1-8b-instruct-fp8-fast | $0.045 per M input tokens / $0.384 per M output tokens | — | 4119 neurons per M input tokens / 34868 neurons per M output tokens |
| @cf/meta/llama-3.2-11b-vision-instruct | $0.049 per M input tokens / $0.676 per M output tokens | — | 4410 neurons per M input tokens / 61493 neurons per M output tokens |
| @cf/meta/llama-3.1-70b-instruct-fp8-fast | $0.293 per M input tokens / $2.253 per M output tokens | — | 26668 neurons per M input tokens / 204805 neurons per M output tokens |
| @cf/meta/llama-3.3-70b-instruct-fp8-fast | $0.293 per M input tokens / $2.253 per M output tokens | — | 26668 neurons per M input tokens / 204805 neurons per M output tokens |
| @cf/deepseek-ai/deepseek-r1-distill-qwen-32b | $0.497 per M input tokens / $4.881 per M output tokens | — | 45170 neurons per M input tokens / 443756 neurons per M output tokens |
| @cf/deepseek-ai/deepseek-v4-flash-0731 | $0.440 per M input / $0.014 per M cached input / $1.320 per M output tokens | — | 40000 neurons per M input / 1273 per M cached input / 120000 per M output tokens |
| @cf/deepseek-ai/deepseek-v4.1-flash-1017 | $0.300 per M input / $0.006 per M cached input / $1.200 per M output tokens | — | 27273 neurons per M input / 545 per M cached input / 109091 per M output tokens |
| @cf/deepseek-ai/deepseek-v4-pro-0813 | $1.320 per M input / $0.044 per M cached input / $3.960 per M output tokens | — | 120000 neurons per M input / 4000 per M cached input / 360000 per M output tokens |
| @cf/mistral/mistral-7b-instruct-v0.1 | $0.110 per M input tokens / $0.190 per M output tokens | — | 10000 neurons per M input tokens / 17300 neurons per M output tokens |
| @cf/mistralai/mistral-small-3.1-24b-instruct | $0.351 per M input tokens / $0.555 per M output tokens | — | 31876 neurons per M input tokens / 50488 neurons per M output tokens |
| @cf/meta/llama-3.1-8b-instruct | $0.282 per M input tokens / $0.827 per M output tokens | — | 25608 neurons per M input tokens / 75147 neurons per M output tokens |
| @cf/meta/llama-3.1-8b-instruct-fp8 | $0.152 per M input tokens / $0.287 per M output tokens | — | 13778 neurons per M input tokens / 26128 neurons per M output tokens |
| @cf/meta/llama-3.1-8b-instruct-awq | $0.123 per M input tokens / $0.266 per M output tokens | — | 11161 neurons per M input tokens / 24215 neurons per M output tokens |
| @cf/meta/llama-3-8b-instruct | $0.282 per M input tokens / $0.827 per M output tokens | — | 25608 neurons per M input tokens / 75147 neurons per M output tokens |
| @cf/meta/llama-3-8b-instruct-awq | $0.123 per M input tokens / $0.266 per M output tokens | — | 11161 neurons per M input tokens / 24215 neurons per M output tokens |
| @cf/meta/llama-2-7b-chat-fp16 | $0.556 per M input tokens / $6.667 per M output tokens | — | 50505 neurons per M input tokens / 606061 neurons per M output tokens |
| @cf/meta/llama-guard-3-8b | $0.484 per M input tokens / $0.030 per M output tokens | — | 44003 neurons per M input tokens / 2730 neurons per M output tokens |
| @cf/meta/llama-4-scout-17b-16e-instruct | $0.270 per M input tokens / $0.850 per M output tokens | — | 24545 neurons per M input tokens / 77273 neurons per M output tokens |
| @cf/google/gemma-3-12b-it | $0.345 per M input tokens / $0.556 per M output tokens | — | 31371 neurons per M input tokens / 50560 neurons per M output tokens |
| @cf/qwen/qwq-32b | $0.660 per M input tokens / $1.000 per M output tokens | — | 60000 neurons per M input tokens / 90909 neurons per M output tokens |
| @cf/qwen/qwen2.5-coder-32b-instruct | $0.660 per M input tokens / $1.000 per M output tokens | — | 60000 neurons per M input tokens / 90909 neurons per M output tokens |
| @cf/qwen/qwen3-30b-a3b-fp8 | $0.051 per M input tokens / $0.335 per M output tokens | — | 4625 neurons per M input tokens / 30475 neurons per M output tokens |
| @cf/qwen/qwen3.8-27b | $0.450 per M input tokens / $3.200 per M output tokens | — | 40909 neurons per M input tokens / 290909 neurons per M output tokens |
| @cf/openai/gpt-oss-120b | $0.350 per M input tokens / $0.750 per M output tokens | — | 31818 neurons per M input tokens / 68182 neurons per M output tokens |
| @cf/openai/gpt-oss-20b | $0.200 per M input tokens / $0.300 per M output tokens | — | 18182 neurons per M input tokens / 27273 neurons per M output tokens |
| @cf/aisingapore/gemma-sea-lion-v4-27b-it | $0.351 per M input tokens / $0.555 per M output tokens | — | 31876 neurons per M input tokens / 50488 neurons per M output tokens |
| @cf/ibm-granite/granite-4.0-h-micro | $0.017 per M input tokens / $0.112 per M output tokens | — | 1542 neurons per M input tokens / 10158 neurons per M output tokens |
| @cf/zai-org/glm-4.7-flash | $0.060 per M input tokens / $0.400 per M output tokens | — | 5500 neurons per M input tokens / 36400 neurons per M output tokens |
| @cf/zai-org/glm-5.2 | $1.400 per M input / $0.260 per M cached input / $4.400 per M output tokens | — | 127273 neurons per M input / 23636 per M cached input / 400000 per M output tokens |
| @cf/zai-org/glm-5.3 | $1.400 per M input / $0.260 per M cached input / $4.400 per M output tokens | — | 127273 neurons per M input / 23636 per M cached input / 400000 per M output tokens |
| @cf/zai-org/glm-5.3-flash | $0.150 per M input / $0.030 per M cached input / $0.500 per M output tokens | — | 13636 neurons per M input / 2727 per M cached input / 45455 per M output tokens |
| @cf/nvidia/nemotron-3-120b-a12b | $0.500 per M input tokens / $1.500 per M output tokens | — | 45455 neurons per M input tokens / 136364 neurons per M output tokens |
| @cf/moonshotai/kimi-k2.5 | $0.600 per M input / $0.100 per M cached input / $3.000 per M output tokens | — | 54545 neurons per M input / 9091 per M cached input / 272727 per M output tokens |
| @cf/moonshotai/kimi-k2.6 | $0.950 per M input / $0.160 per M cached input / $4.000 per M output tokens | — | 86364 neurons per M input / 14545 per M cached input / 363636 per M output tokens |
| @cf/moonshotai/kimi-k2.7-code | $0.950 per M input / $0.190 per M cached input / $4.000 per M output tokens | — | 86364 neurons per M input / 17273 per M cached input / 363636 per M output tokens |
| @cf/google/gemma-4-26b-a4b-it | $0.100 per M input tokens / $0.300 per M output tokens | — | 9091 neurons per M input tokens / 27273 neurons per M output tokens |
| @cf/daily-co/phonellm-mini-alpha-2 | $0.060 per M input tokens / $0.240 per M output tokens | — | 5455 neurons per M input tokens / 21818 neurons per M output tokens |
| @cf/thinkingmachines/inkling-2-small | $0.300 per M input / $0.100 per M cached input / $1.000 per M output tokens | — | 27273 neurons per M input / 9091 per M cached input / 90909 per M output tokens |

### Embeddings model pricing

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| @cf/baai/bge-small-en-v1.5 | $0.020 per M input tokens | — | 1841 neurons per M input tokens |
| @cf/baai/bge-base-en-v1.5 | $0.067 per M input tokens | — | 6058 neurons per M input tokens |
| @cf/baai/bge-large-en-v1.5 | $0.204 per M input tokens | — | 18582 neurons per M input tokens |
| @cf/baai/bge-m3 | $0.012 per M input tokens | — | 1075 neurons per M input tokens |
| @cf/pfnet/plamo-embedding-1b | $0.019 per M input tokens | — | 1689 neurons per M input tokens |
| @cf/qwen/qwen3-embedding-0.6b | $0.012 per M input tokens | — | 1075 neurons per M input tokens |
| @cf/google/embeddinggemma-2 | $0.0017 per M input tokens | — | 154 neurons per M input tokens |

### Image model pricing

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| @cf/black-forest-labs/flux-1-schnell | $0.0000528 per 512x512 tile / $0.0001056 per step | — | 4.80 neurons per 512x512 tile / 9.60 neurons per step |
| @cf/leonardo/lucid-origin | $0.006996 per 512x512 tile / $0.000132 per step | — | 636.00 neurons per 512x512 tile / 12.00 neurons per step |
| @cf/leonardo/phoenix-1.0 | $0.005830 per 512x512 tile / $0.000110 per step | — | 530.00 neurons per 512x512 tile / 10.00 neurons per step |
| @cf/black-forest-labs/flux-2-dev | $0.00021 per input 512x512 tile, per step / $0.00041 per output 512x512 tile, per step | — | 18.75 neurons per input tile, per step / 37.50 neurons per output tile, per step |
| @cf/black-forest-labs/flux-2-klein-4b | $0.000059 per input 512x512 tile / $0.000287 per output 512x512 tile | — | 5.37 neurons per input tile / 26.05 neurons per output tile |
| @cf/black-forest-labs/flux-2-klein-9b | $0.015 per first MP (1024x1024) / $0.002 per subsequent MP / $0.002 per input image MP | — | 1363.64 neurons per first MP / 181.82 per subsequent MP / 181.82 per input image MP |

### Audio model pricing

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| @cf/openai/whisper | $0.0005 per audio minute | — | 41.14 neurons per audio minute |
| @cf/openai/whisper-large-v3-turbo | $0.0005 per audio minute | — | 46.63 neurons per audio minute |
| @cf/myshell-ai/melotts | $0.0002 per audio minute | — | 18.63 neurons per audio minute |
| @cf/deepgram/aura-1 | $0.015 per 1k characters input | — | 1,363.64 neurons per 1k characters input |
| @cf/deepgram/nova-3 | $0.0052 per audio minute input | — | 472.73 neurons per audio minute input |
| @cf/deepgram/nova-3 (WebSocket) | $0.0092 per audio minute input | — | 836.36 neurons per audio minute input |
| @cf/pipecat-ai/smart-turn-v2 | $0.00033795 per audio minute input | — | 0.51 neurons per audio minute input |
| @cf/deepgram/aura-2-en | $0.030 per 1k characters input | — | 2727.27 neurons per 1k characters input |
| @cf/deepgram/aura-2-es | $0.030 per 1k characters input | — | 2727.27 neurons per 1k characters input |
| @cf/deepgram/flux (WebSocket) | $0.0077 per audio minute | — | 700.00 neurons per audio minute |

### Other model pricing

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| @cf/huggingface/distilbert-sst-2-int8 | $0.026 per M input tokens | — | 2394 neurons per M input tokens |
| @cf/baai/bge-reranker-base | $0.003 per M input tokens | — | 283 neurons per M input tokens |
| @cf/meta/m2m100-1.2b | $0.342 per M input tokens / $0.342 per M output tokens | — | 31050 neurons per M input tokens / 31050 neurons per M output tokens |
| @cf/microsoft/resnet-50 | $2.51 per M images | — | 228055 neurons per M images |
| @cf/ai4bharat/indictrans2-en-indic-1B | $0.342 per M input tokens / $0.342 per M output tokens | — | 31050 neurons per M input tokens / 31050 neurons per M output tokens |
| @cf/moondream/moondream3.1-9B-A2B | $0.300 per M input tokens / $1.000 per M output tokens | — | 27273 neurons per M input tokens / 90909 neurons per M output tokens |
| @cf/cloudflare/clef | $0.240 per M input tokens | — | 21818 neurons per M input tokens |
| @cf/cloudflare/clef-omni | $0.150 per M input tokens | — | 13636 neurons per M input tokens |
| @cf/cloudflare/clef-flash | $0.038 per M input tokens | — | 3455 neurons per M input tokens |
| @cf/cloudflare/clairic | $0.100 per M input tokens | — | 9091 neurons per M input tokens |

## Notes

- Billing unit of record: Neurons (the per-model unit pricing is presented in tokens/minutes/images for comparison, while billing stays in Neurons on the back end).
- Arithmetic check (recomputed): 10,000 free Neurons per day is worth 10,000 x $0.011 / 1,000 = $0.11 per day at the paid rate. Converting listed Neurons at $0.011 / 1,000 reproduces the listed token prices for the rows checked, for example `@cf/google/gemma-4-26b-a4b-it` 9,091 Neurons per M input tokens = $0.100 and 27,273 per M output tokens = $0.300; `@cf/openai/gpt-oss-120b` 31,818 = $0.350 and 68,182 = $0.750.
- Rows that do not reconcile exactly: `@cf/pipecat-ai/smart-turn-v2` lists $0.00033795 per audio minute, which is about 30.7 Neurons at this rate, but 0.51 Neurons are listed; `@cf/openai/whisper` 41.14 Neurons is about $0.00045 (listed $0.0005, a one-digit rounding). Use the Neuron figure shown on the model page and the dashboard when budgeting.
- Limits reset daily at 00:00 UTC; exceeding the free allocation without Workers Paid makes further operations fail with an error (see Errors, code `3036`).
- Paid-only models: `@cf/moonshotai/kimi-k2.6`, `@cf/moonshotai/kimi-k2.7-code`, `@cf/zai-org/glm-5.2`, `@cf/zai-org/glm-5.3`, `@cf/zai-org/glm-5.3-flash`, `@cf/deepseek-ai/deepseek-v4-flash-0731`, `@cf/deepseek-ai/deepseek-v4.1-flash-1017`, `@cf/deepseek-ai/deepseek-v4-pro-0813`, `@cf/thinkingmachines/inkling-2-small`; usable with Workers Paid or prepaid AI Gateway credits (unified billing; set the gateway's Workers AI billing setting to Unified billing and specify the gateway in the AI binding or REST request). Credits give higher rate limits (see Limits).
- Sixteen text-generation models plus `@cf/llava-hf/llava-1.5-7b-hf`, `@cf/myshell-ai/melotts`, `@cf/openai/whisper-tiny-en`, `@cf/google/embeddinggemma-300m`, and four image models (`stable-diffusion-xl-base-1.0`, `stable-diffusion-v1-5-inpainting`, `stable-diffusion-xl-lightning`, `dreamshaper-8-lcm`) are flagged for deprecation on 2026-11-20; after that date they return HTTP `410` / error code `5028` (see [Errors](./errors.md)). Model-level lists are in the workers-ai-models pages. Source: https://developers.cloudflare.com/changelog/post/2026-11-05-planned-model-deprecations/ (pin 34d908a / fetched 2026-11-14).
- Neurons measure the GPU compute needed for a request. Monitor usage in the dashboard https://dash.cloudflare.com/?to=/:account/ai/workers-ai .
- AI Gateway features are in the AI Gateway category of this skill.

## Related

- [Limits](./limits.md)
- [Errors](./errors.md)
- [Prompt caching](./prompt-caching.md)
