# samples

| Name | Description | Path |
| --- | --- | --- |
| basic-text-generation | Call the Responses API with a single input string or a message list, and read output via `output_text` | [basic-text-generation.md](./basic-text-generation.md) |
| structured-outputs | Force a model response to conform to a Pydantic schema using `responses.parse` and `output_parsed` | [structured-outputs.md](./structured-outputs.md) |
| streaming-responses | Set `stream=True` on `responses.create` to receive server-sent events incrementally | [streaming-responses.md](./streaming-responses.md) |
| multi-turn-conversation | Chain turns via `previous_response_id` or a client-managed `input` history list | [multi-turn-conversation.md](./multi-turn-conversation.md) |
| function-calling | Define tools, execute `function_call` items locally, and return `function_call_output` items | [function-calling.md](./function-calling.md) |
| webhook-verification | Verify inbound OpenAI webhook requests with `client.webhooks.unwrap` and react to event types | [webhook-verification.md](./webhook-verification.md) |
| background-responses | Run a long-running Responses API call asynchronously with `background=True` and poll or use webhooks | [background-responses.md](./background-responses.md) |
