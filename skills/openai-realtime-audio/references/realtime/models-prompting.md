# Using realtime models

Prompting guidance for realtime speech-to-speech models: reasoning effort, preambles, tool policy, entity capture, and migrating older prompts.

## Signature / Usage

```text
Prompt sections: Role and Objective / Personality and Tone / Language /
Reasoning / Preambles / Tools / Entity Capture / Escalation
```

## Options / Props

| Model | Use when |
|------|-------------|
| `gpt-realtime-2` | Strongest realtime reasoning, tool use, instruction following |
| `gpt-realtime-1.5` | Fast, reliable non-reasoning speech-to-speech, when latency is critical |

| `reasoning.effort` | Use for |
|------|-------------|
| `minimal` | Smart-home commands, timers |
| `low` | Customer support, order lookup (recommended default) |
| `medium` | Multi-step technical support, diagnostics |
| `high` | Complex workflows requiring deeper analysis |
| `xhigh` | Critical planning and triage |

## Notes

- The official guide (`guides/voice-prompting`, now titled "Prompting Realtime models") still lists `gpt-realtime-2` and `gpt-realtime-1.5` in its "Choose a model" table, so the table above is kept as in the source. Other guides' code examples use `gpt-realtime-2.1`.
- `gpt-realtime-2.1` was released Jul 6, 2026 (changelog): "an updated realtime reasoning model with improved alphanumeric recognition, silence and noise handling, and interruption behavior". Model page: 128,000 context window, 32,000 max output tokens.
- `gpt-realtime-2.1-mini` is a "distilled reasoning model for faster, lower-cost realtime voice interactions" (model page: 128,000 context window, 32,000 max output tokens).
- Realtime 2 expands the realtime context window from 32k to 128k tokens ("What changed in Realtime 2" table).
- Prompting for GPT-Live is a separate guide; see [GPT-Live prompting](../live/prompting.md).
- Start prompts minimal and expand only after testing reveals specific gaps.
- Use short spoken preambles ("I'll check that now") during tool calls/reasoning; avoid filler like "Let me think..." and skip preambles for direct answers.
- Confirm high-precision identifiers (order IDs, emails, phone numbers) digit-by-digit or character-by-character before calling a tool.
- Don't infer language from accent; only switch language on an explicit request or a substantive utterance in another language.
- Don't reason or call tools on unintelligible audio — ask for clarification instead.
- When migrating older prompts: set `reasoning.effort` to `low` initially, audit tool alignment between the prompt and the API tool definitions, and re-run evaluations rather than porting prompts verbatim (the model follows literal instructions more strictly than earlier models).

## Related

- [Conversations](./conversations.md)
- [Voice agents](./voice-agents.md)
- [Tools and MCP](./tools-mcp.md)
