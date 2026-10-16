# Roll out a gateway

Administrator guide for rolling out the API/provider credential path through an LLM gateway: configure model routes, issue developer credentials, and distribute a verified Codex configuration.

## Signature / Usage

Provider defaults to distribute (put `model` and `model_provider` before the first TOML table):

```toml
model = "gpt-6-sol"
model_provider = "enterprise-gateway"
web_search = "disabled"

[model_providers.enterprise-gateway]
name = "Organization Gateway"
base_url = "https://gateway.example.com/v1"
wire_api = "responses"

[model_providers.enterprise-gateway.auth]
command = "/usr/local/bin/fetch-codex-gateway-token"
args = ["print-token"]
timeout_ms = 30000
refresh_interval_ms = 300000
```

Custom alias with a remote catalog:

```toml
model = "company-coding-model"
model_provider = "enterprise-gateway"
web_search = "disabled"

[model_providers.enterprise-gateway]
name = "Organization Gateway"
base_url = "https://gateway.example.com/v1"
model_catalog_url = "https://gateway.example.com/codex/models.json"
wire_api = "responses"
env_key = "CODEX_GATEWAY_API_KEY"
```

Custom alias with a local catalog:

```toml
model = "company-coding-model"
model_catalog_json = "/absolute/path/to/gateway-models.json"
```

Windows paths (resolved absolute, single-quoted):

```toml
model_catalog_json = 'C:\ProgramData\OpenAI\Codex\models.json'

[model_providers.enterprise-gateway.auth]
command = 'C:\ProgramData\OpenAI\Codex\fetch-gateway-token.cmd'
args = ["print-token"]
```

## Options / Props

Rollout checkpoints, in order: choose model names and verify routes; issue developer credentials; test Codex through the gateway; distribute the configuration; verify from a developer machine.

Test checks (run from the CLI or desktop surface developers will use):

| Check | Action | Passing evidence |
|-------|--------|------------------|
| Connection | Verify the connection per the connect guide | Expected provider and alias active, test prompt succeeds, gateway logs identify the test user |
| Streaming | Ask for a short multi-paragraph answer | SSE forwarded without buffering, incremental text, stream ends with `response.completed` |
| Local tool loop | In a disposable read-only folder, list and summarize top-level files | Local tool call issued, result returned, final answer without edits |
| Follow-up | Ask a follow-up in the same thread | Answer uses the prior turn; replayed input accepted; `previous_response_id` preserved if WebSocket or incremental transport is enabled |
| Errors and attribution | Repeat with an invalid alias or expired credential | Useful routing/authentication error; valid requests attributed to the test user |

Troubleshooting:

| Issue | Remediation |
|-------|-------------|
| Expected provider missing after restart | Inspect the winning configuration layer; user or profile configuration can override system defaults |
| Authentication fails for every user | Check gateway authentication and upstream provider credential; identify which service rejected the request |
| Authentication fails for one user | Check that user's gateway credential or token resolver |
| Streaming stalls | Inspect gateway buffering and terminal `response.completed` forwarding |
| Model missing or generic capabilities | Confirm gateway alias, Codex `model`, and catalog `slug` match; check catalog path and version compatibility; restart Codex |
| Windows path fails | Use resolved absolute paths; single-quoted TOML strings for single backslashes |

## Notes

- Prerequisites: gateway serving HTTPS at the exact base URL, upstream provider credential held by the gateway, approved Codex-facing aliases mapped to upstream models, a scoped test credential, a secret delivery mechanism or tested credential helper, and a way to distribute configuration, helpers, and catalog files.
- The gateway must accept `POST /v1/responses`, stream SSE without buffering ending with `response.completed`, preserve follow-up continuation with replayed input, preserve `previous_response_id` only when WebSocket or incremental transport is enabled, preserve function calls and matching `function_call_output` items, route each alias to the intended model, and authenticate users separately. A health endpoint, `/v1/models`, Chat Completions response, or one plain-text reply does not qualify a gateway.
- Custom alias: create the alias on the gateway, download the Codex model catalog (`codex-rs/models-manager/models.json`) matching your Codex version's `rust-v<version>` tag (`codex --version`; for desktop match the bundled CLI version), set the entry's `slug` to the alias, and set `upgrade` to `null` for an alias without a migration. Keep entries in the top-level `models` array and include every selectable model. Without a matching entry Codex uses generic settings.
- Remote catalog endpoint requirements: accept `GET` at the configured URL including the `client_version` query parameter and any provider `query_params`; accept the provider's authentication and headers; return a top-level `models` array with complete version-matched metadata and a unique nonempty `slug` per entry; return JSON directly without redirects, within 1 MiB. Discovery requires API-key, command-backed, or Codex-backend authentication (custom headers alone don't trigger it). Remove any effective `model_catalog_json`, including via `requirements.toml`, which takes precedence over the URL. Restart the client after changes.
- A local custom catalog replaces the bundled catalog; Codex loads it at startup.
- Credentials: issue one scoped gateway credential per developer; set approved models, rate limits, budget, expiration, and renewal; keep upstream provider and gateway administrator credentials off developer machines. Static key variant: remove the auth block and set `env_key = "CODEX_GATEWAY_API_KEY"` in the provider table (never combine `env_key` with command-backed auth).
- Distribution: host-wide defaults at `/etc/codex/config.toml` (macOS/Linux) or `%ProgramData%\OpenAI\Codex\config.toml` (Windows); users and profiles can override. To enforce a remote catalog URL put the complete provider definition in `requirements.toml` under `[model_providers.<id>]` (it replaces the matching ordinary provider table); use the `model_provider` requirement to enforce selection. A `model_catalog_json` requirement pins the path but does not distribute the file. Codex doesn't expand `%ProgramData%` inside `model_catalog_json` or auth `command` values. A CLI inside WSL reads Linux paths and Linux `CODEX_HOME`. Project-local `.codex/config.toml` cannot override sensitive provider or authentication routing keys; manual setup is not an enforcement channel.
- Reusing an existing Claude Code gateway: keep gateway product, DNS, TLS, networking, logging, and Bedrock access; add a Codex-facing Responses route, credential, aliases, and `config.toml`. `/v1/messages`, Anthropic headers, and Claude settings don't configure Codex. Codex does not support `apiKeyHelper`; use `env_key` or a command-backed resolver. Migration steps: inventory the Claude path, add a parallel Responses route and aliases, issue one scoped Codex credential, configure one developer, run the connection and full checks, then distribute.
- Model routing and tool authorization are separate; configure MCP connections and plugin distribution separately. A `/v1/models` response doesn't prove a model supports the required behavior.
- Reference implementations: the `openai-on-aws/guidance-codex` repository (pinned commit `adbc00f353effbf0252e667ba41eb89c99324c8f` in the source page).
- Source: https://learn.chatgpt.com/docs/enterprise/roll-out-a-gateway (retrieved 2026-10).

## Related

- [Use API/provider credentials through a gateway](./connect-to-a-gateway.md)
- [Gateway compatibility requirements](./gateway-compatibility.md)
- [Sign in with ChatGPT through a gateway](./sign-in-with-chatgpt-through-a-gateway.md)
- [Bedrock through LiteLLM](./bedrock-through-litellm.md)
- [Managed configuration](./managed-configuration.md)
