# Gateway compatibility requirements

Responses API behavior an LLM gateway must preserve for the API/provider credential path: endpoints, streaming, continuation, tool calls, authentication, routing, and useful errors.

## Signature / Usage

Configure the provider with the Responses wire API; the gateway must accept `POST /v1/responses` for a base URL such as `https://gateway.example.com/v1`.

```toml
[model_providers.enterprise-gateway]
base_url = "https://gateway.example.com/v1"
wire_api = "responses"
```

Model traffic path:

```text
Codex client -> LLM gateway -> model provider
```

## Options / Props

| Area | Requirement |
|------|-------------|
| Requests and endpoints | `wire_api = "responses"`; accept `POST /v1/responses` and preserve fields the client uses. Chat Completions or Anthropic Messages endpoints don't establish compatibility. Health and model-list endpoints are optional aids. |
| Streaming | Forward SSE incrementally; preserve event types and payloads including terminal `response.completed`; forward error and failure events. Verify through load balancers and reverse proxies. |
| Continuation | Accept replayed prior messages, tool calls, and tool results. If WebSocket or incremental transport is enabled, verify `previous_response_id` too. |
| Tools | Preserve function-call items and matching `function_call_output` items with identifiers; the full call, execute, submit, final-answer loop must work. |
| Authentication | Support `env_key` or command-backed bearer tokens, or `env_http_headers` for custom-header credentials. Authenticate developers separately from the upstream provider identity; test expiration, renewal, revocation. |
| Model routing | Each Codex-facing model name routes to the intended upstream model; verify in gateway records. |
| Errors | Distinguish client authentication errors, unknown model routes, rate limits, and upstream failures; don't collapse into a generic `500`. |

Qualification checklist (record evidence per client/gateway/model combination): Responses request and response fields; incremental SSE delivery and terminal completion; follow-up turns with replayed input; `previous_response_id` when the transport uses it; function calls, matching results, final answer; correct routing and metadata; per-user attribution, renewal, revocation; useful authentication, routing, rate-limit, upstream errors; redacted diagnostics and logging policy.

## Notes

- Use a model name recognized by the deployed Codex version, or supply a matching catalog for a custom alias. Check `codex --version`, select the matching `rust-v<version>` tag of the Codex model catalog (`codex-rs/models-manager/models.json`; custom build: its source commit; desktop: bundled CLI version), and read `slug` values for recognized names.
- Catalog metadata informs client behavior; it doesn't add capabilities or create routes. For an organization-owned alias without a migration set `upgrade` to `null`; any replacement model must also route through the gateway. A generic gateway connection doesn't receive the metadata adjustments of Codex's built-in provider integrations.
- A gateway accepting a request field doesn't prove the upstream model implements that capability; test the actual models and features.
- Prompts, source excerpts, tool arguments, and tool results can pass through the gateway; set logging, retention, redaction, access, and export controls.
- The model gateway doesn't route every Codex connection: local commands, MCP servers, plugin services, browser and app interactions can have separate network paths and credentials.
- For gateways that forward ChatGPT workspace requests, see the ChatGPT sign-in page.
- Source: https://learn.chatgpt.com/docs/enterprise/gateway-compatibility (retrieved 2026-10).

## Related

- [Roll out a gateway](./roll-out-a-gateway.md)
- [Use API/provider credentials through a gateway](./connect-to-a-gateway.md)
- [Sign in with ChatGPT through a gateway](./sign-in-with-chatgpt-through-a-gateway.md)
- [Bedrock through LiteLLM](./bedrock-through-litellm.md)
