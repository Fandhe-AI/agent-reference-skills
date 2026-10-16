<!-- source: https://platform.claude.com/docs/en/api/opentelemetry/spans / last verified: 2026-10-17 -->

# OpenTelemetry span reference

Spans and attributes emitted by the Claude API and the Claude SDK. Attributes use the OpenTelemetry GenAI semantic conventions (`gen_ai.*`) where one exists; Anthropic attributes start with `anthropic.`. Follows conventions at commit `e57c543b` of September 24, 2026 (still in development).

## Signature / Usage

Request span names are `anthropic.` plus the API method path with dots instead of slashes and without `beta`; tool spans are a fixed name, a space, and the tool name:

```text
client.beta.sessions.events.send()  ->  anthropic.sessions.events.send
anthropic.tool_use bash
```

## Options / Props

Span properties by source:

| Property | SDK spans | API spans |
|----------|-----------|-----------|
| `service.name` | The application's `service.name` | `claude-platform` |
| Instrumentation scope | `com.anthropic.sdk.<language>` or `com.anthropic.sdk.cli`, plus `.<platform>` on a cloud platform client | `com.anthropic.claude-platform` |
| Span kind | `CLIENT` on a request span, `INTERNAL` otherwise | `SERVER` on a request span, `INTERNAL` otherwise |

Span status: `OK` (completed), `ERROR` (failed), unset (application canceled, e.g. `user.interrupt`; also a stream closed early or never completed).

Spans:

| Span | Source | Kind | Parent / role |
|------|--------|------|---------------|
| `anthropic.messages.create` | SDK + API | CLIENT / SERVER | API span children: `anthropic.model_request`, tool spans, `anthropic.compaction`. Not emitted for `POST /v1/chat/completions` (OpenAI-compatible endpoint). One span even when a fallback model serves it |
| `anthropic.messages.count_tokens` | SDK only | CLIENT | API emits no span; its `anthropic.message.count_tokens.input_tokens` is not usage, do not sum it |
| `anthropic.messages.batches.<method>` | SDK | CLIENT | Attributes `anthropic.message.batch.id`, `anthropic.message.batch.request_count` (create only) |
| `anthropic.messages.tool_runner` | SDK | INTERNAL | Loop span; children are `messages.create` spans and tool spans; no usage attributes |
| `anthropic.sessions.<method>` | SDK + API | CLIENT / SERVER | One per Sessions API endpoint (create, list, retrieve, update, delete, archive, events.send / list / stream, resources.*, threads.*) |
| `anthropic.sessions.create` / `.events.send` / `.update` | SDK + API | CLIENT / SERVER | API span children: `anthropic.session.turn` spans |
| `anthropic.session.turn` | API | INTERNAL | Managed Agents turn (starts when the thread enters `running`, ends when it leaves it); children are model requests, tool spans, nested turns, outcome evaluations |
| `anthropic.model_request` | API | INTERNAL | One model request; parent is `messages.create` (Messages API) or `session.turn` (Managed Agents) |
| `anthropic.tool_use <tool>` / `anthropic.mcp_tool_use <tool>` / `anthropic.custom_tool_use <tool>` | SDK + API (`custom_tool_use`: SDK only) | INTERNAL | Server-tool / agent-toolset, MCP, and application-defined tool uses |
| `anthropic.compaction` | API | INTERNAL | Child of `messages.create`; own token usage |
| `anthropic.session.outcome_evaluation` | API | INTERNAL | One per outcome-evaluation iteration; status unset when result is `interrupted`, else `OK` |
| `anthropic.environment.work` | CLI + SDK (Python, TypeScript, Go) | INTERNAL | One per work item in a self-hosted sandbox |
| `anthropic.<resources>.<method>` | SDK | CLIENT | Any SDK method without its own section, e.g. `anthropic.models.list`, `anthropic.files.upload` |

Common attributes (every request span unless noted):

| Name | Type | Description |
|------|------|-------------|
| `gen_ai.provider.name` | string | `anthropic` (on every span); SDK: `aws.bedrock` on Bedrock clients, `gcp.vertex_ai` on Google Cloud's Agent Platform client |
| `anthropic.organization.id` | string | Organization ID |
| `anthropic.workspace.id` | string | Workspace the work runs in |
| `anthropic.request.id` | string | Value of the `request-id` response header |
| `http.request.method` / `http.route` | string | HTTP method; endpoint path with placeholders |
| `http.response.status_code` | int | Final response status code; absent when no response |
| `server.address` / `server.port` | string / int | Host and port requested |
| `url.scheme` / `url.path` / `url.query` / `url.full` | string | URL parts; `url.query` only has endpoint-defined parameters |

Session attributes: `anthropic.session.id` (string; absent on methods not acting on one session) and `gen_ai.conversation.id` (string; session thread ID, replaced by the SDK `conversation_id` option).

Token usage attributes (on `anthropic.messages.create`, `anthropic.model_request`, `anthropic.compaction`, `anthropic.session.outcome_evaluation`):

| Name | Type | Description |
|------|------|-------------|
| `gen_ai.usage.input_tokens` | int | Input tokens, cache reads and writes included |
| `gen_ai.usage.output_tokens` | int | Output tokens |
| `gen_ai.usage.cache_write.input_tokens` | int | Tokens written to prompt cache; absent on `outcome_evaluation` |
| `anthropic.usage.cache_creation.ephemeral_5m_input_tokens` | int | 5-minute cache writes; Messages API spans only |
| `anthropic.usage.cache_creation.ephemeral_1h_input_tokens` | int | 1-hour cache writes; Messages API spans only |
| `gen_ai.usage.cache_read.input_tokens` | int | Tokens read from prompt cache; absent on `outcome_evaluation` |

