<!-- source: https://platform.claude.com/docs/en/api/messages/create.md / last verified: 2026-08-07 -->

# Create a Message

Send a structured list of input messages with text and/or image content; the model generates the next message in the conversation. Used for single queries or stateless multi-turn conversations.

## Signature / Usage

```
POST /v1/messages
```

```bash
curl https://api.anthropic.com/v1/messages \
    -H 'Content-Type: application/json' \
    -H 'anthropic-version: 2023-06-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY" \
    --max-time 600 \
    -d '{
          "max_tokens": 1024,
          "messages": [
            {"content": "Hello, world", "role": "user"}
          ],
          "model": "claude-opus-4-6",
          "stream": false
        }'
```

## Options / Props

### Header parameters

| Name | Type | Description |
|------|------|-------------|
| `anthropic-user-profile-id` | optional string | User profile ID to attribute this request to (acting on behalf of another party). Requires `user-profiles` beta header |

### Body parameters

| Name | Type | Description |
|------|------|-------------|
| `max_tokens` | number | Max tokens to generate. Set to `0` to pre-warm the prompt cache without generating a response. Max value varies per model |
| `messages` | array of `MessageParam` | Input conversation turns. Each item: `role` (`"user"` \| `"assistant"` \| `"system"`), `content` (string or array of content blocks: `text`, `image`, `document`, `search_result`, `thinking`, `redacted_thinking`, `tool_use`, `tool_result`, `server_tool_use`, `web_search_tool_result`, `web_fetch_tool_result`, `code_execution_tool_result`, `bash_code_execution_tool_result`, `text_editor_code_execution_tool_result`, `tool_search_tool_result`, `container_upload`, `mid_conv_system`). Limit: 100,000 messages per request |
| `model` | `Model` (string) | Model ID, e.g. `"claude-sonnet-5"`, `"claude-fable-5"`, `"claude-mythos-5"`, `"claude-opus-5"`, `"claude-opus-4-8"`, `"claude-opus-4-7"`, `"claude-mythos-preview"`, `"claude-opus-4-6"`, `"claude-sonnet-4-6"`, `"claude-haiku-4-5"` (+ dated aliases), or any string |
| `cache_control` | optional `CacheControlEphemeral` | Applies a cache_control marker to the last cacheable block in the request. `{ type: "ephemeral", ttl: "5m" \| "1h" }` (default `5m`) |
| `container` | optional string | Container identifier for reuse across requests (code execution tool) |
| `inference_geo` | optional string | Geographic region for inference; defaults to workspace's `default_inference_geo` |
| `metadata` | optional object | `{ user_id: optional string }` — external user identifier for abuse detection (no PII) |
| `output_config` | optional object | `{ effort: "low" \| "medium" \| "high" \| "xhigh" \| "max", format: { type: "json_schema", schema: object } }` — see [structured outputs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs) |
| `service_tier` | optional `"auto"` \| `"standard_only"` | Priority vs standard capacity |
| `stop_sequences` | optional array of string | Custom sequences that stop generation (`stop_reason: "stop_sequence"`) |
| `stream` | optional boolean | Server-sent events streaming; see [streaming](https://platform.claude.com/docs/en/build-with-claude/streaming) |
| `system` | optional string or array of `TextBlockParam` | System prompt |
| `temperature` | optional number | 0.0–1.0, default 1.0 |
| `thinking` | optional `ThinkingConfigParam` | `{ type: "enabled", budget_tokens: number (≥1024, < max_tokens), display: "summarized" \| "omitted" }` or `{ type: "disabled" }` or `{ type: "adaptive", display }`. See [extended thinking](https://platform.claude.com/docs/en/build-with-claude/extended-thinking) |
| `tool_choice` | optional `ToolChoice` | `{ type: "auto" \| "any", disable_parallel_tool_use }`, `{ type: "tool", name, disable_parallel_tool_use }`, or `{ type: "none" }` |
| `tools` | optional array of `ToolUnion` | Custom tools (`{ name, description, input_schema, strict, defer_loading, input_examples, allowed_callers, cache_control }`) plus built-in tools identified by `type` version: `bash_20250124`, `code_execution_20250522`/`20250825`/`20260120`/`20260521`, `memory_20250818`, `text_editor_20250124`/`20250429`/`20250728`, `web_search_20250305`/`20260209`/`20260318`, `web_fetch_20250910`/`20260209`/`20260309`/`20260318`, `tool_search_tool_bm25_20251119`, `tool_search_tool_regex_20251119` |
| `top_k` | optional number | Sample only from top K options (advanced) |
| `top_p` | optional number | Nucleus sampling (advanced) |

### Returns — `Message` object

| Name | Type | Description |
|------|------|-------------|
| `id` | string | Unique object identifier |
| `container` | object | `{ id, expires_at }` — set when the code execution tool is used |
| `content` | array of `ContentBlock` | Discriminated by `type`: `text` (with `citations`), `thinking`, `redacted_thinking`, `tool_use`, `server_tool_use`, `web_search_tool_result`, `web_fetch_tool_result`, `code_execution_tool_result`, `bash_code_execution_tool_result`, `text_editor_code_execution_tool_result`, `tool_search_tool_result`, `container_upload` |
| `model` | `Model` | Model that generated the response |
| `role` | `"assistant"` | Always `"assistant"` |
| `stop_details` | optional object | `{ category: "cyber" \| "bio" \| "frontier_llm" \| "reasoning_extraction" \| "general_harms", explanation, type: "refusal" }` |
| `stop_reason` | `StopReason` | `"end_turn"`, `"max_tokens"`, `"stop_sequence"`, `"tool_use"`, `"pause_turn"`, `"refusal"`, `"model_context_window_exceeded"` |
| `stop_sequence` | string or null | Which custom stop sequence matched, if any |
| `type` | `"message"` | Always `"message"` |
| `usage` | object | `{ cache_creation: { ephemeral_1h_input_tokens, ephemeral_5m_input_tokens }, cache_creation_input_tokens, cache_read_input_tokens, inference_geo, input_tokens, output_tokens, output_tokens_details: { thinking_tokens }, server_tool_use: { web_fetch_requests, web_search_requests }, service_tier: "standard" \| "priority" \| "batch" }` |

## Notes

- Content block `cache_control` (all block types) accepts `{ type: "ephemeral", ttl: "5m" | "1h" }`.
- Tool objects share a repeated `allowed_callers: array of "direct" | "code_execution_20250825" | "code_execution_20260120" | "code_execution_20260521"` field — omitted per-tool above for brevity.
- There are two tool categories: client tools (returned as `tool_use`, executed by caller) and server tools (e.g. `web_search`, `web_fetch`, `code_execution` — executed by Anthropic).
- `total input tokens = input_tokens + cache_creation_input_tokens + cache_read_input_tokens`.

## Related

- [messages-count_tokens.md](./messages-count_tokens.md)
- [batches-create.md](./batches-create.md)
