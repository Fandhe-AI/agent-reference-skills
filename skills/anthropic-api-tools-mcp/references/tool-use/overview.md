<!-- source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview / last verified: 2026-11-14 -->

# Tool use with Claude

Connect Claude to external tools and APIs. Claude decides when to call a tool based on the user's request and the tool's description, then returns a structured call that your application executes (client tools) or that Anthropic executes (server tools).

## Signature / Usage

```json
{
  "model": "claude-opus-5-5",
  "max_tokens": 4096,
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

- Client tools (user-defined tools and Anthropic-schema tools such as `memory`, `bash`, `text_editor`, and the client toolsets computer use and browser use) run in your application: Claude returns `stop_reason: "tool_use"` with `tool_use` blocks, and you send back `tool_result`.
- Server tools (`web_search`, `web_fetch`, `code_execution`, `advisor`, `tool_search`, MCP connector) run on Anthropic's infrastructure; you see results directly unless the server tool is called in the same parallel group as a client tool.
- With `tool_choice: {"type": "auto"}` (default), Claude decides per turn whether to call a tool; steer this via system prompt (e.g. "Use the tools to investigate before responding." increases tool use; "Always call a tool first before responding." pushes further; "Use your judgment about whether to call a tool or respond directly." keeps it conservative) or force it via `tool_choice`. With missing required parameters, Claude Opus is more likely to ask for them, while Claude Sonnet may infer a value; this is not guaranteed.
- Add `strict: true` to custom tool definitions to guarantee schema-conforming tool calls (see Strict tool use).
- Tool use adds input tokens for the `tools` parameter, `tool_use`/`tool_result` blocks, and a per-model tool-use system prompt (see pricing table on the source page; the per-model table now includes the 5.5 family: Claude Opus 5.5 and Sonnet 5.5 are 286 tokens for `auto, none` with the `any, tool` cell blank because they do not support forced tool use, and Claude Haiku 5.5 is 286 / 406 tokens; Claude Opus 5 286 / 406; Claude Sonnet 5 354 / 474; Claude Opus 4.8 290 / 410; Claude Opus 4.7 675 / 804; Claude Opus 4.6 and Sonnet 4.6 497 / 589; Opus 4.5, Sonnet 4.5 and Haiku 4.5 496 / 588); server tools can add usage-based charges (e.g. per web search).
- MCP connector and Claude Managed Agents' built-in toolset are related but out of scope for this page; see MCP connector docs and Managed Agents Tools page.
- Source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview (fetched 2026-11-14)

## Related

- [how-tool-use-works](./how-tool-use-works.md)
- [define-tools](./define-tools.md)
- [handle-tool-calls](./handle-tool-calls.md)
- [tool-reference](./tool-reference.md)
- [build-a-tool-using-agent](./build-a-tool-using-agent.md)