Key `anthropic.messages.create` attributes:

| Name | Type | Description |
|------|------|-------------|
| `gen_ai.operation.name` | string | `chat` |
| `gen_ai.request.model` / `gen_ai.response.model` | string | Requested model / model that served it (differs for aliases or fallback) |
| `gen_ai.response.id` | string | Response `id` |
| `anthropic.message.stop_reason` | string | e.g. `end_turn` |
| `anthropic.response.service_tier` / `anthropic.request.service_tier` | string | Served tier / requested tier |
| `error.type` | string | Error type, e.g. `rate_limit_error`; API: `api_error` when ended without an error response |
| `gen_ai.response.time_to_first_chunk` | double | Streaming SDK span only; seconds to first `content_block_delta` |
| `gen_ai.usage.reasoning.output_tokens` | int | Thinking tokens (part of output tokens) |
| `anthropic.usage.compaction.input_tokens` / `.output_tokens` | int | Compaction tokens, not part of `gen_ai.usage.*` |
| `gen_ai.request.max_tokens` / `temperature` / `top_p` / `top_k` / `stream` | various | Request parameters; absent when unset |
| `gen_ai.request.reasoning.level` | string | `effort` from `output_config` |
| `gen_ai.output.type` | string | `json` when output format is JSON |
| `anthropic.thinking.type` / `anthropic.thinking.budget_tokens` | string / int | Request `thinking` settings |
| `anthropic.beta` | string[] | SDK span only; names in `anthropic-beta` header |

Content attributes (only in content mode; JSON strings following OpenTelemetry GenAI schemas):

| Name | Spans | Description |
|------|-------|-------------|
| `gen_ai.system_instructions` | `messages.create`, `session.turn` | System prompt (turn: only a thread's first turn; absent on advisor threads) |
| `gen_ai.input.messages` | `messages.create`, `session.turn` | Request messages / turn input events |
| `gen_ai.output.messages` | `messages.create`, `session.turn` | Response content as one `assistant` message / turn output events. SDK stream: only when read as described in the SDK page |
| `gen_ai.request.stop_sequences` | `messages.create` | Request `stop_sequences` |
| `gen_ai.tool.call.arguments` | tool spans | Tool use `input` |
| `anthropic.tool_result.content` | tool spans | `content` of the tool result sent to the model |
| `anthropic.session.outcome_evaluation.explanation` | `outcome_evaluation` | Grader's explanation (plain text) |

Content block to GenAI message part: `text` -> `text`; `tool_use` / `server_tool_use` -> `tool_call` (with `anthropic_toolset_name` when `toolset_name` is set); `mcp_tool_use` -> `tool_call` with `anthropic_mcp_server_name`; `tool_result` / `mcp_tool_result` / server tool results -> `tool_call_response`; `thinking` -> `reasoning` (without signature; absent in Managed Agents spans); other blocks such as `image` -> `anthropic_<type>` with no other fields.

Tool span attributes: `gen_ai.operation.name` (`execute_tool`), `gen_ai.tool.name`, `gen_ai.tool.call.id`, `anthropic.mcp.server.name` (API MCP spans only), `gen_ai.conversation.id`, `anthropic.session.id`, `anthropic.session.thread.id` (session tool runner SDK spans only), `anthropic.tool.evaluated_permission` (`allow` or `ask`; API spans in Managed Agents), `error.type` (`tool_error`, a server tool `error_code`, `mcp_authentication_failed_error`, `mcp_connection_failed_error`, or the request error type), `gen_ai.tool.description` and `gen_ai.tool.type` (`function`) on SDK spans only.

`anthropic.session.turn` attributes: `gen_ai.operation.name` (`invoke_agent`), `gen_ai.agent.id`, `gen_ai.agent.name` (`anthropic.advisor` on advisor threads), `gen_ai.agent.description`, `gen_ai.request.model`, `anthropic.session.turn.stop_reason` (e.g. `requires_action`), `error.type`.

`anthropic.session.outcome_evaluation` attributes: `anthropic.session.outcome.id`, `anthropic.session.outcome_evaluation.result` (`satisfied`, `needs_revision`, `max_iterations_reached`, `failed`, `interrupted`), `anthropic.session.outcome_evaluation.iteration`.

`anthropic.environment.work` attributes: `anthropic.environment.id`, `anthropic.environment.work.id`, `anthropic.session.id`, `error.type` (`client_error` for non-request failures).

## Notes

- Beta: span names and attributes can change during the beta.
- Content-tagged attributes are only in content mode. Over-large content is shortened and `anthropic.content.truncated` is set to `true`; content withheld by Anthropic's safeguards is also absent from API spans.
- On Claude Platform on AWS, API spans have no `server.address`, `server.port`, or `url.full`.
- The API does not emit a tool span when: the application runs the tool (a custom tool; a tool runner in the SDK emits it instead); Managed Agents tools run in a self-hosted sandbox (the SDK worker emits them); a multiagent tool or the advisor tool is used; or the use is denied by the `auto` permission policy or by a `user.tool_confirmation` event.
- A request's spans do not carry server tool usage counts such as `web_search_requests`; use the per-use tool spans instead.
- SDK `url.query` / `url.full` are omitted in metadata-only mode when the query has a sensitive parameter such as `email`.
- Each SDK request span covers the whole request, retries included; `http.request.resend_count` records resends.

## Related

- [opentelemetry.md](./opentelemetry.md)
- [opentelemetry-api.md](./opentelemetry-api.md)
- [opentelemetry-sdk.md](./opentelemetry-sdk.md)
