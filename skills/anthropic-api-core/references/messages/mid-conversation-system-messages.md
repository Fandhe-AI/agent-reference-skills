<!-- source: https://platform.claude.com/docs/en/build-with-claude/mid-conversation-system-messages / last verified: 2026-08-07 -->

# Mid-conversation system messages and tool changes

Change system instructions or tool availability partway through a conversation without invalidating the prompt-cache prefix that came before them.

## Signature / Usage

```json
[
  {"role": "user", "content": "Now review the calling code."},
  {"role": "system", "content": "From now on, every suggestion must include explicit type annotations."}
]
```

Append a `{"role": "system"}` message to `messages` at the point the new instruction becomes relevant, instead of editing the top-level `system` field. Prompt caching hashes the request prefix in order `tools` → `system` → `messages`, so editing the top-level `system` field invalidates the cache for everything after it; appending at the end of `messages` leaves the cached prefix untouched. When instructions conflict, later system messages win, and mid-conversation system messages take precedence over the top-level `system` field for subsequent turns. `system`-role content carries operator-level authority (higher priority than `user`-role text) — use it for facts/constraints that should hold even if the end user asks otherwise.

## Options / Props

| Feature | Availability | Beta header |
|---|---|---|
| Mid-conversation system messages | Claude API, Bedrock, Google Cloud; Claude Fable 5, Claude Mythos 5, Claude Opus 4.8, Claude Opus 5 (not Claude Sonnet 5 — use top-level `system`) | none (GA) |
| Mid-conversation tool changes | Claude API, Bedrock, Google Cloud; same model set | `mid-conversation-tool-changes-2026-07-01` |

**Tool changes** (beta): declare the full tool set in `tools` up front (unchanged for the whole conversation), then use `tool_addition` / `tool_removal` content blocks inside a `role: "system"` message to offer/withdraw a tool from that point onward:

```json
{"role": "system", "content": [
  {"type": "tool_removal", "tool": {"type": "tool_reference", "name": "get_weather"}}
]}
```

- `tool` can reference: `{"type": "tool_reference", "name": "..."}` (a tool in `tools`), `mcp_tool_reference` (`server_name` + `name`), or `mcp_toolset_reference` (`server_name`, whole MCP toolset). Referencing an undeclared name returns a 400 error.
- Declare a tool with `defer_loading: true` to keep it withheld until a `tool_addition` surfaces it; `tool_addition` also re-offers a tool an earlier `tool_removal` withdrew.

## Notes

- **Placement rule:** a `system` message must immediately follow a `user` turn (including one carrying `tool_result` blocks) or an `assistant` turn ending in a server tool result, and must either end `messages` or be immediately followed by an `assistant` turn. It cannot sit between a `tool_use` block and its `tool_result`. Violating this returns a 400 error. Consecutive system messages are treated as one system section and follow the same rule.
- Cannot be the first entry in `messages` — use the top-level `system` field for from-the-start instructions.
- **Relaying user input mid-agentic-loop:** place the system message right after `tool_result` blocks to inject a user message that arrived while Claude was working, so Claude folds it into ongoing work. Phrase it as context/fact ("new input arrived from the user: X"), not as a command overriding the user — Claude resists instructions that appear to work against the user, even from the system role.
- **Never** put untrusted third-party content (raw tool output, retrieved documents, web content) directly in a system message — it gains operator-level authority. Keep that in `tool_result` blocks.
- Combine with prompt caching: enable caching explicitly (`cache_control`), place the breakpoint on the stable prefix, append the system message after it — cache still hits. The system message itself becomes cacheable once it's part of history (move the breakpoint past it on the next turn, or rely on automatic caching). Don't edit/remove an already-sent mid-conversation system message — that invalidates the cache from that point forward; append a new one instead.

## Related

- [Working with messages](./working-with-messages.md)
- [Handling stop reasons](./handling-stop-reasons.md)

Tool use・Agent Skills・MCP の詳細は anthropic-api-tools-mcp スキルを参照（MCP connector 経由の tool reference を含む）。
