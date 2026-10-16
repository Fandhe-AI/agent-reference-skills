# Mid-turn Steering

Lets users add requirements or change direction without waiting for a response to finish, by sending a `response.steer` event over a Responses API WebSocket connection.

## Signature / Usage

Start a response with `response.create`. After receiving its `response.created` event, send `response.steer` on the same connection, using that response's ID as `previous_response_id`:

```json
{
  "type": "response.steer",
  "previous_response_id": "resp_1",
  "input": "Keep the scope small enough for one developer to finish in two weeks."
}
```

The API acknowledges queued input with `response.steer.accepted`:

```json
{
  "type": "response.steer.accepted",
  "sequence_number": 4,
  "steer": {
    "id": "steer_0123456789abcdef0123456789abcdef",
    "previous_response_id": "resp_1"
  }
}
```

Python (event loop excerpt):

```python
initial_response_id = None
async with client.responses.connect() as connection:
    await connection.response.create(
        model="gpt-6-astra",
        reasoning={"effort": "medium"},
        input="Draft a project plan for building a task-tracking app.",
    )
    async for event in connection:
        if event.type == "response.created" and initial_response_id is None:
            initial_response_id = event.response.id
            await connection.response.steer(
                previous_response_id=initial_response_id,
                input="Keep the scope small enough for one developer to finish in two weeks.",
            )
```

## Options / Props

`response.steer` accepts only these fields:

| Name | Type | Description |
|------|------|-------------|
| `type` | string | `"response.steer"` |
| `previous_response_id` | string | ID of the response being steered (from its `response.created` event) |
| `input` | string or array | A string, or a nonempty array of user messages with supported content types |

Server events: `response.steer.accepted` (input queued), `response.steer.pending` (waiting for required tool results or approval; includes `reason: "waiting_for_required_input"` and `required_input`), `response.steer.failed` (returns the original `input` and `previous_response_id` under `steer`, plus an `error` object).

Common `response.steer.failed` error codes:

| Code | Meaning |
|------|---------|
| `invalid_input` | Use only the supported event fields and user message input |
| `steering_not_supported` | The model, request parameters, or both may be incompatible with steering |
| `response_not_found` | The target response must still be available on the same WebSocket connection |
| `too_many_pending_steers` | Too much steering input is pending. Return any required tool results or approvals using `response.create`; otherwise wait for the automatic continuation before submitting more. Do not resend already accepted steering |

## Notes

- Available with the GPT-6 model family over a WebSocket connection to the Responses API. GPT-5.6 and earlier models do not support steering.
- Steering does not rewrite output already sent to your application, undo earlier actions, or cancel tools that have already started.
- Acceptance means the input is queued, not that the model has acted on it. The API automatically creates a new response with your update unless it needs a tool result or approval from your application. Before creating this continuation, the server finishes the current output item and any hosted tool work already running. Keep reading events; do not send another `response.create`.
- If steering interrupts the original response, it ends with `response.incomplete` and `incomplete_details.reason: "steered"`. If the original response finishes normally first, it keeps its completed status and can still have a steering continuation.
- Automatic continuations inherit the original request settings. Token and tool-call limits apply separately to each response. Use the continuation's ID for new steering once its `response.created` event arrives.
- Tool results or approval: if the response needs a client tool result or approval, the API keeps the steering queued and sends `response.steer.pending` after the original response completes. Return the required input with `response.create` on the same connection, with `previous_response_id` set to the original response. Do not repeat the accepted steering; the server implicitly prepends it to `input`. An explicit `response.create` uses its own tools, instructions, and other settings. You do not need to wait for `response.steer.pending` before returning tool results.
- Queued steering input exists only on the current connection; it is not stored with the original response. Track accepted submissions by `steer.id` (a later failure uses the same ID), record the steering inputs you send, and compare them with response events and history before replaying after a disconnect.
- The .NET SDK does not provide a Responses WebSocket client, so there is no C# variant of the official example.
- Source: https://developers.openai.com/api/docs/guides/steering (retrieved 2026-10-17, no version pin on the site).

## Related

- [WebSocket Mode](./websocket-mode.md)
- [Streaming API Responses](./streaming-responses.md)
- [Function Calling](./function-calling.md)
- [Async Tool Calling](./async-tool-calling.md)
