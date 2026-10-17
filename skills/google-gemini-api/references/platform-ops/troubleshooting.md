---
source: https://ai.google.dev/gemini-api/docs/troubleshooting
---

# Troubleshooting guide

Diagnose and resolve common issues when calling the Gemini API: retry strategy, parameter ranges, thinking latency, safety and recitation blocks, repetitive output, and blocked API keys.

## Signature / Usage

Blocked-key error text from the page:

```text
Your API key was reported as leaked. Please use another API key.
```

## Options / Props

Model parameter ranges to verify:

| Model parameter | Values (range) |
|---|---|
| Candidate count | 1-8 (integer) |
| Temperature | 0.0-1.0 |
| Max output tokens | Use the models page for the model's maximum |
| TopP | 0.0-1.0 |

Repetitive output causes and workarounds:

| Description | Cause | Suggested workaround |
|---|---|---|
| Repeated hyphens in Markdown tables | Model tries to visually align long tables | Add table-format guidelines to the prompt (separator of 3 hyphens per column, no padding); try temperature >= 0.8 |
| Repeated tokens in Markdown tables | Same alignment attempt | Add instructions to the system prompt; try temperature >= 0.8 |
| Repeated newlines in structured output | Unicode or escape sequences like `\u` or `\t` in the input | Replace forbidden escapes with UTF-8; instruct the model on allowed escapes |
| Repeated text in structured output | Output field order differs from the schema | Do not specify field order in the prompt; make all output fields required |
| Repetitive tool calling | Model loses previous thoughts or calls an unavailable endpoint | Ask the model to recap progress at the start of each thought |
| Repetitive text outside structured output | Model stuck on an unresolvable request | Avoid explicit thinking orders; temperature >= 0.8; add "Be concise" / "Don't repeat yourself" |

## Notes

- The `>= 0.8` temperature workaround in the table above predates the Gemini 3.x guidance; for Gemini 3.x the page recommends keeping temperature at its default (setting it below 1.0 can cause looping).
- Retry strategy: official SDKs retry transient errors (timeouts, network issues, `429` and `5xx`) automatically with exponential backoff; the page says the Python SDK retries up to four times with an initial delay of about 1 second and a maximum of 60 seconds. For direct REST: use exponential backoff (1s, 2s, 4s, 8s), add jitter, retry only transient errors (`429`, `408`, `5xx`; not `400`, `402`, `403`), and set a maximum retry count.
- Use the correct API version (`/v1` or `/v1beta`); a Beta feature is available only in `/v1beta`.
- Gemini 3.x models have thinking enabled by default (deprecated Gemini 2.5 models also use default thinking), which raises latency and token usage; lower the thinking level or turn thinking off.
- Safety: review a blocked prompt against the filters set in the call; `BlockedReason.OTHER` means the query or response may violate the terms of service or be unsupported. Recitation: make the prompt or context more unique and use a higher temperature.
- The page strongly recommends keeping `temperature`, `top_p`, and `top_k` at defaults for Gemini 3.x models; changing them (for example temperature below 1.0) can cause looping or degraded performance.
- Leaked keys are proactively blocked; check status and generate new keys in Google AI Studio. New keys from AI Studio are moving toward being limited to AI Studio by default. Unexpected charges: submit a billing support case.
- Known issue: only select languages are supported; prompts in unsupported languages can produce unexpected or blocked responses.
- SDK repositories named on the page: python-genai, js-genai, go-genai.
- Docs fetched 2026-10-16.

## Related

- [api-errors](./api-errors.md)
- [rate-limits](./rate-limits.md)
- [billing](./billing.md)
