# Prompt caching

Automatic caching of repeated prompt prefixes to reduce latency and cost; supports explicit cache breakpoints on GPT-5.6+ models.

## Signature / Usage

```json
{
  "model": "gpt-6.1-sol",
  "prompt_cache_key": "tenant:acme:knowledge-base-v1",
  "input": [
    {
      "type": "message",
      "role": "user",
      "content": [
        { "type": "input_file", "file_id": "file_123", "prompt_cache_breakpoint": { "mode": "explicit" } },
        { "type": "input_text", "text": "Answer the current question." }
      ]
    }
  ]
}
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| prompt_cache_key | string | — | Combined with the prefix hash to influence cache routing. Optional on GPT-5.6+ (routing is automatic): use it to keep separate cache accounting per customer/user/workspace, which also helps prevent cache-hit probing. Before GPT-5.6 a stable key is important for routing — keep traffic to ~15 req/min per key and partition higher volume across keys |
| prompt_cache_options.mode | `implicit` \| `explicit` | `implicit` | `implicit` places a breakpoint at the latest message plus any explicit ones; `explicit` disables the implicit breakpoint |
| prompt_cache_options.ttl | `30m` \| `12h` | `30m` | Minimum cache lifetime for breakpoints written by the request (GPT-5.6+; `12h` is available in the Responses API). Applies to the implicit breakpoint and to explicit breakpoints without their own `ttl` |
| prompt_cache_breakpoint.mode | `explicit` | — | Marks the end of a reusable prefix on a supported content block (`input_text`, `input_image`, `input_file` in Responses API) |
| prompt_cache_breakpoint.ttl | `30m` \| `12h` | request-level `ttl` | Overrides `prompt_cache_options.ttl` for one explicit breakpoint |
| prompt_cache_retention | `in_memory` \| `24h` | model-dependent | Maximum-retention policy for models before the GPT-5.6 family (deprecated for GPT-5.6+) |

## Notes

- Caching is automatic for prompts ≥ 1024 tokens; no code changes required. Enabled by default for supported OpenAI models. Monitor hit rates in the Prompt Caching Dashboard (platform.openai.com/usage, prompt-caching section) and diagnose misses with the Prompt Cache Diagnostics tool (see [Prompt cache diagnostics](./prompt-caching-diagnostics.md)).
- Agents API model calls use the same prompt-caching behavior as the Responses API; keeping a session does not guarantee a cache hit (Agents API itself is covered by the openai-agents skill).
- Cache hits require an exact prefix match — put static content (instructions, examples) first, variable/user content last.
- On GPT-5.6+ models, cache writes cost 1.25× the uncached input token rate for the default `30m` lifetime and 2.5× for `12h` (Responses API), reported in `cache_write_tokens`; cache reads cost 0.1× (0.05× on GPT-6.1 Sol and GPT-6.1 Terra) regardless of lifetime and are reported in `cached_tokens`. Earlier models have no cache-write fee.
- On GPT-6 models, append a `configuration_update` input item (`{"type": "configuration_update", "reasoning": {"effort": "high"}}`) to change reasoning effort between responses while keeping request-level `reasoning.effort` unchanged, so the cached prefix is preserved. See [reasoning](./reasoning.md).
- `prompt_cache_options.prewarm: true` prepares the cache without generating output (GPT-5.6+); written tokens are billed at the cache-write rate.
- GPT-5.6+ does **not** fall back to the longest matching unmarked prefix — if the implicit breakpoint includes changing content, `cached_tokens` can be 0 even with a large shared prefix; add an explicit breakpoint after the stable prefix to fix this.
- Each request can create up to 4 new cache writes; up to the latest 50 breakpoints are considered for reads.
- Extended retention (up to 24h) is available for specific pre-GPT-5.6 models (`gpt-5.5`, `gpt-4.1`, etc.); `gpt-5.5`/`gpt-5.5-pro` only support `24h`.

### 12-hour lifetime (`ttl: "12h"`)

- Set `prompt_cache_options.ttl` to `"12h"` (Responses API, GPT-5.6+) to keep shared instructions, tools, and context cached for a minimum of 12 hours. The write rate is 2.5× the uncached input-token rate; read rates are unchanged. `"12h"` does not set a deletion deadline or change the maximum data-retention policy; unsupported values return `400 invalid_request_error`.
- Within one request each token is billed once at the longest lifetime of the selected writes covering it. Upgrading valid `30m` coverage to `12h` is a new 12-hour write, without credit for the earlier write.
- `usage.input_tokens_details.cache_write_tokens_details` splits writes into `ttl_30m_tokens` and `ttl_12h_tokens` (non-overlapping; they sum to `cache_write_tokens`). `cached_tokens` counts billed reads only.
- These settings do not change `prompt_cache_retention` for earlier models.

Mixed lifetimes (official example, retrieved 2026-11-14):

```json
{
  "model": "gpt-6.1-sol",
  "prompt_cache_options": { "mode": "explicit", "ttl": "30m" },
  "input": [
    {
      "role": "developer",
      "content": [
        {
          "type": "input_text",
          "text": "Shared instructions and reference material reused throughout the day...",
          "prompt_cache_breakpoint": { "mode": "explicit", "ttl": "12h" }
        }
      ]
    },
    {
      "role": "user",
      "content": [
        {
          "type": "input_text",
          "text": "Session context reused over the next few minutes...",
          "prompt_cache_breakpoint": { "mode": "explicit" }
        },
        {
          "type": "input_text",
          "text": "The current question, which does not need a cache write..."
        }
      ]
    }
  ]
}
```

- Source: https://developers.openai.com/api/docs/guides/prompt-caching (Markdown twin, retrieved 2026-11-14; changelog entry Oct 20, 2026).

## Related

- [reasoning](./reasoning.md)
