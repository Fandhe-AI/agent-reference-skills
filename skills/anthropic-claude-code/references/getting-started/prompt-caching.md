<!-- source: https://code.claude.com/docs/en/prompt-caching.md / last verified: 2026-10-16 -->

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

- The API caches by matching the request prefix; a change anywhere in the prefix recomputes everything after it. Model is part of the cache key, so switching it invalidates the whole cache; effort level is also part of the cache key on most models (exceptions on Opus 5.5, Sonnet 5.5, Haiku 5.5, and Fable 5.1: see Effort changes below).
- Invalidates the cache: switching models, changing effort level (on most models; see Effort changes), turning on fast mode, connecting/disconnecting an MCP server (when its tools are loaded into the prefix rather than deferred), enabling/disabling a plugin that provides MCP servers, denying an entire tool, compacting the conversation, upgrading Claude Code.
- Keeps the cache: editing repo files, editing CLAUDE.md mid-session (applies on next `/clear`/`/compact`/restart, not immediately), changing output style (applies from the next message; before v2.1.251 deferred until `/clear` or a new session), changing permission mode, invoking skills/commands, `/recap`, `/rewind`, spawning a subagent (builds its own separate cache).
- TTL defaults: Unless you choose a TTL yourself, Claude Code requests the one-hour TTL only on a Claude subscription within your plan's included usage (for the main conversation, plus a small set of server-controlled helper requests). Everything else, and usage credits, API key, or cloud provider requests, default to five minutes. Once you go over your plan's usage limit and Claude Code draws on usage credits, the main conversation drops to the five-minute TTL.
- Choose the TTL yourself (each control takes `5m` or `1h`; v2.1.242+): main conversation: `promptCacheTtl` setting or `CLAUDE_CODE_PROMPT_CACHE_TTL`; everything else (subagents, workflows, background work): `subagentPromptCacheTtl` setting or `CLAUDE_CODE_SUBAGENT_PROMPT_CACHE_TTL`. First match wins: (1) `FORCE_PROMPT_CACHING_5M=1` (five minutes for both buckets); (2) the bucket's environment variable; (3) the bucket's setting; (4) for a subagent's requests, the `cacheTtl` value in the subagent's `experimental` frontmatter field (v2.1.248+; a `1h` there is ignored while your subscription is using usage credits); (5) `ENABLE_PROMPT_CACHING_1H=1` (one hour for both buckets); (6) the bucket default. API key or cloud provider users should set `promptCacheTtl` to `1h` for a one-hour main-conversation cache. To confirm which TTL cache writes used, run `claude -p "hello" --output-format json` and read `usage.cache_creation` (`ephemeral_1h_input_tokens` vs `ephemeral_5m_input_tokens`).
- Model switch confirmation: when you run `/model` at the terminal, Claude Code asks you to confirm only while the cache is still warm (one cache TTL after the last request or response) and the new model isn't the one that produced the last response; before v2.1.238 it asked even after the cache had expired. A PreModelSwitch hook can require or skip the confirmation. Each `opusplan` plan-mode toggle, an automatic model fallback, and a skill/command whose frontmatter `model` differs from the session model are also model switches.
- Effort changes: on most models changing effort mid-session means the next request reads the entire conversation history uncached, and Claude Code asks you to confirm first while the cache is warm. On Opus 5.5, Sonnet 5.5, Haiku 5.5, and Fable 5.1 with an API key or a Claude subscription, changing effort keeps the cache and applies without asking (not on Bedrock, Agent Platform, or a Claude apps gateway, or with `CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS` or a HIPAA configuration). Before v2.1.260, changing effort on Fable 5.1 also invalidated the cache.
- Plugins and the cache: `/cd` on v2.1.246 or later applies the plugins the new directory's settings enable as part of the move, without the full re-read warning that holds a `/reload-plugins`. In interactive sessions, adding or removing a plugin in a folder of plugins passed with `--plugin-dir` applies right away unless it would trigger a full re-read (then Claude Code shows a notice to run `/reload-plugins`; v2.1.265+). `/reload-plugins` also runs in sessions without an interactive terminal when typed into the session directly (v2.1.260+).
- Idle compaction: if you leave a long conversation idle in a terminal session while it is on the one-hour TTL, Claude Code can compact it shortly before the cache expires. Set `idleCompaction` to `false` to turn it off (v2.1.290+); `CLAUDE_CODE_IDLE_COMPACT_MIN_TOKENS` sets the size threshold.
- Output style: a mid-session style switch keeps the cache; before v2.1.251 it didn't apply until `/clear` or a new session.
- Cache statistics: after the main conversation's first response, `/usage` adds a `Prompt cache (main)` line (hit ratio, miss count, whether the cache is warm); a status line script can read the same numbers from the `prompt_cache` object (both v2.1.251+). The line also names the likely cause of the last miss, for example `likely cause: tool definitions changed` (v2.1.260+).
- `DISABLE_PROMPT_CACHING_HAIKU` applies to the default Haiku model (the model the `haiku` alias resolves to) wherever it runs, including the main conversation when it is your main model; covering the main conversation requires v2.1.283 or later.
- This page covers Claude Code's own request-shaping and caching behavior in the CLI. For the underlying Messages API prompt caching mechanism (cache breakpoints, pricing, cross-application usage), see the anthropic-api-core skill.

## Related

- [Explore the context window](./context-window.md)
- [How Claude Code works](./how-claude-code-works.md)
- [Best practices](./best-practices.md)
