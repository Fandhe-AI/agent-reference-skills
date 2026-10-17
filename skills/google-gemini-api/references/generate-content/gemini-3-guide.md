---
source: https://ai.google.dev/gemini-api/docs/generate-content/gemini-3, https://ai.google.dev/gemini-api/docs/generate-content/latest-model, https://ai.google.dev/gemini-api/docs/generate-content/whats-new-gemini-3.7, https://ai.google.dev/gemini-api/docs/generate-content/whats-new-gemini-3.6, https://ai.google.dev/gemini-api/docs/generate-content/whats-new-gemini-3.5
---

# Gemini 3 developer guide and what's-new (generateContent)

Model-generation guides for the generateContent tree, aggregated one section per source under https://ai.google.dev/gemini-api/docs/generate-content/: `gemini-3` (primary, marked deprecated by the site), `latest-model` (Gemini 4 Argon), `whats-new-gemini-3.5`, `whats-new-gemini-3.6`, `whats-new-gemini-3.7`. Model IDs, prices, and dates are copied from the fetched text (docs fetched 2026-10-16).

## Signature / Usage

### Gemini 3 developer guide (gemini-3)

```python
from google import genai

client = genai.Client()

response = client.models.generate_content(
    model="gemini-3.1-pro-preview",
    contents="Find the race condition in this multi-threaded C++ snippet: [code here]",
)

print(response.text)
```

```bash
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-pro-preview:generateContent" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H 'Content-Type: application/json' \
  -X POST \
  -d '{
    "contents": [{
      "parts": [{"text": "Find the race condition in this multi-threaded C++ snippet: [code here]"}]
    }]
  }'
```

| Model ID | Context Window (In / Out) | Knowledge Cutoff | Pricing (Input / Output) |
| --- | --- | --- | --- |
| `gemini-3.1-flash-lite` | 1M / 64k | Jan 2025 | $0.25 (text, image, video), $0.50 (audio) / $1.50 |
| `gemini-3.1-flash-image-preview` | 128k / 32k | Jan 2025 | $0.25 (Text Input) / $0.067 (Image Output) |
| `gemini-3.1-pro-preview` | 1M / 64k | Jan 2025 | $2 / $12 (<200k tokens) $4 / $18 (>200k tokens) |
| `gemini-3-flash-preview` | 1M / 64k | Jan 2025 | $0.50 / $3 |
| `gemini-3-pro-image-preview` | 65k / 32k | Jan 2025 | $2 (Text Input) / $0.134 (Image Output) |

Notes:

- The page carries a deprecation notice: "This page is deprecated and will be removed" and points to the latest-model guide.
- `thinking_level` (Gemini 3): defaults to `high` if unspecified; `minimal` not supported on Gemini 3.1 Pro; `minimal` does not guarantee thinking is off. Keep `temperature` at the default `1.0`; lowering it may cause looping or degraded performance. Thought signatures are required for function calling (400 error if missing, even at `minimal` for Gemini 3 Flash); text/chat validation is not strict.
- Migrating from Gemini 2.5: try `thinking_level: "high"` with simplified prompts; remove explicit temperature; PDFs may use more tokens and video fewer under Gemini 3 defaults; image segmentation (pixel-level masks) is not supported in Gemini 3 Pro or Flash (use Gemini 2.5 Flash with thinking off); `candidateCount > 1` returns a 400 error; Computer Use and built-in tool combination and Maps grounding are supported on Gemini 3.
- OpenAI compatibility: `reasoning_effort` is mapped to `thinking_level`. FAQ: knowledge cutoff January 2025; 1M input context and up to 64k output; Batch API and context caching supported; `gemini-3.1-pro-preview-customtools` helps when the model ignores custom tools in favor of bash commands; `thinking_budget` still works but do not send both.

### Gemini 4 Argon (latest-model)

```python
response = client.models.generate_content(
    model="gemini-4-argon",
    contents="Write a three.js script that renders a realistic 3D black hole with gravitational lensing.",
    config=types.GenerateContentConfig(
        max_output_tokens=65536,
        thinking_config=types.ThinkingConfig(thinking_level="medium"),
    ),
)

print(response.text)
```

```python
response = client.models.generate_content(
    model="gemini-4-argon",
    contents="Write a complete, rigorous proof of the prime number theorem.",
    config=types.GenerateContentConfig(
        max_output_tokens=262144,
        thinking_config=types.ThinkingConfig(thinking_level="high"),
        automatic_continuation=True,  # Default.
    ),
)
```

| Model | Model ID | Default thinking level | Pricing |
| --- | --- | --- | --- |
| Gemini 4 Argon | `gemini-4-argon` | `medium` | Available through Nov 30, 2026 at an introductory price of $2/1M input tokens and $10/1M output tokens ($4/1M input and $20/1M output thereafter) |

Notes:

