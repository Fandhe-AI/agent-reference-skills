---
source: https://opencode.ai/docs/console/go/#privacy
---

# OpenCode Go privacy

Model training and data retention terms for each model available through Go.

## Signature / Usage

Snippet taken from https://opencode.ai/docs/console/go/#endpoints (models endpoint, with per-model metadata):

```bash
curl https://opencode.ai/inference/go/v1/models
```

## Options / Props

| Model | Model training | Data retention |
| --- | --- | --- |
| Grok 4.7 | Not used | 30 days |
| GPT 6 Luna | Not used | 30 days |
| GPT 5.6 Luna | Not used | 30 days |
| Claude Haiku 5.5 | Not used | 30 days |
| Gemini 4 Argon | Not used | 0 days |
| GLM-5.3-Flash | Not used | 0 days |
| GLM-5.3 | Not used | 0 days |
| GLM-5.2 | Not used | 0 days |
| Kimi K3.1 Pro | Not used | 0 days |
| Kimi K3 | Not used | 0 days |
| Kimi K2.7 Code | Not used | 0 days |
| LongCat-2.0 | Not used | 0 days |
| MiMo-V2.6-Pro | Not used | 0 days |
| MiMo-V2.6-Flash | Not used | 0 days |
| MiMo-V2.5-Pro | Not used | 0 days |
| MiMo-V2.5 | Not used | 0 days |
| Qwen3.8 Max | Not used | 0 days |
| Qwen3.8 Flash | Not used | 0 days |
| Qwen3.7 Plus | Not used | 0 days |
| MiniMax M3.1 Flash | Not used | 0 days |
| MiniMax M3 | Not used | 0 days |
| Muse Spark 1.3 Contributor | Yes | Not ZDR |
| Muse Spark 1.2 Contributor | Yes | Not ZDR |
| DeepSeek V4.1 Flash | Not used | 0 days\* |
| DeepSeek V4 Pro | Not used | 0 days\* |
| Hy4 | Not used | 0 days |
| Hy4 preview | Not used | 0 days |
| Hy3 | Not used | 0 days |
| Step 5 Preview | Not used | 0 days |
| Beam Free | Not used | 30 days |
| Iceman Contributor Free | Yes | Not ZDR |
| LongCat 2.5 Free | Not used | 0 days |

- **Grok 4.7:** ZDR disables important API features that depend on stored data, including the stateful Responses API, Files and Collections, and the Batch API. [Learn more](https://docs.x.ai/developers/faq/security#what-is-zero-data-retention-zdr).
- **GPT 6 Luna / GPT 5.6 Luna:** Abuse monitoring logs are generated for all API feature usage and retained for up to 30 days. [Learn more](https://developers.openai.com/api/docs/guides/your-data#data-retention-controls-for-abuse-monitoring).
- **Claude Haiku 5.5:** Requests are retained for 30 days in accordance with [Anthropic's Data Policies](https://docs.anthropic.com/en/docs/claude-code/data-usage).
- **Muse Spark 1.3 Contributor:** Heavily discounted token pricing in exchange for permission to use your prompts and completions to train future Meta models. Availability is limited to regions permitted by Meta's [Geographic Use Policy](https://ai.developer.meta.com/legal/geographic-use-policy). [Learn more](https://dev.meta.ai/docs/pricing-rate-limits#contributor-tier).
- **Muse Spark 1.2 Contributor:** Heavily discounted token pricing in exchange for permission to use your prompts and completions to train future Meta models. Availability is limited to regions permitted by Meta's [Geographic Use Policy](https://ai.developer.meta.com/legal/geographic-use-policy). [Learn more](https://dev.meta.ai/docs/pricing-rate-limits#contributor-tier).
- **Iceman Contributor Free:** Free for a limited time in exchange for permission to use your prompts and completions to improve the model.
- **LongCat 2.5 Free:** Hosted in China. Requires **Global** regions in your workspace privacy settings.
- **DeepSeek:** ZDR agreement is renewed monthly. The current agreement is valid through November 30, 2026.

## Notes

- OpenCode Go is a Console subscription name, not the Go programming language (go-echo covers the Go web framework).
- ZDR = zero data retention. The table's `0 days\*` marker refers to the DeepSeek note above.
- To enable restricted models (DeepSeek, LongCat 2.5 Free, Muse Spark Contributor) see "Enable restricted models" in [OpenCode Go](./go-overview.md).

## Related

- [OpenCode Go](./go-overview.md)
- [Model pricing and privacy](./models-pricing.md)
