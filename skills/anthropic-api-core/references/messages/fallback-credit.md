<!-- source: https://platform.claude.com/docs/en/build-with-claude/fallback-credit / last verified: 2026-08-07 -->

# Fallback credit

Avoid paying the prompt-cache write cost twice when manually retrying a refused Claude Fable 5 (or Claude Opus 5) request on another model. Server-side fallback and the SDK middleware apply this automatically — this page is only for hand-rolled retries over raw HTTP.

## Signature / Usage

```python
# 1. Send with the beta header
response = client.beta.messages.create(
    model="claude-fable-5", betas=["fallback-credit-2026-07-01"],
    max_tokens=1024, messages=[{"role": "user", "content": "Hello, Claude"}],
)

# 2. On refusal, read the credit fields from stop_details
if response.stop_reason == "refusal":
    token = response.stop_details.fallback_credit_token
    has_prefill = response.stop_details.fallback_has_prefill_claim

# 3. Build the retry: same body + model swap + fallback_credit_token
retry_body = {**original_request, "fallback_credit_token": token}
if has_prefill is not False:
    retry_body["messages"] = [*original_request["messages"],
        {"role": "assistant", "content": echoed_content}]  # echo response.content

# 4. Send with the SAME beta header
response = client.beta.messages.create(model="claude-opus-4-8", betas=["fallback-credit-2026-07-01"], **retry_body)
```

## Options / Props

| Field (on refusal, in `stop_details`) | Type | Description |
|---|---|---|
| `fallback_credit_token` | string \| null | Opaque one-time credit; `null` if no credit available |
| `fallback_has_prefill_claim` | boolean \| null | `true`: append echoed assistant content to continue; `false`/absent: retry with unchanged body |

## Notes

- **Rejection ladder** on 400 error: (1) continuation shape rejected → resend unchanged body with token; (2) unchanged body also rejected (error names `fallback_credit_token`) → drop token, retry without it (forfeits credit, but if server tools already executed, this re-runs and re-bills them — surface the error instead of silently retrying in that case); (3) `"redemption temporarily unavailable"` is transient — retry same shape/token within the 5-minute window, don't move down the ladder.
- Retry model must be a permitted fallback target of the refused model (Claude Fable 5 → `claude-opus-4-8` or `claude-opus-5`); discoverable via `allowed_fallback_models` on Models API entries when `server-side-fallback-2026-07-01` beta header is set (Claude API / Claude Platform on AWS only).
- **Must match exactly between refused request and retry:** `system`, `messages` (except the one appended assistant message in continuation shape), `tools`, `tool_choice`, `thinking`, `cache_control`, `output_config`, `mcp_servers`, `context_management`, `container`, and all `anthropic-beta` headers (except `server-side-fallback-*` which must be dropped, and `fallback-credit-*` which must be kept). **May change:** `model`, `max_tokens`, `stop_sequences`, `temperature`, `top_p`, `top_k`, `stream`, `metadata`, `service_tier`.
- Token expires 5 minutes after the refusal, is stateless (no inspect/revoke endpoint), and is scoped to the org+workspace that received the refusal (or platform caller identity on Bedrock/Google Cloud, which lack workspaces).
- Verify the refund in the retry's `usage`: `cache_creation_input_tokens` lower, `cache_read_input_tokens` higher by the same amount (zero shift is fine if there was nothing to reprice).
- Beta on Claude API, Amazon Bedrock, Claude Platform on AWS, Google Cloud, Microsoft Foundry. Not available in Message Batches — a token sent on a batch request is accepted but ignored.
- If the request forced tool use (`tool_choice`) or used `output_config.format` *and* the refusal arrived after server tools already executed, the token may be unredeemable by either shape — discard it and surface cost/error rather than silently retrying (this re-runs and re-bills completed server tools).

## Related

- [Refusals and fallback](./refusals-and-fallback.md)
- [Handling stop reasons](./handling-stop-reasons.md)

Tool use・Agent Skills・MCP の詳細は anthropic-api-tools-mcp スキルを参照（server tools 実行後の refusal 挙動を含む）。
