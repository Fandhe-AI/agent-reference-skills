<!-- source: https://platform.claude.com/docs/en/build-with-claude/compaction-background / last verified: 2026-10-17 -->

# Compaction in the background

Background (async) compaction: request an on-demand summary while the conversation continues on its full history, then swap the block in when it arrives. Beta; beta header `compact-2026-09-04`.

## Signature / Usage

```python
def swap_in(history, summary, sent: int) -> None:
    if summary.stop_reason == "compaction":
        # Replace exactly the messages the compaction request held.
        # Later turns stay after the block.
        history[:sent] = [{"role": "assistant", "content": summary.content}]

# when over budget and nothing pending:
sent = len(history)
pending = executor.submit(
    client.beta.messages.create,
    model="claude-opus-5-5",
    max_tokens=4096,
    system=SYSTEM,
    betas=["compact-2026-09-04"],
    messages=history.copy(),
    compaction={"type": "summarize"},
)
```

## Notes

- Steps: (1) send the compaction request with the history as it stands and record how many messages it held; (2) keep appending turns to the full history while it runs, never edit existing history, and don't start another compaction request until this one is swapped in or failed; (3) when the response arrives with `stop_reason` `"compaction"`, drop exactly the messages sent from the front and put the returned message in their place; (4) send the swapped history on the first request after the block arrives so thinking produced meanwhile stays valid.
- Example: request held messages 1-5, messages 6-8 arrived meanwhile; after the swap, history is the block followed by messages 6-8.
- Any other `stop_reason` means no summary was produced: keep the full history (see on-demand page for causes) and a new compaction request may then start.
- The compaction request counts against rate limits and two requests are open at once. Start it while the context window still has room for turns arriving meanwhile.
- If a request is still pending when the loop ends, wait for it and swap before saving or continuing.
- Run the request on a copy of the history with each language's concurrency tool (Python `ThreadPoolExecutor`, TypeScript Promise, Go goroutine + channel, Java `client.async()` `CompletableFuture`, Ruby `Thread`, C# `Task`). The PHP SDK sends requests synchronously, so it can't run this in the background.
- Turns arriving while the summary is written are kept turns; their thinking stays valid only while the conditions for kept thinking hold.

## Related

- [compaction-on-demand.md](./compaction-on-demand.md)
- [compaction-keep-recent-turns.md](./compaction-keep-recent-turns.md)
- [compaction-thinking-blocks.md](./compaction-thinking-blocks.md)
