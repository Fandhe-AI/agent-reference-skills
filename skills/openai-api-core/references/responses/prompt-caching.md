# Prompt caching

Automatic caching of repeated prompt prefixes to reduce latency and cost; supports explicit cache breakpoints on GPT-5.6+ models.

## Signature / Usage

```json
{
  "model": "gpt-5.6",
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
| prompt_cache_key | string | — | Combined with the prefix hash to influence cache routing; required for reliable matching on GPT-5.6+; keep traffic per key to ~15 req/min |
| prompt_cache_options.mode | `implicit` \| `explicit` | `implicit` | `implicit` places a breakpoint at the latest message plus any explicit ones; `explicit` disables the implicit breakpoint |
| prompt_cache_options.ttl | `30m` | `30m` | Minimum cache lifetime for breakpoints written by the request (GPT-5.6+ only supported value) |
| prompt_cache_breakpoint.mode | `explicit` | — | Marks the end of a reusable prefix on a supported content block (`input_text`, `input_image`, `input_file` in Responses API) |
| prompt_cache_retention | `in_memory` \| `24h` | model-dependent | Maximum-retention policy for models before the GPT-5.6 family (deprecated for GPT-5.6+) |

## Notes

- Caching is automatic for prompts ≥ 1024 tokens; no code changes required. Enabled for `gpt-4o` and newer.
- Cache hits require an exact prefix match — put static content (instructions, examples) first, variable/user content last.
- On GPT-5.6+ models, cache writes cost 1.25× the uncached input token rate (`cache_write_tokens`); cache reads are reported in `cached_tokens`. Earlier models have no cache-write fee.
- GPT-5.6+ does **not** fall back to the longest matching unmarked prefix — if the implicit breakpoint includes changing content, `cached_tokens` can be 0 even with a large shared prefix; add an explicit breakpoint after the stable prefix to fix this.
- Each request can create up to 4 new cache writes; up to the latest 50 breakpoints are considered for reads.
- Extended retention (up to 24h) is available for specific pre-GPT-5.6 models (`gpt-5.5`, `gpt-4.1`, etc.); `gpt-5.5`/`gpt-5.5-pro` only support `24h`.

## Related

- [reasoning](./reasoning.md)
