<!-- source: https://platform.claude.com/docs/en/models/opus-5-5/migration-guide / last verified: 2026-10-17 -->

# Claude Opus 5.5 migration guide

Code changes for moving to Claude Opus 5.5 from Opus 5, Opus 4.8, Opus 4.7, Opus 4.6 and earlier, or Claude Sonnet 5. Covers Messages API code; Claude Managed Agents users only update the model name.

## Signature / Usage

A request that satisfies every Opus 5.5 requirement (effort set, no `thinking` field, read blocks by type):

```python
client = anthropic.Anthropic()

response = client.messages.create(
    model="claude-opus-5-5",
    max_tokens=4096,
    messages=[
        {
            "role": "user",
            "content": "Analyze the trade-offs between microservices and monolithic architectures",
        }
    ],
    output_config={"effort": "medium"},
)

for block in response.content:
    if block.type == "text":
        print(block.text)
```

## Notes

- **Every request must satisfy:** model ID `claude-opus-5-5` (fixed, no date suffix); no `thinking` field or `{"type": "adaptive"}` (`disabled` and `enabled` with `budget_tokens` are rejected); control depth with `effort` (`low`, `medium`, `high`, `xhigh`, `max`; default `medium`); `tool_choice` `auto` or `none` only; omit `temperature` / `top_p` / `top_k` (or leave at defaults); no prefill; on Claude API and Google Cloud declare computer use as `computer_toolset_20260801`; no context-window beta header needed (1M default). On Amazon Bedrock structured outputs (including strict tool use) are not available for Opus 5.5.
- **Handle thinking in every response:** (1) `max_tokens` covers thinking plus text; at `xhigh` / `max` start at 64k; (2) responses begin with `thinking` blocks, so select by `type`, not `content[0].text`; (3) return `thinking` blocks unmodified in tool-use loops, including empty ones; (4) `thinking.display` defaults to `"omitted"`, set `"summarized"` for summaries; (5) text between tool calls arrives in `thinking` blocks (use `display: "updates"` (beta, `thinking-display-updates-2026-08-18`) or `"summarized"` and render non-empty blocks before the following `tool_use`).
- **From Opus 5:** thinking can't be disabled; forced tool use returns 400 (use `auto` plus `strict: true` and say in the prompt when the tool applies; every schema object needs `additionalProperties: false`); thinking blocks tied to model and conversation (keep history append-only; mid-conversation system messages for instruction changes); on Claude API and Google Cloud replace `computer_20251124` (drop beta header, entry `{"type": "computer_toolset_20260801"}`, handle member `tool_use` blocks by `name`, echo `toolset_name` on results). Recommended: re-run effort sweep (default is `medium`, Opus 5's was `high`), re-evaluate model-specific prompts, test in development.
- **From Opus 4.8:** requests without `thinking` now run with thinking; minimum cacheable prompt 512 tokens (1,024 on 4.8); Priority Tier is not supported on Opus 5.5; consider task budgets (beta, header `task-budgets-2026-03-13`) and mid-conversation tool changes (beta, `inline-tools-2026-09-15`; older `mid-conversation-tool-changes-2026-07-01` still works for by-reference changes).
- **From Opus 4.7:** effort levels recalibrated; 1M context default (remove context-window beta header); mid-conversation system messages accepted (4.7 rejects `role: "system"` in `messages` with 400); refusals return `stop_details`; fast mode via `speed: "fast"`; computer use toolset and browser use tool.
- **From Opus 4.6 and earlier:** extended thinking removed (400); sampling parameters removed; thinking content omitted by default; new tokenizer (about 1x-1.35x more tokens); high-resolution images up to 2,576px on the long edge (up to about 3x image tokens, up to 4,784 tokens per image; coordinates 1:1 with pixels); real-time cyber safeguards (Cyber Verification Program for legitimate security work); prefill removal.
- **From Opus 4.5 or earlier:** tool-call JSON escaping may differ (use a standard JSON parser); remove beta headers `effort-2025-11-24`, `fine-grained-tool-streaming-2025-05-14`, `interleaved-thinking-2025-05-14`; use `client.messages.create()` instead of the beta namespace; `output_format` is deprecated, use `output_config.format`.
- **From Claude 4.1 or earlier:** update tool versions (`text_editor_20250728`, `code_execution_20260521`); handle `refusal` and `model_context_window_exceeded` stop reasons; remove `token-efficient-tools-2025-02-19` and `output-128k-2025-02-19`.
- **From Sonnet 5:** mid-conversation system messages not available on Sonnet 5; minimum cacheable prompt 512 tokens (1,024 on Sonnet 5); none of the Opus 4.x required changes apply.
- **Safety:** `stop_details.category` can include `"bio"`, `"cyber"`, `"reasoning_extraction"`; server-side fallback does not retry `reasoning_extraction`.
- Claude Code: `/claude-api migrate this project to claude-opus-5-5` automates the model ID swap and parameter changes.

## Related

- [What's new in Claude Opus 5.5](./whats-new-opus-5-5.md)
- [Migration Guide](./migration-guide.md)
- [Models overview](./overview.md)
