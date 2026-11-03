---
source: https://developers.cloudflare.com/workers-ai/models/llama-3.3-70b-instruct-fp8-fast/, https://developers.cloudflare.com/workers-ai/models/llama-guard-3-8b/, https://developers.cloudflare.com/workers-ai/models/kimi-k2.6/, https://developers.cloudflare.com/workers-ai/models/deepseek-v4-flash-0731/, https://developers.cloudflare.com/workers-ai/models/deepseek-v4-pro-0813/, https://developers.cloudflare.com/workers-ai/models/deepseek-v4.1-flash-1017/, https://developers.cloudflare.com/workers-ai/models/glm-5.2/, https://developers.cloudflare.com/workers-ai/models/glm-5.3/, https://developers.cloudflare.com/workers-ai/models/glm-5.3-flash/, https://developers.cloudflare.com/workers-ai/models/qwen3.8-27b/, https://developers.cloudflare.com/workers-ai/models/nemotron-3-120b-a12b/, https://developers.cloudflare.com/workers-ai/models/gpt-oss-120b/
---

# Text Generation Input Parameters

Request parameters for Workers AI text generation models: the classic `prompt` schema, the `messages` schema, and the OpenAI-style schema used by newer models.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/workers-ai/models/llama-3.3-70b-instruct-fp8-fast/ (streaming variant).

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

    const stream = await env.AI.run("@cf/meta/llama-3.3-70b-instruct-fp8-fast", {
      messages,
      stream: true,
    });

    return new Response(stream, {
      headers: { "content-type": "text/event-stream" },
    });
  },
} satisfies ExportedHandler<Env>;
```

## Options / Props

### Classic prompt schema (e.g. `@cf/meta/llama-3.3-70b-instruct-fp8-fast`)

| Name | Type | Default | Description |
|------|------|---------|-------------|
| prompt | string | — | Required for the Prompt input format, minLength 1. The input text prompt for the model to generate a response. |
| messages | array | — | Used instead of `prompt` for the Messages input format (the snippet above and the llama-3.3 page's examples send `{ role, content }` objects). The field list is not expanded on that page; see the Messages schema table below. |
| lora | string | — | Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model. |
| response_format | object | — | Not expanded in the source. |
| raw | boolean | false | If true, a chat template is not applied and you must adhere to the specific model's expected formatting. |
| stream | boolean | false | If true, the response is streamed back incrementally using SSE, Server Sent Events. |
| max_tokens | integer | 256 | The maximum number of tokens to generate in the response. |
| temperature | number | 0.6 | Range 0 to 5. Controls the randomness of the output; higher values produce more random results. |
| top_p | number | — | Range 0.001 to 1. Controls how many possible words are considered; lower values make outputs more predictable. |
| top_k | integer | — | Range 1 to 50. Limits the model to the top k most probable words. |
| seed | integer | — | Range 1 to 9999999999. Random seed for reproducibility of the generation. |
| repetition_penalty | number | — | Range 0 to 2. Penalty for repeated tokens; higher values discourage repetition. |
| frequency_penalty | number | — | Range -2 to 2. Decreases the likelihood of the model repeating the same lines verbatim. |
| presence_penalty | number | — | Range -2 to 2. Increases the likelihood of the model introducing new topics. |

Output (synchronous): `response` (string, the generated text), `usage` (object, usage statistics), `tool_calls` (array, tool call requests made during generation). With `stream: true` the output is `text/event-stream` (binary).

### Messages schema (`@cf/meta/llama-guard-3-8b`)

The source page for Llama Guard 3 expands the `messages` variant. Other pages show a "Prompt" / "Messages" input-format switch without expanding the `messages` fields.

| Name | Type | Default | Description |
|------|------|---------|-------------|
| messages | array | — | Required. An array of message objects representing the conversation history. |
| max_tokens | integer | 256 | The maximum number of tokens to generate in the response. |
| temperature | number | 0.6 | Range 0 to 5. Controls the randomness of the output. |
| response_format | object | — | Dictate the output format of the generated response. |

### OpenAI-style schema (e.g. `@cf/moonshotai/kimi-k2.6`)

Used by the newer models (see the per-model table below). Fields not marked otherwise are optional. Nullable fields are stated as `type | null`.

| Name | Type | Default | Description |
|------|------|---------|-------------|
| prompt | string | — | Required for the Prompt input format, minLength 1. The input text prompt. |
| model | string | — | ID of the model to use. |
| audio | object | — | Parameters for audio output. Required when modalities includes 'audio'. |
| frequency_penalty | number \| null | — | Penalizes new tokens based on their existing frequency in the text so far. |
| logit_bias | object \| null | — | Maps token IDs to bias values from -100 to 100. |
| logprobs | boolean \| null | — | Whether to return log probabilities of the output tokens. |
| top_logprobs | integer \| null | — | How many top log probabilities to return at each token position (0-20). Requires logprobs=true. |
| max_tokens | integer \| null | — | Deprecated in favor of max_completion_tokens (kimi-k2.6 wording). The maximum number of tokens to generate. |
| max_completion_tokens | integer \| null | — | An upper bound for the number of tokens that can be generated for a completion. |
| metadata | object \| null | — | Set of 16 key-value pairs that can be attached to the object. |
| modalities | array \| null | — | Output types requested from the model (e.g. ['text'] or ['text', 'audio']). |
| n | integer \| null | — | How many chat completion choices to generate for each input message. |
| parallel_tool_calls | boolean | true | Whether to enable parallel function calling during tool use. |
| prediction | object | — | Not expanded in the source. |
| presence_penalty | number \| null | — | Penalizes new tokens based on whether they appear in the text so far. |
| reasoning_effort | string \| null | — | Reasoning effort; enum depends on the model (table below). |
| chat_template_kwargs | object | — | Not expanded in the source. |
| response_format | one of | — | Specifies the format the model must output. |
| seed | integer \| null | — | Best-effort deterministic sampling. |
| stop | one of | — | Not expanded in the source. |
| store | boolean \| null | — | Whether to store the output for model distillation / evals. |
| stream | boolean \| null | — | If true, partial message deltas are sent as server-sent events. |
| stream_options | object | — | Not expanded in the source. |
| temperature | number \| null | — | Sampling temperature between 0 and 2. |
| tool_choice | one of | — | 'none' = no tools, 'auto' = model decides, 'required' = must call a tool. |
| tools | array | — | A list of tools the model may call. |
| top_p | number \| null | — | Nucleus sampling: considers the tokens with top_p probability mass. |
| user | string | — | A unique identifier representing your end-user, for abuse monitoring. |
| web_search_options | object | — | Options for the web search tool (when using built-in web search). |
| function_call | one of | — | Not expanded in the source. |
| functions | array | — | minItems 1, maxItems 128. |

Output (synchronous): `id`, `object`, `created` (Unix timestamp in seconds), `model`, `choices` (array, minItems 1), `usage` (object), `system_fingerprint` (string | null).

### reasoning_effort per model

| Model ID | enum | Compatibility aliases as stated |
|----------|------|---------------------------------|
| `@cf/moonshotai/kimi-k2.6` | high, none | low, medium, max map to high |
| `@cf/deepseek-ai/deepseek-v4-flash-0731` | max, high, low, none | minimal maps to low; medium maps to high; xhigh maps to high |
| `@cf/deepseek-ai/deepseek-v4-pro-0813` | max, high, low, none | minimal maps to low; medium maps to high; xhigh maps to high |
| `@cf/deepseek-ai/deepseek-v4.1-flash-1017` | max, high, low, none | auto maps to high; minimal maps to none; medium maps to high; xhigh maps to max |
| `@cf/zai-org/glm-5.2` | max, high, none | low maps to high; medium maps to high; xhigh maps to max; minimal maps to none |
| `@cf/zai-org/glm-5.3` | max, high, low (reasoning cannot be disabled) | none, minimal, medium, xhigh map to max |
| `@cf/zai-org/glm-5.3-flash` | max, high, low (reasoning cannot be disabled) | none, minimal, medium, xhigh map to max |
| `@cf/qwen/qwen3.8-27b` | low, medium, xhigh | — |

## Notes

- Pages listing the OpenAI-style schema (with a `model` field) in this group: `@cf/google/gemma-4-26b-a4b-it`, the DeepSeek V4 models, `@cf/zai-org/glm-4.7-flash`, the GLM 5.x models, both Kimi models, `@cf/nvidia/nemotron-3-120b-a12b`, `@cf/daily-co/phonellm-mini-alpha-2`, and `@cf/qwen/qwen3.8-27b`. Wording of individual fields (for example the `max_tokens` deprecation text and the `metadata` description) differs slightly between pages; the table follows kimi-k2.6.
- `@cf/openai/gpt-oss-120b` shows an "Input format" switch (Prompt / Messages) with the classic prompt-schema fields above.
- `@cf/nvidia/nemotron-3-120b-a12b` supports normal reasoning, low reasoning, and reasoning turned off, but not via the top-level `reasoning_effort` field. Pass them through `chat_template_kwargs`: set both `enable_thinking` and `low_effort` for low reasoning; set `enable_thinking` to `False` to turn reasoning off; set `force_nonempty_content` to `True` for coding agents. The low-effort option appends `{reasoning effort: low}` to the latest user message. The page's example for this uses an OpenAI-compatible Python `client` that is not defined on the page, so it is not reproduced here.
- The `response_format`, `stop`, `prediction`, `stream_options`, and `chat_template_kwargs` sub-fields are collapsed on the source pages; consult each model's raw JSON schema (linked as "API Schemas (Raw)" on the model page) for them.

## Related

- [text-generation.md](./text-generation.md)
- [decision-models.md](./decision-models.md)
