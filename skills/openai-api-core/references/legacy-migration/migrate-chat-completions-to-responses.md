# Migrate Chat Completions to Responses

Step-by-step technical migration path from `/v1/chat/completions` to `/v1/responses`, plus an incremental rollout checklist.

## Signature / Usage

```python
# Simple message input is compatible across both endpoints
context = [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "Hello!"},
]

completion = client.chat.completions.create(model="gpt-5.6", messages=context)
response = client.responses.create(model="gpt-5.6", input=context)
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| input | string \| array | — | Replaces `messages`; string prompt or array of typed input Items |
| instructions | string | — | Top-level system/developer guidance, separate from `input` |
| previous_response_id | string | — | Chains a response onto a prior one for stateful multi-turn context |
| text.format | object | — | Replaces `response_format` for Structured Outputs |

## Migration steps

1. **Update generation endpoints**: switch `POST /v1/chat/completions` calls to `POST /v1/responses`. Simple message arrays (no functions/multimodal input) are input-compatible across both.
2. **Map Messages to Items**:

   | Chat Completions concept | Responses mapping |
   |---------------------------|--------------------|
   | `messages[]` | `input`, as a string or array of input Items |
   | System/developer guidance | Top-level `instructions`, or compatible message Items to preserve an existing transcript |
   | User message | An input message Item with `role: "user"` |
   | Assistant message | An output message Item in `response.output`; pass back into `input` if manually managing state |
   | Tool/function call | A `function_call` output Item |
   | Tool/function result | A `function_call_output` input Item linked via `call_id` |
   | Multiple generations with `n` | Not available; issue separate requests instead |

3. **Update multi-turn conversations**: choose one of three state strategies — `previous_response_id` (OpenAI manages prior context; resend `instructions` each time since they are not carried over), manually replay prior `output` Items back into `input`, or use the Conversations API for a persistent conversation object. Note: all prior input tokens in a `previous_response_id` chain are still billed as input tokens.
4. **Decide on statefulness**: Responses are stored by default (Chat Completions too, for new accounts). Set `store: false` to disable. For Zero Data Retention (ZDR) orgs, `store: false` is enforced automatically; use encrypted reasoning items (`encrypted_content`, present by default) to keep reasoning context across turns while stateless.
5. **Update function definitions**: Chat Completions function defs are externally tagged and non-strict by default; Responses defs are internally tagged and attempt strict mode by default (falls back to non-strict with `strict: false` on the resolved tool if the schema is incompatible; set `strict: false` explicitly to keep non-strict behavior).
6. **Update Structured Outputs**: move the schema from `response_format` (Chat Completions) to `text.format` (Responses).
7. **Update streaming consumers**: Chat Completions streams incremental `delta` chunks; Responses streams typed server-sent events (`response.created`, `response.output_text.delta`, `response.completed`, `error`, `response.function_call_arguments.delta`, `response.function_call_arguments.done`, ...). Branch handlers on `type`.
8. **Upgrade to native tools**: replace custom tool integrations (e.g. a hand-rolled `web_search` function) with OpenAI-hosted tools such as `{"type": "web_search"}` passed in `tools`.
9. **Check common migration errors**:
   - Reading `choices[0].message.content` instead of `response.output_text` / `response.output`.
   - Treating every `output` entry as a message (reasoning/tool/function-call Items are distinct types).
   - Dropping reasoning or function-call Items when manually carrying context forward.
   - Sending a function result without the matching `call_id`.
   - Using `response_format` instead of `text.format` in a Responses request.
   - Reusing Chat Completions streaming handlers without handling typed Responses events.
   - Assuming `previous_response_id` removes billing for prior context (it does not).

## Notes

- Responses is agentic by default: it can call multiple built-in tools (web search, file search, computer use, code interpreter, remote MCP) plus custom functions within a single request, and supports native multimodal input (text + images; audio "coming soon").
- Chat Completions remains supported, so migration can proceed one flow at a time.
- Incremental rollout checklist: start with a simple text flow -> update endpoint/body/output handling -> pick a state strategy -> add `store: false` + encrypted reasoning for stateless/ZDR flows -> migrate function defs and `call_id` handling -> move Structured Outputs to `text.format` -> update streaming handlers -> swap in OpenAI-hosted tools -> compare behavior/latency/cost/errors before shifting more traffic.
- OpenAI recommends migrating all flows to Responses over time to get the latest features and improvements.

## Related

- [Responses API vs. Chat Completions API](./responses-vs-chat-completions.md)
- [Assistants to Responses migration](./assistants-to-responses-migration.md)
- [Conversation state](../responses/conversation-state.md)
- [Reasoning models](../responses/reasoning.md)
- [Text generation](../responses/text.md)
