# Delegation and tools in GPT-Live

GPT-Live delegates reasoning and tool use to a backend while it manages the spoken conversation. The backend is either a Responses model configured in the session (Responses delegation) or any model, agent, or service your application runs (client delegation). Your application owns permissions, confirmations, business records, and task state.

## Signature / Usage

Responses delegation (choose the mode at session creation):

```python
from openai.types.live.session_config_param import SessionConfigParam

session: SessionConfigParam = {
    "model": "gpt-live-1",
    "delegation": {
        "type": "responses",
        "responses": {
            "model": "gpt-6-luna",
            "instructions": "[Your backend prompt]",
        },
    },
}
```

Client delegation:

```python
session: SessionConfigParam = {"model": "gpt-live-1", "delegation": {"type": "client"}}
```

Return a function result and continue (Responses delegation):

```javascript
connection.send({
  type: "response.item.create",
  event_id: "tool_result_1",
  item: {
    type: "function_call_output",
    call_id: "call_123",
    output: '{"status":"confirmed","order_id":"order_123"}',
  },
});
connection.send({ type: "response.create", event_id: "continue_1" });
```

Return a result for a client delegation:

```javascript
connection.send({
  type: "session.commentary.append",
  event_id: "result_123",
  delegation_id: "item_9tA2bF3h7K9m2P5q8R1s4",
  content: "The order shipped today and should arrive tomorrow.",
});
```

## Options / Props

`delegation.responses` settings:

| Name | Type | Description |
|------|------|-------------|
| `model` | string | Required at creation; backend model, chosen independently of the voice model |
| `instructions` | string | Backend prompt |
| `tools` | array | Hosted tools, MCP, functions and custom tools, tool search, programmatic tool calling, computer use, local shell, apply patch |
| `tool_choice` | string / object | `"auto"`, `"required"`, `"none"`, or a named function |
| `parallel_tool_calls` | boolean | `true` allows multiple tool calls per response; `false` sequential |
| `max_output_tokens` | integer | At least 16 when set |
| `service_tier` | string | `auto`, `default`, `flex`, `priority` (subject to model support and project access) |
| `reasoning` / `text` | object | Settings supported by the selected backend model (e.g. `reasoning.effort`) |

Hosted tools: web search, file search, Code Interpreter, hosted shell (hosted container, optionally with Skills; Live does not support shell `domain_secrets`), image generation.

Mode comparison:

| Consideration | Responses delegation | Client delegation |
|---------------|----------------------|-------------------|
| Implementation effort | GPT-Live prepares backend requests, manages connections, returns results | You build and operate those pieces |
| Reviewing results | Output returns directly to GPT-Live | App validates, redacts, combines, or discards first |
| Capabilities | Fits supported Responses settings and tools | Another backend, multiple models, or capabilities beyond managed config |
| Context ownership | Context supplied by GPT-Live | You choose history, memory, and state per request |
| Execution policy | Configured model and tool loop | Custom routing, fallbacks, checkpoints, budgets |

Result items for `response.item.create` (match with `call_id`):

| Received item | Result item |
|---------------|-------------|
| `function_call` | `function_call_output` |
| `custom_tool_call` | `custom_tool_call_output` |
| `computer_call` | `computer_call_output` |
| Local `shell_call` | `shell_call_output` |
| `apply_patch_call` | `apply_patch_call_output` |
| `tool_search_call` with `execution: "client"` | `tool_search_output` with `execution: "client"` and discovered `tools` |
| `mcp_approval_request` | `mcp_approval_response` (set `approval_request_id` and `approve`) |

Update events (plain-string `content`, up to 500 tokens, required `delegation_id`):

| Event | Use |
|-------|-----|
| `session.instructions.append` | Ongoing-conversation instructions; can interrupt current speech |
| `session.thinking.append` | Internal context, not spoken on append |
| `session.commentary.append` | Information to speak aloud; paraphrased |

Acknowledgements: `session.instructions.appended`, `session.thinking.appended`, `session.commentary.appended` (match `client_event_id` to your `event_id`).

## Notes

- Choose the mode at session creation; to switch, start a new session. Updating `delegation` to `null` selects client mode, so sending it to a running Responses session fails with `immutable_field_update`.
- `session.update` with changes in `session.delegation.responses` updates backend model, instructions, tools, `tool_choice`, and other supported settings; omitted settings keep their values. Fast mode, when available, is selected with `delegation.responses.service_tier: "priority"`.
- This page recommends starting with `gpt-6-luna` and trying `gpt-6-sol` for complex backend tasks; the WebRTC and WebSocket guides use `gpt-5.6-terra` / `gpt-5.6-luna` in their examples. Confirm current model IDs before use.
- Live supports a subset of the standalone Responses API; the Live `response.create` command uses the session's backend configuration and does not accept a standalone Responses request body. Both `response.item.create` and `response.create` require Responses delegation.
- MCP `authorization` and `headers` are passed to Responses but not echoed in the session configuration; resend them if you replace `delegation.responses.tools`.
- Responses settings are validated asynchronously; `session.started` / `session.updated` do not wait. Listen for `error` code `responses_validation_failed`; the session stays open and settings are not rolled back. Fix with `session.update`.
- Responses events arrive inside `response.event` envelopes with `delegation_id`; dispatch on `envelope.event.type`. `session.delegation.created` has `target: "responses"` and a `response_id`. Forwarded lifecycle events (e.g. `response.completed`) have `response.output: []`, an empty `tools` array, `instructions: null`, and no `input`; read individual `response.output_item.done` events for function calls. For large image or artifact events use WebSocket or sideband because a WebRTC data channel's message limit can be smaller.
- Submit results for every pending call, then send `response.create`; appending an item alone does not resume the backend. Missing results produce `tool_outputs_required` (or `function_call_outputs_required`). Duplicates and mismatched types are rejected. `response.item.create` has no separate success acknowledgment. A completed `mcp_call` needs no client result.
- Client delegation: `session.delegation.created` carries `offset_ms` and `delegation` metadata (`id`, `type`, `target: "client"`), not the user's utterance. Collect transcript deltas and task state yourself; save `delegation.id` and send it unchanged.
- Appended context steers the live model only; it does not change the Responses backend prompt or cancel running work. Interrupting speech leaves backend work running. Confirm cancellation in the backend before saying work was canceled; check whether an action already happened before retrying.
- Share UI context with `session.thinking.append` and `delegation_id: null`; keep full HTML, DOM trees, and large JSON in your app; treat page content as reference data, not instructions.
- Typed input: with Responses delegation queue a user message with `response.item.create` then `response.create`; with client delegation send it directly to your backend.
- Images: the Live audio frontend does not accept images; send them to a vision-capable backend (Responses image input item via `response.item.create`, or your own backend). `session.input` is text history only.
- Latency: Live manages persistent WebSocket connections to Responses and reuses prior state when supported; tune `model`, `reasoning.effort`, `service_tier`. For client delegation reuse connections, keep reusable input stable, stream coherent verified chunks. Transcript fragments can drive speculative lookups, guardrails, and UI updates; use a sideband for server-side processing.
- Track operation IDs and task revisions alongside the delegation ID; verify the backend action and the spoken result separately.

## Related

- [Overview](./overview.md)
- [Prompting](./prompting.md)
- [Sessions](./sessions.md)
- [Server-side controls](./server-controls.md)
- [Migration](./migration.md)
- [Events](./events.md)
