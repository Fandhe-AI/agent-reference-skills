---
source: https://ai.google.dev/gemini-api/docs/pricing
---

# Gemini Developer API pricing

Pricing for the Gemini Developer API: Free, Paid, and Enterprise (Gemini Enterprise Agent Platform) plans, per-model token prices by inference tier (Standard / Batch / Flex / Priority / Contributor), tool and agent pricing.

## Signature / Usage

Example per-model table from the page (Gemini 3.8 Flash, Standard):

```text
|   | Free Tier | Paid Tier, per 1M tokens in USD |
|---|---|---|
| Input price | Free of charge | $0.75 through December 31, 2026. $1.50 starting January 1, 2027. |
| Output price (including thinking tokens) | Free of charge | $3.75 through December 31, 2026. $7.50 starting January 1, 2027. |
| Context caching price | Free of charge | $0.075 through December 31, 2026. $0.15 starting January 1, 2027. $0.50 / 1,000,000 tokens per hour (storage price) through December 31, 2026. $1.00 / 1,000,000 tokens per hour (storage price) starting January 1, 2027. |
| Grounding with Google Search | Not available | 5,000 free search requests per month (shared across all Gemini 3 and newer models), then $14 per 1,000 requests. |
| Grounding with Google Maps | Not available | 5,000 requests per month (free, shared across all Gemini 3 and newer models), then $14 / 1,000 search queries. |
| Used to improve our products | Yes | No |
```

## Options / Props

Plans:

| Plan | Description |
|------|-------------|
| Free | Limited access to certain models; free input and output tokens; Google AI Studio access; content used to improve products |
| Paid | Higher rate limits; context caching; Batch API (50% cost reduction); most advanced models; content not used to improve products |
| Enterprise | Powered by Gemini Enterprise Agent Platform; dedicated support, security and compliance, provisioned throughput, volume discounts |

Model sections (each with Standard / Batch / Flex / Priority / Contributor tables where offered): Gemini 4 Argon, Gemini 3.8 Flash, Gemini 3.6 Flash, Gemini 3.8 Live / Live Extended Thinking / 3.1 Flash Live Preview, Gemini 3.5 Live Translate, Gemini 3.5 Transcribe Live, Gemini 3.5 Transcribe, Gemini 3.5 Flash-Lite, Gemini 3.1 Flash-Lite, Gemini Omni Flash (and Preview), Gemini 3.1 Pro Preview, Gemini Nano Banana 2.1, Gemini 3.1 Flash Image, Gemini 3.1 Flash Lite Image, Gemini 3.8 Flash TTS, Gemini 3.8 Flash-Lite TTS, Gemini 3.1 Flash TTS Preview, Gemini 3 Flash Preview, Gemini 3 Pro Image, Gemini 2.5 Pro / Flash / Flash-Lite, Gemini 2.5 Flash Native Audio (Live API), Gemini 2.5 Flash Image, Gemini 2.5 Flash / Pro Preview TTS, Veo 3.1, Lyria 3.5, Lyria 3, Gemini Embedding 2, Gemini Robotics ER 2 Preview / Streaming Preview, Gemma 4.

Tool pricing (Paid tier):

| Tool | Pricing |
|------|---------|
| Google Search | Gemini 2.5 models: 1,500 RPD free (shared for Flash and Flash-Lite), then $35 / 1,000 grounded prompts. Gemini 3 and newer: 5,000 free search requests per month (shared), then $14 per 1,000 requests |
| Google Maps | Gemini 2.5 models: 1,500 RPD free (10,000 RPD free for Pro), then $25 / 1,000 grounded prompts. Gemini 3 and newer: 5,000 requests per month, then $14 / 1,000 search queries |
| Code execution | Standard token rates for the selected model; generated code and results billed as Output tokens when created and Input tokens when reused |
| URL context | Charged as input tokens per model pricing |
| Computer use | Not available on Free; charged as regular tokens per model pricing |
| File search | Embeddings at $0.15 / 1M tokens; retrieved document tokens charged as regular tokens |
| Custom Tools endpoint (Gemini 3.1 Pro Preview) | Same as Gemini 3.1 Pro Preview pricing |

Agent pricing: Deep Research agent, Managed agents in Gemini API, and Antigravity Agent are charged at standard Gemini list rates for all model inference (input, output, intermediate reasoning tokens); environment compute (CPU, memory, sandbox execution) is not billed during the preview period.

## Notes

- document-processing.md says Gemini 3 reports PDF page tokens under the IMAGE modality, not DOCUMENT; the source pages disagree with this page's DOCUMENT modality statement.
- Prices, dates, and model IDs here are transcribed from the page as fetched 2026-10-16; they change over time and several models list a price step on a stated future date (for example Gemini 4 Argon: lower price through November 30, 2026, doubled from December 1, 2026; Gemini 3.8 Flash: through December 31, 2026, then from January 1, 2027). Read the model section on the live page before quoting a price.
- Gemini 4 Argon is not available on the Free tier or on the Google AI Pro plan; its context caching is implicit only (explicit caching is not supported).
- The Contributor tier is a private, invite-only preview; speed and reliability equal Standard, and data is used to improve products.
- Document token billing: `DOCUMENT` modality tokens (for example PDFs) are billed at the image token rate (shown under `promptTokensDetails`). Agentic video understanding token usage is variable.
- With dynamic retrieval, only requests containing at least one grounding support URL from the web are charged for Grounding with Google Search.
- Google AI Studio usage is free in all available regions. Gemini Enterprise Agent Platform prices may differ from those listed.
- Flex and Batch are 50% of standard; Priority is 75-100% more (see the Flex and Priority pages).
- Docs fetched 2026-10-16.

## Related

- [billing](./billing.md)
- [rate-limits](./rate-limits.md)
- [flex-inference](./flex-inference.md)
- [priority-inference](./priority-inference.md)
- [batch-api](./batch-api.md)