- Unified 1M input-output token limit (shared by input, thinking, output); 32K per-request cap non-streaming and 64K per stream; long decode up to 1M tokens; agentic video understanding GA; Antigravity agent in Managed Agents supports Gemini 4 Argon.
- SDK minimums from the source: Python `google-genai` 2.30.1 or higher, JavaScript `@google/genai` 2.29.1 or higher (`automatic_continuation` defaults to `True`).
- Migration checklist: set `max_output_tokens` explicitly (default 64K streaming and SDK calls, 32K non-streaming REST); raise caps below 32K to at least 32,768; replace `thinking_budget` with `thinking_level` (still maps with a warning); explicit context caching (`cachedContents` / `caches.create`) is not supported on Gemini 4 Argon and returns an error (implicit caching on for prompts of at least 4,096 tokens with a 95% discount on cache hits); remove `temperature`, `top_p`, `top_k`, `candidate_count` (ignored if provided); set HTTP client timeouts to at least 20 minutes; preserve thought signatures.
- Gemini 4 Argon is not available on the Free tier or on the Google AI Pro plan. Implicit-cache discount pricing: cached input $0.10 per 1M tokens ($0.20 from December 1, 2026).
- When `max_output_tokens` is exhausted the response returns `finish_reason: "MAX_TOKENS"` with a `continuation_token`; resume with a higher `max_output_tokens` or `400 INVALID_ARGUMENT` results. This bullet describes only the case where the total `max_output_tokens` budget is used up (`MAX_TOKENS`).
- Distinct per-hop case (long decode): when a hop reaches the per-request cap with tokens remaining, the response ends with `finish_reason: CONTINUATION` and a `continuation_token`; continue while `finish_reason` is `CONTINUATION` and stop on any other finish reason. See the Long decode section of [inference-options.md](./inference-options.md).

### Gemini 3.7 Flash (whats-new-gemini-3.7)

```python
response = client.models.generate_content(
    model="gemini-3.7-flash",
    contents="Write a responsive navigation component in React with smooth animations and dark mode toggle."
)

print(response.text)
```

Notes:

- Source caution: "Gemini 3.7 Flash (`gemini-3.7-flash`) is deprecated and has been replaced by Gemini 3.8 Flash (`gemini-3.8-flash`)"; API requests to `gemini-3.7-flash` are automatically routed to `gemini-3.8-flash`. Default thinking level `medium`; 1M token context window, 64k max output tokens; thinking levels `low`, `medium`, `high`.
- Antigravity agent support requires the Interactions API. The linked `whats-new-gemini-3.8` page was not retrievable at fetch time, so Gemini 3.8 Flash specifics here come from the other pages.

### Gemini 3.6 Flash and 3.5 Flash-Lite (whats-new-gemini-3.6)

```python
response = client.models.generate_content(
    model="gemini-3.6-flash",
    contents="Write a three.js script that renders an interactive 3D robot.",
)

print(response.text)
```

| Model | Model ID | Default thinking level | Pricing |
| --- | --- | --- | --- |
| Gemini 3.6 Flash | `gemini-3.6-flash` | `medium` | $1.50/1M input tokens and $7.50/1M output tokens |
| Gemini 3.5 Flash-Lite | `gemini-3.5-flash-lite` | `minimal` | $0.30/1M input tokens and $2.50/1M output tokens |

Notes:

- Both remain available for production use; both support 1M context, 64k max output, thinking, and the full built-in tool suite including Computer Use. 3.6 Flash: token and turn reduction, improved code generation, better instruction following, stronger multimodal and spatial reasoning.

### Gemini 3.5 Flash (whats-new-gemini-3.5)

```python
response = client.models.generate_content(
    model="gemini-3.5-flash",
    contents="Explain how parallel agentic execution works in three sentences.",
)
print(response.text)
```

Notes:

- Deprecated: `gemini-3.5-flash` is automatically routed to `gemini-3.6-flash`. Default thinking effort changed from `high` to `medium`; `low` improved for code and agentic tasks; thought preservation across multi-turn conversations without API changes.

## Notes

- Sources: <https://ai.google.dev/gemini-api/docs/generate-content/gemini-3> (Gemini 3 developer guide), <https://ai.google.dev/gemini-api/docs/generate-content/latest-model> (Gemini 4 Argon), <https://ai.google.dev/gemini-api/docs/generate-content/whats-new-gemini-3.7> (3.7 Flash), <https://ai.google.dev/gemini-api/docs/generate-content/whats-new-gemini-3.6> (3.6 Flash / 3.5 Flash-Lite), <https://ai.google.dev/gemini-api/docs/generate-content/whats-new-gemini-3.5> (3.5 Flash).
- API surface: generateContent tree. The Interactions API is also supported with the same configuration options (per the 3.5 page).
- The coding-agent migration prompts in the source (for example `/gemini-api-dev migrate my app to Gemini 4 Argon`, `npx skills add google-gemini/gemini-skills --skill gemini-interactions-api --global`) refer to Gemini-side coding-agent skills; they are not this repository's skills and not Claude Code Agent Skills (anthropic-claude-code-extend skill).

## Related

- [Thinking (generateContent)](./thinking.md)
- [Context caching incl. explicit caching (generateContent)](./explicit-caching.md)
- [Gemini 3 developer guide (models)](../models/gemini-3-developer-guide.md)
- [What's new in Gemini 4 Argon (models)](../models/whats-new-gemini-4-argon.md)
- [What's new in Gemini 3.7 (models)](../models/whats-new-gemini-3-7.md)
