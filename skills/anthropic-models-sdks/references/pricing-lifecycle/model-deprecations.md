<!-- source: https://platform.claude.com/docs/en/about-claude/model-deprecations / last verified: 2026-08-07 -->

# Model deprecations

Which Claude models are active, deprecated, or retired, with retirement dates and recommended replacements for models and API parameters.

## Signature / Usage

Anthropic uses the following lifecycle terms:

- **Active:** fully supported and recommended for use.
- **Legacy:** no longer receives updates and may be deprecated in the future.
- **Deprecated:** still functional but no longer recommended; Anthropic provides a recommended replacement and a retirement date.
- **Retired:** no longer available; requests fail.

Dates on this page apply to Anthropic-operated platforms (Claude API, Claude Platform on AWS, Microsoft Foundry). Partner-operated platforms (Amazon Bedrock, Google Cloud) set their own retirement schedules and can differ. Anthropic notifies customers with active deployments at least 60 days before retirement for publicly released models.

### Model status

| API model name | Current state | Deprecated | Tentative retirement date |
| --- | --- | --- | --- |
| claude-fable-5 | Active | N/A | Not sooner than June 9, 2027 |
| claude-opus-5 | Active | N/A | Not sooner than July 24, 2027 |
| claude-opus-4-8 | Active | N/A | Not sooner than May 28, 2027 |
| claude-opus-4-7 | Active | N/A | Not sooner than April 16, 2027 |
| claude-opus-4-6 | Active | N/A | Not sooner than February 5, 2027 |
| claude-opus-4-5-20251101 | Active | N/A | Not sooner than November 24, 2026 |
| claude-opus-4-1-20250805 | Retired | June 5, 2026 | August 5, 2026 |
| claude-opus-4-20250514 | Retired | April 14, 2026 | June 15, 2026 |
| claude-sonnet-5 | Active | N/A | Not sooner than June 30, 2027 |
| claude-sonnet-4-6 | Active | N/A | Not sooner than February 17, 2027 |
| claude-sonnet-4-5-20250929 | Active | N/A | Not sooner than September 29, 2026 |
| claude-sonnet-4-20250514 | Retired | April 14, 2026 | June 15, 2026 |
| claude-3-7-sonnet-20250219 | Retired | October 28, 2025 | February 19, 2026 |
| claude-haiku-4-5-20251001 | Active | N/A | Not sooner than October 15, 2026 |
| claude-3-5-haiku-20241022 | Retired | December 19, 2025 | February 19, 2026 |
| claude-3-haiku-20240307 | Retired | February 19, 2026 | April 20, 2026 |

Claude Mythos Preview (`claude-mythos-preview`) is deprecated; migrate to Claude Mythos 5 (`claude-mythos-5`).

### Deprecation history (most recent first)

| Announced | Retirement date | Deprecated model | Recommended replacement |
| --- | --- | --- | --- |
| 2026-06-05 | August 5, 2026 | `claude-opus-4-1-20250805` | `claude-opus-4-8` |
| 2026-04-14 | June 15, 2026 | `claude-sonnet-4-20250514` | `claude-sonnet-4-6` |
| 2026-04-14 | June 15, 2026 | `claude-opus-4-20250514` | `claude-opus-4-8` |
| 2026-02-19 | April 20, 2026 | `claude-3-haiku-20240307` | `claude-haiku-4-5-20251001` |
| 2025-12-19 | February 19, 2026 | `claude-3-5-haiku-20241022` | `claude-haiku-4-5-20251001` |
| 2025-10-28 | February 19, 2026 | `claude-3-7-sonnet-20250219` | `claude-sonnet-4-6` |
| 2025-08-13 | October 28, 2025 | `claude-3-5-sonnet-20240620` | `claude-sonnet-4-6` |
| 2025-08-13 | October 28, 2025 | `claude-3-5-sonnet-20241022` | `claude-sonnet-4-6` |
| 2025-06-30 | January 5, 2026 | `claude-3-opus-20240229` | `claude-opus-4-8` |
| 2025-01-21 | July 21, 2025 | `claude-2.0` | `claude-opus-4-8` |
| 2025-01-21 | July 21, 2025 | `claude-2.1` | `claude-opus-4-8` |
| 2025-01-21 | July 21, 2025 | `claude-3-sonnet-20240229` | `claude-sonnet-4-6` |
| 2024-09-04 | November 6, 2024 | `claude-1.0` / `claude-1.1` / `claude-1.2` / `claude-1.3` | `claude-haiku-4-5-20251001` |
| 2024-09-04 | November 6, 2024 | `claude-instant-1.0` / `claude-instant-1.1` / `claude-instant-1.2` | `claude-haiku-4-5-20251001` |

### API parameter deprecations

| Parameter | Status | Behavior | Recommended replacement |
| --- | --- | --- | --- |
| `temperature`, `top_p`, `top_k` | Deprecated (Claude Opus 4.7 and later) | Returns a 400 error when set to a non-default value on Claude 4.7+ models and Claude Mythos Preview | Omit and use prompting to guide model behavior |

## Notes

- Auditing usage: Claude Console Usage page > Export > review the CSV, broken down by API key and model, to find deprecated-model usage.
- Anthropic deprecates/retires models to ensure capacity for new releases, which has downsides (forced migration, lost access for comparative research, model-welfare risk); Anthropic has committed to long-term preservation of model weights (see "Commitments on Model Deprecation and Preservation").
- Deprecated models are likely less reliable than active models; move workloads to active models for the highest level of support.

## Related

- [Models overview](../models/overview.md)
- [Migration guide](../models/migration-guide.md)
- [Pricing](./pricing.md)
