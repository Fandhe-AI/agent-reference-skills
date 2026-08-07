<!-- source: https://code.claude.com/docs/en/gateways.md / last verified: 2026-08-07 -->

# Run Claude Code through a gateway

Route Claude Code through a self-hosted gateway for centralized credentials, usage tracking, and cost controls. Covers the architecture, Anthropic's Claude apps gateway, and using other gateway products.

## Signature / Usage

A gateway is a proxy your organization runs between Claude Code and a model provider. Claude Code sends API traffic to the gateway instead of directly to the provider, and the gateway forwards it using a credential your organization holds. Developers authenticate to the gateway rather than holding provider credentials, so authentication, usage tracking, budgets, and audit logging happen in one place you control.

Two kinds of credential are involved:

- **Developer credential**: each developer holds their own, issued by the gateway. It authenticates them to the gateway and identifies them in usage tracking.
- **Provider credential**: the gateway holds one credential for your provider account, shared by all forwarded traffic.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Claude apps gateway | built-in | Anthropic's self-hosted gateway, included in the `claude` binary. Routes to Amazon Bedrock, Claude Platform on AWS, Google Cloud, Microsoft Foundry, or the Anthropic API. Developers sign in via `/login` with corporate IdP; enforces model access and managed settings by IdP group; emits OTLP usage metrics |
| Other gateways | third-party | Use an LLM gateway/API gateway your organization already runs; Anthropic doesn't endorse, maintain, or audit these, and doesn't support routing to non-Claude models through any gateway |

## Notes

- Claude apps gateway is built and tested alongside each Claude Code release, so it forwards new headers/fields automatically; a separately maintained gateway needs its forwarding rules updated as Claude Code evolves.
- The gateway sign-in for Claude apps gateway is browser SSO only, with no service-token flow, so CI pipelines can't authenticate through it directly; configure CI against the provider instead.
- When developers connect through a gateway with a gateway credential, usage is billed to the organization's provider account at API rates; claude.ai subscriptions aren't used or charged for that session.
- Setting only `ANTHROPIC_BASE_URL` without a gateway credential still routes through the gateway but keeps the saved claude.ai login as the active credential, so subscription limits/billing apply.
- Model selection, non-gateway network traffic (version checks, telemetry), and corporate HTTP proxies are configured separately from the gateway.

## Related

- [Other LLM gateways](./llm-gateway.md)
- [Connect Claude Code to an LLM gateway](./llm-gateway-connect.md)
- [Gateway protocol reference](./llm-gateway-protocol.md)
- [Roll out an LLM gateway for your organization](./llm-gateway-rollout.md)
