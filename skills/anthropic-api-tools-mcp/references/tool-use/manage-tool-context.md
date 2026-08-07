<!-- source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/manage-tool-context / last verified: 2026-08-07 -->

# Manage tool context

Choose between tool search, programmatic tool calling, prompt caching, and context editing to control context-window bloat from tool definitions and results.

## Signature / Usage

```text
Tool search             -> reduces tool definitions loaded upfront
Programmatic tool calling -> reduces tool_result roundtrips
Prompt caching           -> reduces token cost of repeated tool definitions
Context editing          -> reduces old tool_result blocks in history
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| Tool search | approach | Best for large toolsets (20+ tools) where most aren't needed every turn |
| Programmatic tool calling | approach | Best for chains of tool calls that can execute as a single script |
| Prompt caching | approach | Best for stable toolsets reused across many requests |
| Context editing | approach | Best for long conversations where early results are no longer relevant |

## Notes

- These four approaches target different sources of context pressure and compose freely — no conflict in using them together.
- Suggested rollout order for a high-volume agent: (1) enable prompt caching on tool definitions from day one (cache writes carry a 25% markup over base input pricing, paid back on the second cache hit); (2) add tool search once the toolset exceeds ~20 tools or baseline context usage becomes noticeable; (3) add context editing once conversations run long enough that early results become irrelevant; (4) consider programmatic tool calling for repetitive chains of small tool calls that could run as one batch.
- Context editing (trimming stale `tool_result` blocks) is a Messages API context-management feature — general mechanics are in anthropic-api-core skill.

## Related

- [tool-search-tool](./tool-search-tool.md)
- [programmatic-tool-calling](./programmatic-tool-calling.md)
- [tool-use-with-prompt-caching](./tool-use-with-prompt-caching.md)
