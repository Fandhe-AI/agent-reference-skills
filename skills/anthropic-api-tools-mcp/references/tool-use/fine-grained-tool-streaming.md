<!-- source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/fine-grained-tool-streaming / last verified: 2026-08-07 -->

# Fine-grained tool streaming

Set `eager_input_streaming: true` on a tool to stream its input as Claude generates it, without server-side buffering or JSON validation, reducing time-to-first-fragment for large parameters.

## Signature / Usage

```json
{
  "name": "make_file",
  "description": "Write text to a file",
  "eager_input_streaming": true,
  "input_schema": {
    "type": "object",
    "properties": {"filename": {"type": "string"}, "lines_of_text": {"type": "array"}},
    "required": ["filename", "lines_of_text"]
  }
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| eager_input_streaming | boolean (optional) | Per-tool field; `true` enables unbuffered streaming, omitted/`false` keeps standard buffered+validated streaming |

## Notes

- Supported by all models on the Claude API, Amazon Bedrock, Claude Platform on AWS, Google Cloud, and Microsoft Foundry; requires `stream: true` on the request.
- The legacy `fine-grained-tool-streaming-2025-05-14` beta header still works as a request-wide default for tools that leave the field unset, but the per-tool field takes precedence, and an explicit `false` opts a tool out even under that header.
- Because input is unbuffered and unvalidated, you may receive partial or invalid JSON, and a `stop_reason: "max_tokens"` response can cut a parameter off mid-value.
- Accumulation contract (same for standard and fine-grained streaming): on `content_block_start` (`type: "tool_use"`) initialize `input_json = ""`; on each `content_block_delta` (`type: "input_json_delta"`) append `event.delta.partial_json`; on `content_block_stop`, parse the accumulated string. The initial `input: {}` in `content_block_start` is a placeholder, not real data.
- If the accumulated string fails to parse, report it back to Claude as a `tool_result` with `is_error: true`, wrapping the raw string as `{"INVALID_JSON": "<the unparseable input>"}` (built via a JSON library, not string concatenation) rather than trying to run the tool.

## Related

- [handle-tool-calls](./handle-tool-calls.md)
- [tool-reference](./tool-reference.md)
- [define-tools](./define-tools.md)
