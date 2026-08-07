<!-- source: https://platform.claude.com/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5 / last verified: 2026-08-07 -->

# Introducing Claude Fable 5 and Claude Mythos 5

Claude Fable 5 and Claude Mythos 5 capabilities, API changes, and availability.

## Signature / Usage

Claude Fable 5 is Anthropic's most capable widely released model, built for the most demanding reasoning and long-horizon agentic work. Claude Mythos 5 shares the same capabilities and is available only in limited release through Project Glasswing.

The headline change for integrations: Claude Fable 5 includes safety classifiers that can decline requests. Claude Mythos 5 does not include these classifiers. Integrations calling Claude Fable 5 should plan for three changes: new response handling for refusals, fallback options for retrying on another Claude model, and new billing rules.

| Model | API model ID | Description |
| --- | --- | --- |
| Claude Fable 5 | `claude-fable-5` | Anthropic's most capable widely released model, for the most demanding reasoning and long-horizon agentic work |
| Claude Mythos 5 | `claude-mythos-5` | Shares Claude Fable 5's capabilities without the safety classifiers. Available through Project Glasswing. Successor to Claude Mythos Preview |

Shared specs and pricing: 1M token context window by default, up to 128k output tokens per request; $10 USD per million input tokens and $50 USD per million output tokens.

### Refusals, fallback, and billing on Claude Fable 5

Applies to Claude Fable 5 only (Claude Mythos 5 has no safety classifiers).

- **Refusals:** when Claude Fable 5 declines a request, the Messages API returns `stop_reason: "refusal"` as a successful HTTP 200 response, not an error. The response also reports which classifier declined the request.
- **Fallback:** a refused request can usually be served by another Claude model. Three ways to retry: server-side (`fallbacks` parameter, `"default"` mode or named models, beta), client-side (SDK middleware retry), or manual (build the retry yourself).
- **Billing:** not billed for a request refused before any output is generated. Retrying on another model via fallback credit refunds the prompt-cache cost of switching, avoiding paying it twice.

### Availability

Both models become available June 9, 2026. Claude Fable 5 is generally available on the Claude API, Amazon Bedrock, Claude Platform on AWS, Google Cloud, and Microsoft Foundry. Claude Mythos 5 is not GA — offered in limited availability to approved customers in Project Glasswing; contact an Anthropic, AWS, or Google Cloud account team for access.

Both models carry 30-day data retention and are not available under zero data retention; both are designated Covered Models.

### Messages API behavior

- **Adaptive thinking is always on:** passing `thinking: {"type": "disabled"}` is not supported. Use the `effort` parameter to control thinking depth.
- **Raw thinking content is never returned:** `thinking.display` controls output — `"summarized"` returns a readable summary; `"omitted"` (default) returns thinking blocks with an empty `thinking` field. Pass thinking blocks back unchanged in multi-turn conversations on the same model.

### Supported features at launch

Effort; task budgets (beta: `task-budgets-2026-03-13` header); the memory tool; code execution; programmatic tool calling; tool result clearing through context editing (beta: `context-management-2025-06-27` header); compaction; vision.

## Notes

- Access to Claude Fable 5 and Claude Mythos 5 was restored after a prior interruption (see Anthropic's "redeploying-fable-5" statement).
- Migration: from Claude Mythos Preview, see the migration guide's Mythos Preview section; from Claude Opus 4.8, see the migration guide's Opus 4.8 section.

## Related

- [Migration guide](./migration-guide.md)
- [Models overview](./overview.md)
