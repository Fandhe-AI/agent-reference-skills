# Bedrock through LiteLLM

Route Codex to Amazon Bedrock through a LiteLLM gateway: connect to an existing gateway, or deploy one (Bedrock Runtime route, client catalog, test credential, verification).

## Signature / Usage

LiteLLM Runtime model route mapping a stable Codex-facing alias to the approved upstream model:

```yaml
model_list:
  - model_name: company-coding-model
    litellm_params:
      model: openai/global.openai.gpt-6-sol
      api_key: os.environ/AWS_BEARER_TOKEN_BEDROCK
      api_base: https://bedrock-runtime.us-east-1.amazonaws.com/openai/v1
```

Client-side connection prompt: `gateway-ok` check from the connect guide.

## Options / Props

Client catalog edits for the GPT-6 Sol / Runtime example with Codex 0.158.0 (start from the complete `gpt-6-sol` entry of that version's `models.json`):

| Field | Required edit |
|-------|---------------|
| `slug` | `"company-coding-model"` (matches the LiteLLM alias) |
| `visibility` | `"list"` |
| `availability_nux` | `null` |
| `upgrade` | `null` |
| `use_responses_lite` | `false` |
| `tool_mode` | `null` |
| `supported_reasoning_levels` | Remove the entry whose `effort` is `"ultra"`; retain others |
| `additional_speed_tiers` | `[]` |
| `service_tiers` | `[]` |
| `default_service_tier` | `null` |
| `web_search_tool_type` | `"text"` |
| `multi_agent_version` | `"v1"` |
| `supports_search_tool` | `false` for Runtime |

Deployment checkpoints: deploy the proxy with private database and cache dependencies (stable HTTPS base URL ending in `/v1`); configure a model route and matching client catalog; verify a streamed `POST /v1/responses` ending with `response.completed`; issue a per-user virtual key restricted to the alias with expiration, budget, and rate limits; connect one developer and verify a short prompt.

Troubleshooting:

| Symptom | What to check |
|---------|---------------|
| HTTPS fails before inference | DNS, certificate host name, load-balancer health, allowed client networks |
| Gateway returns `401` or `403` | Distinguish a rejected user credential from an upstream Bedrock authentication/permission failure using gateway logs |
| Requested model isn't found | Exact client-facing alias and its upstream model or inference-profile mapping |
| Request blocked before reaching LiteLLM | Load-balancer and WAF logs, including request-body limits |
| Text works, but a turn doesn't finish | Streaming buffers, timeouts, terminal events, follow-up and tool-call checks |
| Upstream request times out | Model availability in the source Region, routing, quotas, gateway logs before changing timeouts |

## Notes

- Connecting to an existing gateway needs from the administrator: HTTPS base URL (for example `https://gateway.example.com/v1`), the alias routed to an approved Bedrock model, the provider ID, a scoped gateway credential or helper, and any model catalog. The gateway credential authenticates to LiteLLM; Bedrock credentials stay on the gateway.
- Prerequisites to deploy: permission to deploy the approved LiteLLM architecture in AWS, Bedrock access to the routed models or inference profiles, a reviewed LiteLLM image, a trusted HTTPS host name and certificate, a restricted client network range. For the Runtime example the gateway's AWS identity needs `bedrock:InvokeModel` for the selected inference profile and the account's default project.
- Use Bedrock Runtime for new configurations (its OpenAI-compatible Responses endpoint). Hosted web search isn't available on Bedrock Runtime; use Mantle and confirm the gateway preserves the tool request and response. Keep `web_search = "disabled"` in the Runtime client configuration.
- Supply a valid Bedrock API key as `AWS_BEARER_TOKEN_BEDROCK` via secret management; for a short-lived key, issue a replacement before expiry, update the gateway environment, and restart workers. The `openai/` prefix selects LiteLLM's OpenAI-compatible adapter; the Global inference profile can route outside the source Region, so choose a profile and Region meeting data-residency requirements.
- A generic gateway does not inherit the built-in Bedrock provider's metadata adjustments, hence the catalog edits above (mirroring `codex-rs/model-provider/src/amazon_bedrock/catalog.rs` and `runtime_catalog.rs` at `rust-v0.158.0`). Recheck against matching source when changing client version or upstream model. Distribute the full JSON and configure `model_catalog_json`.
- Restrict inbound access to approved clients, keep database and cache ports private, grant only needed Bedrock permissions, and pin the deployed image by digest. Prompts, source excerpts, and tool results pass through the gateway and may enter its logs; decide retention, access, and redaction first. MCP servers and plugins have separate connections and authentication.
- Test credential: a LiteLLM virtual key for one test user, restricted to the alias; don't give users the LiteLLM administrative key or embed gateway credentials in `config.toml`. Verification: certificate matches host name; connect one user; run a short prompt, a follow-up, and a read-only tool task; confirm records show identity, alias, and upstream route without exposing credentials; test expiration/revocation and rejection of unauthorized aliases.
- Reference deployment: pinned LiteLLM on ECS guide in `openai-on-aws/guidance-codex` (commit `eb04fe0`), which uses Bedrock Runtime and refreshes authentication from the ECS task role.
- Source: https://learn.chatgpt.com/docs/enterprise/bedrock-through-litellm (retrieved 2026-10).

## Related

- [Use API/provider credentials through a gateway](./connect-to-a-gateway.md)
- [Roll out a gateway](./roll-out-a-gateway.md)
- [Gateway compatibility requirements](./gateway-compatibility.md)
