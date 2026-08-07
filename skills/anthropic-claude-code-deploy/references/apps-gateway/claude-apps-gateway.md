<!-- source: https://code.claude.com/docs/en/claude-apps-gateway.md / last verified: 2026-08-07 -->

# Claude apps gateway

Self-hosted service that sits between Claude Code clients and a model provider (Amazon Bedrock, Claude Platform on AWS, Google Cloud's Agent Platform, Microsoft Foundry, or Anthropic API), with SSO sign-in, per-group model access, managed settings delivery, and OTLP telemetry fan-out.

## Signature / Usage

```bash
# Included in the claude binary; run the gateway server:
claude gateway --config gateway.yaml

# Verify the auth surface once running:
curl -s https://claude-gateway.internal.example.com/.well-known/oauth-authorization-server | jq
curl -s -X POST https://claude-gateway.internal.example.com/oauth/device_authorization | jq
```

```json
// managed-settings.json pushed to developer machines via MDM
{
  "forceLoginMethod": "gateway",
  "forceLoginGatewayUrl": "https://claude-gateway.internal.example.com",
  "parentSettingsBehavior": "merge"
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `forceLoginMethod` / `forceLoginGatewayUrl` | managed settings | Opens `/login` directly on the Cloud gateway screen; only takes effect from an admin-pushed source, never from a developer's own settings |
| `parentSettingsBehavior: "merge"` | managed settings | Lets Claude Desktop deliver the gateway's policy to Claude Code sessions it launches |
| `allowManagedPermissionRulesOnly` / `allowManagedMcpServersOnly` / `allowManagedHooksOnly` | managed settings | Lock keys restricting what host-supplied parent settings can grant |
| `bootstrapUrl` | Claude Desktop managed config | `<listen.public_url>/user/bootstrap`; requires a `desktop` key in the matching gateway policy (v2.1.203+) |

## Notes

- Requires Claude Code v2.1.195+ on both the gateway server and developer machines; server runs only on the native Linux binary (macOS for local dev only, Windows unsupported as server).
- Gateway must be reachable only via a private-network address; `/login` rejects any hostname that resolves to a public IP (Anthropic-operated public gateway endpoints are the sole exception).
- No service-token flow: gateway sign-in always runs the browser device flow, so unattended CI pipelines cannot authenticate through it.
- WebSearch and the 1-hour cache TTL beta are unavailable on gateway sessions; auto mode follows third-party-provider rules.
- OIDC only (no SAML/LDAP); one issuer per gateway instance; no admin UI or Helm chart.

## Related

- [claude-apps-gateway-config.md](./claude-apps-gateway-config.md)
- [claude-apps-gateway-deploy.md](./claude-apps-gateway-deploy.md)
- [claude-apps-gateway-spend-limits.md](./claude-apps-gateway-spend-limits.md)
- [claude-apps-gateway-on-aws.md](./claude-apps-gateway-on-aws.md)
- [claude-apps-gateway-on-gcp.md](./claude-apps-gateway-on-gcp.md)
