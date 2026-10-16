<!-- source: https://platform.claude.com/docs/en/models/haiku-5-5/migration-guide / last verified: 2026-10-17 -->

# Claude Haiku 5.5 migration guide

Code changes for moving from Claude Haiku 4.5 (and Haiku 3.5 / 3) to Claude Haiku 5.5. Covers Messages API code; Claude Managed Agents users only update the model name.

## Signature / Usage

Model IDs by platform:

| Platform | Claude Haiku 4.5 | Claude Haiku 5.5 |
| --- | --- | --- |
| Claude API | `claude-haiku-4-5-20251001` or `claude-haiku-4-5` | `claude-haiku-5-5` |
| Amazon Bedrock | `anthropic.claude-haiku-4-5` | `anthropic.claude-haiku-5-5` |
| Claude Platform on AWS | `claude-haiku-4-5` | `claude-haiku-5-5` |
| Google Cloud | `claude-haiku-4-5@20251001` | `claude-haiku-5-5` |
| Microsoft Foundry | `claude-haiku-4-5` | `claude-haiku-5-5` |

Thinking migration (before / after):

```json
{
  "model": "claude-haiku-4-5",
  "max_tokens": 16000,
  "thinking": { "type": "enabled", "budget_tokens": 8000 },
  "messages": [{ "role": "user", "content": "..." }]
}
```

```json
{
  "model": "claude-haiku-5-5",
  "max_tokens": 16000,
  "thinking": { "type": "adaptive" },
  "output_config": { "effort": "medium" },
  "messages": [{ "role": "user", "content": "..." }]
}
```

## Notes

- `claude-haiku-5-5` is a fixed model ID with no date suffix and no separate alias.
- **Recount tokens:** same newer tokenizer as Claude 4.7 and later, about 30% more tokens than Haiku 4.5. Large images cost more: high-resolution tier downscales above 2,576px on the long edge or 4,784 visual tokens (Haiku 4.5: 1,568px / 1,568 tokens); a 2,000x1,500 image costs about 2.5x. Long prompts are billed at higher prices (see Long context pricing).
- **Configure thinking:** `{"type": "enabled", "budget_tokens": N}` returns 400. Thinking tokens count toward `max_tokens`, so a small limit can stop (`stop_reason: "max_tokens"`) after a `thinking` block before any text. Default `thinking` display is empty text with a `signature`; set `"display": "summarized"` for summaries. Thinking blocks from earlier turns stay in context and count as input tokens (use thinking block clearing).
- **Forced tool_choice** (`any` or a named tool) is accepted on Haiku 5.5, but the response starts with the tool call and has no `thinking` block; use `auto` plus a prompt instruction to let the model think first.
- **Sampling parameters:** omit all. If `temperature` is included it must be `1`; if `top_p` is included it must be `0.99` (its default; `1` returns 400); any `top_k` returns 400; including both `temperature` and `top_p` returns 400.
- **Prefill:** returns 400 even with thinking off. Replace by purpose: structured outputs or enum tools for output format (on Amazon Bedrock describe the format in the prompt or use a non-`strict` tool and validate in code), system prompt for preambles, user message for continuations and context reminders.
- **Computer use:** `computer_20250124` returns 400 on the Claude API and Google Cloud (use `computer_toolset_20260801`, drop beta header `computer-use-2025-01-24`) and on Amazon Bedrock (use `computer_20251124` with `computer-use-2025-11-24`). Zoom is on by default in the toolset; disable with `"configs": {"zoom": {"enabled": false}}`. The browser use tool (`browser_toolset_20260801`) is available on Claude API and Google Cloud.
- **Thinking block compatibility:** Haiku 5.5 reads blocks from Sonnet 5, Opus 4.8, Haiku 4.5, and earlier; not Opus 5, Opus 5.5, Sonnet 5.5, or any Fable / Mythos model. On Claude API and Google Cloud, Opus 5.5 and Sonnet 5.5 read Haiku 5.5 blocks. Blocks work only in the producing account or a linked one.
- **Keep earlier turns unchanged:** changing `system`, `tools`, or earlier `messages` before a sent-back thinking block returns 400; on accounts created before August 31, 2026, 00:00 UTC only when `thinking.block_binding.prefix_mismatch_behavior` is set.
- **Refusals:** handle `stop_reason: "refusal"`; no server-side fallback. Priority Tier is not supported.
- **Amazon Bedrock:** structured outputs (`output_config.format`, `strict: true`) are not available.
- **From Haiku 3.5 / 3:** both retired on specific platforms (see Model deprecations); replace `claude-3-5-haiku-20241022`, `claude-3-5-haiku-latest`, or `claude-3-haiku-20240307` (Google Cloud: `claude-3-5-haiku@20241022`); move `code_execution_20250522` to `code_execution_20250825` or later; `text_editor_20250728` (`str_replace_based_edit_tool`, no `undo_edit`); handle `refusal` and `model_context_window_exceeded`; allow trailing newlines in tool string parameters; review prompts.
- Claude Code: `/claude-api migrate this project to claude-haiku-5-5`.

## Related

- [What's new in Claude Haiku 5.5](./whats-new-haiku-5-5.md)
- [Migration Guide](./migration-guide.md)
- [Models overview](./overview.md)
