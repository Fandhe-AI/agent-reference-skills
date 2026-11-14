<!-- source: https://code.claude.com/docs/en/llm-gateway.md / last verified: 2026-11-14 -->

# Other LLM gateways

Route Claude Code through an LLM gateway your organization already runs, rather than Claude apps gateway. Covers what a gateway provides, and how it interacts with claude.ai subscriptions.

## Signature / Usage

Any gateway that exposes a supported API format works. Anthropic doesn't endorse, maintain, or audit third-party gateway products, and doesn't support routing Claude Code to non-Claude models through any gateway. Deploy the gateway following its own documentation, then complete the Claude Code side with the rollout steps.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Credentials | capability | Provider key stays server-side; developers hold gateway credentials instead |
| Usage tracking | capability | Attribute usage by developer or team, regardless of provider |
| Cost controls | capability | Enforce budgets and rate limits in one place |
| Audit logging | capability | Log every model request for compliance |
| Provider switching | capability | Change provider in gateway configuration without touching developer machines (requires a single Anthropic-format endpoint regardless of upstream) |

## Notes

- The gateway becomes infrastructure your organization operates; Claude Code adds capabilities with each release, so a gateway that doesn't forward them breaks the corresponding features.
- Roll-out sequence: deploy the gateway with your provider credential, issue each developer a gateway credential, distribute base URL + credential via managed settings, then have each developer check the configuration.
- A gateway credential variable (`ANTHROPIC_AUTH_TOKEN`/`ANTHROPIC_API_KEY`/`apiKeyHelper`) replaces subscription login for that session; billing goes to the credential's owner instead of the claude.ai subscription.
- Setting only `ANTHROPIC_BASE_URL` (no gateway credential) keeps the claude.ai subscription active; a gateway that passes this traffic to Anthropic must forward the OAuth capability in `anthropic-beta`.

### Pin a managed machine to the gateway

- To make a gateway reached through `ANTHROPIC_BASE_URL` the only destination a managed machine may use, set `allowedProviders` to `["customEndpoint"]` in the same managed settings file and put the gateway's `ANTHROPIC_BASE_URL` in that file's `env` block. Claude Code then refuses a session pointed anywhere else (including Anthropic directly or a developer's own proxy) and accepts `ANTHROPIC_BASE_URL` only with the value set there.
- For a gateway reached through a provider-specific endpoint variable such as `ANTHROPIC_BEDROCK_BASE_URL`, the `allowedProviders` entry says which variable to pin. Requires Claude Code v2.1.285 or later.
- With Desktop signed in to claude.ai, a Cowork session on the user's machine counts as `"anthropic"`. If it is left out of `allowedProviders` in an MDM policy or managed settings file, that session is refused; with it in, sessions sent to Anthropic directly also pass the list.
- Provider switching without reconfiguring developer machines depends on a single Anthropic-format endpoint; a gateway exposing a provider's own format ties client configuration to that provider and changes what Claude Code sends and which defaults it applies.
- Distribute the base URL and credential via a managed settings file plus secrets tooling; without settings distribution, developers set the variables themselves per the connect page.
- Source: https://code.claude.com/docs/en/llm-gateway.md, fetched 2026-11-14

## Related

- [Run Claude Code through a gateway](./gateways.md)
- [Connect Claude Code to an LLM gateway](./llm-gateway-connect.md)
- [Roll out an LLM gateway for your organization](./llm-gateway-rollout.md)
- [Gateway protocol reference](./llm-gateway-protocol.md)
