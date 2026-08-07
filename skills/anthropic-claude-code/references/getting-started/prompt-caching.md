<!-- source: https://code.claude.com/docs/en/prompt-caching.md / last verified: 2026-08-07 -->

# How Claude Code uses prompt caching

Claude Code manages prompt caching automatically. Explains why a model switch triggers a slow uncached turn, what `/compact` costs, why CLAUDE.md edits don't apply mid-session, and how to check the cache hit rate.

## Signature / Usage

```bash
# environment variables
ENABLE_PROMPT_CACHING_1H=1        # opt into 1-hour TTL on API key / third-party providers
FORCE_PROMPT_CACHING_5M=1         # force 5-minute TTL regardless of authentication
DISABLE_PROMPT_CACHING=1          # disable caching for all models
```

## Options / Props

| Layer | Content | Changes when |
|-------|---------|----------------|
| System prompt | Core instructions, tool definitions, output style | Loaded tool definitions change, or Claude Code upgrades |
| Project context | CLAUDE.md, auto memory, unscoped rules | Session starts, or after `/clear`/`/compact` |
| Conversation | Messages, responses, tool results | Every turn |

| Field (from API response) | Meaning |
|------------------------------|---------|
| `cache_creation_input_tokens` | Tokens written to cache this turn, billed at cache write rate |
| `cache_read_input_tokens` | Tokens served from cache this turn, billed at ~10% of standard input rate |

## Notes

- The API caches by matching the request prefix; a change anywhere in the prefix recomputes everything after it. Model and effort level are each part of the cache key, so switching either invalidates the whole cache.
- Invalidates the cache: switching models, changing effort level, turning on fast mode, connecting/disconnecting an MCP server (when its tools are loaded into the prefix rather than deferred), enabling/disabling a plugin that provides MCP servers, denying an entire tool, compacting the conversation, upgrading Claude Code.
- Keeps the cache: editing repo files, editing CLAUDE.md mid-session (applies on next `/clear`/`/compact`/restart, not immediately), changing output style (same deferred-apply behavior), changing permission mode, invoking skills/commands, `/recap`, `/rewind`, spawning a subagent (builds its own separate cache).
- TTL: Claude subscriptions request the 1-hour TTL automatically; API key / third-party providers default to 5 minutes unless `ENABLE_PROMPT_CACHING_1H=1` is set.
- This page covers Claude Code's own request-shaping and caching behavior in the CLI. For the underlying Messages API prompt caching mechanism (cache breakpoints, pricing, cross-application usage), see the anthropic-api-core skill.

## Related

- [Explore the context window](./context-window.md)
- [How Claude Code works](./how-claude-code-works.md)
- [Best practices](./best-practices.md)
