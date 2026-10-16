<!-- source: https://platform.claude.com/docs/en/build-with-claude/compaction-keep-recent-turns / last verified: 2026-10-17 -->

# Compaction that keeps recent turns

Keep-tail compaction: summarize only the older turns with on-demand compaction and send the most recent turns word for word after the block. Beta; beta header `compact-2026-09-04`.

## Signature / Usage

```python
KEEP_TURNS = 2
# A turn is one user message and one assistant reply,
# so the kept turns start with a user message.
split = -2 * KEEP_TURNS
older, recent = history[:split], history[split:]
summary = client.beta.messages.create(
    model="claude-opus-5-5",
    max_tokens=4096,
    system=SYSTEM,
    betas=["compact-2026-09-04"],
    messages=older,
    compaction={"type": "summarize"},
)
if summary.stop_reason == "compaction":
    history = [{"role": "assistant", "content": summary.content}, *recent]
```

## Notes

- No parameter sets which turns are kept. You choose a cut point: messages before it go into the compaction request, messages from it on are kept and sent unchanged after the block (thinking blocks included).
- The API summarizes every message it is sent, so leave the kept turns out of the compaction request. Both requests carry the beta header.
- Kept turns go back at full length, so the more you keep the less room compaction frees. The compaction trigger check should also require more turns than you keep, so the older part is never empty.
- Put the cut where no tool call is left open, each tool call and its result on the same side; a compaction request ending in an `assistant` turn with an unanswered tool call is rejected.
- New history = returned block message followed by the kept turns; everything in the on-demand "Continue from the summary" rules applies unchanged.
- Thinking in kept turns (preserved-thinking models) stays valid only while the conditions for kept thinking hold. A cut between a reply and the next `user` message meets the placement condition, as does compacting exactly the `messages` of a request you already made and keeping everything the history gained since.

## Related

- [compaction-on-demand.md](./compaction-on-demand.md)
- [compaction-thinking-blocks.md](./compaction-thinking-blocks.md)
- [compaction-background.md](./compaction-background.md)
