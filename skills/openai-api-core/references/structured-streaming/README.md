# Structured Streaming

| Name | Description | Path |
|------|-------------|------|
| Function Calling | Lets a model connect to external data and systems by declaring callable functions in the `tools` parameter of a Responses API request, then reading back the model's requested tool calls to execute locally. | [function-calling.md](./function-calling.md) |
| Programmatic Tool Calling | Lets a model write and run JavaScript that coordinates the tools available in a Responses API request, instead of calling one function at a time. Add the `programmatic_tool_calling` hosted tool to the request and set `allowed_callers` on each eligible function tool. | [programmatic-tool-calling.md](./programmatic-tool-calling.md) |
| Prompt Generation | The **Generate** button in the Playground creates prompts, function definitions, and Structured Outputs schemas from a task description, using meta-prompts and meta-schemas. | [prompt-generation.md](./prompt-generation.md) |
| Streaming API Responses | Streams model output over HTTP using server-sent events (SSE) so the response can be processed incrementally instead of waiting for the full generation to finish. | [streaming-responses.md](./streaming-responses.md) |
| Structured Outputs | Ensures model responses adhere to a supplied JSON Schema. Guarantees reliable type-safety (no need to validate or retry malformed responses), explicit refusals surfaced as a distinct content type, and simpler prompting (no need for strongly worded formatting instructions). | [structured-outputs.md](./structured-outputs.md) |
| WebSocket Mode | A persistent WebSocket transport for the Responses API, aimed at long-running, tool-call-heavy agentic workflows where repeated HTTP round trips add overhead. | [websocket-mode.md](./websocket-mode.md) |
