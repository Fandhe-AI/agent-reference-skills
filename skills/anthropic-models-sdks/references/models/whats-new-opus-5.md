<!-- source: https://platform.claude.com/docs/en/about-claude/models/whats-new-opus-5 / last verified: 2026-08-07 -->

# What's new in Claude Opus 5

Overview of new features and behavior changes in Claude Opus 5, a step-change improvement over Claude Opus 4.8 with the largest gains in deep reasoning, agentic and long-horizon tasks, and test-time compute scaling.

## Signature / Usage

| Model | API model ID | Description |
| --- | --- | --- |
| Claude Opus 5 | `claude-opus-5` | For complex agentic coding and enterprise work |

Claude Opus 5 has a 1M token context window (both default and maximum; no smaller context variant), 128k max output tokens, and thinking on by default.

```bash
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  -d '{
    "model": "claude-opus-5",
    "max_tokens": 64000,
    "stream": true,
    "output_config": { "effort": "max" },
    "messages": [{"role": "user", "content": "Explain why the sum of two even numbers is always even."}]
  }'
```

### New features

- **Mid-conversation tool changes (beta):** add or remove tools between turns while preserving the prompt cache. Beta header: `mid-conversation-tool-changes-2026-07-01`.
- **Default fallbacks mode:** `fallbacks` parameter supports `"default"` mode (Anthropic's recommended fallback models by refusal category) in addition to explicit model lists. Beta header `server-side-fallback-2026-07-01` supports both; the earlier `server-side-fallback-2026-06-01` header accepts only explicit lists.
- **Lower prompt cache minimum:** minimum cacheable prompt length is 512 tokens (down from 1,024 on Claude Opus 4.8).
- **Fast mode:** research preview, Claude API only (not on Bedrock, Google Cloud, or Microsoft Foundry). Priced at $10/MTok input, $50/MTok output.

## Options / Props

Effort ladder: `low`, `medium`, `high` (default), `xhigh`, `max`.

## Notes

- **Thinking on by default:** on Claude Opus 4.8, requests run without thinking unless `thinking: {"type": "adaptive"}` is set. On Claude Opus 5, thinking runs by default; the wire value `thinking: {"type": "adaptive"}` remains valid and equivalent to default. Because `max_tokens` is a hard limit on total output (thinking plus response text), revisit it for workloads that ran without thinking on Opus 4.8.
- **Disabling thinking requires effort `high` or below:** `thinking: {"type": "disabled"}` is accepted only at effort `high` or below; setting it with `xhigh` or `max` returns a 400 error. This is a breaking change from Claude Opus 4.8. With thinking disabled, Claude Opus 5 can occasionally write a tool call into text output instead of a `tool_use` block, or include internal XML tags in visible responses.
- Model behavior differences from Opus 4.8: longer default responses/deliverables, more frequent progress narration in agentic sessions, more readily delegates to subagents, verifies its own work without being told (remove carried-over "add a verification step" instructions — they cause over-verification).
- Capability improvements over Opus 4.8: deep reasoning, agentic coding/long-horizon tasks, test-time compute scaling, efficiency at lower effort levels, code review/bug-finding, vision, long-context work (1M tokens, default and maximum), office/document tasks, multi-agent coordination.
- Pricing: $5/MTok input, $25/MTok output — unchanged from Claude Opus 4.8.
- Availability: Claude API (`claude-opus-5`); AWS via Claude in Amazon Bedrock (`anthropic.claude-opus-5`, also reachable via `InvokeModel` on `bedrock-runtime`; not included in the legacy Claude on Amazon Bedrock ARN-versioned table); Google Cloud (`claude-opus-5`); Microsoft Foundry. Claude Opus 4.8 remains available on all of these platforms.

## Related

- [Models overview](./overview.md)
- [Migration guide](./migration-guide.md)
- [Choosing a model](./choosing-a-model.md)
