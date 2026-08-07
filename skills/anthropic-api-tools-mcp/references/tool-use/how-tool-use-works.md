<!-- source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/how-tool-use-works / last verified: 2026-08-07 -->

# How tool use works

Tool use is a contract: you specify available operations and input/output shapes, Claude determines when and how to call them, and your application (or Anthropic's servers) executes the operation.

## Signature / Usage

```text
while stop_reason == "tool_use":
    execute each tool named in the tool_use blocks
    send a new request with tool_result blocks appended
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| User-defined tools | client-executed | You write the schema, execute the code, return `tool_result` |
| Anthropic-schema tools | client-executed | Trained-in schemas (`memory`, `bash`, `text_editor`, `computer`); you still execute |
| Server-executed tools | server-executed | `web_search`, `web_fetch`, `code_execution`, `tool_search`; Anthropic runs the code |

## Notes

- The agentic loop for client tools: send request → Claude replies `stop_reason: "tool_use"` with `tool_use` blocks → execute → send `tool_result` blocks in a new request → repeat while `stop_reason == "tool_use"`. Loop exits on `end_turn`, `max_tokens`, `stop_sequence`, or `refusal`.
- Server tools run their own internal loop on Anthropic's infrastructure (may issue several searches/executions per request). If the internal loop hits its iteration cap, the response returns `stop_reason: "pause_turn"`; re-send the conversation including the paused response to continue.
- If Claude calls a server tool and a client tool in the same parallel group, control returns to you first: response has `stop_reason: "tool_use"` with an unresolved `server_tool_use` block; the API runs it after you return the client tool results.
- Use tools for: actions with side effects, fresh/external data, structured guaranteed-shape outputs, calling into existing systems. Avoid tools for: answers from training alone, one-shot Q&A with no side effects, cases where round-trip latency would dominate a trivial response.
- A signal you should be using tools: if you're regex-parsing model output to extract a decision, that decision belongs in a tool schema instead.

## Related

- [overview](./overview.md)
- [define-tools](./define-tools.md)
- [handle-tool-calls](./handle-tool-calls.md)
- [server-tools](./server-tools.md)
- [build-a-tool-using-agent](./build-a-tool-using-agent.md)
