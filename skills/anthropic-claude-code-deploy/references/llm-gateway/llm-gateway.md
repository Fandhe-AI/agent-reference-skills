<!-- source: https://code.claude.com/docs/en/llm-gateway.md / last verified: 2026-08-07 -->

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

## Related

- [Run Claude Code through a gateway](./gateways.md)
- [Connect Claude Code to an LLM gateway](./llm-gateway-connect.md)
- [Roll out an LLM gateway for your organization](./llm-gateway-rollout.md)
- [Gateway protocol reference](./llm-gateway-protocol.md)
