<!-- source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview / last verified: 2026-08-07 -->

# Tool use with Claude

Connect Claude to external tools and APIs. Claude decides when to call a tool based on the user's request and the tool's description, then returns a structured call that your application executes (client tools) or that Anthropic executes (server tools).

## Signature / Usage

```json
{
  "model": "claude-opus-5",
  "max_tokens": 1024,
  "tools": [{"type": "web_search_20260209", "name": "web_search"}],
  "messages": [{"role": "user", "content": "What's the latest on the Mars rover?"}]
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| tools | array | List of tool definitions (`input_schema` for custom tools, or `type` + `name` for Anthropic-provided tools) |
| tool_choice | object | Controls whether/which tool Claude must call; default `{"type": "auto"}` |

## Notes

- Client tools (user-defined tools and Anthropic-schema tools such as `bash`, `text_editor`) run in your application: Claude returns `stop_reason: "tool_use"` with `tool_use` blocks, and you send back `tool_result`.
- Server tools (`web_search`, `web_fetch`, `code_execution`, `tool_search`) run on Anthropic's infrastructure; you see results directly unless the server tool is called in the same parallel group as a client tool.
- With `tool_choice: {"type": "auto"}` (default), Claude decides per turn whether to call a tool; steer this via system prompt or force it via `tool_choice`.
- Add `strict: true` to custom tool definitions to guarantee schema-conforming tool calls (see Strict tool use).
- Tool use adds input tokens for the `tools` parameter, `tool_use`/`tool_result` blocks, and a per-model tool-use system prompt (see pricing table on the source page); server tools can add usage-based charges (e.g. per web search).
- MCP connector and Claude Managed Agents' built-in toolset are related but out of scope for this page; see MCP connector docs and Managed Agents Tools page.

## Related

- [how-tool-use-works](./how-tool-use-works.md)
- [define-tools](./define-tools.md)
- [handle-tool-calls](./handle-tool-calls.md)
- [tool-reference](./tool-reference.md)
- [build-a-tool-using-agent](./build-a-tool-using-agent.md)
