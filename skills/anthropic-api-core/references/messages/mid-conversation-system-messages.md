<!-- source: https://platform.claude.com/docs/en/build-with-claude/mid-conversation-system-messages / last verified: 2026-10-17 -->

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
| Mid-conversation system messages | Claude API, Bedrock, Google Cloud; Claude Fable 5.1, Mythos 5.1, Fable 5, Mythos 5, Opus 5.5, Opus 4.8, Opus 5, Sonnet 5.5, Haiku 5.5 (not Claude Sonnet 5 — use top-level `system`) | none (GA) |
| Mid-conversation tool changes (by reference or by value) | Claude API; same model set | `inline-tools-2026-09-15` |
| Mid-conversation tool changes (by reference only) | Claude API, Bedrock, Google Cloud; same model set | `mid-conversation-tool-changes-2026-07-01` (still works; cannot carry a full tool definition) |
| Add an MCP server mid-conversation | Claude API only | `inline-tools-2026-09-15` + `mcp-client-2026-09-15` |
| Turn-scoped system messages (`clear_at`) | Same models and platforms as mid-conversation system messages | `mid-conversation-system-clear-at-2026-08-21` |

**Tool changes** (beta): declare the full tool set in `tools` up front (unchanged for the whole conversation), then use `tool_addition` / `tool_removal` content blocks inside a `role: "system"` message to offer/withdraw a tool from that point onward:

```json
{"role": "system", "content": [
  {"type": "tool_removal", "tool": {"type": "tool_reference", "name": "get_weather"}}
]}
```

- `tool` can reference: `{"type": "tool_reference", "name": "..."}` (a tool in `tools`), `mcp_tool_reference` (`server_name` + `name`), or `mcp_toolset_reference` (`server_name`, whole MCP toolset). Referencing an undeclared name returns a 400 error (on the Claude API, with `error.details.error_code` set to `tool_reference_unresolved`).
- Declare a tool with `defer_loading: true` to keep it withheld until a `tool_addition` surfaces it; `tool_addition` also re-offers a tool an earlier `tool_removal` withdrew.

**Define tools in a message** (beta, `inline-tools-2026-09-15`): a `tool_addition` block can carry the tool's full definition (by value) instead of naming it by reference, to introduce a tool unknown at the start of the conversation or whose schema changes later. The `tools` array and earlier messages stay as sent, so the prompt cache still hits. The header also covers add/remove by reference, so `mid-conversation-tool-changes-2026-07-01` need not be sent as well; that older header does not support full definitions.

**Add an MCP server mid-conversation** (beta, Claude API only): send `mcp-client-2026-09-15` together with `inline-tools-2026-09-15`. The `definition` in a `tool_addition` block can then be an `mcp_toolset`, with the server's connection details listed in `mcp_servers` as usual. `mcp-client-2026-09-15` includes everything `mcp-client-2025-11-20` does. A response for which the API fetched a server's tool list starts with an `mcp_tool_listing` block; send the assistant message back unchanged and keep sending the header.

**Turn-scoped system messages** (beta): set `clear_at` on a `role: "system"` message. `"never"` (default) renders on every request; `"next_user_message"` renders only while no `role: "user"` message follows it (a user message carrying only `tool_result` blocks counts), then is cleared (stays in the array, renders nothing, costs no input tokens). Requires header `mid-conversation-system-clear-at-2026-08-21`; without it `clear_at` is rejected as an unknown field.

```json
{"role": "system", "clear_at": "next_user_message", "content": "The reader is on call: keep this reply under 50 words."}
```

- Turn-scoped messages: re-send cleared messages verbatim (editing one misses the cache and, on Fable 5.1 / Opus 5.5 / Sonnet 5.5 / Haiku 5.5, fails the thinking-block conversation check); text only (`tool_addition` / `tool_removal` / `output_config` return 400); no `cache_control` on their blocks.

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
