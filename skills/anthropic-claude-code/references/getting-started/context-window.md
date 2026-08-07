<!-- source: https://code.claude.com/docs/en/context-window.md / last verified: 2026-08-07 -->

# Explore the context window

An interactive simulation of how Claude Code's context window fills during a session: what loads automatically, what each file read costs, and when rules/hooks fire.

## Signature / Usage

```text
/context      # live breakdown of current session's context usage by category
/autocompact 500k   # set the auto-compact window for this session and later
/autocompact auto   # return to the window tuned for the model
```

## Options / Props

| Mechanism | After compaction |
|-----------|-------------------|
| System prompt and output style | Unchanged; not part of message history |
| Project-root CLAUDE.md and unscoped rules | Re-injected from disk |
| Auto memory | Re-injected from disk |
| Rules with `paths:` frontmatter | Lost until a matching file is read again |
| Nested CLAUDE.md in subdirectories | Lost until a file in that subdirectory is read again |
| Invoked skill bodies | Re-injected, capped at 5,000 tokens/skill and 25,000 tokens total; oldest dropped first |
| Hooks | Not applicable; hooks run as code, not context |

## Notes

- Timeline order before you type anything: system prompt, auto memory (MEMORY.md), environment info, MCP tool names (deferred schemas), skill descriptions, `~/.claude/CLAUDE.md`, project CLAUDE.md.
- Path-scoped rules load automatically alongside matching files as Claude works; a `PostToolUse` hook can fire after edits and feed output back via `additionalContext`.
- A subagent handling a follow-up keeps its large file reads in its own context window; only the summary and a small metadata trailer return to the main conversation.
- `/compact` replaces conversation history with a structured summary; most startup content reloads automatically (see the compaction table above).
- Auto-compact window: 100K-1M tokens, settable via `/autocompact`, the `--autocompact` flag, or `CLAUDE_CODE_AUTO_COMPACT_WINDOW` (highest precedence). Fable 5, Sonnet 5, Opus 4.6+, and Sonnet 4.6 support a 1M token context window.

## Related

- [How Claude Code works](./how-claude-code-works.md)
- [How Claude remembers your project](./memory.md)
- [How Claude Code uses prompt caching](./prompt-caching.md)
- [Best practices](./best-practices.md)
- [Extend Claude Code](./features-overview.md)
