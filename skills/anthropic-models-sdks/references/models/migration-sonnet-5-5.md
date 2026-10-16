<!-- source: https://platform.claude.com/docs/en/models/sonnet-5-5/migration-guide / last verified: 2026-10-17 -->

# Claude Sonnet 5.5 migration guide

Code changes for moving to Claude Sonnet 5.5 from Sonnet 5, Sonnet 4.6, Sonnet 4.5, Sonnet 4, Claude 3.7 Sonnet, or Claude Haiku 4.5. Covers Messages API code; Claude Managed Agents users only update the model name.

## Signature / Usage

```python
client = anthropic.Anthropic()

response = client.messages.create(
    model="claude-sonnet-5-5",
    max_tokens=4096,
    messages=[
        {
            "role": "user",
            "content": "Analyze the trade-offs between microservices and monolithic architectures",
        }
    ],
    output_config={"effort": "medium"},
)

print(f"Stop reason: {response.stop_reason}")
for block in response.content:
    if block.type == "text":
        print(block.text)
```

## Notes

- **Thinking by default:** a request with no `thinking` field (or `{"type": "adaptive"}`) runs with adaptive thinking; Sonnet 4.6 and earlier and Haiku 4.5 ran without. Accepted `thinking.type` values: Sonnet 5.5 `"adaptive"`, `"between_tools"` (default `display` `"omitted"`); Sonnet 5 `"adaptive"`, `"disabled"`; Sonnet 4.6 `"adaptive"`, `"disabled"`, `"enabled"` (deprecated) (default `"summarized"`); Sonnet 4.5 / Haiku 4.5 `"disabled"`, `"enabled"`.
- **Handle thinking in responses:** read content blocks by `type`; pass `thinking` blocks back unchanged (including empty ones); revisit `max_tokens` (covers thinking plus text). For readable summaries set `display: "summarized"`.
- **Turn off up-front thinking:** send `thinking: {"type": "between_tools"}` (at `low` / `medium` / `high` effort, no beta header); `disabled` returns 400. With server-side fallback, a `between_tools` request that falls back to Sonnet 5 runs there with `disabled`. No other fields allowed with `between_tools`; effort can't change mid-conversation.
- **Forced tool use:** `tool_choice` `any` / `tool` returns 400 (`tool_choice: type "tool" and "any" are not supported for this model.`) including token counting. Use `auto` plus `strict: true` (every object needs `additionalProperties: false`; at most 20 strict tools per request; MCP, computer use, and browser use toolset entries don't accept `strict`). On Amazon Bedrock structured outputs are not available: send `auto` without `strict` and validate in code.
- **Thinking blocks:** Sonnet 5.5 reads blocks from Sonnet 5, Opus 4.8, Haiku 4.5, earlier models and (Claude API, Google Cloud) Haiku 5.5; not Opus 5 / 5.5 / Fable / Mythos. Prefix check enforced by default for accounts created on or after August 31, 2026, 00:00 UTC on the Claude API, Amazon Bedrock, and Google Cloud. Blocks work only in the producing account or a linked one.
- **Computer use:** on the Claude API and Google Cloud only `computer_toolset_20260801` (both `computer_20251124` and `computer_20250124` return 400); Amazon Bedrock uses `computer_20251124` (also for those coming from `computer_20250124`). Remove beta header `fine-grained-tool-streaming-2025-05-14` alongside a toolset entry (400) and set `eager_input_streaming: true` per tool instead.
- **Advisor tool:** Sonnet 5.5 executor needs Opus 5, Opus 5.5, Sonnet 5.5, Fable 5, Fable 5.1, Mythos 5, or Mythos 5.1 as advisor; Opus 4.8, 4.7, 4.6, Sonnet 5, Sonnet 4.6, and Haiku 5.5 return 400. Advice is encrypted (`advisor_redacted_result`).
- **Text between tool calls:** notes longer than a sentence or two return as progress-update `thinking` blocks, empty at default `display`; use `display: "updates"` (beta, `thinking-display-updates-2026-08-18`), `"summarized"`, or `between_tools`.
- **Safety:** `stop_details` categories `cyber`, `bio`, `frontier_llm`, `reasoning_extraction`, `general_harms`; server-side fallback (`fallbacks: "default"`, beta, Claude API only) retries `cyber` and `frontier_llm` on Sonnet 5.
- **Other changes from Sonnet 5:** minimum cacheable prompt 512 tokens (1,024 on Sonnet 5 / 4.6 / 4.5); prompt cache reads $0.10 per MTok; five effort levels with recalibrated amounts, default `high` on the Claude API.
- **From Sonnet 4.6 and earlier:** thinking budgets return 400 (`"thinking.type.enabled" is not supported for this model.`), replace with `{"type": "adaptive"}` plus `effort`; non-default `temperature` / `top_p` / `top_k` return 400; about 30% more tokens; high-resolution images up to 2576px and 4,784 visual tokens (4.6 / 4.5 / Haiku 4.5: 1568px, 1,568 tokens; a 2000x1500 image costs about 2.5x).
- **From Sonnet 4.5 or earlier:** prefill returns 400 (`This model does not support assistant message prefill. The conversation must end with a user message.`); tool input escaping can differ; set effort explicitly; remove context-window beta header and `interleaved-thinking-2025-05-14`; `output_format` deprecated, use `output_config.format`.
- **From Sonnet 4 / 3.7:** use `text_editor_20250728` and `code_execution_20260521`; handle `refusal` and `model_context_window_exceeded`; remove `token-efficient-tools-2025-02-19` and `output-128k-2025-02-19`. Sonnet 4 is retired on the Claude API (still on Bedrock and Google Cloud); 3.7 Sonnet is retired.
- **From Haiku 4.5:** replace `claude-haiku-4-5-20251001` (or alias); higher per-token price; cache minimum drops from 4,096 tokens; Sonnet 5.5 reads Haiku 4.5 thinking blocks, but moving back down drops Sonnet 5.5 blocks.
- Claude Code: `/claude-api migrate this project to claude-sonnet-5-5`.

## Related

- [What's new in Claude Sonnet 5.5](./whats-new-sonnet-5-5.md)
- [Migration Guide](./migration-guide.md)
- [Models overview](./overview.md)
