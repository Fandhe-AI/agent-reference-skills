<!-- source: https://platform.claude.com/docs/en/models/fable-5-1/whats-new-fable-5-1 / last verified: 2026-10-17 -->

# What's new in Claude Fable 5.1

Overview of new features, breaking changes, and capability improvements in Claude Fable 5.1 and Claude Mythos 5.1. Fable 5.1 extends Claude Fable 5 at the same input and output prices, with cache reads at a quarter of the cost.

## Signature / Usage

| Model | Claude API ID | Description | Availability |
| --- | --- | --- | --- |
| Claude Fable 5.1 | `claude-fable-5-1` | Successor to Claude Fable 5, for long-running agentic coding, knowledge work, and research | All customers, on the Claude API and partner platforms |
| Claude Mythos 5.1 | `claude-mythos-5-1` | Same capabilities as Claude Fable 5.1. Successor to Claude Mythos 5 | Organizations verified through Anthropic's verification programs, such as the Cyber Verification Program |

Shared specs: 1M token context window (default and maximum, standard per-token pricing across the whole window), 128k max output tokens, adaptive thinking always on (control depth with `effort`), same tokenizer as Claude Fable 5.

Per-message effort (beta, header `mid-conversation-output-config-2026-07-01`): an effort-only system message changes effort mid-conversation without invalidating the prompt cache.

```python
client = anthropic.Anthropic()

response = client.beta.messages.create(
    model="claude-fable-5-1",
    max_tokens=4096,
    output_config={"effort": "high"},
    messages=[
        {
            "role": "user",
            "content": "Plan a migration from SQLite to PostgreSQL in three short steps.",
        },
        {
            "role": "assistant",
            "content": "1. Export the SQLite data. 2. Create the PostgreSQL schema. 3. Import the data and verify row counts.",
        },
        # Effort-only system message: the new level takes effect from the next user turn.
        {"role": "system", "content": [], "output_config": {"effort": "low"}},
        {"role": "user", "content": "Summarize the plan in one sentence."},
    ],
    betas=["mid-conversation-output-config-2026-07-01"],
)
```

Turn-scoped system message (beta, header `mid-conversation-system-clear-at-2026-08-21`):

```json
{
  "role": "system",
  "clear_at": "next_user_message",
  "content": "Results have landed in your inbox. Check it before running more code."
}
```

## Notes

- **Breaking, forced tool use:** `tool_choice` of `{"type": "any"}` or `{"type": "tool", "name": "..."}` returns a 400 `invalid_request_error` (`tool_choice: type "tool" and "any" are not supported for this model.`). `auto` and `none` are unchanged. The same validation applies to token counting. Use `strict: true` tools with `auto`, or structured outputs.
- **Breaking, thinking blocks tied to the model:** only Claude Fable 5.1 and Claude Mythos 5.1 read Claude Fable 5.1 thinking blocks. A block the target model cannot read is dropped before the model sees it (not billed). With beta header `thinking-binding-controls-2026-08-01` the drop is reported in a top-level `input_transformations` array.
- **Breaking, editing earlier turns invalidates thinking blocks:** modifying the `system` prompt, `tools`, or an earlier message before a Fable 5.1 thinking block errors on the next request (`The block is bound to a different conversation`), or drops the block with `thinking.block_binding.prefix_mismatch_behavior: "drop_block"`. Enforced for accounts created on or after August 31, 2026; earlier accounts only act on it when the field is set. Claude Mythos 5.1 does not run this check. Keep the conversation append-only.
- **Progress updates (beta):** `thinking.display: "updates"` with header `thinking-display-updates-2026-08-18` returns progress-update text between tool calls while reasoning stays hidden. Default `display` is `"omitted"`; `"summarized"` also works.
- **Content provenance:** text from Fable 5.1 and Mythos 5.1 carries Anthropic's statistical text watermark; supported image, video, and audio files retrieved through the Files API on the Claude API carry C2PA Content Credentials.
- **Behavior changes from Fable 5:** more variable parallel tool calling (may issue one call per turn), fewer progress updates, more answers from memory at `low` effort, denser prose, less chat formatting, unmarked quotations in summaries, whole-file rewrites for small edits.
- **Unchanged from Fable 5:** `thinking: {"type": "enabled"}` with `budget_tokens` and `{"type": "disabled"}` return 400; prefill returns 400; non-default `temperature` / `top_p` / `top_k` return 400; minimum cacheable prompt 512 tokens; mid-conversation system messages and tool changes supported.
- **Refusals:** safety classifiers can return `stop_reason: "refusal"` with `stop_details`. Permitted fallback targets for Fable 5.1 are Claude Opus 4.8 and Claude Opus 5. A refusal before any output is billed in categories with low false-positive volumes; before September 24, 2026 these were not billed.
- **Pricing (USD per MTok):** base input $10, 5m cache write $12.50, 1h cache write $20, cache read $0.25 (0.025x base input, vs 0.05 on Opus 5.5 / Sonnet 5.5 and 0.1 on other models), output $50. Batch processing is $5 input / $25 output.
- **Availability:** Claude API `claude-fable-5-1`; Amazon Bedrock `anthropic.claude-fable-5-1`; Claude Platform on AWS `claude-fable-5-1`; Google Cloud `claude-fable-5-1`; Microsoft Foundry. Both models carry 30-day data retention and are not available under zero data retention unless expressly authorized; both are Covered Models.
- Recommended starting point per the page: Claude Opus 5.5 for most workloads; Fable 5.1 for demanding reasoning and long-horizon agentic work.

## Related

- [Models overview](./overview.md)
- [Claude Fable 5.1 and Claude Mythos 5.1 migration guide](./migration-fable-5-1.md)
- [Introducing Claude Fable 5 and Claude Mythos 5](./introducing-claude-fable-5-and-claude-mythos-5.md)
- [Choosing a model](./choosing-a-model.md)
