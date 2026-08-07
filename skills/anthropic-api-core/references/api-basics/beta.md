<!-- source: https://platform.claude.com/docs/en/api/beta / last verified: 2026-08-07 -->

# Beta API reference (domain types)

Auto-generated type/endpoint reference for the beta namespace: the `AnthropicBeta` enum, beta error types, the Models endpoints, and the full `POST /v1/messages` (beta) request/response shape (content blocks, tools, citations, context management, thinking, fallbacks).

## Signature / Usage

```
AnthropicBeta = string | "message-batches-2024-09-24" | "prompt-caching-2024-07-31" | "computer-use-2024-10-22" | ...(29 more)
```

## Options / Props

**Beta error types** (`BetaError` union): `BetaAPIError` (`api_error`), `BetaAuthenticationError` (`authentication_error`), `BetaBillingError` (`billing_error`), `BetaInvalidRequestError`, `BetaPermissionError`, `BetaNotFoundError`, `BetaRateLimitError`, `BetaGatewayTimeoutError`, `BetaOverloadedError`. Each has `{ message: string, type: <error-type> }`. `BetaErrorResponse`: `{ error: BetaError, request_id: string, type: "error" }`.

**Models endpoints:**

| Endpoint | Description |
|---|---|
| `GET /v1/models` | List models (`after_id`, `before_id`, `limit` 1-1000 default 20 query params); returns `{data, first_id, has_more, last_id}` of `BetaModelInfo` |
| `GET /v1/models/{model_id}` | Get a model by ID or alias; returns `BetaModelInfo` |

`BetaModelInfo`: `{ id, allowed_fallback_models, capabilities: BetaModelCapabilities, created_at, display_name, max_input_tokens, max_tokens, type: "model" }`. `BetaModelCapabilities` covers `batch`, `citations`, `code_execution`, `context_management`, `effort` (low/medium/high/xhigh/max), `image_input`, `pdf_input`, `structured_outputs`, `thinking` (adaptive/enabled) — each as `{ supported: boolean }`.

**`POST /v1/messages` (beta) key body params** not covered by other pages: `cache_control`, `container` (id + `skills: [{skill_id, type: "anthropic"|"custom", version}]`), `context_management` (edits: `clear_tool_uses_20250919`, `clear_thinking_20251015`, `compact_20260112`), `diagnostics.previous_message_id` (enables `cache_miss_reason`), `fallback_credit_token`, `fallbacks` (server-side retry on substitute models, or `"default"`), `inference_geo`, `mcp_servers` (`{name, type: "url", url, authorization_token, tool_configuration}`), `metadata.user_id`, `output_config` (`effort`, `format: {type:"json_schema", schema}`, `task_budget`), `output_format` (deprecated, use `output_config.format`), `speed: "standard"|"fast"`, `thinking` (`enabled` with `budget_tokens` ≥1024, `disabled`, `adaptive`), `tool_choice` (`auto`/`any`/`tool`/`none`, each with `disable_parallel_tool_use`).

**Content block types (request/response):** `text`, `image` (base64/url/file source), `document`, `tool_use`, `tool_result`, `thinking` (`{thinking, signature}`), `search_result`, `server_tool_use` (names: `advisor`, `web_search`, `web_fetch`, `code_execution`, `bash_code_execution`, `text_editor_code_execution`, `tool_search_tool_regex`, `tool_search_tool_bm25`), `web_search_tool_result`, `web_fetch_tool_result`, `code_execution_tool_result`, `bash_code_execution_tool_result`, `text_editor_code_execution_tool_result`, `advisor_tool_result`, `mcp_tool_result`, `container_upload`, `compaction`, `mid_conv_system`, `fallback`.

**Citation location types:** `char_location`, `page_location`, `content_block_location`, `web_search_result_location`, `search_result_location`.

**Built-in tool types:** `BetaTool` (custom), `BetaToolBash20241022`/`20250124`, `BetaCodeExecutionTool` (`code_execution_20250522`/`20250825`/`20260120`/`20260521`, the latter two with REPL state persistence), `BetaToolComputerUse` (`computer_20241022`/`20250124`), `BetaMemoryTool20250818`, `BetaMCPToolUseBlockParam`.

**Cache control:** `{ type: "ephemeral", ttl: "5m" | "1h" }` (default `5m`).

## Notes

- This page is an auto-generated OpenAPI type dictionary for the beta API surface, not a narrative guide; it overlaps in content with the Messages API create reference and the tool-use/thinking/prompt-caching guides. Use [beta-headers](./beta-headers.md) for how to send the `anthropic-beta` header, and the tool-use / thinking / prompt-caching guides (outside this skill's getting-started/api-basics scope) for conceptual usage.

## Related

- [beta-headers](./beta-headers.md)
- [overview](./overview.md)
