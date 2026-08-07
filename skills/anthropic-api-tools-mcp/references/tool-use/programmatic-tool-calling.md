<!-- source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/programmatic-tool-calling / last verified: 2026-08-07 -->

# Programmatic tool calling

Claude writes code that calls your tools programmatically inside a code execution container, instead of round-tripping through the model for each tool invocation.

## Signature / Usage

```json
{
  "tools": [
    {"type": "code_execution_20260120", "name": "code_execution"},
    {
      "name": "query_database",
      "description": "Execute a SQL query against the sales database. Returns rows as JSON objects.",
      "input_schema": {"type": "object", "properties": {"sql": {"type": "string"}}, "required": ["sql"]},
      "allowed_callers": ["code_execution_20260120"]
    }
  ]
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| allowed_callers | array | `["direct"]` (default), `["code_execution_20260120"]`, or both; guides but does not hard-enforce how a tool may be invoked |
| caller (response) | object | On each `tool_use` block: `{"type": "direct"}` or `{"type": "code_execution_20260120", "tool_id": "srvtoolu_..."}` linking the call to its code execution run |
| container | string | Container ID from a paused response; required on the follow-up request while a programmatic call is pending |

## Notes

- Requires `code_execution_20260120` or later and the code execution tool enabled; available on Claude API, Claude Platform on AWS, and Microsoft Foundry (Hosted on Anthropic deployment only); not on Amazon Bedrock or Google Cloud.
- Flow: Claude writes Python that calls tools as async functions (`await query_database({...})`) inside the sandbox → execution pauses at each tool call → API returns `stop_reason: "tool_use"` with the `tool_use` block's `caller` naming the code-execution run → you return a `tool_result` (string or text blocks only) → execution resumes → intermediate results never enter Claude's context, only the final code output does.
- Reply message while calls are pending must contain **only** `tool_result` blocks (no text, even after); must include the `container` ID; must resend the same `tools` array.
- Pending calls time out after ~4 minutes (`TimeoutError` inside the code); idle containers reclaimed after ~5 minutes; no container reusable beyond 30 days.
- Incompatibilities: `strict: true` tools, `tool_choice` forcing a programmatic-only tool, `disable_parallel_tool_use: true`; tools with a recursive `$ref` in `input_schema` cannot be set to code-execution-callable (400 `Circular $ref detected`); MCP-connector tools cannot be called programmatically.
- Token efficiency: tool results from programmatic calls don't count toward input/output tokens — only the final code output and Claude's response do. Best fit for fan-out/parallel lookups over many items and large results needing filtering/aggregation; weak fit for strictly sequential per-call-reasoning workflows or a small number of calls on the first turn.
- Pricing follows code execution tool pricing; container data retained up to 30 days (see API and data retention).
- Messages API general mechanics (streaming/caching): see anthropic-api-core skill.

## Related

- [code-execution-tool](./code-execution-tool.md)
- [handle-tool-calls](./handle-tool-calls.md)
- [strict-tool-use](./strict-tool-use.md)
