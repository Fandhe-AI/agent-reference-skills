<!-- source: https://platform.claude.com/docs/en/build-with-claude/compaction / last verified: 2026-10-17 -->

# Compaction

Overview of server-side compaction: older conversation turns are replaced by a summary Claude writes on the server, which keeps a long conversation or agent task inside the context window and keeps the active context small (response quality degrades as a conversation grows). This page helps choose between on-demand compaction, token-threshold compaction, and your own summarizer. Use on-demand compaction wherever it is available.

## Signature / Usage

On-demand compaction (beta header `compact-2026-09-04`, top-level `compaction` parameter):

```json
{
  "model": "claude-opus-5-5",
  "compaction": {"type": "summarize"}
}
```

Token-threshold compaction (beta header `compact-2026-01-12`, unchanged):

```json
{
  "model": "claude-opus-5-5",
  "context_management": {"edits": [{"type": "compact_20260112"}]}
}
```

## Options / Props

| | Compaction on demand | Compaction at a token threshold | Your own summarizer |
|---|---|---|---|
| Who decides when | You, by sending a request | The API, when input tokens reach the trigger you set | You |
| Code you write | A compaction loop that requests the summary and swaps it in | One parameter on your ordinary requests | The summarization call, its prompt, and the history rewrite |
| What you send back afterward | The returned block first in `messages`, in place of the messages it summarizes | The response, appended as usual. The API drops what came before the block | Your summary, as a message of your own |
| Recent turns stay word for word | Yes (compaction-keep-recent-turns) | Yes, by pausing after compaction and re-inserting them | Yes |
| Runs in the background | Yes (compaction-background) | No: it runs inside the request that reaches the threshold | Yes, in your own code |
| Kept turns keep their thinking (models with preserved thinking) | Yes, under the conditions in compaction-thinking-blocks | No: on Claude Fable 5.1, Claude Opus 5.5, Claude Sonnet 5.5, and Claude Haiku 5.5, remove or drop the thinking in turns you re-insert | No: that thinking fails the check |
| Beta header, parameter | `compact-2026-09-04` and the top-level `compaction` parameter | `compact-2026-01-12` and `context_management.edits[{type: compact_20260112}]` | None. It runs in your code |
| Choose it when | Your application needs to control when compaction happens, can't pause while a summary is written, or must keep recent turns and their thinking | You want the API to manage context inside ordinary requests | You already run your own summarizer and it replaces the whole history with the summary |

## Notes

- On-demand compaction options: keep recent turns word for word (compaction-keep-recent-turns), run in the background (compaction-background), preserved thinking in kept turns (compaction-thinking-blocks), write your own summarization prompt (your prompt replaces the default), and compact again (a conversation that already starts with a compaction block).
- Threshold compaction details (trigger, `pause_after_compaction`, `instructions`, streaming, usage, caching, supported models, compatibility) live in compaction-threshold.md.
- You can't send `compaction` and `context_management` on the same request.
- Each kind has its own beta header and its own compatibility list, on the on-demand and threshold pages respectively.
- To clear old tool results or old thinking blocks by rule instead of summarizing them, use context editing.
- Changed from the previous version of this page: it used to document threshold compaction only; that content moved to compaction-threshold.md. Model examples now use `claude-opus-5-5`.

## Related

- [compaction-on-demand.md](./compaction-on-demand.md)
- [compaction-threshold.md](./compaction-threshold.md)
- [compaction-keep-recent-turns.md](./compaction-keep-recent-turns.md)
- [compaction-background.md](./compaction-background.md)
- [compaction-thinking-blocks.md](./compaction-thinking-blocks.md)
- [context-editing.md](./context-editing.md)
- [context-windows.md](./context-windows.md)
- [preserved-thinking.md](../thinking/preserved-thinking.md)
