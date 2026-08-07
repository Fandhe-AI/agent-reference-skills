<!-- source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/handle-tool-calls / last verified: 2026-08-07 -->

# Handle tool calls

Parse `tool_use` blocks, format `tool_result` responses, and signal errors with `is_error`.

## Signature / Usage

```json
{
  "role": "user",
  "content": [
    {"type": "tool_result", "tool_use_id": "toolu_01A09q90qw90lq917835lq9", "content": "15 degrees"}
  ]
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| tool_use_id | string | Matches the `id` of the corresponding `tool_use` block |
| content | string \| array (optional) | Result as string, or list of `text`/`image`/`document`/`search_result` blocks |
| is_error | boolean (optional) | Set `true` if the tool execution failed |

## Notes

- `tool_use` blocks in Claude's response carry `id`, `name`, and `input` (conforming to `input_schema`).
- `tool_result` blocks must immediately follow their corresponding `tool_use` blocks with no messages in between; within the user message, `tool_result` blocks must come first in the content array, with any text after them.
- If the assistant turn also called a server tool with no result yet, the following user message must contain only `tool_result` blocks — text before/among them triggers a 400 error (or ends the turn early for indirect server-tool calls).
- Treat tool_result content from external sources (web pages, email, uploads) as untrusted — keep it in `tool_result` blocks, not `system` or plain `text`, to reduce indirect prompt-injection risk.
- Server tools (`web_search`, `web_fetch`, `code_execution`, `tool_search`) execute internally; no `tool_result` block needed. A response can contain a client `tool_use` block plus an unresolved `server_tool_use` block in the same turn — reply with only the client `tool_result` blocks and the API resolves the server tool on that request.
- Error handling: tool execution errors return `content` + `is_error: true` with an instructive message (e.g. "Rate limit exceeded. Retry after 60 seconds."); invalid/missing-parameter calls can also be reported via `is_error: true` and Claude retries 2-3 times with corrections; server tool errors are handled transparently by Claude (no `is_error` needed), with web-search-specific codes `too_many_requests`, `invalid_input`, `max_uses_exceeded`, `query_too_long`, `unavailable`.
- Unlike APIs with a separate `tool`/`function` role, Claude API tools are integrated into `user`/`assistant` message content arrays.
- Messages API streaming/caching/thinking general mechanics: see anthropic-api-core skill.

## Related

- [how-tool-use-works](./how-tool-use-works.md)
- [tool-runner](./tool-runner.md)
- [parallel-tool-use](./parallel-tool-use.md)
- [server-tools](./server-tools.md)
