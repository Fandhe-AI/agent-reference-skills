# Prompt cache diagnostics

Explains why a Responses API request reused fewer cached tokens than expected by comparing it with an earlier response. Available for GPT-5.6 and later supported models.

## Signature / Usage

```python
from pathlib import Path

from openai import OpenAI

client = OpenAI()
policy = Path("support-policy.txt").read_text()  # At least 1,024 tokens.

first = client.responses.create(
    model="gpt-6-astra",
    instructions=policy,
    input="Reply with exactly OK.",
    tools=[{"type": "function", "name": "get_time"}],
)

second = client.responses.create(
    model="gpt-6-astra",
    instructions=policy,
    input="Reply with exactly OK.",
    tools=[{"type": "function", "name": "get_date"}],
    prompt_cache_options={"comparison_response_id": first.id},
)

diagnostics = second.prompt_cache_diagnostics
if diagnostics is not None and diagnostics.type == "cache_miss":
    print(diagnostics.reason)
    print(diagnostics.comparison_reusable_tokens)
    print(diagnostics.cache_missed_tokens)
```

Example result when the tool change causes a miss (token counts vary with the input):

```json
{
  "prompt_cache_diagnostics": {
    "type": "cache_miss",
    "reason": "tools_changed",
    "comparison_reusable_tokens": 5629,
    "cache_missed_tokens": 5629
  }
}
```

## Options / Props

Request parameter:

| Name | Type | Description |
| --- | --- | --- |
| prompt_cache_options.comparison_response_id | string | `id` of a recent completed response from the same organization whose prefix the current request is expected to reuse |

`prompt_cache_diagnostics.type` values:

| Type | Meaning | What to do |
| --- | --- | --- |
| `cache_hit` | No cache miss was detected for the comparison | Check `usage.input_tokens_details.cached_tokens` to measure actual reuse |
| `cache_miss` | A difference prevented reuse of the expected prefix; includes `reason` and `cache_missed_tokens`, may include `comparison_reusable_tokens` | Look up `reason` in the table below |
| `comparison_response_not_found` | No usable diagnostic record for the comparison response (missing or expired) | Select another recent completed response from the same organization |
| `unavailable` | The comparison could not produce a conclusive result, or the model does not support diagnostics | Confirm model support and try another recent comparison; the response is still usable |

`reason` values for `cache_miss`:

| Reason | What changed | How to improve reuse |
| --- | --- | --- |
| `model_changed` | A different model processed the request (routing, A/B test, fallback) | Use the same model for requests intended to share a cached prefix |
| `prompt_cache_key_changed` | The supplied key changed between requests; can be reported as a miss in `usage` without a physical cache miss | Omit `prompt_cache_key` unless separate cache accounting is needed; keep a stable key within each group |
| `service_tier_changed` | The service tier used to process the request changed | Keep the service tier consistent; check the returned `service_tier`, which can differ from the requested value |
| `tools_changed` | Tools were added, removed, reordered, or their descriptions, schemas, or configuration changed | Keep tool definitions and ordering stable; use `tool_choice: "none"` or `allowed_tools` instead of changing the tool list |
| `text_format_changed` | The output format or its schema changed | Keep `text.format` and the schema consistent when the required output structure is unchanged |
| `reasoning_effort_changed` | The reasoning effort changed | On supported GPT-6 and later models, append a `configuration_update` input item to change effort mid-conversation; on older models keep `reasoning.effort` consistent |
| `verbosity_changed` | The response verbosity changed | Keep `text.verbosity` consistent |
| `context_compacted` | Compaction replaced earlier conversation content | Preserve stable instructions and build on the compacted context; compare total input cost, since fewer input tokens can still save money |
| `input_changed` | Earlier input changed (timestamp or request ID in instructions; messages edited, reordered, or removed) | Move changing content after the reusable prefix and its cache breakpoint; preserve earlier messages and tool results and append new turns |

## Notes

- Setting `comparison_response_id` only requests diagnostics. It does not load the earlier conversation or change caching behavior; the request can still reuse matching cache entries from other requests.
- Reuse requires an exact prefix match and compatible request settings, including model, service tier, and tools. The reusable prefix must meet the model's minimum cacheable length (1,024 tokens for GPT-5.6 and later).
- Multi-turn: save each completed response's `id` and pass it as `comparison_response_id` on the next request; omit it on the first turn. When testing a fix, keep the comparison ID set to the baseline response.
- Streaming (`stream=True`): read `prompt_cache_diagnostics` from `event.response` in the `response.completed` event.
- `cache_hit` does not mean no new processing: a 2,500-token request reusing a 2,000-token prefix can report `cache_hit` while processing 500 new tokens.
- For `cache_miss`, `comparison_reusable_tokens` is the raw token count of the comparison response's reusable prefix and `cache_missed_tokens` estimates how many of those were not reused. These can differ from usage counts; use the response's usage fields (`cached_tokens`, `cache_write_tokens`) for reuse and billing.
- Diagnostics report only the first classified reason; fix it and repeat the comparison to find other causes. They are best effort and may not classify every miss.
- Diagnostic records expire after a short period; an expired record returns `comparison_response_not_found` even if the response is still retrievable.
- No additional cost and no separate rate-limit count; extra baseline or retry requests are billed normally.
- Zero Data Retention compatible: records hold configuration metadata, token-count estimates, and comparison hashes, scoped to the organization. Raw prompts and outputs are not stored.
- Diagnostics never block or fail a request or change model output. Use the Prompt Caching Dashboard to monitor cache performance across an application.
- Source: https://developers.openai.com/api/docs/guides/prompt-caching/diagnostics (retrieved 2026-10-17, no version pin on the site).

## Related

- [prompt-caching](./prompt-caching.md)
- [compaction](./compaction.md)
- [reasoning](./reasoning.md)
