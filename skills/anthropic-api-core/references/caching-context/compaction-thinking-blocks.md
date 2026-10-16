<!-- source: https://platform.claude.com/docs/en/build-with-claude/compaction-thinking-blocks / last verified: 2026-10-17 -->

# Compaction and preserved thinking

When thinking blocks in turns kept after on-demand compaction stay valid on models with preserved thinking, and how to check. Skip unless you send thinking blocks back and keep turns after the compaction block. Beta; beta header `compact-2026-09-04`.

## Signature / Usage

```python
BETAS = ["compact-2026-09-04", "thinking-binding-controls-2026-08-01"]
# With "error", a thinking block that fails the check makes the request fail with a 400.
THINKING = {
    "type": "adaptive",
    "block_binding": {"prefix_mismatch_behavior": "error"},
}

summary = client.beta.messages.create(
    model="claude-fable-5-1",
    max_tokens=4096,
    system=SYSTEM,
    betas=BETAS,
    thinking=THINKING,
    messages=history[:2],
    compaction={"type": "summarize"},
)
history = [
    {"role": "assistant", "content": summary.content},
    *history[2:],
    {"role": "user", "content": "Which day should the release go out?"},
]
third = client.beta.messages.create(
    model="claude-fable-5-1", max_tokens=8192, system=SYSTEM,
    betas=BETAS, thinking=THINKING, messages=history,
)
# A 200 with no dropped blocks means the kept thinking held.
print(len(third.input_transformations))
```

## Notes

- Kept turns: recent turns left out of the compaction request, or turns that arrived while the summary was being written.
- Conditions for kept thinking to stay valid (all must hold): (1) every compaction request since the thinking block was produced ran on a model with preserved thinking (simplest: send every compaction request to the model the conversation uses); (2) kept turns directly follow the summarized messages and are sent unchanged, with no message skipped or added between, the first kept message having a different role from the last summarized message and not being a mid-conversation `role: "system"` message (otherwise the API merges it); (3) `system` and the `tools` not marked `defer_loading: true` don't change between the compaction request, the requests that produced the thinking, and later requests.
- If a condition fails, compaction doesn't fail and later requests accept the block; the failure appears on the first later request that sends the kept thinking where the check is enforced: a 400 by default, or dropped thinking blocks if `thinking.block_binding.prefix_mismatch_behavior` is `"drop_block"`. In the Message Batches API, an item leaving the field unset doesn't fail; blocks are dropped where the check applies by default.
- Compacting again: the new block covers the old summary and every later message in the request; turns left out are kept turns of the new block. A turn kept through two compactions needs both on a preserved-thinking model. Compactions from before a thinking block was produced don't count.
- Changing `system`, `tools` or model after compaction is accepted but may invalidate kept thinking. To change them safely, compact the whole conversation first (no kept turns), then change them on the next request. Alternatively append the change to `messages`.
- Mid-conversation `role: "system"` messages inside summarized turns are summarized too; per-message effort levels they set aren't carried over. Restate them in a `role: "system"` message directly after the first new `user` turn following the kept turns. Tool changes carry over when the compaction request also carries `inline-tools-2026-09-15` (the block records them in `tool_changes`; send the block back unmodified; if absent, restate). A system message between the block and kept turns breaks their thinking.
- Check procedure: (1) short conversation with thinking on, on a model where the check runs, same model throughout (a model that can't read a thinking block drops it with no error); (2) compact older turns, keeping at least one turn with a thinking block; (3) send block, kept turn, new `user` message with `prefix_mismatch_behavior: "error"`; (4) a 200 with empty `input_transformations` means held, a 400 saying the block is bound to a different conversation means not.
- `prefix_mismatch_behavior` needs the `thinking-binding-controls-2026-08-01` beta header in addition to `compact-2026-09-04`; setting it also opts the request into the check on accounts where it isn't on by default. In production `"drop_block"` keeps requests succeeding and reports each dropped block in `input_transformations` with `reason: "prefix_binding_mismatch"`; an entry whose `path` falls in a kept turn means that thinking didn't hold.
- On Claude Sonnet 5.5 and Claude Haiku 5.5, `block_binding` works only with `thinking: {"type": "adaptive"}`; `{"type": "between_tools"}` on Sonnet 5.5 or `{"type": "disabled"}` on Haiku 5.5 returns 400. Make sure every condition holds, or remove `thinking` / `redacted_thinking` blocks from kept turns.
- The page states Claude Fable 5.1 is the first model that checks sent-back thinking against the conversation.

## Related

- [compaction-on-demand.md](./compaction-on-demand.md)
- [compaction-keep-recent-turns.md](./compaction-keep-recent-turns.md)
- [compaction-background.md](./compaction-background.md)
