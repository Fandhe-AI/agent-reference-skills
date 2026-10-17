---
source: https://ai.google.dev/gemini-api/docs/optimization
---

# Optimization and inference

Mechanisms for balancing speed, cost, and reliability: standard, Flex, Priority, Batch, and caching, plus agentic video processing.

## Signature / Usage

The guide has no code sample for the main comparison; its table, verbatim:

```text
| Feature | Standard | Flex | Priority | Batch | Caching |
|---|---|---|---|---|---|
| **Pricing** | Full Price | 50% discount | 75% to 100% more than standard | 50% discount | 90% discount + Prorated token storage |
| **Latency** | Seconds to minutes | Minutes (1--15 min target) | Seconds | Up to 24 hours | Faster time-to-first-token |
| **Reliability** | High / Medium-high | Best-effort (Sheddable) | High (Non-sheddable) | High (for throughput) | N/A |
| **Interface** | Synchronous | Synchronous | Synchronous | Asynchronous | Saved state |
| **Best use case** | General application workflows | Non-urgent sequential chains | Production, user-facing apps | Massive datasets, offline evals | Recurring queries over same file |
```

Synchronous tiers are selected with the `service_tier` parameter in standard generation calls. Agentic video processing flag, from the guide:

```text
processing: "agentic"          (Interactions API)
media_processing: "AGENTIC"    (GenerateContent API)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| service_tier | string | Shifts synchronous traffic between reliability-optimized (Priority) and cost-optimized (Flex); Standard is the default |
| processing | string | `"agentic"` on a video input (Interactions API) |
| media_processing | string | `"AGENTIC"` on a video input (GenerateContent API) |

## Notes

- The 90% caching discount is the general figure from this guide; the long-decode guide states a 95% discount on repeated input for Gemini 4 Argon during the introductory period.
- Availability: guide covers both APIs; `processing` is Interactions API, `media_processing` is generateContent.
- Priority: highest criticality, non-sheddable; when dynamic Priority limits are exceeded the request is downgraded to Standard instead of failing.
- Flex: 50% of Standard, sheddable (may be preempted), synchronous; suited to multi-step agentic workflows where call N+1 depends on call N, background CRM updates, offline evaluations.
- Batch API: 50% of standard cost, in-line dictionaries or JSONL input file (up to 2GB), target turnaround 24 hours, 24h automated retries.
- Context caching: implicit caching is automatic on Gemini 2.5 and newer; explicit caching creates a cache object with a TTL and is billed on cache token count and storage duration.
- Agentic video processing can reduce input token costs by up to 88%; use with Gemini 3.8 Flash, 3.6 Flash, or 3.5 Flash Lite (unsupported models return an error). For clips under 5 minutes where latency matters, static processing may give faster time to first token.
- Distinct from the Message Batches and prompt caching features of `anthropic-api-core` and `openai-api-core`.

## Related

- [Context caching (implicit)](./implicit-caching.md)
- [Background execution](./background-execution.md)
