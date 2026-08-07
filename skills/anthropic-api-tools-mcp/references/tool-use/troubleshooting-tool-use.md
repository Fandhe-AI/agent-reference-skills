<!-- source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/troubleshooting-tool-use / last verified: 2026-08-07 -->

# Troubleshooting tool use

Symptom-to-fix diagnostic tables for the most common tool-use errors.

## Signature / Usage

```text
Error: `tool_use ids were found without tool_result blocks immediately after`
Fix: return one tool_result per tool_use block, tool_result blocks before any text.
```

## Options / Props

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Claude calls tool A when you wanted tool B | Description ambiguity | Sharpen descriptions; differentiate by WHEN to use, not just WHAT it does |
| Claude never calls your tool | Name collision or generic schema | Check duplicate names; add `input_examples` |
| Claude calls with wrong parameter types | Model guessing at ambiguous schema | Add `strict: true` or `input_examples` |
| Claude invents parameters not in schema | Over-generation without strict mode | Add `strict: true` if schema is in the supported subset |
| Parameter values outside enum | Missing strict mode or too-large enum | Shrink enum or add `input_examples` |
| Sequential calls when parallel expected | tool_result sent one per message instead of together | Send all `tool_result` blocks in ONE user message |
| `disable_parallel_tool_use` seems ignored | Set on a later request | Must be set on the request that returns `tool_use` |
| Every request is a cache miss | `tool_choice`/thinking config/`output_config.effort` varying | Keep stable, or place `cache_control` before the variation point |
| Adding tool mid-conversation breaks cache | Tool prepended to array | Use `defer_loading: true` with tool search instead |

## Notes

- `tool_use ids were found without tool_result blocks immediately after`: missing `tool_result` for some ids, or `tool_result` not first in content array — return one per `tool_use`, before any text.
- `was found without a corresponding <name>_tool_result block`: a `server_tool_use` block has no result yet (often called alongside a client tool) and either the next user message ended the turn early or the resume request dropped that server tool from `tools` — send a user message containing only the pending `tool_result` blocks and keep the same `tools` array.
- `Input schema is not compatible with strict mode: string patterns are not supported`: `pattern` keyword + `strict: true` — remove `pattern` or drop `strict: true` (not yet in the supported JSON Schema subset).
- `All tools have defer_loading: true`: at least one tool must load immediately; the tool search tool itself must never have `defer_loading: true`.
- 400 with "`thinking` or `redacted_thinking` blocks in the latest assistant message cannot be modified": don't alter the assistant's thinking blocks before resending — pass the whole assistant message back unchanged, then append `tool_result`.
- Claude refuses to act on / asks confirmation for instructions embedded in a tool result: Claude treats instructions inside `tool_result` content as untrusted third-party data by design — move your own instructions to a `user` turn after the `tool_result` (or a mid-conversation system message on supported models), keep the tool result to just data.
- Opus 4.6+: string comparison on tool inputs can fail due to differing Unicode/forward-slash JSON escaping between model versions — always parse with `json.loads()`/`JSON.parse()`, never raw string-match serialized input.

## Related

- [define-tools](./define-tools.md)
- [handle-tool-calls](./handle-tool-calls.md)
- [parallel-tool-use](./parallel-tool-use.md)
- [tool-use-with-prompt-caching](./tool-use-with-prompt-caching.md)
